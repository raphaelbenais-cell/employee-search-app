import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployeeContext } from '../context/EmployeeContext';
import '../styles/EmployeeCard.css';

const EmployeeCard = ({ employee, isFavoritePage = false }) => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useEmployeeContext();
  
  const favorite = isFavorite(employee);

  const handleMoreInfo = () => {
    const route = isFavoritePage ? 'fav' : 'employee';
    navigate(`/${route}/${employee.login.uuid}`);
  };

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(employee);
  };

  return (
    <div className={`employee-card ${isFavoritePage && favorite ? 'favorite-card' : ''}`}>
      <img 
        src={employee.picture.large} 
        alt={`${employee.name.first} ${employee.name.last}`}
        className="employee-image"
      />
      <div className="employee-info">
        <h3>{employee.name.first} {employee.name.last}</h3>
        <p><strong>Age:</strong> {employee.dob.age}</p>
        <p><strong>Country:</strong> {employee.location.country}</p>
        <button onClick={handleMoreInfo} className="more-info-btn">
          more info
        </button>
      </div>
      <div className="star-container" onClick={handleToggleFavorite}>
        {favorite ? (
          <span className="star filled">★</span>
        ) : (
          <span className="star empty">☆</span>
        )}
      </div>
    </div>
  );
};

export default EmployeeCard;
