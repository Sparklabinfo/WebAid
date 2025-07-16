import React, { useState } from 'react';
import { FaPlus, FaTrash, FaClipboard, FaDownload } from 'react-icons/fa';

const EnvGenerator = () => {
  const [envType, setEnvType] = useState('development');
  const [variables, setVariables] = useState([{ key: '', value: '' }]);
  const [copied, setCopied] = useState(false);

  const handleChange = (index, field, value) => {
    const updated = [...variables];
    updated[index][field] = value;
    setVariables(updated);
  };

  const addVariable = () => {
    setVariables([...variables, { key: '', value: '' }]);
  };

  const removeVariable = (index) => {
    const updated = variables.filter((_, i) => i !== index);
    setVariables(updated);
  };

  const generateEnvContent = () => {
    return variables
      .filter(v => v.key.trim())
      .map(v => `${v.key}=${v.value}`)
      .join('\n');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateEnvContent());
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const downloadEnv = () => {
    const blob = new Blob([generateEnvContent()], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `.env.${envType}`;
    link.click();
  };

  return (
    <div className="min-h-screen px-4 py-10 md:ml-64 bg-[#0B0F19] text-white transition-all duration-300">
      <div className="w-full max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">⚙️ .env File Generator</h1>

        <div className="bg-[#1e293b] p-6 rounded-xl border border-[#334155] shadow-xl space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <label className="text-sm text-gray-400">Environment Type:</label>
            <select
              value={envType}
              onChange={(e) => setEnvType(e.target.value)}
              className="bg-[#0f172a] border border-[#334155] text-white px-3 py-2 rounded-md text-sm"
            >
              <option value="development">development</option>
              <option value="production">production</option>
              <option value="staging">staging</option>
              <option value="test">test</option>
            </select>
          </div>

          <div className="space-y-4">
            {variables.map((v, i) => (
              <div key={i} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="KEY"
                  value={v.key}
                  onChange={(e) => handleChange(i, 'key', e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#0f172a] border border-[#334155] rounded-md text-sm"
                />
                <input
                  type="text"
                  placeholder="value"
                  value={v.value}
                  onChange={(e) => handleChange(i, 'value', e.target.value)}
                  className="flex-1 px-3 py-2 bg-[#0f172a] border border-[#334155] rounded-md text-sm"
                />
                <button
                  onClick={() => removeVariable(i)}
                  className="text-red-400 hover:text-red-600"
                >
                  <FaTrash />
                </button>
              </div>
            ))}

            <button
              onClick={addVariable}
              className="text-sm text-blue-400 hover:text-blue-500 flex items-center gap-2"
            >
              <FaPlus /> Add Variable
            </button>
          </div>

          <div className="flex justify-end gap-3">
            <button
              onClick={handleCopy}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md flex items-center gap-2 text-sm"
            >
              <FaClipboard /> {copied ? 'Copied!' : 'Copy .env'}
            </button>

            <button
              onClick={downloadEnv}
              className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-md flex items-center gap-2 text-sm"
            >
              <FaDownload /> Download .env
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnvGenerator;
