import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // .env ichidan oladi
  withCredentials: false, // agar cookie/token kerak bo'lsa true qilasan
});

export default api;
