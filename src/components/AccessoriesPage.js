import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const AccessoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPriceRange, setFilterPriceRange] = useState('all');
  const [filterBrand, setFilterBrand] = useState('all');
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
    { id: 'all', name: 'All Products', icon: '📦', count: accessories.length },
    { id: 'interior', name: 'Interior', icon: '🛋️', count: accessories.filter(a => a.category === 'interior').length },
    { id: 'exterior', name: 'Exterior', icon: '🚗', count: accessories.filter(a => a.category === 'exterior').length },
    { id: 'electronics', name: 'Electronics', icon: '📱', count: accessories.filter(a => a.category === 'electronics').length },
    { id: 'performance', name: 'Performance', icon: '⚡', count: accessories.filter(a => a.category === 'performance').length },
    { id: 'safety', name: 'Safety', icon: '🛡️', count: accessories.filter(a => a.category === 'safety').length },
    { id: 'cleaning', name: 'Cleaning', icon: '🧹', count: accessories.filter(a => a.category === 'cleaning').length }
  ];

  const brands = ['all', ...new Set(accessories.map(a => a.brand))];
  
  const priceRanges = [
    { id: 'all', label: 'All Prices', min: 0, max: Infinity },
    { id: 'under50', label: 'Under $50', min: 0, max: 50 },
    { id: '50to100', label: '$50 - $100', min: 50, max: 100 },
    { id: '100to200', label: '$100 - $200', min: 100, max: 200 },
    { id: 'over200', label: 'Over $200', min: 200, max: Infinity }
  ];

  const filteredAccessories = accessories.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesBrand = filterBrand === 'all' || item.brand === filterBrand;
    
    let matchesPrice = true;
    if (filterPriceRange !== 'all') {
      const range = priceRanges.find(r => r.id === filterPriceRange);
      if (range) {
        matchesPrice = item.price >= range.min && item.price <= range.max;
      }
    }
    return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
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

  // Calculate price range stats
  const priceStats = {
    min: Math.min(...accessories.map(a => a.price)),
    max: Math.max(...accessories.map(a => a.price)),
    avg: Math.round(accessories.reduce((sum, a) => sum + a.price, 0) / accessories.length)
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

      {/* Layout with Sidebar */}
      <div className="content-layout">
        {/* Sidebar Filters */}
        <aside className="content-sidebar">
          <div className="sidebar-filters accessories-sidebar">
            <div className="filter-section">
              <h3>Filters</h3>
              
              {/* Category Filter */}
              <div className="filter-group">
                <label>Categories</label>
                <div className="category-list">
                  {categories.map(cat => (
                    <div 
                      key={cat.id}
                      className={`category-item ${filterCategory === cat.id ? 'active' : ''}`}
                      onClick={() => setFilterCategory(cat.id)}
                    >
                      <span className="category-icon">{cat.icon}</span>
                      <span className="category-name">{cat.name}</span>
                      <span className="category-count">{cat.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brand Filter */}
              <div className="filter-group">
                <label>Brands</label>
                <select value={filterBrand} onChange={(e) => setFilterBrand(e.target.value)}>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>
                      {brand === 'all' ? 'All Brands' : brand}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Range Filter */}
              <div className="filter-group">
                <label>Price Range</label>
                <div className="price-ranges">
                  {priceRanges.map(range => (
                    <div 
                      key={range.id}
                      className={`price-chip ${filterPriceRange === range.id ? 'active' : ''}`}
                      onClick={() => setFilterPriceRange(range.id)}
                    >
                      {range.label}
                    </div>
                  ))}
                </div>
              </div>

              {/* Price Stats */}
              <div className="price-stats">
                <div className="price-stat">
                  <span>💰 Avg Price</span>
                  <strong>${priceStats.avg}</strong>
                </div>
                <div className="price-stat">
                  <span>📊 Price Range</span>
                  <strong>${priceStats.min} - ${priceStats.max}</strong>
                </div>
              </div>

              {/* View Toggle */}
              <div className="filter-group">
                <label>View</label>
                <div className="view-toggle-sidebar">
                  <button 
                    className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} 
                    onClick={() => setViewMode('grid')}
                  >
                    ⊞ Grid
                  </button>
                  <button 
                    className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} 
                    onClick={() => setViewMode('list')}
                  >
                    ≡ List
                  </button>
                </div>
              </div>

              {/* Reset Filters */}
              <button 
                className="reset-filters-btn"
                onClick={() => {
                  setFilterCategory('all');
                  setFilterBrand('all');
                  setFilterPriceRange('all');
                  setSearchTerm('');
                }}
              >
                Reset All Filters
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="content-main">
          {/* Search Bar */}
          <div className="search-bar-container">
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search accessories by name or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Results Info */}
          <div className="results-info">
            Found <strong>{filteredAccessories.length}</strong> products
            {searchTerm && <span className="search-term"> for "{searchTerm}"</span>}
          </div>

          {/* Grid View */}
          {viewMode === 'grid' && (
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
          )}

          {/* List View */}
          {viewMode === 'list' && (
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
        </main>
      </div>
    </div>
  );
};

export default AccessoriesPage;