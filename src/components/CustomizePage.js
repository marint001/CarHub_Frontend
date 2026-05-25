import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CustomizePage = ({ car, onBack, onAddToCart }) => {
  const [activeSection, setActiveSection] = useState('exterior');
  
  // Customization States
  const [selectedExteriorColor, setSelectedExteriorColor] = useState(null);
  const [selectedInteriorColor, setSelectedInteriorColor] = useState(null);
  const [selectedWheel, setSelectedWheel] = useState(null);
  const [selectedTire, setSelectedTire] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedAccessory, setSelectedAccessory] = useState([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Set default selections
    if (exteriorColors.length > 0) setSelectedExteriorColor(exteriorColors[0]);
    if (wheelOptions.length > 0) setSelectedWheel(wheelOptions[0]);
    if (tireOptions.length > 0) setSelectedTire(tireOptions[0]);
    if (interiorColors.length > 0) setSelectedInteriorColor(interiorColors[0]);
  }, []);

  if (!car) return null;

  const safeCar = {
    name: car.name || 'Unknown Model',
    brand: car.brand || 'Unknown Brand',
    basePrice: car.price || 'Contact for Price',
    year: car.year || '2024',
    engine: car.engine || 'Not specified',
    horsepower: car.horsepower || 'N/A',
    acceleration: car.acceleration || 'N/A',
    topSpeed: car.topSpeed || 'Limited',
    image: car.image
  };

  const basePriceNumber = parseFloat(safeCar.basePrice.replace(/[^0-9.-]+/g, ''));

  // Exterior Colors
  const exteriorColors = [
    { name: 'Pearl White', code: '#f5f5f5', price: 0, image: car.image },
    { name: 'Jet Black', code: '#1a1a1a', price: 0, image: car.image },
    { name: 'Racing Red', code: '#e63946', price: 1500, image: car.image },
    { name: 'Midnight Blue', code: '#1a2a4f', price: 1200, image: car.image },
    { name: 'Silver Metallic', code: '#c0c0c0', price: 800, image: car.image },
    { name: 'Forest Green', code: '#2d5a27', price: 1800, image: car.image },
    { name: 'Sunset Orange', code: '#ff6b35', price: 2000, image: car.image },
    { name: 'Frozen Gray', code: '#8a8a8a', price: 2500, image: car.image }
  ];

  // Interior Colors
  const interiorColors = [
    { name: 'Black Leather', code: '#2a2a2a', price: 0 },
    { name: 'Red Leather', code: '#8b1a1a', price: 1200 },
    { name: 'Tan Leather', code: '#d4a574', price: 1500 },
    { name: 'White Leather', code: '#f0f0f0', price: 1800 },
    { name: 'Brown Leather', code: '#8b4513', price: 1400 },
    { name: 'Blue Leather', code: '#1e3a5f', price: 1600 }
  ];

  // Wheel Options
  const wheelOptions = [
    { name: '19" Standard Alloy', price: 0, style: 'Classic', image: '🛞' },
    { name: '20" Sport Alloy', price: 1200, style: 'Sport', image: '🛞' },
    { name: '21" Performance Alloy', price: 2500, style: 'Performance', image: '🛞' },
    { name: '22" Carbon Fiber', price: 4500, style: 'Ultra', image: '🛞' },
    { name: '20" Black Edition', price: 1800, style: 'Black', image: '🛞' }
  ];

  // Tire Options
  const tireOptions = [
    { name: 'All-Season Tires', price: 0, performance: 'Balanced', durability: 'Good' },
    { name: 'Summer Performance', price: 800, performance: 'Excellent', durability: 'Fair' },
    { name: 'Winter Tires', price: 1000, performance: 'Good', durability: 'Very Good' },
    { name: 'Ultra-High Performance', price: 1500, performance: 'Superior', durability: 'Fair' },
    { name: 'Run-Flat Tires', price: 1200, performance: 'Good', durability: 'Excellent' }
  ];

  // Option Packages
  const optionPackages = [
    { name: 'Standard Package', price: 0, features: ['Basic Audio', 'Standard Seats', 'Manual AC'] },
    { name: 'Premium Package', price: 3500, features: ['Premium Audio', 'Heated Seats', 'Dual-Zone AC', 'Sunroof'] },
    { name: 'Luxury Package', price: 7500, features: ['Bose Sound System', 'Ventilated Seats', 'Massage Seats', 'Panoramic Roof'] },
    { name: 'Performance Package', price: 5500, features: ['Sport Suspension', 'Performance Brakes', 'Launch Control'] },
    { name: 'Technology Package', price: 4500, features: ['Head-Up Display', '360 Camera', 'Park Assist'] }
  ];

  // Accessories
  const accessories = [
    { name: 'Roof Rack', price: 500, icon: '🎒' },
    { name: 'Bike Carrier', price: 350, icon: '🚲' },
    { name: 'Floor Mats', price: 150, icon: '🧩' },
    { name: 'Cargo Net', price: 80, icon: '📦' },
    { name: 'First Aid Kit', price: 60, icon: '🏥' },
    { name: 'Dash Cam', price: 300, icon: '📹' }
  ];

  const calculateTotalPrice = () => {
    let total = basePriceNumber;
    if (selectedExteriorColor) total += selectedExteriorColor.price;
    if (selectedInteriorColor) total += selectedInteriorColor.price;
    if (selectedWheel) total += selectedWheel.price;
    if (selectedTire) total += selectedTire.price;
    if (selectedPackage) total += selectedPackage.price;
    selectedAccessory.forEach(accessory => { total += accessory.price; });
    return total;
  };

  const toggleAccessory = (accessory) => {
    if (selectedAccessory.find(a => a.name === accessory.name)) {
      setSelectedAccessory(selectedAccessory.filter(a => a.name !== accessory.name));
    } else {
      setSelectedAccessory([...selectedAccessory, accessory]);
    }
  };

  const totalPrice = calculateTotalPrice();

  const sections = [
    { id: 'exterior', name: 'Exterior Color', icon: '🎨' },
    { id: 'interior', name: 'Interior Color', icon: '🛋️' },
    { id: 'wheels', name: 'Wheels & Tires', icon: '🛞' },
    { id: 'packages', name: 'Packages', icon: '📦' },
    { id: 'accessories', name: 'Accessories', icon: '🎒' },
    { id: 'summary', name: 'Summary', icon: '💰' }
  ];

  const handleConfirmCustomization = () => {
    const customizedCar = {
      ...safeCar,
      totalPrice: totalPrice,
      customization: {
        exteriorColor: selectedExteriorColor,
        interiorColor: selectedInteriorColor,
        wheel: selectedWheel,
        tire: selectedTire,
        package: selectedPackage,
        accessories: selectedAccessory
      }
    };
    if (onAddToCart) onAddToCart(customizedCar);
    alert(`Your ${safeCar.name} has been customized! Total: $${totalPrice.toLocaleString()}`);
  };

  return (
    <div className="customize-page">
      {/* Header */}
      <div className="customize-header">
        <button className="back-btn" onClick={onBack}>
          ← Back to Car Details
        </button>
        <h1>Customize Your {safeCar.name}</h1>
        <div className="total-price-header">${totalPrice.toLocaleString()}</div>
      </div>

      {/* Main Content */}
      <div className="customize-main">
        {/* Sidebar Navigation */}
        <div className="customize-sidebar">
          {sections.map(section => (
            <button
              key={section.id}
              className={`sidebar-item ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => setActiveSection(section.id)}
            >
              <span className="sidebar-icon">{section.icon}</span>
              <span className="sidebar-name">{section.name}</span>
            </button>
          ))}
          <button className="confirm-btn" onClick={handleConfirmCustomization}>
            Confirm Customization →
          </button>
        </div>

        {/* Content Area */}
        <div className="customize-content">
          {/* Car Preview */}
          <div className="car-preview">
            <div className="preview-image">
              <img src={safeCar.image} alt={safeCar.name} />
              {selectedExteriorColor && (
                <div className="preview-overlay" style={{ backgroundColor: selectedExteriorColor.code, opacity: 0.3 }}></div>
              )}
            </div>
            <div className="preview-specs">
              <h3>{safeCar.name}</h3>
              <p>{safeCar.brand} • {safeCar.year}</p>
              <div className="preview-details">
                <span>⚡ {safeCar.horsepower}</span>
                <span>🏎️ {safeCar.acceleration}</span>
                <span>💨 {safeCar.topSpeed}</span>
              </div>
            </div>
          </div>

          {/* Exterior Colors Section */}
          {activeSection === 'exterior' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="config-section">
              <h2>Choose Exterior Color</h2>
              <p>Select from our premium color palette</p>
              <div className="color-grid-large">
                {exteriorColors.map((color) => (
                  <div
                    key={color.name}
                    className={`color-card-large ${selectedExteriorColor?.name === color.name ? 'selected' : ''}`}
                    onClick={() => setSelectedExteriorColor(color)}
                  >
                    <div className="color-preview-large" style={{ backgroundColor: color.code }}></div>
                    <div className="color-details">
                      <span className="color-name">{color.name}</span>
                      <span className="color-price">{color.price === 0 ? 'Included' : `+$${color.price.toLocaleString()}`}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Interior Colors Section */}
          {activeSection === 'interior' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="config-section">
              <h2>Choose Interior Color</h2>
              <p>Premium leather upholstery options</p>
              <div className="color-grid-large">
                {interiorColors.map((color) => (
                  <div
                    key={color.name}
                    className={`color-card-large ${selectedInteriorColor?.name === color.name ? 'selected' : ''}`}
                    onClick={() => setSelectedInteriorColor(color)}
                  >
                    <div className="color-preview-large" style={{ backgroundColor: color.code }}></div>
                    <div className="color-details">
                      <span className="color-name">{color.name}</span>
                      <span className="color-price">{color.price === 0 ? 'Included' : `+$${color.price.toLocaleString()}`}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Wheels & Tires Section */}
          {activeSection === 'wheels' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="config-section">
              <h2>Wheels & Tires</h2>
              <div className="sub-section">
                <h3>Wheel Options</h3>
                <div className="option-grid-large">
                  {wheelOptions.map((wheel) => (
                    <div
                      key={wheel.name}
                      className={`option-card-large ${selectedWheel?.name === wheel.name ? 'selected' : ''}`}
                      onClick={() => setSelectedWheel(wheel)}
                    >
                      <div className="option-icon">{wheel.image}</div>
                      <div className="option-details">
                        <span className="option-name">{wheel.name}</span>
                        <span className="option-style">{wheel.style}</span>
                        <span className="option-price">{wheel.price === 0 ? 'Included' : `+$${wheel.price.toLocaleString()}`}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="sub-section">
                <h3>Tire Options</h3>
                <div className="option-grid-large">
                  {tireOptions.map((tire) => (
                    <div
                      key={tire.name}
                      className={`option-card-large ${selectedTire?.name === tire.name ? 'selected' : ''}`}
                      onClick={() => setSelectedTire(tire)}
                    >
                      <div className="option-details full">
                        <span className="option-name">{tire.name}</span>
                        <span className="option-specs">Performance: {tire.performance} | Durability: {tire.durability}</span>
                        <span className="option-price">{tire.price === 0 ? 'Included' : `+$${tire.price.toLocaleString()}`}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Packages Section */}
          {activeSection === 'packages' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="config-section">
              <h2>Option Packages</h2>
              <p>Enhance your driving experience</p>
              <div className="package-grid-large">
                {optionPackages.map((pkg) => (
                  <div
                    key={pkg.name}
                    className={`package-card-large ${selectedPackage?.name === pkg.name ? 'selected' : ''}`}
                    onClick={() => setSelectedPackage(pkg)}
                  >
                    <div className="package-header">
                      <span className="package-name">{pkg.name}</span>
                      <span className="package-price">{pkg.price === 0 ? 'Included' : `+$${pkg.price.toLocaleString()}`}</span>
                    </div>
                    <ul className="package-features">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx}>✓ {feature}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Accessories Section */}
          {activeSection === 'accessories' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="config-section">
              <h2>Accessories</h2>
              <p>Add the perfect finishing touches</p>
              <div className="accessory-grid-large">
                {accessories.map((accessory) => (
                  <div
                    key={accessory.name}
                    className={`accessory-card-large ${selectedAccessory.find(a => a.name === accessory.name) ? 'selected' : ''}`}
                    onClick={() => toggleAccessory(accessory)}
                  >
                    <span className="accessory-icon">{accessory.icon}</span>
                    <div className="accessory-details">
                      <span className="accessory-name">{accessory.name}</span>
                      <span className="accessory-price">+${accessory.price.toLocaleString()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Summary Section */}
          {activeSection === 'summary' && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="config-section">
              <h2>Your Customization Summary</h2>
              <div className="summary-container">
                <div className="summary-car">
                  <img src={safeCar.image} alt={safeCar.name} />
                  <div className="summary-car-info">
                    <h3>{safeCar.name}</h3>
                    <p>{safeCar.brand}</p>
                  </div>
                </div>

                <div className="summary-details">
                  <div className="summary-row">
                    <span>Base Price:</span>
                    <span>${basePriceNumber.toLocaleString()}</span>
                  </div>
                  {selectedExteriorColor && selectedExteriorColor.price > 0 && (
                    <div className="summary-row"><span>{selectedExteriorColor.name}:</span><span>+${selectedExteriorColor.price.toLocaleString()}</span></div>
                  )}
                  {selectedInteriorColor && selectedInteriorColor.price > 0 && (
                    <div className="summary-row"><span>{selectedInteriorColor.name}:</span><span>+${selectedInteriorColor.price.toLocaleString()}</span></div>
                  )}
                  {selectedWheel && selectedWheel.price > 0 && (
                    <div className="summary-row"><span>{selectedWheel.name}:</span><span>+${selectedWheel.price.toLocaleString()}</span></div>
                  )}
                  {selectedTire && selectedTire.price > 0 && (
                    <div className="summary-row"><span>{selectedTire.name}:</span><span>+${selectedTire.price.toLocaleString()}</span></div>
                  )}
                  {selectedPackage && selectedPackage.price > 0 && (
                    <div className="summary-row"><span>{selectedPackage.name}:</span><span>+${selectedPackage.price.toLocaleString()}</span></div>
                  )}
                  {selectedAccessory.length > 0 && (
                    <div className="summary-row"><span>Accessories:</span><span>+${selectedAccessory.reduce((sum, a) => sum + a.price, 0).toLocaleString()}</span></div>
                  )}
                  <div className="summary-total">
                    <span>Total Price:</span>
                    <span>${totalPrice.toLocaleString()}</span>
                  </div>
                </div>

                <button className="confirm-order-btn" onClick={handleConfirmCustomization}>
                  Confirm & Add to Cart
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomizePage;