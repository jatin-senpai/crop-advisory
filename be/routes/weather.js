import express from "express";
import axios from "axios";
import middleware from "../middleware.js";
import { User } from "../DB/db.js";

const router = express.Router();

router.get("/", middleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.city) {
      return res.status(400).json({ message: "Location not set. Please update your profile." });
    }

    const city = user.city.trim();
    console.log(`Fetching weather for: '${city}'`);

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: city,
          units: 'metric',
          appid: process.env.WEATHER_API_KEY
        },
        // Fix for "self-signed certificate in certificate chain"
        // in dev environments or behind proxies
        httpsAgent: new (await import('https')).Agent({
          rejectUnauthorized: false
        })
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error("Weather API Error:", error.response?.data || error.message);
    if (error.response?.status === 404) {
      // 404 from OWM means city not found
      return res.status(404).json({ message: `City '${user.city}' not found by weather provider` });
    }
    res.status(500).json({ message: "Failed to fetch weather data" });
  }
});

export default router;
