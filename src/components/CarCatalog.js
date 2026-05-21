import React, { useState } from 'react';
import CarCard from './CarCard';
import CarDetail from './CarDetail';

const CarCatalog = ({ cars }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);

  const categories = ['all', ...new Set(cars.map(car => car.category))];

  const filteredCars = cars.filter(car => {
    const matchesCategory = filter === 'all' || car.category === filter;
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredCars = filteredCars.filter(car => car.featured);
  const regularCars = filteredCars.filter(car => !car.featured);

  const handleViewDetails = (car) => {
    setSelectedCar(car);
    document.body.style.overflow = 'hidden';
  };

  const handleCloseDetail = () => {
    setSelectedCar(null);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <section id="catalog" className="catalog-section">
        <div className="section-header">
          <h2>Our <span>Collection</span></h2>
          <p>Explore our handpicked selection of exceptional vehicles</p>
        </div>

        <div className="catalog-controls">
          <div className="search-bar">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search by brand or model..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}>
            🎛️ Filter
          </button>
          
          <div className={`filter-buttons ${showFilters ? 'show' : ''}`}>
            {categories.map(cat => (
              <button 
                key={cat}
                className={`filter-btn ${filter === cat ? 'active' : ''}`}
                onClick={() => setFilter(cat)}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {featuredCars.length > 0 && (
          <div className="featured-section">
            <div className="featured-header">
              <h3>✨ Featured Vehicles</h3>
              <p>Our premium selection of luxury automobiles</p>
            </div>
            <div className="featured-grid">
              {featuredCars.map(car => (
                <CarCard key={car.id} car={car} onViewDetails={handleViewDetails} />
              ))}
            </div>
          </div>
        )}

        <div className="catalog-grid">
          {regularCars.map(car => (
            <CarCard key={car.id} car={car} onViewDetails={handleViewDetails} />
          ))}
        </div>

        {regularCars.length === 0 && featuredCars.length === 0 && (
          <div className="no-results">
            <p>No vehicles found matching your criteria.</p>
          </div>
        )}
      </section>

      {selectedCar && (
        <CarDetail car={selectedCar} onClose={handleCloseDetail} />
      )}
    </>
  );
};

export default CarCatalog;