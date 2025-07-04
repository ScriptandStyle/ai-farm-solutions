// src/pages/WeatherAlerts.js
import React, { useEffect, useState } from 'react';
import './WeatherAlerts.css';

const WeatherAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [location, setLocation] = useState('');

  useEffect(() => {
    const fetchAlerts = async () => {
      const mockAlerts = [
        {
          id: 1,
          type: 'Frost Warning',
          date: '2023-11-15',
          severity: 'High',
          description: 'Expected frost overnight. Protect sensitive crops.'
        },
        {
          id: 2,
          type: 'Drought Alert',
          date: '2023-11-10',
          severity: 'Medium',
          description: 'Low rainfall expected for next 2 weeks.'
        }
      ];
      setAlerts(mockAlerts);
    };

    fetchAlerts();
  }, [location]);

  return (
    <div className="weather-page">
      <h1>Weather Alerts</h1>
      <div className="weather-container">
        <div className="location-input">
          <input
            type="text"
            placeholder="Enter your location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <button>Update</button>
        </div>

        <div className="alerts-list">
          {alerts.map(alert => (
            <div key={alert.id} className={`alert-card ${alert.severity.toLowerCase()}`}>
              <span className="severity-badge">{alert.severity}</span>
              <h3>{alert.type}</h3>
              <p><strong>Date:</strong> {alert.date}</p>
              <p><strong>Severity:</strong> {alert.severity}</p>
              <p>{alert.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherAlerts;