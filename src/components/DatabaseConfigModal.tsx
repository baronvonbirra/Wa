import React, { useState, useEffect } from 'react';
import { Database, CheckCircle2, AlertTriangle, X, RefreshCw, Key, Link2, Trash2 } from 'lucide-react';
import {
  getSupabaseConfig,
  setSupabaseCredentials,
  clearSupabaseCredentials,
  testSupabaseConnection,
  checkIsSupabaseConfigured,
  ConnectionTestResult
} from '../lib/supabase';

interface DatabaseConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigChanged?: () => void;
}

export const DatabaseConfigModal: React.FC<DatabaseConfigModalProps> = ({
  isOpen,
  onClose,
  onConfigChanged
}) => {
  const [url, setUrl] = useState('');
  const [key, setKey] = useState('');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<ConnectionTestResult | null>(null);
  const isConnected = checkIsSupabaseConfigured();

  useEffect(() => {
    if (isOpen) {
      const currentConfig = getSupabaseConfig();
      setUrl(currentConfig.url || '');
      setKey(currentConfig.key || '');
      setTestResult(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTestConnection = async () => {
    setIsTesting(true);
    setTestResult(null);
    try {
      const res = await testSupabaseConnection(url.trim(), key.trim());
      setTestResult(res);
    } catch (e: any) {
      setTestResult({
        success: false,
        message: 'Excepción inesperada al probar conexión.',
        details: e?.message || String(e)
      });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = async () => {
    if (!url.trim() || !key.trim()) {
      setTestResult({
        success: false,
        message: 'Por favor, ingresa tanto la URL como la Anon API Key de Supabase.'
      });
      return;
    }

    setIsTesting(true);
    const testRes = await testSupabaseConnection(url.trim(), key.trim());
    setIsTesting(false);
    setTestResult(testRes);

    setSupabaseCredentials(url.trim(), key.trim());
    if (onConfigChanged) onConfigChanged();
  };

  const handleClear = () => {
    clearSupabaseCredentials();
    setUrl('');
    setKey('');
    setTestResult({
      success: false,
      message: 'Credenciales eliminadas. La aplicación operará en Modo Almacenamiento Local.'
    });
    if (onConfigChanged) onConfigChanged();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div
        className="bg-slate-900 border border-slate-800 rounded-3xl max-w-lg w-full p-6 text-slate-100 shadow-2xl space-y-5 overflow-y-auto max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black tracking-wide text-white">Configuración de Base de Datos</h2>
              <p className="text-xs text-slate-400 font-medium">Supabase Cloud Database Sync</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition-colors"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Connection Status Badge */}
        <div className={`p-3.5 rounded-2xl border flex items-center justify-between text-xs font-bold ${
          isConnected
            ? 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300'
            : 'bg-amber-950/60 border-amber-500/30 text-amber-300'
        }`}>
          <div className="flex items-center gap-2">
            {isConnected ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
            )}
            <span>
              {isConnected
                ? 'Sincronización Supabase DB Activa'
                : 'Modo Local (Guardando únicamente en localStorage)'}
            </span>
          </div>
          <span className="text-[10px] uppercase tracking-wider font-extrabold px-2 py-0.5 rounded-md bg-slate-900/60">
            {isConnected ? 'DB ON' : 'LOCAL'}
          </span>
        </div>

        {/* Form Inputs */}
        <div className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Link2 className="w-3.5 h-3.5 text-rose-400" />
              URL del Proyecto Supabase (SUPABASE_URL)
            </label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://tu-proyecto.supabase.co"
              className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition-colors font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5 flex items-center gap-1.5">
              <Key className="w-3.5 h-3.5 text-rose-400" />
              Anon API Key (SUPABASE_ANON_KEY)
            </label>
            <textarea
              rows={3}
              value={key}
              onChange={(e) => setKey(e.target.value)}
              placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
              className="w-full bg-slate-950 border border-slate-800 focus:border-rose-500 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-600 outline-none transition-colors font-mono resize-none"
            />
          </div>
        </div>

        {/* Diagnostic Output */}
        {testResult && (
          <div
            className={`p-3.5 rounded-2xl border text-xs space-y-1 ${
              testResult.success
                ? 'bg-emerald-950/70 border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/70 border-rose-500/40 text-rose-200'
            }`}
          >
            <div className="font-bold flex items-center gap-1.5">
              {testResult.success ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
              )}
              <span>{testResult.message}</span>
            </div>
            {testResult.details && (
              <p className="text-[11px] opacity-80 font-mono break-all mt-1">{testResult.details}</p>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-slate-800">
          <button
            onClick={handleTestConnection}
            disabled={isTesting}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
            Probar Conexión
          </button>

          <button
            onClick={handleSave}
            disabled={isTesting}
            className="w-full sm:w-auto flex-1 px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-black shadow-lg shadow-rose-900/40 flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
          >
            <Database className="w-3.5 h-3.5" />
            Guardar y Conectar
          </button>

          {isConnected && (
            <button
              onClick={handleClear}
              className="w-full sm:w-auto px-3 py-2.5 rounded-xl bg-rose-950/40 border border-rose-800/40 hover:bg-rose-900/60 text-rose-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
              title="Borrar credenciales del navegador"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Borrar
            </button>
          )}
        </div>

        {/* Tip / Instruction note */}
        <p className="text-[11px] text-slate-500 text-left leading-relaxed">
          💡 <span className="font-semibold">Sugerencia:</span> Las credenciales introducidas aquí se guardan de forma privada en el almacenamiento local del navegador (`localStorage`). También puedes configurarlas en GitHub Repository Secrets como <code className="text-slate-400 font-mono">VITE_SUPABASE_URL</code> y <code className="text-slate-400 font-mono">VITE_SUPABASE_ANON_KEY</code>.
        </p>
      </div>
    </div>
  );
};
