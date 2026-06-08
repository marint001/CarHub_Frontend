import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import SidebarFilters from './SidebarFilters';

const UsedCars = ({ cars }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedDecade, setSelectedDecade] = useState('all');
  const { addToCart } = useCart();

  const usedCars = cars.filter(car => car.year < 2020);
  
  const decades = ['all', ...new Set(usedCars.map(car => {
    const decade = Math.floor(car.year / 10) * 10;
    return `${decade}s`;
  }))].sort();
  
  const brands = ['all', ...new Set(usedCars.map(car => car.brand))];
  const categories = ['all', ...new Set(usedCars.map(car => car.category))];

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

  const handleViewDetails = (car) => {
    navigate(`/car/${car.id}`);
  };

  const handleAddToCart = (e, car) => {
    e.stopPropagation();
    addToCart(car);
  };

  const usedStats = {
    total: usedCars.length,
    brands: brands.length - 1,
    decades: decades.filter(d => d !== 'all').length
  };

  const getCarAge = (year) => {
    const age = new Date().getFullYear() - year;
    if (age <= 3) return 'Like New';
    if (age <= 7) return 'Good';
    return 'Classic';
  };

  return (
    <div className="usedcars-page">
      {/* Hero Section */}
      <div className="usedcars-hero">
        <div className="usedcars-hero-overlay"></div>
        <div className="usedcars-hero-content">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="usedcars-hero-badge">Certified Pre-Owned</span>
            <h1>Used <span>Cars</span></h1>
            <p>Discover our extensive collection of certified pre-owned vehicles.</p>
            <div className="usedcars-hero-stats">
              <div className="hero-stat"><div className="hero-stat-number">{usedStats.total}+</div><div className="hero-stat-label">Used Vehicles</div></div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat"><div className="hero-stat-number">{usedStats.brands}</div><div className="hero-stat-label">Brands</div></div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat"><div className="hero-stat-number">{usedStats.decades}</div><div className="hero-stat-label">Decades</div></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="usedcars-stats-cards">
        <div className="stat-card"><div className="stat-icon">🚗</div><div className="stat-info"><div className="stat-number">{usedStats.total}</div><div className="stat-label">Used Vehicles</div></div></div>
        <div className="stat-card"><div className="stat-icon">🏭</div><div className="stat-info"><div className="stat-number">{usedStats.brands}</div><div className="stat-label">Brands</div></div></div>
        <div className="stat-card"><div className="stat-icon">✅</div><div className="stat-info"><div className="stat-number">Certified</div><div className="stat-label">Pre-owned</div></div></div>
        <div className="stat-card"><div className="stat-icon">🛡️</div><div className="stat-info"><div className="stat-number">2 Year</div><div className="stat-label">Warranty</div></div></div>
      </div>

      {/* Layout with Sidebar */}
      <div className="content-layout">
        {/* Sidebar */}
        <aside className="content-sidebar">
          <SidebarFilters
            filterBrand={filterBrand}
            setFilterBrand={setFilterBrand}
            filterCategory={filterCategory}
            setFilterCategory={setFilterCategory}
            viewMode={viewMode}
            setViewMode={setViewMode}
            brands={brands}
            categories={categories}
            selectedDecade={selectedDecade}
            setSelectedDecade={setSelectedDecade}
            decades={decades}
            isUsedPage={true}
          />
        </aside>

        {/* Main Content */}
        <main className="content-main">
          {/* Search Bar */}
          <div className="search-bar-container">
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
              <input 
                type="text" 
                placeholder="Search used vehicles by model or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="results-info">
            Found <strong>{filteredUsedCars.length}</strong> used vehicles
            {searchTerm && <span className="search-term"> for "{searchTerm}"</span>}
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
                  whileHover={{ y: -8 }}
                  onClick={() => handleViewDetails(car)}
                >
                  <div className="card-image">
                    <img src={car.image} alt={car.name} />
                    <div className="card-badge used">PRE-OWNED</div>
                    <div className="card-year">{car.year}</div>
                  </div>
                  <div className="card-content">
                    <h3>{car.name}</h3>
                    <p>{car.brand} • {car.year}</p>
                    <div className="car-age">{getCarAge(car.year)}</div>
                    <div className="specs">
                      <span>⚡ {car.horsepower}</span>
                      <span>🏎️ {car.acceleration}</span>
                    </div>
                    <div className="price">{car.price}</div>
                    <button className="add-cart-btn" onClick={(e) => handleAddToCart(e, car)}>🛒 Add to Cart</button>
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
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  whileHover={{ x: 8 }}
                  onClick={() => handleViewDetails(car)}
                >
                  <img src={car.image} alt={car.name} />
                  <div className="list-info">
                    <h4>{car.name}</h4>
                    <p>{car.brand} • {car.year}</p>
                    <div className="list-specs">
                      <span>⚡ {car.horsepower}</span>
                      <span>🏎️ {car.acceleration}</span>
                      {car.mileage && <span>📊 {car.mileage}</span>}
                    </div>
                    <div className="car-age-badge">{getCarAge(car.year)}</div>
                  </div>
                  <div className="list-price">
                    <div className="price">{car.price}</div>
                    <button 
                      className="add-list-btn" 
                      onClick={(e) => handleAddToCart(e, car)}
                    >
                      🛒
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {filteredUsedCars.length === 0 && (
            <div className="no-results">
              <span>🔄</span>
              <h3>No used vehicles found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default UsedCars;