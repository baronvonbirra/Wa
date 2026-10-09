import React from 'react';
import { Sparkles } from 'lucide-react';
import { getMascotMessages } from '../data/mascotData';

export const MascotsWidget: React.FC = () => {
  const currentMessages = getMascotMessages(new Date());

  const mascotList = [
    {
      id: 'koji',
      name: 'Koji el Shiba 🐕',
      role: 'Guía Explorador',
      avatar: '🐕🎒',
      message: currentMessages.koji,
      bg: 'bg-amber-50 dark:bg-amber-950/40',
      border: 'border-amber-300 dark:border-amber-800'
    },
    {
      id: 'tama',
      name: 'Tama el Neko 🐱',
      role: 'Espíritu de la Buena Suerte',
      avatar: '🐱🐾',
      message: currentMessages.tama,
      bg: 'bg-rose-50 dark:bg-rose-950/40',
      border: 'border-rose-300 dark:border-rose-800'
    },
    {
      id: 'panko',
      name: 'Panko el Onigiri 🍙',
      role: 'Experto Gastronómico',
      avatar: '🍙✨',
      message: currentMessages.panko,
      bg: 'bg-emerald-50 dark:bg-emerald-950/40',
      border: 'border-emerald-300 dark:border-emerald-800'
    }
  ];

  return (
    <div className="bg-gradient-to-r from-[#FFB7B2]/20 via-[#FFDAC1]/30 to-[#B5EAD7]/20 dark:from-slate-900 dark:to-slate-850 border-2 border-[#FFB7B2]/60 rounded-3xl p-4 shadow-sm mb-6 space-y-3">
      <div className="flex items-center gap-2">
        <Sparkles className="w-4 h-4 text-rose-500 animate-spin-slow" />
        <h2 className="text-xs font-black uppercase tracking-wider text-rose-700 dark:text-rose-300">
          El Consejo Diario de las Mascotas 🌸
        </h2>
      </div>

      {/* Static 3 Mascot Cards Grid - No Clicks or Switchers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {mascotList.map((m) => (
          <div
            key={m.id}
            className={`p-3.5 rounded-2xl border-2 ${m.bg} ${m.border} space-y-2 flex flex-col justify-between shadow-xs select-none`}
          >
            <div className="flex items-center gap-2 border-b border-slate-200/60 dark:border-slate-800 pb-2">
              <span className="text-2xl">{m.avatar}</span>
              <div>
                <h3 className="text-xs font-black text-slate-900 dark:text-white">
                  {m.name}
                </h3>
                <span className="text-[10px] font-extrabold text-rose-600 dark:text-rose-400 block">
                  {m.role}
                </span>
              </div>
            </div>

            <p className="text-xs font-bold text-slate-700 dark:text-slate-200 leading-relaxed bg-white/70 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-200/50 dark:border-slate-800 flex-grow">
              💡 {m.message}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
