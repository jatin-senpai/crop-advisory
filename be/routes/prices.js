import express from "express";
import axios from "axios";
import middleware from "../middleware.js";
import { User } from "../DB/db.js";
import { normalizeCity } from "../utils.js";
import https from "https";

const router = express.Router();

const agent = new https.Agent({
    rejectUnauthorized: false
});

router.get("/", middleware, async (req, res) => {
    const { crop } = req.query;

    if (!crop) {
        return res.status(400).json({ message: "Crop required" });
    }

    const user = await User.findById(req.userId);

    if (!user?.city || !user?.state) {
        return res.status(400).json({ message: "User location incomplete" });
    }

    try {
        const getCommodityAliases = (crop) => {
            const lower = crop.toLowerCase();
            if (lower === "rice") {
                return ["Rice", "Paddy(Dhan)(Common)", "Paddy(Dhan)(Basmati)", "Paddy(Dhan)"];
            }
            if (lower === "wheat") {
                return ["Wheat", "Wheat(Husked)", "Wheat(Mexican)"];
            }
            return [crop.charAt(0).toUpperCase() + crop.slice(1)];
        };

        const aliases = getCommodityAliases(crop);

        // Function to fetch with specific params
        const fetchPrices = async (filterObj) => {
            try {
                console.log("Fetching with filters:", filterObj);
                const params = {
                    "api-key": process.env.DATA_GOV_API_KEY,
                    format: "json",
                    limit: 10,
                    ...filterObj
                };

                const response = await axios.get(
                    "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070",
                    { params, httpsAgent: agent }
                );
                return response.data.records || [];
            } catch (e) {
                console.error("Fetch attempt failed:", e.message);
                return [];
            }
        };

        const getCoordinates = async (location) => {
            try {
                const normalizedLocation = normalizeCity(location);
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather`,
                    {
                        params: {
                            q: normalizedLocation,
                            appid: process.env.WEATHER_API_KEY
                        },
                        httpsAgent: agent
                    }
                );
                return response.data.coord;
            } catch (e) {
                console.warn(`Could not get coordinates for ${location}: ${e.message}`);
                return null;
            }
        };

        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            const R = 6371;
            const dLat = (lat2 - lat1) * (Math.PI / 180);
            const dLon = (lon2 - lon1) * (Math.PI / 180);
            const a =
                Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
        };

        let record = null;
        let fallbackRecord = null;

        for (const commodity of aliases) {
            let records = await fetchPrices({
                "filters[commodity]": commodity,
                "filters[state]": user.state,
                "filters[district]": user.city
            });

            if (records.length > 0) {
                record = records[0];
                break;
            }

            records = await fetchPrices({
                "filters[commodity]": commodity,
                "filters[state]": user.state,
                limit: 30
            });

            if (records.length > 0) {
                const userCoords = await getCoordinates(`${user.city}, ${user.state}`);

                if (userCoords) {
                    const uniqueDistricts = [...new Set(records.map(r => r.district))];
                    const districtCoordsMap = {};

                    // Limit to top 5 districts for faster response
                    for (const district of uniqueDistricts.slice(0, 5)) {
                        const coords = await getCoordinates(`${district}, ${user.state}`);
                        if (coords) districtCoordsMap[district] = coords;
                    }

                    records.sort((a, b) => {
                        const coordsA = districtCoordsMap[a.district];
                        const coordsB = districtCoordsMap[b.district];

                        if (!coordsA) return 1;
                        if (!coordsB) return -1;

                        const distA = calculateDistance(userCoords.lat, userCoords.lon, coordsA.lat, coordsA.lon);
                        const distB = calculateDistance(userCoords.lat, userCoords.lon, coordsB.lat, coordsB.lon);

                        return distA - distB;
                    });
                }

                record = records[0];
                break;
            }

            records = await fetchPrices({
                "filters[commodity]": commodity,
                limit: 20
            });

            if (records.length > 0) {
                const stateMatch = records.find(r => r.state.toLowerCase() === user.state.toLowerCase());
                if (stateMatch) {
                    record = stateMatch;
                    break;
                }

                if (!fallbackRecord) {
                    fallbackRecord = records[0];
                }
            }
        }

        if (record) {
            res.json({
                crop: record.commodity,
                market: record.market,
                district: record.district,
                state: record.state,
                price: record.modal_price,
                unit: "₹ / quintal",
                date: record.arrival_date,
                note: record.district.toLowerCase() !== user.city.toLowerCase() || record.state.toLowerCase() !== user.state.toLowerCase()
                    ? `Price from ${record.district}, ${record.state} (nearest available)`
                    : undefined
            });
            return;
        }

        if (fallbackRecord) {
            res.json({
                crop: fallbackRecord.commodity,
                market: fallbackRecord.market,
                district: fallbackRecord.district,
                state: fallbackRecord.state,
                price: fallbackRecord.modal_price,
                unit: "₹ / quintal",
                date: fallbackRecord.arrival_date,
                note: `Price from ${fallbackRecord.district}, ${fallbackRecord.state} (global fallback)`
            });
            return;
        }

        return res.json({ message: `No price data found for ${crop}` });

    } catch (error) {
        console.error("Price fetch error:", error.response?.data || error.message);
        res.status(500).json({ message: "Failed to fetch mandi prices" });
    }
});

export default router;
