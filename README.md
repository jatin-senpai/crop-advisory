# 🌾 Kisan Sahayak - Smart Crop Advisory System

> **Empowering farmers with AI-driven insights for a profitable harvest.**

![Kisan Sahayak Banner](https://images.unsplash.com/photo-1625246333195-5848c42287f3?q=80&w=1200&auto=format&fit=crop)

## 🚀 Overview
**Kisan Sahayak** is a comprehensive digital platform designed to help small and marginal farmers in India make informed decisions. By combining real-time data, scientific crop logic, and AI, we provide personalized advice to maximize yield and income.

## ✨ Key Features

-   **🤖 AI Crop Advisor**: Get crop recommendations based on soil, water, and season.
    -   **Fertilizer Schedule**: Detailed timeline for nutrient application.
    -   **Profit Calculator**: Estimates revenue based on real-time market prices.
    -   **Full Guide**: Market demand, risk factors, and expert tips.
-   **💬 Kisan AI Assistant**: A 24/7 dedicated chatbot (powered by **Google Gemini**) to answer any farming query in simple language.
-   **💰 Live Mandi Prices**: Check real-time crop prices in your nearest mandi using government data (Open Government Data Platform India).
-   **tbl_Weather Updates**: Auto-detected location-based weather forecast to plan farming activities.
-   **🔐 Secure Access**: User authentication to save your farm profile and location.

## 🛠️ Tech Stack

### Frontend
-   **React + Vite**: For a blazing fast, modern UI.
-   **TailwindCSS**: For a premium, responsive, and accessible design.
-   **Lucide Icons**: Beautiful, lightweight vector icons.

### Backend
-   **Node.js & Express**: Robust and scalable server.
-   **MongoDB**: Flexible database for user profiles.
-   **Google Gemini API**: For the intelligent chatbot.
-   **OpenWeatherMap API**: For real-time weather data.
-   **data.gov.in API**: For live agricultural market prices.

## 👥 The Team
Built with ❤️ by students passionate about Agritech:
-   **Jatin** - Lead Developer
-   **Monish** - Frontend Architect
-   **Hemant** - Backend Specialist

## ⚡ Getting Started

1.  **Clone the repo**
    ```bash
    git clone https://github.com/yourusername/kisan-sahayak.git
    ```
2.  **Setup Backend**
    ```bash
    cd be
    npm install
    # Create .env file with MONGO_URL, SECRET_KEY, GEMINI_API_KEY, etc.
    npm run dev
    ```
3.  **Setup Frontend**
    ```bash
    cd ../fe
    npm install
    npm run dev
    ```
4.  **Open Browser**
    Visit `http://localhost:5173`

## 📬 Contact
Have questions? Reach out to us at [yshake1004@gmail.com](mailto:yshake1004@gmail.com).

---
*© 2025 Kisan Sahayak. Jai Jawan, Jai Kisan.* 🇮🇳
