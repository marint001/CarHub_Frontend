import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaBalanceScale } from 'react-icons/fa';
import { FaCar } from 'react-icons/fa';

function CarDetail() {
  const [isInComparison, setIsInComparison] = useState(false);

  // Dummy car (replace with real data later)
  const car = { id: 1 };

  const handleBookTestDrive = () => {
    alert("Test drive scheduled!");
  };

  const handleAddToCompare = () => {
    const comparison = JSON.parse(localStorage.getItem('carComparison') || '[]');

    if (isInComparison) {
      const newComparison = comparison.filter(id => id !== car.id);
      localStorage.setItem('carComparison', JSON.stringify(newComparison));
      setIsInComparison(false);
    } else {
      if (comparison.length < 4) {
        comparison.push(car.id);
        localStorage.setItem('carComparison', JSON.stringify(comparison));
        setIsInComparison(true);
        alert('Car added to comparison.');
      } else {
        alert('Max 4 cars only.');
      }
    }
  };

  return (
    <div className="container">
      <h1>Car Detail</h1>

      <div className="d-grid gap-2 mt-4">
        <div className="d-flex gap-2">
          <button
            className="btn btn-primary flex-grow-1"
            onClick={handleBookTestDrive}
          >
            Schedule Test Drive
          </button>

          <button
            className={`btn ${isInComparison ? 'btn-success' : 'btn-outline-primary'}`}
            onClick={handleAddToCompare}
            title="Add to comparison"
          >
            <FaBalanceScale />
          </button>
        </div>

        <Link to="/cars" className="btn btn-outline-secondary">
          Back to Cars
        </Link>
      </div>
    </div>
  );
}

export default CarDetail;