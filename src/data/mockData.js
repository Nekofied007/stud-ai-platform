// Mock course data
export const courses = [
  {
    id: 1,
    title: "Complete Web Development Bootcamp",
    subtitle: "From Zero to Full-Stack Developer",
    description: "Learn HTML, CSS, JavaScript, React, Node.js, and MongoDB through carefully curated YouTube content. Build real-world projects and master web development fundamentals.",
    category: "Technology",
    difficulty: "Beginner",
    rating: 4.8,
    studentsEnrolled: 12453,
    duration: "40 hours",
    thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=450&fit=crop",
    instructor: {
      name: "Sarah Johnson",
      bio: "Full-stack developer with 10+ years of experience. Passionate about making coding accessible to everyone.",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    modules: [
      {
        id: 1,
        title: "Introduction to Web Development",
        lessons: [
          {
            id: 1,
            title: "What is Web Development?",
            duration: "15:30",
            videoUrl: "https://www.youtube.com/embed/qz0aGYrrlhU",
            completed: false
          },
          {
            id: 2,
            title: "Setting Up Your Development Environment",
            duration: "20:45",
            videoUrl: "https://www.youtube.com/embed/mU6anWqZJcc",
            completed: false
          },
          {
            id: 3,
            title: "Your First HTML Page",
            duration: "18:20",
            videoUrl: "https://www.youtube.com/embed/UB1O30fR-EE",
            completed: false
          }
        ]
      },
      {
        id: 2,
        title: "HTML Fundamentals",
        lessons: [
          {
            id: 4,
            title: "HTML Tags and Elements",
            duration: "25:10",
            videoUrl: "https://www.youtube.com/embed/PlxWf493en4",
            completed: false
          },
          {
            id: 5,
            title: "Forms and Input Elements",
            duration: "30:15",
            videoUrl: "https://www.youtube.com/embed/fNcJuPIZ2WE",
            completed: false
          }
        ]
      },
      {
        id: 3,
        title: "CSS Styling",
        lessons: [
          {
            id: 6,
            title: "CSS Basics and Selectors",
            duration: "28:45",
            videoUrl: "https://www.youtube.com/embed/1PnVor36_40",
            completed: false
          },
          {
            id: 7,
            title: "Flexbox Layout",
            duration: "35:20",
            videoUrl: "https://www.youtube.com/embed/fYq5PXgSsbE",
            completed: false
          }
        ]
      }
    ],
    whatYouLearn: [
      "Build responsive websites from scratch",
      "Master HTML, CSS, and JavaScript",
      "Create dynamic web applications with React",
      "Build server-side applications with Node.js",
      "Work with databases using MongoDB",
      "Deploy your applications to the web"
    ],
    reviews: [
      {
        id: 1,
        user: "John Doe",
        avatar: "https://i.pravatar.cc/150?img=12",
        rating: 5,
        comment: "This course structure helped me finally understand web development! The AI-curated content is excellent.",
        date: "2025-10-10"
      },
      {
        id: 2,
        user: "Emily Chen",
        avatar: "https://i.pravatar.cc/150?img=45",
        rating: 5,
        comment: "Best learning path I've found. The quizzes really help reinforce the concepts.",
        date: "2025-10-05"
      }
    ]
  },
  {
    id: 2,
    title: "Data Science & Machine Learning",
    subtitle: "Python for Data Analysis",
    description: "Master data science fundamentals with Python, pandas, numpy, and machine learning algorithms. Learn through structured video content and hands-on projects.",
    category: "Technology",
    difficulty: "Intermediate",
    rating: 4.9,
    studentsEnrolled: 9842,
    duration: "50 hours",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=450&fit=crop",
    instructor: {
      name: "Dr. Michael Zhang",
      bio: "Data scientist and ML engineer with PhD in Computer Science. Worked at top tech companies.",
      avatar: "https://i.pravatar.cc/150?img=33"
    },
    modules: [
      {
        id: 1,
        title: "Python Basics for Data Science",
        lessons: [
          {
            id: 1,
            title: "Introduction to Python",
            duration: "22:30",
            videoUrl: "https://www.youtube.com/embed/_uQrJ0TkZlc",
            completed: false
          }
        ]
      }
    ],
    whatYouLearn: [
      "Python programming fundamentals",
      "Data analysis with pandas and numpy",
      "Data visualization with matplotlib and seaborn",
      "Machine learning algorithms",
      "Build predictive models",
      "Real-world data science projects"
    ],
    reviews: []
  },
  {
    id: 3,
    title: "English Literature Masterclass",
    subtitle: "From Shakespeare to Modern Classics",
    description: "Explore the greatest works of English literature through expert analysis and guided reading. Perfect for students and literature enthusiasts.",
    category: "Literature",
    difficulty: "Beginner",
    rating: 4.7,
    studentsEnrolled: 5623,
    duration: "30 hours",
    thumbnail: "https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&h=450&fit=crop",
    instructor: {
      name: "Prof. Elizabeth Moore",
      bio: "English Literature professor with 20+ years of teaching experience.",
      avatar: "https://i.pravatar.cc/150?img=25"
    },
    modules: [
      {
        id: 1,
        title: "Introduction to Literary Analysis",
        lessons: [
          {
            id: 1,
            title: "How to Read Literature",
            duration: "18:45",
            videoUrl: "https://www.youtube.com/embed/MSYw502dJNY",
            completed: false
          }
        ]
      }
    ],
    whatYouLearn: [
      "Analyze literary techniques and themes",
      "Understand historical context",
      "Critical thinking and essay writing",
      "Explore major literary movements",
      "Develop your own literary voice"
    ],
    reviews: []
  },
  {
    id: 4,
    title: "Digital Marketing Mastery",
    subtitle: "SEO, Social Media & Content Marketing",
    description: "Learn modern digital marketing strategies from SEO to social media marketing. Build your brand and grow your online presence.",
    category: "Business",
    difficulty: "Beginner",
    rating: 4.6,
    studentsEnrolled: 8234,
    duration: "35 hours",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=450&fit=crop",
    instructor: {
      name: "Alex Rivera",
      bio: "Digital marketing expert who has helped 100+ businesses grow online.",
      avatar: "https://i.pravatar.cc/150?img=68"
    },
    modules: [
      {
        id: 1,
        title: "Digital Marketing Fundamentals",
        lessons: [
          {
            id: 1,
            title: "Introduction to Digital Marketing",
            duration: "16:30",
            videoUrl: "https://www.youtube.com/embed/nU-IIXBWlS4",
            completed: false
          }
        ]
      }
    ],
    whatYouLearn: [
      "SEO and keyword research",
      "Social media marketing strategies",
      "Content marketing and copywriting",
      "Email marketing campaigns",
      "Analytics and tracking",
      "Paid advertising basics"
    ],
    reviews: []
  },
  {
    id: 5,
    title: "Graphic Design Essentials",
    subtitle: "Master Adobe Creative Suite",
    description: "Learn graphic design principles and master industry-standard tools like Photoshop, Illustrator, and InDesign.",
    category: "Design",
    difficulty: "Beginner",
    rating: 4.8,
    studentsEnrolled: 7456,
    duration: "45 hours",
    thumbnail: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=450&fit=crop",
    instructor: {
      name: "Jessica Taylor",
      bio: "Award-winning graphic designer with clients worldwide.",
      avatar: "https://i.pravatar.cc/150?img=47"
    },
    modules: [
      {
        id: 1,
        title: "Design Principles",
        lessons: [
          {
            id: 1,
            title: "The Fundamentals of Design",
            duration: "24:15",
            videoUrl: "https://www.youtube.com/embed/YoCv4HCNI0o",
            completed: false
          }
        ]
      }
    ],
    whatYouLearn: [
      "Design principles and color theory",
      "Adobe Photoshop mastery",
      "Vector graphics with Illustrator",
      "Layout design with InDesign",
      "Brand identity design",
      "Portfolio building"
    ],
    reviews: []
  },
  {
    id: 6,
    title: "Public Speaking & Communication",
    subtitle: "Speak with Confidence",
    description: "Overcome fear and become a confident, persuasive speaker. Perfect for presentations, interviews, and everyday communication.",
    category: "Personal Development",
    difficulty: "Beginner",
    rating: 4.9,
    studentsEnrolled: 11234,
    duration: "20 hours",
    thumbnail: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&h=450&fit=crop",
    instructor: {
      name: "David Martinez",
      bio: "Professional speaker and communication coach with TEDx experience.",
      avatar: "https://i.pravatar.cc/150?img=15"
    },
    modules: [
      {
        id: 1,
        title: "Overcoming Speaking Anxiety",
        lessons: [
          {
            id: 1,
            title: "Understanding Stage Fright",
            duration: "14:20",
            videoUrl: "https://www.youtube.com/embed/XIXvKKEQQJo",
            completed: false
          }
        ]
      }
    ],
    whatYouLearn: [
      "Overcome public speaking fear",
      "Structure compelling presentations",
      "Body language and vocal techniques",
      "Engage your audience",
      "Handle Q&A sessions",
      "Professional communication skills"
    ],
    reviews: []
  }
];

// Categories
export const categories = [
  "All",
  "Technology",
  "Business",
  "Design",
  "Literature",
  "Personal Development",
  "Science",
  "Mathematics"
];

// User progress data
export const userProgress = {
  enrolledCourses: [1, 3],
  completedLessons: [1, 2],
  quizScores: {
    1: 85,
    2: 92
  },
  totalTimeSpent: 145, // minutes
  streak: 7 // days
};
