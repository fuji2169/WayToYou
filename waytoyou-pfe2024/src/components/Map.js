import React, { useState, useRef } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const center = [34.032950, -6.835221];
const defaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

function Map() {
    const [position, setPosition] = useState(center);
    const [address, setAddress] = useState('');
    const mapRef = useRef(null);
  
    const MapClickHandler = () => {
      useMapEvents({
        click: async (e) => {
          const newPosition = [e.latlng.lat, e.latlng.lng];
          setPosition(newPosition);
          mapRef.current.flyTo(newPosition, 13);
    
          const address = await getAddressFromCoords(newPosition[0], newPosition[1]);
          const popup = L.popup()
            .setLatLng(newPosition)
            .setContent(`Adresse: ${address}`)
            .openOn(mapRef.current);
        },
      });
      return null;
    };
    const getAddressFromCoords = async (lat, lon) => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        const data = await response.json();
        if (data.display_name) {
          return data.display_name;
        } else {
          return 'Adresse non trouvée';
        }
      } catch (error) {
        console.error('Erreur lors de la recherche d\'adresse :', error);
        return 'Erreur de récupération d\'adresse';
      }
    };
  
    const locateAddress = async () => {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json`);
        const data = await response.json();
        if (data.length > 0) {
          const { lat, lon } = data[0];
          const newPos = [lat, lon];
          setPosition(newPos);
          mapRef.current.flyTo(newPos, 13);
        } else {
          console.log('Aucun résultat trouvé pour cette adresse');
        }
      } catch (error) {
        console.error('Erreur lors de la localisation de l\'adresse :', error);
      }
    };
  
    const getUserLocation = () => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPos = [latitude, longitude];
          const address = getAddressFromCoords(newPos[0], newPos[1]);
          setPosition(newPos);
          mapRef.current.flyTo(newPos, 13);
          const popup = L.popup()
            .setLatLng(newPos)
            .setContent(`Adresse: ${address}`)
            .openOn(mapRef.current);
        },
        (error) => {
          console.error('Erreur lors de la récupération de la position :', error);
        }
      );
    };
  
    return (
        <div className='map-container'>
            <MapContainer
                    center={position}
                    zoom={13}
                    style={{ width: '100%', height: '400px' }}
                    ref={mapRef}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution="© OpenStreetMap contributors"
                />
                <MapClickHandler />
                <Marker position={position} icon={defaultIcon}>
                <Popup>
                </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
}
export default Map;