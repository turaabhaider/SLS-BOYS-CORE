import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ 
      padding: '4rem 2rem', 
      marginTop: '5rem', 
      borderTop: '1px solid var(--border)',
      background: '#050505' 
    }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '2rem',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {/* Brand Section */}
        <div>
          <h3 style={{ letterSpacing: '2px', marginBottom: '1.5rem' }}>SLS-BOYS</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: '1.6' }}>
            High-performance streetwear designed for the modern landscape.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{ fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '1.2rem', color: 'var(--text-secondary)' }}>SHOP</h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.8rem' }}>
            <li style={{ marginBottom: '0.8rem' }}>
              <Link to="/shop" style={{ textDecoration: 'none', color: '#fff' }}>New Arrivals</Link>
            </li>
            <li style={{ marginBottom: '0.8rem' }}>
              <Link to="/shop" style={{ textDecoration: 'none', color: '#fff' }}>All Collection</Link>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h4 style={{ fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '1.2rem', color: 'var(--text-secondary)' }}>SUPPORT</h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.8rem' }}>
            <li style={{ marginBottom: '0.8rem' }}>
              <Link to="/contact" style={{ textDecoration: 'none', color: '#fff' }}>Contact Us</Link>
            </li>
            <li style={{ marginBottom: '0.8rem' }}>
              <a href="#" style={{ textDecoration: 'none', color: '#fff' }}>Shipping & Returns</a>
            </li>
          </ul>
        </div>

        {/* Internal Section with Styled Admin Link */}
        <div>
          <h4 style={{ fontSize: '0.7rem', letterSpacing: '2px', marginBottom: '1.2rem', color: 'var(--text-secondary)' }}>INTERNAL</h4>
          <ul style={{ listStyle: 'none', padding: 0, fontSize: '0.8rem' }}>
            <li>
              <Link to="/admin" style={{ 
                textDecoration: 'none', 
                color: 'rgba(255, 255, 255, 0.2)', // Very faint color for privacy
                fontSize: '0.65rem',
                letterSpacing: '1px',
                transition: 'color 0.3s ease'
              }}
              onMouseOver={(e) => e.target.style.color = '#fff'}
              onMouseOut={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.2)'}
              >
                ADMIN ACCESS
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright Bar */}
      <div style={{ 
        textAlign: 'center', 
        marginTop: '4rem', 
        paddingTop: '2rem', 
        borderTop: '1px solid rgba(255,255,255,0.05)',
        fontSize: '0.7rem',
        color: 'var(--text-secondary)',
        letterSpacing: '1px'
      }}>
        © 2026 SLS-BOYS. ALL RIGHTS RESERVED.
      </div>
    </footer>
  );
};

export default Footer;