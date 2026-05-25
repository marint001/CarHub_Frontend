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
    const storedUser = localStorage.getItem('carHubUser');
    const token = localStorage.getItem('carHubToken');
    
    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = JSON.parse(localStorage.getItem('carHubUsers') || '[]');
        const foundUser = users.find(u => u.email === email && u.password === password);
        
        if (foundUser) {
          const userData = {
            id: foundUser.id,
            name: foundUser.name,
            email: foundUser.email,
            phone: foundUser.phone,
            avatar: `https://ui-avatars.com/api/?background=e63946&color=fff&name=${encodeURIComponent(foundUser.name)}`
          };
          const token = 'token_' + Date.now() + '_' + foundUser.id;
          
          localStorage.setItem('carHubUser', JSON.stringify(userData));
          localStorage.setItem('carHubToken', token);
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
        const users = JSON.parse(localStorage.getItem('carHubUsers') || '[]');
        
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
        localStorage.setItem('carHubUsers', JSON.stringify(users));
        
        const userData = {
          id: newUser.id,
          name: newUser.name,
          email: newUser.email,
          phone: newUser.phone,
          avatar: newUser.avatar
        };
        const token = 'token_' + Date.now() + '_' + newUser.id;
        
        localStorage.setItem('carHubUser', JSON.stringify(userData));
        localStorage.setItem('carHubToken', token);
        setUser(userData);
        setIsAuthenticated(true);
        resolve(userData);
      }, 500);
    });
  };

  const logout = () => {
    localStorage.removeItem('carHubUser');
    localStorage.removeItem('carHubToken');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};