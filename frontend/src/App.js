import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import LandingPage from './Pages/LandingPage.js';
import SignInPage from './Pages/SignInPage.js';
import RegisterPage from './Pages/RegisterPage.js';
import HomePage from './Pages/HomePage.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/signin">
          <SignInPage />
        </Route>
        <Route path="/register">
          <RegisterPage />
        </Route>
        <Route path="/home">
          <HomePage />
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
