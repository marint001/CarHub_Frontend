import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const UserMenu = ({ onOpenAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    window.location.reload();
  };

  const menuItems = [

    { icon: '🛒', label: 'My Purchases', path: '/purchases' },
    { icon: '❤️', label: 'My vehicle', path: '/saved' },
    { icon: '⚙️', label: 'Settings', path: '/settings' }
  ];

  if (!isAuthenticated) {
    return (
      <button className="user-menu-login-btn" onClick={onOpenAuth}>
        <svg className="user-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
          <circle cx="12" cy="7" r="4"/>
        </svg>
        <span>Sign In</span>
      </button>
    );
  }

  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: { duration: 0.2 }
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 400,
        damping: 25,
        duration: 0.3
      }
    },
    exit: { 
      opacity: 0,
      scale: 0.95,
      y: -10,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({ 
      opacity: 1, 
      x: 0,
      transition: { delay: i * 0.03, duration: 0.2 }
    }),
    hover: { 
      x: 8,
      backgroundColor: 'rgba(255, 215, 0, 0.1)',
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="user-menu-container" ref={menuRef}>
      <button 
        className="user-menu-trigger" 
        onClick={() => setIsOpen(!isOpen)}
        aria-label="User menu"
      >
        <div className="user-avatar-wrapper">
          <img 
            src={user?.avatar || `https://ui-avatars.com/api/?background=FFD700&color=000&name=${encodeURIComponent(user?.name || 'User')}`} 
            alt={user?.name} 
            className="user-avatar" 
          />
          <div className="user-status-dot"></div>
        </div>
        <span className="user-name">{user?.name?.split(' ')[0]}</span>
        <svg 
          className={`dropdown-arrow ${isOpen ? 'rotated' : ''}`}
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="user-menu-dropdown"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="user-menu-header">
              <div className="user-avatar-large-wrapper">
                <img 
                  src={user?.avatar || `https://ui-avatars.com/api/?background=FFD700&color=000&name=${encodeURIComponent(user?.name || 'User')}`} 
                  alt={user?.name} 
                  className="user-avatar-large" 
                />
              </div>
              <div className="user-info">
                <h4>{user?.name}</h4>
                <p>{user?.email}</p>
                <span className="user-role">Premium Member</span>
              </div>
            </div>
            
            <div className="user-menu-divider"></div>
            
            <div className="user-menu-items">
              {menuItems.map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.path}
                  className="menu-item"
                  custom={index}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                  onClick={() => setIsOpen(false)}
                >
                  <span className="menu-icon">{item.icon}</span>
                  <span className="menu-label">{item.label}</span>
                  <span className="menu-arrow">→</span>
                </motion.a>
              ))}
            </div>
            
            <div className="user-menu-divider"></div>
            
            <motion.button 
              onClick={handleLogout} 
              className="menu-item logout"
              variants={itemVariants}
              custom={menuItems.length}
              initial="hidden"
              animate="visible"
              whileHover="hover"
            >
              <span className="menu-icon">🚪</span>
              <span className="menu-label">Sign Out</span>
              <span className="menu-arrow">→</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;