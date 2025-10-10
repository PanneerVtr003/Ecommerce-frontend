// components/Navbar.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { getCartItemsCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">🛒 E-Store</Link>

        <div className={`nav-menu ${isMenuOpen ? "active" : ""}`}>
          <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>🏠 Home</Link>
          <Link to="/products" className="nav-link" onClick={() => setIsMenuOpen(false)}>📦 Products</Link>

          {user ? (
            <>
              <Link to="/orders" className="nav-link" onClick={() => setIsMenuOpen(false)}>📋 Orders</Link>
              <div className="user-section">
                <span className="nav-user">👤 {user?.username}</span>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="nav-link logout-btn"
                >
                  🚪 Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link" onClick={() => setIsMenuOpen(false)}>🔑 Login</Link>
              <Link to="/register" className="nav-link" onClick={() => setIsMenuOpen(false)}>📝 Register</Link>
            </>
          )}

          <Link to="/cart" className="nav-link cart-link" onClick={() => setIsMenuOpen(false)}>
            🛒 Cart <span className="cart-count">{getCartItemsCount()}</span>
          </Link>
        </div>

        <div className={`menu-toggle ${isMenuOpen ? "active" : ""}`} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
