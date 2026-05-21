import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const { login, register } = useAuth();

  if (!isOpen) return null;

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    setError('');
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    setError('');
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await login(loginForm.email, loginForm.password);
      setSuccess('Login successful!');
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    if (registerForm.password !== registerForm.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    if (registerForm.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }
    
    if (registerForm.name.length < 2) {
      setError('Please enter your full name');
      setLoading(false);
      return;
    }
    
    try {
      await register(registerForm.name, registerForm.email, registerForm.password, registerForm.phone);
      setSuccess('Registration successful! Welcome!');
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1500);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="auth-modal-close" onClick={onClose}>×</button>
        
        <div className="auth-modal-header">
          <div className="auth-tabs">
            <button 
              className={`auth-tab ${isLogin ? 'active' : ''}`}
              onClick={() => {
                setIsLogin(true);
                setError('');
                setSuccess('');
              }}
            >
              Sign In
            </button>
            <button 
              className={`auth-tab ${!isLogin ? 'active' : ''}`}
              onClick={() => {
                setIsLogin(false);
                setError('');
                setSuccess('');
              }}
            >
              Create Account
            </button>
          </div>
        </div>
        
        <div className="auth-modal-body">
          {error && <div className="auth-error">{error}</div>}
          {success && <div className="auth-success">{success}</div>}
          
          {isLogin ? (
            <form onSubmit={handleLogin}>
              <div className="form-group">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  required
                />
              </div>
              
              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" /> Remember me
                </label>
                <a href="#" className="forgot-password">Forgot Password?</a>
              </div>
              
              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <span className="input-icon">👤</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={registerForm.name}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <span className="input-icon">📧</span>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <span className="input-icon">📞</span>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (optional)"
                  value={registerForm.phone}
                  onChange={handleRegisterChange}
                />
              </div>
              
              <div className="form-group">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <span className="input-icon">🔒</span>
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={registerForm.confirmPassword}
                  onChange={handleRegisterChange}
                  required
                />
              </div>
              
              <button type="submit" className="auth-submit-btn" disabled={loading}>
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          )}
          
          <div className="auth-footer">
            {isLogin ? (
              <p>
                Don't have an account?{' '}
                <button type="button" onClick={() => setIsLogin(false)} className="switch-auth">
                  Sign up
                </button>
              </p>
            ) : (
              <p>
                Already have an account?{' '}
                <button type="button" onClick={() => setIsLogin(true)} className="switch-auth">
                  Sign in
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;