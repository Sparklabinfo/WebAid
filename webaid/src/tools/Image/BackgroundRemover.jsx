import React, { useRef, useState, useEffect } from 'react';
import * as bodyPix from '@tensorflow-models/body-pix';
import * as tf from '@tensorflow/tfjs'; // Import TensorFlow.js explicitly for backend control

const BackgroundRemover = () => {
  // State variables for UI feedback and results
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('Initializing...');
  const [resultUrl, setResultUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState(''); // State for displaying specific errors

  // States for background customization
  const [backgroundMode, setBackgroundMode] = useState('transparent'); // 'transparent', 'color', 'image'
  const [selectedColor, setSelectedColor] = useState('#000000'); // Default black for color background
  const [selectedBackgroundImageUrl, setSelectedBackgroundImageUrl] = useState('');

  // Refs for the canvas and image elements
  const canvasRef = useRef(null);
  const originalImageRef = useRef(null); // Stores the original uploaded image element
  const segmentationRef = useRef(null); // Stores the BodyPix segmentation result
  const netRef = useRef(null); // Stores the loaded BodyPix model
  const backgroundImageRef = useRef(null); // Stores the user-provided background image element

  // Effect hook to load the BodyPix model once when the component mounts
  useEffect(() => {
    const loadModel = async () => {
      setLoading(true);
      setErrorMessage(''); // Clear any previous errors

      try {
        setLoadingMessage('Setting up TensorFlow.js backend...');
        // Explicitly set the WebGL backend for optimal performance
        await tf.setBackend('webgl');
        // Wait for the backend to be ready
        await tf.ready();

        setLoadingMessage('Loading AI model (using MobileNetV1 for speed)...');
        // Load the BodyPix model with MobileNetV1 architecture for faster loading and processing.
        const net = await bodyPix.load({
          architecture: 'MobileNetV1',
          outputStride: 16,
          multiplier: 0.75, // Controls model size/speed for MobileNetV1
          quantBytes: 2, // Reduces model size and speeds up inference
        });
        netRef.current = net; // Store the loaded model
        setLoading(false);
        setLoadingMessage('Model loaded. Upload an image!');
      } catch (error) {
        console.error("Failed to load BodyPix model or setup TF.js:", error);
        setLoadingMessage('Error loading AI model.');
        setErrorMessage('Failed to load AI model. Ensure WebGL is enabled in your browser and try again.');
        setLoading(false);
      }
    };
    loadModel();
  }, []); // Empty dependency array ensures this runs only once

  // Effect hook to redraw the canvas whenever background options or segmentation data changes
  // This ensures the canvas updates when color/image background is changed AFTER an image is processed.
  useEffect(() => {
    // Only attempt to draw if the model is loaded, original image exists, and segmentation is done
    if (netRef.current && originalImageRef.current && segmentationRef.current) {
      drawResultOnCanvas(
        originalImageRef.current,
        segmentationRef.current,
        backgroundMode,
        selectedColor,
        backgroundImageRef.current
      );
    }
  }, [backgroundMode, selectedColor, selectedBackgroundImageUrl, netRef.current, originalImageRef.current, segmentationRef.current]);

  /**
   * Handles the initial image upload. Segments the person and stores data.
   * @param {Event} e - The file upload event.
   */
  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setResultUrl(''); // Clear previous result URL
    setErrorMessage(''); // Clear previous errors
    setLoading(true);
    setLoadingMessage('Loading image...');

    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = async () => {
      originalImageRef.current = img; // Store original image

      if (!netRef.current) {
        setLoadingMessage('AI model not loaded yet. Please wait...');
        setErrorMessage('AI model is not loaded. Please wait or refresh the page.');
        setLoading(false);
        return;
      }

      setLoadingMessage('Segmenting person...'); // Message for segmentation
      try {
        const segmentation = await netRef.current.segmentPerson(img);
        segmentationRef.current = segmentation; // Store segmentation data

        // Draw the initial result with the currently selected background mode.
        drawResultOnCanvas(
          originalImageRef.current,
          segmentationRef.current,
          backgroundMode,
          selectedColor,
          backgroundImageRef.current
        );
        setLoading(false);
        setLoadingMessage('Done! You can now change the background.');
      } catch (error) {
        console.error("Error during segmentation:", error);
        setLoadingMessage('Error processing image.');
        setErrorMessage('Failed to segment person from image. Please ensure it contains a clear subject.');
        setLoading(false);
      }
    };
    img.onerror = () => {
      setLoading(false);
      setLoadingMessage('Error loading image.');
      setErrorMessage('Error loading image file. Please try another image.');
    };
  };

  /**
   * Handles upload of a custom background image.
   * @param {Event} e - The file upload event.
   */
  const handleBackgroundUpload = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setSelectedBackgroundImageUrl('');
      backgroundImageRef.current = null;
      setErrorMessage('No background image selected.'); // Provide feedback for no selection
      return;
    }

    setErrorMessage(''); // Clear previous errors
    const bgImg = new Image();
    bgImg.src = URL.createObjectURL(file);
    bgImg.onload = () => {
      backgroundImageRef.current = bgImg; // Store background image
      setSelectedBackgroundImageUrl(bgImg.src); // Update state to trigger re-draw
      setBackgroundMode('image'); // Automatically switch to image mode
    };
    bgImg.onerror = () => {
      console.error("Error loading background image:", bgImg.src);
      setErrorMessage('Error loading background image. Please try another file.');
      setSelectedBackgroundImageUrl('');
      backgroundImageRef.current = null;
    };
  };

  /**
   * Draws the segmented person onto the canvas with the specified background.
   * This function is now more robust, assuming canvasRef.current is always available.
   * @param {HTMLImageElement} image - The original image with the person.
   * @param {bodyPix.PersonSegmentation} segmentation - The segmentation data.
   * @param {string} mode - The background mode ('transparent', 'color', 'image').
   * @param {string} color - The background color (if mode is 'color').
   * @param {HTMLImageElement} bgImage - The background image (if mode is 'image').
   */
  const drawResultOnCanvas = (image, segmentation, mode, color, bgImage) => {
    const canvas = canvasRef.current;
    if (!canvas) {
      setErrorMessage('Internal error: Canvas element not found for drawing.');
      setResultUrl('');
      return;
    }

    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;

    try {
      // Clear canvas before drawing new background
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // 1. Draw Background based on mode
      if (mode === 'color' && color) {
        ctx.fillStyle = color;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else if (mode === 'image' && bgImage && bgImage.complete) { // Ensure background image is loaded
        // Draw background image, covering the canvas
        ctx.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
      }
      // If mode is 'transparent' or background image not loaded, canvas remains clear (transparent)

      // 2. Draw the segmented person on top of the background
      const foregroundColor = { r: 0, g: 0, b: 0, a: 0 }; // Transparent color for the person's mask
      const backgroundColor = { r: 0, g: 0, b: 0, a: 0 }; // Transparent color for the background mask

      // Create a mask from segmentation data
      const mask = bodyPix.toMask(segmentation);

      // Draw the original image, but only where the mask indicates the person.
      // The background will be transparent where the mask is black.
      bodyPix.drawMask(
        canvas,
        image,
        mask,
        1, // opacity
        foregroundColor, // color for the person (not used when drawing the image)
        backgroundColor, // color for the background (not used when drawing the image)
        true // draw the original image, not the mask color
      );

      // Update the result URL for download
      setResultUrl(canvas.toDataURL('image/png'));
      setErrorMessage(''); // Clear error on successful drawing
    } catch (error) {
      console.error("Error drawing on canvas:", error);
      setErrorMessage('Error rendering image on canvas. Please try again.');
      setResultUrl(''); // Clear result URL if rendering fails
    }
  };


  return (
    <div className="min-h-screen bg-[#0B0F19] text-white px-4 py-10 md:ml-64 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-center text-indigo-400"> Background Remover</h1>
        <p className='text-red-400'>This feature is not accurate that on the process state</p>
        <div className="bg-[#1e293b] p-8 rounded-xl shadow-2xl border border-[#334155] space-y-6 flex flex-col items-center">
          <label htmlFor="image-upload" className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md font-semibold transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed">
            Upload Image
            <input
              id="image-upload"
              type="file"
              accept="image/*"
              onChange={handleUpload}
              className="hidden" // Hide the default file input
              disabled={loading} // Disable upload while processing
            />
          </label>

          {loading && (
            <p className="text-yellow-400 text-lg mt-4 animate-pulse">
              {loadingMessage}
            </p>
          )}

          {errorMessage && (
            <p className="text-red-500 text-lg mt-4 text-center">
              {errorMessage}
            </p>
          )}

          {/* Background Options - Only show if an image has been successfully processed */}
          {originalImageRef.current && segmentationRef.current && !loading && (
            <div className="w-full space-y-4 border-t border-[#334155] pt-6 mt-6">
              <h2 className="text-xl font-semibold text-gray-300 text-center">Customize Background</h2>
              <div className="flex justify-center gap-4 flex-wrap">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="backgroundMode"
                    value="transparent"
                    checked={backgroundMode === 'transparent'}
                    onChange={() => setBackgroundMode('transparent')}
                    className="form-radio text-indigo-600 h-5 w-5"
                  />
                  <span>Transparent</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="backgroundMode"
                    value="color"
                    checked={backgroundMode === 'color'}
                    onChange={() => setBackgroundMode('color')}
                    className="form-radio text-indigo-600 h-5 w-5"
                  />
                  <span>Solid Color</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="backgroundMode"
                    value="image"
                    checked={backgroundMode === 'image'}
                    onChange={() => setBackgroundMode('image')}
                    className="form-radio text-indigo-600 h-5 w-5"
                  />
                  <span>Custom Image</span>
                </label>
              </div>

              {backgroundMode === 'color' && (
                <div className="flex justify-center items-center gap-4 mt-4">
                  <label htmlFor="color-picker" className="text-gray-300">Choose Color:</label>
                  <input
                    id="color-picker"
                    type="color"
                    value={selectedColor}
                    onChange={(e) => setSelectedColor(e.target.value)}
                    className="w-16 h-10 border-2 border-gray-600 rounded-md cursor-pointer"
                  />
                </div>
              )}

              {backgroundMode === 'image' && (
                <div className="flex justify-center items-center gap-4 mt-4">
                  <label htmlFor="background-image-upload" className="cursor-pointer bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-md font-semibold transition duration-200 ease-in-out">
                    Upload Background Image
                    <input
                      id="background-image-upload"
                      type="file"
                      accept="image/*"
                      onChange={handleBackgroundUpload}
                      className="hidden"
                    />
                  </label>
                  {selectedBackgroundImageUrl && (
                    <span className="text-sm text-gray-400">Image selected!</span>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Canvas and Download Button - Canvas is now always rendered, but its visibility is controlled by resultUrl */}
          <div className={`space-y-6 w-full flex flex-col items-center mt-6 ${resultUrl ? '' : 'hidden'}`}>
            <h2 className="text-xl font-semibold text-gray-300">Result:</h2>
            <canvas
              ref={canvasRef}
              className="w-full max-w-lg border-2 border-gray-700 rounded-lg shadow-lg bg-gray-800" // Added bg-gray-800 to show transparency
              style={{ maxWidth: '100%', height: 'auto' }} // Ensure responsiveness
            />
            <a
              href={resultUrl}
              download="removed-bg.png"
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-md text-white inline-block font-semibold transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Download Image (PNG)
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BackgroundRemover;
