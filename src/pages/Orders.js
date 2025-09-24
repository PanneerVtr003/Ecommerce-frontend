  import React, { useState, useEffect } from 'react';
  import { useAuth } from '../context/AuthContext';
  import { useNavigate } from 'react-router-dom';
  import './Orders.css';

  // Mock order service
  const orderService = {
    getOrders: async () => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve([]); // Return empty array for demo
        }, 1000);
      });
    }
  };

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
          const data = await orderService.getOrders();
          setOrders(data);
        } catch (err) {
          setError('Failed to fetch orders');
        } finally {
          setLoading(false);
        }
      };

      fetchOrders();
    }, [user]);

    if (!user) {
      return (
        <div className="orders-page">
          <h1>My Orders</h1>
          <p>Please log in to view your orders.</p>
          <button onClick={() => navigate('/login')} className="btn-primary">
            Login
          </button>
        </div>
      );
    }

    if (loading) return (
      <div className="orders-page">
        <h1>My Orders</h1>
        <div className="loading">Loading orders...</div>
      </div>
    );

    if (error) return (
      <div className="orders-page">
        <h1>My Orders</h1>
        <div className="error">{error}</div>
      </div>
    );

    return (
      <div className="orders-page">
        <h1>My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="no-orders">
            <p>You haven't placed any orders yet.</p>
            <button onClick={() => navigate('/products')} className="btn-primary">
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map(order => (
              <div key={order.id} className="order-card">
                <div className="order-header">
                  <h3>Order #{order.id}</h3>
                  <span className={`order-status ${order.status}`}>
                    {order.status}
                  </span>
                </div>
                
                <div className="order-details">
                  <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p>Total: ${order.total.toFixed(2)}</p>
                </div>
                
                <div className="order-items">
                  <h4>Items:</h4>
                  {order.items.map(item => (
                    <div key={item.id} className="order-item">
                      <span>{item.name}</span>
                      <span>Qty: {item.quantity}</span>
                      <span>${((item.price || 0) * (item.quantity || 0)).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  export default Orders;