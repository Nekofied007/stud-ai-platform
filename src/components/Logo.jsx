import React from 'react';
import { Link } from 'react-router-dom';
import './Logo.css';

const Logo = () => {
  return (
    <Link to="/" className="logo-container">
      <span className="logo-text">STUD</span>
      <span className="logo-tagline">From Confusion to Clarity</span>
    </Link>
  );
};

export default Logo;
