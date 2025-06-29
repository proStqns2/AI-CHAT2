import React from 'react';
import { X, Minimize2, Maximize2, MoreHorizontal } from 'lucide-react';

interface TaskWindowProps {
  title: string;
  content: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  isActive?: boolean;
  onClose?: () => void;
}

const TaskWindow: React.FC<TaskWindowProps> = ({ 
  title, 
  content, 
  position, 
  size, 
  isActive = false,
  onClose 
}) => {
  return (
    <div 
      className={`absolute bg-white rounded-lg shadow-xl border-2 transition-all duration-200 ${
        isActive ? 'border-blue-400 shadow-blue-100' : 'border-gray-200'
      }`}
      style={{
        left: position.x,
        top: position.y,
        width: size.width,
        height: size.height,
        zIndex: isActive ? 10 : 5
      }}
    >
      {/* Window Header */}
      <div className={`flex items-center justify-between px-4 py-2 border-b rounded-t-lg ${
        isActive ? 'bg-blue-50 border-blue-200' : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
          <span className="text-sm font-medium text-gray-700">{title}</span>
        </div>
        
        <div className="flex items-center space-x-1">
          <button className="p-1 hover:bg-gray-200 rounded">
            <Minimize2 className="w-3 h-3 text-gray-500" />
          </button>
          <button className="p-1 hover:bg-gray-200 rounded">
            <Maximize2 className="w-3 h-3 text-gray-500" />
          </button>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-red-100 rounded"
          >
            <X className="w-3 h-3 text-gray-500 hover:text-red-500" />
          </button>
        </div>
      </div>
      
      {/* Window Content */}
      <div className="p-4 text-sm text-gray-600 overflow-hidden">
        {content}
      </div>
    </div>
  );
};

export default TaskWindow;