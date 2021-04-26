import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ToastProvider } from 'react-toast-notifications';
import './App.css';
import LandingPage from './Pages/LandingPage.js';
import SignInPage from './Pages/SignInPage.js';
import RegisterPage from './Pages/RegisterPage.js';
import HomePage from './Pages/HomePage.js';
import MyCollectionsPage from './Pages/MyCollectionsPage.js';
import MyPostsPage from './Pages/MyPostsPage.js';
import PostCatPage from './Pages/PostCatPage.js';

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
        <Route path="/myCollections">
          <MyCollectionsPage />
        </Route>
        <Route path="/myPosts">
          <MyPostsPage />
        </Route>
        <Route path="/postCat">
          <ToastProvider>
            <PostCatPage />
          </ToastProvider>
        </Route>
        <Route path="/">
          <LandingPage />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
