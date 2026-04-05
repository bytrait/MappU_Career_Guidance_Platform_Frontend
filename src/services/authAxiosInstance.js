// src/utils/authAxiosInstance.js
import axios from "axios";

const AuthAPI = axios.create({
  baseURL: import.meta.env.VITE_AUTH_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

export default AuthAPI;
