import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Zap, 
  Brain, 
  Rocket, 
  ArrowRight,
  Code,
  Cpu,
  Activity,
  Shield,
  Globe
} from 'lucide-react';
import AthenaLogo from './AthenaLogo';

interface OpeningPageProps {
  onEnter: () => void;
}

const OpeningPage: React.FC<OpeningPageProps> = ({ onEnter }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [textIndex, setTextIndex] = useState(0);
  
  const texts = [
    'Initializing Neural Networks...',
    'Loading AI Consciousness...',
    'Connecting to Gemini Core...',
    'Athena AI Ready!'
  ];

  useEffect(() => {
    setIsLoaded(true);
    
    const interval = setInterval(() => {
      setTextIndex((prev) => {
        if (prev < texts.length - 1) {
          return prev + 1;
        }
        clearInterval(interval);
        return prev;
      });
    }, 1500);

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
    }, 50);

    return () => clearInterval(typeInterval);
  }, [textIndex]);

  return (
    <div className="min-h-screen relative overflow-hidden bg-black">
      {/* Cyberpunk Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-60"
          style={{
            backgroundImage: 'url(/pngtree-high-tech-ai-design-with-glowing-circuitry-and-data-streams-picture-image_16064011.jpg)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/90 via-blue-900/80 to-cyan-900/90" />
      </div>

      {/* Animated Grid */}
      <div className="absolute inset-0 opacity-30">
        <div className="grid-lines"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-random"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          >
            {i % 4 === 0 && <Code className="w-4 h-4 text-cyan-400 opacity-60" />}
            {i % 4 === 1 && <Cpu className="w-4 h-4 text-purple-400 opacity-60" />}
            {i % 4 === 2 && <Activity className="w-4 h-4 text-emerald-400 opacity-60" />}
            {i % 4 === 3 && <Shield className="w-4 h-4 text-blue-400 opacity-60" />}
          </div>
        ))}
      </div>

      {/* Data Streams */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent opacity-40 animate-data-stream"
            style={{
              left: `${10 + (i * 8)}%`,
              height: '100%',
              animationDelay: `${i * 0.3}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Logo Section */}
        <div className={`transform transition-all duration-2000 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
        }`}>
          <div className="text-center mb-12">
            <div className="mb-8 relative">
              <AthenaLogo size="lg" showText={false} />
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full blur-xl animate-pulse"></div>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-wider">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent animate-gradient">
                ATHENA AI
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              The Future of Artificial Intelligence
              <br />
              <span className="text-cyan-400">Powered by Advanced Neural Networks</span>
            </p>
          </div>
        </div>

        {/* Loading Animation */}
        <div className={`transform transition-all duration-1000 delay-500 ${
          isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="bg-black/40 backdrop-blur-lg rounded-2xl border border-cyan-500/30 p-8 mb-8 min-w-[400px]">
            <div className="flex items-center space-x-4 mb-6">
              <div className="w-4 h-4 bg-cyan-400 rounded-full animate-pulse"></div>
              <div className="text-cyan-400 font-mono text-lg">
                {currentText}
                <span className="animate-pulse">|</span>
              </div>
            </div>
            
            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <div 
                className="bg-gradient-to-r from-cyan-400 to-purple-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${((textIndex + 1) / texts.length) * 100}%` }}
              ></div>
            </div>
            
            {/* System Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Brain className="w-4 h-4 text-purple-400" />
                <span className="text-gray-300">Neural Core: Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <Zap className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300">Power: 100%</span>
              </div>
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-emerald-400" />
                <span className="text-gray-300">Network: Connected</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-blue-400" />
                <span className="text-gray-300">Security: Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Enter Button */}
        <div className={`transform transition-all duration-1000 delay-1000 ${
          textIndex >= texts.length - 1 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <button
            onClick={onEnter}
            className="group px-8 py-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-white text-xl font-semibold rounded-xl hover:from-cyan-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 border border-cyan-500/30 shadow-2xl"
          >
            <div className="flex items-center space-x-3">
              <Rocket className="w-6 h-6 group-hover:animate-bounce" />
              <span>Enter Athena AI</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </div>
          </button>
        </div>

        {/* Features Preview */}
        <div className={`transform transition-all duration-1000 delay-1500 mt-12 ${
          textIndex >= texts.length - 1 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
        }`}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
            <div className="bg-black/30 backdrop-blur-lg rounded-xl border border-cyan-500/20 p-6 text-center">
              <Brain className="w-8 h-8 text-purple-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Advanced AI</h3>
              <p className="text-gray-400 text-sm">Powered by Gemini Pro</p>
            </div>
            
            <div className="bg-black/30 backdrop-blur-lg rounded-xl border border-cyan-500/20 p-6 text-center">
              <Zap className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Lightning Fast</h3>
              <p className="text-gray-400 text-sm">Real-time responses</p>
            </div>
            
            <div className="bg-black/30 backdrop-blur-lg rounded-xl border border-cyan-500/20 p-6 text-center">
              <Sparkles className="w-8 h-8 text-emerald-400 mx-auto mb-3" />
              <h3 className="text-white font-semibold mb-2">Creative</h3>
              <p className="text-gray-400 text-sm">Unlimited possibilities</p>
            </div>
          </div>
        </div>
      </div>

      {/* Particle Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full opacity-60 animate-twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default OpeningPage;