'use client';

import React, { Component, ReactNode } from 'react';

type ErrorCategory = 'storage' | 'network' | 'render' | 'unknown';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  retryCount: number;
  errorCategory: ErrorCategory;
}

const MAX_RETRIES = 3;

function classifyError(error: Error): ErrorCategory {
  const msg = (error.message || '').toLowerCase();
  const name = (error.name || '').toLowerCase();

  if (
    msg.includes('storage') ||
    msg.includes('quota') ||
    msg.includes('localstorage') ||
    msg.includes('quotaexceeded') ||
    name.includes('storage')
  ) {
    return 'storage';
  }

  if (
    msg.includes('network') ||
    msg.includes('fetch') ||
    msg.includes('failed to fetch') ||
    msg.includes('net::') ||
    msg.includes('timeout') ||
    msg.includes('abort')
  ) {
    return 'network';
  }

  if (
    msg.includes('render') ||
    msg.includes('minified') ||
    msg.includes('cannot read') ||
    msg.includes('undefined is not') ||
    msg.includes('null is not') ||
    msg.includes('is not a function') ||
    msg.includes('is not defined')
  ) {
    return 'render';
  }

  return 'unknown';
}

function getErrorConfig(category: ErrorCategory) {
  switch (category) {
    case 'storage':
      return {
        iconGradient: 'from-amber-500 to-orange-500',
        iconShadow: 'shadow-amber-500/20',
        title: 'Storage Error',
        description:
          'RecoveryLine could not access or save to local storage. Your data may be at risk. Try exporting your data, then clearing storage to recover.',
        showClearData: true,
      };
    case 'network':
      return {
        iconGradient: 'from-sky-500 to-blue-500',
        iconShadow: 'shadow-sky-500/20',
        title: 'Network Error',
        description:
          'A network-related error occurred. Check your connection and try again. Your local data is safe.',
        showClearData: false,
      };
    case 'render':
      return {
        iconGradient: 'from-red-500 to-orange-500',
        iconShadow: 'shadow-red-500/20',
        title: 'Render Error',
        description:
          'A display error occurred. This is usually caused by corrupted data. Try clearing data to start fresh, or retry.',
        showClearData: true,
      };
    default:
      return {
        iconGradient: 'from-red-500 to-orange-500',
        iconShadow: 'shadow-red-500/20',
        title: 'Something went wrong',
        description:
          'RecoveryLine encountered an unexpected error. Your data is safe and stored locally.',
        showClearData: true,
      };
  }
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null, retryCount: 0, errorCategory: 'unknown' };
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
      errorCategory: classifyError(error),
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[RecoveryLine] ErrorBoundary caught:', error, info.componentStack);
  }

  handleRetry = () => {
    const nextCount = this.state.retryCount + 1;
    if (nextCount > MAX_RETRIES) {
      // Exceeded max retries — keep showing error
      this.setState({ retryCount: nextCount });
      return;
    }
    this.setState({ hasError: false, error: null, retryCount: nextCount, errorCategory: 'unknown' });
  };

  handleClearData = () => {
    try {
      localStorage.removeItem('recoveryline_v2');
    } catch {
      /* ignore */
    }
    this.setState({ hasError: false, error: null, retryCount: 0, errorCategory: 'unknown' });
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      const config = getErrorConfig(this.state.errorCategory);
      const exhaustedRetries = this.state.retryCount >= MAX_RETRIES;

      return (
        <div className="min-h-screen bg-[#0a0f1a] flex items-center justify-center p-6">
          <div className="text-center max-w-sm animate-fadeUp">
            {/* Glass card wrapper */}
            <div className="glass-card p-6 mb-4">
              {/* Error icon */}
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${config.iconGradient} flex items-center justify-center shadow-2xl ${config.iconShadow} mx-auto mb-5`}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                  <line x1="12" y1="9" x2="12" y2="13" />
                  <line x1="12" y1="17" x2="12.01" y2="17" />
                </svg>
              </div>

              <h2 className="text-lg font-bold text-white mb-2">{config.title}</h2>
              <p className="text-sm text-slate-400 leading-relaxed mb-1">{config.description}</p>

              {/* Error category badge */}
              <div className="inline-flex items-center gap-1.5 mt-3 mb-5 px-3 py-1.5 rounded-full bg-white/5 border border-white/10">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                <span className="text-[10px] text-slate-400 font-medium">
                  {this.state.errorCategory.toUpperCase()} ERROR
                </span>
                {this.state.retryCount > 0 && (
                  <span className="text-[10px] text-slate-500">
                    &middot; Retry {this.state.retryCount}/{MAX_RETRIES}
                  </span>
                )}
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col gap-2.5">
              {!exhaustedRetries ? (
                <button
                  onClick={this.handleRetry}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-500 text-white text-sm font-semibold shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 active:scale-[0.98] transition-all"
                >
                  Try Again ({MAX_RETRIES - this.state.retryCount} remaining)
                </button>
              ) : (
                <div className="w-full py-3 rounded-xl bg-white/5 text-slate-500 text-sm border border-white/10 text-center">
                  Max retries reached. Clear data or refresh.
                </div>
              )}

              {config.showClearData && (
                <button
                  onClick={this.handleClearData}
                  className="w-full py-3 rounded-xl bg-red-500/10 text-red-400 text-sm border border-red-500/20 hover:bg-red-500/20 active:scale-[0.98] transition-all"
                >
                  Clear Data &amp; Restart
                </button>
              )}

              <button
                onClick={() => {
                  this.setState({ hasError: false, error: null, retryCount: 0 });
                  window.location.reload();
                }}
                className="w-full py-3 rounded-xl bg-white/5 text-slate-400 text-sm border border-white/10 hover:bg-white/8 active:scale-[0.98] transition-all"
              >
                Refresh Page
              </button>
            </div>

            {/* Technical details */}
            {this.state.error && (
              <details className="mt-5 text-left">
                <summary className="text-[10px] text-slate-600 cursor-pointer hover:text-slate-500 transition-colors">
                  Technical Details
                </summary>
                <pre className="mt-2 p-3 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] text-slate-500 overflow-auto max-h-32 custom-scrollbar">
                  {this.state.error.name}: {this.state.error.message}
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
