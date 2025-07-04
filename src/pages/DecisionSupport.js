// src/pages/DecisionSupport.js
import React from 'react';
import './DecisionSupport.css';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const DecisionSupport = () => {
  const cropData = [
    { name: 'Tomatoes', yield: 85, cost: 60, profit: 25 },
    { name: 'Wheat', yield: 70, cost: 40, profit: 30 },
    { name: 'Corn', yield: 90, cost: 50, profit: 40 },
  ];

  return (
    <div className="decision-container">
      <h1>Farm Decision Support</h1>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Soil Health</h3>
          <p>Optimal (pH 6.5)</p>
        </div>
        <div className="metric-card">
          <h3>Moisture Level</h3>
          <p>72% (Adequate)</p>
        </div>
        <div className="metric-card">
          <h3>Pest Risk</h3>
          <p>Low (15%)</p>
        </div>
      </div>

      <div className="chart-section">
        <h2>Crop Profitability Analysis</h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={cropData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="profit" fill="#82ca9d" name="Profit ($)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="recommendations">
        <h2>Recommended Actions</h2>
        <ul>
          <li>Plant corn in the north field (highest profitability)</li>
          <li>Schedule irrigation for tomorrow morning</li>
          <li>Order nitrogen fertilizer for next week</li>
        </ul>
      </div>
    </div>
  );
};

export default DecisionSupport;