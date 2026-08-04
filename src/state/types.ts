export interface AvatarCustomization {
  face: string;
  hair: string;
  outfit: string;
  customName: string;
}

export interface DailyQuest {
  id: string;
  title: string;
  description: string;
  progress: number;
  target: number;
  rewardXP: number;
  completed: boolean;
  claimed: boolean;
}

export interface ParentMessage {
  id: string;
  text: string;
  date: string;
  read: boolean;
  rewardXP?: number;
  claimed?: boolean;
}

export interface PlayerProgress {
  name: string;
  age: number;
  avatar: string; // fallback simple emoji
  avatarCustomization: AvatarCustomization;
  level: number;
  totalXP: number;
  spendableXP: number; // For sticker store and custom items
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
  // Sticker Store inventory
  unlockedStickers: string[]; // List of sticker IDs owned
  // Active daily quests for today
  dailyQuests: DailyQuest[];
  // Received parent messages / rewards
  parentMessages: ParentMessage[];
  // Custom goal set by parent
  customGoal: { text: string; targetWords: number; completed: boolean } | null;
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

export interface PlayerProgress {
  name: string;
  age: number;
  avatar: string; // fallback simple emoji
  avatarCustomization: AvatarCustomization;
  level: number;
  totalXP: number;
  spendableXP: number; // For sticker store and custom items
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
  // Sticker Store inventory
  unlockedStickers: string[]; // List of sticker IDs owned
  // Active daily quests for today
  dailyQuests: DailyQuest[];
  // Received parent messages / rewards
  parentMessages: ParentMessage[];
  // Custom goal set by parent
  customGoal: { text: string; targetWords: number; completed: boolean } | null;

  // Phase 3 Extensions
  role: "child" | "parent";
  learningPath?: "kids_basic" | "kids_advanced" | "adult_advanced";
  motivation?: string;
  createdAt?: string;
  lastActive?: string;
}

export interface AppState {
  profiles: {
    james: PlayerProgress;
    lily: PlayerProgress;
    merche: PlayerProgress;
  };
  activePlayer: "james" | "lily" | "merche" | "parent";
  tripDate: string; // YYYY-MM-DD
  soundEnabled: boolean;
  activeChallengeId: string | null;
}

export const DEFAULT_QUESTS = (playerKey: "james" | "lily"): DailyQuest[] => [
  {
    id: "morning-learner",
    title: "☀️ Morning Learner",
    description: "Earn 20 XP today to prove your morning spirit!",
    progress: 0,
    target: 20,
    rewardXP: 20,
    completed: false,
    claimed: false
  },
  {
    id: "speed-demon",
    title: "⚡ Speed Demon",
    description: "Complete 2 separate games today!",
    progress: 0,
    target: 2,
    rewardXP: 25,
    completed: false,
    claimed: false
  },
  {
    id: "accuracy-star",
    title: "🎯 Accuracy Star",
    description: "Answer 10 words correctly across any of your games!",
    progress: 0,
    target: 10,
    rewardXP: 30,
    completed: false,
    claimed: false
  }
];

export const INITIAL_STATE: AppState = {
  profiles: {
    james: {
      name: "James",
      age: 9,
      role: "child",
      learningPath: "kids_advanced",
      avatar: "👦🏻",
      avatarCustomization: {
        face: "😊",
        hair: "🎀 Black",
        outfit: "🧥 Casual",
        customName: "James the Great"
      },
      level: 1,
      totalXP: 0,
      spendableXP: 150, // Start with some free credits so they can try out the Sticker Store immediately!
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
      unlockedFacts: [],
      unlockedStickers: [],
      dailyQuests: DEFAULT_QUESTS("james"),
      parentMessages: [
        {
          id: "welcome",
          text: "Welcome to Japan Quest! Learn together with Lily and prepare for our awesome trip! 🗻✈️",
          date: new Date().toISOString().split('T')[0],
          read: false,
          rewardXP: 10,
          claimed: false
        }
      ],
      customGoal: null,
      createdAt: "2024-08-04",
      lastActive: "2024-08-04"
    },
    lily: {
      name: "Lily",
      age: 5,
      role: "child",
      learningPath: "kids_basic",
      avatar: "👧🏻",
      avatarCustomization: {
        face: "🥰",
        hair: "🎀 Brown",
        outfit: "👗 School",
        customName: "Cute Lily"
      },
      level: 1,
      totalXP: 0,
      spendableXP: 150, // Start with some free credits so they can try out the Sticker Store immediately!
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
      unlockedFacts: [],
      unlockedStickers: [],
      dailyQuests: DEFAULT_QUESTS("lily"),
      parentMessages: [
        {
          id: "welcome",
          text: "Welcome to Japan Quest! Learn together with James and prepare for our awesome trip! 🗻✈️",
          date: new Date().toISOString().split('T')[0],
          read: false,
          rewardXP: 10,
          claimed: false
        }
      ],
      customGoal: null,
      createdAt: "2024-08-04",
      lastActive: "2024-08-04"
    },
    merche: {
      name: "Merche",
      age: 35,
      role: "parent",
      learningPath: "adult_advanced",
      motivation: "learn_together_with_kids",
      avatar: "🤩",
      avatarCustomization: {
        face: "🤩",
        hair: "🎀 Blonde",
        outfit: "🧥 Casual",
        customName: "Merche"
      },
      level: 1,
      totalXP: 0,
      spendableXP: 150,
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
      unlockedFacts: [],
      unlockedStickers: [],
      dailyQuests: DEFAULT_QUESTS("james").map(q => ({ ...q, id: q.id + "_merche" })),
      parentMessages: [
        {
          id: "welcome",
          text: "Welcome to Japan Quest Parent Path! Practice conversations and grammar, then study with your kids! 🗻✈️",
          date: new Date().toISOString().split('T')[0],
          read: false,
          rewardXP: 10,
          claimed: false
        }
      ],
      customGoal: null,
      createdAt: "2024-08-04",
      lastActive: "2024-08-04"
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
