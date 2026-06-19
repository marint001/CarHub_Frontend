import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const MyPurchasesPage = ({ onBack }) => {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem('orderHistory');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Demo orders for展示
      const demoOrders = [
        {
          id: 'ORD1700000000001',
          date: '2024-06-15',
          time: '14:30:22',
          status: 'delivered',
          deliveryDate: '2024-06-20',
          trackingNumber: 'TRK123456789',
          total: 89500,
          paymentMethod: 'card',
          deliveryMethod: 'delivery',
          items: [
            { id: 1, name: 'Tesla Model S Plaid', type: 'car', brand: 'Tesla', price: 85000, quantity: 1, image: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=200' },
            { id: 101, name: 'Floor Mats', type: 'accessory', brand: 'AutoStyle', price: 150, quantity: 2, icon: '🧩' },
            { id: 102, name: 'Dash Cam', type: 'accessory', brand: 'SafeDrive', price: 300, quantity: 1, icon: '📹' }
          ],
          shippingAddress: {
            firstName: 'John',
            lastName: 'Doe',
            address: '123 Main St',
            city: 'Phnom Penh',
            zipCode: '120101',
            country: 'Cambodia'
          }
        },
        {
          id: 'ORD1700000000002',
          date: '2024-06-10',
          time: '09:15:47',
          status: 'shipped',
          deliveryDate: '2024-06-18',
          trackingNumber: 'TRK987654321',
          total: 250000,
          paymentMethod: 'paypal',
          deliveryMethod: 'delivery',
          items: [
            { id: 2, name: 'Porsche 911 Turbo S', type: 'car', brand: 'Porsche', price: 250000, quantity: 1, image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=200' }
          ],
          shippingAddress: {
            firstName: 'John',
            lastName: 'Doe',
            address: '123 Main St',
            city: 'Phnom Penh',
            zipCode: '120101',
            country: 'Cambodia'
          }
        },
        {
          id: 'ORD1700000000003',
          date: '2024-06-05',
          time: '16:45:12',
          status: 'processing',
          deliveryDate: '2024-06-25',
          trackingNumber: null,
          total: 54000,
          paymentMethod: 'cod',
          deliveryMethod: 'pickup',
          items: [
            { id: 201, name: 'Wireless Charger', type: 'accessory', brand: 'ChargeFast', price: 49, quantity: 2, icon: '🔋' },
            { id: 202, name: 'Car Air Freshener', type: 'accessory', brand: 'FreshAir', price: 19, quantity: 3, icon: '🌿' },
            { id: 203, name: 'Roof Rack', type: 'accessory', brand: 'AeroTech', price: 500, quantity: 1, icon: '🎒' }
          ],
          shippingAddress: {
            firstName: 'John',
            lastName: 'Doe',
            address: '123 Main St',
            city: 'Phnom Penh',
            zipCode: '120101',
            country: 'Cambodia'
          }
        }
      ];
      setOrders(demoOrders);
      localStorage.setItem('orderHistory', JSON.stringify(demoOrders));
    }
  }, []);

  const getStatusBadge = (status) => {
    switch(status) {
      case 'delivered':
        return { class: 'status-delivered', text: '✓ Delivered', icon: '✅' };
      case 'shipped':
        return { class: 'status-shipped', text: '🚚 Shipped', icon: '📦' };
      case 'processing':
        return { class: 'status-processing', text: '⏳ Processing', icon: '⚙️' };
      case 'cancelled':
        return { class: 'status-cancelled', text: '✗ Cancelled', icon: '❌' };
      default:
        return { class: 'status-pending', text: '⏱️ Pending', icon: '🕐' };
    }
  };

  const getDeliveryStatus = (status, deliveryDate) => {
    if (status === 'delivered') return 'Delivered';
    if (status === 'shipped') return 'In Transit';
    if (status === 'processing') return 'Preparing';
    return 'Pending';
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'all') return true;
    return order.status === filter;
  });

  const stats = {
    total: orders.length,
    delivered: orders.filter(o => o.status === 'delivered').length,
    shipped: orders.filter(o => o.status === 'shipped').length,
    processing: orders.filter(o => o.status === 'processing').length,
    totalSpent: orders.reduce((sum, order) => sum + order.total, 0)
  };

  return (
    <div className="purchases-page">
      <div className="purchases-container">
        {/* Header */}
        <div className="purchases-header">
          <button className="back-btn" onClick={onBack}>
            ← Back
          </button>
          <h1>My Purchases</h1>
          <div className="header-stats">
            <div className="header-stat">
              <span className="stat-number">{stats.total}</span>
              <span className="stat-label">Orders</span>
            </div>
            <div className="header-stat">
              <span className="stat-number">${stats.totalSpent.toLocaleString()}</span>
              <span className="stat-label">Total Spent</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="purchases-stats">
          <div className="stat-card" onClick={() => setFilter('all')}>
            <div className="stat-icon">📦</div>
            <div className="stat-info">
              <div className="stat-number">{stats.total}</div>
              <div className="stat-label">Total Orders</div>
            </div>
          </div>
          <div className="stat-card" onClick={() => setFilter('processing')}>
            <div className="stat-icon">⚙️</div>
            <div className="stat-info">
              <div className="stat-number">{stats.processing}</div>
              <div className="stat-label">Processing</div>
            </div>
          </div>
          <div className="stat-card" onClick={() => setFilter('shipped')}>
            <div className="stat-icon">🚚</div>
            <div className="stat-info">
              <div className="stat-number">{stats.shipped}</div>
              <div className="stat-label">Shipped</div>
            </div>
          </div>
          <div className="stat-card" onClick={() => setFilter('delivered')}>
            <div className="stat-icon">✅</div>
            <div className="stat-info">
              <div className="stat-number">{stats.delivered}</div>
              <div className="stat-label">Delivered</div>
            </div>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="purchases-filters">
          <button className={`filter-btn ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All Orders</button>
          <button className={`filter-btn ${filter === 'processing' ? 'active' : ''}`} onClick={() => setFilter('processing')}>Processing</button>
          <button className={`filter-btn ${filter === 'shipped' ? 'active' : ''}`} onClick={() => setFilter('shipped')}>Shipped</button>
          <button className={`filter-btn ${filter === 'delivered' ? 'active' : ''}`} onClick={() => setFilter('delivered')}>Delivered</button>
        </div>

        {/* Orders List */}
        <div className="orders-list">
          {filteredOrders.length === 0 ? (
            <div className="no-orders">
              <span>📦</span>
              <h3>No orders found</h3>
              <p>You haven't placed any orders yet</p>
              <button className="shop-now-btn" onClick={() => window.location.href = '/CarHUB'}>
                Start Shopping →
              </button>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <motion.div
                key={order.id}
                className="order-card"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -2 }}
              >
                {/* Order Header */}
                <div className="order-header">
                  <div className="order-info">
                    <span className="order-number">#{order.id}</span>
                    <span className="order-date">{formatDate(order.date)} at {order.time}</span>
                  </div>
                  <div className={`order-status ${getStatusBadge(order.status).class}`}>
                    {getStatusBadge(order.status).icon} {getStatusBadge(order.status).text}
                  </div>
                </div>

                {/* Order Items */}
                <div className="order-items">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="order-item">
                      {item.type === 'car' ? (
                        <img src={item.image} alt={item.name} className="item-image" />
                      ) : (
                        <div className="item-icon">{item.icon}</div>
                      )}
                      <div className="item-details">
                        <h4>{item.name}</h4>
                        <p>{item.brand}</p>
                        <div className="item-meta">
                          <span>Qty: {item.quantity}</span>
                          <span>${item.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Details */}
                <div className="order-details">
                  <div className="detail-row">
                    <span>Total Amount:</span>
                    <strong>${order.total.toLocaleString()}</strong>
                  </div>
                  <div className="detail-row">
                    <span>Payment Method:</span>
                    <span>
                      {order.paymentMethod === 'card' && '💳 Credit Card'}
                      {order.paymentMethod === 'paypal' && '📱 PayPal'}
                      {order.paymentMethod === 'cod' && '💵 Cash on Delivery'}
                      {order.paymentMethod === 'bank' && '🏦 Bank Transfer'}
                    </span>
                  </div>
                  <div className="detail-row">
                    <span>Delivery Method:</span>
                    <span>{order.deliveryMethod === 'delivery' ? '🚚 Home Delivery' : '📍 Local Pickup'}</span>
                  </div>
                  <div className="detail-row">
                    <span>Expected Delivery:</span>
                    <span>{getDeliveryStatus(order.status, order.deliveryDate)} {order.deliveryDate ? `- ${formatDate(order.deliveryDate)}` : ''}</span>
                  </div>
                  {order.trackingNumber && (
                    <div className="detail-row">
                      <span>Tracking Number:</span>
                      <span className="tracking-number">{order.trackingNumber}</span>
                    </div>
                  )}
                </div>

                {/* Shipping Address */}
                <div className="order-shipping">
                  <div className="shipping-icon">📍</div>
                  <div className="shipping-info">
                    <strong>Shipping Address</strong>
                    <p>
                      {order.shippingAddress.firstName} {order.shippingAddress.lastName}<br />
                      {order.shippingAddress.address}<br />
                      {order.shippingAddress.city}, {order.shippingAddress.zipCode}<br />
                      {order.shippingAddress.country}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="order-actions">
                  <button className="order-btn track-btn">
                    Track Order →
                  </button>
                  <button className="order-btn reorder-btn">
                    Buy Again
                  </button>
                  <button className="order-btn review-btn">
                    Write a Review
                  </button>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default MyPurchasesPage;