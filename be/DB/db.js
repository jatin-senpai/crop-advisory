import mongoose, { Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const URL = process.env.MONGO_URL;
mongoose.connect(URL)
  .then(() => console.log("✅ MongoDB Connected Successfully"))
  .catch(err => console.error("❌ MongoDB Connection Error:", err.message));
const user = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  city: String,
  state: String,
  pincode: Number
});

export const User = mongoose.model("users", user);