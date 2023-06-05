import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './css/Map.css';

import markerIcon from './icons/location-pin.png';

function Map() {
  const { character } = useParams();

  // Define the map container ID
  const mapContainerId = 'map';

  useEffect(() => {
    // Create the map instance
    const map = L.map(mapContainerId, {
      zoomControl: false,
      dragging: false,
      doubleClickZoom: false,
      scrollWheelZoom: false,
      boxZoom: false,
      keyboard: false,
      tap: false,
      touchZoom: false,
      maxBounds: [[-90, -180], [90, 180]],
      maxZoom: 2,
    });

    // Set the initial view and zoom level
    map.setView([0, 0], 2);

    // Create and add the tile layer to the map
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      noWrap: true
    }).addTo(map);

    // Create a custom icon
    const customIcon = L.icon({
        iconUrl: markerIcon,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
    })

    const parisMarker = L.marker([48.8566, 2.3522], { icon: customIcon }).addTo(map);
    const tokyoMarker = L.marker([35.6895, 139.6917], { icon: customIcon }).addTo(map);

    parisMarker.bindTooltip('파리').openTooltip();
    tokyoMarker.bindTooltip('도쿄').openTooltip();

    // Clean up the map instance when the component is unmounted
    return () => {
      map.remove();
    };
  }, [mapContainerId]);

  return (
    <div className="map-wrapper">
      <h1>{character}님, 여행할 도시를 선택해 주세요</h1>
      <div id={mapContainerId} className="map-container"></div>
    </div>
  );
}

export default Map;
