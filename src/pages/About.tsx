import React from 'react';
import { GraduationCap, Trophy, Users, Code } from 'lucide-react';

const About = () => {
  const achievements = [
    {
      title: "AIR 831 in CodeKaze-sep23",
      organization: "CodingNinjas",
      icon: <Trophy className="text-yellow-500" size={20} />
    },
    {
      title: "Qualified SIH23 Internal Hackathon",
      organization: "Government of India",
      icon: <Code className="text-blue-500" size={20} />
    },
    {
      title: "College Rank 3 in Kodi Yatava'24",
      organization: "SCSE NIT JSR",
      icon: <Trophy className="text-bronze-500" size={20} />
    },
    {
      title: "3rd Rank in Pixel Sync Web Dev Contest",
      organization: "NIT Jamshedpur",
      icon: <Trophy className="text-bronze-500" size={20} />
    },
    {
      title: "Team Victory in Fashion Event",
      organization: "Spring Fest'25, IIT KGP",
      icon: <Users className="text-purple-500" size={20} />
    }
  ];

  const positions = [
    {
      title: "Lead - Web Development Wing",
      organization: "Society of Computer Science and Engineering",
      duration: "January 2025 – Present",
      description: "Leading web development initiatives and mentoring junior developers"
    },
    {
      title: "Captain",
      organization: "QUOD INVICTA (Official Fashion Club)",
      duration: "April 2024 – Present",
      description: "Managing fashion events and team coordination"
    },
    {
      title: "Member - Web Development Wing",
      organization: "Programming Club of NIT Jamshedpur",
      duration: "2025 – Present",
      description: "Contributing to club's web development projects"
    }
  ];

  return (
    <div className="pt-16 bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            About <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Me</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            I'm a passionate Computer Science Engineering student at NIT Jamshedpur with a strong foundation 
            in full-stack development and competitive programming. I love turning ideas into reality through code 
            and constantly strive to learn new technologies.
          </p>
        </div>
      </section>

      {/* Education Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Education</h2>
          
          <div className="space-y-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-blue-600 dark:bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <GraduationCap className="text-white" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    Bachelor of Technology in Computer Science and Engineering
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">NIT Jamshedpur</p>
                  <p className="text-gray-600 dark:text-gray-400">2022 – Present | Jamshedpur, Jharkhand</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Class XII - CBSE</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">DS Public School</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">97%</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">2020 – 2021 | Muzaffarnagar, U.P.</p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Class X - CBSE</h3>
                <p className="text-blue-600 dark:text-blue-400 font-medium mb-1">DS Public School</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">94%</p>
                <p className="text-gray-600 dark:text-gray-400 text-sm">2018 – 2019 | Muzaffarnagar, U.P.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Achievements Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">Achievements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300">
                <div className="flex items-start gap-3 mb-4">
                  {achievement.icon}
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {achievement.title}
                    </h3>
                    <p className="text-sm text-blue-600 dark:text-blue-400">
                      {achievement.organization}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Positions Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Positions of Responsibility
          </h2>
          
          <div className="space-y-6">
            {positions.map((position, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border border-gray-200 dark:border-gray-700">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {position.title}
                    </h3>
                    <p className="text-blue-600 dark:text-blue-400 font-medium mb-2">
                      {position.organization}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400 mb-3">
                      {position.description}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400 md:text-right">
                    {position.duration}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Skills */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-900">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-12 text-center">
            Technical Skills
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {['C', 'C++', 'Python', 'Java', 'JavaScript'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Web Technologies</h3>
              <div className="flex flex-wrap gap-2">
                {['HTML', 'CSS', 'React', 'Next.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'Docker'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tools & Databases</h3>
              <div className="flex flex-wrap gap-2">
                {['MongoDB', 'MySQL', 'Git', 'GitHub', 'Problem Solving', 'DSA'].map((skill) => (
                  <span key={skill} className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;