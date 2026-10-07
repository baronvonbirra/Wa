import React, { useState } from 'react';
import { useWa2 } from '../../state/Wa2Context';
import { SurvivalPhrase, SurvivalCategory } from '../../state/wa2Types';
import {
  Volume2,
  Maximize2,
  BookOpen,
  GraduationCap,
  Sparkles,
  Utensils,
  ShoppingBag,
  Train,
  AlertTriangle,
  HelpCircle,
  Search
} from 'lucide-react';

interface SurvivalPhrasesViewProps {
  onOpenWaLearn: () => void;
}

export const SurvivalPhrasesView: React.FC<SurvivalPhrasesViewProps> = ({ onOpenWaLearn }) => {
  const { waState } = useWa2();

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [largePhrase, setLargePhrase] = useState<SurvivalPhrase | null>(null);

  const categoriesList: { id: SurvivalCategory; label: string; icon: any; color: string }[] = [
    { id: 'basic', label: 'Básicas', icon: HelpCircle, color: 'bg-rose-100 text-rose-800 border-rose-200' },
    { id: 'restaurant', label: 'Restaurante', icon: Utensils, color: 'bg-amber-100 text-amber-800 border-amber-200' },
    { id: 'shopping', label: 'Compras', icon: ShoppingBag, color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
    { id: 'transport', label: 'Transporte', icon: Train, color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { id: 'emergency', label: 'Emergencias', icon: AlertTriangle, color: 'bg-red-100 text-red-800 border-red-200' },
  ];

  const filteredPhrases = waState.survivalPhrases.filter(phrase => {
    const matchesCat = selectedCategory === 'all' || phrase.category === selectedCategory;
    const matchesSearch =
      phrase.spanish.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phrase.romaji.toLowerCase().includes(searchQuery.toLowerCase()) ||
      phrase.japanese.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop active audio
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'ja-JP';
      utterance.rate = 0.85; // Slightly slower for clear pronunciation
      window.speechSynthesis.speak(utterance);
    } else {
      alert("El navegador no soporta síntesis de voz Web Speech API.");
    }
  };

  const getCategoryInfo = (catId: SurvivalCategory) => {
    return categoriesList.find(c => c.id === catId) || {
      id: catId,
      label: catId,
      icon: BookOpen,
      color: 'bg-slate-100 text-slate-800 border-slate-200'
    };
  };

  return (
    <div className="pb-24 pt-2 max-w-md mx-auto px-4 space-y-4">
      {/* Wa 1.0 Integration Banner */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-rose-500 text-white rounded-3xl p-4 shadow-lg border border-purple-300 relative overflow-hidden">
        <div className="flex items-center justify-between gap-3 relative z-10">
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full inline-block mb-1">
              Wa 1.0 • Módulo de Aprendizaje
            </span>
            <h2 className="text-base font-black tracking-tight flex items-center gap-1.5">
              <span>🏯</span> JAPAN QUEST — WA LEARN
            </h2>
            <p className="text-[11px] text-purple-100 font-medium mt-0.5">
              Juegos de vocabulario, frases, gramática y passport stamps para toda la familia.
            </p>
          </div>

          <button
            onClick={onOpenWaLearn}
            className="bg-amber-400 hover:bg-amber-300 text-slate-900 font-black text-xs px-3.5 py-2.5 rounded-2xl border-b-2 border-amber-600 active:translate-y-0.5 transition-all shadow-md flex-shrink-0 flex items-center gap-1"
          >
            <GraduationCap className="w-4 h-4" />
            <span>Jugar Wa 1.0</span>
          </button>
        </div>
      </div>

      {/* Survival Phrases Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-black text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
            <BookOpen className="w-4 h-4 text-rose-500" />
            Frases de Supervivencia ({filteredPhrases.length})
          </h2>
          <p className="text-[10px] text-slate-400 font-bold">Guía rápida de conversación en japonés</p>
        </div>
      </div>

      {/* Category Pills & Search */}
      <div className="bg-white rounded-2xl p-3 shadow-sm border border-rose-100 space-y-2">
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar frase en español, romaji o kanji..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500 font-semibold"
          />
        </div>

        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-rose-200 border-t border-slate-100 pt-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 text-xs font-black rounded-xl border flex-shrink-0 transition-all ${
              selectedCategory === 'all'
                ? 'bg-rose-500 text-white border-rose-600 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-rose-50'
            }`}
          >
            Todas ({waState.survivalPhrases.length})
          </button>
          {categoriesList.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 text-xs font-black rounded-xl border flex-shrink-0 transition-all ${
                selectedCategory === cat.id
                  ? 'bg-rose-500 text-white border-rose-600 shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-rose-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Phrases Cards List */}
      <div className="space-y-3">
        {filteredPhrases.map((phrase) => {
          const catInfo = getCategoryInfo(phrase.category);
          const CategoryIcon = catInfo.icon;

          return (
            <div
              key={phrase.id}
              className="bg-white border-2 border-rose-100 hover:border-rose-300 rounded-2xl p-3.5 shadow-sm space-y-2 transition-all"
            >
              <div className="flex items-start justify-between gap-2">
                <span className={`text-[9px] font-black px-2 py-0.5 rounded border flex items-center gap-1 ${catInfo.color}`}>
                  <CategoryIcon className="w-2.5 h-2.5" />
                  {catInfo.label}
                </span>

                <div className="flex items-center gap-1">
                  {/* TTS Speech Button */}
                  <button
                    onClick={() => handleSpeak(phrase.japanese)}
                    className="bg-emerald-50 hover:bg-emerald-100 text-emerald-700 font-black text-[11px] px-2.5 py-1 rounded-xl border border-emerald-200 flex items-center gap-1 active:scale-95 transition-all"
                    title="Escuchar Pronunciación"
                  >
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>Oír</span>
                  </button>

                  {/* Show to Staff Large Text Button */}
                  <button
                    onClick={() => setLargePhrase(phrase)}
                    className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-black text-[11px] px-2.5 py-1 rounded-xl border border-rose-200 flex items-center gap-1 active:scale-95 transition-all"
                    title="Mostrar a Empleado"
                  >
                    <Maximize2 className="w-3.5 h-3.5" />
                    <span>Mostrar</span>
                  </button>
                </div>
              </div>

              {/* Japanese Kanji/Kana */}
              <div>
                <strong className="text-xl font-black text-slate-900 block tracking-wide">
                  {phrase.japanese}
                </strong>
                <span className="text-xs font-bold text-rose-600 block mt-0.5">
                  🗣️ {phrase.romaji}
                </span>
              </div>

              {/* Spanish Translation */}
              <p className="text-xs text-slate-600 pt-1.5 border-t border-slate-100 font-medium">
                🇪🇸 {phrase.spanish}
              </p>
            </div>
          );
        })}
      </div>

      {/* Large Text Modal for Showing to Employees */}
      {largePhrase && (
        <div className="fixed inset-0 bg-slate-900/95 backdrop-blur-md z-50 flex items-center justify-center p-6">
          <div className="bg-white border-8 border-rose-400 rounded-3xl p-6 shadow-2xl max-w-md w-full text-center relative space-y-6 animate-scaleUp">
            <button
              onClick={() => setLargePhrase(null)}
              className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-600 font-extrabold p-2 rounded-full h-9 w-9 flex items-center justify-center text-sm"
            >
              ✕
            </button>

            <div>
              <span className="text-xs font-black text-rose-500 bg-rose-50 px-3 py-1 rounded-full uppercase border border-rose-200 inline-block mb-2">
                Modo Mostrar a Empleado
              </span>
              <p className="text-sm font-bold text-slate-500">Muestra la pantalla al personal del establecimiento</p>
            </div>

            {/* Giant Kanji typography */}
            <div className="bg-slate-50 border-4 border-slate-900 rounded-3xl p-6 shadow-inner my-4">
              <strong className="text-4xl md:text-5xl font-black text-slate-900 block leading-tight tracking-wide">
                {largePhrase.japanese}
              </strong>
              <span className="text-base font-extrabold text-rose-600 block mt-3">
                {largePhrase.romaji}
              </span>
            </div>

            <p className="text-sm font-bold text-slate-700">
              🇪🇸 "{largePhrase.spanish}"
            </p>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => handleSpeak(largePhrase.japanese)}
                className="w-1/2 py-3 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <Volume2 className="w-4 h-4" />
                <span>Reproducir Voz</span>
              </button>

              <button
                onClick={() => setLargePhrase(null)}
                className="w-1/2 py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
