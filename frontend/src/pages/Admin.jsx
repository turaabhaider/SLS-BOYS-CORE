import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnimatedSection from '../components/AnimatedSection';

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  // CHANGED: Password now uses a DASH to match your request
  const ADMIN_PASSWORD = "TURAAB-DEV"; 

  const handleLogin = (e) => {
    e.preventDefault();
    // Using .trim() ensures no accidental spaces cause a login failure
    if (passwordInput.trim() === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchOrders();
    } else {
      alert("UNAUTHORIZED ACCESS: INVALID CREDENTIALS");
      setPasswordInput(''); // Clear the input on failure
    }
  };

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/orders');
      setOrders(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching orders", error);
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <AnimatedSection float={true}>
          <div style={{ background: 'var(--bg-surface)', padding: '3rem', border: '1px solid var(--border)', textAlign: 'center', width: '350px' }}>
            <h2 style={{ letterSpacing: '3px', marginBottom: '2rem', fontSize: '1rem' }}>ADMIN AUTHENTICATION</h2>
            <form onSubmit={handleLogin}>
              <input 
                type="password" 
                placeholder="ENTER SYSTEM KEY" 
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                style={{ 
                  width: '100%', padding: '1rem', background: 'rgba(255,255,255,0.03)', 
                  border: '1px solid var(--border)', color: '#fff', textAlign: 'center', outline: 'none' 
                }} 
              />
              <button className="btn" style={{ width: '100%', marginTop: '1.5rem' }}>ACCESS SYSTEM</button>
            </form>
          </div>
        </AnimatedSection>
      </div>
    );
  }

  return (
    <div className="page-container">
      <AnimatedSection float={false}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <h1 style={{ letterSpacing: '4px' }}>ATELIER ADMIN</h1>
          <button onClick={() => setIsAuthenticated(false)} className="btn-outline" style={{ padding: '0.5rem 1rem', fontSize: '0.6rem' }}>LOCK SESSION</button>
        </div>
      </AnimatedSection>

      {loading ? (
        <p style={{ color: 'var(--text-secondary)' }}>Syncing with server...</p>
      ) : (
        <AnimatedSection delay={0.2} float={false}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', background: 'var(--bg-surface)' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid var(--border)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  <th style={{ padding: '1.5rem 1rem' }}>ORDER ID</th>
                  <th style={{ padding: '1.5rem 1rem' }}>CUSTOMER</th>
                  <th style={{ padding: '1.5rem 1rem' }}>ITEMS</th>
                  <th style={{ padding: '1.5rem 1rem' }}>TOTAL</th>
                  <th style={{ padding: '1.5rem 1rem' }}>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1.5rem 1rem', fontWeight: 'bold' }}>{order.id}</td>
                    <td style={{ padding: '1.5rem 1rem', fontSize: '0.85rem' }}>
                      {order.customer.firstName} {order.customer.lastName}
                    </td>
                    <td style={{ padding: '1.5rem 1rem', fontSize: '0.85rem' }}>{order.items.length} units</td>
                    <td style={{ padding: '1.5rem 1rem', fontWeight: 'bold' }}>${order.total.toFixed(2)}</td>
                    <td style={{ padding: '1.5rem 1rem' }}>
                      <span style={{ background: '#111', border: '1px solid var(--border)', padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.65rem' }}>
                        {order.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </AnimatedSection>
      )}
    </div>
  );
};

export default Admin;