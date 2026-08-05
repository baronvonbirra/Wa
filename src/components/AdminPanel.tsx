import React, { useState, useEffect, useRef } from 'react';
import { useAppState } from '../state/AppContext';
import { AppState, PlayerProgress, AdminLog, DEFAULT_QUESTS } from '../state/types';
import { SHOP_ITEMS } from '../data/shopItems';
import { DESTINATIONS_DATA } from '../data/destinations';

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const { state, updateFullState, updateAppStateDirect } = useAppState();

  // Security and Session State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const [timeUntilUnlock, setTimeUntilUnlock] = useState<number>(0);

  // Active Admin View Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'progress' | 'vocab' | 'shop' | 'settings' | 'backup' | 'logs'>('overview');

  // Specific entity selectors
  const [selectedProfileKey, setSelectedProfileKey] = useState<'james' | 'lily' | 'merche'>('lily');
  const [vocabSearch, setVocabSearch] = useState<string>('');

  // Local editable form fields (synchronized with selectedProfileKey)
  const [userName, setUserName] = useState<string>('');
  const [userAge, setUserAge] = useState<number>(9);
  const [userRole, setUserRole] = useState<'child' | 'parent'>('child');
  const [userPath, setUserPath] = useState<'kids_basic' | 'kids_advanced' | 'adult_advanced'>('kids_basic');
  const [avatarFace, setAvatarFace] = useState<string>('😊');
  const [avatarHair, setAvatarHair] = useState<string>('black');
  const [avatarOutfit, setAvatarOutfit] = useState<string>('casual');

  // Settings tab form states
  const [tripDateForm, setTripDateForm] = useState<string>('');
  const [globalSound, setGlobalSound] = useState<boolean>(true);
  const [diffDefault, setDiffDefault] = useState<'easy' | 'medium' | 'hard'>('medium');
  const [diffHard, setDiffHard] = useState<boolean>(false);
  const [diffHints, setDiffHints] = useState<boolean>(true);
  const [maxVocabCount, setMaxVocabCount] = useState<number>(150);

  // Inactivity timeout handler
  const lastActivityRef = useRef<number>(Date.now());

  // Hashing Function (SHA-256 using Browser Web Crypto)
  const sha256 = async (str: string) => {
    const buf = new TextEncoder().encode(str);
    const hashBuf = await crypto.subtle.digest('SHA-256', buf);
    const hashArray = Array.from(new Uint8Array(hashBuf));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  // Lockout countdown timer
  useEffect(() => {
    if (lockoutTime !== null) {
      const interval = setInterval(() => {
        const remaining = Math.max(0, Math.ceil((lockoutTime - Date.now()) / 1000));
        setTimeUntilUnlock(remaining);
        if (remaining <= 0) {
          setLockoutTime(null);
          setFailedAttempts(0);
        }
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [lockoutTime]);

  // Session Inactivity tracker
  useEffect(() => {
    if (!isAuthenticated) return;

    const handleActivity = () => {
      lastActivityRef.current = Date.now();
    };

    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('scroll', handleActivity);

    // Check inactivity every 15 seconds
    const interval = setInterval(() => {
      const inactiveDurationMs = Date.now() - lastActivityRef.current;
      const thirtyMinutesMs = 30 * 60 * 1000;
      if (inactiveDurationMs >= thirtyMinutesMs) {
        handleLogout('Session expired due to 30 minutes of inactivity.');
      }
    }, 15000);

    return () => {
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
      window.removeEventListener('scroll', handleActivity);
      clearInterval(interval);
    };
  }, [isAuthenticated]);

  // Sync profile editors when selectedProfileKey changes
  useEffect(() => {
    const profile = state.profiles[selectedProfileKey];
    if (profile) {
      setUserName(profile.name || '');
      setUserAge(profile.age || 9);
      setUserRole(profile.role || 'child');
      setUserPath(profile.learningPath || 'kids_basic');
      setAvatarFace(profile.avatarCustomization?.face || '😊');
      setAvatarHair(profile.avatarCustomization?.hair || '🎀 Brown');
      setAvatarOutfit(profile.avatarCustomization?.outfit || '👗 School');
    }
  }, [selectedProfileKey, state.profiles]);

  // Sync settings when entering Settings tab
  useEffect(() => {
    setTripDateForm(state.tripDate || '');
    setGlobalSound(state.soundEnabled || false);
    setDiffDefault('medium'); // default mock diff
    setDiffHard(state.debugMode || false);
    setDiffHints(true);
    setMaxVocabCount(state.destinationsAvailableCount * 25);
  }, [state, activeTab]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutTime && Date.now() < lockoutTime) {
      alert(`Lockout active! Please wait ${timeUntilUnlock} seconds.`);
      return;
    }

    const hashedInput = await sha256(passwordInput);
    if (hashedInput === state.adminPasswordHash) {
      setIsAuthenticated(true);
      setFailedAttempts(0);
      lastActivityRef.current = Date.now();
      logActionDirect('Login Success', 'Admin authenticated successfully.');
    } else {
      const nextFailed = failedAttempts + 1;
      setFailedAttempts(nextFailed);
      if (nextFailed >= 3) {
        const lockoutDuration = 5 * 60 * 1000; // 5 minutes lockout
        setLockoutTime(Date.now() + lockoutDuration);
        setTimeUntilUnlock(300);
        alert('Too many failed attempts! Locked out for 5 minutes.');
      } else {
        alert(`Incorrect password! ${3 - nextFailed} attempts remaining.`);
      }
    }
  };

  const handleLogout = (reason: string = 'User manually logged out.') => {
    setIsAuthenticated(false);
    setPasswordInput('');
    logActionDirect('Logout', reason);
  };

  // Safe Logger helper inside component
  const logActionDirect = (action: string, details: string) => {
    const newLog: AdminLog = {
      id: `log-${Date.now()}`,
      timestamp: new Date().toISOString(),
      who: `Admin (device: ${navigator.userAgent.substring(0, 40)}...)`,
      action,
      details
    };
    updateAppStateDirect((prev) => ({
      ...prev,
      adminLogs: [newLog, ...(prev.adminLogs || [])]
    }));
  };

  // User Profile actions
  const handleSaveUser = () => {
    if (!userName.trim()) {
      alert('Name cannot be blank!');
      return;
    }
    updateAppStateDirect((prev) => {
      const updated = { ...prev };
      const profile = { ...updated.profiles[selectedProfileKey] };
      profile.name = userName;
      profile.age = userAge;
      profile.role = userRole;
      profile.learningPath = userPath;
      profile.avatar = avatarFace;
      profile.avatarCustomization = {
        ...profile.avatarCustomization,
        face: avatarFace,
        hair: avatarHair,
        outfit: avatarOutfit,
        customName: userName
      };
      updated.profiles[selectedProfileKey] = profile;
      return updated;
    });
    logActionDirect('Update User Profile', `Modified ${selectedProfileKey.toUpperCase()} metadata.`);
    alert('User settings saved successfully!');
  };

  const handleResetUser = () => {
    if (!window.confirm(`Are you sure you want to reset all progress for ${selectedProfileKey.toUpperCase()}? This is irreversible!`)) return;

    updateAppStateDirect((prev) => {
      const updated = { ...prev };
      // Deep restore profile to initial setting
      let initialProfile: any;
      if (selectedProfileKey === 'lily') {
        initialProfile = {
          name: "Lily",
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
          spendableXP: 150,
          streak: 0,
          lastPlayedDate: null,
          masteredVocab: { kyoto: [], tokyo: [], osaka: [], train: [], okinawa: [], takayama: [] },
          vocabStats: {},
          highScores: {},
          unlockedDestinations: { kyoto: true, tokyo: false, osaka: false, train: false, okinawa: false, takayama: false },
          completedChallenges: [], unlockedFacts: [], unlockedStickers: [],
          dailyQuests: DEFAULT_QUESTS("lily"),
          parentMessages: [{
            id: "welcome",
            text: "Welcome to Japan Quest! Learn together with James and prepare for our awesome trip! 🗻✈️",
            date: new Date().toISOString().split('T')[0],
            read: false, rewardXP: 10, claimed: false
          }],
          customGoal: null, createdAt: "2024-08-04", lastActive: "2024-08-04",
          unlockedItemIds: [], wishlistItemIds: [], equippedThemeId: null, equippedFrameId: null, equippedSoundId: null, equippedTitleId: null, equippedFilterId: null, equippedAuraId: null, equippedMusicId: null,
          battlePassPremiumOwned: false, battlePassXP: 0, battlePassLevel: 1, claimedFreeLevels: [], claimedPremiumLevels: [], activePowerups: {}
        };
      } else if (selectedProfileKey === 'james') {
        initialProfile = {
          name: "James",
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
          spendableXP: 150,
          streak: 0,
          lastPlayedDate: null,
          masteredVocab: { kyoto: [], tokyo: [], osaka: [], train: [], okinawa: [], takayama: [] },
          vocabStats: {},
          highScores: {},
          unlockedDestinations: { kyoto: true, tokyo: false, osaka: false, train: false, okinawa: false, takayama: false },
          completedChallenges: [], unlockedFacts: [], unlockedStickers: [],
          dailyQuests: DEFAULT_QUESTS("james"),
          parentMessages: [{
            id: "welcome",
            text: "Welcome to Japan Quest! Learn together with Lily and prepare for our awesome trip! 🗻✈️",
            date: new Date().toISOString().split('T')[0],
            read: false, rewardXP: 10, claimed: false
          }],
          customGoal: null, createdAt: "2024-08-04", lastActive: "2024-08-04",
          unlockedItemIds: [], wishlistItemIds: [], equippedThemeId: null, equippedFrameId: null, equippedSoundId: null, equippedTitleId: null, equippedFilterId: null, equippedAuraId: null, equippedMusicId: null,
          battlePassPremiumOwned: false, battlePassXP: 0, battlePassLevel: 1, claimedFreeLevels: [], claimedPremiumLevels: [], activePowerups: {}
        };
      } else {
        initialProfile = {
          name: "Merche",
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
          masteredVocab: { kyoto: [], tokyo: [], osaka: [], train: [], okinawa: [], takayama: [] },
          vocabStats: {},
          highScores: {},
          unlockedDestinations: { kyoto: true, tokyo: false, osaka: false, train: false, okinawa: false, takayama: false },
          completedChallenges: [], unlockedFacts: [], unlockedStickers: [],
          dailyQuests: DEFAULT_QUESTS("james").map(q => ({ ...q, id: q.id + "_merche" })),
          parentMessages: [{
            id: "welcome",
            text: "Welcome to Japan Quest Parent Path! Practice conversations and grammar, then study with your kids! 🗻✈️",
            date: new Date().toISOString().split('T')[0],
            read: false, rewardXP: 10, claimed: false
          }],
          customGoal: null, createdAt: "2024-08-04", lastActive: "2024-08-04",
          unlockedItemIds: [], wishlistItemIds: [], equippedThemeId: null, equippedFrameId: null, equippedSoundId: null, equippedTitleId: null, equippedFilterId: null, equippedAuraId: null, equippedMusicId: null,
          battlePassPremiumOwned: false, battlePassXP: 0, battlePassLevel: 1, claimedFreeLevels: [], claimedPremiumLevels: [], activePowerups: {}
        };
      }
      updated.profiles[selectedProfileKey] = initialProfile;
      return updated;
    });
    logActionDirect('Reset Profile Progress', `Cleared all stats & vocab for player ${selectedProfileKey.toUpperCase()}.`);
    alert('User progress reset successfully!');
  };

  const handleDuplicateUser = () => {
    const targetKey = window.prompt("Enter profile key to duplicate Lily's state to (james / lily / merche):", "james");
    if (!targetKey || (targetKey !== 'james' && targetKey !== 'lily' && targetKey !== 'merche')) {
      alert("Invalid selection! Please input 'james', 'lily' or 'merche'.");
      return;
    }
    updateAppStateDirect((prev) => {
      const updated = { ...prev };
      const sourceData = JSON.parse(JSON.stringify(updated.profiles[selectedProfileKey]));
      sourceData.name = targetKey === 'james' ? 'James' : targetKey === 'lily' ? 'Lily' : 'Merche';
      sourceData.avatarCustomization.customName = sourceData.name;
      updated.profiles[targetKey as 'james' | 'lily' | 'merche'] = sourceData;
      return updated;
    });
    logActionDirect('Duplicate Profile', `Copied profile ${selectedProfileKey.toUpperCase()} data to ${targetKey.toUpperCase()}`);
    alert(`Successfully duplicated Lily to ${targetKey.toUpperCase()}`);
  };

  const handleCreateTestUser = () => {
    const name = window.prompt("Enter name for test player:", "Questor");
    if (!name || !name.trim()) return;

    // Pick any of Lily or James, overwrite it as test user
    updateAppStateDirect((prev) => {
      const updated = { ...prev };
      const testProfile: PlayerProgress = {
        ...JSON.parse(JSON.stringify(updated.profiles.lily)),
        name: name,
        level: 5,
        totalXP: 100,
        spendableXP: 450,
        avatarCustomization: {
          face: '🥷',
          hair: '🔥 Neon',
          outfit: '🥋 Ninja',
          customName: name
        }
      };
      updated.profiles.lily = testProfile; // Overwrite lily as a test case
      return updated;
    });
    logActionDirect('Create Test User', `Loaded preset metadata onto player Lily as ${name}.`);
    alert(`Test User "${name}" created on Lily's profile slot!`);
  };

  // Progress stats actions
  const handleSaveProgressStats = (level: number, xp: number, coins: number) => {
    if (level < 1 || level > 100 || isNaN(level)) {
      alert("Error: Level must be between 1 and 100!");
      return;
    }
    if (xp < 0 || isNaN(xp)) {
      alert("Error: XP cannot be negative!");
      return;
    }
    updateAppStateDirect((prev) => {
      const updated = { ...prev };
      const profile = { ...updated.profiles[selectedProfileKey] };
      profile.level = level;
      profile.totalXP = xp;
      profile.spendableXP = coins;
      updated.profiles[selectedProfileKey] = profile;
      return updated;
    });
    logActionDirect('Edit Player Stats', `Set ${selectedProfileKey.toUpperCase()} stats: Level=${level}, XP=${xp}, Coins=${coins}.`);
    alert('Stats saved successfully!');
  };

  const handleSetDestProgress = (destId: string, value: number) => {
    if (value < 0 || value > 100 || isNaN(value)) {
      alert("Destination completion must be 0-100%");
      return;
    }
    updateAppStateDirect((prev) => {
      const updated = { ...prev };
      const profile = { ...updated.profiles[selectedProfileKey] };

      // Update destination unlocked map
      profile.unlockedDestinations = {
        ...profile.unlockedDestinations,
        [destId]: value > 0
      };

      // Fill mastered vocab array to match percentage
      const destInfo = DESTINATIONS_DATA.find(d => d.id === destId);
      if (destInfo) {
        const totalWords = destInfo.vocabList.length;
        const targetMasteredCount = Math.round((value / 100) * totalWords);
        const nextMastered: string[] = [];
        for (let i = 0; i < targetMasteredCount; i++) {
          if (destInfo.vocabList[i]) nextMastered.push(destInfo.vocabList[i].id);
        }
        profile.masteredVocab = {
          ...profile.masteredVocab,
          [destId]: nextMastered
        };
      }
      updated.profiles[selectedProfileKey] = profile;
      return updated;
    });
    logActionDirect('Set Destination Completion', `Set ${selectedProfileKey.toUpperCase()} ${destId.toUpperCase()} to ${value}%.`);
  };

  const handleEditGameScore = (gameKey: string, score: number) => {
    updateAppStateDirect((prev) => {
      const updated = { ...prev };
      const profile = { ...updated.profiles[selectedProfileKey] };
      profile.highScores = {
        ...profile.highScores,
        [gameKey]: score
      };
      updated.profiles[selectedProfileKey] = profile;
      return updated;
    });
    logActionDirect('Edit Game High Score', `Updated high score for ${gameKey} to ${score} pts.`);
  };

  // Vocab Tracker methods
  const handleEditWordStats = (wordId: string, attempts: number, correct: number) => {
    if (attempts < 0 || correct < 0 || correct > attempts || isNaN(attempts) || isNaN(correct)) {
      alert("Invalid inputs! Attempts cannot be negative and correct answers cannot exceed total attempts.");
      return;
    }
    updateAppStateDirect((prev) => {
      const updated = { ...prev };
      const profile = { ...updated.profiles[selectedProfileKey] };
      profile.vocabStats = {
        ...profile.vocabStats,
        [wordId]: { attempts, correct }
      };

      // Also sync mastered status
      // If correct answers >= 1, ensure word is in some destination's masteredVocab list
      let foundDestId = '';
      DESTINATIONS_DATA.forEach(d => {
        if (d.vocabList.some(v => v.id === wordId)) foundDestId = d.id;
      });
      if (foundDestId) {
        const list = [...(profile.masteredVocab[foundDestId] || [])];
        if (correct > 0 && !list.includes(wordId)) {
          list.push(wordId);
        } else if (correct === 0) {
          const index = list.indexOf(wordId);
          if (index !== -1) list.splice(index, 1);
        }
        profile.masteredVocab = {
          ...profile.masteredVocab,
          [foundDestId]: list
        };
      }

      updated.profiles[selectedProfileKey] = profile;
      return updated;
    });
    logActionDirect('Edit Word Stats', `Set stats for word "${wordId}" to Attempts=${attempts}, Correct=${correct}.`);
  };

  const handleAddNewWord = () => {
    const word = window.prompt("Enter vocabulary word spelling (e.g. neko):", "neko");
    if (!word) return;
    const attempts = parseInt(window.prompt("Attempts:", "5") || "0", 10);
    const correct = parseInt(window.prompt("Correct answers:", "5") || "0", 10);
    handleEditWordStats(word.toLowerCase().trim(), attempts, correct);
  };

  const handleResetVocab = () => {
    if (!window.confirm("Reset all vocabulary attempts and correctness stats for this user?")) return;
    updateAppStateDirect((prev) => {
      const updated = { ...prev };
      const profile = { ...updated.profiles[selectedProfileKey] };
      profile.vocabStats = {};
      Object.keys(profile.masteredVocab).forEach(k => {
        profile.masteredVocab[k] = [];
      });
      updated.profiles[selectedProfileKey] = profile;
      return updated;
    });
    logActionDirect('Reset Vocabulary', `Cleared vocab attempt stats for player ${selectedProfileKey.toUpperCase()}.`);
    alert('Vocabulary stats reset successfully!');
  };

  // Shop & Achievements Actions
  const handleGrantRewardItem = (itemId: string, grant: boolean) => {
    updateAppStateDirect((prev) => {
      const updated = { ...prev };
      const profile = { ...updated.profiles[selectedProfileKey] };
      let list = [...profile.unlockedItemIds];
      if (grant) {
        if (!list.includes(itemId)) list.push(itemId);
        if (itemId.startsWith("s_") && !profile.unlockedStickers.includes(itemId)) {
          profile.unlockedStickers = [...profile.unlockedStickers, itemId];
        }
      } else {
        list = list.filter(id => id !== itemId);
        if (itemId.startsWith("s_")) {
          profile.unlockedStickers = profile.unlockedStickers.filter(id => id !== itemId);
        }
      }
      profile.unlockedItemIds = list;
      updated.profiles[selectedProfileKey] = profile;
      return updated;
    });
    logActionDirect(grant ? 'Grant Item' : 'Revoke Item', `${grant ? 'Added' : 'Removed'} catalog item "${itemId}" on player ${selectedProfileKey.toUpperCase()}.`);
  };

  const handleGrantAllShopItems = () => {
    updateAppStateDirect((prev) => {
      const updated = { ...prev };
      const profile = { ...updated.profiles[selectedProfileKey] };
      const allItemIds = SHOP_ITEMS.map(i => i.id);
      const stickerIds = SHOP_ITEMS.filter(i => i.category === 'stickers').map(i => i.id);

      profile.unlockedItemIds = Array.from(new Set([...profile.unlockedItemIds, ...allItemIds]));
      profile.unlockedStickers = Array.from(new Set([...profile.unlockedStickers, ...stickerIds]));
      updated.profiles[selectedProfileKey] = profile;
      return updated;
    });
    logActionDirect('Grant All Shop Items', `Unlocked entire catalog (Stickers, Cosmetics, Themes, Frames etc.) for ${selectedProfileKey.toUpperCase()}.`);
    alert('All shop catalog items granted successfully!');
  };

  const handleResetShopInventory = () => {
    updateAppStateDirect((prev) => {
      const updated = { ...prev };
      const profile = { ...updated.profiles[selectedProfileKey] };
      profile.unlockedItemIds = [];
      profile.unlockedStickers = [];
      profile.wishlistItemIds = [];
      profile.equippedThemeId = null;
      profile.equippedFrameId = null;
      profile.equippedSoundId = null;
      profile.equippedTitleId = null;
      profile.equippedFilterId = null;
      profile.equippedAuraId = null;
      profile.equippedMusicId = null;
      updated.profiles[selectedProfileKey] = profile;
      return updated;
    });
    logActionDirect('Reset Shop Inventory', `Cleared inventory & unequipped cosmetic items for ${selectedProfileKey.toUpperCase()}.`);
    alert('Shop inventory cleared!');
  };

  const handleGrantAchievement = (badgeId: string, grant: boolean) => {
    updateAppStateDirect((prev) => {
      const updated = { ...prev };
      const profile = { ...updated.profiles[selectedProfileKey] };
      let list = [...profile.unlockedFacts]; // we can tie it here or keep it simple
      if (grant) {
        if (!list.includes(badgeId)) list.push(badgeId);
        // Also grant item inside inventory
        if (!profile.unlockedItemIds.includes(badgeId)) {
          profile.unlockedItemIds = [...profile.unlockedItemIds, badgeId];
        }
      } else {
        list = list.filter(id => id !== badgeId);
        profile.unlockedItemIds = profile.unlockedItemIds.filter(id => id !== badgeId);
      }
      profile.unlockedFacts = list;
      updated.profiles[selectedProfileKey] = profile;
      return updated;
    });
    logActionDirect(grant ? 'Unlock Achievement' : 'Revoke Achievement', `${grant ? 'Unlocked' : 'Locked'} milestone badge "${badgeId}" for ${selectedProfileKey.toUpperCase()}.`);
  };

  const handleUnlockAllAchievements = () => {
    updateAppStateDirect((prev) => {
      const updated = { ...prev };
      const profile = { ...updated.profiles[selectedProfileKey] };
      const badgeIds = SHOP_ITEMS.filter(i => i.category === 'badges').map(i => i.id);

      profile.unlockedFacts = Array.from(new Set([...profile.unlockedFacts, ...badgeIds]));
      profile.unlockedItemIds = Array.from(new Set([...profile.unlockedItemIds, ...badgeIds]));
      updated.profiles[selectedProfileKey] = profile;
      return updated;
    });
    logActionDirect('Unlock All Achievements', `Granted all high milestone achievement badges for ${selectedProfileKey.toUpperCase()}.`);
    alert('All milestone badges unlocked!');
  };

  // Settings Editor Form submit
  const handleSaveSettings = () => {
    updateAppStateDirect((prev) => {
      const updated = { ...prev };
      updated.tripDate = tripDateForm;
      updated.soundEnabled = globalSound;
      updated.debugMode = diffHard;
      updated.destinationsAvailableCount = Math.min(15, Math.max(1, Math.floor(maxVocabCount / 25)));
      return updated;
    });
    logActionDirect('Save Global App Settings', `Saved TripDate=${tripDateForm}, Sound=${globalSound}, HardMode=${diffHard}, CitiesCount=${Math.min(15, Math.max(1, Math.floor(maxVocabCount / 25)))}.`);
    alert('Global settings saved successfully!');
  };

  const handleUnlockAllDestinations = () => {
    updateAppStateDirect((prev) => {
      const updated = { ...prev };
      const profile = { ...updated.profiles[selectedProfileKey] };
      const destOrder = ["kyoto", "tokyo", "osaka", "train", "okinawa", "takayama"];
      destOrder.forEach(id => {
        profile.unlockedDestinations[id] = true;
      });
      updated.profiles[selectedProfileKey] = profile;
      return updated;
    });
    logActionDirect('Unlock All Cities', `Enabled all map destinations for ${selectedProfileKey.toUpperCase()}.`);
    alert('All destinations unlocked on this profile!');
  };

  const handleLoadExtendedContent = () => {
    updateAppStateDirect((prev) => ({
      ...prev,
      destinationsAvailableCount: 12
    }));
    logActionDirect('Extended Content', 'Loaded extended geographic catalog index items (12 cities available).');
    alert('Extended layout indexes parsed & loaded!');
  };

  const handleAdminPasswordChange = () => {
    const newPass = window.prompt("Enter new administrator password:", "Japanese");
    if (!newPass || !newPass.trim()) return;
    sha256(newPass).then(hash => {
      updateAppStateDirect((prev) => ({
        ...prev,
        adminPasswordHash: hash
      }));
      logActionDirect('Change Admin Password', 'Administrator changed panels security password hash.');
      alert('Password updated! New credentials will be required next time.');
    });
  };

  const handleResetSettings = () => {
    updateAppStateDirect((prev) => ({
      ...prev,
      tripDate: (() => {
        const d = new Date();
        d.setDate(d.getDate() + 90);
        return d.toISOString().split('T')[0];
      })(),
      soundEnabled: true,
      debugMode: false,
      destinationsAvailableCount: 6
    }));
    logActionDirect('Reset Settings', 'Reverted client settings parameters back to INITIAL_STATE standards.');
    alert('Settings reset completed!');
  };

  // Backup & Restore
  const handleExportStateJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `japan-quest-backup-${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    logActionDirect('Export JSON Data', 'Downloaded full AppState parameters database backup package.');
  };

  const handleExportSingleUserJSON = () => {
    const userPayload = state.profiles[selectedProfileKey];
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(userPayload, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `japan-quest-${selectedProfileKey}-backup.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    logActionDirect('Export Single Player JSON', `Exported isolated data package for learner ${selectedProfileKey.toUpperCase()}.`);
  };

  const handleImportStateJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const payload = JSON.parse(event.target?.result as string);

        // Validation check
        if (!payload.profiles || !payload.activePlayer) {
          throw new Error("Invalid structure: missing profiles or active player properties.");
        }

        const jamesLvl = payload.profiles?.james?.level;
        const lilyLvl = payload.profiles?.lily?.level;
        if ((jamesLvl !== undefined && (jamesLvl < 1 || jamesLvl > 100)) ||
            (lilyLvl !== undefined && (lilyLvl < 1 || lilyLvl > 100))) {
          throw new Error("Validation Error: Profile levels must remain between 1 and 100.");
        }

        updateFullState(payload);
        logActionDirect('Import JSON Data', 'Overwrote AppState successfully via JSON package import.');
        alert('Data overwriting successful! Interface updated.');
      } catch (err: any) {
        alert(`JSON import failed! ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  const handleClearAllData = () => {
    if (!window.confirm("🚨 CRITICAL ACTION: Clear all data and reset App back to Default? This will erase ALL progress of James, Lily, and Merche, and reset all custom shop purchases!")) return;
    localStorage.removeItem("japan_quest_state_v2");
    window.location.reload();
  };

  // Quick Action Shortcuts
  const handleQuickLevelUp = () => {
    updateAppStateDirect((prev) => {
      const updated = { ...prev };
      (['james', 'lily', 'merche'] as const).forEach(key => {
        const p = updated.profiles[key];
        p.level = Math.min(100, p.level + 1);
        p.totalXP += 20; // XP corresponding to level rise
        p.spendableXP += 20;
      });
      return updated;
    });
    logActionDirect('Quick Action: Level Up All', 'Incremented proficiency level counter +1 on all profiles.');
    alert('Leveled up all players!');
  };

  const handleQuickAddXP = () => {
    updateAppStateDirect((prev) => {
      const updated = { ...prev };
      (['james', 'lily', 'merche'] as const).forEach(key => {
        const p = updated.profiles[key];
        p.totalXP += 1000;
        p.spendableXP += 1000;
        p.level = Math.floor(p.totalXP / 20) + 1;
      });
      return updated;
    });
    logActionDirect('Quick Action: Add 1000 XP', 'Injected 1000 developmental XP points onto all player balances.');
    alert('Added 1000 XP & Coins to all players!');
  };

  const handleQuickCompleteAllDestinations = () => {
    updateAppStateDirect((prev) => {
      const updated = { ...prev };
      (['james', 'lily', 'merche'] as const).forEach(key => {
        const p = updated.profiles[key];
        const destOrder = ["kyoto", "tokyo", "osaka", "train", "okinawa", "takayama"];
        destOrder.forEach(destId => {
          p.unlockedDestinations[destId] = true;
          const destInfo = DESTINATIONS_DATA.find(d => d.id === destId);
          if (destInfo) {
            p.masteredVocab[destId] = destInfo.vocabList.map(v => v.id);
          }
        });
      });
      return updated;
    });
    logActionDirect('Quick Action: Complete All Cities', 'Set completion stats to 100% (mastered all vocabulary lists) for all families.');
    alert('All geographic maps marked 100% Complete for all players!');
  };

  const handleQuickResetTutorial = () => {
    updateAppStateDirect((prev) => {
      const updated = { ...prev };
      (['james', 'lily', 'merche'] as const).forEach(key => {
        const p = updated.profiles[key];
        p.level = 1;
        p.totalXP = 0;
        p.spendableXP = 150;
        p.masteredVocab = { kyoto: [], tokyo: [], osaka: [], train: [], okinawa: [], takayama: [] };
        p.unlockedDestinations = { kyoto: true, tokyo: false, osaka: false, train: false, okinawa: false, takayama: false };
      });
      return updated;
    });
    logActionDirect('Quick Action: Tutorial Reset', 'Downgraded proficiency indicators back to tutorial starter indices.');
    alert('Reverted everyone to Tutorial level and starter assets.');
  };

  // Storage usage calculation helper
  const getStorageUsageString = () => {
    let totalChars = 0;
    for (const key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        totalChars += (localStorage[key] || '').length + key.length;
      }
    }
    const kb = (totalChars * 2) / 1024; // UTF-16 characters use 2 bytes
    return `${kb.toFixed(2)} KB of 5.00 MB allocated (${((kb / 5120) * 100).toFixed(4)}%)`;
  };

  // Days calculations
  const getDaysUntilTrip = () => {
    if (!state.tripDate) return 0;
    const today = new Date();
    today.setHours(0,0,0,0);
    const trip = new Date(state.tripDate);
    trip.setHours(0,0,0,0);
    const diff = trip.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
  };

  // Unauthenticated Login Screen
  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto my-12 p-8 bg-white border-8 border-slate-700 rounded-[36px] shadow-2xl relative">
        <div className="absolute top-4 right-4">
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 font-extrabold text-xl p-1 bg-slate-100 rounded-full h-8 w-8 flex items-center justify-center">✕</button>
        </div>

        <div className="text-center mb-6">
          <span className="text-5xl inline-block animate-bounce mb-3">🔐</span>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight uppercase">ADMIN CONTROL PANEL</h2>
          <p className="text-xs text-slate-400 font-bold mt-1">Authorized access only. Enter password below.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-black text-slate-500 uppercase tracking-wider mb-1">Password Required</label>
            <input
              type="password"
              placeholder="••••••••••••"
              disabled={lockoutTime !== null}
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
              className="w-full px-4 py-3 bg-blue-50 border-4 border-blue-200 rounded-2xl text-center font-black tracking-widest text-slate-700 focus:outline-none focus:border-blue-400 disabled:opacity-50 disabled:bg-slate-100 disabled:border-slate-300"
            />
          </div>

          {lockoutTime !== null && (
            <div className="bg-rose-50 border-2 border-rose-200 text-rose-700 font-black text-xs p-3 rounded-xl text-center animate-pulse">
              ⚠️ Locking striker active due to security lockout! <br/> Try again in {timeUntilUnlock} seconds.
            </div>
          )}

          <button
            type="submit"
            disabled={lockoutTime !== null || !passwordInput}
            className="w-full bg-emerald-400 hover:bg-emerald-500 text-white font-black py-3 rounded-2xl border-b-4 border-emerald-600 active:translate-y-0.5 transition-all text-sm uppercase shadow-md disabled:opacity-50 disabled:translate-y-0"
          >
            UNLOCK ACCESS
          </button>
        </form>

        <div className="mt-6 text-center border-t border-slate-100 pt-4">
          <span className="text-[10px] font-extrabold text-slate-400">
            Password: "Japanese" (Case-sensitive)
          </span>
        </div>
      </div>
    );
  }

  // Master Admin View Dashboard
  return (
    <div className="max-w-6xl mx-auto my-8 p-6 bg-[#FFFDF9] border-8 border-rose-400 rounded-[40px] shadow-2xl font-sans text-slate-700 flex flex-col md:flex-row gap-6">

      {/* Side Navigation */}
      <div className="md:w-1/4 flex flex-col gap-2 bg-rose-50 p-4 rounded-3xl border-2 border-rose-100">
        <div className="text-center pb-4 border-b border-rose-200 mb-2">
          <span className="text-4xl">👑</span>
          <h3 className="font-black text-slate-800 text-sm mt-1 uppercase">ADMIN PORTAL</h3>
          <span className="text-[9px] font-black tracking-wider text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full inline-block mt-1">CONNECTED</span>
        </div>

        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 text-left font-black text-xs rounded-xl transition-all ${activeTab === 'overview' ? 'bg-rose-500 text-white shadow-sm' : 'hover:bg-rose-100 text-slate-600'}`}
        >
          ⚡ QUICK OVERVIEW
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 text-left font-black text-xs rounded-xl transition-all ${activeTab === 'users' ? 'bg-rose-500 text-white shadow-sm' : 'hover:bg-rose-100 text-slate-600'}`}
        >
          👥 USER MANAGER
        </button>

        <button
          onClick={() => setActiveTab('progress')}
          className={`px-4 py-2 text-left font-black text-xs rounded-xl transition-all ${activeTab === 'progress' ? 'bg-rose-500 text-white shadow-sm' : 'hover:bg-rose-100 text-slate-600'}`}
        >
          📊 PROGRESS EDITOR
        </button>

        <button
          onClick={() => setActiveTab('vocab')}
          className={`px-4 py-2 text-left font-black text-xs rounded-xl transition-all ${activeTab === 'vocab' ? 'bg-rose-500 text-white shadow-sm' : 'hover:bg-rose-100 text-slate-600'}`}
        >
          📚 VOCAB TRACKER
        </button>

        <button
          onClick={() => setActiveTab('shop')}
          className={`px-4 py-2 text-left font-black text-xs rounded-xl transition-all ${activeTab === 'shop' ? 'bg-rose-500 text-white shadow-sm' : 'hover:bg-rose-100 text-slate-600'}`}
        >
          🏆 ACHIEVEMENT & SHOP
        </button>

        <button
          onClick={() => setActiveTab('settings')}
          className={`px-4 py-2 text-left font-black text-xs rounded-xl transition-all ${activeTab === 'settings' ? 'bg-rose-500 text-white shadow-sm' : 'hover:bg-rose-100 text-slate-600'}`}
        >
          ⚙️ GLOBAL SETTINGS
        </button>

        <button
          onClick={() => setActiveTab('backup')}
          className={`px-4 py-2 text-left font-black text-xs rounded-xl transition-all ${activeTab === 'backup' ? 'bg-rose-500 text-white shadow-sm' : 'hover:bg-rose-100 text-slate-600'}`}
        >
          💾 BACKUP & RESTORE
        </button>

        <button
          onClick={() => setActiveTab('logs')}
          className={`px-4 py-2 text-left font-black text-xs rounded-xl transition-all ${activeTab === 'logs' ? 'bg-rose-500 text-white shadow-sm' : 'hover:bg-rose-100 text-slate-600'}`}
        >
          📋 AUDIT LOGS ({state.adminLogs?.length || 0})
        </button>

        <div className="mt-auto pt-4 border-t border-rose-200 flex flex-col gap-2">
          <button
            onClick={() => handleLogout()}
            className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-black text-xs py-2 rounded-xl border-b-2 border-slate-400 active:translate-y-0.5 transition-all text-center"
          >
            🔒 LOGOUT ADMIN
          </button>
          <button
            onClick={onClose}
            className="w-full bg-amber-400 hover:bg-amber-500 text-slate-800 font-black text-xs py-2 rounded-xl border-b-2 border-amber-600 active:translate-y-0.5 transition-all text-center"
          >
            🗺️ EXIT TO MAP
          </button>
        </div>
      </div>

      {/* Main Admin Content Panel */}
      <div className="md:w-3/4 bg-white border-4 border-rose-100 rounded-[32px] p-6 shadow-inner overflow-y-auto max-h-[600px]">

        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <h3 className="text-xl font-black text-rose-500 uppercase tracking-tight pb-2 border-b-2 border-rose-50">⚡ SYSTEM QUICK OVERVIEW</h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div className="bg-amber-50 p-4 rounded-2xl border-2 border-amber-200">
                <span className="text-[10px] font-black uppercase text-amber-600">Total Registered Users</span>
                <p className="text-3xl font-black text-slate-800 mt-1">3</p>
                <span className="text-[9px] font-bold text-slate-400">James, Lily, Merche</span>
              </div>
              <div className="bg-rose-50 p-4 rounded-2xl border-2 border-rose-200">
                <span className="text-[10px] font-black uppercase text-rose-600">Total Accum. Family XP</span>
                <p className="text-3xl font-black text-slate-800 mt-1">
                  {state.profiles.james.totalXP + state.profiles.lily.totalXP + state.profiles.merche.totalXP}
                </p>
                <span className="text-[9px] font-bold text-slate-400">Developmental score</span>
              </div>
              <div className="bg-indigo-50 p-4 rounded-2xl border-2 border-indigo-200">
                <span className="text-[10px] font-black uppercase text-indigo-600">Trip Readiness Score</span>
                <p className="text-3xl font-black text-slate-800 mt-1">72% Ready</p>
                <span className="text-[9px] font-bold text-slate-400">Japan Trip ready rating</span>
              </div>
              <div className="bg-emerald-50 p-4 rounded-2xl border-2 border-emerald-200">
                <span className="text-[10px] font-black uppercase text-emerald-600">Days Until flight</span>
                <p className="text-3xl font-black text-slate-800 mt-1">{getDaysUntilTrip()}</p>
                <span className="text-[9px] font-bold text-slate-400">Countdown indicator</span>
              </div>
            </div>

            <div className="bg-slate-50 border-4 border-slate-200 rounded-[24px] p-5">
              <h4 className="text-xs font-black text-slate-600 uppercase tracking-wider mb-3">⚡ QUICK TESTING SHORTCUTS</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <button onClick={handleQuickLevelUp} className="bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-300 font-black text-xs py-2.5 px-4 rounded-xl shadow-sm text-left flex items-center justify-between">
                  <span>Level Up All Players</span> <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-lg text-[9px] font-extrabold">+1 Lvl</span>
                </button>
                <button onClick={handleQuickAddXP} className="bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-300 font-black text-xs py-2.5 px-4 rounded-xl shadow-sm text-left flex items-center justify-between">
                  <span>Add 1000 XP & Coins to All</span> <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-lg text-[9px] font-extrabold">+1k XP</span>
                </button>
                <button onClick={handleQuickCompleteAllDestinations} className="bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-300 font-black text-xs py-2.5 px-4 rounded-xl shadow-sm text-left flex items-center justify-between">
                  <span>Complete All Destinations</span> <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-lg text-[9px] font-extrabold">100% cities</span>
                </button>
                <button onClick={handleQuickResetTutorial} className="bg-white hover:bg-slate-100 text-slate-700 border-2 border-slate-300 font-black text-xs py-2.5 px-4 rounded-xl shadow-sm text-left flex items-center justify-between">
                  <span>Reset to Tutorial Level</span> <span className="bg-rose-100 text-rose-700 px-2 py-0.5 rounded-lg text-[9px] font-extrabold">Level 1</span>
                </button>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 flex justify-between items-center text-xs text-slate-400 font-semibold">
              <span>Client Browser Environment storage usage:</span>
              <strong className="text-slate-500 font-bold">{getStorageUsageString()}</strong>
            </div>
          </div>
        )}

        {/* TAB 2: USER PROFILE MANAGER */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b-2 border-rose-50 pb-2">
              <h3 className="text-xl font-black text-rose-500 uppercase tracking-tight">👥 USER PROFILE MANAGER</h3>
              <div className="flex bg-rose-100 p-1.5 rounded-2xl gap-1">
                {(['lily', 'james', 'merche'] as const).map(pKey => (
                  <button
                    key={pKey}
                    onClick={() => setSelectedProfileKey(pKey)}
                    className={`px-3 py-1 rounded-xl font-black text-xs uppercase ${selectedProfileKey === pKey ? 'bg-rose-500 text-white' : 'text-slate-600 hover:bg-rose-200'}`}
                  >
                    {pKey}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-[24px]">
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">Basic Metadata</h4>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Player Name</label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-xl font-black focus:outline-none focus:border-rose-400 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Player Age (1-99)</label>
                  <input
                    type="number"
                    min="1"
                    max="99"
                    value={userAge}
                    onChange={(e) => setUserAge(parseInt(e.target.value) || 9)}
                    className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-xl font-black focus:outline-none focus:border-rose-400 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Role Type</label>
                  <select
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value as 'child' | 'parent')}
                    className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-xl font-black focus:outline-none focus:border-rose-400 text-xs"
                  >
                    <option value="child">Child</option>
                    <option value="parent">Parent / Administrator</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Learning pathway variant</label>
                  <select
                    value={userPath}
                    onChange={(e) => setUserPath(e.target.value as 'kids_basic' | 'kids_advanced' | 'adult_advanced')}
                    className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-xl font-black focus:outline-none focus:border-rose-400 text-xs"
                  >
                    <option value="kids_basic">Kids Basic Path (Level 1-10)</option>
                    <option value="kids_advanced">Kids Advanced Path (Level 11-25)</option>
                    <option value="adult_advanced">Adult Advanced Path (Level 26-45)</option>
                  </select>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">Avatar customization values</h4>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Avatar Face Emoji</label>
                  <input
                    type="text"
                    value={avatarFace}
                    onChange={(e) => setAvatarFace(e.target.value)}
                    className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-xl font-black focus:outline-none focus:border-rose-400 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Avatar Hair Preset</label>
                  <input
                    type="text"
                    value={avatarHair}
                    onChange={(e) => setAvatarHair(e.target.value)}
                    className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-xl font-black focus:outline-none focus:border-rose-400 text-xs text-slate-600"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Avatar Outfit Preset</label>
                  <input
                    type="text"
                    value={avatarOutfit}
                    onChange={(e) => setAvatarOutfit(e.target.value)}
                    className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-xl font-black focus:outline-none focus:border-rose-400 text-xs text-slate-600"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                onClick={handleSaveUser}
                className="bg-emerald-400 hover:bg-emerald-500 text-white font-black text-xs py-2.5 px-5 rounded-xl border-b-4 border-emerald-600 active:translate-y-0.5 transition-all shadow-sm"
              >
                Save Changes
              </button>
              <button
                onClick={handleResetUser}
                className="bg-rose-400 hover:bg-rose-500 text-white font-black text-xs py-2.5 px-5 rounded-xl border-b-4 border-rose-600 active:translate-y-0.5 transition-all shadow-sm"
              >
                Reset User
              </button>
              <button
                onClick={handleDuplicateUser}
                className="bg-amber-400 hover:bg-amber-500 text-slate-800 font-black text-xs py-2.5 px-5 rounded-xl border-b-4 border-amber-600 active:translate-y-0.5 transition-all shadow-sm"
              >
                Duplicate Player
              </button>
              <button
                onClick={handleCreateTestUser}
                className="bg-blue-400 hover:bg-blue-500 text-white font-black text-xs py-2.5 px-5 rounded-xl border-b-4 border-blue-600 active:translate-y-0.5 transition-all shadow-sm"
              >
                Create Test User
              </button>
            </div>
          </div>
        )}

        {/* TAB 3: PROGRESS EDITOR */}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b-2 border-rose-50 pb-2">
              <h3 className="text-xl font-black text-rose-500 uppercase tracking-tight">📊 PROGRESS EDITOR</h3>
              <select
                value={selectedProfileKey}
                onChange={(e) => setSelectedProfileKey(e.target.value as any)}
                className="px-3 py-1.5 bg-rose-50 border-2 border-rose-200 rounded-xl font-black text-xs"
              >
                <option value="lily">Selected: Lily</option>
                <option value="james">Selected: James</option>
                <option value="merche">Selected: Merche</option>
              </select>
            </div>

            {/* Level & XP values */}
            <div className="bg-slate-50 p-5 rounded-[24px]">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">Level & XP values</h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Current level</label>
                  <input
                    id="stats-lvl-input"
                    type="number"
                    defaultValue={state.profiles[selectedProfileKey]?.level || 1}
                    className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-xl font-black text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Accumulated developmental XP</label>
                  <input
                    id="stats-xp-input"
                    type="number"
                    defaultValue={state.profiles[selectedProfileKey]?.totalXP || 0}
                    className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-xl font-black text-xs"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Spendable Coins Balance</label>
                  <input
                    id="stats-coins-input"
                    type="number"
                    defaultValue={state.profiles[selectedProfileKey]?.spendableXP || 150}
                    className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-xl font-black text-xs animate-pulse text-rose-600"
                  />
                </div>
              </div>

              <div className="flex gap-2 mt-4 flex-wrap">
                <button
                  onClick={() => {
                    const l = parseInt((document.getElementById("stats-lvl-input") as HTMLInputElement).value) || 1;
                    const x = parseInt((document.getElementById("stats-xp-input") as HTMLInputElement).value) || 0;
                    const c = parseInt((document.getElementById("stats-coins-input") as HTMLInputElement).value) || 0;
                    handleSaveProgressStats(l, x, c);
                  }}
                  className="bg-emerald-400 hover:bg-emerald-500 text-white font-black text-xs px-4 py-2 rounded-xl"
                >
                  Save Stats Changes
                </button>
                <button
                  onClick={() => {
                    // Level calculation
                    const xInput = document.getElementById("stats-xp-input") as HTMLInputElement;
                    const lInput = document.getElementById("stats-lvl-input") as HTMLInputElement;
                    const currentXP = parseInt(xInput.value) || 0;
                    const calculatedLvl = Math.floor(currentXP / 20) + 1;
                    lInput.value = calculatedLvl.toString();
                    alert(`Calculated level matching ${currentXP} XP is Level ${calculatedLvl}! Click "Save Stats" to persist.`);
                  }}
                  className="bg-amber-400 hover:bg-amber-500 text-slate-800 font-black text-xs px-4 py-2 rounded-xl"
                >
                  Auto-Calculate Level from XP
                </button>
                <button
                  onClick={() => {
                    const cInput = document.getElementById("stats-coins-input") as HTMLInputElement;
                    cInput.value = (parseInt(cInput.value) + 500).toString();
                  }}
                  className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-black text-[10px] px-3 py-1 rounded-lg"
                >
                  + Add 500 Coins
                </button>
                <button
                  onClick={() => {
                    const cInput = document.getElementById("stats-coins-input") as HTMLInputElement;
                    cInput.value = Math.max(0, parseInt(cInput.value) - 100).toString();
                  }}
                  className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-black text-[10px] px-3 py-1 rounded-lg"
                >
                  - Subtract 100 Coins
                </button>
              </div>
            </div>

            {/* Geographic Cities Progression Map */}
            <div className="bg-slate-50 p-5 rounded-[24px]">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">Geographic Cities Progression Map</h4>

              <div className="space-y-3.5">
                {DESTINATIONS_DATA.map((dest) => {
                  const unlocked = state.profiles[selectedProfileKey]?.unlockedDestinations?.[dest.id] || false;
                  const masteredCount = state.profiles[selectedProfileKey]?.masteredVocab?.[dest.id]?.length || 0;
                  const totalCount = dest.vocabList.length;
                  const pct = totalCount > 0 ? Math.round((masteredCount / totalCount) * 100) : 0;

                  return (
                    <div key={dest.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-3 bg-white rounded-xl border border-slate-200">
                      <div>
                        <strong className="font-black text-xs">{dest.emoji} {dest.name}</strong>
                        <p className="text-[10px] text-slate-400 font-bold mt-0.5">
                          {masteredCount} / {totalCount} words mastered ({pct}%) • {unlocked ? '✅ Unlocked' : '🔒 Locked'}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 w-full sm:w-auto">
                        <input
                          id={`pct-range-${dest.id}`}
                          type="range"
                          min="0"
                          max="100"
                          step="20"
                          defaultValue={pct}
                          className="w-24 sm:w-32 accent-rose-500"
                        />
                        <button
                          onClick={() => {
                            const val = parseInt((document.getElementById(`pct-range-${dest.id}`) as HTMLInputElement).value);
                            handleSetDestProgress(dest.id, val);
                          }}
                          className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-black text-[10px] px-2.5 py-1.5 rounded-lg whitespace-nowrap"
                        >
                          Set %
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Game Stats Highscores */}
            <div className="bg-slate-50 p-5 rounded-[24px]">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider mb-3">Game Stats Highscores</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {['hiragana', 'listening', 'reading', 'dialogue'].map((mode) => {
                  const gameKey = `${mode}_kyoto`;
                  const score = state.profiles[selectedProfileKey]?.highScores?.[gameKey] || 0;
                  return (
                    <div key={mode} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                      <span className="text-xs font-extrabold capitalize">{mode.replace('_', ' ')}:</span>
                      <div className="flex items-center gap-1.5">
                        <input
                          id={`game-score-input-${mode}`}
                          type="number"
                          defaultValue={score}
                          className="w-16 px-2 py-1 bg-slate-50 border border-slate-200 rounded font-black text-xs text-center"
                        />
                        <button
                          onClick={() => {
                            const input = document.getElementById(`game-score-input-${mode}`) as HTMLInputElement;
                            handleEditGameScore(gameKey, parseInt(input.value) || 0);
                          }}
                          className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-black text-[9px] px-2 py-1.5 rounded"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: VOCAB TRACKER */}
        {activeTab === 'vocab' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b-2 border-rose-50 pb-2">
              <h3 className="text-xl font-black text-rose-500 uppercase tracking-tight">📚 VOCABULARY PROGRESS</h3>
              <select
                value={selectedProfileKey}
                onChange={(e) => setSelectedProfileKey(e.target.value as any)}
                className="px-3 py-1.5 bg-rose-50 border-2 border-rose-200 rounded-xl font-black text-xs"
              >
                <option value="lily">Selected: Lily</option>
                <option value="james">Selected: James</option>
                <option value="merche">Selected: Merche</option>
              </select>
            </div>

            <div className="flex gap-2 flex-wrap items-center justify-between">
              <input
                type="text"
                placeholder="Search vocabulary words..."
                value={vocabSearch}
                onChange={(e) => setVocabSearch(e.target.value)}
                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold w-full sm:w-64 focus:outline-none focus:border-rose-400"
              />
              <div className="flex gap-2">
                <button onClick={handleAddNewWord} className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-black text-xs px-3 py-2 rounded-xl border border-indigo-200">
                  + Add New Word
                </button>
                <button onClick={handleResetVocab} className="bg-rose-50 hover:bg-rose-100 text-rose-700 font-black text-xs px-3 py-2 rounded-xl border border-rose-200">
                  Reset Vocab Stats
                </button>
              </div>
            </div>

            {/* List Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                    <th className="p-2.5">Word spelling</th>
                    <th className="p-2.5">Attempts count</th>
                    <th className="p-2.5">Correct count</th>
                    <th className="p-2.5">Accuracy %</th>
                    <th className="p-2.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="font-extrabold text-slate-600 divide-y divide-slate-100">
                  {(() => {
                    // Gather all vocabulary items
                    const vocabList: { id: string; attempts: number; correct: number }[] = [];
                    const stats = state.profiles[selectedProfileKey]?.vocabStats || {};

                    // Seed with standard list if empty or to show catalog items
                    DESTINATIONS_DATA.forEach(d => {
                      d.vocabList.forEach(v => {
                        const wordStats = stats[v.id] || { attempts: 0, correct: 0 };
                        if (!vocabList.some(item => item.id === v.id)) {
                          vocabList.push({ id: v.id, ...wordStats });
                        }
                      });
                    });

                    // Add custom words from stats if any
                    Object.entries(stats).forEach(([id, wordStats]) => {
                      if (!vocabList.some(item => item.id === id)) {
                        vocabList.push({ id, ...wordStats });
                      }
                    });

                    // Filter search
                    const filtered = vocabList.filter(item => item.id.includes(vocabSearch.toLowerCase().trim()));

                    if (filtered.length === 0) {
                      return (
                        <tr>
                          <td colSpan={5} className="p-4 text-center font-bold text-slate-400">No matching vocabulary found.</td>
                        </tr>
                      );
                    }

                    return filtered.map((item) => {
                      const pct = item.attempts > 0 ? Math.round((item.correct / item.attempts) * 100) : 0;
                      let colorClass = "text-slate-400";
                      if (item.attempts > 0) {
                        if (pct === 100) colorClass = "text-emerald-600 bg-emerald-50";
                        else if (pct >= 70) colorClass = "text-indigo-600 bg-indigo-50";
                        else colorClass = "text-rose-600 bg-rose-50";
                      }

                      return (
                        <tr key={item.id} className="hover:bg-slate-50">
                          <td className="p-2.5 font-black text-slate-800">{item.id}</td>
                          <td className="p-2.5">
                            <input
                              id={`vocab-attempts-${item.id}`}
                              type="number"
                              min="0"
                              defaultValue={item.attempts}
                              className="w-12 px-1 py-0.5 bg-slate-50 border border-slate-200 rounded font-bold text-center"
                            />
                          </td>
                          <td className="p-2.5">
                            <input
                              id={`vocab-correct-${item.id}`}
                              type="number"
                              min="0"
                              defaultValue={item.correct}
                              className="w-12 px-1 py-0.5 bg-slate-50 border border-slate-200 rounded font-bold text-center"
                            />
                          </td>
                          <td className="p-2.5">
                            <span className={`px-2 py-0.5 rounded-lg text-[10px] font-black ${colorClass}`}>
                              {item.attempts > 0 ? `${pct}%` : 'No attempts'}
                            </span>
                          </td>
                          <td className="p-2.5 text-right">
                            <button
                              onClick={() => {
                                const atts = parseInt((document.getElementById(`vocab-attempts-${item.id}`) as HTMLInputElement).value) || 0;
                                const corr = parseInt((document.getElementById(`vocab-correct-${item.id}`) as HTMLInputElement).value) || 0;
                                handleEditWordStats(item.id, atts, corr);
                              }}
                              className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold px-2 py-1 rounded text-[10px]"
                            >
                              ✎ Save
                            </button>
                          </td>
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: ACHIEVEMENT & SHOP REWARDS */}
        {activeTab === 'shop' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b-2 border-rose-50 pb-2">
              <h3 className="text-xl font-black text-rose-500 uppercase tracking-tight">🏆 ACHIEVEMENT & SHOP REWARDS</h3>
              <select
                value={selectedProfileKey}
                onChange={(e) => setSelectedProfileKey(e.target.value as any)}
                className="px-3 py-1.5 bg-rose-50 border-2 border-rose-200 rounded-xl font-black text-xs"
              >
                <option value="lily">Selected: Lily</option>
                <option value="james">Selected: James</option>
                <option value="merche">Selected: Merche</option>
              </select>
            </div>

            {/* Achievement Badges Milestones */}
            <div className="bg-slate-50 p-5 rounded-[24px]">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">Learning Milestones & Achievements</h4>
                <button onClick={handleUnlockAllAchievements} className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-black text-[10px] px-3 py-1.5 rounded-lg">
                  Unlock All Badge Milestones
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {SHOP_ITEMS.filter(i => i.category === 'badges').slice(0, 15).map(badge => {
                  const owned = state.profiles[selectedProfileKey]?.unlockedItemIds?.includes(badge.id) || false;
                  return (
                    <div key={badge.id} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{badge.emoji}</span>
                        <div>
                          <strong className="text-xs font-black block">{badge.name}</strong>
                          <span className="text-[9px] font-bold text-slate-400 block">{badge.description}</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleGrantAchievement(badge.id, !owned)}
                        className={`font-black text-[9px] px-2.5 py-1.5 rounded-lg ${owned ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                      >
                        {owned ? '✅ GRANTED' : 'GRANT'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Shop Collectibles Inventory */}
            <div className="bg-slate-50 p-5 rounded-[24px]">
              <div className="flex justify-between items-center mb-3">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">Shop Collectibles Inventory</h4>
                <div className="flex gap-2">
                  <button onClick={handleGrantAllShopItems} className="bg-indigo-100 hover:bg-indigo-200 text-indigo-700 font-black text-[10px] px-3 py-1.5 rounded-lg">
                    Grant All Shop Items
                  </button>
                  <button onClick={handleResetShopInventory} className="bg-rose-100 hover:bg-rose-200 text-rose-700 font-black text-[10px] px-3 py-1.5 rounded-lg">
                    Reset Shop
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-64 overflow-y-auto">
                {SHOP_ITEMS.filter(i => i.category !== 'badges').slice(0, 40).map(item => {
                  const owned = state.profiles[selectedProfileKey]?.unlockedItemIds?.includes(item.id) || false;
                  return (
                    <div key={item.id} className="bg-white p-3 rounded-xl border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl">{item.emoji}</span>
                        <div>
                          <strong className="text-xs font-black block">{item.name}</strong>
                          <span className="text-[9px] font-extrabold text-indigo-600 uppercase block">{item.category} • Cost {item.cost} XP</span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleGrantRewardItem(item.id, !owned)}
                        className={`font-black text-[9px] px-2.5 py-1.5 rounded-lg ${owned ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
                      >
                        {owned ? '✅ OWNED' : 'GRANT'}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: GLOBAL SETTINGS EDITOR */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h3 className="text-xl font-black text-rose-500 uppercase tracking-tight pb-2 border-b-2 border-rose-50">⚙️ GLOBAL SETTINGS EDITOR</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-[24px]">
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">Trip & Geographic milestones</h4>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Trip Date (YYYY-MM-DD)</label>
                  <input
                    type="date"
                    value={tripDateForm}
                    onChange={(e) => setTripDateForm(e.target.value)}
                    className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-xl font-black text-xs"
                  />
                  <span className="text-[9px] font-bold text-amber-600 mt-1 block">
                    Calculated Days Until: {getDaysUntilTrip()} days left!
                  </span>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase mb-1">Max cities count available</label>
                  <input
                    type="number"
                    min="1"
                    max="15"
                    value={maxVocabCount / 25}
                    onChange={(e) => setMaxVocabCount(parseInt(e.target.value) * 25)}
                    className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-xl font-black text-xs"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">Game system parameters</h4>
                <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-xs font-extrabold text-slate-500">Audio feedback enabled</span>
                  <input
                    type="checkbox"
                    checked={globalSound}
                    onChange={(e) => setGlobalSound(e.target.checked)}
                    className="h-4 w-4 accent-rose-500"
                  />
                </div>
                <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-xs font-extrabold text-slate-500">Enable Hard difficulty setting</span>
                  <input
                    type="checkbox"
                    checked={diffHard}
                    onChange={(e) => setDiffHard(e.target.checked)}
                    className="h-4 w-4 accent-rose-500"
                  />
                </div>
                <div className="flex items-center justify-between bg-white p-2.5 rounded-xl border border-slate-200">
                  <span className="text-xs font-extrabold text-slate-500">Enable active user hints</span>
                  <input
                    type="checkbox"
                    checked={diffHints}
                    onChange={(e) => setDiffHints(e.target.checked)}
                    className="h-4 w-4 accent-rose-500"
                  />
                </div>
              </div>
            </div>

            <div className="bg-slate-50 p-5 rounded-[24px] space-y-3">
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">Panel Admin Controls</h4>
              <div className="flex flex-wrap gap-2">
                <button onClick={handleAdminPasswordChange} className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-black text-xs px-3.5 py-2 rounded-xl">
                  Change Access Password
                </button>
                <button onClick={handleUnlockAllDestinations} className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-black text-xs px-3.5 py-2 rounded-xl">
                  Unlock All Cities (This profile)
                </button>
                <button onClick={handleLoadExtendedContent} className="bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-black text-xs px-3.5 py-2 rounded-xl">
                  Load Extended geographic content indexes
                </button>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={handleSaveSettings}
                className="bg-emerald-400 hover:bg-emerald-500 text-white font-black text-xs py-2.5 px-5 rounded-xl border-b-4 border-emerald-600 active:translate-y-0.5 transition-all shadow-sm"
              >
                Save Changes
              </button>
              <button
                onClick={handleResetSettings}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-black text-xs py-2.5 px-5 rounded-xl border-b-4 border-slate-400 active:translate-y-0.5 transition-all shadow-sm"
              >
                Reset All Settings
              </button>
            </div>
          </div>
        )}

        {/* TAB 7: BACKUP & RESTORE */}
        {activeTab === 'backup' && (
          <div className="space-y-6">
            <h3 className="text-xl font-black text-rose-500 uppercase tracking-tight pb-2 border-b-2 border-rose-50">💾 BACKUP & RESTORE</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-5 rounded-[24px]">
              {/* Export Panel */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">Export State Data</h4>
                <p className="text-[11px] text-slate-400 font-bold leading-normal">
                  Generate and download complete state payload containing profile scores, item transactions, and configuration flags.
                </p>
                <div className="space-y-2">
                  <button onClick={handleExportStateJSON} className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 font-black text-xs py-2.5 px-4 rounded-xl text-center">
                    Export All Users as JSON
                  </button>
                  <button onClick={handleExportSingleUserJSON} className="w-full bg-white hover:bg-slate-100 text-slate-600 border border-slate-200 font-black text-xs py-2.5 px-4 rounded-xl text-center">
                    Export Single Profile: {selectedProfileKey.toUpperCase()}
                  </button>
                </div>
              </div>

              {/* Import Panel */}
              <div className="space-y-3">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">Import State Data</h4>
                <p className="text-[11px] text-rose-500 font-black leading-normal">
                  ⚠️ WARNING: This will completely replace and overwrite all local player data. Structure verification applies.
                </p>

                <div className="bg-white border-2 border-dashed border-slate-200 p-4 rounded-xl text-center">
                  <input
                    id="import-file-input"
                    type="file"
                    accept=".json"
                    onChange={handleImportStateJSON}
                    className="hidden"
                  />
                  <label htmlFor="import-file-input" className="cursor-pointer bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2 rounded-lg font-black text-xs inline-block shadow-sm">
                    Choose Backup JSON File
                  </label>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="bg-rose-50 border-4 border-rose-200 rounded-[28px] p-5 space-y-3">
              <h4 className="text-sm font-black text-rose-800 uppercase tracking-wide">⚠️ DANGER ZONE — RESET CLIENT</h4>
              <p className="text-xs font-bold text-rose-600 leading-normal">
                Irreversible. Erases entire memory state structure, wiping progress indicators. Restores browser values back to fresh initial defaults.
              </p>
              <button onClick={handleClearAllData} className="bg-rose-600 hover:bg-rose-700 text-white font-black text-xs py-2.5 px-5 rounded-xl shadow-md border-b-4 border-rose-800 active:translate-y-0.5 transition-all">
                Clear ALL Local Storage Data
              </button>
            </div>
          </div>
        )}

        {/* TAB 8: AUDIT LOGS */}
        {activeTab === 'logs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b-2 border-rose-50 pb-2">
              <h3 className="text-xl font-black text-rose-500 uppercase tracking-tight">📋 AUDIT LOGS</h3>
              <button
                onClick={() => {
                  if (window.confirm("Clear all logs?")) {
                    updateAppStateDirect((prev) => ({ ...prev, adminLogs: [] }));
                  }
                }}
                className="bg-rose-100 hover:bg-rose-200 text-rose-700 font-black text-xs px-3 py-1.5 rounded-lg"
              >
                Clear Log List
              </button>
            </div>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {!state.adminLogs || state.adminLogs.length === 0 ? (
                <div className="p-4 text-center text-slate-400 font-black text-xs bg-slate-50 rounded-xl">No administrative logs recorded yet.</div>
              ) : (
                state.adminLogs.map((log) => (
                  <div key={log.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] font-bold">
                    <div className="flex flex-wrap justify-between text-slate-400 uppercase text-[9px] font-black mb-1">
                      <span>{log.action}</span>
                      <span>{new Date(log.timestamp).toLocaleString()}</span>
                    </div>
                    <p className="text-slate-800 font-black">{log.details}</p>
                    <span className="text-[10px] text-slate-400 block mt-1">{log.who}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
export default AdminPanel;
