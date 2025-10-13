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
        // User is logged in - fetch orders by user email
        fetchUserOrders();
      } else {
        // User is not logged in - show guest order lookup
        setLoading(false);
        setShowGuestLogin(true);
      }
    }
  }, [user, authLoading]);

  const fetchUserOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      const response = await fetch('/api/orders/my-orders', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to fetch orders');

      const data = await response.json();
      setOrders(data.orders || []);
    } catch (err) {
      setError('Failed to load your orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchGuestOrders = async (email) => {
    try {
      setLoading(true);
      
      const response = await fetch(`/api/orders/guest-orders?email=${encodeURIComponent(email)}`);
      
      if (!response.ok) throw new Error('Failed to fetch orders');

      const data = await response.json();
      setOrders(data.orders || []);
      setShowGuestLogin(false);
    } catch (err) {
      setError('No orders found for this email address');
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

      {orders.length === 0 && !showGuestLogin && !error ? (
        <div className="no-orders">
          <div className="no-orders-icon">📦</div>
          <h3>No orders found</h3>
          <p>We couldn't find any orders for {user?.email || guestEmail}.</p>
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
                  <h3>Order #{order._id.toString().slice(-6).toUpperCase()}</h3>
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
                  {order.status}
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
                  {order.shippingAddress.address}<br/>
                  {order.shippingAddress.city}, {order.shippingAddress.zipCode}<br/>
                  {order.shippingAddress.email}
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