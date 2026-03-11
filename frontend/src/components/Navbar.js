import React from 'react';
import { Link } from 'react-router-dom';
import { FaCar, FaHome, FaInfo, FaEnvelope, FaStore, FaBalanceScale } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <FaCar className="me-2" /> Luxury Car Showroom
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <FaHome className="me-1" /> Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cars">
                <FaCar className="me-1" /> Cars
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/dealers">
                <FaStore className="me-1" /> Dealers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/compare">
                <FaBalanceScale className="me-1" /> Compare
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                <FaInfo className="me-1" /> About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">
                <FaEnvelope className="me-1" /> Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;