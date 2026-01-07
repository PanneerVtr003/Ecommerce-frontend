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

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!formData.email || !formData.password) {
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
          u.email === formData.email.trim() &&
          u.password === formData.password
      );

      if (!user) {
        setError("Invalid email or password!");
        setIsLoading(false);
        return;
      }

      // Fake token (for demo purpose)
      const fakeToken = "local-auth-token";

      // Save login in AuthContext
      login(user, fakeToken);

      navigate("/");
    } catch (err) {
      setError("Login failed. Please try again.");
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
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              disabled={isLoading}
              required
            />
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? "Signing In..." : "Sign In"}
          </button>
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
