import React from 'react';
import './styles/global.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CarCatalog from './components/CarCatalog';
import Features from './components/Features';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { carsData } from './data/carsData';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Navbar />
        <Hero />
        <CarCatalog cars={carsData} />
        <Features />
        <Contact />
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;