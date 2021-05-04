import * as React from 'react';
import { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

require('dotenv').config();
console.log(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN);

const App=() => {
  console.log(process.env.REACT_APP_MAPBOX_ACCESS_TOKEN);
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 20.5937,
    longitude: 78.9629,
    zoom: 4
  });

  return (
    <ReactMapGL {...viewport} mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN} onViewportChange={nextViewport => setViewport(nextViewport)}/>
  );
}

export default App;
