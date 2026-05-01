import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';
import Categories from '../components/Home/Categories';
import FeaturedDrop from '../components/Home/FeaturedDrop';

const Home = () => {
  return (
    <>
      <header className="hero">
        <motion.img 
          animate={{ 
            scale: [1, 1.05, 1],
            opacity: [0.4, 0.5, 0.4] 
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          src="https://images.unsplash.com/photo-1550639524-a6f58345a044?q=80&w=2000" 
          className="hero-video-bg"
          alt="Hero Background"
        />
        <div className="hero-content">
          <AnimatedSection float={true}>
            <p style={{ letterSpacing: '5px', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>NEW SEASON DROP</p>
            <h1 style={{ margin: '1rem 0' }}>SLS-BOYS <br /> CORE 26'</h1>
            <Link to="/shop" className="btn">Shop New Arrivals</Link>
          </AnimatedSection>
        </div>
      </header>

      {/* Categories Section - The "Shop Now" buttons are inside this component */}
      <AnimatedSection delay={0.2} float={false}>
        <Categories />
      </AnimatedSection>

      {/* Featured Drop Section */}
      <AnimatedSection delay={0.4} float={true}>
        <FeaturedDrop />
      </AnimatedSection>

      {/* Trending / New Arrivals Grid */}
      <section className="page-container" style={{ padding: '5rem 5%' }}>
        <AnimatedSection float={false}>
          <h2 style={{ textAlign: 'center', marginBottom: '3rem', letterSpacing: '3px' }}>TRENDING NOW</h2>
        </AnimatedSection>
        
        <div className="grid">
          <AnimatedSection delay={0.1} float={true}>
            <div className="product-card">
              <div className="product-img">
                 <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=800" alt="Hoodie" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
              <h3 style={{marginTop: '1rem'}}>HEAVY OVERSIZED HOODIE</h3>
              <p style={{color: 'var(--text-secondary)'}}>$95.00</p>
            </div>
          </AnimatedSection>

          <AnimatedSection delay={0.3} float={true}>
            <div className="product-card">
              <div className="product-img">
                <img src="https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=800" alt="Tee" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
              <h3 style={{marginTop: '1rem'}}>CORE GRAPHIC TEE</h3>
              <p style={{color: 'var(--text-secondary)'}}>$45.00</p>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
};

export default Home;