import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

function Lightbox({ isOpen, mediaList, currentIndex, onClose, onNext, onPrev }) {
  // 键盘导航
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'ArrowRight') onNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose, onNext, onPrev]);

  if (!isOpen || !mediaList[currentIndex]) return null;

  return (
    <div
      className="fixed inset-0 z-[60] bg-black/95 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 md:top-8 md:right-8 p-3 text-white/70 hover:text-white bg-black/50 hover:bg-slate-800 rounded-full transition-all z-50"
      >
        <X size={32} />
      </button>

      {/* Main Content Area */}
      <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12" onClick={(e) => e.stopPropagation()}>
        {/* Previous Button */}
        <button
          onClick={onPrev}
          className="absolute left-2 md:left-8 p-3 bg-black/50 hover:bg-cyan-500 text-white rounded-full transition-all backdrop-blur-sm group border border-white/10 hover:border-cyan-400 z-10"
        >
          <ChevronLeft size={32} className="group-active:-translate-x-1 transition-transform" />
        </button>

        {/* Media Content */}
        <div className="relative max-w-full max-h-full shadow-2xl shadow-black">
          {mediaList[currentIndex].type === 'video' ? (
            <video
              src={mediaList[currentIndex].url}
              controls
              autoPlay
              className="max-h-[85vh] max-w-[90vw] rounded shadow-lg bg-black"
            >
              Your browser does not support video.
            </video>
          ) : (
            <img
              src={mediaList[currentIndex].url}
              alt={mediaList[currentIndex].caption}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded shadow-lg"
            />
          )}

          {/* Caption in Lightbox */}
          {mediaList[currentIndex].caption && (
            <div className="absolute -bottom-12 left-0 right-0 text-center">
              <p className="text-white text-lg font-medium tracking-wide">{mediaList[currentIndex].caption}</p>
              <p className="text-slate-500 text-sm mt-1">
                {currentIndex + 1} / {mediaList.length}
              </p>
            </div>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={onNext}
          className="absolute right-2 md:right-8 p-3 bg-black/50 hover:bg-cyan-500 text-white rounded-full transition-all backdrop-blur-sm group border border-white/10 hover:border-cyan-400 z-10"
        >
          <ChevronRight size={32} className="group-active:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}

export default Lightbox;
