import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AnimatedSection from '../components/AnimatedSection';

const Checkout = ({ cart, clearCart }) => {
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  // Form State
  const [formData, setFormData] = useState({
    firstName: '', lastName: '', address: '', city: '', zip: ''
  });

  const handlePayment = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Your cart is empty.");

    try {
      // Send order to backend
      const { data } = await axios.post('http://localhost:5000/api/orders', {
        customer: formData,
        items: cart,
        total: total
      });

      alert(`Payment Successful! Your order ID is ${data.orderId}`);
      clearCart(); // Empty the bag
      navigate('/'); // Send back to home

    } catch (error) {
      alert("Checkout failed. Please try again.");
    }
  };

  const inputStyle = {
    width: '100%', padding: '1rem', background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid var(--border)', color: '#fff', marginBottom: '1rem', outline: 'none'
  };

  return (
    <div className="page-container" style={{ maxWidth: '900px' }}>
      <AnimatedSection float={false}>
        <h1 style={{ textAlign: 'center', marginBottom: '4rem', letterSpacing: '3px' }}>SECURE CHECKOUT</h1>
      </AnimatedSection>

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem', flexWrap: 'wrap' }}>
        <AnimatedSection delay={0.2} float={false}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '0.8rem', letterSpacing: '2px' }}>SHIPPING DETAILS</h3>
          
          <form onSubmit={handlePayment}>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input type="text" placeholder="FIRST NAME" style={inputStyle} required
                onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
              <input type="text" placeholder="LAST NAME" style={inputStyle} required
                onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
            </div>
            <input type="text" placeholder="STREET ADDRESS" style={inputStyle} required
              onChange={(e) => setFormData({...formData, address: e.target.value})} />
            <div style={{ display: 'flex', gap: '1rem' }}>
              <input type="text" placeholder="CITY" style={inputStyle} required
                onChange={(e) => setFormData({...formData, city: e.target.value})} />
              <input type="text" placeholder="POSTAL CODE" style={inputStyle} required
                onChange={(e) => setFormData({...formData, zip: e.target.value})} />
            </div>
            
            <h3 style={{ margin: '2rem 0 1.5rem', fontSize: '0.8rem', letterSpacing: '2px' }}>PAYMENT (TEST MODE)</h3>
            <input type="text" placeholder="CARD NUMBER (Enter anything for test)" style={inputStyle} required />
            
            <button className="btn" type="submit" style={{ width: '100%', marginTop: '1rem' }}>
              Pay ${total.toFixed(2)}
            </button>
          </form>
        </AnimatedSection>

        <div style={{ borderLeft: '1px solid var(--border)', paddingLeft: '3rem' }}>
          <h3 style={{ marginBottom: '1.5rem', fontSize: '0.8rem', letterSpacing: '2px' }}>ORDER REVIEW</h3>
          {cart.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontSize: '0.9rem' }}>
              <span style={{ color: 'var(--text-secondary)' }}>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
          <div style={{ borderTop: '1px solid var(--border)', marginTop: '2rem', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
            <span>TOTAL</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;