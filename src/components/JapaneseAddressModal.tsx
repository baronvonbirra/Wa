import React, { useState } from 'react';
import { Accommodation } from '../types/itinerary';
import { X, Copy, Check, MapPin, Train, Calendar, Navigation } from 'lucide-react';

interface JapaneseAddressModalProps {
  accommodation: Accommodation | null;
  onClose: () => void;
}

export const JapaneseAddressModal: React.FC<JapaneseAddressModalProps> = ({ accommodation, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!accommodation) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(`${accommodation.kanjiName}\n${accommodation.japaneseAddress}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${accommodation.name} ${accommodation.japaneseAddress}`
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs animate-fadeIn">
      <div className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl max-w-lg w-full p-6 shadow-2xl relative overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🚕</span>
            <div>
              <h3 className="text-sm uppercase font-black tracking-wider text-rose-600 dark:text-rose-400">
                Dirección para Taxista / Recepción
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold">Muestra esta pantalla en Japón</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 flex items-center justify-center rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all"
            aria-label="Cerrar modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Japanese Large Address Display Box */}
        <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-800 dark:to-slate-850 border-2 border-amber-300 dark:border-amber-700/60 rounded-2xl p-5 mb-5 shadow-inner text-center">
          <span className="text-[10px] font-black uppercase tracking-widest text-amber-800 dark:text-amber-300 bg-amber-200/60 dark:bg-amber-950/80 px-2.5 py-1 rounded-full inline-block mb-3">
            Japonés / Kanji
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-amber-100 leading-snug mb-3 select-all">
            {accommodation.kanjiName}
          </h2>
          <p className="text-lg sm:text-xl font-extrabold text-slate-800 dark:text-slate-200 leading-relaxed select-all">
            {accommodation.japaneseAddress}
          </p>
        </div>

        {/* Accommodation Details */}
        <div className="space-y-3 mb-6 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700/60 text-xs text-slate-700 dark:text-slate-300">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-rose-500 shrink-0" />
            <span className="font-bold">{accommodation.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Train className="w-4 h-4 text-amber-500 shrink-0" />
            <span>Estación: <strong>{accommodation.nearestStation}</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>Reserva: <strong>{accommodation.check_in}</strong> al <strong>{accommodation.check_out}</strong></span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            onClick={handleCopy}
            className={`min-h-[48px] px-4 py-3 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all active:scale-95 ${
              copied
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 dark:bg-slate-700 text-white hover:bg-slate-900'
            }`}
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{copied ? '¡Copiado!' : 'Copiar en Japonés'}</span>
          </button>

          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[48px] px-4 py-3 rounded-2xl font-black text-xs bg-rose-600 text-white hover:bg-rose-700 flex items-center justify-center gap-2 transition-all active:scale-95 shadow-md"
          >
            <Navigation className="w-4 h-4" />
            <span>Abrir en Google Maps</span>
          </a>
        </div>
      </div>
    </div>
  );
};
