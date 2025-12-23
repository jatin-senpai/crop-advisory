import dotenv from "dotenv";
dotenv.config();

console.log("Environment variables loaded.");
if (!process.env.SECRET_KEY) {
  console.warn("WARNING: SECRET_KEY not found in .env!");
}

import express from "express";
import cors from "cors";
import axios from "axios";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import { SignupType, SigninType } from "./types.js";
import { User } from "./DB/db.js";

import cropRoutes from "./routes/crop.js";
import weatherRoutes from "./routes/weather.js";
import priceRoutes from "./routes/prices.js";
import geminiRoutes from "./routes/gemini.js";

const app = express();

app.use(express.json());
app.use(cors());

import { normalizeCity } from "./utils.js";

const getLocationFromPincode = async (pincode) => {
  try {
    const response = await axios.get(
      `https://api.postalpincode.in/pincode/${pincode}`
    );

    const postOffice = response.data[0]?.PostOffice?.[0];

    if (!postOffice) {
      return { city: "", state: "" };
    }

    return {
      city: normalizeCity(postOffice.District),
      state: postOffice.State
    };
  } catch (e) {
    console.error("Pincode API Error:", e.message);
    return { city: "", state: "" };
  }
};

app.use("/crop", cropRoutes);
app.use("/weather", weatherRoutes);
app.use("/prices", priceRoutes);
app.use("/gemini", geminiRoutes);

app.post("/signup", async (req, res) => {
  const parsedData = SignupType.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({
      message: "Invalid data",
      errors: parsedData.error.errors
    });
  }

  const { email, password, name, pincode } = parsedData.data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const { city, state } = await getLocationFromPincode(pincode);

  await User.create({
    name,
    email,
    password: hashedPassword,
    city,
    state,
    pincode
  });


  res.status(201).json({ message: "User created successfully" });
});

app.post("/signin", async (req, res) => {
  const parsedData = SigninType.safeParse(req.body);

  if (!parsedData.success) {
    return res.status(400).json({ message: "Invalid data" });
  }

  const { email, password } = parsedData.data;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );

  res.status(200).json({
    message: "Signin successful",
    token
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
