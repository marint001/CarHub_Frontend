import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Navbar from './components/Navbar';
import CartSidebar from './components/CartSidebar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import NewCars from './components/NewCars';
import UsedCars from './components/UsedCars';
import CarDetailPage from './components/CarDetailPage';
import CheckoutPage from './components/CheckoutPage';
import CarComparePage from './components/CarComparePage';
import AccessoriesPage from './components/AccessoriesPage';
import Features from './components/Features';
import Contact from './components/Contact';
import { carsData } from './data/carsData';
import SettingsPage from './components/SettingsPage';
import MyPurchasesPage from './components/MyPurchasesPage';
import MyVehiclesPage from './components/MyVehiclesPage';

// Wrapper components to pass navigation
const NewCarsWrapper = () => {
  const [selectedCar, setSelectedCar] = React.useState(null);
  const [showDetail, setShowDetail] = React.useState(false);
  
  const handleViewDetails = (car) => {
    window.location.href = `/car/${car.id}`;
  };
  
  return <NewCars cars={carsData.filter(c => c.year >= 2020)} onViewDetails={handleViewDetails} />;
};

const UsedCarsWrapper = () => {
  const handleViewDetails = (car) => {
    window.location.href = `/car/${car.id}`;
  };
  
  return <UsedCars cars={carsData.filter(c => c.year < 2020)} onViewDetails={handleViewDetails} />;
};

const CarCatalogWrapper = () => {
  const handleViewDetails = (car) => {
    window.location.href = `/car/${car.id}`;
  };
  
  return <HomePage onViewDetails={handleViewDetails} />;
};

function AppRouter() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <div className="App">
            <Navbar />
            <CartSidebar />
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/CarHUB" element={<HomePage />} />
              <Route path="/new-cars" element={<NewCarsWrapper />} />
              <Route path="/used-cars" element={<UsedCarsWrapper />} />
              <Route path="/car/:id" element={<CarDetailPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/compare" element={<CarComparePage cars={carsData} />} />
              <Route path="/accessories" element={<AccessoriesPage />} />
              <Route path="/features" element={<Features />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/checkout/:step?" element={<CheckoutPage />} />
              <Route path="/checkout/success" element={<CheckoutPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="/purchases" element={<MyPurchasesPage />} />
              <Route path="/my-vehicles" element={<MyVehiclesPage />} />
            </Routes>
            <Footer />
          </div>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default AppRouter;