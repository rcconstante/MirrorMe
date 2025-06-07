import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, 
  Globe, 
  Heart, 
  MessageSquare, 
  TrendingUp,
  Sparkles,
  Map,
  UserPlus,
  Shield,
  Award,
  Activity,
  Clock,
  Filter,
  Search,
  ChevronRight,
  Star
} from 'lucide-react';

interface GlobalUser {
  id: string;
  name: string;
  country: string;
  culture: string;
  empathyScore: number;
  level: number;
  status: 'online' | 'active' | 'offline';
  lastActivity: string;
  contribution: string;
}

interface CulturalBridge {
  id: string;
  culture1: string;
  culture2: string;
  participants: number;
  strength: number;
  recentActivity: string;
}

interface GlobalEvent {
  id: string;
  type: 'bridge' | 'milestone' | 'challenge';
  title: string;
  description: string;
  timestamp: string;
  location: string;
  impact: number;
}

const Community = () => {
  const [activeView, setActiveView] = useState<'map' | 'users' | 'bridges'>('map');
  const [selectedRegion, setSelectedRegion] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [liveEvents, setLiveEvents] = useState<GlobalEvent[]>([]);
  
  // Mock data for global users
  const globalUsers: GlobalUser[] = [
    {
      id: '1',
      name: 'Yuki Tanaka',
      country: 'Japan',
      culture: 'Japanese',
      empathyScore: 92,
      level: 9,
      status: 'online',
      lastActivity: '2 minutes ago',
      contribution: 'Built 47 cultural bridges'
    },
    {
      id: '2',
      name: 'Maria Silva',
      country: 'Brazil',
      culture: 'Brazilian',
      empathyScore: 88,
      level: 8,
      status: 'active',
      lastActivity: '15 minutes ago',
      contribution: 'Helped 156 people understand Saudade'
    },
    {
      id: '3',
      name: 'Hans Mueller',
      country: 'Germany',
      culture: 'German',
      empathyScore: 85,
      level: 7,
      status: 'online',
      lastActivity: '1 hour ago',
      contribution: 'Created 23 empathy experiences'
    },
    {
      id: '4',
      name: 'Amara Okafor',
      country: 'Nigeria',
      culture: 'Nigerian',
      empathyScore: 94,
      level: 10,
      status: 'active',
      lastActivity: '30 minutes ago',
      contribution: 'Master of Ubuntu philosophy'
    },
    {
      id: '5',
      name: 'Priya Patel',
      country: 'India',
      culture: 'Indian',
      empathyScore: 90,
      level: 8,
      status: 'online',
      lastActivity: '5 minutes ago',
      contribution: 'Connected 89 global perspectives'
    }
  ];

  // Mock cultural bridges
  const culturalBridges: CulturalBridge[] = [
    {
      id: '1',
      culture1: 'Japanese',
      culture2: 'American',
      participants: 12847,
      strength: 87,
      recentActivity: 'Business communication workshop completed'
    },
    {
      id: '2',
      culture1: 'Brazilian',
      culture2: 'German',
      participants: 8934,
      strength: 72,
      recentActivity: 'Emotional expression exchange session'
    },
    {
      id: '3',
      culture1: 'Indian',
      culture2: 'Scandinavian',
      participants: 6521,
      strength: 65,
      recentActivity: 'Work-life balance perspectives shared'
    }
  ];

  // Simulate live events
  useEffect(() => {
    const generateEvent = (): GlobalEvent => {
      const types: GlobalEvent['type'][] = ['bridge', 'milestone', 'challenge'];
      const locations = ['Tokyo', 'São Paulo', 'Berlin', 'Lagos', 'Mumbai', 'Stockholm'];
      const templates = {
        bridge: [
          'Cultural bridge built between {location1} and {location2}',
          'New understanding formed across cultures'
        ],
        milestone: [
          '{user} reached Level {level} Empathy Builder',
          '{count} empathy connections made today'
        ],
        challenge: [
          'Global Empathy Challenge started in {location}',
          'New perspective simulator scenario unlocked'
        ]
      };

      const type = types[Math.floor(Math.random() * types.length)];
      const location = locations[Math.floor(Math.random() * locations.length)];

      return {
        id: Date.now().toString(),
        type,
        title: `${type === 'bridge' ? '🌉' : type === 'milestone' ? '🏆' : '🎯'} Activity in ${location}`,
        description: templates[type][Math.floor(Math.random() * templates[type].length)]
          .replace('{location}', location)
          .replace('{location1}', location)
          .replace('{location2}', locations[Math.floor(Math.random() * locations.length)])
          .replace('{user}', 'Someone')
          .replace('{level}', Math.floor(Math.random() * 10 + 1).toString())
          .replace('{count}', Math.floor(Math.random() * 1000 + 100).toString()),
        timestamp: new Date().toISOString(),
        location,
        impact: Math.floor(Math.random() * 100)
      };
    };

    // Add initial events
    setLiveEvents([generateEvent(), generateEvent(), generateEvent()]);

    // Add new events periodically
    const interval = setInterval(() => {
      setLiveEvents(prev => [generateEvent(), ...prev.slice(0, 4)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const globalStats = {
    totalUsers: 2547392,
    activeBridges: 14283,
    conflictsPrevented: 892047,
    empathyScore: 87
  };

  const regions = [
    { id: 'all', name: 'Global', count: globalStats.totalUsers },
    { id: 'asia', name: 'Asia', count: 987654 },
    { id: 'americas', name: 'Americas', count: 654321 },
    { id: 'europe', name: 'Europe', count: 543210 },
    { id: 'africa', name: 'Africa', count: 321098 },
    { id: 'oceania', name: 'Oceania', count: 41009 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Globe className="h-8 w-8 text-[#5BC0BE]" />
          <div>
            <h1 className="text-2xl font-bold">Global Empathy Network</h1>
            <p className="text-sm text-gray-400">Connect with empathy builders worldwide</p>
          </div>
        </div>
        
        {/* View Switcher */}
        <div className="flex gap-2 bg-[#1C2541]/40 p-1 rounded-lg border border-[#5BC0BE]/20">
          <button
            onClick={() => setActiveView('map')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeView === 'map' 
                ? 'bg-[#5BC0BE] text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Map size={16} className="inline mr-2" />
            Global Map
          </button>
          <button
            onClick={() => setActiveView('users')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeView === 'users' 
                ? 'bg-[#5BC0BE] text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Users size={16} className="inline mr-2" />
            Users
          </button>
          <button
            onClick={() => setActiveView('bridges')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
              activeView === 'bridges' 
                ? 'bg-[#5BC0BE] text-white' 
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <Heart size={16} className="inline mr-2" />
            Bridges
          </button>
        </div>
      </div>

      {/* Global Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl p-6 border border-[#5BC0BE]/20"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-[#5BC0BE]/20">
              <Users size={20} className="text-[#5BC0BE]" />
            </div>
            <span className="text-sm text-gray-400">Active Builders</span>
          </div>
          <p className="text-2xl font-bold">{globalStats.totalUsers.toLocaleString()}</p>
          <p className="text-xs text-green-400 mt-1">+12% this month</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl p-6 border border-[#5BC0BE]/20"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-purple-500/20">
              <Heart size={20} className="text-purple-400" />
            </div>
            <span className="text-sm text-gray-400">Cultural Bridges</span>
          </div>
          <p className="text-2xl font-bold">{globalStats.activeBridges.toLocaleString()}</p>
          <p className="text-xs text-green-400 mt-1">+847 today</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl p-6 border border-[#5BC0BE]/20"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-yellow-500/20">
              <Shield size={20} className="text-yellow-400" />
            </div>
            <span className="text-sm text-gray-400">Conflicts Prevented</span>
          </div>
          <p className="text-2xl font-bold">{globalStats.conflictsPrevented.toLocaleString()}</p>
          <p className="text-xs text-green-400 mt-1">Through empathy</p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl p-6 border border-[#5BC0BE]/20"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <TrendingUp size={20} className="text-green-400" />
            </div>
            <span className="text-sm text-gray-400">Global Empathy</span>
          </div>
          <p className="text-2xl font-bold">{globalStats.empathyScore}%</p>
          <p className="text-xs text-green-400 mt-1">+3% improvement</p>
        </motion.div>
      </div>

      {/* Main Content Area */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Main View */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {activeView === 'map' && (
              <motion.div
                key="map"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl border border-[#5BC0BE]/20 p-6"
              >
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Map size={20} className="text-[#5BC0BE]" />
                  Global Empathy Heatmap
                </h2>
                
                {/* Regions */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
                  {regions.map(region => (
                    <button
                      key={region.id}
                      onClick={() => setSelectedRegion(region.id)}
                      className={`p-3 rounded-lg text-sm transition-all ${
                        selectedRegion === region.id
                          ? 'bg-[#5BC0BE] text-white'
                          : 'bg-[#0B132B]/50 text-gray-300 hover:bg-[#0B132B]/70'
                      }`}
                    >
                      <p className="font-medium">{region.name}</p>
                      <p className="text-xs opacity-80">{region.count.toLocaleString()} users</p>
                    </button>
                  ))}
                </div>

                {/* Map Visualization Placeholder */}
                <div className="relative h-64 bg-[#0B132B]/50 rounded-lg flex items-center justify-center border border-[#5BC0BE]/10">
                  <div className="text-center">
                    <Globe className="h-16 w-16 text-[#5BC0BE] mx-auto mb-4 animate-pulse" />
                    <p className="text-gray-400">Interactive Global Map</p>
                    <p className="text-sm text-gray-500 mt-2">
                      Showing empathy connections across {selectedRegion === 'all' ? 'the world' : regions.find(r => r.id === selectedRegion)?.name}
                    </p>
                  </div>
                  
                  {/* Mock connection lines */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-1/4 left-1/4 w-px h-32 bg-gradient-to-b from-[#5BC0BE]/50 to-transparent transform rotate-45" />
                    <div className="absolute top-1/3 right-1/3 w-px h-24 bg-gradient-to-b from-[#6E44FF]/50 to-transparent transform -rotate-45" />
                    <div className="absolute bottom-1/4 left-1/3 w-px h-20 bg-gradient-to-b from-[#5BC0BE]/50 to-transparent transform rotate-12" />
                  </div>
                </div>
              </motion.div>
            )}

            {activeView === 'users' && (
              <motion.div
                key="users"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl border border-[#5BC0BE]/20 p-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold flex items-center gap-2">
                    <Users size={20} className="text-[#5BC0BE]" />
                    Top Empathy Builders
                  </h2>
                  
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search users..."
                      className="pl-10 pr-4 py-2 bg-[#0B132B]/50 border border-[#5BC0BE]/20 rounded-lg text-sm text-white placeholder-gray-400 focus:outline-none focus:border-[#5BC0BE]"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  {globalUsers.filter(user => 
                    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    user.country.toLowerCase().includes(searchQuery.toLowerCase())
                  ).map((user) => (
                    <motion.div
                      key={user.id}
                      whileHover={{ x: 4 }}
                      className="flex items-center justify-between p-4 bg-[#0B132B]/50 rounded-lg border border-[#5BC0BE]/10 hover:border-[#5BC0BE]/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] rounded-full flex items-center justify-center">
                            <span className="text-white font-bold">{user.name.charAt(0)}</span>
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-[#1C2541] ${
                            user.status === 'online' ? 'bg-green-400' : 
                            user.status === 'active' ? 'bg-yellow-400' : 'bg-gray-400'
                          }`} />
                        </div>
                        
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium">{user.name}</h3>
                            <span className="text-xs px-2 py-1 bg-[#5BC0BE]/20 text-[#5BC0BE] rounded-full">
                              Level {user.level}
                            </span>
                          </div>
                          <p className="text-sm text-gray-400">
                            {user.country} • {user.culture} • {user.lastActivity}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">{user.contribution}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className="flex items-center gap-1 text-[#5BC0BE]">
                          <Heart size={16} />
                          <span className="font-bold">{user.empathyScore}</span>
                        </div>
                        <button className="text-xs text-gray-400 hover:text-white mt-1">
                          Connect →
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeView === 'bridges' && (
              <motion.div
                key="bridges"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl border border-[#5BC0BE]/20 p-6"
              >
                <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <Heart size={20} className="text-[#5BC0BE]" />
                  Active Cultural Bridges
                </h2>

                <div className="space-y-4">
                  {culturalBridges.map((bridge) => (
                    <div
                      key={bridge.id}
                      className="bg-[#0B132B]/50 rounded-lg p-5 border border-[#5BC0BE]/10"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] rounded-full flex items-center justify-center text-xs font-bold">
                              {bridge.culture1.charAt(0)}
                            </div>
                            <div className="w-8 h-8 bg-gradient-to-r from-[#6E44FF] to-[#5BC0BE] rounded-full flex items-center justify-center text-xs font-bold -ml-2">
                              {bridge.culture2.charAt(0)}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-medium">
                              {bridge.culture1} ↔ {bridge.culture2}
                            </h3>
                            <p className="text-xs text-gray-400">
                              {bridge.participants.toLocaleString()} participants
                            </p>
                          </div>
                        </div>
                        
                        <div className="text-right">
                          <div className="text-sm font-bold text-[#5BC0BE]">
                            {bridge.strength}% Strong
                          </div>
                        </div>
                      </div>
                      
                      <div className="w-full bg-[#1C2541] rounded-full h-2 mb-3">
                        <div 
                          className="bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] h-2 rounded-full"
                          style={{ width: `${bridge.strength}%` }}
                        />
                      </div>
                      
                      <p className="text-xs text-gray-400">
                        <Activity size={12} className="inline mr-1" />
                        {bridge.recentActivity}
                      </p>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] text-white py-3 rounded-lg font-medium hover:shadow-lg transition-all">
                  Build New Cultural Bridge
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right: Live Activity Feed */}
        <div className="space-y-6">
          {/* Live Events */}
          <div className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl border border-[#5BC0BE]/20 p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Activity size={20} className="text-[#5BC0BE]" />
              Live Global Activity
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </h2>

            <div className="space-y-3">
              <AnimatePresence>
                {liveEvents.map((event) => (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-3 bg-[#0B132B]/50 rounded-lg border border-[#5BC0BE]/10"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        event.type === 'bridge' ? 'bg-blue-500/20 text-blue-400' :
                        event.type === 'milestone' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-green-500/20 text-green-400'
                      }`}>
                        {event.type === 'bridge' ? <Heart size={16} /> :
                         event.type === 'milestone' ? <Award size={16} /> :
                         <Sparkles size={16} />}
                      </div>
                      
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{event.title}</h4>
                        <p className="text-xs text-gray-400 mt-1">{event.description}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                          <span>
                            <Clock size={10} className="inline mr-1" />
                            Just now
                          </span>
                          <span>
                            <TrendingUp size={10} className="inline mr-1" />
                            +{event.impact} impact
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Join Community CTA */}
          <div className="bg-gradient-to-r from-[#5BC0BE]/20 to-[#6E44FF]/20 rounded-xl p-6 border border-[#5BC0BE]/30">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <UserPlus size={20} className="text-[#5BC0BE]" />
              Join the Movement
            </h3>
            <p className="text-sm text-gray-300 mb-4">
              Connect with empathy builders worldwide and help create a more understanding world.
            </p>
            <button className="w-full bg-white text-[#0B132B] py-2 rounded-lg font-medium hover:bg-gray-100 transition-all">
              Start Building Bridges
            </button>
          </div>

          {/* Achievements */}
          <div className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl border border-[#5BC0BE]/20 p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Star size={20} className="text-yellow-400" />
              Your Achievements
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                  <Globe size={20} className="text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm font-medium">Cultural Explorer</p>
                  <p className="text-xs text-gray-400">Connected with 10+ cultures</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#5BC0BE]/20 rounded-lg flex items-center justify-center">
                  <Heart size={20} className="text-[#5BC0BE]" />
                </div>
                <div>
                  <p className="text-sm font-medium">Bridge Builder</p>
                  <p className="text-xs text-gray-400">Created 5 cultural connections</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;