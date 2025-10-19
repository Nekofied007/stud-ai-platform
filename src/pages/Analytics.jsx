import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, Clock, Award, Target, BookOpen, CheckCircle } from 'lucide-react';
import { courses, userProgress } from '../data/mockData';
import './Analytics.css';

const Analytics = () => {
  const enrolledCourses = courses.filter(c => userProgress.enrolledCourses.includes(c.id));
  const completedCoursesCount = 0; // Would be calculated from user data
  const avgQuizScore = Object.values(userProgress.quizScores).reduce((a, b) => a + b, 0) / 
                       Object.values(userProgress.quizScores).length || 0;

  const learningStreak = userProgress.streak;
  const totalTimeSpent = userProgress.totalTimeSpent;

  // Mock learning roadmap data
  const skills = [
    { name: 'HTML & CSS', progress: 85, color: 'var(--color-primary-orange)' },
    { name: 'JavaScript', progress: 60, color: 'var(--color-primary-blue)' },
    { name: 'React', progress: 40, color: 'var(--color-primary-green)' },
    { name: 'Node.js', progress: 20, color: 'var(--color-primary-purple)' }
  ];

  const suggestedCourses = courses.filter(c => !userProgress.enrolledCourses.includes(c.id)).slice(0, 3);

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <div className="analytics-page">
      <div className="analytics-header">
        <div className="container">
          <h1>My Learning Analytics</h1>
          <p>Track your progress and achieve your learning goals</p>
        </div>
      </div>

      <div className="container">
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(255, 140, 90, 0.1)' }}>
              <BookOpen size={32} style={{ color: 'var(--color-primary-orange)' }} />
            </div>
            <div className="stat-info">
              <div className="stat-value">{enrolledCourses.length}</div>
              <div className="stat-label">Courses Enrolled</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(78, 205, 196, 0.1)' }}>
              <CheckCircle size={32} style={{ color: 'var(--color-success)' }} />
            </div>
            <div className="stat-info">
              <div className="stat-value">{completedCoursesCount}</div>
              <div className="stat-label">Courses Completed</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(91, 155, 213, 0.1)' }}>
              <TrendingUp size={32} style={{ color: 'var(--color-primary-blue)' }} />
            </div>
            <div className="stat-info">
              <div className="stat-value">{avgQuizScore.toFixed(0)}%</div>
              <div className="stat-label">Avg Quiz Score</div>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon" style={{ backgroundColor: 'rgba(243, 156, 18, 0.1)' }}>
              <Award size={32} style={{ color: 'var(--color-warning)' }} />
            </div>
            <div className="stat-info">
              <div className="stat-value">{learningStreak}</div>
              <div className="stat-label">Day Streak 🔥</div>
            </div>
          </div>
        </div>

        <div className="analytics-layout">
          <div className="analytics-main">
            <section className="analytics-section">
              <h2>My Courses</h2>
              <div className="enrolled-courses">
                {enrolledCourses.map(course => {
                  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);
                  const completedLessons = userProgress.completedLessons.length;
                  const progress = (completedLessons / totalLessons) * 100;

                  return (
                    <div key={course.id} className="course-progress-card">
                      <div className="course-progress-header">
                        <img src={course.thumbnail} alt={course.title} />
                        <div className="course-progress-info">
                          <h3>{course.title}</h3>
                          <p>{course.category} • {totalLessons} lessons</p>
                        </div>
                      </div>
                      <div className="course-progress-bar">
                        <div className="progress-info">
                          <span>{progress.toFixed(0)}% Complete</span>
                          <span>{completedLessons} / {totalLessons} lessons</span>
                        </div>
                        <div className="progress-bar">
                          <div 
                            className="progress-fill" 
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="course-progress-actions">
                        <Link to={`/learn/${course.id}`} className="btn-primary">
                          Continue Learning
                        </Link>
                        <Link to={`/course/${course.id}`} className="btn-outline">
                          View Details
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <section className="analytics-section">
              <h2>Learning Roadmap</h2>
              <p className="section-description">
                Your personalized skill development path
              </p>
              <div className="skills-roadmap">
                {skills.map(skill => (
                  <div key={skill.name} className="skill-item">
                    <div className="skill-header">
                      <span className="skill-name">{skill.name}</span>
                      <span className="skill-percentage">{skill.progress}%</span>
                    </div>
                    <div className="skill-bar">
                      <div 
                        className="skill-fill" 
                        style={{ 
                          width: `${skill.progress}%`,
                          backgroundColor: skill.color
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="analytics-section">
              <h2>Recommended Next Steps</h2>
              <p className="section-description">
                Based on your learning history, we recommend these courses
              </p>
              <div className="suggested-courses">
                {suggestedCourses.map(course => (
                  <Link 
                    key={course.id} 
                    to={`/course/${course.id}`}
                    className="suggested-course-card"
                  >
                    <img src={course.thumbnail} alt={course.title} />
                    <div className="suggested-course-info">
                      <h4>{course.title}</h4>
                      <p>{course.category} • {course.difficulty}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          </div>

          <div className="analytics-sidebar">
            <div className="sidebar-card">
              <h3>Learning Stats</h3>
              <div className="stats-list">
                <div className="stat-item">
                  <div className="stat-item-icon">
                    <Clock size={20} style={{ color: 'var(--color-primary-blue)' }} />
                  </div>
                  <div>
                    <div className="stat-item-label">Total Time Spent</div>
                    <div className="stat-item-value">{formatTime(totalTimeSpent)}</div>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-item-icon">
                    <Target size={20} style={{ color: 'var(--color-primary-green)' }} />
                  </div>
                  <div>
                    <div className="stat-item-label">Weekly Goal</div>
                    <div className="stat-item-value">5 / 10 hours</div>
                  </div>
                </div>
                <div className="stat-item">
                  <div className="stat-item-icon">
                    <Award size={20} style={{ color: 'var(--color-warning)' }} />
                  </div>
                  <div>
                    <div className="stat-item-label">Badges Earned</div>
                    <div className="stat-item-value">3</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="sidebar-card">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-dot" style={{ backgroundColor: 'var(--color-success)' }} />
                  <div>
                    <div className="activity-text">Completed quiz in Web Development</div>
                    <div className="activity-time">2 hours ago</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-dot" style={{ backgroundColor: 'var(--color-primary-blue)' }} />
                  <div>
                    <div className="activity-text">Started new lesson: HTML Forms</div>
                    <div className="activity-time">5 hours ago</div>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-dot" style={{ backgroundColor: 'var(--color-primary-orange)' }} />
                  <div>
                    <div className="activity-text">Enrolled in English Literature</div>
                    <div className="activity-time">Yesterday</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
