import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEmployeeContext } from '../context/EmployeeContext';
import '../styles/SearchBar.css';

const SearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { searchEmployees } = useEmployeeContext();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      searchEmployees(searchTerm.trim());
      navigate(`/?search=${searchTerm.trim()}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Enter company name..."
        className="search-input"
      />
      <button type="submit" className="search-button">
        search
      </button>
    </form>
  );
};

export default SearchBar;
