import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

const CarCard = ({ car, onViewDetails, onCustomize }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(car);
  };

  const handleCustomize = (e) => {
    e.stopPropagation();
    if (onCustomize) {
      onCustomize(car);
    }
  };

  return (
    <div 
      className={`car-card ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="car-image" onClick={() => onViewDetails && onViewDetails(car)}>
        <img src={car.image} alt={car.name} />
        <button className="like-btn" onClick={(e) => {
          e.stopPropagation();
          setIsLiked(!isLiked);
        }}>
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
          <div className="spec-item">⚡ {car.horsepower}</div>
          <div className="spec-item">🏎️ {car.acceleration}</div>
          {car.range && <div className="spec-item">🔋 {car.range}</div>}
        </div>
        
        <p className="car-description">{car.description?.substring(0, 80)}...</p>
        
        <div className="car-footer">
          <div className="car-price">
            <span className="price-amount">{car.price}</span>
            <span className="price-period">/ starting MSRP</span>
          </div>
          <div className="card-buttons">
            <button className="customize-card-btn" onClick={handleCustomize}>
              🎨 Customize
            </button>
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              🛒 Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarCard;