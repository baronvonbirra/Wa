import React from 'react';
import { useAppState } from '../state/AppContext';

interface StickerStoreProps {
  onClose: () => void;
}

export interface StickerItem {
  id: string;
  emoji: string;
  name: string;
  category: "Japan Themes" | "Characters" | "Rare Holographic";
  cost: number;
  effectClass?: string;
}

export const STICKER_LIST: StickerItem[] = [
  // Japan Themes
  { id: "s_fuji", emoji: "🗻", name: "Mt. Fuji Sparkle", category: "Japan Themes", cost: 50 },
  { id: "s_blossom", emoji: "🌸", name: "Sakura Blossom", category: "Japan Themes", cost: 50 },
  { id: "s_gate", emoji: "⛩️", name: "Torii Gate Glow", category: "Japan Themes", cost: 50 },
  { id: "s_lantern", emoji: "🏮", name: "Obon Lantern", category: "Japan Themes", cost: 50 },
  { id: "s_pagoda", emoji: "🏯", name: "Kyoto Pagoda", category: "Japan Themes", cost: 50 },
  { id: "s_sushi", emoji: "🍣", name: "Cute Sushi Roll", category: "Japan Themes", cost: 50 },
  { id: "s_ramen", emoji: "🍜", name: "Dancing Ramen", category: "Japan Themes", cost: 50 },

  // Characters
  { id: "s_neko_happy", emoji: "😸", name: "Happy Mascot", category: "Characters", cost: 75 },
  { id: "s_neko_love", emoji: "😻", name: "In Love Mascot", category: "Characters", cost: 75 },
  { id: "s_ninja", emoji: "🥷", name: "Shadow Ninja", category: "Characters", cost: 75 },
  { id: "s_sumo", emoji: "🥋", name: "Little Sumo Wrestler", category: "Characters", cost: 75 },
  { id: "s_fox", emoji: "🦊", name: "Inari Kitsune Kits", category: "Characters", cost: 75 },

  // Rare Holographic
  { id: "s_holo_dragon", emoji: "🐉", name: "Holo Fire Dragon", category: "Rare Holographic", cost: 150, effectClass: "animate-pulse shadow-rose-500 ring-4 ring-rose-300" },
  { id: "s_holo_shinkansen", emoji: "🚄", name: "Golden Bullet Train", category: "Rare Holographic", cost: 150, effectClass: "animate-bounce shadow-yellow-500 ring-4 ring-yellow-300" },
  { id: "s_holo_castle", emoji: "🏰", name: "Glittering Himeji Castle", category: "Rare Holographic", cost: 150, effectClass: "animate-wiggle shadow-purple-500 ring-4 ring-purple-300" }
];

export const StickerStore: React.FC<StickerStoreProps> = ({ onClose }) => {
  const { state, buySticker } = useAppState();
  const activeKid = state.activePlayer === 'parent' ? 'james' : state.activePlayer;
  const profile = state.profiles[activeKid];

  const handlePurchase = (sticker: StickerItem) => {
    if (profile.unlockedStickers.includes(sticker.id)) {
      alert("😊 You already own this sticker! You can decorate your passport with it.");
      return;
    }
    if (profile.spendableXP < sticker.cost) {
      alert("🪙 Oh no! You need more coins to buy this. Play some games and complete quests to earn coins!");
      return;
    }

    const bought = buySticker(activeKid, sticker.id, sticker.cost);
    if (bought) {
      alert(`🎉 Congratulations! You bought the "${sticker.name}" sticker! Check it out in your Passport collection.`);
    }
  };

  const categories: ("Japan Themes" | "Characters" | "Rare Holographic")[] = [
    "Japan Themes",
    "Characters",
    "Rare Holographic"
  ];

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[110] p-4 animate-fade-in">
      <div className="bg-white border-8 border-amber-400 rounded-[36px] max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-slate-800 text-white border-4 border-white rounded-full font-black text-lg shadow-md hover:bg-slate-900 transition-all flex items-center justify-center"
        >
          ✕
        </button>

        {/* Title */}
        <div className="text-center pb-4 border-b-4 border-amber-100 flex-shrink-0">
          <span className="text-5xl animate-bounce inline-block mb-1">🎫</span>
          <h3 className="text-2xl font-black text-amber-950">Adventure Sticker Store</h3>
          <p className="text-xs text-amber-700 font-bold">Use your coins/XP to buy cute animated stickers!</p>
          <div className="mt-3 inline-flex items-center gap-2 bg-amber-100 border-2 border-amber-300 rounded-full px-5 py-1 text-sm font-black text-amber-900 shadow-sm animate-pulse">
            <span>🪙 Your Balance:</span>
            <span>{profile.spendableXP} Coins</span>
          </div>
        </div>

        {/* Categories Scroller */}
        <div className="flex-grow overflow-y-auto py-6 pr-1 space-y-8">
          {categories.map((category) => {
            const items = STICKER_LIST.filter(s => s.category === category);
            return (
              <div key={category}>
                <h4 className="text-sm font-black text-slate-500 uppercase tracking-widest mb-3 border-b-2 border-amber-50 pb-1 flex items-center gap-2">
                  <span>{category === "Japan Themes" ? "🌸" : category === "Characters" ? "😸" : "✨"}</span>
                  {category}
                </h4>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {items.map((sticker) => {
                    const owned = profile.unlockedStickers.includes(sticker.id);

                    return (
                      <div
                        key={sticker.id}
                        className={`bg-white rounded-2xl p-4 border-4 transition-all duration-200 flex flex-col items-center justify-between text-center relative overflow-hidden ${
                          owned
                            ? 'border-emerald-200 bg-emerald-50/20'
                            : 'border-slate-200 hover:border-amber-300 hover:shadow-md'
                        }`}
                      >
                        {/* Rare Holographic badge */}
                        {category === "Rare Holographic" && (
                          <span className="absolute top-0 right-0 text-[8px] font-black bg-rose-500 text-white px-1.5 py-0.5 rounded-bl-lg uppercase tracking-wider animate-pulse">
                            RARE
                          </span>
                        )}

                        <div className={`w-20 h-20 rounded-full bg-slate-50 border-2 border-slate-100 flex items-center justify-center text-4xl mb-2 relative ${sticker.effectClass || ''}`}>
                          {sticker.emoji}
                        </div>

                        <div className="mb-3">
                          <h5 className="font-extrabold text-xs text-slate-800 leading-tight">
                            {sticker.name}
                          </h5>
                        </div>

                        <button
                          onClick={() => handlePurchase(sticker)}
                          disabled={owned}
                          className={`w-full font-black text-xs py-2 rounded-xl transition-all border-b-2 ${
                            owned
                              ? 'bg-emerald-100 border-emerald-300 text-emerald-800 border-b-0 cursor-default'
                              : profile.spendableXP >= sticker.cost
                                ? 'bg-amber-400 border-amber-600 hover:bg-amber-500 text-amber-950 active:translate-y-0.5'
                                : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                          }`}
                        >
                          {owned ? (
                            'Owned! ✅'
                          ) : (
                            <span className="flex items-center justify-center gap-1">
                              🪙 {sticker.cost} Coins
                            </span>
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="pt-4 border-t-2 border-slate-100 flex-shrink-0 flex justify-between items-center text-xs text-slate-400 font-bold">
          <span>Collect them all to decorate your adventure passport!</span>
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-900 text-white font-black px-6 py-2.5 rounded-xl transition-all shadow-sm"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};
export default StickerStore;
