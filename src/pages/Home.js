import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Home.css';

// Featured products data
const featuredProducts = [
  { 
    id: '2', 
    name: "Smart Watch Series 5", 
    price: 249.99, 
    description: "Advanced fitness tracker with heart rate monitor, GPS, and 7-day battery life", 
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Electronics",
    featured: true
  },
  { 
    id: '7', 
    name: "Designer Running Shoes", 
    price: 129.99, 
    description: "Lightweight running shoes with advanced cushioning technology", 
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Fashion",
    featured: true
  },
  { 
    id: '12', 
    name: "Smart Coffee Maker", 
    price: 149.99, 
    description: "Programmable coffee maker with Wi-Fi connectivity and built-in grinder", 
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Home & Kitchen",
    featured: true
  },
  { 
    id: '17', 
    name: "Yoga Mat Premium", 
    price: 49.99, 
    description: "Eco-friendly yoga mat with excellent grip and cushioning", 
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Sports & Outdoors",
    featured: true
  },
  { 
    id: '22', 
    name: "Wireless Headphones", 
    price: 199.99, 
    description: "Premium over-ear headphones with exceptional sound quality", 
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Electronics",
    featured: true
  },
  { 
    id: '27', 
    name: "Skincare Set", 
    price: 79.99, 
    description: "Complete skincare routine with cleanser, toner, and moisturizer", 
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
    category: "Health & Beauty",
    featured: true
  }
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    // Auto slide for hero banner
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);

    return () => {
      clearTimeout(timer);
      clearInterval(slideTimer);
    };
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    // You can add a toast notification here
  };

  const heroSlides = [
    {
      title: "Summer Sale",
      subtitle: "Up to 50% off on selected items",
      image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      cta: "Shop Now"
    },
    {
      title: "New Arrivals",
      subtitle: "Discover the latest trends",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      cta: "Explore"
    },
    {
      title: "Free Shipping",
      subtitle: "On all orders over $50",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
      cta: "Learn More"
    }
  ];

  return (
    <div className="home-page">
      {/* Hero Banner with Slider */}
      <section className="hero-banner">
        <div className="hero-slider">
          {heroSlides.map((slide, index) => (
            <div 
              key={index}
              className={`hero-slide ${index === currentSlide ? 'active' : ''}`}
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <div className="slide-content">
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
                <Link to="/products" className="cta-button">
                  {slide.cta}
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="slider-dots">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2>Featured Products</h2>
            <p>Handpicked items just for you</p>
            <Link to="/products" className="view-all-btn">View All Products</Link>
          </div>
          
          {loading ? (
            <div className="products-loading">
              <div className="loading-spinner"></div>
              <p>Loading featured products...</p>
            </div>
          ) : (
            <div className="featured-grid">
              {featuredProducts.map(product => (
                <div key={product.id} className="featured-product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                    <div className="product-badge">Featured</div>
                  </div>
                  <div className="product-info">
                    <span className="product-category">{product.category}</span>
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">{product.description}</p>
                    <div className="product-price">${product.price}</div>
                    <button 
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">500+</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">24/7</div>
              <div className="stat-label">Customer Support</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">100%</div>
              <div className="stat-label">Secure Payment</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="container">
          <div className="section-header">
            <h2>Why Choose Us?</h2>
            <p>We provide the best shopping experience</p>
          </div>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚚</div>
              <h3>Free Shipping</h3>
              <p>Free delivery on orders over $50. Fast and reliable shipping worldwide.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>Your payments are safe with our encrypted payment processing system.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">↩️</div>
              <h3>Easy Returns</h3>
              <p>30-day return policy. No questions asked if you're not satisfied.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>24/7 Support</h3>
              <p>Our customer support team is always here to help you with any questions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for the latest products and exclusive offers</p>
            <div className="newsletter-form">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="newsletter-input"
              />
              <button className="newsletter-btn">Subscribe</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;