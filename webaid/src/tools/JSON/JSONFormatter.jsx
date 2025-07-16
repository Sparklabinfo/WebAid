import React, { useState } from 'react';
import { FaCopy, FaBroom } from 'react-icons/fa6';

const JSONFormatter = () => {
  const [inputJson, setInputJson] = useState('');
  const [formattedJson, setFormattedJson] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(inputJson);
      const pretty = JSON.stringify(parsed, null, 2);
      setFormattedJson(pretty);
      setError('');
      setCopied(false);
    } catch (err) {
      setFormattedJson('');
      setError('Invalid JSON. Please check your syntax.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(formattedJson);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInputJson('');
    setFormattedJson('');
    setError('');
    setCopied(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white px-4 py-10 md:ml-64 transition-all duration-300">
      <div className="w-full max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold mb-6">📦 JSON Formatter</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Input JSON</label>
            <textarea
              value={inputJson}
              onChange={(e) => setInputJson(e.target.value)}
              className="w-full bg-[#0f172a] border border-[#334155] rounded-md px-4 py-2 min-h-[300px]"
              placeholder="Paste your raw JSON here..."
            />

            <div className="flex gap-4 mt-4">
              <button
                onClick={handleFormat}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
              >
                Format JSON
              </button>
              <button
                onClick={handleClear}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
              >
                <FaBroom /> Clear
              </button>
            </div>
            {error && <p className="text-red-400 mt-2 text-sm">{error}</p>}
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Formatted Output</label>
            <textarea
              value={formattedJson}
              readOnly
              className="w-full bg-[#0f172a] border border-[#334155] rounded-md px-4 py-2 min-h-[300px] text-green-300"
            />

            <button
              onClick={handleCopy}
              disabled={!formattedJson}
              className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
            >
              {copied ? 'Copied!' : <><FaCopy className="inline mr-2" /> Copy Output</>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JSONFormatter;
