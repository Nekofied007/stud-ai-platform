import React from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, TrendingUp } from 'lucide-react';
import CourseCard from '../components/CourseCard';
import { courses, userProgress } from '../data/mockData';
import './MyLearning.css';

const MyLearning = () => {
  const enrolledCourses = courses.filter(c => userProgress.enrolledCourses.includes(c.id));

  return (
    <div className="my-learning-page">
      <div className="my-learning-header">
        <div className="container">
          <h1>My Learning</h1>
          <p>Continue your learning journey</p>
        </div>
      </div>

      <div className="container">
        <div className="learning-overview">
          <div className="overview-card">
            <div className="overview-icon" style={{ backgroundColor: 'rgba(255, 140, 90, 0.1)' }}>
              <BookOpen size={28} style={{ color: 'var(--color-primary-orange)' }} />
            </div>
            <div>
              <div className="overview-value">{enrolledCourses.length}</div>
              <div className="overview-label">Courses in Progress</div>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-icon" style={{ backgroundColor: 'rgba(78, 205, 196, 0.1)' }}>
              <Clock size={28} style={{ color: 'var(--color-primary-green)' }} />
            </div>
            <div>
              <div className="overview-value">{userProgress.totalTimeSpent}</div>
              <div className="overview-label">Minutes Learned</div>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-icon" style={{ backgroundColor: 'rgba(91, 155, 213, 0.1)' }}>
              <TrendingUp size={28} style={{ color: 'var(--color-primary-blue)' }} />
            </div>
            <div>
              <div className="overview-value">{userProgress.streak}</div>
              <div className="overview-label">Day Streak 🔥</div>
            </div>
          </div>
        </div>

        <div className="my-courses-section">
          <h2>My Courses</h2>
          {enrolledCourses.length > 0 ? (
            <div className="courses-grid">
              {enrolledCourses.map(course => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          ) : (
            <div className="no-courses">
              <BookOpen size={64} />
              <h3>No courses yet</h3>
              <p>Start learning by enrolling in a course</p>
              <Link to="/courses" className="btn-primary">
                Browse Courses
              </Link>
            </div>
          )}
        </div>

        <div className="analytics-link-section">
          <h3>Want to see detailed analytics?</h3>
          <p>Track your progress, view your learning roadmap, and get personalized recommendations</p>
          <Link to="/analytics" className="btn-secondary">
            View Analytics Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
};

export default MyLearning;
