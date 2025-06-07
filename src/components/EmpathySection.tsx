import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const EmpathySection: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const [titleRef, titleInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section 
      id="empathy" 
      ref={sectionRef}
      className="py-20 px-6 relative overflow-hidden"
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
            Building 
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF] mx-2">
              Universal Empathy
            </span>
            Through AI
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience the world through different perspectives and build deeper human connections
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
          <EmpathyCard 
            title="Cultural Barriers"
            description="Break through cultural misunderstandings by seeing the world through the lens of different cultural contexts and norms."
            imageUrl="https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            index={0}
          />
          <EmpathyCard 
            title="Generational Gaps"
            description="Bridge the divide between generations by understanding different historical contexts and technological experiences."
            imageUrl="https://images.pexels.com/photos/7414268/pexels-photo-7414268.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            index={1}
          />
          <EmpathyCard 
            title="Neurodiversity"
            description="Understand and appreciate neurodivergent perspectives, helping to foster more inclusive and supportive communities."
            imageUrl="https://images.pexels.com/photos/3771110/pexels-photo-3771110.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            index={2}
          />
        </div>
      </div>

      {/* Background elements */}
      <motion.div 
        className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-r from-[#6E44FF]/20 to-transparent blur-[100px] z-0"
        style={{ y, opacity }}
      />
      <motion.div 
        className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 rounded-full bg-gradient-to-l from-[#5BC0BE]/20 to-transparent blur-[100px] z-0"
        style={{ y: useTransform(scrollYProgress, [0, 1], [-100, 100]), opacity }}
      />
    </section>
  );
};

interface EmpathyCardProps {
  title: string;
  description: string;
  imageUrl: string;
  index: number;
}

const EmpathyCard: React.FC<EmpathyCardProps> = ({ title, description, imageUrl, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="overflow-hidden rounded-xl relative group"
    >
      <div className="h-64 overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B132B] to-transparent opacity-80" />
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-300">{description}</p>
      </div>
    </motion.div>
  );
};

export default EmpathySection;