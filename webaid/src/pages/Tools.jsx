import React from 'react';
import ToolCard from '../Components/ToolCard';
import {
  MdTextFields,
  MdCode,
  MdOutlineLanguage,
  MdTag,
  MdOutlineFormatAlignLeft,
  MdLink,
  MdColorLens,
  MdCompareArrows
} from 'react-icons/md';
import {
  FaRegSquareFull,
  FaBookReader,
  FaKey
} from 'react-icons/fa6';
import { SiCss3, SiJavascript } from 'react-icons/si';
import { BiCodeAlt } from 'react-icons/bi';

const tools = [
  { name: 'Case Converter', path: '/case-converter', icon: <MdTextFields /> },
  { name: 'JSON Formatter', path: '/json-formatter', icon: <MdCode /> },
  { name: 'Lorem Ipsum', path: '/lorem-ipsum', icon: <MdOutlineLanguage /> },
  { name: 'Meta Tags', path: '/meta-tag-generator', icon: <MdTag /> },
  { name: 'HTML Escape Tool', path: '/html-escape-tool', icon: <MdOutlineFormatAlignLeft /> },
  { name: 'Slug Generator', path: '/slug-generator', icon: <MdLink /> },
  { name: 'Box Shadow Generator', path: '/box-shadow', icon: <FaRegSquareFull /> },
  { name: 'Color Converter', path: '/color-converter', icon: <MdColorLens /> },
  { name: 'Text Differ Checker', path: '/text-difference-tool', icon: <MdCompareArrows /> },
  { name: 'Regex Helper', path: '/regex-helper', icon: <BiCodeAlt /> },
  { name: 'Bionic Reader', path: '/bionic-reader', icon: <FaBookReader /> },
  { name: 'CSS Minifier', path: '/css-minifier', icon: <SiCss3 /> },
  { name: 'JS Minifier', path: '/js-minifier', icon: <SiJavascript /> },
  { name: 'Password Generator', path: '/password-generator', icon: <FaKey /> },
];

const ToolsPage = () => {
  return (
    <div className="pt-8">
      <h2 className="text-2xl font-semibold text-white mb-6">WebAid Toolbox</h2>
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {tools.map(tool => (
          <ToolCard key={tool.name} {...tool} />
        ))}
      </div>
    </div>
  );
};

export default ToolsPage;
