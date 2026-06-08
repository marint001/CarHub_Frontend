import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SidebarFilters from './SidebarFilters';

const CarCatalog = ({ cars }) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid');

  const categories = ['all', ...new Set(cars.map(car => car.category))];
  const brands = ['all', ...new Set(cars.map(car => car.brand))];

  const filteredCars = cars.filter(car => {
    const matchesCategory = filter === 'all' || car.category === filter;
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleViewDetails = (car) => {
    navigate(`/car/${car.id}`);
  };

  return (
    <section className="collection-section">
      <div className="collection-header">
        <h2>Our <span>Collection</span></h2>
        <p>Explore our handpicked selection of exceptional vehicles</p>
      </div>

      {/* Layout with Sidebar */}
      <div className="content-layout">
        {/* Sidebar */}
        <aside className="content-sidebar">
          <SidebarFilters
            filterBrand={filter}
            setFilterBrand={setFilter}
            filterCategory={filter}
            setFilterCategory={setFilter}
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
                placeholder="Search by brand or model..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Results Count */}
          <div className="results-info">
            Found <strong>{filteredCars.length}</strong> vehicles
            {searchTerm && <span className="search-term"> for "{searchTerm}"</span>}
          </div>

          {/* Grid View */}
          {viewMode === 'grid' && (
            <div className="collection-grid">
              {filteredCars.map((car) => (
                <motion.div
                  key={car.id}
                  className="collection-card"
                  whileHover={{ y: -5 }}
                  onClick={() => handleViewDetails(car)}
                >
                  <div className="card-image">
                    <img src={car.image} alt={car.name} />
                  </div>
                  <div className="card-content">
                    <h3>{car.name}</h3>
                    <p>{car.brand} • {car.year}</p>
                    <div className="price">{car.price}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* List View */}
          {viewMode === 'list' && (
            <div className="collection-list">
              {filteredCars.map((car) => (
                <motion.div
                  key={car.id}
                  className="collection-list-item"
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
                    </div>
                  </div>
                  <div className="list-price">
                    <div className="price">{car.price}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {filteredCars.length === 0 && (
            <div className="no-results">
              <span>🔍</span>
              <h3>No vehicles found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </main>
      </div>
    </section>
  );
};

export default CarCatalog;