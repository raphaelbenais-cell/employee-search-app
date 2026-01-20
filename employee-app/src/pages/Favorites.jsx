import React from 'react';
import EmployeeCard from '../components/EmployeeCard';
import { useEmployeeContext } from '../context/EmployeeContext';
import '../styles/Favorites.css';

const Favorites = () => {
  const { favorites } = useEmployeeContext();

  return (
    <div className="favorites-page">
      <h1>Your favorite employees</h1>
      
      {favorites.length === 0 ? (
        <div className="no-favorites">
          Vous n'avez pas encore de favoris. Ajoutez des employés à vos favoris depuis la recherche !
        </div>
      ) : (
        <div className="favorites-grid">
          {favorites.map((employee) => (
            <EmployeeCard 
              key={employee.login.uuid} 
              employee={employee}
              isFavoritePage={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
