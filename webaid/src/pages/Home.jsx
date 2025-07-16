import React from 'react';
import { Link } from 'react-router-dom';
import {
  FaTools,
  FaArrowRight,
  FaKey,
  FaBookReader,
  FaRegImage,
  FaPaintBrush,
} from 'react-icons/fa';
import {
  MdTextFields,
  MdCode,
  MdOutlineLanguage,
  MdTag,
  MdOutlineFormatAlignLeft,
  MdLink,
  MdColorLens,
  MdCompareArrows,
} from 'react-icons/md';
import { FaRegSquareFull } from 'react-icons/fa6';
import { BiCodeAlt } from 'react-icons/bi';
import { SiCss3, SiJavascript } from 'react-icons/si';

const tools = [
  { name: 'Case Converter', path: '/case-converter', icon: <MdTextFields />, desc: 'Easily change text case: UPPERCASE, lowercase, Sentence case, etc.' },
  { name: 'Bionic Reader', path: '/bionic-reader', icon: <FaBookReader />, desc: 'Improve reading focus and speed using bionic highlighting techniques.' },
  { name: 'Lorem Ipsum Generator', path: '/lorem-ipsum', icon: <MdOutlineLanguage />, desc: 'Generate placeholder text for design and mockups.' },
  { name: 'Markdown Previewer', path: '/markdown-previewer', icon: <MdCode />, desc: 'Preview rendered Markdown instantly as you write.' },
  { name: 'Password Generator', path: '/password-generator', icon: <FaKey />, desc: 'Create secure, customizable passwords for your apps.' },
  { name: 'Text Differ', path: '/text-differ', icon: <MdCompareArrows />, desc: 'Compare two texts and highlight the differences.' },
  { name: 'Meta Tags Generator', path: '/meta-tags', icon: <MdTag />, desc: 'Generate SEO-friendly meta tags for your site quickly.' },
  { name: 'Slug Generator', path: '/slug-generator', icon: <MdLink />, desc: 'Create clean, readable, and SEO-optimized URLs.' },
  { name: 'JSON Formatter', path: '/json-formatter', icon: <MdCode />, desc: 'Format and beautify your JSON data.' },
  { name: 'JS Minifier', path: '/js-minifier', icon: <SiJavascript />, desc: 'Compress and optimize JavaScript code.' },
  { name: 'Regex Helper', path: '/regex-helper', icon: <BiCodeAlt />, desc: 'Build, test, and debug regular expressions easily.' },
  { name: 'UUID Generator', path: '/uuid-generator', icon: <MdCode />, desc: 'Generate Universally Unique Identifiers (UUIDs).' },
  { name: 'Background Remover', path: '/background-remover', icon: <FaRegImage />, desc: 'Remove backgrounds from images using AI.' },
  { name: 'Image Compressor', path: '/image-compressor', icon: <FaRegImage />, desc: 'Reduce image size without losing quality.' },
  { name: 'Image to Base64', path: '/image-to-base64', icon: <FaRegImage />, desc: 'Convert any image to Base64 string.' },
  { name: 'Base64 Converter', path: '/base64-converter', icon: <MdOutlineFormatAlignLeft />, desc: 'Encode or decode Base64 strings easily.' },
  { name: 'HTML Escape Tool', path: '/html-escape-tool', icon: <MdOutlineFormatAlignLeft />, desc: 'Escape/unescape HTML special characters.' },
  { name: 'String Encoder', path: '/string-encoder', icon: <MdOutlineFormatAlignLeft />, desc: 'Encode strings into URI, HEX, or Base64 formats.' },
  { name: 'ENV Generator', path: '/env-generator', icon: <MdCode />, desc: 'Generate .env files for your apps and APIs.' },
  { name: 'Gitignore Generator', path: '/gitignore-generator', icon: <MdCode />, desc: 'Create .gitignore templates for different languages and frameworks.' },
  { name: 'JS Playground', path: '/playground', icon: <SiJavascript />, desc: 'Test and play with JavaScript code live.' },
  { name: 'Animation Previewer', path: '/animation-previewer', icon: <FaPaintBrush />, desc: 'Preview and customize CSS animations.' },
  { name: 'Box Shadow Generator', path: '/box-shadow-generator', icon: <FaRegSquareFull />, desc: 'Create stunning CSS box-shadows visually.' },
  { name: 'CSS Minifier', path: '/css-minifier', icon: <SiCss3 />, desc: 'Compress and clean up your CSS code.' },
  { name: 'Grid Generator', path: '/grid-generator', icon: <SiCss3 />, desc: 'Visual builder for CSS grid layouts.' },
  { name: 'Color Converter', path: '/color-converter', icon: <MdColorLens />, desc: 'Convert between HEX, RGB, HSL and more.' },
  { name: 'Contrast Checker', path: '/contrast-checker', icon: <MdColorLens />, desc: 'Ensure text and background color combinations are accessible.' },
];

const Home = () => {
  return (
    <div className="text-white font-poppin min-h-screen w-full">
      {/* Hero Section */}
      <section className="relative py-24 px-4 bg-gradient-to-br from-indigo-900 via-purple-800 to-gray-900 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl sm:text-6xl font-bold mb-6 leading-tight">
            Welcome to <span className="text-indigo-300">WebAid</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            A lightning-fast suite of over 25+ developer tools to boost your productivity — all in your browser.
          </p>
          <Link
            to="/case-converter"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-3 px-8 rounded-full transition-all duration-300 shadow-lg hover:shadow-indigo-500/50"
          >
            Explore Tools <FaArrowRight />
          </Link>
        </div>
      </section>
      {/* About Section */}
      <section className="py-16 px-6 sm:px-10 bg-gray-900 border-t border-gray-800">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <h3 className="text-2xl font-semibold text-indigo-300">About WebAid</h3>
          <p className="text-gray-300 max-w-3xl mx-auto">
            WebAid is your all-in-one productivity suite offering essential tools for developers, designers, and digital creators.
            It is designed for blazing-fast usage without installing anything. Our tools are free, reliable, and built with ❤️ to speed up your workflow.
          </p>
          <p className="text-sm text-gray-500">
            Powered by <a href="https://sparklab-info.web.app" target="_blank" rel="noopener noreferrer" className="text-indigo-400 underline hover:text-indigo-300">SparkLab Info</a>
          </p>
        </div>
      </section>


      {/* Tools Section */}
      <section className="py-16 px-6 sm:px-10 bg-gray-950">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-2xl sm:text-3xl font-semibold text-center mb-10 text-white">
            All Tools
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map(({ name, path, icon, desc }) => (
              <Link
                key={name}
                to={path}
                className="group bg-white/10 hover:bg-white/20 transition-all duration-300 border border-white/10 rounded-xl p-6 flex flex-col justify-between shadow-md hover:shadow-lg hover:scale-[1.02]"
              >
                <div className="flex items-center gap-3 text-lg font-semibold text-white mb-2">
                  <span className="text-xl text-indigo-300">{icon}</span>
                  {name}
                </div>
                <p className="text-sm text-gray-300 leading-relaxed">
                  {desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      
      {/* Footer */}
      <footer className="py-8 bg-gray-950 border-t border-gray-800 text-center text-sm text-gray-400">
        <p>
          © {new Date().getFullYear()} WebAid by <a href="https://abhijith-web-dev.web.app/" target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:underline">Abhijith</a> — All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;
