import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { carService } from '../services/carService';
import { 
  FaCar, 
  FaShieldAlt, 
  FaClock, 
  FaCreditCard, 
  FaChevronLeft,
  FaChevronRight,
  FaCircle
} from 'react-icons/fa';
import CarCard from '../components/CarCard';

const Home = () => {
  const [featuredCars, setFeaturedCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  // Collection of high-quality car images from Unsplash
  const heroImages = [
    {
      url: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=80",
      title: "Luxury Sports Car",
      description: "Experience unparalleled performance"
    },
    {
      url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1600&q=80",
      title: "Elegant Sedans",
      description: "Sophistication meets comfort"
    },
    {
      url: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=1600&q=80",
      title: "Powerful SUVs",
      description: "Command the road with confidence"
    },
    {
      url: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600&q=80",
      title: "Exotic Supercars",
      description: "Unleash your inner speed demon"
    },
    {
      url: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1600&q=80",
      title: "Premium Collection",
      description: "Where luxury meets innovation"
    }
  ];

  useEffect(() => {
    loadFeaturedCars();
  }, []);

  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
      }, 5000); // Change slide every 5 seconds
    }
    return () => clearInterval(interval);
  }, [autoplay, heroImages.length]);

  const loadFeaturedCars = async () => {
    try {
      const data = await carService.getFeaturedCars();
      setFeaturedCars(data);
    } catch (error) {
      console.error('Error loading featured cars:', error);
    } finally {
      setLoading(false);
    }
  };

  const nextSlide = () => {
    setAutoplay(false);
    setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setAutoplay(true), 10000);
  };

  const prevSlide = () => {
    setAutoplay(false);
    setCurrentSlide((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1));
    // Resume autoplay after 10 seconds of inactivity
    setTimeout(() => setAutoplay(true), 10000);
  };

  const goToSlide = (index) => {
    setAutoplay(false);
    setCurrentSlide(index);
    setTimeout(() => setAutoplay(true), 10000);
  };

  return (
    <div>
      {/* Hero Section with Image Slider */}
      <div className="hero-section position-relative text-white">
        {/* Background Images */}
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`hero-slide position-absolute w-100 h-100 ${
              index === currentSlide ? 'active' : ''
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${image.url})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: index === currentSlide ? 1 : 0,
              transition: 'opacity 1s ease-in-out',
              zIndex: index === currentSlide ? 1 : 0
            }}
          >
            <div className="container h-100 d-flex align-items-center">
              <div className="row w-100">
                <div className="col-lg-8">
                  <h1 className="display-3 fw-bold mb-4 animate__animated animate__fadeInUp">
                    {image.title}
                  </h1>
                  <p className="lead mb-5 animate__animated animate__fadeInUp animate__delay-1s">
                    {image.description}
                  </p>
                  <div className="d-flex gap-3 animate__animated animate__fadeInUp animate__delay-2s">
                    <Link to="/cars" className="btn btn-primary btn-lg px-5 py-3">
                      Browse Collection
                    </Link>
                    <Link to="/contact" className="btn btn-outline-light btn-lg px-5 py-3">
                      Contact Us
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <button
          className="slider-nav prev position-absolute top-50 start-0 translate-middle-y ms-4"
          onClick={prevSlide}
          style={{ zIndex: 10 }}
        >
          <FaChevronLeft size={30} />
        </button>
        <button
          className="slider-nav next position-absolute top-50 end-0 translate-middle-y me-4"
          onClick={nextSlide}
          style={{ zIndex: 10 }}
        >
          <FaChevronRight size={30} />
        </button>

        {/* Slide Indicators */}
        <div className="slide-indicators position-absolute bottom-0 start-50 translate-middle-x mb-4 d-flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              className={`indicator-dot ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                background: index === currentSlide ? '#007bff' : 'rgba(255,255,255,0.5)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                padding: 0
              }}
            />
          ))}
        </div>

        {/* Slide Counter */}
        <div className="position-absolute top-0 end-0 m-4 px-3 py-2 bg-dark bg-opacity-50 rounded-pill">
          <span className="text-white">
            {currentSlide + 1} / {heroImages.length}
          </span>
        </div>
      </div>

      {/* Features Section */}
      <div className="container my-5 py-5">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">Why Choose Us</h2>
          <p className="lead text-muted">Experience the difference with our premium service</p>
        </div>
        <div className="row g-4">
          <div className="col-md-3">
            <div className="feature-card text-center p-4 h-100">
              <div className="feature-icon mb-4">
                <FaCar size={56} className="text-primary" />
              </div>
              <h4>Wide Selection</h4>
              <p className="text-muted">Over 100+ luxury vehicles to choose from</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="feature-card text-center p-4 h-100">
              <div className="feature-icon mb-4">
                <FaShieldAlt size={56} className="text-primary" />
              </div>
              <h4>Certified Pre-Owned</h4>
              <p className="text-muted">All vehicles thoroughly inspected</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="feature-card text-center p-4 h-100">
              <div className="feature-icon mb-4">
                <FaClock size={56} className="text-primary" />
              </div>
              <h4>Flexible Test Drives</h4>
              <p className="text-muted">Schedule at your convenience</p>
            </div>
          </div>
          <div className="col-md-3">
            <div className="feature-card text-center p-4 h-100">
              <div className="feature-icon mb-4">
                <FaCreditCard size={56} className="text-primary" />
              </div>
              <h4>Easy Financing</h4>
              <p className="text-muted">Competitive rates and flexible terms</p>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Cars */}
      <div className="bg-light py-5">
        <div className="container">
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold">Featured Vehicles</h2>
            <p className="lead text-muted">Hand-picked selection of our finest automobiles</p>
          </div>
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status" style={{ width: '4rem', height: '4rem' }}>
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : (
            <>
              <div className="row g-4">
                {featuredCars.map(car => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
              <div className="text-center mt-5">
                <Link to="/cars" className="btn btn-outline-primary btn-lg px-5 py-3">
                  View All Cars
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Call to Action Banner */}
      <div className="cta-banner bg-primary text-white py-5">
        <div className="container text-center">
          <h2 className="display-5 fw-bold mb-4">Ready to Experience Luxury?</h2>
          <p className="lead mb-4" style={{ fontSize: '1.3rem' }}>
            Schedule a test drive today and feel the difference of true performance.
          </p>
          <div className="d-flex justify-content-center gap-3">
            <Link to="/contact" className="btn btn-light btn-lg px-5 py-3">
              Book a Test Drive
            </Link>
            <Link to="/about" className="btn btn-outline-light btn-lg px-5 py-3">
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;