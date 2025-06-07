import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Eye, 
  Globe, 
  Camera, 
  Brain, 
  Heart,
  Users,
  Play,
  Pause,
  RotateCcw,
  Zap,
  TrendingUp,
  Smile,
  Frown,
  Meh,
  Settings,
  Sparkles
} from 'lucide-react';

interface CulturalPerspective {
  id: string;
  culture: string;
  region: string;
  emotion: string;
  interpretation: string;
  color: string;
  confidence: number;
  insights: string[];
}

interface EmotionReading {
  primary: string;
  intensity: number;
  cultural_variations: CulturalPerspective[];
  empathy_score: number;
  timestamp: string;
}

const EmpathyMirror = () => {
  const [isActive, setIsActive] = useState(false);
  const [currentReading, setCurrentReading] = useState<EmotionReading | null>(null);
  const [selectedCulture, setSelectedCulture] = useState<string>('all');
  const [empathyHistory, setEmpathyHistory] = useState<EmotionReading[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Mock cultural perspectives database
  const mockCulturalPerspectives: CulturalPerspective[] = [
    {
      id: '1',
      culture: 'Japanese',
      region: 'East Asia',
      emotion: 'Ikigai',
      interpretation: 'This expression shows inner purpose and meaning. In Japanese culture, this subtle contentment reflects finding your reason for being.',
      color: 'from-blue-400 to-indigo-500',
      confidence: 92,
      insights: ['Shows respect through restraint', 'Values harmony over display', 'Inner strength is preferred']
    },
    {
      id: '2',
      culture: 'Brazilian',
      region: 'South America',
      emotion: 'Saudade',
      interpretation: 'This carries beautiful melancholy - joy mixed with longing. Brazilians see deep emotional richness in this expression.',
      color: 'from-yellow-400 to-orange-500',
      confidence: 87,
      insights: ['Emotional depth is valued', 'Community connection', 'Expressive culture']
    },
    {
      id: '3',
      culture: 'German',
      region: 'Northern Europe',
      emotion: 'Gemütlichkeit',
      interpretation: 'This shows warmth and belonging. Germans perceive this as comfort and contentment within community.',
      color: 'from-green-400 to-emerald-500',
      confidence: 89,
      insights: ['Values authenticity', 'Community warmth', 'Understated expression']
    },
    {
      id: '4',
      culture: 'Nigerian',
      region: 'West Africa',
      emotion: 'Ubuntu',
      interpretation: 'This expression embodies collective joy - happiness shared with community. Shows interconnectedness with others.',
      color: 'from-purple-400 to-violet-500',
      confidence: 94,
      insights: ['Community over individual', 'Shared emotional experience', 'Collective consciousness']
    },
    {
      id: '5',
      culture: 'Indian',
      region: 'South Asia',
      emotion: 'Santosha',
      interpretation: 'This reflects inner contentment and acceptance. Shows peace with present circumstances.',
      color: 'from-rose-400 to-pink-500',
      confidence: 91,
      insights: ['Spiritual contentment', 'Present moment awareness', 'Inner peace valued']
    }
  ];

  // Mock emotion detection
  const generateMockReading = (): EmotionReading => {
    const primaryEmotions = ['happy', 'contemplative', 'peaceful', 'curious', 'confident'];
    const primary = primaryEmotions[Math.floor(Math.random() * primaryEmotions.length)];
    
    return {
      primary,
      intensity: Math.floor(Math.random() * 40) + 60, // 60-100%
      cultural_variations: mockCulturalPerspectives.map(culture => ({
        ...culture,
        confidence: Math.floor(Math.random() * 20) + 80 // 80-100%
      })),
      empathy_score: Math.floor(Math.random() * 30) + 70, // 70-100
      timestamp: new Date().toISOString()
    };
  };

  const startMirror = async () => {
    setIsActive(true);
    
    // Mock camera access (in real app, would use getUserMedia)
    if (videoRef.current) {
      // Simulate camera feed
      setInterval(() => {
        if (isActive) {
          const reading = generateMockReading();
          setCurrentReading(reading);
          setEmpathyHistory(prev => [reading, ...prev.slice(0, 9)]); // Keep last 10
        }
      }, 3000);
    }
  };

  const stopMirror = () => {
    setIsActive(false);
    setCurrentReading(null);
  };

  const filteredPerspectives = selectedCulture === 'all' 
    ? currentReading?.cultural_variations || []
    : currentReading?.cultural_variations.filter(p => p.culture.toLowerCase() === selectedCulture) || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Eye className="h-8 w-8 text-[#5BC0BE]" />
          <div>
            <h1 className="text-2xl font-bold">Empathy Mirror</h1>
            <p className="text-sm text-gray-400">See your emotions through 50+ cultural perspectives</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm">
            <div className={`w-3 h-3 rounded-full ${isActive ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`} />
            <span className="text-gray-400">{isActive ? 'Mirror Active' : 'Mirror Inactive'}</span>
          </div>
          
          {!isActive ? (
            <button
              onClick={startMirror}
              className="flex items-center gap-2 bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <Play size={16} />
              Start Mirror
            </button>
          ) : (
            <button
              onClick={stopMirror}
              className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all duration-300"
            >
              <Pause size={16} />
              Stop Mirror
            </button>
          )}
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Video Feed & Controls */}
        <div className="space-y-6">
          {/* Camera Feed */}
          <div className="relative bg-[#1C2541]/40 backdrop-blur-sm rounded-xl border border-[#5BC0BE]/20 overflow-hidden">
            <div className="aspect-video bg-[#0B132B] relative flex items-center justify-center">
              {!isActive ? (
                <div className="text-center">
                  <Camera size={48} className="text-gray-500 mx-auto mb-4" />
                  <p className="text-gray-400">Click "Start Mirror" to begin</p>
                  <p className="text-sm text-gray-500 mt-2">Experience empathy across cultures</p>
                </div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#5BC0BE]/20 to-[#6E44FF]/20 flex items-center justify-center relative">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] rounded-full mx-auto mb-4 flex items-center justify-center">
                      <Users size={32} className="text-white" />
                    </div>
                    <p className="text-white font-medium">Mirror Active</p>
                    <p className="text-sm text-gray-300">Analyzing your emotional expressions</p>
                  </div>
                  
                  {/* Scanning Effect */}
                  <div className="absolute inset-0 border-2 border-[#5BC0BE] animate-pulse rounded-lg" />
                </div>
              )}
            </div>
            
            {/* Current Reading Display */}
            {currentReading && (
              <div className="p-4 bg-[#0B132B]/50">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <Brain size={20} className="text-[#5BC0BE]" />
                    <span className="font-medium">Primary Emotion: {currentReading.primary}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Heart size={16} className="text-red-400" />
                    <span className="text-sm">Empathy Score: {currentReading.empathy_score}/100</span>
                  </div>
                </div>
                
                <div className="w-full bg-[#1C2541] rounded-full h-2 mb-2">
                  <div 
                    className="bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] h-2 rounded-full transition-all duration-500"
                    style={{ width: `${currentReading.intensity}%` }}
                  />
                </div>
                <p className="text-xs text-gray-400">Intensity: {currentReading.intensity}%</p>
              </div>
            )}
          </div>

          {/* Cultural Filter */}
          <div className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl p-6 border border-[#5BC0BE]/20">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Globe size={20} className="text-[#6E44FF]" />
              Cultural Perspective Filter
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <button
                onClick={() => setSelectedCulture('all')}
                className={`p-3 rounded-lg text-sm transition-all ${
                  selectedCulture === 'all'
                    ? 'bg-[#5BC0BE] text-white'
                    : 'bg-[#0B132B]/50 text-gray-300 hover:bg-[#0B132B]/70'
                }`}
              >
                All Cultures
              </button>
              {mockCulturalPerspectives.map((culture) => (
                <button
                  key={culture.id}
                  onClick={() => setSelectedCulture(culture.culture.toLowerCase())}
                  className={`p-3 rounded-lg text-sm transition-all ${
                    selectedCulture === culture.culture.toLowerCase()
                      ? 'bg-[#6E44FF] text-white'
                      : 'bg-[#0B132B]/50 text-gray-300 hover:bg-[#0B132B]/70'
                  }`}
                >
                  {culture.culture}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Cultural Perspectives Display */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Sparkles size={20} className="text-yellow-400" />
            Cultural Perspectives
            {filteredPerspectives.length > 0 && (
              <span className="text-sm text-gray-400">({filteredPerspectives.length} perspectives)</span>
            )}
          </h2>

          <div className="space-y-4 max-h-[600px] overflow-y-auto">
            {filteredPerspectives.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <Globe size={48} className="mx-auto mb-4 opacity-50" />
                <p>Start the mirror to see cultural perspectives</p>
                <p className="text-sm mt-2">Discover how different cultures interpret your emotions</p>
              </div>
            ) : (
              <AnimatePresence>
                {filteredPerspectives.map((perspective, index) => (
                  <motion.div
                    key={perspective.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl p-6 border border-[#5BC0BE]/20 hover:border-[#5BC0BE]/40 transition-all duration-300"
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-r ${perspective.color} flex items-center justify-center`}>
                          <Globe size={20} className="text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{perspective.culture}</h3>
                          <p className="text-sm text-gray-400">{perspective.region}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="text-lg font-bold text-[#5BC0BE]">{perspective.emotion}</div>
                        <div className="text-xs text-gray-400">{perspective.confidence}% confidence</div>
                      </div>
                    </div>

                    {/* Interpretation */}
                    <p className="text-gray-300 mb-4 leading-relaxed">
                      {perspective.interpretation}
                    </p>

                    {/* Cultural Insights */}
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-gray-400">Cultural Insights:</h4>
                      <div className="space-y-1">
                        {perspective.insights.map((insight, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                            <div className="w-1 h-1 bg-[#5BC0BE] rounded-full" />
                            {insight}
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      {/* Empathy History */}
      {empathyHistory.length > 0 && (
        <div className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl p-6 border border-[#5BC0BE]/20">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp size={20} className="text-green-400" />
            Empathy Journey
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {empathyHistory.slice(0, 5).map((reading, index) => (
              <div key={index} className="text-center p-3 bg-[#0B132B]/30 rounded-lg">
                <div className="text-2xl font-bold text-[#5BC0BE] mb-1">{reading.empathy_score}</div>
                <div className="text-xs text-gray-400 mb-1">{reading.primary}</div>
                <div className="text-xs text-gray-500">
                  {new Date(reading.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpathyMirror; 