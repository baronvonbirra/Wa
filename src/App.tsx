import { useState } from 'react';
import { MainNavigation, MainTab } from './components/MainNavigation';
import { ItineraryModule } from './components/ItineraryModule';
import { TodoModule } from './components/TodoModule';
import { PackingModule } from './components/PackingModule';
import { GuideModule } from './components/GuideModule';

export function App() {
  const [activeTab, setActiveTab] = useState<MainTab>('itinerary');

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-sans selection:bg-rose-500 selection:text-white pb-16 md:pb-0 md:pt-16">
      {/* Fixed Main Navigation Bar */}
      <MainNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* View Module Router */}
      <main className="w-full">
        {activeTab === 'itinerary' && <ItineraryModule />}
        {activeTab === 'todo' && <TodoModule />}
        {activeTab === 'packing' && <PackingModule />}
        {activeTab === 'guide' && <GuideModule />}
      </main>
    </div>
  );
}

export default App;
