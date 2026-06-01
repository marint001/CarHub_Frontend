import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      const parsedCart = JSON.parse(savedCart);
      setCartItems(parsedCart);
      updateCartSummary(parsedCart);
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
    updateCartSummary(cartItems);
  }, [cartItems]);

  const updateCartSummary = (items) => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    const total = items.reduce((sum, item) => {
      let itemPrice = item.price;
      // Handle both string price and numeric finalPrice
      if (item.isCustomized && item.finalPrice) {
        itemPrice = item.finalPrice;
      } else if (typeof item.price === 'string') {
        itemPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ''));
      }
      return sum + (itemPrice * item.quantity);
    }, 0);
    setCartCount(count);
    setCartTotal(total);
  };

  const addToCart = (item) => {
    setCartItems(prevItems => {
      // For customized cars, always add as new item (never merge)
      if (item.isCustomized) {
        return [...prevItems, { ...item, quantity: 1 }];
      }
      
      // For non-customized cars, check if exists (only merge non-customized)
      const existingItem = prevItems.find(i => i.id === item.id && !i.isCustomized);
      if (existingItem) {
        return prevItems.map(i =>
          i.id === item.id && !i.isCustomized
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prevItems, { ...item, quantity: 1 }];
    });
    
    // Show cart sidebar
    setIsCartOpen(true);
    
    // Auto hide after 3 seconds
    setTimeout(() => {
      setIsCartOpen(false);
    }, 3000);
  };

  const removeFromCart = (id) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      cartCount,
      cartTotal,
      isCartOpen,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;