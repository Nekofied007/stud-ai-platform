import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Home, BookOpen, Sparkles, GraduationCap, BarChart3 } from 'lucide-react';
import { cn } from '../lib/utils';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('Home');
  const [isMobile, setIsMobile] = useState(false);

  const navItems = [
    { name: 'Home', url: '/', icon: Home },
    { name: 'Courses', url: '/courses', icon: BookOpen },
    { name: 'AI Generator', url: '/generator', icon: Sparkles },
    { name: 'My Learning', url: '/my-learning', icon: GraduationCap },
    { name: 'Analytics', url: '/analytics', icon: BarChart3 },
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const currentItem = navItems.find(item => item.url === location.pathname);
    if (currentItem) {
      setActiveTab(currentItem.name);
    }
  }, [location.pathname]);

  return (
    <div className="navbar-wrapper">
      <div className="navbar-animated">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.name;

          return (
            <Link
              key={item.name}
              to={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                'nav-item',
                isActive && 'nav-item-active'
              )}
            >
              <span className="nav-item-text">{item.name}</span>
              <span className="nav-item-icon">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="nav-item-indicator"
                  initial={false}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="nav-lamp">
                    <div className="nav-lamp-glow-large" />
                    <div className="nav-lamp-glow-medium" />
                    <div className="nav-lamp-glow-small" />
                  </div>
                </motion.div>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Navbar;
