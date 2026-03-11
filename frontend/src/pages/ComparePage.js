import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ComparisonSlider from '../components/ComparisonSlider';
import ComparisonTable from '../components/ComparisonTable';
import QuickCompare from '../components/QuickCompare';
import { carService } from '../services/carService';
import { FaBalanceScale, FaArrowLeft } from 'react-icons/fa';

const ComparePage = () => {
    const navigate = useNavigate();
    const [selectedCars, setSelectedCars] = useState([]);
    const [comparisonData, setComparisonData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [view, setView] = useState('selection'); // 'selection' or 'comparison'

    const handleCompare = async (cars) => {
        setSelectedCars(cars);
        setLoading(true);
        setError(null);
        
        try {
            const carIds = cars.map(c => c.id);
            const data = await carService.compareCars(carIds);
            setComparisonData(data.comparison_table);
            setView('comparison');
        } catch (error) {
            console.error('Error comparing cars:', error);
            setError('Failed to compare cars. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleRemoveCar = (carId) => {
        const newSelected = selectedCars.filter(c => c.id !== carId);
        setSelectedCars(newSelected);
        
        if (newSelected.length < 2) {
            setView('selection');
        } else {
            handleCompare(newSelected);
        }
    };

    const handleClearAll = () => {
        setSelectedCars([]);
        setView('selection');
        setComparisonData(null);
    };

    const handleBack = () => {
        setView('selection');
    };

    return (
        <div className="compare-page">
            {/* Hero Section */}
            <div className="compare-hero">
                <div className="container">
                    <button 
                        className="btn btn-outline-light mb-4"
                        onClick={() => navigate(-1)}
                    >
                        <FaArrowLeft className="me-2" /> Back
                    </button>
                    
                    <h1 className="display-4 fw-bold">Compare Vehicles</h1>
                    <p className="lead">
                        Make an informed decision by comparing vehicles side by side
                    </p>
                </div>
            </div>

            <div className="container my-5">
                {error && (
                    <div className="alert alert-danger">{error}</div>
                )}

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }}></div>
                        <p className="mt-3">Loading comparison data...</p>
                    </div>
                ) : (
                    <>
                        {view === 'selection' ? (
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="selection-area">
                                        <h4 className="mb-4">Select Vehicles to Compare</h4>
                                        <p className="text-muted mb-4">
                                            Choose 2-4 vehicles from our collection to compare their specifications side by side.
                                        </p>
                                        
                                        {/* Selected Cars Preview */}
                                        {selectedCars.length > 0 && (
                                            <div className="selected-preview mb-4">
                                                <h6>Selected Vehicles:</h6>
                                                <div className="d-flex flex-wrap gap-3">
                                                    {selectedCars.map(car => (
                                                        <div key={car.id} className="selected-badge">
                                                            <img 
                                                                src={car.main_image || 'https://via.placeholder.com/40'} 
                                                                alt={car.name}
                                                            />
                                                            <span>{car.name}</span>
                                                            <button 
                                                                className="btn-remove-small"
                                                                onClick={() => handleRemoveCar(car.id)}
                                                            >
                                                                ×
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="col-md-4">
                                    <QuickCompare onCompare={handleCompare} />
                                </div>
                            </div>
                        ) : (
                            comparisonData && (
                                <ComparisonTable 
                                    cars={selectedCars}
                                    comparisonData={comparisonData}
                                    onRemove={handleRemoveCar}
                                    onClear={handleClearAll}
                                    onBack={handleBack}
                                />
                            )
                        )}
                    </>
                )}
            </div>

            {/* Comparison Slider */}
            <ComparisonSlider 
                onCompare={handleCompare}
                selectedCars={selectedCars}
                maxCars={4}
            />
        </div>
    );
};

export default ComparePage;