import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CarCatalog = ({ cars, onViewDetails }) => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [visibleCount, setVisibleCount] = useState(4);

  const categories = ['all', ...new Set(cars.map(car => car.category))];
  const filteredCars = cars.filter(car => {
    const matchesCategory = filter === 'all' || car.category === filter;
    const matchesSearch = car.name.toLowerCase().includes(searchTerm.toLowerCase()) || car.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredCars = filteredCars.filter(car => car.featured);
  const regularCars = filteredCars.filter(car => !car.featured);
  const displayedRegularCars = regularCars.slice(0, visibleCount);
  const hasMoreCars = visibleCount < regularCars.length;

  const loadMoreCars = () => setVisibleCount(prev => prev + 4);
  const resetFilters = () => { setFilter('all'); setSearchTerm(''); setVisibleCount(4); };

  return (
    <section className="collection-section">
      <div className="collection-container">
        <div className="collection-header">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} viewport={{ once: true }}>
            <span className="collection-badge">Our Showroom</span>
            <h2>Our <span>Collection</span></h2>
            <p>Explore our handpicked selection of exceptional vehicles</p>
          </motion.div>
        </div>

        {/* Controls - Filters on LEFT, Search on RIGHT */}
        <div className="collection-controls">
          <div className="filter-actions">
            <button className="filter-toggle" onClick={() => setShowFilters(!showFilters)}><span>🎛️</span> Filter</button>
            <div className="view-toggle">
              <button className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`} onClick={() => setViewMode('grid')}>⊞</button>
              <button className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} onClick={() => setViewMode('list')}>≡</button>
            </div>
          </div>
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input type="text" placeholder="Search by brand or model..." value={searchTerm} onChange={(e) => { setSearchTerm(e.target.value); setVisibleCount(4); }} />
          </div>
        </div>

        <AnimatePresence>
          {showFilters && (<motion.div className="filter-chips" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}>
            {categories.map(cat => (<button key={cat} className={`filter-chip ${filter === cat ? 'active' : ''}`} onClick={() => { setFilter(cat); setVisibleCount(4); }}>{cat === 'all' ? 'All Vehicles' : cat}{filter === cat && <span className="chip-check">✓</span>}</button>))}
          </motion.div>)}
        </AnimatePresence>

        <div className="collection-results"><span className="results-count">{filteredCars.length} vehicles found</span>{searchTerm && <span className="search-term">for "{searchTerm}"</span>}</div>

        {/* Featured Section */}
        {featuredCars.length > 0 && (
          <div className="featured-section">
            <div className="featured-header"><div className="featured-icon">⭐</div><h3>Featured Vehicles</h3><p>Our premium selection of luxury automobiles</p></div>
            {viewMode === 'grid' ? (
              <div className="collection-grid featured-grid">
                {featuredCars.map((car, index) => (<motion.div key={car.id} className="collection-card featured-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} viewport={{ once: true }} whileHover={{ y: -10 }} onClick={() => onViewDetails(car)}>
                  <div className="card-badge featured-badge">Featured</div>
                  <div className="card-image"><img src={car.image} alt={car.name} /><div className="card-overlay"><button className="quick-view">Quick View</button></div></div>
                  <div className="card-content"><div className="card-header"><span className="card-brand">{car.brand}</span><span className="card-year">{car.year}</span></div><h3 className="card-title">{car.name}</h3><div className="card-specs"><span>⚡ {car.horsepower}</span><span>🏎️ {car.acceleration}</span></div><div className="card-footer"><div className="card-price">{car.price}</div><button className="card-btn">View Details →</button></div></div>
                </motion.div>))}
              </div>
            ) : (
              <div className="collection-list featured-list">
                {featuredCars.map((car) => (<motion.div key={car.id} className="collection-list-item featured-list-item" whileHover={{ x: 10 }} onClick={() => onViewDetails(car)}>
                  <img src={car.image} alt={car.name} /><div className="list-content"><div className="list-header"><h4>{car.name}</h4><span className="list-badge featured-list-badge">Featured</span></div><p>{car.brand} • {car.year}</p><div className="list-specs"><span>{car.horsepower}</span><span>{car.acceleration}</span></div></div><div className="list-price"><span>{car.price}</span><button>View</button></div>
                </motion.div>))}
              </div>
            )}
          </div>
        )}

        {/* Regular Cars */}
        {viewMode === 'grid' ? (
          <>
            <div className="collection-grid">
              {displayedRegularCars.map((car, index) => (<motion.div key={car.id} className="collection-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }} viewport={{ once: true }} whileHover={{ y: -8 }} onClick={() => onViewDetails(car)}>
                <div className="card-image"><img src={car.image} alt={car.name} /><div className="card-overlay"><button className="quick-view">Quick View</button></div></div>
                <div className="card-content"><div className="card-header"><span className="card-brand">{car.brand}</span><span className="card-year">{car.year}</span></div><h3 className="card-title">{car.name}</h3><div className="card-specs"><span>⚡ {car.horsepower}</span><span>🏎️ {car.acceleration}</span></div><div className="card-footer"><div className="card-price">{car.price}</div><button className="card-btn">View Details →</button></div></div>
              </motion.div>))}
            </div>
            {hasMoreCars && <div className="see-more-container"><button className="see-more-btn" onClick={loadMoreCars}>See More Vehicles <span className="btn-icon">↓</span></button><p className="see-more-info">Showing {visibleCount} of {regularCars.length} vehicles</p></div>}
          </>
        ) : (
          <>
            <div className="collection-list">
              {displayedRegularCars.map((car) => (<motion.div key={car.id} className="collection-list-item" whileHover={{ x: 10 }} onClick={() => onViewDetails(car)}>
                <img src={car.image} alt={car.name} /><div className="list-content"><h4>{car.name}</h4><p>{car.brand} • {car.year}</p><div className="list-specs"><span>{car.horsepower}</span><span>{car.acceleration}</span></div></div><div className="list-price"><span>{car.price}</span><button>View</button></div>
              </motion.div>))}
            </div>
            {hasMoreCars && <div className="see-more-container"><button className="see-more-btn" onClick={loadMoreCars}>See More Vehicles <span className="btn-icon">↓</span></button><p className="see-more-info">Showing {visibleCount} of {regularCars.length} vehicles</p></div>}
          </>
        )}

        {(filter !== 'all' || searchTerm) && <div className="reset-filters"><button onClick={resetFilters}>Reset All Filters</button></div>}
        {filteredCars.length === 0 && <div className="collection-empty"><span>🔍</span><h3>No vehicles found</h3><p>Try adjusting your search or filter criteria</p><button onClick={resetFilters}>Reset Filters</button></div>}
      </div>
    </section>
  );
};

export default CarCatalog;