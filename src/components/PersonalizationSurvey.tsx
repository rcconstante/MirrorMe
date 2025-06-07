import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  User,
  Globe,
  Languages,
  MapPin,
  Heart,
  Brain,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Check
} from 'lucide-react';
import BoltLogo from './BoltLogo';

interface SurveyData {
  nickname: string;
  primaryLanguage: string;
  nationality: string;
  culturalBackground: string;
  empathyGoals: string[];
  interests: string[];
}

interface PersonalizationSurveyProps {
  onComplete: (data: SurveyData) => void;
}

const PersonalizationSurvey: React.FC<PersonalizationSurveyProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [surveyData, setSurveyData] = useState<SurveyData>({
    nickname: '',
    primaryLanguage: '',
    nationality: '',
    culturalBackground: '',
    empathyGoals: [],
    interests: []
  });

  const languages = [
    'English', 'Spanish', 'Mandarin', 'Hindi', 'Arabic', 'Portuguese',
    'Bengali', 'Russian', 'Japanese', 'German', 'French', 'Korean',
    'Italian', 'Turkish', 'Vietnamese', 'Thai', 'Other'
  ];

  const nationalities = [
    'United States', 'China', 'India', 'Brazil', 'Nigeria', 'Indonesia',
    'Pakistan', 'Bangladesh', 'Russia', 'Mexico', 'Japan', 'Germany',
    'Philippines', 'Egypt', 'United Kingdom', 'France', 'Italy', 'South Korea',
    'Spain', 'Canada', 'Australia', 'Other'
  ];

  const empathyGoals = [
    { id: 'cultural', label: 'Understand different cultures', icon: <Globe size={20} /> },
    { id: 'communication', label: 'Improve cross-cultural communication', icon: <Languages size={20} /> },
    { id: 'relationships', label: 'Build stronger relationships', icon: <Heart size={20} /> },
    { id: 'conflict', label: 'Resolve conflicts better', icon: <Brain size={20} /> },
    { id: 'business', label: 'Enhance business interactions', icon: <MapPin size={20} /> },
    { id: 'personal', label: 'Personal growth and awareness', icon: <Sparkles size={20} /> }
  ];

  const interests = [
    'Art & Culture', 'Business', 'Education', 'Technology', 'Health & Wellness',
    'Travel', 'Philosophy', 'Psychology', 'History', 'Literature', 'Music',
    'Social Justice', 'Environment', 'Politics', 'Science'
  ];

  const steps = [
    {
      title: 'Welcome to Mirror Me!',
      subtitle: "Let's personalize your empathy journey",
      content: (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-24 h-24 mx-auto mb-4 relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] rounded-full opacity-20" />
              <Globe className="w-24 h-24 text-[#5BC0BE]" />
            </motion.div>
            <p className="text-gray-300">
              Mirror Me helps you see the world through everyone else's eyes.
              Let's learn about you to create your personalized experience.
            </p>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              What should we call you?
            </label>
            <input
              type="text"
              value={surveyData.nickname}
              onChange={(e) => setSurveyData({ ...surveyData, nickname: e.target.value })}
              placeholder="Enter your nickname"
              className="w-full bg-[#0B132B]/50 border border-[#5BC0BE]/20 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#5BC0BE] transition-colors"
            />
          </div>
        </div>
      )
    },
    {
      title: 'Language & Culture',
      subtitle: 'Help us understand your background',
      content: (
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-3">
              What's your primary language?
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setSurveyData({ ...surveyData, primaryLanguage: lang })}
                  className={`p-3 rounded-lg text-sm transition-all ${
                    surveyData.primaryLanguage === lang
                      ? 'bg-[#5BC0BE] text-white'
                      : 'bg-[#0B132B]/50 text-gray-300 hover:bg-[#0B132B]/70 border border-[#5BC0BE]/20'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              What's your nationality?
            </label>
            <select
              value={surveyData.nationality}
              onChange={(e) => setSurveyData({ ...surveyData, nationality: e.target.value })}
              className="w-full bg-[#0B132B]/50 border border-[#5BC0BE]/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#5BC0BE] transition-colors"
            >
              <option value="">Select your nationality</option>
              {nationalities.map((nation) => (
                <option key={nation} value={nation} className="bg-[#0B132B]">
                  {nation}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Cultural background (optional)
            </label>
            <input
              type="text"
              value={surveyData.culturalBackground}
              onChange={(e) => setSurveyData({ ...surveyData, culturalBackground: e.target.value })}
              placeholder="e.g., Japanese-American, Afro-Brazilian"
              className="w-full bg-[#0B132B]/50 border border-[#5BC0BE]/20 rounded-lg py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:border-[#5BC0BE] transition-colors"
            />
          </div>
        </div>
      )
    },
    {
      title: 'Your Empathy Goals',
      subtitle: 'What would you like to achieve?',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-400 mb-4">Select all that apply</p>
          
          <div className="grid md:grid-cols-2 gap-3">
            {empathyGoals.map((goal) => (
              <button
                key={goal.id}
                onClick={() => {
                  const newGoals = surveyData.empathyGoals.includes(goal.id)
                    ? surveyData.empathyGoals.filter(g => g !== goal.id)
                    : [...surveyData.empathyGoals, goal.id];
                  setSurveyData({ ...surveyData, empathyGoals: newGoals });
                }}
                className={`flex items-center gap-3 p-4 rounded-lg text-left transition-all ${
                  surveyData.empathyGoals.includes(goal.id)
                    ? 'bg-[#5BC0BE]/20 border-2 border-[#5BC0BE]'
                    : 'bg-[#0B132B]/50 border-2 border-[#5BC0BE]/20 hover:border-[#5BC0BE]/40'
                }`}
              >
                <div className={`p-2 rounded-lg ${
                  surveyData.empathyGoals.includes(goal.id)
                    ? 'bg-[#5BC0BE] text-white'
                    : 'bg-[#1C2541] text-[#5BC0BE]'
                }`}>
                  {goal.icon}
                </div>
                <span className="flex-1">{goal.label}</span>
                {surveyData.empathyGoals.includes(goal.id) && (
                  <Check size={20} className="text-[#5BC0BE]" />
                )}
              </button>
            ))}
          </div>
        </div>
      )
    },
    {
      title: 'Your Interests',
      subtitle: 'Help us tailor content to your preferences',
      content: (
        <div className="space-y-4">
          <p className="text-sm text-gray-400 mb-4">Select topics you're interested in</p>
          
          <div className="flex flex-wrap gap-3">
            {interests.map((interest) => (
              <button
                key={interest}
                onClick={() => {
                  const newInterests = surveyData.interests.includes(interest)
                    ? surveyData.interests.filter(i => i !== interest)
                    : [...surveyData.interests, interest];
                  setSurveyData({ ...surveyData, interests: newInterests });
                }}
                className={`px-4 py-2 rounded-full text-sm transition-all ${
                  surveyData.interests.includes(interest)
                    ? 'bg-[#5BC0BE] text-white'
                    : 'bg-[#0B132B]/50 text-gray-300 hover:bg-[#0B132B]/70 border border-[#5BC0BE]/20'
                }`}
              >
                {interest}
              </button>
            ))}
          </div>
        </div>
      )
    }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(surveyData);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 0:
        return surveyData.nickname.trim().length > 0;
      case 1:
        return surveyData.primaryLanguage && surveyData.nationality;
      case 2:
        return surveyData.empathyGoals.length > 0;
      case 3:
        return surveyData.interests.length > 0;
      default:
        return true;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B132B] to-[#1C2541] text-white flex items-center justify-center p-6">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(91,192,190,0.1),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(110,68,255,0.1),transparent_50%)]" />
      
      {/* Bolt.new Logo */}
      <BoltLogo position="top-right" size="sm" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-2xl"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between mb-2">
            {steps.map((_, index) => (
              <div
                key={index}
                className={`flex-1 h-2 rounded-full mx-1 transition-all duration-300 ${
                  index <= currentStep
                    ? 'bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF]'
                    : 'bg-[#1C2541]/50'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-gray-400 text-center">
            Step {currentStep + 1} of {steps.length}
          </p>
        </div>

        {/* Survey Content */}
        <div className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl border border-[#5BC0BE]/20 p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-2xl font-bold mb-2">{steps[currentStep].title}</h2>
              <p className="text-gray-400 mb-8">{steps[currentStep].subtitle}</p>
              
              {steps[currentStep].content}
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handlePrev}
              disabled={currentStep === 0}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
                currentStep === 0
                  ? 'opacity-50 cursor-not-allowed text-gray-500'
                  : 'text-[#5BC0BE] hover:bg-[#5BC0BE]/10'
              }`}
            >
              <ChevronLeft size={20} />
              Previous
            </button>

            <button
              onClick={handleNext}
              disabled={!isStepValid()}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${
                isStepValid()
                  ? 'bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] text-white hover:shadow-lg'
                  : 'bg-gray-600 text-gray-400 cursor-not-allowed'
              }`}
            >
              {currentStep === steps.length - 1 ? 'Complete' : 'Next'}
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Skip Option */}
        {currentStep === 0 && (
          <button
            onClick={() => onComplete({
              nickname: 'Guest',
              primaryLanguage: 'English',
              nationality: 'Global Citizen',
              culturalBackground: '',
              empathyGoals: ['cultural'],
              interests: ['Culture']
            })}
            className="w-full text-center text-gray-400 hover:text-white mt-4 text-sm transition-colors"
          >
            Skip personalization for now
          </button>
        )}
      </motion.div>
    </div>
  );
};

export default PersonalizationSurvey; 