import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import UserMenu from './UserMenu';
import AuthModal from './AuthModal';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const { cartCount, toggleCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, );

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const navLinks = [
    { name: 'Home', path: '/CarHUB'},
    { name: 'New Cars', path: '/new-cars'},
    { name: 'Used Cars', path: '/used-cars'},
    { name: 'Accessories', path: '/accessories' },
    { name: 'Compare', path: '/compare'},
    { name: 'Features', path: '/features' },
    { name: 'Contact', path: '/contact'}
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <AnimatePresence>
        {showLoader && (
          <motion.div className="navbar-loader-overlay">
            <div className="loader-container">
              <div className="loader-ring"></div>
              <div className="loader-ring"></div>
              <div className="loader-ring"></div>
              <span className="loader-text">Loading...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <Link to="/CarHUB" className="logo">
            <span className="logo-text">
              <span className="logo-car">CAR</span>
              <span className="logo-hub">HUB</span>
            </span>
          </Link>
          
          <div className={`nav-links ${isOpen ? 'active' : ''}`}>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${isActive(link.path) ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                <span className="nav-icon">{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            ))}
            
            <button className="cart-btn" onClick={toggleCart}>
              🛒
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
            
            <UserMenu onOpenAuth={() => setShowAuthModal(true)} />
          </div>
          
          <div className="hamburger" onClick={toggleMenu}>
            {isOpen ? '✕' : '☰'}
          </div>
        </div>
      </nav>
      
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  );
};

export default Navbar;