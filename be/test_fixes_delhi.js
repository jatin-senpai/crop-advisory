import axios from "axios";

const BASE_URL = "http://localhost:3000";

async function runTest() {
    const email = `delhi_${Date.now()}@example.com`;
    const password = "password123";

    try {
        // 1. Signup
        console.log(`Step 1: Signing up ${email}...`);
        await axios.post(`${BASE_URL}/signup`, {
            name: "Delhi Farmer",
            email: email,
            password: password,
            pincode: "110045" // South West Delhi
        });

        // 2. Signin
        console.log("Step 2: Signing in...");
        const signinRes = await axios.post(`${BASE_URL}/signin`, {
            email: email,
            password: password
        });
        const token = signinRes.data.token;
        console.log("Token obtained.");

        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        // 3. Test Weather
        console.log("Step 3: Testing Weather...");
        const weatherRes = await axios.get(`${BASE_URL}/weather`, config);
        console.log("Weather Result Name:", weatherRes.data.name);

        // 4. Test Prices
        console.log("Step 4: Testing Prices (Wheat)...");
        const pricesRes = await axios.get(`${BASE_URL}/prices?crop=Wheat`, config);
        console.log("Price Result:", pricesRes.data.price || pricesRes.data.message);

    } catch (e) {
        console.error("Test Failed:", e.response?.data || e.message);
    }
}

runTest();
