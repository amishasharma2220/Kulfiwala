import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5001", // 👈 THIS CONNECTS FRONTEND TO BACKEND
});

export default API;