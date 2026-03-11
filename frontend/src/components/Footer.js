import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>Luxury Car Showroom</h5>
            <p>Your premier destination for luxury and performance vehicles since 2010.</p>
          </div>
          <div className="col-md-4">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-white text-decoration-none">Home</Link></li>
              <li><Link to="/cars" className="text-white text-decoration-none">Cars</Link></li>
              <li><Link to="/about" className="text-white text-decoration-none">About</Link></li>
              <li><Link to="/contact" className="text-white text-decoration-none">Contact</Link></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>Follow Us</h5>
            <div className="social-links">
              <a href="#" className="text-white me-3"><FaFacebook size={24} /></a>
              <a href="#" className="text-white me-3"><FaTwitter size={24} /></a>
              <a href="#" className="text-white me-3"><FaInstagram size={24} /></a>
              <a href="#" className="text-white"><FaYoutube size={24} /></a>
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="text-center">
          <p>&copy; 2024 Luxury Car Showroom. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;