import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const CarDetailPage = ({ car, onBack, onCustomize }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedImage, setSelectedImage] = useState(0);
  const [showFinanceCalculator, setShowFinanceCalculator] = useState(false);
  const [loanAmount, setLoanAmount] = useState(50000);
  const [downPayment, setDownPayment] = useState(10000);
  const [loanTerm, setLoanTerm] = useState(60);
  const [interestRate, setInterestRate] = useState(5.9);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!car) return null;

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

  const basePrice = parseFloat(safeCar.price.replace(/[^0-9.-]+/g, ''));

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

  const features = {
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
          <div className="hero-price">{safeCar.price}</div>
          {safeCar.year < 2020 && (
            <div className="hero-badges">
              <span className="badge-certified">✓ Certified Pre-owned</span>
              <span className="badge-warranty">✓ 2-Year Warranty</span>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="detail-main">
        {/* Image Gallery */}
        <div className="detail-gallery">
          <div className="main-image">
            <img src={images[selectedImage]} alt={safeCar.name} />
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
          {/* Quick Specs */}
          <div className="quick-specs">
            <div className="quick-spec">
              <span className="spec-icon">⚡</span>
              <div>
                <div className="spec-value">{safeCar.horsepower}</div>
                <div className="spec-label">Horsepower</div>
              </div>
            </div>
            <div className="spec-divider"></div>
            <div className="quick-spec">
              <span className="spec-icon">🏎️</span>
              <div>
                <div className="spec-value">{safeCar.acceleration}</div>
                <div className="spec-label">0-60 mph</div>
              </div>
            </div>
            <div className="spec-divider"></div>
            <div className="quick-spec">
              <span className="spec-icon">💨</span>
              <div>
                <div className="spec-value">{safeCar.topSpeed}</div>
                <div className="spec-label">Top Speed</div>
              </div>
            </div>
          </div>

          {/* Pre-owned Info Card */}
          {safeCar.year < 2020 && (
            <div className="preowned-info-card">
              <h4>Vehicle History</h4>
              <div className="info-grid">
                <div className="info-item">
                  <span className="info-label">Manufactured</span>
                  <span className="info-value">{safeCar.year}</span>
                </div>
                {safeCar.mileage && (
                  <div className="info-item">
                    <span className="info-label">Mileage</span>
                    <span className="info-value">{safeCar.mileage}</span>
                  </div>
                )}
                {safeCar.owners && (
                  <div className="info-item">
                    <span className="info-label">Previous Owners</span>
                    <span className="info-value">{safeCar.owners}</span>
                  </div>
                )}
                <div className="info-item">
                  <span className="info-label">Condition</span>
                  <span className="info-value">{safeCar.condition}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">Car Age</span>
                  <span className="info-value">{getCarAge()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="action-buttons">
            <button className="buy-btn" onClick={() => setShowFinanceCalculator(true)}>
              Buy Now →
            </button>
            <button className="customize-btn" onClick={() => onCustomize && onCustomize()}>
              🎨 Customize
            </button>
            <button className="inquiry-btn">
              Request Info
            </button>
          </div>

          {/* Tabs */}
          <div className="detail-tabs">
            <button className={`tab ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
              Overview
            </button>
            <button className={`tab ${activeTab === 'specs' ? 'active' : ''}`} onClick={() => setActiveTab('specs')}>
              Specifications
            </button>
            <button className={`tab ${activeTab === 'features' ? 'active' : ''}`} onClick={() => setActiveTab('features')}>
              Features
            </button>
          </div>

          {/* Tab Content */}
          <div className="tab-content">
            {activeTab === 'overview' && (
              <div className="overview-content">
                <h3>About this Vehicle</h3>
                <p>{safeCar.description}</p>
                <div className="highlights">
                  <div className="highlight">
                    <span>🏆</span>
                    <div>
                      <h4>Award Winning</h4>
                      <p>Recognized for excellence</p>
                    </div>
                  </div>
                  <div className="highlight">
                    <span>🔧</span>
                    <div>
                      <h4>5-Year Warranty</h4>
                      <p>Comprehensive coverage</p>
                    </div>
                  </div>
                  <div className="highlight">
                    <span>🚗</span>
                    <div>
                      <h4>Free Maintenance</h4>
                      <p>3 years service</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'specs' && (
              <div className="specs-content">
                {Object.entries(specifications).map(([category, specs]) => (
                  <div className="spec-category" key={category}>
                    <h3>{category}</h3>
                    <div className="specs-table">
                      {Object.entries(specs).map(([key, value]) => (
                        <div className="spec-row" key={key}>
                          <span className="spec-key">{key}</span>
                          <span className="spec-value">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'features' && (
              <div className="features-content">
                {Object.entries(features).map(([category, items]) => (
                  <div className="feature-category" key={category}>
                    <h3>{category}</h3>
                    <ul>
                      {items.map((item, index) => (
                        <li key={index}>✓ {item}</li>
                      ))}
                    </ul>
                  </div>
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
            <div className="finance-modal-header">
              <h3>Finance Calculator</h3>
              <button className="close-modal" onClick={() => setShowFinanceCalculator(false)}>×</button>
            </div>
            <div className="finance-modal-body">
              <div className="car-info-mini">
                <h4>{safeCar.name}</h4>
                <p className="price">{safeCar.price}</p>
              </div>
              
              <div className="calculator-inputs">
                <div className="input-group">
                  <label>Vehicle Price</label>
                  <input type="range" min="10000" max="300000" step="1000" value={loanAmount} onChange={(e) => setLoanAmount(Number(e.target.value))} />
                  <span className="input-value">${loanAmount.toLocaleString()}</span>
                </div>
                <div className="input-group">
                  <label>Down Payment</label>
                  <input type="range" min="0" max={loanAmount * 0.5} step="1000" value={downPayment} onChange={(e) => setDownPayment(Number(e.target.value))} />
                  <span className="input-value">${downPayment.toLocaleString()}</span>
                </div>
                <div className="input-group">
                  <label>Loan Term (months)</label>
                  <select value={loanTerm} onChange={(e) => setLoanTerm(Number(e.target.value))}>
                    <option value={36}>36 months (3 years)</option>
                    <option value={48}>48 months (4 years)</option>
                    <option value={60}>60 months (5 years)</option>
                    <option value={72}>72 months (6 years)</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Interest Rate (%)</label>
                  <input type="range" min="0" max="15" step="0.1" value={interestRate} onChange={(e) => setInterestRate(Number(e.target.value))} />
                  <span className="input-value">{interestRate}%</span>
                </div>
              </div>
              
              <div className="calculator-result">
                <div className="result-item">
                  <span>Monthly Payment</span>
                  <strong>${calculateMonthlyPayment().toFixed(2)}</strong>
                </div>
                <div className="result-item">
                  <span>Total Interest</span>
                  <strong>${(calculateMonthlyPayment() * loanTerm - (loanAmount - downPayment)).toFixed(2)}</strong>
                </div>
                <div className="result-item">
                  <span>Total Cost</span>
                  <strong>${(calculateMonthlyPayment() * loanTerm + downPayment).toFixed(2)}</strong>
                </div>
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