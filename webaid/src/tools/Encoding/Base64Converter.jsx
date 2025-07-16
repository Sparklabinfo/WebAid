import React, { useState } from 'react';
import { FaArrowRightArrowLeft, FaClipboard, FaBroom } from 'react-icons/fa6';

const Base64Converter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode');
  const [copied, setCopied] = useState(false);

  const handleConvert = () => {
    try {
      if (mode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        setOutput(encoded);
      } else {
        const decoded = decodeURIComponent(escape(atob(input)));
        setOutput(decoded);
      }
    } catch (err) {
      setOutput('❌ Invalid Base64 or character set.');
    }
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setCopied(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white px-4 py-10 md:ml-64 transition-all duration-300">
      <div className="w-full max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          🔐 Base64 Converter Tool
        </h1>

        <div className="bg-[#1e293b] p-6 rounded-xl border border-[#334155] shadow-xl space-y-6">
          <div className="flex flex-wrap gap-3 items-center">
            <label className="text-sm text-gray-400">Mode:</label>
            <button
              className={`px-4 py-2 rounded-md text-sm border ${mode === 'encode' ? 'bg-indigo-600 border-indigo-700' : 'bg-[#0f172a] border-[#334155]'}`}
              onClick={() => setMode('encode')}
            >
              Encode
            </button>
            <button
              className={`px-4 py-2 rounded-md text-sm border ${mode === 'decode' ? 'bg-indigo-600 border-indigo-700' : 'bg-[#0f172a] border-[#334155]'}`}
              onClick={() => setMode('decode')}
            >
              Decode
            </button>
            <button
              onClick={clearAll}
              className="ml-auto flex items-center gap-2 px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md"
            >
              <FaBroom /> Clear
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">{mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-40 bg-[#0f172a] border border-[#334155] p-3 rounded text-sm"
                placeholder="Enter your text here..."
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">Output</label>
              <textarea
                value={output}
                readOnly
                className="w-full h-40 bg-[#0f172a] border border-[#334155] p-3 rounded text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleConvert}
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md flex items-center gap-2 text-white text-sm"
            >
              <FaArrowRightArrowLeft /> {mode === 'encode' ? 'Encode' : 'Decode'}
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

export default Base64Converter;
