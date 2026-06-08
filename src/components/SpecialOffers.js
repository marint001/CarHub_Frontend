import React from 'react';
import { motion } from 'framer-motion';

const SpecialOffers = () => {
  const offers = [
    {
      title: "Summer Sale",
      discount: "Up to 20% OFF",
      description: "Selected new models",
      icon: "☀️",
      color: "#FF6B35",
      validUntil: "July 31, 2024",
      bgGradient: "linear-gradient(135deg, #FF6B35, #F7931E)"
    },
    {
      title: "Trade-in Bonus",
      discount: "$5,000 Bonus",
      description: "On any trade-in",
      icon: "🔄",
      color: "#FFD700",
      validUntil: "August 15, 2024",
      bgGradient: "linear-gradient(135deg, #FFD700, #FFA500)"
    },
    {
      title: "Zero Down Payment",
      discount: "0% Financing",
      description: "For qualified buyers",
      icon: "💰",
      color: "#00E5FF",
      validUntil: "September 1, 2024",
      bgGradient: "linear-gradient(135deg, #00E5FF, #00B4D8)"
    },
    {
      title: "Free Maintenance",
      discount: "3 Years Free",
      description: "On all new purchases",
      icon: "🔧",
      color: "#2ECC71",
      validUntil: "December 31, 2024",
      bgGradient: "linear-gradient(135deg, #2ECC71, #27AE60)"
    }
  ];

  return (
    <section className="special-offers-enhanced">
      <div className="offers-header">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span className="offers-badge">Limited Time</span>
          <h2>Special <span>Offers</span></h2>
          <p>Don't miss out on these exclusive deals</p>
        </motion.div>
      </div>

      <div className="offers-grid-enhanced">
        {offers.map((offer, index) => (
          <motion.div
            key={index}
            className="offer-card-enhanced"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            <div className="offer-glow" style={{ background: offer.bgGradient }}></div>
            <div className="offer-icon-wrapper" style={{ background: offer.bgGradient }}>
              <span className="offer-icon">{offer.icon}</span>
            </div>
            <h3>{offer.title}</h3>
            <div className="offer-discount-enhanced" style={{ color: offer.color }}>
              {offer.discount}
            </div>
            <p>{offer.description}</p>
            <div className="offer-valid-enhanced">
              <span className="valid-icon">⏰</span>
              Valid until {offer.validUntil}
            </div>
            <button className="offer-btn-enhanced" style={{ borderColor: offer.color, color: offer.color }}>
              Claim Offer <span>→</span>
            </button>
            <div className="offer-shine"></div>
          </motion.div>
        ))}
      </div>

      {/* Countdown Timer */}
      <motion.div 
        className="offers-countdown"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="countdown-content">
          <span className="countdown-icon">⏳</span>
          <div className="countdown-text">
            <h4>Summer Sale Ends In</h4>
            <div className="countdown-timer">
              <div className="countdown-unit">
                <span className="unit-number">12</span>
                <span className="unit-label">Days</span>
              </div>
              <span className="unit-separator">:</span>
              <div className="countdown-unit">
                <span className="unit-number">08</span>
                <span className="unit-label">Hours</span>
              </div>
              <span className="unit-separator">:</span>
              <div className="countdown-unit">
                <span className="unit-number">45</span>
                <span className="unit-label">Mins</span>
              </div>
              <span className="unit-separator">:</span>
              <div className="countdown-unit">
                <span className="unit-number">22</span>
                <span className="unit-label">Secs</span>
              </div>
            </div>
          </div>
          <button className="countdown-btn">Shop Now →</button>
        </div>
      </motion.div>
    </section>
  );
};

export default SpecialOffers;