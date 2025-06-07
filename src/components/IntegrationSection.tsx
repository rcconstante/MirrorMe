import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { Puzzle, Zap, Shield, Globe } from 'lucide-react';

const IntegrationSection = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const navigate = useNavigate();

  const integrations = [
    {
      icon: <Puzzle className="w-8 h-8" />,
      title: "Easy Integration",
      description: "Seamlessly integrate Mirror Me into your existing workflow with our robust API and SDK support."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Analysis",
      description: "Get instant feedback and analysis with our low-latency processing engine."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Enterprise Security",
      description: "Bank-grade encryption and compliance with global data protection regulations."
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Global Support",
      description: "24/7 support across multiple time zones and languages."
    }
  ];

  const handleStartIntegration = () => {
    navigate('/auth');
  };

  return (
    <section className="py-20 px-6 relative bg-[#0B132B]/50">
      <div className="container mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Seamless
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] mx-2">
              Integration
            </span>
            & Support
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Enterprise-ready solutions with powerful integration capabilities
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {integrations.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl p-6 border border-[#5BC0BE]/20 hover:border-[#5BC0BE]/40 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-[#5BC0BE] to-[#6E44FF] flex items-center justify-center mb-4">
                {item.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-300">{item.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <button 
            onClick={handleStartIntegration}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] text-white font-medium hover:shadow-lg hover:shadow-[#6E44FF]/30 transition-all duration-300"
          >
            Start Integration
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default IntegrationSection;