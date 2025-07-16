import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa';

const CaseConverter = () => {
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [copied, setCopied] = useState(false);

  const convertToUpperCase = () => setOutputText(inputText.toUpperCase());
  const convertToLowerCase = () => setOutputText(inputText.toLowerCase());

  const convertToTitleCase = () => {
    const title = inputText
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    setOutputText(title);
  };

  const convertToSentenceCase = () => {
    const sentence = inputText
      .toLowerCase()
      .replace(/(^\s*\w|[\.\!\?]\s*\w)/g, c => c.toUpperCase());
    setOutputText(sentence);
  };

  const copyOutput = () => {
    navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white px-4 py-10 md:ml-64 transition-all duration-300">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-10">
          Case Converter Tool
        </h1>

        {/* Input/Output Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block mb-2 text-sm font-medium">Enter Text</label>
            <textarea
              rows={10}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              placeholder="Type your text here..."
            />
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Converted Output</label>
            <textarea
              rows={10}
              readOnly
              value={outputText}
              className="w-full p-4 rounded-lg bg-gray-900 border border-gray-700 text-gray-200 resize-none"
              placeholder="Converted result will appear here..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <button onClick={convertToUpperCase} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-5 rounded-md shadow">
            UPPER CASE
          </button>
          <button onClick={convertToLowerCase} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-5 rounded-md shadow">
            lower case
          </button>
          <button onClick={convertToTitleCase} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-5 rounded-md shadow">
            Title Case
          </button>
          <button onClick={convertToSentenceCase} className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-5 rounded-md shadow">
            Sentence case
          </button>
          <button
            onClick={copyOutput}
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-5 rounded-md shadow flex items-center gap-2"
          >
            <FaCopy />
            {copied ? 'Copied!' : 'Copy Output'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseConverter;
