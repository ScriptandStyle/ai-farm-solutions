import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/login');
      return;
    }
    setUser(JSON.parse(userData));
    setLoading(false);
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-box">
        <h2>Profile</h2>
        <div className="profile-info">
          <div className="profile-field">
            <label>Username:</label>
            <span>{user.username}</span>
          </div>
          <div className="profile-field">
            <label>Email:</label>
            <span>{user.email}</span>
          </div>
          <div className="profile-field">
            <label>Role:</label>
            <span>{user.role}</span>
          </div>
          <div className="profile-field">
            <label>Account Created:</label>
            <span>{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile; 