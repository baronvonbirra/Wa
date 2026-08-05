import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, INITIAL_STATE, PlayerProgress, AvatarCustomization, DailyQuest, ParentMessage } from './types';
import { DESTINATIONS_DATA } from '../data/destinations';

interface AppContextType {
  state: AppState;
  switchPlayer: (player: "james" | "lily" | "merche" | "parent") => void;
  updateXP: (player: "james" | "lily" | "merche", amount: number) => void;
  recordVocabAttempt: (player: "james" | "lily" | "merche", destId: string, vocabId: string, correct: boolean) => void;
  updateHighScore: (player: "james" | "lily" | "merche", gameKey: string, score: number) => void;
  completeChallenge: (player: "james" | "lily" | "merche", challengeId: string, rewardXP: number) => void;
  updateTripDate: (date: string) => void;
  toggleSound: () => void;
  unlockNextDestination: (player: "james" | "lily" | "merche", currentDestId: string) => void;
  resetAllProgress: () => void;
  // Expanded expansion actions:
  updateAvatar: (player: "james" | "lily" | "merche", customization: Partial<AvatarCustomization>) => void;
  buySticker: (player: "james" | "lily" | "merche", stickerId: string, costXP: number) => boolean;
  completeQuestStep: (player: "james" | "lily" | "merche", questId: string, amount: number) => void;
  claimQuestReward: (player: "james" | "lily" | "merche", questId: string) => void;
  readParentMessage: (player: "james" | "lily" | "merche", messageId: string) => void;
  claimParentMessageReward: (player: "james" | "lily" | "merche", messageId: string) => void;
  sendParentMessage: (player: "james" | "lily" | "merche", text: string, rewardXP?: number) => void;
  setCustomGoal: (player: "james" | "lily" | "merche", goal: { text: string; targetWords: number } | null) => void;
  checkCustomGoalCompletion: (player: "james" | "lily" | "merche") => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "japan_quest_state_v1";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);

        // Build hydrated state by spreading default and parsed properties
        const hydrated: AppState = {
          ...INITIAL_STATE,
          ...parsed,
          profiles: {
            james: { ...INITIAL_STATE.profiles.james, ...(parsed.profiles?.james || {}) },
            lily: { ...INITIAL_STATE.profiles.lily, ...(parsed.profiles?.lily || {}) },
            merche: { ...INITIAL_STATE.profiles.merche, ...(parsed.profiles?.merche || {}) },
          }
        };

        // For each profile, ensure inner objects/arrays are hydrated safely if they were missing or had different structure
        (['james', 'lily', 'merche'] as const).forEach((pKey) => {
          const profile = hydrated.profiles[pKey];
          const initialProfile = INITIAL_STATE.profiles[pKey];

          if (!profile.masteredVocab) {
            profile.masteredVocab = { ...initialProfile.masteredVocab };
          } else {
            // Ensure all destination keys exist in masteredVocab
            const dests = ["kyoto", "tokyo", "osaka", "train", "okinawa", "takayama"] as const;
            dests.forEach(d => {
              if (!profile.masteredVocab[d]) {
                profile.masteredVocab[d] = [];
              }
            });
          }

          if (profile.spendableXP === undefined) {
            profile.spendableXP = profile.totalXP > 0 ? profile.totalXP + 150 : 150;
          }

          if (!profile.unlockedStickers) {
            profile.unlockedStickers = [];
          }

          if (!profile.dailyQuests || profile.dailyQuests.length === 0) {
            profile.dailyQuests = initialProfile.dailyQuests;
          }

          if (!profile.parentMessages || profile.parentMessages.length === 0) {
            profile.parentMessages = initialProfile.parentMessages;
          }

          if (!profile.avatarCustomization) {
            profile.avatarCustomization = initialProfile.avatarCustomization;
          }

          if (!profile.unlockedDestinations) {
            profile.unlockedDestinations = { ...initialProfile.unlockedDestinations };
          } else {
            // Ensure kyoto is always unlocked
            if (profile.unlockedDestinations.kyoto === undefined) {
              profile.unlockedDestinations.kyoto = true;
            }
          }

          if (!profile.vocabStats) {
            profile.vocabStats = {};
          }

          if (!profile.highScores) {
            profile.highScores = {};
          }

          if (!profile.completedChallenges) {
            profile.completedChallenges = [];
          }

          if (!profile.unlockedFacts) {
            profile.unlockedFacts = [];
          }
        });

        return hydrated;
      } catch (e) {
        console.error("Failed to parse saved state, resetting...", e);
      }
    }
    return INITIAL_STATE;
  });

  // Persist state to localStorage on any change
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Handle active player switch and update consecutive day streaks
  const switchPlayer = (player: "james" | "lily" | "merche" | "parent") => {
    setState((prev) => {
      const updated = { ...prev, activePlayer: player };
      if (player === "james" || player === "lily" || player === "merche") {
        const profile = { ...updated.profiles[player] };
        const todayStr = new Date().toISOString().split('T')[0];

        if (profile.lastPlayedDate !== todayStr) {
          if (profile.lastPlayedDate) {
            const lastDate = new Date(profile.lastPlayedDate);
            const today = new Date(todayStr);
            const diffTime = Math.abs(today.getTime() - lastDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays === 1) {
              profile.streak += 1;
            } else if (diffDays > 1) {
              profile.streak = 1; // reset streak if gap of > 1 day
            }
          } else {
            profile.streak = 1; // first ever session
          }
          profile.lastPlayedDate = todayStr;
        }
        updated.profiles[player] = profile;
      }
      return updated;
    });
  };

  const updateXP = (player: "james" | "lily" | "merche", amount: number) => {
    setState((prev) => {
      const profile = { ...prev.profiles[player] };
      profile.totalXP += amount;
      profile.spendableXP += amount;
      profile.level = Math.floor(profile.totalXP / 20) + 1;

      // Unlock "Japan Facts"
      const expectedFactCount = Math.floor(profile.totalXP / 30);
      const currentUnlocked = [...profile.unlockedFacts];

      // Collect all possible facts
      const allFacts: string[] = [];
      DESTINATIONS_DATA.forEach(d => {
        d.japanFacts.forEach(fact => {
          if (!allFacts.includes(fact)) allFacts.push(fact);
        });
      });

      while (currentUnlocked.length < expectedFactCount && currentUnlocked.length < allFacts.length) {
        const nextFact = allFacts[currentUnlocked.length];
        if (nextFact) {
          currentUnlocked.push(nextFact);
        } else {
          break;
        }
      }
      profile.unlockedFacts = currentUnlocked;

      // Automatically tick quests that depend on gaining XP
      const updatedQuests = profile.dailyQuests.map(q => {
        if (q.id === "morning-learner" && !q.completed) {
          const newProgress = Math.min(q.target, q.progress + amount);
          return {
            ...q,
            progress: newProgress,
            completed: newProgress >= q.target
          };
        }
        return q;
      });
      profile.dailyQuests = updatedQuests;

      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [player]: profile
        }
      };
    });
  };

  const recordVocabAttempt = (player: "james" | "lily" | "merche", destId: string, vocabId: string, correct: boolean) => {
    setState((prev) => {
      const profile = { ...prev.profiles[player] };
      const stats = { ...profile.vocabStats };

      if (!stats[vocabId]) {
        stats[vocabId] = { attempts: 0, correct: 0 };
      }
      stats[vocabId].attempts += 1;
      if (correct) {
        stats[vocabId].correct += 1;
      }
      profile.vocabStats = stats;

      // Mastered check: if they got it right, add to mastered list
      const destMastered = profile.masteredVocab[destId] ? [...profile.masteredVocab[destId]] : [];
      if (correct && !destMastered.includes(vocabId)) {
        destMastered.push(vocabId);
      }
      profile.masteredVocab = {
        ...profile.masteredVocab,
        [destId]: destMastered
      };

      // Check progression lock: "Complete 50% of lessons in a destination -> unlock next"
      const destOrder = ["kyoto", "tokyo", "osaka", "train", "okinawa", "takayama"];
      const currentDestIdx = destOrder.indexOf(destId);
      const currentDest = DESTINATIONS_DATA.find(d => d.id === destId);

      if (currentDest) {
        const totalWords = currentDest.vocabList.length;
        const masteredWordsCount = destMastered.length;
        const masteredPercentage = masteredWordsCount / totalWords;

        if (masteredPercentage >= 0.50 && currentDestIdx !== -1 && currentDestIdx < destOrder.length - 1) {
          const nextDestId = destOrder[currentDestIdx + 1];
          profile.unlockedDestinations = {
            ...profile.unlockedDestinations,
            [nextDestId]: true
          };
        }
      }

      // Check custom goal completion if exists
      if (profile.customGoal && !profile.customGoal.completed) {
        let overallMastered = 0;
        DESTINATIONS_DATA.forEach(d => {
          overallMastered += profile.masteredVocab[d.id]?.length || 0;
        });
        if (overallMastered >= profile.customGoal.targetWords) {
          profile.customGoal = {
            ...profile.customGoal,
            completed: true
          };
          // Give bonus reward
          profile.totalXP += 100;
          profile.spendableXP += 100;
          profile.level = Math.floor(profile.totalXP / 20) + 1;
          profile.parentMessages.push({
            id: `goal-congrats-${Date.now()}`,
            text: `🎉 You completed your custom goal: "${profile.customGoal.text}"! Fantastic job! Here's a +100 XP reward!`,
            date: new Date().toISOString().split('T')[0],
            read: false,
            rewardXP: 0,
            claimed: true
          });
        }
      }

      // Progress correct answers count for "accuracy-star" quest
      if (correct) {
        profile.dailyQuests = profile.dailyQuests.map(q => {
          if (q.id === "accuracy-star" && !q.completed) {
            const nextProg = Math.min(q.target, q.progress + 1);
            return { ...q, progress: nextProg, completed: nextProg >= q.target };
          }
          return q;
        });
      }

      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [player]: profile
        }
      };
    });
  };

  const updateHighScore = (player: "james" | "lily" | "merche", gameKey: string, score: number) => {
    setState((prev) => {
      const profile = { ...prev.profiles[player] };
      const highScores = { ...profile.highScores };
      const currentBest = highScores[gameKey] || 0;
      if (score > currentBest) {
        highScores[gameKey] = score;
      }
      profile.highScores = highScores;

      // Update quests like complete 2 games today
      profile.dailyQuests = profile.dailyQuests.map(q => {
        if (q.id === "speed-demon" && !q.completed) {
          const nextProg = Math.min(q.target, q.progress + 1);
          return { ...q, progress: nextProg, completed: nextProg >= q.target };
        }
        return q;
      });

      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [player]: profile
        }
      };
    });
  };

  const completeChallenge = (player: "james" | "lily" | "merche", challengeId: string, rewardXP: number) => {
    setState((prev) => {
      const profile = { ...prev.profiles[player] };
      const completed = [...profile.completedChallenges];
      if (!completed.includes(challengeId)) {
        completed.push(challengeId);
        profile.completedChallenges = completed;
        profile.totalXP += rewardXP;
        profile.spendableXP += rewardXP;
        profile.level = Math.floor(profile.totalXP / 20) + 1;
      }
      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [player]: profile
        }
      };
    });
  };

  const updateTripDate = (date: string) => {
    setState((prev) => ({
      ...prev,
      tripDate: date
    }));
  };

  const toggleSound = () => {
    setState((prev) => ({
      ...prev,
      soundEnabled: !prev.soundEnabled
    }));
  };

  const unlockNextDestination = (player: "james" | "lily" | "merche", currentDestId: string) => {
    setState((prev) => {
      const profile = { ...prev.profiles[player] };
      const destOrder = ["kyoto", "tokyo", "osaka", "train", "okinawa", "takayama"];
      const idx = destOrder.indexOf(currentDestId);
      if (idx !== -1 && idx < destOrder.length - 1) {
        const nextId = destOrder[idx + 1];
        profile.unlockedDestinations = {
          ...profile.unlockedDestinations,
          [nextId]: true
        };
      }
      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [player]: profile
        }
      };
    });
  };

  const resetAllProgress = () => {
    setState(INITIAL_STATE);
  };

  // Expanded actions:
  const updateAvatar = (player: "james" | "lily" | "merche", customization: Partial<AvatarCustomization>) => {
    setState((prev) => {
      const profile = { ...prev.profiles[player] };
      profile.avatarCustomization = {
        ...profile.avatarCustomization,
        ...customization
      };
      // Map custom avatar back to simple avatar representation for compatibility
      if (customization.face) {
        profile.avatar = customization.face;
      }
      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [player]: profile
        }
      };
    });
  };

  const buySticker = (player: "james" | "lily" | "merche", stickerId: string, costXP: number): boolean => {
    let success = false;
    setState((prev) => {
      const profile = { ...prev.profiles[player] };
      if (profile.spendableXP >= costXP && !profile.unlockedStickers.includes(stickerId)) {
        profile.spendableXP -= costXP;
        profile.unlockedStickers = [...profile.unlockedStickers, stickerId];
        success = true;
      }
      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [player]: profile
        }
      };
    });
    return success;
  };

  const completeQuestStep = (player: "james" | "lily" | "merche", questId: string, amount: number) => {
    setState((prev) => {
      const profile = { ...prev.profiles[player] };
      profile.dailyQuests = profile.dailyQuests.map(q => {
        if (q.id === questId && !q.completed) {
          const nextProg = Math.min(q.target, q.progress + amount);
          return {
            ...q,
            progress: nextProg,
            completed: nextProg >= q.target
          };
        }
        return q;
      });
      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [player]: profile
        }
      };
    });
  };

  const claimQuestReward = (player: "james" | "lily" | "merche", questId: string) => {
    setState((prev) => {
      const profile = { ...prev.profiles[player] };
      profile.dailyQuests = profile.dailyQuests.map(q => {
        if (q.id === questId && q.completed && !q.claimed) {
          // Give reward!
          profile.totalXP += q.rewardXP;
          profile.spendableXP += q.rewardXP;
          profile.level = Math.floor(profile.totalXP / 20) + 1;
          return { ...q, claimed: true };
        }
        return q;
      });
      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [player]: profile
        }
      };
    });
  };

  const readParentMessage = (player: "james" | "lily" | "merche", messageId: string) => {
    setState((prev) => {
      const profile = { ...prev.profiles[player] };
      profile.parentMessages = profile.parentMessages.map(m => {
        if (m.id === messageId) {
          return { ...m, read: true };
        }
        return m;
      });
      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [player]: profile
        }
      };
    });
  };

  const claimParentMessageReward = (player: "james" | "lily" | "merche", messageId: string) => {
    setState((prev) => {
      const profile = { ...prev.profiles[player] };
      profile.parentMessages = profile.parentMessages.map(m => {
        if (m.id === messageId && m.rewardXP && !m.claimed) {
          profile.totalXP += m.rewardXP;
          profile.spendableXP += m.rewardXP;
          profile.level = Math.floor(profile.totalXP / 20) + 1;
          return { ...m, claimed: true, read: true };
        }
        return m;
      });
      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [player]: profile
        }
      };
    });
  };

  const sendParentMessage = (player: "james" | "lily" | "merche", text: string, rewardXP: number = 0) => {
    setState((prev) => {
      const profile = { ...prev.profiles[player] };
      const newMsg: ParentMessage = {
        id: `parent-msg-${Date.now()}`,
        text,
        date: new Date().toISOString().split('T')[0],
        read: false,
        rewardXP: rewardXP > 0 ? rewardXP : undefined,
        claimed: rewardXP > 0 ? false : undefined
      };
      profile.parentMessages = [newMsg, ...profile.parentMessages];
      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [player]: profile
        }
      };
    });
  };

  const setCustomGoal = (player: "james" | "lily" | "merche", goal: { text: string; targetWords: number } | null) => {
    setState((prev) => {
      const profile = { ...prev.profiles[player] };
      if (goal) {
        profile.customGoal = {
          text: goal.text,
          targetWords: goal.targetWords,
          completed: false
        };
      } else {
        profile.customGoal = null;
      }
      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [player]: profile
        }
      };
    });
  };

  const checkCustomGoalCompletion = (player: "james" | "lily" | "merche") => {
    setState((prev) => {
      const profile = { ...prev.profiles[player] };
      if (profile.customGoal && !profile.customGoal.completed) {
        let overallMastered = 0;
        DESTINATIONS_DATA.forEach(d => {
          overallMastered += profile.masteredVocab[d.id]?.length || 0;
        });
        if (overallMastered >= profile.customGoal.targetWords) {
          profile.customGoal = {
            ...profile.customGoal,
            completed: true
          };
          // Give bonus reward
          profile.totalXP += 100;
          profile.spendableXP += 100;
          profile.level = Math.floor(profile.totalXP / 20) + 1;
          profile.parentMessages.push({
            id: `goal-congrats-${Date.now()}`,
            text: `🎉 You completed your custom goal: "${profile.customGoal.text}"! Fantastic job! Here's a +100 XP reward!`,
            date: new Date().toISOString().split('T')[0],
            read: false,
            rewardXP: 0,
            claimed: true
          });
        }
      }
      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [player]: profile
        }
      };
    });
  };

  return (
    <AppContext.Provider
      value={{
        state,
        switchPlayer,
        updateXP,
        recordVocabAttempt,
        updateHighScore,
        completeChallenge,
        updateTripDate,
        toggleSound,
        unlockNextDestination,
        resetAllProgress,
        // Expanded:
        updateAvatar,
        buySticker,
        completeQuestStep,
        claimQuestReward,
        readParentMessage,
        claimParentMessageReward,
        sendParentMessage,
        setCustomGoal,
        checkCustomGoalCompletion
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppState must be used within an AppProvider");
  }
  return context;
};
