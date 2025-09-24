import React from 'react';
import { useCart } from '../context/CartContext';
import './OrderSummary.css'; // Added missing CSS import

const OrderSummary = ({ onCheckout }) => {
  const { items, getCartTotal } = useCart();

  const subtotal = getCartTotal();
  const shipping = subtotal > 0 ? 10 : 0;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  return (
    <div className="order-summary">
      <h3>Order Summary</h3>
      
      <div className="summary-item">
        <span>Subtotal</span>
        <span>${subtotal.toFixed(2)}</span>
      </div>
      
      <div className="summary-item">
        <span>Shipping</span>
        <span>${shipping.toFixed(2)}</span>
      </div>
      
      <div className="summary-item">
        <span>Tax</span>
        <span>${tax.toFixed(2)}</span>
      </div>
      
      <div className="summary-total">
        <span>Total</span>
        <span>${total.toFixed(2)}</span>
      </div>
      
      <button 
        onClick={onCheckout}
        disabled={items.length === 0}
        className="checkout-btn"
      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default OrderSummary;