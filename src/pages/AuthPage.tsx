import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, Mail, Lock, User, ArrowLeft, AlertCircle, CheckCircle } from 'lucide-react';
import ParticleBackground from '../components/3d/ParticleBackground';
import BoltLogo from '../components/BoltLogo';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState<'success' | 'error' | ''>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    // Basic validation
    if (!email || !password) {
      setMessage('Please fill in all required fields');
      setMessageType('error');
      setLoading(false);
      return;
    }

    if (!isLogin && !name) {
      setMessage('Please enter your name');
      setMessageType('error');
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage('Password must be at least 6 characters long');
      setMessageType('error');
      setLoading(false);
      return;
    }

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    if (isLogin) {
      // Mock login validation
      if (email === 'demo@mirrorme.com' && password === 'demo123') {
        setMessage('Login successful! Welcome back!');
        setMessageType('success');
        // Check if user has completed survey and get their data
        const existingProfile = localStorage.getItem('userProfile');
        const userProfile = existingProfile ? JSON.parse(existingProfile) : null;
        
        const userData = { 
          email, 
          name: userProfile?.nickname || 'Demo User',
          displayName: userProfile?.nickname || 'Demo User',
          nickname: userProfile?.nickname || 'Demo User'
        };
        
        localStorage.setItem('user', JSON.stringify(userData));
        setTimeout(() => navigate('/dashboard'), 1000);
      } else {
        setMessage('Invalid email or password');
        setMessageType('error');
      }
    } else {
      // Mock signup process
      setMessage('Account created successfully! Welcome to Mirror Me!');
      setMessageType('success');
      localStorage.setItem('user', JSON.stringify({ email, name, displayName: name, nickname: name }));
      setTimeout(() => navigate('/dashboard'), 1000);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B132B] to-[#1C2541] flex items-center justify-center p-6 relative">
      <ParticleBackground />
      
      {/* Bolt.new Logo */}
      <BoltLogo position="top-right" size="sm" />
      
      <div className="absolute top-6 left-6">
        <button 
          onClick={() => navigate('/')}
          className="text-gray-400 hover:text-white transition-colors duration-300 flex items-center gap-2"
        >
          <ArrowLeft size={20} />
          Back to Home
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <div className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl p-8 border border-[#5BC0BE]/20">
          <div className="flex justify-center mb-6">
            <BrainCircuit className="h-12 w-12 text-[#5BC0BE]" />
          </div>

          <h2 className="text-2xl font-bold text-center mb-6">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h2>

          {message && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex items-center gap-2 p-3 rounded-lg mb-4 ${
                messageType === 'success' 
                  ? 'bg-green-500/20 border border-green-500/30 text-green-400'
                  : 'bg-red-500/20 border border-red-500/30 text-red-400'
              }`}
            >
              {messageType === 'success' ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
              <span className="text-sm">{message}</span>
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#0B132B]/50 border border-[#5BC0BE]/20 rounded-lg py-2 px-10 text-white placeholder-gray-400 focus:outline-none focus:border-[#5BC0BE] transition-colors"
                    placeholder="Enter your name"
                    required={!isLogin}
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0B132B]/50 border border-[#5BC0BE]/20 rounded-lg py-2 px-10 text-white placeholder-gray-400 focus:outline-none focus:border-[#5BC0BE] transition-colors"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#0B132B]/50 border border-[#5BC0BE]/20 rounded-lg py-2 px-10 text-white placeholder-gray-400 focus:outline-none focus:border-[#5BC0BE] transition-colors"
                  placeholder="Enter your password"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {isLogin && (
              <div className="text-sm text-gray-400">
                Demo credentials: <br />
                Email: demo@mirrorme.com <br />
                Password: demo123
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] text-white rounded-lg py-2 font-medium transition-all duration-300 ${
                loading 
                  ? 'opacity-50 cursor-not-allowed' 
                  : 'hover:shadow-lg hover:shadow-[#6E44FF]/30'
              }`}
            >
              {loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setMessage('');
                setEmail('');
                setPassword('');
                setName('');
              }}
              className="text-[#5BC0BE] hover:text-[#6E44FF] transition-colors duration-300"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AuthPage;