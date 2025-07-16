import React, { useState } from 'react';
import tinycolor from 'tinycolor2';
import { FaCopy } from 'react-icons/fa6';

const ContrastChecker = () => {
  const [foreground, setForeground] = useState('#ffffff');
  const [background, setBackground] = useState('#000000');
  const [copied, setCopied] = useState('');

  const contrastRatio = tinycolor.readability(background, foreground).toFixed(2);
  const passesAA = tinycolor.isReadable(background, foreground, { level: 'AA', size: 'normal' });
  const passesAAA = tinycolor.isReadable(background, foreground, { level: 'AAA', size: 'normal' });

  const copyToClipboard = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-6 md:ml-64">
      <h1 className="text-2xl font-bold mb-6">🎨 Contrast Checker Tool</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#1e293b] p-6 rounded border border-[#334155] space-y-4">
          <label className="block">
            Foreground Color:
            <input
              type="color"
              value={foreground}
              onChange={(e) => setForeground(e.target.value)}
              className="ml-2 w-16 h-10 rounded cursor-pointer"
            />
            <span className="ml-4 text-sm">{foreground}</span>
            <button onClick={() => copyToClipboard(foreground, 'fg')} className="ml-2 text-green-400 hover:underline text-sm">
              <FaCopy /> {copied === 'fg' ? 'Copied!' : 'Copy'}
            </button>
          </label>

          <label className="block">
            Background Color:
            <input
              type="color"
              value={background}
              onChange={(e) => setBackground(e.target.value)}
              className="ml-2 w-16 h-10 rounded cursor-pointer"
            />
            <span className="ml-4 text-sm">{background}</span>
            <button onClick={() => copyToClipboard(background, 'bg')} className="ml-2 text-blue-400 hover:underline text-sm">
              <FaCopy /> {copied === 'bg' ? 'Copied!' : 'Copy'}
            </button>
          </label>
        </div>

        <div className="bg-[#1e293b] p-6 rounded border border-[#334155] space-y-4">
          <div
            className="w-full h-40 rounded flex items-center justify-center text-xl font-semibold"
            style={{ color: foreground, backgroundColor: background }}
          >
            Sample Text
          </div>
          <p>
            <strong>Contrast Ratio:</strong> {contrastRatio}:1
          </p>
          <p className={passesAA ? 'text-green-400' : 'text-red-400'}>
            AA: {passesAA ? 'Pass ✅' : 'Fail ❌'}
          </p>
          <p className={passesAAA ? 'text-green-400' : 'text-red-400'}>
            AAA: {passesAAA ? 'Pass ✅' : 'Fail ❌'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContrastChecker;
