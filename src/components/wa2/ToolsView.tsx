import React, { useState } from 'react';
import { useWa2 } from '../../state/Wa2Context';
import { TravelDoc } from '../../state/wa2Types';
import {
  Calculator,
  QrCode,
  Percent,
  Plus,
  Trash2,
  Maximize2,
  Sparkles,
  ArrowRightLeft,
  Check,
  ShieldAlert,
  FileText,
  Delete
} from 'lucide-react';

export const ToolsView: React.FC = () => {
  const { waState, setEurJpyRate, addTravelDoc, deleteTravelDoc } = useWa2();

  const [activeSubTab, setActiveSubTab] = useState<'converter' | 'docs'>('converter');

  // Converter State
  const [conversionDirection, setConversionDirection] = useState<'jpyToEur' | 'eurToJpy'>('jpyToEur');
  const [inputValue, setInputValue] = useState<string>('10000');
  const [applyTaxFree, setApplyTaxFree] = useState<boolean>(false);
  const [editingRate, setEditingRate] = useState<boolean>(false);
  const [customRate, setCustomRate] = useState<string>(waState.eurJpyRate.toString());

  // Travel Docs State
  const [fullscreenDoc, setFullscreenDoc] = useState<TravelDoc | null>(null);
  const [showAddDocModal, setShowAddDocModal] = useState<boolean>(false);
  const [docTitle, setDocTitle] = useState('');
  const [docQrUrl, setDocQrUrl] = useState('');
  const [docNotes, setDocNotes] = useState('');

  // Keypad Handlers for Converter
  const handleKeyPress = (val: string) => {
    if (val === 'C') {
      setInputValue('0');
    } else if (val === 'backspace') {
      setInputValue(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    } else {
      setInputValue(prev => (prev === '0' ? val : prev + val));
    }
  };

  const handleAddQuickAmount = (amount: number) => {
    const current = Number(inputValue) || 0;
    setInputValue((current + amount).toString());
  };

  // Calculations for Converter
  const rawNum = Number(inputValue) || 0;
  let finalJpy = 0;
  let finalEur = 0;
  let taxSavingsJpy = 0;
  let taxSavingsEur = 0;

  if (conversionDirection === 'jpyToEur') {
    const jpyAmount = applyTaxFree ? rawNum / 1.10 : rawNum;
    finalJpy = jpyAmount;
    finalEur = jpyAmount / waState.eurJpyRate;
    if (applyTaxFree) {
      taxSavingsJpy = rawNum - jpyAmount;
      taxSavingsEur = taxSavingsJpy / waState.eurJpyRate;
    }
  } else {
    // EUR to JPY
    const eurAmount = rawNum;
    let jpyCalc = eurAmount * waState.eurJpyRate;
    if (applyTaxFree) {
      taxSavingsJpy = jpyCalc - (jpyCalc / 1.10);
      jpyCalc = jpyCalc / 1.10;
      taxSavingsEur = taxSavingsJpy / waState.eurJpyRate;
    }
    finalJpy = jpyCalc;
    finalEur = applyTaxFree ? eurAmount / 1.10 : eurAmount;
  }

  const handleSaveRate = () => {
    const newRate = Number(customRate);
    if (newRate > 0) {
      setEurJpyRate(newRate);
      setEditingRate(false);
    }
  };

  const handleSaveDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim()) return;

    const qr = docQrUrl.trim() ||
      `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(docTitle.trim())}`;

    addTravelDoc({
      title: docTitle.trim(),
      qr_code_url: qr,
      notes: docNotes.trim()
    });

    setDocTitle('');
    setDocQrUrl('');
    setDocNotes('');
    setShowAddDocModal(false);
  };

  return (
    <div className="pb-24 pt-2 max-w-md mx-auto px-4 space-y-4">
      {/* Sub-tab Switcher: Converter vs Docs & QRs */}
      <div className="flex bg-slate-200/80 p-1 rounded-2xl border border-slate-300">
        <button
          onClick={() => setActiveSubTab('converter')}
          className={`flex-1 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'converter'
              ? 'bg-rose-500 text-white shadow-md'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Conversor Moneda</span>
        </button>

        <button
          onClick={() => setActiveSubTab('docs')}
          className={`flex-1 py-2 text-xs font-black rounded-xl transition-all flex items-center justify-center gap-1.5 ${
            activeSubTab === 'docs'
              ? 'bg-rose-500 text-white shadow-md'
              : 'text-slate-700 hover:text-slate-900'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>Documentos & QRs</span>
        </button>
      </div>

      {/* CONVERTER SECTION */}
      {activeSubTab === 'converter' && (
        <div className="space-y-3">
          {/* Main Display Box */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-rose-950 text-white rounded-3xl p-4 shadow-xl border-2 border-rose-500/30">
            {/* Top Bar with Rate & Tax-Free Switch */}
            <div className="flex items-center justify-between border-b border-slate-700 pb-2.5 mb-3">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Tipo de cambio:</span>
                {editingRate ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={customRate}
                      onChange={e => setCustomRate(e.target.value)}
                      className="w-16 px-1 py-0.5 text-xs bg-slate-700 text-white font-bold rounded border border-rose-400 focus:outline-none"
                    />
                    <button
                      onClick={handleSaveRate}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded"
                    >
                      OK
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditingRate(true)}
                    className="text-xs font-black text-rose-300 hover:text-rose-200 underline decoration-dotted"
                  >
                    1€ = {waState.eurJpyRate} ¥
                  </button>
                )}
              </div>

              {/* Direction Toggle */}
              <button
                onClick={() => {
                  setConversionDirection(prev => prev === 'jpyToEur' ? 'eurToJpy' : 'jpyToEur');
                  setInputValue('1000');
                }}
                className="bg-white/10 hover:bg-white/20 text-rose-200 px-2.5 py-1 rounded-xl text-[10px] font-black flex items-center gap-1 border border-white/10"
              >
                <ArrowRightLeft className="w-3 h-3" />
                <span>{conversionDirection === 'jpyToEur' ? 'JPY → EUR' : 'EUR → JPY'}</span>
              </button>
            </div>

            {/* Input Value Display */}
            <div className="text-right py-1">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase block">
                {conversionDirection === 'jpyToEur' ? 'Importe en Yenes (JPY)' : 'Importe en Euros (EUR)'}
              </span>
              <strong className="text-3xl font-black tracking-tight text-white block mt-0.5">
                {conversionDirection === 'jpyToEur' ? '¥' : '€'}{rawNum.toLocaleString()}
              </strong>
            </div>

            {/* Converted Output Display */}
            <div className="mt-2 pt-2 border-t border-slate-700/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-rose-300 font-extrabold uppercase block">
                  {conversionDirection === 'jpyToEur' ? 'Resultado en Euros' : 'Resultado en Yenes'}
                </span>
                <strong className="text-2xl font-black text-rose-400">
                  {conversionDirection === 'jpyToEur' ? `€${finalEur.toFixed(2)}` : `¥${Math.round(finalJpy).toLocaleString()}`}
                </strong>
              </div>

              {/* Tax-Free Toggle Button */}
              <button
                onClick={() => setApplyTaxFree(!applyTaxFree)}
                className={`px-3 py-1.5 rounded-2xl text-xs font-black border transition-all flex items-center gap-1.5 ${
                  applyTaxFree
                    ? 'bg-emerald-500 text-white border-emerald-400 shadow-md animate-pulse'
                    : 'bg-slate-800 text-slate-300 border-slate-600 hover:bg-slate-700'
                }`}
              >
                <Percent className="w-3.5 h-3.5" />
                <span>Tax-Free (-10%)</span>
              </button>
            </div>

            {/* Tax Savings Banner if Tax-Free Active */}
            {applyTaxFree && (
              <div className="mt-3 bg-emerald-500/20 border border-emerald-500/50 rounded-2xl p-2 text-center text-xs text-emerald-200 font-bold">
                🎉 ¡Ahorro Tax-Free del 10%: <strong>¥{Math.round(taxSavingsJpy).toLocaleString()} (≈ €{taxSavingsEur.toFixed(2)})</strong>!
              </div>
            )}
          </div>

          {/* Keypad Preset Buttons (+1000, +5000, +10000) */}
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleAddQuickAmount(1000)}
              className="bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-xl py-2 font-black text-xs active:scale-95 transition-all shadow-xs"
            >
              +1.000 ¥
            </button>
            <button
              onClick={() => handleAddQuickAmount(5000)}
              className="bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-xl py-2 font-black text-xs active:scale-95 transition-all shadow-xs"
            >
              +5.000 ¥
            </button>
            <button
              onClick={() => handleAddQuickAmount(10000)}
              className="bg-rose-50 hover:bg-rose-100 text-rose-800 border border-rose-200 rounded-xl py-2 font-black text-xs active:scale-95 transition-all shadow-xs"
            >
              +10.000 ¥
            </button>
          </div>

          {/* Fast Mobile Keypad (0-9, Clear, Backspace) */}
          <div className="bg-white rounded-3xl p-3 shadow-sm border border-slate-200 grid grid-cols-3 gap-2">
            {['7', '8', '9', '4', '5', '6', '1', '2', '3', 'C', '0', 'backspace'].map((key) => {
              const isClear = key === 'C';
              const isBack = key === 'backspace';

              return (
                <button
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  className={`py-3.5 rounded-2xl text-lg font-black transition-all active:scale-95 shadow-xs flex items-center justify-center ${
                    isClear
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : isBack
                      ? 'bg-rose-100 text-rose-800 border border-rose-200'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-200'
                  }`}
                >
                  {isBack ? <Delete className="w-5 h-5" /> : key}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* TRAVEL DOCUMENTS & QRS SECTION */}
      {activeSubTab === 'docs' && (
        <div className="space-y-3">
          {/* Header & Add Button */}
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-rose-500" />
                Documentos & QRs
              </h2>
              <p className="text-[10px] text-slate-400 font-bold">Escaneo rápido en inmigración y tiendas</p>
            </div>

            <button
              onClick={() => setShowAddDocModal(true)}
              className="bg-rose-500 hover:bg-rose-600 text-white font-black text-xs px-3 py-1.5 rounded-xl border-b-2 border-rose-700 active:translate-y-0.5 transition-all flex items-center gap-1 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir QR</span>
            </button>
          </div>

          {/* QRs Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {waState.travelDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white border-2 border-rose-100 hover:border-rose-300 rounded-2xl p-3.5 shadow-sm space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xs font-black text-slate-800 leading-tight">
                      {doc.title}
                    </h3>

                    <button
                      onClick={() => {
                        if (confirm('¿Eliminar este documento?')) {
                          deleteTravelDoc(doc.id);
                        }
                      }}
                      className="text-slate-300 hover:text-rose-600 p-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {doc.notes && (
                    <p className="text-[10px] text-slate-500 mt-1 leading-snug">
                      {doc.notes}
                    </p>
                  )}
                </div>

                {/* QR Code Preview Thumbnail */}
                <div
                  onClick={() => setFullscreenDoc(doc)}
                  className="bg-slate-50 border border-slate-200 rounded-xl p-2.5 flex flex-col items-center justify-center cursor-pointer hover:bg-rose-50 hover:border-rose-200 transition-all group"
                >
                  <img
                    src={doc.qr_code_url}
                    alt={doc.title}
                    className="w-28 h-28 object-contain rounded-lg"
                  />
                  <span className="text-[10px] font-black text-rose-600 group-hover:scale-105 transition-transform mt-1.5 flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" />
                    Ampliar para Escanear
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen QR Modal */}
      {fullscreenDoc && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-rose-400 rounded-3xl p-6 shadow-2xl max-w-sm w-full text-center relative space-y-4 animate-scaleUp">
            <button
              onClick={() => setFullscreenDoc(null)}
              className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-extrabold p-2 rounded-full h-8 w-8 flex items-center justify-center text-sm"
            >
              ✕
            </button>

            <div>
              <span className="text-3xl block mb-1">📱</span>
              <h3 className="text-base font-black text-slate-900 uppercase">{fullscreenDoc.title}</h3>
              <p className="text-xs text-slate-500 font-bold mt-1">Muestra este código al personal o escáner</p>
            </div>

            <div className="bg-white p-4 border-4 border-slate-900 rounded-2xl shadow-inner inline-block mx-auto">
              <img
                src={fullscreenDoc.qr_code_url}
                alt={fullscreenDoc.title}
                className="w-56 h-56 object-contain"
              />
            </div>

            {fullscreenDoc.notes && (
              <p className="text-xs text-slate-600 bg-amber-50 border border-amber-200 p-2.5 rounded-xl text-left font-semibold">
                💡 {fullscreenDoc.notes}
              </p>
            )}

            <button
              onClick={() => setFullscreenDoc(null)}
              className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Add Document / QR Modal */}
      {showAddDocModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-rose-300 rounded-3xl p-5 shadow-2xl max-w-sm w-full relative">
            <button
              onClick={() => setShowAddDocModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-sm font-bold bg-slate-100 p-1 rounded-full h-7 w-7 flex items-center justify-center"
            >
              ✕
            </button>

            <h3 className="text-base font-black text-slate-800 flex items-center gap-1.5 mb-3">
              <Sparkles className="w-4 h-4 text-rose-500" />
              Añadir Documento o QR
            </h3>

            <form onSubmit={handleSaveDoc} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Título del Documento *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Visit Japan Web QR o Seguro"
                  value={docTitle}
                  onChange={e => setDocTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">URL del Código QR / Imagen</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={docQrUrl}
                  onChange={e => setDocQrUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                />
                <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
                  Si se deja vacío, se generará un código QR automáticamente.
                </span>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Notas / Instrucciones</label>
                <textarea
                  rows={2}
                  placeholder="Ej: Código de póliza, teléfono de emergencias..."
                  value={docNotes}
                  onChange={e => setDocNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddDocModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-extrabold hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-black border-b-2 border-rose-700 shadow-sm"
                >
                  Guardar QR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
