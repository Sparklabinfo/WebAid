import React, { useState } from 'react';
import { FaExchangeAlt, FaRobot } from 'react-icons/fa';

const TextDiffer = () => {
  const [textA, setTextA] = useState('');
  const [textB, setTextB] = useState('');
  const [differences, setDifferences] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCompare = () => {
    const aLines = textA.split('\n');
    const bLines = textB.split('\n');
    let diffOutput = '';

    const maxLines = Math.max(aLines.length, bLines.length);
    for (let i = 0; i < maxLines; i++) {
      const aLine = aLines[i] || '';
      const bLine = bLines[i] || '';
      if (aLine !== bLine) {
        diffOutput += `Line ${i + 1}:\n- A: ${aLine}\n+ B: ${bLine}\n\n`;
      }
    }

    setDifferences(diffOutput || '✅ No differences found.');
  };

  const handleExplainDifferenceAI = async () => {
    if (!textA || !textB) return;
    setLoading(true);
    setDifferences('');

    const prompt = `Compare these two texts and explain the differences clearly:\n\n---\nText A:\n${textA}\n---\nText B:\n${textB}`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    const apiKey = '';//Replace your api key
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      setDifferences(aiReply || '🤖 No explanation found.');
    } catch (err) {
      setDifferences('❌ AI comparison failed. Try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white px-4 py-10 md:ml-64 transition-all duration-300">
      <div className="w-full max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold mb-4">🆚 Text Differ & AI Explanation Tool</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Text A</label>
            <textarea
              rows={10}
              value={textA}
              onChange={(e) => setTextA(e.target.value)}
              className="w-full p-3 bg-[#1e293b] border border-[#334155] rounded-md text-white placeholder-gray-500"
              placeholder="Enter original text here..."
            />
          </div>

          <div>
            <label className="text-sm text-gray-400 mb-2 block">Text B</label>
            <textarea
              rows={10}
              value={textB}
              onChange={(e) => setTextB(e.target.value)}
              className="w-full p-3 bg-[#1e293b] border border-[#334155] rounded-md text-white placeholder-gray-500"
              placeholder="Enter modified text here..."
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleCompare}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
          >
            <FaExchangeAlt /> Compare Text
          </button>
          <button
            onClick={handleExplainDifferenceAI}
            disabled={!textA || !textB || loading}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md flex items-center gap-2"
          >
            {loading ? 'Analyzing...' : <><FaRobot /> Explain Differences with AI</>}
          </button>
        </div>

        {differences && (
          <div className="bg-[#1e293b] p-4 rounded-md border border-[#334155] text-sm whitespace-pre-wrap text-yellow-100 mt-4">
            {differences}
          </div>
        )}
      </div>
    </div>
  );
};

export default TextDiffer;
