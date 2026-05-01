import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import AnimatedSection from '../components/AnimatedSection';

const Shop = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Define the API base URL - using Railway variable or local fallback
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // FIXED: Using the dynamic API_BASE instead of hardcoded localhost
        const { data } = await axios.get(`${API_BASE}/api/products`);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, [API_BASE]);

  return (
    <div className="page-container">
      <AnimatedSection float={false}>
        <h2 style={{ textAlign: 'center', marginBottom: '4rem', letterSpacing: '4px' }}>THE COLLECTION</h2>
      </AnimatedSection>

      {loading ? (
        <p style={{ textAlign: 'center', letterSpacing: '2px' }}>LOADING...</p>
      ) : (
        <div className="grid">
          {products.map((product, index) => (
            <AnimatedSection key={product.id || index} delay={index * 0.1} float={true}>
              <div className="product-card">
                <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="product-img" style={{ overflow: 'hidden', background: '#111' }}>
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      style={{ 
                        width: '100%', 
                        height: '100%', 
                        objectFit: 'cover',
                        transition: 'transform 0.5s ease' 
                      }} 
                      onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                      onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                    />
                  </div>
                  <h3 style={{ margin: '1.5rem 0 0.5rem', textTransform: 'uppercase', fontSize: '0.9rem' }}>
                    {product.name}
                  </h3>
                </Link>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  ${product.price.toFixed(2)}
                </p>
                <button 
                  className="btn btn-outline" 
                  style={{ width: '100%', fontSize: '0.7rem', letterSpacing: '1px' }} 
                  onClick={() => addToCart(product)}
                >
                  ADD TO CART
                </button>
              </div>
            </AnimatedSection>
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;