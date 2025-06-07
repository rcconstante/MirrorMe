import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, CameraOff, Play, Square } from 'lucide-react';

const CameraTest: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string>('');
  const [deviceInfo, setDeviceInfo] = useState<string>('');

  const startCamera = async () => {
    try {
      setError('');
      
      // Get available devices for debugging
      const devices = await navigator.mediaDevices.enumerateDevices();
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      setDeviceInfo(`Found ${videoDevices.length} camera(s)`);
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 640 },
          height: { ideal: 480 },
          facingMode: 'user'
        },
        audio: false
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play()
            .then(() => {
              setIsStreaming(true);
              console.log('Video stream started successfully');
            })
            .catch(err => {
              console.error('Error playing video:', err);
              setError('Failed to play video stream');
            });
        };
      }
    } catch (err) {
      console.error('Camera error:', err);
      setError(`Camera error: ${err instanceof Error ? err.message : 'Unknown error'}`);
    }
  };

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
      console.log('Camera stopped');
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="max-w-2xl mx-auto p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#1C2541]/40 backdrop-blur-sm rounded-xl border border-[#5BC0BE]/20 p-6"
      >
        <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
          <Camera className="text-[#5BC0BE]" size={24} />
          Camera Test
        </h2>

        {/* Camera Controls */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={isStreaming ? stopCamera : startCamera}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
              isStreaming
                ? 'bg-red-500 hover:bg-red-600 text-white'
                : 'bg-green-500 hover:bg-green-600 text-white'
            }`}
          >
            {isStreaming ? (
              <>
                <Square size={16} />
                Stop Camera
              </>
            ) : (
              <>
                <Play size={16} />
                Start Camera
              </>
            )}
          </button>
        </div>

        {/* Video Display */}
        <div className="relative aspect-video bg-[#0B132B]/50 rounded-lg overflow-hidden mb-4">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ transform: 'scaleX(-1)' }}
          />
          
          {!isStreaming && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-gray-400">
                <CameraOff size={48} className="mx-auto mb-2" />
                <p>Camera not active</p>
              </div>
            </div>
          )}
          
          {isStreaming && (
            <div className="absolute top-3 left-3 flex items-center gap-2 bg-black/50 rounded px-2 py-1">
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              <span className="text-white text-xs">LIVE</span>
            </div>
          )}
        </div>

        {/* Status Information */}
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">Status:</span>
            <span className={isStreaming ? 'text-green-400' : 'text-gray-400'}>
              {isStreaming ? 'Streaming' : 'Stopped'}
            </span>
          </div>
          
          {deviceInfo && (
            <div className="flex justify-between">
              <span className="text-gray-400">Devices:</span>
              <span className="text-blue-400">{deviceInfo}</span>
            </div>
          )}
          
          {error && (
            <div className="bg-red-500/20 border border-red-500/30 rounded p-3 mt-3">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}
        </div>

        {/* Instructions */}
        <div className="mt-4 p-4 bg-[#5BC0BE]/10 rounded-lg border border-[#5BC0BE]/20">
          <h4 className="font-medium text-[#5BC0BE] mb-2">Instructions:</h4>
          <ul className="text-xs text-gray-300 space-y-1">
            <li>• Click "Start Camera" to begin video stream</li>
            <li>• Allow camera permissions when prompted</li>
            <li>• Video should appear with a mirrored view (selfie mode)</li>
            <li>• Red dot indicates active recording</li>
          </ul>
        </div>
      </motion.div>
    </div>
  );
};

export default CameraTest; 