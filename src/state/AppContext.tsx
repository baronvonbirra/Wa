import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppState, INITIAL_STATE, PlayerProgress } from './types';
import { DESTINATIONS_DATA } from '../data/destinations';

interface AppContextType {
  state: AppState;
  switchPlayer: (player: "james" | "lily" | "parent") => void;
  updateXP: (player: "james" | "lily", amount: number) => void;
  recordVocabAttempt: (player: "james" | "lily", destId: string, vocabId: string, correct: boolean) => void;
  updateHighScore: (player: "james" | "lily", gameKey: string, score: number) => void;
  completeChallenge: (player: "james" | "lily", challengeId: string, rewardXP: number) => void;
  updateTripDate: (date: string) => void;
  toggleSound: () => void;
  unlockNextDestination: (player: "james" | "lily", currentDestId: string) => void;
  resetAllProgress: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = "japan_quest_state_v1";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>(() => {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure standard destinations are initialized
        ['james', 'lily'].forEach((pKey) => {
          const profile = parsed.profiles?.[pKey as "james" | "lily"];
          if (profile && !profile.masteredVocab) {
            profile.masteredVocab = {
              kyoto: [], tokyo: [], osaka: [], train: [], okinawa: [], takayama: []
            };
          }
        });
        return parsed;
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
  const switchPlayer = (player: "james" | "lily" | "parent") => {
    setState((prev) => {
      const updated = { ...prev, activePlayer: player };
      if (player === "james" || player === "lily") {
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

  const updateXP = (player: "james" | "lily", amount: number) => {
    setState((prev) => {
      const profile = { ...prev.profiles[player] };
      profile.totalXP += amount;
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

      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [player]: profile
        }
      };
    });
  };

  const recordVocabAttempt = (player: "james" | "lily", destId: string, vocabId: string, correct: boolean) => {
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

      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [player]: profile
        }
      };
    });
  };

  const updateHighScore = (player: "james" | "lily", gameKey: string, score: number) => {
    setState((prev) => {
      const profile = { ...prev.profiles[player] };
      const highScores = { ...profile.highScores };
      const currentBest = highScores[gameKey] || 0;
      if (score > currentBest) {
        highScores[gameKey] = score;
      }
      profile.highScores = highScores;

      return {
        ...prev,
        profiles: {
          ...prev.profiles,
          [player]: profile
        }
      };
    });
  };

  const completeChallenge = (player: "james" | "lily", challengeId: string, rewardXP: number) => {
    setState((prev) => {
      const profile = { ...prev.profiles[player] };
      const completed = [...profile.completedChallenges];
      if (!completed.includes(challengeId)) {
        completed.push(challengeId);
        profile.completedChallenges = completed;
        profile.totalXP += rewardXP;
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

  const unlockNextDestination = (player: "james" | "lily", currentDestId: string) => {
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
        resetAllProgress
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
