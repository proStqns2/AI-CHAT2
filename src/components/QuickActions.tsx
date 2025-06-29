import React from 'react';
import { Sparkles, Zap } from 'lucide-react';

interface QuickActionsProps {
  prompts: Array<{
    icon: string;
    text: string;
    category: string;
  }>;
  onPromptSelect: (prompt: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ prompts, onPromptSelect }) => {
  const categories = [...new Set(prompts.map(p => p.category))];

  return (
    <div className="mb-4">
      <div className="flex items-center space-x-2 mb-3">
        <Sparkles className="w-4 h-4 text-blue-400" />
        <span className="text-sm font-medium text-gray-300">Quick Actions</span>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {prompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onPromptSelect(prompt.text)}
            className="group p-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl transition-all duration-200 text-left"
          >
            <div className="flex items-center space-x-2 mb-1">
              <span className="text-lg group-hover:scale-110 transition-transform">
                {prompt.icon}
              </span>
              <span className="text-xs text-blue-400 font-medium">{prompt.category}</span>
            </div>
            <p className="text-sm text-gray-300 group-hover:text-white transition-colors">
              {prompt.text}
            </p>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;