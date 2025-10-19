import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from './ExpandableChat';
import './AIChat.css';

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm your AI learning assistant. I can help you with:\n• Finding the right courses\n• Explaining difficult concepts\n• Recommending study materials\n• Answering questions about any topic\n\nWhat would you like to learn today?",
      sender: 'ai',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simulate AI response (replace with actual AI API call)
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage);
      const aiMessage = {
        id: messages.length + 2,
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateAIResponse = (userInput) => {
    const input = userInput.toLowerCase();
    
    // Topic recommendations
    if (input.includes('recommend') || input.includes('suggest') || input.includes('course')) {
      return "Based on your interests, I recommend:\n\n📚 For Beginners:\n• Web Development Fundamentals\n• Python Programming Basics\n• Data Structures 101\n\n🚀 Advanced:\n• Machine Learning with Python\n• React Advanced Patterns\n• Blockchain Development\n\nWould you like me to create a custom learning path for any of these?";
    }
    
    // Questions about topics
    if (input.includes('what is') || input.includes('explain') || input.includes('how')) {
      return "That's a great question! 🤓\n\nI can help explain that concept in detail. Here's what I suggest:\n\n1. Check out our curated courses on this topic\n2. I can generate a custom lesson from YouTube videos\n3. Take interactive quizzes to test your understanding\n\nWould you like me to find some video resources on this topic?";
    }
    
    // Learning path
    if (input.includes('learn') || input.includes('start') || input.includes('begin')) {
      return "Awesome! Let's create your learning path! 🎯\n\nTo get started:\n1. Visit our Custom Course Generator\n2. Paste a YouTube video URL or search by topic\n3. Get AI-generated notes, quizzes, and playlists\n\nWhat topic interests you most? I can help you find the best resources!";
    }
    
    // Help with specific topics
    if (input.includes('help') || input.includes('stuck') || input.includes('difficult')) {
      return "Don't worry, I'm here to help! 💪\n\nTell me:\n• What topic are you working on?\n• What specific part is challenging?\n• Have you tried our interactive quizzes?\n\nI can break down complex concepts and find easier explanations for you!";
    }
    
    // Default response
    return "I understand you're interested in learning more! 🌟\n\nHere's how I can assist:\n• Search for courses by topic\n• Generate custom lessons from videos\n• Explain concepts in simple terms\n• Create personalized study plans\n\nFeel free to ask me anything about your learning journey!";
  };

  const quickPrompts = [
    "Recommend a course for beginners",
    "Explain machine learning",
    "How do I start learning web development?",
    "Help me understand React hooks"
  ];

  return (
    <ExpandableChat 
      position="bottom-right" 
      size="lg"
      icon={<Bot className="h-6 w-6" />}
    >
      <ExpandableChatHeader className="ai-chat-header">
        <div className="flex items-center gap-3">
          <div className="ai-avatar">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="font-bold text-lg">STUD AI Assistant</h3>
            <p className="text-sm text-gray-500">Always here to help you learn</p>
          </div>
        </div>
      </ExpandableChatHeader>

      <ExpandableChatBody className="ai-chat-body">
        <div className="messages-container">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'user' ? 'message-user' : 'message-ai'}`}
            >
              <div className="message-avatar">
                {message.sender === 'user' ? (
                  <User size={18} />
                ) : (
                  <Bot size={18} />
                )}
              </div>
              <div className="message-content">
                <div className="message-bubble">
                  <p className="message-text">{message.text}</p>
                </div>
                <span className="message-time">{message.timestamp}</span>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="message message-ai">
              <div className="message-avatar">
                <Bot size={18} />
              </div>
              <div className="message-content">
                <div className="message-bubble">
                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {messages.length === 1 && (
          <div className="quick-prompts">
            <p className="quick-prompts-title">Quick questions:</p>
            {quickPrompts.map((prompt, index) => (
              <button
                key={index}
                className="quick-prompt-btn"
                onClick={() => setInputMessage(prompt)}
              >
                {prompt}
              </button>
            ))}
          </div>
        )}
      </ExpandableChatBody>

      <ExpandableChatFooter className="ai-chat-footer">
        <form onSubmit={handleSendMessage} className="chat-input-form">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Ask me anything about learning..."
            className="chat-input"
          />
          <button 
            type="submit" 
            className="chat-send-btn"
            disabled={!inputMessage.trim()}
          >
            <Send size={20} />
          </button>
        </form>
        <p className="chat-disclaimer">
          AI responses are generated to assist your learning journey
        </p>
      </ExpandableChatFooter>
    </ExpandableChat>
  );
};

export default AIChat;
