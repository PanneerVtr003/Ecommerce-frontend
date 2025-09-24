// src/services/productService.js

const BASE_URL = `${process.env.REACT_APP_BACKEND_URL}/api/products`;

export const productService = {
  getAllProducts: async () => {
    try {
      const response = await fetch(BASE_URL);

      // Check if response is JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        throw new Error('Server returned non-JSON response');
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // Backend returns { products, page, pages }, we only need products
      return data.products || [];
    } catch (error) {
      console.error('Service error:', error);
      throw error; // Throw to be handled by component
    }
  },
};
