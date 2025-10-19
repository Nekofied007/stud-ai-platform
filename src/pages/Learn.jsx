import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle, Circle, BookOpen, ClipboardList, StickyNote } from 'lucide-react';
import { courses } from '../data/mockData';
import './Learn.css';

const Learn = () => {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = courses.find(c => c.id === parseInt(courseId));
  
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('quiz');
  const [completedLessons, setCompletedLessons] = useState([]);
  const [notes, setNotes] = useState('');
  const [quizAnswers, setQuizAnswers] = useState({});

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

  // Flatten all lessons
  const allLessons = course.modules.flatMap(module => 
    module.lessons.map(lesson => ({
      ...lesson,
      moduleTitle: module.title
    }))
  );

  const currentLesson = allLessons[currentLessonIndex];
  const progressPercentage = (completedLessons.length / allLessons.length) * 100;

  // Sample quiz questions (in real app, these would come from AI)
  const quizQuestions = [
    {
      id: 1,
      question: "What is the main concept covered in this lesson?",
      options: [
        "Understanding the fundamentals",
        "Advanced techniques",
        "Project implementation",
        "Best practices"
      ]
    },
    {
      id: 2,
      question: "Which approach is recommended for beginners?",
      options: [
        "Start with complex projects",
        "Learn fundamentals first",
        "Skip theory and practice",
        "Watch videos passively"
      ]
    }
  ];

  const handleNextLesson = () => {
    if (!completedLessons.includes(currentLesson.id)) {
      setCompletedLessons([...completedLessons, currentLesson.id]);
    }
    if (currentLessonIndex < allLessons.length - 1) {
      setCurrentLessonIndex(currentLessonIndex + 1);
      setQuizAnswers({});
    }
  };

  const handlePreviousLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(currentLessonIndex - 1);
      setQuizAnswers({});
    }
  };

  const handleLessonClick = (index) => {
    setCurrentLessonIndex(index);
    setQuizAnswers({});
  };

  const handleQuizAnswer = (questionId, answer) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answer
    });
  };

  return (
    <div className="learn-page">
      <div className="learn-header">
        <div className="container-wide">
          <button className="btn-outline" onClick={() => navigate(`/course/${course.id}`)}>
            <ChevronLeft size={20} />
            Back to Course
          </button>
          <div className="course-progress-header">
            <h2>{course.title}</h2>
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
              <span className="progress-text">
                {completedLessons.length} / {allLessons.length} lessons completed
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="learn-content">
        <div className="container-wide">
          <div className="learn-layout">
            <div className="lesson-sidebar">
              <h3>Course Content</h3>
              <div className="lessons-navigation">
                {course.modules.map((module, moduleIndex) => (
                  <div key={module.id} className="module-section">
                    <div className="module-title-small">
                      Module {module.id}: {module.title}
                    </div>
                    {module.lessons.map((lesson, lessonIndex) => {
                      const globalIndex = course.modules
                        .slice(0, moduleIndex)
                        .reduce((sum, m) => sum + m.lessons.length, 0) + lessonIndex;
                      const isActive = globalIndex === currentLessonIndex;
                      const isCompleted = completedLessons.includes(lesson.id);

                      return (
                        <div
                          key={lesson.id}
                          className={`lesson-nav-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                          onClick={() => handleLessonClick(globalIndex)}
                        >
                          {isCompleted ? (
                            <CheckCircle size={18} className="lesson-icon" />
                          ) : (
                            <Circle size={18} className="lesson-icon" />
                          )}
                          <div className="lesson-nav-info">
                            <div className="lesson-nav-title">{lesson.title}</div>
                            <div className="lesson-nav-duration">{lesson.duration}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>

            <div className="lesson-main">
              <div className="video-section">
                <h1 className="lesson-title">{currentLesson.title}</h1>
                <div className="video-player">
                  <iframe
                    width="100%"
                    height="100%"
                    src={currentLesson.videoUrl}
                    title={currentLesson.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                
                <div className="lesson-navigation-buttons">
                  <button 
                    className="btn-outline"
                    onClick={handlePreviousLesson}
                    disabled={currentLessonIndex === 0}
                  >
                    <ChevronLeft size={20} />
                    Previous Lesson
                  </button>
                  <button 
                    className="btn-primary"
                    onClick={handleNextLesson}
                  >
                    {currentLessonIndex === allLessons.length - 1 ? 'Complete Course' : 'Next Lesson'}
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              <div className="interactive-section">
                <div className="tabs">
                  <button 
                    className={`tab ${activeTab === 'quiz' ? 'active' : ''}`}
                    onClick={() => setActiveTab('quiz')}
                  >
                    <ClipboardList size={20} />
                    Quiz
                  </button>
                  <button 
                    className={`tab ${activeTab === 'tasks' ? 'active' : ''}`}
                    onClick={() => setActiveTab('tasks')}
                  >
                    <BookOpen size={20} />
                    Tasks
                  </button>
                  <button 
                    className={`tab ${activeTab === 'notes' ? 'active' : ''}`}
                    onClick={() => setActiveTab('notes')}
                  >
                    <StickyNote size={20} />
                    Notes
                  </button>
                </div>

                <div className="tab-content">
                  {activeTab === 'quiz' && (
                    <div className="quiz-section">
                      <h3>Test Your Understanding</h3>
                      <p className="quiz-intro">
                        Answer these questions to reinforce what you've learned.
                      </p>
                      {quizQuestions.map((q, index) => (
                        <div key={q.id} className="quiz-question">
                          <h4>Question {index + 1}: {q.question}</h4>
                          <div className="quiz-options">
                            {q.options.map((option, optIndex) => (
                              <label key={optIndex} className="quiz-option">
                                <input
                                  type="radio"
                                  name={`question-${q.id}`}
                                  value={option}
                                  checked={quizAnswers[q.id] === option}
                                  onChange={() => handleQuizAnswer(q.id, option)}
                                />
                                <span>{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                      <button 
                        className="btn-primary"
                        disabled={Object.keys(quizAnswers).length !== quizQuestions.length}
                      >
                        Submit Quiz
                      </button>
                    </div>
                  )}

                  {activeTab === 'tasks' && (
                    <div className="tasks-section">
                      <h3>Practice Tasks</h3>
                      <div className="task-item">
                        <h4>Task 1: Summarize Key Points</h4>
                        <p>Write a brief summary of the main concepts covered in this lesson.</p>
                        <textarea 
                          placeholder="Write your summary here..."
                          rows="4"
                        />
                      </div>
                      <div className="task-item">
                        <h4>Task 2: Apply What You've Learned</h4>
                        <p>Try to implement or practice the concept demonstrated in the video.</p>
                        <textarea 
                          placeholder="Describe what you practiced or provide your code..."
                          rows="6"
                        />
                      </div>
                      <button className="btn-primary">Submit Tasks</button>
                    </div>
                  )}

                  {activeTab === 'notes' && (
                    <div className="notes-section">
                      <h3>Personal Notes</h3>
                      <p>Take notes to help you remember important points from this lesson.</p>
                      <textarea
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Write your notes here..."
                        rows="12"
                        className="notes-textarea"
                      />
                      <button className="btn-secondary">Save Notes</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Learn;
