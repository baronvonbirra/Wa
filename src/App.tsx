import { useState } from 'react';
import { AppProvider } from './state/AppContext';
import { Wa2Provider } from './state/Wa2Context';

// Wa 2.0 Components
import { Header as Wa2Header } from './components/wa2/Header';
import { BottomNav, Wa2Tab } from './components/wa2/BottomNav';
import { ItineraryView } from './components/wa2/ItineraryView';
import { SavedPlacesView } from './components/wa2/SavedPlacesView';
import { WishlistView } from './components/wa2/WishlistView';
import { ToolsView } from './components/wa2/ToolsView';
import { SurvivalPhrasesView } from './components/wa2/SurvivalPhrasesView';

// Wa 1.0 Components
import { Header as Wa1Header } from './components/Header';
import { DestinationMap } from './components/DestinationMap';
import { GameSession } from './components/GameSession';
import { Passport } from './components/Passport';
import { ParentDashboard } from './components/ParentDashboard';
import { Shop2 } from './components/Shop2';
import { AdminPanel } from './components/AdminPanel';
import { DESTINATIONS_DATA, Destination } from './data/destinations';
import { useAppState } from './state/AppContext';
import { ArrowLeft } from 'lucide-react';

function Wa1Content({
  currentTab,
  setCurrentTab,
  selectedDestination,
  setSelectedDestination,
  handleSelectDestination,
  handleCloseGame,
  onReturnToWa2
}: any) {
  const { state, switchPlayer } = useAppState();
  const [showLanding, setShowLanding] = useState<boolean>(true);

  if (showLanding) {
    const totalXP = state.profiles.james.totalXP + state.profiles.lily.totalXP + state.profiles.merche.totalXP;

    return (
      <div className="max-w-4xl mx-auto my-6 p-6 sm:p-8 bg-gradient-to-br from-[#FFFDF9] to-[#FFF9EB] border-8 border-rose-300 rounded-[36px] shadow-2xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={onReturnToWa2}
            className="bg-slate-800 hover:bg-slate-900 text-white font-black text-xs px-4 py-2 rounded-2xl flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver a Wa 2.0 (Viaje)</span>
          </button>
          <span className="text-xs font-black bg-rose-100 text-rose-700 px-3 py-1 rounded-full uppercase">
            Wa 1.0 Japanese Quest
          </span>
        </div>

        <div className="text-center mb-8 border-b-4 border-rose-100 pb-6">
          <span className="text-7xl animate-wiggle inline-block mb-3">🇯🇵</span>
          <h1 className="text-3xl sm:text-4xl font-black text-rose-500 tracking-tight uppercase">JAPAN QUEST — FAMILY EDITION</h1>
          <p className="text-slate-500 font-bold text-xs sm:text-sm mt-1">Ready for our big adventure? Who is learning today?</p>
        </div>

        {/* User profile selection cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
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
              <p className="text-xs text-slate-400 font-extrabold mt-0.5">Kids Basic</p>
            </div>
            <div className="mt-4 bg-amber-50 border-2 border-amber-100 px-4 py-1.5 rounded-full">
              <span className="text-xs font-black text-amber-800">Lvl {state.profiles.lily.level} • {state.profiles.lily.totalXP} XP</span>
            </div>
          </button>

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
              <p className="text-xs text-slate-400 font-extrabold mt-0.5">Kids Advanced</p>
            </div>
            <div className="mt-4 bg-rose-50 border-2 border-rose-100 px-4 py-1.5 rounded-full">
              <span className="text-xs font-black text-rose-800">Lvl {state.profiles.james.level} • {state.profiles.james.totalXP} XP</span>
            </div>
          </button>

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

        {/* Stats */}
        <div className="bg-gradient-to-r from-rose-50 via-amber-50 to-emerald-50 border-4 border-amber-200 rounded-[28px] p-6 shadow-inner text-center">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wide">Total Family XP</span>
          <strong className="text-3xl text-rose-600 block mt-1">{totalXP.toLocaleString()} XP ✈️</strong>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-japan-pastelBg flex flex-col font-sans pb-16">
      <div className="bg-slate-900 text-white py-2 px-4 flex items-center justify-between">
        <button
          onClick={onReturnToWa2}
          className="text-xs font-black text-rose-300 hover:text-white flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Volver al Asistente de Viaje (Wa 2.0)</span>
        </button>
        <span className="text-[10px] font-extrabold bg-rose-600 px-2 py-0.5 rounded uppercase">
          Módulo Wa 1.0 Learn
        </span>
      </div>

      <Wa1Header currentTab={currentTab} setCurrentTab={(tab: string) => {
        if (tab === 'landing') {
          setShowLanding(true);
          setSelectedDestination(null);
        } else {
          setCurrentTab(tab);
          setSelectedDestination(null);
        }
      }} />

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

        {currentTab === 'passport' && <Passport />}
        {currentTab === 'dashboard' && <ParentDashboard />}
        {currentTab === 'shop' && <Shop2 />}
        {currentTab === 'admin' && <AdminPanel onClose={() => setCurrentTab('home')} />}
      </main>
    </div>
  );
}

function MainAppContent() {
  const [wa2Tab, setWa2Tab] = useState<Wa2Tab>('itinerary');
  const [showWa1, setShowWa1] = useState<boolean>(false);

  // Wa 1.0 specific navigation state
  const [wa1Tab, setWa1Tab] = useState<string>('home');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);

  const handleSelectDestination = (destId: string) => {
    const found = DESTINATIONS_DATA.find(d => d.id === destId);
    if (found) {
      setSelectedDestination(found);
    }
  };

  if (showWa1) {
    return (
      <Wa1Content
        currentTab={wa1Tab}
        setCurrentTab={setWa1Tab}
        selectedDestination={selectedDestination}
        setSelectedDestination={setSelectedDestination}
        handleSelectDestination={handleSelectDestination}
        handleCloseGame={() => setSelectedDestination(null)}
        onReturnToWa2={() => setShowWa1(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-rose-500 selection:text-white">
      {/* Wa 2.0 Header */}
      <Wa2Header />

      {/* Main View Module Content */}
      <main className="flex-grow">
        {wa2Tab === 'itinerary' && <ItineraryView onNavigateTab={setWa2Tab} />}
        {wa2Tab === 'places' && <SavedPlacesView />}
        {wa2Tab === 'wishlist' && <WishlistView />}
        {wa2Tab === 'tools' && <ToolsView />}
        {wa2Tab === 'walearn' && (
          <SurvivalPhrasesView onOpenWaLearn={() => setShowWa1(true)} />
        )}
      </main>

      {/* Wa 2.0 Fixed Bottom Nav Bar */}
      <BottomNav activeTab={wa2Tab} setActiveTab={setWa2Tab} />
    </div>
  );
}

function App() {
  return (
    <AppProvider>
      <Wa2Provider>
        <MainAppContent />
      </Wa2Provider>
    </AppProvider>
  );
}

export default App;
