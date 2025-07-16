import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { analytics } from '../firebaseconfig';
import { logEvent } from 'firebase/analytics';

// Components
import Navbar from './Components/Navbar';
import AiHelperFloating from './pages/AiHelper';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import AiHelper from './pages/AiHelper';

// 🔤 Text Tools
import CaseConverter from './tools/Text/CaseConverter';
import BionicReader from './tools/Text/BionicReader';
import LoremIpsum from './tools/Text/LoremIpsum';
import MarkDownPreviewer from './tools/Text/MarkdownPreviewer';
import PasswordGenerator from './tools/Text/PasswordGenerator';
import TextDiffer from './tools/Text/TextDiffer';

// 📈 SEO Tools
import MetaTags from './tools/SEO/MetaTags';
import SlugGenerator from './tools/SEO/SlugGenerator';

// 💻 JS Tools
import JSONFormatter from './tools/JSON/JSONFormatter';
import JSMInifier from './tools/JS/JSMinifier';
import RegexHelper from './tools/JS/RegexHelper';
import UUIDGenerator from './tools/JS/UUIDGenerator';

// 🖼️ Image Tools
import BackgroundRemover from './tools/Image/BackgroundRemover';
import ImageCompressor from './tools/Image/ImageCompressor';
import ImageToBase64 from './tools/Image/ImageToBase64';
import ImageEnlarger from './tools/Image/ImageEnlarger';

// 🔐 Encoding Tools
import Base64Converter from './tools/Encoding/Base64Converter';
import HTMLEscapeTool from './tools/Encoding/HTMLEscapeTool';
import StringEncoder from './tools/Encoding/StringEncoder';

// 🛠️ Dev Tools
import EnvGenerator from './tools/Dev/EnvGenerator';
import GitignoreGenerator from './tools/Dev/GitignoreGenerator';
import Playground from './tools/Dev/Playground';

// 🎨 CSS Tools
import AnimationPreviewer from './tools/CSS/AnimationPreviewer';
import BoxShadowGenerator from './tools/CSS/BoxShadowGenerator';
import CSSMinifier from './tools/CSS/CSSMinifier';
import GridGenerator from './tools/CSS/GridGenerator';

// 🌈 Color Tools
import ColorConverter from './tools/Color/ColorConverter';
import ContrastChecker from './tools/Color/ContrastChecker';

function AnalyticsTracker() {
  const location = useLocation();

  useEffect(() => {
    if (analytics) {
      logEvent(analytics, 'page_view', {
        page_path: location.pathname,
      });
    }
  }, [location]);

  return null;
}

function App() {
  return (

      <div className="flex min-h-screen bg-[#0B0F19] text-white">
        {/* Sidebar/Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-grow align-middle justify-center relative">
          <AnalyticsTracker />

          <Routes>
            {/* General Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/ai-helper" element={<AiHelper />} />

            {/* Text Tools */}
            <Route path="/case-converter" element={<CaseConverter />} />
            <Route path="/bionic-reader" element={<BionicReader />} />
            <Route path="/lorem-ipsum" element={<LoremIpsum />} />
            <Route path="/markdown-previewer" element={<MarkDownPreviewer />} />
            <Route path="/password-generator" element={<PasswordGenerator />} />
            <Route path="/text-differ" element={<TextDiffer />} />

            {/* SEO Tools */}
            <Route path="/meta-tags" element={<MetaTags />} />
            <Route path="/slug-generator" element={<SlugGenerator />} />

            {/* JS Tools */}
            <Route path="/json-formatter" element={<JSONFormatter />} />
            <Route path="/js-minifier" element={<JSMInifier />} />
            <Route path="/regex-helper" element={<RegexHelper />} />
            <Route path="/uuid-generator" element={<UUIDGenerator />} />

            {/* Image Tools */}
            <Route path="/background-remover" element={<BackgroundRemover />} />
            <Route path="/image-compressor" element={<ImageCompressor />} />
            <Route path="/image-enlarger" element={<ImageEnlarger />} />
            <Route path="/image-to-base64" element={<ImageToBase64 />} />

            {/* Encoding Tools */}
            <Route path="/base64-converter" element={<Base64Converter />} />
            <Route path="/html-escape-tool" element={<HTMLEscapeTool />} />
            <Route path="/string-encoder" element={<StringEncoder />} />

            {/* Dev Tools */}
            <Route path="/env-generator" element={<EnvGenerator />} />
            <Route path="/gitignore-generator" element={<GitignoreGenerator />} />
            <Route path="/playground" element={<Playground />} />

            {/* CSS Tools */}
            <Route path="/animation-previewer" element={<AnimationPreviewer />} />
            <Route path="/box-shadow-generator" element={<BoxShadowGenerator />} />
            <Route path="/css-minifier" element={<CSSMinifier />} />
            <Route path="/grid-generator" element={<GridGenerator />} />

            {/* Color Tools */}
            <Route path="/color-converter" element={<ColorConverter />} />
            <Route path="/contrast-checker" element={<ContrastChecker />} />
          </Routes>

          {/* 👇 Lara AI Floating Assistant - Always Active */}
          <AiHelperFloating />
        </main>
      </div>

  );
}

export default App;
