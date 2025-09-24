import React from 'react';
import { useCart } from '../context/CartContext';
import './CartItem.css'; // Added missing CSS import

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(item.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };

  return (
    <div className="cart-item">
      <img 
        src={item.image || '/placeholder-image.jpg'} 
        alt={item.name}
        className="cart-item-image"
      />
      
      <div className="cart-item-details">
        <h4 className="cart-item-name">{item.name}</h4>
        <p className="cart-item-price">${item.price}</p>
      </div>
      
      <div className="cart-item-controls">
        <div className="quantity-controls">
          <button 
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            -
          </button>
          <span className="quantity">{item.quantity}</span>
          <button onClick={() => handleQuantityChange(item.quantity + 1)}>
            +
          </button>
        </div>
        
        <button 
          onClick={handleRemove}
          className="remove-btn"
        >
          Remove
        </button>
      </div>
      
      <div className="cart-item-total">
        ${(item.price * item.quantity).toFixed(2)}
      </div>
    </div>
  );
};

export default CartItem;