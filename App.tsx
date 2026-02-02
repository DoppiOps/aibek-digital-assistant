
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Sidebar from './components/Sidebar';
import ChatBubble from './components/ChatBubble';
import DevPanel from './components/DevPanel';
import { Message, ChatSession, AibekConfig } from './types';
import { DEFAULT_SYSTEM_INSTRUCTION, APP_NAME } from './constants';
import { geminiService } from './services/gemini';

const App: React.FC = () => {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string>('');
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showDevPanel, setShowDevPanel] = useState(false);
  const [config, setConfig] = useState<AibekConfig>({
    systemInstruction: DEFAULT_SYSTEM_INSTRUCTION,
    temperature: 0.7,
    model: 'gemini-3-pro-preview'
  });

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [sessions, activeSessionId]);

  const activeSession = sessions.find(s => s.id === activeSessionId);

  const createNewChat = useCallback(() => {
    const newSession: ChatSession = {
      id: uuidv4(),
      title: 'Yangi seans',
      messages: [],
      createdAt: Date.now()
    };
    setSessions(prev => [newSession, ...prev]);
    setActiveSessionId(newSession.id);
  }, []);

  useEffect(() => {
    if (sessions.length === 0) {
      createNewChat();
    }
  }, [sessions.length, createNewChat]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim() || isLoading || !activeSessionId) return;

    const userMessage: Message = {
      id: uuidv4(),
      role: 'user',
      content: input,
      timestamp: Date.now()
    };

    const currentInput = input;
    setInput('');
    setIsLoading(true);

    setSessions(prev => prev.map(s => {
      if (s.id === activeSessionId) {
        const title = s.messages.length === 0 ? currentInput.slice(0, 30) + (currentInput.length > 30 ? '...' : '') : s.title;
        return { ...s, messages: [...s.messages, userMessage], title };
      }
      return s;
    }));

    try {
      const assistantMessageId = uuidv4();
      const assistantMessage: Message = {
        id: assistantMessageId,
        role: 'assistant',
        content: '',
        timestamp: Date.now()
      };

      setSessions(prev => prev.map(s => {
        if (s.id === activeSessionId) {
          return { ...s, messages: [...s.messages, assistantMessage] };
        }
        return s;
      }));

      await geminiService.sendMessageStream(currentInput, config, (fullText) => {
        setSessions(prev => prev.map(s => {
          if (s.id === activeSessionId) {
            return {
              ...s,
              messages: s.messages.map(m => 
                m.id === assistantMessageId ? { ...m, content: fullText } : m
              )
            };
          }
          return s;
        }));
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#f8fafc] overflow-hidden">
      <Sidebar 
        sessions={sessions}
        activeSessionId={activeSessionId}
        onSelectSession={setActiveSessionId}
        onNewChat={createNewChat}
        onToggleDevPanel={() => setShowDevPanel(true)}
      />

      <div className="flex-1 flex flex-col relative h-full">
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 z-10">
          <div className="flex items-center gap-3">
            <h1 className="font-bold text-slate-800 tracking-tight text-lg">{APP_NAME}</h1>
            <div className="h-4 w-[1px] bg-slate-200 hidden sm:block"></div>
            <span className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest hidden sm:flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse"></span>
              Tizim Faol
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setShowDevPanel(true)}
              className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
            >
              <i className="fa-solid fa-sliders"></i>
            </button>
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
              A
            </div>
          </div>
        </header>

        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-4 py-8 md:px-20 lg:px-40 xl:px-60 custom-scrollbar"
        >
          {activeSession?.messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center max-w-md mx-auto">
              <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6 text-indigo-600">
                <i className="fa-solid fa-terminal text-3xl"></i>
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">Xush kelibsiz!</h2>
              <p className="text-slate-500 text-sm">
                Aibek tizimi orqali masalalar yuzasidan konsultatsiya olishingiz mumkin. Savolingizni quyidagi maydonga yozing.
              </p>
            </div>
          ) : (
            activeSession?.messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))
          )}
          {isLoading && !activeSession?.messages[activeSession.messages.length - 1]?.content && (
            <div className="flex items-center gap-2 text-slate-400 text-xs italic ml-12">
               Ma'lumotlar qayta ishlanmoqda...
            </div>
          )}
        </div>

        <div className="p-4 bg-white border-t border-slate-200">
          <form 
            onSubmit={handleSendMessage}
            className="max-w-4xl mx-auto"
          >
            <div className="relative flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-xl p-2 focus-within:ring-2 focus-within:ring-indigo-500 transition-all">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                placeholder="Xabar yozing..."
                className="w-full bg-transparent border-none outline-none resize-none py-2 px-3 text-slate-700 min-h-[40px] max-h-40 text-sm"
                rows={1}
                style={{ height: 'auto' }}
                onInput={(e) => {
                  const target = e.target as HTMLTextAreaElement;
                  target.style.height = 'auto';
                  target.style.height = `${target.scrollHeight}px`;
                }}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className={`p-2.5 rounded-lg transition-all ${
                  input.trim() && !isLoading 
                    ? 'bg-indigo-600 text-white shadow-md' 
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <i className="fa-solid fa-circle-notch fa-spin"></i>
                ) : (
                  <i className="fa-solid fa-arrow-up"></i>
                )}
              </button>
            </div>
            <div className="mt-2 text-center">
              <span className="text-[9px] text-slate-400 font-medium uppercase tracking-tighter">
                &copy; {new Date().getFullYear()} Aibek System - Barcha huquqlar himoyalangan
              </span>
            </div>
          </form>
        </div>
      </div>

      {showDevPanel && (
        <>
          <div className="fixed inset-0 bg-slate-900/10 backdrop-blur-sm z-40" onClick={() => setShowDevPanel(false)} />
          <DevPanel config={config} onChange={setConfig} onClose={() => setShowDevPanel(false)} />
        </>
      )}
    </div>
  );
};

export default App;
