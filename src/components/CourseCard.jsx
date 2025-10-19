import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Users, Clock } from 'lucide-react';
import './CourseCard.css';

const CourseCard = ({ course }) => {
  return (
    <Link to={`/course/${course.id}`} className="course-card">
      <div className="course-thumbnail">
        <img src={course.thumbnail} alt={course.title} />
        <div className="course-category">{course.category}</div>
      </div>
      
      <div className="course-info">
        <h3 className="course-title">{course.title}</h3>
        <p className="course-subtitle">{course.subtitle}</p>
        
        <div className="course-meta">
          <div className="rating">
            <Star size={16} fill="currentColor" />
            <span>{course.rating}</span>
          </div>
          <div className="students">
            <Users size={16} />
            <span>{course.studentsEnrolled.toLocaleString()}</span>
          </div>
          <div className="duration">
            <Clock size={16} />
            <span>{course.duration}</span>
          </div>
        </div>

        <div className="course-footer">
          <div className="instructor">
            <img src={course.instructor.avatar} alt={course.instructor.name} />
            <span>{course.instructor.name}</span>
          </div>
          <div className={`difficulty difficulty-${course.difficulty.toLowerCase()}`}>
            {course.difficulty}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
