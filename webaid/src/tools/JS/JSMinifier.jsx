import React, { useState } from 'react';
import { FaCopy, FaBroom, FaCompressAlt } from 'react-icons/fa';
import { minify } from 'terser';

const JSMinifier = () => {
  const [inputCode, setInputCode] = useState('');
  const [minifiedCode, setMinifiedCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleMinify = async () => {
    try {
      setError('');
      const result = await minify(inputCode);
      setMinifiedCode(result.code || '');
      setCopied(false);
    } catch (err) {
      setError('⚠️ Error minifying JavaScript. Please check your code.');
      setMinifiedCode('');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(minifiedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputCode('');
    setMinifiedCode('');
    setError('');
    setCopied(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white px-4 py-10 md:ml-64 transition-all duration-300">
      <div className="w-full max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">⚡ JS Minifier Tool</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Code */}
          <div className="bg-[#1e293b] p-4 rounded-md border border-[#334155]">
            <label className="text-sm text-gray-400 block mb-2">Paste Your JavaScript Code</label>
            <textarea
              className="w-full h-64 p-3 bg-[#0f172a] border border-[#334155] rounded-md resize-none"
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder={`function hello() {\n  console.log("Hello, World!");\n}`}
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={handleClear}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
              >
                <FaBroom /> Clear
              </button>
              <button
                onClick={handleMinify}
                disabled={!inputCode.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
              >
                <FaCompressAlt /> Minify
              </button>
            </div>
          </div>

          {/* Output Code */}
          <div className="bg-[#1e293b] p-4 rounded-md border border-[#334155] relative">
            <label className="text-sm text-gray-400 block mb-2">Minified Code</label>
            <textarea
              className="w-full h-64 p-3 bg-[#0f172a] border border-[#334155] rounded-md resize-none"
              value={minifiedCode}
              readOnly
              placeholder="Minified code will appear here..."
            />
            {minifiedCode && (
              <button
                onClick={handleCopy}
                className="absolute top-4 right-4 text-green-400 hover:text-green-300 text-sm"
              >
                {copied ? 'Copied!' : <FaCopy />}
              </button>
            )}
          </div>
        </div>

        {error && (
          <div className="text-red-500 bg-[#1e1b1b] border border-red-600 p-4 rounded-md">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default JSMinifier;
