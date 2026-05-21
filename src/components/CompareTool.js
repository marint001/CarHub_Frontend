import React, { useState } from 'react';
import { FaExchangeAlt, FaTimes, FaCheck } from 'react-icons/fa';

const CompareTool = ({ cars, onClose }) => {
  const [selectedCars, setSelectedCars] = useState([]);
  const [showSelector, setShowSelector] = useState(false);

  const addCar = (car) => {
    if (selectedCars.length < 3 && !selectedCars.find(c => c.id === car.id)) {
      setSelectedCars([...selectedCars, car]);
    }
  };

  const removeCar = (carId) => {
    setSelectedCars(selectedCars.filter(c => c.id !== carId));
  };

  const comparisonSpecs = [
    { label: 'Price', key: 'price' },
    { label: 'Horsepower', key: 'horsepower' },
    { label: 'Acceleration (0-60)', key: 'acceleration' },
    { label: 'Top Speed', key: 'topSpeed' },
    { label: 'Engine', key: 'engine' },
    { label: 'Year', key: 'year' }
  ];

  return (
    <div className="compare-overlay">
      <div className="compare-container">
        <div className="compare-header">
          <h2><FaExchangeAlt /> Compare Vehicles</h2>
          <button onClick={onClose}><FaTimes /></button>
        </div>
        
        <div className="compare-grid">
          {selectedCars.map(car => (
            <div key={car.id} className="compare-car">
              <button className="remove-car" onClick={() => removeCar(car.id)}>×</button>
              <img src={car.image} alt={car.name} />
              <h3>{car.name}</h3>
              <p>{car.brand}</p>
              {comparisonSpecs.map(spec => (
                <div className="spec-row" key={spec.key}>
                  <strong>{spec.label}:</strong> {car[spec.key]}
                </div>
              ))}
            </div>
          ))}
          
          {selectedCars.length < 3 && (
            <div className="add-car" onClick={() => setShowSelector(!showSelector)}>
              <button>+ Add Vehicle</button>
            </div>
          )}
        </div>
        
        {showSelector && (
          <div className="car-selector">
            <h3>Select a vehicle to compare</h3>
            <div className="car-list">
              {cars.filter(c => !selectedCars.find(sc => sc.id === c.id)).map(car => (
                <div key={car.id} className="car-option" onClick={() => addCar(car)}>
                  <img src={car.image} alt={car.name} />
                  <span>{car.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompareTool;