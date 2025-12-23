import axios from "axios";

async function createTestUser() {
    try {
        const response = await axios.post("http://localhost:3000/signup", {
            name: "Test User",
            email: "testuser@example.com",
            password: "password123",
            pincode: "144411"
        });
        console.log("Signup Success:", response.data);
    } catch (error) {
        console.error("Signup Error:", error.response?.data || error.message);
    }
}

async function signinTestUser() {
    try {
        const response = await axios.post("http://localhost:3000/signin", {
            email: "testuser@example.com",
            password: "password123"
        });
        console.log("Signin Success:", response.data);
        return response.data.token;
    } catch (error) {
        console.error("Signin Error:", error.response?.data || error.message);
    }
}

async function run() {
    await createTestUser();
    const token = await signinTestUser();
    if (token) {
        console.log("TOKEN:", token);
    }
}

run();
