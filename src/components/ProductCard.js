import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './ProductCard.css';

const ProductCard = ({ product, onAddToCart }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i === fullStars && hasHalfStar) {
        stars.push(<span key={i} className="star half">★</span>);
      } else {
        stars.push(<span key={i} className="star">☆</span>);
      }
    }
    return stars;
  };

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="product-link">
        <div className="product-image">
          <img 
            src={product.image} 
            alt={product.name}
            loading="lazy"
          />
          {product.originalPrice && (
            <div className="discount-badge">
              -{Math.round((1 - product.price / product.originalPrice) * 100)}%
            </div>
          )}
          {!product.inStock && (
            <div className="out-of-stock-badge">Out of Stock</div>
          )}
        </div>

        <div className="product-info">
          <span className="product-category">{product.category}</span>
          <h3 className="product-name">{product.name}</h3>
          <p className="product-description">{product.description}</p>
          
          <div className="product-rating">
            <div className="stars">
              {renderStars(product.rating || 0)}
            </div>
            <span className="rating-count">({product.reviews || 0})</span>
          </div>

          <div className="product-price">
            <span className="current-price">${product.price}</span>
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice}</span>
            )}
          </div>

          {product.tags && product.tags.length > 0 && (
            <div className="product-tags">
              {product.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="product-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
      </Link>

      <div className="product-actions">
        <button 
          className={`add-to-cart-btn ${!product.inStock ? 'disabled' : ''}`}
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          {!product.inStock ? 'Out of Stock' : 'Add to Cart'}
        </button>
        <button className="wishlist-btn" title="Add to Wishlist">
          ♡
        </button>
      </div>
    </div>
  );
};

export default ProductCard;