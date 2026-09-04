/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { MessageSquare, X, Send, Sparkles, Loader2, Bot, User, Heart, Sun, Moon } from 'lucide-react';

export default function AIChatAssistant() {
  const {
    chatMessages,
    isChatOpen,
    setIsChatOpen,
    sendChatMessage,
    isChatLoading,
    setRoute,
    setActiveProductId,
    theme,
    toggleTheme,
    wishlist
  } = useApp();

  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isChatLoading) return;
    const msg = input;
    setInput('');
    sendChatMessage(msg);
  };

  const handleQuickPrompt = (prompt: string) => {
    if (isChatLoading) return;
    sendChatMessage(prompt);
  };

  const quickPrompts = [
    'Recommend a dry skin routine',
    'What does Vitamin C do?',
    'Solve acne & large pores',
    'Where is my order?'
  ];

  return (
    <div id="lubbycare-ai-concierge" className="fixed bottom-6 right-6 z-40">
      {/* Floating Chat Bubble Button */}
      {!isChatOpen && (
        <div className="relative">
          {/* Main Chat Button */}
          <button
            onClick={() => setIsChatOpen(true)}
            className="bg-brand-green dark:bg-brand-gold hover:bg-brand-green-hover dark:hover:bg-brand-gold/90 text-white dark:text-stone-950 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center cursor-pointer border border-black/5 dark:border-white/5 group relative z-10"
            aria-label="Open Skincare AI Assistant"
          >
            <MessageSquare className="w-6 h-6" />
            <span className="absolute -top-1.5 -right-1.5 bg-brand-gold text-stone-950 text-[9px] font-bold font-sans tracking-widest px-2 py-0.5 rounded-full shadow-lg border border-white dark:border-stone-900 animate-bounce flex items-center gap-1">
              <Sparkles className="w-2.5 h-2.5" /> AI
            </span>
            <span className="absolute right-full mr-3 bg-stone-900/90 text-stone-100 text-[10px] tracking-widest font-sans font-semibold py-1.5 px-3.5 rounded-xl shadow-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none hidden sm:block">
              SKINCARE CONCIERGE
            </span>
          </button>

          {/* Theme Toggle Button - Bottom left of the screen (visible only on mobile and tablet, opposite the chatbot) */}
          <button
            onClick={toggleTheme}
            className="lg:hidden bg-brand-green dark:bg-brand-gold hover:bg-brand-green-hover dark:hover:bg-brand-gold/90 text-white dark:text-stone-950 p-3 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 flex items-center justify-center cursor-pointer border border-black/5 dark:border-white/5 fixed bottom-6 left-6 z-40 animate-fadeIn"
            aria-label="Toggle Theme"
          >
            {theme === 'light' ? <Moon className="w-4.5 h-4.5" /> : <Sun className="w-4.5 h-4.5" />}
          </button>
        </div>
      )}

      {/* Main Chat Drawer/Window */}
      {isChatOpen && (
        <div className="glass-card w-[92vw] sm:w-[400px] h-[550px] rounded-2xl shadow-2xl border border-black/5 dark:border-white/5 flex flex-col overflow-hidden animate-slideUp">
          
          {/* Header */}
          <div className="bg-brand-green text-white dark:bg-stone-900 p-4 flex items-center justify-between border-b border-black/5 dark:border-white/5">
            <div className="flex items-center gap-2.5">
              <div className="p-2 bg-white/10 dark:bg-white/5 rounded-xl text-brand-gold relative">
                <Bot className="w-5 h-5" />
                <span className="absolute bottom-0.5 right-0.5 w-2 h-2 bg-emerald-500 rounded-full border border-white dark:border-stone-900" />
              </div>
              <div>
                <h3 className="font-serif text-sm tracking-wider font-semibold">SKIN CONCIERGE AI</h3>
                <span className="text-[9px] font-sans text-stone-300 dark:text-stone-400 tracking-widest uppercase block mt-0.5">Dermatology Intelligence</span>
              </div>
            </div>
            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1 text-stone-300 dark:text-stone-400 hover:text-white cursor-pointer transition-colors"
              aria-label="Close Chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Stream */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-stone-200 dark:scrollbar-thumb-stone-800">
            {chatMessages.map(msg => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
              >
                {/* Avatar Icon */}
                <div className={`p-1.5 rounded-lg flex items-center justify-center flex-shrink-0 w-8 h-8 ${
                  msg.sender === 'user'
                    ? 'bg-brand-gold text-stone-950 font-bold'
                    : 'bg-brand-green/10 text-brand-green dark:text-brand-gold border border-black/5 dark:border-white/5'
                }`}>
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>

                {/* Message Bubble */}
                <div className="flex flex-col max-w-[75%] space-y-1">
                  <div className={`rounded-2xl p-3 text-xs leading-relaxed font-sans ${
                    msg.sender === 'user'
                      ? 'bg-brand-green text-white dark:bg-brand-gold dark:text-stone-950 rounded-tr-none'
                      : 'glass-card text-stone-800 dark:text-stone-200 rounded-tl-none border border-black/5 dark:border-white/5 shadow-xs'
                  }`}>
                    {/* Render basic bold formatting in responses */}
                    {msg.text.split('**').map((part, index) =>
                      index % 2 === 1 ? <strong key={index} className="font-bold text-brand-green dark:text-brand-gold">{part}</strong> : part
                    )}
                  </div>
                  <span className={`text-[9px] font-mono text-stone-400 dark:text-stone-500 ${
                    msg.sender === 'user' ? 'text-right' : 'text-left'
                  }`}>
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            ))}

            {/* Typing Loader */}
            {isChatLoading && (
              <div className="flex gap-2.5 flex-row">
                <div className="p-1.5 rounded-lg bg-brand-green/10 text-brand-green dark:text-brand-gold w-8 h-8 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="glass-card border border-black/5 dark:border-white/5 rounded-2xl p-3 text-xs text-stone-400 shadow-xs flex items-center gap-2 rounded-tl-none">
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-gold" />
                  <span className="font-light">Analyzing formula matrices...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick suggestions bubbles */}
          {chatMessages.length <= 2 && (
            <div className="p-3 bg-stone-100/50 dark:bg-stone-900/40 border-t border-black/5 dark:border-white/5">
              <span className="text-[9px] font-mono tracking-widest text-stone-400 dark:text-stone-500 block mb-2 font-bold uppercase">
                SUGGESTED RITUALS
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {quickPrompts.map(prompt => (
                  <button
                    key={prompt}
                    onClick={() => handleQuickPrompt(prompt)}
                    disabled={isChatLoading}
                    className="text-left text-[10px] font-sans text-stone-600 dark:text-stone-300 bg-white/70 dark:bg-[#1a1a1a]/70 border border-black/5 dark:border-white/5 px-2.5 py-1.5 rounded-xl hover:border-brand-green dark:hover:border-brand-gold transition-colors truncate cursor-pointer disabled:opacity-50"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form input */}
          <form
            onSubmit={handleSubmit}
            className="p-3 bg-white/80 dark:bg-[#121212]/80 border-t border-black/5 dark:border-white/5 flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask about ingredients, acne, routines..."
              className="flex-1 bg-stone-150/50 dark:bg-[#1c1c1c]/50 text-xs font-sans p-3 rounded-full text-stone-800 dark:text-stone-100 placeholder-stone-400 outline-none border border-black/5 dark:border-white/5 focus:border-brand-green/20 dark:focus:border-brand-gold/20 transition-all"
              value={input}
              onChange={e => setInput(e.target.value)}
              disabled={isChatLoading}
            />
            <button
              type="submit"
              disabled={!input.trim() || isChatLoading}
              className="bg-brand-green dark:bg-brand-gold text-white dark:text-stone-950 p-3 rounded-full hover:bg-brand-green-hover transition-colors shadow-md disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center cursor-pointer"
              aria-label="Send Message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
