import React, { useState } from 'react';

const CarDetail = ({ car, onClose }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [activeTab, setActiveTab] = useState('specs');
  const [showContactForm, setShowContactForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  if (!car) return null;

  // Additional images (using same image for demo, in real app you'd have multiple)
  const additionalImages = [
    car.image,
    car.image,
    car.image,
    car.image
  ];

  // Safe car data with fallbacks
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
    featured: car.featured || false,
    description: car.description || 'Experience luxury and performance at its finest.',
    image: car.image || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=600'
  };

  // Specifications organized by category
  const specifications = {
    'Engine & Performance': {
      specs: {
        'Engine': safeCar.engine,
        'Horsepower': safeCar.horsepower,
        'Torque': safeCar.torque,
        'Acceleration (0-60 mph)': safeCar.acceleration,
        'Top Speed': safeCar.topSpeed,
        'Drivetrain': 'All-Wheel Drive'
      }
    },
    'Efficiency & Range': {
      specs: {
        'Fuel Type': safeCar.range ? 'Electric' : 'Premium Gasoline',
        'Range': safeCar.range || '450 miles',
        'Fuel Economy': safeCar.range ? '102 MPGe' : '18/25 MPG',
        'CO2 Emissions': safeCar.range ? '0 g/km' : '220 g/km'
      }
    },
    'Dimensions & Weight': {
      specs: {
        'Length': '196.0 in',
        'Width': '78.2 in',
        'Height': '56.3 in',
        'Curb Weight': '4,560 lbs',
        'Cargo Volume': '25.6 cu ft',
        'Ground Clearance': '5.2 in'
      }
    },
    'Comfort & Interior': {
      specs: {
        'Seating': '4 Passengers',
        'Seat Material': 'Premium Leather',
        'Climate Control': 'Tri-Zone Automatic',
        'Sunroof': 'Panoramic Glass Roof',
        'Ambient Lighting': '64 Colors',
        'Sound System': 'Premium Audio'
      }
    },
    'Safety & Security': {
      specs: {
        'Airbags': '8 Airbags',
        'Braking System': 'Anti-lock Braking System',
        'Stability Control': 'Electronic Stability Program',
        'Camera System': '360° Surround View',
        'Parking Sensors': 'Front & Rear',
        'Blind Spot Monitor': 'Standard'
      }
    }
  };

  // Features lists
  const featureCategories = {
    'Exterior': [
      'LED Matrix Headlights',
      'Carbon Fiber Spoiler',
      '21" Alloy Wheels',
      'Panoramic Glass Roof',
      'Auto-dimming Mirrors',
      'Rain-sensing Wipers'
    ],
    'Interior': [
      'Heated & Ventilated Seats',
      'Premium Leather Upholstery',
      'Ambient Lighting (64 colors)',
      'Massage Function Front Seats',
      'Wireless Charging Pad',
      '4-Zone Climate Control'
    ],
    'Technology': [
      '17-inch Touchscreen Display',
      'Wireless Apple CarPlay/Android Auto',
      'Head-Up Display',
      'Premium Sound System (22 speakers)',
      'Voice Control Assistant',
      'Over-the-Air Updates'
    ],
    'Safety': [
      'Adaptive Cruise Control',
      'Lane Keep Assist',
      'Automatic Emergency Braking',
      '360° Camera System',
      'Driver Attention Monitor',
      'Traffic Sign Recognition'
    ]
  };

  const handleImageChange = (index) => {
    setSelectedImage(index);
  };

  const handleBuyNow = () => {
    setShowContactForm(true);
  };

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setShowContactForm(false);
      onClose();
    }, 3000);
  };

  return (
    <div className="car-detail-overlay" onClick={onClose}>
      <div className="car-detail-container" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="detail-header">
          <button className="back-btn" onClick={onClose}>
            ← Back to Collection
          </button>
          <div className="detail-actions">
            <button className="action-btn">❤️</button>
            <button className="action-btn">📤</button>
          </div>
        </div>

        {/* Main Content */}
        <div className="detail-main">
          {/* Image Gallery */}
          <div className="detail-gallery">
            <div className="main-image">
              <img src={additionalImages[selectedImage]} alt={safeCar.name} />
              {safeCar.featured && <span className="featured-badge">🔥 Featured</span>}
            </div>
            <div className="thumbnail-list">
              {additionalImages.map((img, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
                  onClick={() => handleImageChange(index)}
                >
                  <img src={img} alt={`${safeCar.name} view ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          {/* Info Panel */}
          <div className="detail-info">
            <div className="car-title">
              <div>
                <h1>{safeCar.name}</h1>
                <div className="car-brand-badge">{safeCar.brand}</div>
              </div>
              <div className="car-rating">
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span className="star">★</span>
                <span>(128 reviews)</span>
              </div>
            </div>
            
            <div className="car-price-large">
              <span className="price">{safeCar.price}</span>
              <span className="price-note">MSRP + destination fee</span>
            </div>

            {/* Quick Specs */}
            <div className="quick-specs">
              <div className="quick-spec">
                <span className="spec-icon">⚡</span>
                <span className="spec-value">{safeCar.horsepower}</span>
                <span className="spec-label">Horsepower</span>
              </div>
              <div className="quick-spec">
                <span className="spec-icon">🏎️</span>
                <span className="spec-value">{safeCar.acceleration}</span>
                <span className="spec-label">0-60 mph</span>
              </div>
              <div className="quick-spec">
                <span className="spec-icon">💨</span>
                <span className="spec-value">{safeCar.topSpeed}</span>
                <span className="spec-label">Top Speed</span>
              </div>
              {safeCar.range && (
                <div className="quick-spec">
                  <span className="spec-icon">🔋</span>
                  <span className="spec-value">{safeCar.range}</span>
                  <span className="spec-label">Range</span>
                </div>
              )}
            </div>

            <div className="action-buttons">
              <button className="buy-now-btn" onClick={handleBuyNow}>
                Buy Now →
              </button>
              <button className="inquiry-btn" onClick={() => setShowContactForm(true)}>
                Request Info
              </button>
            </div>

            {/* Tabs */}
            <div className="detail-tabs">
              <button className={`tab-btn ${activeTab === 'specs' ? 'active' : ''}`} onClick={() => setActiveTab('specs')}>
                📊 Specifications
              </button>
              <button className={`tab-btn ${activeTab === 'features' ? 'active' : ''}`} onClick={() => setActiveTab('features')}>
                ✨ Features
              </button>
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === 'specs' && (
                <div className="specs-categories">
                  {Object.entries(specifications).map(([category, data]) => (
                    <div className="spec-category" key={category}>
                      <div className="category-header">
                        <h3>{category}</h3>
                      </div>
                      <div className="category-specs">
                        {Object.entries(data.specs).map(([key, value]) => (
                          <div className="spec-item" key={key}>
                            <span className="spec-label">{key}</span>
                            <span className="spec-value">{value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'features' && (
                <div className="features-grid">
                  {Object.entries(featureCategories).map(([category, features]) => (
                    <div className="feature-category" key={category}>
                      <h4>{category}</h4>
                      <ul>
                        {features.map((feature, index) => (
                          <li key={index}>
                            <span className="check-icon">✓</span> {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Description */}
            <div className="car-description-full">
              <p>{safeCar.description}</p>
            </div>
          </div>
        </div>

        {/* Contact Form Modal */}
        {showContactForm && (
          <div className="contact-form-overlay" onClick={() => setShowContactForm(false)}>
            <div className="contact-form-modal" onClick={(e) => e.stopPropagation()}>
              <div className="form-header">
                <h3>Purchase {safeCar.name}</h3>
                <button className="close-form" onClick={() => setShowContactForm(false)}>×</button>
              </div>
              {formSubmitted ? (
                <div className="form-success">
                  <div className="success-icon">✓</div>
                  <h4>Thank you for your interest!</h4>
                  <p>A sales representative will contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleFormChange} required />
                  </div>
                  <div className="form-group">
                    <input type="email" name="email" placeholder="Email Address" value={formData.email} onChange={handleFormChange} required />
                  </div>
                  <div className="form-group">
                    <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleFormChange} required />
                  </div>
                  <div className="form-group">
                    <textarea 
                      name="message" 
                      placeholder={`I'm interested in purchasing the ${safeCar.name}...`} 
                      rows="3" 
                      value={formData.message} 
                      onChange={handleFormChange}
                    ></textarea>
                  </div>
                  <button type="submit" className="submit-inquiry">Send Inquiry</button>
                </form>
              )}
              <div className="contact-options">
                <p>Or contact us directly:</p>
                <div className="contact-icons">
                  <a href="tel:+18885550123">📞 Call</a>
                  <a href="mailto:sales@luxedrive.com">✉️ Email</a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarDetail;