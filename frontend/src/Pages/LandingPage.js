import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Images/kitty-friends-logo.svg';

export default function LandingPage() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/signin">
                  Sign In
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  Register
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div id="landing-page-container">
        <div id="landing-page-content">
          <img id="kitty-friends-logo" src={logo} alt="Kitty Friends Logo" />
          <p id="landing-page-text">
            Kitty Friends is an online application for cats who need homes. At
            Kitty Friends, pet lovers can search for a pet that best matches
            their needs. They can then contact the owener using the email or
            phone number for more details. Kitty Friends also allow users to
            post cats and help them find a new home soon.{' '}
          </p>
        </div>
      </div>
    </div>
  );
}
