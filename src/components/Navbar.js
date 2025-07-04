import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/crop-disease">Crop Disease</Link>
        <Link to="/weather-alerts">Weather Alerts</Link>
        <Link to="/decision-support">Decision Support</Link>
        <Link to="/pesticide-optimization">Pesticide Optimization</Link>
        <Link to="/educational-videos">Educational Videos</Link>
      </div>
      <div className="auth-links">
        {user ? (
          <>
            <Link to="/profile">Profile</Link>
            <button onClick={handleLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;