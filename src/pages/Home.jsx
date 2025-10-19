import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Play, CheckCircle, BarChart3, BookOpen, Brain, Target, Users, Video, Sparkles } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import { courses } from '../data/mockData';
import './Home.css';

const Home = () => {
  const featuredCourses = courses.slice(0, 3);
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const navigate = useNavigate();

  const handleGenerateCourse = (e) => {
    e.preventDefault();
    if (youtubeUrl.trim()) {
      navigate(`/generator?url=${encodeURIComponent(youtubeUrl)}`);
    }
  };

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text" data-aos="fade-right">
              <h1 className="hero-title">
                Turn YouTube Chaos into a <span className="highlight">Clear Learning Path</span>
              </h1>
              <p className="hero-subtitle">
                From Confusion to Clarity - Master any skill with AI-curated courses 
                built from the best free content on the web.
              </p>
              <div className="hero-cta">
                <Link to="/courses" className="btn-primary btn-large">
                  Start Learning for Free
                  <ArrowRight size={20} />
                </Link>
                <button className="btn-outline btn-large">
                  <Play size={20} />
                  Watch Demo
                </button>
              </div>
              <div className="hero-stats">
                <div className="stat">
                  <div className="stat-number">12,000+</div>
                  <div className="stat-label">Active Learners</div>
                </div>
                <div className="stat">
                  <div className="stat-number">500+</div>
                  <div className="stat-label">Curated Courses</div>
                </div>
                <div className="stat">
                  <div className="stat-number">95%</div>
                  <div className="stat-label">Completion Rate</div>
                </div>
              </div>
            </div>
            <div className="hero-image" data-aos="fade-left" data-aos-delay="200">
              <div className="hero-illustration">
                <img 
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=600&fit=crop" 
                  alt="Students learning together" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Custom Course Generator Section */}
      <section className="custom-generator">
        <div className="container">
          <div className="generator-content" data-aos="fade-up">
            <div className="generator-header">
              <div className="generator-icon">
                <Sparkles size={40} />
              </div>
              <h2 className="section-title">Got a Video? Make it a Course.</h2>
              <p className="section-subtitle">
                Paste any YouTube link to instantly generate a structured lesson with notes, 
                key topics, and a quiz to test your knowledge.
              </p>
            </div>

            <form className="generator-form" onSubmit={handleGenerateCourse}>
              <div className="url-input-wrapper">
                <Video size={24} className="input-icon" />
                <input
                  type="url"
                  placeholder="Paste YouTube video URL here... (e.g., https://www.youtube.com/watch?v=...)"
                  value={youtubeUrl}
                  onChange={(e) => setYoutubeUrl(e.target.value)}
                  className="url-input"
                  required
                />
              </div>
              <button type="submit" className="btn-primary btn-large btn-generate">
                <Sparkles size={20} />
                Generate Your Course
              </button>
            </form>

            <div className="generator-features">
              <div className="gen-feature">
                <CheckCircle size={20} />
                <span>AI-Generated Notes</span>
              </div>
              <div className="gen-feature">
                <CheckCircle size={20} />
                <span>Interactive Quizzes</span>
              </div>
              <div className="gen-feature">
                <CheckCircle size={20} />
                <span>Curated Playlist</span>
              </div>
              <div className="gen-feature">
                <CheckCircle size={20} />
                <span>100% Free</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="how-it-works">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">How It Works</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            Three simple steps to transform your learning journey
          </p>
          
          <div className="steps">
            <div className="step" data-aos="fade-up" data-aos-delay="200">
              <div className="step-number">1</div>
              <div className="step-icon" style={{ backgroundColor: 'rgba(255, 140, 90, 0.1)' }}>
                <Target size={32} style={{ color: 'var(--color-primary-orange)' }} />
              </div>
              <h3>Discover</h3>
              <p>Find AI-curated courses on any topic. From web development to public speaking.</p>
            </div>

            <div className="step" data-aos="fade-up" data-aos-delay="300">
              <div className="step-number">2</div>
              <div className="step-icon" style={{ backgroundColor: 'rgba(78, 205, 196, 0.1)' }}>
                <Brain size={32} style={{ color: 'var(--color-primary-green)' }} />
              </div>
              <h3>Learn</h3>
              <p>Follow structured modules with interactive quizzes and hands-on tasks.</p>
            </div>

            <div className="step" data-aos="fade-up" data-aos-delay="400">
              <div className="step-number">3</div>
              <div className="step-icon" style={{ backgroundColor: 'rgba(91, 155, 213, 0.1)' }}>
                <CheckCircle size={32} style={{ color: 'var(--color-primary-blue)' }} />
              </div>
              <h3>Achieve</h3>
              <p>Track your progress and master new skills with personalized feedback.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="featured-courses">
        <div className="container">
          <div className="section-header" data-aos="fade-up">
            <div>
              <h2 className="section-title">Featured Courses</h2>
              <p className="section-subtitle">Start your learning journey with our most popular courses</p>
            </div>
            <Link to="/courses" className="btn-outline">
              View All Courses
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="courses-grid">
            {featuredCourses.map((course, index) => (
              <div key={course.id} data-aos="fade-up" data-aos-delay={index * 100}>
                <CourseCard course={course} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section className="core-features">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">Why Choose STUD?</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            Four pillars that make learning effective and engaging
          </p>

          <div className="features-grid">
            <div className="feature-card" data-aos="zoom-in" data-aos-delay="200">
              <div className="feature-icon" style={{ backgroundColor: 'rgba(255, 140, 90, 0.1)' }}>
                <BookOpen size={32} style={{ color: 'var(--color-primary-orange)' }} />
              </div>
              <h3>Content Collection</h3>
              <p>
                We gather the best free learning content from across the web, 
                carefully selecting high-quality videos and resources.
              </p>
            </div>

            <div className="feature-card" data-aos="zoom-in" data-aos-delay="300">
              <div className="feature-icon" style={{ backgroundColor: 'rgba(78, 205, 196, 0.1)' }}>
                <Target size={32} style={{ color: 'var(--color-primary-green)' }} />
              </div>
              <h3>Structured Courses</h3>
              <p>
                Our AI organizes content into easy-to-follow modules and lessons, 
                creating a clear path from beginner to expert.
              </p>
            </div>

            <div className="feature-card" data-aos="zoom-in" data-aos-delay="400">
              <div className="feature-icon" style={{ backgroundColor: 'rgba(91, 155, 213, 0.1)' }}>
                <Brain size={32} style={{ color: 'var(--color-primary-blue)' }} />
              </div>
              <h3>Interactive Learning</h3>
              <p>
                Stay engaged with AI-powered quizzes and active learning tasks 
                that reinforce key concepts.
              </p>
            </div>

            <div className="feature-card" data-aos="zoom-in" data-aos-delay="500">
              <div className="feature-icon" style={{ backgroundColor: 'rgba(155, 89, 182, 0.1)' }}>
                <BarChart3 size={32} style={{ color: 'var(--color-primary-purple)' }} />
              </div>
              <h3>Personalized Feedback</h3>
              <p>
                Track your progress with personalized roadmaps and instant feedback 
                on quizzes and assignments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title" data-aos="fade-up">What Our Learners Say</h2>
          <p className="section-subtitle" data-aos="fade-up" data-aos-delay="100">
            Join thousands of successful learners worldwide
          </p>

          <div className="testimonials-grid">
            <div className="testimonial-card" data-aos="fade-up" data-aos-delay="200">
              <div className="testimonial-rating">
                {'★'.repeat(5)}
              </div>
              <p className="testimonial-text">
                "STUD transformed how I learn online. The structured approach made 
                web development finally click for me. Best learning platform I've used!"
              </p>
              <div className="testimonial-author">
                <img src="https://i.pravatar.cc/150?img=12" alt="John Doe" />
                <div>
                  <div className="author-name">John Doe</div>
                  <div className="author-title">Software Developer</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card" data-aos="fade-up" data-aos-delay="300">
              <div className="testimonial-rating">
                {'★'.repeat(5)}
              </div>
              <p className="testimonial-text">
                "The AI-powered quizzes are incredibly helpful. I actually remember 
                what I learn now instead of just passively watching videos."
              </p>
              <div className="testimonial-author">
                <img src="https://i.pravatar.cc/150?img=45" alt="Emily Chen" />
                <div>
                  <div className="author-name">Emily Chen</div>
                  <div className="author-title">Marketing Manager</div>
                </div>
              </div>
            </div>

            <div className="testimonial-card" data-aos="fade-up" data-aos-delay="400">
              <div className="testimonial-rating">
                {'★'.repeat(5)}
              </div>
              <p className="testimonial-text">
                "From confusion to clarity - that tagline is no joke. STUD gave me 
                a clear path when I felt overwhelmed by all the content out there."
              </p>
              <div className="testimonial-author">
                <img src="https://i.pravatar.cc/150?img=33" alt="Michael Zhang" />
                <div>
                  <div className="author-name">Michael Zhang</div>
                  <div className="author-title">Data Analyst</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content" data-aos="zoom-in">
            <h2>Ready to Start Your Learning Journey?</h2>
            <p>Join thousands of learners transforming confusion into clarity</p>
            <Link to="/courses" className="btn-primary btn-large">
              Explore Courses Now
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
