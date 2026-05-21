import React, { useState } from 'react';

const CarCard = ({ car, onViewDetails }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCardClick = () => {
    if (onViewDetails) {
      onViewDetails(car);
    }
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <div 
      className={`car-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="car-image">
        <img src={car.image} alt={car.name} />
        <button className="like-btn" onClick={handleLikeClick}>
          {isLiked ? '❤️' : '🤍'}
        </button>
        {car.featured && <span className="featured-badge">🔥 Featured</span>}
        <div className="car-category">{car.category}</div>
      </div>
      
      <div className="car-info">
        <div className="car-header">
          <div className="car-brand">{car.brand}</div>
          <div className="car-year">{car.year}</div>
        </div>
        <h3 className="car-name">{car.name}</h3>
        
        <div className="car-specs-grid">
          <div className="spec-item">
            <span>⚡ {car.horsepower}</span>
          </div>
          <div className="spec-item">
            <span>🏎️ {car.acceleration}</span>
          </div>
          {car.range && (
            <div className="spec-item">
              <span>🔋 {car.range}</span>
            </div>
          )}
        </div>
        
        <p className="car-description">{car.description}</p>
        
        <div className="car-footer">
          <div className="car-price">
            <span className="price-amount">{car.price}</span>
            <span className="price-period">/ starting MSRP</span>
          </div>
          <button className="buy-btn" onClick={(e) => {
            e.stopPropagation();
            if (onViewDetails) onViewDetails(car);
          }}>
            Buy Now →
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarCard;