import React, { useState, useRef, useEffect } from 'react';
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

  if (!isAuthenticated) {
    return (
      <button className="user-menu-login-btn" onClick={onOpenAuth}>
        👤 Sign In
      </button>
    );
  }

  return (
    <div className="user-menu-container" ref={menuRef}>
      <button className="user-menu-trigger" onClick={() => setIsOpen(!isOpen)}>
        <img src={user?.avatar} alt={user?.name} className="user-avatar" />
        <span className="user-name">{user?.name?.split(' ')[0]}</span>
        <span className="dropdown-arrow">▼</span>
      </button>
      
      {isOpen && (
        <div className="user-menu-dropdown">
          <div className="user-menu-header">
            <img src={user?.avatar} alt={user?.name} className="user-avatar-large" />
            <div>
              <h4>{user?.name}</h4>
              <p>{user?.email}</p>
            </div>
          </div>
          
          <div className="user-menu-items">
            <a href="#" className="menu-item">
              👤 My Profile
            </a>
            <a href="#" className="menu-item">
              🛒 My Purchases
            </a>
            <a href="#" className="menu-item">
              ❤️ Saved Cars
            </a>
            <a href="#" className="menu-item">
              🚗 Test Drives
            </a>
            <hr />
            <button onClick={handleLogout} className="menu-item logout">
              🚪 Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;