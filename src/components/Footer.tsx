import React from 'react';
import { BrainCircuit, Github, Instagram, Linkedin, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#0B132B] pt-16 pb-8 px-6">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <div className="flex items-center mb-4">
              <BrainCircuit className="h-8 w-8 text-[#5BC0BE] mr-2" />
              <span className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-[#5BC0BE] to-[#6E44FF]">
                Mirror Me
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              The world's first AI mirror that helps you see through everyone else's eyes - building universal empathy.
            </p>
            <div className="flex space-x-4">
              <SocialLink icon={<Twitter size={20} />} />
              <SocialLink icon={<Instagram size={20} />} />
              <SocialLink icon={<Linkedin size={20} />} />
              <SocialLink icon={<Github size={20} />} />
            </div>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <FooterLink href="#" text="About Us" />
              <FooterLink href="#" text="Careers" />
              <FooterLink href="#" text="Blog" />
              <FooterLink href="#" text="Press" />
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              <FooterLink href="#" text="Documentation" />
              <FooterLink href="#" text="Research" />
              <FooterLink href="#" text="Privacy Policy" />
              <FooterLink href="#" text="Terms of Service" />
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <FooterLink href="mailto:hello@mirrorme.ai" text="hello@mirrorme.ai" />
              <FooterLink href="#" text="Support Center" />
              <FooterLink href="#" text="Partner Program" />
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} Mirror Me AI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

interface FooterLinkProps {
  href: string;
  text: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ href, text }) => (
  <li>
    <a 
      href={href} 
      className="text-gray-400 hover:text-[#5BC0BE] transition-colors duration-300"
    >
      {text}
    </a>
  </li>
);

interface SocialLinkProps {
  icon: React.ReactNode;
}

const SocialLink: React.FC<SocialLinkProps> = ({ icon }) => (
  <a 
    href="#" 
    className="w-9 h-9 rounded-full bg-[#1C2541] flex items-center justify-center text-gray-400 hover:text-[#5BC0BE] hover:bg-[#1C2541]/80 transition-colors duration-300"
  >
    {icon}
  </a>
);

export default Footer;