import React, { useState } from 'react';

const generateLorem = (paragraphs = 1) => {
  const loremBase = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`;

  return Array.from({ length: paragraphs }, () => loremBase).join('\n\n');
};

const LoremIpsum = () => {
  const [count, setCount] = useState(3);
  const [output, setOutput] = useState(generateLorem(3));
  const [copied, setCopied] = useState(false);

  const handleGenerate = () => {
    const clamped = Math.max(1, Math.min(count, 10)); // limit between 1 and 10
    setOutput(generateLorem(clamped));
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto text-gray-200">
      <h1 className="text-2xl font-bold mb-4">📜 Lorem Ipsum Generator</h1>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
        <label className="flex items-center gap-2">
          <span className="text-sm">Paragraphs:</span>
          <input
            type="number"
            value={count}
            onChange={(e) => setCount(parseInt(e.target.value))}
            min={1}
            max={10}
            className="w-20 px-2 py-1 rounded bg-[#1e293b] border border-gray-600 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </label>
        <button
          onClick={handleGenerate}
          className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded transition"
        >
          Generate
        </button>
        <button
          onClick={handleCopy}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded transition"
        >
          {copied ? '✅ Copied!' : 'Copy'}
        </button>
      </div>

      {/* Output */}
      <textarea
        className="w-full h-80 p-4 rounded bg-[#0f172a] border border-gray-700 resize-none text-sm"
        value={output}
        readOnly
      />
    </div>
  );
};

export default LoremIpsum;
