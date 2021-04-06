import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../Images/favicon.svg';

export default function EmptyPagePlaceholder({ msg, linkTo, linkToMsg }) {
  return (
    <div className="placeholder-container">
      <img className="placeholder-logo" src={logo} alt="Kitty Friends Logo" />
      <span className="placeholder-msg">{msg}</span>
      <Link className="btn btn-primary placeholder-link" to={linkTo}>
        {linkToMsg}
      </Link>
    </div>
  );
}
