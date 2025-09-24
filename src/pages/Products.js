import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import './Products.css';

// Mock product service
const productService = {
  getAllProducts: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          // Electronics Category
          { 
            id: '1', 
            name: "Wireless Bluetooth Headphones", 
            price: 89.99, 
            description: "Noise-cancelling wireless headphones with 30-hour battery life and premium sound quality", 
            image: "https://media.istockphoto.com/id/913851526/photo/white-headphones.jpg?s=612x612&w=0&k=20&c=kTqOqtMIzwkLTBjVXOOyvRTpqGlrL68t9cidRiiLv8k=",
            category: "Electronics",
            rating: 4.5,
            reviews: 128
          },
          { 
            id: '2', 
            name: "Smart Watch Series 5", 
            price: 249.99, 
            description: "Advanced fitness tracker with heart rate monitor, GPS, and 7-day battery life", 
            image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            category: "Electronics",
            rating: 4.3,
            reviews: 89
          },
          { 
            id: '3', 
            name: "Wireless Earbuds Pro", 
            price: 129.99, 
            description: "True wireless earbuds with active noise cancellation and 24-hour battery", 
            image: "https://media.istockphoto.com/id/1185463126/photo/blank-promotional-wireless-earbuds-with-box-package-3d-render-illustration.jpg?s=612x612&w=0&k=20&c=JU9VLe0WbVJj2T1JWl4CEroeHOGuZgBgpoguwAjRHx0=",
            category: "Electronics",
            rating: 4.7,
            reviews: 203
          },
          { 
            id: '4', 
            name: "4K Ultra HD Smart TV", 
            price: 699.99, 
            description: "55-inch 4K Smart TV with HDR and built-in streaming apps", 
            image: "https://media.istockphoto.com/id/611077104/photo/uhd-4k-smart-tv-on-white-background.jpg?s=612x612&w=0&k=20&c=Sy-9HVJFf9xy7oDWbzNIlGsL97zRRi38PbCwDKfB6F0=",
            category: "Electronics",
            rating: 4.4,
            reviews: 67
          },
          { 
            id: '5', 
            name: "Gaming Laptop", 
            price: 1299.99, 
            description: "High-performance gaming laptop with RTX graphics and 16GB RAM", 
            image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            category: "Electronics",
            rating: 4.8,
            reviews: 156
          },

          // Fashion Category
          { 
            id: '6', 
            name: "Premium Leather Jacket", 
            price: 199.99, 
            description: "Genuine leather jacket with premium stitching and comfortable fit", 
            image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            category: "Fashion",
            rating: 4.6,
            reviews: 92
          },
          { 
            id: '7', 
            name: "Designer Running Shoes", 
            price: 129.99, 
            description: "Lightweight running shoes with advanced cushioning technology", 
            image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            category: "Fashion",
            rating: 4.2,
            reviews: 145
          },
          { 
            id: '8', 
            name: "Classic Wristwatch", 
            price: 159.99, 
            description: "Elegant analog wristwatch with leather strap and water resistance", 
            image: "https://media.istockphoto.com/id/697173746/photo/luxury-watch.jpg?s=612x612&w=0&k=20&c=GafBmooVbVN-HkNN-nfZqB_OGl3sSnfOwSD9Y8xIiqw=",
            category: "Fashion",
            rating: 4.5,
            reviews: 78
          },
          { 
            id: '9', 
            name: "Designer Handbag", 
            price: 299.99, 
            description: "Luxury leather handbag with multiple compartments and elegant design", 
            image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            category: "Fashion",
            rating: 4.7,
            reviews: 112
          },
          { 
            id: '10', 
            name: "Sunglasses Collection", 
            price: 89.99, 
            description: "UV protection sunglasses with polarized lenses and stylish frames", 
            image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            category: "Fashion",
            rating: 4.3,
            reviews: 201
          },

          // Home & Kitchen Category
          { 
            id: '11', 
            name: "Stainless Steel Cookware Set", 
            price: 199.99, 
            description: "10-piece non-stick cookware set with induction compatibility", 
            image: "https://media.istockphoto.com/id/612630426/photo/cooking-and-frying-pans-set-isolated-on-white.jpg?s=612x612&w=0&k=20&c=DRXyklLBjxec5I_WvC5QIMDYfHwc1tE2jMdPeEoOy-4=",
            category: "Home & Kitchen",
            rating: 4.4,
            reviews: 134
          },
          { 
            id: '12', 
            name: "Smart Coffee Maker", 
            price: 149.99, 
            description: "Programmable coffee maker with Wi-Fi connectivity and built-in grinder", 
            image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            category: "Home & Kitchen",
            rating: 4.6,
            reviews: 89
          },
          { 
            id: '13', 
            name: "Air Purifier", 
            price: 179.99, 
            description: "HEPA air purifier with smart sensors and auto mode", 
            image: "https://media.istockphoto.com/id/1209792325/photo/air-purifier-in-cozy-white-bed-room-for-filter-and-cleaning-removing-dust-pm2-5-hepa-in-home.jpg?s=612x612&w=0&k=20&c=BPe6uuammXVVigH-y397kOKQ80yrtNXe357a5PG2T6g=",
            category: "Home & Kitchen",
            rating: 4.2,
            reviews: 67
          },
          { 
            id: '14', 
            name: "Robot Vacuum Cleaner", 
            price: 299.99, 
            description: "Smart robot vacuum with mapping technology and app control", 
            image: "https://media.istockphoto.com/id/2174828843/photo/robot-vacuum-cleaner.jpg?s=612x612&w=0&k=20&c=r1dxHJ1ZMH0I9vCMo2VrcM3sDblNoGOjnmZP5UqHAXs=",
            category: "Home & Kitchen",
            rating: 4.5,
            reviews: 178
          },
          { 
            id: '15', 
            name: "Electric Standing Desk", 
            price: 399.99, 
            description: "Height-adjustable standing desk with memory settings and USB ports", 
            image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            category: "Home & Kitchen",
            rating: 4.7,
            reviews: 95
          },

          // Sports & Outdoors Category
          { 
            id: '16', 
            name: "Mountain Bike", 
            price: 599.99, 
            description: "21-speed mountain bike with aluminum frame and front suspension", 
            image: "https://media.istockphoto.com/id/1211537276/photo/blue-modern-mid-drive-motor-e-bike-pedelec-with-electric-engine-middle-mount-battery-powered.jpg?s=612x612&w=0&k=20&c=AVfBh0wz5DwvLRndvE0Nu9ElofOPxFzVOTfb4UD6hYY=",
            category: "Sports & Outdoors",
            rating: 4.8,
            reviews: 56
          },
          { 
            id: '17', 
            name: "Yoga Mat Premium", 
            price: 49.99, 
            description: "Eco-friendly yoga mat with excellent grip and cushioning", 
            image: "https://media.istockphoto.com/id/2211025866/photo/poolside-towel-rolls.jpg?s=612x612&w=0&k=20&c=HC2QREHTB8WwT0hKZice03KQHD663ZQxvhUwBf8goU0=",
            category: "Sports & Outdoors",
            rating: 4.3,
            reviews: 212
          },
          { 
            id: '18', 
            name: "Camping Tent 4-Person", 
            price: 199.99, 
            description: "Weather-resistant camping tent with easy setup and ventilation", 
            image: "https://media.istockphoto.com/id/1222972663/photo/orange-tent-on-the-lake-at-dusk.jpg?s=612x612&w=0&k=20&c=GEUa6AMvjkW0JHdPivj8bmPG2lforVGPwIqYSIgkk9c=",
            category: "Sports & Outdoors",
            rating: 4.1,
            reviews: 78
          },
          { 
            id: '19', 
            name: "Fitness Tracker", 
            price: 79.99, 
            description: "Waterproof fitness tracker with heart rate monitor and sleep tracking", 
            image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            category: "Sports & Outdoors",
            rating: 4.4,
            reviews: 189
          },
          { 
            id: '20', 
            name: "Portable Bluetooth Speaker", 
            price: 89.99, 
            description: "Waterproof portable speaker with 360° sound and 20-hour battery", 
            image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60",
            category: "Sports & Outdoors",
            rating: 4.6,
            reviews: 145
          }
        ]);
      }, 500);
    });
  }
};

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError('');
        const data = await productService.getAllProducts();
        setProducts(data);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to fetch products from server.');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter, search and sort products
  const filteredProducts = products.filter(product => {
    const matchesCategory = filter === 'all' || product.category === filter;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  const categories = ['all', ...new Set(products.map(product => product.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="products-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Discovering amazing products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-hero">
        <h1>Discover Amazing Products</h1>
        <p>Find everything you need with our curated collection</p>
      </div>

      <div className="products-controls">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <span className="search-icon">🔍</span>
        </div>

        <div className="controls-row">
          <div className="filter-controls">
            <label>Category:</label>
            <div className="category-buttons">
              <button 
                className={`category-btn ${filter === 'all' ? 'active' : ''}`}
                onClick={() => setFilter('all')}
              >
                All
              </button>
              {categories.filter(cat => cat !== 'all').map(category => (
                <button
                  key={category}
                  className={`category-btn ${filter === category ? 'active' : ''}`}
                  onClick={() => setFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="sort-controls">
            <label>Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="sort-select"
            >
              <option value="name">Name (A-Z)</option>
              <option value="price-low">Price (Low to High)</option>
              <option value="price-high">Price (High to Low)</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="products-info">
        <span className="products-count">{sortedProducts.length} products found</span>
        {searchTerm && (
          <span className="search-term">for "{searchTerm}"</span>
        )}
        {filter !== 'all' && (
          <span className="category-filter">in {filter}</span>
        )}
      </div>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      <div className="products-grid">
        {sortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {sortedProducts.length === 0 && !loading && (
        <div className="no-products">
          <div className="no-products-content">
            <h3>No products found</h3>
            <p>Try adjusting your search or filter criteria</p>
            <button 
              onClick={() => {
                setFilter('all');
                setSearchTerm('');
              }} 
              className="reset-filters-btn"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;