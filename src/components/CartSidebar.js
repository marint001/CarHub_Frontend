import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';

const CartSidebar = () => {
  const { 
    cartItems, 
    cartCount, 
    cartTotal, 
    isCartOpen, 
    toggleCart, 
    removeFromCart, 
    updateQuantity,
    clearCart 
  } = useCart();

  const sidebarVariants = {
    hidden: { x: '100%' },
    visible: { 
      x: 0,
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    },
    exit: { 
      x: '100%',
      transition: { type: 'spring', stiffness: 300, damping: 30 }
    }
  };

  // Calculate item total price
  const getItemTotal = (item) => {
    if (item.isCustomized && item.finalPrice) {
      return item.finalPrice * item.quantity;
    }
    const price = parseFloat(item.price?.replace(/[^0-9.-]+/g, '')) || 0;
    return price * item.quantity;
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div 
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
          />
          
          <motion.div 
            className="cart-sidebar"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="cart-header">
              <h2>🛒 Your Cart ({cartCount})</h2>
              <button className="cart-close" onClick={toggleCart}>×</button>
            </div>

            <div className="cart-items">
              {cartItems.length === 0 ? (
                <div className="cart-empty">
                  <span>🛒</span>
                  <h3>Your cart is empty</h3>
                  <p>Add some vehicles to get started</p>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p className="cart-item-brand">{item.brand}</p>
                      
                      {/* Show customization details if item is customized */}
                      {item.isCustomized && item.customization && (
                        <div className="cart-item-customization">
                          <div className="custom-badge">✨ Customized</div>
                          {item.customization.details && (
                            <div className="custom-details">
                              <div className="custom-detail">🎨 {item.customization.details.exterior}</div>
                              <div className="custom-detail">🛋️ {item.customization.details.interior}</div>
                              <div className="custom-detail">🛞 {item.customization.details.wheels}</div>
                              {item.customization.details.package !== 'None' && (
                                <div className="custom-detail">📦 {item.customization.details.package}</div>
                              )}
                              {item.customization.details.accessories !== 'None' && (
                                <div className="custom-detail">🎒 {item.customization.details.accessories}</div>
                              )}
                            </div>
                          )}
                          <div className="custom-price-breakdown">
                            <span>Base: {item.basePrice}</span>
                            <span>Customization: +${item.customization.totalCustomizationPrice?.toLocaleString()}</span>
                          </div>
                        </div>
                      )}
                      
                      <p className="cart-item-price">${getItemTotal(item).toLocaleString()}</p>
                    </div>
                    <div className="cart-item-actions">
                      <div className="quantity-control">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                      </div>
                      <button className="remove-btn" onClick={() => removeFromCart(item.id)}>🗑️</button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>${cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="summary-row">
                    <span>Tax (10%):</span>
                    <span>${(cartTotal * 0.1).toLocaleString()}</span>
                  </div>
                  <div className="summary-row total">
                    <span>Total:</span>
                    <span>${(cartTotal * 1.1).toLocaleString()}</span>
                  </div>
                </div>
                <div className="cart-actions">
                  <button className="clear-cart" onClick={clearCart}>Clear Cart</button>
                  <button className="checkout-btn">Proceed to Checkout →</button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;