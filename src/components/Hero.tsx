import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Play, 
  Sparkles, 
  Globe, 
  Eye, 
  Heart,
  Users,
  Brain,
  Camera,
  Zap,
  X
} from 'lucide-react';

const Hero = () => {
  const navigate = useNavigate();
  const [currentEmotion, setCurrentEmotion] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const emotions = [
    { label: 'Joy', culture: 'Western', color: 'text-yellow-400' },
    { label: 'Ikigai', culture: 'Japanese', color: 'text-blue-400' },
    { label: 'Saudade', culture: 'Portuguese', color: 'text-purple-400' },
    { label: 'Ubuntu', culture: 'African', color: 'text-green-400' },
    { label: 'Hygge', culture: 'Danish', color: 'text-orange-400' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmotion(prev => (prev + 1) % emotions.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: <Eye size={16} />, text: 'See through 50+ cultural perspectives' },
    { icon: <Brain size={16} />, text: 'AI-powered empathy amplification' },
    { icon: <Globe size={16} />, text: 'Real-time cultural translation' },
    { icon: <Heart size={16} />, text: 'Universal emotional understanding' }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(91,192,190,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(91,192,190,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-[#5BC0BE]/10 border border-[#5BC0BE]/20 rounded-full px-4 py-2 mb-6"
        >
          <Sparkles className="h-4 w-4 text-[#5BC0BE]" />
          <span className="text-sm text-gray-300">World's First Empathy AI Mirror</span>
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-[#5BC0BE] to-[#6E44FF]"
        >
          Mirror Me
        </motion.h1>

        {/* Dynamic Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl md:text-3xl mb-4 h-20 flex items-center justify-center"
        >
          <span className="text-gray-300">See your emotions through</span>
          <div className="mx-3 min-w-[200px]">
            <motion.span
              key={currentEmotion}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`font-semibold ${emotions[currentEmotion].color}`}
            >
              {emotions[currentEmotion].culture} eyes
            </motion.span>
          </div>
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed"
        >
          Revolutionary AI that doesn't just understand you—it helps you understand{' '}
          <span className="text-[#5BC0BE] font-medium">everyone</span>. Break down cultural barriers, 
          amplify empathy, and see the world through infinite perspectives.
        </motion.p>

        {/* Feature Pills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-[#1C2541]/60 border border-[#5BC0BE]/20 rounded-full px-4 py-2 text-sm text-gray-300"
            >
              <span className="text-[#5BC0BE]">{feature.icon}</span>
              {feature.text}
            </div>
          ))}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <button
            onClick={() => navigate('/auth')}
            className="group relative bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl hover:shadow-[#6E44FF]/30 transition-all duration-300 flex items-center gap-2"
          >
            <Zap size={20} />
            Experience the Mirror
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button
            onClick={() => setIsPlaying(true)}
            className="group flex items-center gap-3 bg-[#1C2541]/60 border border-[#5BC0BE]/30 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#1C2541]/80 transition-all duration-300"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-[#5BC0BE] rounded-full animate-ping opacity-30" />
              <Play size={20} className="relative z-10 text-[#5BC0BE]" />
            </div>
            Watch Demo
          </button>
        </motion.div>

        {/* Interactive Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Main Mirror Interface */}
          <div className="relative bg-gradient-to-r from-[#1C2541]/60 to-[#0B132B]/60 border border-[#5BC0BE]/20 rounded-2xl p-8 backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-red-400 rounded-full" />
                <div className="w-3 h-3 bg-yellow-400 rounded-full" />
                <div className="w-3 h-3 bg-green-400 rounded-full" />
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Camera size={16} />
                <span>Empathy Mirror Active</span>
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              </div>
            </div>

            {/* Mirror Content */}
            <div className="grid md:grid-cols-2 gap-8">
              {/* Your Perspective */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Eye size={20} className="text-[#5BC0BE]" />
                  Your Perspective
                </h3>
                <div className="bg-[#0B132B]/50 rounded-lg p-4 border border-[#5BC0BE]/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] rounded-full flex items-center justify-center">
                      <Users size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">Your Smile</p>
                      <p className="text-sm text-gray-400">Emotion: Happy</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">
                    "I'm expressing joy and contentment through my facial expression."
                  </p>
                </div>
              </div>

              {/* Cultural Perspective */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                  <Globe size={20} className="text-[#6E44FF]" />
                  {emotions[currentEmotion].culture} Perspective
                </h3>
                <div className="bg-[#0B132B]/50 rounded-lg p-4 border border-[#6E44FF]/10">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-[#6E44FF] to-[#5BC0BE] rounded-full flex items-center justify-center">
                      <Heart size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="text-white font-medium">{emotions[currentEmotion].label}</p>
                      <p className="text-sm text-gray-400">Cultural Context</p>
                    </div>
                  </div>
                  <p className="text-gray-300 text-sm">
                    {currentEmotion === 0 && "This expression shows personal achievement and inner satisfaction."}
                    {currentEmotion === 1 && "This reflects finding purpose and meaning in small moments."}
                    {currentEmotion === 2 && "This carries deep longing mixed with joy - a complex bittersweet feeling."}
                    {currentEmotion === 3 && "This embodies connection and shared humanity with others."}
                    {currentEmotion === 4 && "This shows contentment with simple pleasures and togetherness."}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="mt-6 flex items-center justify-center gap-4">
              <button className="bg-[#5BC0BE]/20 text-[#5BC0BE] px-4 py-2 rounded-lg text-sm hover:bg-[#5BC0BE]/30 transition-colors">
                Try Voice Analysis
              </button>
              <button className="bg-[#6E44FF]/20 text-[#6E44FF] px-4 py-2 rounded-lg text-sm hover:bg-[#6E44FF]/30 transition-colors">
                Cultural Swap
              </button>
              <button className="bg-green-500/20 text-green-400 px-4 py-2 rounded-lg text-sm hover:bg-green-500/30 transition-colors">
                Empathy Bridge
              </button>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute -top-4 -right-4 bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] rounded-lg p-3 border border-white/10 hidden md:block">
            <span className="text-white text-sm font-medium">+85% Empathy Score</span>
          </div>
          
          <div className="absolute -bottom-4 -left-4 bg-[#1C2541]/80 border border-[#5BC0BE]/30 rounded-lg p-3 hidden md:block">
            <span className="text-[#5BC0BE] text-sm font-medium">50+ Cultures</span>
          </div>
        </motion.div>

        {/* Demo Video Modal */}
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
            onClick={() => setIsPlaying(false)}
          >
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              className="bg-[#1C2541] rounded-xl p-6 max-w-4xl w-full border border-[#5BC0BE]/20"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-white">Mirror Me Demo</h3>
                <button
                  onClick={() => setIsPlaying(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="aspect-video bg-[#0B132B] rounded-lg flex items-center justify-center border border-[#5BC0BE]/20">
                <div className="text-center">
                  <Play size={48} className="text-[#5BC0BE] mx-auto mb-4" />
                  <p className="text-gray-400">Interactive demo coming soon</p>
                  <p className="text-sm text-gray-500 mt-2">Experience empathy like never before</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Hero;