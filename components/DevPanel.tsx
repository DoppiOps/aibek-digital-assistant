
import React from 'react';
import { AibekConfig } from '../types';

interface DevPanelProps {
  config: AibekConfig;
  onChange: (config: AibekConfig) => void;
  onClose: () => void;
}

const DevPanel: React.FC<DevPanelProps> = ({ config, onChange, onClose }) => {
  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col border-l border-slate-200 transform transition-transform duration-300">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
        <div className="flex items-center gap-2">
          <i className="fa-solid fa-gears text-indigo-600"></i>
          <h2 className="font-bold text-slate-800">Tizim Sozlamalari</h2>
        </div>
        <button onClick={onClose} className="p-2 hover:bg-slate-200 rounded-full transition-colors">
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Ishlash Dvigateli (Core)</label>
          <select 
            value={config.model}
            onChange={(e) => onChange({ ...config, model: e.target.value })}
            className="w-full p-2.5 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="gemini-3-pro-preview">Engine V3 Pro (Optimallashtirilgan)</option>
            <option value="gemini-3-flash-preview">Engine V3 Standard (Tezkor)</option>
            <option value="gemini-2.5-flash-lite-latest">Engine V2 Lite</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Tizim Algoritmi (Behavior)</label>
          <textarea 
            rows={10}
            value={config.systemInstruction}
            onChange={(e) => onChange({ ...config, systemInstruction: e.target.value })}
            className="w-full p-3 bg-white border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none text-sm font-mono leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2">Javob Aniqligi ({config.temperature})</label>
          <input 
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={config.temperature}
            onChange={(e) => onChange({ ...config, temperature: parseFloat(e.target.value) })}
            className="w-full accent-indigo-600"
          />
        </div>

        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
          <h4 className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-2">
            <i className="fa-solid fa-info-circle text-indigo-500"></i>
            Tizim haqida
          </h4>
          <p className="text-xs text-slate-500 leading-relaxed">
            Ushbu panel administratorlar uchun tizim modullarini va muloqot mantiqini sozlash imkonini beradi. Barcha o'zgarishlar real vaqtda saqlanadi.
          </p>
        </div>
      </div>

      <div className="p-4 border-t border-slate-100 bg-slate-50">
        <button 
          onClick={onClose}
          className="w-full bg-indigo-600 text-white py-2.5 rounded-lg font-bold hover:bg-indigo-700 transition-all shadow-md"
        >
          Saqlash
        </button>
      </div>
    </div>
  );
};

export default DevPanel;
