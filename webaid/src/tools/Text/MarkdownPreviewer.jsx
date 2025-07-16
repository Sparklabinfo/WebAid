import React, { useState } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';

const MarkdownPreviewer = () => {
  const [markdown, setMarkdown] = useState(`# Welcome to Markdown Previewer

Type some markdown here...

## Features
- Real-time preview
- Supports GitHub-flavored Markdown
- Syntax highlighting

**Enjoy!**
`);

  const handleChange = (e) => setMarkdown(e.target.value);

  const createMarkup = () => {
    const dirtyHTML = marked(markdown, { breaks: true, gfm: true });
    const cleanHTML = DOMPurify.sanitize(dirtyHTML);
    return { __html: cleanHTML };
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white px-4 py-10 md:ml-64 transition-all duration-300">
      <div className="w-full max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">📝 Markdown Previewer</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Markdown Input */}
          <div>
            <label className="block text-sm font-medium mb-2">Markdown Input</label>
            <textarea
              value={markdown}
              onChange={handleChange}
              className="w-full h-[400px] p-4 bg-[#0f172a] border border-gray-700 rounded-md text-sm resize-none"
              placeholder="Type your markdown here..."
            />
          </div>

          {/* Preview Output */}
          <div>
            <label className="block text-sm font-medium mb-2">Preview</label>
            <div
              className="w-full h-[400px] overflow-y-auto p-4 bg-[#1e293b] border border-gray-700 rounded-md text-sm prose prose-invert max-w-none"
              dangerouslySetInnerHTML={createMarkup()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownPreviewer;
