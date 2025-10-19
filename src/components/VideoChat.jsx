import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Bot, Send, PlayCircle } from 'lucide-react';
import {
  ExpandableChat,
  ExpandableChatHeader,
  ExpandableChatBody,
  ExpandableChatFooter,
} from './ExpandableChat';
import './VideoChat.css';

// Simple semantic matcher: find relevant notes matching user query
function findRelevantNotes(notes = [], query = '') {
  const q = query.toLowerCase();
  if (!q) return [];
  return notes
    .map((n, idx) => ({ ...n, idx, score: (n.content || '').toLowerCase().includes(q) ? 1 : 0 }))
    .filter((n) => n.score > 0)
    .slice(0, 3);
}

const VideoChat = ({ videoTitle, videoId, notes = [] }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'ai',
      text:
        "Hi! Ask me anything about this video. I can point you to timestamps and explain topics from the notes.",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const contextSummary = useMemo(() => {
    return `Context: ${videoTitle || 'Video'} with ${notes.length} notes.`;
  }, [videoTitle, notes.length]);

  const answerFromNotes = (query) => {
    const hits = findRelevantNotes(notes, query);
    if (hits.length === 0) {
      return (
        "I couldn't find that in the notes. Try asking about a concept from the video, like 'useEffect dependencies' or 'cleanup function'."
      );
    }
    const lines = hits.map(
      (h) => `• [${h.timestamp}] ${h.content}`
    );
    return `Here's what I found related to your question:\n${lines.join('\n')}\n\nTip: Click Generate Lesson to explore the Notes tab for more details.`;
  };

  const onSend = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((m) => [...m, userMsg]);
    setInput('');
    setTyping(true);

    setTimeout(() => {
      const aiText = answerFromNotes(text);
      const aiMsg = {
        id: Date.now() + 1,
        sender: 'ai',
        text: aiText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((m) => [...m, aiMsg]);
      setTyping(false);
    }, 900);
  };

  return (
    <ExpandableChat position="bottom-right" size="lg" icon={<Bot className="h-6 w-6" /> }>
      <ExpandableChatHeader className="vchat-header">
        <div className="vchat-header-meta">
          <div className="vchat-title">Instant Video Help</div>
          <div className="vchat-sub">{videoTitle || 'Current Video'}</div>
        </div>
      </ExpandableChatHeader>

  <ExpandableChatBody className="vchat-body" style={{height: 'calc(100% - 120px)'}}>
        <div className="vchat-context">{contextSummary}</div>
        <div className="vchat-messages">
          {messages.map((m) => (
            <div key={m.id} className={`vmsg ${m.sender === 'user' ? 'vmsg-user' : 'vmsg-ai'}`}>
              <div className="vmsg-bubble">
                {m.text.split('\n').map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
              <span className="vmsg-time">{m.time}</span>
            </div>
          ))}
          {typing && (
            <div className="vmsg vmsg-ai">
              <div className="vmsg-bubble"><span className="dots"><i></i><i></i><i></i></span></div>
            </div>
          )}
          <div ref={endRef} />
        </div>
      </ExpandableChatBody>

      <ExpandableChatFooter className="vchat-footer">
        <form onSubmit={onSend} className="vchat-input-row">
          <input
            className="vchat-input"
            placeholder="Ask about this video (e.g., useEffect cleanup?)"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button type="submit" className="vchat-send" disabled={!input.trim()}>
            <Send size={18} />
          </button>
        </form>
        {videoId && (
          <a
            className="vchat-watch"
            href={`https://www.youtube.com/watch?v=${videoId}`}
            target="_blank"
            rel="noreferrer"
          >
            <PlayCircle size={16} /> Watch on YouTube
          </a>
        )}
      </ExpandableChatFooter>
    </ExpandableChat>
  );
};

export default VideoChat;
