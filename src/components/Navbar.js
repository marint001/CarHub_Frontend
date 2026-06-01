import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import UserMenu from './UserMenu';
import AuthModal from './AuthModal';

const Navbar = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const { cartCount, toggleCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleNavigation = async (page) => {
    setShowLoader(true);
    setTimeout(() => {
      if (onNavigate) {
        onNavigate(page);
      }
      setIsOpen(false);
      setTimeout(() => setShowLoader(false), 500);
    }, 300);
  };

  const navLinks = [
    { name: 'Home', page: 'home'},
    { name: 'New Cars', page: 'newcars'},
    { name: 'Used Cars', page: 'usedcars'},
    { name: 'Features', page: 'features'},
    { name: 'Contact', page: 'contact'},
    { name: 'Compare', page: 'compare'},
    { name: 'Accessories', page: 'accessories'},
  ];

  return (
    <>

      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo" onClick={() => handleNavigation('home')}>
            <span className="logo-icon">🚗</span>
            <span className="logo-text">
              <span className="logo-car">CAR</span>
              <span className="logo-hub">HUB</span>
            </span>
          </div>
          
          <div className={`nav-links ${isOpen ? 'active' : ''}`}>
            {navLinks.map((link) => (
              <a
                key={link.page}
                href="#"
                onClick={() => handleNavigation(link.page)}
                className={`nav-link ${currentPage === link.page ? 'active' : ''}`}
              >
                <span className="nav-icon">{link.icon}</span>
                <span>{link.name}</span>
              </a>
            ))}
            
            {/* Cart Button */}
            <button className="cart-btn" onClick={toggleCart}>
              🛒
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
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