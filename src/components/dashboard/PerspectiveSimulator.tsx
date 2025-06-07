import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Globe, 
  Users, 
  Send, 
  Mic, 
  MessageSquare, 
  Brain, 
  Heart,
  Zap,
  Volume2,
  RefreshCw,
  Star,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  Languages
} from 'lucide-react';

interface Scenario {
  id: string;
  title: string;
  description: string;
  culture1: string;
  culture2: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  icon: React.ReactNode;
  color: string;
}

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'culture1' | 'culture2';
  culturalContext?: string;
  timestamp: string;
  emotionalTone?: string;
  suggestion?: string;
}

interface CulturalInsight {
  culture: string;
  interpretation: string;
  tips: string[];
  doNot: string[];
}

const PerspectiveSimulator = () => {
  const [selectedScenario, setSelectedScenario] = useState<Scenario | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [empathyScore, setEmpathyScore] = useState(0);
  const [showInsights, setShowInsights] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scenarios: Scenario[] = [
    {
      id: '1',
      title: 'Business Negotiation',
      description: 'Navigate a cross-cultural business deal between Japanese and American perspectives',
      culture1: 'Japanese',
      culture2: 'American',
      difficulty: 'intermediate',
      category: 'Professional',
      icon: <Users size={20} />,
      color: 'from-blue-500 to-indigo-600'
    },
    {
      id: '2',
      title: 'Family Gathering',
      description: 'Handle different family values between Nigerian and German cultures',
      culture1: 'Nigerian',
      culture2: 'German',
      difficulty: 'beginner',
      category: 'Personal',
      icon: <Heart size={20} />,
      color: 'from-purple-500 to-pink-600'
    },
    {
      id: '3',
      title: 'Conflict Resolution',
      description: 'Resolve a misunderstanding between Brazilian and Chinese perspectives',
      culture1: 'Brazilian',
      culture2: 'Chinese',
      difficulty: 'advanced',
      category: 'Communication',
      icon: <MessageSquare size={20} />,
      color: 'from-green-500 to-teal-600'
    },
    {
      id: '4',
      title: 'Social Invitation',
      description: 'Understand different social norms between Indian and Scandinavian cultures',
      culture1: 'Indian',
      culture2: 'Scandinavian',
      difficulty: 'beginner',
      category: 'Social',
      icon: <Globe size={20} />,
      color: 'from-orange-500 to-red-600'
    }
  ];

  const getCulturalResponse = (scenario: Scenario, userMessage: string): Message[] => {
    const responses: Message[] = [];
    
    // Culture 1 Response
    const culture1Response: Message = {
      id: Date.now().toString(),
      content: getCultureSpecificResponse(scenario.culture1, userMessage),
      sender: 'culture1',
      culturalContext: `In ${scenario.culture1} culture, this message is interpreted through the lens of ${getCulturalValue(scenario.culture1)}`,
      timestamp: new Date().toISOString(),
      emotionalTone: getEmotionalTone(scenario.culture1)
    };
    
    // Culture 2 Response
    const culture2Response: Message = {
      id: (Date.now() + 1).toString(),
      content: getCultureSpecificResponse(scenario.culture2, userMessage),
      sender: 'culture2',
      culturalContext: `From a ${scenario.culture2} perspective, this reflects ${getCulturalValue(scenario.culture2)}`,
      timestamp: new Date().toISOString(),
      emotionalTone: getEmotionalTone(scenario.culture2)
    };
    
    responses.push(culture1Response, culture2Response);
    return responses;
  };

  const getCultureSpecificResponse = (culture: string, userMessage: string): string => {
    const responses: { [key: string]: string[] } = {
      'Japanese': [
        'I appreciate your perspective. Let me consider this carefully...',
        'This is interesting. Perhaps we could explore a harmonious solution.',
        'I understand. May I suggest we think about the group\'s benefit?'
      ],
      'American': [
        'Great point! Let\'s tackle this head-on.',
        'I like your direct approach. Here\'s what I think...',
        'Interesting! Let me share my thoughts on this.'
      ],
      'Nigerian': [
        'My friend, this reminds me of something our elders say...',
        'Beautiful! Let us consider how this affects our community.',
        'I hear you. In our culture, we believe in Ubuntu - I am because we are.'
      ],
      'German': [
        'This is a logical point. Let\'s examine the facts systematically.',
        'I appreciate the efficiency of your approach. Here\'s my analysis...',
        'Interesting. Let me provide some structured feedback.'
      ],
      'Brazilian': [
        'Que legal! This brings such warm feelings to discuss!',
        'My friend, let\'s find a jeitinho - a creative solution together!',
        'This touches my heart! Let me share how we see this...'
      ],
      'Chinese': [
        'Thank you for sharing. Let me reflect on the harmony of this situation.',
        'I see the wisdom in your words. Perhaps we can find a middle way.',
        'This is thoughtful. Let\'s consider how to maintain face for everyone.'
      ],
      'Indian': [
        'Namaste! Your words carry deep meaning. Let me share our perspective...',
        'This resonates with our ancient wisdom. Perhaps we can blend our views.',
        'Beautiful thought! In our tradition, we see this differently...'
      ],
      'Scandinavian': [
        'This is quite hygge! Let\'s find a cozy consensus.',
        'I appreciate the equality in your approach. Here\'s my thought...',
        'Interesting perspective. Let\'s ensure everyone feels included.'
      ]
    };
    
    const cultureResponses = responses[culture] || responses['American'];
    return cultureResponses[Math.floor(Math.random() * cultureResponses.length)];
  };

  const getCulturalValue = (culture: string): string => {
    const values: { [key: string]: string } = {
      'Japanese': 'harmony and respect',
      'American': 'directness and efficiency',
      'Nigerian': 'community and tradition',
      'German': 'structure and precision',
      'Brazilian': 'warmth and flexibility',
      'Chinese': 'face and hierarchy',
      'Indian': 'spirituality and relationships',
      'Scandinavian': 'equality and consensus'
    };
    return values[culture] || 'cultural understanding';
  };

  const getEmotionalTone = (culture: string): string => {
    const tones: { [key: string]: string } = {
      'Japanese': 'respectful',
      'American': 'confident',
      'Nigerian': 'warm',
      'German': 'analytical',
      'Brazilian': 'enthusiastic',
      'Chinese': 'thoughtful',
      'Indian': 'welcoming',
      'Scandinavian': 'balanced'
    };
    return tones[culture] || 'neutral';
  };

  const handleSendMessage = () => {
    if (!inputText.trim() || !selectedScenario) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputText,
      sender: 'user',
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Calculate empathy score based on message
    const newScore = Math.min(100, empathyScore + Math.floor(Math.random() * 10) + 5);
    setEmpathyScore(newScore);

    // Simulate thinking time
    setTimeout(() => {
      const responses = getCulturalResponse(selectedScenario, inputText);
      setMessages(prev => [...prev, ...responses]);
      setIsTyping(false);
    }, 2000);
  };

  const startScenario = (scenario: Scenario) => {
    setSelectedScenario(scenario);
    setMessages([
      {
        id: 'welcome',
        content: `Welcome to the ${scenario.title} scenario! You'll be practicing communication between ${scenario.culture1} and ${scenario.culture2} perspectives. Remember to consider cultural values and communication styles.`,
        sender: 'culture1',
        timestamp: new Date().toISOString(),
        suggestion: 'Try starting with a greeting that respects both cultures!'
      }
    ]);
    setEmpathyScore(0);
  };

  const resetScenario = () => {
    setSelectedScenario(null);
    setMessages([]);
    setEmpathyScore(0);
    setShowInsights(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-6">
      {!selectedScenario ? (
        // Scenario Selection
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Globe className="h-8 w-8 text-[#5BC0BE]" />
              <div>
                <h1 className="text-2xl font-bold">Perspective Simulator</h1>
                <p className="text-sm text-gray-400">Practice cross-cultural communication in real scenarios</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-[#1C2541]/40 border border-[#5BC0BE]/20 rounded-lg px-4 py-2">
              <TrendingUp size={16} className="text-green-400" />
              <span className="text-sm">Your Cultural IQ: <span className="font-bold text-[#5BC0BE]">Level 7</span></span>
            </div>
          </div>

          {/* Scenario Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {scenarios.map((scenario) => (
              <motion.div
                key={scenario.id}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-[#1C2541]/40 backdrop-blur-sm border border-[#5BC0BE]/20 rounded-xl p-6 hover:border-[#5BC0BE]/40 transition-all duration-300 cursor-pointer"
                onClick={() => startScenario(scenario)}
              >
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${scenario.color}`}>
                    <span className="text-white">{scenario.icon}</span>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-semibold text-lg">{scenario.title}</h3>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        scenario.difficulty === 'beginner' ? 'bg-green-500/20 text-green-400' :
                        scenario.difficulty === 'intermediate' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {scenario.difficulty}
                      </span>
                    </div>
                    
                    <p className="text-gray-400 text-sm mb-3">{scenario.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users size={14} className="text-[#5BC0BE]" />
                        <span className="text-gray-300">{scenario.culture1} ↔ {scenario.culture2}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-2 h-2 bg-[#5BC0BE] rounded-full" />
                        <span className="text-gray-400">{scenario.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  <ArrowRight size={20} className="text-gray-400 mt-2" />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Tips Section */}
          <div className="mt-8 bg-gradient-to-r from-[#5BC0BE]/10 to-[#6E44FF]/10 rounded-xl p-6 border border-[#5BC0BE]/20">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Brain size={20} className="text-[#5BC0BE]" />
              Pro Tips for Cross-Cultural Communication
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-start gap-3">
                <CheckCircle size={16} className="text-green-400 mt-1" />
                <div>
                  <h4 className="font-medium text-sm mb-1">Listen Actively</h4>
                  <p className="text-xs text-gray-400">Pay attention to cultural context, not just words</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={16} className="text-green-400 mt-1" />
                <div>
                  <h4 className="font-medium text-sm mb-1">Avoid Assumptions</h4>
                  <p className="text-xs text-gray-400">Each culture has unique values and norms</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle size={16} className="text-green-400 mt-1" />
                <div>
                  <h4 className="font-medium text-sm mb-1">Show Respect</h4>
                  <p className="text-xs text-gray-400">Acknowledge different perspectives as valid</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        // Conversation Interface
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <button
                onClick={resetScenario}
                className="p-2 hover:bg-[#1C2541]/40 rounded-lg transition-colors"
              >
                <ArrowRight size={20} className="rotate-180" />
              </button>
              
              <div>
                <h2 className="text-lg font-semibold">{selectedScenario.title}</h2>
                <p className="text-sm text-gray-400">{selectedScenario.culture1} ↔ {selectedScenario.culture2}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-[#1C2541]/40 rounded-lg px-3 py-2">
                <Heart size={16} className="text-[#5BC0BE]" />
                <span className="text-sm">Empathy: <span className="font-bold">{empathyScore}%</span></span>
              </div>
              
              <button
                onClick={() => setShowInsights(!showInsights)}
                className={`p-2 rounded-lg transition-colors ${
                  showInsights ? 'bg-[#5BC0BE] text-white' : 'bg-[#1C2541]/40 text-[#5BC0BE]'
                }`}
              >
                <Brain size={20} />
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex gap-6">
            {/* Chat Area */}
            <div className={`flex-1 flex flex-col ${showInsights ? 'lg:flex-[2]' : ''}`}>
              {/* Messages */}
              <div className="flex-1 bg-[#1C2541]/40 backdrop-blur-sm rounded-xl border border-[#5BC0BE]/20 overflow-hidden">
                <div className="h-full overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                        {/* Sender Info */}
                        <div className={`flex items-center gap-2 mb-2 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                          <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
                            message.sender === 'user' ? 'bg-[#5BC0BE]/20 text-[#5BC0BE]' :
                            message.sender === 'culture1' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-purple-500/20 text-purple-400'
                          }`}>
                            {message.sender === 'user' ? <Users size={12} /> : <Globe size={12} />}
                            {message.sender === 'user' ? 'You' : 
                             message.sender === 'culture1' ? selectedScenario.culture1 : selectedScenario.culture2}
                          </div>
                          {message.emotionalTone && (
                            <span className="text-xs text-gray-400">Tone: {message.emotionalTone}</span>
                          )}
                        </div>
                        
                        {/* Message Content */}
                        <div className={`p-4 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] text-white'
                            : 'bg-[#0B132B]/50 border border-[#5BC0BE]/20 text-gray-100'
                        }`}>
                          <p className="leading-relaxed">{message.content}</p>
                          
                          {message.culturalContext && (
                            <div className="mt-3 pt-3 border-t border-white/10">
                              <p className="text-xs opacity-80 italic">{message.culturalContext}</p>
                            </div>
                          )}
                          
                          {message.suggestion && (
                            <div className="mt-3 p-2 bg-white/10 rounded text-xs">
                              💡 {message.suggestion}
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="bg-[#0B132B]/50 border border-[#5BC0BE]/20 text-gray-100 p-4 rounded-lg">
                        <div className="flex items-center gap-2">
                          <Globe size={16} className="text-[#5BC0BE]" />
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
              </div>

              {/* Input Area */}
              <div className="mt-4 bg-[#1C2541]/40 backdrop-blur-sm rounded-xl p-4 border border-[#5BC0BE]/20">
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <textarea
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSendMessage())}
                      placeholder="Type your message considering both cultural perspectives..."
                      rows={2}
                      className="w-full bg-[#0B132B]/50 border border-[#5BC0BE]/20 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#5BC0BE] transition-colors resize-none"
                    />
                  </div>
                  
                  <div className="flex gap-2">
                    <button
                      className="p-2 bg-[#5BC0BE]/20 text-[#5BC0BE] hover:bg-[#5BC0BE]/30 rounded-lg transition-all duration-300"
                      title="Voice input"
                    >
                      <Mic size={20} />
                    </button>
                    
                    <button
                      onClick={handleSendMessage}
                      disabled={!inputText.trim()}
                      className="p-2 bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] text-white rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Send size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Cultural Insights Panel */}
            <AnimatePresence>
              {showInsights && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  className="lg:flex-1 bg-[#1C2541]/40 backdrop-blur-sm rounded-xl border border-[#5BC0BE]/20 p-6 overflow-y-auto"
                >
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Languages size={20} className="text-[#6E44FF]" />
                    Cultural Insights
                  </h3>
                  
                  {/* Culture 1 Insights */}
                  <div className="mb-6">
                    <h4 className="font-medium text-[#5BC0BE] mb-3">{selectedScenario.culture1} Perspective</h4>
                    <div className="space-y-3">
                      <div className="bg-[#0B132B]/30 rounded-lg p-3">
                        <p className="text-sm text-gray-300 mb-2">Communication Style:</p>
                        <p className="text-xs text-gray-400">{getCulturalValue(selectedScenario.culture1)}</p>
                      </div>
                      <div className="bg-[#0B132B]/30 rounded-lg p-3">
                        <p className="text-sm text-gray-300 mb-2">Do's:</p>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>• Show respect for hierarchy</li>
                          <li>• Consider group harmony</li>
                          <li>• Be patient and thoughtful</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Culture 2 Insights */}
                  <div>
                    <h4 className="font-medium text-[#6E44FF] mb-3">{selectedScenario.culture2} Perspective</h4>
                    <div className="space-y-3">
                      <div className="bg-[#0B132B]/30 rounded-lg p-3">
                        <p className="text-sm text-gray-300 mb-2">Communication Style:</p>
                        <p className="text-xs text-gray-400">{getCulturalValue(selectedScenario.culture2)}</p>
                      </div>
                      <div className="bg-[#0B132B]/30 rounded-lg p-3">
                        <p className="text-sm text-gray-300 mb-2">Do's:</p>
                        <ul className="text-xs text-gray-400 space-y-1">
                          <li>• Be direct and clear</li>
                          <li>• Value individual input</li>
                          <li>• Focus on efficiency</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  {/* Empathy Tips */}
                  <div className="mt-6 p-4 bg-gradient-to-r from-[#5BC0BE]/10 to-[#6E44FF]/10 rounded-lg border border-[#5BC0BE]/20">
                    <p className="text-sm font-medium mb-2">💡 Bridge Builder Tip:</p>
                    <p className="text-xs text-gray-300">
                      Try finding common ground between both cultures. Focus on shared human values while respecting differences.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
};

export default PerspectiveSimulator; 