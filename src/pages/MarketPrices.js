import React, { useState, useEffect } from 'react';
import './MarketPrices.css';
import { FiSearch, FiRefreshCw } from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MarketPrices = () => {
  const [commodities, setCommodities] = useState([]);
  const [filteredCommodities, setFilteredCommodities] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCommodity, setSelectedCommodity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Mock data - replace with actual API call
  const mockCommodities = [
    {
      id: 1,
      name: 'Rice',
      currentPrice: 42.5,
      unit: 'kg',
      trend: 'up',
      priceHistory: [
        { date: '2023-06-01', price: 38.2 },
        { date: '2023-06-08', price: 39.5 },
        { date: '2023-06-15', price: 40.8 },
        { date: '2023-06-22', price: 41.3 },
        { date: '2023-06-29', price: 42.5 }
      ],
      market: 'Chennai Wholesale Market'
    },
    {
      id: 2,
      name: 'Wheat',
      currentPrice: 28.7,
      unit: 'kg',
      trend: 'stable',
      priceHistory: [
        { date: '2023-06-01', price: 28.5 },
        { date: '2023-06-08', price: 28.3 },
        { date: '2023-06-15', price: 28.6 },
        { date: '2023-06-22', price: 28.9 },
        { date: '2023-06-29', price: 28.7 }
      ],
      market: 'Delhi Grain Market'
    },
    {
      id: 3,
      name: 'Tomato',
      currentPrice: 65.0,
      unit: 'kg',
      trend: 'down',
      priceHistory: [
        { date: '2023-06-01', price: 80.2 },
        { date: '2023-06-08', price: 75.5 },
        { date: '2023-06-15', price: 70.0 },
        { date: '2023-06-22', price: 67.3 },
        { date: '2023-06-29', price: 65.0 }
      ],
      market: 'Bangalore Vegetable Market'
    },
    {
      id: 4,
      name: 'Potato',
      currentPrice: 22.0,
      unit: 'kg',
      trend: 'up',
      priceHistory: [
        { date: '2023-06-01', price: 18.5 },
        { date: '2023-06-08', price: 19.2 },
        { date: '2023-06-15', price: 20.0 },
        { date: '2023-06-22', price: 21.5 },
        { date: '2023-06-29', price: 22.0 }
      ],
      market: 'Punjab Mandi'
    }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        setCommodities(mockCommodities);
        setFilteredCommodities(mockCommodities);
        setLoading(false);
      } catch (err) {
        setError('Failed to load market data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const results = commodities.filter(commodity =>
      commodity.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCommodities(results);
  }, [searchTerm, commodities]);

  const handleRefresh = () => {
    setLoading(true);
    setError(null);
    // Simulate refresh
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };

  const renderPriceTrend = (trend) => {
    switch (trend) {
      case 'up':
        return <span className="trend-up">↑ Increasing</span>;
      case 'down':
        return <span className="trend-down">↓ Decreasing</span>;
      default:
        return <span className="trend-stable">→ Stable</span>;
    }
  };

  const renderChart = () => {
    if (!selectedCommodity) return null;

    const data = {
      labels: selectedCommodity.priceHistory.map(item => 
        new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
      ),
      datasets: [
        {
          label: `Price (₹/${selectedCommodity.unit})`,
          data: selectedCommodity.priceHistory.map(item => item.price),
          borderColor: selectedCommodity.trend === 'up' ? '#4CAF50' : 
                     selectedCommodity.trend === 'down' ? '#F44336' : '#FFC107',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.4,
          fill: true
        }
      ]
    };

    const options = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: (context) => `₹${context.raw.toFixed(2)}/${selectedCommodity.unit}`
          }
        }
      },
      scales: {
        y: {
          beginAtZero: false,
          ticks: {
            callback: (value) => `₹${value}`
          }
        }
      }
    };

    return <Line data={data} options={options} />;
  };

  return (
    <div className="market-prices-container">
      <div className="market-header">
        <h1>Market Prices</h1>
        <p>Real-time commodity prices to help you get the best deals</p>
      </div>

      <div className="market-controls">
        <div className="search-container">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search commodities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button onClick={handleRefresh} disabled={loading}>
          <FiRefreshCw className={loading ? 'spinning' : ''} />
          {loading ? 'Refreshing...' : 'Refresh Data'}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading ? (
        <div className="loading-indicator">Loading market data...</div>
      ) : (
        <div className="market-content">
          <div className="commodity-list">
            <h3>Available Commodities</h3>
            {filteredCommodities.length > 0 ? (
              <ul>
                {filteredCommodities.map(commodity => (
                  <li 
                    key={commodity.id} 
                    className={selectedCommodity?.id === commodity.id ? 'active' : ''}
                    onClick={() => setSelectedCommodity(commodity)}
                  >
                    <div className="commodity-info">
                      <span className="commodity-name">{commodity.name}</span>
                      <span className="commodity-price">
                        ₹{commodity.currentPrice.toFixed(2)}/{commodity.unit}
                      </span>
                    </div>
                    <div className="commodity-meta">
                      <span className="market-name">{commodity.market}</span>
                      {renderPriceTrend(commodity.trend)}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="no-results">No commodities found matching your search</div>
            )}
          </div>

          <div className="price-details">
            {selectedCommodity ? (
              <>
                <h3>{selectedCommodity.name} Price Trend</h3>
                <div className="current-price">
                  <span>Current Price:</span>
                  <strong>₹{selectedCommodity.currentPrice.toFixed(2)}/{selectedCommodity.unit}</strong>
                  {renderPriceTrend(selectedCommodity.trend)}
                </div>
                <div className="market-source">
                  <span>Market:</span> {selectedCommodity.market}
                </div>
                <div className="price-chart">
                  {renderChart()}
                </div>
                <div className="price-history">
                  <h4>Recent Price History</h4>
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Price (₹/{selectedCommodity.unit})</th>
                        <th>Change</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedCommodity.priceHistory.map((item, index) => {
                        const prevPrice = index > 0 ? 
                          selectedCommodity.priceHistory[index - 1].price : item.price;
                        const change = ((item.price - prevPrice) / prevPrice * 100).toFixed(2);
                        return (
                          <tr key={index}>
                            <td>{new Date(item.date).toLocaleDateString()}</td>
                            <td>₹{item.price.toFixed(2)}</td>
                            <td className={
                              change >= 0 ? 'positive' : 'negative'
                            }>
                              {change >= 0 ? '+' : ''}{change}%
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            ) : (
              <div className="select-commodity">
                <p>Select a commodity to view detailed price information</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketPrices;