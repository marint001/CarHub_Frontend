import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const MyVehiclesPage = ({ onBack }) => {
  const [vehicles, setVehicles] = useState([]);

  // Load delivered vehicles from order history
  useEffect(() => {
    const savedOrders = localStorage.getItem('orderHistory');
    if (savedOrders) {
      const orders = JSON.parse(savedOrders);
      // Extract only delivered car items from orders
      const deliveredCars = [];
      orders.forEach(order => {
        // Only get delivered orders
        if (order.status === 'delivered') {
          order.items.forEach(item => {
            if (item.type === 'car') {
              deliveredCars.push({
                ...item,
                orderId: order.id,
                orderDate: order.date,
                deliveryDate: order.deliveryDate,
                shippingAddress: order.shippingAddress
              });
            }
          });
        }
      });
      setVehicles(deliveredCars);
    }
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="myvehicles-page">
      <div className="myvehicles-container">
        {/* Header */}
        <div className="myvehicles-header">
          <button className="back-btn" onClick={onBack}>
            ← Back
          </button>
          <h1>My <span>Vehicles</span></h1>
          <div className="header-stats">
            <div className="header-stat">
              <span className="stat-number">{vehicles.length}</span>
              <span className="stat-label">Delivered Vehicles</span>
            </div>
          </div>
        </div>

        {/* Vehicles List */}
        <div className="myvehicles-list">
          {vehicles.length === 0 ? (
            <div className="no-vehicles">
              <span>🚗</span>
              <h3>No delivered vehicles yet</h3>
              <p>Your delivered vehicles will appear here</p>
              <button className="shop-now-btn" onClick={() => window.location.href = '/new-cars'}>
                Browse Cars →
              </button>
            </div>
          ) : (
            vehicles.map((vehicle, index) => (
              <motion.div
                key={vehicle.id + vehicle.orderId}
                className="vehicle-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="vehicle-image">
                  {vehicle.type === 'car' ? (
                    <img src={vehicle.image} alt={vehicle.name} />
                  ) : (
                    <div className="vehicle-icon">{vehicle.icon}</div>
                  )}
                  <div className="vehicle-badge">Delivered</div>
                </div>
                
                <div className="vehicle-info">
                  <h3>{vehicle.name}</h3>
                  <p className="vehicle-brand">{vehicle.brand}</p>
                  
                  <div className="vehicle-specs">
                    <span>⚡ {vehicle.horsepower || 'N/A'}</span>
                    <span>🏎️ {vehicle.acceleration || 'N/A'}</span>
                    {vehicle.range && <span>🔋 {vehicle.range}</span>}
                    {vehicle.topSpeed && <span>💨 {vehicle.topSpeed}</span>}
                  </div>
                  
                  <div className="vehicle-details">
                    <div className="detail-row">
                      <span>Order ID:</span>
                      <span>{vehicle.orderId}</span>
                    </div>
                    <div className="detail-row">
                      <span>Purchase Date:</span>
                      <span>{formatDate(vehicle.orderDate)}</span>
                    </div>
                    <div className="detail-row">
                      <span>Delivery Date:</span>
                      <span>{formatDate(vehicle.deliveryDate)}</span>
                    </div>
                    <div className="detail-row">
                      <span>Price:</span>
                      <span className="price">${vehicle.price?.toLocaleString()}</span>
                    </div>
                  </div>
                  
                  <div className="vehicle-address">
                    <div className="address-icon">📍</div>
                    <div className="address-text">
                      <strong>Delivered to:</strong>
                      <p>
                        {vehicle.shippingAddress?.firstName} {vehicle.shippingAddress?.lastName}<br />
                        {vehicle.shippingAddress?.address}<br />
                        {vehicle.shippingAddress?.city}, {vehicle.shippingAddress?.zipCode}<br />
                        {vehicle.shippingAddress?.country}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyVehiclesPage;