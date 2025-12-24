# 🌾 Kisan Sahayak - Smart Crop Advisory System

> **Empowering farmers with AI-driven insights for a profitable harvest.**

![Kisan Sahayak Banner](https://images.unsplash.com/photo-1625246333195-5848c42287f3?q=80&w=1200&auto=format&fit=crop)

## 🚀 Overview
**Kisan Sahayak** is a comprehensive digital platform designed to help small and marginal farmers in India make informed decisions. By combining real-time data, scientific crop logic, and AI, we provide personalized advice to maximize yield and income.

## ✨ Key Features

- **🤖 AI Crop Advisor**: Personalized crop recommendations based on soil type, water availability, and season.
    - **Fertilizer Schedule**: Detailed timeline for nutrient application.
    - **Profit Calculator**: Revenue estimates based on real-time market trends.
    - **Agronomic Guide**: In-depth data on market demand, risk factors, and intercropping.
- **💬 Kisan AI Assistant**: A 24/7 dedicated chatbot powered by **Google Gemini** to answer farming queries in local contexts.
- **💰 Live Mandi Prices**: Real-time crop price tracking from nearest mandis using **data.gov.in** (Open Government Data Platform India).
- **🌦️ Real-time Weather**: Accurate weather forecasts to help plan sowing, irrigation, and harvesting.
- **📖 About Us**: Learn about our mission to digitize Indian agriculture.
- **🔐 Secure Profiles**: Personalized dashboard that saves your farm location and preferences.

## 🛠️ Tech Stack

### Frontend
- **React + Vite**: Fast and interactive user interface.
- **TailwindCSS**: Modern, responsive design system.
- **Lucide Icons**: Intuitive iconography.
- **Axios**: Seamless API communication.

### Backend
- **Node.js & Express**: High-performance server architecture.
- **MongoDB**: Scalable database for user and farm data.
- **Google Gemini SDK**: Advanced AI capabilities.
- **OpenWeatherMap API**: Localized weather data.
- **Data.gov.in API**: Official market price feeds.

## ⚡ Getting Started

### 1. Prerequisites
- Node.js (v18+)
- MongoDB Atlas account or local MongoDB instance

### 2. Installation
```bash
# Clone the repository
git clone https://github.com/jatin-senpai/crop-advisory.git
cd crop-advisory
```

### 3. Backend Setup
```bash
cd be
npm install
```
Create a `.env` file in the `be` directory:
```env
PORT=3000
SECRET_KEY=your_jwt_secret
MONGO_URL=your_mongodb_connection_string
WEATHER_API_KEY=your_openweathermap_api_key
DATA_GOV_API_KEY=your_data_gov_india_api_key
GEMINI_API_KEY=your_google_gemini_api_key
```
Start the server:
```bash
npm run dev
```

### 4. Frontend Setup
```bash
cd ../fe
npm install
npm run dev
```
Visit `http://localhost:5173` to start using the app.

## 👥 Meet the Team
Built with ❤️ by students passionate about Agritech:
- **Jatin** - Lead Developer
- **Monish** - Frontend Architect
- **Hemant** - Backend Specialist

## 📬 Contact
Have questions or suggestions? Reach out at [yshake1004@gmail.com](mailto:yshake1004@gmail.com).

---
*© 2025 Kisan Sahayak. Jai Jawan, Jai Kisan.* 🇮🇳
