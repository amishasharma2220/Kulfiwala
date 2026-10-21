import API from "@/api";

// The auth token is attached automatically by the interceptor in api.js.
export const getMyProfile = () => API.get("/api/users/me");

export const updateMyProfile = (data) => API.put("/api/users/me", data);

export const addAddress = (data) => API.post("/api/users/me/addresses", data);

export const editAddress = (addressId, data) =>
  API.put(`/api/users/me/addresses/${addressId}`, data);

export const deleteAddress = (addressId) =>
  API.delete(`/api/users/me/addresses/${addressId}`);
