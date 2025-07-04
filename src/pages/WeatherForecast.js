import React, { useState, useEffect } from 'react';
import './WeatherForecast.css';
import { WiDaySunny, WiRain, WiCloudy, WiSnow, WiThunderstorm, WiFog } from 'react-icons/wi';
import { FiSearch, FiMapPin } from 'react-icons/fi';

const WeatherForecast = () => {
  const [location, setLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [forecastDays, setForecastDays] = useState(3);

  // Sample API key - replace with your actual OpenWeatherMap API key
  const API_KEY = '05377845dbd74a8485b152215250304';
  
  const getWeatherIcon = (condition) => {
    switch (condition.toLowerCase()) {
      case 'clear':
        return <WiDaySunny className="weather-icon sunny" />;
      case 'rain':
        return <WiRain className="weather-icon rainy" />;
      case 'clouds':
        return <WiCloudy className="weather-icon cloudy" />;
      case 'snow':
        return <WiSnow className="weather-icon snowy" />;
      case 'thunderstorm':
        return <WiThunderstorm className="weather-icon stormy" />;
      case 'mist':
      case 'fog':
      case 'haze':
        return <WiFog className="weather-icon foggy" />;
      default:
        return <WiDaySunny className="weather-icon" />;
    }
  };

  const fetchWeatherData = async () => {
    if (!location.trim()) {
      setError('Please enter a location');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // First get coordinates for the location
      const geoResponse = await fetch(
`https://api.weatherapi.com/v1/search.json?key=${API_KEY}&q=${location}`
      );
      const geoData = await geoResponse.json();

      if (!geoData || geoData.length === 0) {
        throw new Error('Location not found');
      }

      const { lat, lon } = geoData[0];
      
      // Then get weather data
      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      );
      const data = await weatherResponse.json();

      // Process forecast data to get daily forecasts
      const dailyForecasts = processForecastData(data.list);
      setWeatherData({
        current: data.list[0],
        location: `${geoData[0].name}, ${geoData[0].country}`,
        forecast: dailyForecasts.slice(0, forecastDays)
      });
    } catch (err) {
      setError(err.message || 'Failed to fetch weather data');
    } finally {
      setLoading(false);
    }
  };

  const processForecastData = (forecastList) => {
    const dailyData = {};
    
    forecastList.forEach(item => {
      const date = new Date(item.dt * 1000).toLocaleDateString();
      if (!dailyData[date]) {
        dailyData[date] = {
          date,
          temp_min: item.main.temp_min,
          temp_max: item.main.temp_max,
          conditions: [item.weather[0].main],
          icon: item.weather[0].main,
          humidity: item.main.humidity,
          wind: item.wind.speed
        };
      } else {
        dailyData[date].temp_min = Math.min(dailyData[date].temp_min, item.main.temp_min);
        dailyData[date].temp_max = Math.max(dailyData[date].temp_max, item.main.temp_max);
        dailyData[date].conditions.push(item.weather[0].main);
      }
    });

    return Object.values(dailyData).map(day => ({
      ...day,
      // Get most frequent condition for the day
      condition: mode(day.conditions)
    }));
  };

  const mode = (arr) => {
    return arr.sort((a, b) =>
      arr.filter(v => v === a).length - arr.filter(v => v === b).length
    ).pop();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchWeatherData();
  };

  return (
    <div className="weather-container">
      <h1 className="weather-header">
        <FiMapPin className="header-icon" /> Weather Forecast
      </h1>
      <p className="weather-subheader">Get accurate weather predictions for your farm location</p>

      <form onSubmit={handleSubmit} className="weather-search">
        <div className="search-input">
          <FiSearch className="search-icon" />
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Enter city or region"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Get Forecast'}
        </button>
      </form>

      <div className="forecast-options">
        <span>Show forecast for:</span>
        {[1, 3, 5].map(days => (
          <button
            key={days}
            className={forecastDays === days ? 'active' : ''}
            onClick={() => setForecastDays(days)}
          >
            {days} {days === 1 ? 'Day' : 'Days'}
          </button>
        ))}
      </div>

      {error && <div className="weather-error">{error}</div>}

      {weatherData && (
        <div className="weather-results">
          <div className="current-weather">
            <h2>
              <FiMapPin /> {weatherData.location}
            </h2>
            <div className="current-details">
              <div className="current-main">
                {getWeatherIcon(weatherData.current.weather[0].main)}
                <div className="current-temp">
                  {Math.round(weatherData.current.main.temp)}°C
                </div>
              </div>
              <div className="current-stats">
                <div>
                  <span>Condition:</span> {weatherData.current.weather[0].description}
                </div>
                <div>
                  <span>Humidity:</span> {weatherData.current.main.humidity}%
                </div>
                <div>
                  <span>Wind:</span> {weatherData.current.wind.speed} m/s
                </div>
                <div>
                  <span>Feels Like:</span> {Math.round(weatherData.current.main.feels_like)}°C
                </div>
              </div>
            </div>
          </div>

          <div className="forecast-container">
            <h3>{forecastDays}-Day Forecast</h3>
            <div className="forecast-grid">
              {weatherData.forecast.map((day, index) => (
                <div key={index} className="forecast-card">
                  <div className="forecast-date">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </div>
                  {getWeatherIcon(day.condition)}
                  <div className="forecast-temps">
                    <span className="temp-max">{Math.round(day.temp_max)}°</span>
                    <span className="temp-min">{Math.round(day.temp_min)}°</span>
                  </div>
                  <div className="forecast-condition">{day.condition}</div>
                  <div className="forecast-details">
                    <div>💧 {day.humidity}%</div>
                    <div>🌬️ {day.wind} m/s</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherForecast;