import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import { carsData } from '../data/carsData';

const CarDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const car = carsData.find(c => c.id === parseInt(id));
  
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
        <button onClick={() => navigate(-1)}>Go Back</button>
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
        totalCustomizationPrice: totalPrice - basePriceNumber
      },
      finalPrice: totalPrice
    };
    addToCart(customizedCar);
    setShowAddedToast(true);
    setTimeout(() => setShowAddedToast(false), 3000);
  };

  const images = [safeCar.image, safeCar.image, safeCar.image, safeCar.image];

  const calculateMonthlyPayment = () => {
    const principal = loanAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const payments = loanTerm;
    if (monthlyRate === 0) return principal / payments;
    return principal * (monthlyRate * Math.pow(1 + monthlyRate, payments)) / (Math.pow(1 + monthlyRate, payments) - 1);
  };

  return (
    <div className="car-detail-page">
      <AnimatePresence>
        {showAddedToast && (
          <motion.div 
            className="detail-success-toast"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
          >
            <span>✓</span>
            <div><strong>Added to Cart!</strong><p>Your customized {safeCar.name} has been added</p></div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="detail-back">
        <button className="back-btn" onClick={() => navigate(-1)}>← Back to Vehicles</button>
      </div>

      {/* Hero Section */}
      <div className="detail-hero">
        <div className="detail-hero-content">
          <div className="hero-badge">{safeCar.brand}</div>
          <h1>{safeCar.name}</h1>
          <div className="hero-price">${totalPrice.toLocaleString()}</div>
          {safeCar.year < 2020 && (<div className="hero-badges"><span className="badge-certified">✓ Certified Pre-owned</span><span className="badge-warranty">✓ 2-Year Warranty</span></div>)}
          <div className="hero-rating"><span className="stars">★★★★★</span><span className="rating-count">(128 reviews)</span></div>
        </div>
      </div>

      {/* CAR DETAILS SECTION - AT THE TOP (Image Gallery + Info Panel) */}
      <div className="detail-main">
        <div className="detail-gallery">
          <div className="main-image">
            <img src={images[selectedImage]} alt={safeCar.name} />
            {selectedExteriorColor && (<div className="color-overlay" style={{ backgroundColor: selectedExteriorColor.code, opacity: 0.3 }}></div>)}
          </div>
          <div className="thumbnail-list">
            {images.map((img, index) => (<div key={index} className={`thumbnail ${selectedImage === index ? 'active' : ''}`} onClick={() => setSelectedImage(index)}><img src={img} alt={`View ${index + 1}`} /></div>))}
          </div>
        </div>

        <div className="detail-info">
          <div className="quick-specs">
            <div className="quick-spec"><span className="spec-icon">⚡</span><div><div className="spec-value">{safeCar.horsepower}</div><div className="spec-label">Horsepower</div></div></div>
            <div className="spec-divider"></div>
            <div className="quick-spec"><span className="spec-icon">🏎️</span><div><div className="spec-value">{safeCar.acceleration}</div><div className="spec-label">0-60 mph</div></div></div>
            <div className="spec-divider"></div>
            <div className="quick-spec"><span className="spec-icon">💨</span><div><div className="spec-value">{safeCar.topSpeed}</div><div className="spec-label">Top Speed</div></div></div>
          </div>

          <div className="action-buttons">
            <button className="add-to-cart-btn-detail" onClick={handleAddToCart}>🛒 Add to Cart - ${totalPrice.toLocaleString()}</button>
            <button className="finance-btn-detail" onClick={() => setShowFinanceCalculator(true)}>💰 Finance</button>
          </div>

          <div className="detail-tabs">
            <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>Overview</button>
            <button className={`tab ${activeTab === 'specs' ? 'active' : ''}`} onClick={() => setActiveTab('specs')}>Specifications</button>
            <button className={`tab ${activeTab === 'features' ? 'active' : ''}`} onClick={() => setActiveTab('features')}>Features</button>
          </div>

          <div className="tab-content">
            {activeTab === 'overview' && (<div className="overview-content"><h3>About this Vehicle</h3><p>{safeCar.description}</p></div>)}
            {activeTab === 'specs' && (<div className="specs-content"><p>Engine: {safeCar.engine}</p><p>Horsepower: {safeCar.horsepower}</p><p>Torque: {safeCar.torque}</p><p>Acceleration: {safeCar.acceleration}</p><p>Top Speed: {safeCar.topSpeed}</p></div>)}
            {activeTab === 'features' && (<div className="features-content"><p>✓ LED Headlights</p><p>✓ Leather Seats</p><p>✓ Navigation System</p><p>✓ Premium Sound</p></div>)}
          </div>
        </div>
      </div>

      {/* CUSTOMIZATION PANEL - AT THE BOTTOM */}
      <div className="customize-panel-compact">
        <h3>🎨 Customize Your {safeCar.name}</h3>
        
        <div className="customize-row">
          <div className="customize-col">
            <label>Exterior Color</label>
            <div className="customize-options">
              {exteriorColors.map((color) => (
                <div key={color.name} className={`customize-chip ${selectedExteriorColor?.name === color.name ? 'selected' : ''}`} onClick={() => setSelectedExteriorColor(color)}>
                  <div className="color-chip" style={{ backgroundColor: color.code }}></div>
                  <span>{color.name}</span>
                  <span className="chip-price">{color.price === 0 ? '✓' : `+$${color.price}`}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="customize-col">
            <label>Interior Color</label>
            <div className="customize-options">
              {interiorColors.map((color) => (
                <div key={color.name} className={`customize-chip ${selectedInteriorColor?.name === color.name ? 'selected' : ''}`} onClick={() => setSelectedInteriorColor(color)}>
                  <div className="color-chip" style={{ backgroundColor: color.code }}></div>
                  <span>{color.name}</span>
                  <span className="chip-price">{color.price === 0 ? '✓' : `+$${color.price}`}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="customize-row">
          <div className="customize-col">
            <label>Wheels</label>
            <div className="customize-options">
              {wheelOptions.map((wheel) => (
                <div key={wheel.name} className={`customize-chip ${selectedWheel?.name === wheel.name ? 'selected' : ''}`} onClick={() => setSelectedWheel(wheel)}>
                  <span>{wheel.name}</span>
                  <span className="chip-style">{wheel.style}</span>
                  <span className="chip-price">{wheel.price === 0 ? '✓' : `+$${wheel.price}`}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="customize-col">
            <label>Tires</label>
            <div className="customize-options">
              {tireOptions.map((tire) => (
                <div key={tire.name} className={`customize-chip ${selectedTire?.name === tire.name ? 'selected' : ''}`} onClick={() => setSelectedTire(tire)}>
                  <span>{tire.name}</span>
                  <span className="chip-style">{tire.performance}</span>
                  <span className="chip-price">{tire.price === 0 ? '✓' : `+$${tire.price}`}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="customize-row">
          <div className="customize-col">
            <label>Packages</label>
            <div className="customize-options">
              {optionPackages.map((pkg) => (
                <div key={pkg.name} className={`customize-chip ${selectedPackage?.name === pkg.name ? 'selected' : ''}`} onClick={() => setSelectedPackage(pkg)}>
                  <span>{pkg.name}</span>
                  <span className="chip-price">{pkg.price === 0 ? '✓' : `+$${pkg.price}`}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="customize-col">
            <label>Accessories</label>
            <div className="customize-options">
              {accessories.map((acc) => (
                <div key={acc.name} className={`customize-chip ${selectedAccessory.find(a => a.name === acc.name) ? 'selected' : ''}`} onClick={() => toggleAccessory(acc)}>
                  <span className="chip-icon">{acc.icon}</span>
                  <span>{acc.name}</span>
                  <span className="chip-price">{selectedAccessory.find(a => a.name === acc.name) ? '✓' : `+$${acc.price}`}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="customize-summary">
          <div className="customize-total">
            <span>Total Price:</span>
            <strong>${totalPrice.toLocaleString()}</strong>
          </div>
          <button className="customize-add-btn" onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>

      {showFinanceCalculator && (
        <div className="finance-modal" onClick={() => setShowFinanceCalculator(false)}>
          <div className="finance-modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="finance-modal-header"><h3>Finance Calculator</h3><button className="close-modal" onClick={() => setShowFinanceCalculator(false)}>×</button></div>
            <div className="finance-modal-body">
              <div className="calculator-inputs">
                <div className="input-group"><label>Vehicle Price</label><input type="range" min="10000" max="300000" step="1000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} /><span>${loanAmount.toLocaleString()}</span></div>
                <div className="input-group"><label>Down Payment</label><input type="range" min="0" max={loanAmount * 0.5} step="1000" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} /><span>${downPayment.toLocaleString()}</span></div>
                <div className="input-group"><label>Loan Term</label><select value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))}><option value={36}>36 months</option><option value={48}>48 months</option><option value={60}>60 months</option></select></div>
                <div className="input-group"><label>Interest Rate</label><input type="range" min="0" max="15" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} /><span>{interestRate}%</span></div>
              </div>
              <div className="calculator-result"><div className="result-item"><span>Monthly Payment</span><strong>${calculateMonthlyPayment().toFixed(2)}</strong></div></div>
              <button className="apply-finance">Apply for Financing →</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetailPage;