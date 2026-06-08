import React, { useState } from 'react';
import { motion } from 'framer-motion';

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 3000);
      setEmail('');
    }
  };

  const benefits = [
    { icon: '🎁', title: 'Exclusive Deals', description: 'Member-only discounts' },
    { icon: '🚗', title: 'New Arrivals', description: 'Be first to know' },
    { icon: '📅', title: 'Event Invites', description: 'Test drives & launches' },
    { icon: '🔧', title: 'Tips & Guides', description: 'Expert advice' }
  ];

  return (
    <section className="newsletter-clean">
      <div className="newsletter-clean-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="newsletter-clean-content"
        >
          <div className="newsletter-clean-header">
            <span className="newsletter-badge">Stay Updated</span>
            <h2>Stay in the <span>Driver's Seat</span></h2>
            <p>Subscribe to our newsletter for exclusive offers, new arrivals, and automotive news</p>
          </div>

          <form onSubmit={handleSubmit} className="newsletter-clean-form">
            <div className={`input-group ${isFocused ? 'focused' : ''}`}>
              <span className="email-icon">📧</span>
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                required
              />
              <button type="submit">
                {subscribed ? '✓ Subscribed!' : 'Subscribe →'}
              </button>
            </div>
          </form>

          <div className="newsletter-clean-benefits">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="benefit-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="benefit-icon">{benefit.icon}</div>
                <div className="benefit-info">
                  <h4>{benefit.title}</h4>
                  <p>{benefit.description}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="newsletter-guarantee">
            <span className="guarantee-icon">🔒</span>
            <p>No spam, unsubscribe anytime. We respect your privacy.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSignup;