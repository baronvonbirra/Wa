export interface PlayerProgress {
  name: string;
  age: number;
  avatar: string;
  level: number;
  totalXP: number;
  streak: number;
  lastPlayedDate: string | null; // YYYY-MM-DD
  // Map of destinationId -> list of vocabulary ids that are mastered (correct answer on first try or multiple correct)
  masteredVocab: { [destinationId: string]: string[] };
  // Vocabulary attempt counters for accuracy calculations, e.g., { [wordId]: { attempts: number, correct: number } }
  vocabStats: { [wordId: string]: { attempts: number; correct: number } };
  // High scores for games: { [gameType_destinationId]: score }
  highScores: { [gameKey: string]: number };
  // Which destinations are unlocked: { [destinationId]: boolean }
  unlockedDestinations: { [destinationId: string]: boolean };
  // List of completed family challenge IDs
  completedChallenges: string[];
  // Completed trivia facts: { [factKey]: boolean }
  unlockedFacts: string[];
}

export interface FamilyChallenge {
  id: string;
  name: string;
  description: string;
  rewardXP: number;
  criteria: string;
}

export const FAMILY_CHALLENGES: FamilyChallenge[] = [
  {
    id: "weekend-sync",
    name: "🏯 Weekend Kyoto Sync",
    description: "Both James and Lily must master at least 5 words in Kyoto by Sunday!",
    rewardXP: 50,
    criteria: "Kyoto progress for both profiles is greater than or equal to 5 words"
  },
  {
    id: "high-scorer",
    name: "📈 Tokyo High Scorer",
    description: "Beat a game high score of 80 points in Tokyo with either James or Lily!",
    rewardXP: 20,
    criteria: "Any high score in Tokyo is >= 80"
  },
  {
    id: "perfect-week",
    name: "🔥 Perfect 5-Day Streak",
    description: "Practice at least 5 days consecutive streak with any child!",
    rewardXP: 100,
    criteria: "Either streak is >= 5 days"
  },
  {
    id: "osaka-numbers",
    name: "🔢 Osaka Number Cruncher",
    description: "James masters at least 10 numbers in Osaka Castle!",
    rewardXP: 30,
    criteria: "James has 10+ mastered words in Osaka"
  }
];

export interface AppState {
  profiles: {
    james: PlayerProgress;
    lily: PlayerProgress;
  };
  activePlayer: "james" | "lily" | "parent";
  tripDate: string; // YYYY-MM-DD
  soundEnabled: boolean;
  activeChallengeId: string | null;
}

export const INITIAL_STATE: AppState = {
  profiles: {
    james: {
      name: "James",
      age: 9,
      avatar: "👦🏻",
      level: 1,
      totalXP: 0,
      streak: 0,
      lastPlayedDate: null,
      masteredVocab: {
        kyoto: [],
        tokyo: [],
        osaka: [],
        train: [],
        okinawa: [],
        takayama: []
      },
      vocabStats: {},
      highScores: {},
      unlockedDestinations: {
        kyoto: true, // Kyoto is always unlocked initially
        tokyo: false,
        osaka: false,
        train: false,
        okinawa: false,
        takayama: false
      },
      completedChallenges: [],
      unlockedFacts: []
    },
    lily: {
      name: "Lily",
      age: 5,
      avatar: "👧🏻",
      level: 1,
      totalXP: 0,
      streak: 0,
      lastPlayedDate: null,
      masteredVocab: {
        kyoto: [],
        tokyo: [],
        osaka: [],
        train: [],
        okinawa: [],
        takayama: []
      },
      vocabStats: {},
      highScores: {},
      unlockedDestinations: {
        kyoto: true,
        tokyo: false,
        osaka: false,
        train: false,
        okinawa: false,
        takayama: false
      },
      completedChallenges: [],
      unlockedFacts: []
    }
  },
  activePlayer: "james",
  tripDate: (() => {
    // Default: 3 months (90 days) from now
    const d = new Date();
    d.setDate(d.getDate() + 90);
    return d.toISOString().split('T')[0];
  })(),
  soundEnabled: true,
  activeChallengeId: "weekend-sync"
};
