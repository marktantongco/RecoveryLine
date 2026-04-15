'use client';

import React, { Component, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[RecoveryLine] ErrorBoundary caught:', error, info.componentStack);
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  handleReset = () => {
    try {
      localStorage.removeItem('recoveryline_v2');
    } catch { /* ignore */ }
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center p-6">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-2xl shadow-red-500/20 mx-auto mb-5">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <h2 className="text-lg font-bold text-white mb-2">Something went wrong</h2>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">
              RecoveryLine encountered an unexpected error. Your data is safe and stored locally.
            </p>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={this.handleRetry}
                className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 text-white text-sm font-semibold shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 active:scale-[0.98] transition-all"
              >
                Try Again
              </button>
              <button
                onClick={this.handleReset}
                className="w-full py-3 rounded-xl bg-white/5 text-slate-400 text-sm border border-white/10 hover:bg-white/8 active:scale-[0.98] transition-all"
              >
                Reset & Reload
              </button>
            </div>
            {this.state.error && (
              <details className="mt-5 text-left">
                <summary className="text-[10px] text-slate-600 cursor-pointer hover:text-slate-500 transition-colors">
                  Technical Details
                </summary>
                <pre className="mt-2 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] text-slate-500 overflow-auto max-h-32 custom-scrollbar">
                  {this.state.error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
