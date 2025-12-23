import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function testWeather() {
    const city = "Kapurthala";
    const appid = process.env.WEATHER_API_KEY;

    console.log(`Testing weather for: ${city} with API key: ${appid}`);

    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather`,
            {
                params: {
                    q: city,
                    units: 'metric',
                    appid: appid
                },
                httpsAgent: new (await import('https')).Agent({
                    rejectUnauthorized: false
                })
            }
        );
        console.log("Success!");
        console.log(JSON.stringify(response.data, null, 2));
    } catch (error) {
        console.error("Weather API Error:", error.response?.data || error.message);
    }
}

testWeather();
