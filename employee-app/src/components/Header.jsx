import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.css';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <nav className="nav">
        <Link 
          to="/" 
          className={location.pathname === '/' ? 'active' : ''}
        >
          Home
        </Link>
        <span className="separator">|</span>
        <Link 
          to="/favs" 
          className={location.pathname === '/favs' ? 'active' : ''}
        >
          Favorites
        </Link>
      </nav>
    </header>
  );
};

export default Header;
