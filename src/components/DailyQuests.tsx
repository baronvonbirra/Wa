import React from 'react';
import { useAppState } from '../state/AppContext';

export const DailyQuests: React.FC = () => {
  const { state, claimQuestReward } = useAppState();
  const activeKid = state.activePlayer === 'parent' ? 'james' : state.activePlayer;
  const profile = state.profiles[activeKid];

  const quests = profile.dailyQuests || [];

  const handleClaim = (questId: string) => {
    claimQuestReward(activeKid, questId);
    alert("🎉 Awesome job! Bonus XP and Coins have been added to your balance!");
  };

  return (
    <div className="bg-white border-4 border-rose-300 p-5 rounded-[28px] shadow-md w-full relative z-10">
      <div className="flex items-center justify-between border-b-2 border-rose-50 pb-2.5 mb-4">
        <div className="flex items-center gap-2">
          <span className="text-3xl animate-bounce">📅</span>
          <div>
            <h4 className="text-sm font-black text-slate-800 uppercase tracking-wide">Today's Mini-Quests!</h4>
            <p className="text-[10px] text-slate-400 font-bold">Complete goals for massive extra XP & Coins!</p>
          </div>
        </div>
        <span className="text-xs font-black bg-rose-100 text-rose-700 px-2 py-0.5 rounded-full">3 Active</span>
      </div>

      <div className="space-y-3">
        {quests.map((quest) => {
          const percent = Math.min(100, Math.round((quest.progress / quest.target) * 100));

          return (
            <div
              key={quest.id}
              className={`p-3.5 rounded-2xl border-2 transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 ${
                quest.claimed
                  ? 'bg-emerald-50/40 border-emerald-100 opacity-60'
                  : quest.completed
                    ? 'bg-rose-50 border-rose-300 animate-pulse'
                    : 'bg-slate-50/50 border-slate-100'
              }`}
            >
              <div className="flex-1 w-full">
                <div className="flex items-center justify-between">
                  <h5 className="font-extrabold text-xs text-slate-800 flex items-center gap-1">
                    {quest.title}
                  </h5>
                  <span className="text-[10px] text-rose-600 font-black bg-white px-2 py-0.5 rounded-full border border-rose-100">
                    +{quest.rewardXP} XP / Coins
                  </span>
                </div>

                <p className="text-[10px] text-slate-400 font-semibold mt-0.5 leading-tight">
                  {quest.description}
                </p>

                {/* Progress bar */}
                {!quest.claimed && (
                  <div className="mt-2 w-full">
                    <div className="flex justify-between items-center text-[9px] font-black text-slate-400 mb-0.5">
                      <span>Progress</span>
                      <span>{quest.progress} / {quest.target} ({percent}%)</span>
                    </div>
                    <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
                      <div
                        className="bg-rose-400 h-full rounded-full transition-all duration-300"
                        style={{ width: `${percent}%` }}
                      ></div>
                    </div>
                  </div>
                )}
              </div>

              <div className="w-full sm:w-auto text-right flex-shrink-0">
                {quest.claimed ? (
                  <span className="text-emerald-600 font-black text-xs flex items-center gap-1.5 justify-center sm:justify-end bg-emerald-50 px-3 py-1.5 rounded-xl">
                    Claimed! ✅
                  </span>
                ) : quest.completed ? (
                  <button
                    onClick={() => handleClaim(quest.id)}
                    className="w-full sm:w-auto bg-emerald-400 hover:bg-emerald-500 text-white font-black text-xs px-4 py-2 rounded-xl border-b-2 border-emerald-600 shadow-sm active:translate-y-0.5 transition-all"
                  >
                    🎁 Claim Reward!
                  </button>
                ) : (
                  <span className="w-full sm:w-auto text-slate-400 font-black text-xs px-4 py-2 rounded-xl bg-slate-100 border border-slate-200 text-center block">
                    In Progress ⏳
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default DailyQuests;
