import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = ({ cartCount, user, logout }) => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">SLS-BOYS</Link>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/shop">Shop</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>

      <div className="nav-icons" style={{ display: 'flex', alignItems: 'center' }}>
        <Link 
          to="/cart" 
          className="btn btn-outline" 
          style={{ 
            textDecoration: 'none', 
            border: '1px solid var(--border)', 
            padding: '0.5rem 1.2rem',
            fontSize: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <span>BAG</span>
          <motion.span
            key={cartCount}
            initial={{ scale: 1.5, color: '#fff' }}
            animate={{ scale: 1, color: 'var(--text-secondary)' }}
            style={{ fontWeight: '800' }}
          >
            ({cartCount})
          </motion.span>
        </Link>

        {/* AUTH TOGGLE: Show Logout if user is logged in, else show Login */}
        {user ? (
          <button 
            onClick={logout}
            className="btn" 
            style={{ 
              marginLeft: '1rem', 
              padding: '0.5rem 1.5rem', 
              fontSize: '0.75rem',
              background: '#ff4444', // Red color for logout
              color: '#fff',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            LOGOUT
          </button>
        ) : (
          <Link 
            to="/login" 
            className="btn" 
            style={{ 
              marginLeft: '1rem', 
              padding: '0.5rem 1.5rem', 
              fontSize: '0.75rem',
              textDecoration: 'none',
              display: 'inline-block'
            }}
          >
            LOGIN
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;