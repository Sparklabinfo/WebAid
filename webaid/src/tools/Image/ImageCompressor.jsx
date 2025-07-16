import React, { useState } from 'react';
import Resizer from 'react-image-file-resizer';
import { FaUpload, FaDownload, FaCompress } from 'react-icons/fa6';

const ImageCompressor = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [compressedImage, setCompressedImage] = useState(null);
  const [compressionQuality, setCompressionQuality] = useState(80);
  const [sizeBefore, setSizeBefore] = useState(null);
  const [sizeAfter, setSizeAfter] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setOriginalImage(file);
    setCompressedImage(null);
    setSizeBefore(file.size);
  };

  const compressImage = () => {
    if (!originalImage) return;
    setLoading(true);

    Resizer.imageFileResizer(
      originalImage,
      1920,
      1920,
      'JPEG',
      compressionQuality,
      0,
      (uri) => {
        setCompressedImage(uri);
        setSizeAfter(Math.round(uri.size || uri.length));
        setLoading(false);
      },
      'blob'
    );
  };

  const formatSize = (bytes) => {
    if (!bytes) return '0 KB';
    const kb = bytes / 1024;
    return kb > 1024 ? `${(kb / 1024).toFixed(2)} MB` : `${kb.toFixed(2)} KB`;
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] text-white p-6 md:ml-64">
      <div className="w-full max-w-4xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold">📉 Image Compressor</h1>

        <div className="bg-[#1e293b] p-6 rounded-lg border border-[#334155] space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="w-full bg-[#0f172a] text-white p-2 rounded border border-[#334155]"
          />

          <div className="flex flex-col gap-4 md:flex-row md:items-center">
            <label className="text-sm text-gray-400">
              Compression Quality: {compressionQuality}%
            </label>
            <input
              type="range"
              min="10"
              max="100"
              value={compressionQuality}
              onChange={(e) => setCompressionQuality(Number(e.target.value))}
              className="w-full md:w-1/2"
            />
            <button
              onClick={compressImage}
              disabled={loading || !originalImage}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
            >
              <FaCompress /> {loading ? 'Compressing...' : 'Compress Image'}
            </button>
          </div>

          {originalImage && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h2 className="text-md font-semibold mb-2 text-gray-300">Original Image</h2>
                <img
                  src={URL.createObjectURL(originalImage)}
                  alt="original"
                  className="rounded border border-[#334155]"
                />
                <p className="text-sm mt-1">Size: {formatSize(sizeBefore)}</p>
              </div>

              {compressedImage && (
                <div>
                  <h2 className="text-md font-semibold mb-2 text-green-400">Compressed Image</h2>
                  <img
                    src={URL.createObjectURL(compressedImage)}
                    alt="compressed"
                    className="rounded border border-[#334155]"
                  />
                  <p className="text-sm mt-1 text-green-400">Size: {formatSize(sizeAfter)}</p>
                  <a
                    href={URL.createObjectURL(compressedImage)}
                    download="compressed.jpg"
                    className="mt-2 inline-block text-sm text-white bg-green-600 hover:bg-green-700 px-3 py-2 rounded-md"
                  >
                    <FaDownload className="inline mr-1" /> Download
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageCompressor;
