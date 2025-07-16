import React, { useState } from 'react';

const BoxShadowGenerator = () => {
  const [horizontal, setHorizontal] = useState(10);
  const [vertical, setVertical] = useState(10);
  const [blur, setBlur] = useState(20);
  const [spread, setSpread] = useState(0);
  const [color, setColor] = useState('#000000');
  const [inset, setInset] = useState(false);

  const boxShadow = `${inset ? 'inset ' : ''}${horizontal}px ${vertical}px ${blur}px ${spread}px ${color}`;
  const tailwindCode = `shadow-[${horizontal}px_${vertical}px_${blur}px_${spread}px_${color.replace('#', '')}]${inset ? '_inset' : ''}`;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-6 md:ml-64">
      <h1 className="text-2xl font-bold mb-6">🎨 Box Shadow Generator</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Controls */}
        <div className="space-y-4 bg-[#1f2937] p-5 rounded-lg border border-[#334155]">
          <label className="block">Horizontal Offset:
            <input type="range" min="-100" max="100" value={horizontal} onChange={(e) => setHorizontal(Number(e.target.value))} className="w-full" />
          </label>
          <label className="block">Vertical Offset:
            <input type="range" min="-100" max="100" value={vertical} onChange={(e) => setVertical(Number(e.target.value))} className="w-full" />
          </label>
          <label className="block">Blur Radius:
            <input type="range" min="0" max="100" value={blur} onChange={(e) => setBlur(Number(e.target.value))} className="w-full" />
          </label>
          <label className="block">Spread Radius:
            <input type="range" min="-50" max="50" value={spread} onChange={(e) => setSpread(Number(e.target.value))} className="w-full" />
          </label>
          <label className="block">Color:
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-10 border border-gray-700 rounded" />
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={inset} onChange={() => setInset(!inset)} />
            Inset
          </label>
        </div>

        {/* Preview */}
        <div className="flex flex-col items-center justify-center bg-[#1f2937] p-6 rounded-lg border border-[#334155]">
          <div
            className="w-40 h-40 bg-indigo-500 rounded-lg mb-6"
            style={{ boxShadow }}
          ></div>
          <div className="w-full text-sm text-green-400 bg-[#0f172a] p-4 rounded overflow-x-auto">
            <p><strong>CSS:</strong></p>
            <pre>box-shadow: {boxShadow};</pre>
            <p className="mt-4"><strong>Tailwind (custom):</strong></p>
            <pre>{tailwindCode}</pre>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BoxShadowGenerator;
