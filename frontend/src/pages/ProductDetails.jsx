import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  // Use the environment variable from Railway, or fallback to local for development
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // FIXED: Using the dynamic API_BASE instead of hardcoded localhost
        const { data } = await axios.get(`${API_BASE}/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error("Product not found", err);
      }
    };
    fetchProduct();
  }, [id, API_BASE]);

  if (!product) return <div className="page-container" style={{ textAlign: 'center' }}>LOADING...</div>;

  return (
    <div className="page-container" style={{ display: 'flex', gap: '5vw', flexWrap: 'wrap' }}>
      {/* FIXED: Added the product image tag inside the container */}
      <div style={{ flex: '1 1 500px', background: '#111', height: '70vh', overflow: 'hidden' }}>
        <img 
          src={product.image} 
          alt={product.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
      </div>

      <div style={{ flex: '1 1 400px' }}>
        <Link to="/shop" style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', letterSpacing: '2px', textDecoration: 'none' }}>
          ← RETURN TO SHOP
        </Link>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: '1.5rem 0', textTransform: 'uppercase' }}>
          {product.name}
        </h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>${product.price.toFixed(2)}</p>
        
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '3rem' }}>
            {product.description || "Part of the exclusive SLS-BOYS drop. This piece features premium heavyweight construction tailored for a perfect minimalist silhouette."}
          </p>
          <button className="btn" onClick={() => addToCart(product)} style={{ width: '100%' }}>
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;