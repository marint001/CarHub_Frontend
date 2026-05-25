import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ 
    name: '', email: '', phone: '', password: '', confirmPassword: '' 
  });
  const { login, register } = useAuth();

  // Animation variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } }
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        damping: 25, 
        stiffness: 300,
        duration: 0.4 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transition: { duration: 0.3 }
    }
  };

  const tabVariants = {
    inactive: { 
      opacity: 0.6, 
      scale: 1,
      transition: { duration: 0.2 }
    },
    active: { 
      opacity: 1, 
      scale: 1.05,
      backgroundColor: "#e63946",
      color: "white",
      transition: { duration: 0.2 }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 30,
        duration: 0.4 
      }
    },
    exit: { 
      opacity: 0, 
      x: 50,
      transition: { duration: 0.3 }
    }
  };

  const inputVariants = {
    focus: { scale: 1.02, borderColor: "#e63946", boxShadow: "0 0 0 3px rgba(230,57,70,0.1)" },
    blur: { scale: 1, borderColor: "#e0e0e0", boxShadow: "none" }
  };

  const buttonVariants = {
    hover: { scale: 1.02, y: -2, boxShadow: "0 5px 15px rgba(230,57,70,0.3)" },
    tap: { scale: 0.98 },
    loading: { scale: 0.98, opacity: 0.7 }
  };

  const errorVariants = {
    hidden: { opacity: 0, y: -20, height: 0 },
    visible: { opacity: 1, y: 0, height: "auto", transition: { duration: 0.3 } }
  };

  if (!isOpen) return null;

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(loginForm.email, loginForm.password);
      onClose();
      window.location.reload();
    } catch (err) { 
      setError(err.message);
      setTimeout(() => setError(''), 3000);
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
      setTimeout(() => setError(''), 3000);
      return; 
    }
    if (registerForm.password.length < 6) { 
      setError('Password must be at least 6 characters');
      setLoading(false);
      setTimeout(() => setError(''), 3000);
      return; 
    }
    try {
      await register(registerForm.name, registerForm.email, registerForm.password, registerForm.phone);
      onClose();
      window.location.reload();
    } catch (err) { 
      setError(err.message);
      setTimeout(() => setError(''), 3000);
    } finally { 
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="auth-modal-overlay"
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={onClose}
        >
          <motion.div 
            className="auth-modal"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            <motion.button 
              className="auth-modal-close"
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
            >
              ×
            </motion.button>
            
            <div className="auth-modal-header">
              <div className="auth-tabs">
                <motion.button 
                  className={`auth-tab ${isLogin ? 'active' : ''}`}
                  variants={tabVariants}
                  animate={isLogin ? 'active' : 'inactive'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsLogin(true);
                    setError('');
                  }}
                >
                  Sign In
                </motion.button>
                <motion.button 
                  className={`auth-tab ${!isLogin ? 'active' : ''}`}
                  variants={tabVariants}
                  animate={!isLogin ? 'active' : 'inactive'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setIsLogin(false);
                    setError('');
                  }}
                >
                  Create Account
                </motion.button>
              </div>
            </div>
            
            <div className="auth-modal-body">
              <AnimatePresence mode="wait">
                {error && (
                  <motion.div 
                    className="auth-error"
                    variants={errorVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    ⚠️ {error}
                  </motion.div>
                )}
              </AnimatePresence>
              
              <AnimatePresence mode="wait">
                {isLogin ? (
                  <motion.form
                    key="login"
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onSubmit={handleLogin}
                  >
                    <motion.div 
                      className="form-group"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="input-icon">📧</span>
                      <motion.input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({...loginForm, email: e.target.value})}
                        variants={inputVariants}
                        whileFocus="focus"
                        animate="blur"
                        required
                      />
                    </motion.div>
                    
                    <motion.div 
                      className="form-group"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="input-icon">🔒</span>
                      <motion.input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                        variants={inputVariants}
                        whileFocus="focus"
                        animate="blur"
                        required
                      />
                      <motion.button 
                        type="button"
                        className="password-toggle"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? '👁️' : '👁️‍🗨️'}
                      </motion.button>
                    </motion.div>
                    
                    <div className="form-options">
                      <label className="checkbox-label">
                        <motion.input 
                          type="checkbox" 
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        /> Remember me
                      </label>
                      <motion.a 
                        href="#" 
                        className="forgot-password"
                        whileHover={{ x: 3 }}
                      >
                        Forgot Password?
                      </motion.a>
                    </div>
                    
                    <motion.button 
                      type="submit" 
                      className="auth-submit-btn"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      animate={loading ? "loading" : ""}
                      disabled={loading}
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          style={{ display: 'inline-block' }}
                        >
                          ⚡
                        </motion.div>
                      ) : 'Sign In'}
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.form
                    key="register"
                    variants={formVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    onSubmit={handleRegister}
                  >
                    <motion.div 
                      className="form-group"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="input-icon">👤</span>
                      <motion.input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm({...registerForm, name: e.target.value})}
                        variants={inputVariants}
                        whileFocus="focus"
                        animate="blur"
                        required
                      />
                    </motion.div>
                    
                    <motion.div 
                      className="form-group"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="input-icon">📧</span>
                      <motion.input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({...registerForm, email: e.target.value})}
                        variants={inputVariants}
                        whileFocus="focus"
                        animate="blur"
                        required
                      />
                    </motion.div>
                    
                    <motion.div 
                      className="form-group"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="input-icon">📞</span>
                      <motion.input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number (optional)"
                        value={registerForm.phone}
                        onChange={(e) => setRegisterForm({...registerForm, phone: e.target.value})}
                        variants={inputVariants}
                        whileFocus="focus"
                        animate="blur"
                      />
                    </motion.div>
                    
                    <motion.div 
                      className="form-group"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="input-icon">🔒</span>
                      <motion.input
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="Password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({...registerForm, password: e.target.value})}
                        variants={inputVariants}
                        whileFocus="focus"
                        animate="blur"
                        required
                      />
                    </motion.div>
                    
                    <motion.div 
                      className="form-group"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <span className="input-icon">🔒</span>
                      <motion.input
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({...registerForm, confirmPassword: e.target.value})}
                        variants={inputVariants}
                        whileFocus="focus"
                        animate="blur"
                        required
                      />
                    </motion.div>
                    
                    <motion.button 
                      type="submit" 
                      className="auth-submit-btn"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      animate={loading ? "loading" : ""}
                      disabled={loading}
                    >
                      {loading ? (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1 }}
                          style={{ display: 'inline-block' }}
                        >
                          ⚡
                        </motion.div>
                      ) : 'Create Account'}
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
              
              <motion.div 
                className="auth-footer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                {isLogin ? (
                  <p>
                    Don't have an account?{' '}
                    <motion.button 
                      type="button" 
                      onClick={() => setIsLogin(false)} 
                      className="switch-auth"
                      whileHover={{ scale: 1.05, x: 3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign up
                    </motion.button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{' '}
                    <motion.button 
                      type="button" 
                      onClick={() => setIsLogin(true)} 
                      className="switch-auth"
                      whileHover={{ scale: 1.05, x: 3 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign in
                    </motion.button>
                  </p>
                )}
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;