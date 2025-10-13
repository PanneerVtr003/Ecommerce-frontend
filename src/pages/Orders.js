import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [showGuestLogin, setShowGuestLogin] = useState(false);
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authLoading) {
      if (user) {
        fetchUserOrders();
      } else {
        setLoading(false);
        setShowGuestLogin(true);
      }
    }
  }, [user, authLoading]);

  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      setError('');
      const token = localStorage.getItem('token');
      
      console.log('🔧 Fetching orders for user:', user?.email);

      const response = await fetch('https://ecommerce-backend-9987.onrender.com/api/orders/my-orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      console.log('🔧 Response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch orders`);
      }

      const data = await response.json();
      console.log('✅ Orders received:', data.orders);
      
      setOrders(data.orders || []);
    } catch (err) {
      console.error('❌ Orders fetch error:', err);
      setError('Failed to load your orders: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchGuestOrders = async (email) => {
    try {
      setLoading(true);
      setError('');
      
      console.log('🔧 Fetching guest orders for:', email);

      const response = await fetch(`https://ecommerce-backend-9987.onrender.com/api/orders/guest-orders?email=${encodeURIComponent(email)}`);
      
      console.log('🔧 Guest response status:', response.status);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: No orders found`);
      }

      const data = await response.json();
      console.log('✅ Guest orders received:', data.orders);
      
      setOrders(data.orders || []);
      setShowGuestLogin(false);
    } catch (err) {
      console.error('❌ Guest orders error:', err);
      setError('No orders found for this email address: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestOrderLookup = (e) => {
    e.preventDefault();
    if (guestEmail) {
      fetchGuestOrders(guestEmail);
    }
  };

  if (authLoading) {
    return (
      <div className="orders-page">
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="orders-page">
        <h1>My Orders</h1>
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track and manage your purchases</p>
        
        {user && (
          <div className="user-info">
            <span>Orders for: <strong>{user.email}</strong></span>
          </div>
        )}
      </div>

      {showGuestLogin && !user && (
        <div className="guest-order-lookup">
          <h3>Find Your Orders</h3>
          <p>Enter your email address to view your order history</p>
          <form onSubmit={handleGuestOrderLookup} className="guest-form">
            <input
              type="email"
              placeholder="Enter your email address"
              value={guestEmail}
              onChange={(e) => setGuestEmail(e.target.value)}
              required
            />
            <button type="submit" className="btn-primary">
              Find My Orders
            </button>
          </form>
          <p className="login-suggestion">
            Or <button onClick={() => navigate('/login')} className="link-button">login</button> to see all your orders
          </p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={user ? fetchUserOrders : () => setShowGuestLogin(true)} className="btn-secondary">
            Try Again
          </button>
        </div>
      )}

      {orders.length === 0 && !showGuestLogin && !error && !loading ? (
        <div className="no-orders">
          <div className="no-orders-icon">📦</div>
          <h3>No orders yet</h3>
          <p>You haven't placed any orders yet.</p>
          <button onClick={() => navigate('/products')} className="btn-primary">
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map(order => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order._id.toString().slice(-8).toUpperCase()}</h3>
                  <span className="order-date">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
                <span className={`order-status ${order.status}`}>
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>
              
              <div className="order-details">
                <div className="order-total">
                  <strong>Total: ${order.totalAmount.toFixed(2)}</strong>
                </div>
                <div className="payment-method">
                  Payment: {order.paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery'}
                </div>
              </div>
              
              <div className="order-items">
                <h4>Items ({order.items.length}):</h4>
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">Qty: {item.quantity}</span>
                    </div>
                    <span className="item-price">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="shipping-info">
                <h4>Shipping Address:</h4>
                <p>
                  {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br/>
                  {order.shippingAddress.email}<br/>
                  {order.shippingAddress.address}<br/>
                  {order.shippingAddress.city}, {order.shippingAddress.zipCode}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;