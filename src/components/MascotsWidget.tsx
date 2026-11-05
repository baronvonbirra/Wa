import React, { useState } from 'react';
import { Sparkles, Heart } from 'lucide-react';
import { MASCOT_CHARACTERS, MascotCharacter, getMascotMessages, getCurrentMascotDate } from '../data/mascotData';

interface MascotsWidgetProps {
  /** Optional date override (e.g. for testing/previews). If omitted, tracks real current day */
  forcedDate?: string;
}

export const MascotsWidget: React.FC<MascotsWidgetProps> = ({ forcedDate }) => {
  const [activeMascotId, setActiveMascotId] = useState<'koji' | 'tama' | 'panko'>('koji');
  const [currentRealDate, setCurrentRealDate] = useState<string>(() =>
    forcedDate && forcedDate.trim().length > 0 ? forcedDate.trim() : getCurrentMascotDate()
  );

  // Keep date updated periodically if date rolls over at midnight
  React.useEffect(() => {
    if (forcedDate && forcedDate.trim().length > 0) {
      setCurrentRealDate(forcedDate.trim());
      return;
    }

    const updateDate = () => {
      const latest = getCurrentMascotDate();
      setCurrentRealDate((prev) => (prev !== latest ? latest : prev));
    };

    updateDate();
    const timer = setInterval(updateDate, 30000); // Check every 30s
    return () => clearInterval(timer);
  }, [forcedDate]);

  const effectiveDateStr = forcedDate && forcedDate.trim().length > 0 ? forcedDate.trim() : currentRealDate;

  // Determine messages according to date rules (pre-travel vs daily trip dates)
  const dayTips = getMascotMessages(effectiveDateStr);
  const activeMascot: MascotCharacter =
    MASCOT_CHARACTERS.find((m) => m.id === activeMascotId) || MASCOT_CHARACTERS[0];

  const currentTipText = dayTips[activeMascotId];

  // Format short date for display e.g. "20 Dic" from "2026-12-20" or "Pre-Viaje"
  const formatDateLabel = (dateStr: string) => {
    if (!dateStr || dateStr < '2026-12-20') {
      return 'Pre-Viaje';
    }
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const monthNames = [
          'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
          'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
        ];
        const monthIdx = parseInt(parts[1], 10) - 1;
        const dayNum = parseInt(parts[2], 10);
        return `${dayNum} ${monthNames[monthIdx] || ''}`;
      }
    } catch {
      // Fallback
    }
    return dateStr;
  };

  const formattedShortDate = formatDateLabel(effectiveDateStr);

  return (
    <section className="bg-gradient-to-r from-[#FFB7B2]/30 via-[#FFDAC1]/40 to-[#B5EAD7]/30 dark:from-slate-900 dark:via-slate-850 dark:to-slate-900 border-2 border-[#FFB7B2]/70 dark:border-rose-900/60 rounded-3xl p-4 shadow-sm mb-6 space-y-3">
      {/* Widget Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-rose-500 animate-spin" />
          <h2 className="text-xs font-black uppercase tracking-wider text-rose-700 dark:text-rose-300">
            El Consejo Diario de las Mascotas 🌸
          </h2>
        </div>
        <span className="text-[10px] font-black bg-white/80 dark:bg-slate-800 text-rose-600 dark:text-rose-300 px-2.5 py-1 rounded-full border border-rose-200 dark:border-rose-900/60 shadow-2xs">
          📅 {formattedShortDate}
        </span>
      </div>

      {/* Mascot Tabs Navigation */}
      <div className="grid grid-cols-3 gap-2">
        {MASCOT_CHARACTERS.map((m) => {
          const isSelected = activeMascotId === m.id;
          return (
            <button
              key={m.id}
              onClick={() => setActiveMascotId(m.id)}
              className={`p-2.5 rounded-2xl flex flex-col items-center justify-center transition-all min-h-[64px] active:scale-95 border-2 ${
                m.bg
              } ${
                isSelected
                  ? 'border-rose-500 scale-102 shadow-md ring-2 ring-rose-400/30'
                  : 'border-transparent hover:border-rose-300/60 opacity-80 hover:opacity-100'
              }`}
            >
              <span className="text-2xl block mb-0.5 animate-bounce">{m.avatar}</span>
              <span className="text-xs font-black text-slate-800 dark:text-slate-100">{m.name}</span>
              <span className="text-[9px] font-bold text-slate-500 dark:text-slate-400">{m.role}</span>
            </button>
          );
        })}
      </div>

      {/* Comic / Manga Style Speech Bubble Card */}
      <div className="bg-white dark:bg-slate-900 border-2 border-rose-300 dark:border-rose-900 p-4 rounded-2xl shadow-md space-y-2.5 relative animate-in zoom-in-95 duration-200">
        {/* Character Info Row */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2">
          <div className="flex items-center gap-2.5">
            <span className="text-2xl bg-rose-50 dark:bg-slate-800 p-1.5 rounded-xl border border-rose-100 dark:border-slate-700">
              {activeMascot.emoji}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black text-slate-900 dark:text-white">
                  {activeMascot.fullName}
                </span>
                <span className={`text-[9px] font-black px-2 py-0.5 rounded-full ${activeMascot.badgeBg}`}>
                  {activeMascot.role}
                </span>
              </div>
              <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                {activeMascot.personality}
              </p>
            </div>
          </div>

          <Heart className="w-4 h-4 text-rose-400 fill-rose-300 dark:fill-rose-900/60 shrink-0" />
        </div>

        {/* Comic Speech Bubble */}
        <div className="relative bg-rose-50/70 dark:bg-slate-800/80 p-3.5 rounded-2xl border border-rose-200/80 dark:border-slate-700 space-y-1">
          <div className="flex items-center gap-1.5 text-xs font-black text-rose-700 dark:text-rose-300">
            <span>💬</span>
            <span>{activeMascot.name} dice:</span>
          </div>
          <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-relaxed italic">
            &quot;{currentTipText}&quot;
          </p>
        </div>
      </div>
    </section>
  );
};
