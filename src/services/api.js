// src/services/api.js
const isDevelopment = process.env.NODE_ENV === "development";

const API_BASE_URL = isDevelopment
  ? "http://localhost:5000/api"
  : "https://ecommerce-backend-9987.onrender.com/api";

const request = async (method, endpoint, data = null) => {
  const token = localStorage.getItem("token");
  const url = `${API_BASE_URL}${endpoint}`;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    ...(data && { body: JSON.stringify(data) }),
  };

  const response = await fetch(url, options);
  const responseData = await response.json();

  if (!response.ok) throw new Error(responseData.message || "API request failed");
  return responseData;
};

// EXPORT only once
export const API = {
  get: (endpoint) => request("GET", endpoint),
  post: (endpoint, data) => request("POST", endpoint, data),
  put: (endpoint, data) => request("PUT", endpoint, data),
  delete: (endpoint) => request("DELETE", endpoint),
};
