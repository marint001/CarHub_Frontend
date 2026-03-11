import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaBalanceScale, FaArrowRight } from 'react-icons/fa';
import { carService } from '../services/carService';

const QuickCompare = ({ onCompare }) => {
    const [presetComparisons, setPresetComparisons] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('popular');
    const [loading, setLoading] = useState(false);

    const categories = [
        { id: 'popular', name: 'Popular Models' },
        { id: 'suv', name: 'SUVs' },
        { id: 'sedan', name: 'Sedans' },
        { id: 'electric', name: 'Electric' },
        { id: 'luxury', name: 'Luxury' }
    ];

    useEffect(() => {
        loadPresetComparison();
    }, [selectedCategory]);

    const loadPresetComparison = async () => {
        setLoading(true);
        try {
            const data = await carService.getPresetComparison(selectedCategory);
            setPresetComparisons(data);
        } catch (error) {
            console.error('Error loading preset comparison:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleQuickCompare = () => {
        if (presetComparisons.length >= 2) {
            onCompare(presetComparisons);
        }
    };

    return (
        <div className="quick-compare-widget card">
            <div className="card-body">
                <div className="d-flex align-items-center mb-3">
                    <FaBalanceScale className="text-primary me-2" size={24} />
                    <h5 className="card-title mb-0">Quick Compare</h5>
                </div>

                <p className="text-muted small mb-3">
                    Compare popular vehicles in each category
                </p>

                {/* Category Selector */}
                <div className="category-selector mb-3">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat.id)}
                        >
                            {cat.name}
                        </button>
                    ))}
                </div>

                {/* Preset Cars Preview */}
                {loading ? (
                    <div className="text-center py-3">
                        <div className="spinner-border spinner-border-sm text-primary"></div>
                    </div>
                ) : (
                    <div className="preset-cars">
                        {presetComparisons.map(car => (
                            <div key={car.id} className="preset-car-item">
                                <img 
                                    src={car.main_image || 'https://via.placeholder.com/60'} 
                                    alt={car.name}
                                />
                                <div className="preset-car-info">
                                    <div className="car-name">{car.name}</div>
                                    <div className="car-price">${car.price?.toLocaleString()}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Compare Button */}
                <button 
                    className="btn btn-primary w-100 mt-3"
                    onClick={handleQuickCompare}
                    disabled={presetComparisons.length < 2}
                >
                    Compare These {presetComparisons.length} Vehicles
                    <FaArrowRight className="ms-2" />
                </button>

                <div className="text-center mt-2">
                    <Link to="/cars" className="text-decoration-none small">
                        or choose your own
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default QuickCompare;