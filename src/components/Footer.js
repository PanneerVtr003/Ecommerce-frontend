import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <span className="logo-icon">🛒</span>
            E-Store
          </div>
          <p className="footer-description">Your one-stop shop for all your needs. Quality products, fast delivery, and exceptional customer service.</p>
          <div className="social-links">
            <a href="#" className="social-link" aria-label="Facebook">
              <span className="social-icon">📘</span>
            </a>
            <a href="#" className="social-link" aria-label="Twitter">
              <span className="social-icon">🐦</span>
            </a>
            <a href="#" className="social-link" aria-label="Instagram">
              <span className="social-icon">📷</span>
            </a>
            <a href="#" className="social-link" aria-label="LinkedIn">
              <span className="social-icon">💼</span>
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/products" className="footer-link">Products</Link></li>
            <li><Link to="/about" className="footer-link">About Us</Link></li>
            <li><Link to="/contact" className="footer-link">Contact</Link></li>
            <li><Link to="/faq" className="footer-link">FAQ</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Customer Service</h4>
          <ul className="footer-links">
            <li><Link to="/shipping" className="footer-link">Shipping Info</Link></li>
            <li><Link to="/returns" className="footer-link">Returns & Refunds</Link></li>
            <li><Link to="/privacy" className="footer-link">Privacy Policy</Link></li>
            <li><Link to="/terms" className="footer-link">Terms of Service</Link></li>
            <li><Link to="/size-guide" className="footer-link">Size Guide</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4 className="footer-heading">Contact Info</h4>
          <div className="contact-info">
            <div className="contact-item">
              <span className="contact-icon">📧</span>
              <span>support@estore.com</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📞</span>
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="contact-item">
              <span className="contact-icon">📍</span>
              <span>123 Commerce St, Business City, BC 12345</span>
            </div>
          </div>
          
          
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-bottom-content">
          <p>&copy; 2024 E-Store. All rights reserved.</p>
          <div className="payment-methods">
            <span className="payment-icon">💳</span>
            <span className="payment-icon">🔵</span>
            <span className="payment-icon">📱</span>
            <span className="payment-icon">💰</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;