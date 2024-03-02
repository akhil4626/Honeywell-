import React, { useState, useEffect } from 'react';

function GoogleMapsComponent({ selectedCityA, selectedCityB }) {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAfq0dEhEeJ_GLQIl4xEB79LCGtsace1nI&libraries=places`;
    script.async = true;
    script.onload = () => {
      initMap();
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const initMap = () => {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    const mapOptions = {
      zoom: 8,
      center: { lat: 0, lng: 0 }
    };
    const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);
    directionsRenderer.setMap(map);
    setMap(map);

    calculateAndDisplayRoute(directionsService, directionsRenderer);
  };

  const calculateAndDisplayRoute = (directionsService, directionsRenderer) => {
    if (!selectedCityA || !selectedCityB) return;

    directionsService.route(
      {
        origin: selectedCityA,
        destination: selectedCityB,
        travelMode: 'DRIVING'
      },
      (response, status) => {
        if (status === 'OK') {
          directionsRenderer.setDirections(response);
        } else {
          console.error('Directions request failed due to ' + status);
        }
      }
    );
  };

  return <div id="map" style={{ width: '100%', height: '400px' }}></div>;
}

export default GoogleMapsComponent;
