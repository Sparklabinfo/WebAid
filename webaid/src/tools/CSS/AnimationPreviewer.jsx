import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const AnimationPreviewer = () => {
  const [animationType, setAnimationType] = useState('fade');
  const [duration, setDuration] = useState(1);
  const [delay, setDelay] = useState(0);
  const [easing, setEasing] = useState('easeInOut');
  const [aiCSS, setAiCSS] = useState('');
  const [aiExplanation, setAiExplanation] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [loading, setLoading] = useState(false);

  const animationVariants = {
    fade: { opacity: [0, 1] },
    slideLeft: { x: [100, 0] },
    slideRight: { x: [-100, 0] },
    scaleUp: { scale: [0.5, 1] },
    rotate: { rotate: [0, 360] },
  };

  const cssCode = `
@keyframes example {
  from {
    ${animationType === 'fade' ? 'opacity: 0' : animationType === 'slideLeft' ? 'transform: translateX(100px)' : animationType === 'slideRight' ? 'transform: translateX(-100px)' : animationType === 'scaleUp' ? 'transform: scale(0.5)' : animationType === 'rotate' ? 'transform: rotate(0deg)' : ''};
  }
  to {
    ${animationType === 'fade' ? 'opacity: 1' : animationType === 'slideLeft' ? 'transform: translateX(0)' : animationType === 'slideRight' ? 'transform: translateX(0)' : animationType === 'scaleUp' ? 'transform: scale(1)' : animationType === 'rotate' ? 'transform: rotate(360deg)' : ''};
  }
}

.animated {
  animation: example ${duration}s ${easing} ${delay}s;
}`;

  const handleAIGenerate = async () => {
    if (!aiPrompt.trim()) return;
    setLoading(true);
    try {
      const prompt = `Generate a CSS animation and explain it based on the following idea:\n"${aiPrompt}"`;

      const apiKey = '';//replace your api key
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
      });

      const data = await res.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || 'AI response unavailable.';
      const [explanation, codeBlock] = text.split('```css');
      setAiExplanation(explanation.trim());
      setAiCSS(codeBlock?.replace('```', '')?.trim() || '');
    } catch (err) {
      setAiExplanation('❌ Failed to fetch AI response.');
    } finally {
      setLoading(false);
    }
  };

  const createMarkup = () => {
    const dirtyHTML = marked(aiExplanation, { breaks: true, gfm: true });
    const cleanHTML = DOMPurify.sanitize(dirtyHTML);
    return { __html: cleanHTML };
  };

  return (
    <div className="min-h-screen flex flex-col gap-8 bg-[#0B0F19] text-white p-6 md:ml-64">
      <h1 className="text-2xl font-bold">🎬 CSS Animation Previewer + AI Markdown</h1>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4 bg-[#1f2937] p-5 rounded-lg border border-[#334155]">
          <label className="block">Animation Type:
            <select className="w-full mt-1 bg-[#111827] text-white p-2 rounded" value={animationType} onChange={(e) => setAnimationType(e.target.value)}>
              <option value="fade">Fade</option>
              <option value="slideLeft">Slide Left</option>
              <option value="slideRight">Slide Right</option>
              <option value="scaleUp">Scale Up</option>
              <option value="rotate">Rotate</option>
            </select>
          </label>

          <label className="block">Duration (s):
            <input type="number" step="0.1" value={duration} onChange={(e) => setDuration(parseFloat(e.target.value))} className="w-full mt-1 bg-[#111827] text-white p-2 rounded" />
          </label>

          <label className="block">Delay (s):
            <input type="number" step="0.1" value={delay} onChange={(e) => setDelay(parseFloat(e.target.value))} className="w-full mt-1 bg-[#111827] text-white p-2 rounded" />
          </label>

          <label className="block">Easing:
            <select value={easing} onChange={(e) => setEasing(e.target.value)} className="w-full mt-1 bg-[#111827] text-white p-2 rounded">
              <option value="easeIn">easeIn</option>
              <option value="easeOut">easeOut</option>
              <option value="easeInOut">easeInOut</option>
              <option value="linear">linear</option>
            </select>
          </label>
        </div>

        <div className="flex flex-col items-center justify-center gap-4 bg-[#1f2937] p-6 border border-[#334155] rounded-lg">
          <motion.div
            key={animationType + duration + delay + easing}
            initial="hidden"
            animate="visible"
            variants={{
              hidden: animationVariants[animationType],
              visible: {
                ...animationVariants[animationType],
                transition: { duration, delay, ease: easing },
              },
            }}
            className="w-32 h-32 bg-indigo-500 rounded-lg shadow-md"
          />

          <pre className="text-xs mt-4 bg-[#0f172a] p-3 w-full text-green-400 rounded-md overflow-x-auto">
            {cssCode.trim()}
          </pre>
        </div>
      </div>

      <div className="bg-[#1f2937] border border-[#334155] p-6 rounded-lg">
        <h2 className="text-xl font-semibold mb-3">✨ AI CSS Animation Generator</h2>
        <textarea
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          placeholder="Describe your animation (e.g., bounce with delay and scale)."
          className="w-full p-3 mb-4 bg-[#111827] text-white rounded border border-[#334155]"
        />
        <button onClick={handleAIGenerate} disabled={loading} className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-md text-white">
          {loading ? 'Generating...' : '🎨 Generate with AI'}
        </button>
      </div>

      {aiExplanation && (
        <div className="bg-[#1f2937] border border-[#334155] p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-2">🤖 AI Markdown Preview</h2>
          <div className="prose prose-invert bg-[#0f172a] p-4 rounded" dangerouslySetInnerHTML={createMarkup()} />
        </div>
      )}

      {aiCSS && (
        <div className="mt-4 bg-[#1f2937] w-full max-w-full mx-auto border border-[#334155] p-6 rounded-lg">
  <h3 className="text-lg font-semibold text-green-400 mb-2">💻 AI Generated CSS</h3>
  <pre className="bg-[#0f172a] text-green-300 text-sm p-4 rounded overflow-x-auto w-[90%]">
    {aiCSS}
  </pre>
</div>
      )}
    </div>
  );
};

export default AnimationPreviewer;
