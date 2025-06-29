import React from 'react';
import { Cog, Layers, Square, Circle } from 'lucide-react';

interface AthenaLogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

const AthenaLogo: React.FC<AthenaLogoProps> = ({ size = 'md', showText = true }) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl'
  };

  return (
    <div className="flex items-center space-x-3">
      <div className={`${sizeClasses[size]} relative flex items-center justify-center`}>
        {/* Main geometric structure inspired by the logo */}
        <div className="relative w-full h-full">
          {/* Base geometric shapes */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg transform rotate-12 opacity-90"></div>
          <div className="absolute inset-1 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg transform -rotate-6 opacity-80"></div>
          <div className="absolute inset-2 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-md transform rotate-3 opacity-70"></div>
          
          {/* Mechanical elements */}
          <div className="absolute top-1 right-1 w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
          <div className="absolute bottom-1 left-1 w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          
          {/* Central core */}
          <div className="absolute inset-3 bg-white rounded-sm flex items-center justify-center">
            <div className="w-1 h-1 bg-slate-800 rounded-full"></div>
          </div>
          
          {/* Window-like elements */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-cyan-400 rounded-full opacity-75"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-pink-400 rounded-full opacity-75"></div>
        </div>
      </div>
      
      {showText && (
        <div className="flex flex-col">
          <h1 className={`${textSizeClasses[size]} font-bold leading-tight`}>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent tracking-wide">
              ATHENA AI
            </span>
          </h1>
          <div className="flex items-center space-x-1 text-xs text-gray-400">
            <Circle className="w-2 h-2 fill-current text-green-400" />
            <span>Active</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default AthenaLogo;