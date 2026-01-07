// src/api.js

// =========================
// Base URL — LOCAL backend
// =========================
const API_BASE_URL = "https://ecommerce-backend-9987.onrender.com/api";

// =========================
// LocalStorage helpers
// =========================
export const setToken = (token) => localStorage.setItem("token", token);
export const getToken = () => localStorage.getItem("token");
export const removeToken = () => localStorage.removeItem("token");

// =========================
// Generic request function
// =========================
const request = async (method, endpoint, data = null) => {
  const token = getToken();
  const url = `${API_BASE_URL}${endpoint}`;

  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  };

  if (data && (method === "POST" || method === "PUT")) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      let errorMessage = "Server error";
      try {
        const errorData = await response.json();
        errorMessage = errorData.message || errorMessage;
      } catch {
        errorMessage = `HTTP ${response.status}: ${response.statusText}`;
      }
      throw new Error(errorMessage);
    }

    if (response.status === 204) return {}; // DELETE may return empty

    return await response.json();
  } catch (err) {
    throw new Error(err.message || "Network error");
  }
};

// =========================
// HTTP helper functions
// =========================
export const API = {
  get: (endpoint) => request("GET", endpoint),
  post: (endpoint, data) => request("POST", endpoint, data),
  put: (endpoint, data) => request("PUT", endpoint, data),
  delete: (endpoint) => request("DELETE", endpoint),
};

// =========================
// User Auth (local backend)
// =========================
export const registerUser = async (userData) => {
  const data = await API.post("/auth/register", userData);
  if (data.token) setToken(data.token);
  return data;
};

export const loginUser = async (userData) => {
  const data = await API.post("/auth/login", userData);
  if (data.token) setToken(data.token);
  return data;
};

export const logoutUser = () => removeToken();

export const getProfile = () => API.get("/auth/profile");
export const updateProfile = (userData) => API.put("/auth/profile", userData);

// =========================
// Password Reset
// =========================
export const forgotPassword = (email) =>
  API.post("/auth/forgot-password", { email });

export const resetPassword = (token, password) =>
  API.post(`/auth/reset-password/${token}`, { password });

// =========================
// Products
// =========================
export const getProducts = (query = "") => API.get(`/products${query}`);
export const getProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (data) => API.post("/products", data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const createProductReview = (id, review) =>
  API.post(`/products/${id}/reviews`, review);
export const getTopProducts = () => API.get("/products/top");

// =========================
// Orders
// =========================
export const createOrder = (orderData) => {
  const items = orderData.items.map((item) => ({
    productId: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  return API.post("/orders", { ...orderData, items });
};

export const getOrders = () => API.get("/orders");
export const getOrderById = (id) => API.get(`/orders/${id}`);
