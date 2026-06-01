import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CarComparePage = ({ cars, onBack, onViewDetails }) => {
  const [selectedCars, setSelectedCars] = useState([]);
  const [showCarSelector, setShowCarSelector] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('all');
  const [expandedSpec, setExpandedSpec] = useState(null);

  const brands = ['all', ...new Set(cars.map(car => car.brand))];

  const availableCars = cars.filter(car => 
    !selectedCars.find(selected => selected.id === car.id) &&
    (searchTerm === '' || car.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
     car.brand.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filterBrand === 'all' || car.brand === filterBrand)
  );

  const addCarToCompare = (car) => {
    if (selectedCars.length < 4) {
      setSelectedCars([...selectedCars, car]);
      setShowCarSelector(false);
      setSearchTerm('');
    }
  };

  const removeCar = (carId) => {
    setSelectedCars(selectedCars.filter(car => car.id !== carId));
  };

  const clearAll = () => {
    setSelectedCars([]);
  };

  const getBestInCategory = (spec, carsList) => {
    if (carsList.length === 0) return null;
    if (spec === 'price') {
      const prices = carsList.map(c => parseFloat(c.price.replace(/[^0-9.-]+/g, '')));
      return Math.min(...prices);
    }
    if (spec === 'horsepower') {
      const hp = carsList.map(c => parseInt(c.horsepower));
      return Math.max(...hp);
    }
    if (spec === 'acceleration') {
      const times = carsList.map(c => parseFloat(c.acceleration));
      return Math.min(...times);
    }
    if (spec === 'topSpeed') {
      const speeds = carsList.map(c => parseInt(c.topSpeed));
      return Math.max(...speeds);
    }
    return null;
  };

  const getComparisonValue = (car, spec) => {
    if (spec === 'price') return parseFloat(car.price.replace(/[^0-9.-]+/g, ''));
    if (spec === 'horsepower') return parseInt(car.horsepower);
    if (spec === 'acceleration') return parseFloat(car.acceleration);
    if (spec === 'topSpeed') return parseInt(car.topSpeed);
    return null;
  };

  const comparisonSpecs = [
    { key: 'price', label: 'Price', icon: '💰', unit: '', format: 'currency' },
    { key: 'horsepower', label: 'Horsepower', icon: '⚡', unit: 'hp', format: 'number', higherIsBetter: true },
    { key: 'acceleration', label: '0-60 mph', icon: '🏎️', unit: 's', format: 'decimal', higherIsBetter: false },
    { key: 'topSpeed', label: 'Top Speed', icon: '💨', unit: 'mph', format: 'number', higherIsBetter: true },
    { key: 'engine', label: 'Engine', icon: '🔧', unit: '', format: 'text' },
    { key: 'year', label: 'Year', icon: '📅', unit: '', format: 'number' },
    { key: 'range', label: 'Range', icon: '🔋', unit: 'miles', format: 'number' },
    { key: 'torque', label: 'Torque', icon: '⚙️', unit: 'lb-ft', format: 'number' }
  ];

  return (
    <div className="compare-page">
      <div className="compare-container">
        {/* Hero Header */}
        <div className="compare-hero">
          <button className="back-btn" onClick={onBack}>
            ← Back
          </button>
          <div className="hero-content">
            <h1>Compare <span>Vehicles</span></h1>
            <p>Make an informed decision with our side-by-side comparison tool</p>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">{cars.length}+</span>
              <span className="stat-label">Vehicles</span>
            </div>
            <div className="stat">
              <span className="stat-number">{brands.length - 1}</span>
              <span className="stat-label">Brands</span>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="compare-action-bar">
          <div className="action-left">
            <button 
              className="add-car-btn" 
              onClick={() => setShowCarSelector(true)}
              disabled={selectedCars.length >= 4}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"/>
                <line x1="5" y1="12" x2="19" y2="12"/>
              </svg>
              Add Vehicle ({selectedCars.length}/4)
            </button>
            {selectedCars.length > 1 && (
              <button className="clear-all-btn" onClick={clearAll}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="3 6 5 6 21 6"/>
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                </svg>
                Clear All
              </button>
            )}
          </div>
          <div className="action-right">
            <div className="compare-tip">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10"/>
                <path d="M12 16v-4M12 8h.01"/>
              </svg>
              Compare up to 4 vehicles
            </div>
          </div>
        </div>

        {/* Car Selector Modal */}
        <AnimatePresence>
          {showCarSelector && (
            <motion.div 
              className="car-selector-modal"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCarSelector(false)}
            >
              <motion.div 
                className="car-selector-content"
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="selector-header">
                  <h3>Select Vehicle to Compare</h3>
                  <button className="close-selector" onClick={() => setShowCarSelector(false)}>×</button>
                </div>
                
                <div className="selector-filters">
                  <div className="search-box">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="10" cy="10" r="7"/>
                      <line x1="21" y1="21" x2="15" y2="15"/>
                    </svg>
                    <input 
                      type="text" 
                      placeholder="Search by name or brand..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select value={filterBrand} onChange={(e) => setFilterBrand(e.target.value)}>
                    {brands.map(brand => (
                      <option key={brand} value={brand}>
                        {brand === 'all' ? 'All Brands' : brand}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="selector-list">
                  {availableCars.length === 0 ? (
                    <div className="no-cars-message">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <circle cx="12" cy="16" r="0.5" fill="currentColor"/>
                      </svg>
                      <p>No vehicles available to add</p>
                    </div>
                  ) : (
                    availableCars.map(car => (
                      <div key={car.id} className="selector-item" onClick={() => addCarToCompare(car)}>
                        <img src={car.image} alt={car.name} />
                        <div className="selector-item-info">
                          <h4>{car.name}</h4>
                          <p>{car.brand} • {car.year}</p>
                          <div className="price-tag">{car.price}</div>
                        </div>
                        <button className="add-btn">Add</button>
                      </div>
                    ))
                  )}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Comparison Content */}
        {selectedCars.length === 0 ? (
          <div className="empty-compare">
            <div className="empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                <line x1="8" y1="21" x2="16" y2="21"/>
                <line x1="12" y1="17" x2="12" y2="21"/>
              </svg>
            </div>
            <h2>No vehicles selected</h2>
            <p>Start comparing by adding your first vehicle</p>
            <button className="empty-add-btn" onClick={() => setShowCarSelector(true)}>
              + Add Your First Vehicle
            </button>
          </div>
        ) : (
          <>
            {/* Vehicle Cards with Specifications Under Each */}
            <div className="compare-grid">
              {selectedCars.map((car, index) => (
                <motion.div 
                  key={car.id} 
                  className="compare-card-wrapper"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {/* Car Header Card */}
                  <div className="compare-car-card">
                    <button className="remove-car" onClick={() => removeCar(car.id)}>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                      </svg>
                    </button>
                    <div className="car-rank">{index + 1}</div>
                    <div className="car-image-wrapper">
                      <img src={car.image} alt={car.name} />
                    </div>
                    <h3>{car.name}</h3>
                    <p className="car-brand">{car.brand}</p>
                    <div className="car-price">{car.price}</div>
                    <button 
                      className="view-details-btn"
                      onClick={() => onViewDetails(car)}
                    >
                      View Details
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="5" y1="12" x2="19" y2="12"/>
                        <polyline points="12 5 19 12 12 19"/>
                      </svg>
                    </button>
                  </div>

                  {/* Specifications Card - Under each car */}
                  <div className="specs-card">
                    <div className="specs-card-header">
                      <h4>Technical Specifications</h4>
                    </div>
                    <div className="specs-list">
                      {comparisonSpecs.map((spec) => {
                        const value = car[spec.key] || 'N/A';
                        return (
                          <div key={spec.key} className="spec-item">
                            <div className="spec-item-label">
                              <span className="spec-icon">{spec.icon}</span>
                              {spec.label}
                            </div>
                            <div className="spec-item-value">
                              {spec.format === 'currency' && <span className="currency">$</span>}
                              {value}
                              {spec.unit && <span className="spec-unit"> {spec.unit}</span>}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              ))}
              
              {/* Add More Slot */}
              {selectedCars.length < 4 && (
                <motion.div 
                  className="add-more-wrapper"
                  onClick={() => setShowCarSelector(true)}
                  whileHover={{ scale: 1.02 }}
                >
                  <div className="add-more-card">
                    <div className="add-more-content">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                      </svg>
                      <span>Add Vehicle</span>
                      <small>{4 - selectedCars.length} slots available</small>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Winner Analysis Section */}
            {selectedCars.length >= 2 && (
              <div className="winner-analysis">
                <div className="winner-header">
                  <h2>🏆 Winner Analysis</h2>
                  <p>See which vehicle excels in each category</p>
                </div>
                <div className="winner-grid">
                  <div className="winner-card">
                    <div className="winner-icon">⚡</div>
                    <h4>Most Powerful</h4>
                    <div className="winner-detail">
                      {(() => {
                        const mostPowerful = [...selectedCars].sort((a, b) => 
                          parseInt(b.horsepower) - parseInt(a.horsepower)
                        )[0];
                        return (
                          <>
                            <div className="winner-name">{mostPowerful.name}</div>
                            <div className="winner-stat">{mostPowerful.horsepower} hp</div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                  <div className="winner-card">
                    <div className="winner-icon">🏎️</div>
                    <h4>Quickest Acceleration</h4>
                    <div className="winner-detail">
                      {(() => {
                        const quickest = [...selectedCars].sort((a, b) => 
                          parseFloat(a.acceleration) - parseFloat(b.acceleration)
                        )[0];
                        return (
                          <>
                            <div className="winner-name">{quickest.name}</div>
                            <div className="winner-stat">{quickest.acceleration} s</div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                  <div className="winner-card">
                    <div className="winner-icon">💰</div>
                    <h4>Best Value</h4>
                    <div className="winner-detail">
                      {(() => {
                        const bestValue = [...selectedCars].sort((a, b) => 
                          parseFloat(a.price.replace(/[^0-9.-]+/g, '')) - parseFloat(b.price.replace(/[^0-9.-]+/g, ''))
                        )[0];
                        return (
                          <>
                            <div className="winner-name">{bestValue.name}</div>
                            <div className="winner-stat">{bestValue.price}</div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                  <div className="winner-card">
                    <div className="winner-icon">💨</div>
                    <h4>Highest Top Speed</h4>
                    <div className="winner-detail">
                      {(() => {
                        const fastest = [...selectedCars].sort((a, b) => 
                          parseInt(b.topSpeed) - parseInt(a.topSpeed)
                        )[0];
                        return (
                          <>
                            <div className="winner-name">{fastest.name}</div>
                            <div className="winner-stat">{fastest.topSpeed} mph</div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CarComparePage;