import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import OrderSummary from '../components/OrderSummary';
import './Cart.css';

const Cart = () => {
  const { items, clearCart } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleContinueShopping = () => {
    navigate('/products');
  };

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-hero">
          <h1>Shopping Cart</h1>
          <p>Your curated selection awaits</p>
        </div>
        
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your cart feels lonely</h2>
          <p>Add some amazing products to get started</p>
          <div className="empty-cart-actions">
            <button 
              onClick={handleContinueShopping} 
              className="continue-shopping-btn"
            >
              Start Shopping
            </button>
            <Link to="/" className="back-to-home">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="cart-page">
      <div className="cart-hero">
        <h1>Shopping Cart</h1>
        <p>Review your items and proceed to checkout</p>
      </div>

      <div className="cart-header">
        <div className="cart-stats">
          <span className="items-count">{totalItems} {totalItems === 1 ? 'item' : 'items'}</span>
          <span className="cart-subtotal">Subtotal: ${items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
        </div>
        <button 
          onClick={clearCart} 
          className="clear-cart-btn"
        >
          🗑️ Clear All
        </button>
      </div>
      
      <div className="cart-content">
        <div className="cart-items-section">
          <div className="cart-items">
            {items.map(item => (
              <CartItem key={`${item.id}-${item.size || ''}-${item.color || ''}`} item={item} />
            ))}
          </div>
          
          <div className="cart-continue-shopping">
            <button 
              onClick={handleContinueShopping} 
              className="continue-shopping-btn secondary"
            >
              ← Continue Shopping
            </button>
          </div>
        </div>
        
        <div className="cart-summary">
          <OrderSummary onCheckout={handleCheckout} />
        </div>
      </div>

      {/* Mobile Summary Sticky Bar */}
      <div className="mobile-summary-sticky">
        <div className="sticky-content">
          <div className="sticky-info">
            <span className="total-items">{totalItems} items</span>
            <span className="total-price">${items.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2)}</span>
          </div>
          <button onClick={handleCheckout} className="sticky-checkout-btn">
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;