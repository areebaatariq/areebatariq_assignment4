// TemperatureScaleSelector.js
import React from 'react';

const TemperatureScaleSelector = ({ selectedUnit, onUnitChange }) => {
  return (
    <label>
      Select Temperature Scale:
      <select value={selectedUnit} onChange={onUnitChange}>
        <option value="metric">Celsius (°C)</option>
        <option value="imperial">Fahrenheit (°F)</option>
      </select>
    </label>
  );
};

export default TemperatureScaleSelector;
