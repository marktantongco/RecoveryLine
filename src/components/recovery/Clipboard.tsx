'use client';

import React, { useState } from 'react';
import { ClipboardItem } from '@/lib/recovery-types';
import { copyToClipboard, haptic } from '@/lib/utils';
import { useToast } from './Toast';

interface ClipboardProps {
  items: ClipboardItem[];
  onAdd: (text: string) => void;
  onDelete: (id: string) => void;
  onClearAll?: () => void;
}

export default function Clipboard({ items, onAdd, onDelete }: ClipboardProps) {
  const { showToast } = useToast();
  const [text, setText] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const handleAdd = () => {
    if (!text.trim()) return;
    haptic('light');
    // Prepend day and time to the note text
    const now = new Date();
    const dayTime = now.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
    const noteWithTimestamp = `[${dayTime}] ${text.trim()}`;
    onAdd(noteWithTimestamp);
    setText('');
    showToast('Note saved', 'success');
  };

  const handleCopy = async (item: ClipboardItem) => {
    const ok = await copyToClipboard(item.text);
    if (ok) {
      setCopiedId(item.id);
      showToast('Copied to clipboard', 'info');
      setTimeout(() => setCopiedId(null), 2000);
    } else {
      showToast('Could not copy to clipboard', 'error');
    }
  };

  const handleDelete = (id: string) => {
    haptic('light');
    onDelete(id);
    setConfirmDeleteId(null);
    showToast('Note deleted', 'info');
  };

  const formatTime = (timestamp: number) => {
    const d = new Date(timestamp);
    return d.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  return (
    <div className="space-y-4 pb-6">
      <div className="animate-fadeUp">
        <h2 className="text-lg font-bold text-white">Quick Notes</h2>
        <p className="text-xs text-slate-400 mt-0.5">Save thoughts, reminders, and insights</p>
      </div>

      {/* Input */}
      <div className="glass-card p-4 animate-fadeUp stagger-1" style={{ opacity: 0 }}>
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
                ? 'bg-sky-500 text-white hover:bg-sky-600 active:scale-95 shadow-lg shadow-sky-500/20'
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
                  className="mt-0.5 p-1.5 rounded-lg hover:bg-white/5 text-slate-500 hover:text-sky-400 transition-colors flex-shrink-0 active:scale-90"
                  title="Click to copy"
                >
                  {copiedId === item.id ? (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 6 9 17l-5-5" />
                    </svg>
                  ) : (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" /><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                  )}
                </button>
                <div className="flex-1 min-w-0" onClick={() => handleCopy(item)}>
                  <p className="text-sm text-slate-200 leading-relaxed break-words cursor-pointer hover:text-white transition-colors">{item.text}</p>
                  <p className="text-xs text-slate-600 mt-1.5">{formatTime(item.timestamp)}</p>
                </div>
                {confirmDeleteId === item.id ? (
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="px-2 py-1 rounded-lg bg-red-500/15 text-red-400 text-[10px] font-medium border border-red-500/20 active:scale-95 transition-all"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setConfirmDeleteId(null)}
                      className="px-2 py-1 rounded-lg bg-white/5 text-slate-400 text-[10px] active:scale-95 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setConfirmDeleteId(item.id)}
                    className="p-1.5 rounded-lg hover:bg-white/5 text-slate-600 hover:text-red-400 transition-colors flex-shrink-0"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="glass-card p-8 text-center animate-fadeUp">
            <div className="text-4xl mb-3">{'\ud83d\udcad'}</div>
            <p className="text-sm text-slate-500 font-medium">No notes yet</p>
            <p className="text-xs text-slate-600 mt-1">Save your thoughts, reminders, or insights here</p>
          </div>
        )}
      </div>
    </div>
  );
}
