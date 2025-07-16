import React, { useState } from 'react';
import { FaCopy } from 'react-icons/fa6';

const hexToRgb = (hex) => {
  const cleanHex = hex.replace('#', '');
  const bigint = parseInt(cleanHex, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgb(${r}, ${g}, ${b})`;
};

const rgbToHex = (rgb) => {
  const result = rgb.match(/\d+/g);
  if (!result || result.length < 3) return '#000000';
  const r = parseInt(result[0]).toString(16).padStart(2, '0');
  const g = parseInt(result[1]).toString(16).padStart(2, '0');
  const b = parseInt(result[2]).toString(16).padStart(2, '0');
  return `#${r}${g}${b}`;
};

const ColorConverter = () => {
  const [hex, setHex] = useState('#4f46e5');
  const [rgb, setRgb] = useState(hexToRgb('#4f46e5'));
  const [copied, setCopied] = useState('');

  const handleHexChange = (value) => {
    setHex(value);
    setRgb(hexToRgb(value));
  };

  const handleRgbChange = (value) => {
    setRgb(value);
    setHex(rgbToHex(value));
  };

  const copyToClipboard = (value, type) => {
    navigator.clipboard.writeText(value);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-6 md:ml-64">
      <h1 className="text-2xl font-bold mb-6">🎨 Color Converter Tool</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#1f2937] p-6 rounded-lg border border-[#334155]">
          <label className="block mb-2 text-gray-400">HEX Code</label>
          <input
            type="text"
            value={hex}
            onChange={(e) => handleHexChange(e.target.value)}
            className="w-full p-3 rounded bg-[#111827] text-white border border-[#334155]"
          />
          <button
            onClick={() => copyToClipboard(hex, 'hex')}
            className="mt-2 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded"
          >
            <FaCopy className="inline mr-2" />
            {copied === 'hex' ? 'Copied!' : 'Copy HEX'}
          </button>
        </div>

        <div className="bg-[#1f2937] p-6 rounded-lg border border-[#334155]">
          <label className="block mb-2 text-gray-400">RGB Code</label>
          <input
            type="text"
            value={rgb}
            onChange={(e) => handleRgbChange(e.target.value)}
            className="w-full p-3 rounded bg-[#111827] text-white border border-[#334155]"
          />
          <button
            onClick={() => copyToClipboard(rgb, 'rgb')}
            className="mt-2 bg-green-600 hover:bg-green-700 px-3 py-1 rounded"
          >
            <FaCopy className="inline mr-2" />
            {copied === 'rgb' ? 'Copied!' : 'Copy RGB'}
          </button>
        </div>
      </div>

      <div className="mt-8 text-center">
        <div
          className="inline-block w-40 h-40 rounded-lg border-4 border-white"
          style={{ backgroundColor: hex }}
        ></div>
        <p className="mt-2 text-sm text-gray-400">Live Preview</p>
      </div>
    </div>
  );
};

export default ColorConverter;
