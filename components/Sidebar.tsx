
import React from 'react';
import { ChatSession } from '../types';

interface SidebarProps {
  sessions: ChatSession[];
  activeSessionId: string;
  onSelectSession: (id: string) => void;
  onNewChat: () => void;
  onToggleDevPanel: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ sessions, activeSessionId, onSelectSession, onNewChat, onToggleDevPanel }) => {
  return (
    <div className="w-80 h-full bg-white border-r border-slate-200 flex flex-col hidden md:flex">
      <div className="p-4 border-b border-slate-100">
        <button 
          onClick={onNewChat}
          className="w-full bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold"
        >
          <i className="fa-solid fa-plus"></i>
          New Chat
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-2">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider px-3 mb-2 mt-2">Recent Chats</h3>
        {sessions.length === 0 ? (
          <div className="px-3 py-4 text-sm text-slate-400 text-center italic">
            No history yet
          </div>
        ) : (
          sessions.map(session => (
            <button
              key={session.id}
              onClick={() => onSelectSession(session.id)}
              className={`w-full text-left px-3 py-3 rounded-lg mb-1 transition-all flex items-center gap-3 ${
                activeSessionId === session.id 
                  ? 'bg-blue-500 text-white shadow-md' 
                  : 'hover:bg-slate-50 text-slate-600'
              }`}
            >
              <i className={`fa-regular ${activeSessionId === session.id ? 'fa-message' : 'fa-comment'} opacity-70`}></i>
              <span className="truncate flex-1 text-sm font-medium">{session.title}</span>
            </button>
          ))
        )}
      </div>

      <div className="p-4 border-t border-slate-100">
        <button 
          onClick={onToggleDevPanel}
          className="w-full flex items-center gap-3 px-3 py-3 rounded-lg hover:bg-slate-50 transition-colors text-slate-600"
        >
          <i className="fa-solid fa-code text-blue-500"></i>
          <span className="text-sm font-semibold">Dev Panel</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
