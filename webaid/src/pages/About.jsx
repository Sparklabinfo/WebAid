import React from 'react';
import { motion } from 'framer-motion';
import { FaCode, FaBrain, FaCogs } from 'react-icons/fa';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-20 text-gray-300">
      {/* Heading */}
      <motion.h1
        className="text-3xl md:text-4xl font-bold text-white mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        About <span className="text-accent">WebAid</span>
      </motion.h1>

      {/* Section: What is WebAid */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <h2 className="text-xl text-white font-semibold mb-2 flex items-center gap-2">
          <FaCode className="text-accent" /> What is WebAid?
        </h2>
        <p className="text-gray-400 leading-relaxed">
          WebAid is a powerful all-in-one toolkit for web developers. It includes a suite of prebuilt frontend tools that make your daily development tasks faster, easier, and smarter — from converting text to formatting JSON and even using AI-powered features.
        </p>
      </motion.div>

      {/* Section: Powered by */}
      <motion.div
        className="mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        <h2 className="text-xl text-white font-semibold mb-2 flex items-center gap-2">
          <FaCogs className="text-accent" /> Built With
        </h2>
        <ul className="list-disc list-inside text-gray-400 leading-loose">
          <li><strong>React + Vite</strong> for blazing fast frontend development</li>
          <li><strong>Tailwind CSS</strong> for sleek and responsive UI design</li>
          <li><strong>Gemini API</strong> for AI-assisted developer tools</li>
          <li><strong>Framer Motion</strong> for smooth animations</li>
        </ul>
      </motion.div>

      {/* Section: Future Scope */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
      >
        <h2 className="text-xl text-white font-semibold mb-2 flex items-center gap-2">
          <FaBrain className="text-accent" /> What's Next?
        </h2>
        <p className="text-gray-400 leading-relaxed">
          We're continuously improving WebAid by adding more AI-driven tools, real-time editing features, and personalization support. Our goal is to become the go-to toolkit for every frontend developer who wants efficiency with elegance.
        </p>
      </motion.div>
    </div>
  );
};

export default About;
