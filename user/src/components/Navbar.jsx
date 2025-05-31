import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, removeToken } from '../utils/auth';


const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
        <Link className="navbar-brand" to="/">Eco Pulse</Link>

        <button className="navbar-toggler" type="button" onClick={() => setIsOpen(true)}>
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end d-none d-lg-flex">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item"><Link className="nav-link" to="/chatbot">Chatbot</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/report">Report Dump</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/recycle">Recycle Waste</Link></li>

            {isAuthenticated() ? (
              <li className="nav-item ms-3">
                <button className="btn btn-outline-light" onClick={handleLogout}>Logout</button>
              </li>
            ) : (
              <>
                <li className="nav-item ms-3">
                  <Link className="btn btn-outline-light" to="/login">Login</Link>
                </li>
                <li className="nav-item ms-2">
                  <Link className="btn btn-outline-light" to="/register">Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>

      <div className={`sidebar ${isOpen ? 'open' : ''}`}>
        <button className="close-btn" onClick={() => setIsOpen(false)}>&times;</button>
        <Link className="nav-link" to="/chatbot" onClick={() => setIsOpen(false)}>Chatbot</Link>
        <Link className="nav-link" to="/report" onClick={() => setIsOpen(false)}>Report Dump</Link>
        <Link className="nav-link" to="/recycle" onClick={() => setIsOpen(false)}>Recycle Waste</Link>
        {isAuthenticated() ? (
          <button className="btn btn-outline-dark mt-3" onClick={() => { setIsOpen(false); handleLogout(); }}>Logout</button>
        ) : (
          <>
            <Link className="btn btn-outline-dark mt-3" to="/login" onClick={() => setIsOpen(false)}>Login</Link>
            <Link className="btn btn-outline-dark mt-2" to="/register" onClick={() => setIsOpen(false)}>Register</Link>
          </>
        )}
      </div>
    </>
  );
};

export default Navbar;
