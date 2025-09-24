// src/api/api.js

const isDevelopment = process.env.NODE_ENV === "development";

const API_BASE_URL = isDevelopment
  ? "http://localhost:5000/api" // backend local
  : "https://organic-food-backend.onrender.com/api";

const request = async (method, endpoint, data = null) => {
  const token = localStorage.getItem("token");
  const url = `${API_BASE_URL}${endpoint}`;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  if (data) {
    options.body = JSON.stringify(data);
  }

  const response = await fetch(url, options);

  if (response.status === 401) {
    // 🔑 Handle expired/invalid token
    localStorage.removeItem("token");
    window.location.href = "/login"; // redirect user
    throw new Error("Session expired. Please log in again.");
  }

  if (!response.ok) {
    let errorMessage = "API request failed";
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorMessage;
    } catch (e) {
      // fallback if error response is not JSON
    }
    throw new Error(errorMessage);
  }

  return response.json();
};

export const API = {
  get: (endpoint) => request("GET", endpoint),
  post: (endpoint, data) => request("POST", endpoint, data),
  put: (endpoint, data) => request("PUT", endpoint, data),
  delete: (endpoint) => request("DELETE", endpoint),
};
