import React, { useState, useEffect } from 'react';
import { 
  ArrowRight,
  Zap,
  Brain,
  Shield,
  Globe,
  Cpu,
  Activity
} from 'lucide-react';

interface OpeningPageProps {
  onEnter: () => void;
}

const OpeningPage: React.FC<OpeningPageProps> = ({ onEnter }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  const [showEnterButton, setShowEnterButton] = useState(false);
  
  const texts = [
    'INITIALIZING NEURAL NETWORKS...',
    'LOADING AI CONSCIOUSNESS...',
    'CONNECTING TO GEMINI CORE...',
    'QUANTUM PROCESSORS ONLINE...',
    'ATHENA AI READY FOR DEPLOYMENT'
  ];

  useEffect(() => {
    setIsLoaded(true);
    
    const interval = setInterval(() => {
      setTextIndex((prev) => {
        if (prev < texts.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setTimeout(() => setShowEnterButton(true), 1000);
          return prev;
        }
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const text = texts[textIndex];
    let charIndex = 0;
    setCurrentText('');
    
    const typeInterval = setInterval(() => {
      if (charIndex < text.length) {
        setCurrentText(text.slice(0, charIndex + 1));
        charIndex++;
      } else {
        clearInterval(typeInterval);
      }
    }, 80);

    return () => clearInterval(typeInterval);
  }, [textIndex]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Matrix-style background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />
        
        {/* Animated circuit patterns */}
        <svg className="absolute inset-0 w-full h-full opacity-20" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="circuit-pattern" x="0" y="0" width="200" height="200" patternUnits="userSpaceOnUse">
              <path d="M20 20h160v160h-160z" fill="none" stroke="#00ffff" strokeWidth="0.5" opacity="0.3"/>
              <circle cx="20" cy="20" r="3" fill="#00ffff" opacity="0.6">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
              </circle>
              <circle cx="180" cy="180" r="3" fill="#ff00ff" opacity="0.6">
                <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin="1s"/>
              </circle>
              <path d="M20 100h160M100 20v160" stroke="#00ffff" strokeWidth="0.3" opacity="0.4"/>
              <path d="M60 60h80v80h-80z" fill="none" stroke="#ff00ff" strokeWidth="0.3" opacity="0.3"/>
            </pattern>
            
            <linearGradient id="neon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00ffff" stopOpacity="0.8"/>
              <stop offset="50%" stopColor="#0080ff" stopOpacity="0.6"/>
              <stop offset="100%" stopColor="#ff00ff" stopOpacity="0.8"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit-pattern)"/>
        </svg>

        {/* Flowing data streams */}
        <div className="absolute inset-0">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-60"
              style={{
                left: `${5 + (i * 6)}%`,
                height: '100%',
                animation: `data-flow ${3 + Math.random() * 2}s linear infinite`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Horizontal data streams */}
        <div className="absolute inset-0">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-40"
              style={{
                top: `${10 + (i * 8)}%`,
                width: '100%',
                animation: `horizontal-flow ${4 + Math.random() * 2}s linear infinite`,
                animationDelay: `${Math.random() * 4}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-geometric"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${8 + Math.random() * 4}s`
            }}
          >
            {i % 5 === 0 && (
              <div className="w-4 h-4 border border-cyan-400 opacity-60 animate-pulse" 
                   style={{ transform: 'rotate(45deg)' }} />
            )}
            {i % 5 === 1 && (
              <div className="w-3 h-3 bg-purple-400 opacity-60 animate-pulse" 
                   style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} />
            )}
            {i % 5 === 2 && (
              <div className="w-2 h-2 bg-emerald-400 rounded-full opacity-60 animate-pulse" />
            )}
            {i % 5 === 3 && (
              <div className="w-4 h-4 border border-pink-400 rounded-full opacity-60 animate-pulse" />
            )}
            {i % 5 === 4 && (
              <div className="w-3 h-3 bg-yellow-400 opacity-60 animate-pulse" 
                   style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }} />
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        
        {/* Logo Section */}
        <div className={`transform transition-all duration-2000 ${
          isLoaded ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-20 opacity-0 scale-95'
        }`}>
          <div className="text-center mb-16">
            {/* 3D Cube Logo */}
            <div className="mb-12 relative">
              <div className="w-32 h-32 mx-auto relative perspective-1000">
                <div className="cube-container">
                  <div className="cube">
                    <div className="face front"></div>
                    <div className="face back"></div>
                    <div className="face right"></div>
                    <div className="face left"></div>
                    <div className="face top"></div>
                    <div className="face bottom"></div>
                  </div>
                </div>
              </div>
              
              {/* Glow effect around logo */}
              <div className="absolute inset-0 -m-8">
                <div className="w-full h-full bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
              </div>
            </div>
            
            {/* Title with glitch effect */}
            <h1 className="text-7xl md:text-9xl font-bold mb-8 tracking-wider relative">
              <span className="glitch-text bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent">
                ATHENA AI
              </span>
            </h1>
            
            <div className="space-y-4">
              <p className="text-2xl md:text-3xl text-gray-300 font-light tracking-wide">
                NEURAL INTELLIGENCE SYSTEM
              </p>
              <p className="text-lg md:text-xl text-cyan-400 font-mono">
                POWERED BY GEMINI QUANTUM CORE
              </p>
            </div>
          </div>
        </div>

        {/* Terminal-style Loading */}
        <div className={`transform transition-all duration-1000 delay-500 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="terminal-window bg-black/80 backdrop-blur-lg rounded-lg border border-cyan-500/30 p-6 mb-12 min-w-[500px] max-w-2xl">
            {/* Terminal header */}
            <div className="flex items-center space-x-2 mb-4 pb-2 border-b border-cyan-500/20">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-cyan-400 text-sm font-mono ml-4">ATHENA_CORE_v2.1.0</span>
            </div>
            
            {/* Terminal content */}
            <div className="space-y-3">
              {texts.slice(0, textIndex + 1).map((text, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <span className="text-emerald-400 font-mono">$</span>
                  <span className="text-white font-mono text-sm">
                    {index === textIndex ? currentText : text}
                    {index === textIndex && (
                      <span className="animate-pulse text-cyan-400">█</span>
                    )}
                  </span>
                  {index < textIndex && (
                    <span className="text-emerald-400 text-sm">✓</span>
                  )}
                </div>
              ))}
            </div>
            
            {/* Progress indicators */}
            <div className="mt-6 space-y-3">
              <div className="flex justify-between text-xs text-gray-400">
                <span>SYSTEM STATUS</span>
                <span>{Math.round(((textIndex + 1) / texts.length) * 100)}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 h-2 rounded-full transition-all duration-1000 relative overflow-hidden"
                  style={{ width: `${((textIndex + 1) / texts.length) * 100}%` }}
                >
                  <div className="absolute inset-0 bg-white/30 animate-pulse"></div>
                </div>
              </div>
            </div>

            {/* System metrics */}
            <div className="mt-6 grid grid-cols-2 gap-4 text-xs">
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300">Neural Core:</span>
                <span className="text-emerald-400">ONLINE</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300">Power Level:</span>
                <span className="text-emerald-400">100%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-cyan-400" />
                <span className="text-gray-300">Network:</span>
                <span className="text-emerald-400">CONNECTED</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">Security:</span>
                <span className="text-emerald-400">ACTIVE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enter Button */}
        <div className={`transform transition-all duration-1000 ${
          showEnterButton ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'
        }`}>
          <button
            onClick={onEnter}
            className="group relative px-12 py-6 bg-gradient-to-r from-cyan-600 via-purple-600 to-emerald-600 text-white text-2xl font-bold rounded-xl hover:from-cyan-700 hover:via-purple-700 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 border border-cyan-500/50 shadow-2xl overflow-hidden"
          >
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-400/20 to-emerald-400/20 blur-xl group-hover:blur-2xl transition-all duration-300"></div>
            
            <div className="relative flex items-center space-x-4">
              <div className="w-8 h-8 border-2 border-white rounded-full flex items-center justify-center">
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </div>
              <span className="tracking-wider">ENTER ATHENA AI</span>
            </div>
            
            {/* Animated border */}
            <div className="absolute inset-0 rounded-xl border-2 border-transparent bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" 
                 style={{ mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)', maskComposite: 'exclude' }}></div>
          </button>
        </div>

        {/* Feature indicators */}
        <div className={`transform transition-all duration-1000 delay-1000 mt-16 ${
          showEnterButton ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl">
            {[
              { icon: Brain, label: 'NEURAL AI', desc: 'Advanced Learning' },
              { icon: Zap, label: 'QUANTUM SPEED', desc: 'Instant Response' },
              { icon: Shield, label: 'SECURE CORE', desc: 'Protected Data' },
              { icon: Cpu, label: 'MULTI-MODEL', desc: 'Gemini Powered' }
            ].map((feature, index) => (
              <div key={index} className="bg-black/40 backdrop-blur-lg rounded-xl border border-cyan-500/20 p-6 text-center group hover:border-cyan-500/50 transition-all duration-300">
                <feature.icon className="w-8 h-8 text-cyan-400 mx-auto mb-3 group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-white font-bold text-sm mb-1 tracking-wide">{feature.label}</h3>
                <p className="text-gray-400 text-xs">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Particle system */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-px bg-cyan-400 rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `particle-float ${5 + Math.random() * 10}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default OpeningPage;