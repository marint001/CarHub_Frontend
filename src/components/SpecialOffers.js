import React from 'react';
import { motion } from 'framer-motion';

const SpecialOffers = () => {
  const offers = [
    {
      title: "Summer Sale",
      discount: "Up to 20% OFF",
      description: "Selected new models",
      icon: "☀️",
      color: "#e63946",
      validUntil: "July 31, 2024"
    },
    {
      title: "Trade-in Bonus",
      discount: "$5,000 Bonus",
      description: "On any trade-in",
      icon: "🔄",
      color: "#2ecc71",
      validUntil: "August 15, 2024"
    },
    {
      title: "Zero Down Payment",
      discount: "0% Financing",
      description: "For qualified buyers",
      icon: "💰",
      color: "#3498db",
      validUntil: "September 1, 2024"
    },
    {
      title: "Free Maintenance",
      discount: "3 Years Free",
      description: "On all new purchases",
      icon: "🔧",
      color: "#f39c12",
      validUntil: "December 31, 2024"
    }
  ];

  return (
    <section className="special-offers">
      <div className="section-header">
        <h2>Special <span>Offers</span></h2>
        <p>Limited time deals you don't want to miss</p>
      </div>
      <div className="offers-grid">
        {offers.map((offer, index) => (
          <motion.div
            key={index}
            className="offer-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -10 }}
          >
            <div className="offer-icon" style={{ backgroundColor: offer.color }}>
              {offer.icon}
            </div>
            <h3>{offer.title}</h3>
            <div className="offer-discount" style={{ color: offer.color }}>
              {offer.discount}
            </div>
            <p>{offer.description}</p>
            <div className="offer-valid">Valid until {offer.validUntil}</div>
            <button className="offer-btn">Claim Offer →</button>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SpecialOffers;