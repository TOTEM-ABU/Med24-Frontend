import axios from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "";

const api = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
