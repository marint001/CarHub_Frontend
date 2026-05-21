import React from 'react';

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

  return (
    <section id="features" className="features-section">
      <div className="section-header">
        <h2>Why Choose <span>Us</span></h2>
        <p>Experience the difference with our premium services</p>
      </div>
      <div className="features-grid">
        {features.map((feature, index) => (
          <div className="feature-card" key={index}>
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;