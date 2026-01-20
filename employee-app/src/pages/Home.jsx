import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import EmployeeCard from '../components/EmployeeCard';
import { useEmployeeContext } from '../context/EmployeeContext';
import '../styles/Home.css';

const Home = () => {
  const [searchParams] = useSearchParams();
  const { employees, loading, error, currentCompany, searchEmployees } = useEmployeeContext();
  
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    if (searchQuery && searchQuery !== currentCompany) {
      searchEmployees(searchQuery);
    } else if (!searchQuery && employees.length === 0) {
      // Charger des employés par défaut (seed=google) au démarrage
      searchEmployees('google');
    }
  }, [searchQuery]);

  return (
    <div className="home-page">
      <div className="hero-section">
        <h1>Staff Finder</h1>
      </div>

      <SearchBar />

      {loading && <div className="loading">Chargement...</div>}
      {error && <div className="error">{error}</div>}

      {!searchQuery && employees.length > 0 && (
        <div className="employees-section">
          <h2>Employees of the month:</h2>
          <div className="employees-grid">
            {employees.map((employee) => (
              <EmployeeCard 
                key={employee.login.uuid} 
                employee={employee}
              />
            ))}
          </div>
        </div>
      )}

      {!searchQuery && !loading && employees.length === 0 && (
        <div className="employees-section">
          <h2>Employees of the month:</h2>
          <div className="employees-grid">
            {/* Chargement en cours... */}
          </div>
        </div>
      )}

      {searchQuery && employees.length > 0 && (
        <div className="employees-section">
          <h2>Search for employees of {searchQuery.toUpperCase()}</h2>
          <div className="employees-grid">
            {employees.map((employee) => (
              <EmployeeCard 
                key={employee.login.uuid} 
                employee={employee}
              />
            ))}
          </div>
        </div>
      )}

      {searchQuery && !loading && employees.length === 0 && (
        <div className="no-results">
          Aucun employé trouvé pour "{searchQuery}"
        </div>
      )}
    </div>
  );
};

export default Home;
