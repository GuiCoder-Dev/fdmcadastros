import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080", // seu backend
});

export default api;