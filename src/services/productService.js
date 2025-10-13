import { API } from './api';

// 🛍️ Get all products
export const getAllProducts = async () => {
  try {
    const response = await API.get("/products");
    return response;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// 🔎 Get single product by ID
export const getProductById = async (productId) => {
  try {
    const response = await API.get(`/products/${productId}`);
    return response;
  } catch (error) {
    console.error('Error fetching product:', error);
    throw error;
  }
};

// 🆕 Add a new product (Admin only)
export const createProduct = async (productData) => {
  try {
    const response = await API.post("/products", productData);
    return response;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// ✏️ Update existing product (Admin only)
export const updateProduct = async (productId, productData) => {
  try {
    const response = await API.put(`/products/${productId}`, productData);
    return response;
  } catch (error) {
    console.error('Error updating product:', error);
    throw error;
  }
};

// ❌ Delete product (Admin only)
export const deleteProduct = async (productId) => {
  try {
    const response = await API.delete(`/products/${productId}`);
    return response;
  } catch (error) {
    console.error('Error deleting product:', error);
    throw error;
  }
};

// ⭐ Get top rated products
export const getTopProducts = async () => {
  try {
    const response = await API.get("/products/top");
    return response;
  } catch (error) {
    console.error('Error fetching top products:', error);
    throw error;
  }
};