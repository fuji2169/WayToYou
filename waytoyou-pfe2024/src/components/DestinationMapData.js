import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import AsyncSelect from 'react-select/async';
import axios from 'axios';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

const center = [34.032950, -6.835221];
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function DestinationMapData() {
  const [startPosition, setStartPosition] = useState(center);
  const [finishPosition, setFinishPosition] = useState(null);
  const [startAddress, setStartAddress] = useState('');
  const [finishAddress, setFinishAddress] = useState('');
  const [routingControl, setRoutingControl] = useState(null);
  const mapRef = useRef(null);

  const MapClickHandler = () => {
    useMapEvents({
      click: async (e) => {
        const newPosition = [e.latlng.lat, e.latlng.lng];
        const address = await getAddressFromCoords(newPosition[0], newPosition[1]);

        sendLatLngToBackend(newPosition[0], newPosition[1]);

        L.popup()
          .setLatLng(newPosition)
          .setContent(`<div>${address}<br/><button onclick="window.dispatchEvent(new CustomEvent('addStartLocation', { detail: { address: '${address}', position: ${JSON.stringify(newPosition)} } }))">Add as start location</button></div>`)
          .openOn(mapRef.current);
      },
    });
    return null;
  };

  const sendLatLngToBackend = async (lat, lng) => {
    try {
      const response = await axios.post('http://localhost:8000/api/save-coordinates', {
        latitude: lat,
        longitude: lng,
      });
      console.log('Response from backend:', response.data);
    } catch (error) {
      console.error('Error sending data to backend:', error);
    }
  };

  const getAddressFromCoords = async (lat, lon) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
      const data = await response.json();
      if (data.display_name) {
        return data.display_name;
      } else {
        return 'Address not found';
      }
    } catch (error) {
      console.error('Error fetching address:', error);
      return 'Error retrieving address';
    }
  };

  const locateAddress = async (address, setAddress, setPosition) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`);
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        const newPos = [lat, lon];
        setPosition(newPos);
        mapRef.current.flyTo(newPos, 13);
      } else {
        console.log('No results found for this address');
      }
    } catch (error) {
      console.error('Error locating address:', error);
    }
  };

  const getUserLocation = () => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        const newPos = [latitude, longitude];
        const address = await getAddressFromCoords(newPos[0], newPos[1]);
        setStartPosition(newPos);
        setStartAddress(address);
        mapRef.current.flyTo(newPos, 13);
        L.popup()
          .setLatLng(newPos)
          .setContent(`Address: ${address}`)
          .openOn(mapRef.current);
      },
      (error) => {
        console.error('Error retrieving position:', error);
      }
    );
  };

  const loadOptions = async (inputValue) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(inputValue)}&format=json`);
      const data = await response.json();
      return data.map((place) => ({
        label: place.display_name,
        value: place,
      }));
    } catch (error) {
      console.error('Error fetching suggestions:', error);
      return [];
    }
  };

  const handleSelectChange = (selectedOption, setAddress, setPosition) => {
    setAddress(selectedOption.label);
    locateAddress(selectedOption.label, setAddress, setPosition);
  };

  const handleAddStartLocation = (event) => {
    const { address, position } = event.detail;
    setStartAddress(address);
    setStartPosition(position);
    mapRef.current.flyTo(position, 13);
  };

  const findPath = () => {
    if (!startPosition || !finishPosition) {
      alert("Please set both start and finish positions.");
      return;
    }

    if (routingControl) {
      routingControl.setWaypoints([L.latLng(startPosition), L.latLng(finishPosition)]);
    } else {
      const control = L.Routing.control({
        waypoints: [
          L.latLng(startPosition),
          L.latLng(finishPosition),
        ],
        routeWhileDragging: true,
        createMarker: function(i, wp, nWps) {
          return L.marker(wp.latLng, {
            draggable: true,
            icon: defaultIcon
          }).bindPopup(i === 0 ? startAddress : finishAddress);
        },
        show: false, // Hide the default instructions and summary
        addWaypoints: false, // Prevent the addition of waypoints
      }).addTo(mapRef.current);
      setRoutingControl(control);
    }
  };

  useEffect(() => {
    window.addEventListener('addStartLocation', handleAddStartLocation);
    return () => {
      window.removeEventListener('addStartLocation', handleAddStartLocation);
    };
  }, []);

  return (
    <div className="destination">
      <style>
        {`
          .leaflet-routing-container {
            display: none;
          }
        `}
      </style>
      <div className="coordonnees">
        <label>Starting point</label>
        <div className="start-des">
          <AsyncSelect
            className='start-destination'
            cacheOptions
            loadOptions={loadOptions}
            onChange={(selectedOption) => handleSelectChange(selectedOption, setStartAddress, setStartPosition)}
            defaultOptions
            value={startAddress ? { label: startAddress, value: startAddress } : null}
            placeholder="Enter start location"
            styles={{
              control: (provided) => ({ ...provided, minWidth: '' }),
              placeholder: (provided) => ({ ...provided, color: '#aaa' })
            }}
          />
          <button className="fa-solid fa-location-dot" onClick={getUserLocation}></button>
        </div>
        <label>Finish point</label>
        <AsyncSelect
          cacheOptions
          loadOptions={loadOptions}
          onChange={(selectedOption) => handleSelectChange(selectedOption, setFinishAddress, setFinishPosition)}
          defaultOptions
          value={finishAddress ? { label: finishAddress, value: finishAddress } : null}
          placeholder="Enter finish location"
          styles={{
            control: (provided) => ({ ...provided, minWidth: '' }),
            placeholder: (provided) => ({ ...provided, color: '#aaa' })
          }}
        />
        <button className="find-btn" onClick={findPath}>Find Path</button>
      </div>
      <div className="map">
        <MapContainer
          center={startPosition}
          zoom={13}
          style={{ width: '100%', height: '400px' }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap contributors"
          />
          <MapClickHandler />
          <Marker position={startPosition} icon={defaultIcon}>
            <Popup>{startAddress}</Popup>
          </Marker>
          {finishPosition && (
            <Marker position={finishPosition} icon={defaultIcon}>
              <Popup>{finishAddress}</Popup>
            </Marker>
          )}
        </MapContainer>
      </div>
    </div>
  );
}

export default DestinationMapData;
