const API_BASE_URL = "https://ecommerce-backend-9987.onrender.com/api";

// Generic request function
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

    // For DELETE requests that might not return content
    if (response.status === 204) {
      return {};
    }

    return await response.json();
  } catch (err) {
    throw new Error(err.message || "Network error");
  }
};

// HTTP helper functions
export const API = {
  get: (endpoint) => request("GET", endpoint),
  post: (endpoint, data) => request("POST", endpoint, data),
  put: (endpoint, data) => request("PUT", endpoint, data),
  delete: (endpoint) => request("DELETE", endpoint),
};

// =========================
// Order helpers
// =========================
export const createOrder = (orderData) => {
  const transformedItems = orderData.items.map((item) => ({
    productId: item.id,
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  }));

  return API.post("/orders", { 
    ...orderData, 
    items: transformedItems 
  });
};

export const getOrders = () => API.get("/orders");
export const getOrderById = (id) => API.get(`/orders/${id}`);

// =========================
// User auth helpers
// =========================
export const registerUser = (userData) => API.post("/users/register", userData);
export const loginUser = (userData) => API.post("/users/login", userData);
export const getProfile = () => API.get("/users/profile");
export const updateProfile = (userData) => API.put("/users/profile", userData);

// =========================
// Product helpers
// =========================
export const getProducts = (query = "") => API.get(`/products${query}`);
export const getProductById = (id) => API.get(`/products/${id}`);
export const createProduct = (data) => API.post("/products", data);
export const updateProduct = (id, data) => API.put(`/products/${id}`, data);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const createProductReview = (id, review) =>
  API.post(`/products/${id}/reviews`, review);
export const getTopProducts = () => API.get("/products/top");