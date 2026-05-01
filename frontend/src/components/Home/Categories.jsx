import { Link } from 'react-router-dom';

const Categories = () => {
  const categoryData = [
    {
      title: "Outerwear",
      image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=800",
    },
    {
      title: "Essentials",
      image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=800",
    },
    {
      title: "Accessories",
      image: "https://images.unsplash.com/photo-1509319117193-57bab727e09d?q=80&w=800",
    }
  ];

  return (
    <section style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
      gap: '1rem', 
      padding: '2rem' 
    }}>
      {categoryData.map((cat, index) => (
        <div key={index} style={{ 
          position: 'relative', 
          height: '500px', 
          background: `url(${cat.image}) center/cover no-repeat`,
          display: 'flex',
          alignItems: 'flex-end',
          padding: '2rem'
        }}>
          {/* Dark Overlay */}
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.3)' }}></div>

          <div style={{ position: 'relative', zIndex: 2 }}>
            <h2 style={{ color: '#fff', marginBottom: '1rem', letterSpacing: '2px' }}>{cat.title}</h2>
            
            {/* THE FIX: Link to the shop page */}
            <Link to="/shop" style={{ textDecoration: 'none' }}>
              <button style={{ 
                padding: '0.8rem 1.5rem', 
                background: '#fff', 
                color: '#000', 
                border: 'none', 
                fontSize: '0.7rem', 
                fontWeight: 'bold',
                cursor: 'pointer',
                letterSpacing: '1px'
              }}>
                SHOP NOW
              </button>
            </Link>
          </div>
        </div>
      ))}
    </section>
  );
};

export default Categories;