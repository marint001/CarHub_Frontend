import React from 'react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    { icon: "🛡️", title: "5-Year Warranty", desc: "Comprehensive coverage on all new vehicles" },
    { icon: "🎧", title: "24/7 Concierge", desc: "Round-the-clock personal assistance" },
    { icon: "🚗", title: "Free Test Drives", desc: "Experience any vehicle before purchase" },
    { icon: "🔧", title: "Maintenance Plan", desc: "3 years complimentary service" },
    { icon: "⏰", title: "Express Delivery", desc: "Get your car within 7 days" },
    { icon: "🏆", title: "Certified Pre-owned", desc: "Rigorously inspected vehicles" },
    { icon: "💳", title: "Flexible Financing", desc: "Customized payment solutions" },
    { icon: "🛣️", title: "Roadside Assistance", desc: "24/7 emergency support" }
  ];

  const benefits = [
    { icon: "✅", title: "No Hidden Fees", desc: "Transparent pricing" },
    { icon: "📞", title: "Expert Support", desc: "Knowledgeable staff" },
    { icon: "📋", title: "Easy Paperwork", desc: "Quick documentation" },
    { icon: "🚚", title: "Home Delivery", desc: "Nationwide shipping" }
  ];

  return (
    <div className="features-page">
      <div className="features-container">
        {/* Header */}
        <div className="features-header">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="features-badge">Why Choose Us</span>
            <h1>Premium <span>Services</span></h1>
            <p>Experience the difference with our world-class automotive services designed for your convenience and peace of mind.</p>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="features-grid-page">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card-page"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="feature-icon-wrapper">
                <div className="feature-icon-page">{feature.icon}</div>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
              <div className="feature-hover-line"></div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div 
          className="features-stats-page"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="feature-stat-page">
            <div className="feature-stat-number">15,000+</div>
            <div className="feature-stat-label">Happy Customers</div>
          </div>
          <div className="stat-divider"></div>
          <div className="feature-stat-page">
            <div className="feature-stat-number">98%</div>
            <div className="feature-stat-label">Satisfaction Rate</div>
          </div>
          <div className="stat-divider"></div>
          <div className="feature-stat-page">
            <div className="feature-stat-number">24/7</div>
            <div className="feature-stat-label">Support Available</div>
          </div>
          <div className="stat-divider"></div>
          <div className="feature-stat-page">
            <div className="feature-stat-number">50+</div>
            <div className="feature-stat-label">Award Winning</div>
          </div>
        </motion.div>

        {/* Benefits Section */}
        <motion.div 
          className="features-benefits"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="benefits-header">
            <h2>Additional Benefits</h2>
            <p>Enjoy extra perks when you shop with us</p>
          </div>
          <div className="benefits-grid">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="benefit-item"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="benefit-icon">{benefit.icon}</div>
                <div className="benefit-text">
                  <h4>{benefit.title}</h4>
                  <p>{benefit.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="features-cta"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>Ready to Experience Our Services?</h2>
          <p>Contact us today to learn more about our premium offerings</p>
          <button onClick={() => window.location.href = '#contact'}>Contact Us Now →</button>
        </motion.div>
      </div>
    </div>
  );
};

export default Features;