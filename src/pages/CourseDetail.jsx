import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Users, Clock, ChevronDown, ChevronUp, PlayCircle, CheckCircle } from 'lucide-react';
import { courses } from '../data/mockData';
import './CourseDetail.css';

const CourseDetail = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === parseInt(courseId));
  const [expandedModules, setExpandedModules] = useState([1]);

  if (!course) {
    return (
      <div className="container" style={{ padding: '4rem 0', textAlign: 'center' }}>
        <h2>Course not found</h2>
        <button className="btn-primary" onClick={() => navigate('/courses')}>
          Back to Courses
        </button>
      </div>
    );
  }

  const toggleModule = (moduleId) => {
    setExpandedModules(prev =>
      prev.includes(moduleId)
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  const handleEnroll = () => {
    navigate(`/learn/${course.id}`);
  };

  const totalLessons = course.modules.reduce((sum, module) => sum + module.lessons.length, 0);

  return (
    <div className="course-detail">
      <div className="course-hero" style={{ backgroundImage: `url(${course.thumbnail})` }}>
        <div className="course-hero-overlay">
          <div className="container">
            <div className="course-hero-content">
              <div className="breadcrumb">
                <span onClick={() => navigate('/courses')}>Courses</span>
                <span> / </span>
                <span>{course.category}</span>
              </div>
              <h1>{course.title}</h1>
              <p className="course-hero-subtitle">{course.subtitle}</p>
              
              <div className="course-meta-bar">
                <div className="meta-item">
                  <Star size={20} fill="currentColor" />
                  <span>{course.rating}</span>
                </div>
                <div className="meta-item">
                  <Users size={20} />
                  <span>{course.studentsEnrolled.toLocaleString()} students</span>
                </div>
                <div className="meta-item">
                  <Clock size={20} />
                  <span>{course.duration}</span>
                </div>
                <div className={`meta-badge difficulty-${course.difficulty.toLowerCase()}`}>
                  {course.difficulty}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="course-content-layout">
          <div className="course-main">
            <section className="course-section">
              <h2>About This Course</h2>
              <p>{course.description}</p>
            </section>

            <section className="course-section">
              <h2>What You'll Learn</h2>
              <div className="learning-outcomes">
                {course.whatYouLearn.map((item, index) => (
                  <div key={index} className="outcome-item">
                    <CheckCircle size={20} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            <section className="course-section">
              <h2>Course Content</h2>
              <p className="content-summary">
                {course.modules.length} modules • {totalLessons} lessons • {course.duration} total
              </p>
              
              <div className="curriculum">
                {course.modules.map(module => (
                  <div key={module.id} className="module-item">
                    <div 
                      className="module-header"
                      onClick={() => toggleModule(module.id)}
                    >
                      <div className="module-title">
                        <h3>Module {module.id}: {module.title}</h3>
                        <span className="lesson-count">{module.lessons.length} lessons</span>
                      </div>
                      {expandedModules.includes(module.id) ? 
                        <ChevronUp size={24} /> : 
                        <ChevronDown size={24} />
                      }
                    </div>
                    
                    {expandedModules.includes(module.id) && (
                      <div className="lessons-list">
                        {module.lessons.map(lesson => (
                          <div key={lesson.id} className="lesson-item">
                            <PlayCircle size={18} />
                            <span className="lesson-title">{lesson.title}</span>
                            <span className="lesson-duration">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <section className="course-section">
              <h2>Instructor</h2>
              <div className="instructor-card">
                <img src={course.instructor.avatar} alt={course.instructor.name} />
                <div className="instructor-info">
                  <h3>{course.instructor.name}</h3>
                  <p>{course.instructor.bio}</p>
                </div>
              </div>
            </section>

            {course.reviews && course.reviews.length > 0 && (
              <section className="course-section">
                <h2>Student Reviews</h2>
                <div className="reviews-list">
                  {course.reviews.map(review => (
                    <div key={review.id} className="review-item">
                      <div className="review-header">
                        <img src={review.avatar} alt={review.user} />
                        <div>
                          <div className="reviewer-name">{review.user}</div>
                          <div className="review-rating">
                            {'★'.repeat(review.rating)}
                          </div>
                        </div>
                        <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                      </div>
                      <p className="review-comment">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <div className="course-sidebar">
            <div className="enrollment-card">
              <div className="course-thumbnail-small">
                <img src={course.thumbnail} alt={course.title} />
              </div>
              <div className="price-section">
                <div className="price">FREE</div>
                <p className="price-note">All courses on STUD are completely free</p>
              </div>
              <button className="btn-primary btn-enroll" onClick={handleEnroll}>
                Enroll Now
              </button>
              <div className="course-includes">
                <h4>This course includes:</h4>
                <ul>
                  <li>✓ {totalLessons} video lessons</li>
                  <li>✓ AI-powered quizzes</li>
                  <li>✓ Interactive tasks</li>
                  <li>✓ Progress tracking</li>
                  <li>✓ Personalized feedback</li>
                  <li>✓ Lifetime access</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetail;
