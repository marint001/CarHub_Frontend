import React, { useState, useEffect } from 'react';
import { carService } from '../services/carService';
import { 
  FaFilter, 
  FaTimes, 
  FaCar, 
  FaGasPump, 
  FaCogs, 
  FaCalendarAlt,
  FaDollarSign,
  FaSearch,
  FaRedoAlt,
  FaChevronDown,
  FaChevronUp
} from 'react-icons/fa';

const CarFilter = ({ onFilterChange }) => {
  const [brands, setBrands] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeFilters, setActiveFilters] = useState(0);
  const [filters, setFilters] = useState({
    brand: '',
    body_type: '',
    fuel_type: '',
    transmission: '',
    min_price: '',
    max_price: '',
    year: ''
  });

  

  // Price ranges for quick selection
  const priceRanges = [
    { label: 'Under $30k', min: 0, max: 30000 },
    { label: '$30k - $50k', min: 30000, max: 50000 },
    { label: '$50k - $80k', min: 50000, max: 80000 },
    { label: '$80k - $120k', min: 80000, max: 120000 },
    { label: 'Over $120k', min: 120000, max: 1000000 }
  ];

  // Years for filter
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - i);

  useEffect(() => {
    loadBrands();
  }, []);

  useEffect(() => {
    // Count active filters
    const count = Object.values(filters).filter(value => value !== '').length;
    setActiveFilters(count);
  }, [filters]);

  const loadBrands = async () => {
    try {
      const data = await carService.getBrands();
      setBrands(data);
    } catch (error) {
      console.error('Error loading brands:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFilters = { ...filters, [name]: value };
    setFilters(newFilters);
    onFilterChange(name, value);
  };

  const handlePriceRangeSelect = (min, max) => {
    const newFilters = { 
      ...filters, 
      min_price: min.toString(), 
      max_price: max.toString() 
    };
    setFilters(newFilters);
    onFilterChange('price_range', { min, max });
  };

  const handleReset = () => {
    const resetFilters = {
      brand: '',
      body_type: '',
      fuel_type: '',
      transmission: '',
      min_price: '',
      max_price: '',
      year: ''
    };
    setFilters(resetFilters);
    onFilterChange('reset', resetFilters);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="premium-filter-container mb-5">
      {/* Filter Header */}
      <div className="premium-filter-header d-flex align-items-center justify-content-between p-4">
        <div className="d-flex align-items-center">
          <div className="filter-icon-wrapper me-3">
            <FaFilter className="filter-icon" />
          </div>
          <div>
            <h4 className="mb-1 fw-bold">Find Your Dream Car</h4>
            <p className="mb-0 text-muted">
              {activeFilters > 0 
                ? `${activeFilters} active filter${activeFilters > 1 ? 's' : ''}` 
                : 'search'}
            </p>
          </div>
        </div>
        <div className="d-flex align-items-center gap-3">
          {activeFilters > 0 && (
            <button 
              className="btn btn-outline-secondary reset-btn"
              onClick={handleReset}
            >
              <FaRedoAlt className="me-2" /> Reset All
            </button>
          )}
          <button 
            className="btn btn-link text-decoration-none expand-btn"
            onClick={toggleExpand}
          >
            {isExpanded ? (
              <>Show Less <FaChevronUp className="ms-2" /></>
            ) : (
              <>Show More Search <FaChevronDown className="ms-2" /></>
            )}
          </button>
        </div>
      </div>

      {/* Quick Price Range Chips */}
      <div className="price-range-chips px-4 pb-3">
        <label className="form-label text-muted mb-2">Quick Price Ranges</label>
        <div className="d-flex flex-wrap gap-2">
          {priceRanges.map((range, index) => (
            <button
              key={index}
              className={`price-chip ${filters.min_price === range.min.toString() ? 'active' : ''}`}
              onClick={() => handlePriceRangeSelect(range.min, range.max)}
            >
              <FaDollarSign className="me-1" size={12} />
              {range.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Filter Form */}
      <div className={`premium-filter-body ${isExpanded ? 'expanded' : ''}`}>
        <div className="row g-4 p-4">
          {/* Brand Filter */}
          <div className="col-lg-3 col-md-6">
            <div className="filter-group">
              <label className="filter-label">
                <FaCar className="me-2" /> Brand
              </label>
              <select 
                className="premium-select"
                name="brand"
                value={filters.brand}
                onChange={handleChange}
              >
                <option value="">All Brands</option>
                {brands.map(brand => (
                  <option key={brand.id} value={brand.name}>{brand.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Body Type Filter */}
          <div className="col-lg-3 col-md-6">
            <div className="filter-group">
              <label className="filter-label">
                <FaCar className="me-2" /> Body Type
              </label>
              <select 
                className="premium-select"
                name="body_type"
                value={filters.body_type}
                onChange={handleChange}
              >
                <option value="">All Types</option>
                <option value="sedan">Sedan</option>
                <option value="suv">SUV</option>
                <option value="sports">Sports</option>
                <option value="hatchback">Hatchback</option>
                <option value="coupe">Coupe</option>
                <option value="convertible">Convertible</option>
              </select>
            </div>
          </div>

          {/* Fuel Type Filter */}
          <div className="col-lg-3 col-md-6">
            <div className="filter-group">
              <label className="filter-label">
                <FaGasPump className="me-2" /> Fuel Type
              </label>
              <select 
                className="premium-select"
                name="fuel_type"
                value={filters.fuel_type}
                onChange={handleChange}
              >
                <option value="">All Fuels</option>
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="electric">Electric</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          {/* Transmission Filter */}
          <div className="col-lg-3 col-md-6">
            <div className="filter-group">
              <label className="filter-label">
                <FaCogs className="me-2" /> Transmission
              </label>
              <select 
                className="premium-select"
                name="transmission"
                value={filters.transmission}
                onChange={handleChange}
              >
                <option value="">All Transmissions</option>
                <option value="manual">Manual</option>
                <option value="automatic">Automatic</option>
              </select>
            </div>
          </div>

          {/* Year Filter - Shown when expanded */}
          {isExpanded && (
            <>
              <div className="col-lg-3 col-md-6">
                <div className="filter-group">
                  <label className="filter-label">
                    <FaCalendarAlt className="me-2" /> Year
                  </label>
                  <select 
                    className="premium-select"
                    name="year"
                    value={filters.year}
                    onChange={handleChange}
                  >
                    <option value="">Any Year</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Custom Price Range */}
              <div className="col-lg-6">
                <div className="filter-group">
                  <label className="filter-label">
                    <FaDollarSign className="me-2" /> Custom Price Range
                  </label>
                  <div className="row g-2">
                    <div className="col-6">
                      <div className="price-input-wrapper">
                        <span className="currency-symbol">$</span>
                        <input
                          type="number"
                          className="premium-input"
                          name="min_price"
                          placeholder="Min"
                          value={filters.min_price}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-6">
                      <div className="price-input-wrapper">
                        <span className="currency-symbol">$</span>
                        <input
                          type="number"
                          className="premium-input"
                          name="max_price"
                          placeholder="Max"
                          value={filters.max_price}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

      
      </div>
    </div>
  );
};

export default CarFilter;