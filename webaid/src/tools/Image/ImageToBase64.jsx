import React, { useState } from 'react';
import { FaUpload, FaClipboard, FaDownload, FaImage } from 'react-icons/fa6';

const ImageToBase64 = () => {
  const [base64, setBase64] = useState('');
  const [preview, setPreview] = useState('');
  const [fileName, setFileName] = useState('');
  const [copied, setCopied] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onloadend = () => {
      setBase64(reader.result);
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(base64);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([base64], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName || 'image'}.base64.txt`;
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white px-4 py-10 md:ml-64 transition-all duration-300">
      <div className="w-full max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaImage className="text-pink-400" /> 🎨 Image to Base64 Converter
        </h1>

        <div className="bg-[#1e293b] p-6 rounded-xl border border-[#334155] shadow-xl space-y-5">
          <div className="space-y-3">
            <label className="text-sm text-gray-400">Upload an image to convert:</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="bg-[#0f172a] p-2 rounded border border-[#334155] text-sm"
            />
          </div>

          {base64 && (
            <>
              <div className="flex flex-col md:flex-row gap-6 mt-6">
                <div className="flex-1">
                  <label className="text-sm text-gray-400 block mb-2">Base64 Output:</label>
                  <textarea
                    value={base64}
                    readOnly
                    className="w-full h-64 bg-[#0f172a] border border-[#334155] rounded p-3 text-sm resize-none"
                  />
                  <div className="flex items-center gap-3 mt-3">
                    <button
                      onClick={handleCopy}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-3 py-2 rounded flex items-center gap-2"
                    >
                      <FaClipboard /> {copied ? 'Copied' : 'Copy Base64'}
                    </button>
                    <button
                      onClick={handleDownload}
                      className="bg-green-600 hover:bg-green-700 text-white text-sm px-3 py-2 rounded flex items-center gap-2"
                    >
                      <FaDownload /> Download as .txt
                    </button>
                  </div>
                </div>

                <div className="md:w-1/2">
                  <label className="text-sm text-gray-400 block mb-2">Preview:</label>
                  <div className="bg-[#0f172a] border border-[#334155] rounded p-3">
                    <img
                      src={preview}
                      alt="Preview"
                      className="rounded w-full object-contain max-h-72 mx-auto"
                    />
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageToBase64;
