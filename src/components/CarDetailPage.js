import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const CarDetailPage = ({ car, onBack }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(0);
  const [showFinanceCalculator, setShowFinanceCalculator] = useState(false);
  const [showAddedToast, setShowAddedToast] = useState(false);
  const [loanAmount, setLoanAmount] = useState(50000);
  const [downPayment, setDownPayment] = useState(10000);
  const [loanTerm, setLoanTerm] = useState(60);
  const [interestRate, setInterestRate] = useState(5.9);
  const { addToCart } = useCart();

  // Customization States
  const [selectedExteriorColor, setSelectedExteriorColor] = useState(null);
  const [selectedInteriorColor, setSelectedInteriorColor] = useState(null);
  const [selectedWheel, setSelectedWheel] = useState(null);
  const [selectedTire, setSelectedTire] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [selectedAccessory, setSelectedAccessory] = useState([]);

  // Define all options
  const exteriorColors = [
    { name: 'Pearl White', code: '#f5f5f5', price: 0 },
    { name: 'Jet Black', code: '#1a1a1a', price: 0 },
    { name: 'Racing Red', code: '#e63946', price: 1500 },
    { name: 'Midnight Blue', code: '#1a2a4f', price: 1200 },
    { name: 'Silver Metallic', code: '#c0c0c0', price: 800 },
    { name: 'Forest Green', code: '#2d5a27', price: 1800 }
  ];

  const interiorColors = [
    { name: 'Black Leather', code: '#2a2a2a', price: 0 },
    { name: 'Red Leather', code: '#8b1a1a', price: 1200 },
    { name: 'Tan Leather', code: '#d4a574', price: 1500 },
    { name: 'White Leather', code: '#f0f0f0', price: 1800 }
  ];

  const wheelOptions = [
    { name: '19" Standard Alloy', price: 0, style: 'Classic' },
    { name: '20" Sport Alloy', price: 1200, style: 'Sport' },
    { name: '21" Performance Alloy', price: 2500, style: 'Performance' }
  ];

  const tireOptions = [
    { name: 'All-Season Tires', price: 0, performance: 'Balanced' },
    { name: 'Summer Performance', price: 800, performance: 'Excellent' },
    { name: 'Winter Tires', price: 1000, performance: 'Good' }
  ];

  const optionPackages = [
    { name: 'Standard Package', price: 0, features: ['Basic Audio', 'Standard Seats'] },
    { name: 'Premium Package', price: 3500, features: ['Premium Audio', 'Heated Seats', 'Sunroof'] },
    { name: 'Luxury Package', price: 7500, features: ['Bose Sound', 'Massage Seats', 'Panoramic Roof'] }
  ];

  const accessories = [
    { name: 'Roof Rack', price: 500, icon: '🎒' },
    { name: 'Floor Mats', price: 150, icon: '🧩' },
    { name: 'Dash Cam', price: 300, icon: '📹' }
  ];

  useEffect(() => {
    window.scrollTo(0, 0);
    if (exteriorColors.length > 0) setSelectedExteriorColor(exteriorColors[0]);
    if (wheelOptions.length > 0) setSelectedWheel(wheelOptions[0]);
    if (tireOptions.length > 0) setSelectedTire(tireOptions[0]);
    if (interiorColors.length > 0) setSelectedInteriorColor(interiorColors[0]);
  }, []);

  if (!car) {
    return (
      <div className="detail-error">
        <h2>Car not found</h2>
        <button onClick={onBack}>Go Back</button>
      </div>
    );
  }

  const safeCar = {
    name: car.name || 'Unknown Model',
    brand: car.brand || 'Unknown Brand',
    price: car.price || 'Contact for Price',
    year: car.year || '2024',
    engine: car.engine || 'Not specified',
    horsepower: car.horsepower || 'N/A',
    torque: car.torque || 'Not specified',
    acceleration: car.acceleration || 'N/A',
    topSpeed: car.topSpeed || 'Limited',
    range: car.range || null,
    category: car.category || 'Luxury',
    description: car.description || 'Experience luxury and performance at its finest.',
    image: car.image,
    mileage: car.mileage || null,
    owners: car.owners || null,
    condition: car.condition || 'Excellent'
  };

  const basePriceNumber = parseFloat(safeCar.price.replace(/[^0-9.-]+/g, ''));

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

  const handleAddToCart = () => {
    const customizedCar = {
      ...safeCar,
      id: car.id + '_' + Date.now(),
      price: `$${totalPrice.toLocaleString()}`,
      originalPrice: safeCar.price,
      isCustomized: true,
      customization: {
        exteriorColor: selectedExteriorColor,
        interiorColor: selectedInteriorColor,
        wheel: selectedWheel,
        tire: selectedTire,
        package: selectedPackage,
        accessories: selectedAccessory,
        totalCustomizationPrice: totalPrice - basePriceNumber,
        details: {
          exterior: selectedExteriorColor.name,
          interior: selectedInteriorColor.name,
          wheels: selectedWheel.name,
          tires: selectedTire.name,
          package: selectedPackage?.name || 'None',
          accessories: selectedAccessory.map(a => a.name).join(', ') || 'None'
        }
      },
      finalPrice: totalPrice
    };
    addToCart(customizedCar);
    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 3000);
  };

  const images = [safeCar.image, safeCar.image, safeCar.image, safeCar.image];

  const specifications = {
    'Engine & Performance': {
      'Engine Type': safeCar.engine,
      'Horsepower': safeCar.horsepower,
      'Torque': safeCar.torque,
      'Acceleration (0-60 mph)': safeCar.acceleration,
      'Top Speed': safeCar.topSpeed,
      'Drivetrain': 'All-Wheel Drive'
    },
    'Efficiency & Range': {
      'Fuel Type': safeCar.range ? 'Electric' : 'Premium Gasoline',
      'Range': safeCar.range || '450 miles',
      'Fuel Economy': safeCar.range ? '102 MPGe' : '18/25 MPG'
    },
    'Dimensions & Weight': {
      'Length': '196.0 in',
      'Width': '78.2 in',
      'Height': '56.3 in',
      'Curb Weight': '4,560 lbs',
      'Cargo Volume': '25.6 cu ft'
    }
  };

  const featuresList = {
    'Exterior': ['LED Matrix Headlights', 'Carbon Fiber Spoiler', '21" Alloy Wheels', 'Panoramic Glass Roof'],
    'Interior': ['Heated & Ventilated Seats', 'Premium Leather', 'Ambient Lighting', 'Massage Seats'],
    'Technology': ['17-inch Touchscreen', 'Apple CarPlay', 'Head-Up Display', 'Premium Sound'],
    'Safety': ['Adaptive Cruise Control', 'Lane Keep Assist', 'Emergency Braking', '360° Camera']
  };

  const calculateMonthlyPayment = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const payments = loanTerm;
    if (monthlyRate === 0) return principal / payments;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, payments)) / (Math.pow(1 + monthlyRate, payments) - 1);
  };

  const getCarAge = () => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - safeCar.year;
    if (age <= 1) return 'Brand New';
    if (age <= 3) return `${age} years old`;
    return `${age}+ years old`;
  };

  return (
    <div className="car-detail-page">
      {/* Success Toast */}
      <AnimatePresence>
        {showAddedToast && (
          <motion.div 
            className="detail-success-toast"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <span>✓</span>
            <div>
              <strong>Added to Cart!</strong>
              <p>Your customized {safeCar.name} has been added</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back Button */}
      <div className="detail-back">
        <button className="back-btn" onClick={onBack}>
          ← Back to Vehicles
        </button>
      </div>

      {/* Hero Section */}
      <div className="detail-hero">
        <div className="detail-hero-content">
          <div className="hero-badge">{safeCar.brand}</div>
          <h1>{safeCar.name}</h1>
          <div className="hero-price">${totalPrice.toLocaleString()}</div>
          
          {(selectedExteriorColor?.price > 0 || selectedWheel?.price > 0 || selectedPackage?.price > 0 || selectedAccessory.length > 0) && (
            <div className="hero-custom-badge">✨ Custom Build</div>
          )}
          
          {safeCar.year < 2020 && (
            <div className="hero-badges">
              <span className="badge-certified">✓ Certified Pre-owned</span>
              <span className="badge-warranty">✓ 2-Year Warranty</span>
            </div>
          )}
          <div className="hero-rating">
            <span className="stars">★★★★★</span>
            <span className="rating-count">(128 reviews)</span>
          </div>
        </div>
      </div>

      {/* Customizer Panel - Always Visible */}
      <div className="customizer-panel">
        <div className="customizer-container">
          <h3>🎨 Customize Your {safeCar.name}</h3>
          <p className="customizer-subtitle">Select options to create your perfect car</p>
          
          {/* Exterior Color */}
          <div className="customizer-section">
            <h4>🎨 Exterior Color</h4>
            <div className="color-options">
              {exteriorColors.map((color) => (
                <div
                  key={color.name}
                  className={`color-option ${selectedExteriorColor?.name === color.name ? 'selected' : ''}`}
                  onClick={() => setSelectedExteriorColor(color)}
                >
                  <div className="color-swatch" style={{ backgroundColor: color.code }}></div>
                  <span className="color-name">{color.name}</span>
                  <span className="color-price">{color.price === 0 ? 'Included' : `+$${color.price.toLocaleString()}`}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interior Color */}
          <div className="customizer-section">
            <h4>🛋️ Interior Color</h4>
            <div className="color-options">
              {interiorColors.map((color) => (
                <div
                  key={color.name}
                  className={`color-option ${selectedInteriorColor?.name === color.name ? 'selected' : ''}`}
                  onClick={() => setSelectedInteriorColor(color)}
                >
                  <div className="color-swatch" style={{ backgroundColor: color.code }}></div>
                  <span className="color-name">{color.name}</span>
                  <span className="color-price">{color.price === 0 ? 'Included' : `+$${color.price.toLocaleString()}`}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Wheel Options */}
          <div className="customizer-section">
            <h4>🛞 Wheel Options</h4>
            <div className="option-grid">
              {wheelOptions.map((wheel) => (
                <div
                  key={wheel.name}
                  className={`option-card ${selectedWheel?.name === wheel.name ? 'selected' : ''}`}
                  onClick={() => setSelectedWheel(wheel)}
                >
                  <span className="option-name">{wheel.name}</span>
                  <span className="option-style">{wheel.style}</span>
                  <span className="option-price">{wheel.price === 0 ? 'Included' : `+$${wheel.price.toLocaleString()}`}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tire Options */}
          <div className="customizer-section">
            <h4> Tire Options</h4>
            <div className="option-grid">
              {tireOptions.map((tire) => (
                <div
                  key={tire.name}
                  className={`option-card ${selectedTire?.name === tire.name ? 'selected' : ''}`}
                  onClick={() => setSelectedTire(tire)}
                >
                  <span className="option-name">{tire.name}</span>
                  <span className="option-specs">{tire.performance}</span>
                  <span className="option-price">{tire.price === 0 ? 'Included' : `+$${tire.price.toLocaleString()}`}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Option Packages */}
          <div className="customizer-section">
            <h4>📦 Option Packages</h4>
            <div className="package-grid">
              {optionPackages.map((pkg) => (
                <div
                  key={pkg.name}
                  className={`package-card ${selectedPackage?.name === pkg.name ? 'selected' : ''}`}
                  onClick={() => setSelectedPackage(pkg)}
                >
                  <div className="package-header">
                    <span className="package-name">{pkg.name}</span>
                    <span className="package-price">{pkg.price === 0 ? 'Included' : `+$${pkg.price.toLocaleString()}`}</span>
                  </div>
                  <div className="package-features">
                    {pkg.features.map((f, i) => <span key={i}>✓ {f}</span>)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accessories */}
          <div className="customizer-section">
            <h4>🎒 Accessories</h4>
            <div className="accessory-grid">
              {accessories.map((acc) => (
                <div
                  key={acc.name}
                  className={`accessory-card ${selectedAccessory.find(a => a.name === acc.name) ? 'selected' : ''}`}
                  onClick={() => toggleAccessory(acc)}
                >
                  <span className="accessory-icon">{acc.icon}</span>
                  <span className="accessory-name">{acc.name}</span>
                  <span className="accessory-price">+${acc.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Price Summary */}
          <div className="customizer-summary">
            <div className="summary-title">💰 Price Breakdown</div>
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
              <div className="summary-row"><span>Accessories ({selectedAccessory.length}):</span><span>+${selectedAccessory.reduce((sum, a) => sum + a.price, 0).toLocaleString()}</span></div>
            )}
            <div className="summary-total">
              <span>Total Price:</span>
              <span>${totalPrice.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="detail-main">
        {/* Image Gallery */}
        <div className="detail-gallery">
          <div className="main-image">
            <img src={images[selectedImage]} alt={safeCar.name} />
            {selectedExteriorColor && (
              <div className="color-overlay" style={{ backgroundColor: selectedExteriorColor.code, opacity: 0.3 }}></div>
            )}
          </div>
          <div className="thumbnail-list">
            {images.map((img, index) => (
              <div 
                key={index}
                className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                onClick={() => setSelectedImage(index)}
              >
                <img src={img} alt={`View ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>

        {/* Info Panel */}
        <div className="detail-info">
          <div className="quick-specs">
            <div className="quick-spec">
              <span className="spec-icon">⚡</span>
              <div><div className="spec-value">{safeCar.horsepower}</div><div className="spec-label">Horsepower</div></div>
            </div>
            <div className="spec-divider"></div>
            <div className="quick-spec">
              <span className="spec-icon">🏎️</span>
              <div><div className="spec-value">{safeCar.acceleration}</div><div className="spec-label">0-60 mph</div></div>
            </div>
            <div className="spec-divider"></div>
            <div className="quick-spec">
              <span className="spec-icon">💨</span>
              <div><div className="spec-value">{safeCar.topSpeed}</div><div className="spec-label">Top Speed</div></div>
            </div>
          </div>

          {/* Selected Options Summary */}
          {(selectedExteriorColor?.price > 0 || selectedWheel?.price > 0 || selectedPackage?.price > 0 || selectedAccessory.length > 0) && (
            <div className="selected-summary">
              <h4>✨ Your Customizations</h4>
              {selectedExteriorColor?.price > 0 && <span>🎨 {selectedExteriorColor.name}</span>}
              {selectedInteriorColor?.price > 0 && <span>🛋️ {selectedInteriorColor.name}</span>}
              {selectedWheel?.price > 0 && <span>🛞 {selectedWheel.name}</span>}
              {selectedTire?.price > 0 && <span> {selectedTire.name}</span>}
              {selectedPackage?.price > 0 && <span>📦 {selectedPackage.name}</span>}
              {selectedAccessory.length > 0 && <span>🎒 +{selectedAccessory.length} Accessories</span>}
            </div>
          )}

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="add-to-cart-btn-detail" onClick={handleAddToCart}>
              🛒 Add to Cart - ${totalPrice.toLocaleString()}
            </button>
            <button className="finance-btn-detail" onClick={() => setShowFinanceCalculator(true)}>
              💰 Finance
            </button>
          </div>

          {/* Tabs */}
          <div className="detail-tabs">
            <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
            <button className={`tab ${activeTab === 'specs' ? 'active' : ''}`} onClick={() => setActiveTab('specs')}>Specifications</button>
            <button className={`tab ${activeTab === 'features' ? 'active' : ''}`} onClick={() => setActiveTab('features')}>Features</button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-content">
                <h3>About this Vehicle</h3>
                <p>{safeCar.description}</p>
                <div className="highlights">
                  <div className="highlight"><span>🏆</span><div><h4>Award Winning</h4><p>Recognized for excellence</p></div></div>
                  <div className="highlight"><span>🔧</span><div><h4>5-Year Warranty</h4><p>Comprehensive coverage</p></div></div>
                  <div className="highlight"><span>🚗</span><div><h4>Free Maintenance</h4><p>3 years service</p></div></div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="specs-content">
                {Object.entries(specifications).map(([category, specs]) => (
                  <div className="spec-category" key={category}>
                    <h3>{category}</h3>
                    {Object.entries(specs).map(([key, value]) => (
                      <div className="spec-row" key={key}><span className="spec-key">{key}</span><span className="spec-value">{value}</span></div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'features' && (
              <div className="features-content">
                {Object.entries(featuresList).map(([category, items]) => (
                  <div className="feature-category" key={category}><h3>{category}</h3><ul>{items.map((item, i) => <li key={i}>✓ {item}</li>)}</ul></div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Finance Calculator Modal */}
      {showFinanceCalculator && (
        <div className="finance-modal" onClick={() => setShowFinanceCalculator(false)}>
          <div className="finance-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="finance-modal-header"><h3>Finance Calculator</h3><button className="close-modal" onClick={() => setShowFinanceCalculator(false)}>×</button></div>
            <div className="finance-modal-body">
              <div className="car-info-mini"><h4>{safeCar.name}</h4><p className="price">${totalPrice.toLocaleString()}</p></div>
              <div className="calculator-inputs">
                <div className="input-group"><label>Vehicle Price</label><input type="range" min="10000" max="300000" step="1000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} /><span>${loanAmount.toLocaleString()}</span></div>
                <div className="input-group"><label>Down Payment</label><input type="range" min="0" max={loanAmount * 0.5} step="1000" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} /><span>${downPayment.toLocaleString()}</span></div>
                <div className="input-group"><label>Loan Term</label><select value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))}><option value={36}>36 months</option><option value={48}>48 months</option><option value={60}>60 months</option></select></div>
                <div className="input-group"><label>Interest Rate</label><input type="range" min="0" max="15" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} /><span>{interestRate}%</span></div>
              </div>
              <div className="calculator-result">
                <div className="result-item"><span>Monthly Payment</span><strong>${calculateMonthlyPayment().toFixed(2)}</strong></div>
                <div className="result-item"><span>Total Interest</span><strong>${(calculateMonthlyPayment() * loanTerm - (loanAmount - downPayment)).toFixed(2)}</strong></div>
                <div className="result-item"><span>Total Cost</span><strong>${(calculateMonthlyPayment() * loanTerm + downPayment).toFixed(2)}</strong></div>
              </div>
              <button className="apply-finance">Apply for Financing →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetailPage;