import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import './OrderSummary.css';

const OrderSummary = ({ onCheckout, showItems = true, compact = false }) => {
  const { items, getCartTotal, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const subtotal = getCartTotal();
  const shipping = subtotal > 50 ? 0 : subtotal > 0 ? 10 : 0; // Free shipping over $50
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleQuantityChange = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    updateQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId) => {
    removeFromCart(itemId);
  };

  const handleItemClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  if (items.length === 0) {
    return (
      <div className={`order-summary ${compact ? 'compact' : ''}`}>
        <h3>Order Summary</h3>
        <div className="empty-cart">
          <div className="empty-icon">🛒</div>
          <p>Your cart is empty</p>
          <button 
            onClick={() => navigate('/products')}
            className="continue-shopping-btn"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`order-summary ${compact ? 'compact' : ''}`}>
      <div className="summary-header">
        <h3>Order Summary</h3>
        <span className="item-count">({items.length} {items.length === 1 ? 'item' : 'items'})</span>
      </div>

      {/* Cart Items - Only show if showItems is true */}
      {showItems && (
        <div className="cart-items">
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <div 
                className="item-image"
                onClick={() => handleItemClick(item.id)}
              >
                <img 
                  src={item.image} 
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/80x80?text=No+Image';
                  }}
                />
              </div>
              
              <div className="item-details">
                <div 
                  className="item-info"
                  onClick={() => handleItemClick(item.id)}
                >
                  <h4 className="item-name">{item.name}</h4>
                  <p className="item-price">${item.price.toFixed(2)}</p>
                  {item.size && <span className="item-size">Size: {item.size}</span>}
                  {item.color && <span className="item-color">Color: {item.color}</span>}
                </div>
                
                <div className="item-controls">
                  <div className="quantity-controls">
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="quantity-btn"
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button 
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      className="quantity-btn"
                    >
                      +
                    </button>
                  </div>
                  
                  <button 
                    onClick={() => handleRemoveItem(item.id)}
                    className="remove-btn"
                    title="Remove item"
                  >
                    🗑️
                  </button>
                </div>
                
                <div className="item-total">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Order Totals */}
      <div className="order-totals">
        <div className="summary-item">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        
        <div className="summary-item">
          <span>Shipping</span>
          <span>
            {shipping === 0 ? (
              <span className="free-shipping">FREE</span>
            ) : (
              `$${shipping.toFixed(2)}`
            )}
          </span>
        </div>
        
        <div className="summary-item">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        {subtotal < 50 && (
          <div className="shipping-notice">
            <span>🎁 Add ${(50 - subtotal).toFixed(2)} more for free shipping!</span>
          </div>
        )}
        
        <div className="summary-total">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      
      {/* Checkout Button */}
      <button 
        onClick={onCheckout}
        disabled={items.length === 0}
        className="checkout-btn"
      >
        <span className="btn-text">Proceed to Checkout</span>
        <span className="btn-arrow">→</span>
      </button>

      {/* Security Badges */}
      <div className="security-features">
        <div className="security-badge">
          <span className="lock-icon">🔒</span>
          Secure Checkout
        </div>
        <div className="payment-methods">
          <span>💳</span>
          <span>📱</span>
          <span>💰</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;