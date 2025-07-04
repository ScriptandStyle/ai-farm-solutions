import React, { useState } from 'react';
import './CropRecommendation.css';

const CropRecommendation = () => {
  const [soilType, setSoilType] = useState('');
  const [climate, setClimate] = useState('');
  const [result, setResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call with timeout
    setTimeout(() => {
      const recommendations = {
        'Clay-Warm': ['Tomatoes', 'Peppers', 'Okra'],
        'Clay-Cold': ['Cabbage', 'Kale', 'Broccoli'],
        'Sandy-Warm': ['Watermelon', 'Carrots', 'Sweet Potatoes'],
        'Sandy-Cold': ['Spinach', 'Lettuce', 'Peas'],
        'Loamy-Warm': ['Corn', 'Beans', 'Squash'],
        'Loamy-Cold': ['Potatoes', 'Onions', 'Garlic']
      };

      const key = `${soilType}-${climate}`;
      setResult(recommendations[key] || ['No specific recommendation. Try adjusting your inputs.']);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="crop-recommendation-container">
      <div className="crop-header">
        <h1><i className="fas fa-seedling"></i> Crop Recommendation</h1>
        <p>Get personalized suggestions based on your soil and climate conditions</p>
      </div>

      <div className="crop-form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="soilType">Soil Type</label>
            <select 
              id="soilType" 
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              required
            >
              <option value="">Select Soil Type</option>
              <option value="Clay">Clay</option>
              <option value="Sandy">Sandy</option>
              <option value="Loamy">Loamy</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="climate">Climate</label>
            <select 
              id="climate" 
              value={climate}
              onChange={(e) => setClimate(e.target.value)}
              required
            >
              <option value="">Select Climate</option>
              <option value="Warm">Warm (Above 20°C)</option>
              <option value="Cold">Cold (Below 20°C)</option>
            </select>
          </div>

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Analyzing...' : 'Get Recommendations'}
            {isLoading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-arrow-right"></i>}
          </button>
        </form>

        {result && (
          <div className="result-container">
            <h3>Recommended Crops:</h3>
            <div className="crop-grid">
              {result.map((crop, index) => (
                <div key={index} className="crop-card">
                  <i className="fas fa-leaf"></i>
                  <span>{crop}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CropRecommendation;