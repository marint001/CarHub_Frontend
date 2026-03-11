import React, { useState, useEffect } from 'react';
import { FaPlus, FaTimes, FaCar, FaCheck } from 'react-icons/fa';
import { carService } from '../services/carService';

const ComparisonSlider = ({ onCompare, selectedCars = [], maxCars = 3 }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [cars, setCars] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredCars, setFilteredCars] = useState([]);
    const [loading, setLoading] = useState(false);
    const [localSelected, setLocalSelected] = useState(selectedCars);

    useEffect(() => {
        loadCars();
    }, []);

    useEffect(() => {
        if (searchQuery) {
            const filtered = cars.filter(car => 
                car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                car.brand_name?.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredCars(filtered);
        } else {
            setFilteredCars(cars);
        }
    }, [searchQuery, cars]);

    const loadCars = async () => {
        setLoading(true);
        try {
            const data = await carService.getCars();
            setCars(data);
            setFilteredCars(data);
        } catch (error) {
            console.error('Error loading cars:', error);
        } finally {
            setLoading(false);
        }
    };

    const toggleCar = (car) => {
        const isSelected = localSelected.some(c => c.id === car.id);
        
        if (isSelected) {
            setLocalSelected(localSelected.filter(c => c.id !== car.id));
        } else {
            if (localSelected.length < maxCars) {
                setLocalSelected([...localSelected, car]);
            }
        }
    };

    const handleCompare = () => {
        if (localSelected.length >= 2) {
            onCompare(localSelected);
            setIsOpen(false);
        }
    };

    const removeCar = (carId) => {
        setLocalSelected(localSelected.filter(c => c.id !== carId));
    };

    const clearAll = () => {
        setLocalSelected([]);
    };

    return (
        <>
            {/* Floating Compare Button */}
            <div className="compare-floating-btn">
                <button 
                    className="btn btn-primary rounded-circle p-3 shadow"
                    onClick={() => setIsOpen(!isOpen)}
                    style={{ width: '60px', height: '60px' }}
                >
                    {localSelected.length > 0 ? (
                        <span className="position-relative">
                            <FaCar size={24} />
                            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                                {localSelected.length}
                            </span>
                        </span>
                    ) : (
                        <FaCar size={24} />
                    )}
                </button>
            </div>

            {/* Comparison Slider Panel */}
            <div className={`comparison-slider ${isOpen ? 'open' : ''}`}>
                <div className="slider-header">
                    <h5 className="mb-0">
                        <FaCar className="me-2" /> Compare Vehicles
                    </h5>
                    <button className="btn-close" onClick={() => setIsOpen(false)}></button>
                </div>

                <div className="slider-body">
                    {/* Selected Cars */}
                    <div className="selected-cars mb-4">
                        <label className="form-label fw-bold">Selected Cars ({localSelected.length}/{maxCars})</label>
                        <div className="selected-cars-list">
                            {localSelected.map(car => (
                                <div key={car.id} className="selected-car-item">
                                    <img 
                                        src={car.main_image || 'https://via.placeholder.com/50'} 
                                        alt={car.name}
                                    />
                                    <div className="car-info">
                                        <div className="car-name">{car.name}</div>
                                        <div className="car-price">${car.price?.toLocaleString()}</div>
                                    </div>
                                    <button 
                                        className="btn-remove"
                                        onClick={() => removeCar(car.id)}
                                    >
                                        <FaTimes />
                                    </button>
                                </div>
                            ))}
                            
                            {localSelected.length === 0 && (
                                <div className="text-center text-muted py-3">
                                    No cars selected. Select at least 2 to compare.
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Search Input */}
                    <div className="search-box mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search cars to compare..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Car List */}
                    <div className="car-list">
                        {loading ? (
                            <div className="text-center py-3">
                                <div className="spinner-border spinner-border-sm text-primary"></div>
                            </div>
                        ) : (
                            filteredCars.map(car => {
                                const isSelected = localSelected.some(c => c.id === car.id);
                                const isDisabled = localSelected.length >= maxCars && !isSelected;
                                
                                return (
                                    <div 
                                        key={car.id} 
                                        className={`car-list-item ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled' : ''}`}
                                        onClick={() => !isDisabled && toggleCar(car)}
                                    >
                                        <img 
                                            src={car.main_image || 'https://via.placeholder.com/60'} 
                                            alt={car.name}
                                        />
                                        <div className="car-details">
                                            <div className="car-name">{car.name}</div>
                                            <div className="car-specs">
                                                {car.brand_name} • {car.year} • ${car.price?.toLocaleString()}
                                            </div>
                                        </div>
                                        {isSelected && <FaCheck className="selected-icon text-success" />}
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>

                {/* Footer Actions */}
                <div className="slider-footer">
                    <button 
                        className="btn btn-outline-secondary"
                        onClick={clearAll}
                        disabled={localSelected.length === 0}
                    >
                        Clear All
                    </button>
                    <button 
                        className="btn btn-primary"
                        onClick={handleCompare}
                        disabled={localSelected.length < 2}
                    >
                        Compare ({localSelected.length})
                    </button>
                </div>
            </div>
        </>
    );
};

export default ComparisonSlider;