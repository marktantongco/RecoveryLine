'use client';

import React from 'react';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'warning' | 'default';
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'default',
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  const confirmColor =
    variant === 'danger'
      ? 'bg-red-500/15 text-red-400 border-red-500/25 hover:bg-red-500/25'
      : variant === 'warning'
        ? 'bg-amber-500/15 text-amber-400 border-amber-500/25 hover:bg-amber-500/25'
        : 'bg-sky-500/15 text-sky-400 border-sky-500/25 hover:bg-sky-500/25';

  return (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-sm glass-card p-5 animate-scaleIn">
        <h3 className="text-sm font-bold text-white mb-2">{title}</h3>
        <p className="text-xs text-slate-400 leading-relaxed mb-5">{message}</p>
        <div className="flex gap-2 justify-end">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-xs font-medium bg-white/5 text-slate-400 border border-white/10 hover:bg-white/10 active:scale-95 transition-all"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-xl text-xs font-medium border active:scale-95 transition-all ${confirmColor}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
