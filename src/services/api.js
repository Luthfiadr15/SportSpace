import axios from "axios";

const api = axios.create({
  baseURL: "https://sportspace-production.up.railway.app",
});

export default api;