import React, { useState } from 'react';
import { useAppState } from '../state/AppContext';
import { DESTINATIONS_DATA } from '../data/destinations';
import { FAMILY_CHALLENGES } from '../state/types';

export const ParentDashboard: React.FC = () => {
  const {
    state,
    updateTripDate,
    resetAllProgress,
    completeChallenge,
    sendParentMessage,
    setCustomGoal
  } = useAppState();

  const [tripDateInput, setTripDateInput] = useState(state.tripDate);

  // States for messaging
  const [targetKid, setTargetKid] = useState<'james' | 'lily'>('james');
  const [messageText, setMessageText] = useState('');
  const [messageXP, setMessageXP] = useState(25);

  // States for setting goals
  const [goalKid, setGoalKid] = useState<'james' | 'lily'>('james');
  const [goalText, setGoalText] = useState('Master 20 words in Kyoto & Tokyo!');
  const [goalTargetWords, setGoalTargetWords] = useState(20);

  const calculateMastery = (playerKey: 'james' | 'lily') => {
    const profile = state.profiles[playerKey];
    let totalMastered = 0;
    let totalWords = 0;

    DESTINATIONS_DATA.forEach((dest) => {
      totalMastered += profile.masteredVocab[dest.id]?.length || 0;
      totalWords += dest.vocabList.length;
    });

    return {
      mastered: totalMastered,
      total: totalWords,
      percentage: totalWords > 0 ? Math.round((totalMastered / totalWords) * 100) : 0
    };
  };

  const calculateWeakWords = (playerKey: 'james' | 'lily') => {
    const profile = state.profiles[playerKey];
    const weakList: { word: string; category: string; accuracy: number; destination: string }[] = [];

    DESTINATIONS_DATA.forEach((dest) => {
      dest.vocabList.forEach((vocab) => {
        const stats = profile.vocabStats[vocab.id];
        if (stats && stats.attempts >= 2) {
          const accuracy = Math.round((stats.correct / stats.attempts) * 100);
          if (accuracy < 70) {
            weakList.push({
              word: `${vocab.japanese} (${vocab.romaji}) - ${vocab.english}`,
              category: vocab.category,
              accuracy,
              destination: dest.name
            });
          }
        }
      });
    });

    return weakList;
  };

  const estimateStudyTime = (playerKey: 'james' | 'lily') => {
    const profile = state.profiles[playerKey];
    let totalAttempts = 0;
    Object.values(profile.vocabStats).forEach((stat) => {
      totalAttempts += stat.attempts;
    });

    // Spend 1.5 min per vocabulary attempt or game interaction
    const totalMinutes = Math.round(totalAttempts * 1.5);
    return totalMinutes > 0 ? `${totalMinutes} mins` : "Less than 5 mins";
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      alert("⚠️ Please enter some message text first!");
      return;
    }
    sendParentMessage(targetKid, messageText.trim(), messageXP);
    alert(`✉️ Sent encouragement message to ${targetKid === 'james' ? 'James' : 'Lily'} with a +${messageXP} XP Coin reward!`);
    setMessageText('');
  };

  const handleSetCustomGoal = () => {
    if (!goalText.trim()) {
      alert("⚠️ Please describe the goal!");
      return;
    }
    setCustomGoal(goalKid, {
      text: goalText.trim(),
      targetWords: goalTargetWords
    });
    alert(`🎯 Custom goal set successfully for ${goalKid === 'james' ? 'James' : 'Lily'}!`);
  };

  const handleClearGoal = (player: 'james' | 'lily') => {
    setCustomGoal(player, null);
    alert(`🎯 Custom goal cleared for ${player === 'james' ? 'James' : 'Lily'}.`);
  };

  const jamesStats = calculateMastery('james');
  const lilyStats = calculateMastery('lily');

  const jamesWeak = calculateWeakWords('james');
  const lilyWeak = calculateWeakWords('lily');

  // Trigger manual validation check for family challenges (demonstrating dynamic rewards checking)
  const handleCheckChallenge = (id: string, rewardXP: number) => {
    if (id === 'weekend-sync') {
      const jamesKyoto = state.profiles.james.masteredVocab['kyoto']?.length || 0;
      const lilyKyoto = state.profiles.lily.masteredVocab['kyoto']?.length || 0;
      if (jamesKyoto >= 5 && lilyKyoto >= 5) {
        completeChallenge('james', id, rewardXP);
        completeChallenge('lily', id, rewardXP);
        alert("🎉 Awesome! Weekend Sync Complete! Both kids got 50 XP rewards.");
      } else {
        alert("ℹ️ Not quite ready yet! Both James and Lily need to master 5+ Kyoto words.");
      }
    } else if (id === 'high-scorer') {
      const hasTokyoScore = Object.entries(state.profiles.james.highScores).some(([k, v]) => k.includes('tokyo') && v >= 80) ||
                           Object.entries(state.profiles.lily.highScores).some(([k, v]) => k.includes('tokyo') && v >= 80);
      if (hasTokyoScore) {
        completeChallenge('lily', id, rewardXP);
        alert("🎉 Congratulations! High Scorer Challenge complete!");
      } else {
        alert("ℹ️ Keep practicing! Get a score of 80+ in any Tokyo game to win.");
      }
    } else if (id === 'perfect-week') {
      if (state.profiles.james.streak >= 5 || state.profiles.lily.streak >= 5) {
        completeChallenge('james', id, rewardXP);
        completeChallenge('lily', id, rewardXP);
        alert("🎉 Amazing consecutive dedication! Perfect Streak complete!");
      } else {
        alert("ℹ️ Streaks are currently below 5 days. Keep up the daily learning!");
      }
    } else {
      // osaka numbers
      const jamesOsaka = state.profiles.james.masteredVocab['osaka']?.length || 0;
      if (jamesOsaka >= 10) {
        completeChallenge('james', id, rewardXP);
        alert("🎉 Excellent James! Number Cruncher Challenge complete!");
      } else {
        alert("ℹ️ James still needs to master a few more numbers in Osaka.");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Title */}
      <div className="border-b border-indigo-100 pb-4">
        <h2 className="text-3xl font-black text-indigo-950 flex items-center gap-2">
          👨‍👩‍👧‍👦 Mike's Parent Control Center 2.0
        </h2>
        <p className="text-slate-500 font-medium text-sm mt-1">
          Monitor your family's learning curve statistics, send custom encouragement notes, and set study goals!
        </p>
      </div>

      {/* Side-by-side Progress Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* JAMES STATS */}
        <div className="bg-white border-4 border-rose-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-rose-50 pb-3 mb-4">
              <h3 className="text-xl font-black text-rose-950 flex items-center gap-2">
                <span>👦🏻</span> James Progress (Age 9)
              </h3>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold bg-rose-100 text-rose-700 px-2.5 py-0.5 rounded-full">Level {state.profiles.james.level}</span>
                <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full">🪙 {state.profiles.james.spendableXP} Coins</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6 text-center">
              <div className="bg-rose-50/50 p-3 rounded-2xl border border-rose-50">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Vocabulary</span>
                <strong className="text-lg text-rose-700">{jamesStats.mastered} / {jamesStats.total}</strong>
              </div>
              <div className="bg-rose-50/50 p-3 rounded-2xl border border-rose-50">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Accuracy</span>
                <strong className="text-lg text-rose-700">{jamesStats.percentage}%</strong>
              </div>
              <div className="bg-rose-50/50 p-3 rounded-2xl border border-rose-50">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Study Time</span>
                <strong className="text-sm font-black text-slate-700 block mt-1">{estimateStudyTime('james')}</strong>
              </div>
            </div>

            {/* Weak areas list */}
            <div className="mb-6">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Needs Improvement (Accuracy &lt;70%)</h4>
              {jamesWeak.length > 0 ? (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {jamesWeak.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs font-bold bg-rose-50 border border-rose-100 p-2 rounded-xl">
                      <span className="text-rose-950">{item.word} ({item.destination})</span>
                      <span className="text-rose-600 font-extrabold">{item.accuracy}% acc</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 font-medium italic">Excellent performance! No weak areas identified.</p>
              )}
            </div>
          </div>

          {/* Active Goal */}
          <div className="border-t border-rose-50 pt-4 bg-rose-50/20 p-3 rounded-2xl">
            <span className="text-[9px] font-black uppercase text-rose-700">Active Custom Goal</span>
            {state.profiles.james.customGoal ? (
              <div className="flex justify-between items-center mt-1">
                <div className="text-xs">
                  <p className="font-extrabold text-slate-800">"{state.profiles.james.customGoal.text}"</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">Target Words: {state.profiles.james.customGoal.targetWords}</p>
                </div>
                <button
                  onClick={() => handleClearGoal('james')}
                  className="text-[10px] font-black text-red-500 bg-white border border-red-200 px-2 py-1 rounded-lg hover:bg-red-50"
                >
                  Clear Goal
                </button>
              </div>
            ) : (
              <p className="text-xs text-slate-400 font-bold italic mt-1">No custom goal set yet. Set one below!</p>
            )}
          </div>
        </div>

        {/* LILY STATS */}
        <div className="bg-white border-4 border-amber-200 rounded-3xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center border-b border-amber-50 pb-3 mb-4">
              <h3 className="text-xl font-black text-amber-950 flex items-center gap-2">
                <span>👧🏻</span> Lily Progress (Age 5)
              </h3>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full">Level {state.profiles.lily.level}</span>
                <span className="text-xs font-bold bg-amber-100 text-amber-700 px-2.5 py-0.5 rounded-full">🪙 {state.profiles.lily.spendableXP} Coins</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 mb-6 text-center">
              <div className="bg-amber-50/50 p-3 rounded-2xl border border-amber-50">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Vocabulary</span>
                <strong className="text-lg text-amber-700">{lilyStats.mastered} / {lilyStats.total}</strong>
              </div>
              <div className="bg-amber-50/50 p-3 rounded-2xl border border-amber-50">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Accuracy</span>
                <strong className="text-lg text-amber-700">{lilyStats.percentage}%</strong>
              </div>
              <div className="bg-amber-50/50 p-3 rounded-2xl border border-amber-50">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Study Time</span>
                <strong className="text-sm font-black text-slate-700 block mt-1">{estimateStudyTime('lily')}</strong>
              </div>
            </div>

            {/* Weak areas list */}
            <div className="mb-6">
              <h4 className="text-xs font-black text-slate-400 uppercase tracking-wider mb-2">Needs Improvement (Accuracy &lt;70%)</h4>
              {lilyWeak.length > 0 ? (
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {lilyWeak.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs font-bold bg-amber-50 border border-amber-100 p-2 rounded-xl">
                      <span className="text-amber-950">{item.word} ({item.destination})</span>
                      <span className="text-amber-600 font-extrabold">{item.accuracy}% acc</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 font-medium italic">Excellent performance! No weak areas identified.</p>
              )}
            </div>
          </div>

          {/* Active Goal */}
          <div className="border-t border-amber-50 pt-4 bg-amber-50/20 p-3 rounded-2xl">
            <span className="text-[9px] font-black uppercase text-amber-700">Active Custom Goal</span>
            {state.profiles.lily.customGoal ? (
              <div className="flex justify-between items-center mt-1">
                <div className="text-xs">
                  <p className="font-extrabold text-slate-800">"{state.profiles.lily.customGoal.text}"</p>
                  <p className="text-[10px] text-slate-400 font-bold mt-0.5">Target Words: {state.profiles.lily.customGoal.targetWords}</p>
                </div>
                <button
                  onClick={() => handleClearGoal('lily')}
                  className="text-[10px] font-black text-red-500 bg-white border border-red-200 px-2 py-1 rounded-lg hover:bg-red-50"
                >
                  Clear Goal
                </button>
              </div>
            ) : (
              <p className="text-xs text-slate-400 font-bold italic mt-1">No custom goal set yet. Set one below!</p>
            )}
          </div>
        </div>

      </div>

      {/* PARENT ACTIONS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Set Custom Goals Box */}
        <div className="bg-white border-2 border-indigo-100 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-black text-indigo-950 flex items-center gap-2">
            <span>🎯</span> Assign Custom Learning Goal
          </h3>
          <p className="text-slate-500 text-xs leading-relaxed">
            Configure custom vocabulary milestone goals for James and Lily. Unlocked countdown banners will automatically present the reward!
          </p>

          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                onClick={() => setGoalKid('james')}
                className={`flex-1 py-1.5 text-xs font-black rounded-lg border transition-all ${
                  goalKid === 'james' ? 'bg-rose-500 text-white border-rose-600' : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                James 👦🏻
              </button>
              <button
                onClick={() => setGoalKid('lily')}
                className={`flex-1 py-1.5 text-xs font-black rounded-lg border transition-all ${
                  goalKid === 'lily' ? 'bg-amber-500 text-white border-amber-600' : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                Lily 👧🏻
              </button>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Goal description</label>
              <input
                type="text"
                value={goalText}
                onChange={(e) => setGoalText(e.target.value)}
                placeholder="E.g. Master 30 words across Japan!"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Target mastered count</label>
                <input
                  type="number"
                  value={goalTargetWords}
                  onChange={(e) => setGoalTargetWords(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-500"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleSetCustomGoal}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs py-2 px-4 rounded-xl border-b-2 border-indigo-800 active:translate-y-0.5 transition-all text-center block"
                >
                  Set Custom Goal
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Send Direct Messages with Rewards */}
        <div className="bg-white border-2 border-indigo-100 rounded-3xl p-6 shadow-sm space-y-4">
          <h3 className="text-lg font-black text-indigo-950 flex items-center gap-2">
            <span>✉️</span> Send Encouragement Message
          </h3>
          <p className="text-slate-500 text-xs leading-relaxed">
            Write supportive messages, congratulations, or reminders, and attach a Coin/XP bonus to surprise your kids!
          </p>

          <div className="space-y-3">
            <div className="flex gap-2">
              <button
                onClick={() => setTargetKid('james')}
                className={`flex-1 py-1.5 text-xs font-black rounded-lg border transition-all ${
                  targetKid === 'james' ? 'bg-rose-500 text-white border-rose-600' : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                James 👦🏻
              </button>
              <button
                onClick={() => setTargetKid('lily')}
                className={`flex-1 py-1.5 text-xs font-black rounded-lg border transition-all ${
                  targetKid === 'lily' ? 'bg-amber-500 text-white border-amber-600' : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                Lily 👧🏻
              </button>
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Encouragement Text</label>
              <textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="Write something kind, e.g. You are doing fantastic! I love your custom avatar! Keep it up!"
                className="w-full h-16 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-500 resize-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">XP Coin Reward Bonus</label>
                <select
                  value={messageXP}
                  onChange={(e) => setMessageXP(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold text-slate-700 focus:outline-none focus:border-indigo-500"
                >
                  <option value={15}>+15 Coins</option>
                  <option value={25}>+25 Coins</option>
                  <option value={50}>+50 Coins</option>
                  <option value={100}>+100 Coins</option>
                </select>
              </div>
              <div className="flex items-end">
                <button
                  onClick={handleSendMessage}
                  className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs py-2 px-4 rounded-xl border-b-2 border-emerald-700 active:translate-y-0.5 transition-all text-center block"
                >
                  Send & Gift Coins!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global settings and scheduler */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Trip Settings */}
        <div className="bg-white border-2 border-indigo-50 rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-black text-indigo-950 mb-3">📅 Trip Scheduling & Target Dates</h3>
          <p className="text-slate-500 text-xs mb-4">Set your upcoming flight date. Unlocked passport countdown updates accordingly.</p>

          <div className="flex gap-3">
            <input
              type="date"
              value={tripDateInput}
              onChange={(e) => setTripDateInput(e.target.value)}
              className="border border-slate-200 rounded-xl px-4 py-2 text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-700"
            />
            <button
              onClick={() => {
                updateTripDate(tripDateInput);
                alert("📅 Trip date updated successfully!");
              }}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-sm px-5 py-2 rounded-xl shadow-sm transition-all"
            >
              Update Target Date
            </button>
          </div>

          <div className="mt-6 border-t border-slate-100 pt-4 flex justify-between items-center">
            <div>
              <h5 className="text-xs font-black text-slate-400 uppercase">Emergency Safety Switch</h5>
              <p className="text-[11px] text-slate-500">Completely clears all cached levels and resets exploration.</p>
            </div>
            <button
              onClick={() => {
                if(confirm("Are you sure you want to completely delete all family progress? This cannot be undone.")) {
                  resetAllProgress();
                }
              }}
              className="text-xs font-bold text-red-600 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-1.5 rounded-xl transition-all"
            >
              Reset All Progress
            </button>
          </div>
        </div>

        {/* Dynamic Family Challenges */}
        <div className="bg-white border-2 border-indigo-50 rounded-3xl p-6 shadow-sm">
          <h3 className="text-lg font-black text-indigo-950 mb-1 flex items-center gap-2">
            <span>🏆</span> Live Family Challenges
          </h3>
          <p className="text-xs text-slate-500 mb-4">Collaborate and compete to trigger bonus XP rewards for James & Lily!</p>

          <div className="space-y-4">
            {FAMILY_CHALLENGES.map((challenge) => {
              // Check if completed already
              const isDone = state.profiles.james.completedChallenges.includes(challenge.id) ||
                             state.profiles.lily.completedChallenges.includes(challenge.id);

              return (
                <div key={challenge.id} className="p-4 bg-slate-50 border border-slate-150 rounded-2xl flex justify-between items-center">
                  <div className="space-y-1 pr-4">
                    <h5 className="font-extrabold text-slate-800 text-sm">{challenge.name}</h5>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{challenge.description}</p>
                    <span className="text-[10px] font-black bg-emerald-50 text-emerald-700 border border-emerald-100 px-2 py-0.5 rounded-full inline-block">
                      +{challenge.rewardXP} XP Reward
                    </span>
                  </div>

                  <button
                    disabled={isDone}
                    onClick={() => handleCheckChallenge(challenge.id, challenge.rewardXP)}
                    className={`font-black text-xs px-3 py-2 rounded-xl transition-all shadow-sm ${
                      isDone
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-200 cursor-default'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white active:scale-95'
                    }`}
                  >
                    {isDone ? 'Claimed! ✅' : 'Claim Reward'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
export default ParentDashboard;
