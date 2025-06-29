import React from 'react';
import { Sparkles } from 'lucide-react';

interface QuickActionsProps {
  prompts: Array<{
    icon: string;
    text: string;
    category: string;
  }>;
  onPromptSelect: (prompt: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ prompts, onPromptSelect }) => {
  // Réduire à seulement 4 prompts les plus populaires
  const topPrompts = prompts.slice(0, 4);

  return (
    <div className="mb-3">
      <div className="flex items-center space-x-2 mb-2">
        <Sparkles className="w-3 h-3 text-blue-400" />
        <span className="text-xs font-medium text-gray-400">Quick Start</span>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        {topPrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onPromptSelect(prompt.text)}
            className="group p-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-lg transition-all duration-200 text-left"
          >
            <div className="flex items-center space-x-2">
              <span className="text-sm group-hover:scale-110 transition-transform">
                {prompt.icon}
              </span>
              <span className="text-xs text-gray-300 group-hover:text-white transition-colors truncate">
                {prompt.text}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;