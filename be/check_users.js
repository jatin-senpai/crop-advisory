import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./DB/db.js";

dotenv.config();

async function checkUsers() {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");

        const users = await User.find({});
        console.log(`Found ${users.length} users:`);
        users.forEach(u => {
            console.log(`- ${u.name} (${u.email}): City: ${u.city}, State: ${u.state}, Pincode: ${u.pincode}`);
        });

        await mongoose.disconnect();
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message);
    }
}

checkUsers();
