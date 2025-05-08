import React, { useState, useEffect, useCallback } from "react";

const ImageLightbox = ({
  images = [],
  initialIndex = 0,
  onClose = () => {},
}) => {
  // Guard against no images
  if (!images || images.length === 0) {
    return null;
  }

  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setScale(1);
  }, [images.length]);

  const handlePrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setScale(1);
  }, [images.length]);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, 0.5));
  };

  const handleMouseDown = (e: { pageX: number }) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollLeft);
  };

  const handleMouseMove = (e: {
    preventDefault: () => void;
    pageX: number;
  }) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - startX;
    setScrollLeft(x);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleKeyPress = (e: { key: string }) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrevious();
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleNext, handlePrevious, onClose]);

  // Return early if no valid current image
  if (!images[currentIndex]) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center h-screen w-full">
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white hover:text-gray-300 z-50"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-8 h-8"
        >
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>

      {/* Navigation buttons - only show if there's more than one image */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrevious}
            className="absolute sm:left-8 left-4 text-white sm:bg-gray-800 bg-transparent hover:text-gray-300 z-50 hover:scale-105 hover:bg-gray-600 rounded-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24 "
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>
          <button
            onClick={handleNext}
            className="absolute sm:right-8 right-4 text-white sm:bg-gray-800 bg-transparent hover:text-gray-300 z-50 hover:scale-105 hover:bg-gray-600 rounded-sm"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#ffffff"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-8 h-8"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </>
      )}

      {/* Zoom controls */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 z-50">
        <button
          onClick={handleZoomOut}
          className="bg-white/20 p-2 rounded-full hover:bg-white/30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-white"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" x2="16.65" y1="21" y2="16.65" />
            <line x1="8" x2="14" y1="11" y2="11" />
          </svg>
        </button>
        <button
          onClick={handleZoomIn}
          className="bg-white/20 p-2 rounded-full hover:bg-white/30"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ffffff"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-6 h-6 text-white"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" x2="16.65" y1="21" y2="16.65" />
            <line x1="11" x2="11" y1="8" y2="14" />
            <line x1="8" x2="14" y1="11" y2="11" />
          </svg>
        </button>
      </div>

      {/* Image container */}
      <div
        className="h-screen w-full overflow-auto cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="h-screen min-w-full flex items-center justify-center transition-transform duration-200 p-4"
          style={{
            transform: `scale(${scale}) translateX(${scrollLeft}px)`,
          }}
        >
          <img
            src={images[currentIndex]}
            alt={`Image ${currentIndex + 1}`}
            className="max-h-full max-w-full object-contain select-none"
            loading="lazy"
          />
        </div>
      </div>

      {/* Image counter - only show if there's more than one image */}
      {images.length > 1 && (
        <div className="absolute bottom-4 right-4 text-white bg-black/50 px-3 py-1 rounded-full">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
};

export default ImageLightbox;
