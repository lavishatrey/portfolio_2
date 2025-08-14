import React from 'react';
import { Heart } from 'lucide-react';
import SocialLinks from './SocialLinks';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Lavish Atrey
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Computer Science Engineering Student at NIT Jamshedpur, 
              passionate about full-stack development and problem-solving.
            </p>
            <div className="flex justify-center md:justify-start">
              <SocialLinks />
            </div>
          </div>

          {/* Quick Links */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Quick Links
            </h4>
            <div className="space-y-2">
              <a href="/" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Home
              </a>
              <a href="/about" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                About
              </a>
              <a href="/projects" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Projects
              </a>
              <a href="/contact" className="block text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Get In Touch
            </h4>
            <div className="space-y-2 text-gray-600 dark:text-gray-400">
              <p>Jamshedpur, Jharkhand</p>
              <p>987654321</p>
              <a href="mailto:lavishatrey@gmail.com" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                lavishatrey@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 flex items-center justify-center gap-2">
            © {currentYear} Lavish Atrey. Made with{' '}
            <Heart className="text-red-500" size={16} fill="currentColor" />
            {' '}and lots of coffee.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;