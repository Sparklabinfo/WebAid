import React, { useState } from 'react';

const BionicReader = () => {
  const [inputText, setInputText] = useState('');

  // Function to apply Bionic Reading effect
  const applyBionicReading = (text) => {
    return text.split(/\s+/).map((word, index) => {
      if (word.length <= 2) return <span key={index} className="mr-1">{word} </span>;

      const midpoint = Math.ceil(word.length / 2);
      const boldPart = word.substring(0, midpoint);
      const restPart = word.substring(midpoint);

      return (
        <span key={index} className="mr-2">
          <strong>{boldPart}</strong>{restPart}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-4 py-10 md:ml-64 transition-all duration-300">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-semibold text-center mb-10">Bionic Reader</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Input Textarea */}
          <div>
            <label className="block mb-2 text-sm font-medium">Enter Text</label>
            <textarea
              rows={10}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Type or paste your text here..."
              className="w-full p-4 rounded-lg bg-gray-800 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            />
          </div>

          {/* Output Styled Bionic Text */}
          <div>
            <label className="block mb-2 text-sm font-medium">Bionic Output</label>
            <div className="w-full min-h-[240px] p-4 rounded-lg bg-gray-900 border border-gray-700 text-gray-200 leading-relaxed overflow-y-auto">
              {applyBionicReading(inputText)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BionicReader;
