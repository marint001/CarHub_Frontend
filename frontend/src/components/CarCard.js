import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTachometerAlt, FaCogs, FaUsers, FaDollarSign, FaStar, FaBalanceScale } from 'react-icons/fa';

const CarCard = ({ car, onCompare, isSelected }) => {
    const navigate = useNavigate();
    
    const featuresCount = Array.isArray(car.features) ? car.features.length : 0;

    const handleCompareClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onCompare) {
            onCompare(car);
        }
    };

    return (
        <div className={`col-md-4 mb-4 ${isSelected ? 'selected-for-compare' : ''}`}>
            <div className="card h-100 shadow-sm car-card">
                <div className="position-relative">
                    <img 
                        src={car.main_image || 'https://via.placeholder.com/300x200?text=No+Image'} 
                        className="card-img-top" 
                        alt={car.name}
                        style={{ height: '200px', objectFit: 'cover' }}
                    />
                    {car.is_featured && (
                        <span className="position-absolute top-0 end-0 badge bg-warning text-dark m-2">
                            <FaStar className="me-1" /> Featured
                        </span>
                    )}
                    
                    {/* Compare Button */}
                    {onCompare && (
                        <button 
                            className={`compare-btn position-absolute top-0 start-0 m-2 btn btn-sm ${
                                isSelected ? 'btn-primary' : 'btn-outline-primary'
                            }`}
                            onClick={handleCompareClick}
                            title={isSelected ? 'Remove from comparison' : 'Add to comparison'}
                        >
                            <FaBalanceScale />
                        </button>
                    )}
                </div>
                <div className="card-body">
                    <h5 className="card-title">{car.name}</h5>
                    <p className="card-text text-muted">
                        {car.brand_name} • {car.year}
                    </p>
                    <div className="d-flex justify-content-between mb-3">
                        <span><FaTachometerAlt className="me-1" /> {car.mileage || 'N/A'} mi</span>
                        <span><FaCogs className="me-1" /> {car.transmission}</span>
                        <span><FaUsers className="me-1" /> {car.seats} seats</span>
                    </div>
                    
                    {featuresCount > 0 && (
                        <div className="mb-2">
                            <span className="badge bg-info text-dark">
                                {featuresCount} features
                            </span>
                        </div>
                    )}
                    
                    <h6 className="text-primary">
                        <FaDollarSign className="me-1" />
                        ${car.price?.toLocaleString()}
                    </h6>
                    <div className="d-grid gap-2">
                        <Link to={`/car/${car.id}`} className="btn btn-primary">
                            View Details
                        </Link>
                        <Link to={`/book-test-drive/${car.id}`} className="btn btn-outline-primary">
                            Book Test Drive
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CarCard;