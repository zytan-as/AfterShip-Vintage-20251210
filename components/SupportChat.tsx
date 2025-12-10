import React, { useState, useEffect, useRef } from 'react';
import { Send, MessageCircle, X, HelpCircle, User } from 'lucide-react';

interface SupportChatProps {
  onClose: () => void;
  isOpen: boolean;
}

export const SupportChat: React.FC<SupportChatProps> = ({ onClose, isOpen }) => {
  const [messages, setMessages] = useState<{ sender: 'user' | 'agent', text: string }[]>([
    { sender: 'agent', text: 'Hi! I can help you with Tracking, Returns, or Pricing. What do you need?' }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    
    setMessages(prev => [...prev, { sender: 'user', text: inputValue }]);
    setInputValue('');

    // Simulate response
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        sender: 'agent', 
        text: 'Thanks for asking! Check out the "Pricing.xls" on your desktop for detailed plan info, or visit aftership.com for a live demo.' 
      }]);
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div className="absolute bottom-16 right-6 w-80 h-[400px] bg-[#FFF8F0] border-2 border-[#432818] shadow-[8px_8px_0px_0px_rgba(67,40,24,0.2)] z-[9999] flex flex-col font-mono-retro rounded-lg overflow-hidden">
      {/* Header */}
      <div className="bg-[#432818] text-[#FAEDCD] p-3 flex justify-between items-center cursor-default">
        <div className="flex items-center gap-2">
          <div className="bg-[#D68C5D] text-[#432818] p-1 rounded-full"><HelpCircle size={16} /></div>
          <span className="font-bold text-sm tracking-widest uppercase">Support</span>
        </div>
        <button onClick={onClose} className="hover:text-[#D68C5D] transition-colors">
          <X size={18} strokeWidth={3} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 p-4 overflow-y-auto text-sm space-y-4 bg-[#fcf9f2]">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
             <div className="flex items-center gap-1 mb-1">
                 {msg.sender === 'agent' && <div className="w-4 h-4 bg-[#D68C5D] rounded-full border border-[#432818]"></div>}
                 <div className="text-[10px] text-[#432818]/60 uppercase font-bold">{msg.sender === 'agent' ? 'Bot' : 'You'}</div>
             </div>
            <div 
                className={`
                    max-w-[85%] px-3 py-2 border-2 border-[#432818] text-sm rounded-lg
                    ${msg.sender === 'user' 
                        ? 'bg-[#432818] text-[#FAEDCD] rounded-tr-none' 
                        : 'bg-white text-[#432818] rounded-tl-none shadow-sm'
                    }
                `}
            >
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 border-t-2 border-[#432818] bg-[#FAEDCD] flex gap-2">
        <input 
          type="text" 
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 bg-white border-2 border-[#432818] px-3 py-2 text-sm focus:outline-none focus:bg-[#FFF8F0] rounded-md placeholder-[#432818]/40"
          placeholder="Type here..."
        />
        <button 
          onClick={handleSend}
          className="px-3 bg-[#D68C5D] border-2 border-[#432818] hover:bg-[#432818] hover:text-[#D68C5D] transition-colors flex items-center justify-center rounded-md shadow-[2px_2px_0px_0px_#432818] active:translate-y-[1px] active:shadow-none"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};