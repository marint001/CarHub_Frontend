import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import SidebarFilters from './SidebarFilters';

const NewCars = ({ cars }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBrand, setFilterBrand] = useState('all');
  const [filterCategory, setFilterCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');
  const { addToCart } = useCart();

  const brands = ['all', ...new Set(cars.map(car => car.brand))];
  const categories = ['all', ...new Set(cars.map(car => car.category))];

  const filteredCars = cars.filter(car => {
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBrand = filterBrand === 'all' || car.brand === filterBrand;
    const matchesCategory = filterCategory === 'all' || car.category === filterCategory;
    return matchesSearch && matchesBrand && matchesCategory;
  });

  const handleViewDetails = (car) => {
    navigate(`/car/${car.id}`);
  };

  const handleAddToCart = (e, car) => {
    e.stopPropagation();
    addToCart(car);
  };

  const newStats = {
    total: cars.length,
    brands: brands.length - 1
  };

  return (
    <div className="newcars-page">
      {/* Hero Section */}
      <div className="newcars-hero">
        <div className="newcars-hero-overlay"></div>
        <div className="newcars-hero-content">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="newcars-hero-badge">Brand New Collection</span>
            <h1>New <span>Cars</span></h1>
            <p>Discover our latest collection of brand new vehicles straight from the factory.</p>
            <div className="newcars-hero-stats">
              <div className="hero-stat"><div className="hero-stat-number">{newStats.total}+</div><div className="hero-stat-label">New Vehicles</div></div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat"><div className="hero-stat-number">{newStats.brands}</div><div className="hero-stat-label">Premium Brands</div></div>
              <div className="hero-stat-divider"></div>
              <div className="hero-stat"><div className="hero-stat-number">2024</div><div className="hero-stat-label">Latest Models</div></div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="newcars-stats-cards">
        <div className="stat-card"><div className="stat-icon">🚗</div><div className="stat-info"><div className="stat-number">{newStats.total}</div><div className="stat-label">New Vehicles</div></div></div>
        <div className="stat-card"><div className="stat-icon">🏭</div><div className="stat-info"><div className="stat-number">{newStats.brands}</div><div className="stat-label">Brands</div></div></div>
        <div className="stat-card"><div className="stat-icon">🔧</div><div className="stat-info"><div className="stat-number">5 Year</div><div className="stat-label">Warranty</div></div></div>
        <div className="stat-card"><div className="stat-icon">🚚</div><div className="stat-info"><div className="stat-number">Free</div><div className="stat-label">Delivery</div></div></div>
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
                placeholder="Search new vehicles by model or brand..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="results-info">
            Found <strong>{filteredCars.length}</strong> new vehicles
            {searchTerm && <span className="search-term"> for "{searchTerm}"</span>}
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
                  whileHover={{ y: -8 }}
                  onClick={() => handleViewDetails(car)}
                >
                  <div className="card-image">
                    <img src={car.image} alt={car.name} />
                    <div className="card-badge new">NEW {car.year}</div>
                  </div>
                  <div className="card-content">
                    <h3>{car.name}</h3>
                    <p>{car.brand} • {car.year}</p>
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
            <div className="newcars-list">
              {filteredCars.map((car) => (
                <motion.div
                  key={car.id}
                  className="newcar-list-item"
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
                      {car.range && <span>🔋 {car.range}</span>}
                    </div>
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

          {filteredCars.length === 0 && (
            <div className="no-results">
              <span>🚗</span>
              <h3>No new vehicles found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default NewCars;