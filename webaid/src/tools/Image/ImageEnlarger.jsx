import React, { useState } from 'react';
import Resizer from 'react-image-file-resizer';
import { FaSearchPlus, FaDownload } from 'react-icons/fa';

const ImageEnlarger = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [enlargedImage, setEnlargedImage] = useState(null);
  const [scale, setScale] = useState(2);
  const [format, setFormat] = useState('JPEG');
  const [beforeSize, setBeforeSize] = useState(0);
  const [afterSize, setAfterSize] = useState(0);

  const enhanceImageQuality = (canvas) => {
    const ctx = canvas.getContext('2d');
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    for (let i = 0; i < data.length; i += 4) {
      data[i] = Math.min(data[i] * 1.1, 255);     // Red
      data[i + 1] = Math.min(data[i + 1] * 1.1, 255); // Green
      data[i + 2] = Math.min(data[i + 2] * 1.1, 255); // Blue
    }

    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL(`image/${format.toLowerCase()}`);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setBeforeSize((file.size / 1024).toFixed(2));

    const reader = new FileReader();
    reader.onloadend = () => setOriginalImage(reader.result);
    reader.readAsDataURL(file);

    const img = new Image();
    img.onload = () => {
      const width = img.width * scale;
      const height = img.height * scale;
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      canvas.width = width;
      canvas.height = height;
      ctx.drawImage(img, 0, 0, width, height);
      const enhancedImage = enhanceImageQuality(canvas);
      setEnlargedImage(enhancedImage);

      fetch(enhancedImage)
        .then(res => res.blob())
        .then(blob => setAfterSize((blob.size / 1024).toFixed(2)));
    };
    img.src = URL.createObjectURL(file);
  };

  const downloadImage = () => {
    const link = document.createElement('a');
    link.href = enlargedImage;
    link.download = `enlarged.${format.toLowerCase()}`;
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-white px-4 py-10 md:ml-64 transition-all duration-300">
      <div className="w-full max-w-5xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <FaSearchPlus className="text-teal-400" /> 🖼️ Image Enlarger & Enhancer
        </h1>

        <div className="bg-[#1e293b] p-6 rounded-xl border border-[#334155] shadow-xl space-y-5">
          <label className="flex flex-col gap-2 text-sm text-gray-300">
            Upload Image
            <input type="file" accept="image/*" onChange={handleImageUpload} className="bg-[#0f172a] p-2 rounded border border-[#334155]" />
          </label>

          <div className="flex flex-wrap gap-4 items-center">
            <label className="text-sm text-gray-300">Scale:</label>
            <select
              value={scale}
              onChange={(e) => setScale(Number(e.target.value))}
              className="bg-[#0f172a] border border-[#334155] text-white px-3 py-1 rounded-md"
            >
              <option value={1}>1x</option>
              <option value={2}>2x</option>
              <option value={3}>3x</option>
              <option value={4}>4x</option>
            </select>

            <label className="text-sm text-gray-300 ml-4">Format:</label>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className="bg-[#0f172a] border border-[#334155] text-white px-3 py-1 rounded-md"
            >
              <option value="JPEG">JPEG</option>
              <option value="PNG">PNG</option>
              <option value="WEBP">WEBP</option>
            </select>
          </div>

          {originalImage && enlargedImage && (
            <>
              <div className="grid md:grid-cols-2 gap-4 mt-6">
                <div>
                  <p className="text-sm text-gray-400 mb-1">Original Image ({beforeSize} KB)</p>
                  <img src={originalImage} alt="Original" className="w-full rounded-md border border-[#334155]" />
                </div>
                <div>
                  <p className="text-sm text-gray-400 mb-1">Enhanced & Enlarged Image ({afterSize} KB)</p>
                  <img src={enlargedImage} alt="Enlarged" className="w-full rounded-md border border-[#334155]" />
                </div>
              </div>

              <div className="mt-6 text-right">
                <button
                  onClick={downloadImage}
                  className="bg-teal-600 hover:bg-teal-700 px-4 py-2 rounded-md flex items-center gap-2 text-white"
                >
                  <FaDownload /> Download Image
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageEnlarger;
