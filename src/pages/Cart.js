import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import CartItem from "../components/CartItem";
import OrderSummary from "../components/OrderSummary";
import "./Cart.css";

const Cart = () => {
  const { items, clearCart } = useCart();
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  // Show loading while auth is being checked
  if (loading) {
    return (
      <div className="cart-page">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading your cart...</p>
        </div>
      </div>
    );
  }

  const handleCheckout = () => {
    if (!user) {
      navigate("/login", { state: { from: "/cart" } });
      return;
    }
    navigate("/checkout");
  };

  const handleContinueShopping = () => navigate("/products");

  const handleClearCart = () => {
    if (showClearConfirm) {
      clearCart();
      setShowClearConfirm(false);
    } else {
      setShowClearConfirm(true);
      setTimeout(() => setShowClearConfirm(false), 3000);
    }
  };

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="cart-page">
        <div className="cart-hero">
          <h1>Shopping Cart</h1>
          <p>Your curated selection awaits</p>
        </div>

        <div className="empty-cart-container">
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added anything yet. Explore our products and find something you love!</p>
            
            <div className="empty-cart-actions">
              <button onClick={handleContinueShopping} className="btn btn-primary">
                🛍️ Start Shopping
              </button>
              <Link to="/" className="btn btn-secondary">
                ← Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      {/* Hero Section */}
      <div className="cart-hero">
        <h1>Shopping Cart</h1>
        <p>Review your items and proceed to checkout</p>
      </div>

      {/* Cart Header Stats */}
      <div className="cart-header">
        <div className="cart-stats">
          <div className="stat-item">
            <span className="stat-label">Items:</span>
            <span className="stat-value">{totalItems}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Subtotal:</span>
            <span className="stat-value">${subtotal.toFixed(2)}</span>
          </div>
        </div>

        <div className="cart-actions">
          <button 
            onClick={handleClearCart}
            className={`clear-cart-btn ${showClearConfirm ? "confirm" : ""}`}
            title="Clear all items from cart"
          >
            {showClearConfirm ? "✓ Confirm Clear" : "🗑️ Clear All"}
          </button>
        </div>
      </div>

      {/* Main Cart Content */}
      <div className="cart-content">
        {/* Cart Items Section */}
        <div className="cart-items-section">
          <h2 className="section-title">Cart Items ({totalItems})</h2>
          
          <div className="cart-items">
            {items.map((item) => (
              <CartItem 
                key={`${item.id}-${item.size || ""}-${item.color || ""}`} 
                item={item} 
              />
            ))}
          </div>

          {/* Continue Shopping Button */}
          <div className="cart-footer-actions">
            <button 
              onClick={handleContinueShopping} 
              className="btn btn-secondary-outline"
            >
              ← Continue Shopping
            </button>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <aside className="cart-summary">
          <OrderSummary 
            onCheckout={handleCheckout}
            showItems={false}
            compact={true}
          />
        </aside>
      </div>

      {/* Trust Badges */}
      <div className="cart-trust-section">
        <div className="trust-badge">
          <span className="trust-icon">✓</span>
          <span>Secure Checkout</span>
        </div>
        <div className="trust-badge">
          <span className="trust-icon">🚚</span>
          <span>Free Shipping on Orders Over $50</span>
        </div>
        <div className="trust-badge">
          <span className="trust-icon">↩️</span>
          <span>30-Day Returns</span>
        </div>
      </div>
    </div>
  );
};

export default Cart;