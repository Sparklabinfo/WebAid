import React, { useState } from 'react';
import { FaCopy, FaDownload, FaRobot } from 'react-icons/fa';

const GitignoreGenerator = () => {
  const [selectedTechs, setSelectedTechs] = useState([]);
  const [customEntry, setCustomEntry] = useState('');
  const [gitignoreContent, setGitignoreContent] = useState('');
  const [aiLoading, setAiLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const commonTemplates = [
    'Node', 'React', 'Python', 'Java', 'Next.js', 'Django', 'VSCode', 'MacOS', 'Linux', 'Windows', 'Firebase', 'Flutter'
  ];

  const handleSelect = (tech) => {
    setSelectedTechs((prev) =>
      prev.includes(tech) ? prev.filter((t) => t !== tech) : [...prev, tech]
    );
  };

  const handleCustomAdd = () => {
    if (customEntry && !selectedTechs.includes(customEntry)) {
      setSelectedTechs((prev) => [...prev, customEntry]);
      setCustomEntry('');
    }
  };

  const generateGitignoreWithAI = async () => {
    setAiLoading(true);
    const prompt = `Generate a .gitignore file for the following technologies and environments: ${selectedTechs.join(", ")}. Keep it optimized for common use cases.`;

    try {
      const payload = {
        contents: [{ parts: [{ text: prompt }] }]
      };
      const API_KEY=' '//replace your Api key
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        }
      );

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      setGitignoreContent(text || '# No content generated.');
    } catch (err) {
      setGitignoreContent(`# Failed to generate with AI. Try again.\nError: ${err.message}`);
    } finally {
      setAiLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(gitignoreContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([gitignoreContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '.gitignore';
    link.click();
  };

  return (
    <div className="min-h-screen px-4 py-10 md:ml-64 bg-[#0B0F19] text-white transition-all duration-300">
      <div className="w-full max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">🚫 .gitignore File Generator</h1>

        <div className="bg-[#1e293b] p-6 rounded-xl border border-[#334155] shadow-xl space-y-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {commonTemplates.map((tech) => (
              <button
                key={tech}
                onClick={() => handleSelect(tech)}
                className={`text-sm px-3 py-2 rounded-md border border-[#334155] ${
                  selectedTechs.includes(tech) ? 'bg-indigo-600 text-white' : 'bg-[#0f172a] text-gray-300'
                }`}
              >
                {tech}
              </button>
            ))}
          </div>

          <div className="flex gap-2 mt-4">
            <input
              type="text"
              value={customEntry}
              onChange={(e) => setCustomEntry(e.target.value)}
              placeholder="Add custom tech/tool"
              className="flex-1 px-3 py-2 bg-[#0f172a] border border-[#334155] rounded-md text-sm"
            />
            <button
              onClick={handleCustomAdd}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm"
            >
              Add
            </button>
          </div>

          <button
            onClick={generateGitignoreWithAI}
            disabled={aiLoading || selectedTechs.length === 0}
            className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-md flex items-center gap-2 text-sm"
          >
            <FaRobot /> {aiLoading ? 'Generating...' : 'Generate with Gemini AI'}
          </button>

          {gitignoreContent && (
            <div className="bg-[#0f172a] border border-[#334155] p-4 rounded-md mt-4">
              <pre className="whitespace-pre-wrap text-sm text-green-200">{gitignoreContent}</pre>
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={handleCopy}
                  className="bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md flex items-center gap-2 text-sm"
                >
                  <FaCopy /> {copied ? 'Copied!' : 'Copy'}
                </button>
                <button
                  onClick={handleDownload}
                  className="bg-teal-600 hover:bg-teal-700 px-3 py-2 rounded-md flex items-center gap-2 text-sm"
                >
                  <FaDownload /> Download
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitignoreGenerator;
