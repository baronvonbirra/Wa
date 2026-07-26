import React from 'react';
import { useAppState } from '../state/AppContext';

interface HeaderProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, setCurrentTab }) => {
  const { state, switchPlayer, toggleSound } = useAppState();
  const active = state.activePlayer;

  return (
    <header className="bg-white border-b border-rose-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Brand / Logo */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('home')}>
          <span className="text-3xl font-bold animate-bounce">🏯</span>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-rose-600 flex items-center gap-1">
              JAPAN QUEST <span className="text-sm font-normal text-slate-500 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-100">Adventure</span>
            </h1>
            <p className="text-xs text-slate-400 font-medium">Family Japanese Learning</p>
          </div>
        </div>

        {/* Player Switcher */}
        <div className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
          <button
            onClick={() => switchPlayer('james')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              active === 'james'
                ? 'bg-rose-500 text-white shadow-md scale-105'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>👧</span> James (5)
          </button>
          <button
            onClick={() => switchPlayer('lily')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              active === 'lily'
                ? 'bg-amber-500 text-white shadow-md scale-105'
                : 'text-slate-600 hover:bg-slate-200'
            }`}
          >
            <span>👦</span> Lily (9)
          </button>
          <button
            onClick={() => switchPlayer('parent')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-bold transition-all duration-200 ${
              active === 'parent'
                ? 'bg-indigo-600 text-white shadow-md scale-105'
                : 'text-indigo-600 hover:bg-slate-200'
            }`}
          >
            <span>👨‍👩‍👧‍👦</span> Parent
          </button>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            title={state.soundEnabled ? "Mute audio" : "Unmute audio"}
            className={`p-2.5 rounded-full border transition-all duration-200 ${
              state.soundEnabled
                ? 'bg-emerald-50 border-emerald-200 text-emerald-600 hover:bg-emerald-100'
                : 'bg-slate-100 border-slate-200 text-slate-500 hover:bg-slate-200'
            }`}
          >
            {state.soundEnabled ? '🔊 Sound On' : '🔇 Sound Off'}
          </button>

          {active !== 'parent' && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-full">
              <span className="text-xl">🔥</span>
              <span className="text-sm font-bold text-amber-700">
                {state.profiles[active].streak} day streak!
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Primary Navigation */}
      <nav className="bg-slate-50 border-t border-slate-100">
        <div className="max-w-6xl mx-auto px-4 flex justify-around">
          <button
            onClick={() => setCurrentTab('home')}
            className={`py-3 px-4 text-sm font-black flex items-center gap-2 border-b-4 transition-all duration-150 ${
              currentTab === 'home'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            🗺️ Destinations Map
          </button>
          <button
            onClick={() => setCurrentTab('passport')}
            className={`py-3 px-4 text-sm font-black flex items-center gap-2 border-b-4 transition-all duration-150 ${
              currentTab === 'passport'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            🎫 Passport Stamps
          </button>
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`py-3 px-4 text-sm font-black flex items-center gap-2 border-b-4 transition-all duration-150 ${
              currentTab === 'dashboard'
                ? 'border-rose-600 text-rose-600'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            📊 Parent Dashboard
          </button>
        </div>
      </nav>
    </header>
  );
};
export default Header;
