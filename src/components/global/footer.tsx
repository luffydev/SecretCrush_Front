/* eslint-disable react/no-unescaped-entities */

import { FaInstagram, FaTwitter, FaFacebook, FaChevronRight } from 'react-icons/fa';

const FrenchFlag = () => (
  <div className="inline-block ml-1">
    <svg width="16" height="12" viewBox="0 0 16 12" xmlns="http://www.w3.org/2000/svg">
      <rect width="5.33" height="12" fill="#002395"/>
      <rect x="5.33" width="5.33" height="12" fill="#FFFFFF"/>
      <rect x="10.66" width="5.33" height="12" fill="#ED2939"/>
    </svg>
  </div>
);

const Footer = () => {
  return (
    <footer className="mt-6 text-center text-xs text-gray-500">
      <div className="mb-2">© 2024|2025 SecretCrush</div>
      <div className="mb-4">
        L'application made in <FrenchFlag />
      </div>
      
      <div className="flex justify-center">
        <div className="flex flex-col items-start gap-y-3">
          <div className="flex items-center">
            <FaChevronRight className="text-red-500 mr-1" />
            <a href="#" className="hover:text-gray-300 transition-colors">À propos</a>
          </div>
          
          <div className="flex items-center">
            <FaChevronRight className="text-red-500 mr-1" />
            <a href="#" className="hover:text-gray-300 transition-colors">PDC</a>
          </div>
          
          <div className="flex items-center">
            <FaChevronRight className="text-red-500 mr-1" />
            <a href="#" className="hover:text-gray-300 transition-colors">CGU</a>
          </div>
          
          <div className="flex items-center">
            <FaChevronRight className="text-red-500 mr-1" />
            <a href="#" className="hover:text-gray-300 transition-colors">CGV</a>
          </div>
        </div>
        
        <div className="ml-16 flex flex-col items-start gap-y-3 justify-start">
          <a href="#" aria-label="Instagram">
            <FaInstagram className="text-gray-400 hover:text-white text-lg transition-colors" />
          </a>
          
          <a href="#" aria-label="Twitter">
            <FaTwitter className="text-gray-400 hover:text-white text-lg transition-colors" />
          </a>
          
          <a href="#" aria-label="Facebook">
            <FaFacebook className="text-gray-400 hover:text-white text-lg transition-colors" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;