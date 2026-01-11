import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, X, Cpu, ShieldCheck } from 'lucide-react';
import { createHackerChat, sendMessageToGemini } from '../services/geminiService';
import { ChatMessage } from '../types';
import { Chat } from '@google/genai';

const AiMentor: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Привет, неон. Я Zero. Нужна помощь с выбором курса или совет по безопасности?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Init chat only once
    const session = createHackerChat();
    setChatSession(session);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || !chatSession) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const reply = await sendMessageToGemini(chatSession, userMsg);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', text: reply }]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSend();
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-full bg-green-600 hover:bg-green-500 text-black shadow-[0_0_20px_rgba(34,197,94,0.6)] transition-all hover:scale-110 active:scale-95 group"
      >
        <Bot size={32} className="group-hover:animate-bounce" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-black"></span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] flex flex-col bg-black/90 backdrop-blur-md border border-green-500/50 rounded-xl shadow-[0_0_50px_rgba(34,197,94,0.2)] overflow-hidden font-mono">
        {/* Header */}
      <div className="flex items-center justify-between p-4 bg-green-900/20 border-b border-green-500/30">
        <div className="flex items-center gap-3">
            <div className="relative">
                <div className="w-10 h-10 rounded bg-black border border-green-500 flex items-center justify-center overflow-hidden">
                    <Cpu size={24} className="text-green-500 animate-pulse" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border border-black"></div>
            </div>
            <div>
                <h3 className="text-green-400 font-bold uppercase tracking-wider">Zero AI</h3>
                <p className="text-[10px] text-green-600/80 uppercase">Ethical Mentor v3.0</p>
            </div>
        </div>
        <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
            <X size={20} />
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-green-900 scrollbar-track-transparent">
        {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-3 rounded-lg text-sm border ${
                    msg.role === 'user' 
                    ? 'bg-slate-800 border-slate-700 text-slate-200 rounded-tr-none' 
                    : 'bg-green-900/10 border-green-500/30 text-green-100 rounded-tl-none'
                }`}>
                    {msg.text}
                </div>
            </div>
        ))}
        {isTyping && (
             <div className="flex justify-start">
                <div className="bg-green-900/10 border border-green-500/30 text-green-500 p-3 rounded-lg rounded-tl-none text-xs flex items-center gap-2">
                    <ShieldCheck size={14} className="animate-spin" />
                    <span>ZERO думает...</span>
                </div>
             </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-3 bg-black border-t border-green-500/30 flex gap-2">
        <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Спроси о взломе..."
            className="flex-1 bg-slate-900/50 border border-slate-700 focus:border-green-500 rounded px-3 py-2 text-sm text-green-500 placeholder-green-800/50 focus:outline-none focus:ring-1 focus:ring-green-500/50 transition-all"
        />
        <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-2 bg-green-600 hover:bg-green-500 text-black rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
            <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default AiMentor;