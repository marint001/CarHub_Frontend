import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const CheckoutPage = ({ onBack }) => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [discountCode, setDiscountCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    description: '',
    shippingMethod: 'free'
  });

  const [errors, setErrors] = useState({});

  const subtotal = cartTotal;
  const shippingCost = formData.shippingMethod === 'express' ? 9 : 0;
  const estimatedTax = subtotal * 0.05;
  const discount = discountApplied ? discountAmount : 0;
  const total = subtotal + shippingCost + estimatedTax - discount;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const applyDiscount = () => {
    if (discountCode === 'SAVE10') {
      setDiscountAmount(subtotal * 0.1);
      setDiscountApplied(true);
    } else if (discountCode === 'SAVE20') {
      setDiscountAmount(subtotal * 0.2);
      setDiscountApplied(true);
    } else {
      alert('Invalid discount code');
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.phone) newErrors.phone = 'Phone number is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContinueToPayment = () => {
    if (validateForm()) {
      setStep(2);
      window.scrollTo(0, 0);
    }
  };

  const handlePlaceOrder = () => {
    const newOrderNumber = 'ORD' + Date.now() + Math.floor(Math.random() * 1000);
    setOrderNumber(newOrderNumber);
    setOrderPlaced(true);
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
            <p>Add some vehicles to proceed with checkout</p>
            <button className="continue-shopping" onClick={onBack}>
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
            </div>
            <button className="continue-shopping" onClick={onBack}>
              Continue Shopping →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        {/* Breadcrumb */}
        <div className="checkout-breadcrumb">
          <span className={`breadcrumb-step ${step === 1 ? 'active' : ''}`}>
            <span className="step-number">1</span> Cart
          </span>
          <span className="breadcrumb-arrow">›</span>
          <span className={`breadcrumb-step ${step === 2 ? 'active' : ''}`}>
            <span className="step-number">2</span> Shipping
          </span>
          <span className="breadcrumb-arrow">›</span>
          <span className={`breadcrumb-step ${step === 3 ? 'active' : ''}`}>
            <span className="step-number">3</span> Payment
          </span>
        </div>

        <div className="checkout-layout">
          {/* Left Column - Forms */}
          <div className="checkout-form-column">
            {step === 1 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="checkout-section">
                  <h2>Shipping Address</h2>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>First Name <span className="required">*</span></label>
                      <input 
                        type="text" 
                        name="firstName" 
                        placeholder="John"
                        value={formData.firstName} 
                        onChange={handleChange} 
                        className={errors.firstName ? 'error' : ''}
                      />
                      {errors.firstName && <span className="error-message">{errors.firstName}</span>}
                    </div>
                    <div className="form-group">
                      <label>Last Name <span className="required">*</span></label>
                      <input 
                        type="text" 
                        name="lastName" 
                        placeholder="Doe"
                        value={formData.lastName} 
                        onChange={handleChange} 
                        className={errors.lastName ? 'error' : ''}
                      />
                      {errors.lastName && <span className="error-message">{errors.lastName}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Email <span className="required">*</span></label>
                    <input 
                      type="email" 
                      name="email" 
                      placeholder="john@example.com"
                      value={formData.email} 
                      onChange={handleChange} 
                      className={errors.email ? 'error' : ''}
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                  </div>

                  <div className="form-group">
                    <label>Phone number <span className="required">*</span></label>
                    <input 
                      type="tel" 
                      name="phone" 
                      placeholder="+1 234 567 8900"
                      value={formData.phone} 
                      onChange={handleChange} 
                      className={errors.phone ? 'error' : ''}
                    />
                    {errors.phone && <span className="error-message">{errors.phone}</span>}
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>City <span className="required">*</span></label>
                      <input 
                        type="text" 
                        name="city" 
                        placeholder="New York"
                        value={formData.city} 
                        onChange={handleChange} 
                        className={errors.city ? 'error' : ''}
                      />
                      {errors.city && <span className="error-message">{errors.city}</span>}
                    </div>
                    <div className="form-group">
                      <label>State <span className="required">*</span></label>
                      <input 
                        type="text" 
                        name="state" 
                        placeholder="NY"
                        value={formData.state} 
                        onChange={handleChange} 
                        className={errors.state ? 'error' : ''}
                      />
                      {errors.state && <span className="error-message">{errors.state}</span>}
                    </div>
                    <div className="form-group">
                      <label>Zip Code <span className="required">*</span></label>
                      <input 
                        type="text" 
                        name="zipCode" 
                        placeholder="10001"
                        value={formData.zipCode} 
                        onChange={handleChange} 
                        className={errors.zipCode ? 'error' : ''}
                      />
                      {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea 
                      name="description" 
                      placeholder="Enter a description..."
                      value={formData.description} 
                      onChange={handleChange}
                      rows="3"
                    />
                  </div>
                </div>

                <div className="checkout-section">
                  <h2>Shipping Method</h2>
                  
                  <div className="shipping-options">
                    <label className={`shipping-option ${formData.shippingMethod === 'free' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="shippingMethod" 
                        value="free" 
                        checked={formData.shippingMethod === 'free'} 
                        onChange={handleChange} 
                      />
                      <div className="shipping-info">
                        <div>
                          <strong>Free Shipping</strong>
                          <span>7-20 Days</span>
                        </div>
                        <div className="shipping-price">$0</div>
                      </div>
                    </label>
                    
                    <label className={`shipping-option ${formData.shippingMethod === 'express' ? 'selected' : ''}`}>
                      <input 
                        type="radio" 
                        name="shippingMethod" 
                        value="express" 
                        checked={formData.shippingMethod === 'express'} 
                        onChange={handleChange} 
                      />
                      <div className="shipping-info">
                        <div>
                          <strong>Express Shipping</strong>
                          <span>1-3 Days</span>
                        </div>
                        <div className="shipping-price">$9</div>
                      </div>
                    </label>
                  </div>
                </div>

                <button className="continue-payment-btn" onClick={handleContinueToPayment}>
                  Continue to Payment →
                </button>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                <div className="checkout-section">
                  <h2>Payment Method</h2>
                  
                  <div className="payment-options">
                    <label className="payment-option">
                      <input type="radio" name="paymentMethod" value="card" defaultChecked />
                      <div className="payment-info">
                        <span className="payment-icon">💳</span>
                        <div>
                          <strong>Credit / Debit Card</strong>
                          <span>Pay with Visa, Mastercard, Amex</span>
                        </div>
                      </div>
                    </label>
                    
                    <label className="payment-option">
                      <input type="radio" name="paymentMethod" value="paypal" />
                      <div className="payment-info">
                        <span className="payment-icon">📱</span>
                        <div>
                          <strong>PayPal</strong>
                          <span>Pay with your PayPal account</span>
                        </div>
                      </div>
                    </label>
                    
                    <label className="payment-option">
                      <input type="radio" name="paymentMethod" value="cod" />
                      <div className="payment-info">
                        <span className="payment-icon">💵</span>
                        <div>
                          <strong>Cash on Delivery</strong>
                          <span>Pay when you receive the vehicle</span>
                        </div>
                      </div>
                    </label>
                  </div>
                </div>

                <div className="form-buttons">
                  <button className="back-btn" onClick={() => setStep(1)}>
                    ← Back
                  </button>
                  <button className="place-order-btn" onClick={handlePlaceOrder}>
                    Place Order →
                  </button>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Column - Order Summary */}
          <div className="order-summary-column">
            <h2>Your Cart</h2>
            
            <div className="cart-items-summary">
              {cartItems.map((item) => (
                <div key={item.id} className="cart-summary-item">
                  <div className="cart-item-info">
                    <h4>{item.name}</h4>
                    <p>{item.brand}</p>
                    {item.isCustomized && item.customization && (
                      <div className="item-customization">
                        {item.customization.exteriorColor && <span>{item.customization.exteriorColor.name}</span>}
                      </div>
                    )}
                    <span className="item-quantity">Qty: {item.quantity}</span>
                  </div>
                  <div className="cart-item-price">
                    ${(getItemPrice(item) * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="discount-section">
              <input 
                type="text" 
                placeholder="Discount code" 
                value={discountCode}
                onChange={(e) => setDiscountCode(e.target.value)}
              />
              <button onClick={applyDiscount}>Apply</button>
            </div>

            <div className="order-totals">
              <div className="total-row">
                <span>Subtotal</span>
                <span>${subtotal.toLocaleString()}</span>
              </div>
              <div className="total-row">
                <span>Shipping</span>
                <span>${shippingCost.toLocaleString()}</span>
              </div>
              <div className="total-row">
                <span>Estimated taxes</span>
                <span>${estimatedTax.toLocaleString()}</span>
              </div>
              {discountApplied && (
                <div className="total-row discount">
                  <span>Discount</span>
                  <span>-${discount.toLocaleString()}</span>
                </div>
              )}
              <div className="total-row grand-total">
                <span>Total</span>
                <span>${total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;