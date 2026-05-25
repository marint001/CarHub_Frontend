import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const VehiclesTable = ({ cars, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  const brands = ['all', ...new Set(cars.map(car => car.brand))];

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = filterBrand === 'all' || car.brand === filterBrand;
    const matchesType = filterType === 'all' || 
                       (filterType === 'new' && car.year >= 2020) ||
                       (filterType === 'secondhand' && car.year < 2020);
    return matchesSearch && matchesBrand && matchesType;
  });

  const stats = {
    total: filteredCars.length,
    new: filteredCars.filter(c => c.year >= 2020).length,
    preowned: filteredCars.filter(c => c.year < 2020).length,
    brands: [...new Set(filteredCars.map(c => c.brand))].length
  };

  return (
    <div className="vehicles-page">
      {/* Hero Section for Vehicles Page */}
      <div className="vehicles-hero">
        <div className="vehicles-hero-overlay"></div>
        <div className="vehicles-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="vehicles-hero-badge">Our Inventory</span>
            <h1>Find Your <span>Perfect Vehicle</span></h1>
            <p>Browse our extensive collection of new and pre-owned luxury vehicles. Each car comes with a comprehensive warranty and multi-point inspection.</p>
            <div className="vehicles-hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">{cars.length}+</div>
                <div className="hero-stat-label">Vehicles Available</div>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <div className="hero-stat-number">{brands.length - 1}</div>
                <div className="hero-stat-label">Premium Brands</div>
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
      <div className="vehicles-stats-cards">
        <div className="stat-card">
          <div className="stat-icon">🚗</div>
          <div className="stat-info">
            <div className="stat-number">{stats.total}</div>
            <div className="stat-label">Total Vehicles</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-info">
            <div className="stat-number">{stats.new}</div>
            <div className="stat-label">New Cars</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🔄</div>
          <div className="stat-info">
            <div className="stat-number">{stats.preowned}</div>
            <div className="stat-label">Pre-owned</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🏭</div>
          <div className="stat-info">
            <div className="stat-number">{stats.brands}</div>
            <div className="stat-label">Brands</div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="vehicles-filters-section">
        <div className="vehicles-search">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search by model, brand, or specification..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="vehicles-filter-group">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="filter-select">
            <option value="all">All Vehicles</option>
            <option value="new">🚗 New Cars</option>
            <option value="secondhand">🔄 Pre-owned</option>
          </select>
          
          <select value={filterBrand} onChange={(e) => setFilterBrand(e.target.value)} className="filter-select">
            {brands.map(brand => (
              <option key={brand} value={brand}>
                {brand === 'all' ? 'All Brands' : brand}
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
      <div className="vehicles-results">
        <span className="results-count">Found {filteredCars.length} vehicles</span>
        {searchTerm && <span className="search-term">for "{searchTerm}"</span>}
      </div>

      {/* Vehicles Display */}
      {viewMode === 'grid' ? (
        <div className="vehicles-grid">
          {filteredCars.map((car, index) => (
            <motion.div
              key={car.id}
              className="vehicle-card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              whileHover={{ y: -8 }}
              onClick={() => onViewDetails(car)}
            >
              <div className="vehicle-card-image">
                <img src={car.image} alt={car.name} />
                <div className="vehicle-card-badge">
                  {car.year >= 2020 ? (
                    <span className="badge-new">NEW</span>
                  ) : (
                    <span className="badge-preowned">PRE-OWNED</span>
                  )}
                </div>
              </div>
              <div className="vehicle-card-content">
                <div className="vehicle-card-header">
                  <span className="vehicle-brand">{car.brand}</span>
                  <span className="vehicle-year">{car.year}</span>
                </div>
                <h3 className="vehicle-name">{car.name}</h3>
                <div className="vehicle-specs">
                  <span>⚡ {car.horsepower}</span>
                  <span>🏎️ {car.acceleration}</span>
                </div>
                <div className="vehicle-price">{car.price}</div>
                <button className="vehicle-view-btn">View Details →</button>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="vehicles-list">
          {filteredCars.map((car) => (
            <motion.div
              key={car.id}
              className="vehicle-list-item"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              whileHover={{ x: 10 }}
              onClick={() => onViewDetails(car)}
            >
              <img src={car.image} alt={car.name} />
              <div className="vehicle-list-info">
                <h4>{car.name}</h4>
                <p>{car.brand} • {car.year}</p>
                <div className="vehicle-list-specs">
                  <span>{car.horsepower}</span>
                  <span>{car.acceleration}</span>
                  <span>{car.category}</span>
                </div>
              </div>
              <div className="vehicle-list-price">
                <span>{car.price}</span>
                <button>View</button>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {filteredCars.length === 0 && (
        <div className="vehicles-empty">
          <span>🔍</span>
          <h3>No vehicles found</h3>
          <p>Try adjusting your search or filter criteria</p>
          <button onClick={() => { setSearchTerm(''); setFilterType('all'); setFilterBrand('all'); }}>
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default VehiclesTable;