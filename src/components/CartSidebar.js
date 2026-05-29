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

  const itemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: (i) => ({ 
      opacity: 1, 
      x: 0,
      transition: { delay: i * 0.05 }
    }),
    exit: { opacity: 0, x: 50 }
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            className="cart-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
          />
          
          {/* Sidebar */}
          <motion.div 
            className="cart-sidebar"
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="cart-header">
              <h2>
                🛒 Your Cart 
                <span className="cart-count-badge">{cartCount}</span>
              </h2>
              <button className="cart-close" onClick={toggleCart}>×</button>
            </div>

            <div className="cart-items">
              {cartItems.length === 0 ? (
                <div className="cart-empty">
                  <span className="empty-emoji">🛒</span>
                  <h3>Your cart is empty</h3>
                  <p>Add some vehicles to get started</p>
                </div>
              ) : (
                <AnimatePresence>
                  {cartItems.map((item, index) => (
                    <motion.div
                      key={item.id}
                      className="cart-item"
                      variants={itemVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      custom={index}
                    >
                      <img src={item.image} alt={item.name} />
                      <div className="cart-item-details">
                        <h4>{item.name}</h4>
                        <p className="cart-item-brand">{item.brand}</p>
                        <p className="cart-item-price">{item.price}</p>
                        {item.customization && (
                          <div className="cart-item-custom">
                            <span>🎨 Customized</span>
                          </div>
                        )}
                      </div>
                      <div className="cart-item-actions">
                        <div className="quantity-control">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                        </div>
                        <button 
                          className="remove-btn"
                          onClick={() => removeFromCart(item.id)}
                        >
                          🗑️
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-footer">
                <div className="cart-summary">
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>{cartTotal.toLocaleString()}</span>
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
                  <button className="clear-cart" onClick={clearCart}>
                    Clear Cart
                  </button>
                  <button className="checkout-btn">
                    Proceed to Checkout →
                  </button>
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