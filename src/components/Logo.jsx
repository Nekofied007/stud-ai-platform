import React from 'react';
import { Link } from 'react-router-dom';
import { SparklesText } from '../lib/SparklesText';
import './Logo.css';

const Logo = () => {
  return (
    <Link to="/" className="logo-container">
      <SparklesText
        text="STUD"
        colors={{ first: '#FF8C5A', second: '#4ECDC4' }}
        className="logo-text"
        sparklesCount={8}
      />
      <span className="logo-tagline">From Confusion to Clarity</span>
    </Link>
  );
};

export default Logo;
