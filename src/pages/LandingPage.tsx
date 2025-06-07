import React, { useEffect } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import FeaturesSection from '../components/FeaturesSection';
import EmpathySection from '../components/EmpathySection';
import TechSection from '../components/TechSection';
import DemoSection from '../components/DemoSection';
import TestimonialsSection from '../components/TestimonialsSection';
import IntegrationSection from '../components/IntegrationSection';
import SecuritySection from '../components/SecuritySection';
import PricingSection from '../components/PricingSection';
import Footer from '../components/Footer';
import ParticleBackground from '../components/3d/ParticleBackground';
import { useInView } from 'react-intersection-observer';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, ArrowRight, Globe, Heart, Users, Sparkles, Camera, MessageSquare, BarChart3 } from 'lucide-react';
import BoltLogo from '../components/BoltLogo';
import LandingChatbot from '../components/LandingChatbot';

const LandingPage = () => {
  useEffect(() => {
    document.title = "Mirror Me — AI That Reflects Global Perspectives";
  }, []);
  
  const { ref: topRef, inView: isTopInView } = useInView({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-[#0B132B] to-[#1C2541] text-white min-h-screen">
      <ParticleBackground />
      
      <BoltLogo position="top-right" size="md" />
      
      <div className="relative z-10">
        <div ref={topRef}>
          <Header isTransparent={isTopInView} />
          <Hero />
        </div>
        
        <FeaturesSection />
        <EmpathySection />
        <TechSection />
        <DemoSection />
        <TestimonialsSection />
        <IntegrationSection />
        <SecuritySection />
        <PricingSection />
        <Footer />
      </div>
      
      <LandingChatbot />
    </div>
  );
};

export default LandingPage;