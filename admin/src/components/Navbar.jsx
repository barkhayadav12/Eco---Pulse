import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const handleLinkClick = () => setSidebarOpen(false);

  return (
    <>
      <nav className="navbar navbar-dark bg-dark sticky-top d-flex justify-content-between px-3">
        <Link className="navbar-brand" to="/" onClick={handleLinkClick}>
          Eco Pulse
        </Link>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <ul className="navbar-nav d-none d-lg-flex flex-row">
          <li className="nav-item">
            <Link
              className={`nav-link px-3${location.pathname === '/' ? ' active' : ''}`}
              to="/"
            >
              Map
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link px-3${location.pathname === '/teams' ? ' active' : ''}`}
              to="/teams"
            >
              Teams
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className={`nav-link px-3${location.pathname === '/reports' ? ' active' : ''}`}
              to="/reports"
            >
              Reports
            </Link>
          </li>
        </ul>
      </nav>
      <div className={`sidebar bg-dark text-light ${sidebarOpen ? 'open' : ''}`}>
        <ul className="list-unstyled mt-4">
          <li>
            <Link
              to="/"
              className={`nav-link text-light px-4 py-2${location.pathname === '/' ? ' active' : ''}`}
              onClick={handleLinkClick}
            >
              Map
            </Link>
          </li>
          <li>
            <Link
              to="/teams"
              className={`nav-link text-light px-4 py-2${location.pathname === '/teams' ? ' active' : ''}`}
              onClick={handleLinkClick}
            >
              Teams
            </Link>
          </li>
          <li>
            <Link
              to="/reports"
              className={`nav-link text-light px-4 py-2${location.pathname === '/reports' ? ' active' : ''}`}
              onClick={handleLinkClick}
            >
              Reports
            </Link>
          </li>
        </ul>
      </div>
      {sidebarOpen && <div className="overlay" onClick={() => setSidebarOpen(false)}></div>}
      <style>{`
        /* Sidebar styles */
        .sidebar {
          position: fixed;
          top: 0;
          left: -250px;
          width: 250px;
          height: 100vh;
          overflow-y: auto;
          transition: left 0.3s ease;
          z-index: 1045;
        }
        .sidebar.open {
          left: 0;
        }
        /* Overlay */
        .overlay {
          position: fixed;
          top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5);
          z-index: 1040;
        }
        /* Hide sidebar on large screens */
        @media (min-width: 992px) {
          .sidebar {
            display: none !important;
          }
          .overlay {
            display: none !important;
          }
        }
        /* Active link style */
        .nav-link.active {
          font-weight: 600;
          color: #0d6efd !important; /* Bootstrap primary */
        }
      `}</style>
    </>
  );
};

export default Navbar;
