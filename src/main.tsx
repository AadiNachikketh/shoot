import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

declare global {
  interface Window {
    __LUMIERE_MOUNTED__?: boolean;
  }
}

interface ErrorBoundaryState {
  hasError: boolean;
  errorMessage: string;
}

class StudioErrorBoundary extends React.Component<
  { children: React.ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false, errorMessage: '' };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return {
      hasError: true,
      errorMessage: error?.message || 'Unexpected rendering error.',
    };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 flex items-center justify-center p-6">
          <div className="max-w-lg w-full bg-white border border-zinc-200 rounded-2xl p-8 space-y-4">
            <p className="text-xs font-mono-tabular text-zinc-500">
              Lumière Atelier — Safe Recovery View
            </p>
            <h1 className="text-2xl font-serif-display font-medium text-zinc-950">
              Exhibition View Reload Required
            </h1>
            <p className="text-xs text-zinc-600 leading-relaxed">
              {this.state.errorMessage}
            </p>
            <button
              type="button"
              onClick={() => window.location.reload()}
              className="px-4 py-2.5 text-xs font-semibold text-white bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors cursor-pointer"
            >
              Reload Studio Workspace
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

const rootElement = document.getElementById('root');
if (rootElement && !window.__LUMIERE_MOUNTED__) {
  window.__LUMIERE_MOUNTED__ = true;
  createRoot(rootElement).render(
    <StudioErrorBoundary>
      <App />
    </StudioErrorBoundary>
  );
}
