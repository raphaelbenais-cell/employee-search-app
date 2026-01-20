import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEmployeeContext } from '../context/EmployeeContext';
import 'leaflet/dist/leaflet.css';
import '../styles/EmployeeDetails.css';

// Fix pour les icônes Leaflet
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const EmployeeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { findEmployeeById, toggleFavorite, isFavorite } = useEmployeeContext();
  
  const employee = findEmployeeById(id);

  if (!employee) {
    return (
      <div className="details-page">
        <div className="error-message">Employé non trouvé</div>
        <button onClick={() => navigate('/')} className="back-btn">
          Back
        </button>
      </div>
    );
  }

const favorite = isFavorite(employee);
  
  // Récupérer les coordonnées et s'assurer qu'elles sont valides
  const lat = parseFloat(employee.location.coordinates.latitude);
  const lng = parseFloat(employee.location.coordinates.longitude);
  
  // Leaflet attend [latitude, longitude]
 const position = [lng, lat];  // INVERSÉ : longitude d'abord, puis latitude
  
  console.log('Coordonnées:', { lat, lng, position });

  return (
    <div className="details-page">
      <h1>Info about: {employee.name.first} {employee.name.last}</h1>
      
      <div className="details-content">
        <img 
          src={employee.picture.large} 
          alt={`${employee.name.first} ${employee.name.last}`}
          className="details-image"
        />
        
        <div className="details-info">
          <p><strong>Age:</strong> {employee.dob.age}</p>
          <p><strong>Country:</strong> {employee.location.country}</p>
          <p><strong>City:</strong> {employee.location.city}</p>
          <p><strong>Email:</strong> {employee.email}</p>
          <p><strong>Phone:</strong> {employee.phone}</p>
          <p><strong>Address:</strong> {employee.location.street.number} {employee.location.street.name}</p>
        </div>

        <div className="map-container">
          <MapContainer 
            center={position} 
            zoom={13} 
            style={{ height: '300px', width: '100%' }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}>
              <Popup>
                {employee.name.first} {employee.name.last}
              </Popup>
            </Marker>
          </MapContainer>
        </div>

        <div className="star-container-large" onClick={() => toggleFavorite(employee)}>
          {favorite ? (
            <span className="star filled">★</span>
          ) : (
            <span className="star empty">☆</span>
          )}
        </div>
      </div>

      <button onClick={() => navigate(-1)} className="back-btn">
        Back
      </button>
    </div>
  );
};

export default EmployeeDetails;
