import React, { useState } from 'react';
import { FaCopy, FaSync, FaPlus } from 'react-icons/fa';

const generateUUID = () => {
  if (crypto.randomUUID) {
    return crypto.randomUUID();
  }

  // Manual fallback for UUID v4
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = crypto.getRandomValues(new Uint8Array(1))[0] % 16;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

const UUIDGenerator = () => {
  const [uuids, setUUIDs] = useState([generateUUID()]);
  const [count, setCount] = useState(1);
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleGenerate = () => {
    const newUUIDs = Array.from({ length: count }, () => generateUUID());
    setUUIDs(newUUIDs);
    setCopiedIndex(null);
  };

  const handleCopy = (uuid, index) => {
    navigator.clipboard.writeText(uuid);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleCopyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'));
    setCopiedIndex('all');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white px-4 py-10 md:ml-64 transition-all duration-300">
      <div className="w-full max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">🆔 UUID Generator</h1>

        <div className="bg-[#1e293b] p-6 rounded-lg border border-[#334155] space-y-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <label className="text-sm text-gray-400 w-full sm:w-auto">How many UUIDs?</label>
            <input
              type="number"
              value={count}
              onChange={(e) => setCount(Math.min(50, Math.max(1, Number(e.target.value))))}
              className="w-full sm:w-28 px-3 py-2 rounded-md bg-[#0f172a] border border-[#334155] text-white"
              min={1}
              max={50}
            />
            <button
              onClick={handleGenerate}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <FaPlus /> Generate
            </button>
            <button
              onClick={handleCopyAll}
              disabled={!uuids.length}
              className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <FaCopy />
              {copiedIndex === 'all' ? 'Copied!' : 'Copy All'}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {uuids.map((uuid, i) => (
              <div
                key={i}
                className="bg-[#0f172a] p-3 rounded-md border border-[#334155] flex justify-between items-center"
              >
                <span className="text-sm break-all">{uuid}</span>
                <button
                  onClick={() => handleCopy(uuid, i)}
                  className="text-green-400 hover:text-green-300 text-sm"
                >
                  {copiedIndex === i ? 'Copied!' : <FaCopy />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UUIDGenerator;
