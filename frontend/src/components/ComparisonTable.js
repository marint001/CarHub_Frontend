import React from 'react';
import { Link } from 'react-router-dom';
import { FaCheck, FaTimes, FaStar, FaTachometerAlt, FaCogs, FaUsers, FaCalendar, FaDollarSign, FaGasPump } from 'react-icons/fa';

const ComparisonTable = ({ cars, comparisonData, onRemove, onClear, onBack }) => {
    const getSpecIcon = (specName) => {
        switch(specName) {
            case 'Price': return <FaDollarSign className="text-primary" />;
            case 'Year': return <FaCalendar className="text-primary" />;
            case 'Body Type': return <FaCar className="text-primary" />;
            case 'Fuel Type': return <FaGasPump className="text-primary" />;
            case 'Transmission': return <FaCogs className="text-primary" />;
            case 'Mileage': return <FaTachometerAlt className="text-primary" />;
            case 'Seats': return <FaUsers className="text-primary" />;
            default: return null;
        }
    };

    return (
        <div className="comparison-table-container">
            {/* Header */}
            <div className="comparison-header mb-4">
                <div className="d-flex justify-content-between align-items-center">
                    <h3 className="mb-0">
                        <FaStar className="text-primary me-2" />
                        Vehicle Comparison
                    </h3>
                    <div className="d-flex gap-2">
                        <button className="btn btn-outline-primary" onClick={onBack}>
                            Back to Selection
                        </button>
                        <button className="btn btn-outline-danger" onClick={onClear}>
                            Clear All
                        </button>
                    </div>
                </div>
                <p className="text-muted mt-2">
                    Comparing {cars.length} vehicles side by side
                </p>
            </div>

            {/* Cars Row */}
            <div className="comparison-cars-row">
                <div className="comparison-grid">
                    {/* Empty cell for spec column */}
                    <div className="spec-cell"></div>
                    
                    {/* Car cards */}
                    {cars.map(car => (
                        <div key={car.id} className="car-comparison-card">
                            <button 
                                className="btn-remove-car"
                                onClick={() => onRemove(car.id)}
                                title="Remove from comparison"
                            >
                                <FaTimes />
                            </button>
                            
                            <img 
                                src={car.main_image || 'https://via.placeholder.com/300x200'} 
                                alt={car.name}
                                className="car-image"
                            />
                            
                            <div className="car-info text-center p-3">
                                <h5 className="car-name">{car.name}</h5>
                                <div className="car-brand">{car.brand_name}</div>
                                <div className="car-price-display">
                                    ${car.price?.toLocaleString()}
                                </div>
                                
                                <Link to={`/car/${car.id}`} className="btn btn-sm btn-outline-primary mt-2">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Specifications Table */}
            <div className="comparison-specs-table mt-4">
                {comparisonData.map((row, index) => (
                    <div key={index} className="spec-row">
                        <div className="spec-label">
                            {getSpecIcon(row.spec)}
                            <span className="ms-2">{row.spec}</span>
                        </div>
                        
                        {row.values.map((value, idx) => (
                            <div key={idx} className="spec-value">
                                {row.spec === 'Features' ? (
                                    <div className="features-list">
                                        {Array.isArray(value.formatted) && value.formatted.length > 0 ? (
                                            value.formatted.map((feature, i) => (
                                                <span key={i} className="feature-badge">
                                                    {feature}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="text-muted">No features listed</span>
                                        )}
                                    </div>
                                ) : (
                                    <span className={value.formatted === '✓' ? 'text-success' : 
                                                     value.formatted === '✗' ? 'text-danger' : ''}>
                                        {value.formatted === '✓' && <FaCheck className="me-1" />}
                                        {value.formatted === '✗' && <FaTimes className="me-1" />}
                                        {value.formatted}
                                    </span>
                                )}
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            {/* Action Buttons */}
            <div className="comparison-actions mt-4 text-center">
                <Link to="/cars" className="btn btn-primary me-2">
                    Browse More Cars
                </Link>
                <button className="btn btn-outline-primary" onClick={onBack}>
                    Change Selection
                </button>
            </div>
        </div>
    );
};

export default ComparisonTable;