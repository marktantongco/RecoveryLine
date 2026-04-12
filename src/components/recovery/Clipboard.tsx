'use client';

import React, { useState } from 'react';
import { ClipboardItem } from '@/lib/recovery-types';

interface ClipboardProps {
  items: ClipboardItem[];
  onAdd: (text: string) => void;
  onDelete: (id: string) => void;
}

export default function Clipboard({ items, onAdd, onDelete }: ClipboardProps) {
  const [text, setText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleAdd = () => {
    if (!text.trim()) return;
    onAdd(text.trim());
    setText('');
  };

  const handleCopy = async (item: ClipboardItem) => {
    try {
      await navigator.clipboard.writeText(item.text);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // fallback
      const ta = document.createElement('textarea');
      ta.value = item.text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopiedId(item.id);
      setTimeout(() => setCopiedId(null), 2000);
    }
  };

  const formatTime = (timestamp: number) => {
    const d = new Date(timestamp);
    return d.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="space-y-4 pb-4">
      <h2 className="text-lg font-bold text-white animate-fadeUp">📋 Quick Notes</h2>

      {/* Input */}
      <div className="glass-card p-4 animate-fadeUp stagger-1" style={{ opacity: 0 }}>
        <p className="text-xs text-slate-400 mb-2">Save a quick thought, reminder, or insight</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
            placeholder="Type something..."
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/25 transition-colors"
          />
          <button
            onClick={handleAdd}
            disabled={!text.trim()}
            className={`px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
              text.trim()
                ? 'bg-sky-500 text-white hover:bg-sky-600'
                : 'bg-white/5 text-slate-600 cursor-not-allowed'
            }`}
          >
            Save
          </button>
        </div>
      </div>

      {/* Notes List */}
      <div className="space-y-2 max-h-[60vh] overflow-y-auto custom-scrollbar">
        {items.length > 0 ? (
          items.map((item, i) => (
            <div
              key={item.id}
              className="glass-card p-3.5 animate-fadeUp"
              style={{ opacity: 0, animationDelay: `${i * 0.05}s` }}
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => handleCopy(item)}
                  className="mt-0.5 p-1.5 rounded-lg hover:bg-white/5 text-slate-500 hover:text-sky-400 transition-colors flex-shrink-0"
                  title="Click to copy"
                >
                  {copiedId === item.id ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                  )}
                </button>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-200 leading-relaxed break-words">{item.text}</p>
                  <p className="text-xs text-slate-600 mt-1.5">{formatTime(item.timestamp)}</p>
                </div>
                <button
                  onClick={() => onDelete(item.id)}
                  className="p-1.5 rounded-lg hover:bg-white/5 text-slate-600 hover:text-red-400 transition-colors flex-shrink-0"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="glass-card p-8 text-center animate-fadeUp">
            <p className="text-3xl mb-2">💭</p>
            <p className="text-sm text-slate-500">No notes yet. Save your thoughts here!</p>
          </div>
        )}
      </div>
    </div>
  );
}
