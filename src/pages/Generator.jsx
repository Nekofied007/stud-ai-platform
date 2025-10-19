import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Video, FileText, BrainCircuit, List, Loader2, CheckCircle, ArrowLeft, Play, Sparkles } from 'lucide-react';
import './Generator.css';

const Generator = () => {
  const [searchParams] = useSearchParams();
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);
  const [activeTab, setActiveTab] = useState('lesson');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoId, setVideoId] = useState('');
  const [hasGenerated, setHasGenerated] = useState(false);
  const [inputMode, setInputMode] = useState('url'); // 'url' or 'topic'
  const [topic, setTopic] = useState('');
  const [recommendedVideos, setRecommendedVideos] = useState([]);

  const processingSteps = [
    'Analyzing video content...',
    'Extracting key concepts...',
    'Generating quiz questions...',
    'Building your notes...',
    'Creating curated playlist...'
  ];

  // Mock function to get recommended videos based on topic
  const getRecommendedVideos = (searchTopic) => {
    const videoDatabase = {
      'array': [
        { id: 1, title: 'Data Structures: Arrays Explained', videoId: 'RBSGKlAvoiM', channel: 'CS Dojo', duration: '22:15', views: '1.2M', thumbnail: 'https://img.youtube.com/vi/RBSGKlAvoiM/mqdefault.jpg' },
        { id: 2, title: 'Array Methods Every Developer Should Know', videoId: 'R8rmfD9Y5-c', channel: 'Web Dev Simplified', duration: '18:42', views: '856K', thumbnail: 'https://img.youtube.com/vi/R8rmfD9Y5-c/mqdefault.jpg' },
        { id: 3, title: 'Master Arrays in JavaScript', videoId: 'oigfaZ5ApsM', channel: 'Traversy Media', duration: '25:30', views: '654K', thumbnail: 'https://img.youtube.com/vi/oigfaZ5ApsM/mqdefault.jpg' },
        { id: 4, title: 'Arrays vs Linked Lists', videoId: 'DyG9S9nAlUM', channel: 'Fireship', duration: '8:15', views: '923K', thumbnail: 'https://img.youtube.com/vi/DyG9S9nAlUM/mqdefault.jpg' },
        { id: 5, title: 'Advanced Array Techniques', videoId: 'g1ial5LkbDc', channel: 'The Coding Train', duration: '32:18', views: '412K', thumbnail: 'https://img.youtube.com/vi/g1ial5LkbDc/mqdefault.jpg' }
      ],
      'web development': [
        { id: 1, title: 'Web Development Full Course 2024', videoId: 'zJSY8tbf_ys', channel: 'freeCodeCamp', duration: '4:12:32', views: '5.2M', thumbnail: 'https://img.youtube.com/vi/zJSY8tbf_ys/mqdefault.jpg' },
        { id: 2, title: 'HTML & CSS Crash Course', videoId: 'hu-q2zYwEYs', channel: 'Traversy Media', duration: '1:28:15', views: '3.1M', thumbnail: 'https://img.youtube.com/vi/hu-q2zYwEYs/mqdefault.jpg' },
        { id: 3, title: 'JavaScript for Beginners', videoId: 'W6NZfCO5SIk', channel: 'Programming with Mosh', duration: '1:41:23', views: '2.8M', thumbnail: 'https://img.youtube.com/vi/W6NZfCO5SIk/mqdefault.jpg' },
        { id: 4, title: 'Build a Modern Website from Scratch', videoId: 'mU6anWqZJcc', channel: 'DesignCourse', duration: '2:15:42', views: '1.9M', thumbnail: 'https://img.youtube.com/vi/mU6anWqZJcc/mqdefault.jpg' },
        { id: 5, title: 'Web Development Roadmap 2024', videoId: 'ysEN5RaKOlA', channel: 'Fireship', duration: '12:45', views: '4.5M', thumbnail: 'https://img.youtube.com/vi/ysEN5RaKOlA/mqdefault.jpg' }
      ],
      'python': [
        { id: 1, title: 'Python for Beginners - Full Course', videoId: '_uQrJ0TkZlc', channel: 'Programming with Mosh', duration: '6:14:07', views: '18M', thumbnail: 'https://img.youtube.com/vi/_uQrJ0TkZlc/mqdefault.jpg' },
        { id: 2, title: 'Learn Python in 1 Hour', videoId: 'kqtD5dpn9C8', channel: 'Programming with Mosh', duration: '1:00:05', views: '8.5M', thumbnail: 'https://img.youtube.com/vi/kqtD5dpn9C8/mqdefault.jpg' },
        { id: 3, title: 'Python Tutorial for Absolute Beginners', videoId: 'Z1Yd7upQsXY', channel: 'CS Dojo', duration: '11:23', views: '3.2M', thumbnail: 'https://img.youtube.com/vi/Z1Yd7upQsXY/mqdefault.jpg' },
        { id: 4, title: 'Python OOP Tutorial', videoId: 'Ej_02ICOIgs', channel: 'Tech With Tim', duration: '45:18', views: '1.1M', thumbnail: 'https://img.youtube.com/vi/Ej_02ICOIgs/mqdefault.jpg' },
        { id: 5, title: '100 Seconds of Python', videoId: 'x7X9w_GIm1s', channel: 'Fireship', duration: '2:15', views: '2.8M', thumbnail: 'https://img.youtube.com/vi/x7X9w_GIm1s/mqdefault.jpg' }
      ],
      'react': [
        { id: 1, title: 'React Course - Beginner\'s Tutorial', videoId: 'bMknfKXIFA8', channel: 'freeCodeCamp', duration: '11:55:27', views: '7.2M', thumbnail: 'https://img.youtube.com/vi/bMknfKXIFA8/mqdefault.jpg' },
        { id: 2, title: 'React in 100 Seconds', videoId: 'Tn6-PIqc4UM', channel: 'Fireship', duration: '2:38', views: '1.9M', thumbnail: 'https://img.youtube.com/vi/Tn6-PIqc4UM/mqdefault.jpg' },
        { id: 3, title: 'React Hooks Full Course 2024', videoId: 'LlvBzyy-558', channel: 'Programming with Mosh', duration: '1:32:45', views: '2.4M', thumbnail: 'https://img.youtube.com/vi/LlvBzyy-558/mqdefault.jpg' },
        { id: 4, title: 'Build a Real-World React App', videoId: 'Law7wfdg_ls', channel: 'Traversy Media', duration: '3:28:42', views: '1.5M', thumbnail: 'https://img.youtube.com/vi/Law7wfdg_ls/mqdefault.jpg' },
        { id: 5, title: 'React Tutorial for Beginners', videoId: 'SqcY0GlETPk', channel: 'Programming with Mosh', duration: '2:24:35', views: '5.8M', thumbnail: 'https://img.youtube.com/vi/SqcY0GlETPk/mqdefault.jpg' }
      ],
      'javascript': [
        { id: 1, title: 'JavaScript Full Course for Beginners', videoId: 'PkZNo7MFNFg', channel: 'freeCodeCamp', duration: '7:42:15', views: '9.1M', thumbnail: 'https://img.youtube.com/vi/PkZNo7MFNFg/mqdefault.jpg' },
        { id: 2, title: 'JavaScript Crash Course', videoId: 'hdI2bqOjy3c', channel: 'Traversy Media', duration: '1:40:08', views: '3.5M', thumbnail: 'https://img.youtube.com/vi/hdI2bqOjy3c/mqdefault.jpg' },
        { id: 3, title: 'Modern JavaScript Tutorial', videoId: 'iWOYAxlnaww', channel: 'Net Ninja', duration: '55:32', views: '2.1M', thumbnail: 'https://img.youtube.com/vi/iWOYAxlnaww/mqdefault.jpg' },
        { id: 4, title: 'JavaScript ES6+ Features', videoId: 'nZ1DMMsyVyI', channel: 'Web Dev Simplified', duration: '32:15', views: '1.3M', thumbnail: 'https://img.youtube.com/vi/nZ1DMMsyVyI/mqdefault.jpg' },
        { id: 5, title: 'Async JavaScript Tutorial', videoId: 'PoRJizFvM7s', channel: 'The Coding Train', duration: '28:47', views: '856K', thumbnail: 'https://img.youtube.com/vi/PoRJizFvM7s/mqdefault.jpg' }
      ],
      'machine learning': [
        { id: 1, title: 'Machine Learning for Beginners', videoId: 'i_LwzRVP7bg', channel: 'freeCodeCamp', duration: '3:26:56', views: '2.8M', thumbnail: 'https://img.youtube.com/vi/i_LwzRVP7bg/mqdefault.jpg' },
        { id: 2, title: 'Machine Learning Basics Explained', videoId: 'ukzFI9rgwfU', channel: 'StatQuest', duration: '15:12', views: '1.5M', thumbnail: 'https://img.youtube.com/vi/ukzFI9rgwfU/mqdefault.jpg' },
        { id: 3, title: 'Deep Learning Crash Course', videoId: 'VyWAvY2CF9c', channel: 'Google Developers', duration: '42:38', views: '923K', thumbnail: 'https://img.youtube.com/vi/VyWAvY2CF9c/mqdefault.jpg' },
        { id: 4, title: 'Neural Networks Explained', videoId: 'aircAruvnKk', channel: '3Blue1Brown', duration: '19:13', views: '8.2M', thumbnail: 'https://img.youtube.com/vi/aircAruvnKk/mqdefault.jpg' },
        { id: 5, title: 'TensorFlow 2.0 Complete Course', videoId: 'tPYj3fFJGjk', channel: 'freeCodeCamp', duration: '3:55:23', views: '1.9M', thumbnail: 'https://img.youtube.com/vi/tPYj3fFJGjk/mqdefault.jpg' }
      ],
      'data structures': [
        { id: 1, title: 'Data Structures Full Course', videoId: 'RBSGKlAvoiM', channel: 'freeCodeCamp', duration: '2:35:18', views: '3.2M', thumbnail: 'https://img.youtube.com/vi/RBSGKlAvoiM/mqdefault.jpg' },
        { id: 2, title: 'Data Structures Easy to Advanced', videoId: 'B31LgI4Y4DQ', channel: 'William Fiset', duration: '13:42:56', views: '1.8M', thumbnail: 'https://img.youtube.com/vi/B31LgI4Y4DQ/mqdefault.jpg' },
        { id: 3, title: 'Trees and Graphs Explained', videoId: 'oSWTXtMglKE', channel: 'CS Dojo', duration: '28:15', views: '956K', thumbnail: 'https://img.youtube.com/vi/oSWTXtMglKE/mqdefault.jpg' },
        { id: 4, title: 'Hash Tables and Hash Maps', videoId: 'shs0KM3wKv8', channel: 'CS50', duration: '22:42', views: '723K', thumbnail: 'https://img.youtube.com/vi/shs0KM3wKv8/mqdefault.jpg' },
        { id: 5, title: 'Linked Lists Crash Course', videoId: 'F8AbOfQwl1c', channel: 'HackerRank', duration: '15:38', views: '634K', thumbnail: 'https://img.youtube.com/vi/F8AbOfQwl1c/mqdefault.jpg' }
      ],
      'css': [
        { id: 1, title: 'CSS Full Course for Beginners', videoId: 'OXGznpKZ_sA', channel: 'freeCodeCamp', duration: '11:02:05', views: '2.5M', thumbnail: 'https://img.youtube.com/vi/OXGznpKZ_sA/mqdefault.jpg' },
        { id: 2, title: 'CSS Flexbox Tutorial', videoId: 'JJSoEo8JSnc', channel: 'Traversy Media', duration: '32:15', views: '1.8M', thumbnail: 'https://img.youtube.com/vi/JJSoEo8JSnc/mqdefault.jpg' },
        { id: 3, title: 'CSS Grid Layout Crash Course', videoId: 'jV8B24rSN5o', channel: 'Traversy Media', duration: '28:42', views: '1.2M', thumbnail: 'https://img.youtube.com/vi/jV8B24rSN5o/mqdefault.jpg' },
        { id: 4, title: 'Modern CSS Design Techniques', videoId: 'D-h8L5hgW-w', channel: 'DesignCourse', duration: '45:23', views: '856K', thumbnail: 'https://img.youtube.com/vi/D-h8L5hgW-w/mqdefault.jpg' },
        { id: 5, title: 'CSS Animations Tutorial', videoId: 'zHUpx90NerM', channel: 'Web Dev Simplified', duration: '18:30', views: '623K', thumbnail: 'https://img.youtube.com/vi/zHUpx90NerM/mqdefault.jpg' }
      ]
    };

    // Search for matching topic (case-insensitive)
    const normalizedTopic = searchTopic.toLowerCase().trim();
    
    // Direct match
    if (videoDatabase[normalizedTopic]) {
      return videoDatabase[normalizedTopic];
    }
    
    // Partial match
    for (const [key, videos] of Object.entries(videoDatabase)) {
      if (normalizedTopic.includes(key) || key.includes(normalizedTopic)) {
        return videos;
      }
    }
    
    // Default fallback - return web development videos
    return videoDatabase['web development'];
  };

  const handleTopicSearch = () => {
    if (topic.trim()) {
      const videos = getRecommendedVideos(topic);
      setRecommendedVideos(videos);
    }
  };

  useEffect(() => {
    const url = searchParams.get('url');
    if (url) {
      setVideoUrl(url);
      setIsProcessing(true);
      setProcessingStep(0);
      
      // Extract YouTube video ID
      const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&]+)/);
      if (match) {
        setVideoId(match[1]);
      }
      
      // Simulate processing
      const interval = setInterval(() => {
        setProcessingStep(prev => {
          if (prev < processingSteps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            setTimeout(() => {
              setIsProcessing(false);
              setHasGenerated(true);
            }, 1000);
            return prev;
          }
        });
      }, 1500);

      return () => clearInterval(interval);
    }
  }, [searchParams]);

  // Mock generated data
  const generatedLesson = {
    title: 'Introduction to React Hooks',
    duration: '24:35',
    notes: [
      {
        timestamp: '00:00',
        content: 'Introduction to React Hooks and why they were introduced in React 16.8 to solve problems with class components and code reuse'
      },
      {
        timestamp: '02:30',
        content: 'Problems with class components: confusing "this" keyword, difficult lifecycle methods, and wrapper hell with higher-order components'
      },
      {
        timestamp: '05:15',
        content: 'useState Hook - The foundation for managing state in functional components. Returns array with current state and setter function'
      },
      {
        timestamp: '08:45',
        content: 'State updates with useState are asynchronous and batched for performance. Use functional updates when new state depends on previous state'
      },
      {
        timestamp: '12:20',
        content: 'useEffect Hook - Replaces componentDidMount, componentDidUpdate, and componentWillUnmount. Runs after render by default'
      },
      {
        timestamp: '15:30',
        content: 'useEffect dependency array controls when effect runs. Empty array means run once, no array means run every render, array with values means run when those values change'
      },
      {
        timestamp: '18:10',
        content: 'Cleanup functions in useEffect prevent memory leaks. Return a function to clean up subscriptions, timers, or listeners'
      },
      {
        timestamp: '20:45',
        content: 'Custom Hooks - Extract component logic into reusable functions. Must start with "use" prefix and can call other Hooks'
      },
      {
        timestamp: '22:30',
        content: 'Rules of Hooks: Only call at top level (not in loops, conditions, or nested functions) and only from React functions'
      },
      {
        timestamp: '24:00',
        content: 'Best practices: Keep effects focused on single concerns, use multiple useEffect calls for different purposes, and optimize with useMemo/useCallback when needed'
      }
    ],
    quiz: [
      {
        id: 1,
        question: 'What is the primary purpose of the useState Hook?',
        options: [
          'To fetch data from APIs',
          'To manage state in functional components',
          'To handle routing',
          'To create side effects'
        ],
        correctAnswer: 1,
        explanation: 'useState is specifically designed to add state management to functional components, returning the current state value and a function to update it.'
      },
      {
        id: 2,
        question: 'When does useEffect run by default (without a dependency array)?',
        options: [
          'Only once when component mounts',
          'After every render (mount and update)',
          'Only when props change',
          'Before component unmounts'
        ],
        correctAnswer: 1,
        explanation: 'Without a dependency array, useEffect runs after every render, including the initial mount and all subsequent updates.'
      },
      {
        id: 3,
        question: 'What should custom Hooks always start with?',
        options: [
          'The word "Hook"',
          'The word "use"',
          'An underscore',
          'A capital letter'
        ],
        correctAnswer: 1,
        explanation: 'Custom Hooks must start with "use" (like useState, useEffect) so React can automatically check for Hook rules violations.'
      },
      {
        id: 4,
        question: 'What does an empty dependency array [] in useEffect mean?',
        options: [
          'The effect runs on every render',
          'The effect runs only once after initial mount',
          'The effect never runs',
          'The effect runs when any state changes'
        ],
        correctAnswer: 1,
        explanation: 'An empty dependency array tells React to run the effect only once after the initial render, similar to componentDidMount.'
      },
      {
        id: 5,
        question: 'How do you update state based on the previous state value?',
        options: [
          'setState(state + 1)',
          'setState(prevState => prevState + 1)',
          'state = state + 1',
          'updateState(state + 1)'
        ],
        correctAnswer: 1,
        explanation: 'Use the functional update form setState(prevState => newState) to ensure you are working with the most current state value, especially important for async updates.'
      },
      {
        id: 6,
        question: 'What is the purpose of the cleanup function in useEffect?',
        options: [
          'To improve performance',
          'To prevent memory leaks and clean up subscriptions',
          'To update the component state',
          'To fetch new data'
        ],
        correctAnswer: 1,
        explanation: 'The cleanup function (returned from useEffect) runs before the component unmounts or before the effect runs again, preventing memory leaks from subscriptions, timers, or listeners.'
      },
      {
        id: 7,
        question: 'Which of the following is NOT a rule of Hooks?',
        options: [
          'Only call Hooks at the top level',
          'Only call Hooks from React functions',
          'Always pass a dependency array to useEffect',
          'Don\'t call Hooks inside loops or conditions'
        ],
        correctAnswer: 2,
        explanation: 'While it\'s often recommended to include a dependency array, it\'s not a strict rule. The actual rules are: call Hooks at top level and only from React functions.'
      },
      {
        id: 8,
        question: 'What happens if you directly mutate state instead of using setState?',
        options: [
          'The component re-renders immediately',
          'The component does not re-render',
          'React throws an error',
          'The state updates but slowly'
        ],
        correctAnswer: 1,
        explanation: 'Directly mutating state bypasses React\'s state management system, so React doesn\'t know the state changed and won\'t trigger a re-render.'
      },
      {
        id: 9,
        question: 'When should you use useEffect vs useLayoutEffect?',
        options: [
          'Always use useLayoutEffect for better performance',
          'Use useEffect for most cases; useLayoutEffect when you need to measure DOM before paint',
          'They are interchangeable',
          'useLayoutEffect is deprecated'
        ],
        correctAnswer: 1,
        explanation: 'useEffect runs asynchronously after paint, while useLayoutEffect runs synchronously before paint. Use useLayoutEffect only when you need to read layout from DOM and synchronously re-render.'
      },
      {
        id: 10,
        question: 'What does the useState setter function do when passed the same value?',
        options: [
          'Always triggers a re-render',
          'May bail out of re-render if value is identical (using Object.is)',
          'Throws an error',
          'Queues the update for later'
        ],
        correctAnswer: 1,
        explanation: 'React uses Object.is comparison to check if the new state is the same as the current state. If they\'re identical, React may skip the re-render as an optimization.'
      },
      {
        id: 11,
        question: 'Can you conditionally call a Hook?',
        options: [
          'Yes, Hooks can be called anywhere',
          'No, Hooks must be called unconditionally at the top level',
          'Yes, but only in useEffect',
          'Only in production builds'
        ],
        correctAnswer: 1,
        explanation: 'Hooks must be called in the exact same order every render. Calling them conditionally would break this order, causing bugs. Always call Hooks at the top level.'
      },
      {
        id: 12,
        question: 'What is the correct way to handle multiple state variables?',
        options: [
          'Use one useState with an object containing all state',
          'Use multiple useState calls, one for each state variable',
          'Both approaches are valid',
          'Use this.state like in class components'
        ],
        correctAnswer: 2,
        explanation: 'Both approaches work! You can use multiple useState calls for related but independent state, or one useState with an object. Choose based on whether state variables are related and updated together.'
      },
      {
        id: 13,
        question: 'How do you skip running an effect if certain values haven\'t changed?',
        options: [
          'Use if statements inside the effect',
          'Pass those values in the dependency array',
          'Return early from the effect',
          'Use shouldComponentUpdate'
        ],
        correctAnswer: 1,
        explanation: 'The dependency array is the correct way to optimize effects. React will skip running the effect if all dependency values are the same as the previous render.'
      },
      {
        id: 14,
        question: 'What is the main benefit of custom Hooks?',
        options: [
          'They make code run faster',
          'They allow reusing stateful logic between components',
          'They are required by React',
          'They replace all lifecycle methods'
        ],
        correctAnswer: 1,
        explanation: 'Custom Hooks let you extract component logic into reusable functions, sharing stateful behavior between components without wrapper components or render props.'
      },
      {
        id: 15,
        question: 'What happens if you forget to include a dependency in the useEffect dependency array?',
        options: [
          'React throws an error immediately',
          'The effect may use stale values and cause bugs',
          'Nothing, it\'s optional',
          'The component won\'t render'
        ],
        correctAnswer: 1,
        explanation: 'Missing dependencies means the effect closure captures stale values from the render when the effect was created, leading to bugs. ESLint plugin can help detect these issues.'
      }
    ],
    relatedVideos: [
      {
        id: 1,
        title: 'React Hooks Full Course 2024',
        videoId: 'LlvBzyy-558',
        thumbnail: 'https://img.youtube.com/vi/LlvBzyy-558/mqdefault.jpg',
        duration: '1:32:45',
        channel: 'Programming with Mosh',
        views: '1.2M'
      },
      {
        id: 2,
        title: 'useContext Hook Tutorial',
        videoId: '5LrDIWkK_Bc',
        thumbnail: 'https://img.youtube.com/vi/5LrDIWkK_Bc/mqdefault.jpg',
        duration: '22:15',
        channel: 'Web Dev Simplified',
        views: '845K'
      },
      {
        id: 3,
        title: 'useReducer Hook Explained',
        videoId: 'kK_Wqx3RnHk',
        thumbnail: 'https://img.youtube.com/vi/kK_Wqx3RnHk/mqdefault.jpg',
        duration: '18:30',
        channel: 'Codevolution',
        views: '523K'
      },
      {
        id: 4,
        title: 'Custom React Hooks - Reusable Logic',
        videoId: '6ThXsUwLWvc',
        thumbnail: 'https://img.youtube.com/vi/6ThXsUwLWvc/mqdefault.jpg',
        duration: '25:10',
        channel: 'Ben Awad',
        views: '689K'
      },
      {
        id: 5,
        title: 'React Hooks vs Class Components',
        videoId: 'dpw9EHDh2bM',
        thumbnail: 'https://img.youtube.com/vi/dpw9EHDh2bM/mqdefault.jpg',
        duration: '15:42',
        channel: 'Fireship',
        views: '2.1M'
      },
      {
        id: 6,
        title: 'useMemo and useCallback Hooks',
        videoId: 'THL1OPn72vo',
        thumbnail: 'https://img.youtube.com/vi/THL1OPn72vo/mqdefault.jpg',
        duration: '20:05',
        channel: 'Jack Herrington',
        views: '412K'
      },
      {
        id: 7,
        title: 'React Hooks Best Practices 2024',
        videoId: 'Tn6-PIqc4UM',
        thumbnail: 'https://img.youtube.com/vi/Tn6-PIqc4UM/mqdefault.jpg',
        duration: '28:50',
        channel: 'Traversy Media',
        views: '956K'
      },
      {
        id: 8,
        title: 'Building a Real App with React Hooks',
        videoId: '9KJxaFHotqI',
        thumbnail: 'https://img.youtube.com/vi/9KJxaFHotqI/mqdefault.jpg',
        duration: '42:18',
        channel: 'The Net Ninja',
        views: '1.5M'
      },
      {
        id: 9,
        title: 'React Hooks Testing Tutorial',
        videoId: 'yqHEnoO8LXI',
        thumbnail: 'https://img.youtube.com/vi/yqHEnoO8LXI/mqdefault.jpg',
        duration: '19:25',
        channel: 'Kent C. Dodds',
        views: '387K'
      },
      {
        id: 10,
        title: 'Advanced React Hooks Patterns',
        videoId: '1jWS7cCuUXw',
        thumbnail: 'https://img.youtube.com/vi/1jWS7cCuUXw/mqdefault.jpg',
        duration: '35:30',
        channel: 'React Conf',
        views: '678K'
      }
    ]
  };

  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const handleQuizAnswer = (questionId, answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const submitQuiz = () => {
    setQuizSubmitted(true);
  };

  const getQuizScore = () => {
    let correct = 0;
    generatedLesson.quiz.forEach(q => {
      if (quizAnswers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    return { correct, total: generatedLesson.quiz.length };
  };

  if (isProcessing) {
    return (
      <div className="generator-page processing">
        <div className="processing-container">
          <div className="processing-icon">
            <Loader2 size={64} className="spinner" />
          </div>
          <h1>Creating Your Lesson</h1>
          <div className="processing-steps">
            {processingSteps.map((step, index) => (
              <div 
                key={index} 
                className={`processing-step ${index <= processingStep ? 'active' : ''} ${index < processingStep ? 'completed' : ''}`}
              >
                {index < processingStep ? (
                  <CheckCircle size={20} className="step-icon" />
                ) : (
                  <div className="step-number">{index + 1}</div>
                )}
                <span>{step}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Show input form if no URL provided yet
  if (!hasGenerated && !isProcessing) {
    return (
      <div className="generator-page">
        <div className="generator-header">
          <div className="container">
            <Link to="/" className="back-link">
              <ArrowLeft size={20} />
              Back to Home
            </Link>
            <h1 className="lesson-title">Create Your Custom Lesson</h1>
            <p className="lesson-meta">Transform any YouTube video into a structured learning experience</p>
          </div>
        </div>

        <div className="generator-content">
          <div className="container">
            <div className="generator-input-container">
              {/* Mode Toggle */}
              <div className="input-mode-toggle">
                <button 
                  className={`mode-btn ${inputMode === 'url' ? 'active' : ''}`}
                  onClick={() => {
                    setInputMode('url');
                    setRecommendedVideos([]);
                  }}
                >
                  <Video size={20} />
                  Enter Video URL
                </button>
                <button 
                  className={`mode-btn ${inputMode === 'topic' ? 'active' : ''}`}
                  onClick={() => setInputMode('topic')}
                >
                  <BrainCircuit size={20} />
                  Search by Topic
                </button>
              </div>

              {inputMode === 'url' ? (
                <>
                  <div className="input-instructions">
                    <Video size={48} className="instruction-icon" />
                    <h2>Paste a YouTube Video URL</h2>
                    <p>We'll analyze the video and create a complete lesson with notes, quizzes, and a curated playlist.</p>
                  </div>

                  <form className="generator-form" onSubmit={(e) => {
                    e.preventDefault();
                    if (videoUrl.trim()) {
                      window.location.href = `/generator?url=${encodeURIComponent(videoUrl)}`;
                    }
                  }}>
                    <div className="url-input-wrapper">
                      <Video size={24} className="input-icon" />
                      <input
                        type="url"
                        placeholder="https://www.youtube.com/watch?v=..."
                        value={videoUrl}
                        onChange={(e) => setVideoUrl(e.target.value)}
                        className="url-input"
                        required
                      />
                    </div>
                    <button type="submit" className="btn-primary btn-large btn-generate">
                      <BrainCircuit size={20} />
                      Generate Lesson
                    </button>
                  </form>

                  <div className="example-urls">
                    <p className="example-label">Try these example videos:</p>
                    <div className="example-links">
                      <button 
                        className="example-link"
                        onClick={() => setVideoUrl('https://www.youtube.com/watch?v=SqcY0GlETPk')}
                      >
                        React Tutorial
                      </button>
                      <button 
                        className="example-link"
                        onClick={() => setVideoUrl('https://www.youtube.com/watch?v=_uQrJ0TkZlc')}
                      >
                        Python Basics
                      </button>
                      <button 
                        className="example-link"
                        onClick={() => setVideoUrl('https://www.youtube.com/watch?v=YoCv4HCNI0o')}
                      >
                        Design Principles
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="input-instructions">
                    <BrainCircuit size={48} className="instruction-icon" />
                    <h2>Search for Educational Videos by Topic</h2>
                    <p>Enter any topic you want to learn about, and we'll recommend top-rated educational videos.</p>
                  </div>

                  <form className="generator-form" onSubmit={(e) => {
                    e.preventDefault();
                    handleTopicSearch();
                  }}>
                    <div className="url-input-wrapper">
                      <BrainCircuit size={24} className="input-icon" />
                      <input
                        type="text"
                        placeholder="e.g., Array, Web Development, Machine Learning..."
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="url-input"
                        required
                      />
                    </div>
                    <button type="submit" className="btn-primary btn-large btn-generate">
                      <Sparkles size={20} />
                      Find Top Videos
                    </button>
                  </form>

                  <div className="example-urls">
                    <p className="example-label">Popular topics:</p>
                    <div className="example-links">
                      <button 
                        className="example-link"
                        onClick={() => {
                          setTopic('Array');
                          setRecommendedVideos(getRecommendedVideos('Array'));
                        }}
                      >
                        Arrays
                      </button>
                      <button 
                        className="example-link"
                        onClick={() => {
                          setTopic('Web Development');
                          setRecommendedVideos(getRecommendedVideos('Web Development'));
                        }}
                      >
                        Web Development
                      </button>
                      <button 
                        className="example-link"
                        onClick={() => {
                          setTopic('Machine Learning');
                          setRecommendedVideos(getRecommendedVideos('Machine Learning'));
                        }}
                      >
                        Machine Learning
                      </button>
                      <button 
                        className="example-link"
                        onClick={() => {
                          setTopic('React');
                          setRecommendedVideos(getRecommendedVideos('React'));
                        }}
                      >
                        React
                      </button>
                    </div>
                  </div>

                  {/* Display Recommended Videos */}
                  {recommendedVideos.length > 0 && (
                    <div className="recommended-videos-section">
                      <h3 className="recommended-title">
                        <Sparkles size={24} />
                        Top Recommended Videos for "{topic}"
                      </h3>
                      <div className="playlist-grid">
                        {recommendedVideos.map((video, index) => (
                          <div key={video.id} className="playlist-card" data-aos="zoom-in" data-aos-delay={index * 50}>
                            <a 
                              href={`https://www.youtube.com/watch?v=${video.videoId}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="playlist-thumbnail"
                            >
                              <img src={video.thumbnail} alt={video.title} />
                              <div className="video-duration">{video.duration}</div>
                              <div className="play-overlay">
                                <Play size={32} />
                              </div>
                            </a>
                            <div className="playlist-info">
                              <h3>{video.title}</h3>
                              <p className="playlist-channel">{video.channel}</p>
                              <p className="playlist-views">{video.views} views</p>
                              <div className="video-actions">
                                <a 
                                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="btn-outline btn-small"
                                >
                                  <Play size={16} />
                                  Watch Video
                                </a>
                                <button
                                  className="btn-primary btn-small"
                                  onClick={() => {
                                    window.location.href = `/generator?url=${encodeURIComponent(`https://www.youtube.com/watch?v=${video.videoId}`)}`;
                                  }}
                                >
                                  <BrainCircuit size={16} />
                                  Generate Lesson
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="generator-page">
      <div className="generator-header">
        <div className="container">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <h1 className="lesson-title">{generatedLesson.title}</h1>
          <p className="lesson-meta">
            <Video size={18} />
            Duration: {generatedLesson.duration}
          </p>
        </div>
      </div>

      <div className="generator-content">
        <div className="container">
          <div className="tabs">
            <button 
              className={`tab ${activeTab === 'lesson' ? 'active' : ''}`}
              onClick={() => setActiveTab('lesson')}
            >
              <Play size={20} />
              Lesson
            </button>
            <button 
              className={`tab ${activeTab === 'notes' ? 'active' : ''}`}
              onClick={() => setActiveTab('notes')}
            >
              <FileText size={20} />
              Curated Notes
            </button>
            <button 
              className={`tab ${activeTab === 'quiz' ? 'active' : ''}`}
              onClick={() => setActiveTab('quiz')}
            >
              <BrainCircuit size={20} />
              Interactive Quiz
            </button>
            <button 
              className={`tab ${activeTab === 'playlist' ? 'active' : ''}`}
              onClick={() => setActiveTab('playlist')}
            >
              <List size={20} />
              Curated Playlist
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'lesson' && (
              <div className="lesson-tab">
                <div className="video-container" data-aos="fade-up">
                  {videoId ? (
                    <iframe
                      src={`https://www.youtube.com/embed/${videoId}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  ) : (
                    <div className="video-placeholder">
                      <Video size={64} />
                      <p>Video player will appear here</p>
                    </div>
                  )}
                </div>
                <div className="lesson-info" data-aos="fade-up" data-aos-delay="100">
                  <h2>About This Lesson</h2>
                  <p>
                    This AI-generated lesson breaks down the video content into structured, 
                    easy-to-follow segments with timestamped notes and interactive quizzes.
                  </p>
                  <div className="lesson-features">
                    <div className="feature-badge">
                      <CheckCircle size={18} />
                      AI-Generated Notes
                    </div>
                    <div className="feature-badge">
                      <CheckCircle size={18} />
                      Interactive Quiz
                    </div>
                    <div className="feature-badge">
                      <CheckCircle size={18} />
                      Related Content
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'notes' && (
              <div className="notes-tab">
                <h2 data-aos="fade-up">Curated Notes</h2>
                <p className="tab-description" data-aos="fade-up" data-aos-delay="100">
                  AI-generated summary with time-stamped key points from the video
                </p>
                <div className="notes-list">
                  {generatedLesson.notes.map((note, index) => (
                    <div key={index} className="note-item" data-aos="fade-left" data-aos-delay={index * 50}>
                      <div className="note-timestamp">{note.timestamp}</div>
                      <div className="note-content">{note.content}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'quiz' && (
              <div className="quiz-tab">
                <h2 data-aos="fade-up">Interactive Quiz</h2>
                <p className="tab-description" data-aos="fade-up" data-aos-delay="100">
                  Test your understanding of the key concepts covered in this lesson
                </p>
                
                {!quizSubmitted ? (
                  <>
                    <div className="quiz-questions">
                      {generatedLesson.quiz.map((question, qIndex) => (
                        <div key={question.id} className="quiz-question">
                          <h3>Question {qIndex + 1}</h3>
                          <p className="question-text">{question.question}</p>
                          <div className="quiz-options">
                            {question.options.map((option, oIndex) => (
                              <label key={oIndex} className="quiz-option">
                                <input
                                  type="radio"
                                  name={`question-${question.id}`}
                                  checked={quizAnswers[question.id] === oIndex}
                                  onChange={() => handleQuizAnswer(question.id, oIndex)}
                                />
                                <span>{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                    <button 
                      className="btn-primary btn-large"
                      onClick={submitQuiz}
                      disabled={Object.keys(quizAnswers).length < generatedLesson.quiz.length}
                    >
                      Submit Quiz
                    </button>
                  </>
                ) : (
                  <div className="quiz-results">
                    <div className="results-header">
                      <CheckCircle size={64} />
                      <h2>Quiz Completed!</h2>
                      <p className="score">
                        You scored {getQuizScore().correct} out of {getQuizScore().total}
                      </p>
                    </div>
                    <div className="results-details">
                      {generatedLesson.quiz.map((question, qIndex) => (
                        <div key={question.id} className="result-item">
                          <h4>Question {qIndex + 1}</h4>
                          <p className="question-text">{question.question}</p>
                          <p className={`answer ${quizAnswers[question.id] === question.correctAnswer ? 'correct' : 'incorrect'}`}>
                            Your answer: {question.options[quizAnswers[question.id]]}
                            {quizAnswers[question.id] === question.correctAnswer ? ' ✓' : ' ✗'}
                          </p>
                          {quizAnswers[question.id] !== question.correctAnswer && (
                            <p className="correct-answer">
                              Correct answer: {question.options[question.correctAnswer]}
                            </p>
                          )}
                          {question.explanation && (
                            <p className="explanation">
                              <strong>Explanation:</strong> {question.explanation}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                    <button 
                      className="btn-outline"
                      onClick={() => {
                        setQuizAnswers({});
                        setQuizSubmitted(false);
                      }}
                    >
                      Retake Quiz
                    </button>
                  </div>
                )}
              </div>
            )}

            {activeTab === 'playlist' && (
              <div className="playlist-tab">
                <h2 data-aos="fade-up">Curated Playlist</h2>
                <p className="tab-description" data-aos="fade-up" data-aos-delay="100">
                  Continue your learning journey with these related videos
                </p>
                <div className="playlist-grid">
                  {generatedLesson.relatedVideos.map((video, index) => (
                    <div key={video.id} className="playlist-card" data-aos="zoom-in" data-aos-delay={index * 50}>
                      <a 
                        href={`https://www.youtube.com/watch?v=${video.videoId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="playlist-thumbnail"
                      >
                        <img src={video.thumbnail} alt={video.title} />
                        <div className="video-duration">{video.duration}</div>
                        <div className="play-overlay">
                          <Play size={32} />
                        </div>
                      </a>
                      <div className="playlist-info">
                        <h3>{video.title}</h3>
                        <p className="playlist-channel">{video.channel}</p>
                        <p className="playlist-views">{video.views} views</p>
                        <a 
                          href={`https://www.youtube.com/watch?v=${video.videoId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-outline btn-small"
                        >
                          <Play size={16} />
                          Watch & Learn
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generator;
