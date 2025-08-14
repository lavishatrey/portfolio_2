import React from 'react';
import { ArrowRight, Download, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import SocialLinks from '../components/SocialLinks';

const Home = () => {
  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                Hi, I'm{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Lavish Atrey
                </span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Computer Science Engineering Student at{' '}
                <span className="font-semibold text-blue-600 dark:text-blue-400">NIT Jamshedpur</span>
              </p>
              <p className="text-lg text-gray-500 dark:text-gray-400 mb-8 max-w-2xl">
                Full-Stack Developer passionate about creating innovative web applications 
                and solving complex problems. Specialized in MERN stack development with 
                competitive programming expertise.
              </p>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone size={16} />
                  <span>987654321</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>lavishatrey@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>Jamshedpur, Jharkhand</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
                <Link
                  to="/projects"
                  className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  View My Work
                  <ArrowRight className="ml-2" size={20} />
                </Link>

                {/* Download CV Button */}
                <a
                  href="https://drive.google.com/file/d/1Rlqgef4ba8N7CDYXWwic03qffTJ8hbJn/view?usp=sharing" // Put this PDF in the public folder
                  download
                  className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:border-blue-600 hover:text-blue-600 dark:hover:border-blue-400 dark:hover:text-blue-400 transform hover:scale-105 transition-all duration-200"
                >
                  <Download className="mr-2" size={20} />
                  Download CV
                </a>
              </div>

              <SocialLinks />
            </div>

            {/* Profile Image */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-2xl opacity-20 animate-pulse"></div>
                <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-2xl">
                  <img
                    src="/hero.jpeg" // Ensure this image is in the public folder
                    alt="Lavish Atrey"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Overview */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Expertise
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Proficient in modern web technologies and competitive programming
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-2xl border border-blue-200 dark:border-blue-700">
              <div className="w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">FE</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Frontend</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                React, Next.js, JavaScript, HTML5, CSS3, Tailwind CSS
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 rounded-2xl border border-purple-200 dark:border-purple-700">
              <div className="w-16 h-16 bg-purple-600 dark:bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">BE</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Backend</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Node.js, Express.js, MongoDB, MySQL, JWT Authentication
              </p>
            </div>

            <div className="text-center p-8 bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-2xl border border-green-200 dark:border-green-700">
              <div className="w-16 h-16 bg-green-600 dark:bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-white">CP</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Programming</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                C++, Java, Python, Data Structures & Algorithms
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
