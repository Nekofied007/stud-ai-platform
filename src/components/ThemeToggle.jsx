import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import './ThemeToggle.css';

export const ThemeToggle = ({ className }) => {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className={`theme-toggle ${isDark ? 'theme-toggle-dark' : 'theme-toggle-light'} ${className || ''}`}
      onClick={toggleTheme}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && toggleTheme()}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      <div className="theme-toggle-track">
        <div className={`theme-toggle-thumb ${isDark ? 'theme-toggle-thumb-dark' : 'theme-toggle-thumb-light'}`}>
          {isDark ? (
            <Moon className="theme-icon" size={16} strokeWidth={1.5} />
          ) : (
            <Sun className="theme-icon" size={16} strokeWidth={1.5} />
          )}
        </div>
        <div className={`theme-toggle-inactive ${isDark ? 'theme-toggle-inactive-dark' : 'theme-toggle-inactive-light'}`}>
          {isDark ? (
            <Sun className="theme-icon theme-icon-inactive" size={16} strokeWidth={1.5} />
          ) : (
            <Moon className="theme-icon theme-icon-inactive" size={16} strokeWidth={1.5} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemeToggle;
