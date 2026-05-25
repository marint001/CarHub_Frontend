import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  return (
    <section className="newsletter-signup">
      <div className="newsletter-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="newsletter-content"
        >
          <h2>Stay in the <span>Driver's Seat</span></h2>
          <p>Subscribe to our newsletter for exclusive offers, new arrivals, and automotive news</p>
          
          <form onSubmit={handleSubmit} className="newsletter-form">
            <div className="input-wrapper">
              <span className="email-icon">📧</span>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">
                {subscribed ? '✓ Subscribed!' : 'Subscribe →'}
              </button>
            </div>
          </form>
          
          <div className="newsletter-benefits">
            <div className="benefit">
              <span>🎁</span>
              <span>Exclusive Deals</span>
            </div>
            <div className="benefit">
              <span>🚗</span>
              <span>New Arrivals</span>
            </div>
            <div className="benefit">
              <span>📅</span>
              <span>Event Invites</span>
            </div>
            <div className="benefit">
              <span>🔧</span>
              <span>Tips & Guides</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSignup;