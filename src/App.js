import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './styles/global.css';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import HeroSlider from './components/HeroSlider';
import SpecialOffers from './components/SpecialOffers';
import CarCatalog from './components/CarCatalog';
import WhyChooseUs from './components/WhyChooseUs';
import Testimonials from './components/Testimonials';
import BrandShowcase from './components/BrandShowcase';
import NewsletterSignup from './components/NewsletterSignup';
import NewCars from './components/NewCars';
import UsedCars from './components/UsedCars';
import CarDetailPage from './components/CarDetailPage';
import CustomizePage from './components/CustomizePage';
import Features from './components/Features';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { carsData } from './data/carsData';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3, ease: "easeIn" } }
};

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCar, setSelectedCar] = useState(null);
  const [carSource, setCarSource] = useState(null);

  const handleNavigate = (page, car = null, source = null) => {
    console.log('Navigating to:', page, car?.name, source);
    if (car) {
      setSelectedCar(car);
      setCarSource(source);
      setCurrentPage('detail');
    } else {
      setSelectedCar(null);
      setCarSource(null);
      setCurrentPage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // This function handles customize from ANY page (CarDetail, NewCars, UsedCars, CarCatalog)
  const handleCustomize = (car) => {
    console.log('handleCustomize called with car:', car?.name);
    setSelectedCar(car);
    setCurrentPage('customize');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToHome = () => {
    console.log('Going back to home page');
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToPrevious = () => {
    console.log('handleBackToPrevious called, carSource:', carSource);
    if (carSource === 'new') {
      setCurrentPage('newcars');
    } else if (carSource === 'used') {
      setCurrentPage('usedcars');
    } else {
      setCurrentPage('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddToCart = (customizedCar) => {
    console.log('Customized car added to cart:', customizedCar);
  };

  const renderPage = () => {
    console.log('Current page:', currentPage);
    switch(currentPage) {
      case 'newcars':
        return <NewCars 
          cars={carsData.filter(c => c.year >= 2020)} 
          onViewDetails={(car) => handleNavigate('detail', car, 'new')}
          onCustomize={handleCustomize}  // ← ADD THIS
        />;
      case 'usedcars':
        return <UsedCars 
          cars={carsData.filter(c => c.year < 2020)} 
          onViewDetails={(car) => handleNavigate('detail', car, 'used')}
          onCustomize={handleCustomize}  // ← ADD THIS
        />;
      case 'features':
        return <Features />;
      case 'contact':
        return <Contact />;
      case 'detail':
        return <CarDetailPage 
          car={selectedCar} 
          onBack={handleBackToPrevious} 
          onCustomize={() => handleCustomize(selectedCar)} 
        />;
      case 'customize':
        return <CustomizePage 
          car={selectedCar} 
          onBack={handleBackToHome}
          onAddToCart={handleAddToCart} 
        />;
      case 'home':
      default:
        return (
          <>
            <HeroSlider />
            <SpecialOffers />
            <CarCatalog 
              cars={carsData} 
              onViewDetails={(car) => handleNavigate('detail', car, 'home')}
              onCustomize={handleCustomize}  // ← ADD THIS
            />
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
      <CartProvider>
        <div className="App">
          <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
          <CartSidebar />
          <AnimatePresence mode="wait">
            <motion.div key={currentPage} variants={pageVariants} initial="initial" animate="animate" exit="exit">
              {renderPage()}
            </motion.div>
          </AnimatePresence>
          <Footer />
        </div>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;