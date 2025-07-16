import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa6';

const CSSMinifier = () => {
  const [cssInput, setCssInput] = useState('');
  const [minifiedCSS, setMinifiedCSS] = useState('');
  const [copied, setCopied] = useState(false);

  const minifyCSS = () => {
    try {
      const minified = cssInput
        .replace(/\/\*[\s\S]*?\*\//g, '')            // Remove comments
        .replace(/\s{2,}/g, ' ')                     // Collapse whitespace
        .replace(/\s*([:;{}])\s*/g, '$1')            // Remove space around symbols
        .replace(/;}/g, '}')                         // Remove semicolon before }
        .trim();
      setMinifiedCSS(minified);
    } catch (err) {
      setMinifiedCSS('⚠️ Error minifying CSS.');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(minifiedCSS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-4 py-10 md:ml-64 transition-all duration-300">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">🎯 CSS Minifier</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm text-gray-400">Original CSS</label>
            <textarea
              rows="15"
              value={cssInput}
              onChange={(e) => setCssInput(e.target.value)}
              placeholder="Paste your CSS here..."
              className="w-full bg-[#1e293b] text-white p-4 rounded-md border border-[#334155]"
            />
            <button
              onClick={minifyCSS}
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded text-white"
            >
              ✂️ Minify CSS
            </button>
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400">Minified CSS</label>
            <textarea
              rows="15"
              value={minifiedCSS}
              readOnly
              className="w-full bg-[#0f172a] text-green-400 p-4 rounded-md border border-[#334155]"
            />
            <button
              onClick={copyToClipboard}
              className="mt-4 flex items-center gap-2 bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
            >
              <FaCopy /> {copied ? 'Copied!' : 'Copy Minified CSS'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CSSMinifier;
