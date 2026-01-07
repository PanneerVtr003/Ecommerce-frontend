import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../services/api";
import "./Checkout.css";

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [formErrors, setFormErrors] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [paymentCode, setPaymentCode] = useState("");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: user?.email || "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    saveInfo: false,
  });

  useEffect(() => {
    if (user?.email) {
      setFormData(prev => ({
        ...prev,
        email: user.email
      }));
    }

    const savedInfo = localStorage.getItem("savedShippingInfo");
    if (savedInfo) {
      try {
        const parsedInfo = JSON.parse(savedInfo);
        setFormData((prev) => ({
          ...prev,
          ...parsedInfo,
          email: user?.email || prev.email,
        }));
      } catch (err) {
        console.error('Error parsing saved shipping info:', err);
      }
    }
  }, [user]);

  const generatePaymentCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const zipRegex = /^\d{5}(-\d{4})?$/;

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!emailRegex.test(formData.email)) errors.email = "Valid email is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!zipRegex.test(formData.zipCode)) errors.zipCode = "Valid ZIP code is required";

    if (paymentMethod === "card") {
      const cardRegex = /^\d{13,19}$/;
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      const cvvRegex = /^\d{3,4}$/;

      const cleanCardNumber = formData.cardNumber.replace(/\s/g, "");
      if (!cardRegex.test(cleanCardNumber))
        errors.cardNumber = "Valid card number (13-19 digits) is required";
      if (!expiryRegex.test(formData.expiryDate))
        errors.expiryDate = "Valid expiry date (MM/YY) is required";
      if (!cvvRegex.test(formData.cvv)) errors.cvv = "Valid CVV is required";

      // Check if card is expired
      if (formData.expiryDate && expiryRegex.test(formData.expiryDate)) {
        const [month, year] = formData.expiryDate.split("/");
        const expiry = new Date(2000 + parseInt(year), parseInt(month));
        const currentDate = new Date();
        if (expiry <= currentDate) errors.expiryDate = "Card has expired";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: "" });
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{1,16}/g);
    const match = matches ? matches[0] : "";
    const parts = [];
    for (let i = 0; i < match.length; i += 4) {
      
      parts.push(match.substring(i, i + 4));
    }
    return parts.length ? parts.join(" ") : value;
  };

  const handleCardNumberChange = (e) => {
    const formattedValue = formatCardNumber(e.target.value);
    setFormData({ ...formData, cardNumber: formattedValue });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!validateForm()) {
    setError("Please fix the form errors before submitting");
    return;
  }

  setLoading(true);
  setError("");

  try {
    // Prepare order data
    const orderData = {
      items: items,
      total: getCartTotal(),
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        country: 'United States'
      },
      paymentMethod: paymentMethod,
      paymentCode: paymentMethod === 'cod' ? paymentCode : null
    };

    console.log('🛒 Sending order to backend:', orderData);

    // Send order to backend
    const response = await fetch('https://ecommerce-backend-9987.onrender.com/api/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(orderData)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to create order');
    }

    console.log('✅ Order created successfully:', data);

    // Clear cart and show success
    clearCart();
    setOrderId(data.order._id || data.order.id);
    setOrderSuccess(true);
    
  } catch (err) {
    console.error('❌ Order creation failed:', err);
    setError(err.message || "Failed to create order. Please try again.");
  } finally {
    setLoading(false);
  }
};

  // ✅ Success screen
  if (orderSuccess) {
    return (
      <div className="checkout-page">
        <div className="success-container">
          <div className="success-animation">
            <div className="success-icon">🎉</div>
            <div className="success-circle"></div>
          </div>
          <div className="success-message">
            <h2>Order Placed Successfully!</h2>
            <p>
              Your order ID is: <span className="order-id">{orderId}</span>
            </p>

            {paymentMethod === "cod" && paymentCode && (
              <div className="payment-code-section">
                <h3>Cash on Delivery Payment Code</h3>
                <div className="payment-code">{paymentCode}</div>
                <p className="payment-instructions">
                  Please provide this code to the delivery person when making your payment.
                </p>
              </div>
            )}

            <p className="success-thankyou">
              Thank you for your purchase. You will receive a confirmation email shortly.
            </p>
            <div className="success-actions">
              <button className="btn-primary" onClick={() => navigate("/orders")}>
                View Your Orders
              </button>
              <button className="btn-secondary" onClick={() => navigate("/products")}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ✅ Empty cart state
  if (items.length === 0 && !orderSuccess) {
    return (
      <div className="checkout-page">
        <div className="empty-checkout">
          <div className="empty-icon">🛒</div>
          <h2>Your cart is empty</h2>
          <p>Add some items to your cart before checking out.</p>
          <button onClick={() => navigate("/products")} className="btn-primary">
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  // ✅ Main checkout form
  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Checkout</h1>
      </div>

      <div className="checkout-container">
        <div className="checkout-form-container">
          {error && (
            <div className="error-message">
              <span className="error-icon">⚠️</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="checkout-form">
            {/* Contact Info */}
            <div className="form-section">
              <h2 className="section-title">👤 Contact Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={formErrors.firstName ? 'error' : ''}
                  />
                  {formErrors.firstName && <span className="field-error">{formErrors.firstName}</span>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={formErrors.lastName ? 'error' : ''}
                  />
                  {formErrors.lastName && <span className="field-error">{formErrors.lastName}</span>}
                </div>
              </div>
              <div className="form-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={formErrors.email ? 'error' : ''}
                />
                {formErrors.email && <span className="field-error">{formErrors.email}</span>}
              </div>
            </div>

            {/* Shipping */}
            <div className="form-section">
              <h2 className="section-title">📍 Shipping Address</h2>
              <div className="form-group">
                <input
                  type="text"
                  name="address"
                  placeholder="Street Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={formErrors.address ? 'error' : ''}
                />
                {formErrors.address && <span className="field-error">{formErrors.address}</span>}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={formErrors.city ? 'error' : ''}
                  />
                  {formErrors.city && <span className="field-error">{formErrors.city}</span>}
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={formErrors.zipCode ? 'error' : ''}
                  />
                  {formErrors.zipCode && <span className="field-error">{formErrors.zipCode}</span>}
                </div>
              </div>
            </div>

            {/* Payment */}
            <div className="form-section">
              <h2 className="section-title">💳 Payment Method</h2>
              <div className="payment-options">
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  <span>Cash on Delivery</span>
                </label>
              </div>

              {paymentMethod === "card" && (
                <div className="card-details">
                  <div className="form-group">
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      className={formErrors.cardNumber ? 'error' : ''}
                    />
                    {formErrors.cardNumber && <span className="field-error">{formErrors.cardNumber}</span>}
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className={formErrors.expiryDate ? 'error' : ''}
                      />
                      {formErrors.expiryDate && <span className="field-error">{formErrors.expiryDate}</span>}
                    </div>
                    <div className="form-group">
                      <input
                        type="text"
                        name="cvv"
                        placeholder="CVV"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className={formErrors.cvv ? 'error' : ''}
                      />
                      {formErrors.cvv && <span className="field-error">{formErrors.cvv}</span>}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <label className="save-info-checkbox">
              <input
                type="checkbox"
                name="saveInfo"
                checked={formData.saveInfo}
                onChange={handleInputChange}
              />
              Save shipping information for next time
            </label>

            <button 
              type="submit" 
              disabled={loading || items.length === 0}
              className={loading ? 'loading' : ''}
            >
              {loading ? "Processing..." : `Place Order - $${getCartTotal().toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="order-items">
            {items.map((item) => (
              <div key={item.id} className="order-item">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">x {item.quantity}</span>
                </div>
                <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="order-total">
            <strong>Total: ${getCartTotal().toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;