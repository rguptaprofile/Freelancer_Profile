import React, { useState } from 'react';
import { X, ZoomIn, ZoomOut, Download, ExternalLink, User } from 'lucide-react';

interface PhotoLightboxModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageSrc: string;
  name: string;
  title: string;
}

export const PhotoLightboxModal: React.FC<PhotoLightboxModalProps> = ({
  isOpen,
  onClose,
  imageSrc,
  name,
  title,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  if (!isOpen) return null;

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.25, 0.75));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[95vh] flex flex-col items-center justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="w-full flex items-center justify-between p-3 sm:p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-white mb-3 backdrop-blur-md">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-blue-400" />
            <div>
              <div className="text-sm font-bold tracking-tight text-white">{name}</div>
              <div className="text-xs text-slate-400">{title}</div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={handleZoomOut}
              className="p-1.5 sm:p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <button
              onClick={handleResetZoom}
              className="px-2 py-1 text-xs font-mono rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Reset Zoom"
            >
              {Math.round(zoomLevel * 100)}%
            </button>
            <button
              onClick={handleZoomIn}
              className="p-1.5 sm:p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-4 h-4" />
            </button>

            <a
              href={imageSrc}
              download={`${name.replace(/\s+/g, '-')}-Photo.jpg`}
              className="p-1.5 sm:p-2 rounded-lg bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 border border-blue-500/40 transition-colors flex items-center gap-1 text-xs"
              title="Download Full Resolution Photo"
            >
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Save</span>
            </a>

            <button
              onClick={onClose}
              className="p-1.5 sm:p-2 rounded-lg bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-800/40 transition-colors ml-2"
              title="Close Viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Full Image Display Container */}
        <div className="relative w-full max-h-[80vh] flex items-center justify-center overflow-auto rounded-2xl bg-black/60 border border-slate-800/80 p-2 sm:p-4">
          <img
            src={imageSrc}
            alt={name}
            style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.2s ease-out' }}
            className="max-h-[75vh] w-auto max-w-full object-contain rounded-xl shadow-2xl select-none"
          />
        </div>

        {/* Bottom indicator */}
        <div className="mt-2 text-xs font-mono text-slate-400 text-center">
          Full Uncropped Resolution &bull; Click anywhere outside to close
        </div>
      </div>
    </div>
  );
};
