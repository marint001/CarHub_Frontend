import React from 'react';

const About = () => {
  return (
    <div className="container my-5">
      <h1 className="text-center mb-5">About Luxury Car Showroom</h1>
      
      <div className="row mb-5">
        <div className="col-md-6">
          <img 
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=1600&q=80" 
            alt="Showroom"
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-6">
          <h3>Our Story</h3>
          <p>Founded in 2025, Luxury Car Showroom has been providing exceptional vehicles and service to car enthusiasts for over a decade. Our commitment to quality and customer satisfaction has made us one of the premier luxury car dealerships in the region.</p>
          <p>We specialize in high-end vehicles from the world's most prestigious manufacturers, ensuring that every car in our inventory meets the highest standards of performance, luxury, and reliability.</p>
          <p>Our team of experienced professionals is dedicated to helping you find the perfect vehicle that matches your lifestyle and preferences. From the moment you step into our showroom to the day you drive away in your dream car, we're here to provide an unforgettable experience.</p>
        </div>
      </div>

      <div className="row mb-5">
        <div className="col-md-4 text-center mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h1 className="text-primary display-4">500+</h1>
              <h5>Cars Sold</h5>
              <p className="text-muted">Since our establishment</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 text-center mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h1 className="text-primary display-4">1000+</h1>
              <h5>Happy Customers</h5>
              <p className="text-muted">And counting</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 text-center mb-4">
          <div className="card h-100">
            <div className="card-body">
              <h1 className="text-primary display-4">10+</h1>
              <h5>Years of Excellence</h5>
              <p className="text-muted">Serving car enthusiasts</p>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12">
          <h3 className="text-center mb-4">Our Values</h3>
          <div className="row">
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5>Quality Assurance</h5>
                  <p>Every vehicle undergoes rigorous inspection to ensure the highest quality standards.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5>Customer First</h5>
                  <p>Your satisfaction is our top priority. We go above and beyond for our clients.</p>
                </div>
              </div>
            </div>
            <div className="col-md-4 mb-3">
              <div className="card h-100">
                <div className="card-body">
                  <h5>Transparency</h5>
                  <p>Honest pricing, clear communication, and no hidden fees.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;