import axios from "axios";

const API = axios.create({
  baseURL: "https://kulfiwala.onrender.com",
});

export default API;