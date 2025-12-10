import React, { useState, useEffect } from 'react';
import { WindowState } from '../types';
import { Monitor } from 'lucide-react';

interface TaskbarProps {
  windows: WindowState[];
  activeWindowId: string | null;
  onWindowClick: (id: string) => void;
  onStartClick: () => void;
}

export const Taskbar: React.FC<TaskbarProps> = ({ windows, activeWindowId, onWindowClick, onStartClick }) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-[#FAEDCD] border-t-2 border-[#432818] flex items-center px-2 z-50 shadow-lg">
      <button 
        onClick={onStartClick}
        className="flex items-center gap-2 px-4 py-1 mr-2 font-bold font-mono-retro text-sm border-2 border-[#432818] bg-[#D68C5D] text-[#FFF8F0] hover:bg-[#432818] hover:text-[#D68C5D] transition-colors shadow-[2px_2px_0px_0px_#432818] active:translate-y-[2px] active:shadow-none rounded-md"
      >
        <span className="font-black tracking-wide">START</span>
      </button>

      <div className="w-[2px] h-3/4 bg-[#432818]/20 mx-2 rounded-full"></div>

      <div className="flex-1 flex gap-2 overflow-x-auto px-2 h-full items-center">
        {windows.filter(w => w.isOpen).map((window) => (
          <button
            key={window.id}
            onClick={() => onWindowClick(window.id)}
            className={`
              flex items-center gap-2 px-3 h-9 min-w-[140px] max-w-[200px] truncate
              border-2 font-mono-retro text-xs font-bold transition-all rounded-md
              ${activeWindowId === window.id && !window.isMinimized
                ? 'bg-[#432818] text-[#FAEDCD] border-[#432818] shadow-none translate-y-[1px]' 
                : 'bg-[#FFF8F0] text-[#432818] border-[#432818] shadow-[2px_2px_0px_0px_#432818] hover:bg-white'
              }
            `}
          >
            {window.icon && <div className={`w-4 h-4 ${activeWindowId === window.id ? 'text-[#D68C5D]' : 'text-[#432818]'}`}>{window.icon}</div>}
            <span className="truncate">{window.title}</span>
          </button>
        ))}
      </div>

      <div className="w-[2px] h-3/4 bg-[#432818]/20 mx-2 rounded-full"></div>

      <div className="ml-2 px-4 py-1 bg-[#FFF8F0] border-2 border-[#432818] font-mono-retro text-sm font-bold shadow-[2px_2px_0px_0px_#432818] rounded-md text-[#432818]">
        {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
      </div>
    </div>
  );
};