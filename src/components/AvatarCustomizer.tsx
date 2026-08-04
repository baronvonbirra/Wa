import React, { useState } from 'react';
import { useAppState } from '../state/AppContext';

interface AvatarCustomizerProps {
  onClose: () => void;
}

export const AvatarCustomizer: React.FC<AvatarCustomizerProps> = ({ onClose }) => {
  const { state, updateAvatar } = useAppState();
  const activeKid = state.activePlayer === 'parent' ? 'james' : state.activePlayer;
  const profile = state.profiles[activeKid];

  const [selectedFace, setSelectedFace] = useState(profile.avatarCustomization.face);
  const [selectedHair, setSelectedHair] = useState(profile.avatarCustomization.hair);
  const [selectedOutfit, setSelectedOutfit] = useState(profile.avatarCustomization.outfit);
  const [customName, setCustomName] = useState(profile.avatarCustomization.customName || profile.name);

  const faces = [
    { emoji: "😊", name: "Happy Face" },
    { emoji: "🤩", name: "Star Eyes" },
    { emoji: "😎", name: "Cool Kid" },
    { emoji: "🥰", name: "Loving Eyes" },
    { emoji: "😝", name: "Silley Tongue" },
    { emoji: "🦁", name: "Cute Lion" },
    { emoji: "🐼", name: "Chill Panda" },
    { emoji: "🦊", name: "Clever Fox" },
    { emoji: "🐱", name: "Lucky Cat" }
  ];

  const hairs = [
    "🎀 Black Hair",
    "🎀 Brown Hair",
    "🎀 Blonde Hair",
    "🎀 Red Hair",
    "🎀 Blue Hair",
    "🎀 Purple Hair",
    "🎩 Stylish Hat",
    "👑 Golden Crown"
  ];

  const outfits = [
    "👘 Traditional Kimono",
    "👗 Cute School Uniform",
    "🧥 Casual Adventure Jacket",
    "🎪 Colorful Festival Robes",
    "🥋 Karate Gi",
    "🚀 Space suit"
  ];

  const handleSave = () => {
    updateAvatar(activeKid, {
      face: selectedFace,
      hair: selectedHair,
      outfit: selectedOutfit,
      customName: customName.trim() || profile.name
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm flex items-center justify-center z-[110] p-4 animate-fade-in">
      <div className="bg-white border-8 border-rose-400 rounded-[36px] max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] flex flex-col overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 bg-slate-800 text-white border-4 border-white rounded-full font-black text-lg shadow-md hover:bg-slate-900 transition-all flex items-center justify-center"
        >
          ✕
        </button>

        {/* Title */}
        <div className="text-center pb-4 border-b-4 border-rose-100 flex-shrink-0">
          <span className="text-5xl animate-bounce inline-block mb-1">🎨</span>
          <h3 className="text-2xl font-black text-rose-950">Create Your Custom Avatar</h3>
          <p className="text-xs text-rose-700 font-bold">Express your personality & choose your look!</p>
        </div>

        {/* Builder Panel */}
        <div className="flex-grow overflow-y-auto py-6 pr-1 grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Preview */}
          <div className="bg-gradient-to-b from-rose-50 to-amber-50 border-4 border-rose-200 rounded-[32px] p-6 flex flex-col items-center justify-center text-center shadow-inner relative min-h-[280px]">
            {/* Visual preview combining pieces */}
            <div className="relative w-36 h-36 bg-white rounded-full shadow-lg border-4 border-rose-300 flex items-center justify-center mb-4 overflow-visible animate-soft">
              {/* Accessory/Hair background or overlay */}
              <div className="absolute top-0 text-3xl z-10 select-none">
                {selectedHair.startsWith("🎀") ? "💇" : selectedHair.split(" ")[0]}
              </div>
              {/* Face Emoji */}
              <div className="text-7xl select-none relative z-0">{selectedFace}</div>
              {/* Outfit overlay below face */}
              <div className="absolute -bottom-2 text-4xl bg-white/90 rounded-full p-1.5 shadow-md border border-rose-100 z-10 select-none">
                {selectedOutfit.split(" ")[0]}
              </div>
            </div>

            {/* Custom Nickname input */}
            <div className="w-full">
              <label className="block text-xs font-black text-rose-800 uppercase tracking-wider mb-1">
                Adventure Name
              </label>
              <input
                type="text"
                value={customName}
                onChange={(e) => setCustomName(e.target.value)}
                placeholder="Name your character..."
                className="w-full bg-white border-4 border-rose-200 focus:border-rose-400 rounded-2xl px-4 py-2 text-center text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none shadow-sm"
              />
              <p className="text-[10px] text-rose-500 font-extrabold mt-1">
                Will be shown on Leaderboards & Progress Cards!
              </p>
            </div>
          </div>

          {/* Right: Choices list */}
          <div className="space-y-6">
            {/* Faces Choice */}
            <div>
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                <span>😊</span> Choose Face Shape
              </h4>
              <div className="grid grid-cols-5 gap-2">
                {faces.map((f) => (
                  <button
                    key={f.emoji}
                    onClick={() => setSelectedFace(f.emoji)}
                    title={f.name}
                    className={`text-2xl p-2.5 rounded-xl border-2 transition-all hover:scale-115 ${
                      selectedFace === f.emoji
                        ? 'bg-rose-100 border-rose-500 scale-110 shadow-sm'
                        : 'bg-slate-50 border-slate-200 hover:border-rose-300'
                    }`}
                  >
                    {f.emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Hair Choice */}
            <div>
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                <span>💇</span> Hairstyle / Hat
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {hairs.map((h) => (
                  <button
                    key={h}
                    onClick={() => setSelectedHair(h)}
                    className={`py-2 px-3 text-xs font-black rounded-xl border-2 transition-all flex items-center gap-1.5 justify-start text-left ${
                      selectedHair === h
                        ? 'bg-rose-100 border-rose-500 text-rose-950 shadow-sm scale-102'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-rose-300'
                    }`}
                  >
                    <span className="text-base">{h.split(" ")[0]}</span>
                    <span>{h.substring(h.indexOf(" ") + 1)}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Outfits Choice */}
            <div>
              <h4 className="text-xs font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-1">
                <span>👘</span> Choose Outfit
              </h4>
              <div className="grid grid-cols-2 gap-2">
                {outfits.map((o) => (
                  <button
                    key={o}
                    onClick={() => setSelectedOutfit(o)}
                    className={`py-2 px-3 text-xs font-black rounded-xl border-2 transition-all flex items-center gap-1.5 justify-start text-left ${
                      selectedOutfit === o
                        ? 'bg-rose-100 border-rose-500 text-rose-950 shadow-sm scale-102'
                        : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-rose-300'
                    }`}
                  >
                    <span className="text-base">{o.split(" ")[0]}</span>
                    <span>{o.substring(o.indexOf(" ") + 1)}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Save Action */}
        <div className="pt-4 border-t-2 border-slate-100 flex-shrink-0 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 font-black py-3.5 rounded-2xl text-sm transition-all text-center"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-rose-500 hover:bg-rose-600 text-white font-black py-3.5 rounded-2xl text-sm shadow-md transition-all border-b-4 border-rose-700 active:border-b-0 active:translate-y-0.5 text-center"
          >
            Save Avatar! ✨
          </button>
        </div>
      </div>
    </div>
  );
};
export default AvatarCustomizer;
