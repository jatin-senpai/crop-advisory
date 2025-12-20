import mongoose,{Schema} from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const URL = process.env.MONGO_URL;
mongoose.connect(URL)
const user = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  city: String,
  state: String,
  pincode: Number
});

export const User = mongoose.model("users",user);