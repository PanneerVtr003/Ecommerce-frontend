import axios from "axios";

const API_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";

const api = axios.create({
  baseURL: API_URL,
});

// Attach token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // assuming you store JWT as 'token'
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const orderService = {
  // Create a new order
  async createOrder(orderData) {
    // Pass userId from the token payload or backend decodes it
    const response = await api.post("/orders", orderData);
    return response.data;
  },

  // Get all orders for the logged-in user
  async getOrders(userId) {
    // If backend uses JWT, userId may not be needed in URL
    const response = await api.get(`/orders/${userId}`);
    return response.data;
  },

  // Get single order by id
  async getOrderById(id) {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  // Update order status (admin functionality)
  async updateOrderStatus(id, status) {
    const response = await api.patch(`/orders/${id}/status`, { status });
    return response.data;
  },
};

export default orderService;
