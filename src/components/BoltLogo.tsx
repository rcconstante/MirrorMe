import React from 'react';
import { motion } from 'framer-motion';

interface BoltLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  position?: 'top-right' | 'top-left' | 'bottom-right';
}

const BoltLogo: React.FC<BoltLogoProps> = ({ 
  className = '',
  size = 'md',
  position = 'top-right'
}) => {
  const [imageLoaded, setImageLoaded] = React.useState(false);
  const [imageError, setImageError] = React.useState(false);

  const sizeClasses = {
    sm: 'w-10 h-10',
    md: 'w-14 h-14',
    lg: 'w-16 h-16'
  };

  const positionClasses = {
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
    'bottom-right': 'bottom-6 right-6'
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, duration: 0.8, type: "spring", stiffness: 100 }}
      className={`fixed ${positionClasses[position]} z-50 ${className}`}
    >
      <motion.a
        href="https://bolt.new"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ 
          scale: 1.1, 
          rotate: [0, -10, 10, -5, 0],
          transition: { duration: 0.5 }
        }}
        whileTap={{ scale: 0.95 }}
        className="block group"
        title="Built with Bolt.new - AI-powered full-stack development"
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-3 bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] rounded-full opacity-0 group-hover:opacity-30 blur-lg transition-all duration-500" />
          
          {/* Logo image with fallback */}
          {!imageError ? (
            <img 
              src="https://i.ibb.co/20DwgrpB/white-circle-360x360.png" 
              alt="Built with Bolt.new" 
              className={`${sizeClasses[size]} rounded-full shadow-2xl border-2 border-[#5BC0BE]/30 group-hover:border-[#5BC0BE]/80 transition-all duration-300 bg-[#1C2541]/80 backdrop-blur-sm ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          ) : (
            // Fallback if image fails to load
            <div className={`${sizeClasses[size]} rounded-full shadow-2xl border-2 border-[#5BC0BE]/30 group-hover:border-[#5BC0BE]/80 transition-all duration-300 bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] flex items-center justify-center`}>
              <span className="text-white font-bold text-xs">⚡</span>
            </div>
          )}
          
          {/* Loading indicator */}
          {!imageLoaded && !imageError && (
            <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full bg-[#1C2541]/80 border-2 border-[#5BC0BE]/30 flex items-center justify-center`}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-4 h-4 border-2 border-[#5BC0BE]/30 border-t-[#5BC0BE] rounded-full"
              />
            </div>
          )}
          
          {/* Pulse animation */}
          <div className={`absolute inset-0 ${sizeClasses[size]} rounded-full border-2 border-[#5BC0BE]/20 animate-ping opacity-0 group-hover:opacity-75`} />
          
          {/* Tooltip */}
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-[#1C2541]/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-lg border border-[#5BC0BE]/20 whitespace-nowrap">
              Built with Bolt.new ⚡
            </div>
          </div>
        </div>
      </motion.a>
    </motion.div>
  );
};

export default BoltLogo; 