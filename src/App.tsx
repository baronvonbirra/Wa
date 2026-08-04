import { useState } from 'react';
import { AppProvider } from './state/AppContext';
import { Header } from './components/Header';
import { DestinationMap } from './components/DestinationMap';
import { GameSession } from './components/GameSession';
import { Passport } from './components/Passport';
import { ParentDashboard } from './components/ParentDashboard';
import { DESTINATIONS_DATA, Destination } from './data/destinations';

import { useAppState } from './state/AppContext';

function MainAppContent({ currentTab, setCurrentTab, selectedDestination, setSelectedDestination, handleSelectDestination, handleCloseGame }: any) {
  const { state, switchPlayer } = useAppState();
  const [showLanding, setShowLanding] = useState<boolean>(true);

  // If we are on the landing page, show the "Who's learning today?" selector
  if (showLanding) {
    const totalXP = state.profiles.james.totalXP + state.profiles.lily.totalXP + state.profiles.merche.totalXP;

    return (
      <div className="max-w-4xl mx-auto my-12 p-8 bg-gradient-to-br from-[#FFFDF9] to-[#FFF9EB] border-8 border-rose-300 rounded-[36px] shadow-2xl sparkle-pattern">
        <div className="text-center mb-8 border-b-4 border-rose-100 pb-6">
          <span className="text-7xl animate-wiggle inline-block mb-3">🇯🇵</span>
          <h1 className="text-4xl font-black text-rose-500 tracking-tight drop-shadow-sm uppercase">JAPAN QUEST — FAMILY EDITION</h1>
          <p className="text-slate-500 font-bold text-sm mt-1">Ready for our big adventure? Who is learning today?</p>
        </div>

        {/* User profile selection cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Sofia (Lily) card */}
          <button
            onClick={() => {
              switchPlayer('lily');
              setShowLanding(false);
              setCurrentTab('home');
            }}
            className="bg-white border-4 border-amber-300 rounded-3xl p-6 shadow-md hover:border-amber-500 hover:-translate-y-1 transition-all active:scale-95 text-center flex flex-col items-center justify-between"
          >
            <span className="text-6xl mb-2 select-none">{state.profiles.lily.avatarCustomization?.face || "👧🏻"}</span>
            <div>
              <h3 className="text-xl font-black text-slate-800">{state.profiles.lily.avatarCustomization?.customName || "Sofia"}</h3>
              <p className="text-xs text-slate-400 font-extrabold mt-0.5">Kids Basic (Age 5)</p>
            </div>
            <div className="mt-4 bg-amber-50 border-2 border-amber-100 px-4 py-1.5 rounded-full">
              <span className="text-xs font-black text-amber-800">Lvl {state.profiles.lily.level} • {state.profiles.lily.totalXP} XP</span>
            </div>
          </button>

          {/* Marco (James) card */}
          <button
            onClick={() => {
              switchPlayer('james');
              setShowLanding(false);
              setCurrentTab('home');
            }}
            className="bg-white border-4 border-rose-300 rounded-3xl p-6 shadow-md hover:border-rose-500 hover:-translate-y-1 transition-all active:scale-95 text-center flex flex-col items-center justify-between"
          >
            <span className="text-6xl mb-2 select-none">{state.profiles.james.avatarCustomization?.face || "👦🏻"}</span>
            <div>
              <h3 className="text-xl font-black text-slate-800">{state.profiles.james.avatarCustomization?.customName || "Marco"}</h3>
              <p className="text-xs text-slate-400 font-extrabold mt-0.5">Kids Advanced (Age 9)</p>
            </div>
            <div className="mt-4 bg-rose-50 border-2 border-rose-100 px-4 py-1.5 rounded-full">
              <span className="text-xs font-black text-rose-800">Lvl {state.profiles.james.level} • {state.profiles.james.totalXP} XP</span>
            </div>
          </button>

          {/* Merche (Parent) card */}
          <button
            onClick={() => {
              switchPlayer('merche');
              setShowLanding(false);
              setCurrentTab('home');
            }}
            className="bg-white border-4 border-indigo-300 rounded-3xl p-6 shadow-md hover:border-indigo-500 hover:-translate-y-1 transition-all active:scale-95 text-center flex flex-col items-center justify-between"
          >
            <span className="text-6xl mb-2 select-none">{state.profiles.merche.avatarCustomization?.face || "🤩"}</span>
            <div>
              <h3 className="text-xl font-black text-slate-800">{state.profiles.merche.avatarCustomization?.customName || "Merche"}</h3>
              <p className="text-xs text-slate-400 font-extrabold mt-0.5">Adult Advanced (Mom)</p>
            </div>
            <div className="mt-4 bg-indigo-50 border-2 border-indigo-100 px-4 py-1.5 rounded-full">
              <span className="text-xs font-black text-indigo-800">Lvl {state.profiles.merche.level} • {state.profiles.merche.totalXP} XP</span>
            </div>
          </button>
        </div>

        {/* Family stats dashboard */}
        <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-emerald-50 border-4 border-amber-200 rounded-[28px] p-6 shadow-inner">
          <h4 className="text-lg font-black text-slate-800 flex items-center gap-2 mb-4 justify-center">
            <span>👨‍👩‍👧‍👦</span> family learning stats overview
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wide">Total Family XP</span>
              <strong className="text-3xl text-rose-600 mt-1">{totalXP.toLocaleString()} XP ✈️</strong>
            </div>

            <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex flex-col justify-center">
              <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wide">Trip Readiness Index</span>
              <strong className="text-3xl text-emerald-600 mt-1">72% Ready 📈</strong>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-4 text-center">
            <span className="text-xs font-bold text-slate-500">
              🏯 Japan Quest helps your entire family learn Japanese together! Select a profile above to get started.
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-japan-pastelBg flex flex-col font-sans">
      {/* Dynamic header */}
      <Header currentTab={currentTab} setCurrentTab={(tab: string) => {
        if (tab === 'landing') {
          setShowLanding(true);
          setSelectedDestination(null);
        } else {
          setCurrentTab(tab);
          // Auto close active game view if jumping away
          setSelectedDestination(null);
        }
      }} />

      {/* Primary Main Content */}
      <main className="flex-grow">
        {currentTab === 'home' && (
          selectedDestination ? (
            <GameSession
              destination={selectedDestination}
              onClose={handleCloseGame}
            />
          ) : (
            <DestinationMap onSelectDestination={handleSelectDestination} />
          )
        )}

        {currentTab === 'passport' && (
          <Passport />
        )}

        {currentTab === 'dashboard' && (
          <ParentDashboard />
        )}
      </main>
    </div>
  );
}

function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const handleSelectDestination = (destId: string) => {
    const found = DESTINATIONS_DATA.find(d => d.id === destId);
    if (found) {
      setSelectedDestination(found);
    }
  };

  const handleCloseGame = () => {
    setSelectedDestination(null);
  };

  return (
    <AppProvider>
      <MainAppContent
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        selectedDestination={selectedDestination}
        setSelectedDestination={setSelectedDestination}
        handleSelectDestination={handleSelectDestination}
        handleCloseGame={handleCloseGame}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-rose-50 py-6 text-center text-xs font-semibold text-slate-400">
        <p>© {new Date().getFullYear()} Japan Quest — Educational Gamified Companion for Families. Built with Love 🗻</p>
      </footer>
    </AppProvider>
  );
}

export default App;
