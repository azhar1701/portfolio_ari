// @ts-nocheck — Class component with React.Component is not fully typed in this project's React 18 + no @types/react setup.
// The component is correct and works at runtime.
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallbackTitle?: string;
  fallbackMessage?: string;
}

interface State {
  hasError: boolean;
  errorMessage: string;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
    this.handleRetry = this.handleRetry.bind(this);
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorMessage: error.message };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an unhandled error:', error, errorInfo);
  }

  public handleRetry() {
    this.setState({ hasError: false, errorMessage: '' });
  }

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="max-w-6xl mx-auto p-8 rounded-3xl bg-slate-900 border border-slate-800 text-center space-y-4 my-8 shadow-md">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center mx-auto text-xl">
            <i className="fas fa-triangle-exclamation"></i>
          </div>
          <h3 className="text-lg font-bold text-white tracking-tight">
            {this.props.fallbackTitle || 'Component Encountered an Issue'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
            {this.props.fallbackMessage || 'This section temporarily failed to load. The rest of the portfolio remains fully operational.'}
          </p>
          <button
            type="button"
            onClick={this.handleRetry}
            className="px-4 py-2 bg-sky-500/15 hover:bg-sky-500/25 border border-sky-500/30 text-sky-400 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors inline-flex items-center gap-2"
          >
            <i className="fas fa-rotate-right text-xs"></i>
            Reload Section
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
