import React, { useState, useEffect } from 'react';
import UserMenu from './UserMenu';
import AuthModal from './AuthModal';

const Navbar = () => {
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
  
  const smoothScroll = (e, targetId) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  const handleBuyNow = (e) => {
    e.preventDefault();
    const catalogElement = document.getElementById('catalog');
    if (catalogElement) {
      catalogElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
        <div className="nav-container">
          <div className="logo" onClick={(e) => smoothScroll(e, 'home')}>
            <span className="logo-icon">🚗</span>
            <span>CAR HUB</span>
          </div>
          
          <div className={`nav-links ${isOpen ? 'active' : ''}`}>
            <a href="#home" onClick={(e) => smoothScroll(e, 'home')}>Home</a>
            <a href="#catalog" onClick={(e) => smoothScroll(e, 'catalog')}>Vehicles</a>
            <a href="#features" onClick={(e) => smoothScroll(e, 'features')}>Features</a>
            <a href="#contact" onClick={(e) => smoothScroll(e, 'contact')}>Contact</a>
            <UserMenu onOpenAuth={() => setShowAuthModal(true)} />
            <button className="nav-cta" onClick={handleBuyNow}>
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