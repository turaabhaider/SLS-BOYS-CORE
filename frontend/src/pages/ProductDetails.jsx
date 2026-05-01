import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
      } catch (err) {
        console.error("Product not found");
      }
    };
    fetchProduct();
  }, [id]);

  if (!product) return <div className="page-container" style={{ textAlign: 'center' }}>LOADING...</div>;

  return (
    <div className="page-container" style={{ display: 'flex', gap: '5vw', flexWrap: 'wrap' }}>
      <div style={{ flex: '1 1 500px', background: '#111', height: '70vh' }}></div>
      <div style={{ flex: '1 1 400px' }}>
        <Link to="/shop" style={{ color: 'var(--text-secondary)', fontSize: '0.7rem', letterSpacing: '2px', textDecoration: 'none' }}>
          ← RETURN TO SHOP
        </Link>
        <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', margin: '1.5rem 0', textTransform: 'uppercase' }}>{product.name}</h1>
        <p style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>${product.price.toFixed(2)}</p>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: '2rem' }}>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.8', marginBottom: '3rem' }}>
            Part of the exclusive SLS-BOYS drop. This piece features premium heavyweight construction 
            tailored for a perfect minimalist silhouette.
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