import React, { useState } from 'react';
import { FaBroom, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';

const RegexHelper = () => {
  const [pattern, setPattern] = useState('');
  const [testString, setTestString] = useState('');
  const [flags, setFlags] = useState({ g: false, i: false, m: false });
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');

  const toggleFlag = (flag) => {
    setFlags({ ...flags, [flag]: !flags[flag] });
  };

  const handleTest = () => {
    try {
      const activeFlags = Object.keys(flags).filter((f) => flags[f]).join('');
      const regex = new RegExp(pattern, activeFlags);
      const results = [...testString.matchAll(regex)];
      setMatches(results);
      setError('');
    } catch (err) {
      setError(`Invalid Regex: ${err.message}`);
      setMatches([]);
    }
  };

  const handleClear = () => {
    setPattern('');
    setTestString('');
    setMatches([]);
    setError('');
    setFlags({ g: false, i: false, m: false });
  };

  const highlightMatches = () => {
    if (!matches.length) return testString;

    let parts = [];
    let lastIndex = 0;

    matches.forEach((match, index) => {
      const [matchedText] = match;
      const start = match.index;
      const end = start + matchedText.length;

      parts.push(testString.slice(lastIndex, start));
      parts.push(
        <span key={index} className="bg-yellow-400 text-black font-semibold px-1 rounded-sm">
          {matchedText}
        </span>
      );
      lastIndex = end;
    });

    parts.push(testString.slice(lastIndex));
    return parts;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white px-4 py-10 md:ml-64 transition-all duration-300">
      <div className="w-full max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">🧪 Regex Helper</h1>

        <div className="bg-[#1e293b] p-6 rounded-lg border border-[#334155] space-y-5">
          {/* Pattern & Flags */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Regular Expression Pattern</label>
              <input
                type="text"
                value={pattern}
                onChange={(e) => setPattern(e.target.value)}
                className="w-full bg-[#0f172a] border border-[#334155] rounded-md px-3 py-2"
                placeholder="e.g., \\bword\\b"
              />
            </div>
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Flags</label>
              <div className="flex gap-4">
                {['g', 'i', 'm'].map((flag) => (
                  <label key={flag} className="flex gap-2 items-center text-sm">
                    <input
                      type="checkbox"
                      checked={flags[flag]}
                      onChange={() => toggleFlag(flag)}
                    />
                    {flag}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Test String */}
          <div>
            <label className="text-sm text-gray-400 mb-1 block">Test String</label>
            <textarea
              value={testString}
              onChange={(e) => setTestString(e.target.value)}
              className="w-full bg-[#0f172a] border border-[#334155] rounded-md px-3 py-2 h-40 resize-none"
              placeholder="Paste text to test regex..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-4">
            <button
              onClick={handleTest}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
            >
              Test Regex
            </button>
            <button
              onClick={handleClear}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <FaBroom /> Clear
            </button>
          </div>

          {/* Error Display */}
          {error && (
            <div className="bg-[#2c1e1e] border border-red-500 p-3 text-red-400 rounded-md text-sm">
              <FaExclamationCircle className="inline-block mr-2" />
              {error}
            </div>
          )}

          {/* Match Result */}
          {!error && matches.length > 0 && (
            <div className="text-sm text-green-400 flex items-center gap-2">
              <FaCheckCircle /> {matches.length} match{matches.length > 1 ? 'es' : ''} found.
            </div>
          )}

          <div className="bg-[#0f172a] p-4 rounded-md border border-[#334155] whitespace-pre-wrap text-sm">
            {highlightMatches()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegexHelper;
