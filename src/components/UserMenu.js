import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

const UserMenu = ({ onOpenAuth }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleClickOutside = (event) => { 
      if (menuRef.current && !menuRef.current.contains(event.target)) setIsOpen(false); 
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => { 
    logout(); 
    setIsOpen(false); 
    window.location.reload(); 
  };

  const menuVariants = {
    hidden: { opacity: 0, y: -20, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 400, 
        damping: 25,
        duration: 0.3 
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i) => ({ 
      opacity: 1, 
      x: 0,
      transition: { delay: i * 0.05, duration: 0.2 }
    }),
    hover: { 
      x: 10,
      backgroundColor: "#f8fafc",
      transition: { duration: 0.2 }
    }
  };

  if (!isAuthenticated) {
    return (
      <motion.button 
        className="user-menu-login-btn"
        onClick={onOpenAuth}
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <motion.span
          animate={{ rotate: [0, 10, -10, 0] }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          👤
        </motion.span>
        Sign In
      </motion.button>
    );
  }

  return (
    <div className="user-menu-container" ref={menuRef}>
      <motion.button 
        className="user-menu-trigger"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <motion.img 
          src={user?.avatar} 
          alt={user?.name} 
          className="user-avatar"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.5 }}
        />
        <span className="user-name">{user?.name?.split(' ')[0]}</span>
        <motion.span 
          className="dropdown-arrow"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          ▼
        </motion.span>
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="user-menu-dropdown"
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="user-menu-header">
              <motion.img 
                src={user?.avatar} 
                alt={user?.name} 
                className="user-avatar-large"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              />
              <div>
                <h4>{user?.name}</h4>
                <p>{user?.email}</p>
              </div>
            </div>
            
            <div className="user-menu-items">
              {['Profile', 'Purchases', 'Saved Cars', 'Test Drives'].map((item, i) => (
                <motion.a 
                  key={item}
                  href="#"
                  className="menu-item"
                  custom={i}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover="hover"
                >
                  {item === 'Profile' && '👤'}
                  {item === 'Purchases' && '🛒'}
                  {item === 'Saved Cars' && '❤️'}
                  {item === 'Test Drives' && '🚗'}
                  {' '}{item}
                </motion.a>
              ))}
              <hr />
              <motion.button 
                onClick={handleLogout} 
                className="menu-item logout"
                variants={itemVariants}
                custom={4}
                initial="hidden"
                animate="visible"
                whileHover={{ x: 10, backgroundColor: "#fee" }}
              >
                🚪 Sign Out
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;