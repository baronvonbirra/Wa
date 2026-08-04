import React from 'react';
import { useAppState } from '../state/AppContext';
import { DESTINATIONS_DATA } from '../data/destinations';

export const TripCountdownTimeline: React.FC = () => {
  const { state } = useAppState();
  const activeKid = state.activePlayer === 'parent' ? 'james' : state.activePlayer;
  const profile = state.profiles[activeKid];

  // Calculate total vocabulary words vs mastered words across all destinations
  let totalMastered = 0;
  let totalWords = 0;

  DESTINATIONS_DATA.forEach((dest) => {
    totalMastered += profile.masteredVocab[dest.id]?.length || 0;
    totalWords += dest.vocabList.length;
  });

  const tripReadiness = totalWords > 0 ? Math.round((totalMastered / totalWords) * 100) : 0;

  // Calculate days until trip
  const calculateDaysUntilTrip = () => {
    const today = new Date();
    const trip = new Date(state.tripDate);
    const diffTime = trip.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysLeft = calculateDaysUntilTrip();

  // Timeline points depending on countdown timeline status
  const milestoneWeeks = [
    { week: "Week 1", topic: "Polite Greetings", emoji: "👋", target: "Kyoto", completed: profile.masteredVocab["kyoto"]?.length > 0 },
    { week: "Week 2", topic: "Food & Restaurant Ordering", emoji: "🍜", target: "Tokyo", completed: profile.masteredVocab["tokyo"]?.length > 0 },
    { week: "Week 3", topic: "Numbers & Prices", emoji: "🔟", target: "Osaka", completed: profile.masteredVocab["osaka"]?.length > 0 },
    { week: "Week 4", topic: "Transportation Help", emoji: "🚄", target: "Train Station", completed: profile.masteredVocab["train"]?.length > 0 },
    { week: "Week 5", topic: "Activities & Ocean Names", emoji: "🏖️", target: "Okinawa", completed: profile.masteredVocab["okinawa"]?.length > 0 },
    { week: "Week 6", topic: "Tradition & Family Words", emoji: "🎎", target: "Takayama", completed: profile.masteredVocab["takayama"]?.length > 0 }
  ];

  return (
    <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-indigo-600 rounded-[32px] p-0.5 shadow-xl relative overflow-hidden">
      <div className="bg-[#FFFDF9] rounded-[30px] p-6">
        {/* Main Countdown Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b-2 border-slate-100 pb-5 mb-6">
          <div className="flex items-center gap-4">
            <span className="text-5xl animate-soft select-none">✈️</span>
            <div>
              <h4 className="text-lg font-black text-rose-950 flex items-center gap-1.5 uppercase tracking-wide">
                My Japan Trip Countdown Timer!
              </h4>
              <p className="text-xs text-slate-500 font-bold">
                Learn daily to unlock 100% trip readiness before departure!
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Days Left Circle */}
            <div className="bg-rose-500 text-white rounded-2xl px-5 py-3 text-center border-b-4 border-rose-700 shadow-md">
              <span className="block text-2xl font-black">{daysLeft}</span>
              <span className="text-[9px] font-black uppercase tracking-wider">Days Until Flight</span>
            </div>

            {/* Overall readiness gauge */}
            <div className="bg-indigo-600 text-white rounded-2xl px-5 py-3 text-center border-b-4 border-indigo-800 shadow-md">
              <span className="block text-2xl font-black">{tripReadiness}%</span>
              <span className="text-[9px] font-black uppercase tracking-wider">Trip Readiness</span>
            </div>
          </div>
        </div>

        {/* Dynamic Progress Timeline bar */}
        <div>
          <h5 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-1">
            <span>🗺️</span> Week-By-Week Family Study Schedule
          </h5>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-4">
            {milestoneWeeks.map((m, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border-2 transition-all relative flex flex-col justify-between ${
                  m.completed
                    ? 'bg-emerald-50 border-emerald-400 text-emerald-950 scale-102'
                    : 'bg-slate-50 border-slate-200 text-slate-400'
                }`}
              >
                <div>
                  <div className="flex justify-between items-center text-[9px] font-black uppercase tracking-wider mb-2">
                    <span>{m.week}</span>
                    {m.completed && <span className="text-emerald-500">Done ✅</span>}
                  </div>

                  <span className={`text-3xl block mb-2 ${m.completed ? 'animate-bounce' : 'filter grayscale opacity-45'}`}>
                    {m.emoji}
                  </span>

                  <h6 className="font-extrabold text-[11px] leading-tight text-slate-800">
                    {m.topic}
                  </h6>
                </div>

                <span className="text-[9px] font-black text-slate-400 bg-white border border-slate-100 rounded-full py-0.5 px-2 mt-3 inline-block w-fit">
                  {m.target}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Custom goal set by parent (if active) */}
        {profile.customGoal && (
          <div className="mt-6 bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-3">
            <div>
              <span className="text-[10px] font-black uppercase bg-indigo-200 text-indigo-800 px-2 py-0.5 rounded-full border border-indigo-300">
                🎯 Family Mission Set By Mike
              </span>
              <h6 className="text-sm font-black text-indigo-950 mt-1.5 leading-snug">
                "{profile.customGoal.text}"
              </h6>
              <p className="text-xs text-indigo-800 font-bold mt-0.5">
                Target: Master {profile.customGoal.targetWords} words total to win a +100 Coins reward bonus!
              </p>
            </div>

            <div className="flex-shrink-0">
              {profile.customGoal.completed ? (
                <span className="bg-emerald-500 text-white font-black text-xs px-4 py-2 rounded-xl shadow-md border-b-2 border-emerald-600 block text-center animate-bounce">
                  Completed! 🎉 +100 Coins
                </span>
              ) : (
                <span className="bg-indigo-600 text-white font-black text-xs px-4 py-2 rounded-xl shadow-md border-b-2 border-indigo-800 block text-center">
                  Mastered: {totalMastered} / {profile.customGoal.targetWords}
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default TripCountdownTimeline;
