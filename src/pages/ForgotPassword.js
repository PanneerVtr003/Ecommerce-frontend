import { useState } from "react";
import { Link } from "react-router-dom";
import { forgotPassword } from "../services/authService";
import "./Auth.css";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");
    
    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    setIsLoading(true);
    
    try {
      const res = await forgotPassword(email);
      setMessage(res.message || "Password reset link has been sent to your email");
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Forgot Password</h2>
        <p className="auth-subtitle">
          Enter your email address and we'll send you a link to reset your password
        </p>

        {error && <div className="error-msg">⚠️ {error}</div>}
        {message && <div className="success-msg">✅ {message}</div>}

        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Enter your registered email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLoading}
              required
              autoComplete="email"
            />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className={isLoading ? "loading" : ""}
          >
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>

        <div className="back-to-login">
          <Link to="/login">← Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;