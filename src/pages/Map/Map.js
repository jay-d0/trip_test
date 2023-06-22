import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import L from "leaflet";
import "leaflet-providers";
import "leaflet/dist/leaflet.css";
import "../../css/Map.css";
import "../../css/Map_Popup.css";
import Loading from "../../pages/Loading/Loading";
import markerIcon from "../../icons/location-pin.png";
import parisImage from "../../icons/eiffeltower.gif"; // Example image for Paris
import osakaImage from "../../icons/japan.gif"; // Example image for osaka
import egyptImage from "../../icons/egypt.gif"; // Example image for egypt
import newYorkImage from "../../icons/usa.gif"; // Example image for New York
import sydneyImage from "../../icons/sydney.gif"; // Example image for Sydney

function Map() {
  const { character } = useParams();
  const navigate = useNavigate();
  const mapRef = useRef(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedCity, setSelectedCity] = useState("");

  useEffect(() => {
    // Create the map instance
    const map = L.map(mapRef.current, {
      zoomControl: false,
      dragging: false,
      doubleClickZoom: false,
      scrollWheelZoom: false,
      boxZoom: false,
      keyboard: false,
      tap: false,
      touchZoom: false,
      maxBounds: [
        [85, -180],
        [-85, 180],
      ],
      maxZoom: 2,
    });

    // Set the initial view and zoom level
    map.setView([0, 0], 2);

    // Create a custom icon
    const customIcon = L.icon({
      iconUrl: markerIcon,
      iconSize: [55, 55], // Increase the size of the icon
      iconAnchor: [29, 48], // Adjust the icon anchor accordingly
    });

    // Create markers with popups
    const parisMarker = L.marker([60, -11], { icon: customIcon }).addTo(map)
      .bindPopup(`
        <div class="popup-content">
          <img src="${parisImage}" alt="Paris" class="popup-image" />
          <p class="popup-text">파리</p>
        </div>
      `);

    const osakaMarker = L.marker([35, 120], { icon: customIcon }).addTo(map)
      .bindPopup(`
        <div class="popup-content">
          <img src="${osakaImage}" alt="osaka" class="popup-image" />
          <p class="popup-text">오사카</p>
        </div>
      `);

    const egyptMarker = L.marker([24, 14], { icon: customIcon }).addTo(map)
      .bindPopup(`
        <div class="popup-content">
          <img src="${egyptImage}" alt="egypt" class="popup-image" />
          <p class="popup-text">이집트</p>
        </div>
      `);

    const newYorkMarker = L.marker([40, -86], { icon: customIcon }).addTo(map)
      .bindPopup(`
        <div class="popup-content">
          <img src="${newYorkImage}" alt="New York" class="popup-image" />
          <p class="popup-text">뉴욕</p>
        </div>
      `);

    const sydneyMarker = L.marker([-42, 133], { icon: customIcon }).addTo(map)
      .bindPopup(`
        <div class="popup-content">
          <img src="${sydneyImage}" alt="Sydney" class="popup-image" />
          <p class="popup-text">시드니</p>
        </div>
      `);

    // Mouseover event handler
    const onMouseOver = (e) => {
      const marker = e.target;
      marker.openPopup();
      setSelectedCity(marker.options.city); // Update selected city
    };

    // Mouseout event handler
    const onMouseOut = (e) => {
      const marker = e.target;
      marker.closePopup();
    };

    // To airport.js
    const handleClick = () => {
      setShowConfirmation(true);
    };

    // Add mouseover, mouseout, and click event listeners to markers
    parisMarker.on("mouseover", onMouseOver);
    parisMarker.on("mouseout", onMouseOut);
    parisMarker.on("click", handleClick);
    parisMarker.options.city = "파리"; // Add city name to marker options

    osakaMarker.on("mouseover", onMouseOver);
    osakaMarker.on("mouseout", onMouseOut);
    osakaMarker.on("click", handleClick);
    osakaMarker.options.city = "오사카"; // Add city name to marker options

    egyptMarker.on("mouseover", onMouseOver);
    egyptMarker.on("mouseout", onMouseOut);
    egyptMarker.on("click", handleClick);
    egyptMarker.options.city = "이집트"; // Add city name to marker options

    newYorkMarker.on("mouseover", onMouseOver);
    newYorkMarker.on("mouseout", onMouseOut);
    newYorkMarker.on("click", handleClick);
    newYorkMarker.options.city = "뉴욕"; // Add city name to marker options

    sydneyMarker.on("mouseover", onMouseOver);
    sydneyMarker.on("mouseout", onMouseOut);
    sydneyMarker.on("click", handleClick);
    sydneyMarker.options.city = "시드니"; // Add city name to marker options

    // Clean up the map instance when the component is unmounted
    return () => {
      map.remove();
    };
  }, []);

  const handleConfirm = () => {
    navigate(`/${character}/airport`);
  };

  const handleCancel = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="map-wrapper">
      <div className="title">Visual Studio Travel</div> {/* Title added */}
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="confirmation-content">
            <h2>Visualize Your Travel</h2>
            <p>{selectedCity}로 떠나시겠습니까?</p>
            <div className="confirmation-buttons">
              <button className="confirm-button" onClick={handleConfirm}>
                네
              </button>
              <button className="cancel-button" onClick={handleCancel}>
                아니오
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="map-container" ref={mapRef}></div>
    </div>
  );
}

function MapWithLoading() {
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    // Hide the loading spinner after 2 seconds
    const timeout = setTimeout(() => {
      setShowLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <div>{showLoading ? <Loading loading={showLoading} /> : <Map />}</div>;
}

export default MapWithLoading;
