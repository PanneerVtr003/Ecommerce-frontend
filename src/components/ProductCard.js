// components/ProductCard.js
import React from 'react';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
    // You can add a toast notification here
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={index < rating ? 'star filled' : 'star'}>
        {index < rating ? '★' : '☆'}
      </span>
    ));
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        
        {/* Badges */}
        {product.tags && product.tags.includes('Best Seller') && (
          <div className="product-badge">Best Seller</div>
        )}
        {product.tags && product.tags.includes('New') && (
          <div className="product-badge">New</div>
        )}
        
        {discountPercentage > 0 && (
          <div className="discount-badge">-{discountPercentage}%</div>
        )}
        
        <div className={`stock-badge ${!product.inStock ? 'out-of-stock' : ''}`}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </div>
        
        {product.fastDelivery && product.inStock && (
          <div className="delivery-badge">Fast Delivery</div>
        )}

        {/* Action Buttons */}
        <div className="product-actions">
          <button className="action-btn wishlist-btn" title="Add to Wishlist">
            ♡
          </button>
          <button className="action-btn quick-view-btn" title="Quick View">
            👁
          </button>
        </div>
      </div>

      <div className="product-info">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        
        <div className="product-rating">
          {renderStars(product.rating)}
          <span className="rating-value">({product.reviews})</span>
        </div>

        <div className="product-price-section">
          <div className="product-price">${product.price}</div>
          {product.originalPrice && (
            <div className="original-price">${product.originalPrice}</div>
          )}
        </div>

        {product.tags && product.tags.length > 0 && (
          <div className="product-tags">
            {product.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="product-tag">{tag}</span>
            ))}
          </div>
        )}

        <button 
          className="add-to-cart-btn"
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          <span>{product.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
          {product.inStock && <span className="cart-icon">🛒</span>}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;