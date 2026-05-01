const FeaturedDrop = () => {
  return (
    <section style={{ background: '#0a0a0a', padding: '10rem 5%', display: 'flex', alignItems: 'center', gap: '5rem', flexWrap: 'wrap' }}>
      <div style={{ flex: 1 }}>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 4rem)', lineHeight: 1, marginBottom: '2rem' }}>SEASON 01 <br /> COLLECTION</h2>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '3rem', maxWidth: '450px' }}>
          Engineered for the streets. Our first drop focuses on structural silhouettes and premium heavyweight materials.
        </p>
        <button className="btn btn-outline">View Lookbook</button>
      </div>
      <div style={{ flex: 1, height: '600px', background: '#111' }}>
        <img 
          src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1000" 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          alt="Featured"
        />
      </div>
    </section>
  );
};

export default FeaturedDrop;