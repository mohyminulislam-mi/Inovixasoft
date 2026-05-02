'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Minus, Maximize2, User, Bot, Sparkles } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState('');
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const savedId = localStorage.getItem('chat_session_id') || uuidv4();
    if (!localStorage.getItem('chat_session_id')) {
      localStorage.setItem('chat_session_id', savedId);
    }
    
    // Use timeout to avoid synchronous setState inside effect warning
    const timer = setTimeout(() => {
      setSessionId(savedId);
      const savedHistory = localStorage.getItem(`chat_history_${savedId}`);
      if (savedHistory) {
        setMessages(JSON.parse(savedHistory));
      } else {
        const welcome = {
          id: 'welcome',
          sender: 'bot',
          message: 'Hi there! 👋 Welcome to ScalexDevs. How can we help you today?',
          createdAt: new Date().toISOString(),
          isWelcome: true
        };
        setMessages([welcome]);
        localStorage.setItem(`chat_history_${savedId}`, JSON.stringify([welcome]));
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleOpen = () => {
    setIsOpen(true);
    setUnreadCount(0);
  };

  const saveMessages = (newMessages) => {
    setMessages(newMessages);
    localStorage.setItem(`chat_history_${sessionId}`, JSON.stringify(newMessages));
  };

  const handleSend = async (messageText) => {
    const text = messageText || inputValue;
    if (!text.trim()) return;

    setInputValue('');
    const userMsg = {
      id: `user-${new Date().getTime()}`,
      sender: 'user',
      message: text,
      createdAt: new Date().toISOString()
    };

    const updatedWithUser = [...messages, userMsg];
    saveMessages(updatedWithUser);

    setIsTyping(true);

    try {
      const res = await fetch('/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, sender: 'user', message: text })
      });
      const data = await res.json();

      setTimeout(() => {
        setIsTyping(false);
        const botMsg = {
          id: `bot-${new Date().getTime()}`,
          sender: 'bot',
          message: data.reply,
          createdAt: new Date().toISOString()
        };
        const finalMessages = [...updatedWithUser, botMsg];
        saveMessages(finalMessages);
        if (!isOpen) setUnreadCount(prev => prev + 1);
      }, 1500);
    } catch (error) {
      setIsTyping(false);
      console.error('Chat error:', error);
    }
  };

  const quickReplies = [
    { label: "Get a Quote", action: "I'd like to get a quote for a project." },
    { label: "View Services", action: "What services do you offer?" },
    { label: "Book Consultation", action: "I want to book a free consultation." },
    { label: "Talk to Human", action: "Can I speak with a human representative?" }
  ];

  return (
    <div className="fixed bottom-6 right-6 z-[9999] font-body">
      {/* Floating Button */}
      <button
        onClick={isOpen ? () => setIsOpen(false) : handleOpen}
        className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple text-white shadow-2xl flex items-center justify-center relative hover:scale-110 active:scale-95 transition-transform group"
      >
        <AnimatePresence mode='wait'>
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <X size={28} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <MessageSquare size={28} />
            </motion.div>
          )}
        </AnimatePresence>
        
        {!isOpen && unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-bg-primary">
            {unreadCount}
          </span>
        )}

        {!isOpen && (
          <div className="absolute right-full mr-4 bg-bg-card border border-border-primary px-3 py-1.5 rounded-lg whitespace-nowrap text-xs font-bold text-text-primary opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none shadow-xl">
            Chat with us
            <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2 h-2 bg-bg-card border-r border-t border-border-primary rotate-45" />
          </div>
        )}

        <div className="absolute bottom-1 right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-white animate-pulse" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 100, x: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 100, x: 20 }}
            className="absolute bottom-20 right-0 w-[350px] sm:w-[400px] h-[550px] glass-card shadow-2xl flex flex-col overflow-hidden border-brand-blue/20"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-brand-blue to-brand-purple text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
                   <Sparkles size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm">ScalexDevs Support</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-[10px] font-medium opacity-80 uppercase tracking-tighter text-white">Online Now</span>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-white/10 rounded transition-colors">
                  <Minus size={18} />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-bg-secondary/30">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex gap-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border border-border-primary ${msg.sender === 'user' ? 'bg-brand-blue text-white' : 'bg-bg-card'}`}>
                      {msg.sender === 'user' ? <User size={14} /> : <Bot size={14} className="text-brand-purple" />}
                    </div>
                    <div>
                      <div className={`p-3 rounded-2xl text-sm leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-brand-blue text-white rounded-tr-none' 
                          : 'bg-bg-card border border-border-primary rounded-tl-none'
                      }`}>
                        {msg.message}
                      </div>
                      <span className="text-[9px] text-text-muted mt-1 block px-1">
                        {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
              
              {messages.length === 1 && messages[0].isWelcome && (
                <div className="flex flex-wrap gap-2 px-10 pt-2">
                  {quickReplies.map((reply, i) => (
                    <button
                      key={i}
                      onClick={() => handleSend(reply.action)}
                      className="text-[11px] font-bold bg-white/5 border border-border-primary hover:bg-brand-blue/10 hover:border-brand-blue/30 text-text-muted hover:text-brand-blue px-3 py-1.5 rounded-full transition-all"
                    >
                      {reply.label}
                    </button>
                  ))}
                </div>
              )}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex gap-2 items-center bg-bg-card border border-border-primary p-3 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      <span className="w-1.5 h-1.5 bg-brand-purple rounded-full animate-bounce [animation-delay:-0.3s]" />
                      <span className="w-1.5 h-1.5 bg-brand-purple rounded-full animate-bounce [animation-delay:-0.15s]" />
                      <span className="w-1.5 h-1.5 bg-brand-purple rounded-full animate-bounce" />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="p-4 bg-bg-card border-t border-border-primary"
            >
              <div className="flex items-center gap-2 bg-bg-secondary border border-border-primary p-2 rounded-xl focus-within:border-brand-blue transition-colors">
                <input 
                  type="text" 
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-grow bg-transparent outline-none text-sm px-2 text-text-primary"
                />
                <button 
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="w-10 h-10 bg-brand-blue text-white rounded-lg flex items-center justify-center hover:scale-105 active:scale-95 disabled:opacity-50 disabled:scale-100 transition-all shadow-lg"
                >
                  <Send size={18} />
                </button>
              </div>
              <div className="flex justify-between items-center mt-3 px-1">
                 <p className="text-[9px] text-text-muted font-bold uppercase tracking-widest uppercase">Powered by ScalexDevs AI</p>
                 <span className="text-[9px] text-text-muted">{inputValue.length}/500</span>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;
