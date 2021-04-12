import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../Images/kitty-friends-logo.svg';
import './SigninRegisterPage.css';

export default function RegisterPage() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isPasswordMatched, setIsPasswordMatched] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const history = useHistory();

  async function handleSubmit(evt) {
    console.log('calling submit register');
    evt.preventDefault();

    // clear error message
    setErrorMsg('');

    if (!firstname || !lastname || !username || !password || !passwordConfirm) {
      setErrorMsg('Please fill in all fields');
    } else if (isPasswordMatched) {
      console.log('ready to call backend');
      const resRaw = await fetch('/registerUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          firstname: firstname,
          lastname: lastname,
        }),
      });

      console.log(resRaw);

      if (!resRaw.ok) {
        const msg = await resRaw.json();
        setErrorMsg(msg.register);
      } else {
        history.push('/home');
      }
    }
  }

  function handleOnKeyUp(evt) {
    if (password && passwordConfirm && password !== passwordConfirm) {
      setErrorMsg('Passwords do not match');
      setIsPasswordMatched(false);
    } else {
      setErrorMsg('');
      setIsPasswordMatched(true);
    }
  }

  return (
    <div>
      <div id="register-container">
        <div id="register-content">
          <img src={logo} id="register-logo" alt="Kitty Friends Logo" />
          <form>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="firstNameInput"
                name="first_name"
                placeholder="First Name"
                onChange={(evt) => {
                  setFirstname(evt.target.value);
                }}
              />
              <label htmlFor="firstNameInput">First Name</label>
            </div>

            <div className="form-floating mb-3 register-input">
              <input
                type="text"
                className="form-control"
                id="lastNameInput"
                name="last_name"
                placeholder="Last Name"
                onChange={(evt) => {
                  setLastname(evt.target.value);
                }}
              />
              <label htmlFor="lastNameInput">Last Name</label>
            </div>

            <div className="form-floating mb-3 register-input">
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

            <div className="form-floating mb-3 register-input">
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

            <div className="form-floating mb-3 register-input">
              <input
                type="password"
                className="form-control"
                id="passwordConfirmInput"
                placeholder="Confirm Password"
                onKeyUp={handleOnKeyUp}
                onChange={(evt) => {
                  setPasswordConfirm(evt.target.value);
                }}
              />
              <label htmlFor="passwordConfirmInput">Confirm Password</label>
            </div>

            {errorMsg && <p className="error-msg">{errorMsg}</p>}

            <button
              className="btn btn-primary btn-lg"
              id="register-button"
              onClick={handleSubmit}
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
