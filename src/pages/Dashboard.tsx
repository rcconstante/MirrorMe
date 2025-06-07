import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import {
  BrainCircuit,
  LayoutDashboard,
  MessageSquare,
  Users,
  Settings as SettingsIcon,
  BarChart,
  LogOut,
  Menu,
  X,
  Eye,
  Globe,
  BookOpen,
  Sparkles
} from 'lucide-react';
import BoltLogo from '../components/BoltLogo';

// Dashboard components
const Overview = React.lazy(() => import('../components/dashboard/Overview'));
const EmpathyMirror = React.lazy(() => import('../components/dashboard/EmpathyMirror'));
const PerspectiveSimulator = React.lazy(() => import('../components/dashboard/PerspectiveSimulator'));
const EmpathyJournal = React.lazy(() => import('../components/dashboard/EmpathyJournal'));
const AIChat = React.lazy(() => import('../components/dashboard/AIChat'));
const Community = React.lazy(() => import('../components/dashboard/Community'));
const Analytics = React.lazy(() => import('../components/dashboard/Analytics'));
const Settings = React.lazy(() => import('../components/dashboard/Settings'));
const CameraTest = React.lazy(() => import('../components/CameraTest'));

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const navItems = [
    { icon: <LayoutDashboard size={20} />, label: 'Overview', path: '/dashboard', badge: null },
    { icon: <Eye size={20} />, label: 'Empathy Mirror', path: '/dashboard/empathy-mirror', badge: null },
    { icon: <Globe size={20} />, label: 'Perspective', path: '/dashboard/perspective-simulator', badge: null },
    { icon: <BookOpen size={20} />, label: 'Empathy Journal', path: '/dashboard/journal', badge: '2' },
    { icon: <MessageSquare size={20} />, label: 'AI Chat', path: '/dashboard/ai-chat', badge: 'NEW' },
    { icon: <Users size={20} />, label: 'Global Network', path: '/dashboard/community', badge: '24' },
    { icon: <BarChart size={20} />, label: 'Analytics', path: '/dashboard/analytics', badge: null },
    { icon: <SettingsIcon size={20} />, label: 'Settings', path: '/dashboard/settings', badge: null }
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/auth');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B132B] to-[#1C2541] text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(91,192,190,0.1),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(110,68,255,0.1),transparent_50%)]" />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(91,192,190,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(91,192,190,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Bolt.new Logo */}
      <BoltLogo position="top-right" size="sm" />

      {/* Mobile Sidebar Toggle */}
      <motion.button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="lg:hidden fixed top-4 left-4 z-50 p-3 bg-[#1C2541]/90 backdrop-blur-md rounded-xl border border-[#5BC0BE]/30 hover:border-[#5BC0BE]/60 transition-all duration-300 shadow-lg"
      >
        <motion.div
          animate={{ rotate: isSidebarOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isSidebarOpen ? <X size={24} className="text-[#5BC0BE]" /> : <Menu size={24} className="text-[#5BC0BE]" />}
        </motion.div>
      </motion.button>

      {/* Sidebar */}
      <AnimatePresence>
        <motion.aside
          initial={{ x: -300 }}
          animate={{ x: isSidebarOpen ? 0 : -300 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 100 }}
          className={`fixed top-0 left-0 h-full w-64 bg-[#1C2541]/90 backdrop-blur-md border-r border-[#5BC0BE]/20 p-6 z-40`}
        >
          {/* Logo */}
          <div className="flex items-center gap-3 mb-8">
            <div className="relative">
              <BrainCircuit className="h-8 w-8 text-[#5BC0BE]" />
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 rounded-full border-2 border-[#5BC0BE]/20 border-t-[#5BC0BE]"
              />
            </div>
            <div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF]">
                Mirror Me
              </span>
              <p className="text-xs text-gray-400">Empathy Platform</p>
            </div>
          </div>

          {/* User Info */}
          {user && (
            <div className="mb-6 p-4 bg-gradient-to-r from-[#0B132B]/60 to-[#1C2541]/60 rounded-xl border border-[#5BC0BE]/20 backdrop-blur-sm">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#5BC0BE] via-[#6E44FF] to-[#5BC0BE] rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg">
                      {(user.displayName || user.nickname || user.name || 'Demo User').charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-[#1C2541] animate-pulse"></div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">
                    {user.displayName || user.nickname || user.name || 'Demo User'}
                  </p>
                  <p className="text-xs text-gray-300">
                    {user.nationality && user.primaryLanguage 
                      ? `${user.nationality} • ${user.primaryLanguage} Speaker`
                      : 'Level 7 Empathy Builder'}
                  </p>
                  {/* Empathy Score */}
                  <div className="flex items-center gap-2 mt-1">
                    <div className="w-full bg-[#0B132B]/50 rounded-full h-1.5">
                      <motion.div 
                        className="bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] h-1.5 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: '87%' }}
                        transition={{ duration: 2, delay: 0.5 }}
                      />
                    </div>
                    <span className="text-xs text-[#5BC0BE] font-medium">87%</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation */}
          <nav className="space-y-2">
            {navItems.map((item) => (
              <motion.button
                key={item.path}
                onClick={() => navigate(item.path)}
                whileHover={{ x: 6, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 relative overflow-hidden group ${
                  location.pathname === item.path
                    ? 'bg-gradient-to-r from-[#5BC0BE]/20 to-[#6E44FF]/20 text-white border border-[#5BC0BE]/30 shadow-lg'
                    : 'hover:bg-gradient-to-r hover:from-[#5BC0BE]/10 hover:to-[#6E44FF]/10 text-gray-300 hover:text-white hover:border-[#5BC0BE]/20 border border-transparent'
                }`}
              >
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute inset-0 bg-gradient-to-r from-[#5BC0BE]/10 to-[#6E44FF]/10 rounded-lg"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                
                {/* Icon */}
                <span className={`relative z-10 transition-colors duration-300 ${
                  location.pathname === item.path ? 'text-[#5BC0BE]' : 'group-hover:text-[#5BC0BE]'
                }`}>
                  {item.icon}
                </span>
                
                {/* Label */}
                <span className="relative z-10 font-medium flex-1 text-left">{item.label}</span>
                
                {/* Badge */}
                {item.badge && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className={`relative z-10 px-2 py-0.5 text-xs font-bold rounded-full ${
                      item.badge === 'NEW'
                        ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white'
                        : 'bg-gradient-to-r from-[#6E44FF] to-[#5BC0BE] text-white'
                    }`}
                  >
                    {item.badge}
                  </motion.span>
                )}
                
                {/* Active indicator */}
                {location.pathname === item.path && (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                    className="absolute right-2"
                  >
                    <Sparkles size={14} className="text-[#5BC0BE]" />
                  </motion.div>
                )}
                
                {/* Hover glow */}
                <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-[#5BC0BE]/5 to-[#6E44FF]/5" />
              </motion.button>
            ))}
          </nav>

          {/* Logout */}
          <motion.button
            onClick={handleLogout}
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.98 }}
            className="absolute bottom-6 left-6 right-6 flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-red-500/10 border border-transparent hover:border-red-500/20 transition-all duration-300"
          >
            <LogOut size={20} />
            <span>Logout</span>
          </motion.button>
        </motion.aside>
      </AnimatePresence>

      {/* Main Content */}
      <main className={`min-h-screen transition-all duration-300 ${isSidebarOpen ? 'lg:ml-64' : 'ml-0'} relative z-10`}>
        <div className="p-6">
          <React.Suspense fallback={
            <div className="flex items-center justify-center h-[calc(100vh-3rem)]">
              <div className="text-center">
                <div className="relative">
                  {/* Multi-layer loading animation */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                    className="w-20 h-20 border-4 border-[#5BC0BE]/20 border-t-[#5BC0BE] rounded-full mx-auto mb-4"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1 left-1/2 transform -translate-x-1/2 w-16 h-16 border-4 border-[#6E44FF]/20 border-b-[#6E44FF] rounded-full"
                  />
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute top-6 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] rounded-full opacity-60"
                  />
                </div>
                
                <motion.div
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <p className="text-gray-300 font-medium mb-2">Loading empathy experience...</p>
                  <p className="text-xs text-gray-500">Preparing your personalized dashboard</p>
                </motion.div>
                
                {/* Loading dots */}
                <div className="flex justify-center gap-1 mt-4">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -10, 0] }}
                      transition={{ 
                        duration: 0.6, 
                        repeat: Infinity, 
                        delay: i * 0.2 
                      }}
                      className="w-2 h-2 bg-[#5BC0BE] rounded-full"
                    />
                  ))}
                </div>
              </div>
            </div>
          }>
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <Routes>
                  <Route path="/" element={<Overview />} />
                  <Route path="/empathy-mirror" element={<EmpathyMirror />} />
                  <Route path="/perspective-simulator" element={<PerspectiveSimulator />} />
                  <Route path="/journal" element={<EmpathyJournal />} />
                  <Route path="/ai-chat" element={<AIChat />} />
                  <Route path="/community" element={<Community />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/camera-test" element={<CameraTest />} />
                </Routes>
              </motion.div>
            </AnimatePresence>
          </React.Suspense>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;