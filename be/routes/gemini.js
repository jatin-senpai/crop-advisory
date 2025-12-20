import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import middleware from "../middleware.js";

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", middleware, async (req, res) => {
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ message: "Message is required" });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });

        const prompt = `
      You are an expert agricultural consultant named 'Kisan Sahayak AI'. 
      Your goal is to help Indian farmers with practical, scientific, and sustainable farming advice.
      
      User Query: "${message}"
      
      Guidelines:
      1. Keep answers concise (under 150 words) unless detailed explanation is requested.
      2. Use simple, encouraging language.
      3. If asked about prices/weather, explain that there are dedicated dashboard widgets for that, but provide general advice.
      4. Focus on Indian farming contexts (season, soil, local crops).
      5. Add a small emoji where relevant.
    `;

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        res.json({ reply: text });
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ message: "AI is currently busy. Please try again later." });
    }
});

export default router;
