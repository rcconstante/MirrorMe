import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  Heart, 
  Eye, 
  Globe, 
  TrendingUp, 
  Calendar,
  Users,
  Brain,
  Activity,
  Plus,
  MessageSquare,
  Clock,
  Zap,
  Sparkles
} from 'lucide-react';

const Overview = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const stats = [
    { 
      icon: <Heart size={24} />, 
      label: 'Empathy Score', 
      value: '89/100', 
      change: '+12',
      color: 'text-green-400 bg-green-400/20'
    },
    { 
      icon: <Globe size={24} />, 
      label: 'Cultures Experienced', 
      value: '42', 
      change: '+8',
      color: 'text-blue-400 bg-blue-400/20'
    },
    { 
      icon: <Eye size={24} />, 
      label: 'Perspective Switches', 
      value: '156', 
      change: '+23',
      color: 'text-purple-400 bg-purple-400/20'
    },
    { 
      icon: <TrendingUp size={24} />, 
      label: 'Understanding Level', 
      value: 'Advanced', 
      change: '+2 levels',
      color: 'text-yellow-400 bg-yellow-400/20'
    }
  ];

  const quickActions = [
    {
      title: 'Experience Empathy Mirror',
      description: 'See your emotions through 50+ cultural lenses',
      icon: <Eye size={24} />,
      action: () => navigate('/dashboard/empathy-mirror'),
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Perspective Simulator',
      description: 'Practice cross-cultural conversations',
      icon: <Globe size={24} />,
      action: () => navigate('/dashboard/perspective-simulator'),
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Cultural Challenge',
      description: 'Test your empathy across cultures',
      icon: <Zap size={24} />,
      action: () => navigate('/dashboard/analytics'),
      color: 'from-green-500 to-green-600'
    }
  ];

  const recentActivities = [
    {
      type: 'mirror',
      title: 'Empathy Mirror: Japanese Perspective',
      time: '2 hours ago',
      culture: 'Japanese',
      emotion: 'Ikigai',
      icon: <Eye size={16} />
    },
    {
      type: 'simulator',
      title: 'Conversation with Brazilian Culture',
      time: '1 day ago', 
      culture: 'Brazilian',
      emotion: 'Saudade',
      icon: <Globe size={16} />
    },
    {
      type: 'challenge',
      title: 'Cultural Empathy Challenge Completed',
      time: '2 days ago',
      culture: 'Global',
      emotion: 'Unity',
      icon: <Zap size={16} />
    }
  ];

  const cultureColors = {
    Japanese: 'text-blue-400',
    Brazilian: 'text-yellow-400',
    Global: 'text-green-400',
    German: 'text-orange-400',
    Nigerian: 'text-purple-400'
  };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.name || 'Friend'}! 🌍
          </h1>
          <p className="text-gray-400 mt-1">
            Your empathy journey continues. Ready to see through new cultural perspectives?
          </p>
        </div>
        <div className="text-sm text-gray-400 flex items-center gap-2">
          <Clock size={16} />
          {new Date().toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </div>

      {/* Empathy Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl p-6 border border-[#5BC0BE]/20 hover:border-[#5BC0BE]/40 transition-all duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-2 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
              <span className="text-gray-400">{stat.label}</span>
            </div>
            <div className="flex items-end justify-between">
              <span className="text-2xl font-bold">{stat.value}</span>
              <span className={`text-sm ${
                stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.change}
              </span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
        className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl p-6 border border-[#5BC0BE]/20"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Sparkles size={20} className="text-[#5BC0BE]" />
          Empathy Experiences
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {quickActions.map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`p-4 rounded-lg bg-gradient-to-r ${action.color} text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
            >
              <div className="flex items-center gap-3 mb-2">
                {action.icon}
                <h3 className="font-semibold">{action.title}</h3>
              </div>
              <p className="text-sm opacity-90">{action.description}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Today's Cultural Insight */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.5 }}
        className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl p-6 border border-[#5BC0BE]/20"
      >
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <Brain size={20} className="text-[#5BC0BE]" />
          Today's Cultural Insight
        </h2>
        <div className="bg-gradient-to-r from-[#5BC0BE]/20 to-[#6E44FF]/20 rounded-lg p-4 border border-[#5BC0BE]/30">
          <p className="text-gray-300 leading-relaxed">
            "Understanding is a three-edged sword: your side, their side, and the truth." 
            Your growing empathy across {stats[1].value} cultures shows remarkable progress in global understanding. 
            Each perspective you experience brings us closer to universal empathy! 🤝
          </p>
        </div>
      </motion.div>

      {/* Recent Activity & Cultural Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.6 }}
          className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl p-6 border border-[#5BC0BE]/20"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Activity size={20} className="text-[#5BC0BE]" />
            Recent Empathy Experiences
          </h2>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-[#0B132B]/30 hover:bg-[#0B132B]/50 transition-colors">
                <div className="p-2 rounded-full bg-[#5BC0BE]/20 text-[#5BC0BE]">
                  {activity.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{activity.title}</h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-400">{activity.time}</span>
                    <span className={`text-xs ${cultureColors[activity.culture as keyof typeof cultureColors]}`}>
                      • {activity.emotion}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button 
            onClick={() => navigate('/dashboard/analytics')}
            className="w-full mt-4 text-center text-[#5BC0BE] hover:text-[#6E44FF] transition-colors"
          >
            View All Experiences →
          </button>
        </motion.div>

        {/* Global Empathy Network */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.7 }}
          className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl p-6 border border-[#5BC0BE]/20"
        >
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Globe size={20} className="text-[#5BC0BE]" />
            Global Empathy Network
          </h2>
          
          {/* Global Stats */}
          <div className="space-y-4 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Active Empathy Builders</span>
              <span className="text-[#5BC0BE] font-semibold">2,547,392</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Cultural Bridges Built</span>
              <span className="text-green-400 font-semibold">14,283,940</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Conflicts Prevented</span>
              <span className="text-yellow-400 font-semibold">892,047</span>
            </div>
          </div>

          {/* Live Activity */}
          <div className="bg-[#0B132B]/30 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Live Global Activity</h3>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-gray-300">Someone in Tokyo just experienced Nigerian Ubuntu</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
                <span className="text-gray-300">Cultural bridge built between Brazil & Germany</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
                <span className="text-gray-300">Empathy challenge completed in India</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Overview;