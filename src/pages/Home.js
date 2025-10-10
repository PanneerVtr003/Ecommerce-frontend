import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './Home.css';

// Featured products data with HD images
const featuredProducts = [
  { 
    id: '2', 
    name: "Smart Watch Series 5", 
    price: 249.99, 
    originalPrice: 299.99,
    description: "Advanced fitness tracker with heart rate monitor, GPS, and 7-day battery life", 
    image: "https://images.unsplash.com/photo-1544117519-31a4b719223d?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    category: "Electronics",
    featured: true,
    rating: 4.5,
    reviews: 128,
    tags: ["New", "Popular", "Sale"],
    colors: ["Black", "Silver", "Rose Gold"]
  },
  { 
    id: '7', 
    name: "Designer Running Shoes", 
    price: 129.99, 
    originalPrice: 159.99,
    description: "Lightweight running shoes with advanced cushioning technology and breathable mesh", 
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    category: "Fashion",
    featured: true,
    rating: 4.3,
    reviews: 89,
    tags: ["Best Seller", "Limited"],
    sizes: ["7", "8", "9", "10", "11"]
  },
  { 
    id: '12', 
    name: "Smart Coffee Maker", 
    price: 149.99, 
    description: "Programmable coffee maker with Wi-Fi connectivity and built-in grinder", 
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    category: "Home & Kitchen",
    featured: true,
    rating: 4.7,
    reviews: 203,
    tags: ["Smart Home", "New"],
    features: ["Wi-Fi Connected", "Voice Control", "12-cup Capacity"]
  },
  { 
    id: '17', 
    name: "Yoga Mat Premium", 
    price: 49.99, 
    originalPrice: 69.99,
    description: "Eco-friendly yoga mat with excellent grip and cushioning for all yoga types", 
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    category: "Sports & Outdoors",
    featured: true,
    rating: 4.4,
    reviews: 156,
    tags: ["Eco-Friendly", "Sale"],
    colors: ["Purple", "Blue", "Green"]
  },
  { 
    id: '22', 
    name: "Wireless Headphones", 
    price: 199.99, 
    description: "Premium over-ear headphones with exceptional sound quality and noise cancellation", 
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    category: "Electronics",
    featured: true,
    rating: 4.8,
    reviews: 312,
    tags: ["Premium", "Noise Cancelling"],
    features: ["30hr Battery", "Fast Charge", "Bluetooth 5.0"]
  },
  { 
    id: '27', 
    name: "Skincare Set", 
    price: 79.99, 
    originalPrice: 99.99,
    description: "Complete skincare routine with cleanser, toner, and moisturizer for all skin types", 
    image: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    category: "Health & Beauty",
    featured: true,
    rating: 4.6,
    reviews: 178,
    tags: ["Organic", "Sale"],
    skinTypes: ["Dry", "Oily", "Combination", "Sensitive"]
  }
];

// Categories data with HD images
const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    description: "Latest gadgets and tech",
    productCount: 156
  },
  {
    id: 2,
    name: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    description: "Trendy clothing & accessories",
    productCount: 234
  },
  {
    id: 3,
    name: "Home & Kitchen",
    image: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    description: "Everything for your home",
    productCount: 189
  },
  {
    id: 4,
    name: "Sports & Outdoors",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    description: "Gear for active lifestyle",
    productCount: 127
  }
];

// Testimonials data with HD images
const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Frequent Shopper",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    rating: 5,
    comment: "Amazing shopping experience! The products are high quality and delivery was super fast. Will definitely shop again!",
    verified: true
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "Tech Enthusiast",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    rating: 4,
    comment: "Great selection of electronics at competitive prices. Customer service was very helpful when I had questions.",
    verified: true
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Fashion Blogger",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    rating: 5,
    comment: "Love the fashion collection! Always find unique pieces that stand out. Quality exceeds expectations.",
    verified: true
  }
];

// Special offers data with HD images
const specialOffers = [
  {
    id: 1,
    title: "Flash Sale",
    subtitle: "Ends in 24 hours",
    discount: "50% OFF",
    category: "Electronics",
    image: "https://images.unsplash.com/photo-1607082350899-7e105aa886ae?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    code: "FLASH50"
  },
  {
    id: 2,
    title: "Weekend Special",
    subtitle: "This weekend only",
    discount: "30% OFF",
    category: "Fashion",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    code: "WEEKEND30"
  },
  {
    id: 3,
    title: "New Customer",
    subtitle: "First order",
    discount: "20% OFF",
    category: "All Items",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
    code: "WELCOME20"
  }
];

// Social proof images with real HD images
const socialImages = [
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3", // Fashion shopping
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3", // Clothing store
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3", // Watch
  "https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3", // Shoes
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3", // Headphones
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&auto=format&fit=crop&q=80&ixlib=rb-4.0.3"  // Sneakers
];

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [loading, setLoading] = useState(true);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Auto slide for hero banner
    const slideTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3);
    }, 5000);

    // Auto slide for testimonials
    const testimonialTimer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 7000);

    return () => {
      clearTimeout(timer);
      clearInterval(slideTimer);
      clearInterval(testimonialTimer);
    };
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    // You can add a toast notification here
    console.log(`Added ${product.name} to cart`);
  };

  const handleQuickView = (product) => {
    // Implement quick view modal
    console.log(`Quick view: ${product.name}`);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      setNewsletterEmail('');
      setTimeout(() => setNewsletterSubmitted(false), 3000);
    }
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <span key={index} className={index < rating ? 'star filled' : 'star'}>
        {index < rating ? '★' : '☆'}
      </span>
    ));
  };

  const heroSlides = [
    {
      title: "Summer Sale",
      subtitle: "Up to 50% off on selected items. Limited time offer!",
      image: "https://images.unsplash.com/photo-1607082349566-187342175e2f?w=1800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      cta: "Shop Now",
      badge: "Hot Deal"
    },
    {
      title: "New Arrivals",
      subtitle: "Discover the latest trends and innovations",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      cta: "Explore",
      badge: "New"
    },
    {
      title: "Free Shipping",
      subtitle: "On all orders over $50. Worldwide delivery available",
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1800&auto=format&fit=crop&q=80&ixlib=rb-4.0.3",
      cta: "Learn More",
      badge: "Free"
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
              style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url(${slide.image})` }}
            >
              <div className="slide-content">
                {slide.badge && <span className="slide-badge">{slide.badge}</span>}
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
                <div className="slide-actions">
                  <Link to="/products" className="cta-button primary">
                    {slide.cta}
                  </Link>
                  <Link to="/about" className="cta-button secondary">
                    Learn More
                  </Link>
                </div>
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
        <div className="scroll-indicator">
          <span>Scroll Down</span>
          <div className="scroll-arrow"></div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="categories-section">
        <div className="container">
          <div className="section-header">
            <h2>Shop by Category</h2>
            <p>Find exactly what you're looking for</p>
          </div>
          <div className="categories-grid">
            {categories.map(category => (
              <Link key={category.id} to={`/products?category=${category.name}`} className="category-card">
                <div className="category-image">
                  <img src={category.image} alt={category.name} loading="lazy" />
                  <div className="category-overlay">
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                    <span className="product-count">{category.productCount} products</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      <section className="special-offers">
        <div className="container">
          <div className="section-header">
            <h2>Special Offers</h2>
            <p>Don't miss these limited time deals</p>
          </div>
          <div className="offers-grid">
            {specialOffers.map(offer => (
              <div key={offer.id} className="offer-card">
                <div className="offer-image">
                  <img src={offer.image} alt={offer.title} loading="lazy" />
                  <div className="offer-badge">{offer.discount}</div>
                </div>
                <div className="offer-content">
                  <h3>{offer.title}</h3>
                  <p>{offer.subtitle}</p>
                  <span className="offer-category">{offer.category}</span>
                  <div className="offer-code">
                    Use code: <strong>{offer.code}</strong>
                  </div>
                  <Link to="/products" className="offer-button">Shop Now</Link>
                </div>
              </div>
            ))}
          </div>
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
                    <img src={product.image} alt={product.name} loading="lazy" />
                    <div className="product-badge">Featured</div>
                    {product.originalPrice && (
                      <div className="discount-badge">
                        -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                      </div>
                    )}
                    <div className="product-actions">
                      <button 
                        className="action-btn wishlist-btn"
                        title="Add to Wishlist"
                      >
                        ♡
                      </button>
                      <button 
                        className="action-btn quick-view-btn"
                        onClick={() => handleQuickView(product)}
                        title="Quick View"
                      >
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

                    <div className="product-tags">
                      {product.tags?.map((tag, index) => (
                        <span key={index} className="product-tag">{tag}</span>
                      ))}
                    </div>

                    <button 
                      className="add-to-cart-btn"
                      onClick={() => handleAddToCart(product)}
                    >
                      <span>Add to Cart</span>
                      <span className="cart-icon">🛒</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <div className="container">
          <div className="section-header">
            <h2>What Our Customers Say</h2>
            <p>Real reviews from real customers</p>
          </div>
          <div className="testimonials-container">
            <div className="testimonials-slider">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial.id}
                  className={`testimonial-card ${index === currentTestimonial ? 'active' : ''}`}
                >
                  <div className="testimonial-content">
                    <div className="testimonial-rating">
                      {renderStars(testimonial.rating)}
                    </div>
                    <p className="testimonial-text">"{testimonial.comment}"</p>
                    <div className="testimonial-author">
                      <img src={testimonial.image} alt={testimonial.name} loading="lazy" />
                      <div className="author-info">
                        <h4>{testimonial.name}</h4>
                        <p>{testimonial.role}</p>
                        {testimonial.verified && <span className="verified-badge">✓ Verified</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="testimonial-dots">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentTestimonial ? 'active' : ''}`}
                  onClick={() => setCurrentTestimonial(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="statistics">
        <div className="container">
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-icon">👥</div>
              <div className="stat-number">10,000+</div>
              <div className="stat-label">Happy Customers</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">📦</div>
              <div className="stat-number">500+</div>
              <div className="stat-label">Products</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">🚚</div>
              <div className="stat-number">50+</div>
              <div className="stat-label">Countries Served</div>
            </div>
            <div className="stat-item">
              <div className="stat-icon">⭐</div>
              <div className="stat-number">4.8/5</div>
              <div className="stat-label">Customer Rating</div>
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
              <p>Free delivery on orders over $50. Fast and reliable shipping worldwide with real-time tracking.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔒</div>
              <h3>Secure Payment</h3>
              <p>Your payments are safe with our encrypted payment processing system. Multiple payment options available.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">↩️</div>
              <h3>Easy Returns</h3>
              <p>30-day return policy. No questions asked if you're not satisfied. Easy return process.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💬</div>
              <h3>24/7 Support</h3>
              <p>Our customer support team is always here to help you with any questions via chat, email, or phone.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⭐</div>
              <h3>Quality Guarantee</h3>
              <p>All products are carefully selected and quality-checked to ensure your complete satisfaction.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>Eco-Friendly</h3>
              <p>We're committed to sustainability with eco-friendly packaging and responsible sourcing.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <h2>Stay Updated</h2>
            <p>Subscribe to our newsletter for the latest products, exclusive offers, and shopping tips</p>
            
            {newsletterSubmitted ? (
              <div className="newsletter-success">
                <div className="success-icon">✓</div>
                <p>Thank you for subscribing! Check your email for a welcome offer.</p>
              </div>
            ) : (
              <form className="newsletter-form" onSubmit={handleNewsletterSubmit}>
                <div className="form-group">
                  <input 
                    type="email" 
                    placeholder="Enter your email address" 
                    className="newsletter-input"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    required
                  />
                  <button type="submit" className="newsletter-btn">
                    Subscribe
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
                <p className="newsletter-note">
                  By subscribing, you agree to our Privacy Policy and consent to receive updates.
                </p>
              </form>
            )}
            
            <div className="newsletter-benefits">
              <div className="benefit-item">
                <span>🎁</span>
                <span>Exclusive Offers</span>
              </div>
              <div className="benefit-item">
                <span>👑</span>
                <span>VIP Early Access</span>
              </div>
              <div className="benefit-item">
                <span>💡</span>
                <span>Shopping Tips</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram/ Social Proof Section */}
      <section className="social-proof">
        <div className="container">
          <div className="section-header">
            <h2>Follow Us @ShopStyle</h2>
            <p>See how our customers style their purchases</p>
          </div>
          <div className="social-grid">
            {socialImages.map((image, index) => (
              <div key={index} className="social-item">
                <img 
                  src={image}
                  alt={`Social post ${index + 1}`}
                  loading="lazy"
                />
                <div className="social-overlay">
                  <span className="social-likes">❤️ {Math.floor(Math.random() * 2000) + 500}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;