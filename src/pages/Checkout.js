import React, { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
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
    const savedInfo = localStorage.getItem("savedShippingInfo");
    if (savedInfo) {
      setFormData((prev) => ({
        ...prev,
        ...JSON.parse(savedInfo),
        email: user?.email || prev.email,
      }));
    }
  }, [user]);

  const generatePaymentCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const zipRegex = /^\d{5}$/;

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!emailRegex.test(formData.email)) errors.email = "Valid email is required";
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!zipRegex.test(formData.zipCode)) errors.zipCode = "Valid 5-digit ZIP code is required";

    if (paymentMethod === "card") {
      const cardRegex = /^\d{16}$/;
      const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;
      const cvvRegex = /^\d{3,4}$/;

      const cleanCardNumber = formData.cardNumber.replace(/\s/g, "");
      if (!cardRegex.test(cleanCardNumber))
        errors.cardNumber = "Valid 16-digit card number is required";
      if (!expiryRegex.test(formData.expiryDate))
        errors.expiryDate = "Valid expiry date (MM/YY) is required";
      if (!cvvRegex.test(formData.cvv)) errors.cvv = "Valid CVV is required";

      if (formData.expiryDate && expiryRegex.test(formData.expiryDate)) {
        const [month, year] = formData.expiryDate.split("/");
        const expiry = new Date(2000 + parseInt(year), parseInt(month) - 1);
        const now = new Date();
        if (expiry < now) {
          errors.expiryDate = "Card has expired";
        }
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
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
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
    setFormData({
      ...formData,
      cardNumber: formattedValue,
    });
  };

  // ✅ Updated handleSubmit - sends order to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setError("Please fix the form errors");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const orderData = {
        user: user?._id,
        items,
        total: getCartTotal(),
        shippingAddress: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          address: formData.address,
          city: formData.city,
          zipCode: formData.zipCode,
        },
        paymentMethod,
        email: formData.email,
      };

      if (paymentMethod === "cod") {
        const code = generatePaymentCode();
        setPaymentCode(code);
        orderData.paymentCode = code;
      }

      // ✅ Send data to backend
      const res = await axios.post("http://localhost:5000/api/orders", orderData, {
        headers: { "Content-Type": "application/json" },
      });

      const createdOrder = res.data;
      setOrderId(createdOrder._id || createdOrder.id);

      if (formData.saveInfo) {
        const { cardNumber, expiryDate, cvv, saveInfo, ...shippingInfo } = formData;
        localStorage.setItem("savedShippingInfo", JSON.stringify(shippingInfo));
      }

      clearCart();
      setOrderSuccess(true);
    } catch (err) {
      console.error("Order creation failed:", err.response?.data || err.message);
      setError(err.response?.data?.message || "Failed to place order. Please try again.");
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

            {paymentMethod === "cod" && (
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
        <div className="checkout-steps">
          <div className="step active">1. Shipping</div>
          <div className="step">2. Payment</div>
          <div className="step">3. Confirmation</div>
        </div>
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
            {/* CONTACT */}
            <div className="form-section">
              <h2 className="section-title">👤 Contact Information</h2>
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter your first name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={formErrors.firstName ? "error" : ""}
                  />
                  {formErrors.firstName && (
                    <span className="field-error">{formErrors.firstName}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={formErrors.lastName ? "error" : ""}
                  />
                  {formErrors.lastName && (
                    <span className="field-error">{formErrors.lastName}</span>
                  )}
                </div>
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={formErrors.email ? "error" : ""}
                />
                {formErrors.email && (
                  <span className="field-error">{formErrors.email}</span>
                )}
              </div>
            </div>

            {/* SHIPPING */}
            <div className="form-section">
              <h2 className="section-title">📍 Shipping Address</h2>
              <div className="form-group">
                <label>Street Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="123 Main Street"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={formErrors.address ? "error" : ""}
                />
                {formErrors.address && (
                  <span className="field-error">{formErrors.address}</span>
                )}
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>City</label>
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={formErrors.city ? "error" : ""}
                  />
                  {formErrors.city && (
                    <span className="field-error">{formErrors.city}</span>
                  )}
                </div>
                <div className="form-group">
                  <label>ZIP Code</label>
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="12345"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={formErrors.zipCode ? "error" : ""}
                  />
                  {formErrors.zipCode && (
                    <span className="field-error">{formErrors.zipCode}</span>
                  )}
                </div>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="form-section">
              <h2 className="section-title">💳 Payment Method</h2>
              <div className="payment-methods">
                <label className={`payment-option ${paymentMethod === "card" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  💳 Credit/Debit Card
                </label>

                <label className={`payment-option ${paymentMethod === "cod" ? "active" : ""}`}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                    checked={paymentMethod === "cod"}
                    onChange={() => setPaymentMethod("cod")}
                  />
                  💰 Cash on Delivery
                </label>
              </div>

              {paymentMethod === "card" && (
                <div className="card-details">
                  <div className="form-group">
                    <label>Card Number</label>
                    <input
                      type="text"
                      name="cardNumber"
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleCardNumberChange}
                      maxLength="19"
                      className={formErrors.cardNumber ? "error" : ""}
                    />
                    {formErrors.cardNumber && (
                      <span className="field-error">{formErrors.cardNumber}</span>
                    )}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Expiry Date</label>
                      <input
                        type="text"
                        name="expiryDate"
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        maxLength="5"
                        className={formErrors.expiryDate ? "error" : ""}
                      />
                      {formErrors.expiryDate && (
                        <span className="field-error">{formErrors.expiryDate}</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label>CVV</label>
                      <input
                        type="text"
                        name="cvv"
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        maxLength="4"
                        className={formErrors.cvv ? "error" : ""}
                      />
                      {formErrors.cvv && (
                        <span className="field-error">{formErrors.cvv}</span>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="form-section">
              <label className="checkbox-container">
                <input
                  type="checkbox"
                  name="saveInfo"
                  checked={formData.saveInfo}
                  onChange={handleInputChange}
                />
                Save shipping information for faster checkout next time
              </label>
            </div>

            <button type="submit" disabled={loading} className="place-order-btn">
              {loading ? (
                <>
                  <span className="spinner"></span> Processing Your Order...
                </>
              ) : (
                <>
                  🚀 Place Order - ${getCartTotal().toFixed(2)}
                </>
              )}
            </button>
          </form>
        </div>

        {/* ✅ Order Summary */}
        <div className="order-summary">
          <h2 className="summary-title">Order Summary</h2>
          <div className="order-items">
            {items.map((item) => (
              <div key={item.id} className="order-item">
                <div className="item-image">
                  <img src={item.image || "/placeholder-image.jpg"} alt={item.name} />
                  <span className="item-quantity">{item.quantity}</span>
                </div>
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p className="item-price">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="order-total">
            <div className="total-row">
              <span>Subtotal</span>
              <span>${getCartTotal().toFixed(2)}</span>
            </div>
            <div className="total-row">
              <span>Shipping</span>
              <span className="free-shipping">Free</span>
            </div>
            <div className="total-row">
              <span>Tax</span>
              <span>${(getCartTotal() * 0.08).toFixed(2)}</span>
            </div>
            <div className="total-row final-total">
              <span>Total</span>
              <span>${(getCartTotal() * 1.08).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
