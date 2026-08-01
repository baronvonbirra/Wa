import React from 'react';
import { useAppState } from '../state/AppContext';
import { DESTINATIONS_DATA } from '../data/destinations';

export const Passport: React.FC = () => {
  const { state, switchPlayer } = useAppState();
  const active = state.activePlayer === 'parent' ? 'james' : state.activePlayer;
  const profile = state.profiles[active];

  // Calculate overall stamps
  const stamps = DESTINATIONS_DATA.map((dest) => {
    const masteredCount = profile.masteredVocab[dest.id]?.length || 0;
    const totalCount = dest.vocabList.length;
    const percentage = Math.round((masteredCount / totalCount) * 100);
    const isCompleted = percentage >= 50;

    return {
      id: dest.id,
      name: dest.name,
      emoji: dest.emoji,
      percentage,
      isCompleted
    };
  });

  const totalStampsWon = stamps.filter(s => s.isCompleted).length;
  const isPassportComplete = totalStampsWon === DESTINATIONS_DATA.length;

  // Countdown calculations
  const calculateDaysUntilTrip = () => {
    const today = new Date();
    const trip = new Date(state.tripDate);
    const diffTime = trip.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysLeft = calculateDaysUntilTrip();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Passport Book Wrapper with cute bubbly custom design */}
      <div className="bg-[#A13D51] border-[16px] border-[#7D2235] rounded-[48px] shadow-2xl p-6 md:p-10 text-white relative overflow-hidden">

        {/* Golden crest details */}
        <div className="absolute top-4 right-4 text-4xl opacity-35 animate-wiggle inline-block">💮</div>
        <div className="absolute bottom-4 left-4 text-4xl opacity-35 animate-soft inline-block">🌊</div>

        {/* Passport Front Header */}
        <div className="text-center pb-6 border-b-4 border-[#7D2235]">
          <div className="text-6xl mb-3 animate-wiggle inline-block">🇯🇵</div>
          <h2 className="text-3xl font-black tracking-widest text-[#FFF275] drop-shadow-sm">JAPAN TRAVEL PASSPORT</h2>
          <p className="text-[#FFFDF9] text-sm font-black uppercase tracking-wider mt-1">James & Lily's Language Companion!</p>
        </div>

        {/* Passport Identity Page info */}
        <div className="bg-[#FFFDF9] text-slate-800 rounded-[32px] p-6 my-8 border-8 border-[#FFF275] shadow-lg flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center justify-center bg-rose-50 border-4 border-rose-200 rounded-[24px] p-5 w-full md:w-1/3 text-center">
            <span className="text-8xl mb-3 animate-soft">{profile.avatar}</span>
            <h3 className="text-2xl font-black text-rose-950">{profile.name}</h3>
            <span className="text-xs font-black bg-rose-600 text-white px-3 py-1 rounded-full border-2 border-white mt-1 animate-pulse">Level {profile.level} Explorer</span>
          </div>

          <div className="flex-1 space-y-4">
            <h4 className="text-xl font-black text-slate-800 border-b-2 border-slate-100 pb-2 flex items-center gap-2">
              <span>🎟️</span> Visa Stamps Sticker Book
            </h4>

            <div className="grid grid-cols-2 gap-4 text-sm font-black">
              <div className="bg-slate-50 p-3.5 rounded-2xl border-2 border-slate-100">
                <p className="text-xs text-slate-400 font-black uppercase">Stamps Collected</p>
                <p className="text-2xl font-black text-rose-600 mt-1">{totalStampsWon} / {stamps.length}</p>
              </div>
              <div className="bg-slate-50 p-3.5 rounded-2xl border-2 border-slate-100">
                <p className="text-xs text-slate-400 font-black uppercase">Adventure Ready</p>
                <p className={`text-lg font-black mt-1 ${isPassportComplete ? 'text-emerald-500 animate-bounce' : 'text-amber-500'}`}>
                  {isPassportComplete ? 'READY FOR TRIP! ✅' : 'PREPARING 🎒'}
                </p>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-200 text-xs font-bold text-amber-900 leading-relaxed">
              ⭐ Note: Master at least 50% of the vocabulary words in any location to earn its beautiful sticker stamp below!
            </div>
          </div>
        </div>

        {/* Visa Stamps Grid Section */}
        <div>
          <h3 className="text-2xl font-black text-[#FFF275] mb-6 flex items-center gap-2 justify-center">
            <span>✈️</span> STICKER ALBUM
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
            {stamps.map((stamp) => (
              <div
                key={stamp.id}
                className={`relative aspect-square bg-[#FFFDF9]/10 hover:bg-[#FFFDF9]/15 border-4 border-dashed border-[#FFF275]/40 rounded-[32px] p-4 flex flex-col items-center justify-center text-center transition-all ${
                  stamp.isCompleted ? 'scale-105 rotate-3' : 'opacity-50'
                }`}
              >
                {stamp.isCompleted ? (
                  <div className="animate-wiggle">
                    {/* Retro Stamp Visual */}
                    <div className="w-24 h-24 rounded-full border-4 border-emerald-400 border-double flex items-center justify-center text-5xl bg-white shadow-lg text-slate-800 relative">
                      {stamp.emoji}
                      <span className="absolute bottom-2 text-[10px] font-black tracking-widest text-emerald-500 uppercase">PASSED</span>
                    </div>
                    <h5 className="text-sm font-black text-[#FFF275] mt-3">{stamp.name}</h5>
                    <p className="text-[10px] text-emerald-300 font-black">100% Validated</p>
                  </div>
                ) : (
                  <div>
                    <span className="text-5xl filter grayscale opacity-40">🔒</span>
                    <h5 className="text-xs font-black text-[#FFFDF9]/60 mt-2">{stamp.name}</h5>
                    <p className="text-[10px] text-rose-300 font-black">Needs {stamp.percentage}% → 50%</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Countdown Banner */}
        {isPassportComplete ? (
          <div className="mt-8 bg-[#FFF275] border-8 border-amber-400 text-slate-900 p-6 rounded-[32px] text-center shadow-lg animate-wiggle">
            <h4 className="text-2xl font-black">🎉 ALL STAMPS EARNED! TRIP COUNTDOWN UNLOCKED! 🎉</h4>
            <p className="font-bold text-slate-700 mt-1">Outstanding job! You are officially prepared for your massive family trip to Japan!</p>
            <div className="text-3xl font-black text-rose-600 mt-4 bg-white py-3.5 rounded-2xl inline-block px-8 shadow-md border-4 border-amber-200">
              ✈️ Only {daysLeft} Days Until Japan Adventure! 🗻
            </div>
          </div>
        ) : (
          <div className="mt-8 bg-[#FFFDF9]/10 border-2 border-dashed border-[#FFF275]/20 text-[#FFFDF9]/80 p-5 rounded-[24px] text-center text-xs font-black">
            🔒 Collect all 6 stamps to unlock the official Trip Countdown Timer & prove you are fully prepared!
          </div>
        )}
      </div>

      {/* Switch player quick links */}
      {state.activePlayer === 'parent' && (
        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => switchPlayer('james')}
            className="text-xs font-black text-slate-600 hover:text-slate-900 bg-white shadow-sm border-2 border-slate-200 px-4 py-2 rounded-full"
          >
            Check James's Stamps 👦🏻
          </button>
          <button
            onClick={() => switchPlayer('lily')}
            className="text-xs font-black text-slate-600 hover:text-slate-900 bg-white shadow-sm border-2 border-slate-200 px-4 py-2 rounded-full"
          >
            Check Lily's Stamps 👧🏻
          </button>
        </div>
      )}
    </div>
  );
};
export default Passport;
