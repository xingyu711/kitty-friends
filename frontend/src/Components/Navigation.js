import React from 'react';
import { Link, useLocation, useHistory } from 'react-router-dom';
import './Navigation.css';

export default function Navigation() {
  const location = useLocation();
  const history = useHistory();

  async function handleLogOut() {
    const resRaw = await fetch('/logoutUser');

    if (resRaw.ok) {
      history.push('/');
    }
  }

  return (
    <div className="navbar-container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link
            className={
              'navbar-brand' + (location.pathname === '/home' ? ' active' : '')
            }
            to="/home"
            id="nav-app-name"
          >
            Kitty Friends
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navigation-bar"
            aria-controls="navigation-bar"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navigation-bar">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link
                  className={
                    'nav-link' +
                    (location.pathname === '/myCollections' ? ' active' : '')
                  }
                  to="/myCollections"
                >
                  My Collections
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    'nav-link' +
                    (location.pathname === '/myPosts' ? ' active' : '')
                  }
                  to="/myPosts"
                >
                  My Posts
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className={
                    'nav-link' +
                    (location.pathname === '/postCat' ? ' active' : '')
                  }
                  to="/postCat"
                >
                  Post a Cat
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="" onClick={handleLogOut}>
                  Log Out
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
