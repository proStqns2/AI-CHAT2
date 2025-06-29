import React from 'react';
import { Cpu, Zap, Circle, Hexagon } from 'lucide-react';

interface AthenaLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const AthenaLogo: React.FC<AthenaLogoProps> = ({ size = 'md', showText = true }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-20 h-20'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-3xl'
  };

  return (
    <div className="flex items-center space-x-3">
      <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
        {/* Main cyberpunk logo structure */}
        <div className="relative w-full h-full">
          {/* Outer hexagonal frame */}
          <div className="absolute inset-0 border-2 border-cyan-400 transform rotate-12 opacity-80 rounded-lg animate-pulse"></div>
          <div className="absolute inset-1 border-2 border-purple-500 transform -rotate-6 opacity-70 rounded-lg"></div>
          <div className="absolute inset-2 border-2 border-emerald-400 transform rotate-3 opacity-60 rounded-md"></div>
          
          {/* Central core with circuit pattern */}
          <div className="absolute inset-3 bg-gradient-to-br from-cyan-500/30 to-purple-500/30 rounded-sm flex items-center justify-center backdrop-blur-sm">
            <div className="relative">
              <Cpu className="w-4 h-4 text-white animate-pulse" />
              <div className="absolute -inset-1 bg-cyan-400/20 rounded-full animate-ping"></div>
            </div>
          </div>
          
          {/* Corner indicators */}
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-emerald-400 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-pink-400 rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
          
          {/* Data flow lines */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-2 bg-gradient-to-b from-cyan-400 to-transparent opacity-75"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-2 bg-gradient-to-t from-purple-400 to-transparent opacity-75"></div>
          <div className="absolute left-0 top-1/2 transform -translate-y-1/2 h-px w-2 bg-gradient-to-r from-emerald-400 to-transparent opacity-75"></div>
          <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-px w-2 bg-gradient-to-l from-pink-400 to-transparent opacity-75"></div>
        </div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <h1 className={`${textSizeClasses[size]} font-bold leading-tight tracking-wider`}>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent neon-text">
              ATHENA AI
            </span>
          </h1>
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <Circle className="w-2 h-2 fill-current text-cyan-400 animate-pulse" />
            <span>Neural Core Active</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AthenaLogo;