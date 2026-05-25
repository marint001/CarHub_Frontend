import React, { useState } from 'react';
import './styles/global.css';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import HeroSlider from './components/HeroSlider';
import SpecialOffers from './components/SpecialOffers';
import CarCatalog from './components/CarCatalog';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import BrandShowcase from './components/BrandShowcase';
import NewsletterSignup from './components/NewsletterSignup';
import VehiclesTable from './components/VehiclesTable';
import CarPark from './components/CarPark';
import CarDetailPage from './components/CarDetailPage';
import CustomizePage from './components/CustomizePage';
import Features from './components/Features';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { carsData } from './data/carsData';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCar, setSelectedCar] = useState(null);
  const [customizeCar, setCustomizeCar] = useState(null);

  const handleNavigate = (page, car = null) => {
    if (car) {
      setSelectedCar(car);
      setCurrentPage('detail');
    } else {
      setSelectedCar(null);
      setCustomizeCar(null);
      setCurrentPage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCustomize = (car) => {
    setSelectedCar(car);
    setCurrentPage('customize');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedCar(null);
    setCustomizeCar(null);
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToDetail = () => {
    setCurrentPage('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch(currentPage) {
      case 'vehicles':
        return <VehiclesTable cars={carsData} onViewDetails={(car) => handleNavigate('detail', car)} />;
      case 'carpark':
        return <CarPark cars={carsData} onViewDetails={(car) => handleNavigate('detail', car)} />;
      case 'features':
        return <Features />;
      case 'contact':
        return <Contact />;
      case 'detail':
        return <CarDetailPage car={selectedCar} onBack={handleBack} onCustomize={() => handleCustomize(selectedCar)} />;
      case 'customize':
        return <CustomizePage car={selectedCar} onBack={handleBackToDetail} onAddToCart={(car) => console.log('Added to cart:', car)} />;
      case 'home':
      default:
        return (
          <>
            <HeroSlider />
            <SpecialOffers />
            <CarCatalog cars={carsData} onViewDetails={(car) => handleNavigate('detail', car)} />
            <WhyChooseUs />
            <Testimonials />
            <BrandShowcase />
            <NewsletterSignup />
          </>
        );
    }
  };

  return (
    <AuthProvider>
      <div className="App">
        <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
        {renderPage()}
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;