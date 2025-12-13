import express from "express";
import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import middleware from "./middleware.js";
import fetch from "node-fetch";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
app.use(express.json());


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));


const signupSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: String,
  pincode: Number,
  city: String
});

const Signup = mongoose.model("Signup", signupSchema);


const getCity = async (pincode) => {
    try{
        const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
    const data = await response.json();
    if (data[0].Status === "Success") {
      return data[0].PostOffice[0].District;
    }
    return null;
  } catch (error) {
    console.error("Error fetching city:", error);
    return null;
  }
};


app.post("/signup", async (req, res) => {
  const { email, password, pincode } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  const city = await getCity(pincode);

  await Signup.create({
    email,
    password: hashedPassword,
    pincode,
    city
  });

  res.json({ message: "User signed up successfully" });
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  const user = await Signup.findOne({ email });

  if (user && await bcrypt.compare(password, user.password)) {
    const token = jwt.sign(
      { userId: user._id },
      process.env.SECRET_KEY,
      { expiresIn: "1h" }
    );

    res.json({ message: "Signin successful", token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});
app.post("/weather", middleware, async (req, res) => {
  const user = await Signup.findById(req.userId);

  const weatherResponse = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${user.city}&appid=${process.env.WEATHER_API_KEY}`
  );

  const weatherData = await weatherResponse.json();
  res.json(weatherData);
});
app.post("/crop-recommendation", middleware, async (req, res) => {
    
})

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
