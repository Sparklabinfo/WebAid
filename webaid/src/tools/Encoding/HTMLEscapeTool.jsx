import React, { useState } from 'react';
import { FaExchangeAlt, FaClipboard, FaBroom } from 'react-icons/fa';

const HTMLEscapeTool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('escape');
  const [copied, setCopied] = useState(false);

  const escapeHTML = (str) => {
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  };

  const unescapeHTML = (str) => {
    return str
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")
      .replace(/&amp;/g, '&');
  };

  const handleConvert = () => {
    const result = mode === 'escape' ? escapeHTML(input) : unescapeHTML(input);
    setOutput(result);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setCopied(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white px-4 py-10 md:ml-64 transition-all duration-300">
      <div className="w-full max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          🔐 HTML Escape / Unescape Tool
        </h1>

        <div className="bg-[#1e293b] p-6 rounded-xl border border-[#334155] shadow-xl space-y-6">
          {/* Mode Switcher */}
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-sm text-gray-400">Mode:</span>
            <button
              onClick={() => setMode('escape')}
              className={`px-4 py-2 rounded-md text-sm border ${mode === 'escape' ? 'bg-indigo-600 border-indigo-700' : 'bg-[#0f172a] border-[#334155]'}`}
            >
              Escape HTML
            </button>
            <button
              onClick={() => setMode('unescape')}
              className={`px-4 py-2 rounded-md text-sm border ${mode === 'unescape' ? 'bg-indigo-600 border-indigo-700' : 'bg-[#0f172a] border-[#334155]'}`}
            >
              Unescape HTML
            </button>

            <button
              onClick={handleClear}
              className="ml-auto text-sm bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md flex items-center gap-2"
            >
              <FaBroom /> Clear
            </button>
          </div>

          {/* Text Areas */}
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-400 block mb-1">
                {mode === 'escape' ? 'Input (Plain text)' : 'Input (HTML entities)'}
              </label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter your content here..."
                className="w-full h-40 bg-[#0f172a] border border-[#334155] p-3 rounded text-sm"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 block mb-1">Output</label>
              <textarea
                value={output}
                readOnly
                className="w-full h-40 bg-[#0f172a] border border-[#334155] p-3 rounded text-sm"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-between">
            <button
              onClick={handleConvert}
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md flex items-center gap-2 text-white text-sm"
            >
              <FaExchangeAlt /> Convert
            </button>

            {output && (
              <button
                onClick={handleCopy}
                className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md flex items-center gap-2 text-white text-sm"
              >
                <FaClipboard /> {copied ? 'Copied!' : 'Copy Output'}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HTMLEscapeTool;
