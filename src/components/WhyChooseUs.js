import React from 'react';
import { motion } from 'framer-motion';

const WhyChooseUs = () => {
  const features = [
    {
      icon: "🏆",
      title: "15+ Years Experience",
      description: "Trusted by thousands of satisfied customers"
    },
    {
      icon: "✅",
      title: "100% Certified Cars",
      description: "Every vehicle thoroughly inspected"
    },
    {
      icon: "🔧",
      title: "Free Service Package",
      description: "3 years complimentary maintenance"
    },
    {
      icon: "📞",
      title: "24/7 Customer Support",
      description: "Round-the-clock assistance"
    },
    {
      icon: "🚚",
      title: "Free Delivery",
      description: "Nationwide delivery available"
    },
    {
      icon: "💰",
      title: "Best Price Guarantee",
      description: "We match any legitimate offer"
    }
  ];

  return (
    <section className="why-choose-us">
      <div className="section-header">
        <h2>Why <span>Choose Us</span></h2>
        <p>Experience the difference with premium service</p>
      </div>
      <div className="features-grid-new">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="feature-card-new"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <div className="feature-icon-new">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;