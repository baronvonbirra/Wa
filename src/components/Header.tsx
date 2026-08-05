import React, { useState, useEffect } from 'react';
import { useAppState } from '../state/AppContext';
import { SHOP_ITEMS } from '../data/shopItems';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, setCurrentTab }) => {
  const { state, switchPlayer, toggleSound, readParentMessage, claimParentMessageReward } = useAppState();
  const active = state.activePlayer;

  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [clickCount, setClickCount] = useState<number>(0);

  // Auto detect admin query / hash params
  useEffect(() => {
    const checkParams = () => {
      if (window.location.search.includes('admin=true') || window.location.hash === '#admin') {
        setCurrentTab('admin');
      }
    };
    checkParams();
    window.addEventListener('hashchange', checkParams);
    return () => window.removeEventListener('hashchange', checkParams);
  }, [setCurrentTab]);

  const handleProfileClick = (profileKey: "james" | "lily" | "merche") => {
    if (active === profileKey) {
      const nextCount = clickCount + 1;
      if (nextCount >= 5) {
        setClickCount(0);
        setCurrentTab('admin');
        alert("👑 Secret Pathway Unlocked: Navigating to Admin Panel!");
      } else {
        setClickCount(nextCount);
      }
    } else {
      setClickCount(1);
      switchPlayer(profileKey);
      if (currentTab === 'dashboard' || currentTab === 'admin') {
        setCurrentTab('home');
      }
    }
  };

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

  const getFrameClass = (profile: any) => {
    if (!profile || !profile.equippedFrameId) return "border-transparent";
    const frame = SHOP_ITEMS.find(i => i.id === profile.equippedFrameId);
    if (!frame) return "border-transparent";
    if (frame.id === 'fr_4') return 'border-cyan-400 ring-2 ring-cyan-200 animate-pulse'; // Neon Glow
    if (frame.id === 'fr_1') return 'border-emerald-400 ring-2 ring-emerald-100'; // Bamboo
    if (frame.id === 'fr_2') return 'border-pink-400 ring-2 ring-pink-100'; // Sakura
    if (frame.id === 'fr_3') return 'border-amber-400 ring-2 ring-amber-200 animate-pulse'; // Golden Crest
    if (frame.id === 'fr_6') return 'border-yellow-400 ring-2 ring-amber-300'; // Royal Crown
    if (frame.id === 'fr_7') return 'border-rose-500 ring-2 ring-rose-300 animate-bounce'; // Imperial Dragon
    return 'border-indigo-400 ring-1 ring-indigo-200';
  };

  const getAuraClass = (profile: any) => {
    if (!profile || !profile.equippedAuraId) return "";
    if (profile.equippedAuraId === 'st_rainbow') return "shadow-[0_0_15px_rgba(168,85,247,0.8)] animate-pulse";
    if (profile.equippedAuraId === 'st_gold') return "shadow-[0_0_15px_rgba(245,158,11,0.8)] animate-pulse";
    return "shadow-[0_0_10px_rgba(59,130,246,0.6)]";
  };

  const getTitleText = (profile: any) => {
    if (!profile || !profile.equippedTitleId) return "";
    const titleItem = SHOP_ITEMS.find(i => i.id === profile.equippedTitleId);
    return titleItem ? ` • 🏆 ${titleItem.name}` : "";
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
            onClick={() => handleProfileClick('lily')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-black transition-all duration-200 border-4 ${
              active === 'lily'
                ? 'bg-amber-500 text-white shadow-md border-amber-300 scale-105'
                : 'text-slate-700 bg-white hover:bg-slate-100 border-slate-200'
            } ${getFrameClass(state.profiles.lily)} ${getAuraClass(state.profiles.lily)}`}
          >
            <span>{state.profiles.lily.avatarCustomization?.face || "👧🏻"}</span> {state.profiles.lily.avatarCustomization?.customName || "Sofia"}{getTitleText(state.profiles.lily)}
          </button>

          <button
            onClick={() => handleProfileClick('james')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-black transition-all duration-200 border-4 ${
              active === 'james'
                ? 'bg-rose-500 text-white shadow-md border-rose-300 scale-105'
                : 'text-slate-700 bg-white hover:bg-slate-100 border-slate-200'
            } ${getFrameClass(state.profiles.james)} ${getAuraClass(state.profiles.james)}`}
          >
            <span>{state.profiles.james.avatarCustomization?.face || "👦🏻"}</span> {state.profiles.james.avatarCustomization?.customName || "Marco"}{getTitleText(state.profiles.james)}
          </button>

          <button
            onClick={() => handleProfileClick('merche')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-2xl text-xs font-black transition-all duration-200 border-4 ${
              active === 'merche'
                ? 'bg-indigo-500 text-white shadow-md border-indigo-300 scale-105'
                : 'text-indigo-700 bg-white hover:bg-slate-100 border-slate-200'
            } ${getFrameClass(state.profiles.merche)} ${getAuraClass(state.profiles.merche)}`}
          >
            <span>{state.profiles.merche.avatarCustomization?.face || "🤩"}</span> {state.profiles.merche.avatarCustomization?.customName || "Merche"} (Mom){getTitleText(state.profiles.merche)}
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

          <button
            onClick={() => setShowSettingsModal(true)}
            className="px-4 py-2 rounded-2xl text-sm font-black border-2 bg-white hover:bg-slate-100 border-slate-200 text-slate-700 shadow-md active:translate-y-1 flex items-center gap-1.5"
          >
            <span>⚙️</span> Settings
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
          <div className="max-w-6xl mx-auto px-4 flex justify-center gap-4 flex-wrap">
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
              onClick={() => setCurrentTab('shop')}
              className={`py-2 px-5 text-sm font-black rounded-full border-2 transition-all ${
                currentTab === 'shop'
                  ? 'bg-rose-500 text-white border-rose-600 shadow-md'
                  : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
              }`}
            >
              🛍️ Shop 2.0
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

      {showSettingsModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border-8 border-[#FDE047] rounded-[32px] p-6 shadow-2xl max-w-sm w-full relative">
            <button
              onClick={() => setShowSettingsModal(false)}
              className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 text-slate-500 font-extrabold p-1.5 rounded-full h-8 w-8 flex items-center justify-center text-sm"
            >
              ✕
            </button>

            <div className="text-center mb-6">
              <span className="text-4xl">⚙️</span>
              <h3 className="text-lg font-black text-slate-800 uppercase mt-2">App Settings</h3>
              <p className="text-[10px] text-slate-400 font-extrabold mt-0.5">Customize your learning experience</p>
            </div>

            <div className="space-y-4 mb-6">
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-xs font-black text-slate-600">Sound Effects & TTS</span>
                <button
                  onClick={toggleSound}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black border-2 ${
                    state.soundEnabled ? 'bg-emerald-400 border-emerald-500 text-white' : 'bg-slate-300 border-slate-400 text-slate-700'
                  }`}
                >
                  {state.soundEnabled ? '🔊 Enabled' : '🔇 Muted'}
                </button>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl border border-slate-100">
                <span className="text-xs font-black text-slate-600">Active Profile Role</span>
                <span className="text-xs font-black text-rose-500 bg-rose-50 px-2.5 py-1 rounded-lg capitalize">
                  {active}
                </span>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-2">
              <button
                onClick={() => {
                  setShowSettingsModal(false);
                  setCurrentTab('admin');
                }}
                className="w-full bg-indigo-500 hover:bg-indigo-600 text-white font-black text-xs py-3 rounded-2xl border-b-4 border-indigo-700 active:translate-y-0.5 transition-all text-center flex items-center justify-center gap-1.5"
              >
                <span>👑</span> Admin Control Panel
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
export default Header;
