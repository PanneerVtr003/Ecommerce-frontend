import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addToCart = (product) => {
    setItems((prevItems) => {
      const existing = prevItems.find(item => item.id === product.id);
      let newItems;
      
      if (existing) {
        newItems = prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [...prevItems, { ...product, quantity: 1 }];
      }
      
      return newItems;
    });
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setItems((prevItems) =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setItems((prevItems) => prevItems.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  const getCartItemsCount = () => 
    items.reduce((sum, item) => sum + item.quantity, 0);

  const getCartTotal = () => 
    items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{ 
      items, 
      addToCart, 
      removeFromCart, 
      updateQuantity,
      clearCart, 
      getCartItemsCount, 
      getCartTotal 
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};