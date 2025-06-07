import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Activity, BrainCircuit, HeartPulse, Lightbulb, Wand2 } from 'lucide-react';

const TechSection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section 
      id="technology" 
      ref={sectionRef}
      className="py-20 px-6 relative bg-[#0B132B]/50"
    >
      <div className="container mx-auto relative z-10">
        <motion.div
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={titleInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] mx-2">
              Revolutionary
            </span>
            Technology
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            How Mirror Me creates deep understanding and empathy through advanced AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="order-2 lg:order-1">
            <TechItem 
              icon={<BrainCircuit size={32} />}
              title="AI Neural Networks"
              description="Our deep learning models are trained on diverse cultural datasets to recognize patterns and nuances in communication across different backgrounds."
              index={0}
            />
            <TechItem 
              icon={<Activity size={32} />}
              title="Emotion Recognition"
              description="Computer vision algorithms detect micro-expressions and subtle emotional cues, providing insight into emotional states that might not be verbally expressed."
              index={1}
            />
            <TechItem 
              icon={<HeartPulse size={32} />}
              title="Empathic Computing"
              description="Our system adapts to your emotional state and provides perspectives that help bridge understanding gaps across different worldviews."
              index={2}
            />
          </div>

          <motion.div 
            className="relative order-1 lg:order-2 h-[400px] lg:h-auto flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative w-full h-full">
              {/* Tech visualization placeholder - would be a more complex 3D element in actual implementation */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-[#5BC0BE]/30 to-[#6E44FF]/30 animate-pulse" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-r from-[#5BC0BE]/50 to-[#6E44FF]/50 animate-pulse" style={{ animationDelay: '0.5s' }} />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] animate-pulse" style={{ animationDelay: '1s' }} />
              
              {/* Orbit circles */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-[#5BC0BE]/30 animate-[spin_20s_linear_infinite]" />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 rounded-full border border-[#6E44FF]/30 animate-[spin_15s_linear_infinite_reverse]" />
              
              {/* Nodes */}
              {Array.from({ length: 8 }).map((_, i) => {
                const angle = (i / 8) * Math.PI * 2;
                const radius = 120;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                
                return (
                  <motion.div 
                    key={i}
                    className="absolute top-1/2 left-1/2 w-3 h-3 rounded-full bg-[#5BC0BE]"
                    style={{ 
                      translateX: `calc(${x}px - 50%)`,
                      translateY: `calc(${y}px - 50%)`,
                    }}
                    animate={{
                      scale: [1, 1.5, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      delay: i * 0.3
                    }}
                  />
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

interface TechItemProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const TechItem: React.FC<TechItemProps> = ({ icon, title, description, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="flex gap-5 mb-10"
    >
      <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-gradient-to-br from-[#5BC0BE] to-[#6E44FF] flex items-center justify-center">
        {icon}
      </div>
      <div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

export default TechSection;