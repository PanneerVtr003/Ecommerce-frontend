import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [formData, setFormData] = useState({ 
    email: '', 
    password: '' 
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: value 
    }));
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.email || !formData.password) {
      setError('All fields are required!');
      setIsLoading(false);
      return;
    }

    try {
      const response = await loginUser({
        email: formData.email.trim(),
        password: formData.password
      });

      if (response.user && response.token) {
        login(response.user, response.token);
        navigate('/');
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Sign in to your account</p>
        
        {error && (
          <div className="error-msg">
            <span className="error-icon">⚠️</span>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
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
          
          <button 
            type="submit" 
            disabled={isLoading}
            className={isLoading ? 'loading' : ''}
          >
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>
        
        <p className="auth-link">
          Don't have an account? <Link to="/register">Create one here</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;