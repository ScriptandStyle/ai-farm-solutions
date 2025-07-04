// src/pages/PesticideOptimization.js
import React, { useState } from 'react';
import './PesticideOptimization.css';

const PesticideOptimization = () => {
  const [formData, setFormData] = useState({
    cropType: 'tomatoes',
    pestType: 'aphids',
    area: 1,
    currentUsage: 0.5
  });

  const [recommendation, setRecommendation] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const calculateOptimization = () => {
    // Simulate calculation
    const recommendations = {
      tomatoes: {
        aphids: { optimal: 0.3, reduction: '40%' },
        whiteflies: { optimal: 0.4, reduction: '20%' }
      },
      wheat: {
        rust: { optimal: 0.2, reduction: '50%' }
      }
    };

    const cropRec = recommendations[formData.cropType] || {};
    const pestRec = cropRec[formData.pestType] || { optimal: 0.25, reduction: '30%' };

    setRecommendation({
      optimalUsage: pestRec.optimal * formData.area,
      reduction: pestRec.reduction,
      savings: (formData.currentUsage - pestRec.optimal) * formData.area
    });
  };

  return (
    <div className="pesticide-container">
      <h1>Pesticide Optimization</h1>
      
      <div className="input-form">
        <div className="form-group">
          <label>Crop Type:</label>
          <select name="cropType" value={formData.cropType} onChange={handleChange}>
            <option value="tomatoes">Tomatoes</option>
            <option value="wheat">Wheat</option>
            <option value="corn">Corn</option>
          </select>
        </div>

        <div className="form-group">
          <label>Pest Type:</label>
          <select name="pestType" value={formData.pestType} onChange={handleChange}>
            <option value="aphids">Aphids</option>
            <option value="whiteflies">Whiteflies</option>
            <option value="rust">Rust</option>
          </select>
        </div>

        <div className="form-group">
          <label>Area (acres):</label>
          <input 
            type="number" 
            name="area" 
            min="0.1" 
            step="0.1"
            value={formData.area}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Current Usage (liters/acre):</label>
          <input 
            type="number" 
            name="currentUsage" 
            min="0.1" 
            step="0.1"
            value={formData.currentUsage}
            onChange={handleChange}
          />
        </div>

        <button onClick={calculateOptimization}>Calculate Optimization</button>
      </div>

      {recommendation && (
        <div className="results">
          <h2>Optimization Results</h2>
          <p><strong>Optimal Usage:</strong> {recommendation.optimalUsage.toFixed(2)} liters</p>
          <p><strong>Reduction Possible:</strong> {recommendation.reduction}</p>
          <p><strong>Estimated Savings:</strong> {recommendation.savings.toFixed(2)} liters</p>
          <p><strong>Environmental Impact:</strong> Reduced chemical runoff by {recommendation.reduction}</p>
        </div>
      )}
    </div>
  );
};

export default PesticideOptimization;