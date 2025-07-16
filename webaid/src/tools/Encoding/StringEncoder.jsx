import React, { useState } from 'react';
import { FaExchangeAlt, FaClipboard, FaBroom } from 'react-icons/fa';

const StringEncoder = () => {
  const [input, setInput] = useState('');
  const [encoded, setEncoded] = useState('');
  const [encodingType, setEncodingType] = useState('base64');
  const [copied, setCopied] = useState(false);

  const encodeString = (str, type) => {
    switch (type) {
      case 'base64':
        return btoa(unescape(encodeURIComponent(str)));
      case 'uri':
        return encodeURIComponent(str);
      case 'html':
        return str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&#039;');
      case 'binary':
        return str.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
      case 'hex':
        return str.split('').map(char => char.charCodeAt(0).toString(16)).join(' ');
      default:
        return str;
    }
  };

  const handleEncode = () => {
    const result = encodeString(input, encodingType);
    setEncoded(result);
    setCopied(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(encoded);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleClear = () => {
    setInput('');
    setEncoded('');
    setCopied(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white px-4 py-10 md:ml-64 transition-all duration-300">
      <div className="w-full max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold flex items-center gap-2">🧬 String Encoder</h1>

        <div className="bg-[#1e293b] p-6 rounded-xl border border-[#334155] shadow-xl space-y-6">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="text-sm text-gray-400">Encoding Type:</span>
            <select
              value={encodingType}
              onChange={(e) => setEncodingType(e.target.value)}
              className="bg-[#0f172a] border border-[#334155] text-white px-3 py-2 rounded-md text-sm"
            >
              <option value="base64">Base64</option>
              <option value="uri">URI Component</option>
              <option value="html">HTML Entities</option>
              <option value="binary">Binary</option>
              <option value="hex">Hexadecimal</option>
            </select>

            <button
              onClick={handleClear}
              className="ml-auto text-sm bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md flex items-center gap-2"
            >
              <FaBroom /> Clear
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Input String</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter string to encode"
                className="w-full h-40 bg-[#0f172a] border border-[#334155] p-3 rounded text-sm"
              />
            </div>

            <div>
              <label className="text-sm text-gray-400 mb-1 block">Encoded Output</label>
              <textarea
                value={encoded}
                readOnly
                className="w-full h-40 bg-[#0f172a] border border-[#334155] p-3 rounded text-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={handleEncode}
              disabled={!input}
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md flex items-center gap-2 text-white text-sm"
            >
              <FaExchangeAlt /> Encode
            </button>

            {encoded && (
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

export default StringEncoder;
