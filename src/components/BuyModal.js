import React, { useState } from 'react';

const BuyModal = ({ car, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    deliveryMethod: 'dealership'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Thank you for your purchase request for the ${car.name}! We'll contact you within 24 hours.`);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Purchase {car.name}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          <div className="car-summary">
            <img src={car.image} alt={car.name} />
            <div>
              <h3>{car.name}</h3>
              <p>{car.brand}</p>
              <div className="price">{car.price}</div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Full Name" required 
              value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} />
            <input type="email" placeholder="Email Address" required
              value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
            <input type="tel" placeholder="Phone Number" required
              value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
            
            <select value={formData.deliveryMethod} onChange={(e) => setFormData({...formData, deliveryMethod: e.target.value})}>
              <option value="dealership">Pick up from Dealership</option>
              <option value="home">Home Delivery</option>
            </select>
            
            <button type="submit" className="submit-purchase">Confirm Purchase Request</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BuyModal;