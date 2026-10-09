import React, { useEffect, useMemo } from 'react';
import { GoshuinStamp } from '../hooks/useGoshuinPassport';
import { X, Award, Sparkles, BookOpen, CheckCircle2, Lock } from 'lucide-react';

export interface FeaturedBadge {
  id: string;
  name: string;
  achievementName: string;
  icon: string;
  stage: string;
  stageGroup: string;
  description: string;
  isUnlocked: (completedIds: string[], unlockedCount?: number) => boolean;
}

export const FEATURED_BADGES: FeaturedBadge[] = [
  // Etapa 0: El Despegue
  {
    id: 'pilot-badge',
    name: 'Sello Piloto del Sol Naciente',
    achievementName: '¡Rumbo a Asia!',
    icon: '✈️',
    stage: 'Etapa 0 • Despegue',
    stageGroup: 'Etapa 0',
    description: 'Despegue desde Málaga (AGP) ✈️ Tokio (HND).',
    isUnlocked: (ids) => ids.includes('act-0-1')
  },
  // Etapa 1: Tokio (Primera Parte), Disney y Nikko
  {
    id: 'disney-magic-badge',
    name: 'Sello Reino Mágico',
    achievementName: 'Magia Disney en Tokio',
    icon: '🏰',
    stage: 'Etapa 1 • Tokio & Disney',
    stageGroup: 'Etapa 1',
    description: 'Tokyo Disneyland.',
    isUnlocked: (ids) => ids.includes('act-2-1')
  },
  {
    id: 'disneysea-badge',
    name: 'Sello Explorador Abisal',
    achievementName: 'Misterios del Océano',
    icon: '🌋',
    stage: 'Etapa 1 • DisneySea',
    stageGroup: 'Etapa 1',
    description: 'Tokyo DisneySea.',
    isUnlocked: (ids) => ids.includes('act-3-1')
  },
  {
    id: 'hachiko-badge',
    name: 'Sello Amigo de Hachiko',
    achievementName: 'Fidelidad Inquebrantable',
    icon: '🐕',
    stage: 'Etapa 1 • Shibuya',
    stageGroup: 'Etapa 1',
    description: 'Cruce de Shibuya / Hachiko Statue.',
    isUnlocked: (ids) => ids.includes('act-4-4')
  },
  {
    id: 'crepe-badge',
    name: 'Sello Rey del Crepe',
    achievementName: 'Estilo Harajuku',
    icon: '🎀',
    stage: 'Etapa 1 • Harajuku',
    stageGroup: 'Etapa 1',
    description: 'Calle Takeshita (Harajuku) / Marion Crêpes.',
    isUnlocked: (ids) => ids.includes('act-4-2')
  },
  {
    id: 'monkeys-badge',
    name: 'Sello Sabiduría Ancestral',
    achievementName: 'Los Tres Monos de Nikko',
    icon: '🙈',
    stage: 'Etapa 1 • Nikko',
    stageGroup: 'Etapa 1',
    description: 'Santuario Tōshō-gū (Nikko).',
    isUnlocked: (ids) => ids.includes('act-5-1')
  },
  {
    id: 'lantern-badge',
    name: 'Sello Gran Farol de la Suerte',
    achievementName: 'Espíritu de Asakusa',
    icon: '🏮',
    stage: 'Etapa 1 • Asakusa',
    stageGroup: 'Etapa 1',
    description: 'Templo Sensō-ji / Kaminarimon Gate.',
    isUnlocked: (ids) => ids.includes('act-6-1')
  },
  {
    id: 'otaku-badge',
    name: 'Sello Leyenda Otaku',
    achievementName: 'Maestro Arcade & Retro',
    icon: '🎮',
    stage: 'Etapa 1 • Akihabara',
    stageGroup: 'Etapa 1',
    description: 'Super Potato / Akihabara Electric Town.',
    isUnlocked: (ids) => ids.includes('act-6-5') || ids.includes('act-6-7')
  },
  {
    id: 'stairs-badge',
    name: 'Sello Encuentro en las Escaleras',
    achievementName: 'Escena de Cine',
    icon: '🎬',
    stage: 'Etapa 1 • Yotsuya',
    stageGroup: 'Etapa 1',
    description: 'Santuario Suga / Your Name Stairs.',
    isUnlocked: (ids) => ids.includes('act-7-11') || ids.includes('act-7-12')
  },
  // Etapa 2: Monte Fuji y Alpes Japoneses
  {
    id: 'fuji-torii-badge',
    name: 'Sello Ventana al Cielo',
    achievementName: 'El Fuji Sagrado',
    icon: '🗻',
    stage: 'Etapa 2 • Mt. Fuji',
    stageGroup: 'Etapa 2',
    description: 'Mirador Tenku no Torii / Santuario Kawaguchi Asama.',
    isUnlocked: (ids) => ids.includes('act-8-1') || ids.includes('act-8-4')
  },
  {
    id: 'pagoda-badge',
    name: 'Sello Postal Inolvidable',
    achievementName: '398 Escalones',
    icon: '🌸',
    stage: 'Etapa 2 • Chureito',
    stageGroup: 'Etapa 2',
    description: 'Parque Arakurayama Sengen (Pagoda Chureito).',
    isUnlocked: (ids) => ids.includes('act-9-5')
  },
  {
    id: 'ninja-badge',
    name: 'Sello Sombra de Shinobi',
    achievementName: 'Maestro Shuriken',
    icon: '🥷',
    stage: 'Etapa 2 • Oshino Ninja',
    stageGroup: 'Etapa 2',
    description: 'Shinobi No Sato Ninja Village.',
    isUnlocked: (ids) => ids.includes('act-9-10')
  },
  {
    id: 'hida-beef-badge',
    name: 'Sello Gourmet de las Montañas',
    achievementName: 'El Sabor de Hida',
    icon: '🥩',
    stage: 'Etapa 2 • Takayama',
    stageGroup: 'Etapa 2',
    description: 'Distrito histórico Sanmachi Suji / Hida Kotte Ushi.',
    isUnlocked: (ids) => ids.includes('act-10-10')
  },
  {
    id: 'shirakawa-badge',
    name: 'Sello Arquitectura de Paja',
    achievementName: 'Manos en Oración',
    icon: '❄️',
    stage: 'Etapa 2 • Shirakawa-go',
    stageGroup: 'Etapa 2',
    description: 'Aldea Gassho Village (Shirakawa-go).',
    isUnlocked: (ids) => ids.includes('act-11-4')
  },
  {
    id: 'hatsumode-badge',
    name: 'Sello Primer Canto del Año',
    achievementName: 'Hatsumode 2027',
    icon: '🔔',
    stage: 'Etapa 2 • Takayama',
    stageGroup: 'Etapa 2',
    description: 'Santuario Hie / Templo Hida Kokubunji.',
    isUnlocked: (ids) => ids.includes('act-12-7') || ids.includes('act-12-8')
  },
  // Etapa 3: Kioto y Excursión a Nara
  {
    id: 'fushimi-badge',
    name: 'Sello El Guardián del Arroz',
    achievementName: 'Mil Puertas Rojas',
    icon: '🦊',
    stage: 'Etapa 3 • Kioto Sur',
    stageGroup: 'Etapa 3',
    description: 'Santuario Fushimi Inari-taisha.',
    isUnlocked: (ids) => ids.includes('act-13-2')
  },
  {
    id: 'kinkaku-badge',
    name: 'Sello Destello de Oro',
    achievementName: 'El Espejo Dorado',
    icon: '✨',
    stage: 'Etapa 3 • Kinkaku-ji',
    stageGroup: 'Etapa 3',
    description: 'Pabellón Dorado (Kinkaku-ji).',
    isUnlocked: (ids) => ids.includes('act-14-1')
  },
  {
    id: 'bamboo-badge',
    name: 'Sello Susurro Verde',
    achievementName: 'Camino del Bambú',
    icon: '🎋',
    stage: 'Etapa 3 • Arashiyama',
    stageGroup: 'Etapa 3',
    description: 'Tenryū-ji / Bosque de Bambú de Arashiyama.',
    isUnlocked: (ids) => ids.includes('act-14-4')
  },
  {
    id: 'otagi-badge',
    name: 'Sello Escultura Alegre',
    achievementName: '1.200 Sonrisas de Piedra',
    icon: '🗿',
    stage: 'Etapa 3 • Arashiyama',
    stageGroup: 'Etapa 3',
    description: 'Templo Otagi Nenbutsu-ji.',
    isUnlocked: (ids) => ids.includes('act-14-11')
  },
  {
    id: 'nara-deer-badge',
    name: 'Sello Reverencia del Bosque',
    achievementName: 'El Ciervo Educado',
    icon: '🦌',
    stage: 'Etapa 3 • Nara',
    stageGroup: 'Etapa 3',
    description: 'Parque de Nara.',
    isUnlocked: (ids) => ids.includes('act-16-7')
  },
  {
    id: 'todaiji-buddha-badge',
    name: 'Sello Valor de Buda',
    achievementName: 'Atravesando la columna',
    icon: '🕳️',
    stage: 'Etapa 3 • Nara',
    stageGroup: 'Etapa 3',
    description: 'Templo Tōdai-ji (Gran Buda).',
    isUnlocked: (ids) => ids.includes('act-16-6')
  },
  {
    id: 'nijo-nightingale-badge',
    name: 'Sello Pasos del Ruiseñor',
    achievementName: 'Alerta Ninja',
    icon: '🐤',
    stage: 'Etapa 3 • Castillo Nijō',
    stageGroup: 'Etapa 3',
    description: 'Castillo Nijō.',
    isUnlocked: (ids) => ids.includes('act-16-14')
  },
  {
    id: 'kiyomizu-badge',
    name: 'Sello Aguas de Otowa',
    achievementName: 'Salud, Éxito y Amor',
    icon: '🍵',
    stage: 'Etapa 3 • Kiyomizu-dera',
    stageGroup: 'Etapa 3',
    description: 'Templo Kiyomizu-dera.',
    isUnlocked: (ids) => ids.includes('act-17-1')
  },
  // Etapa 4: Osaka
  {
    id: 'osaka-castle-badge',
    name: 'Sello El Pez de Oro',
    achievementName: 'El Tigre del Castillo',
    icon: '🏯',
    stage: 'Etapa 4 • Castillo Osaka',
    stageGroup: 'Etapa 4',
    description: 'Castillo Osaka.',
    isUnlocked: (ids) => ids.includes('act-18-1')
  },
  {
    id: 'dotonbori-runner-badge',
    name: 'Sello El Corredor Neón',
    achievementName: 'Victoria en Dōtonbori',
    icon: '🏃',
    stage: 'Etapa 4 • Dōtonbori',
    stageGroup: 'Etapa 4',
    description: 'Dōtonbori / Kani Doraku.',
    isUnlocked: (ids) => ids.includes('act-18-6') || ids.includes('act-18-7')
  },
  {
    id: 'billiken-badge',
    name: 'Sello Cosquillas de la Suerte',
    achievementName: 'El Dios Sonriente',
    icon: '🦶',
    stage: 'Etapa 4 • Shinsekai',
    stageGroup: 'Etapa 4',
    description: 'Tsūtenkaku / Shinsekai (Billiken).',
    isUnlocked: (ids) => ids.includes('act-19-10')
  },
  {
    id: 'nintendo-block-badge',
    name: 'Sello ¡Super Salto!',
    achievementName: 'Reino Champiñón',
    icon: '🍄',
    stage: 'Etapa 4 • Universal Studios',
    stageGroup: 'Etapa 4',
    description: 'Universal Studios Japan (Super Nintendo World).',
    isUnlocked: (ids) => ids.includes('act-20-1')
  },
  // Etapa 5: Tokio (2ª Parte) y Kamakura
  {
    id: 'monjayaki-badge',
    name: 'Sello Chef de la Plancha',
    achievementName: 'Sabor de Tsukishima',
    icon: '🥘',
    stage: 'Etapa 5 • Tsukishima',
    stageGroup: 'Etapa 5',
    description: 'Tsukishima Monja Okoge / Nishinaka dori.',
    isUnlocked: (ids) => ids.includes('act-21-9') || ids.includes('act-21-16')
  },
  {
    id: 'totoro-cream-puff-badge',
    name: 'Sello Héroe del Bosque',
    achievementName: 'Profiterol Totoro',
    icon: '🐱',
    stage: 'Etapa 5 • Shimokitazawa',
    stageGroup: 'Etapa 5',
    description: 'Shiro-Hige’s Cream Puff Factory.',
    isUnlocked: (ids) => ids.includes('act-22-6') || ids.includes('act-22-7') || ids.includes('act-22-8')
  },
  {
    id: 'kamakura-buddha-badge',
    name: 'Sello Gran Buda de Hierro',
    achievementName: 'El Guardián del Océano',
    icon: '🗿',
    stage: 'Etapa 5 • Kamakura',
    stageGroup: 'Etapa 5',
    description: 'Templo Kotoku-in (Gran Buda de Kamakura).',
    isUnlocked: (ids) => ids.includes('act-23-12')
  },
  // Sello Especial Final
  {
    id: 'legend-sun-badge',
    name: 'Sello LEYENDA DEL SOL NACIENTE',
    achievementName: 'Exploradores Expertos de Japón',
    icon: '🏆',
    stage: 'Especial • Gran Logro Final',
    stageGroup: 'Especial',
    description: 'Se activa automáticamente al conseguir al menos 20 sellos de la lista.',
    isUnlocked: (ids, unlockedCount = 0) => unlockedCount >= 20
  }
];

interface GoshuinPassportModalProps {
  isOpen: boolean;
  onClose: () => void;
  stamps?: GoshuinStamp[];
  completedActivityIds?: string[];
}

export const GoshuinPassportModal: React.FC<GoshuinPassportModalProps> = ({
  isOpen,
  onClose,
  stamps = [],
  completedActivityIds = []
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Compute standard unlocked count (excluding legend final badge)
  const standardUnlockedCount = useMemo(() => {
    return FEATURED_BADGES.filter(
      (b) => b.id !== 'legend-sun-badge' && b.isUnlocked(completedActivityIds)
    ).length;
  }, [completedActivityIds]);

  // Compute total unlocked stamps count
  const unlockedBadgesCount = useMemo(() => {
    return FEATURED_BADGES.filter((badge) =>
      badge.isUnlocked(completedActivityIds, standardUnlockedCount)
    ).length;
  }, [completedActivityIds, standardUnlockedCount]);

  // Group badges by Stage Group
  const badgeGroups = useMemo(() => {
    const groups: { stageGroup: string; badges: FeaturedBadge[] }[] = [];
    const stageGroupNames = ['Etapa 0', 'Etapa 1', 'Etapa 2', 'Etapa 3', 'Etapa 4', 'Etapa 5', 'Especial'];

    stageGroupNames.forEach((sg) => {
      const badgesInGroup = FEATURED_BADGES.filter((b) => b.stageGroup === sg);
      if (badgesInGroup.length > 0) {
        groups.push({ stageGroup: sg, badges: badgesInGroup });
      }
    });

    return groups;
  }, []);

  if (!isOpen) return null;

  const totalProgressPercent = Math.round((unlockedBadgesCount / 31) * 100);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="bg-[#FFFDF9] dark:bg-slate-900 border-4 border-rose-600/60 rounded-3xl p-4 sm:p-6 max-w-3xl w-full shadow-2xl relative overflow-hidden text-slate-900 dark:text-slate-100 space-y-4 max-h-[92vh] overflow-y-auto animate-bubble-pop"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b-2 border-dashed border-rose-300 dark:border-slate-700 pb-3">
          <div className="space-y-1">
            <span className="text-xs font-black uppercase text-rose-600 dark:text-rose-400 bg-rose-100 dark:bg-rose-950 px-3 py-1 rounded-full border border-rose-300 flex items-center gap-1.5 w-fit">
              <Award className="w-3.5 h-3.5" />
              御朱印帳 • Pasaporte Kawaii de Sellos (Sprint 8)
            </span>
            <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
              GOSHUIN STAMP ALBUM (御朱印)
            </h2>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 font-bold">
              Bitácora de Logros Completa: Marca como completadas las actividades en el itinerario para estampación automática.
            </p>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center shrink-0 border border-slate-200 dark:border-slate-700 squishy"
            aria-label="Cerrar pasaporte"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Global Progress Header Counter */}
        <div className="bg-gradient-to-r from-rose-600 via-amber-500 to-emerald-600 text-white p-3.5 rounded-2xl space-y-2 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-amber-200" />
              <span className="text-xs font-black uppercase tracking-wider">
                Progreso del Álbun Goshuin:
              </span>
            </div>
            <span className="bg-white text-rose-700 font-black text-xs sm:text-sm px-3 py-0.5 rounded-full shadow-xs">
              [{unlockedBadgesCount} / 31 Sellos Conseguidos] 💮
            </span>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-slate-900/40 h-2.5 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-gradient-to-r from-amber-300 to-emerald-300 h-full rounded-full transition-all duration-500"
              style={{ width: `${totalProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Adaptive Grid View (3 Cols Mobile, 4 Cols Desktop) Grouped by Stages */}
        <div className="space-y-5 pt-1">
          {badgeGroups.map((group) => (
            <div key={group.stageGroup} className="space-y-2">
              <div className="flex items-center gap-2 border-b border-rose-200/80 dark:border-slate-800 pb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <h3 className="text-xs font-black uppercase tracking-wider text-rose-700 dark:text-rose-400">
                  {group.stageGroup === 'Especial' ? '🏆 Gran Logro Final Leyenda' : group.stageGroup}
                </h3>
              </div>

              {/* 3 Cols Mobile, 4 Cols Desktop Grid */}
              <div className="grid grid-cols-3 md:grid-cols-4 gap-2 sm:gap-2.5">
                {group.badges.map((badge) => {
                  const unlocked = badge.isUnlocked(completedActivityIds, standardUnlockedCount);

                  return (
                    <div
                      key={badge.id}
                      className={`p-2 sm:p-2.5 rounded-2xl border-2 transition-all relative overflow-hidden flex flex-col justify-between select-none squishy ${
                        unlocked
                          ? badge.id === 'legend-sun-badge'
                            ? 'bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 dark:from-amber-950/80 dark:to-yellow-900/80 border-amber-500 shadow-md col-span-3 md:col-span-4'
                            : 'bg-rose-50/90 dark:bg-slate-850 border-rose-500 shadow-sm'
                          : 'bg-slate-100/60 dark:bg-slate-850/40 border-slate-300 dark:border-slate-700 opacity-60 grayscale'
                      }`}
                    >
                      {/* Physical Stamp Press & Kumo Cloud Effect for Unlocked */}
                      <div className="flex items-start justify-between gap-1 mb-1 relative">
                        {unlocked ? (
                          <div className="relative">
                            {/* Kumo Japanese Cloud Smoke Puff */}
                            <span className="absolute -top-3 -right-3 text-xs opacity-70 animate-kumo-smoke pointer-events-none">
                              ☁️
                            </span>
                            {/* Shu-iro Traditional Red Ink Ring with Press Effect */}
                            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border-2 border-rose-600 dark:border-rose-500 bg-rose-100 dark:bg-rose-950/80 flex flex-col items-center justify-center text-lg sm:text-xl shrink-0 shadow-inner animate-stamp-press">
                              <span>{badge.icon}</span>
                              <span className="text-[6px] font-black uppercase text-rose-700 dark:text-rose-300 tracking-tighter -mt-1">
                                奉納
                              </span>
                            </div>
                          </div>
                        ) : (
                          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full border border-slate-300 dark:border-slate-700 bg-slate-200/50 dark:bg-slate-800 flex items-center justify-center text-base shrink-0">
                            <Lock className="w-4 h-4 text-slate-400" />
                          </div>
                        )}

                        {unlocked ? (
                          <span className="text-[8px] font-black uppercase bg-emerald-500 text-white px-1.5 py-0.5 rounded-full flex items-center gap-0.5 shrink-0">
                            <CheckCircle2 className="w-2.5 h-2.5" />
                            OK
                          </span>
                        ) : (
                          <span className="text-[8px] font-black uppercase bg-slate-200 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded-full shrink-0">
                            🔒
                          </span>
                        )}
                      </div>

                      <div className="space-y-0.5 mt-1">
                        <span className="text-[8px] font-black uppercase text-rose-600 dark:text-rose-400 block truncate">
                          {badge.achievementName}
                        </span>
                        <h4 className="text-[11px] sm:text-xs font-black text-slate-900 dark:text-white leading-tight line-clamp-2">
                          {badge.name}
                        </h4>
                        <p className="text-[9px] text-slate-500 dark:text-slate-400 leading-tight line-clamp-2 mt-0.5">
                          {unlocked ? badge.description : 'Por descubrir...'}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="pt-2 text-center border-t border-slate-100 dark:border-slate-800">
          <p className="text-[11px] font-bold text-slate-400">
            ¡Sigue explorando el itinerario para completar los sellos Goshuin de todo Japón!
          </p>
        </div>
      </div>
    </div>
  );
};
