import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const UsedCars = ({ cars, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDecade, setSelectedDecade] = useState('all');
  const { addToCart } = useCart();

  // Filter only used/second-hand cars (year < 2020)
  const usedCars = cars.filter(car => car.year < 2020);

  // Get decades for used cars
  const decades = ['all', ...new Set(usedCars.map(car => {
    const decade = Math.floor(car.year / 10) * 10;
    return `${decade}s`;
  }))].sort();

  // Get unique brands and categories from used cars
  const brands = ['all', ...new Set(usedCars.map(car => car.brand))];
  const categories = ['all', ...new Set(usedCars.map(car => car.category))];

  // Filter used cars
  const filteredUsedCars = usedCars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = filterBrand === 'all' || car.brand === filterBrand;
    const matchesCategory = filterCategory === 'all' || car.category === filterCategory;
    
    let matchesDecade = true;
    if (selectedDecade !== 'all') {
      const carDecade = `${Math.floor(car.year / 10) * 10}s`;
      matchesDecade = carDecade === selectedDecade;
    }
    
    return matchesSearch && matchesBrand && matchesCategory && matchesDecade;
  });

  // Statistics
  const usedStats = {
    total: usedCars.length,
    oldest: Math.min(...usedCars.map(c => c.year)),
    newest: Math.max(...usedCars.map(c => c.year)),
    decades: decades.filter(d => d !== 'all').length,
    brands: [...new Set(usedCars.map(c => c.brand))].length,
    avgPrice: Math.round(usedCars.reduce((acc, car) => {
      const price = parseFloat(car.price.replace(/[^0-9.-]+/g, ''));
      return acc + (isNaN(price) ? 0 : price);
    }, 0) / usedCars.length)
  };

  // Calculate car age
  const getCarAge = (year) => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;
    if (age <= 5) return `${age} years • Like New`;
    if (age <= 10) return `${age} years • Good`;
    if (age <= 20) return `${age} years • Well Maintained`;
    return `${age}+ years • Classic`;
  };

  const handleAddToCart = (e, car) => {
    e.stopPropagation();
    addToCart(car);
  };

  return (
    <div className="usedcars-page">
      {/* Hero Section */}
      <div className="usedcars-hero">
        <div className="usedcars-hero-overlay"></div>
        <div className="usedcars-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="usedcars-hero-badge">Certified Pre-Owned</span>
            <h1>Used <span>Cars Collection</span></h1>
            <p>Discover our extensive collection of certified pre-owned vehicles. Each car comes with a comprehensive warranty and multi-point inspection for peace of mind.</p>
            <div className="usedcars-hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">{usedStats.total}+</div>
                <div className="hero-stat-label">Used Vehicles</div>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <div className="hero-stat-number">{usedStats.brands}</div>
                <div className="hero-stat-label">Brands Available</div>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <div className="hero-stat-number">{usedStats.decades}</div>
                <div className="hero-stat-label">Decades</div>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <div className="hero-stat-number">100%</div>
                <div className="hero-stat-label">Certified</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="usedcars-stats-cards">
        <div className="stat-card">
          <div className="stat-icon">🚗</div>
          <div className="stat-info">
            <div className="stat-number">{usedStats.total}</div>
            <div className="stat-label">Total Used Cars</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏭</div>
          <div className="stat-info">
            <div className="stat-number">{usedStats.brands}</div>
            <div className="stat-label">Brands</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <div className="stat-number">${usedStats.avgPrice.toLocaleString()}</div>
            <div className="stat-label">Avg Price</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <div className="stat-number">2 Year</div>
            <div className="stat-label">Warranty</div>
          </div>
        </div>
      </div>

      {/* Used Car Banner */}
      <div className="usedcar-banner">
        <span className="usedcar-icon">🔄</span>
        <div className="usedcar-text">
          <h3>Certified Pre-Owned Collection</h3>
          <p>Every vehicle comes with comprehensive warranty and multi-point inspection</p>
        </div>
        <div className="usedcar-badge">
          <span>✓ 120-Point Inspection</span>
          <span>✓ 2-Year Warranty</span>
          <span>✓ Free Service History</span>
        </div>
      </div>

      {/* Year Filters */}
      <div className="year-filters">
        <button 
          className={`year-chip ${selectedDecade === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedDecade('all')}
        >
          All Years
        </button>
        {decades.filter(d => d !== 'all').map(decade => (
          <button 
            key={decade}
            className={`year-chip ${selectedDecade === decade ? 'active' : ''}`}
            onClick={() => setSelectedDecade(decade)}
          >
            {decade}
          </button>
        ))}
      </div>

      {/* Controls Bar */}
      <div className="usedcars-controls">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search used vehicles by model or brand..."
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
      <div className="usedcars-results">
        <div className="results-info">
          Found <strong>{filteredUsedCars.length}</strong> used vehicles
          {searchTerm && <span className="search-term"> for "{searchTerm}"</span>}
        </div>
        <div className="used-stats">
          <span>📅 {usedStats.oldest} - {usedStats.newest}</span>
          <span>🎯 {usedStats.decades} Decades</span>
          <span>✅ Certified Pre-owned</span>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="usedcars-grid">
          {filteredUsedCars.map((car, index) => (
            <motion.div
              key={car.id}
              className="usedcar-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -10 }}
              onClick={() => onViewDetails(car)}
            >
              <div className="card-image">
                <img src={car.image} alt={car.name} />
                <div className="card-badge used">PRE-OWNED</div>
                <div className="card-year-badge">{car.year}</div>
              </div>
              <div className="card-content">
                <div className="card-header">
                  <span className="brand used-brand">{car.brand}</span>
                  <div className="rating">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
                <h3>{car.name}</h3>
                
                {/* Car Age Info */}
                <div className="car-age-info">
                  <span className="age-badge">📅 {getCarAge(car.year)}</span>
                  {car.mileage && <span className="mileage-badge">📊 {car.mileage}</span>}
                </div>
                
                <div className="specs">
                  <span>⚡ {car.horsepower}</span>
                  <span>🏎️ {car.acceleration}</span>
                  {car.topSpeed && <span>💨 {car.topSpeed}</span>}
                </div>
                
                <div className="price used-price">{car.price}</div>
                
                <div className="used-features">
                  <span>✓ Warranty Included</span>
                  <span>✓ Certified</span>
                  <span>✓ Free Delivery</span>
                </div>
                
                <div className="card-buttons">
                  <button className="view-details used-btn" onClick={(e) => {
                    e.stopPropagation();
                    onViewDetails(car);
                  }}>View Details →</button>
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
        <div className="usedcars-list">
          {filteredUsedCars.map((car) => (
            <motion.div
              key={car.id}
              className="usedcar-list-item"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: 10 }}
              onClick={() => onViewDetails(car)}
            >
              <div className="list-image">
                <img src={car.image} alt={car.name} />
                <div className="list-badge">PRE-OWNED</div>
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
                  {car.mileage && <span>📊 {car.mileage}</span>}
                </div>
                <div className="warranty-badge">✓ 2-Year Warranty Included • {getCarAge(car.year)}</div>
              </div>
              <div className="list-price">
                <div className="price">{car.price}</div>
                <div className="list-buttons">
                  <button className="view-btn" onClick={(e) => {
                    e.stopPropagation();
                    onViewDetails(car);
                  }}>View</button>
                  <button className="cart-btn-small" onClick={(e) => handleAddToCart(e, car)}>🛒</button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
      
      {/* Empty State */}
      {filteredUsedCars.length === 0 && (
        <div className="no-results">
          <span>🔄</span>
          <h3>No used vehicles found</h3>
          <p>Try adjusting your search, filters, or year selection</p>
          <button onClick={() => { setSearchTerm(''); setFilterBrand('all'); setFilterCategory('all'); setSelectedDecade('all'); }}>
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default UsedCars;