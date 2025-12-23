import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function testPrices() {
    const crop = "Wheat";
    const state = "Punjab";
    const district = "Kapurthala";
    const apiKey = process.env.DATA_GOV_API_KEY;

    console.log(`Testing prices for: ${crop} in ${district}, ${state}`);

    const params = {
        "api-key": apiKey,
        format: "json",
        limit: 5,
        "filters[commodity]": crop,
        "filters[state]": state,
        "filters[district]": district
    };

    try {
        const response = await axios.get(
            "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070",
            { params }
        );
        console.log("Success!");
        console.log(JSON.stringify(response.data.records, null, 2));
    } catch (error) {
        console.error("Price API Error:", error.response?.data || error.message);
    }
}

testPrices();
