import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../services/api';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setError('Please login to view your orders');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        // Try to fetch from backend first
        const data = await getOrders();
        setOrders(data.orders || data);
      } catch (err) {
        console.error('Error fetching orders from API:', err);
        // Fallback to localStorage
        try {
          const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
          setOrders(storedOrders);
        } catch (parseError) {
          console.error('Error parsing stored orders:', parseError);
          setError('Failed to load orders');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  if (!user) {
    return (
      <div className="orders-page">
        <div className="orders-header">
          <h1>My Orders</h1>
        </div>
        <div className="auth-required">
          <p>Please log in to view your orders.</p>
          <button onClick={() => navigate('/login')} className="btn-primary">
            Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="orders-page">
        <div className="orders-header">
          <h1>My Orders</h1>
        </div>
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-page">
        <div className="orders-header">
          <h1>My Orders</h1>
        </div>
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="orders-page">
      <div className="orders-header">
        <h1>My Orders</h1>
        <p>Track and manage your purchases</p>
      </div>
      
      {orders.length === 0 ? (
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
            <div key={order.id || order._id} className="order-card">
              <div className="order-header">
                <div className="order-info">
                  <h3>Order #{order.id || order._id}</h3>
                  <span className="order-date">
                    {new Date(order.date || order.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <span className={`order-status ${order.status || 'processing'}`}>
                  {order.status || 'Processing'}
                </span>
              </div>
              
              <div className="order-details">
                <div className="order-total">
                  <strong>Total: ${(order.total || 0).toFixed(2)}</strong>
                </div>
                {order.paymentMethod && (
                  <div className="payment-method">
                    Payment: {order.paymentMethod === 'card' ? 'Credit Card' : 'Cash on Delivery'}
                  </div>
                )}
              </div>
              
              <div className="order-items">
                <h4>Items:</h4>
                {order.items && order.items.map((item, index) => (
                  <div key={item.id || index} className="order-item">
                    <div className="item-info">
                      <span className="item-name">{item.name}</span>
                      <span className="item-quantity">Qty: {item.quantity}</span>
                    </div>
                    <span className="item-price">
                      ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              {order.shippingAddress && (
                <div className="shipping-address">
                  <h4>Shipping Address:</h4>
                  <p>
                    {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                    {order.shippingAddress.address}<br />
                    {order.shippingAddress.city}, {order.shippingAddress.zipCode}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;