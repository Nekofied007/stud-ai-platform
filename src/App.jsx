import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from './components/Navbar';
import Logo from './components/Logo';
import Footer from './components/Footer';
import AIChat from './components/AIChat';
import Home from './pages/Home';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Learn from './pages/Learn';
import MyLearning from './pages/MyLearning';
import Analytics from './pages/Analytics';
import Generator from './pages/Generator';
import './App.css';

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: true,
      offset: 100,
      delay: 100
    });
  }, []);

  return (
    <Router>
      <div className="app">
        <Logo />
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course/:courseId" element={<CourseDetail />} />
            <Route path="/learn/:courseId" element={<Learn />} />
            <Route path="/my-learning" element={<MyLearning />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/generator" element={<Generator />} />
          </Routes>
        </main>
        <Footer />
        <AIChat />
      </div>
    </Router>
  );
}

export default App;
