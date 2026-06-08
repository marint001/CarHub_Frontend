import React from 'react';
import HeroSlider from '../components/HeroSlider';
import SpecialOffers from '../components/SpecialOffers';
import CarCatalog from '../components/CarCatalog';
import WhyChooseUs from '../components/WhyChooseUs';
import Testimonials from '../components/Testimonials';
import BrandShowcase from '../components/BrandShowcase';
import NewsletterSignup from '../components/NewsletterSignup';
import { carsData } from '../data/carsData';

const HomePage = ({ onViewDetails }) => {
  const handleViewDetails = (car) => {
    window.location.href = `/car/${car.id}`;
  };

  return (
    <>
      <HeroSlider />
      <SpecialOffers />
      <CarCatalog cars={carsData} onViewDetails={handleViewDetails} />
      <WhyChooseUs />
      <Testimonials />
      <BrandShowcase />
      <NewsletterSignup />
    </>
  );
};

export default HomePage;