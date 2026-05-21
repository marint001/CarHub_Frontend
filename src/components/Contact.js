import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const infoItems = [
    { icon: "📍", title: "Visit Us", content: "123 Luxury Avenue, Beverly Hills, CA 90210" },
    { icon: "📞", title: "Call Us", content: "(+855) 966623317" },
    { icon: "✉️", title: "Email Us", content: "CARHUB.Luxury@gmail.com" },
    { icon: "🕐", title: "Opening Hours", content: "Mon-Sat: 9AM-8PM | Sun: 10AM-5PM" }
  ];

  return (
    <section id="contact" className="contact-section">
      <div className="section-header">
        <h2>Get In <span>Touch</span></h2>
        <p>Ready to purchase your dream car? Contact us today</p>
      </div>
      
      <div className="contact-container">
        <div className="contact-info">
          {infoItems.map((item, index) => (
            <div className="info-item" key={index}>
              <div className="info-icon">{item.icon}</div>
              <div>
                <h4>{item.title}</h4>
                <p>{item.content}</p>
              </div>
            </div>
          ))}
        </div>
        
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input type="text" name="name" placeholder="Your Name" value={formData.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Your Email" value={formData.email} onChange={handleChange} required />
          </div>
          <div className="form-row">
            <input type="tel" name="phone" placeholder="Phone Number" value={formData.phone} onChange={handleChange} />
            <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} />
          </div>
          <textarea name="message" placeholder="Your Message" rows="5" value={formData.message} onChange={handleChange} required></textarea>
          <button type="submit" className="submit-btn">
            {submitted ? '✓ Message Sent!' : 'Send Message →'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;