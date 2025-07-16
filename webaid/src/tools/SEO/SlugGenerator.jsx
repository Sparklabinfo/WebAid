import React, { useState } from 'react';
import { FaCopy, FaRobot, FaWandMagicSparkles } from 'react-icons/fa6';

const SlugGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [slug, setSlug] = useState('');
  const [aiSlug, setAiSlug] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateSlug = () => {
    const cleaned = inputText
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
    setSlug(cleaned);
    setCopied(false);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateSlugWithAI = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setCopied(false);

    const prompt = `Generate an SEO-friendly URL slug based on this title or description: "${inputText}". Return only the slug.`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    const apiKey = '';//replace your api key
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim().replace(/\n/g, '').replace(/"/g, '');
      setAiSlug(aiReply);
    } catch (err) {
      setAiSlug('❌ Failed to generate slug with AI.');
      console.error('AI Error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white px-4 py-10 md:ml-64 transition-all duration-300">
      <div className="w-full max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold mb-6">🔗 Slug Generator</h1>

        <div className="bg-[#1e293b] p-6 rounded-lg border border-[#334155] space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Enter Title or Phrase</label>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="w-full bg-[#0f172a] border border-[#334155] rounded-md px-4 py-2"
              placeholder="e.g., The Ultimate Guide to React"
            />
          </div>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={generateSlug}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md"
            >
              Generate Slug
            </button>

            <button
              onClick={generateSlugWithAI}
              disabled={loading}
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md flex items-center gap-2"
            >
              <FaRobot /> {loading ? 'Generating...' : 'Generate with AI'}
            </button>
          </div>

          {(slug || aiSlug) && (
            <div className="space-y-4 mt-4">
              {slug && (
                <div className="bg-[#0f172a] p-4 rounded-md border border-[#334155]">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-green-400">Manual Slug</h2>
                    <button
                      onClick={() => handleCopy(slug)}
                      className="text-green-400 hover:text-green-300 text-sm"
                    >
                      {copied ? 'Copied!' : <FaCopy />}
                    </button>
                  </div>
                  <p className="text-sm text-white break-words">{slug}</p>
                </div>
              )}

              {aiSlug && (
                <div className="bg-[#0f172a] p-4 rounded-md border border-[#334155]">
                  <div className="flex justify-between items-center mb-2">
                    <h2 className="text-lg font-semibold text-yellow-400">AI Slug</h2>
                    <button
                      onClick={() => handleCopy(aiSlug)}
                      className="text-yellow-400 hover:text-yellow-300 text-sm"
                    >
                      {copied ? 'Copied!' : <FaCopy />}
                    </button>
                  </div>
                  <p className="text-sm text-white break-words">{aiSlug}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlugGenerator;
