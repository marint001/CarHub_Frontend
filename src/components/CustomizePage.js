import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

// ALL OPTIONS DEFINED OUTSIDE COMPONENT
const exteriorColorsList = [
  { name: 'Pearl White', code: '#f5f5f5', price: 0 },
  { name: 'Jet Black', code: '#1a1a1a', price: 0 },
  { name: 'Racing Red', code: '#e63946', price: 1500 },
  { name: 'Midnight Blue', code: '#1a2a4f', price: 1200 },
  { name: 'Silver Metallic', code: '#c0c0c0', price: 800 },
  { name: 'Forest Green', code: '#2d5a27', price: 1800 }
];

const interiorColorsList = [
  { name: 'Black Leather', code: '#2a2a2a', price: 0 },
  { name: 'Red Leather', code: '#8b1a1a', price: 1200 },
  { name: 'Tan Leather', code: '#d4a574', price: 1500 },
  { name: 'White Leather', code: '#f0f0f0', price: 1800 }
];

const wheelsList = [
  { name: '19" Standard Alloy', price: 0 },
  { name: '20" Sport Alloy', price: 1200 },
  { name: '21" Performance Alloy', price: 2500 }
];

const tiresList = [
  { name: 'All-Season Tires', price: 0 },
  { name: 'Summer Performance', price: 800 },
  { name: 'Winter Tires', price: 1000 }
];

const packagesList = [
  { name: 'Standard Package', price: 0, features: ['Basic Audio', 'Standard Seats'] },
  { name: 'Premium Package', price: 3500, features: ['Premium Audio', 'Heated Seats', 'Sunroof'] },
  { name: 'Luxury Package', price: 7500, features: ['Bose Sound', 'Massage Seats', 'Panoramic Roof'] }
];

const accessoriesList = [
  { name: 'Roof Rack', price: 500, icon: '🎒' },
  { name: 'Floor Mats', price: 150, icon: '🧩' },
  { name: 'Dash Cam', price: 300, icon: '📹' }
];

const CustomizePage = ({ car, onBack, onAddToCart }) => {
  const [activeSection, setActiveSection] = useState('exterior');
  const [showSuccess, setShowSuccess] = useState(false);
  const { addToCart } = useCart();
  
  const [exteriorColor, setExteriorColor] = useState(exteriorColorsList[0]);
  const [interiorColor, setInteriorColor] = useState(interiorColorsList[0]);
  const [wheel, setWheel] = useState(wheelsList[0]);
  const [tire, setTire] = useState(tiresList[0]);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedAccessories, setSelectedAccessories] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!car) {
    return (
      <div className="customize-error">
        <h2>No car selected</h2>
        <button onClick={onBack} className="error-back-btn">Go Back</button>
      </div>
    );
  }

  const basePrice = parseFloat(car.price?.replace(/[^0-9.-]+/g, '')) || 50000;

  const calculateTotal = () => {
    let total = basePrice;
    total += exteriorColor.price;
    total += interiorColor.price;
    total += wheel.price;
    total += tire.price;
    if (selectedPackage) total += selectedPackage.price;
    selectedAccessories.forEach(acc => total += acc.price);
    return total;
  };

  const totalPrice = calculateTotal();

  const toggleAccessory = (accessory) => {
    if (selectedAccessories.find(a => a.name === accessory.name)) {
      setSelectedAccessories(selectedAccessories.filter(a => a.name !== accessory.name));
    } else {
      setSelectedAccessories([...selectedAccessories, accessory]);
    }
  };

  const handleAddToCart = () => {
    // Create a unique ID for this customized car
    const uniqueId = `${car.id}_${Date.now()}_${Math.random()}`;
    
    const customizedCar = {
      id: uniqueId,
      originalId: car.id,
      name: car.name,
      brand: car.brand,
      basePrice: car.price,
      image: car.image,
      quantity: 1,
      isCustomized: true,
      customization: {
        exteriorColor: exteriorColor,
        interiorColor: interiorColor,
        wheel: wheel,
        tire: tire,
        package: selectedPackage,
        accessories: selectedAccessories,
        totalCustomizationPrice: totalPrice - basePrice,
        details: {
          exterior: exteriorColor.name,
          interior: interiorColor.name,
          wheels: wheel.name,
          tires: tire.name,
          package: selectedPackage?.name || 'None',
          accessories: selectedAccessories.map(a => a.name).join(', ') || 'None'
        }
      },
      finalPrice: totalPrice,
      displayPrice: `$${totalPrice.toLocaleString()}`
    };
    
    addToCart(customizedCar);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
      if (onAddToCart) onAddToCart(customizedCar);
    }, 2000);
  };

  const sections = [
    { id: 'exterior', name: 'Exterior', icon: '🎨' },
    { id: 'interior', name: 'Interior', icon: '🛋️' },
    { id: 'wheels', name: 'Wheels & Tires', icon: '🛞' },
    { id: 'packages', name: 'Packages', icon: '📦' },
    { id: 'accessories', name: 'Accessories', icon: '🎒' },
    { id: 'summary', name: 'Summary', icon: '💰' }
  ];

  return (
    <div className="customize-page">
      <AnimatePresence>
        {showSuccess && (
          <motion.div className="customize-success-toast" initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }}>
            <span>✓</span>
            <div><strong>Added to Cart!</strong><p>Your customized {car.name} has been added</p></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="customize-header">
        <button className="back-btn" onClick={onBack}>← Back to {car.name}</button>
        <h1>Customize Your {car.name}</h1>
        <div className="total-price-header">${totalPrice.toLocaleString()}</div>
      </div>

      <div className="customize-main">
        <div className="customize-sidebar">
          {sections.map(section => (
            <button key={section.id} className={`sidebar-item ${activeSection === section.id ? 'active' : ''}`} onClick={() => setActiveSection(section.id)}>
              <span className="sidebar-icon">{section.icon}</span>
              <span className="sidebar-name">{section.name}</span>
            </button>
          ))}
          <button className="confirm-btn" onClick={handleAddToCart}>Add to Cart → ${totalPrice.toLocaleString()}</button>
        </div>

        <div className="customize-content">
          {/* Car Preview */}
          <div className="car-preview">
            <div className="preview-image">
              <img src={car.image} alt={car.name} />
              <div className="preview-overlay" style={{ backgroundColor: exteriorColor.code, opacity: 0.3 }}></div>
            </div>
            <div className="preview-specs">
              <h3>{car.name}</h3>
              <p>{car.brand} • {car.year}</p>
              <div className="preview-details">
                <span>⚡ {car.horsepower}</span>
                <span>🏎️ {car.acceleration}</span>
                <span>💨 {car.topSpeed}</span>
              </div>
              <div className="preview-color"><span>Color:</span><div className="color-dot" style={{ backgroundColor: exteriorColor.code }}></div><span>{exteriorColor.name}</span></div>
            </div>
          </div>

          {/* Exterior Section */}
          {activeSection === 'exterior' && (
            <div className="config-section">
              <h2>Exterior Color</h2>
              <div className="color-grid-large">
                {exteriorColorsList.map((color) => (
                  <div key={color.name} className={`color-card-large ${exteriorColor.name === color.name ? 'selected' : ''}`} onClick={() => setExteriorColor(color)}>
                    <div className="color-preview-large" style={{ backgroundColor: color.code }}></div>
                    <div className="color-details"><span className="color-name">{color.name}</span><span className="color-price">{color.price === 0 ? 'Included' : `+$${color.price}`}</span></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interior Section */}
          {activeSection === 'interior' && (
            <div className="config-section">
              <h2>Interior Color</h2>
              <div className="color-grid-large">
                {interiorColorsList.map((color) => (
                  <div key={color.name} className={`color-card-large ${interiorColor.name === color.name ? 'selected' : ''}`} onClick={() => setInteriorColor(color)}>
                    <div className="color-preview-large" style={{ backgroundColor: color.code }}></div>
                    <div className="color-details"><span className="color-name">{color.name}</span><span className="color-price">{color.price === 0 ? 'Included' : `+$${color.price}`}</span></div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Wheels & Tires Section */}
          {activeSection === 'wheels' && (
            <div className="config-section">
              <h2>Wheels</h2>
              <div className="option-grid-large">
                {wheelsList.map((w) => (
                  <div key={w.name} className={`option-card-large ${wheel.name === w.name ? 'selected' : ''}`} onClick={() => setWheel(w)}>
                    <span className="option-name">{w.name}</span>
                    <span className="option-price">{w.price === 0 ? 'Included' : `+$${w.price}`}</span>
                  </div>
                ))}
              </div>
              <h2 style={{ marginTop: '1rem' }}>Tires</h2>
              <div className="option-grid-large">
                {tiresList.map((t) => (
                  <div key={t.name} className={`option-card-large ${tire.name === t.name ? 'selected' : ''}`} onClick={() => setTire(t)}>
                    <span className="option-name">{t.name}</span>
                    <span className="option-price">{t.price === 0 ? 'Included' : `+$${t.price}`}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Packages Section */}
          {activeSection === 'packages' && (
            <div className="config-section">
              <h2>Packages</h2>
              <div className="package-grid-large">
                {packagesList.map((pkg) => (
                  <div key={pkg.name} className={`package-card-large ${selectedPackage?.name === pkg.name ? 'selected' : ''}`} onClick={() => setSelectedPackage(pkg)}>
                    <div className="package-header"><span className="package-name">{pkg.name}</span><span className="package-price">{pkg.price === 0 ? 'Included' : `+$${pkg.price}`}</span></div>
                    <ul className="package-features">{pkg.features.map((f, i) => <li key={i}>✓ {f}</li>)}</ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Accessories Section */}
          {activeSection === 'accessories' && (
            <div className="config-section">
              <h2>Accessories</h2>
              <div className="accessory-grid-large">
                {accessoriesList.map((acc) => (
                  <div key={acc.name} className={`accessory-card-large ${selectedAccessories.find(a => a.name === acc.name) ? 'selected' : ''}`} onClick={() => toggleAccessory(acc)}>
                    <span className="accessory-icon">{acc.icon}</span>
                    <span className="accessory-name">{acc.name}</span>
                    <span className="accessory-price">+${acc.price}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary Section */}
          {activeSection === 'summary' && (
            <div className="config-section">
              <h2>Summary</h2>
              <div className="summary-container">
                <div className="summary-car"><img src={car.image} alt={car.name} /><div><h3>{car.name}</h3><p>{car.brand} • {car.year}</p></div></div>
                <div className="summary-details">
                  <div className="summary-row"><span>Base Price:</span><span>${basePrice.toLocaleString()}</span></div>
                  {exteriorColor.price > 0 && <div className="summary-row"><span>{exteriorColor.name}:</span><span>+${exteriorColor.price}</span></div>}
                  {interiorColor.price > 0 && <div className="summary-row"><span>{interiorColor.name}:</span><span>+${interiorColor.price}</span></div>}
                  {wheel.price > 0 && <div className="summary-row"><span>{wheel.name}:</span><span>+${wheel.price}</span></div>}
                  {tire.price > 0 && <div className="summary-row"><span>{tire.name}:</span><span>+${tire.price}</span></div>}
                  {selectedPackage && selectedPackage.price > 0 && <div className="summary-row"><span>{selectedPackage.name}:</span><span>+${selectedPackage.price}</span></div>}
                  {selectedAccessories.map((acc, i) => <div className="summary-row" key={i}><span>{acc.name}:</span><span>+${acc.price}</span></div>)}
                  <div className="summary-total"><span>Total:</span><span>$${totalPrice.toLocaleString()}</span></div>
                </div>
                <button className="confirm-order-btn" onClick={handleAddToCart}>Add to Cart - ${totalPrice.toLocaleString()}</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizePage;