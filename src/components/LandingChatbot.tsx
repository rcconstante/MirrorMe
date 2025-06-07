import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Bot, 
  User, 
  Heart,
  Globe,
  Sparkles,
  ArrowRight,
  Eye,
  Brain,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
  timestamp: Date;
  suggestions?: string[];
}

const LandingChatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Initial welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: '1',
      text: "👋 Hi! I'm Mira, your empathy assistant. I can help you learn about Mirror Me's features and get started with cultural empathy building. What interests you most?",
      sender: 'bot',
      timestamp: new Date(),
      suggestions: [
        "What is Mirror Me?",
        "How does it work?",
        "Is it free?",
        "Show me features"
      ]
    };
    setMessages([welcomeMessage]);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Show notification after 8 seconds if not interacted
  useEffect(() => {
    if (!hasInteracted) {
      const timer = setTimeout(() => {
        if (!isOpen) {
          const chatButton = document.getElementById('chat-button');
          if (chatButton) {
            chatButton.classList.add('animate-pulse');
            setTimeout(() => {
              chatButton.classList.remove('animate-pulse');
            }, 3000);
          }
        }
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, hasInteracted]);

  const botResponses: { [key: string]: { text: string; suggestions?: string[] } } = {
    'what is mirror me': {
      text: "Mirror Me is the world's first AI empathy mirror! 🪞✨ It analyzes your emotions through 50+ cultural perspectives. Think of it as having empathy advisors from every culture helping you understand how your emotions are perceived globally.",
      suggestions: ["How does it work?", "What cultures?", "Try it now"]
    },
    'how does it work': {
      text: "Simple! 📸 Our AI uses your camera to detect emotions, then shows how different cultures interpret them. Japanese might see 'Ma' (meaningful pause), Brazilians see 'Saudade' (thoughtful longing). It's cultural emotion translation!",
      suggestions: ["Is it private?", "What features exist?", "Start using it"]
    },
    'what makes this different': {
      text: "We focus on CULTURAL empathy! 🌍 Other apps just detect emotions - we help you understand how those emotions are perceived across 50+ cultures. This builds real cross-cultural understanding and genuine connections.",
      suggestions: ["What can I do?", "How accurate is it?", "Let's begin"]
    },
    'show me features': {
      text: "Here's what you can do! 🎯\n\n🪞 Empathy Mirror - Live cultural emotion analysis\n🌐 Perspective Trainer - Cross-cultural conversation practice\n📔 Empathy Journal - Track emotional growth\n💬 AI Chat - Real-time cultural insights\n📊 Analytics - Personal empathy metrics",
      suggestions: ["Sounds amazing!", "Is it secure?", "What's the cost?"]
    },
    'cultures': {
      text: "We cover 50+ cultures! 🌏 Japanese, Brazilian, German, Nigerian, Indian, and many more. Each brings unique emotional wisdom from their cultural heritage. New perspectives are added regularly based on user feedback!",
      suggestions: ["How accurate?", "Can I suggest cultures?", "Ready to start"]
    },
    'privacy': {
      text: "Your privacy is our priority! 🔒 All emotion detection happens locally - your face data never leaves your device. We only store anonymized insights to improve cultural understanding. You control everything!",
      suggestions: ["That's great!", "What about my data?", "I'm ready to try"]
    },
    'free': {
      text: "Yes! Empathy should be accessible! 💝 Our core features are completely free. Premium unlocks advanced analytics and priority support, but you can build cultural empathy without paying anything.",
      suggestions: ["Perfect!", "What's premium?", "Let's get started"]
    },
    'ready': {
      text: "Fantastic! 🎉 Ready to start your empathy journey? Click 'Get Started' and you'll create your profile, take a quick culture survey, then dive into cross-cultural understanding. Let's make the world more empathetic together!",
      suggestions: ["Yes, let's go!", "Tell me more", "Maybe later"]
    }
  };

  const generateResponse = (userInput: string): { text: string; suggestions?: string[] } => {
    const input = userInput.toLowerCase();
    
    // Check for matches
    for (const [key, response] of Object.entries(botResponses)) {
      if (input.includes(key.replace(/\s+/g, ' '))) {
        return response;
      }
    }

    // Intent matching
    if (input.includes('start') || input.includes('begin') || input.includes('try') || input.includes('demo')) {
      return botResponses['ready'];
    }
    
    if (input.includes('privacy') || input.includes('secure') || input.includes('safe')) {
      return botResponses['privacy'];
    }
    
    if (input.includes('price') || input.includes('cost') || input.includes('free') || input.includes('pay')) {
      return botResponses['free'];
    }

    if (input.includes('culture') || input.includes('country')) {
      return botResponses['cultures'];
    }

    if (input.includes('feature') || input.includes('can do')) {
      return botResponses['show me features'];
    }

    if (input.includes('work') || input.includes('detect')) {
      return botResponses['how does it work'];
    }

    // Default response
    return {
      text: "Great question! 🤔 I'm here to help you understand Mirror Me. You can ask about features, how it works, privacy, pricing, or anything about cultural empathy building!",
      suggestions: ["What is Mirror Me?", "How does it work?", "Is it secure?", "Show me features"]
    };
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    setHasInteracted(true);
    
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    setTimeout(() => {
      const response = generateResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: 'bot',
        timestamp: new Date(),
        suggestions: response.suggestions
      };

      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1200);
  };

  const handleSuggestionClick = (suggestion: string) => {
    setInputText(suggestion);
    setTimeout(() => handleSendMessage(), 100);
  };

  const handleGetStarted = () => {
    navigate('/auth');
    setIsOpen(false);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        id="chat-button"
        onClick={() => {
          setIsOpen(!isOpen);
          setHasInteracted(true);
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-6 z-40 p-4 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen 
            ? 'bg-red-500/90 hover:bg-red-600' 
            : 'bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] hover:shadow-lg hover:shadow-[#5BC0BE]/30'
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 180, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <X size={24} className="text-white" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 180, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -180, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              <MessageCircle size={24} className="text-white" />
              {!hasInteracted && (
                <motion.div
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ 
              opacity: 1, 
              y: 0, 
              scale: 1,
              height: isMinimized ? 60 : 520
            }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-80 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.2)',
            }}
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#5BC0BE]/20 to-[#6E44FF]/20 p-4 border-b border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] rounded-full flex items-center justify-center">
                      <Bot size={16} className="text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-white/20"></div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Mira</h3>
                    <p className="text-xs text-white/70">Empathy Assistant</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/10 rounded transition-colors"
                >
                  {isMinimized ? (
                    <Maximize2 size={16} className="text-white/70" />
                  ) : (
                    <Minimize2 size={16} className="text-white/70" />
                  )}
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="h-80 overflow-y-auto p-4 space-y-3">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[85%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                        <div className={`p-3 rounded-2xl shadow-lg ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] text-white ml-8'
                            : 'bg-white/90 backdrop-blur-sm text-gray-800 mr-8'
                        }`}>
                          <p className="text-sm leading-relaxed whitespace-pre-line">{message.text}</p>
                        </div>

                        {message.suggestions && message.sender === 'bot' && (
                          <div className="mt-2 space-y-1 mr-8">
                            {message.suggestions.map((suggestion, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleSuggestionClick(suggestion)}
                                className="block w-full text-left text-xs p-2 bg-white/20 hover:bg-white/30 text-white rounded-lg border border-white/20 hover:border-white/40 transition-all backdrop-blur-sm"
                              >
                                {suggestion}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-white/90 backdrop-blur-sm text-gray-800 p-3 rounded-2xl mr-8">
                        <div className="flex items-center gap-2">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-[#5BC0BE] rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-[#5BC0BE] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-[#5BC0BE] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <div className="p-4 border-t border-white/10">
                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={handleGetStarted}
                      className="flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] text-white text-xs rounded-full hover:shadow-lg transition-all"
                    >
                      <ArrowRight size={12} />
                      Get Started
                    </button>
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                      placeholder="Ask me anything..."
                      className="flex-1 bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl py-2 px-3 text-white text-sm placeholder-white/60 focus:outline-none focus:border-white/40 transition-colors"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputText.trim()}
                      className="p-2 bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LandingChatbot; 