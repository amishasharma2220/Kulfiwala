import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://kulfiwala.onrender.com",
});

// attach token automatically
API.interceptors.request.use((req) => {
  try {
    const user = JSON.parse(localStorage.getItem("user") || "null");
    if (user?.token) {
      req.headers.Authorization = `Bearer ${user.token}`;
    }
  } catch {
    // ignore malformed stored user
  }
  return req;
});

// If the token is expired/invalid, sign the user out instead of leaving
// them stuck in a half-logged-in state.
API.interceptors.response.use(
  (res) => res,
  (error) => {
    const isAuthCall = error?.config?.url?.startsWith("/api/auth/");
    if (error?.response?.status === 401 && !isAuthCall && localStorage.getItem("user")) {
      localStorage.removeItem("user");
      window.location.assign("/login");
    }
    return Promise.reject(error);
  }
);

export default API;
