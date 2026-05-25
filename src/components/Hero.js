import React, { useEffect, useState } from 'react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { value: "100+", label: "Luxury Vehicles", icon: "👑" },
    { value: "15+", label: "Premium Brands", icon: "⚡" },
    { value: "24/7", label: "Expert Support", icon: "🎧" }
  ];

  return (
    <section id="home" className="hero">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <div className={`hero-text ${isVisible ? 'animate-in' : ''}`}>
          <span className="hero-badge">Since 1995</span>
          <h1>Experience <span>Automotive</span> Excellence</h1>
          <p>Discover our collection of world-class luxury vehicles. Performance, style, and innovation combined to create the ultimate driving experience.</p>
          <div className="hero-buttons">
            <button className="btn-primary">Explore Collection →</button>
            <button className="btn-secondary">Buy Your Dream Car</button>
          </div>
        </div>
        
        <div className={`hero-stats ${isVisible ? 'animate-in' : ''}`}>
          {stats.map((stat, index) => (
            <div className="stat" key={index}>
              <div className="stat-icon">{stat.icon}</div>
              <h3>{stat.value}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="hero-scroll-indicator">
        <span>Scroll to explore</span>
        <div className="scroll-mouse"></div>
      </div>
    </section>
  );
};

export default Hero;