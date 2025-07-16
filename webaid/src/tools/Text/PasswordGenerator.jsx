import React, { useState } from 'react';
import { FaCopy, FaEye, FaEyeSlash, FaWandMagicSparkles, FaRobot, FaBrain } from 'react-icons/fa6';

const PasswordGenerator = () => {
  const [length, setLength] = useState(16);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [copied, setCopied] = useState(false);
  const [aiFeedback, setAiFeedback] = useState('');
  const [score, setScore] = useState(null);
  const [scoreLabel, setScoreLabel] = useState('');
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userDetails, setUserDetails] = useState({
    favoriteWord: '',
    birthYear: '',
    memorablePlace: ''
  });

  const charset = {
    upper: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
    lower: 'abcdefghijklmnopqrstuvwxyz',
    numbers: '0123456789',
    symbols: '!@#$%^&*()_+-={}[]|:;<>,.?/~`'
  };

  const generatePassword = () => {
    let chars = '';
    if (includeUppercase) chars += charset.upper;
    if (includeLowercase) chars += charset.lower;
    if (includeNumbers) chars += charset.numbers;
    if (includeSymbols) chars += charset.symbols;

    if (!chars) return setPassword('');

    let result = '';
    const values = new Uint32Array(length);
    crypto.getRandomValues(values);
    for (let i = 0; i < length; i++) {
      result += chars[values[i] % chars.length];
    }
    setPassword(result);
    setCopied(false);
    setAiFeedback('');
    setScore(null);
    setScoreLabel('');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const analyzePasswordWithAI = async () => {
    if (!password) return;
    setLoading(true);
    setAiFeedback('');
    setScore(null);
    setScoreLabel('');

    const prompt = `Analyze the following password and respond with only this format:\n\nScore: (0-100)\nLabel: (Very Weak, Weak, Moderate, Strong, Very Strong)\nFeedback: (a few bullet points about password strengths and weaknesses)\n\nPassword: ${password}`;

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
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      const scoreMatch = reply.match(/Score:\s*(\d+)/i);
      const labelMatch = reply.match(/Label:\s*(.+)/i);
      const feedbackMatch = reply.match(/Feedback:\s*([\s\S]*)/i);

      setScore(Number(scoreMatch?.[1]) || 0);
      setScoreLabel(labelMatch?.[1]?.trim() || 'Unknown');
      setAiFeedback(feedbackMatch?.[1]?.trim() || 'No detailed feedback.');
    } catch (err) {
      setAiFeedback('❌ Failed to get AI feedback. Try again later.');
      console.error('AI Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const generateAIPassword = async () => {
    if (!userDetails.favoriteWord || !userDetails.birthYear || !userDetails.memorablePlace) {
      setAiFeedback('Please fill in all fields to generate an AI password.');
      return;
    }
    setLoading(true);
    setPassword('');
    setAiFeedback('');
    setScore(null);
    setScoreLabel('');

    const prompt = `Generate a secure password based on the following user details:
    - Favorite word: ${userDetails.favoriteWord}
    - Birth year: ${userDetails.birthYear}
    - Memorable place: ${userDetails.memorablePlace}
    The password should be ${length} characters long, include ${includeUppercase ? 'uppercase letters, ' : ''}${includeLowercase ? 'lowercase letters, ' : ''}${includeNumbers ? 'numbers, ' : ''}${includeSymbols ? 'symbols, ' : ''}and be secure yet memorable. Respond with only the password.`;

    const payload = {
      contents: [{ parts: [{ text: prompt }] }]
    };

    const apiKey = 'AIzaSyDahqjfZ90L-7mvPVHob_yOQAxBuJuM0CQ';
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      const generatedPassword = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || '';
      setPassword(generatedPassword);
      setCopied(false);
      setShowModal(false);
    } catch (err) {
      setAiFeedback('❌ Failed to generate AI password. Try again later.');
      console.error('AI Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleModalSubmit = () => {
    generateAIPassword();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white px-4 py-10 md:ml-64 transition-all duration-300">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">🔐 Secure Password Generator</h1>

        <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg border border-[#334155] space-y-6">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex-1">
              <label className="text-sm text-gray-400 mb-2 block">Generated Password</label>
              <div className="relative">
                <input
                  type={visible ? 'text' : 'password'}
                  value={password}
                  readOnly
                  className="w-full p-3 pr-12 bg-[#0f172a] border border-[#334155] rounded-md text-white placeholder-gray-500"
                  placeholder="Click Generate"
                />
                <button
                  onClick={() => setVisible(!visible)}
                  className="absolute top-1/2 right-10 transform -translate-y-1/2 text-gray-400 hover:text-white"
                >
                  {visible ? <FaEyeSlash /> : <FaEye />}
                </button>
                <button
                  onClick={handleCopy}
                  className="absolute top-1/2 right-3 transform -translate-y-1/2 text-green-400 hover:text-green-300"
                >
                  <FaCopy />
                </button>
              </div>
              {copied && <p className="text-sm text-green-400 mt-1">Copied to clipboard!</p>}
            </div>
            <div className="flex flex-col gap-2">
              <button
                onClick={generatePassword}
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-md flex items-center gap-2"
              >
                <FaWandMagicSparkles /> Generate Password
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-3 rounded-md flex items-center gap-2"
              >
                <FaBrain /> Generate with AI
              </button>
              <button
                onClick={analyzePasswordWithAI}
                disabled={!password || loading}
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-3 rounded-md flex items-center gap-2"
              >
                {loading ? 'Analyzing...' : <><FaRobot /> Score Password with AI</>}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Length: {length}</label>
              <input
                type="range"
                min="8"
                max="50"
                value={length}
                onChange={(e) => setLength(Number(e.target.value))}
                className="w-full"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <label className="flex gap-2 items-center">
                <input type="checkbox" checked={includeUppercase} onChange={() => setIncludeUppercase(!includeUppercase)} />
                Uppercase (A-Z)
              </label>
              <label className="flex gap-2 items-center">
                <input type="checkbox" checked={includeLowercase} onChange={() => setIncludeLowercase(!includeLowercase)} />
                Lowercase (a-z)
              </label>
              <label className="flex gap-2 items-center">
                <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />
                Numbers (0-9)
              </label>
              <label className="flex gap-2 items-center">
                <input type="checkbox" checked={includeSymbols} onChange={() => setIncludeSymbols(!includeSymbols)} />
                Symbols (!@#$%)
              </label>
            </div>
          </div>

          {score !== null && (
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="relative w-28 h-28">
                <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 36 36">
                  <path
                    className="text-gray-600"
                    strokeWidth="3"
                    fill="none"
                    stroke="currentColor"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="text-green-400"
                    strokeDasharray={`${score}, 100`}
                    strokeWidth="3"
                    fill="none"
                    stroke="currentColor"
                    d="M18 2.0845
                      a 15.9155 15.9155 0 0 1 0 31.831
                      a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-white font-semibold">
                  {score}%
                </div>
              </div>
              <div>
                <p className="text-lg font-medium">Security Level: <span className="text-yellow-300">{scoreLabel}</span></p>
                <p className="text-sm text-gray-300 mt-2 whitespace-pre-wrap">{aiFeedback}</p>
              </div>
            </div>
          )}
        </div>

        {showModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-[#1e293b] p-6 rounded-lg shadow-lg border border-[#334155] w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">Enter Details for AI Password</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Favorite Word</label>
                  <input
                    type="text"
                    value={userDetails.favoriteWord}
                    onChange={(e) => setUserDetails({ ...userDetails, favoriteWord: e.target.value })}
                    className="w-full p-2 bg-[#0f172a] border border-[#334155] rounded-md text-white"
                    placeholder="e.g., sunshine"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Birth Year</label>
                  <input
                    type="text"
                    value={userDetails.birthYear}
                    onChange={(e) => setUserDetails({ ...userDetails, birthYear: e.target.value })}
                    className="w-full p-2 bg-[#0f172a] border border-[#334155] rounded-md text-white"
                    placeholder="e.g., 1990"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Memorable Place</label>
                  <input
                    type="text"
                    value={userDetails.memorablePlace}
                    onChange={(e) => setUserDetails({ ...userDetails, memorablePlace: e.target.value })}
                    className="w-full p-2 bg-[#0f172a] border border-[#334155] rounded-md text-white"
                    placeholder="e.g., Paris"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-6">
                <button
                  onClick={() => setShowModal(false)}
                  className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={handleModalSubmit}
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                >
                  {loading ? 'Generating...' : 'Generate'}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordGenerator;