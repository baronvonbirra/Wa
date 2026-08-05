import React, { useState } from 'react';
import { useAppState } from '../state/AppContext';
import { DESTINATIONS_DATA } from '../data/destinations';
import { AvatarCustomizer } from './AvatarCustomizer';
import { StickerStore } from './StickerStore';
import { DailyQuests } from './DailyQuests';
import { WeakAreaRecommendation } from './WeakAreaRecommendation';
import { TripCountdownTimeline } from './TripCountdownTimeline';

interface DestinationMapProps {
  onSelectDestination: (destId: string) => void;
}

export const DestinationMap: React.FC<DestinationMapProps> = ({ onSelectDestination }) => {
  const { state, switchPlayer } = useAppState();
  const active = state.activePlayer;
  const [isFactBookOpen, setIsFactBookOpen] = useState(false);
  const [isAvatarOpen, setIsAvatarOpen] = useState(false);
  const [isStickerStoreOpen, setIsStickerStoreOpen] = useState(false);

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
            Play as James 👦🏻
          </button>
          <button
            onClick={() => switchPlayer('lily')}
            className="bg-amber-500 hover:bg-amber-600 text-white font-black px-8 py-4 rounded-3xl border-4 border-amber-700 shadow-lg transform active:translate-y-1 transition-all"
          >
            Play as Lily 👧🏻
          </button>
        </div>
      </div>
    );
  }

  const profile = state.profiles[active];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Avatar Customizer modal */}
      {isAvatarOpen && (
        <AvatarCustomizer onClose={() => setIsAvatarOpen(false)} />
      )}

      {/* Sticker Store modal */}
      {isStickerStoreOpen && (
        <StickerStore onClose={() => setIsStickerStoreOpen(false)} />
      )}

      {/* Dynamic Kid-Friendly Hero Banner */}
      <div className="bg-gradient-to-r from-rose-100 via-amber-50 to-emerald-100 border-8 border-rose-300 rounded-[36px] p-6 md:p-8 shadow-md flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
        {/* Floating clouds/circles background */}
        <div className="absolute top-0 right-10 w-24 h-24 bg-white/40 rounded-full filter blur-xl"></div>
        <div className="absolute -bottom-5 left-10 w-32 h-32 bg-yellow-100/40 rounded-full filter blur-xl"></div>

        <div className="flex-1 relative z-10">
          <div className="flex items-center gap-4 mb-3">
            <div className="relative group cursor-pointer" onClick={() => setIsAvatarOpen(true)}>
              <div className="relative w-24 h-24 bg-white rounded-full shadow-md border-4 border-rose-300 flex items-center justify-center overflow-visible animate-soft">
                {/* Accessory/Hair background or overlay */}
                <div className="absolute top-0 text-xl z-10 select-none">
                  {profile.avatarCustomization?.hair?.startsWith("🎀") ? "💇" : profile.avatarCustomization?.hair?.split(" ")[0] || "💇"}
                </div>
                {/* Face Emoji */}
                <div className="text-5xl select-none relative z-0">{profile.avatarCustomization?.face || profile.avatar}</div>
                {/* Outfit overlay below face */}
                <div className="absolute -bottom-1 text-2xl bg-white/90 rounded-full p-1 shadow-md border border-rose-100 z-10 select-none">
                  {profile.avatarCustomization?.outfit?.split(" ")[0] || "🧥"}
                </div>
              </div>
              <span className="absolute -bottom-1 -right-1 bg-rose-500 text-white border-2 border-white text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-md animate-bounce">EDIT</span>
            </div>
            <div>
              <h2 className="text-3xl font-black text-rose-950 flex items-center gap-2 drop-shadow-sm">
                Hey {profile.avatarCustomization?.customName || profile.name}! <span className="text-xs font-black bg-rose-600 text-white px-3 py-1 rounded-full border-2 border-white animate-pulse">Level {profile.level}</span>
              </h2>
              <div className="flex flex-wrap gap-2 mt-1.5">
                <span className="text-xs font-black text-amber-800 bg-white/75 px-3 py-1 rounded-full border border-amber-200">⭐️ {profile.totalXP} Total XP</span>
                <span className="text-xs font-black text-rose-800 bg-white/75 px-3 py-1 rounded-full border border-rose-200">🪙 {profile.spendableXP} Coins</span>
                <button
                  onClick={() => setIsAvatarOpen(true)}
                  className="text-xs font-black text-rose-600 bg-white hover:bg-rose-50 border border-rose-300 px-3 py-1 rounded-full transition-all flex items-center gap-1 shadow-sm active:translate-y-0.5"
                >
                  🎨 Customize Avatar
                </button>
                <button
                  onClick={() => setIsStickerStoreOpen(true)}
                  className="text-xs font-black text-amber-600 bg-white hover:bg-amber-50 border border-amber-300 px-3 py-1 rounded-full transition-all flex items-center gap-1 shadow-sm active:translate-y-0.5"
                >
                  🎫 Sticker Store
                </button>
              </div>
            </div>
          </div>
          <p className="text-rose-900 font-extrabold text-sm md:text-base leading-relaxed">
            Let's go on an amazing journey! Pick a place on the map, play games, and collect cute stickers!
          </p>
        </div>

        {/* Fact Highlight inside a bubble or generic button if no facts unlocked */}
        <div className="bg-white border-4 border-amber-300 p-5 rounded-[28px] shadow-md max-w-sm w-full relative z-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl animate-wiggle inline-block">💡</span>
              <h4 className="text-xs font-black text-amber-800 uppercase tracking-wider">Super Japan Fact!</h4>
            </div>
            {profile.unlockedFacts.length > 0 ? (
              <p className="text-xs font-bold text-slate-700 leading-relaxed italic">
                "{profile.unlockedFacts[profile.unlockedFacts.length - 1]}"
              </p>
            ) : (
              <p className="text-xs font-bold text-slate-500 leading-relaxed italic">
                Play games to unlock amazing travel trivia facts about Japan!
              </p>
            )}
          </div>
          <button
            onClick={() => setIsFactBookOpen(true)}
            className="mt-4 w-full bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs py-2 px-4 rounded-xl border-b-2 border-amber-600 active:border-b-0 active:translate-y-0.5 transition-all flex items-center justify-center gap-2"
          >
            📚 My Fact Book ({profile.unlockedFacts.length})
          </button>
        </div>
      </div>

      {/* Unlocked Facts Modal */}
      {isFactBookOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4 animate-fade-in">
          <div className="bg-white border-8 border-amber-400 rounded-[36px] max-w-lg w-full p-6 shadow-2xl relative max-h-[85vh] flex flex-col">
            {/* Close button */}
            <button
              onClick={() => setIsFactBookOpen(false)}
              className="absolute -top-4 -right-4 w-10 h-10 bg-rose-500 text-white border-4 border-white rounded-full font-black text-lg shadow-md hover:bg-rose-600 transition-all flex items-center justify-center"
            >
              ✕
            </button>

            <div className="text-center pb-4 border-b-4 border-amber-100 flex-shrink-0">
              <span className="text-5xl animate-bounce inline-block mb-2">📚</span>
              <h3 className="text-2xl font-black text-amber-950">{profile.name}'s Adventure Fact Book</h3>
              <p className="text-xs text-amber-700 font-bold mt-1">Check out all the cool things you've learned about Japan!</p>
            </div>

            <div className="flex-grow overflow-y-auto py-6 pr-1 space-y-4">
              {profile.unlockedFacts.length > 0 ? (
                profile.unlockedFacts.map((fact, index) => (
                  <div key={index} className="bg-amber-50/60 border-2 border-amber-200 p-4 rounded-2xl relative shadow-sm flex gap-3 items-start">
                    <span className="text-2xl p-1 bg-white rounded-xl border border-amber-200 flex-shrink-0 shadow-sm">💡</span>
                    <div>
                      <span className="text-[10px] font-black uppercase text-amber-700 tracking-wider">Fact #{index + 1}</span>
                      <p className="text-sm font-bold text-slate-700 mt-1 leading-relaxed italic">"{fact}"</p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 space-y-3">
                  <span className="text-6xl block opacity-40">🔒</span>
                  <p className="text-sm font-bold text-slate-500 max-w-xs mx-auto">
                    You haven't unlocked any facts yet! Play quests and earn XP points to unlock secret trivia!
                  </p>
                </div>
              )}
            </div>

            <div className="pt-4 border-t-2 border-slate-100 flex-shrink-0">
              <button
                onClick={() => setIsFactBookOpen(false)}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-black py-3 rounded-2xl shadow-md transition-all border-b-4 border-slate-950 active:border-b-0 active:translate-y-0.5"
              >
                Keep Exploring! 🗺️
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Daily Quests widget */}
      <DailyQuests />

      {/* Weak Area Auto-Recommendation Engine */}
      <WeakAreaRecommendation onSelectDestination={onSelectDestination} />

      {/* Interactive Trip Timeline and Countdown */}
      <TripCountdownTimeline />

      {/* Progress Path */}
      <div>
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
