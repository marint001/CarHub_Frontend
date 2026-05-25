import React from 'react';
import { motion } from 'framer-motion';

const BrandShowcase = () => {
  const brands = [
    // European Brands
    { name: "Porsche", logo: "https://upload.wikimedia.org/wikipedia/de/9/9c/Porsche_logo_2011.png", description: "German luxury sports cars", origin: "Germany" },
    { name: "Ferrari", logo: "https://upload.wikimedia.org/wikipedia/en/6/6d/Ferrari_Logo.svg", description: "Italian luxury sports cars", origin: "Italy" },
    { name: "Lamborghini", logo: "https://upload.wikimedia.org/wikipedia/tr/c/c1/Lamborghini_Logo.svg", description: "Italian supercars", origin: "Italy" },
    { name: "BMW", logo: "https://upload.wikimedia.org/wikipedia/commons/4/44/BMW.svg", description: "German premium vehicles", origin: "Germany" },
    { name: "Mercedes-Benz", logo: "https://upload.wikimedia.org/wikipedia/commons/9/90/Mercedes-Logo.svg", description: "German luxury automobiles", origin: "Germany" },
    { name: "Audi", logo: "https://upload.wikimedia.org/wikipedia/commons/9/92/Audi_logo_detail.svg", description: "German luxury cars", origin: "Germany" },
    { name: "Jaguar", logo: "https://upload.wikimedia.org/wikipedia/commons/e/ec/Jaguar_logo.svg", description: "British luxury vehicles", origin: "UK" },
    
    // American Brands
    { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg", description: "Electric vehicles pioneer", origin: "USA" },
    
    // Japanese Brands
    { name: "Toyota", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9d/Toyota_car_logo.svg", description: "Japanese reliability leader", origin: "Japan" },
    { name: "Honda", logo: "https://upload.wikimedia.org/wikipedia/commons/6/6a/Honda_logo.svg", description: "Innovative Japanese engineering", origin: "Japan" },
    { name: "Nissan", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7e/Nissan_logo.svg", description: "Japanese performance and innovation", origin: "Japan" },
    { name: "Mazda", logo: "https://upload.wikimedia.org/wikipedia/commons/9/9e/Mazda_logo.svg", description: "Japanese driving dynamics", origin: "Japan" },
    { name: "Lexus", logo: "https://upload.wikimedia.org/wikipedia/commons/9/97/Lexus_logo.svg", description: "Japanese luxury vehicles", origin: "Japan" },
    { name: "Subaru", logo: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Subaru_logo.svg", description: "AWD Japanese performance", origin: "Japan" },
    { name: "Mitsubishi", logo: "https://upload.wikimedia.org/wikipedia/commons/3/3b/Mitsubishi_logo.svg", description: "Japanese rally heritage", origin: "Japan" },
    { name: "Acura", logo: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Acura_logo.svg", description: "Japanese luxury performance", origin: "Japan" },
    { name: "Infiniti", logo: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Infiniti_logo.svg", description: "Japanese luxury cars", origin: "Japan" },
    
    // Korean Brands
    { name: "Hyundai", logo: "https://upload.wikimedia.org/wikipedia/commons/1/10/Hyundai_Motor_Company_logo.svg", description: "Korean innovation leader", origin: "Korea" }
  ];

  return (
    <section className="brand-showcase">
      <div className="section-header">
        <h2>Our <span>Partner Brands</span></h2>
        <p>Authorized dealers of the world's finest automotive brands from Europe, America, Japan, and Korea</p>
      </div>
      <div className="brands-grid">
        {brands.map((brand, index) => (
          <motion.div
            key={brand.name}
            className="brand-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            viewport={{ once: true }}
            whileHover={{ y: -5 }}
          >
            <div className="brand-logo-wrapper">
              <img 
                src={brand.logo} 
                alt={`${brand.name} logo`}
                className="brand-logo-img"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.parentElement.innerHTML = `<div class="brand-fallback">${brand.name.charAt(0)}</div>`;
                }}
              />
            </div>
            <h3>{brand.name}</h3>
            <p>{brand.description}</p>
            <div className="brand-origin">{brand.origin}</div>
            <div className="brand-badge">✓ Official Dealer</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default BrandShowcase;