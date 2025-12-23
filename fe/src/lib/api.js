import axios from "axios";

// Use Vite env variable when available, otherwise fall back to relative /api
const baseURL = import.meta.env.VITE_API_URL || "/api";

const api = axios.create({
    baseURL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
