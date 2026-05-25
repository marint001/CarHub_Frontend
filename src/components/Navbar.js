import React, { useState, useEffect } from 'react';
import UserMenu from './UserMenu';
import AuthModal from './AuthModal';

const Navbar = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  
  const handleNavigation = (page) => {
    if (onNavigate) {
      onNavigate(page);
    }
    setIsOpen(false);
  };

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
            <a href="home" onClick={() => handleNavigation('home')}>Home</a>
            <a href="vehicles" onClick={() => handleNavigation('vehicles')}>Vehicles</a>
            <a href="#" onClick={() => handleNavigation('carpark')}>Car Park</a>
            <a href="#" onClick={() => handleNavigation('features')}>Features</a>
            <a href="#" onClick={() => handleNavigation('contact')}>Contact</a>
            <UserMenu onOpenAuth={() => setShowAuthModal(true)} />
            <button className="nav-cta" onClick={() => handleNavigation('vehicles')}>
              🛒 Buy Now
            </button>
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