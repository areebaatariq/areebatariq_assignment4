import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyGetWeatherByCityQuery } from './components/weather';
import TemperatureScaleSelector from './components/TemperatureScaleSelector';
import { addSearch } from './store'; // Correct import
import './App.css'; // Add this line for styling

const App = () => {
  const [city, setCity] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('metric');
  const [apiUnit, setApiUnit] = useState('metric');
  const [trigger, { data, error, isLoading }] = useLazyGetWeatherByCityQuery();
  const dispatch = useDispatch();
  const recentSearches = useSelector((state) => state.recentSearches);

  const handleSearch = () => {
    if (city) {
      setApiUnit(selectedUnit);
      trigger({ city, unit: selectedUnit });
      dispatch(addSearch(city)); // Add city to recent searches
    }
  };

  const handleUnitChange = (event) => {
    setSelectedUnit(event.target.value);
  };

  const convertTemperature = (temp) => {
    if (apiUnit === 'metric' && selectedUnit === 'imperial') {
      return (temp * 9) / 5 + 32;
    } else if (apiUnit === 'imperial' && selectedUnit === 'metric') {
      return ((temp - 32) * 5) / 9;
    }
    return temp;
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Weather Now</h1>
      
      <div className="search-section">
        <input 
          type="text" 
          value={city} 
          onChange={(e) => setCity(e.target.value)} 
          placeholder="Enter city name" 
          className="city-input"
        />
        <button onClick={handleSearch} className="search-button">Search</button>
        
        <TemperatureScaleSelector 
          selectedUnit={selectedUnit} 
          onUnitChange={handleUnitChange} 
        />
      </div>

      {error && <p className="error-message">Error fetching weather data</p>}
      {isLoading && <p className="loading-message">Loading...</p>}
      {data && (
        <div className="weather-info">
          <h2>Weather in {data.name}</h2>
          <p>Temperature: {convertTemperature(data.main.temp)}°{selectedUnit === 'metric' ? 'C' : 'F'}</p>
          <p>Conditions: {data.weather[0].description}</p>
          <p>Wind Speed: {data.wind.speed} m/s</p>
        </div>
      )}

      <div className="recent-searches">
        <h3>Recent Searches</h3>
        <ul>
          {recentSearches.map((search, index) => (
            <li key={index} className="recent-search-item">{search}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
