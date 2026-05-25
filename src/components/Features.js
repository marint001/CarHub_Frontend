import React from 'react';
import { motion } from 'framer-motion';

const Features = () => {
  const features = [
    { 
      icon: "🛡️", 
      title: "5-Year Warranty", 
      desc: "Comprehensive coverage on all new vehicles",
      color: "#FFD700"
    },
    { 
      icon: "🎧", 
      title: "24/7 Concierge", 
      desc: "Round-the-clock personal assistance",
      color: "#FFD700"
    },
    { 
      icon: "🚗", 
      title: "Free Test Drives", 
      desc: "Experience any vehicle before purchase",
      color: "#FFD700"
    },
    { 
      icon: "🔧", 
      title: "Maintenance Plan", 
      desc: "3 years complimentary service",
      color: "#FFD700"
    },
    { 
      icon: "⏰", 
      title: "Express Delivery", 
      desc: "Get your car within 7 days",
      color: "#FFD700"
    },
    { 
      icon: "🏆", 
      title: "Certified Pre-owned", 
      desc: "Rigorously inspected vehicles",
      color: "#FFD700"
    },
    { 
      icon: "💳", 
      title: "Flexible Financing", 
      desc: "Customized payment solutions",
      color: "#FFD700"
    },
    { 
      icon: "🛣️", 
      title: "Roadside Assistance", 
      desc: "24/7 emergency support",
      color: "#FFD700"
    }
  ];

  return (
    <section className="features-section-enhanced">
      <div className="features-container">
        <div className="features-header">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="features-badge">Why Choose Us</span>
            <h2>Premium <span>Services</span></h2>
            <p>Experience the difference with our world-class automotive services</p>
          </motion.div>
        </div>

        <div className="features-grid-enhanced">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card-enhanced"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10 }}
            >
              <div className="feature-icon-wrapper">
                <div className="feature-icon-circle">
                  <span className="feature-icon">{feature.icon}</span>
                </div>
              </div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
              <div className="feature-hover-line"></div>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div 
          className="features-stats"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="stat-item">
            <div className="stat-number">15,000+</div>
            <div className="stat-label">Happy Customers</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">98%</div>
            <div className="stat-label">Satisfaction Rate</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">24/7</div>
            <div className="stat-label">Support Available</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-number">50+</div>
            <div className="stat-label">Award Winning</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;