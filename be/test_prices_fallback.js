import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

async function testPricesFallback() {
    const crop = "Wheat";
    const state = "Punjab";
    const apiKey = process.env.DATA_GOV_API_KEY;

    console.log(`Testing prices for: ${crop} in ${state} (state fallback)`);

    const params = {
        "api-key": apiKey,
        format: "json",
        limit: 30,
        "filters[commodity]": crop,
        "filters[state]": state
    };

    try {
        const response = await axios.get(
            "https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070",
            { params }
        );
        console.log("Success!");
        console.log(`Found ${response.data.records?.length || 0} records.`);
        if (response.data.records?.length > 0) {
            console.log(JSON.stringify(response.data.records[0], null, 2));
        }
    } catch (error) {
        console.error("Price API Error:", error.response?.data || error.message);
    }
}

testPricesFallback();
