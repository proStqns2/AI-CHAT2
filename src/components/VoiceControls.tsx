import React from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';

interface VoiceControlsProps {
  isRecording: boolean;
  onToggleRecording: () => void;
}

const VoiceControls: React.FC<VoiceControlsProps> = ({ 
  isRecording, 
  onToggleRecording 
}) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={onToggleRecording}
        className={`p-2 rounded-lg transition-all duration-200 ${
          isRecording
            ? 'bg-red-500 text-white animate-pulse'
            : 'text-gray-400 hover:text-white hover:bg-white/10'
        }`}
        title={isRecording ? 'Stop recording' : 'Start voice input'}
      >
        {isRecording ? (
          <MicOff className="w-5 h-5" />
        ) : (
          <Mic className="w-5 h-5" />
        )}
      </button>
      
      <button
        className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
        title="Text to speech"
      >
        <Volume2 className="w-5 h-5" />
      </button>
    </div>
  );
};

export default VoiceControls;