import React, { useState } from 'react';
import { FaCopy, FaPlus, FaTrash } from 'react-icons/fa6';

const GridGenerator = () => {
  const [columns, setColumns] = useState(3);
  const [rows, setRows] = useState(3);
  const [gap, setGap] = useState(10);
  const [copied, setCopied] = useState('');
  const [bentoMode, setBentoMode] = useState(false);
  const [bentoItems, setBentoItems] = useState([
    { id: 1, colSpan: 1, rowSpan: 1 },
    { id: 2, colSpan: 1, rowSpan: 1 },
    { id: 3, colSpan: 1, rowSpan: 1 },
  ]);

  const generateHTML = () => {
    return `<div class="grid-container">
  ${bentoMode ? bentoItems.map(
    item => `<div class="grid-item item-${item.id}">Item ${item.id}</div>`
  ).join('\n  ') :
    Array.from({ length: columns * rows }).map(
      (_, i) => `<div class="grid-item">Item ${i + 1}</div>`
    ).join('\n  ')}
</div>`;
  };

  const generateCSS = () => {
    const baseCSS = `.grid-container {
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  grid-template-rows: repeat(${rows}, auto);
  gap: ${gap}px;
}

.grid-item {
  background: #4f46e5;
  color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
}`;

    const bentoCSS = bentoItems.map(
      item => `.item-${item.id} {
  grid-column: span ${item.colSpan};
  grid-row: span ${item.rowSpan};
}`
    ).join('\n\n');

    return baseCSS + (bentoMode ? '\n\n' + bentoCSS : '');
  };

  const copyCode = (code, type) => {
    navigator.clipboard.writeText(code);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const updateBentoItem = (id, key, value) => {
    setBentoItems(prev => prev.map(item => item.id === id ? { ...item, [key]: value } : item));
  };

  const addBentoItem = () => {
    const newId = bentoItems.length ? Math.max(...bentoItems.map(i => i.id)) + 1 : 1;
    setBentoItems([...bentoItems, { id: newId, colSpan: 1, rowSpan: 1 }]);
  };

  const removeBentoItem = (id) => {
    setBentoItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-6 md:ml-64">
      <h1 className="text-2xl font-bold mb-6">🔲 Grid Generator (HTML + CSS)</h1>

      <div className="mb-4">
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={bentoMode} onChange={() => setBentoMode(!bentoMode)} />
          Enable Bento Grid Mode
        </label>
      </div>

      <div className="grid md:grid-cols-3 gap-4 mb-8 bg-[#1e293b] p-6 rounded border border-[#334155]">
        <label>Columns:
          <input type="number" min="1" value={columns} onChange={(e) => setColumns(Number(e.target.value))} className="w-full mt-1 p-2 rounded bg-[#111827] text-white" />
        </label>

        <label>Rows:
          <input type="number" min="1" value={rows} onChange={(e) => setRows(Number(e.target.value))} className="w-full mt-1 p-2 rounded bg-[#111827] text-white" />
        </label>

        <label>Gap (px):
          <input type="number" min="0" value={gap} onChange={(e) => setGap(Number(e.target.value))} className="w-full mt-1 p-2 rounded bg-[#111827] text-white" />
        </label>
      </div>

      {bentoMode && (
        <div className="bg-[#1f2937] border border-[#334155] p-4 rounded mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-semibold">🧩 Customize Bento Items</h2>
            <button onClick={addBentoItem} className="bg-green-600 px-2 py-1 text-sm rounded hover:bg-green-700 flex items-center gap-2">
              <FaPlus /> Add Item
            </button>
          </div>
          {bentoItems.map(item => (
            <div key={item.id} className="mb-3 bg-[#111827] p-3 rounded">
              <div className="flex justify-between items-center">
                <p className="mb-1">Item {item.id}</p>
                <button onClick={() => removeBentoItem(item.id)} className="text-red-400 hover:text-red-600">
                  <FaTrash />
                </button>
              </div>
              <div className="flex gap-3">
                <label>Col Span:
                  <input type="number" min="1" max={columns} value={item.colSpan} onChange={(e) => updateBentoItem(item.id, 'colSpan', Number(e.target.value))} className="ml-2 w-16 p-1 rounded bg-[#0f172a] text-white" />
                </label>
                <label>Row Span:
                  <input type="number" min="1" max={rows} value={item.rowSpan} onChange={(e) => updateBentoItem(item.id, 'rowSpan', Number(e.target.value))} className="ml-2 w-16 p-1 rounded bg-[#0f172a] text-white" />
                </label>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-[#1f2937] border border-[#334155] p-6 rounded-lg mb-8">
        <h2 className="text-lg font-semibold mb-4">🔍 Live Preview</h2>
        <div
          className="grid bg-[#0f172a] p-4 rounded"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gridTemplateRows: `repeat(${rows}, auto)`,
            gap: `${gap}px`,
          }}
        >
          {(bentoMode ? bentoItems : Array.from({ length: columns * rows })).map((item, i) => (
            <div
              key={bentoMode ? item.id : i}
              className={`bg-indigo-600 p-4 rounded text-center ${bentoMode ? `item-${item.id}` : ''}`}
              style={bentoMode ? {
                gridColumn: `span ${item.colSpan}`,
                gridRow: `span ${item.rowSpan}`,
              } : {}}
            >
              Item {bentoMode ? item.id : i + 1}
            </div>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#1f2937] border border-[#334155] p-4 rounded-lg">
          <h3 className="text-green-400 font-semibold mb-2">📄 HTML</h3>
          <pre className="bg-[#0f172a] text-green-300 p-3 rounded text-sm overflow-x-auto">
            {generateHTML()}
          </pre>
          <button className="mt-2 bg-green-600 hover:bg-green-700 px-3 py-1 rounded flex items-center gap-2" onClick={() => copyCode(generateHTML(), 'html')}>
            <FaCopy /> {copied === 'html' ? 'Copied!' : 'Copy HTML'}
          </button>
        </div>

        <div className="bg-[#1f2937] border border-[#334155] p-4 rounded-lg">
          <h3 className="text-blue-400 font-semibold mb-2">🎨 CSS</h3>
          <pre className="bg-[#0f172a] text-blue-300 p-3 rounded text-sm overflow-x-auto">
            {generateCSS()}
          </pre>
          <button className="mt-2 bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded flex items-center gap-2" onClick={() => copyCode(generateCSS(), 'css')}>
            <FaCopy /> {copied === 'css' ? 'Copied!' : 'Copy CSS'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GridGenerator;
