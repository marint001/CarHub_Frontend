import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const AccessoriesPage = ({ onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [addedToast, setAddedToast] = useState(null);
  const { addToCart } = useCart();

  const accessories = [
    // Interior Accessories
    { id: 1, name: 'Premium Floor Mats', category: 'interior', price: 149, brand: 'AutoStyle', rating: 4.8, reviews: 234, icon: '🧩', description: 'Custom-fit premium floor mats for ultimate protection' },
    { id: 2, name: 'Leather Seat Covers', category: 'interior', price: 299, brand: 'LuxurySeat', rating: 4.9, reviews: 189, icon: '🛋️', description: 'Premium leather seat covers for luxury feel' },
    { id: 3, name: 'Steering Wheel Cover', category: 'interior', price: 39, brand: 'GripPro', rating: 4.7, reviews: 567, icon: '🔘', description: 'Comfortable grip steering wheel cover' },
    { id: 4, name: 'Car Air Freshener', category: 'interior', price: 19, brand: 'FreshAir', rating: 4.5, reviews: 1234, icon: '🌿', description: 'Long-lasting premium car fragrance' },
    { id: 5, name: 'Backseat Organizer', category: 'interior', price: 49, brand: 'OrganizePro', rating: 4.6, reviews: 345, icon: '📦', description: 'Multi-pocket backseat storage organizer' },
    
    // Exterior Accessories
    { id: 6, name: 'Carbon Fiber Spoiler', category: 'exterior', price: 399, brand: 'AeroTech', rating: 4.8, reviews: 78, icon: '🏎️', description: 'Lightweight carbon fiber rear spoiler' },
    { id: 7, name: 'LED Headlight Bulbs', category: 'exterior', price: 89, brand: 'BrightLite', rating: 4.7, reviews: 892, icon: '💡', description: 'Super bright LED headlight conversion kit' },
    { id: 8, name: 'Window Tint Film', category: 'exterior', price: 79, brand: 'TintPro', rating: 4.6, reviews: 456, icon: '🪟', description: 'UV protection window tint film' },
    { id: 9, name: 'Chrome Door Handles', category: 'exterior', price: 59, brand: 'ChromeMaster', rating: 4.5, reviews: 234, icon: '🚪', description: 'Premium chrome finish door handles' },
    { id: 10, name: 'Car Cover', category: 'exterior', price: 129, brand: 'CoverGuard', rating: 4.8, reviews: 567, icon: '🛡️', description: 'All-weather protective car cover' },
    
    // Electronics
    { id: 11, name: 'Dash Cam', category: 'electronics', price: 199, brand: 'SafeDrive', rating: 4.9, reviews: 1234, icon: '📹', description: '4K Ultra HD dashboard camera' },
    { id: 12, name: 'Wireless Charger', category: 'electronics', price: 49, brand: 'ChargeFast', rating: 4.7, reviews: 2345, icon: '🔋', description: 'Qi wireless car phone charger' },
    { id: 13, name: 'Bluetooth Adapter', category: 'electronics', price: 29, brand: 'AudioLink', rating: 4.6, reviews: 3456, icon: '🎵', description: 'Wireless Bluetooth FM transmitter' },
    { id: 14, name: 'CarPlay Screen', category: 'electronics', price: 299, brand: 'TechVision', rating: 4.8, reviews: 567, icon: '📱', description: '7-inch Wireless Apple CarPlay screen' },
    
    // Performance
    { id: 15, name: 'Performance Air Filter', category: 'performance', price: 89, brand: 'PowerFlow', rating: 4.8, reviews: 456, icon: '🌬️', description: 'High-flow reusable air filter' },
    { id: 16, name: 'Exhaust Tip', category: 'performance', price: 49, brand: 'ExhaustPro', rating: 4.5, reviews: 345, icon: '🔧', description: 'Stainless steel exhaust tip' },
    
    // Safety
    { id: 17, name: 'First Aid Kit', category: 'safety', price: 39, brand: 'SafetyKit', rating: 4.9, reviews: 1234, icon: '🏥', description: 'Comprehensive car first aid kit' },
    { id: 18, name: 'Emergency Tool Kit', category: 'safety', price: 59, brand: 'RoadHelp', rating: 4.8, reviews: 890, icon: '🔧', description: 'Essential emergency roadside tools' },
    
    // Cleaning
    { id: 19, name: 'Car Vacuum Cleaner', category: 'cleaning', price: 79, brand: 'CleanPro', rating: 4.7, reviews: 2345, icon: '🧹', description: 'Portable high-power car vacuum' },
    { id: 20, name: 'Microfiber Cloth Set', category: 'cleaning', price: 19, brand: 'SoftClean', rating: 4.8, reviews: 4567, icon: '🧵', description: 'Premium microfiber cleaning cloths' }
  ];

  const categories = [
    { id: 'all', name: 'All Products', icon: '📦' },
    { id: 'interior', name: 'Interior', icon: '🛋️' },
    { id: 'exterior', name: 'Exterior', icon: '🚗' },
    { id: 'electronics', name: 'Electronics', icon: '📱' },
    { id: 'performance', name: 'Performance', icon: '⚡' },
    { id: 'safety', name: 'Safety', icon: '🛡️' },
    { id: 'cleaning', name: 'Cleaning', icon: '🧹' }
  ];

  const filteredAccessories = accessories.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleAddToCart = (item) => {
    const cartItem = {
      id: 'acc_' + item.id + '_' + Date.now(),
      name: item.name,
      brand: item.brand,
      price: `$${item.price}`,
      image: null,
      icon: item.icon,
      quantity: 1,
      isAccessory: true,
      category: item.category
    };
    addToCart(cartItem);
    setAddedToast(item.name);
    setTimeout(() => setAddedToast(null), 2000);
  };

  return (
    <div className="accessories-page">
      {/* Toast Notification */}
      <AnimatePresence>
        {addedToast && (
          <motion.div 
            className="accessory-toast"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
          >
            <span>✓</span>
            <div>
              <strong>Added to Cart!</strong>
              <p>{addedToast} has been added to your cart</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <div className="accessories-hero">
        <div className="accessories-hero-overlay"></div>
        <div className="accessories-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="hero-badge">Premium Car Accessories</span>
            <h1>Upgrade Your <span>Ride</span></h1>
            <p>Discover premium accessories to enhance your driving experience. From interior comfort to performance upgrades.</p>
            <div className="hero-stats">
              <div className="stat"><span className="stat-number">{accessories.length}+</span><span className="stat-label">Products</span></div>
              <div className="stat"><span className="stat-number">100%</span><span className="stat-label">Authentic</span></div>
              <div className="stat"><span className="stat-number">Free</span><span className="stat-label">Shipping</span></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="categories-bar">
        {categories.map(cat => (
          <button
            key={cat.id}
            className={`category-btn ${filterCategory === cat.id ? 'active' : ''}`}
            onClick={() => setFilterCategory(cat.id)}
          >
            <span className="category-icon">{cat.icon}</span>
            <span>{cat.name}</span>
          </button>
        ))}
      </div>

      {/* Controls Bar */}
      <div className="accessories-controls">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search accessories by name or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="view-toggle">
          <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
            ⊞ Grid
          </button>
          <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
            ≡ List
          </button>
        </div>
      </div>

      {/* Results Info */}
      <div className="accessories-results">
        <span>Found {filteredAccessories.length} products</span>
        {searchTerm && <span className="search-term">for "{searchTerm}"</span>}
      </div>

      {/* Products Grid with Icons */}
      {viewMode === 'grid' ? (
        <div className="accessories-grid">
          {filteredAccessories.map((item, index) => (
            <motion.div
              key={item.id}
              className="accessory-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.03 }}
              whileHover={{ y: -5 }}
            >
              <div className="card-category">{item.category}</div>
              <div className="card-icon-large">{item.icon}</div>
              <div className="card-content">
                <h3>{item.name}</h3>
                <p className="brand">{item.brand}</p>
                <div className="rating">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  <span className="rating-count">({item.reviews})</span>
                </div>
                <p className="description">{item.description}</p>
                <div className="price-section">
                  <div className="price">${item.price}</div>
                  <button className="add-to-cart" onClick={() => handleAddToCart(item)}>
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="accessories-list">
          {filteredAccessories.map((item) => (
            <motion.div
              key={item.id}
              className="accessory-list-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: 5 }}
            >
              <div className="list-icon">{item.icon}</div>
              <div className="list-info">
                <div className="list-header">
                  <h4>{item.name}</h4>
                  <span className="list-category">{item.category}</span>
                </div>
                <p className="list-brand">{item.brand}</p>
                <div className="rating">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  <span>({item.reviews})</span>
                </div>
                <p className="list-description">{item.description}</p>
              </div>
              <div className="list-price">
                <div className="price">${item.price}</div>
                <button className="add-btn" onClick={() => handleAddToCart(item)}>Add to Cart</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {filteredAccessories.length === 0 && (
        <div className="no-results">
          <span>🔍</span>
          <h3>No accessories found</h3>
          <p>Try adjusting your search or filter criteria</p>
        </div>
      )}
    </div>
  );
};

export default AccessoriesPage;