import React from 'react';

const Home = () => (
  <div
    className="container d-flex flex-column justify-content-center align-items-center"
    style={{ 
      minHeight: '80vh', 
      fontFamily: 'Poppins, sans-serif',
      padding: '2rem',
      textAlign: 'center',
      color: '#34495e',
    }}
  >
    <p className="lead" style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
      Building a <span style={{ color: '#27ae60', fontWeight: '700' }}>Smart City</span> for a 
      <span style={{ color: '#2980b9', fontWeight: '700' }}> Smarter India</span>.
    </p>
    <p style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>
      Together, let's make waste management <strong>efficient</strong>, <strong>sustainable</strong>, and <strong>environment-friendly</strong>.
    </p>
    <p style={{ maxWidth: '600px', fontSize: '1rem', color: '#7f8c8d', lineHeight: '1.6' }}>
      Our platform empowers citizens and authorities to collaborate seamlessly in reducing waste,
      promoting recycling, and keeping our cities clean and green for generations to come.
    </p>
  </div>
);

export default Home;
