import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('carShowroomUser');
    const token = localStorage.getItem('carShowroomToken');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Simulate API call
      setTimeout(() => {
        // Get users from localStorage
        const users = JSON.parse(localStorage.getItem('carShowroomUsers') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
          const userData = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            phone: foundUser.phone,
            avatar: foundUser.avatar || `https://ui-avatars.com/api/?background=e63946&color=fff&name=${encodeURIComponent(foundUser.name)}`
          };
          const token = 'token_' + Date.now() + '_' + foundUser.id;
          
          localStorage.setItem('carShowroomUser', JSON.stringify(userData));
          localStorage.setItem('carShowroomToken', token);
          setUser(userData);
          setIsAuthenticated(true);
          resolve(userData);
        } else {
          reject(new Error('Invalid email or password'));
        }
      }, 500);
    });
  };

  const register = (name, email, password, phone) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('carShowroomUsers') || '[]');
        
        // Check if user already exists
        if (users.find(u => u.email === email)) {
          reject(new Error('User already exists with this email'));
          return;
        }
        
        const newUser = {
          id: Date.now(),
          name,
          email,
          password,
          phone: phone || '',
          avatar: `https://ui-avatars.com/api/?background=e63946&color=fff&name=${encodeURIComponent(name)}`,
          createdAt: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('carShowroomUsers', JSON.stringify(users));
        
        // Auto login after registration
        const userData = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          avatar: newUser.avatar
        };
        const token = 'token_' + Date.now() + '_' + newUser.id;
        
        localStorage.setItem('carShowroomUser', JSON.stringify(userData));
        localStorage.setItem('carShowroomToken', token);
        setUser(userData);
        setIsAuthenticated(true);
        resolve(userData);
      }, 500);
    });
  };

  const logout = () => {
    localStorage.removeItem('carShowroomUser');
    localStorage.removeItem('carShowroomToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;