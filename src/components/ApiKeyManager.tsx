import React, { useState } from 'react';
import { 
  X, 
  Key, 
  Settings, 
  Sliders, 
  Brain, 
  Zap, 
  Shield,
  Save,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface ApiKeyManagerProps {
  currentModel: string;
  setCurrentModel: (model: string) => void;
  models: Array<{
    id: string;
    name: string;
    icon: string;
    description: string;
  }>;
  temperature: number;
  setTemperature: (temp: number) => void;
  maxTokens: number;
  setMaxTokens: (tokens: number) => void;
  systemPrompt: string;
  setSystemPrompt: (prompt: string) => void;
  onClose: () => void;
}

const ApiKeyManager: React.FC<ApiKeyManagerProps> = ({
  currentModel,
  setCurrentModel,
  models,
  temperature,
  setTemperature,
  maxTokens,
  setMaxTokens,
  systemPrompt,
  setSystemPrompt,
  onClose
}) => {
  const [apiKeys, setApiKeys] = useState({
    openai: '',
    anthropic: '',
    xai: '',
    qwen: ''
  });
  const [showKeys, setShowKeys] = useState({
    openai: false,
    anthropic: false,
    xai: false,
    qwen: false
  });
  const [activeTab, setActiveTab] = useState('models');

  const handleApiKeyChange = (provider: string, value: string) => {
    setApiKeys(prev => ({ ...prev, [provider]: value }));
  };

  const toggleShowKey = (provider: string) => {
    setShowKeys(prev => ({ ...prev, [provider]: !prev[provider as keyof typeof prev] }));
  };

  const tabs = [
    { id: 'models', label: 'Models', icon: <Brain className="w-4 h-4" /> },
    { id: 'keys', label: 'API Keys', icon: <Key className="w-4 h-4" /> },
    { id: 'settings', label: 'Settings', icon: <Settings className="w-4 h-4" /> }
  ];

  const apiProviders = [
    { id: 'openai', name: 'OpenAI', description: 'GPT-4, GPT-3.5 Turbo', status: 'connected' },
    { id: 'anthropic', name: 'Anthropic', description: 'Claude 3 Opus, Sonnet', status: 'disconnected' },
    { id: 'xai', name: 'xAI', description: 'Grok Beta', status: 'connected' },
    { id: 'qwen', name: 'Qwen', description: 'Qwen 2 72B', status: 'disconnected' }
  ];

  return (
    <div className="fixed right-0 top-0 h-full w-96 bg-black/40 backdrop-blur-xl border-l border-white/20 shadow-2xl z-50">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-white/20">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">AI Configuration</h2>
            <p className="text-sm text-gray-400">Manage models and settings</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/20">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600/20 text-blue-400 border-b-2 border-blue-400'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab.icon}
            <span className="text-sm font-medium">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === 'models' && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white mb-4">Available Models</h3>
            {models.map(model => (
              <div
                key={model.id}
                className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                  currentModel === model.id
                    ? 'border-blue-500 bg-blue-500/10'
                    : 'border-white/20 bg-white/5 hover:border-white/30'
                }`}
                onClick={() => setCurrentModel(model.id)}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{model.icon}</span>
                  <div className="flex-1">
                    <h4 className="text-white font-medium">{model.name}</h4>
                    <p className="text-sm text-gray-400">{model.description}</p>
                  </div>
                  {currentModel === model.id && (
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'keys' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">API Keys</h3>
            {apiProviders.map(provider => (
              <div key={provider.id} className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      provider.status === 'connected' ? 'bg-green-400' : 'bg-red-400'
                    }`}></div>
                    <div>
                      <h4 className="text-white font-medium">{provider.name}</h4>
                      <p className="text-sm text-gray-400">{provider.description}</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    provider.status === 'connected'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {provider.status}
                  </div>
                </div>
                
                <div className="relative">
                  <input
                    type={showKeys[provider.id as keyof typeof showKeys] ? 'text' : 'password'}
                    value={apiKeys[provider.id as keyof typeof apiKeys]}
                    onChange={(e) => handleApiKeyChange(provider.id, e.target.value)}
                    placeholder={`Enter ${provider.name} API key`}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none"
                  />
                  <button
                    onClick={() => toggleShowKey(provider.id)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showKeys[provider.id as keyof typeof showKeys] ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
            
            <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 flex items-center justify-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Save API Keys</span>
            </button>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-white mb-4">Model Settings</h3>
            
            {/* Temperature */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-white font-medium">Temperature</label>
                <span className="text-blue-400 font-mono">{temperature}</span>
              </div>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={temperature}
                onChange={(e) => setTemperature(parseFloat(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
              <p className="text-sm text-gray-400">Controls randomness in responses</p>
            </div>

            {/* Max Tokens */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-white font-medium">Max Tokens</label>
                <span className="text-blue-400 font-mono">{maxTokens}</span>
              </div>
              <input
                type="range"
                min="256"
                max="4096"
                step="256"
                value={maxTokens}
                onChange={(e) => setMaxTokens(parseInt(e.target.value))}
                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer slider"
              />
              <p className="text-sm text-gray-400">Maximum response length</p>
            </div>

            {/* System Prompt */}
            <div className="space-y-3">
              <label className="text-white font-medium">System Prompt</label>
              <textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-400 focus:outline-none resize-none"
                placeholder="Define the AI's personality and behavior..."
              />
              <p className="text-sm text-gray-400">Instructions for the AI's behavior</p>
            </div>

            <button className="w-full py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg hover:from-emerald-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2">
              <Save className="w-4 h-4" />
              <span>Save Settings</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiKeyManager;