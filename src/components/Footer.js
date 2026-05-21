import React, { useState } from 'react';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubmitted, setNewsletterSubmitted] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubmitted(true);
      setTimeout(() => setNewsletterSubmitted(false), 3000);
      setNewsletterEmail('');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <div className="footer-logo">
            <span>🚗</span>
            <span>CAR HUB</span>
          </div>
          <p>Experience the pinnacle of automotive luxury. Your journey to excellence starts here.</p>
        </div>
        
        <div className="footer-section">
          <h4>Quick Links</h4>
          <a href="#home">Home</a>
          <a href="#catalog">Vehicles</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </div>
        
        <div className="footer-section">
          <h4>Our Services</h4>
          <a href="#">Test Drive</a>
          <a href="#">Financing</a>
          <a href="#">Trade-in Valuation</a>
          <a href="#">Service Center</a>
        </div>
        
        <div className="footer-section">
          <h4>Newsletter</h4>
          <p>Subscribe for exclusive offers</p>
          <form className="newsletter" onSubmit={handleNewsletter}>
            <input 
              type="email" 
              placeholder="Your email address" 
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              required
            />
            <button type="submit">
              {newsletterSubmitted ? '✓' : 'Subscribe'}
            </button>
          </form>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; 2024 Luxe Drive. All rights reserved. | Designed with passion for automotive excellence</p>
      </div>
      
      <button className="scroll-to-top" onClick={scrollToTop}>
        ↑
      </button>
    </footer>
  );
};

export default Footer;