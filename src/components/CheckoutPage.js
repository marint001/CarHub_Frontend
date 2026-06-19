import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const CheckoutPage = () => {
  const { step } = useParams();
  const navigate = useNavigate();
  const { cartItems, cartTotal, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  
  const currentStep = step || 'shipping';
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Cambodia',
    deliveryMethod: 'delivery',
    paymentMethod: 'card'
  });

  const [errors, setErrors] = useState({});

  const subtotal = cartTotal;
  const tax = subtotal * 0.1;
  const deliveryFee = formData.deliveryMethod === 'delivery' ? 50 : 0;
  const total = subtotal + tax + deliveryFee;

  const steps = [
    { id: 'shipping', name: 'Shipping', path: '/checkout/shipping', icon: '📍' },
    { id: 'payment', name: 'Payment', path: '/checkout/payment', icon: '💳' },
    { id: 'confirm', name: 'Confirm', path: '/checkout/confirm', icon: '✅' }
  ];

  const currentStepIndex = steps.findIndex(s => s.id === currentStep);

  const navigateToStep = (stepId) => {
    navigate(`/checkout/${stepId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateShipping = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 'shipping' && validateShipping()) {
      navigateToStep('payment');
    } else if (currentStep === 'payment') {
      navigateToStep('confirm');
    }
  };

  const handleBack = () => {
    if (currentStep === 'payment') {
      navigateToStep('shipping');
    } else if (currentStep === 'confirm') {
      navigateToStep('payment');
    }
  };

  // Function to save order to history
  const saveOrderToHistory = () => {
    const getItemPrice = (item) => {
      if (item.isCustomized && item.finalPrice) {
        return item.finalPrice;
      }
      if (typeof item.price === 'string') {
        return parseFloat(item.price.replace(/[^0-9.-]+/g, '')) || 0;
      }
      return item.price || 0;
    };

    const orderData = {
      id: 'ORD' + Date.now() + Math.floor(Math.random() * 1000),
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString(),
      status: 'processing',
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      trackingNumber: null,
      total: total,
      paymentMethod: formData.paymentMethod,
      deliveryMethod: formData.deliveryMethod,
      items: cartItems.map(item => ({
        id: item.id,
        name: item.name,
        type: item.isAccessory ? 'accessory' : 'car',
        brand: item.brand,
        price: getItemPrice(item),
        quantity: item.quantity,
        image: item.image,
        icon: item.icon,
        customization: item.customization
      })),
      shippingAddress: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country
      }
    };

    // Get existing orders from localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
    existingOrders.unshift(orderData);
    localStorage.setItem('orderHistory', JSON.stringify(existingOrders));
  };

  const handlePlaceOrder = () => {
    // Save order to history
    saveOrderToHistory();
    
    // Generate order number
    const newOrderNumber = 'ORD' + Date.now() + Math.floor(Math.random() * 1000);
    setOrderNumber(newOrderNumber);
    setOrderPlaced(true);
    
    // Clear cart
    clearCart();
  };

  const getItemPrice = (item) => {
    if (item.isCustomized && item.finalPrice) {
      return item.finalPrice;
    }
    if (typeof item.price === 'string') {
      return parseFloat(item.price.replace(/[^0-9.-]+/g, '')) || 0;
    }
    return item.price || 0;
  };

  if (cartItems.length === 0 && !orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="empty-cart-checkout">
            <span>🛒</span>
            <h2>Your cart is empty</h2>
            <p>Add some vehicles or accessories to proceed with checkout</p>
            <button className="continue-shopping" onClick={() => navigate('/CarHUB')}>
              Continue Shopping →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (orderPlaced) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="order-success">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="success-icon"
            >
              ✓
            </motion.div>
            <h1>Order Placed Successfully!</h1>
            <p>Thank you for your purchase. Your order has been confirmed.</p>
            <div className="order-number">
              <span>Order Number:</span>
              <strong>{orderNumber}</strong>
            </div>
            <div className="order-details-summary">
              <h3>Order Summary</h3>
              <p>We've sent a confirmation email to <strong>{formData.email}</strong></p>
              <p>Your items will be shipped to:</p>
              <p className="shipping-address">
                {formData.firstName} {formData.lastName}<br />
                {formData.address}<br />
                {formData.city}, {formData.state} {formData.zipCode}<br />
                {formData.country}
              </p>
            </div>
            <div className="order-actions">
              <button className="continue-shopping" onClick={() => navigate('/CarHUB')}>
                Continue Shopping →
              </button>
              <button className="view-orders" onClick={() => navigate('/purchases')}>
                View My Orders
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Header */}
        <div className="checkout-header">
          <button className="back-to-cart" onClick={() => navigate('/CarHUB')}>
            ← Back to Cart
          </button>
          <h1>Checkout</h1>
          
          {/* Step Progress Bar */}
          <div className="checkout-steps-progress">
            {steps.map((s, idx) => (
              <div key={s.id} className="step-progress">
                <div 
                  className={`step-circle ${currentStepIndex >= idx ? 'completed' : ''} ${currentStep === s.id ? 'active' : ''}`}
                  onClick={() => currentStepIndex > idx && navigateToStep(s.id)}
                >
                  <span className="step-number">{idx + 1}</span>
                  <span className="step-icon">{s.icon}</span>
                </div>
                <div className="step-label">{s.name}</div>
                {idx < steps.length - 1 && <div className={`step-line ${currentStepIndex > idx ? 'completed' : ''}`}></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="checkout-content">
          <div className="checkout-form">
            {/* Shipping Step */}
            {currentStep === 'shipping' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="form-section">
                  <h2>Contact Information</h2>
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name *</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className={errors.firstName ? 'error' : ''} />
                      {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                    </div>
                    <div className="form-group">
                      <label>Last Name *</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className={errors.lastName ? 'error' : ''} />
                      {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Email *</label>
                      <input type="email" name="email" value={formData.email} onChange={handleChange} className={errors.email ? 'error' : ''} />
                      {errors.email && <span className="error-message">{errors.email}</span>}
                    </div>
                    <div className="form-group">
                      <label>Phone *</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className={errors.phone ? 'error' : ''} />
                      {errors.phone && <span className="error-message">{errors.phone}</span>}
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h2>Shipping Address</h2>
                  <div className="form-group">
                    <label>Street Address *</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} className={errors.address ? 'error' : ''} />
                    {errors.address && <span className="error-message">{errors.address}</span>}
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>City *</label>
                      <input type="text" name="city" value={formData.city} onChange={handleChange} className={errors.city ? 'error' : ''} />
                      {errors.city && <span className="error-message">{errors.city}</span>}
                    </div>
                    <div className="form-group">
                      <label>State/Province</label>
                      <input type="text" name="state" value={formData.state} onChange={handleChange} />
                    </div>
                    <div className="form-group">
                      <label>Postal Code *</label>
                      <input type="text" name="zipCode" value={formData.zipCode} onChange={handleChange} className={errors.zipCode ? 'error' : ''} />
                      {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <select name="country" value={formData.country} onChange={handleChange}>
                      <option value="Cambodia">Cambodia</option>
                      <option value="USA">United States</option>
                      <option value="UK">United Kingdom</option>
                      <option value="Canada">Canada</option>
                      <option value="Australia">Australia</option>
                      <option value="Singapore">Singapore</option>
                      <option value="Malaysia">Malaysia</option>
                      <option value="Thailand">Thailand</option>
                    </select>
                  </div>
                </div>

                <div className="form-section">
                  <h2>Delivery Method</h2>
                  <div className="delivery-options">
                    <label className={`delivery-option ${formData.deliveryMethod === 'delivery' ? 'selected' : ''}`}>
                      <input type="radio" name="deliveryMethod" value="delivery" checked={formData.deliveryMethod === 'delivery'} onChange={handleChange} />
                      <div className="delivery-info">
                        <strong>🚚 Home Delivery</strong>
                        <span>Delivered in 3-5 business days</span>
                        <span className="delivery-price">$50.00</span>
                      </div>
                    </label>
                    <label className={`delivery-option ${formData.deliveryMethod === 'pickup' ? 'selected' : ''}`}>
                      <input type="radio" name="deliveryMethod" value="pickup" checked={formData.deliveryMethod === 'pickup'} onChange={handleChange} />
                      <div className="delivery-info">
                        <strong>📍 Local Pickup</strong>
                        <span>Pick up from our showroom</span>
                        <span className="delivery-price">Free</span>
                      </div>
                    </label>
                  </div>
                </div>

                <button className="continue-btn" onClick={handleNext}>
                  Continue to Payment →
                </button>
              </motion.div>
            )}

            {/* Payment Step */}
            {currentStep === 'payment' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="form-section">
                  <h2>Payment Method</h2>
                  <div className="payment-options">
                    <label className={`payment-option ${formData.paymentMethod === 'card' ? 'selected' : ''}`}>
                      <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} />
                      <div className="payment-info">
                        <span className="payment-icon">💳</span>
                        <div>
                          <strong>Credit / Debit Card</strong>
                          <span>Pay with Visa, Mastercard, Amex</span>
                        </div>
                      </div>
                    </label>
                    <label className={`payment-option ${formData.paymentMethod === 'paypal' ? 'selected' : ''}`}>
                      <input type="radio" name="paymentMethod" value="paypal" checked={formData.paymentMethod === 'paypal'} onChange={handleChange} />
                      <div className="payment-info">
                        <span className="payment-icon">📱</span>
                        <div>
                          <strong>PayPal</strong>
                          <span>Pay with your PayPal account</span>
                        </div>
                      </div>
                    </label>
                    <label className={`payment-option ${formData.paymentMethod === 'bank' ? 'selected' : ''}`}>
                      <input type="radio" name="paymentMethod" value="bank" checked={formData.paymentMethod === 'bank'} onChange={handleChange} />
                      <div className="payment-info">
                        <span className="payment-icon">🏦</span>
                        <div>
                          <strong>Bank Transfer</strong>
                          <span>Direct bank transfer</span>
                        </div>
                      </div>
                    </label>
                    <label className={`payment-option ${formData.paymentMethod === 'cod' ? 'selected' : ''}`}>
                      <input type="radio" name="paymentMethod" value="cod" checked={formData.paymentMethod === 'cod'} onChange={handleChange} />
                      <div className="payment-info">
                        <span className="payment-icon">💵</span>
                        <div>
                          <strong>Cash on Delivery</strong>
                          <span>Pay when you receive</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                {formData.paymentMethod === 'card' && (
                  <div className="form-section">
                    <h2>Card Details</h2>
                    <div className="form-group">
                      <label>Card Number</label>
                      <input type="text" placeholder="1234 5678 9012 3456" />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label>Expiry Date</label>
                        <input type="text" placeholder="MM/YY" />
                      </div>
                      <div className="form-group">
                        <label>CVV</label>
                        <input type="text" placeholder="123" />
                      </div>
                    </div>
                    <div className="form-group">
                      <label>Cardholder Name</label>
                      <input type="text" placeholder="John Doe" />
                    </div>
                  </div>
                )}

                <div className="form-buttons">
                  <button className="back-btn" onClick={handleBack}>← Back</button>
                  <button className="continue-btn" onClick={handleNext}>Continue to Confirm →</button>
                </div>
              </motion.div>
            )}

            {/* Confirm Step */}
            {currentStep === 'confirm' && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
              >
                <div className="form-section">
                  <h2>Order Summary</h2>
                  <div className="confirm-details">
                    <div className="confirm-block">
                      <h3>Shipping Information</h3>
                      <p>{formData.firstName} {formData.lastName}</p>
                      <p>{formData.email}</p>
                      <p>{formData.phone}</p>
                      <p>{formData.address}</p>
                      <p>{formData.city}, {formData.state} {formData.zipCode}</p>
                      <p>{formData.country}</p>
                    </div>
                    <div className="confirm-block">
                      <h3>Delivery Method</h3>
                      <p>{formData.deliveryMethod === 'delivery' ? '🚚 Home Delivery' : '📍 Local Pickup'}</p>
                      <p>{formData.deliveryMethod === 'delivery' ? '3-5 business days' : 'Ready in 1-2 hours'}</p>
                    </div>
                    <div className="confirm-block">
                      <h3>Payment Method</h3>
                      <p>
                        {formData.paymentMethod === 'card' && '💳 Credit/Debit Card'}
                        {formData.paymentMethod === 'paypal' && '📱 PayPal'}
                        {formData.paymentMethod === 'bank' && '🏦 Bank Transfer'}
                        {formData.paymentMethod === 'cod' && '💵 Cash on Delivery'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="form-buttons">
                  <button className="back-btn" onClick={handleBack}>← Back</button>
                  <button className="place-order-btn" onClick={handlePlaceOrder}>Place Order →</button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Order Summary Sidebar */}
          <div className="order-summary">
            <h2>Order Summary</h2>
            <div className="summary-items">
              {cartItems.map((item) => (
                <div key={item.id} className="summary-item">
                  {item.icon ? (
                    <div className="summary-icon">{item.icon}</div>
                  ) : (
                    <img src={item.image} alt={item.name} />
                  )}
                  <div className="summary-item-details">
                    <h4>{item.name}</h4>
                    <p>{item.brand}</p>
                    <div className="summary-item-price">
                      Qty: {item.quantity} × ${getItemPrice(item).toLocaleString()}
                    </div>
                  </div>
                  <div className="summary-item-total">
                    ${(getItemPrice(item) * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="summary-totals">
              <div className="summary-row"><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
              <div className="summary-row"><span>Tax (10%)</span><span>${tax.toLocaleString()}</span></div>
              {deliveryFee > 0 && <div className="summary-row"><span>Delivery Fee</span><span>${deliveryFee.toLocaleString()}</span></div>}
              <div className="summary-row total"><span>Total</span><span>${total.toLocaleString()}</span></div>
            </div>

            <div className="payment-security">
              <span>🔒 Secure Payment</span>
              <span>✓ 100% Money Back Guarantee</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;