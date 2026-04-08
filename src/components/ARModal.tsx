import React from 'react';
import { X, Info, Box } from 'lucide-react';

interface ARModalProps {
  isOpen: boolean;
  onClose: () => void;
  monasteryName: string;
  modelUrl?: string;
  translations: any;
}

const ARModal: React.FC<ARModalProps> = ({ isOpen, onClose, monasteryName, modelUrl, translations }) => {
  if (!isOpen) return null;

  // Placeholder model if none provided - using a generic building/monument style model for demo
  const defaultModel = "https://modelviewer.dev/shared-assets/models/Astronaut.glb"; // Fallback for dev
  const activeModel = modelUrl || defaultModel;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-white rounded-3xl w-full max-w-4xl h-[80vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gradient-to-r from-orange-50 to-red-50">
          <div className="flex items-center space-x-3">
            <div className="bg-red-600 p-2 rounded-xl text-white">
              <Box className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{monasteryName}</h2>
              <p className="text-sm text-red-600 font-medium">{translations.spiritualGuide || 'AR Visualization'}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        {/* AR Viewer Interface */}
        <div className="flex-1 relative bg-gray-50">
          <model-viewer
            src={activeModel}
            alt={`A 3D model of ${monasteryName}`}
            ar
            ar-modes="webxr scene-viewer quick-look"
            camera-controls
            auto-rotate
            shadow-intensity="1"
            className="w-full h-full"
            style={{ backgroundColor: '#f9fafb' }}
          >
            <div slot="ar-button" className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-red-600 text-white px-8 py-3 rounded-full font-bold shadow-xl animate-bounce hover:bg-red-700 transition-all">
              View in Your Space (AR)
            </div>
          </model-viewer>

          {/* Overlay Info */}
          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-gray-200 max-w-xs transition-all hover:scale-105">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-orange-600 mt-1 shrink-0" />
              <div>
                <h4 className="font-bold text-sm text-gray-900">AR Instructions</h4>
                <p className="text-xs text-gray-600 mt-1">
                  1. Scan your floor until a grid appears.<br/>
                  2. Tap to place the monastery.<br/>
                  3. Use pinch to zoom and rotate.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-white border-t border-gray-100 flex justify-center">
          <button 
            onClick={onClose}
            className="bg-gray-900 text-white px-10 py-3 rounded-xl font-bold hover:bg-black transition-all shadow-lg"
          >
            Close View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ARModal;
