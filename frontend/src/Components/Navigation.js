import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link
          className={
            'navbar-brand' + (location.pathname === '/home' ? ' active' : '')
          }
          to="/home"
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
                Post A Cat
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
