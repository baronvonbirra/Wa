import React, { useState } from 'react';
import { Sparkles, X, MessageCircle } from 'lucide-react';

export interface Mascot {
  id: string;
  name: string;
  avatar: string;
  role: string;
  greeting: string;
  tips: string[];
  bg: string;
  border: string;
}

export const MASCOTS: Mascot[] = [
  {
    id: 'shiba',
    name: 'Katsu el Shiba',
    avatar: '🐕🎒',
    role: 'Guía Explorador',
    greeting: '¡Wan wan! Soy Katsu, ¡listo para caminar por todo Japón!',
    tips: [
      '¡Recuerda llevar siempre calcetines limpios y sin agujeros! En muchos templos y ryokan os descalzaréis al entrar.',
      'Si veis una máquina con etiqueta roja, ¡significa bebida caliente! Ideal para calentarse las manos en invierno.',
      'La tarjeta IC (Suica/Pasmo) sirve para trenes, metros, combinis e incluso muchas máquinas expendedoras.'
    ],
    bg: 'bg-[#FFDAC1]/60 dark:bg-amber-950/60',
    border: 'border-[#FFB7B2]'
  },
  {
    id: 'neko',
    name: 'Maneki-Tama',
    avatar: '🐱🐾',
    role: 'Espíritu de la Buena Suerte',
    greeting: '¡Nyaaa! Traigo fortuna, dulces y cupones de buena suerte.',
    tips: [
      'Al recibir la vuelta o la tarjeta de crédito, sostenla con ambas manos en señal de respeto.',
      'En los restaurantes no hay que dejar propina. Un sincero "Gochisōsama deshita" al salir es la mayor muestra de gratitud.',
      'Si sacáis un Omikuji de mala suerte en el templo, atadlo en la varilla metálica y el viento se la llevará.'
    ],
    bg: 'bg-[#FFB7B2]/50 dark:bg-rose-950/60',
    border: 'border-[#FFB7B2]'
  },
  {
    id: 'onigiri',
    name: 'Nori-chan',
    avatar: '🍙✨',
    role: 'Experto Gastronómico',
    greeting: '¡Itadakimasu! La comida en Japón es puro arte y sabor.',
    tips: [
      'Para abrir un Onigiri de 7-Eleven sin romper el alga: tira de la tira 1 del centro, luego la esquina 2 y la esquina 3.',
      'En Utsunomiya probaremos gyozas a la plancha, fritas y en sopa. ¡No os las perdáis!',
      'Hacer ruido sorbiendo fideos (Sluuuurp) al comer ramen o soba es perfectamente aceptado y demuestra que está delicioso.'
    ],
    bg: 'bg-[#B5EAD7]/60 dark:bg-emerald-950/60',
    border: 'border-[#B5EAD7]'
  }
];

export const MascotsWidget: React.FC = () => {
  const [selectedMascot, setSelectedMascot] = useState<Mascot | null>(null);
  const [currentTipIdx, setCurrentTipIdx] = useState<number>(0);

  const handleSelect = (mascot: Mascot) => {
    setSelectedMascot(mascot);
    setCurrentTipIdx(Math.floor(Math.random() * mascot.tips.length));
  };

  return (
    <div className="bg-gradient-to-r from-[#FFB7B2]/20 via-[#FFDAC1]/30 to-[#B5EAD7]/20 dark:from-slate-900 dark:to-slate-850 border-2 border-[#FFB7B2]/60 rounded-3xl p-4 shadow-sm mb-6 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-rose-500 animate-spin" />
          <h2 className="text-xs font-black uppercase tracking-wider text-rose-700 dark:text-rose-300">
            Mascotas Guía de Viaje Kawaii
          </h2>
        </div>
        <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400">
          Toca a un amigo para pedir un consejo 🌸
        </span>
      </div>

      {/* Mascot Avatar Row */}
      <div className="grid grid-cols-3 gap-2">
        {MASCOTS.map((m) => {
          const isSelected = selectedMascot?.id === m.id;
          return (
            <button
              key={m.id}
              onClick={() => handleSelect(m)}
              className={`p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all min-h-[64px] active:scale-95 border-2 ${
                m.bg
              } ${isSelected ? 'border-rose-500 scale-105 shadow-md' : 'border-transparent hover:border-rose-300'}`}
            >
              <span className="text-2xl block mb-0.5 animate-bounce">{m.avatar}</span>
              <span className="text-xs font-black text-slate-800 dark:text-slate-100">{m.name}</span>
              <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400">{m.role}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Speech Bubble */}
      {selectedMascot && (
        <div className="bg-white dark:bg-slate-900 border-2 border-rose-300 dark:border-rose-900 p-3.5 rounded-2xl relative shadow-md animate-in zoom-in-95 duration-200">
          <div className="flex items-start justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-2 mb-2">
            <div className="flex items-center gap-2">
              <span className="text-xl">{selectedMascot.avatar}</span>
              <div>
                <span className="text-xs font-black text-slate-900 dark:text-white">
                  {selectedMascot.name}
                </span>
                <p className="text-[10px] font-extrabold text-rose-600 dark:text-rose-400">
                  {selectedMascot.greeting}
                </p>
              </div>
            </div>

            <button
              onClick={() => setSelectedMascot(null)}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-white p-1 rounded-lg"
              aria-label="Cerrar consejo"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-relaxed bg-rose-50/50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-rose-100 dark:border-slate-700">
            💡 {selectedMascot.tips[currentTipIdx]}
          </p>

          <button
            onClick={() => setCurrentTipIdx((prev) => (prev + 1) % selectedMascot.tips.length)}
            className="mt-2 text-[10px] font-black text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
          >
            <MessageCircle className="w-3 h-3" />
            <span>Ver otro consejo de {selectedMascot.name}</span>
          </button>
        </div>
      )}
    </div>
  );
};
