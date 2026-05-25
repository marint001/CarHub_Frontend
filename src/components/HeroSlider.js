import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    {
      title: "Luxury Redefined",
      subtitle: "Experience the pinnacle of automotive engineering",
      description: "Discover our collection of world-class luxury vehicles that set new standards in performance, comfort, and innovation.",
      cta: "Explore Collection",
      ctaLink: "#catalog",
      image: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600",
      gradient: "linear-gradient(135deg, rgba(0,0,0,0.8), rgba(0,0,0,0.4))"
    },
    {
      title: "Electric Performance",
      subtitle: "The future of driving is here",
      description: "Embrace sustainable luxury with our range of high-performance electric vehicles that deliver instant torque and zero emissions.",
      cta: "Discover EVs",
      ctaLink: "#catalog",
      image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=1600",
      gradient: "linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.5))"
    },
    {
      title: "Classic Heritage",
      subtitle: "Timeless elegance meets modern luxury",
      description: "Explore our curated collection of classic and pre-owned vehicles that combine vintage charm with modern reliability.",
      cta: "View Classics",
      ctaLink: "#carpark",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600",
      gradient: "linear-gradient(135deg, rgba(0,0,0,0.75), rgba(0,0,0,0.45))"
    },
    {
      title: "Uncompromising Quality",
      subtitle: "Every vehicle is certified and inspected",
      description: "All our vehicles undergo rigorous 120-point inspection and come with comprehensive warranty coverage for peace of mind.",
      cta: "Learn More",
      ctaLink: "#features",
      image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1600",
      gradient: "linear-gradient(135deg, rgba(0,0,0,0.7), rgba(0,0,0,0.5))"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setDirection(1);
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    },
    exit: (direction) => ({
      x: direction > 0 ? '-100%' : '100%',
      opacity: 0,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 }
      }
    })
  };

  const textVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, delay: 0.2 }
    }
  };

  const buttonVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, delay: 0.4 }
    },
    hover: { 
      scale: 1.05,
      boxShadow: "0 10px 25px rgba(255, 215, 0, 0.3)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const handleSmoothScroll = (e, link) => {
    e.preventDefault();
    const element = document.querySelector(link);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="hero-slider-enhanced">
      {/* Slides */}
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="hero-slide"
          style={{
            backgroundImage: `url(${slides[currentSlide].image})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          <div className="hero-overlay" style={{ background: slides[currentSlide].gradient }}></div>
          
          <div className="hero-content-enhanced">
            <div className="hero-container">
              <motion.div
                variants={textVariants}
                initial="hidden"
                animate="visible"
                className="hero-text-container"
              >
                <span className="hero-badge-enhanced">
                  <span className="badge-dot"></span>
                  Since 1995
                </span>
                <h1 className="hero-title">
                  {slides[currentSlide].title}
                  <span className="hero-title-accent"></span>
                </h1>
                <p className="hero-subtitle">{slides[currentSlide].subtitle}</p>
                <p className="hero-description">{slides[currentSlide].description}</p>
                <div className="hero-buttons-enhanced">
                  <motion.a
                    href={slides[currentSlide].ctaLink}
                    className="hero-cta-primary"
                    onClick={(e) => handleSmoothScroll(e, slides[currentSlide].ctaLink)}
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                  >
                    {slides[currentSlide].cta} <span>→</span>
                  </motion.a>
                  <motion.a
                    href="#contact"
                    className="hero-cta-secondary"
                    onClick={(e) => handleSmoothScroll(e, '#contact')}
                    variants={buttonVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    whileTap="tap"
                    custom={1}
                  >
                    Contact Sales <span>→</span>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button className="hero-arrow hero-arrow-prev" onClick={prevSlide}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      <button className="hero-arrow hero-arrow-next" onClick={nextSlide}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>

      {/* Dots Navigation */}
      <div className="hero-dots">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`hero-dot ${currentSlide === index ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          >
            <span className="dot-progress"></span>
          </button>
        ))}
      </div>

      {/* Scroll Indicator */}
      <div className="hero-scroll-indicator">
        <div className="scroll-mouse">
          <div className="scroll-wheel"></div>
        </div>
        <div className="scroll-text">Scroll to explore</div>
      </div>
    </div>
  );
};

export default HeroSlider;