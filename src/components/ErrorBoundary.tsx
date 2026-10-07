import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Trash2 } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in application:', error, errorInfo);
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleResetStorage = () => {
    try {
      localStorage.clear();
      if ('caches' in window) {
        caches.keys().then((names) => {
          names.forEach((name) => caches.delete(name));
        });
      }
    } catch (e) {
      console.error('Error clearing storage:', e);
    }
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
          <div className="bg-white border-2 border-rose-200 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-xl text-center">
            <div className="w-16 h-16 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
              <AlertTriangle className="w-8 h-8" />
            </div>

            <h1 className="text-xl sm:text-2xl font-black text-slate-800 mb-2">
              ¡Ups! Algo salió mal
            </h1>

            <p className="text-sm font-medium text-slate-600 mb-6 leading-relaxed">
              La aplicación ha encontrado un problema inesperado. Puedes intentar recargar la página o restablecer la caché si el problema persiste.
            </p>

            {this.state.error && (
              <div className="bg-slate-100 border border-slate-200 rounded-xl p-3 mb-6 text-left overflow-x-auto max-h-32 text-xs font-mono text-slate-700">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col gap-3">
              <button
                onClick={this.handleReload}
                className="w-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-extrabold text-sm py-3 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Recargar Aplicación</span>
              </button>

              <button
                onClick={this.handleResetStorage}
                className="w-full bg-slate-100 hover:bg-slate-200 active:scale-95 text-slate-700 font-extrabold text-xs py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-2 border border-slate-200"
              >
                <Trash2 className="w-3.5 h-3.5 text-slate-500" />
                <span>Restablecer Datos y Caché</span>
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
