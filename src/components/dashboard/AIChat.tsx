import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageSquare,
  Send,
  Camera,
  CameraOff,
  Mic,
  MicOff,
  Bot,
  User,
  Heart,
  Brain,
  Eye,
  Sparkles,
  Globe,
  Smile,
  Frown,
  Meh,
  AlertCircle
} from 'lucide-react';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: string;
  emotionDetected?: {
    emotion: string;
    confidence: number;
    culturalContext: string;
  };
}

interface EmotionAnalysis {
  primary: string;
  confidence: number;
  cultural: {
    japanese: string;
    brazilian: string;
    african: string;
  };
}

const AIChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [cameraEnabled, setCameraEnabled] = useState(false);
  const [micEnabled, setMicEnabled] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionAnalysis | null>(null);
  const [cameraPermission, setCameraPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const emotionDetectionCleanup = useRef<(() => void) | null>(null);

  // Initialize with welcome message
  useEffect(() => {
    const welcomeMessage: Message = {
      id: 'welcome',
      content: "Hello! I'm your AI empathy companion. I can help you understand emotions from different cultural perspectives. Feel free to enable your camera so I can provide real-time emotion analysis!",
      sender: 'ai',
      timestamp: new Date().toISOString()
    };
    setMessages([welcomeMessage]);
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Cleanup camera on component unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  // Camera setup
  const startCamera = async () => {
    try {
      // Request camera permissions with specific constraints
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: { ideal: 320 },
          height: { ideal: 240 },
          facingMode: 'user'
        },
        audio: false 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        // Wait for video to load and start playing
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
        };
        
        setCameraEnabled(true);
        setCameraPermission('granted');
        
        // Start emotion detection simulation
        const cleanup = startEmotionDetection();
        
        // Store cleanup function
        emotionDetectionCleanup.current = cleanup;
        
        console.log('Camera started successfully');
      }
    } catch (error) {
      console.error('Camera access error:', error);
      setCameraPermission('denied');
      setCameraEnabled(false);
      
      // Add user-friendly error message
      const errorMessage: Message = {
        id: 'camera-error-' + Date.now(),
        content: "I couldn't access your camera. Please make sure you've given permission and try again. You can still chat with me without the camera!",
        sender: 'ai',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => {
        track.stop();
        console.log('Camera track stopped');
      });
      videoRef.current.srcObject = null;
      
      // Clean up emotion detection
      if (emotionDetectionCleanup.current) {
        emotionDetectionCleanup.current();
        emotionDetectionCleanup.current = null;
      }
    }
    setCameraEnabled(false);
    setCurrentEmotion(null);
    console.log('Camera stopped');
  };

  // Simulate emotion detection
  const startEmotionDetection = () => {
    const emotions = [
      { primary: 'happy', confidence: 0.85, cultural: { japanese: 'Yorokobi', brazilian: 'Alegria', african: 'Ubuntu Joy' }},
      { primary: 'calm', confidence: 0.78, cultural: { japanese: 'Heiwa', brazilian: 'Tranquilo', african: 'Peaceful Spirit' }},
      { primary: 'focused', confidence: 0.92, cultural: { japanese: 'Shuchu', brazilian: 'Concentrado', african: 'Deep Thinking' }},
      { primary: 'curious', confidence: 0.73, cultural: { japanese: 'Kyomi', brazilian: 'Curioso', african: 'Seeking Wisdom' }}
    ];

    const interval = setInterval(() => {
      if (cameraEnabled) {
        const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        setCurrentEmotion(randomEmotion);
      }
    }, 3000);

    // Cleanup interval when camera is stopped
    return () => clearInterval(interval);
  };

  // AI Response generation
  const generateAIResponse = (userMessage: string, emotion?: EmotionAnalysis): string => {
    const responses = [
      "I can sense your emotions through the camera. Let me help you understand how different cultures interpret what you're feeling.",
      "That's a fascinating perspective! From a Japanese viewpoint, this emotion might be seen as...",
      "I notice you're expressing curiosity. In Brazilian culture, this kind of openness is deeply valued.",
      "Your expression shows thoughtfulness. Different cultures have unique ways of honoring contemplative states.",
      "I can help you bridge understanding between different cultural interpretations of emotions.",
      "Let's explore how various cultures would perceive and respond to what you're experiencing right now."
    ];

    if (emotion) {
      return `I can see you're feeling ${emotion.primary} (${Math.round(emotion.confidence * 100)}% confidence). In Japanese culture, this might be called "${emotion.cultural.japanese}", while Brazilians might call it "${emotion.cultural.brazilian}". Each culture brings its own beautiful interpretation to human emotions. How does this resonate with your experience?`;
    }

    return responses[Math.floor(Math.random() * responses.length)];
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputText,
      sender: 'user',
      timestamp: new Date().toISOString(),
      emotionDetected: currentEmotion ? {
        emotion: currentEmotion.primary,
        confidence: currentEmotion.confidence,
        culturalContext: `Japanese: ${currentEmotion.cultural.japanese}, Brazilian: ${currentEmotion.cultural.brazilian}`
      } : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: generateAIResponse(inputText, currentEmotion || undefined),
        sender: 'ai',
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'happy': return <Smile className="text-yellow-400" size={16} />;
      case 'calm': return <Heart className="text-blue-400" size={16} />;
      case 'focused': return <Brain className="text-purple-400" size={16} />;
      case 'curious': return <Eye className="text-green-400" size={16} />;
      default: return <Meh className="text-gray-400" size={16} />;
    }
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Bot className="h-8 w-8 text-[#5BC0BE]" />
          <div>
            <h1 className="text-2xl font-bold">AI Empathy Chat</h1>
            <p className="text-sm text-gray-400">Chat with AI that understands cultural emotions</p>
          </div>
        </div>
        
        {/* Camera Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={cameraEnabled ? stopCamera : startCamera}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              cameraEnabled 
                ? 'bg-green-500 text-white' 
                : 'bg-[#1C2541]/40 border border-[#5BC0BE]/20 text-[#5BC0BE]'
            }`}
          >
            {cameraEnabled ? <Camera size={16} /> : <CameraOff size={16} />}
            {cameraEnabled ? 'Camera On' : 'Enable Camera'}
          </button>
        </div>
      </div>

      <div className="flex-1 grid lg:grid-cols-4 gap-6">
        {/* Camera & Emotion Panel */}
        <div className="lg:col-span-1 space-y-4">
          {/* Camera Feed */}
          <div className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl border border-[#5BC0BE]/20 p-4">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <Camera size={16} className="text-[#5BC0BE]" />
              Emotion Detection
            </h3>
            
            <div className="relative aspect-video bg-[#0B132B]/50 rounded-lg overflow-hidden mb-4">
              {cameraEnabled ? (
                <video
                  ref={videoRef}
                  autoPlay
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  style={{ transform: 'scaleX(-1)' }}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <div className="text-center">
                    <CameraOff size={32} className="text-gray-500 mx-auto mb-2" />
                    <p className="text-xs text-gray-500">
                      {cameraPermission === 'denied' ? 'Camera access denied' : 'Camera disabled'}
                    </p>
                    <button
                      onClick={startCamera}
                      className="mt-2 px-3 py-1 bg-[#5BC0BE]/20 text-[#5BC0BE] text-xs rounded-lg hover:bg-[#5BC0BE]/30 transition-colors"
                    >
                      Enable Camera
                    </button>
                  </div>
                </div>
              )}
              
              {cameraEnabled && (
                <div className="absolute top-2 right-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                </div>
              )}
            </div>

            {/* Current Emotion */}
            {currentEmotion && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-[#0B132B]/50 rounded-lg p-3"
              >
                <div className="flex items-center gap-2 mb-2">
                  {getEmotionIcon(currentEmotion.primary)}
                  <span className="font-medium capitalize">{currentEmotion.primary}</span>
                  <span className="text-xs text-gray-400">
                    {Math.round(currentEmotion.confidence * 100)}%
                  </span>
                </div>
                
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Japanese:</span>
                    <span className="text-blue-400">{currentEmotion.cultural.japanese}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Brazilian:</span>
                    <span className="text-green-400">{currentEmotion.cultural.brazilian}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">African:</span>
                    <span className="text-yellow-400">{currentEmotion.cultural.african}</span>
                  </div>
                </div>
              </motion.div>
            )}

            {cameraPermission === 'denied' && (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3">
                <div className="flex items-center gap-2 text-red-400">
                  <AlertCircle size={16} />
                  <span className="text-xs">Camera access denied</span>
                </div>
              </div>
            )}
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-r from-[#5BC0BE]/10 to-[#6E44FF]/10 rounded-xl p-4 border border-[#5BC0BE]/20">
            <h4 className="font-medium text-sm mb-2 flex items-center gap-2">
              <Sparkles size={14} className="text-[#6E44FF]" />
              Tips
            </h4>
            <ul className="text-xs text-gray-300 space-y-1">
              <li>• Enable camera for real-time emotion analysis</li>
              <li>• Ask about cultural perspectives on emotions</li>
              <li>• Explore how different cultures express feelings</li>
            </ul>
          </div>
        </div>

        {/* Chat Area */}
        <div className="lg:col-span-3 flex flex-col">
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
                    {/* Sender Avatar & Info */}
                    <div className={`flex items-center gap-2 mb-2 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                      <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs ${
                        message.sender === 'user' 
                          ? 'bg-[#5BC0BE]/20 text-[#5BC0BE]' 
                          : 'bg-[#6E44FF]/20 text-[#6E44FF]'
                      }`}>
                        {message.sender === 'user' ? <User size={12} /> : <Bot size={12} />}
                        {message.sender === 'user' ? 'You' : 'AI Companion'}
                      </div>
                      {message.emotionDetected && (
                        <div className="flex items-center gap-1 text-xs text-gray-400">
                          {getEmotionIcon(message.emotionDetected.emotion)}
                          <span>{message.emotionDetected.emotion}</span>
                        </div>
                      )}
                    </div>
                    
                    {/* Message Content */}
                    <div className={`p-4 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] text-white'
                        : 'bg-[#0B132B]/50 border border-[#5BC0BE]/20 text-gray-100'
                    }`}>
                      <p className="leading-relaxed">{message.content}</p>
                      
                      {message.emotionDetected && (
                        <div className="mt-3 pt-3 border-t border-white/10">
                          <p className="text-xs opacity-80">
                            🔍 Detected: {message.emotionDetected.culturalContext}
                          </p>
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
                      <Bot size={16} className="text-[#6E44FF]" />
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-[#6E44FF] rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-[#6E44FF] rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-[#6E44FF] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
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
                  placeholder="Ask me about emotions, cultural perspectives, or anything empathy-related..."
                  rows={2}
                  className="w-full bg-[#0B132B]/50 border border-[#5BC0BE]/20 rounded-lg py-2 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#5BC0BE] transition-colors resize-none"
                />
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => setMicEnabled(!micEnabled)}
                  className={`p-2 rounded-lg transition-all duration-300 ${
                    micEnabled 
                      ? 'bg-red-500 text-white' 
                      : 'bg-[#5BC0BE]/20 text-[#5BC0BE] hover:bg-[#5BC0BE]/30'
                  }`}
                  title="Voice input"
                >
                  {micEnabled ? <Mic size={20} /> : <MicOff size={20} />}
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
            
            {currentEmotion && (
              <div className="mt-3 text-xs text-gray-400">
                💡 AI can see you're feeling {currentEmotion.primary} - this context will enhance our conversation
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIChat; 