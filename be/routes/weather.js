import express from "express";
import axios from "axios";
import middleware from "../middleware.js";
import { User } from "../DB/db.js";

const router = express.Router();

router.get("/", middleware, async (req, res) => {
  const user = await User.findById(req.userId);

  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${user.city}&units=metric&appid=${process.env.WEATHER_API_KEY}`
  );

  res.json(response.data);
});

export default router;
