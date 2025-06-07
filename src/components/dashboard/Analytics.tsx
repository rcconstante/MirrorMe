import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3,
  TrendingUp,
  Calendar,
  Globe,
  Heart,
  Users,
  Activity,
  Target,
  Award,
  Clock,
  MessageSquare,
  Eye,
  BookOpen,
  Sparkles,
  Filter
} from 'lucide-react';

interface MetricData {
  label: string;
  value: number;
  change: number;
  unit?: string;
}

interface ChartData {
  day: string;
  sessions: number;
  empathyScore: number;
  interactions: number;
}

interface CulturalBreakdown {
  culture: string;
  percentage: number;
  growth: number;
  color: string;
}

const Analytics = () => {
  const [timeRange, setTimeRange] = useState<'week' | 'month' | 'year'>('week');
  const [selectedMetric, setSelectedMetric] = useState<'activity' | 'engagement' | 'empathy'>('activity');

  // Mock User Activity Metrics
  const activityMetrics: MetricData[] = [
    { label: 'Total Sessions', value: 147, change: 12, unit: 'sessions' },
    { label: 'Avg. Session Duration', value: 28, change: 15, unit: 'minutes' },
    { label: 'Mirror Sessions', value: 89, change: 8 },
    { label: 'Journal Entries', value: 34, change: 23 },
    { label: 'Simulator Practice', value: 56, change: -5 },
    { label: 'Daily Active Time', value: 2.4, change: 18, unit: 'hours' }
  ];

  // Mock Engagement Metrics
  const engagementMetrics: MetricData[] = [
    { label: 'Cultural Bridges Built', value: 24, change: 33 },
    { label: 'Empathy Connections', value: 156, change: 28 },
    { label: 'Community Interactions', value: 412, change: 19 },
    { label: 'Perspectives Explored', value: 47, change: 41 },
    { label: 'Messages Sent', value: 234, change: 12 },
    { label: 'Profile Views', value: 89, change: 7 }
  ];

  // Mock chart data
  const weeklyData: ChartData[] = [
    { day: 'Mon', sessions: 23, empathyScore: 78, interactions: 45 },
    { day: 'Tue', sessions: 19, empathyScore: 82, interactions: 38 },
    { day: 'Wed', sessions: 25, empathyScore: 85, interactions: 52 },
    { day: 'Thu', sessions: 22, empathyScore: 83, interactions: 41 },
    { day: 'Fri', sessions: 28, empathyScore: 87, interactions: 63 },
    { day: 'Sat', sessions: 15, empathyScore: 88, interactions: 29 },
    { day: 'Sun', sessions: 17, empathyScore: 90, interactions: 33 }
  ];

  // Mock cultural breakdown
  const culturalBreakdown: CulturalBreakdown[] = [
    { culture: 'Japanese', percentage: 28, growth: 12, color: 'from-blue-400 to-blue-600' },
    { culture: 'Brazilian', percentage: 22, growth: 8, color: 'from-green-400 to-green-600' },
    { culture: 'Nigerian', percentage: 18, growth: 23, color: 'from-yellow-400 to-yellow-600' },
    { culture: 'German', percentage: 15, growth: -3, color: 'from-purple-400 to-purple-600' },
    { culture: 'Indian', percentage: 10, growth: 15, color: 'from-orange-400 to-orange-600' },
    { culture: 'Others', percentage: 7, growth: 5, color: 'from-pink-400 to-pink-600' }
  ];

  // Achievement milestones
  const achievements = [
    { icon: <Globe />, title: 'Cultural Explorer', progress: 78, target: 100, unit: 'cultures' },
    { icon: <Heart />, title: 'Empathy Master', progress: 85, target: 100, unit: '%' },
    { icon: <Users />, title: 'Bridge Builder', progress: 64, target: 100, unit: 'connections' },
    { icon: <BookOpen />, title: 'Journal Keeper', progress: 92, target: 100, unit: 'entries' }
  ];

  const getCurrentMetrics = () => {
    switch (selectedMetric) {
      case 'engagement':
        return engagementMetrics;
      case 'empathy':
        return [
          { label: 'Global Empathy Score', value: 87, change: 5, unit: '%' },
          { label: 'Cultural Understanding', value: 92, change: 8, unit: '%' },
          { label: 'Emotion Recognition', value: 78, change: 12, unit: '%' },
          { label: 'Perspective Accuracy', value: 83, change: 3, unit: '%' },
          { label: 'Communication Score', value: 89, change: 7, unit: '%' },
          { label: 'Conflict Resolution', value: 71, change: 15, unit: '%' }
        ];
      default:
        return activityMetrics;
    }
  };

  const maxChartValue = Math.max(...weeklyData.map(d => 
    selectedMetric === 'activity' ? d.sessions : 
    selectedMetric === 'engagement' ? d.interactions : 
    d.empathyScore
  ));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-[#5BC0BE]" />
          <div>
            <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
            <p className="text-sm text-gray-400">Track your empathy journey and growth</p>
          </div>
        </div>
        
        {/* Time Range Selector */}
        <div className="flex gap-2 bg-[#1C2541]/40 p-1 rounded-lg border border-[#5BC0BE]/20">
          {['week', 'month', 'year'].map((range) => (
            <button
              key={range}
              onClick={() => setTimeRange(range as any)}
              className={`px-4 py-2 rounded-md text-sm font-medium capitalize transition-all ${
                timeRange === range 
                  ? 'bg-[#5BC0BE] text-white' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {range}ly
            </button>
          ))}
        </div>
      </div>

      {/* Metric Type Selector */}
      <div className="flex gap-4">
        {[
          { id: 'activity', label: 'User Activity', icon: <Activity size={16} /> },
          { id: 'engagement', label: 'Engagement', icon: <MessageSquare size={16} /> },
          { id: 'empathy', label: 'Empathy Metrics', icon: <Heart size={16} /> }
        ].map((type) => (
          <button
            key={type.id}
            onClick={() => setSelectedMetric(type.id as any)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              selectedMetric === type.id
                ? 'bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] text-white'
                : 'bg-[#1C2541]/40 text-gray-300 hover:text-white border border-[#5BC0BE]/20'
            }`}
          >
            {type.icon}
            {type.label}
          </button>
        ))}
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {getCurrentMetrics().map((metric, index) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl p-4 border border-[#5BC0BE]/20"
          >
            <p className="text-xs text-gray-400 mb-1">{metric.label}</p>
            <p className="text-2xl font-bold">
              {metric.value}{metric.unit === '%' && '%'}
            </p>
            <p className={`text-xs mt-1 flex items-center gap-1 ${
              metric.change > 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              <TrendingUp size={12} className={metric.change < 0 ? 'rotate-180' : ''} />
              {Math.abs(metric.change)}%
            </p>
            {metric.unit && metric.unit !== '%' && (
              <p className="text-xs text-gray-500">{metric.unit}</p>
            )}
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-[#1C2541]/40 backdrop-blur-sm rounded-xl border border-[#5BC0BE]/20 p-6">
          <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <Activity size={20} className="text-[#5BC0BE]" />
            {selectedMetric === 'activity' ? 'Session Activity' : 
             selectedMetric === 'engagement' ? 'Engagement Trends' : 
             'Empathy Progress'} - This {timeRange}
          </h2>
          
          {/* Bar Chart */}
          <div className="relative h-64">
            <div className="absolute inset-0 flex items-end justify-between gap-2">
              {weeklyData.map((data, index) => {
                const value = selectedMetric === 'activity' ? data.sessions : 
                             selectedMetric === 'engagement' ? data.interactions : 
                             data.empathyScore;
                const height = (value / maxChartValue) * 100;
                
                return (
                  <div key={data.day} className="flex-1 flex flex-col items-center">
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: `${height}%` }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                      className="w-full bg-gradient-to-t from-[#5BC0BE] to-[#6E44FF] rounded-t-lg relative group"
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#0B132B] px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                        {value}
                      </div>
                    </motion.div>
                    <p className="text-xs text-gray-400 mt-2">{data.day}</p>
                  </div>
                );
              })}
            </div>
            
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 h-full flex flex-col justify-between text-xs text-gray-500 -ml-8">
              <span>{maxChartValue}</span>
              <span>{Math.floor(maxChartValue * 0.75)}</span>
              <span>{Math.floor(maxChartValue * 0.5)}</span>
              <span>{Math.floor(maxChartValue * 0.25)}</span>
              <span>0</span>
            </div>
          </div>

          {/* Chart Legend */}
          <div className="flex justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] rounded-full" />
              <span className="text-gray-400">
                {selectedMetric === 'activity' ? 'Sessions' : 
                 selectedMetric === 'engagement' ? 'Interactions' : 
                 'Empathy Score'}
              </span>
            </div>
          </div>
        </div>

        {/* Cultural Breakdown */}
        <div className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl border border-[#5BC0BE]/20 p-6">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Globe size={20} className="text-[#5BC0BE]" />
            Cultural Exposure
          </h2>
          
          <div className="space-y-3">
            {culturalBreakdown.map((culture, index) => (
              <motion.div
                key={culture.culture}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">{culture.culture}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm">{culture.percentage}%</span>
                    <span className={`text-xs ${culture.growth > 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {culture.growth > 0 ? '+' : ''}{culture.growth}%
                    </span>
                  </div>
                </div>
                <div className="w-full bg-[#0B132B]/50 rounded-full h-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${culture.percentage}%` }}
                    transition={{ delay: index * 0.05 + 0.2, duration: 0.5 }}
                    className={`h-full rounded-full bg-gradient-to-r ${culture.color}`}
                  />
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-[#0B132B]/30 rounded-lg">
            <p className="text-xs text-gray-400 mb-1">Total Cultural Interactions</p>
            <p className="text-2xl font-bold text-[#5BC0BE]">1,247</p>
            <p className="text-xs text-green-400 mt-1">+18% from last {timeRange}</p>
          </div>
        </div>
      </div>

      {/* Achievement Progress */}
      <div className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl border border-[#5BC0BE]/20 p-6">
        <h2 className="text-lg font-semibold mb-6 flex items-center gap-2">
          <Award size={20} className="text-[#5BC0BE]" />
          Achievement Progress
        </h2>
        
        <div className="grid md:grid-cols-4 gap-6">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="relative w-24 h-24 mx-auto mb-3">
                <svg className="w-24 h-24 transform -rotate-90">
                  <circle
                    cx="48"
                    cy="48"
                    r="36"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="none"
                    className="text-[#0B132B]"
                  />
                  <motion.circle
                    cx="48"
                    cy="48"
                    r="36"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 36}`}
                    initial={{ strokeDashoffset: 2 * Math.PI * 36 }}
                    animate={{ strokeDashoffset: 2 * Math.PI * 36 * (1 - achievement.progress / 100) }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#5BC0BE" />
                      <stop offset="100%" stopColor="#6E44FF" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-[#5BC0BE]">{React.cloneElement(achievement.icon, { size: 24 })}</div>
                </div>
              </div>
              <h3 className="font-medium mb-1">{achievement.title}</h3>
              <p className="text-2xl font-bold text-[#5BC0BE]">{achievement.progress}%</p>
              <p className="text-xs text-gray-400">of {achievement.target} {achievement.unit}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Insights */}
      <div className="bg-gradient-to-r from-[#5BC0BE]/10 to-[#6E44FF]/10 rounded-xl p-6 border border-[#5BC0BE]/20">
        <h3 className="font-semibold mb-4 flex items-center gap-2">
          <Sparkles size={20} className="text-[#6E44FF]" />
          Personalized Insights
        </h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-[#0B132B]/30 rounded-lg p-4">
            <h4 className="font-medium text-sm mb-2 text-[#5BC0BE]">Strength</h4>
            <p className="text-xs text-gray-300">
              You excel at understanding Japanese cultural perspectives with 92% accuracy.
            </p>
          </div>
          <div className="bg-[#0B132B]/30 rounded-lg p-4">
            <h4 className="font-medium text-sm mb-2 text-yellow-400">Opportunity</h4>
            <p className="text-xs text-gray-300">
              Explore more African cultures to expand your global empathy range.
            </p>
          </div>
          <div className="bg-[#0B132B]/30 rounded-lg p-4">
            <h4 className="font-medium text-sm mb-2 text-[#6E44FF]">Recommendation</h4>
            <p className="text-xs text-gray-300">
              Try the Brazilian-German bridge scenario to improve cross-cultural communication.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;