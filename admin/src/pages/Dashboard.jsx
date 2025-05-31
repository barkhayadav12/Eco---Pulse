import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

const redIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const orangeIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-orange.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const blueIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapComponent = () => {
  const [userLocation, setUserLocation] = useState({ lat: 24.7938, lon: 93.9491 }); // Default location

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lon: longitude });
      },
      (error) => console.error("Geolocation error:", error)
    );
  }, []);

  const locations = [
    {
      name: 'Imphal East',
      lat: 24.8035,
      lon: 93.9505,
      status: 'Full',
      teamAssigned: true,
      time: '2025-04-23 09:00 AM',
      icon: redIcon,
    },
    {
      name: 'Imphal West',
      lat: 24.7877,
      lon: 93.9444,
      status: 'Nearly Full',
      teamAssigned: false,
      time: '2025-04-23 08:30 AM',
      icon: orangeIcon,
    },
    {
      name: 'Ukhrul',
      lat: 24.7082,
      lon: 94.0833,
      status: 'Reported',
      teamAssigned: false,
      time: '2025-04-23 07:45 AM',
      icon: blueIcon,
    },
  ];

  return (
    <div className="container-fluid mt-4">
      <div className="row">
        <div className="col-12">
          <div className="border rounded shadow-sm" style={{ height: '80vh' }}>
            <MapContainer
              center={[userLocation.lat, userLocation.lon]}
              zoom={11}
              className="w-100 h-100 rounded"
            >
              <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
              <Marker position={[userLocation.lat, userLocation.lon]} icon={redIcon}>
                <Popup>
                  <strong>You are here!</strong><br />
                  Location: Imphal
                </Popup>
              </Marker>
              {locations.map((location, index) => (
                <Marker
                  key={index}
                  position={[location.lat, location.lon]}
                  icon={location.icon}
                >
                  <Popup>
                    <strong>Location:</strong> {location.name}<br />
                    <strong>Status:</strong> {location.status}<br />
                    <strong>Team Assigned:</strong> {location.teamAssigned ? 'Yes' : 'No'}<br />
                    <strong>Time:</strong> {location.time}
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapComponent;
