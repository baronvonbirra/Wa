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
      <div className="max-w-4xl mx-auto my-12 p-8 bg-white border-8 border-indigo-200 rounded-[36px] shadow-xl text-center sparkle-pattern">
        <div className="text-8xl mb-4 animate-bounce">👨‍👩‍👧‍👦</div>
        <h2 className="text-3xl font-black text-indigo-900 mb-2">Hello, Family Guide!</h2>
        <p className="text-slate-600 mb-6 max-w-lg mx-auto font-bold text-sm">
          Welcome to the family travel command center. To start learning or playing games, please select either
          <strong> James</strong> or <strong>Lily</strong> in the switcher above.
        </p>
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => switchPlayer('james')}
            className="bg-rose-500 hover:bg-rose-600 text-white font-black px-8 py-4 rounded-3xl border-4 border-rose-700 shadow-lg transform active:translate-y-1 transition-all"
          >
            Play as James 👱‍♂️
          </button>
          <button
            onClick={() => switchPlayer('lily')}
            className="bg-amber-500 hover:bg-amber-600 text-white font-black px-8 py-4 rounded-3xl border-4 border-amber-700 shadow-lg transform active:translate-y-1 transition-all"
          >
            Play as Lily 👱‍♀️
          </button>
        </div>
      </div>
    );
  }

  const profile = state.profiles[active];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Dynamic Kid-Friendly Hero Banner */}
      <div className="bg-gradient-to-r from-rose-100 via-amber-50 to-emerald-100 border-8 border-rose-300 rounded-[36px] p-6 md:p-8 mb-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Floating clouds/circles background */}
        <div className="absolute top-0 right-10 w-24 h-24 bg-white/40 rounded-full filter blur-xl"></div>
        <div className="absolute -bottom-5 left-10 w-32 h-32 bg-yellow-100/40 rounded-full filter blur-xl"></div>

        <div className="flex-1 relative z-10">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-7xl animate-soft">{profile.avatar}</span>
            <div>
              <h2 className="text-3xl font-black text-rose-950 flex items-center gap-2 drop-shadow-sm">
                Hey {profile.name}! <span className="text-xs font-black bg-rose-600 text-white px-3 py-1 rounded-full border-2 border-white animate-pulse">Level {profile.level}</span>
              </h2>
              <p className="text-sm font-black text-amber-800 bg-white/70 px-3 py-0.5 rounded-full inline-block mt-1">⭐️ {profile.totalXP} Total XP Points</p>
            </div>
          </div>
          <p className="text-rose-900 font-extrabold text-sm md:text-base leading-relaxed">
            Let's go on an amazing journey! Pick a place on the map, play games, and collect cute stickers!
          </p>
        </div>

        {/* Fact Highlight inside a bubble */}
        {profile.unlockedFacts.length > 0 && (
          <div className="bg-white border-4 border-amber-300 p-5 rounded-[28px] shadow-md max-w-sm w-full relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl animate-wiggle inline-block">💡</span>
              <h4 className="text-xs font-black text-amber-800 uppercase tracking-wider">Super Japan Fact!</h4>
            </div>
            <p className="text-xs font-bold text-slate-700 leading-relaxed italic">
              "{profile.unlockedFacts[profile.unlockedFacts.length - 1]}"
            </p>
            <p className="text-[10px] text-rose-600 font-black mt-3 text-right bg-rose-50 px-2 py-1 rounded-full inline-block float-right">
              🔮 {profile.unlockedFacts.length} total facts unlocked!
            </p>
          </div>
        )}
      </div>

      {/* Progress Path */}
      <div className="mb-6">
        <h3 className="text-2xl font-black text-slate-800 flex items-center gap-2.5 mb-6">
          <span>🗺️</span> Pick Your Destination Quest!
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DESTINATIONS_DATA.map((dest, idx) => {
            const isUnlocked = profile.unlockedDestinations[dest.id];
            const masteredCount = profile.masteredVocab[dest.id]?.length || 0;
            const totalCount = dest.vocabList.length;
            const percentage = Math.round((masteredCount / totalCount) * 100);

            return (
              <div
                key={dest.id}
                className={`relative bg-white rounded-[32px] border-4 transition-all duration-300 flex flex-col justify-between shadow-md overflow-hidden ${
                  isUnlocked
                    ? 'border-rose-200 hover:border-rose-400 hover:-translate-y-1 hover:shadow-xl'
                    : 'border-slate-200 bg-slate-50 opacity-80'
                }`}
              >
                {/* Lock Overlay */}
                {!isUnlocked && (
                  <div className="absolute inset-0 bg-slate-900/15 backdrop-blur-[1px] flex flex-col items-center justify-center p-4 text-center z-10 rounded-2xl">
                    <div className="bg-slate-800 text-white p-4 rounded-full shadow-lg mb-3 border-2 border-white">
                      <span className="text-3xl">🔒</span>
                    </div>
                    <p className="text-xs font-black text-slate-800 bg-white px-4 py-2 rounded-2xl border-2 border-slate-300 shadow-md max-w-[200px]">
                      Master 50% of the previous location to unlock!
                    </p>
                  </div>
                )}

                <div className="p-6">
                  {/* Title Bar */}
                  <div className="flex justify-between items-start gap-2 mb-3">
                    <div>
                      <span className="text-xs font-black bg-rose-100 text-rose-700 px-3 py-1 rounded-full border border-rose-200">
                        {dest.theme}
                      </span>
                      <h4 className="text-2xl font-black text-slate-800 mt-2">{dest.name}</h4>
                    </div>
                    <span className="text-5xl animate-soft inline-block">{dest.emoji}</span>
                  </div>

                  <p className="text-xs font-bold text-slate-500 leading-relaxed mb-4">{dest.description}</p>

                  <div className="flex items-center gap-3 text-xs font-black text-slate-600 mb-4 bg-slate-50 p-2.5 rounded-2xl border-2 border-slate-100">
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
                      <div className="flex justify-between items-center text-xs font-black text-slate-600 mb-1.5">
                        <span>Words Mastered</span>
                        <span>{masteredCount} / {totalCount} words ({percentage}%)</span>
                      </div>
                      <div className="w-full bg-slate-100 h-4 rounded-full overflow-hidden border-2 border-slate-200">
                        <div
                          className="bg-emerald-400 h-full rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        ></div>
                      </div>
                      {percentage >= 50 ? (
                        <p className="text-[11px] text-emerald-600 font-black mt-2 flex items-center gap-1.5">
                          <span>🎉</span> Passport Stamp Unlocked! 🎟️
                        </p>
                      ) : (
                        <p className="text-[11px] text-slate-500 font-bold mt-2">
                          Get 50% ({Math.ceil(totalCount / 2)} words) to win this stamp!
                        </p>
                      )}
                    </div>
                  )}
                </div>

                {isUnlocked && (
                  <div className="p-6 pt-0 bg-slate-50 border-t-2 border-slate-100">
                    <button
                      onClick={() => onSelectDestination(dest.id)}
                      className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black text-sm py-3.5 rounded-2xl shadow-md transition-all border-b-4 border-rose-700 active:border-b-0 active:translate-y-1 flex items-center justify-center gap-2"
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
