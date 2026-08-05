import React, { useState } from 'react';
import { useAppState } from '../state/AppContext';
import { SHOP_ITEMS, ShopItem, ShopCategory, RarityTier } from '../data/shopItems';

interface Shop2Props {
  onClose?: () => void;
}

export const Shop2: React.FC<Shop2Props> = ({ onClose }) => {
  const {
    state,
    purchaseShopItem,
    equipShopItem,
    toggleWishlist,
    buyBattlePassPremium,
    claimBattlePassLevel,
    usePowerup,
    addTradeOffer,
    acceptTradeOffer,
    cancelTradeOffer
  } = useAppState();

  const activeKid = state.activePlayer === 'parent' ? 'james' : state.activePlayer;
  const profile = state.profiles[activeKid];

  const [activeTab, setActiveTab] = useState<'browse' | 'battlepass' | 'trading' | 'wishlist' | 'collection'>('browse');

  const [selectedCategory, setSelectedCategory] = useState<ShopCategory | 'all'>('all');
  const [selectedRarity, setSelectedRarity] = useState<RarityTier | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const [offeredItem, setOfferedItem] = useState<string>('');
  const [reqCategory, setReqCategory] = useState<string>('stickers');
  const [reqRarity, setReqRarity] = useState<string>('common');

  const [previewItem, setPreviewItem] = useState<ShopItem | null>(null);

  const filteredItems = SHOP_ITEMS.filter(item => {
    if (item.cost === 0 && item.category === 'badges') return false;

    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesRarity = selectedRarity === 'all' || item.rarity === selectedRarity;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesRarity && matchesSearch;
  });

  const ownedStickersAndItems = [
    ...(profile.unlockedStickers || []),
    ...(profile.unlockedItemIds || [])
  ];

  const handlePurchase = (item: ShopItem) => {
    if (ownedStickersAndItems.includes(item.id)) {
      alert("😊 You already own this item!");
      return;
    }
    if (profile.spendableXP < item.cost) {
      alert("🪙 Oh no! You need more coins/XP to buy this item. Keep learning and completing daily quests!");
      return;
    }

    const bought = purchaseShopItem(activeKid, item.id, item.cost);
    if (bought) {
      alert(`🎉 Congratulations! You purchased "${item.name}"!`);
    }
  };

  const handleEquipToggle = (item: ShopItem) => {
    equipShopItem(activeKid, item.id, item.category);
  };

  const isEquipped = (item: ShopItem) => {
    if (item.category === 'themes') return profile.equippedThemeId === item.id;
    if (item.category === 'frames') return profile.equippedFrameId === item.id;
    if (item.category === 'sounds') return profile.equippedSoundId === item.id;
    if (item.category === 'filters') return profile.equippedFilterId === item.id;
    if (item.category === 'status') {
      if (item.id.startsWith("st_title_") || item.id === "st_word" || item.id === "st_conv" || item.id === "st_speed" || item.id === "st_trip" || item.id === "st_legend") {
        return profile.equippedTitleId === item.id;
      }
      return profile.equippedAuraId === item.id;
    }
    return false;
  };

  const handleCreateTrade = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offeredItem) {
      alert("Please select a duplicate sticker or item you wish to trade.");
      return;
    }

    const itemObj = SHOP_ITEMS.find(i => i.id === offeredItem);
    if (!itemObj) return;

    addTradeOffer({
      ownerName: profile.avatarCustomization?.customName || profile.name,
      ownerId: activeKid,
      offeredItemId: itemObj.id,
      offeredItemEmoji: itemObj.emoji,
      offeredItemName: itemObj.name,
      requestedItemCategory: reqCategory,
      requestedRarity: reqRarity
    });

    alert("✨ Trade listed on the global family board!");
    setOfferedItem('');
  };

  const handleAcceptTrade = (tradeId: string, offer: any) => {
    const matches = SHOP_ITEMS.filter(i => i.category === offer.requestedItemCategory && i.rarity === offer.requestedRarity);
    const ownedMatches = matches.filter(i => ownedStickersAndItems.includes(i.id));

    if (ownedMatches.length === 0) {
      alert(`⚠️ You do not own any "${offer.requestedRarity}" item in the "${offer.requestedItemCategory}" category to make this trade!`);
      return;
    }

    const givingItem = ownedMatches[0];

    const confirmTrade = window.confirm(
      `Do you want to trade your ${givingItem.emoji} "${givingItem.name}" for ${offer.ownerName}'s ${offer.offeredItemEmoji} "${offer.offeredItemName}"?\n(A minor 5 XP trading fee applies to both)`
    );

    if (confirmTrade) {
      const success = acceptTradeOffer(tradeId, activeKid, givingItem.id);
      if (success) {
        alert("🎉 Trade complete! Check your updated inventory.");
      } else {
        alert("⚠️ Failed to trade. Ensure you have at least 5 XP spendable balance for the network fee!");
      }
    }
  };

  const battlePassRewards = [
    { level: 1, free: "s_c_1", premium: "fr_1", freeLabel: "🌸 Sticker", premiumLabel: "Bamboo Frame" },
    { level: 2, free: "c_emote_1", premium: "t_1", freeLabel: "🤩 Emote", premiumLabel: "Tokyo Neon Theme" },
    { level: 3, free: "snd_1", premium: "s_l_1", freeLabel: "🔔 Chime Sound", premiumLabel: "👑 Legendary Dragon" },
    { level: 4, free: "s_u_2", premium: "flt_2", freeLabel: "Uncommon Sticker", premiumLabel: "Cel-Shade Filter" },
    { level: 5, free: "p_focus", premium: "c_pet_1", freeLabel: "🎯 Focus Power-up", premiumLabel: "🐶 Dog Companion" },
    { level: 6, free: "snd_2", premium: "t_4", freeLabel: "🎸 Shamisen Sound", premiumLabel: "Snowy Fuji Theme" },
    { level: 7, free: "s_u_8", premium: "fr_3", freeLabel: "Uncommon Sticker", premiumLabel: "Golden Frame" },
    { level: 8, free: "p_speed", premium: "st_title_1", freeLabel: "🚀 Speed Power-up", premiumLabel: "Elite Explorer Title" },
    { level: 9, free: "s_r_4", premium: "c_outfit_2", freeLabel: "Rare Sticker", premiumLabel: "🥷 Ninja Gear" },
    { level: 10, free: "s_l_5", premium: "st_gold", freeLabel: "👑 Legendary Sticker", premiumLabel: "✨ Gold Aura Status" }
  ];

  return (
    <div className="bg-[#FFFDF9] border-8 border-amber-400 rounded-[36px] max-w-5xl w-full mx-auto p-6 shadow-2xl relative flex flex-col overflow-hidden my-8 font-sans">
      <div className="text-center pb-6 border-b-4 border-amber-100 flex-shrink-0 flex flex-col md:flex-row md:justify-between items-center gap-4">
        <div className="text-left">
          <h2 className="text-3xl font-black text-amber-950 flex items-center gap-2">
            <span>🛍️</span> JAPAN QUEST SHOP 2.0
          </h2>
          <p className="text-xs text-amber-700 font-bold">Infinite rewards, seasonal levels, cosmetics, themes & frames!</p>
        </div>

        <div className="flex items-center gap-3 bg-amber-100 border-2 border-amber-300 rounded-2xl px-5 py-2.5 shadow-sm">
          <div>
            <p className="text-[10px] text-amber-800 font-extrabold uppercase leading-tight">Your Balance</p>
            <strong className="text-lg text-amber-900 block leading-none mt-1">🪙 {profile.spendableXP} Coins / XP</strong>
          </div>
          {profile.battlePassPremiumOwned && (
            <span className="bg-gradient-to-r from-amber-500 to-rose-500 text-white text-[10px] font-black px-2.5 py-1 rounded-full border border-white animate-pulse">
              PREMIUM PASS ACTIVE
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-wrap gap-2 py-4 border-b border-amber-100 justify-center">
        {[
          { id: 'browse', label: '🏪 Browse Shop', color: 'from-amber-400 to-amber-500' },
          { id: 'battlepass', label: '⚔️ Seasonal Battle Pass', color: 'from-rose-400 to-rose-500' },
          { id: 'trading', label: '🔄 Family Trading Post', color: 'from-indigo-400 to-indigo-500' },
          { id: 'wishlist', label: '❤️ Wishlist', color: 'from-pink-400 to-pink-500' },
          { id: 'collection', label: '🎒 My Collection', color: 'from-emerald-400 to-emerald-500' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-2 px-5 text-xs font-black rounded-full border-2 transition-all shadow-sm ${
              activeTab === tab.id
                ? `bg-gradient-to-r ${tab.color} text-white border-white scale-105`
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex-grow py-6 min-h-[450px]">
        {activeTab === 'browse' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-purple-500 via-rose-500 to-amber-500 rounded-3xl p-5 text-white flex flex-col md:flex-row justify-between items-center gap-4 shadow-lg relative overflow-hidden animate-soft">
              <div className="absolute top-0 right-0 text-[10px] font-black bg-yellow-400 text-slate-900 px-3 py-1 rounded-bl-xl uppercase tracking-widest animate-pulse">
                ⏰ ONLY 4 DAYS LEFT!
              </div>
              <div>
                <span className="text-xs font-black bg-white/20 px-3 py-1 rounded-full uppercase tracking-widest">
                  Featured Summer Bundle Deal
                </span>
                <h3 className="text-2xl font-black mt-2">🏮 Traditional Matsuri Festival Set</h3>
                <p className="text-xs font-semibold opacity-90 mt-1">Get Obon Lantern, Festival Robe, Obon Theme, and Taiko sound for just 200 XP!</p>
              </div>
              <button
                onClick={() => {
                  if (profile.spendableXP >= 200) {
                    purchaseShopItem(activeKid, "s_lantern", 0);
                    purchaseShopItem(activeKid, "c_outfit_4", 0);
                    purchaseShopItem(activeKid, "t_2", 0);
                    purchaseShopItem(activeKid, "snd_3", 0);
                    purchaseShopItem(activeKid, "bundle_matsuri", 200);
                    alert("🎉 Bundle successfully purchased! All items have been added to your collections.");
                  } else {
                    alert("🪙 You need 200 XP to purchase this awesome bundle!");
                  }
                }}
                className="bg-white text-rose-600 font-black px-6 py-3 rounded-2xl border-b-4 border-slate-200 hover:scale-105 transition-all shadow-md active:translate-y-0.5 active:border-b-0 text-sm flex-shrink-0"
              >
                {ownedStickersAndItems.includes("bundle_matsuri") ? "Owned! ✅" : "Buy Bundle — 200 XP"}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-slate-50 p-4 rounded-3xl border border-slate-200">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Search Items</label>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  placeholder="Type name..."
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Category</label>
                <select
                  value={selectedCategory}
                  onChange={e => setSelectedCategory(e.target.value as any)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none text-slate-700"
                >
                  <option value="all">📦 All Categories</option>
                  <option value="stickers">🎫 Stickers</option>
                  <option value="cosmetics">👘 Cosmetics</option>
                  <option value="themes">🏙️ Background Themes</option>
                  <option value="frames">🖼️ Profile Frames</option>
                  <option value="sounds">🔊 Sound & Music</option>
                  <option value="filters">📸 Photo Filters</option>
                  <option value="powerups">⚡ Power-ups</option>
                  <option value="status">👑 Status & Auras</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Rarity</label>
                <select
                  value={selectedRarity}
                  onChange={e => setSelectedRarity(e.target.value as any)}
                  className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none text-slate-700"
                >
                  <option value="all">💎 All Rarities</option>
                  <option value="common">🟢 Common</option>
                  <option value="uncommon">🔵 Uncommon</option>
                  <option value="rare">🟡 Rare</option>
                  <option value="legendary">🟣 Legendary</option>
                </select>
              </div>

              <div className="flex items-end justify-between gap-2">
                <div className="text-[10px] font-bold text-slate-400 leading-tight">
                  Displaying <strong>{filteredItems.length}</strong> items in shop catalog.
                </div>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedRarity('all');
                  }}
                  className="text-xs font-black text-rose-500 hover:text-rose-600 bg-white border border-rose-200 px-3 py-2 rounded-xl"
                >
                  Reset Filters
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredItems.slice(0, 48).map(item => {
                const owned = ownedStickersAndItems.includes(item.id);
                const wishlisted = profile.wishlistItemIds?.includes(item.id);

                return (
                  <div
                    key={item.id}
                    className={`bg-white rounded-3xl p-4 border-4 transition-all duration-200 flex flex-col justify-between text-center relative overflow-hidden ${
                      owned
                        ? 'border-emerald-200 bg-emerald-50/10'
                        : 'border-slate-100 hover:border-amber-300 hover:shadow-md'
                    }`}
                  >
                    <span className={`absolute top-0 right-0 text-[8px] font-black px-2.5 py-0.5 rounded-bl-xl uppercase tracking-wider ${
                      item.rarity === 'common' ? 'bg-emerald-500 text-white' :
                      item.rarity === 'uncommon' ? 'bg-blue-500 text-white' :
                      item.rarity === 'rare' ? 'bg-amber-500 text-slate-900' :
                      'bg-purple-600 text-white animate-pulse'
                    }`}>
                      {item.rarity}
                    </span>

                    <button
                      onClick={() => toggleWishlist(activeKid, item.id)}
                      className="absolute top-1 left-1.5 text-base hover:scale-120 transition-all active:scale-95"
                    >
                      {wishlisted ? '💖' : '🤍'}
                    </button>

                    <div className="flex justify-center my-4">
                      <div className={`w-16 h-16 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl shadow-sm relative ${item.effectClass || ''}`}>
                        {item.emoji}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-extrabold text-xs text-slate-800 leading-tight">
                        {item.name}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-bold leading-normal mt-1 max-w-[130px] mx-auto">
                        {item.description}
                      </p>
                    </div>

                    <div className="space-y-2">
                      <button
                        onClick={() => handlePurchase(item)}
                        disabled={owned}
                        className={`w-full font-black text-xs py-2 rounded-xl transition-all border-b-2 ${
                          owned
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-800 border-b-0 cursor-default'
                            : profile.spendableXP >= item.cost
                              ? 'bg-amber-400 border-amber-600 hover:bg-amber-500 text-amber-950 active:translate-y-0.5'
                              : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {owned ? (
                          'Purchased! ✅'
                        ) : (
                          <span className="flex items-center justify-center gap-1">
                            🪙 {item.cost} Coins
                          </span>
                        )}
                      </button>

                      <button
                        onClick={() => setPreviewItem(item)}
                        className="w-full bg-slate-50 border border-slate-200 hover:bg-slate-100 text-slate-600 font-black text-[9px] py-1 rounded-lg"
                      >
                        🔍 Preview Item
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {filteredItems.length > 48 && (
              <p className="text-center text-xs text-slate-400 font-bold italic pt-4">
                Showing top 48 items matching search. Adjust search tags to explore more of our 530+ items collection!
              </p>
            )}
          </div>
        )}

        {activeTab === 'battlepass' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-rose-500 to-pink-600 rounded-[32px] p-6 text-white flex flex-col md:flex-row justify-between items-center gap-6 shadow-md relative">
              <div className="absolute top-3 left-4 text-[10px] font-black uppercase bg-white/20 px-3 py-1 rounded-full">
                🎒 SEASON 2: SUMMER IN JAPAN
              </div>
              <div className="space-y-2 mt-4 md:mt-0">
                <h3 className="text-3xl font-black text-yellow-300 drop-shadow-sm">Japan Quest Seasonal Battle Pass</h3>
                <p className="text-xs font-bold opacity-95">Complete lessons and earn XP to level up! Get amazing exclusive items every season.</p>

                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between items-center text-xs font-black">
                    <span>Level {profile.battlePassLevel} Explorer</span>
                    <span>{profile.battlePassXP % 100} / 100 Seasonal BP XP</span>
                  </div>
                  <div className="w-full bg-black/20 h-4 rounded-full overflow-hidden border border-white/20">
                    <div
                      className="bg-yellow-300 h-full rounded-full transition-all duration-300"
                      style={{ width: `${profile.battlePassXP % 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {!profile.battlePassPremiumOwned ? (
                <div className="bg-white/10 border-2 border-white/25 rounded-2xl p-4 text-center max-w-xs">
                  <span className="text-3xl">🔑</span>
                  <h4 className="font-black text-sm text-yellow-300 mt-1">Unlock Premium Rewards</h4>
                  <p className="text-[10px] font-bold opacity-90 my-2">Gain access to the bottom premium cosmetic track for only 100 XP!</p>
                  <button
                    onClick={() => {
                      const success = buyBattlePassPremium(activeKid, 100);
                      if (success) {
                        alert("🎉 Awesome! You unlocked the Season 2 Premium Battle Pass! Claim all premium tier cosmetics instantly.");
                      } else {
                        alert("🪙 You need 100 XP coins to buy the Premium Pass.");
                      }
                    }}
                    className="w-full bg-yellow-300 hover:bg-yellow-400 text-slate-900 font-black text-xs py-2.5 rounded-xl border-b-2 border-yellow-600 active:translate-y-0.5"
                  >
                    Unlock Premium Pass — 100 XP
                  </button>
                </div>
              ) : (
                <div className="bg-yellow-300 border-4 border-yellow-400 text-slate-900 rounded-2xl p-4 text-center max-w-xs font-black">
                  <span className="text-3xl animate-bounce inline-block">👑</span>
                  <h4 className="font-extrabold text-sm">PREMIUM ACTIVE!</h4>
                  <p className="text-[10px] opacity-80 mt-1">You are farming both Free and Premium cosmetic sets on the seasonal track!</p>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-2">Level-by-Level Seasonal Progression (1 to 10)</h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {battlePassRewards.map(tier => {
                  const levelUnlocked = profile.battlePassLevel >= tier.level;
                  const claimedFree = profile.claimedFreeLevels?.includes(tier.level);
                  const claimedPremium = profile.claimedPremiumLevels?.includes(tier.level);

                  const freeItem = SHOP_ITEMS.find(i => i.id === tier.free);
                  const premiumItem = SHOP_ITEMS.find(i => i.id === tier.premium);

                  return (
                    <div
                      key={tier.level}
                      className={`rounded-3xl p-4 border-2 flex items-center justify-between gap-4 relative overflow-hidden ${
                        levelUnlocked
                          ? 'border-rose-200 bg-rose-50/10'
                          : 'border-slate-100 bg-slate-50/50 opacity-60'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-full bg-rose-500 text-white font-black text-lg flex items-center justify-center border-4 border-white shadow-md flex-shrink-0">
                        {tier.level}
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-center text-xs">
                          <div>
                            <span className="font-black text-slate-500 uppercase tracking-wider block text-[8px]">Free Track</span>
                            <span className="font-bold text-slate-800">{freeItem?.emoji} {tier.freeLabel}</span>
                          </div>
                          {levelUnlocked ? (
                            claimedFree ? (
                              <span className="text-[10px] text-emerald-600 font-bold">Claimed ✅</span>
                            ) : (
                              <button
                                onClick={() => {
                                  claimBattlePassLevel(activeKid, tier.level, false, tier.free);
                                  alert(`🎉 Claimed your Free Reward: "${freeItem?.name}"! Check your collection.`);
                                }}
                                className="bg-rose-500 hover:bg-rose-600 text-white font-black text-[10px] px-2.5 py-1 rounded-lg"
                              >
                                Claim
                              </button>
                            )
                          ) : (
                            <span className="text-[10px] text-slate-400 font-bold">🔒 Locked</span>
                          )}
                        </div>

                        <div className="flex justify-between items-center text-xs border-t border-rose-50 pt-2">
                          <div>
                            <span className="font-black text-amber-600 uppercase tracking-wider block text-[8px]">Premium Track</span>
                            <span className="font-bold text-slate-800">{premiumItem?.emoji} {tier.premiumLabel}</span>
                          </div>
                          {profile.battlePassPremiumOwned ? (
                            levelUnlocked ? (
                              claimedPremium ? (
                                <span className="text-[10px] text-emerald-600 font-bold">Claimed ✅</span>
                              ) : (
                                <button
                                  onClick={() => {
                                    claimBattlePassLevel(activeKid, tier.level, true, tier.premium);
                                    alert(`🎉 Claimed your Premium Reward: "${premiumItem?.name}"! Check your collection.`);
                                  }}
                                  className="bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-[10px] px-2.5 py-1 rounded-lg"
                                >
                                  Claim
                                </button>
                              )
                            ) : (
                              <span className="text-[10px] text-slate-400 font-bold">🔒 Locked</span>
                            )
                          ) : (
                            <span className="text-[9px] text-rose-500 font-black uppercase">Need Premium</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'trading' && (
          <div className="space-y-6">
            <div className="bg-indigo-50 border-4 border-indigo-200 rounded-[32px] p-5">
              <h4 className="text-base font-black text-indigo-950 flex items-center gap-1.5 mb-2">
                <span>🏮</span> List Duplicate Sticker for Global Family Trade
              </h4>
              <p className="text-xs text-indigo-700 font-semibold mb-4 leading-relaxed">
                Choose any sticker or item you currently own to post on the trading board. Your siblings can accept trades instantly if they have items of equivalent rarity.
              </p>

              <form onSubmit={handleCreateTrade} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                <div>
                  <label className="block text-[10px] font-black uppercase text-indigo-800 mb-1">Select Owned Sticker</label>
                  <select
                    value={offeredItem}
                    onChange={e => setOfferedItem(e.target.value)}
                    className="w-full bg-white border-2 border-indigo-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none"
                  >
                    <option value="">-- Choose Item --</option>
                    {SHOP_ITEMS.filter(item => ownedStickersAndItems.includes(item.id) && item.category === 'stickers').map(item => (
                      <option key={item.id} value={item.id}>{item.emoji} {item.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-indigo-800 mb-1">Request Category</label>
                  <select
                    value={reqCategory}
                    onChange={e => setReqCategory(e.target.value)}
                    className="w-full bg-white border-2 border-indigo-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none"
                  >
                    <option value="stickers">🎫 Stickers</option>
                    <option value="cosmetics">👘 Avatar Cosmetics</option>
                    <option value="themes">🏙️ Background Themes</option>
                    <option value="frames">🖼️ Profile Frames</option>
                    <option value="sounds">🔊 Sound Effect</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-indigo-800 mb-1">Request Rarity</label>
                  <select
                    value={reqRarity}
                    onChange={e => setReqRarity(e.target.value)}
                    className="w-full bg-white border-2 border-indigo-200 rounded-xl px-3 py-2 text-xs font-bold focus:outline-none"
                  >
                    <option value="common">🟢 Common</option>
                    <option value="uncommon">🔵 Uncommon</option>
                    <option value="rare">🟡 Rare</option>
                    <option value="legendary">🟣 Legendary</option>
                  </select>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs py-2.5 rounded-xl border-b-4 border-indigo-800 active:border-b-0 active:translate-y-0.5"
                  >
                    Post Trade Offer
                  </button>
                </div>
              </form>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-2">Live Trades Board</h4>

              {state.tradingPostOffers?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {state.tradingPostOffers.map(trade => {
                    const isOwnOffer = trade.ownerId === activeKid;

                    return (
                      <div
                        key={trade.id}
                        className="bg-white rounded-2xl p-4 border-2 border-slate-100 flex items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <p className="text-[10px] font-black text-indigo-600 uppercase tracking-widest leading-none">
                            POSTED BY: {trade.ownerName}
                          </p>
                          <h5 className="font-extrabold text-sm text-slate-800 flex items-center gap-1.5 pt-1">
                            <span>Offering:</span>
                            <span className="text-lg">{trade.offeredItemEmoji}</span>
                            <strong>{trade.offeredItemName}</strong>
                          </h5>
                          <p className="text-xs font-semibold text-slate-400">
                            Wants a: <strong className="text-indigo-600 uppercase text-[10px]">{trade.requestedRarity} {trade.requestedItemCategory}</strong>
                          </p>
                        </div>

                        {isOwnOffer ? (
                          <button
                            onClick={() => {
                              cancelTradeOffer(trade.id);
                              alert("Trade cancelled successfully!");
                            }}
                            className="bg-red-50 hover:bg-red-100 border border-red-200 text-red-500 font-black text-xs px-3 py-2 rounded-xl"
                          >
                            Cancel Trade
                          </button>
                        ) : (
                          <button
                            onClick={() => handleAcceptTrade(trade.id, trade)}
                            className="bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs px-4 py-2.5 rounded-xl"
                          >
                            Accept Trade
                          </button>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-[28px]">
                  <span className="text-4xl block opacity-40">🔄</span>
                  <p className="text-xs font-bold text-slate-400 mt-2">No active trades listed yet! Start list-trading your duplicate stickers.</p>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'wishlist' && (
          <div className="space-y-6">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-2">My Saved Favorites List ({profile.wishlistItemIds?.length || 0})</h4>

            {profile.wishlistItemIds?.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {SHOP_ITEMS.filter(item => profile.wishlistItemIds.includes(item.id)).map(item => {
                  const owned = ownedStickersAndItems.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-3xl p-4 border-2 border-slate-150 flex flex-col justify-between text-center relative"
                    >
                      <button
                        onClick={() => toggleWishlist(activeKid, item.id)}
                        className="absolute top-2 left-2 text-base"
                      >
                        💖
                      </button>

                      <div className="flex justify-center my-4">
                        <div className="w-14 h-14 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-3xl shadow-inner">
                          {item.emoji}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-extrabold text-xs text-slate-800">
                          {item.name}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                          {item.category} • {item.rarity}
                        </p>
                      </div>

                      <button
                        onClick={() => handlePurchase(item)}
                        disabled={owned}
                        className={`w-full font-black text-xs py-2 rounded-xl border-b-2 ${
                          owned
                            ? 'bg-emerald-100 border-emerald-300 text-emerald-800 border-b-0 cursor-default'
                            : profile.spendableXP >= item.cost
                              ? 'bg-amber-400 border-amber-600 hover:bg-amber-500 text-amber-950'
                              : 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                        }`}
                      >
                        {owned ? 'Purchased! ✅' : `🪙 ${item.cost} Coins`}
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-[28px]">
                <span className="text-4xl block opacity-40">🤍</span>
                <p className="text-xs font-bold text-slate-400 mt-2">No items wishlisted yet! Explore browse catalog to save favorite cosmetics.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'collection' && (
          <div className="space-y-6">
            <h4 className="text-sm font-black text-slate-400 uppercase tracking-wider mb-2">Unlocked Custom Cosmetics & Items Inventory ({ownedStickersAndItems.length})</h4>

            {ownedStickersAndItems.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                {SHOP_ITEMS.filter(item => ownedStickersAndItems.includes(item.id)).map(item => {
                  const equipped = isEquipped(item);
                  const isConsumablePowerup = item.isConsumable;

                  return (
                    <div
                      key={item.id}
                      className={`bg-white rounded-3xl p-4 border-2 flex flex-col justify-between text-center relative ${
                        equipped ? 'border-emerald-400 shadow-md bg-emerald-50/10' : 'border-slate-150'
                      }`}
                    >
                      <div className="flex justify-center my-4">
                        <div className={`w-14 h-14 rounded-full bg-slate-50 border border-slate-155 flex items-center justify-center text-3xl shadow-sm ${item.effectClass || ''}`}>
                          {item.emoji}
                        </div>
                      </div>

                      <div className="mb-4">
                        <h4 className="font-extrabold text-xs text-slate-800">
                          {item.name}
                        </h4>
                        <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">
                          {item.category} • {item.rarity}
                        </p>
                      </div>

                      {isConsumablePowerup ? (
                        <button
                          onClick={() => {
                            usePowerup(activeKid, item.id);
                            alert(`⚡ Power-up "${item.name}" activated! Your next gameplay session has active multiplier advantages.`);
                          }}
                          className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black text-xs py-2 rounded-xl"
                        >
                          ⚡ Consume Power-up
                        </button>
                      ) : (
                        item.category !== 'stickers' && (
                          <button
                            onClick={() => handleEquipToggle(item)}
                            className={`w-full font-black text-xs py-2 rounded-xl border-b-2 ${
                              equipped
                                ? 'bg-rose-500 border-rose-700 text-white active:translate-y-0.5'
                                : 'bg-slate-800 border-slate-950 text-white hover:bg-slate-900 active:translate-y-0.5'
                            }`}
                          >
                            {equipped ? 'Unequip ✕' : 'Equip Customization'}
                          </button>
                        )
                      )}

                      {item.category === 'stickers' && (
                        <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 py-1.5 rounded-xl border border-emerald-100">
                          Passport Decoration sticker ✅
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-12 border-2 border-dashed border-slate-200 rounded-[28px]">
                <span className="text-4xl block opacity-40">🎒</span>
                <p className="text-xs font-bold text-slate-400 mt-2">Inventory empty. Complete daily tasks or spend coins to collect cosmetics!</p>
              </div>
            )}
          </div>
        )}
      </div>

      {previewItem && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[120] p-4 animate-fade-in">
          <div className="bg-white border-8 border-amber-400 rounded-[36px] max-w-sm w-full p-6 shadow-2xl relative text-center">
            <button
              onClick={() => setPreviewItem(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 font-bold"
            >
              ✕
            </button>

            <span className="text-3xl font-black text-amber-500 uppercase tracking-widest block text-[10px] mb-2">
              📐 Item Preview View
            </span>

            <div className="flex justify-center my-6">
              <div className={`w-24 h-24 rounded-full bg-slate-50 border-4 border-amber-200 flex items-center justify-center text-5xl shadow-md ${previewItem.effectClass || ''}`}>
                {previewItem.emoji}
              </div>
            </div>

            <h4 className="text-xl font-black text-slate-800">{previewItem.name}</h4>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-1">{previewItem.category} • {previewItem.rarity}</p>
            <p className="text-xs font-medium text-slate-600 mt-3 leading-relaxed max-w-xs mx-auto">
              "{previewItem.description}"
            </p>

            <div className="pt-6 mt-6 border-t-2 border-slate-100 flex gap-2">
              <button
                onClick={() => setPreviewItem(null)}
                className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-black py-2.5 rounded-xl text-xs"
              >
                Close Preview
              </button>
              {!ownedStickersAndItems.includes(previewItem.id) && (
                <button
                  onClick={() => {
                    handlePurchase(previewItem);
                    setPreviewItem(null);
                  }}
                  className="flex-1 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black py-2.5 rounded-xl text-xs border-b-2 border-amber-600 active:translate-y-0.5 active:border-b-0"
                >
                  Buy for 🪙 {previewItem.cost} XP
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {onClose && (
        <div className="pt-6 border-t-2 border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="bg-slate-800 hover:bg-slate-900 text-white font-black px-6 py-2.5 rounded-xl transition-all shadow-sm"
          >
            Go Back
          </button>
        </div>
      )}
    </div>
  );
};
export default Shop2;
