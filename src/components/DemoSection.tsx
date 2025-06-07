import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Send } from 'lucide-react';

const DemoSection: React.FC = () => {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState<{ sender: string; text: string; }[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Add sample conversation when component first becomes visible
  useEffect(() => {
    if (inView && conversation.length === 0) {
      const initialMessages = [
        { sender: 'user', text: 'I\'m feeling anxious about a presentation tomorrow.' },
        { sender: 'mirror', text: 'I understand that anxiety. From my analysis, your expression shows tension in your brow. In many cultures, this is a universal sign of worry.' },
        { sender: 'mirror', text: 'Would you like me to show you how others might perceive and handle this situation? I can offer perspectives from different cultural viewpoints.' }
      ];
      
      let timer = 0;
      initialMessages.forEach((msg, index) => {
        setTimeout(() => {
          setConversation(prev => [...prev, msg]);
          if (index < initialMessages.length - 1) {
            setIsTyping(true);
            setTimeout(() => setIsTyping(false), 1000);
          }
        }, timer);
        timer += 2000;
      });
    }
  }, [inView, conversation.length]);

  // Scroll to bottom of chat when new messages arrive
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [conversation]);

  const handleSendMessage = () => {
    if (message.trim() === '') return;
    
    // Add user message
    setConversation(prev => [...prev, { sender: 'user', text: message }]);
    setMessage('');
    
    // Simulate AI response
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setConversation(prev => [
        ...prev, 
        { 
          sender: 'mirror', 
          text: 'I notice you\'re expressing concern. Let me help you understand this from multiple perspectives. Would you like to explore how different cultural backgrounds might approach this situation?' 
        }
      ]);
    }, 2000);
  };

  return (
    <section id="demo" className="py-20 px-6 relative">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] mx-2">
              Mirror Me
            </span>
            in Action
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            See how our AI helps bridge understanding and build empathy in real conversations
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl overflow-hidden border border-[#5BC0BE]/20">
            <div className="p-4 border-b border-[#5BC0BE]/20 flex items-center">
              <div className="w-3 h-3 rounded-full bg-[#5BC0BE] mr-2 animate-pulse"></div>
              <span className="text-[#5BC0BE] font-medium">Mirror Me AI</span>
            </div>
            
            <div 
              ref={chatRef}
              className="h-96 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-[#5BC0BE]/20 scrollbar-track-transparent"
            >
              {conversation.map((msg, index) => (
                <div 
                  key={index}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div 
                    className={`max-w-[80%] rounded-2xl p-4 ${
                      msg.sender === 'user' 
                        ? 'bg-[#5BC0BE] text-white rounded-tr-none' 
                        : 'bg-[#1C2541]/60 border border-[#5BC0BE]/20 rounded-tl-none'
                    }`}
                  >
                    <p>{msg.text}</p>
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#1C2541]/60 border border-[#5BC0BE]/20 rounded-2xl rounded-tl-none p-4">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 rounded-full bg-[#5BC0BE] animate-bounce" style={{ animationDelay: '0ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-[#5BC0BE] animate-bounce" style={{ animationDelay: '150ms' }}></div>
                      <div className="w-2 h-2 rounded-full bg-[#5BC0BE] animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t border-[#5BC0BE]/20">
              <div className="flex">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 bg-[#0B132B]/50 text-white rounded-l-full py-3 px-4 outline-none focus:ring-2 focus:ring-[#5BC0BE]/50"
                />
                <button 
                  onClick={handleSendMessage}
                  className="bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] text-white rounded-r-full px-4 flex items-center justify-center"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-gray-400 text-sm">
              This is a simplified demo. The actual Mirror Me AI incorporates facial recognition, 
              emotion detection, and cultural context analysis to provide deeper insights.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoSection;