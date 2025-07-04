// src/pages/CropDisease.js
import React, { useState } from 'react';
import './CropDisease.css';

const CropDisease = () => {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(URL.createObjectURL(file));
  };

  const analyzeImage = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setResult({
        disease: 'Late Blight',
        confidence: '92%',
        treatment: 'Apply copper-based fungicides every 7-10 days',
        prevention: 'Rotate crops and ensure proper spacing'
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="disease-container">
      <h1>Crop Disease Detection</h1>
      <div className="upload-section">
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button onClick={analyzeImage} disabled={!image || loading}>
          {loading ? 'Analyzing...' : 'Analyze Image'}
        </button>
      </div>
      
      {image && (
        <div className="image-preview">
          <img src={image} alt="Uploaded crop" />
        </div>
      )}

      {result && (
        <div className="result-section">
          <h2>Analysis Result</h2>
          <p><strong>Disease:</strong> {result.disease}</p>
          <p><strong>Confidence:</strong> {result.confidence}</p>
          <h3>Recommended Treatment</h3>
          <p>{result.treatment}</p>
          <h3>Prevention Tips</h3>
          <p>{result.prevention}</p>
        </div>
      )}
    </div>
  );
};

export default CropDisease;