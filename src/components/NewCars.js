import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const NewCars = ({ cars, onViewDetails, onCustomize }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const { addToCart } = useCart();

  // Get unique brands and categories
  const brands = ['all', ...new Set(cars.map(car => car.brand))];
  const categories = ['all', ...new Set(cars.map(car => car.category))];

  // Filter cars
  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = filterBrand === 'all' || car.brand === filterBrand;
    const matchesCategory = filterCategory === 'all' || car.category === filterCategory;
    return matchesSearch && matchesBrand && matchesCategory;
  });

  // Statistics
  const newStats = {
    total: cars.length,
    brands: [...new Set(cars.map(c => c.brand))].length,
    categories: [...new Set(cars.map(c => c.category))].length,
    avgHp: Math.round(cars.reduce((acc, car) => {
      const hp = parseInt(car.horsepower);
      return acc + (isNaN(hp) ? 0 : hp);
    }, 0) / cars.length)
  };

  const handleAddToCart = (e, car) => {
    e.stopPropagation();
    addToCart(car);
  };

  const handleCustomizeClick = (e, car) => {
    e.stopPropagation();
    if (onCustomize) {
      onCustomize(car);
    }
  };

  return (
    <div className="newcars-page">
      {/* Hero Section */}
      <div className="newcars-hero">
        <div className="newcars-hero-overlay"></div>
        <div className="newcars-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="newcars-hero-badge">Brand New Collection</span>
            <h1>New <span>Cars</span></h1>
            <p>Discover our latest collection of brand new vehicles straight from the factory. Each car comes with full manufacturer warranty and zero mileage.</p>
            <div className="newcars-hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">{newStats.total}+</div>
                <div className="hero-stat-label">New Vehicles</div>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <div className="hero-stat-number">{newStats.brands}</div>
                <div className="hero-stat-label">Premium Brands</div>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <div className="hero-stat-number">{newStats.avgHp}</div>
                <div className="hero-stat-label">Avg HP</div>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <div className="hero-stat-number">2024</div>
                <div className="hero-stat-label">Latest Models</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="newcars-stats-cards">
        <div className="stat-card">
          <div className="stat-icon">🚗</div>
          <div className="stat-info">
            <div className="stat-number">{newStats.total}</div>
            <div className="stat-label">New Vehicles</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏭</div>
          <div className="stat-info">
            <div className="stat-number">{newStats.brands}</div>
            <div className="stat-label">Brands</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⚡</div>
          <div className="stat-info">
            <div className="stat-number">{newStats.avgHp}</div>
            <div className="stat-label">Avg HP</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔧</div>
          <div className="stat-info">
            <div className="stat-number">5 Year</div>
            <div className="stat-label">Warranty</div>
          </div>
        </div>
      </div>

      {/* New Car Banner */}
      <div className="newcar-banner">
        <span className="newcar-icon">⭐</span>
        <div className="newcar-text">
          <h3>Factory Fresh Collection</h3>
          <p>Every vehicle comes with full manufacturer warranty, free delivery, and 0 miles</p>
        </div>
        <div className="newcar-badge">
          <span>✓ 5-Year Warranty</span>
          <span>✓ Free Delivery</span>
          <span>✓ 0 Miles</span>
        </div>
      </div>

      {/* Controls Bar */}
      <div className="newcars-controls">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search new vehicles by model or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="filter-wrapper">
          <select value={filterBrand} onChange={(e) => setFilterBrand(e.target.value)}>
            {brands.map(brand => (
              <option key={brand} value={brand}>
                {brand === 'all' ? 'All Brands' : brand}
              </option>
            ))}
          </select>
          
          <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
          
          <div className="view-toggle">
            <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>
              ⊞ Grid
            </button>
            <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>
              ≡ List
            </button>
          </div>
        </div>
      </div>

      {/* Results Info */}
      <div className="newcars-results">
        <div className="results-info">
          Found <strong>{filteredCars.length}</strong> new vehicles
          {searchTerm && <span className="search-term"> for "{searchTerm}"</span>}
        </div>
        <div className="new-stats">
          <span>🚗 Latest {new Date().getFullYear()} Models</span>
          <span>⭐ Premium Selection</span>
          <span>✅ Ready for Test Drive</span>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="newcars-grid">
          {filteredCars.map((car, index) => (
            <motion.div
              key={car.id}
              className="newcar-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -10 }}
              onClick={() => onViewDetails(car)}
            >
              <div className="card-image">
                <img src={car.image} alt={car.name} />
                <div className="card-badge new">NEW {car.year}</div>
                <div className="card-year-badge">{car.year}</div>
              </div>
              <div className="card-content">
                <div className="card-header">
                  <span className="brand new-brand">{car.brand}</span>
                  <div className="rating">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
                <h3>{car.name}</h3>
                
                {/* Car Specs */}
                <div className="car-specs-info">
                  <span className="spec-badge">⚡ {car.horsepower}</span>
                  <span className="spec-badge">🏎️ {car.acceleration}</span>
                  {car.range && <span className="spec-badge">🔋 {car.range}</span>}
                  {car.topSpeed && <span className="spec-badge">💨 {car.topSpeed}</span>}
                </div>
                
                <div className="price new-price">{car.price}</div>
                
                <div className="new-features">
                  <span>✓ Full Warranty</span>
                  <span>✓ 0 Miles</span>
                  <span>✓ Free Delivery</span>
                </div>
                
                <div className="card-buttons">
                  <button 
                    className="customize-card-btn" 
                    onClick={(e) => handleCustomizeClick(e, car)}
                  >
                    🎨 Customize
                  </button>
                  <button className="add-cart-btn" onClick={(e) => handleAddToCart(e, car)}>
                    🛒 Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* List View */}
      {viewMode === 'list' && (
        <div className="newcars-list">
          {filteredCars.map((car) => (
            <motion.div
              key={car.id}
              className="newcar-list-item"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: 10 }}
              onClick={() => onViewDetails(car)}
            >
              <div className="list-image">
                <img src={car.image} alt={car.name} />
                <div className="list-badge new-list-badge">NEW {car.year}</div>
              </div>
              <div className="list-info">
                <div className="list-header">
                  <h4>{car.name}</h4>
                  <div className="list-year">{car.year}</div>
                </div>
                <p>{car.brand} • {car.category}</p>
                <div className="list-specs">
                  <span>⚡ {car.horsepower}</span>
                  <span>🏎️ {car.acceleration}</span>
                  {car.range && <span>🔋 {car.range}</span>}
                </div>
                <div className="warranty-badge">✓ 5-Year Warranty Included</div>
              </div>
              <div className="list-price">
                <div className="price">{car.price}</div>
                <div className="list-buttons">
                  <button 
                    className="customize-list-btn" 
                    onClick={(e) => handleCustomizeClick(e, car)}
                  >
                    🎨
                  </button>
                  <button className="cart-btn-small" onClick={(e) => handleAddToCart(e, car)}>🛒</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Empty State */}
      {filteredCars.length === 0 && (
        <div className="no-results">
          <span>🚗</span>
          <h3>No new vehicles found</h3>
          <p>Try adjusting your search or filter criteria</p>
          <button onClick={() => { setSearchTerm(''); setFilterBrand('all'); setFilterCategory('all'); }}>
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default NewCars;