import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GoogleMapsComponent from './GoogleMapsComponent'; 

function HomePage() {
  const [cities, setCities] = useState([]);
  const [selectedCityA, setSelectedCityA] = useState('');
  const [selectedCityB, setSelectedCityB] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); 

  useEffect(() => {
    axios.get('http://localhost:5000/api/cities')
      .then(response => {
        setCities(response.data);
        console.log(response.data);
      })
      .catch(error => console.error('Error fetching cities:', error));
  }, []);

  useEffect(() => {
    console.log('Selected City A:', selectedCityA);
  }, [selectedCityA]);

  useEffect(() => {
    console.log('Selected City B:', selectedCityB);
  }, [selectedCityB]);

  const handleCityChange = (event, setCity) => {
    setCity(event.target.value);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div>
      <h1>City Path Finder</h1>
      <div>
        <label>Select City A:</label>
        <select value={selectedCityA} onChange={(e) => handleCityChange(e, setSelectedCityA)}>
          <option value="">Select City A</option>
          {cities.map(city => (
            <option key={city.name} value={city.name}>{city.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Select City B:</label>
        <select value={selectedCityB} onChange={(e) => handleCityChange(e, setSelectedCityB)}>
          <option value="">Select City B</option>
          {cities.map(city => (
            <option key={city.name} value={city.name}>{city.name}</option>
          ))}
        </select>
      </div>
      <button onClick={handleSubmit}>Submit</button>
      {isSubmitted && (
        <GoogleMapsComponent
          selectedCityA={selectedCityA}
          selectedCityB={selectedCityB}
        />
      )}
    </div>
  );
}

export default HomePage;
