import React, { useState } from 'react';
import AnimatedSection from '../components/AnimatedSection';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message received. The SLS-BOYS team will contact you shortly.");
  };

  const inputStyle = {
    width: '100%',
    padding: '1.2rem',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid var(--border)',
    color: '#fff',
    marginBottom: '1.5rem',
    outline: 'none',
    transition: 'border-color 0.3s ease'
  };

  return (
    <div className="page-container" style={{ display: 'flex', flexWrap: 'wrap', gap: '4rem', alignItems: 'center' }}>
      
      {/* Left Side: Info */}
      <div style={{ flex: '1 1 400px' }}>
        <AnimatedSection float={false}>
          <p style={{ letterSpacing: '3px', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>GET IN TOUCH</p>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: '1rem 0', textTransform: 'uppercase' }}>
            Contact <br /> The Atelier
          </h1>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '2.5rem' }}>
            Whether it's a sizing inquiry, a collaboration proposal, or a shipping question, our team is available 24/7.
          </p>
          
          <div style={{ marginBottom: '2rem' }}>
            <h4 style={{ fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '0.5rem' }}>EMAIL</h4>
            <p style={{ color: '#fff' }}>support@sls-boys.com</p>
          </div>
          
          <div>
            <h4 style={{ fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '0.5rem' }}>LOCATION</h4>
            <p style={{ color: '#fff' }}>Studio 10, Design District <br /> London, UK</p>
          </div>
        </AnimatedSection>
      </div>

      {/* Right Side: Form */}
      <div style={{ flex: '1 1 500px' }}>
        <AnimatedSection delay={0.2} float={true}>
          <form 
            onSubmit={handleSubmit}
            style={{ 
              background: 'var(--bg-surface)', 
              padding: '3rem', 
              border: '1px solid var(--border)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
            }}
          >
            <input 
              type="text" 
              placeholder="YOUR NAME" 
              style={inputStyle} 
              required
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <input 
              type="email" 
              placeholder="EMAIL ADDRESS" 
              style={inputStyle} 
              required
              onChange={(e) => setFormData({...formData, email: e.target.value})}
            />
            <textarea 
              placeholder="HOW CAN WE HELP?" 
              rows="5" 
              style={{ ...inputStyle, resize: 'none' }} 
              required
              onChange={(e) => setFormData({...formData, message: e.target.value})}
            ></textarea>
            
            <button className="btn" style={{ width: '100%', marginTop: '1rem' }}>
              Send Message
            </button>
          </form>
        </AnimatedSection>
      </div>
      
    </div>
  );
};

export default Contact;