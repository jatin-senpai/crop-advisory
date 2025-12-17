import express from "express";
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import fetch from "fetch";
import bcrypt from "bcrypt";
import cors from "cors";
import axios from "axios";
import { exec } from "child_process";
import middleware from "./middleware.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const signupSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: String,
  pincode: Number,
  city: String
});

const Signup = mongoose.model("Signup", signupSchema);

const getCity = async (pincode) => {
  try {
    const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await response.json();
    if (data[0].Status === "Success") {
      return data[0].PostOffice[0].District;
    }
    return null;
  } catch {
    return null;
  }
};

app.post("/signup", async (req, res) => {
  try {
    const { email, password, pincode } = req.body;

    if (!email || !password || !pincode) {
      return res.status(400).json({ message: "All fields required" });
    }

    const existingUser = await Signup.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const city = await getCity(pincode);

    await Signup.create({
      email,
      password: hashedPassword,
      pincode,
      city
    });

    res.json({ message: "User signed up successfully" });
  } catch {
    res.status(500).json({ message: "Signup failed" });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await Signup.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ message: "Signin successful", token });
  } catch {
    res.status(500).json({ message: "Signin failed" });
  }
});

app.post("/weather", middleware, async (req, res) => {
  try {
    const user = await Signup.findById(req.userId);

    const weatherResponse = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${user.city}&units=metric&appid=${process.env.WEATHER_API_KEY}`
    );

    const weatherData = await weatherResponse.json();
    res.json(weatherData);
  } catch {
    res.status(500).json({ message: "Weather fetch failed" });
  }
});

app.get("/prices", middleware, async (req, res) => {
  const { commodity, state } = req.query;

  try {
    const response = await axios.get(
      "https://api.data.gov.in/resource/YOUR_RESOURCE_ID",
      {
        params: {
          "api-key": process.env.DATA_GOV_API_KEY,
          format: "json",
          limit: 1,
          filters: JSON.stringify({ commodity, state })
        }
      }
    );

    const record = response.data.records[0];

    if (!record) {
      return res.json({
        commodity,
        price: "2200",
        unit: "₹ / quintal"
      });
    }

    res.json({
      commodity: record.commodity,
      market: record.market,
      price: record.modal_price,
      unit: "₹ / quintal"
    });
  } catch {
    res.status(500).json({ message: "Price data not available" });
  }
});

app.post("/crop-recommendation", middleware, async (req, res) => {
  const { soil, water, season } = req.body;

  if (!soil || !water || !season) {
    return res.status(400).json({ message: "All inputs required" });
  }

  exec(
    `python predict.py "${soil}" "${water}" "${season}"`,
    (error, stdout) => {
      if (error) {
        return res.status(500).json({ message: "Prediction failed" });
      }
      res.json({ recommendedCrop: stdout.trim() });
    }
  );
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
