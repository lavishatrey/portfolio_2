import React from 'react';
import { Github, Linkedin, Instagram, Mail } from 'lucide-react';

const SocialLinks = () => {
  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/lavishatrey',
      icon: <Github size={20} />,
      color: 'hover:text-gray-900 dark:hover:text-white'
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/lavish-atrey-01744a250/',
      icon: <Linkedin size={20} />,
      color: 'hover:text-blue-600'
    },
    {
      name: 'Instagram',
      url: 'https://instagram.com/lavishatrey',
      icon: <Instagram size={20} />,
      color: 'hover:text-pink-600'
    },
    {
      name: 'Email',
      url: 'mailto:lavishatrey@gmail.com',
      icon: <Mail size={20} />,
      color: 'hover:text-red-600'
    }
  ];

  return (
    <div className="flex gap-4">
      {socialLinks.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target={social.name !== 'Email' ? '_blank' : undefined}
          rel={social.name !== 'Email' ? 'noopener noreferrer' : undefined}
          className={`p-3 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-full ${social.color} transition-all duration-200 transform hover:scale-110 hover:shadow-lg`}
          aria-label={social.name}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
};

export default SocialLinks;