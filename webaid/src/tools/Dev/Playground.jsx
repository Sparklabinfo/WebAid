// Playground.js - Custom Editor with Syntax Highlighting and Basic Intelligence

import React, { useState } from 'react';

const languageModes = {
  javascript: {
    run: (code) => {
      try {
        const result = eval(code);
        return result === undefined ? '✅ Executed without return' : result;
      } catch (e) {
        return '❌ Error: ' + e.message;
      }
    },
    suggestions: ['console.log()', 'let', 'const', 'function', 'if', 'else', 'for', 'while']
  },
  html: {
    run: (code) => {
      const newWindow = window.open();
      newWindow.document.write(code);
      newWindow.document.close();
      return '✅ Preview opened';
    },
    suggestions: ['<html>', '<body>', '<h1>', '<p>', '<div>', '<script>', '<style>']
  },
  python: {
    run: () => 'Python is not supported in-browser. Consider using WebAssembly.',
    suggestions: ['print()', 'def', 'import', 'if', 'else', 'for', 'while']
  },
  cpp: {
    run: () => 'C++ is not supported in-browser. Consider using WebAssembly.',
    suggestions: ['#include', 'int main()', 'std::cout', 'std::cin']
  }
};

const getHighlightColor = (word, language) => {
  const jsKeywords = ['const', 'let', 'function', 'return', 'if', 'else', 'for', 'while'];
  const htmlTags = ['html', 'body', 'head', 'div', 'span', 'h1', 'p', 'script', 'style'];
  
  if (language === 'javascript' && jsKeywords.includes(word)) return 'text-yellow-400';
  if (language === 'html' && htmlTags.includes(word.replace(/[<>]/g, ''))) return 'text-green-400';
  return 'text-white';
};

const Playground = () => {
  const [language, setLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');

  const handleRun = () => {
    const result = languageModes[language].run(code);
    setOutput(String(result));
  };

  const highlightedCode = code.split(/([\s\(\)\{\};]+)/).map((token, i) => {
    const color = getHighlightColor(token, language);
    return <span key={i} className={color}>{token}</span>;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white px-4 py-10 md:ml-64 transition-all duration-300">
      <div className="w-full max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">🧠 Playground – Code Editor</h1>

        <div className="flex gap-4 items-center">
          <label>Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-[#1e293b] border border-gray-600 p-2 rounded text-white"
          >
            <option value="javascript">JavaScript</option>
            <option value="html">HTML</option>
            <option value="python">Python</option>
            <option value="cpp">C++</option>
          </select>
          <button
            onClick={handleRun}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white"
          >
            ▶ Run
          </button>
          <button
            onClick={() => { setCode(''); setOutput(''); }}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded text-white"
          >
            🧹 Clear
          </button>
        </div>

        {/* Editor Area */}
        <div className="relative border border-gray-600 rounded bg-[#111827] p-4 min-h-[200px]">
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="Type your code here..."
            className="absolute inset-0 w-full h-full opacity-0 z-10 resize-none"
          />
          <pre className="whitespace-pre-wrap break-words text-sm z-0">
            {highlightedCode}
          </pre>
        </div>

        {/* Output */}
        <div className="bg-[#1e293b] border border-gray-700 rounded p-4 text-sm">
          <strong>Output:</strong>
          <div className="mt-2 text-green-400 whitespace-pre-wrap">{output}</div>
        </div>

        {/* Suggestions */}
        <div className="bg-[#1e293b] border border-gray-700 rounded p-4">
          <strong className="block mb-2">Suggestions:</strong>
          <div className="flex flex-wrap gap-2">
            {languageModes[language].suggestions.map((s, idx) => (
              <button
                key={idx}
                onClick={() => setCode(code + s)}
                className="bg-gray-700 hover:bg-gray-600 text-sm px-3 py-1 rounded"
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playground;
