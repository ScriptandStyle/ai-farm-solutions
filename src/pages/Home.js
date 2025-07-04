// src/pages/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Header with Navigation Options */}
      <header className="home-header">
        <h1>AgriTech Solutions</h1>
        <nav className="header-nav">
          <Link to="/pesticide-optimization" className="nav-box">Pesticide Optimization</Link>
          <Link to="/crop-recommendation" className="nav-box">Crop Recommendation</Link>
          <Link to="/weather-forecast" className="nav-box">Weather Forecast</Link>
          <Link to="/market-prices" className="nav-box">Market Prices</Link>
        </nav>
      </header>

      {/* Main Features Section */}
      <h2>Our Features</h2>
      <section className="features-section">
        
        <div className="features-grid">
          {/* Feature Box 1 */}
          <div className="feature-box">
            <div className="feature-icon">🌱</div>
            <h3>Pesticide Optimization</h3>
            <p>Reduce chemical usage while maintaining crop protection with our smart algorithms.</p>
            <Link to="/pesticide-optimization" className="feature-link">Try Now →</Link>
          </div>

          {/* Feature Box 2 */}
          <div className="feature-box">
            <div className="feature-icon">🌾</div>
            <h3>Crop Recommendation</h3>
            <p>Get personalized crop suggestions based on your soil and climate conditions.</p>
            <Link to="/crop-recommendation" className="feature-link">Explore →</Link>
          </div>

          {/* Feature Box 3 */}
          <div className="feature-box">
            <div className="feature-icon">⛅</div>
            <h3>Weather Forecast</h3>
            <p>Accurate localized weather predictions to help plan your farming activities.</p>
            <Link to="/weather-forecast" className="feature-link">Check Weather →</Link>
          </div>

          {/* Feature Box 4 */}
          <div className="feature-box">
            <div className="feature-icon">💰</div>
            <h3>Market Prices</h3>
            <p>Real-time commodity prices to help you get the best deals for your produce.</p>
            <Link to="/market-prices" className="feature-link">View Prices →</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;