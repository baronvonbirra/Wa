import React from 'react';
import { useAppState } from '../state/AppContext';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, setCurrentTab }) => {
  const { state, switchPlayer, toggleSound, readParentMessage, claimParentMessageReward } = useAppState();
  const active = state.activePlayer;

  // Active player unread message lookups
  const activeProfile = active !== 'parent' ? state.profiles[active] : null;
  const activeMessages = activeProfile?.parentMessages || [];
  const pendingMessage = activeMessages.find(m => !m.read || (m.rewardXP && !m.claimed));

  const handleClaimReward = (id: string) => {
    claimParentMessageReward(active as "james" | "lily" | "merche", id);
    alert("🪙 Awesome! Your parent message reward was added to your balance!");
  };

  const handleDismiss = (id: string) => {
    readParentMessage(active as "james" | "lily" | "merche", id);
  };

  return (
    <header className="bg-gradient-to-b from-[#FFF9EB] to-white border-b-4 border-[#FDE047] shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand / Logo with wiggle animation */}
        <div
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setCurrentTab('landing')}
        >
          <span className="text-4xl animate-wiggle inline-block">🏯</span>
          <div>
            <h1 className="text-3xl font-black tracking-tight text-rose-500 drop-shadow-sm flex items-center gap-1.5">
              JAPAN QUEST <span className="text-xs font-black bg-rose-500 text-white px-2.5 py-1 rounded-full border-2 border-white uppercase tracking-wider animate-bounce">Fun!</span>
            </h1>
            <p className="text-xs text-amber-600 font-bold">The Family Travel Adventure Game!</p>
          </div>
        </div>

        {/* Playful Player Switcher */}
        <div className="flex flex-wrap items-center justify-center gap-2 bg-[#FEF08A] p-2 rounded-3xl border-4 border-[#FACC15] shadow-inner">
          <button
            onClick={() => {
              switchPlayer('lily');
              if (currentTab === 'dashboard') {
                setCurrentTab('home');
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-black transition-all duration-200 border-2 ${
              active === 'lily'
                ? 'bg-amber-500 text-white shadow-md border-amber-300 scale-105'
                : 'text-slate-700 bg-white hover:bg-slate-100 border-slate-200'
            }`}
          >
            <span>{state.profiles.lily.avatarCustomization?.face || "👧🏻"}</span> {state.profiles.lily.avatarCustomization?.customName || "Sofia"} ({state.profiles.lily.age})
          </button>

          <button
            onClick={() => {
              switchPlayer('james');
              if (currentTab === 'dashboard') {
                setCurrentTab('home');
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-black transition-all duration-200 border-2 ${
              active === 'james'
                ? 'bg-rose-500 text-white shadow-md border-rose-300 scale-105'
                : 'text-slate-700 bg-white hover:bg-slate-100 border-slate-200'
            }`}
          >
            <span>{state.profiles.james.avatarCustomization?.face || "👦🏻"}</span> {state.profiles.james.avatarCustomization?.customName || "Marco"} ({state.profiles.james.age})
          </button>

          <button
            onClick={() => {
              switchPlayer('merche');
              if (currentTab === 'dashboard') {
                setCurrentTab('home');
              }
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-black transition-all duration-200 border-2 ${
              active === 'merche'
                ? 'bg-indigo-500 text-white shadow-md border-indigo-300 scale-105'
                : 'text-indigo-700 bg-white hover:bg-slate-100 border-slate-200'
            }`}
          >
            <span>{state.profiles.merche.avatarCustomization?.face || "🤩"}</span> {state.profiles.merche.avatarCustomization?.customName || "Merche"} (Mom)
          </button>

          <button
            onClick={() => {
              switchPlayer('parent');
              setCurrentTab('dashboard');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-black transition-all duration-200 border-2 ${
              active === 'parent'
                ? 'bg-indigo-600 text-white shadow-md border-indigo-400 scale-105'
                : 'text-indigo-600 bg-white hover:bg-slate-100 border-slate-200'
            }`}
          >
            <span>👨‍👩‍👧‍👦</span> Control Center
          </button>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            className={`px-4 py-2 rounded-2xl text-sm font-black border-2 transition-all duration-150 ${
              state.soundEnabled
                ? 'bg-emerald-400 border-emerald-500 text-white shadow-md active:translate-y-1'
                : 'bg-slate-300 border-slate-400 text-slate-700 shadow-md active:translate-y-1'
            }`}
          >
            {state.soundEnabled ? '🔊 Sound On' : '🔇 Muted'}
          </button>

          {active !== 'parent' && (
            <div className="flex items-center gap-1.5 bg-[#FFEDD5] border-2 border-[#F97316] px-4 py-2 rounded-2xl shadow-sm animate-pulse">
              <span className="text-xl">🔥</span>
              <span className="text-xs font-black text-[#C2410C]">
                {state.profiles[active].streak} day streak!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Parent-to-Kid Encouragement Banner */}
      {pendingMessage && active !== 'parent' && (
        <div className="bg-indigo-50 border-y-4 border-indigo-300 py-3.5 px-4 shadow-inner">
          <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl animate-bounce">✉️</span>
              <div>
                <span className="text-[9px] font-black uppercase tracking-wider text-indigo-700 bg-white border border-indigo-200 px-2.5 py-0.5 rounded-full inline-block">
                  Message From Parent Mike
                </span>
                <p className="text-xs font-black text-indigo-950 mt-1">
                  "{pendingMessage.text}"
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              {pendingMessage.rewardXP && !pendingMessage.claimed ? (
                <button
                  onClick={() => handleClaimReward(pendingMessage.id)}
                  className="bg-emerald-400 hover:bg-emerald-500 text-white font-black text-xs px-4 py-2 rounded-xl border-b-2 border-emerald-600 active:translate-y-0.5 transition-all flex items-center gap-1 shadow-sm"
                >
                  🎁 Claim +{pendingMessage.rewardXP} Coins!
                </button>
              ) : (
                <button
                  onClick={() => handleDismiss(pendingMessage.id)}
                  className="bg-indigo-200 hover:bg-indigo-300 text-indigo-800 font-black text-xs px-4 py-2 rounded-xl active:translate-y-0.5 transition-all"
                >
                  ✕ Mark Read
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Navigation Tabs with Bubble Buttons style */}
      {active !== 'parent' && (
        <nav className="bg-[#FFFDF9] border-t-2 border-[#FEF08A] py-2">
          <div className="max-w-6xl mx-auto px-4 flex justify-center gap-4">
            <button
              onClick={() => setCurrentTab('home')}
              className={`py-2 px-5 text-sm font-black rounded-full border-2 transition-all ${
                currentTab === 'home'
                  ? 'bg-rose-500 text-white border-rose-600 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              🗺️ Destinations Map
            </button>
            <button
              onClick={() => setCurrentTab('passport')}
              className={`py-2 px-5 text-sm font-black rounded-full border-2 transition-all ${
                currentTab === 'passport'
                  ? 'bg-rose-500 text-white border-rose-600 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              🎫 Passport Stamps
            </button>
            <button
              onClick={() => setCurrentTab('landing')}
              className="py-2 px-5 text-sm font-black rounded-full border-2 bg-amber-400 text-slate-800 border-amber-500 hover:bg-amber-500 transition-all"
            >
              🔄 Change Player
            </button>
          </div>
        </nav>
      )}
    </header>
  );
};
export default Header;
