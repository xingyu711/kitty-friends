import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Images/kitty-friends-logo.svg';
import Particles from 'react-particles-js';
import './LandingPage.css';

const particlesOption = {
  particles: {
    number: {
      value: 160,
      density: {
        enable: false,
      },
    },
    color: {
      value: '#CF929E',
    },
    size: {
      value: 3,
      random: true,
      anim: {
        speed: 4,
        size_min: 0.3,
      },
    },
    line_linked: {
      enable: false,
    },
    move: {
      random: true,
      speed: 1,
      direction: 'top',
      out_mode: 'out',
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: 'bubble',
      },
      onclick: {
        enable: true,
        mode: 'repulse',
      },
    },
    modes: {
      bubble: {
        distance: 250,
        duration: 2,
        size: 0,
        opacity: 0,
      },
      repulse: {
        distance: 400,
        duration: 4,
      },
    },
  },
};
export default function LandingPage() {
  return (
    <div>
      <Particles className="particles" params={particlesOption} />
      <nav className="navbar navbar-expand-lg navbar-light bg-white">
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
