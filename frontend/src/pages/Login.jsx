import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

const Login = ({ setUser }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  // Define your base URL once at the top of the component or function
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  const handleAction = async (e) => {
    e.preventDefault();
    const endpoint = isLogin ? '/api/login' : '/api/register';
    
    try {
      // Corrected Axios call using the dynamic URL
      const { data } = await axios.post(`${API_BASE}${endpoint}`, formData);
      
      if (isLogin) {
        // 1. Save user to LocalStorage
        localStorage.setItem('user', JSON.stringify(data.user));
        // 2. Update Global State
        setUser(data.user);
        // 3. Redirect Home
        navigate('/');
      } else {
        alert("Registration successful! Please login.");
        setIsLogin(true); 
      }
    } catch (error) {
      // Improved error logging for debugging Railway issues
      console.error("Login/Register Error:", error.response?.data || error.message);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '1.2rem',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid var(--border)',
    color: '#fff',
    marginBottom: '1rem',
    outline: 'none'
  };

  return (
    <div className="page-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <AnimatedSection float={true}>
          <div style={{ background: 'var(--bg-surface)', padding: '3rem', border: '1px solid var(--border)' }}>
            <h2 style={{ letterSpacing: '4px', marginBottom: '2rem', textAlign: 'center' }}>
              {isLogin ? 'LOGIN' : 'REGISTER'}
            </h2>

            <form onSubmit={handleAction}>
              {!isLogin && (
                <input 
                  type="text" placeholder="NAME" style={inputStyle} required
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              )}
              <input 
                type="email" placeholder="EMAIL" style={inputStyle} required
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
              <input 
                type="password" placeholder="PASSWORD" style={inputStyle} required
                onChange={(e) => setFormData({...formData, password: e.target.value})}
              />
              <button className="btn" style={{ width: '100%', marginTop: '1rem' }}>
                {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
              </button>
            </form>

            <p style={{ marginTop: '2rem', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
              {isLogin ? "New to SLS-BOYS?" : "Already a member?"}
              <span 
                onClick={() => setIsLogin(!isLogin)}
                style={{ color: '#fff', marginLeft: '10px', cursor: 'pointer', textDecoration: 'underline' }}
              >
                {isLogin ? 'Join Now' : 'Login'}
              </span>
            </p>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Login;