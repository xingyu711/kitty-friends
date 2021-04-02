import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../Images/kitty-friends-logo.svg';

export default function SignInPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const history = useHistory();

  async function handleSubmit(evt) {
    evt.preventDefault();

    // clear error message
    setErrorMsg('');

    const resRaw = await fetch('/loginUser', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username: username, password: password }),
    });

    if (!resRaw.ok) {
      const msg = await resRaw.json();
      setErrorMsg(msg.login);
    } else {
      history.push('/home');
    }
  }

  return (
    <div>
      <div id="sign-in-container">
        <div id="sign-in-content">
          <img src={logo} id="sign-in-logo" alt="Kitty Friends Logo" />
          <p id="welcome-message">Welcome Back</p>

          <form>
            <div className="form-floating mb-4 sign-in-input">
              <input
                type="text"
                className="form-control"
                id="usernameInput"
                placeholder="Username"
                onChange={(evt) => {
                  setUsername(evt.target.value);
                }}
              />
              <label htmlFor="usernameInput">Username</label>
            </div>
            <div className="form-floating mb-4 sign-in-input">
              <input
                type="password"
                className="form-control"
                id="passwordInput"
                placeholder="Password"
                onChange={(evt) => {
                  setPassword(evt.target.value);
                }}
              />
              <label htmlFor="passwordInput">Password</label>
            </div>

            {errorMsg && <p className="error-msg">{errorMsg}</p>}

            <button
              className="btn btn-primary btn-lg"
              id="sign-in-button"
              onClick={handleSubmit}
            >
              Sign In
            </button>
          </form>

          <div className="footer-text">
            <span>New user? </span>
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
