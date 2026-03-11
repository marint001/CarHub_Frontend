import React, { useState } from 'react';
import { bookingService } from '../services/bookingService';
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaClock } from 'react-icons/fa';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    
    try {
      await bookingService.sendContactMessage(formData);
      setSuccess(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">Contact Us</h1>
      
      {success && (
        <div className="alert alert-success alert-dismissible fade show">
          Thank you for your message! We'll get back to you within 24 hours.
          <button type="button" className="btn-close" onClick={() => setSuccess(false)}></button>
        </div>
      )}
      
      {error && <div className="alert alert-danger">{error}</div>}
      
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <FaMapMarkerAlt size={32} className="text-primary mb-3" />
              <h5>Visit Us</h5>
              <p className="mb-0">123 Luxury Lane</p>
              <p>Beverly Hills, CA 90210</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <FaPhone size={32} className="text-primary mb-3" />
              <h5>Call Us</h5>
              <p className="mb-0">Sales: (555) 123-4567</p>
              <p>Service: (555) 123-4568</p>
            </div>
          </div>
        </div>
        
        <div className="col-md-4 mb-4">
          <div className="card h-100">
            <div className="card-body text-center">
              <FaClock size={32} className="text-primary mb-3" />
              <h5>Hours</h5>
              <p className="mb-0">Mon-Fri: 9am - 8pm</p>
              <p>Sat: 10am - 6pm | Sun: Closed</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h3>Get in Touch</h3>
              <p className="text-muted">Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
              
              <div className="mt-4">
                <h5>Email</h5>
                <p><FaEnvelope className="me-2 text-primary" /> info@luxurycarshowroom.com</p>
                
                <h5>Follow Us</h5>
                <div className="social-links">
                  <a href="#" className="text-primary me-3">Facebook</a>
                  <a href="#" className="text-primary me-3">Twitter</a>
                  <a href="#" className="text-primary me-3">Instagram</a>
                  <a href="#" className="text-primary">YouTube</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3>Send us a Message</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email *</label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Phone</label>
                  <input
                    type="tel"
                    className="form-control"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Subject *</label>
                  <input
                    type="text"
                    className="form-control"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Message *</label>
                  <textarea
                    className="form-control"
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                <button 
                  type="submit" 
                  className="btn btn-primary w-100"
                  disabled={submitting}
                >
                  {submitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;