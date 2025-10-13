import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/api';
import './Auth.css';

const Register = () => {
  const [formData, setFormData] = useState({ 
    username: '', 
    email: '', 
    password: '', 
    confirmPassword: '' 
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.username.trim() || !formData.email.trim() || !formData.password || !formData.confirmPassword) {
      return 'All fields are required!';
    }

    if (formData.password.length < 6) {
      return 'Password must be at least 6 characters long!';
    }

    if (formData.password !== formData.confirmPassword) {
      return 'Passwords do not match!';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return 'Please enter a valid email address!';
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    try {
      const response = await registerUser({
        username: formData.username.trim(),
        email: formData.email.trim(),
        password: formData.password
      });

      setSuccess(response.message || 'Registration successful! Redirecting to login...');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(err.message || 'Registration failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join us today</p>
        
        {error && (
          <div className="error-msg">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}
        
        {success && (
          <div className="success-msg">
            <span className="success-icon">✓</span>
            {success}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
              type="text" 
              name="username" 
              value={formData.username} 
              onChange={handleChange} 
              placeholder="Username" 
              required 
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              placeholder="Email address" 
              required 
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              placeholder="Password" 
              required 
              disabled={isLoading}
            />
          </div>
          
          <div className="form-group">
            <input 
              type="password" 
              name="confirmPassword" 
              value={formData.confirmPassword} 
              onChange={handleChange} 
              placeholder="Confirm password" 
              required 
              disabled={isLoading}
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isLoading}
            className={isLoading ? 'loading' : ''}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>
        
        <p className="auth-link">
          Already have an account? <Link to="/login">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;