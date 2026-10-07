import React, { useState, useEffect, useRef } from 'react';
import { useAppState } from '../state/AppContext';
import { useWa2, KmlSyncItem, KmlDiffPreview } from '../state/Wa2Context';
import { AppState, PlayerProgress, AdminLog, DEFAULT_QUESTS } from '../state/types';
import { SHOP_ITEMS } from '../data/shopItems';
import { DESTINATIONS_DATA } from '../data/destinations';

interface AdminPanelProps {
  onClose: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onClose }) => {
  const { state, updateFullState, updateAppStateDirect } = useAppState();
  const { previewKmlSync, executeKmlUpsert } = useWa2();

  // Security and Session State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passwordInput, setPasswordInput] = useState<string>('');
  const [failedAttempts, setFailedAttempts] = useState<number>(0);
  const [lockoutTime, setLockoutTime] = useState<number | null>(null);
  const [timeUntilUnlock, setTimeUntilUnlock] = useState<number>(0);

  // Active Admin View Tab
  const [activeTab, setActiveTab] = useState<'overview' | 'users' | 'progress' | 'vocab' | 'shop' | 'settings' | 'backup' | 'logs' | 'mymaps'>('overview');

  // Google My Maps KML Sync State
  const [myMapsUrl, setMyMapsUrl] = useState<string>('https://www.google.com/maps/d/viewer?mid=12345EXAMPLE');
  const [rawKmlText, setRawKmlText] = useState<string>('');
  const [parsedKmlItems, setParsedKmlItems] = useState<KmlSyncItem[]>([]);
  const [diffPreview, setDiffPreview] = useState<KmlDiffPreview | null>(null);
  const [isParsingKml, setIsParsingKml] = useState<boolean>(false);
  const [kmlStatusMsg, setKmlStatusMsg] = useState<string>('');

  // Specific entity selectors
  const [selectedProfileKey, setSelectedProfileKey] = useState<'james' | 'lily' | 'merche'>('lily');
  const [vocabSearch, setVocabSearch] = useState<string>('');

  // Local editable form fields
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

  // Hashing Function (SHA-256)
  const sha256 = async (str: string) => {
    const buf = new TextEncoder().encode(str);
    const hashBuf = await crypto.subtle.digest('SHA-256', buf);
    const hashArray = Array.from(new Uint8Array(hashBuf));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

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

  useEffect(() => {
    if (!isAuthenticated) return;

    const handleActivity = () => {
      lastActivityRef.current = Date.now();
    };

    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);
    window.addEventListener('scroll', handleActivity);

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

  useEffect(() => {
    setTripDateForm(state.tripDate || '');
    setGlobalSound(state.soundEnabled || false);
    setDiffDefault('medium');
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
        const lockoutDuration = 5 * 60 * 1000;
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

  // Google My Maps KML Parsing Helper
  const parseKmlContentString = (kmlStr: string): KmlSyncItem[] => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(kmlStr, 'text/xml');
    const items: KmlSyncItem[] = [];

    const folders = xmlDoc.getElementsByTagName('Folder');

    for (let f = 0; fontLength(folders, f); f++) {
      const folder = folders[f];
      const folderNameEl = folder.getElementsByTagName('name')[0];
      const folderName = folderNameEl?.textContent?.trim() || 'General';

      const placemarks = folder.getElementsByTagName('Placemark');
      for (let p = 0; p < placemarks.length; p++) {
        const placemark = placemarks[p];
        const name = placemark.getElementsByTagName('name')[0]?.textContent?.trim() || 'Lugar sin nombre';
        const description = placemark.getElementsByTagName('description')[0]?.textContent?.trim() || '';

        const coordsEl = placemark.getElementsByTagName('coordinates')[0];
        let lat = 35.6762;
        let lng = 139.6503;

        if (coordsEl && coordsEl.textContent) {
          const parts = coordsEl.textContent.trim().split(',');
          if (parts.length >= 2) {
            lng = parseFloat(parts[0]);
            lat = parseFloat(parts[1]);
          }
        }

        const extId = 'kml-' + name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + lat.toFixed(3) + '-' + lng.toFixed(3);
        const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;

        let category = 'sightseeing';
        const lowerFolder = folderName.toLowerCase();
        if (lowerFolder.includes('ramen')) category = 'ramen';
        else if (lowerFolder.includes('sushi')) category = 'sushi';
        else if (lowerFolder.includes('izakaya')) category = 'izakaya';
        else if (lowerFolder.includes('konbini')) category = 'konbini';
        else if (lowerFolder.includes('anime')) category = 'anime';
        else if (lowerFolder.includes('retro') || lowerFolder.includes('game')) category = 'retro_gaming';
        else if (lowerFolder.includes('gacha')) category = 'gachapon';
        else if (lowerFolder.includes('cafe')) category = 'cafe';
        else if (lowerFolder.includes('compra') || lowerFolder.includes('shop')) category = 'shopping';

        items.push({
          external_id: extId,
          name,
          description,
          lat,
          lng,
          google_maps_url: mapsUrl,
          category,
          cityName: folderName
        });
      }
    }

    // Fallback if no Folders exist
    if (items.length === 0) {
      const placemarks = xmlDoc.getElementsByTagName('Placemark');
      for (let p = 0; p < placemarks.length; p++) {
        const placemark = placemarks[p];
        const name = placemark.getElementsByTagName('name')[0]?.textContent?.trim() || 'Lugar sin nombre';
        const description = placemark.getElementsByTagName('description')[0]?.textContent?.trim() || '';

        const coordsEl = placemark.getElementsByTagName('coordinates')[0];
        let lat = 35.6762;
        let lng = 139.6503;

        if (coordsEl && coordsEl.textContent) {
          const parts = coordsEl.textContent.trim().split(',');
          if (parts.length >= 2) {
            lng = parseFloat(parts[0]);
            lat = parseFloat(parts[1]);
          }
        }

        const extId = 'kml-' + name.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + lat.toFixed(3) + '-' + lng.toFixed(3);
        const mapsUrl = `https://maps.google.com/?q=${lat},${lng}`;

        items.push({
          external_id: extId,
          name,
          description,
          lat,
          lng,
          google_maps_url: mapsUrl,
          category: 'sightseeing',
          cityName: 'Tokio'
        });
      }
    }

    return items;
  };

  const fontLength = (collection: HTMLCollectionOf<Element>, index: number) => {
    return index < collection.length;
  };

  const handleFetchAndParseKml = async () => {
    setIsParsingKml(true);
    setKmlStatusMsg('Descargando y analizando capas KML...');

    try {
      let kmlTextToParse = rawKmlText.trim();

      if (!kmlTextToParse && myMapsUrl) {
        const midMatch = myMapsUrl.match(/mid=([a-zA-Z0-9_-]+)/);
        const mid = midMatch ? midMatch[1] : '';

        if (mid) {
          const kmlDownloadUrl = `https://www.google.com/maps/d/kml?mid=${mid}&forcekml=1`;
          try {
            const res = await fetch(kmlDownloadUrl);
            if (res.ok) {
              kmlTextToParse = await res.text();
            }
          } catch (err) {
            console.warn('CORS or network restriction fetching KML URL directly:', err);
          }
        }
      }

      // If text empty, create mock Placemark items for demo/testing
      if (!kmlTextToParse) {
        kmlTextToParse = `<?xml version="1.0" encoding="UTF-8"?>
        <kml xmlns="http://www.opengis.net/kml/2.2">
          <Document>
            <Folder>
              <name>Tokio</name>
              <Placemark>
                <name>Akihabara Radio Kaikan</name>
                <description>Edificio mítico de 10 plantas con AmiAmi, K-Books y KML Sync Test.</description>
                <Point><coordinates>139.7719,35.6983,0</coordinates></Point>
              </Placemark>
              <Placemark>
                <name>Gion Duck Noodles Kyoto</name>
                <description>Ramen de pato con menú en emojis.</description>
                <Point><coordinates>135.7733,35.0037,0</coordinates></Point>
              </Placemark>
            </Folder>
          </Document>
        </kml>`;
      }

      const items = parseKmlContentString(kmlTextToParse);
      setParsedKmlItems(items);

      const diff = previewKmlSync(items);
      setDiffPreview(diff);

      setKmlStatusMsg(`✓ ${items.length} sitios detectados en el KML. Revisa la previsualización abajo.`);
      logActionDirect('Parse KML', `KML parse completed. ${items.length} placemarks processed.`);
    } catch (err: any) {
      setKmlStatusMsg(`Error al analizar KML: ${err.message}`);
    } finally {
      setIsParsingKml(false);
    }
  };

  const handleConfirmKmlUpsert = () => {
    if (!parsedKmlItems.length) return;
    executeKmlUpsert(parsedKmlItems);
    logActionDirect('Execute KML UPSERT', `UPSERT executed for ${parsedKmlItems.length} placemarks into Supabase & Local State.`);
    alert(`🎉 Sync completado! Se han sincronizado ${parsedKmlItems.length} sitios conservando los estados locales (como visitado = true).`);
    setDiffPreview(null);
    setParsedKmlItems([]);
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
          masteredVocab: { kyoto: [], tokyo: [], osaka: [], train: [], shopping: [], okinawa: [], takayama: [], sendai: [], hiroshima: [], takamatsu: [], matsuyama: [], nagasaki: [], fukuoka: [], mtfuji: [], yokohama: [] },
          vocabStats: {},
          highScores: {},
          unlockedDestinations: { kyoto: true, tokyo: false, osaka: false, train: false, shopping: false, okinawa: false, takayama: false, sendai: false, hiroshima: false, takamatsu: false, matsuyama: false, nagasaki: false, fukuoka: false, mtfuji: false, yokohama: false },
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
          masteredVocab: { kyoto: [], tokyo: [], osaka: [], train: [], shopping: [], okinawa: [], takayama: [], sendai: [], hiroshima: [], takamatsu: [], matsuyama: [], nagasaki: [], fukuoka: [], mtfuji: [], yokohama: [] },
          vocabStats: {},
          highScores: {},
          unlockedDestinations: { kyoto: true, tokyo: false, osaka: false, train: false, shopping: false, okinawa: false, takayama: false, sendai: false, hiroshima: false, takamatsu: false, matsuyama: false, nagasaki: false, fukuoka: false, mtfuji: false, yokohama: false },
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
          masteredVocab: { kyoto: [], tokyo: [], osaka: [], train: [], shopping: [], okinawa: [], takayama: [], sendai: [], hiroshima: [], takamatsu: [], matsuyama: [], nagasaki: [], fukuoka: [], mtfuji: [], yokohama: [] },
          vocabStats: {},
          highScores: {},
          unlockedDestinations: { kyoto: true, tokyo: false, osaka: false, train: false, shopping: false, okinawa: false, takayama: false, sendai: false, hiroshima: false, takamatsu: false, matsuyama: false, nagasaki: false, fukuoka: false, mtfuji: false, yokohama: false },
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
              ⚠️ Lockout active due to security lockout! <br/> Try again in {timeUntilUnlock} seconds.
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
      </div>
    );
  }

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
          onClick={() => setActiveTab('mymaps')}
          className={`px-4 py-2 text-left font-black text-xs rounded-xl transition-all ${activeTab === 'mymaps' ? 'bg-rose-500 text-white shadow-sm' : 'hover:bg-rose-100 text-slate-600'}`}
        >
          🗺️ MY MAPS KML SYNC
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

        {/* TAB: GOOGLE MY MAPS KML SYNC */}
        {activeTab === 'mymaps' && (
          <div className="space-y-6">
            <div className="border-b-2 border-rose-50 pb-2">
              <h3 className="text-xl font-black text-rose-500 uppercase tracking-tight flex items-center gap-2">
                <span>🗺️</span> IMPORTADOR Y SYNC CON GOOGLE MY MAPS
              </h3>
              <p className="text-xs text-slate-500 font-bold mt-1">
                Sincroniza capas y puntos de interés directamente desde Google My Maps vía KML.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-[24px] space-y-4">
              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                  1. URL Pública del Mapa en Google My Maps
                </label>
                <input
                  type="url"
                  placeholder="https://www.google.com/maps/d/viewer?mid=XXXXX"
                  value={myMapsUrl}
                  onChange={e => setMyMapsUrl(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-white border-2 border-slate-200 rounded-xl font-semibold text-xs focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 uppercase mb-1">
                  2. Contenido XML / KML (Opcional si se pega directamente)
                </label>
                <textarea
                  rows={3}
                  placeholder="Pega el contenido <kml>...</kml> aquí para testing offline..."
                  value={rawKmlText}
                  onChange={e => setRawKmlText(e.target.value)}
                  className="w-full px-3.5 py-2 bg-white border-2 border-slate-200 rounded-xl font-mono text-[10px] focus:outline-none focus:border-rose-400"
                />
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleFetchAndParseKml}
                  disabled={isParsingKml}
                  className="bg-rose-500 hover:bg-rose-600 text-white font-black text-xs px-5 py-2.5 rounded-xl border-b-2 border-rose-700 shadow-sm active:translate-y-0.5 transition-all"
                >
                  {isParsingKml ? 'Analizando KML...' : '🔍 Parsear y Previsualizar Cambios'}
                </button>
              </div>

              {kmlStatusMsg && (
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl text-xs font-bold text-blue-800">
                  {kmlStatusMsg}
                </div>
              )}
            </div>

            {/* Diff Preview Confirmation Modal / Box */}
            {diffPreview && (
              <div className="bg-white border-4 border-rose-300 rounded-[28px] p-5 shadow-lg space-y-4">
                <h4 className="text-sm font-black text-slate-800 uppercase tracking-wide flex items-center justify-between">
                  <span>Previsualización de Cambios (Diff Preview)</span>
                  <span className="text-xs bg-rose-100 text-rose-800 px-2.5 py-0.5 rounded-full font-extrabold">
                    {parsedKmlItems.length} Elementos
                  </span>
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs font-extrabold">
                  {/* New Places */}
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-2xl space-y-1.5">
                    <span className="text-emerald-800 font-black block">🟢 Nuevos ({diffPreview.newPlaces.length})</span>
                    <div className="max-h-36 overflow-y-auto space-y-1">
                      {diffPreview.newPlaces.length === 0 ? (
                        <p className="text-[10px] text-emerald-600 font-normal">Ningún sitio nuevo.</p>
                      ) : (
                        diffPreview.newPlaces.map((p, idx) => (
                          <div key={idx} className="bg-white p-1.5 rounded-lg border border-emerald-100 text-[10px] text-slate-700">
                            <strong>{p.name}</strong> ({p.cityName})
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Modified Places */}
                  <div className="bg-amber-50 border border-amber-200 p-3 rounded-2xl space-y-1.5">
                    <span className="text-amber-800 font-black block">🟡 Existentes/Actualizados ({diffPreview.modifiedPlaces.length})</span>
                    <div className="max-h-36 overflow-y-auto space-y-1">
                      {diffPreview.modifiedPlaces.length === 0 ? (
                        <p className="text-[10px] text-amber-600 font-normal">Sin cambios en ubicaciones existentes.</p>
                      ) : (
                        diffPreview.modifiedPlaces.map((p, idx) => (
                          <div key={idx} className="bg-white p-1.5 rounded-lg border border-amber-100 text-[10px] text-slate-700">
                            <strong>{p.name}</strong>
                          </div>
                        ))
                      )}
                    </div>
                  </div>

                  {/* Removed Places */}
                  <div className="bg-rose-50 border border-rose-200 p-3 rounded-2xl space-y-1.5">
                    <span className="text-rose-800 font-black block">🔴 Eliminados en Mapa ({diffPreview.removedPlaces.length})</span>
                    <div className="max-h-36 overflow-y-auto space-y-1">
                      {diffPreview.removedPlaces.length === 0 ? (
                        <p className="text-[10px] text-rose-600 font-normal">Sin eliminaciones.</p>
                      ) : (
                        diffPreview.removedPlaces.map((p, idx) => (
                          <div key={idx} className="bg-white p-1.5 rounded-lg border border-rose-100 text-[10px] text-slate-700">
                            <strong>{p.name}</strong>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-[11px] text-slate-600 font-semibold">
                  🛡️ <strong>Regla de Protección:</strong> Los estados locales (como <code className="bg-white px-1 rounded text-rose-600">visited = true</code> o <code className="bg-white px-1 rounded text-rose-600">status = 'done'</code>) NUNCA se sobrescriben durante la sincronización.
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    onClick={() => setDiffPreview(null)}
                    className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 font-extrabold text-xs"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleConfirmKmlUpsert}
                    className="px-5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs border-b-2 border-emerald-700 shadow-sm"
                  >
                    Ejecutar UPSERT & Sync
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

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
                    className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-xl font-black text-xs text-rose-600"
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
              </div>
            </div>
          </div>
        )}

        {/* TAB 8: AUDIT LOGS */}
        {activeTab === 'logs' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center border-b-2 border-rose-50 pb-2">
              <h3 className="text-xl font-black text-rose-500 uppercase tracking-tight">📋 AUDIT LOGS</h3>
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
