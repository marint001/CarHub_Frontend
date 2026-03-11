import React, { useState, useEffect } from 'react';
import { carService } from '../services/carService';
import CarCard from '../components/CarCard';
import CarFilter from '../components/CarFilter';
import { FaChevronDown, FaCar, FaGem, FaCrown } from 'react-icons/fa';

const Cars = () => {
  const [cars, setCars] = useState([]);
  const [filteredCars, setFilteredCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [heroLoaded, setHeroLoaded] = useState(false);

  // Hero image URLs (high-quality car images)
  const heroImages = [
  
    {
      url: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=80",
      title: "Performance Redefined",
      subtitle: "Where Power Meets Elegance"
    },
    {
      url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1600&q=80",
      title: "The Art of Driving",
      subtitle: "Experience Unmatched Luxury"
    }
  ];

  // Randomly select a hero image
  const [heroImage] = useState(() => 
    heroImages[Math.floor(Math.random() * heroImages.length)]
  );

  useEffect(() => {
    fetchCars();
    // Preload hero image
    const img = new Image();
    img.src = heroImage.url;
    img.onload = () => setHeroLoaded(true);
  }, [heroImage.url]);

  const fetchCars = async () => {
    try {
      setLoading(true);
      const data = await carService.getCars();
      setCars(data);
      setFilteredCars(data);
    } catch (err) {
      setError('Failed to load cars. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = async (filterType, value) => {
    try {
      setLoading(true);
      
      if (filterType === 'reset') {
        setFilteredCars(cars);
      } else if (filterType === 'price_range') {
        const filters = { min_price: value.min, max_price: value.max };
        const filtered = await carService.filterCars(filters);
        setFilteredCars(filtered);
      } else {
        const filters = { [filterType]: value };
        const filtered = await carService.filterCars(filters);
        setFilteredCars(filtered);
      }
    } catch (err) {
      setError('Failed to filter cars');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const scrollToContent = () => {
    document.getElementById('cars-content').scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <div className="cars-page">
      {/* Hero Section */}
      <div className="cars-hero-section position-relative">
        {/* Background Image with Overlay */}
        <div 
          className={`hero-background ${heroLoaded ? 'loaded' : ''}`}
          style={{
            backgroundImage: `url(${heroImage.url})`,
          }}
        >
          <div className="hero-overlay"></div>
        </div>

        {/* Hero Content */}
        <div className="hero-content container">
          <div className="row align-items-center min-vh-50">
            <div className="col-lg-8">
              {/* Luxury Badge */}
              <div className="luxury-badge mb-4 animate__animated animate__fadeInDown">
                <span className="badge-luxury">
                  <FaGem className="me-2" /> Premium Collection
                </span>
              </div>

              {/* Main Title */}
              <h1 className="hero-title display-3 fw-bold mb-4 animate__animated animate__fadeInUp">
                {heroImage.title}
              </h1>

              {/* Subtitle */}
              <p className="hero-subtitle lead mb-5 animate__animated animate__fadeInUp animate__delay-1s">
                {heroImage.subtitle}
              </p>

              {/* Stats Cards */}
              <div className="hero-stats d-flex gap-4 animate__animated animate__fadeInUp animate__delay-2s">
                <div className="stat-card">
                  <div className="stat-number">{cars.length}+</div>
                  <div className="stat-label">Luxury Vehicles</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">15+</div>
                  <div className="stat-label">Premium Brands</div>
                </div>
                <div className="stat-card">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">Certified</div>
                </div>
              </div>
            </div>

            {/* Quick Filter Pills */}
            <div className="col-lg-4">
              <div className="quick-filter-panel animate__animated animate__fadeInRight">
                <h5 className="text-white mb-3">
                  <FaCrown className="me-2" /> Quick Filters
                </h5>
                <div className="quick-filter-buttons">
                  <button className="quick-filter-btn" onClick={() => handleFilterChange('body_type', 'suv')}>
                    <span className="btn-icon">🚙</span> SUVs
                  </button>
                  <button className="quick-filter-btn" onClick={() => handleFilterChange('body_type', 'sports')}>
                    <span className="btn-icon">🏎️</span> Sports
                  </button>
                  <button className="quick-filter-btn" onClick={() => handleFilterChange('fuel_type', 'electric')}>
                    <span className="btn-icon">⚡</span> Electric
                  </button>
                  <button className="quick-filter-btn" onClick={() => handleFilterChange('fuel_type', 'hybrid')}>
                    <span className="btn-icon">🔄</span> Hybrid
                  </button>
                  <button className="quick-filter-btn" onClick={() => handleFilterChange('transmission', 'automatic')}>
                    <span className="btn-icon">⚙️</span> Automatic
                  </button>
                  <button className="quick-filter-btn" onClick={() => handleFilterChange('year', '2026')}>
                    <span className="btn-icon">✨</span> New Arrivals
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="scroll-indicator-wrapper" onClick={scrollToContent}>
            <div className="scroll-indicator">
              <span className="scroll-text">Explore Collection</span>
              <FaChevronDown className="scroll-arrow" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Section */}
      <div id="cars-content" className="container my-5">
        {/* Section Header */}
        <div className="section-header text-center mb-5">
          <span className="section-subtitle">DISCOVER</span>
          <h2 className="section-title display-5 fw-bold">Our Premium Collection</h2>
          <div className="title-separator">
            <span className="separator-line"></span>
            <FaCar className="separator-icon" />
            <span className="separator-line"></span>
          </div>
          <p className="section-description text-muted mt-3">
            Explore our hand-picked selection of luxury vehicles, each meticulously crafted for the discerning driver
          </p>
        </div>

        {/* Filter Component */}
        <CarFilter onFilterChange={handleFilterChange} />

        {/* Loading State */}
        {loading ? (
          <div className="text-center my-5 py-5">
            <div className="luxury-spinner">
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <div className="spinner-ring"></div>
              <span className="spinner-text">Curating Premium Vehicles</span>
            </div>
          </div>
        ) : error ? (
          <div className="alert alert-danger text-center my-5">{error}</div>
        ) : (
          <>
            {/* Results Summary */}
            <div className="results-summary d-flex justify-content-between align-items-center mb-4">
              <div className="results-count">
                <span className="count-number">{filteredCars.length}</span>
                <span className="count-text">Premium Vehicles Available</span>
              </div>
              <div className="results-sort">
                <select className="sort-select">
                  <option>Sort by: Recommended</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                  <option>Year: Newest First</option>
                  <option>Year: Oldest First</option>
                </select>
              </div>
            </div>

            {/* Cars Grid */}
            <div className="row g-4">
              {filteredCars.length > 0 ? (
                filteredCars.map(car => (
                  <CarCard key={car.id} car={car} />
                ))
              ) : (
                <div className="col-12 text-center py-5">
                  <div className="empty-state">
                    <img 
                      src="https://cdn-icons-png.flaticon.com/512/4076/4076478.png" 
                      alt="No cars found"
                      className="empty-image"
                    />
                    <h3 className="mt-4">No vehicles found</h3>
                    <p className="text-muted">Try adjusting your filters to see more results</p>
                    <button 
                      className="btn btn-primary mt-3"
                      onClick={() => handleFilterChange('reset', {})}
                    >
                      Clear All Filters
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Pagination (if needed) */}
            {filteredCars.length > 0 && (
              <div className="pagination-wrapper mt-5">
                <nav aria-label="Page navigation">
                  <ul className="pagination justify-content-center">
                    <li className="page-item disabled">
                      <span className="page-link">Previous</span>
                    </li>
                    <li className="page-item active"><span className="page-link">1</span></li>
                    <li className="page-item"><span className="page-link">2</span></li>
                    <li className="page-item"><span className="page-link">3</span></li>
                    <li className="page-item">
                      <span className="page-link">Next</span>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Cars;