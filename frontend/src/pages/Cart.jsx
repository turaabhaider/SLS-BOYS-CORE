import { Link } from 'react-router-dom';
import AnimatedSection from '../components/AnimatedSection';

const Cart = ({ cart, removeFromCart }) => {
  const total = cart.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="page-container">
      <AnimatedSection float={false}>
        <h1 style={{ letterSpacing: '4px', marginBottom: '3rem', textTransform: 'uppercase' }}>Your Bag</h1>
      </AnimatedSection>

      {cart.length === 0 ? (
        <AnimatedSection delay={0.2}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>Your bag is currently empty.</p>
          <Link to="/shop" className="btn">Start Shopping</Link>
        </AnimatedSection>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '4rem' }}>
          <div>
            {cart.map((item, index) => (
              <AnimatedSection key={index} delay={index * 0.1} float={false}>
                <div style={{ display: 'flex', gap: '2rem', padding: '1.5rem 0', borderBottom: '1px solid var(--border)' }}>
                  <div style={{ width: '120px', height: '150px', background: '#111' }}></div>
                  <div style={{ flex: 1 }}>
                    <h3 style={{ textTransform: 'uppercase', marginBottom: '0.5rem' }}>{item.name}</h3>
                    <p style={{ color: 'var(--text-secondary)' }}>${item.price.toFixed(2)}</p>
                    <button 
                      onClick={() => removeFromCart(index)}
                      style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', marginTop: '1rem', fontSize: '0.7rem', letterSpacing: '1px' }}
                    >
                      REMOVE
                    </button>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection delay={0.3} float={true}>
            <div style={{ background: 'var(--bg-surface)', padding: '2rem', border: '1px solid var(--border)' }}>
              <h3 style={{ marginBottom: '1.5rem', letterSpacing: '2px' }}>SUMMARY</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <span>Subtotal</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', color: 'var(--text-secondary)' }}>
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <Link to="/checkout" className="btn" style={{ width: '100%', textAlign: 'center' }}>Checkout</Link>
            </div>
          </AnimatedSection>
        </div>
      )}
    </div>
  );
};

export default Cart;