import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import middleware from "../middleware.js";

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", middleware, async (req, res) => {
    console.log(`🤖 Gemini request received: "${req.body.message?.substring(0, 30)}..."`);
    const { message } = req.body;

    if (!message) {
        return res.status(400).json({ message: "Message is required" });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

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
        console.error("Gemini API Error:", error.message);
        if (error.message.includes("leaked")) {
            return res.status(403).json({ message: "API Key reported as leaked. Please update GEMINI_API_KEY in .env." });
        }
        res.status(500).json({ message: "AI is currently busy. Please try again later." });
    }
});

export default router;
