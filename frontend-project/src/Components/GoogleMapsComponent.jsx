import React, { useState } from 'react';
import { Box, Button, Text, Input } from '@chakra-ui/react';

function Homepage() {

  const [distance, setDistance] = useState('');
  const [mapSrc, setMapSrc] = useState('');

  async function calculateDistance(selectedCityB,selectedCityA) {
    if (!selectedCityA || !selectedCityB) return;

    const response = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${selectedCityA}&destinations=${selectedCityB}&key=AIzaSyAfq0dEhEeJ_GLQIl4xEB79LCGtsace1nI`
    );

    const data = await response.json();

    if (data.status === 'OK') {
      const distance = data.rows[0].elements[0].distance.text;
      setDistance(distance);

      // Update map source URL
      setMapSrc(`https://www.google.com/maps/embed/v1/directions?key=YOUR_API_KEY&origin=${selectedCityA}&destination=${selectedCityB}`);
    } else {
      setDistance('Error calculating distance');
      setMapSrc('');
    }
  }

  return (
    <Box p={4}>
      <Input
        placeholder="Enter City A"
        value={selectedCityA}
        onChange={(e) => setSelectedCityA(e.target.value)}
        mb={2}
      />
      <Input
        placeholder="Enter City B"
        value={selectedCityB}
        onChange={(e) => setSelectedCityB(e.target.value)}
        mb={2}
      />
      <Button colorScheme="blue" onClick={calculateDistance}>
        Calculate Distance
      </Button>
      {distance && (
        <Box mt={4}>
          <Text>
            Distance between {selectedCityA} and {selectedCityB}: {distance}
          </Text>
          {mapSrc && (
            // Google Maps iframe
            <iframe
              title="Google Map"
              width="600"
              height="450"
              frameBorder="0"
              style={{ border: 0 }}
              src={mapSrc}
              allowFullScreen
            ></iframe>
          )}
        </Box>
      )}
    </Box>
  );
}

export default Homepage;
