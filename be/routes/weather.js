import express from "express";
import axios from "axios";
import middleware from "../middleware.js";
import { User } from "../DB/db.js";
import { normalizeCity } from "../utils.js";
import https from "https";

const router = express.Router();

router.get("/", middleware, async (req, res) => {
  let user;
  try {
    user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.city) {
      return res.status(400).json({ message: "Location not set. Please update your profile." });
    }

    const city = normalizeCity(user.city);
    console.log(`Fetching weather for: '${city}' (original: '${user.city}')`);

    const agent = new https.Agent({
      rejectUnauthorized: false
    });

    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: `${city},${user.state},IN`,
            units: 'metric',
            appid: process.env.WEATHER_API_KEY
          },
          httpsAgent: agent
        }
      );
      return res.json(response.data);
    } catch (apiError) {
      console.warn("Retrying weather with city only...");
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather`,
        {
          params: {
            q: city,
            units: 'metric',
            appid: process.env.WEATHER_API_KEY
          },
          httpsAgent: agent
        }
      );
      return res.json(response.data);
    }

  } catch (error) {
    console.error("Weather API Error:", error.response?.data || error.message);
    if (error.response?.status === 404 && user) {
      return res.status(404).json({ message: `Location '${user.city}' not found by weather provider` });
    }
    res.status(500).json({ message: "Failed to fetch weather data" });
  }
});

export default router;
