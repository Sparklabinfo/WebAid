import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaPaperPlane, FaTimes } from 'react-icons/fa'; // Ensure react-icons is installed

const AiHelperFloating = () => {
  const [show, setShow] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'ai', text: '👋 Hello! I am Lara – your AI assistant for WebAid. Ask me anything about the tools or website.' }
  ]);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // API key is left empty as Canvas will inject it at runtime for allowed models
  const API_KEY = 'AIzaSyDahqjfZ90L-7mvPVHob_yOQAxBuJuM0CQ';
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

  // Define WebAid tools with their descriptions and URLs
  const webaidTools = {
    'case converter': {
      description: 'The Case Converter allows you to instantly convert text between various cases like uppercase, lowercase, title case, sentence case, and more.',
      url: 'https://webaid-io.web.app/case-converter'
    },
    'bionic reader': {
      description: 'The Bionic Reader enhances reading speed and focus by highlighting the beginning of words, guiding your eyes smoothly through text. Try it with a paragraph!',
      url: 'https://webaid-io.web.app/Bionic-Reader'
    },
    'lorem ipsum': {
      description: 'The Lorem Ipsum Generator quickly creates placeholder text for your designs and layouts, with options for paragraphs, words, and sentences.',
      url: 'https://webaid-io.web.app/Lorem-Ipsum'
    },
    'markdown previewer': {
      description: 'The Markdown Previewer lets you write Markdown in real-time and see its rendered HTML output instantly, perfect for documentation and README files.',
      url: 'https://webaid-io.web.app/MarkDown-Previewer'
    },
    'password generator': {
      description: 'The Password Generator creates strong, random passwords based on your criteria (length, character types) and can even analyze password strength using AI.',
      url: 'https://webaid-io.web.app/Password-Generator'
    },
    'text differ': {
      description: 'The Text Differ tool helps you compare two blocks of text and highlights the differences, useful for code reviews or content changes.',
      url: 'https://webaid-io.web.app/Text-Differ'
    },
    'meta tags': {
      description: 'The Meta Tags Generator helps you create essential meta tags for SEO and social media sharing, improving your website\'s visibility.',
      url: 'https://webaid-io.web.app/Meta-Tags'
    },
    'slug generator': {
      description: 'The Slug Generator converts any text into a clean, SEO-friendly URL slug, replacing spaces and special characters with hyphens.',
      url: 'https://webaid-io.web.app/slug-generator'
    },
    'json formatter': {
      description: 'The JSON Formatter pretty-prints and validates JSON data, making it easier to read and debug complex JSON structures.',
      url: 'https://webaid-io.web.app/json-formatter'
    },
    'js minifier': {
      description: 'The JS Minifier reduces the size of your JavaScript code by removing unnecessary characters, which helps improve website loading speed.',
      url: 'https://webaid-io.web.app/js-minifier'
    },
    'regex helper': {
      description: 'The Regex Helper allows you to test and build regular expressions, providing real-time matching against your input text.',
      url: 'https://webaid-io.web.app/regex-helper'
    },
    'uuid generator': {
      description: 'The UUID Generator instantly creates universally unique identifiers (UUIDs) for various programming needs.',
      url: 'https://webaid-io.web.app/uuid-generator'
    },
    'background remover': {
      description: 'The AI Background Remover uses artificial intelligence to accurately remove backgrounds from images, allowing you to replace them with solid colors or custom images.',
      url: 'https://webaid-io.web.app/background-Remover'
    },
    'image compressor': {
      description: 'The Image Compressor reduces the file size of your images while maintaining good quality, optimizing them for web performance.',
      url: 'https://webaid-io.web.app/image-Compressor'
    },
    'image scaler': {
      description: 'The Image Scaler (also known as Image Enlarger & Enhancer) allows you to resize and enhance the quality of your images.',
      url: 'https://webaid-io.web.app/image-enlarger'
    },
    'image enlarger': {
      description: 'The Image Scaler (also known as Image Enlarger & Enhancer) allows you to resize and enhance the quality of your images.',
      url: 'https://webaid-io.web.app/image-enlarger'
    },
    'image enhancer': {
      description: 'The Image Scaler (also known as Image Enlarger & Enhancer) allows you to resize and enhance the quality of your images.',
      url: 'https://webaid-io.web.app/image-enlarger'
    },
    'image to base64': {
      description: 'The Image to Base64 converter transforms image files into Base64 encoded strings, useful for embedding images directly into HTML or CSS.',
      url: 'https://webaid-io.web.app/image-to-base64'
    },
    'base64 converter': {
      description: 'The Base64 Converter allows you to encode and decode text or files to and from Base64 format.',
      url: 'https://webaid-io.web.app/base64-Converter'
    },
    'html escape unescape tool': {
      description: 'The HTML Escape/Unescape Tool converts special HTML characters to and from their escaped entities, useful for displaying code snippets safely.',
      url: 'https://webaid-io.web.app/html-escape-tool'
    },
    'string encoder': {
      description: 'The String Encoder provides various encoding options for text, such as URL encoding, HTML encoding, and more.',
      url: 'https://webaid-io.web.app/string-encoder'
    },
    'env file generator': {
      description: 'The .env File Generator helps you quickly create `.env` files for managing environment variables in your projects.',
      url: 'https://webaid-io.web.app/env-generator'
    },
    'gitignore file generator': {
      description: 'The .gitignore File Generator helps you create `.gitignore` files to exclude unnecessary files and folders from your Git repositories.',
      url: 'https://webaid-io.web.app/gitignore-generator'
    },
    'code playground': {
      description: 'The Code Playground provides an interactive environment to write and execute HTML, CSS, and JavaScript code directly in your browser.',
      url: 'https://webaid-io.web.app/playground'
    },
    'css animation previewer': {
      description: 'The CSS Animation Previewer allows you to easily create and preview CSS animations with various properties and timings.',
      url: 'https://webaid-io.web.app/animation-previewer'
    },
    'box shadow generator': {
      description: 'The Box Shadow Generator helps you visually create complex CSS box shadows with controls for offset, blur, spread, and color.',
      url: 'https://webaid-io.web.app/box-shadow-generator'
    },
    'css minifier': {
      description: 'The CSS Minifier reduces the size of your CSS code by removing whitespace and comments, improving website loading speed.',
      url: 'https://webaid-io.web.app/css-minifier'
    },
    'grid generator': {
      description: 'The CSS Grid Generator helps you visually design and generate CSS Grid layouts, making complex responsive designs easier to build.',
      url: 'https://webaid-io.web.app/grid-generator'
    },
    'color converter tool': {
      description: 'The Color Converter Tool allows you to convert color codes between different formats like HEX, RGB, HSL, and CMYK.',
      url: 'https://webaid-io.web.app/color-converter'
    },
    'contrast checker tool': {
      description: 'The Contrast Checker Tool helps you ensure your text and background colors meet accessibility standards (WCAG) for readability.',
      url: 'https://webaid-io.web.app/contrast-checker'
    },
    // Add more tools here as needed
  };

  const suggestedPrompts = [
    'What tools are available on WebAid?',
    'Who created WebAid?',
    'How can I use the Case Converter?',
    'What does the Bionic Reader do?',
    'Is WebAid free for developers?'
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (query) => {
    const userMessage = query || input.trim();
    if (!userMessage) return;

    setMessages((prev) => [...prev, { sender: 'user', text: userMessage }]);
    setInput('');
    setLoading(true);

    const lowerCaseMessage = userMessage.toLowerCase();

    // --- Predefined Q&A for WebAid and its tools ---

    // Lara's name
    if (lowerCaseMessage.includes('your name')) {
      setMessages((prev) => [...prev, { sender: 'ai', text: 'My name is Lara, your friendly AI assistant for the WebAid platform.' }]);
      setLoading(false);
      return;
    }

    // WebAid developer / Creator / Company details
    if (lowerCaseMessage.includes('developer') || lowerCaseMessage.includes('who made') || lowerCaseMessage.includes('creator') || lowerCaseMessage.includes('ceo') || lowerCaseMessage.includes('company')) {
      setMessages((prev) => [...prev, { sender: 'ai', text: 'WebAid was developed by Abhijith. It is a product of the startup company sparklab-info. Abhijith is also the CEO of sparklab-info. You can check his portfolio here: [Abhijith\'s Portfolio](https://abhijith-web-dev.web.app/) and the company website here: [sparklab-info](https://sparklab-info.web.app/)' }]);
      setLoading(false);
      return;
    }

    // About WebAid
    if (lowerCaseMessage.includes('what is webaid') || lowerCaseMessage.includes('about webaid')) {
      setMessages((prev) => [...prev, {
        sender: 'ai',
        text: `WebAid is a free online developer toolset built by Abhijith, under the startup company sparklab-info. It includes tools like a Case Converter, Markdown Previewer, Regex Helper, JS Playground, Image Compressor, and many more. It's designed to boost productivity for developers. You can visit the website here: [WebAid Website](https://webaid-io.web.app/)`
      }]);
      setLoading(false);
      return;
    }

    // List of tools
    if (lowerCaseMessage.includes('tools') || lowerCaseMessage.includes('features')) {
      const toolNames = Object.keys(webaidTools).map(key => {
        // Capitalize first letter of each word for display
        return key.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
      }).join(', ');
      setMessages((prev) => [...prev, {
        sender: 'ai',
        text: `WebAid offers a comprehensive suite of tools including: ${toolNames}. You can ask me about any specific tool, for example, "Tell me about the Password Generator."`
      }]);
      setLoading(false);
      return;
    }

    // Is WebAid free?
    if (lowerCaseMessage.includes('free') || lowerCaseMessage.includes('paid')) {
      setMessages((prev) => [...prev, {
        sender: 'ai',
        text: 'WebAid is completely free to use. No login required for most tools, and it’s made to empower developers!'
      }]);
      setLoading(false);
      return;
    }

    // Specific tool information
    let toolFound = false;
    for (const toolKey in webaidTools) {
      // Check if the user's message contains the tool name
      if (lowerCaseMessage.includes(toolKey)) {
        const toolInfo = webaidTools[toolKey];
        // Capitalize the tool name for display
        const displayName = toolKey.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
        setMessages((prev) => [...prev, {
          sender: 'ai',
          text: `${displayName}: ${toolInfo.description} You can access it here: [Go to ${displayName}](${toolInfo.url})`
        }]);
        toolFound = true;
        setLoading(false);
        return; // Exit after finding a tool
      }
    }

    if (toolFound) {
      return; // Already handled by tool-specific logic
    }

    // --- Gemini fallback for general questions ---
    try {
      const prompt = `
You are Lara, the official AI assistant for the WebAid website (https://webaid-io.web.app/).
WebAid is a platform built by Abhijith that offers a suite of developer tools such as converters, formatters, AI generators, and image utilities.
WebAid is a product of the startup company sparklab-info, and Abhijith is the CEO of sparklab-info. The company website is https://sparklab-info.web.app/.
Your goal is to provide helpful, accurate, and clear responses to questions about the site, its tools, or general programming help.
If a question is specifically about a WebAid tool (e.g., "What is the Case Converter?"), provide a concise description and a link to that tool's page.
If the user asks about your name, say "My name is Lara."
If the user asks who created WebAid or about the company, provide the details about Abhijith and sparklab-info.

User asked: "${userMessage}"
`;

      const payload = {
        contents: [{ parts: [{ text: prompt }] }]
      };

      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`Gemini API error: ${res.status} - ${await res.text()}`);
      }

      const data = await res.json();
      const aiReply = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();

      setMessages((prev) => [
        ...prev,
        {
          sender: 'ai',
          text: aiReply || '🤖 Sorry, I couldn’t come up with a reply.'
        }
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [...prev, { sender: 'ai', text: `❌ Gemini Error: ${err.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Open Button */}
      <button
        onClick={() => setShow(true)}
        className="fixed bottom-6 right-6 z-50 bg-indigo-600 hover:bg-indigo-700 text-white p-4 rounded-full shadow-lg transition"
        aria-label="Open WebAid Assistant"
      >
        <FaRobot size={20} />
      </button>

      {/* Chat Panel */}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 80 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-20 right-6 z-50 w-[90vw] max-w-md bg-[#111827] border border-[#334155] rounded-xl shadow-2xl flex flex-col overflow-hidden font-sans"
          >
            {/* Header */}
            <div className="flex items-center justify-between bg-[#1f2937] px-4 py-3 border-b border-[#2d3748]">
              <h2 className="text-white font-semibold flex items-center gap-2">
                <FaRobot className="text-indigo-400" /> Lara – WebAid Assistant
              </h2>
              <button
                onClick={() => setShow(false)}
                className="text-gray-400 hover:text-white p-1"
                aria-label="Close chat"
              >
                <FaTimes />
              </button>
            </div>

            {/* Suggestions */}
            <div className="px-4 py-2 flex flex-wrap gap-2 border-b border-[#2d3748]">
              {suggestedPrompts.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q)}
                  disabled={loading}
                  className="text-xs bg-[#1e293b] hover:bg-[#2a3545] text-gray-300 px-3 py-1 rounded-full border border-[#2c3e50] transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {q}
                </button>
              ))}
            </div>

            {/* Chat Messages */}
            <div className="px-4 py-2 flex-1 overflow-y-auto max-h-[400px] space-y-3 custom-scrollbar">
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`p-3 text-sm rounded-lg whitespace-pre-wrap ${
                    msg.sender === 'user'
                      ? 'ml-auto bg-indigo-600 text-white max-w-[85%]'
                      : 'mr-auto bg-[#1e293b] text-gray-200 max-w-[85%]'
                  }`}
                  style={{ wordBreak: 'break-word' }}
                >
                  {/* Render Markdown links */}
                  {msg.text.split(/(\[.*?\]\(.*?\))/g).map((part, i) => {
                    const match = part.match(/\[(.*?)\]\((.*?)\)/);
                    if (match) {
                      const [, linkText, url] = match;
                      return (
                        <a
                          key={i}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-400 underline hover:text-blue-300"
                        >
                          {linkText}
                        </a>
                      );
                    }
                    return part;
                  })}
                </div>
              ))}
              {loading && <div className="text-xs text-gray-400 mt-2 animate-pulse">Thinking...</div>}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Field */}
            <div className="px-4 py-3 border-t border-[#2d3748] bg-[#1f2937] flex items-center gap-2">
              <input
                type="text"
                className="flex-1 px-3 py-2 bg-[#111827] text-white rounded-md border border-[#334155] focus:outline-none focus:ring-2 focus:ring-indigo-500 placeholder-gray-500"
                placeholder="Ask something about WebAid or coding..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                disabled={loading}
                aria-label="Chat input"
              />
              <button
                onClick={() => handleSend()}
                disabled={loading || !input.trim()}
                className="bg-indigo-600 hover:bg-indigo-700 text-white p-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <FaPaperPlane />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scrollbar Style */}
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #1f2937;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #4b5563;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </>
  );
};

export default AiHelperFloating;
