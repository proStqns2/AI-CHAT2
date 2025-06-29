import React from 'react';
import { Cog, Zap, Activity, Cpu } from 'lucide-react';

const MechanicalElements: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating mechanical elements */}
      <div className="absolute top-20 left-10 animate-spin-slow">
        <Cog className="w-8 h-8 text-gray-300 opacity-20" />
      </div>
      
      <div className="absolute top-40 right-20 animate-pulse">
        <Zap className="w-6 h-6 text-blue-300 opacity-30" />
      </div>
      
      <div className="absolute bottom-32 left-20 animate-bounce">
        <Activity className="w-7 h-7 text-emerald-300 opacity-25" />
      </div>
      
      <div className="absolute bottom-20 right-16 animate-spin-slow" style={{ animationDelay: '1s' }}>
        <Cpu className="w-9 h-9 text-purple-300 opacity-20" />
      </div>
      
      {/* Connecting lines */}
      <svg className="absolute inset-0 w-full h-full opacity-10">
        <defs>
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#94a3b8" strokeWidth="0.5"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>
      
      {/* Floating particles */}
      <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-30"></div>
      <div className="absolute top-3/4 right-1/4 w-1.5 h-1.5 bg-emerald-400 rounded-full animate-ping opacity-40" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/4 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-35" style={{ animationDelay: '1.5s' }}></div>
    </div>
  );
};

export default MechanicalElements;