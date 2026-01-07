// pages/Register.js
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const { register } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Calculate password strength
    let strength = 0;
    if (formData.password.length >= 8) strength += 1;
    if (/[A-Z]/.test(formData.password)) strength += 1;
    if (/[0-9]/.test(formData.password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength += 1;
    setPasswordStrength(strength);
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validation
    if (!formData.username.trim()) {
      setError("Username is required");
      setIsLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      setIsLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      setIsLoading(false);
      return;
    }

    if (passwordStrength < 2) {
      setError("Please choose a stronger password");
      setIsLoading(false);
      return;
    }

    try {
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem("users")) || [];
      
      const emailExists = users.some(user => user.email === formData.email.trim());
      if (emailExists) {
        setError("An account with this email already exists");
        setIsLoading(false);
        return;
      }

      const usernameExists = users.some(user => user.username === formData.username.trim());
      if (usernameExists) {
        setError("Username already taken");
        setIsLoading(false);
        return;
      }

      // Create user object
      const userData = {
        id: Date.now().toString(),
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password, // In real app, hash this!
        createdAt: new Date().toISOString(),
      };

      // Save to localStorage
      users.push(userData);
      localStorage.setItem("users", JSON.stringify(users));

      // Register user in context (without password in user object)
      const { password, ...userWithoutPassword } = userData;
      register(userWithoutPassword);
      
      navigate("/");
    } catch (err) {
      setError("Registration failed. Please try again.");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength === 0) return "#e1e5e9";
    if (passwordStrength === 1) return "#ff4d4d";
    if (passwordStrength === 2) return "#ffa500";
    if (passwordStrength === 3) return "#4CAF50";
    return "#2f7a2f";
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join our community today</p>

        {error && <div className="error-msg">⚠️ {error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              disabled={isLoading}
              required
              placeholder="Choose a username"
              minLength={3}
              maxLength={20}
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              required
              placeholder="Create a strong password"
              minLength={6}
            />
            
            {formData.password && (
              <div className="password-strength" style={{ marginTop: "8px" }}>
                <div style={{
                  height: "4px",
                  background: "#e1e5e9",
                  borderRadius: "2px",
                  overflow: "hidden"
                }}>
                  <div style={{
                    width: `${passwordStrength * 25}%`,
                    height: "100%",
                    background: getPasswordStrengthColor(),
                    transition: "all 0.3s ease"
                  }} />
                </div>
                <div style={{
                  fontSize: "0.85rem",
                  color: "#666",
                  marginTop: "4px",
                  display: "flex",
                  justifyContent: "space-between"
                }}>
                  <span>Strength:</span>
                  <span style={{ color: getPasswordStrengthColor(), fontWeight: "600" }}>
                    {passwordStrength === 0 && "None"}
                    {passwordStrength === 1 && "Weak"}
                    {passwordStrength === 2 && "Fair"}
                    {passwordStrength === 3 && "Good"}
                    {passwordStrength === 4 && "Strong"}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              disabled={isLoading}
              required
              placeholder="Re-enter your password"
            />
            {formData.confirmPassword && formData.password === formData.confirmPassword && (
              <div className="password-hint valid">✓ Passwords match</div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={isLoading ? "loading" : ""}
          >
            {isLoading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="auth-link">
          Already have an account?{" "}
          <Link to="/login">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;