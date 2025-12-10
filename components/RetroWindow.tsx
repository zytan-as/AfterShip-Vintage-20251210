import React, { useState, useEffect, useRef } from 'react';
import { X, Minus, Square, Maximize2, Minimize2 } from 'lucide-react';
import { WindowState } from '../types';

interface RetroWindowProps {
  windowState: WindowState;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onMaximize: (id: string) => void;
  onFocus: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  onResize: (id: string, width: number, height: number) => void;
}

export const RetroWindow: React.FC<RetroWindowProps> = ({
  windowState,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  onResize,
}) => {
  const { id, title, x, y, width, height, zIndex, content, isMinimized, isMaximized, isOpen } = windowState;
  const [isDragging, setIsDragging] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const windowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging && !isMaximized) {
        onMove(id, e.clientX - dragOffset.x, e.clientY - dragOffset.y);
      }
      if (isResizing && !isMaximized) {
        const newWidth = Math.max(320, e.clientX - x);
        const newHeight = Math.max(200, e.clientY - y);
        onResize(id, newWidth, newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setIsResizing(false);
    };

    if (isDragging || isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, isResizing, dragOffset, id, onMove, onResize, x, y, isMaximized]);

  const handleMouseDown = (e: React.MouseEvent) => {
    onFocus(id);
    // Double click on title bar to maximize
    if (e.detail === 2 && (e.target as HTMLElement).closest('.window-title-bar')) {
       onMaximize(id);
       return;
    }

    if (e.target === e.currentTarget || (e.target as HTMLElement).closest('.window-title-bar')) {
      if (!isMaximized) {
        setIsDragging(true);
        setDragOffset({
          x: e.clientX - x,
          y: e.clientY - y,
        });
      }
    }
  };

  const handleResizeStart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isMaximized) {
      setIsResizing(true);
      onFocus(id);
    }
  };

  if (!isOpen || isMinimized) return null;

  // Maximize styles override
  const style = isMaximized 
    ? { top: 0, left: 0, width: '100%', height: 'calc(100% - 48px)', transform: 'none', zIndex } 
    : { transform: `translate(${x}px, ${y}px)`, width, height, zIndex };

  return (
    <div
      ref={windowRef}
      style={style as any}
      className={`absolute flex flex-col bg-[#FFF8F0] border-2 border-[#432818] shadow-[8px_8px_0px_0px_rgba(67,40,24,0.2)] select-none transition-all duration-75 rounded-md overflow-hidden ${isMaximized ? 'rounded-none border-0 border-b-2' : ''}`}
      onMouseDown={() => onFocus(id)}
    >
      {/* Title Bar */}
      <div
        className="window-title-bar flex items-center justify-between px-3 py-2 border-b-2 border-[#432818] cursor-move h-12 bg-[#FAEDCD] transition-colors hover:bg-[#fdf3db]"
        onMouseDown={handleMouseDown}
      >
        <div className="flex items-center gap-2 pl-1">
           {windowState.icon && <div className="text-[#432818]">{windowState.icon}</div>}
          <span className="font-serif-retro text-xl italic tracking-wide text-[#432818]">{title}</span>
        </div>
        <div className="flex gap-2 items-center">
          <button
            onClick={(e) => { e.stopPropagation(); onMinimize(id); }}
            className="w-7 h-7 flex items-center justify-center border-2 border-transparent hover:border-[#432818] hover:bg-[#FFF8F0] transition-all rounded-full"
          >
            <Minus size={16} strokeWidth={2.5} className="text-[#432818]" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onMaximize(id); }}
            className="w-7 h-7 flex items-center justify-center border-2 border-transparent hover:border-[#432818] hover:bg-[#FFF8F0] transition-all rounded-full"
          >
            {isMaximized ? <Minimize2 size={14} strokeWidth={2.5} className="text-[#432818]" /> : <Square size={14} strokeWidth={2.5} className="text-[#432818]" />}
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onClose(id); }}
            className="w-7 h-7 flex items-center justify-center bg-[#D68C5D] border-2 border-[#432818] hover:bg-[#bc4749] hover:text-white transition-colors shadow-[2px_2px_0px_0px_#432818] active:translate-y-[1px] active:shadow-none rounded-full"
          >
            <X size={16} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative bg-[#FFF8F0]">
         <div className="absolute inset-0 overflow-auto p-0 font-mono-retro text-sm text-[#432818]">
             {content}
         </div>
      </div>

      {/* Status Bar / Resizer */}
      <div className="h-8 bg-[#FAEDCD] border-t-2 border-[#432818] flex items-center justify-between px-3 text-xs font-mono-retro text-[#432818]/70">
        <span className="uppercase tracking-widest font-bold">{width}x{height}</span>
        {!isMaximized && (
          <div 
            className="w-4 h-4 cursor-nwse-resize flex items-end justify-end opacity-70 hover:opacity-100"
            onMouseDown={handleResizeStart}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M10 0L10 10L0 10" stroke="#432818" strokeWidth="2"/>
              <path d="M7 3L7 10L3 10" stroke="#432818" strokeWidth="1"/>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};