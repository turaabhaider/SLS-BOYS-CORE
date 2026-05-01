import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnimatedSection from '../components/AnimatedSection';

const Admin = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');

  // Define the API base URL for Railway compatibility
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const ADMIN_PASSWORD = "TURAAB-DEV"; 

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput.trim() === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      fetchOrders();
    } else {
      alert("UNAUTHORIZED ACCESS: INVALID CREDENTIALS");
      setPasswordInput('');
    }
  };

  const fetchOrders = async () => {
    try {
      // FIXED: Using dynamic API_BASE instead of hardcoded localhost
      const { data } = await axios.get(`${API_BASE}/api/orders`);
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
                  {/* FIXED: Implementing the requested 8-column layout */}
                  <th style={{ padding: '1.5rem 1rem' }}>CITY NAME</th>
                  <th style={{ padding: '1.5rem 1rem' }}>EVENT OR VENUE</th>
                  <th style={{ padding: '1.5rem 1rem' }}>ADDRESS</th>
                  <th style={{ padding: '1.5rem 1rem' }}> </th> {/* Empty Space */}
                  <th style={{ padding: '1.5rem 1rem' }}>PHONE NUMBER</th>
                  <th style={{ padding: '1.5rem 1rem' }}> </th> {/* Empty Space */}
                  <th style={{ padding: '1.5rem 1rem' }}>WEBSITE URL</th>
                  <th style={{ padding: '1.5rem 1rem' }}>ACCOMMODATION</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '1.5rem 1rem' }}>{order.customer.city}</td>
                    <td style={{ padding: '1.5rem 1rem', fontSize: '0.85rem' }}>
                      {order.items.map(item => item.name).join(', ')}
                    </td>
                    <td style={{ padding: '1.5rem 1rem' }}>{order.customer.address}</td>
                    <td style={{ padding: '1.5rem 1rem' }}></td> {/* Empty Space */}
                    <td style={{ padding: '1.5rem 1rem' }}>
                      {/* Note: Ensuring no '+' signs in phone numbers per requirements */}
                      {order.customer.phone ? order.customer.phone.replace('+', '') : 'N/A'}
                    </td>
                    <td style={{ padding: '1.5rem 1rem' }}></td> {/* Empty Space */}
                    <td style={{ padding: '1.5rem 1rem', fontSize: '0.75rem' }}>
                      sls-boys-core.up.railway.app
                    </td>
                    <td style={{ padding: '1.5rem 1rem' }}>
                      <span style={{ background: '#111', border: '1px solid var(--border)', padding: '0.3rem 0.8rem', borderRadius: '4px', fontSize: '0.65rem' }}>
                        STANDARD
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