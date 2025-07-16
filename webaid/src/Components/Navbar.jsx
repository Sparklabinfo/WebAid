import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import {
  FaTools,
  FaBars,
  FaTimes,
  FaBookReader,
  FaKey,
  FaImage,
} from 'react-icons/fa';
import { SiCss3, SiJavascript } from 'react-icons/si';
import { FaRegSquareFull } from 'react-icons/fa6';
import {
  MdOutlineFormatAlignLeft,
  MdCode,
  MdTextFields,
  MdTag,
  MdOutlineLanguage,
  MdLink,
  MdColorLens,
  MdCompareArrows,
  MdOutlineImage,
  MdOutlineDraw,
} from 'react-icons/md';
import { BiCodeAlt } from 'react-icons/bi';
import { PiTextAaBold } from 'react-icons/pi';
import { FiHash, FiFileText } from 'react-icons/fi';
import { BsMarkdown } from 'react-icons/bs';
import { TbGridDots } from 'react-icons/tb';
import { VscSymbolString } from 'react-icons/vsc';
import { RiCodeView } from 'react-icons/ri';

const COLORS = {
  background: '#0B0F19',
  sidebar: '#1A1F2E',
  border: '#2C2F40',
  text: '#B0B5C0',
  accent: '#8E44AD',
  activeBg: '#8E44AD',
  activeText: '#FFFFFF',
  hoverBg: '#2C2F40',
  hoverText: '#FFFFFF',
};

const navLinks = [
  {
    section: 'Text Tools',
    links: [
      { name: 'Case Converter', path: '/case-converter', icon: <MdTextFields /> },
      { name: 'Bionic Reader', path: '/Bionic-Reader', icon: <FaBookReader /> },
      { name: 'Lorem Ipsum', path: '/Lorem-Ipsum', icon: <MdOutlineLanguage /> },
      { name: 'MarkDown Previewer', path: '/MarkDown-Previewer', icon: <BsMarkdown /> },
      { name: 'Password Generator', path: '/Password-Generator', icon: <FaKey /> },
      { name: 'Text Differ', path: '/Text-Differ', icon: <MdCompareArrows /> },
    ],
  },
  {
    section: 'SEO Tools',
    links: [
      { name: 'Meta Tags', path: '/Meta-Tags', icon: <MdTag /> },
      { name: 'Slug Generator', path: '/slug-generator', icon: <MdLink /> },
    ],
  },
  {
    section: 'JSON & JS Tools',
    links: [
      { name: 'JSON Formatter', path: '/json-formatter', icon: <MdCode /> },
      { name: 'JS Minifier', path: '/js-minifier', icon: <SiJavascript /> },
      { name: 'Regex Helper', path: '/regex-helper', icon: <BiCodeAlt /> },
      { name: 'UUID Generator', path: '/uuid-generator', icon: <FiHash /> },
    ],
  },
  {
    section: 'Image Tools',
    links: [
      { name: 'Background Remover', path: '/background-Remover', icon: <FaImage /> },
      { name: 'Image Compressor', path: '/image-Compressor', icon: <MdOutlineImage /> },
      { name: 'Image Scaler', path: '/image-enlarger', icon: <MdOutlineImage /> },
      { name: 'Image to Base64', path: '/image-to-base64', icon: <RiCodeView /> },
    ],
  },
  {
    section: 'Encoding Tools',
    links: [
      { name: 'Base64 Converter', path: '/base64-Converter', icon: <RiCodeView /> },
      { name: 'HTML Escape Tool', path: '/html-escape-tool', icon: <MdOutlineFormatAlignLeft /> },
      { name: 'String Encoder', path: '/string-encoder', icon: <VscSymbolString /> },
    ],
  },
  {
    section: 'Developer Tools',
    links: [
      { name: '.env Generator', path: '/env-generator', icon: <FiFileText /> },
      { name: '.gitignore Generator', path: '/gitignore-generator', icon: <FiFileText /> },
      { name: 'Code Playground', path: '/playground', icon: <MdCode /> },
    ],
  },
  {
    section: 'CSS & Design Tools',
    links: [
      { name: 'Animation Previewer', path: '/animation-previewer', icon: <MdOutlineDraw /> },
      { name: 'Box Shadow Generator', path: '/box-shadow-generator', icon: <FaRegSquareFull /> },
      { name: 'CSS Minifier', path: '/css-minifier', icon: <SiCss3 /> },
      { name: 'Grid Generator', path: '/grid-generator', icon: <TbGridDots /> },
    ],
  },
  {
    section: 'Color Tools',
    links: [
      { name: 'Color Converter', path: '/color-converter', icon: <MdColorLens /> },
      { name: 'Contrast Checker', path: '/contrast-checker', icon: <MdColorLens /> },
    ],
  },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  const toggleSidebar = () => setIsOpen((prev) => !prev);
  const closeSidebar = () => setIsOpen(false);

  return (
    <>
      {/* 🔹 Mobile Top Bar */}
      <div
        className="fixed top-0 left-0 right-0 z-30 md:hidden flex justify-between items-center px-4 py-3 shadow-md"
        style={{ backgroundColor: COLORS.background, color: '#fff' }}
      >
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-bold hover:text-purple-300 transition"
        >
          <FaTools style={{ color: COLORS.accent }} />
          WebAid
        </Link>
        <button onClick={toggleSidebar} className="text-2xl">
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* 🔸 Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 shadow-xl transition-transform duration-300 ease-in-out border-r ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        style={{
          backgroundColor: COLORS.sidebar,
          borderColor: COLORS.border,
          width: isHome ? '4rem' : '16rem',
        }}
      >
        {/* Logo/Header */}
        <Link to="/" onClick={closeSidebar}>
          <div
            className="flex items-center gap-2 px-4 py-4 border-b"
            style={{ borderColor: COLORS.border }}
          >
            <FaTools className="text-xl" style={{ color: COLORS.accent }} />
            {!isHome && <span className="text-lg font-semibold">WebAid Tools</span>}
          </div>
        </Link>

        {/* Navigation Sections */}
        <nav className="flex flex-col px-2 py-4 gap-3 overflow-y-auto h-[calc(100vh-64px)]">
          {navLinks.map(({ section, links }) => (
            <div key={section}>
              {!isHome && (
                <p className="text-xs uppercase font-bold text-gray-500 px-3 mb-1 mt-2 tracking-wider">
                  {section}
                </p>
              )}
              {links.map(({ name, path, icon }) => (
                <NavLink
                  key={name}
                  to={path}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition duration-200 ${
                      isActive
                        ? 'shadow-[0_0_8px_rgba(142,68,173,0.6)]'
                        : 'hover:bg-[#2C2F40]'
                    }`
                  }
                  style={({ isActive }) => ({
                    color: isActive ? COLORS.activeText : COLORS.text,
                    backgroundColor: isActive ? COLORS.activeBg : 'transparent',
                  })}
                >
                  <span className="text-xl">{icon}</span>
                  {!isHome && <span className="truncate">{name}</span>}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* Spacer for Mobile Topbar */}
      <div className="h-14 md:hidden" />
    </>
  );
};

export default Navbar;
