import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Auth.css";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validate token on component mount
  useEffect(() => {
    const validateToken = async () => {
      try {
        // In a real app, you would verify the token with your backend
        // For demo purposes, we'll assume the token is valid
        setIsValidToken(true);
      } catch (err) {
        setError("Invalid or expired reset link");
        setIsValidToken(false);
      }
    };

    validateToken();
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    // Validation
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      // In a real app, use your actual API endpoint
      await axios.post(
        `http://localhost:5000/api/auth/reset-password/${token}`,
        { password: formData.password }
      );
      
      setMessage("Password has been reset successfully!");
      setIsSuccess(true);
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      
    } catch (err) {
      setError(err.response?.data?.message || "Invalid or expired link. Please request a new reset link.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isValidToken) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="error-msg">Invalid or expired reset link</div>
          <div className="back-to-login">
            <Link to="/forgot-password">Request a new reset link</Link>
          </div>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
            <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
            <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
          </svg>
          <h2>Password Reset Successfully!</h2>
          <p className="auth-subtitle" style={{ textAlign: "center" }}>
            Your password has been updated. You will be redirected to the login page shortly.
          </p>
          <div className="back-to-login">
            <Link to="/login">Go to Login Now</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Reset Your Password</h2>
        <p className="auth-subtitle">
          Create a new strong password for your account
        </p>

        {error && <div className="error-msg">⚠️ {error}</div>}
        {message && <div className="info-msg">ℹ️ {message}</div>}

        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="password">New Password</label>
            <div className="input-with-icon">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter new password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                required
                minLength={6}
                autoComplete="new-password"
              />
              <button
                type="button"
                className="icon-button"
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {formData.password && (
              <div className="password-hint">
                {formData.password.length >= 6 ? "✓" : "✗"} At least 6 characters
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-with-icon">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData.confirmPassword}
                onChange={handleChange}
                disabled={isLoading}
                required
                autoComplete="new-password"
              />
              <button
                type="button"
                className="icon-button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                disabled={isLoading}
              >
                {showConfirmPassword ? "🙈" : "👁️"}
              </button>
            </div>
            {formData.confirmPassword && (
              <div className={`password-hint ${formData.password === formData.confirmPassword ? 'valid' : 'invalid'}`}>
                {formData.password === formData.confirmPassword ? "✓" : "✗"} Passwords match
              </div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={isLoading || !formData.password || !formData.confirmPassword}
            className={isLoading ? "loading" : "success"}
          >
            {isLoading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="back-to-login">
          <Link to="/login">← Back to Login</Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;