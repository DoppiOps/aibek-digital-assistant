
import React from 'react';
import { Message } from '../types';

interface ChatBubbleProps {
  message: Message;
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex w-full mb-6 ${isUser ? 'justify-end' : 'justify-start animate-fade-in'}`}>
      {!isUser && (
        <div className="flex-shrink-0 mr-3 self-start mt-1">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center text-white shadow-lg">
            <i className="fa-solid fa-user-tie text-sm"></i>
          </div>
        </div>
      )}
      
      <div className="flex flex-col max-w-[85%] md:max-w-[75%]">
        {!isUser && (
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider ml-1 mb-1 flex items-center gap-1">
            Konsultant
          </span>
        )}
        
        <div className={`px-4 py-3 rounded-2xl shadow-sm relative ${
          isUser 
            ? 'bg-indigo-600 text-white rounded-br-none' 
            : 'bg-white text-slate-800 border border-slate-200 rounded-bl-none'
        }`}>
          <div className="whitespace-pre-wrap break-words text-sm md:text-base leading-relaxed">
            {message.content}
          </div>
          <div className={`text-[10px] mt-1.5 ${isUser ? 'text-indigo-100' : 'text-slate-400'} text-right font-medium`}>
            {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </div>
        </div>
      </div>

      {isUser && (
        <div className="flex-shrink-0 ml-3 self-start mt-1">
          <div className="w-9 h-9 rounded-xl bg-slate-200 flex items-center justify-center text-slate-500 shadow-sm">
            <i className="fa-solid fa-user text-sm"></i>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBubble;
