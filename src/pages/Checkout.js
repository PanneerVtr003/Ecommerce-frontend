import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

const Checkout = () => {
  const { items, getCartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
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
    if (user?.email) setFormData(prev => ({ ...prev, email: user.email }));

    const savedInfo = localStorage.getItem("savedShippingInfo");
    if (savedInfo) {
      const parsed = JSON.parse(savedInfo);
      setFormData(prev => ({ ...prev, ...parsed }));
    }
  }, [user]);

  const generatePaymentCode = () => Math.floor(100000 + Math.random() * 900000).toString();

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.firstName) errors.firstName = "Required";
    if (!formData.lastName) errors.lastName = "Required";
    if (!emailRegex.test(formData.email)) errors.email = "Valid email required";
    if (!formData.address) errors.address = "Required";
    if (!formData.city) errors.city = "Required";
    if (!formData.zipCode) errors.zipCode = "Valid ZIP required";

    if (paymentMethod === "card") {
      const cardRegex = /^\d{13,19}$/;
      const clean = formData.cardNumber.replace(/\s/g, "");
      if (!cardRegex.test(clean)) errors.cardNumber = "Invalid card";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);

    if (formData.saveInfo) {
      const { firstName, lastName, address, city, zipCode } = formData;
      localStorage.setItem("savedShippingInfo", JSON.stringify({ firstName, lastName, address, city, zipCode }));
    } else localStorage.removeItem("savedShippingInfo");

    const codCode = paymentMethod === "cod" ? generatePaymentCode() : null;

    const orderData = {
      items,
      total: getCartTotal(),
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        address: formData.address,
        city: formData.city,
        zipCode: formData.zipCode,
        country: "United States",
      },
      paymentMethod,
      paymentCode: codCode,
    };

    try {
      const res = await fetch("https://ecommerce-backend-9987.onrender.com/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(orderData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed");

      clearCart();
      setOrderId(data.order._id);
      setPaymentCode(codCode);
      setOrderSuccess(true);
    } catch (err) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

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

  if (items.length === 0) {
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

  return (
    <div className="checkout-page">
      <div className="checkout-header">
        <h1>Checkout</h1>
        <p>Complete your purchase securely</p>
      </div>

      <div className="checkout-container">
        <div className="checkout-form-container">
          <form onSubmit={handleSubmit} className="checkout-form">
            {/* Contact Information */}
            <div className="form-section">
              <h2 className="section-title">👤 Contact Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <input
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={e => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className={formErrors.firstName ? 'error' : ''}
                  />
                  {formErrors.firstName && <span className="field-error">{formErrors.firstName}</span>}
                </div>
                <div className="form-group">
                  <input
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={e => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className={formErrors.lastName ? 'error' : ''}
                  />
                  {formErrors.lastName && <span className="field-error">{formErrors.lastName}</span>}
                </div>
              </div>
              <div className="form-group">
                <input
                  placeholder="Email"
                  name="email"
                  value={formData.email}
                  onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className={formErrors.email ? 'error' : ''}
                />
                {formErrors.email && <span className="field-error">{formErrors.email}</span>}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="form-section">
              <h2 className="section-title">📍 Shipping Address</h2>
              <div className="form-group">
                <input
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  onChange={e => setFormData(prev => ({ ...prev, address: e.target.value }))}
                  className={formErrors.address ? 'error' : ''}
                />
                {formErrors.address && <span className="field-error">{formErrors.address}</span>}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <input
                    placeholder="City"
                    name="city"
                    value={formData.city}
                    onChange={e => setFormData(prev => ({ ...prev, city: e.target.value }))}
                    className={formErrors.city ? 'error' : ''}
                  />
                  {formErrors.city && <span className="field-error">{formErrors.city}</span>}
                </div>
                <div className="form-group">
                  <input
                    placeholder="ZIP Code"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={e => setFormData(prev => ({ ...prev, zipCode: e.target.value }))}
                    className={formErrors.zipCode ? 'error' : ''}
                  />
                  {formErrors.zipCode && <span className="field-error">{formErrors.zipCode}</span>}
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="form-section">
              <h2 className="section-title">💳 Payment Method</h2>
              <div className="payment-options">
                <label className="payment-option">
                  <input
                    type="radio"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="payment-option">
                  <input
                    type="radio"
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
                      placeholder="Card Number"
                      value={formData.cardNumber}
                      onChange={e => setFormData(prev => ({ ...prev, cardNumber: e.target.value }))}
                      className={formErrors.cardNumber ? 'error' : ''}
                    />
                    {formErrors.cardNumber && <span className="field-error">{formErrors.cardNumber}</span>}
                  </div>
                </div>
              )}
            </div>

            {/* Save Info */}
            <div className="save-info-checkbox">
              <input
                type="checkbox"
                checked={formData.saveInfo}
                onChange={e => setFormData(prev => ({ ...prev, saveInfo: e.target.checked }))}
              />
              <span>Save shipping information for next time</span>
            </div>

            <button
              type="submit"
              disabled={loading}
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
            {items.map((item, index) => (
              <div key={index} className="order-item">
                <div className="item-info">
                  <span className="item-name">{item.name}</span>
                  <span className="item-quantity">x {item.quantity}</span>
                </div>
                <span className="item-price">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="order-total">
            <strong>Total:</strong>
            <span className="total-amount">${getCartTotal().toFixed(2)}</span>
          </div>
        </div>
      </div>
      
      {/* Loading Overlay */}
      {loading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export default Checkout;