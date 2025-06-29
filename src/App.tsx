import React, { useState, useRef, useEffect } from 'react';
import { 
  Send, 
  Paperclip, 
  Mic, 
  Square, 
  RotateCcw, 
  Settings, 
  Zap, 
  Brain, 
  Sparkles,
  MessageSquare,
  Code,
  Image,
  FileText,
  Lightbulb,
  Rocket,
  Star,
  Copy,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  X,
  Minimize2,
  Maximize2,
  Play,
  Pause,
  Volume2,
  VolumeX,
  ChevronUp,
  ChevronDown,
  LogIn,
  UserPlus,
  User
} from 'lucide-react';
import AthenaLogo from './components/AthenaLogo';
import ChatWindow from './components/ChatWindow';
import ApiKeyManager from './components/ApiKeyManager';
import QuickActions from './components/QuickActions';
import VoiceControls from './components/VoiceControls';
import AuthModal from './components/AuthModal';
import OpeningPage from './components/OpeningPage';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  reactions?: string[];
  attachments?: any[];
}

interface ChatWindow {
  id: string;
  title: string;
  messages: Message[];
  isActive: boolean;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isMinimized: boolean;
}

function App() {
  const [showOpeningPage, setShowOpeningPage] = useState(true);
  const [chatWindows, setChatWindows] = useState<ChatWindow[]>([
    {
      id: '1',
      title: 'Main Chat',
      messages: [
        {
          id: '1',
          type: 'assistant',
          content: "Hey there! 👋 I'm Athena AI - your brilliant, witty, and incredibly capable AI assistant. Think of me as your digital companion who's always ready to help, learn, and maybe crack a joke or two! What amazing thing shall we work on together today?",
          timestamp: new Date(),
          reactions: ['🚀', '💡']
        }
      ],
      isActive: true,
      position: { x: 50, y: 100 },
      size: { width: 800, height: 600 },
      isMinimized: false
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [showApiManager, setShowApiManager] = useState(false);
  const [currentModel, setCurrentModel] = useState('gemini-pro');
  const [temperature, setTemperature] = useState(0.7);
  const [maxTokens, setMaxTokens] = useState(2048);
  const [systemPrompt, setSystemPrompt] = useState('You are Athena AI, a brilliant, witty, and helpful AI assistant. Be engaging, creative, and professional while maintaining a fun personality.');
  const [isChatMinimized, setIsChatMinimized] = useState(false);
  
  // Auth states
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ username: string; email: string } | null>(null);

  // Gemini API Key
  const [geminiApiKey] = useState('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');

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const models = [
    { id: 'gemini-pro', name: 'Gemini Pro', icon: '🧠', description: 'Google\'s most capable model' },
    { id: 'gemini-pro-vision', name: 'Gemini Pro Vision', icon: '👁️', description: 'Multimodal AI with vision' },
    { id: 'grok-beta', name: 'Grok Beta', icon: '🚀', description: 'Witty and rebellious' },
    { id: 'qwen-2-72b', name: 'Qwen 2 72B', icon: '🧠', description: 'Powerful reasoning' },
    { id: 'claude-3-opus', name: 'Claude 3 Opus', icon: '✨', description: 'Creative excellence' }
  ];

  const quickPrompts = [
    { icon: '💡', text: 'Brainstorm creative ideas', category: 'Creative' },
    { icon: '📊', text: 'Analyze data and trends', category: 'Analysis' },
    { icon: '✍️', text: 'Write compelling content', category: 'Writing' },
    { icon: '🔧', text: 'Debug and fix code', category: 'Coding' },
    { icon: '🎨', text: 'Design something beautiful', category: 'Design' },
    { icon: '🚀', text: 'Plan a project launch', category: 'Strategy' }
  ];

  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = Math.min(textarea.scrollHeight, 200) + 'px';
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [inputValue]);

  const callGeminiAPI = async (message: string): Promise<string> => {
    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + geminiApiKey, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `${systemPrompt}\n\nUser: ${message}`
            }]
          }],
          generationConfig: {
            temperature: temperature,
            maxOutputTokens: maxTokens,
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I couldn\'t generate a response.';
    } catch (error) {
      console.error('Gemini API Error:', error);
      return 'I\'m having trouble connecting to my AI brain right now. Please try again in a moment! 🤖';
    }
  };

  const simulateAIResponse = (userMessage: string, model: string): string => {
    const responses = {
      'gemini-pro': [
        "🧠 Gemini Pro here! I've analyzed your request with Google's latest AI technology. Here's my comprehensive response...",
        "Fascinating question! Using my advanced reasoning capabilities, I can provide you with detailed insights...",
        "Let me tap into my vast knowledge base to give you the most accurate and helpful response..."
      ],
      'grok-beta': [
        "Well, well, well... *adjusts digital sunglasses* 😎 That's a fascinating question! Let me break this down for you with some Grok-style wit and wisdom...",
        "Ah, I see what you're getting at! *cracks digital knuckles* Time to unleash some serious AI firepower on this problem. Here's what I'm thinking...",
        "Hold onto your hat! 🎩 This is where things get interesting. Let me dive deep into this with my rebellious AI brain..."
      ],
      'qwen-2-72b': [
        "Excellent question! Let me apply advanced reasoning to provide you with a comprehensive analysis. Based on my understanding...",
        "I'll approach this systematically using multi-step reasoning. Here's my detailed breakdown of the situation...",
        "This requires careful consideration of multiple factors. Allow me to walk you through my analytical process..."
      ],
      'claude-3-opus': [
        "What a delightful inquiry! ✨ I'm excited to explore this creative challenge with you. Here's my thoughtful response...",
        "This sparks so many interesting possibilities! Let me craft a response that's both insightful and engaging...",
        "I love questions like this! They allow me to blend creativity with analytical thinking. Here's what I'm envisioning..."
      ]
    };

    const modelResponses = responses[model as keyof typeof responses] || responses['gemini-pro'];
    return modelResponses[Math.floor(Math.random() * modelResponses.length)];
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const activeWindow = chatWindows.find(w => w.isActive);
    if (!activeWindow) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      timestamp: new Date()
    };

    // Add user message
    setChatWindows(prev => prev.map(window => 
      window.id === activeWindow.id 
        ? { ...window, messages: [...window.messages, userMessage] }
        : window
    ));

    const messageToSend = inputValue;
    setInputValue('');
    setIsLoading(true);

    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Add typing indicator
    const typingMessage: Message = {
      id: (Date.now() + 1).toString(),
      type: 'assistant',
      content: '',
      timestamp: new Date(),
      isTyping: true
    };

    setChatWindows(prev => prev.map(window => 
      window.id === activeWindow.id 
        ? { ...window, messages: [...window.messages, typingMessage] }
        : window
    ));

    try {
      let aiResponseContent: string;
      
      if (currentModel === 'gemini-pro' && geminiApiKey) {
        aiResponseContent = await callGeminiAPI(messageToSend);
      } else {
        // Simulate other models
        await new Promise(resolve => setTimeout(resolve, 1500 + Math.random() * 1000));
        aiResponseContent = simulateAIResponse(messageToSend, currentModel);
      }

      const aiResponse: Message = {
        id: (Date.now() + 2).toString(),
        type: 'assistant',
        content: aiResponseContent,
        timestamp: new Date()
      };

      setChatWindows(prev => prev.map(window => 
        window.id === activeWindow.id 
          ? { 
              ...window, 
              messages: window.messages.filter(m => !m.isTyping).concat(aiResponse)
            }
          : window
      ));
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        type: 'assistant',
        content: 'Sorry, I encountered an error while processing your request. Please try again! 🤖',
        timestamp: new Date()
      };

      setChatWindows(prev => prev.map(window => 
        window.id === activeWindow.id 
          ? { 
              ...window, 
              messages: window.messages.filter(m => !m.isTyping).concat(errorMessage)
            }
          : window
      ));
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const createNewChat = () => {
    const newChat: ChatWindow = {
      id: Date.now().toString(),
      title: `Chat ${chatWindows.length + 1}`,
      messages: [
        {
          id: Date.now().toString(),
          type: 'assistant',
          content: "Fresh start! 🌟 I'm ready for our new conversation. What shall we explore together?",
          timestamp: new Date()
        }
      ],
      isActive: false,
      position: { 
        x: 100 + (chatWindows.length * 50), 
        y: 150 + (chatWindows.length * 50) 
      },
      size: { width: 800, height: 600 },
      isMinimized: false
    };

    setChatWindows(prev => [...prev, newChat]);
  };

  const setActiveWindow = (id: string) => {
    setChatWindows(prev => prev.map(window => ({
      ...window,
      isActive: window.id === id
    })));
  };

  const closeWindow = (id: string) => {
    setChatWindows(prev => prev.filter(window => window.id !== id));
  };

  const toggleMinimize = (id: string) => {
    setChatWindows(prev => prev.map(window => 
      window.id === id 
        ? { ...window, isMinimized: !window.isMinimized }
        : window
    ));
  };

  const toggleChatInterface = () => {
    setIsChatMinimized(!isChatMinimized);
  };

  const handleAuthSuccess = (userData: { username: string; email: string }) => {
    setIsAuthenticated(true);
    setUser(userData);
    setShowAuthModal(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
  };

  const openAuthModal = (mode: 'login' | 'register') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleEnterApp = () => {
    setShowOpeningPage(false);
  };

  if (showOpeningPage) {
    return <OpeningPage onEnter={handleEnterApp} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Cyberpunk Background */}
      <div className="fixed inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/pngtree-high-tech-ai-design-with-glowing-circuitry-and-data-streams-picture-image_16064011.jpg)',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/70 to-cyan-900/80" />
        
        {/* Animated Grid Overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="grid-background"></div>
        </div>

        {/* Floating Data Streams */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 bg-gradient-to-t from-transparent via-cyan-400 to-transparent opacity-60 animate-data-stream"
              style={{
                left: `${Math.random() * 100}%`,
                height: `${100 + Math.random() * 200}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Circuit Patterns */}
        <div className="absolute inset-0 opacity-30">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                <path d="M10 10h80v80h-80z" fill="none" stroke="url(#circuitGradient)" strokeWidth="0.5"/>
                <circle cx="10" cy="10" r="2" fill="#00ffff" opacity="0.6"/>
                <circle cx="90" cy="90" r="2" fill="#ff00ff" opacity="0.6"/>
                <path d="M10 50h80M50 10v80" stroke="url(#circuitGradient)" strokeWidth="0.3"/>
              </pattern>
              <linearGradient id="circuitGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#00ffff" stopOpacity="0.3"/>
                <stop offset="50%" stopColor="#0080ff" stopOpacity="0.5"/>
                <stop offset="100%" stopColor="#ff00ff" stopOpacity="0.3"/>
              </linearGradient>
            </defs>
            <rect width="100%" height="100%" fill="url(#circuit)"/>
          </svg>
        </div>
      </div>

      {/* Header */}
      <header className="relative z-50 bg-black/30 backdrop-blur-xl border-b border-cyan-500/30">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <AthenaLogo size="md" showText={true} />
            <div className="flex items-center space-x-2">
              <div className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium border border-emerald-500/30">
                {chatWindows.length} Active Chats
              </div>
              <div className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium border border-blue-500/30">
                {currentModel}
              </div>
              <div className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium border border-purple-500/30">
                Gemini Powered
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {!isAuthenticated ? (
              <>
                <button
                  onClick={() => openAuthModal('login')}
                  className="px-4 py-2 text-white hover:text-cyan-400 transition-colors flex items-center space-x-2"
                >
                  <LogIn className="w-4 h-4" />
                  <span>Connexion</span>
                </button>
                
                <button
                  onClick={() => openAuthModal('register')}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-lg hover:from-cyan-700 hover:to-purple-700 transition-all duration-200 flex items-center space-x-2 transform hover:scale-105 border border-cyan-500/30"
                >
                  <UserPlus className="w-4 h-4" />
                  <span>Inscription</span>
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-lg border border-cyan-500/30">
                  <User className="w-4 h-4 text-cyan-400" />
                  <span className="text-white text-sm">{user?.username}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-gray-400 hover:text-white transition-colors"
                >
                  Déconnexion
                </button>
              </div>
            )}

            <button
              onClick={createNewChat}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white rounded-lg hover:from-emerald-700 hover:to-cyan-700 transition-all duration-200 flex items-center space-x-2 border border-emerald-500/30"
            >
              <MessageSquare className="w-4 h-4" />
              <span>New Chat</span>
            </button>
            
            <button
              onClick={() => setShowApiManager(!showApiManager)}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
        onAuthSuccess={handleAuthSuccess}
      />

      {/* API Manager Sidebar */}
      {showApiManager && (
        <ApiKeyManager
          currentModel={currentModel}
          setCurrentModel={setCurrentModel}
          models={models}
          temperature={temperature}
          setTemperature={setTemperature}
          maxTokens={maxTokens}
          setMaxTokens={setMaxTokens}
          systemPrompt={systemPrompt}
          setSystemPrompt={setSystemPrompt}
          onClose={() => setShowApiManager(false)}
        />
      )}

      {/* Chat Windows */}
      {chatWindows.map((window) => (
        <ChatWindow
          key={window.id}
          window={window}
          onClose={() => closeWindow(window.id)}
          onMinimize={() => toggleMinimize(window.id)}
          onActivate={() => setActiveWindow(window.id)}
          currentModel={currentModel}
        />
      ))}

      {/* Main Input Area */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 bg-black/30 backdrop-blur-xl border-t border-cyan-500/30 transition-all duration-300 ${
        isChatMinimized ? 'transform translate-y-full' : 'transform translate-y-0'
      }`}>
        <div className="max-w-4xl mx-auto p-6">
          {/* Quick Actions */}
          <QuickActions 
            prompts={quickPrompts}
            onPromptSelect={(prompt) => setInputValue(prompt)}
          />

          {/* Input Area */}
          <div className="bg-black/40 backdrop-blur-lg rounded-2xl border border-cyan-500/30 shadow-2xl">
            <div className="flex items-end p-4 space-x-4">
              <div className="flex space-x-2">
                <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors">
                  <Paperclip className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors">
                  <Image className="w-5 h-5" />
                </button>
                <button className="p-2 text-gray-400 hover:text-cyan-400 transition-colors">
                  <Code className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 relative">
                <textarea
                  ref={textareaRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask Athena anything... ✨"
                  className="w-full resize-none border-none outline-none text-white placeholder-gray-400 bg-transparent text-lg"
                  rows={1}
                  style={{ minHeight: '24px', maxHeight: '200px' }}
                  disabled={isLoading}
                />
              </div>

              <VoiceControls 
                isRecording={isRecording}
                onToggleRecording={() => setIsRecording(!isRecording)}
              />

              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isLoading}
                className="p-3 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-xl hover:from-cyan-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105 border border-cyan-500/30"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Model Selector */}
            <div className="px-4 pb-4 flex items-center justify-between text-sm">
              <div className="flex items-center space-x-4">
                <select
                  value={currentModel}
                  onChange={(e) => setCurrentModel(e.target.value)}
                  className="bg-white/10 text-white rounded-lg px-3 py-1 border border-cyan-500/30"
                >
                  {models.map(model => (
                    <option key={model.id} value={model.id} className="bg-gray-800">
                      {model.icon} {model.name}
                    </option>
                  ))}
                </select>
                <span className="text-gray-400">Temperature: {temperature}</span>
                <span className="text-cyan-400">🔑 Gemini API Connected</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Zap className="w-4 h-4" />
                <span>Press Enter to send • Shift+Enter for new line</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Minimize/Maximize Button */}
      <button
        onClick={toggleChatInterface}
        className={`fixed bottom-6 right-6 z-50 p-4 bg-gradient-to-r from-cyan-600 to-purple-600 text-white rounded-full shadow-2xl hover:from-cyan-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-110 border border-cyan-500/30 ${
          isChatMinimized ? 'animate-pulse' : ''
        }`}
        title={isChatMinimized ? 'Afficher le chat' : 'Masquer le chat'}
      >
        {isChatMinimized ? (
          <ChevronUp className="w-6 h-6" />
        ) : (
          <ChevronDown className="w-6 h-6" />
        )}
      </button>

      {/* Minimized Chat Indicator */}
      {isChatMinimized && (
        <div className="fixed bottom-20 right-6 z-40 bg-black/40 backdrop-blur-lg rounded-2xl border border-cyan-500/30 shadow-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
            <div>
              <div className="text-white font-semibold text-lg tracking-wide">
                <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent font-bold">
                  ATHENA AI
                </span>
              </div>
              <div className="text-gray-400 text-sm">Chat minimisé • Cliquez pour ouvrir</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;