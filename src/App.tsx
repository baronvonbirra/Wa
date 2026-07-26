import { useState } from 'react';
import { AppProvider } from './state/AppContext';
import { Header } from './components/Header';
import { DestinationMap } from './components/DestinationMap';
import { GameSession } from './components/GameSession';
import { Passport } from './components/Passport';
import { ParentDashboard } from './components/ParentDashboard';
import { DESTINATIONS_DATA, Destination } from './data/destinations';

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
      <div className="min-h-screen bg-japan-pastelBg flex flex-col font-sans">
        {/* Dynamic header */}
        <Header currentTab={currentTab} setCurrentTab={(tab) => {
          setCurrentTab(tab);
          // Auto close active game view if jumping away
          setSelectedDestination(null);
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

        {/* Footer */}
        <footer className="bg-white border-t border-rose-50 py-6 text-center text-xs font-semibold text-slate-400">
          <p>© {new Date().getFullYear()} Japan Quest — Educational Gamified Companion for Families. Built with Love 🗻</p>
        </footer>
      </div>
    </AppProvider>
  );
}

export default App;
