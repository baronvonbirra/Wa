import React from 'react';
import { useAppState } from '../state/AppContext';
import { DESTINATIONS_DATA } from '../data/destinations';

interface WeakAreaRecommendationProps {
  onSelectDestination: (destId: string) => void;
}

export const WeakAreaRecommendation: React.FC<WeakAreaRecommendationProps> = ({ onSelectDestination }) => {
  const { state, updateXP } = useAppState();
  const activeKid = state.activePlayer === 'parent' ? 'james' : state.activePlayer;
  const profile = state.profiles[activeKid];

  // Helper to find weak words (accuracy < 75% and attempts >= 2)
  const getWeakWords = () => {
    const weakList: { id: string; english: string; japanese: string; category: string; destId: string; destName: string }[] = [];

    DESTINATIONS_DATA.forEach((dest) => {
      dest.vocabList.forEach((vocab) => {
        const stats = profile.vocabStats[vocab.id];
        if (stats && stats.attempts >= 2) {
          const accuracy = stats.correct / stats.attempts;
          if (accuracy < 0.75) {
            weakList.push({
              id: vocab.id,
              english: vocab.english,
              japanese: vocab.japanese,
              category: vocab.category,
              destId: dest.id,
              destName: dest.name
            });
          }
        }
      });
    });

    return weakList;
  };

  const weakWords = getWeakWords();

  // If they have no weak words, provide a default positive encouragement or suggest a random topic to explore
  if (weakWords.length === 0) {
    return (
      <div className="bg-gradient-to-r from-emerald-50 to-teal-50 border-4 border-emerald-300 p-5 rounded-[28px] shadow-sm relative overflow-hidden flex flex-col sm:flex-row items-center gap-4">
        <span className="text-5xl animate-soft">🎯</span>
        <div className="text-center sm:text-left flex-grow">
          <h4 className="text-sm font-black text-emerald-950 uppercase tracking-wide">Perfect Learning Accuracy!</h4>
          <p className="text-xs text-slate-600 font-bold mt-1">
            Amazing job, {profile.name}! You are nailing every vocabulary card! Keep practicing on the map to unlock rare stamps.
          </p>
        </div>
      </div>
    );
  }

  // Group by destination to suggest a targeted place to review
  const suggestionsMap: { [destId: string]: { destName: string; count: number; words: string[] } } = {};
  weakWords.forEach(w => {
    if (!suggestionsMap[w.destId]) {
      suggestionsMap[w.destId] = { destName: w.destName, count: 0, words: [] };
    }
    suggestionsMap[w.destId].count += 1;
    suggestionsMap[w.destId].words.push(w.english);
  });

  // Pick the destination with the most weak words
  const sortedSuggestions = Object.entries(suggestionsMap).sort((a, b) => b[1].count - a[1].count);
  const [bestDestId, bestDestData] = sortedSuggestions[0];

  const handleReviewClick = () => {
    // Reward small coin bonus for addressing weak areas!
    updateXP(activeKid, 20);
    alert(`👏 Awesome spirit! You gained +20 Coins for taking the challenge! Let's travel to ${bestDestData.destName}!`);
    onSelectDestination(bestDestId);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-4 border-indigo-300 p-5 rounded-[28px] shadow-sm relative overflow-hidden flex flex-col sm:flex-row items-center gap-5">
      {/* Visual Indicator */}
      <div className="w-16 h-16 rounded-full bg-white border-2 border-indigo-200 flex items-center justify-center text-4xl shadow-md flex-shrink-0 animate-wiggle">
        💡
      </div>

      <div className="text-center sm:text-left flex-grow">
        <div className="flex flex-col sm:flex-row items-center gap-2 mb-1 justify-center sm:justify-start">
          <span className="text-[10px] font-black uppercase text-indigo-700 tracking-wider bg-white border border-indigo-150 px-2.5 py-0.5 rounded-full">
            Smart Recommendation
          </span>
          <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 animate-pulse">
            +20 Coins Bonus!
          </span>
        </div>

        <h4 className="text-sm font-black text-slate-800 leading-snug">
          Hey {profile.name}! Practice makes perfect!
        </h4>
        <p className="text-xs text-slate-500 font-extrabold mt-1 leading-relaxed">
          It looks like you found some cards a bit tricky in <strong className="text-indigo-900">{bestDestData.destName}</strong> (such as <strong className="italic">"{bestDestData.words.slice(0, 3).join(', ')}"</strong>). Let's review this place together!
        </p>
      </div>

      <div className="flex-shrink-0 w-full sm:w-auto">
        <button
          onClick={handleReviewClick}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs py-3 px-6 rounded-2xl shadow-md border-b-4 border-indigo-800 active:border-b-0 active:translate-y-0.5 transition-all text-center block"
        >
          🚀 Accept Challenge!
        </button>
      </div>
    </div>
  );
};
export default WeakAreaRecommendation;
