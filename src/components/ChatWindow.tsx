import React, { useRef, useEffect } from 'react';
import { 
  X, 
  Minimize2, 
  Maximize2, 
  Copy, 
  ThumbsUp, 
  ThumbsDown, 
  RotateCcw,
  Volume2,
  Share,
  MoreHorizontal,
  Sparkles,
  Zap
} from 'lucide-react';

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  isTyping?: boolean;
  reactions?: string[];
  attachments?: any[];
}

interface ChatWindowProps {
  window: {
    id: string;
    title: string;
    messages: Message[];
    isActive: boolean;
    position: { x: number; y: number };
    size: { width: number; height: number };
    isMinimized: boolean;
  };
  onClose: () => void;
  onMinimize: () => void;
  onActivate: () => void;
  currentModel: string;
}

const ChatWindow: React.FC<ChatWindowProps> = ({ 
  window, 
  onClose, 
  onMinimize, 
  onActivate,
  currentModel 
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [window.messages]);

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  const getModelIcon = (model: string) => {
    const icons: { [key: string]: string } = {
      'grok-beta': '🚀',
      'qwen-2-72b': '🧠',
      'claude-3-opus': '✨',
      'gpt-4-turbo': '⚡'
    };
    return icons[model] || '🤖';
  };

  if (window.isMinimized) {
    return (
      <div 
        className="fixed bottom-20 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 shadow-xl cursor-pointer hover:bg-white/20 transition-all duration-200"
        style={{ left: window.position.x, zIndex: window.isActive ? 30 : 20 }}
        onClick={onMinimize}
      >
        <div className="flex items-center space-x-3 px-4 py-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <span className="text-white text-sm font-medium">{window.title}</span>
          <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className={`fixed bg-black/40 backdrop-blur-xl rounded-2xl border-2 shadow-2xl transition-all duration-300 ${
        window.isActive 
          ? 'border-blue-500/50 shadow-blue-500/20' 
          : 'border-white/20 hover:border-white/30'
      }`}
      style={{
        left: window.position.x,
        top: window.position.y,
        width: window.size.width,
        height: window.size.height,
        zIndex: window.isActive ? 30 : 20
      }}
      onClick={onActivate}
    >
      {/* Window Header */}
      <div className={`flex items-center justify-between px-6 py-4 border-b rounded-t-2xl ${
        window.isActive 
          ? 'bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-white/20' 
          : 'bg-white/5 border-white/10'
      }`}>
        <div className="flex items-center space-x-3">
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 cursor-pointer transition-colors" onClick={onClose}></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 cursor-pointer transition-colors" onClick={onMinimize}></div>
            <div className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 cursor-pointer transition-colors"></div>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-white font-semibold">{window.title}</span>
            <div className="flex items-center space-x-1 px-2 py-1 bg-white/10 rounded-full">
              <span className="text-xs">{getModelIcon(currentModel)}</span>
              <span className="text-xs text-gray-300">{currentModel}</span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <RotateCcw className="w-4 h-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6" style={{ height: 'calc(100% - 80px)' }}>
        {window.messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[80%] ${message.type === 'user' ? 'order-2' : 'order-1'}`}>
              {/* Avatar */}
              <div className={`flex items-center space-x-3 mb-2 ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                    : 'bg-gradient-to-r from-emerald-500 to-blue-500'
                }`}>
                  {message.type === 'user' ? (
                    <span className="text-white text-sm font-bold">U</span>
                  ) : (
                    <Sparkles className="w-4 h-4 text-white" />
                  )}
                </div>
                <div className={`text-xs text-gray-400 ${message.type === 'user' ? 'text-right' : ''}`}>
                  {message.type === 'user' ? 'You' : 'Athena AI'}
                  <span className="ml-2">{message.timestamp.toLocaleTimeString()}</span>
                </div>
              </div>

              {/* Message Content */}
              <div className={`p-4 rounded-2xl ${
                message.type === 'user'
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                  : 'bg-white/10 backdrop-blur-lg text-white border border-white/20'
              }`}>
                {message.isTyping ? (
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-emerald-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                    <span className="text-gray-300 text-sm">Athena is thinking...</span>
                  </div>
                ) : (
                  <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                )}
              </div>

              {/* Message Actions */}
              {message.type === 'assistant' && !message.isTyping && (
                <div className="flex items-center space-x-2 mt-2">
                  <button 
                    onClick={() => copyToClipboard(message.content)}
                    className="p-1 text-gray-400 hover:text-white transition-colors"
                    title="Copy"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-green-400 transition-colors" title="Good response">
                    <ThumbsUp className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-red-400 transition-colors" title="Poor response">
                    <ThumbsDown className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-blue-400 transition-colors" title="Read aloud">
                    <Volume2 className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-400 hover:text-purple-400 transition-colors" title="Share">
                    <Share className="w-4 h-4" />
                  </button>
                  
                  {/* Reactions */}
                  {message.reactions && (
                    <div className="flex items-center space-x-1 ml-2">
                      {message.reactions.map((reaction, index) => (
                        <span key={index} className="text-sm hover:scale-110 transition-transform cursor-pointer">
                          {reaction}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ChatWindow;