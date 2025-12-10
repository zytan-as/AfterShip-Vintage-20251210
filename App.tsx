import React, { useState, useEffect } from 'react';
import { Package, RotateCcw, Brain, CreditCard, FileText, LayoutGrid, Newspaper, LayoutTemplate } from 'lucide-react';
import { DesktopIcon } from './components/DesktopIcon';
import { RetroWindow } from './components/RetroWindow';
import { Taskbar } from './components/Taskbar';
import { SupportChat } from './components/SupportChat';
import { WindowState, AppId } from './types';
import { CONTENT_TRACKING, CONTENT_RETURNS, CONTENT_EDD, CONTENT_PRICING, CONTENT_README, CONTENT_SOLUTIONS, CONTENT_BLOG } from './constants';

// Public assets are served from the root in Vite
const WALLPAPER_PATH = '/wallpaper.png';

const INITIAL_WINDOWS: WindowState[] = [
  {
    id: AppId.README,
    title: 'README.TXT',
    isOpen: true,
    isMinimized: false,
    isMaximized: false,
    x: 0, 
    y: 0, 
    width: 450,
    height: 480,
    zIndex: 1,
    content: CONTENT_README,
    icon: <FileText size={16} />,
    type: 'system'
  }
];

const APP_CONFIGS = [
  { id: AppId.TRACKING, title: 'Tracking.exe', icon: <Package size={24} />, content: CONTENT_TRACKING, windowIcon: <Package size={16} /> },
  { id: AppId.RETURNS, title: 'Returns.exe', icon: <RotateCcw size={24} />, content: CONTENT_RETURNS, windowIcon: <RotateCcw size={16} /> },
  { id: AppId.EDD, title: 'AI_EDD.exe', icon: <Brain size={24} />, content: CONTENT_EDD, windowIcon: <Brain size={16} /> },
  { id: AppId.PRICING, title: 'Pricing.xls', icon: <CreditCard size={24} />, content: CONTENT_PRICING, windowIcon: <CreditCard size={16} /> },
  { id: AppId.SOLUTIONS, title: 'Solutions.ppt', icon: <LayoutTemplate size={24} />, content: CONTENT_SOLUTIONS, windowIcon: <LayoutTemplate size={16} /> },
  { id: AppId.BLOG, title: 'Netscape.html', icon: <Newspaper size={24} />, content: CONTENT_BLOG, windowIcon: <Newspaper size={16} /> },
  { id: AppId.README, title: 'README.TXT', icon: <FileText size={24} />, content: CONTENT_README, windowIcon: <FileText size={16} /> },
];

// Unified Icon List including Support Chat
const ALL_ICONS = [
  ...APP_CONFIGS,
  { id: 'support_chat', title: 'Support_Chat.exe', icon: <LayoutGrid size={24} />, isSystem: true }
];

export default function App() {
  // Logic to center initial window
  const getCenterPos = (w: number, h: number) => {
    if (typeof window === 'undefined') return { x: 100, y: 100 };
    return {
        x: Math.max(0, (window.innerWidth / 2) - (w / 2)),
        y: Math.max(0, (window.innerHeight / 2) - (h / 2))
    }
  };

  const [windows, setWindows] = useState<WindowState[]>(() => {
     const center = getCenterPos(450, 480);
     return INITIAL_WINDOWS.map(w => ({ ...w, x: center.x, y: center.y }));
  });
  
  const [activeWindowId, setActiveWindowId] = useState<string | null>(AppId.README);
  const [nextZIndex, setNextZIndex] = useState(2);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isNight, setIsNight] = useState(false);
  
  // Icon Positions State
  const [iconPositions, setIconPositions] = useState<Record<string, { x: number, y: number }>>({});

  // Initialize Icon Positions (Column Layout: 4 per column)
  useEffect(() => {
    const initialPositions: Record<string, { x: number, y: number }> = {};
    const startX = 24; // Left padding
    const startY = 24; // Top padding
    const gapY = 100; // Vertical gap between icons
    const gapX = 110; // Horizontal gap between columns
    const iconsPerCol = 4; // Max icons per column as requested

    ALL_ICONS.forEach((icon, index) => {
        const col = Math.floor(index / iconsPerCol);
        const row = index % iconsPerCol;
        initialPositions[icon.id] = {
            x: startX + (col * gapX),
            y: startY + (row * gapY)
        };
    });
    setIconPositions(initialPositions);
  }, []);

  // Time-based background effect
  useEffect(() => {
    const checkTime = () => {
        const hour = new Date().getHours();
        setIsNight(hour >= 18 || hour < 6);
    };
    checkTime();
    const interval = setInterval(checkTime, 60000); 
    return () => clearInterval(interval);
  }, []);

  const openWindow = (appId: AppId) => {
    setWindows((prev) => {
      const existing = prev.find((w) => w.id === appId);
      if (existing) {
        setActiveWindowId(appId);
        return prev.map(w => w.id === appId ? { ...w, isOpen: true, isMinimized: false, zIndex: nextZIndex } : w);
      }
      
      const config = APP_CONFIGS.find(c => c.id === appId);
      if (!config) return prev;

      const width = 600;
      const height = 500;
      const center = getCenterPos(width, height);
      const offset = prev.filter(w => w.isOpen).length * 30;
      
      const newWindow: WindowState = {
        id: appId,
        title: config.title,
        isOpen: true,
        isMinimized: false,
        isMaximized: false,
        x: Math.min(Math.max(0, center.x + offset - 50), window.innerWidth - width), 
        y: Math.min(Math.max(0, center.y + offset - 50), window.innerHeight - height),
        width,
        height,
        zIndex: nextZIndex,
        content: config.content,
        icon: config.windowIcon,
        type: 'browser'
      };
      
      setActiveWindowId(appId);
      return [...prev, newWindow];
    });
    setNextZIndex(prev => prev + 1);
  };

  const closeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isOpen: false } : w));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const minimizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMinimized: true } : w));
    if (activeWindowId === id) setActiveWindowId(null);
  };

  const maximizeWindow = (id: string) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, isMaximized: !w.isMaximized, zIndex: nextZIndex } : w));
    setActiveWindowId(id);
    setNextZIndex(prev => prev + 1);
  };

  const focusWindow = (id: string) => {
    if (activeWindowId === id) return;
    setActiveWindowId(id);
    setWindows(prev => prev.map(w => w.id === id ? { ...w, zIndex: nextZIndex, isMinimized: false } : w));
    setNextZIndex(prev => prev + 1);
  };

  const moveWindow = (id: string, x: number, y: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, x, y } : w));
  };

  const resizeWindow = (id: string, width: number, height: number) => {
    setWindows(prev => prev.map(w => w.id === id ? { ...w, width, height } : w));
  };

  const toggleWindowFromTaskbar = (id: string) => {
    const win = windows.find(w => w.id === id);
    if (win?.isMinimized || activeWindowId !== id) {
        focusWindow(id);
    } else {
        minimizeWindow(id);
    }
  };

  const handleIconMove = (id: string, x: number, y: number) => {
    setIconPositions(prev => ({
        ...prev,
        [id]: { x, y }
    }));
  };

  return (
    <div className="w-screen h-screen overflow-hidden relative select-none font-sans">
      
      {/* --- LAYER 1: DYNAMIC BACKGROUND --- */}
      <div className={`absolute inset-0 z-0 pointer-events-none bg-[#f2e9e4] transition-all duration-[3000ms] ${isNight ? 'night-mode' : 'day-mode'}`}>
          
          {/* Wallpaper: anchored bottom-right. On small screens it spans full width; on md+ it takes half the viewport width and maintains aspect ratio */}
          <div className="absolute bottom-0 right-0 pointer-events-none flex items-end justify-end">
            <img
              src={WALLPAPER_PATH}
              alt="Cozy Logistics World"
              className="w-full md:w-[75vw] h-auto object-contain"
              style={{ maxHeight: '100vh', objectPosition: 'right bottom' }}
              onError={(e) => {
                console.warn('Background image load failed. Checked path: ' + WALLPAPER_PATH);
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* Vaporwave/Retro Geometric Decorations */}
          <div className="absolute inset-0 overflow-hidden mix-blend-multiply pointer-events-none">
              <div className="absolute -top-20 -left-20 w-64 h-64 md:w-96 md:h-96 border border-[#432818] rounded-full border-dashed animate-spin-slow opacity-10"></div>
              <div className="absolute -bottom-32 -right-32 w-[500px] h-[500px] border-2 border-[#D68C5D] rounded-full border-dashed animate-spin-reverse opacity-20"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-b from-[#D68C5D]/20 to-transparent rounded-full blur-3xl opacity-30 -z-10"></div>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-[linear-gradient(to_top,rgba(67,40,24,0.1)_1px,transparent_1px),linear-gradient(to_right,rgba(67,40,24,0.1)_1px,transparent_1px)] bg-[size:40px_40px] [transform:perspective(500px)_rotateX(60deg)] origin-bottom opacity-40"></div>
              <div className="absolute top-20 right-10 md:right-32 w-16 h-16 border-2 border-[#432818] opacity-20 animate-float-slow rotate-45 hidden md:block"></div>
              <div className="absolute bottom-32 left-10 w-0 h-0 border-l-[20px] border-l-transparent border-r-[20px] border-r-transparent border-b-[34px] border-b-[#D68C5D] opacity-30 animate-float-slow" style={{ animationDelay: '1.5s' }}></div>
              <div className="absolute top-1/4 left-8 md:left-1/4 text-[#432818] opacity-30 animate-float-slow text-2xl">+</div>
              <div className="absolute top-1/3 right-8 md:right-1/4 text-[#D68C5D] opacity-50 animate-float-slow text-xl" style={{ animationDelay: '2s' }}>+</div>
          </div>
          
          <div className="bg-noise z-10 opacity-50"></div>
          <div className="absolute inset-0 bg-scanlines opacity-20 z-10"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(67,40,24,0.2)_100%)] z-20"></div>
      </div>

      {/* --- LAYER 2: DESKTOP ICONS (Draggable) --- */}
      <div className="absolute inset-0 z-30 pointer-events-none overflow-hidden">
        {ALL_ICONS.map((app) => {
            const pos = iconPositions[app.id] || { x: -200, y: -200 }; // Hide offscreen until initialized
            return (
                <DesktopIcon
                    key={app.id}
                    id={app.id}
                    label={app.title}
                    icon={app.icon}
                    x={pos.x}
                    y={pos.y}
                    onMove={handleIconMove}
                    onDoubleClick={() => {
                        if (app.id === 'support_chat') {
                            setIsSupportOpen(true);
                        } else {
                            openWindow(app.id as AppId);
                        }
                    }}
                />
            );
        })}
      </div>

      {/* --- LAYER 3: WINDOWS --- */}
      {windows.map((window) => (
        <RetroWindow
          key={window.id}
          windowState={window}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onMaximize={maximizeWindow}
          onFocus={focusWindow}
          onMove={moveWindow}
          onResize={resizeWindow}
        />
      ))}

      {/* --- LAYER 4: WIDGETS --- */}
      <SupportChat 
        isOpen={isSupportOpen} 
        onClose={() => setIsSupportOpen(false)} 
      />

      {/* --- LAYER 5: TASKBAR --- */}
      <Taskbar
        windows={windows}
        activeWindowId={activeWindowId}
        onWindowClick={toggleWindowFromTaskbar}
        onStartClick={() => openWindow(AppId.README)}
      />
    </div>
  );
}