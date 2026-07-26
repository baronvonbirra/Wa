import React from 'react';
import { useAppState } from '../state/AppContext';
import { DESTINATIONS_DATA } from '../data/destinations';

interface DestinationMapProps {
  onSelectDestination: (destId: string) => void;
}

export const DestinationMap: React.FC<DestinationMapProps> = ({ onSelectDestination }) => {
  const { state, switchPlayer } = useAppState();
  const active = state.activePlayer;

  // Render a friendly message if the active player is "parent" so they know they need to play as a kid
  if (active === 'parent') {
    return (
      <div className="max-w-4xl mx-auto my-12 p-8 bg-white border border-indigo-100 rounded-3xl shadow-xl text-center">
        <div className="text-6xl mb-4">👨‍👩‍👧‍👦</div>
        <h2 className="text-2xl font-black text-indigo-900 mb-2">Hello, Parent Guide!</h2>
        <p className="text-slate-600 mb-6 max-w-lg mx-auto">
          Welcome to the family travel command center. To start learning or playing games, please select either
          <strong> James</strong> or <strong>Lily</strong> in the switcher above.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => switchPlayer('james')}
            className="bg-rose-500 hover:bg-rose-600 text-white font-black px-6 py-3 rounded-2xl shadow-lg transform active:scale-95 transition-all"
          >
            Play as James 👧
          </button>
          <button
            onClick={() => switchPlayer('lily')}
            className="bg-amber-500 hover:bg-amber-600 text-white font-black px-6 py-3 rounded-2xl shadow-lg transform active:scale-95 transition-all"
          >
            Play as Lily 👦
          </button>
        </div>
      </div>
    );
  }

  const profile = state.profiles[active];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Intro Hero banner */}
      <div className="bg-gradient-to-r from-rose-50 to-amber-50 border border-rose-100 rounded-3xl p-6 md:p-8 mb-8 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-4xl">{profile.avatar}</span>
            <div>
              <h2 className="text-2xl font-black text-rose-950 flex items-center gap-2">
                Hey {profile.name}! <span className="text-sm font-bold bg-rose-600 text-white px-2.5 py-0.5 rounded-full">Level {profile.level}</span>
              </h2>
              <p className="text-sm font-medium text-amber-900">{profile.totalXP} Total XP earned</p>
            </div>
          </div>
          <p className="text-slate-600 text-sm md:text-base mt-2">
            Ready to explore Japan? Complete your lessons, unlock new destinations, and fill up your passport with cute stamps!
          </p>
        </div>

        {/* Fact Highlight */}
        {profile.unlockedFacts.length > 0 && (
          <div className="bg-white border border-rose-100 p-4 rounded-2xl shadow-sm max-w-sm w-full">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-lg">💡</span>
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider">Unlocked Japan Fact</h4>
            </div>
            <p className="text-sm font-medium text-slate-700 italic">
              "{profile.unlockedFacts[profile.unlockedFacts.length - 1]}"
            </p>
            <p className="text-[11px] text-rose-500 font-bold mt-2 text-right">
              ({profile.unlockedFacts.length} total facts unlocked!)
            </p>
          </div>
        )}
      </div>

      {/* Progress Path */}
      <div className="mb-6">
        <h3 className="text-xl font-black text-slate-800 flex items-center gap-2 mb-4">
          🗺️ Choose Your Destination Adventure
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DESTINATIONS_DATA.map((dest, idx) => {
            const isUnlocked = profile.unlockedDestinations[dest.id];
            const masteredCount = profile.masteredVocab[dest.id]?.length || 0;
            const totalCount = dest.vocabList.length;
            const percentage = Math.round((masteredCount / totalCount) * 100);

            return (
              <div
                key={dest.id}
                className={`relative bg-white rounded-3xl border transition-all duration-300 flex flex-col justify-between shadow-sm overflow-hidden ${
                  isUnlocked
                    ? 'border-rose-100 hover:border-rose-300 hover:shadow-lg'
                    : 'border-slate-100 bg-slate-50 opacity-75'
                }`}
              >
                {/* Lock Overlay */}
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-slate-900/10 backdrop-blur-[1px] flex flex-col items-center justify-center p-4 text-center z-10 rounded-3xl">
                    <div className="bg-slate-800 text-white p-3 rounded-full shadow-lg mb-2">
                      <span className="text-2xl">🔒</span>
                    </div>
                    <p className="text-sm font-extrabold text-slate-800 bg-white/95 px-3 py-1.5 rounded-xl border border-slate-300 shadow-sm">
                      Master 50% of the previous location to unlock!
                    </p>
                  </div>
                )}

                <div className="p-6">
                  {/* Title Bar */}
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <div>
                      <span className="text-xs font-extrabold bg-rose-50 text-rose-600 px-2.5 py-0.5 rounded-full border border-rose-100">
                        {dest.theme}
                      </span>
                      <h4 className="text-xl font-black text-slate-800 mt-1">{dest.name}</h4>
                    </div>
                    <span className="text-4xl">{dest.emoji}</span>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed mb-4">{dest.description}</p>

                  <div className="flex items-center gap-4 text-xs font-bold text-slate-500 mb-4 bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                    <div>
                      <span className="text-slate-400">Target:</span> {dest.ageFocus}
                    </div>
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full"></div>
                    <div>
                      <span className="text-slate-400">Words:</span> {dest.vocabCount}
                    </div>
                  </div>

                  {/* Progress gauge */}
                  {isUnlocked && (
                    <div className="mb-2">
                      <div className="flex justify-between items-center text-xs font-bold text-slate-600 mb-1">
                        <span>Destination Mastered</span>
                        <span>{masteredCount} / {totalCount} words ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      {percentage >= 50 ? (
                        <p className="text-[10px] text-emerald-600 font-bold mt-1 flex items-center gap-1">
                          🎉 Passport Stamp Unlocked! 🎟️
                        </p>
                      ) : (
                        <p className="text-[10px] text-slate-400 font-bold mt-1">
                          Get to 50% ({Math.ceil(totalCount / 2)} words) to win this stamp & unlock next location!
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {isUnlocked && (
                  <div className="p-6 pt-0 bg-slate-50/50 border-t border-slate-100">
                    <button
                      onClick={() => onSelectDestination(dest.id)}
                      className="w-full bg-rose-500 hover:bg-rose-600 active:scale-95 text-white font-extrabold text-sm py-3 rounded-2xl shadow-md transition-all flex items-center justify-center gap-2"
                    >
                      <span>🚀</span> Enter Destination Quest
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
export default DestinationMap;
