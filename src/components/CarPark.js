import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CarPark = ({ cars, onViewDetails }) => {
  const [activePark, setActivePark] = useState('new');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDecade, setSelectedDecade] = useState('all');

  // Separate cars by year
  const newCars = cars.filter(car => car.year >= 2020);
  const secondHandCars = cars.filter(car => car.year < 2020);

  // Get decades for second-hand cars
  const decades = ['all', ...new Set(secondHandCars.map(car => {
    const decade = Math.floor(car.year / 10) * 10;
    return `${decade}s`;
  }))].sort();

  // Get unique brands and categories
  const brands = ['all', ...new Set(cars.map(car => car.brand))];
  const categories = ['all', ...new Set(cars.map(car => car.category))];

  // Filter function
  const filterCars = (carList, isSecondHand = false) => {
    return carList.filter(car => {
      const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           car.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesBrand = filterBrand === 'all' || car.brand === filterBrand;
      const matchesCategory = filterCategory === 'all' || car.category === filterCategory;
      
      let matchesDecade = true;
      if (isSecondHand && selectedDecade !== 'all') {
        const carDecade = `${Math.floor(car.year / 10) * 10}s`;
        matchesDecade = carDecade === selectedDecade;
      }
      
      return matchesSearch && matchesBrand && matchesCategory && matchesDecade;
    });
  };

  const filteredNewCars = filterCars(newCars, false);
  const filteredSecondHandCars = filterCars(secondHandCars, true);
  const activeCars = activePark === 'new' ? filteredNewCars : filteredSecondHandCars;

  // Statistics
  const newStats = {
    total: newCars.length,
    brands: [...new Set(newCars.map(c => c.brand))].length
  };

  const secondHandStats = {
    total: secondHandCars.length,
    oldest: Math.min(...secondHandCars.map(c => c.year)),
    newest: Math.max(...secondHandCars.map(c => c.year)),
    decades: decades.filter(d => d !== 'all').length
  };

  // Calculate car age
  const getCarAge = (year) => {
    const currentYear = new Date().getFullYear();
    const age = currentYear - year;
    if (age <= 3) return `${age} years • Like New`;
    if (age <= 7) return `${age} years • Good`;
    if (age <= 15) return `${age} years • Well Maintained`;
    return `${age}+ years • Classic`;
  };

  return (
    <div className="carpark-page">
      {/* Hero Section */}
      <div className="carpark-hero">
        <div className="carpark-hero-overlay"></div>
        <div className="carpark-hero-content">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="carpark-hero-badge">Two Parks, One Passion</span>
            <h1>New & <span>Pre-Owned</span> Collection</h1>
            <p>Explore our dual collection of brand new vehicles and certified pre-owned cars. Each vehicle comes with our premium warranty and multi-point inspection.</p>
            <div className="carpark-hero-stats">
              <div className="hero-stat">
                <div className="hero-stat-number">{cars.length}+</div>
                <div className="hero-stat-label">Total Vehicles</div>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <div className="hero-stat-number">{newCars.length}</div>
                <div className="hero-stat-label">New Cars</div>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <div className="hero-stat-number">{secondHandCars.length}</div>
                <div className="hero-stat-label">Pre-Owned</div>
              </div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat">
                <div className="hero-stat-number">{brands.length - 1}</div>
                <div className="hero-stat-label">Premium Brands</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Park Tabs */}
      <div className="park-tabs">
        <button 
          className={`park-tab ${activePark === 'new' ? 'active' : ''}`}
          onClick={() => setActivePark('new')}
        >
          <span className="tab-label">New Car</span>
        </button>
        <button 
          className={`park-tab ${activePark === 'secondhand' ? 'active' : ''}`}
          onClick={() => setActivePark('secondhand')}
        >
          <span className="tab-label">Second-hand Car</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="park-controls">
        <div className="search-wrapper">
          <span className="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder={`Search ${activePark === 'new' ? 'new' : 'pre-owned'} vehicles...`}
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

          {activePark === 'secondhand' && (
            <select value={selectedDecade} onChange={(e) => setSelectedDecade(e.target.value)}>
              <option value="all">All Years</option>
              {decades.filter(d => d !== 'all').map(decade => (
                <option key={decade} value={decade}>{decade}</option>
              ))}
            </select>
          )}
          
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
      <div className="park-results">
        <div className="results-info">
          Found <strong>{activeCars.length}</strong> vehicles
          {searchTerm && <span className="search-term"> for "{searchTerm}"</span>}
        </div>
        {activePark === 'secondhand' && secondHandCars.length > 0 && (
          <div className="secondhand-stats">
            <span>📅 {secondHandStats.oldest} - {secondHandStats.newest}</span>
            <span>🎯 {secondHandStats.decades} Decades</span>
            <span>✅ Certified Pre-owned</span>
          </div>
        )}
      </div>

      {/* New Car Park */}
      {activePark === 'new' && (
        <AnimatePresence mode="wait">
          <motion.div
            key="new-park"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {viewMode === 'grid' ? (
              <div className="cars-grid-modern">
                {filteredNewCars.map((car, index) => (
                  <motion.div
                    key={car.id}
                    className="car-card-modern"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8 }}
                    onClick={() => onViewDetails(car)}
                  >
                    <div className="card-image">
                      <img src={car.image} alt={car.name} />
                      <div className="card-badge new">NEW {car.year}</div>
                    </div>
                    <div className="card-content">
                      <div className="card-header">
                        <span className="brand">{car.brand}</span>
                        <span className="year">{car.year}</span>
                      </div>
                      <h3>{car.name}</h3>
                      <div className="specs">
                        <span>⚡ {car.horsepower}</span>
                        <span>🏎️ {car.acceleration}</span>
                        {car.range && <span>🔋 {car.range}</span>}
                      </div>
                      <div className="price">{car.price}</div>
                      <button className="view-details">View Details →</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="cars-list-modern">
                {filteredNewCars.map((car) => (
                  <motion.div
                    key={car.id}
                    className="car-list-item-modern"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 10 }}
                    onClick={() => onViewDetails(car)}
                  >
                    <img src={car.image} alt={car.name} />
                    <div className="list-info">
                      <h4>{car.name}</h4>
                      <p>{car.brand} • {car.year}</p>
                      <div className="list-specs">
                        <span>{car.horsepower}</span>
                        <span>{car.acceleration}</span>
                        <span>{car.category}</span>
                      </div>
                    </div>
                    <div className="list-price">
                      <span>{car.price}</span>
                      <button>View</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {filteredNewCars.length === 0 && (
              <div className="no-results">
                <span>🚗</span>
                <h3>No new vehicles found</h3>
                <p>Try adjusting your search or filters</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}

      {/* Second-hand Car Park */}
      {activePark === 'secondhand' && (
        <AnimatePresence mode="wait">
          <motion.div
            key="secondhand-park"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {/* Second-hand Banner */}
            <div className="secondhand-banner">
              <span className="secondhand-icon">🔄</span>
              <div className="secondhand-text">
                <h3>Certified Pre-Owned Collection</h3>
                <p>Every vehicle comes with comprehensive warranty and multi-point inspection</p>
              </div>
              <div className="secondhand-badge">
                <span>✓ 120-Point Inspection</span>
                <span>✓ 2-Year Warranty</span>
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

            {viewMode === 'grid' ? (
              <div className="cars-grid-secondhand">
                {filteredSecondHandCars.map((car, index) => (
                  <motion.div
                    key={car.id}
                    className="car-card-secondhand"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8 }}
                    onClick={() => onViewDetails(car)}
                  >
                    <div className="card-image">
                      <img src={car.image} alt={car.name} />
                      <div className="card-badge secondhand">PRE-OWNED</div>
                    </div>
                    <div className="card-content">
                      <div className="card-header">
                        <span className="brand secondhand-brand">{car.brand}</span>
                        <span className="year">{car.year}</span>
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
                      </div>
                      <div className="price secondhand-price">{car.price}</div>
                      <div className="secondhand-features">
                        <span>✓ Warranty Included</span>
                        <span>✓ Certified</span>
                      </div>
                      <button className="view-details secondhand-btn">View Details →</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="cars-list-secondhand">
                {filteredSecondHandCars.map((car) => (
                  <motion.div
                    key={car.id}
                    className="car-list-item-secondhand"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    whileHover={{ x: 10 }}
                    onClick={() => onViewDetails(car)}
                  >
                    <img src={car.image} alt={car.name} />
                    <div className="list-info">
                      <h4>{car.name}</h4>
                      <p>{car.brand} • {car.year} • {car.category}</p>
                      <div className="list-specs">
                        <span>{car.horsepower}</span>
                        <span>{car.acceleration}</span>
                        {car.mileage && <span>{car.mileage}</span>}
                      </div>
                      <div className="warranty-badge">✓ 2-Year Warranty Included</div>
                    </div>
                    <div className="list-price">
                      <span>{car.price}</span>
                      <button className="secondhand-list-btn">View</button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
            
            {filteredSecondHandCars.length === 0 && (
              <div className="no-results">
                <span>🔄</span>
                <h3>No pre-owned vehicles found</h3>
                <p>Try adjusting your search, filters, or year selection</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};

export default CarPark;