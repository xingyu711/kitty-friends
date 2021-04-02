import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Images/kitty-friends-logo.svg';

export default function RegisterPage() {
  return (
    <div>
      <div id="register-container">
        <div id="register-content">
          <img src={logo} id="register-logo" alt="VehiGo Logo" />
          <form id="form-register">
            <div class="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="firstNameInput"
                name="first_name"
                placeholder="First Name"
                required
              />
              <label for="firstNameInput">First Name</label>
            </div>

            <div className="form-floating mb-3 register-input">
              <input
                type="text"
                className="form-control"
                id="lastNameInput"
                name="last_name"
                placeholder="Last Name"
                required
              />
              <label for="lastNameInput">Last Name</label>
            </div>

            <div className="form-floating mb-3 register-input">
              <input
                type="text"
                className="form-control"
                id="usernameInput"
                name="username"
                placeholder="Username"
                required
              />
              <label for="usernameInput">Username</label>
            </div>

            <div className="form-floating mb-3 register-input">
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                name="password"
                placeholder="Password"
                required
              />
              <label for="passwordInput">Password</label>
            </div>

            <div className="form-floating mb-3 register-input">
              <input
                type="password"
                className="form-control"
                id="passwordConfirmInput"
                name="password_confirm"
                placeholder="Confirm Password"
                onkeyup="validatePassword()"
                required
              />
              <label for="passwordConfirmInput">Confirm Password</label>
            </div>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              id="register-button"
            >
              Register
            </button>
          </form>

          <div className="footer-text">
            <span>Already have an account? </span>
            <Link to="/signin">Sign In</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
