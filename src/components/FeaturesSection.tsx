import React from 'react';
import { motion } from 'framer-motion';
import { 
  Eye, 
  Globe, 
  Brain, 
  Users, 
  Heart, 
  Zap,
  Camera,
  MessageSquare,
  TrendingUp,
  Shield,
  Sparkles
} from 'lucide-react';

const FeaturesSection = () => {
  const features = [
    {
      icon: <Eye size={32} />,
      title: 'Universal Empathy Mirror',
      description: 'See your emotions reflected through 50+ cultural perspectives simultaneously. Experience your own feelings as others would perceive them.',
      color: 'from-[#5BC0BE] to-[#6E44FF]',
      delay: 0.1
    },
    {
      icon: <Eye size={32} />,
      title: 'Perspective Multiplication',
      description: 'One emotion, infinite viewpoints. Watch your facial expressions transform as you experience how different cultures interpret your feelings.',
      color: 'from-[#6E44FF] to-[#9D4EDD]',
      delay: 0.2
    },
    {
      icon: <MessageSquare size={32} />,
      title: 'Conversation Empathy Simulator',
      description: 'Practice difficult conversations across cultures. Our AI shows you exactly how to communicate with anyone, from any background.',
      color: 'from-[#5BC0BE] to-[#00BFA6]',
      delay: 0.3
    },
    {
      icon: <Zap size={32} />,
      title: 'Real-Time Empathy Coach',
      description: 'Get instant guidance during live conversations. Prevent miscommunication before it happens with cultural awareness alerts.',
      color: 'from-[#FF6B6B] to-[#FFE66D]',
      delay: 0.4
    },
    {
      icon: <Globe size={32} />,
      title: 'Global Empathy Network',
      description: 'Connect with the world through shared empathy. See real-time empathy heatmaps and join global challenges to increase understanding.',
      color: 'from-[#4ECDC4] to-[#5BC0BE]',
      delay: 0.5
    },
    {
      icon: <Brain size={32} />,
      title: 'Cultural Emotional AI',
      description: 'Advanced AI that understands the nuances of emotional expression across every culture. Turn miscommunication into connection.',
      color: 'from-[#A8E6CF] to-[#7FDBDA]',
      delay: 0.6
    }
  ];

  const capabilities = [
    'Emotion detection across 50+ cultures',
    'Real-time perspective switching',
    'Voice tone cultural analysis',
    'Facial expression translation',
    'Conversation conflict prevention',
    'Empathy score tracking'
  ];

  return (
    <section className="py-20 px-6 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(91,192,190,0.05),transparent_50%)]" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-[#5BC0BE]/10 border border-[#5BC0BE]/20 rounded-full px-4 py-2 mb-6">
            <Sparkles className="h-4 w-4 text-[#5BC0BE]" />
            <span className="text-sm text-gray-300">Revolutionary Features</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-[#5BC0BE]">
              Experience Empathy
            </span>
            <br />
            <span className="text-[#6E44FF]">Like Never Before</span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Mirror Me doesn't just detect emotions—it translates them across cultures, 
            amplifies understanding, and builds bridges between different worlds.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: feature.delay }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="h-full bg-[#1C2541]/40 backdrop-blur-sm border border-[#5BC0BE]/20 rounded-2xl p-8 hover:border-[#5BC0BE]/40 transition-all duration-500 hover:transform hover:scale-105">
                {/* Icon */}
                <div className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <span className="text-white">
                    {feature.icon}
                  </span>
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-[#5BC0BE] transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors">
                  {feature.description}
                </p>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#5BC0BE]/5 to-[#6E44FF]/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Capabilities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-[#1C2541]/60 to-[#0B132B]/60 border border-[#5BC0BE]/20 rounded-2xl p-8 md:p-12 backdrop-blur-sm"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-6">
                Powered by <span className="text-[#5BC0BE]">Quantum Empathy AI</span>
              </h3>
              
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Our breakthrough technology processes emotions across infinite cultural dimensions 
                simultaneously, creating unprecedented understanding between people.
              </p>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <div className="text-3xl font-bold text-[#5BC0BE] mb-2">50+</div>
                  <div className="text-gray-400">Cultural Perspectives</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-[#6E44FF] mb-2">99.8%</div>
                  <div className="text-gray-400">Accuracy Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-green-400 mb-2">0.2s</div>
                  <div className="text-gray-400">Response Time</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-400 mb-2">∞</div>
                  <div className="text-gray-400">Perspectives</div>
                </div>
              </div>

              <button className="bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg hover:shadow-[#6E44FF]/30 transition-all duration-300">
                Explore Technology
              </button>
            </div>

            {/* Right: Capabilities List */}
            <div className="space-y-4">
              <h4 className="text-xl font-semibold text-white mb-6">Core Capabilities</h4>
              {capabilities.map((capability, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3 p-3 rounded-lg bg-[#0B132B]/30 border border-[#5BC0BE]/10 hover:border-[#5BC0BE]/30 transition-colors"
                >
                  <div className="w-2 h-2 bg-[#5BC0BE] rounded-full" />
                  <span className="text-gray-300">{capability}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to See Through Every Culture's Eyes?
          </h3>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
            Join the empathy revolution and discover how your emotions appear to different cultures around the world.
          </p>
          <button className="bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-xl hover:shadow-[#6E44FF]/30 transition-all duration-300">
            Start Your Empathy Journey
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;