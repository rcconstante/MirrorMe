import React, { useState, useEffect } from 'react';
import { framer, motion } from 'framer-motion';
import { BrainCircuit, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
  isTransparent: boolean;
}

const Header: React.FC<HeaderProps> = ({ isTransparent }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSignUp = () => {
    navigate('/auth');
  };

  const headerClass = `fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
    scrolled || !isTransparent
      ? 'bg-[#0B132B]/90 backdrop-blur-md shadow-lg'
      : 'bg-transparent'
  }`;

  return (
    <header className={headerClass}>
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <BrainCircuit className="h-8 w-8 text-[#5BC0BE] mr-2" />
          <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF]">
            Mirror Me
          </span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <NavLink href="#features">Features</NavLink>
          <NavLink href="#empathy">Empathy Tech</NavLink>
          <NavLink href="#technology">Technology</NavLink>
          <NavLink href="#demo">Demo</NavLink>
        </nav>

        <div className="hidden md:flex items-center">
          <button 
            onClick={handleSignUp}
            className="px-5 py-2 rounded-full bg-transparent border border-[#5BC0BE] text-[#5BC0BE] hover:bg-[#5BC0BE] hover:text-white transition-all duration-300"
          >
            Sign Up
          </button>
        </div>

        {/* Mobile menu button */}
        <button className="md:hidden text-white" onClick={toggleMenu}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-[#0B132B]/95 backdrop-blur-md p-4 shadow-lg">
          <nav className="flex flex-col space-y-4">
            <MobileNavLink href="#features" onClick={toggleMenu}>Features</MobileNavLink>
            <MobileNavLink href="#empathy" onClick={toggleMenu}>Empathy Tech</MobileNavLink>
            <MobileNavLink href="#technology" onClick={toggleMenu}>Technology</MobileNavLink>
            <MobileNavLink href="#demo" onClick={toggleMenu}>Demo</MobileNavLink>
            <button 
              onClick={handleSignUp}
              className="px-5 py-2 rounded-full bg-[#5BC0BE] text-white hover:bg-[#4DA8A7] transition-all duration-300 mt-2"
            >
              Sign Up
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <a
    href={href}
    className="text-gray-300 hover:text-white transition-colors duration-300 text-sm font-medium"
  >
    {children}
  </a>
);

const MobileNavLink = ({ 
  href, 
  children, 
  onClick 
}: { 
  href: string; 
  children: React.ReactNode; 
  onClick: () => void;
}) => (
  <a
    href={href}
    className="text-gray-300 hover:text-white transition-colors duration-300 text-base font-medium py-2"
    onClick={onClick}
  >
    {children}
  </a>
);

export default Header;