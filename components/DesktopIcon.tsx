import React, { useState, useEffect, useRef } from 'react';

interface DesktopIconProps {
  id: string;
  label: string;
  icon: React.ReactNode;
  x: number;
  y: number;
  onMove: (id: string, x: number, y: number) => void;
  onDoubleClick: () => void;
}

export const DesktopIcon: React.FC<DesktopIconProps> = ({ id, label, icon, x, y, onMove, onDoubleClick }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialPos, setInitialPos] = useState({ x: 0, y: 0 });
  const [hasMoved, setHasMoved] = useState(false);
  
  const iconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        const dx = e.clientX - dragStart.x;
        const dy = e.clientY - dragStart.y;
        
        // Threshold to differentiate click vs drag
        if (Math.abs(dx) > 2 || Math.abs(dy) > 2) {
            setHasMoved(true);
        }

        onMove(id, initialPos.x + dx, initialPos.y + dy);
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, initialPos, id, onMove]);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsDragging(true);
    setHasMoved(false);
    setDragStart({ x: e.clientX, y: e.clientY });
    setInitialPos({ x, y });
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
     e.stopPropagation();
     // Only trigger if we haven't dragged significantly
     if (!hasMoved) {
         onDoubleClick();
     }
  };

  return (
    <div 
      ref={iconRef}
      className="absolute flex flex-col items-center w-28 p-2 cursor-pointer hover:bg-[#432818]/5 border border-transparent hover:border-[#432818]/20 hover:border-dashed group transition-colors rounded-lg pointer-events-auto"
      style={{ left: x, top: y }}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      <div className="w-14 h-14 mb-2 flex items-center justify-center text-[#D4A373] bg-[#FFF8F0] border-2 border-[#432818] shadow-[4px_4px_0px_0px_#432818] group-hover:translate-y-[1px] group-hover:shadow-[2px_2px_0px_0px_#432818] transition-all rounded-md">
        {icon}
      </div>
      <span className="text-[#432818] font-bold text-xs font-mono-retro text-center bg-[#FFF8F0]/80 backdrop-blur-sm px-2 py-1 border border-transparent group-hover:border-[#432818] rounded-full line-clamp-2 select-none shadow-sm">
        {label}
      </span>
    </div>
  );
};