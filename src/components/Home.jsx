import React from 'react';
import adminImage from '../assets/dash.png'; 

const Home = () => {
  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: 'linear-gradient(135deg, #f8f9fa, #e3f2fd)',
      }}
    >
      <div className="card p-4 border-0 shadow-lg text-center" style={{ maxWidth: '500px' }}>
        <img
          src={adminImage}
          alt="Admin Dashboard"
          className="img-fluid rounded mb-4"
          style={{ maxHeight: '200px', objectFit: 'contain' }}
        />
        <h1 className="h3 fw-bold text-primary">Welcome to Admin Panel</h1>
        <p className="text-muted">Easily manage your  Menu, and Orders in one place.</p>
      </div>
    </div>
  );
};

export default Home;
