// pages/Login.js
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!formData.email.trim() || !formData.password) {
      setError("All fields are required!");
      setIsLoading(false);
      return;
    }

    try {
      // Get users from localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Find matching user
      const user = users.find(
        (u) =>
          u.email.toLowerCase() === formData.email.trim().toLowerCase() &&
          u.password === formData.password
      );

      if (!user) {
        setError("Invalid email or password!");
        setIsLoading(false);
        return;
      }

      // Create user object without password
      const { password, ...userWithoutPassword } = user;
      
      // Save login in AuthContext
      login(userWithoutPassword);
      
      // Show success message
      setTimeout(() => {
        navigate("/");
      }, 1000);
      
    } catch (err) {
      setError("Login failed. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Sign in to your account</p>

        {error && <div className="error-msg">⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div style={{ position: "relative" }}>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                style={{
                  position: "absolute",
                  right: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: "#667eea",
                  cursor: "pointer",
                  fontSize: "0.9rem",
                  padding: "4px",
                  width: "auto",
                  margin: 0,
                }}
                disabled={isLoading}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={isLoading ? "loading" : ""}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </button>

          <Link to="/forgot-password" className="forgot-link">
          Forgot Password?
          </Link>
          
        </form>

        <p className="auth-link">
          Don&apos;t have an account?{" "}
          <Link to="/register">Create one here</Link>
        </p>
        
       
      </div>
    </div>
  );
};

export default Login;