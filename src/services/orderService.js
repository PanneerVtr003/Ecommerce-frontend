import { API } from './api';

// 📦 Create new order
export const createOrder = async (orderData) => {
  try {
    const response = await API.post("/orders", orderData);
    return response;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

// 📋 Get all orders for user
export const getOrders = async () => {
  try {
    const response = await API.get("/orders");
    return response;
  } catch (error) {
    console.error('Error fetching orders:', error);
    throw error;
  }
};

// 🔍 Get order by ID
export const getOrderById = async (orderId) => {
  try {
    const response = await API.get(`/orders/${orderId}`);
    return response;
  } catch (error) {
    console.error('Error fetching order:', error);
    throw error;
  }
};

// ✏️ Update order status (Admin only)
export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await API.put(`/orders/${orderId}`, { status });
    return response;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
};

// ❌ Cancel order
export const cancelOrder = async (orderId) => {
  try {
    const response = await API.delete(`/orders/${orderId}`);
    return response;
  } catch (error) {
    console.error('Error canceling order:', error);
    throw error;
  }
};