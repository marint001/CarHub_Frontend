import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const testimonials = [
    {
      name: "John Anderson",
      role: "Porsche 911 Owner",
      content: "Absolutely incredible experience! The team helped me find my dream car and the financing was seamless. Highly recommend!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/1.jpg",
      date: "March 2024"
    },
    {
      name: "Sarah Johnson",
      role: "Tesla Model S Owner",
      content: "Best car buying experience I've ever had. Professional staff, amazing selection, and great after-sales service.",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/2.jpg",
      date: "February 2024"
    },
    {
      name: "Michael Chen",
      role: "Lamborghini Owner",
      content: "From selection to delivery, everything was perfect. The car exceeded my expectations. Will definitely buy again!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/men/3.jpg",
      date: "January 2024"
    },
    {
      name: "Emily Rodriguez",
      role: "Mercedes-Benz Owner",
      content: "Amazing customer service! They made the entire process smooth and enjoyable. Love my new car!",
      rating: 5,
      image: "https://randomuser.me/api/portraits/women/4.jpg",
      date: "December 2023"
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="testimonials-section">
      <div className="section-header">
        <h2>What Our <span>Customers Say</span></h2>
        <p>Real experiences from real car enthusiasts</p>
      </div>
      
      <div className="testimonials-container">
        <button className="testimonial-nav prev" onClick={prevTestimonial}>←</button>
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            className="testimonial-card"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="testimonial-image">
              <img src={testimonials[currentIndex].image} alt={testimonials[currentIndex].name} />
              <div className="quote-icon">"</div>
            </div>
            <div className="testimonial-content">
              <div className="rating">
                {'★'.repeat(testimonials[currentIndex].rating)}
                {'☆'.repeat(5 - testimonials[currentIndex].rating)}
              </div>
              <p className="testimonial-text">"{testimonials[currentIndex].content}"</p>
              <h4>{testimonials[currentIndex].name}</h4>
              <p className="testimonial-role">{testimonials[currentIndex].role}</p>
              <p className="testimonial-date">{testimonials[currentIndex].date}</p>
            </div>
          </motion.div>
        </AnimatePresence>
        
        <button className="testimonial-nav next" onClick={nextTestimonial}>→</button>
      </div>
      
      <div className="testimonial-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`dot ${currentIndex === index ? 'active' : ''}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </section>
  );
};

export default Testimonials;