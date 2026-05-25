import React, { useState } from 'react';

const Footer = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (newsletterEmail) { setSubmitted(true); setTimeout(() => setSubmitted(false), 3000); setNewsletterEmail(''); }
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section"><div className="footer-logo"><span>🚗</span><span>CAR HUB</span></div><p>Experience the pinnacle of automotive luxury. Your journey to excellence starts here.</p></div>
        <div className="footer-section"><h4>Quick Links</h4><a href="#">Home</a><a href="#">Vehicles</a><a href="#">Features</a><a href="#">Contact</a></div>
        <div className="footer-section"><h4>Our Services</h4><a href="#">Test Drive</a><a href="#">Financing</a><a href="#">Trade-in</a><a href="#">Service Center</a></div>
        <div className="footer-section"><h4>Newsletter</h4><p>Subscribe for exclusive offers</p><form className="newsletter" onSubmit={handleNewsletter}><input type="email" placeholder="Your email" value={newsletterEmail} onChange={(e) => setNewsletterEmail(e.target.value)} required /><button type="submit">{submitted ? '✓' : 'Subscribe'}</button></form></div>
      </div>
      <div className="footer-bottom"><p>&copy; 2024 CAR HUB. All rights reserved. | Designed with passion for automotive excellence</p></div>
      <button className="scroll-to-top" onClick={scrollToTop}>↑</button>
    </footer>
  );
};

export default Footer;