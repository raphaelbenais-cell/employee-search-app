import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { EmployeeProvider } from './context/EmployeeContext';
import Header from './components/Header';
import Home from './pages/Home';
import EmployeeDetails from './pages/EmployeeDetails';
import FavoriteDetails from './pages/FavoriteDetails';
import Favorites from './pages/Favorites';
import './styles/App.css';

function App() {
  return (
    <Router>
      <EmployeeProvider>
        <div className="App">
          <Header />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/employee/:id" element={<EmployeeDetails />} />
              <Route path="/fav/:id" element={<FavoriteDetails />} />
              <Route path="/favs" element={<Favorites />} />
            </Routes>
          </main>
        </div>
      </EmployeeProvider>
    </Router>
  );
}

export default App;
