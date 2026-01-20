import React, { createContext, useState, useContext, useEffect } from 'react';

const EmployeeContext = createContext();

export const useEmployeeContext = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error('useEmployeeContext must be used within EmployeeProvider');
  }
  return context;
};

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);
  const [favorites, setFavorites] = useState(() => {
    // Charger les favoris depuis localStorage au démarrage
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        return JSON.parse(storedFavorites);
      } catch (err) {
        console.error('Error loading favorites:', err);
        return [];
      }
    }
    return [];
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentCompany, setCurrentCompany] = useState('');

  // Sauvegarder les favoris dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Fonction pour chercher des employés
  const searchEmployees = async (companyName) => {
    setLoading(true);
    setError(null);
    setCurrentCompany(companyName);

    try {
      const response = await fetch(
        `https://randomuser.me/api/?results=10&seed=${companyName}`
      );
      
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des données');
      }

      const data = await response.json();
      setEmployees(data.results);
    } catch (err) {
      setError(err.message);
      // Essayer l'API de secours
      try {
        const response = await fetch('https://monkeys.co.il/api2/wo.php');
        const data = await response.json();
        setEmployees(data.results || []);
      } catch (fallbackErr) {
        setError('Impossible de charger les données. Veuillez réessayer plus tard.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Ajouter/Retirer un employé des favoris
  const toggleFavorite = (employee) => {
    const employeeId = employee.login.uuid;
    const isFavorite = favorites.some(fav => fav.login.uuid === employeeId);

    if (isFavorite) {
      setFavorites(favorites.filter(fav => fav.login.uuid !== employeeId));
    } else {
      setFavorites([...favorites, employee]);
    }
  };

  // Vérifier si un employé est dans les favoris
  const isFavorite = (employee) => {
    return favorites.some(fav => fav.login.uuid === employee.login.uuid);
  };

  // Trouver un employé par son ID
  const findEmployeeById = (id) => {
    return employees.find(emp => emp.login.uuid === id);
  };

  // Trouver un favori par son ID
  const findFavoriteById = (id) => {
    return favorites.find(fav => fav.login.uuid === id);
  };

  const value = {
    employees,
    favorites,
    loading,
    error,
    currentCompany,
    searchEmployees,
    toggleFavorite,
    isFavorite,
    findEmployeeById,
    findFavoriteById
  };

  return (
    <EmployeeContext.Provider value={value}>
      {children}
    </EmployeeContext.Provider>
  );
};
