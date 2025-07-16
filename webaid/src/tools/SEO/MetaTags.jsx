import React, { useState } from 'react';
import { FaCopy, FaRobot } from 'react-icons/fa6';

const MetaTags = () => {
  const [siteTitle, setSiteTitle] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [author, setAuthor] = useState('');
  const [audience, setAudience] = useState('');
  const [language, setLanguage] = useState('');
  const [viewport, setViewport] = useState('width=device-width, initial-scale=1.0');
  const [metaCode, setMetaCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleGenerateAI = async () => {
    setLoading(true);
    setCopied(false);
    const prompt = `Generate valid and optimized HTML meta tags (including Open Graph and Twitter cards) using the following information:

Required:
- Title: ${siteTitle}
- Description: ${description}
- Keywords: ${keywords}
- Author: ${author}

Optional:
- Audience: ${audience}
- Language: ${language}
- Viewport: ${viewport}

Respond only with HTML <meta> tags.`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    const apiKey = '';//replce your api key
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      setMetaCode(reply || '');
    } catch (err) {
      setMetaCode('❌ Failed to generate meta tags with AI.');
      console.error('AI Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(metaCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white px-4 py-10 md:ml-64 transition-all duration-300">
      <div className="w-full max-w-6xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold mb-6">🧠 AI Meta Tags Generator</h1>

        <div className="bg-[#1e293b] p-6 rounded-lg border border-[#334155] space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Website Title <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={siteTitle}
                onChange={(e) => setSiteTitle(e.target.value)}
                className="w-full bg-[#0f172a] border border-[#334155] rounded-md px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Author Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full bg-[#0f172a] border border-[#334155] rounded-md px-4 py-2"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Description <span className="text-red-500">*</span></label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full bg-[#0f172a] border border-[#334155] rounded-md px-4 py-2 min-h-[80px]"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Keywords (comma separated) <span className="text-red-500">*</span></label>
              <input
                type="text"
                value={keywords}
                onChange={(e) => setKeywords(e.target.value)}
                className="w-full bg-[#0f172a] border border-[#334155] rounded-md px-4 py-2"
                required
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Target Audience (optional)</label>
              <input
                type="text"
                value={audience}
                onChange={(e) => setAudience(e.target.value)}
                className="w-full bg-[#0f172a] border border-[#334155] rounded-md px-4 py-2"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Language (optional)</label>
              <input
                type="text"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full bg-[#0f172a] border border-[#334155] rounded-md px-4 py-2"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Viewport Settings (optional)</label>
              <input
                type="text"
                value={viewport}
                onChange={(e) => setViewport(e.target.value)}
                className="w-full bg-[#0f172a] border border-[#334155] rounded-md px-4 py-2"
              />
            </div>
          </div>

          <div className="flex gap-4 flex-wrap">
            <button
              onClick={handleGenerateAI}
              disabled={loading}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <FaRobot /> {loading ? 'Generating...' : 'Generate with AI'}
            </button>

            {metaCode && (
              <button
                onClick={handleCopy}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
              >
                {copied ? 'Copied!' : 'Copy Meta Tags'}
              </button>
            )}
          </div>
        </div>

        {metaCode && (
          <div className="bg-[#0f172a] border border-[#334155] p-6 rounded-md">
            <h2 className="text-lg font-semibold mb-2">🔖 Generated Meta Tags</h2>
            <pre className="whitespace-pre-wrap text-sm text-green-300">
              {metaCode}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetaTags;
