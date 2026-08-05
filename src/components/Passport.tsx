import React from 'react';
import { useAppState } from '../state/AppContext';
import { DESTINATIONS_DATA } from '../data/destinations';
import { SHOP_ITEMS } from '../data/shopItems';

export const Passport: React.FC = () => {
  const { state, switchPlayer } = useAppState();
  const active = state.activePlayer === 'parent' ? 'james' : state.activePlayer;
  const profile = state.profiles[active];

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

  const calculateDaysUntilTrip = () => {
    const today = new Date();
    const trip = new Date(state.tripDate);
    const diffTime = trip.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const daysLeft = calculateDaysUntilTrip();

  const ownedStickers = SHOP_ITEMS.filter(s => s.category === 'stickers' && (profile.unlockedStickers?.includes(s.id) || profile.unlockedItemIds?.includes(s.id)));

  const unlockedIds = profile.unlockedItemIds || [];
  const ownedCosmetics = SHOP_ITEMS.filter(i => i.category === 'cosmetics' && unlockedIds.includes(i.id));
  const ownedThemes = SHOP_ITEMS.filter(i => i.category === 'themes' && unlockedIds.includes(i.id));
  const ownedFrames = SHOP_ITEMS.filter(i => i.category === 'frames' && unlockedIds.includes(i.id));
  const ownedBadges = SHOP_ITEMS.filter(i => i.category === 'badges' && unlockedIds.includes(i.id));
  const ownedFilters = SHOP_ITEMS.filter(i => i.category === 'filters' && unlockedIds.includes(i.id));
  const ownedStatus = SHOP_ITEMS.filter(i => i.category === 'status' && unlockedIds.includes(i.id));

  const getFilterCSS = () => {
    if (!profile.equippedFilterId) return "";
    if (profile.equippedFilterId === 'flt_0') return "sepia contrast-110 brightness-95";
    if (profile.equippedFilterId === 'flt_1') return "grayscale contrast-125";
    if (profile.equippedFilterId === 'flt_2') return "contrast-125 saturate-150";
    if (profile.equippedFilterId === 'flt_3') return "hue-rotate-15 contrast-115 saturate-125";
    if (profile.equippedFilterId === 'flt_4') return "hue-rotate-90 invert-0 contrast-125";
    if (profile.equippedFilterId === 'flt_5') return "saturate-200 contrast-110";
    if (profile.equippedFilterId === 'flt_6') return "blur-[0.5px] saturate-125 sepia-10";
    return "hue-rotate-30 saturate-150";
  };

  return (
    <div className={`max-w-4xl mx-auto px-4 py-8 transition-all duration-300 ${getFilterCSS()}`}>
      <div className="bg-[#A13D51] border-[16px] border-[#7D2235] rounded-[48px] shadow-2xl p-6 md:p-10 text-white relative overflow-hidden">
        <div className="absolute top-4 right-4 text-4xl opacity-35 animate-wiggle inline-block">💮</div>
        <div className="absolute bottom-4 left-4 text-4xl opacity-35 animate-soft inline-block">🌊</div>

        <div className="text-center pb-6 border-b-4 border-[#7D2235]">
          <div className="text-6xl mb-3 animate-wiggle inline-block">🇯🇵</div>
          <h2 className="text-3xl font-black tracking-widest text-[#FFF275] drop-shadow-sm">JAPAN TRAVEL PASSPORT</h2>
          <p className="text-[#FFFDF9] text-sm font-black uppercase tracking-wider mt-1">
            {profile.avatarCustomization?.customName || profile.name}'s Language Companion!
          </p>
        </div>

        <div className="bg-[#FFFDF9] text-slate-800 rounded-[32px] p-6 my-8 border-8 border-[#FFF275] shadow-lg flex flex-col md:flex-row gap-6">
          <div className="flex flex-col items-center justify-center bg-rose-50 border-4 border-rose-200 rounded-[24px] p-5 w-full md:w-1/3 text-center">
            <span className="text-8xl mb-3 animate-soft">{profile.avatarCustomization?.face || profile.avatar}</span>
            <h3 className="text-2xl font-black text-rose-950">{profile.avatarCustomization?.customName || profile.name}</h3>
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

            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">My Collection Discovery Status</span>
              <div className="grid grid-cols-3 gap-2 mt-2 text-center text-xs font-black text-slate-700">
                <div className="bg-white p-2 border border-slate-100 rounded-xl">
                  <span className="block text-rose-500">Stickers</span>
                  <strong>{ownedStickers.length} / 150</strong>
                </div>
                <div className="bg-white p-2 border border-slate-100 rounded-xl">
                  <span className="block text-indigo-500">Avatar Set</span>
                  <strong>{ownedCosmetics.length} / 120</strong>
                </div>
                <div className="bg-white p-2 border border-slate-100 rounded-xl">
                  <span className="block text-amber-500">Themes & Frames</span>
                  <strong>{ownedThemes.length + ownedFrames.length} / 65</strong>
                </div>
              </div>
            </div>

            <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-200 text-xs font-bold text-amber-900 leading-relaxed">
              ⭐ Note: Master at least 50% of the vocabulary words in any location to earn its beautiful sticker stamp below! Keep learning to earn coins for the Sticker Store!
            </div>
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-2xl font-black text-[#FFF275] mb-6 flex items-center gap-2 justify-center">
            <span>✈️</span> STICKER ALBUM (STAMPS)
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

        <div className="border-t-4 border-[#7D2235] py-8">
          <h3 className="text-2xl font-black text-[#FFF275] mb-4 flex items-center gap-2 justify-center">
            <span>🏆</span> MY EARNED MILESTONE BADGES ({ownedBadges.length})
          </h3>
          <p className="text-xs text-[#FFFDF9]/80 text-center font-bold mb-6 max-w-md mx-auto">
            These are the prestigious badges you earned through dedicated practice and study achievements!
          </p>

          {ownedBadges.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {ownedBadges.map((badge) => (
                <div
                  key={badge.id}
                  className="bg-white/10 border-2 border-dashed border-[#FFF275]/30 rounded-2xl p-4 flex flex-col items-center text-center relative"
                >
                  <span className="text-4xl block mb-2">🏅</span>
                  <span className="text-xs font-black text-[#FFF275]">{badge.name}</span>
                  <span className="text-[9px] text-[#FFFDF9]/60 font-bold mt-1 uppercase">
                    {badge.description}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-black/10 border-2 border-dashed border-[#FFF275]/20 p-6 rounded-2xl text-center">
              <span className="text-3xl block opacity-45 mb-2">🔒</span>
              <p className="text-xs font-bold text-[#FFFDF9]/70 max-w-xs mx-auto">
                No achievement badges unlocked yet! Master entire cities and maintain streaks to earn these honors!
              </p>
            </div>
          )}
        </div>

        <div className="border-t-4 border-[#7D2235] pt-8">
          <h3 className="text-2xl font-black text-[#FFF275] mb-4 flex items-center gap-2 justify-center">
            <span>🎨</span> MY COLLECTED STICKERS ({ownedStickers.length})
          </h3>
          <p className="text-xs text-[#FFFDF9]/80 text-center font-bold mb-6 max-w-md mx-auto">
            These are the lovely stickers you purchased from the Adventure Sticker Store using your hard-earned coins!
          </p>

          {ownedStickers.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
              {ownedStickers.map((sticker) => (
                <div
                  key={sticker.id}
                  className={`bg-white/10 hover:bg-white/15 border-2 border-[#FFF275]/30 rounded-2xl p-3 flex flex-col items-center text-center transition-transform hover:scale-110 duration-200 relative ${sticker.effectClass || ''}`}
                >
                  <span className="text-4xl block mb-2 select-none">{sticker.emoji}</span>
                  <span className="text-[10px] font-black text-[#FFF275] leading-tight break-words max-w-[80px]">
                    {sticker.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-black/10 border-2 border-dashed border-[#FFF275]/20 p-8 rounded-2xl text-center">
              <span className="text-4xl block opacity-45 mb-2">🏪</span>
              <p className="text-xs font-bold text-[#FFFDF9]/70 max-w-xs mx-auto">
                No stickers purchased yet! Visit the Sticker Store or Shop 2.0 on the top menu navigation and buy cool animations with your coins!
              </p>
            </div>
          )}
        </div>

        {isPassportComplete ? (
          <div className="mt-10 bg-[#FFF275] border-8 border-amber-400 text-slate-900 p-6 rounded-[32px] text-center shadow-lg animate-wiggle">
            <h4 className="text-2xl font-black">🎉 ALL STAMPS EARNED! TRIP COUNTDOWN UNLOCKED! 🎉</h4>
            <p className="font-bold text-slate-700 mt-1">Outstanding job! You are officially prepared for your massive family trip to Japan!</p>
            <div className="text-3xl font-black text-rose-600 mt-4 bg-white py-3.5 rounded-2xl inline-block px-8 shadow-md border-4 border-amber-200">
              ✈️ Only {daysLeft} Days Until Japan Adventure! 🗻
            </div>
          </div>
        ) : (
          <div className="mt-10 bg-[#FFFDF9]/10 border-2 border-dashed border-[#FFF275]/20 text-[#FFFDF9]/80 p-5 rounded-[24px] text-center text-xs font-black">
            🔒 Collect all 6 stamps to unlock the official Trip Countdown Timer & prove you are fully prepared!
          </div>
        )}
      </div>

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
