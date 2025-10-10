import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear errors when user starts typing
    if (error) setError("");
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    // Validation
    if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
      setError("All fields are required!");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long!");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/users/register", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      setSuccess(response.data.message || "Registration successful!");
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">Create an Account</h2>
        <p className="register-subtitle">Join us today!</p>

        {error && (
          <div className="register-error">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}
        {success && (
          <div className="register-success">
            <span className="success-icon">✅</span>
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter your username"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Enter your password"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="form-input"
              placeholder="Confirm your password"
            />
          </div>

          <button 
            type="submit" 
            className={`register-button ${isLoading ? 'button-loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="register-link-text">
          Already have an account? <Link to="/login" className="register-link">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;