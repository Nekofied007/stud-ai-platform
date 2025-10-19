import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, User, LogOut } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link to="/" className="navbar-brand">
          <BookOpen size={32} />
          <div className="brand-text">
            <span className="brand-name">STUD</span>
            <span className="brand-tagline">From Confusion to Clarity</span>
          </div>
        </Link>

        <div className="navbar-desktop">
          <div className="navbar-links">
            <Link to="/" className={isActive('/') ? 'active' : ''}>
              Home
            </Link>
            <Link to="/courses" className={isActive('/courses') ? 'active' : ''}>
              Courses
            </Link>
            <Link to="/generator" className={isActive('/generator') ? 'active' : ''}>
              AI Generator
            </Link>
            <Link to="/my-learning" className={isActive('/my-learning') ? 'active' : ''}>
              My Learning
            </Link>
            <Link to="/analytics" className={isActive('/analytics') ? 'active' : ''}>
              Analytics
            </Link>
          </div>

          <div className="navbar-actions">
            <button className="btn-primary">Start Learning</button>
            <div className="user-menu">
              <button className="user-avatar" onClick={toggleUserMenu}>
                <User size={20} />
              </button>
              {isUserMenuOpen && (
                <div className="user-dropdown">
                  <Link to="/profile" onClick={toggleUserMenu}>
                    <User size={16} />
                    Profile
                  </Link>
                  <button>
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="mobile-menu">
          <Link to="/" onClick={toggleMobileMenu} className={isActive('/') ? 'active' : ''}>
            Home
          </Link>
          <Link to="/courses" onClick={toggleMobileMenu} className={isActive('/courses') ? 'active' : ''}>
            Courses
          </Link>
          <Link to="/generator" onClick={toggleMobileMenu} className={isActive('/generator') ? 'active' : ''}>
            AI Generator
          </Link>
          <Link to="/my-learning" onClick={toggleMobileMenu} className={isActive('/my-learning') ? 'active' : ''}>
            My Learning
          </Link>
          <Link to="/analytics" onClick={toggleMobileMenu} className={isActive('/analytics') ? 'active' : ''}>
            Analytics
          </Link>
          <button className="btn-primary" style={{ width: '100%' }}>
            Start Learning
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
