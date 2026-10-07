import React, { useState } from 'react';
import { useWa2 } from '../../state/Wa2Context';
import { WishlistItem, WishlistCategory } from '../../state/wa2Types';
import {
  ShoppingBag,
  Plus,
  CheckCircle2,
  Circle,
  Tag,
  Search,
  Edit2,
  Trash2,
  Sparkles,
  Coins,
  Image as ImageIcon
} from 'lucide-react';

export const WishlistView: React.FC = () => {
  const { waState, toggleWishlistPurchased, addWishlistItem, updateWishlistItem, deleteWishlistItem } = useWa2();

  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all'); // 'all', 'seeking', 'purchased'
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<WishlistItem | null>(null);

  // Form states
  const [itemName, setItemName] = useState('');
  const [priceJpy, setPriceJpy] = useState<number | ''>(5000);
  const [category, setCategory] = useState<WishlistCategory>('figuras');
  const [imageUrl, setImageUrl] = useState('');
  const [notes, setNotes] = useState('');

  const categoriesList: { id: WishlistCategory; label: string; bg: string }[] = [
    { id: 'figuras', label: 'Figuras / Merch', bg: 'bg-rose-100 text-rose-800 border-rose-200' },
    { id: 'retro_gaming', label: 'Retro Gaming', bg: 'bg-purple-100 text-purple-800 border-purple-200' },
    { id: 'ropa', label: 'Ropa / Sukajan', bg: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
    { id: 'souvenirs', label: 'Souvenirs / Snacks', bg: 'bg-amber-100 text-amber-800 border-amber-200' },
    { id: 'otros', label: 'Otros', bg: 'bg-slate-100 text-slate-800 border-slate-200' },
  ];

  // Calculations
  const totalJpy = waState.wishlist.reduce((sum, item) => sum + (item.price_jpy || 0), 0);
  const totalEur = totalJpy / waState.eurJpyRate;

  const purchasedJpy = waState.wishlist
    .filter(i => i.purchased)
    .reduce((sum, item) => sum + (item.price_jpy || 0), 0);
  const purchasedEur = purchasedJpy / waState.eurJpyRate;

  const seekingCount = waState.wishlist.filter(i => !i.purchased).length;
  const purchasedCount = waState.wishlist.filter(i => i.purchased).length;

  // Filtered List
  const filteredItems = waState.wishlist.filter(item => {
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    const matchesStatus =
      filterStatus === 'all' ||
      (filterStatus === 'seeking' && !item.purchased) ||
      (filterStatus === 'purchased' && item.purchased);
    const matchesSearch = item.item_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.notes && item.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesStatus && matchesSearch;
  });

  const handleOpenModal = (itemToEdit?: WishlistItem) => {
    if (itemToEdit) {
      setEditingItem(itemToEdit);
      setItemName(itemToEdit.item_name);
      setPriceJpy(itemToEdit.price_jpy);
      setCategory(itemToEdit.category);
      setImageUrl(itemToEdit.image_url || '');
      setNotes(itemToEdit.notes || '');
    } else {
      setEditingItem(null);
      setItemName('');
      setPriceJpy(3000);
      setCategory('figuras');
      setImageUrl('');
      setNotes('');
    }
    setShowModal(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim()) return;

    const numPrice = Number(priceJpy) || 0;

    if (editingItem) {
      updateWishlistItem(editingItem.id, {
        item_name: itemName.trim(),
        price_jpy: numPrice,
        category,
        image_url: imageUrl.trim(),
        notes: notes.trim()
      });
    } else {
      addWishlistItem({
        item_name: itemName.trim(),
        price_jpy: numPrice,
        category,
        image_url: imageUrl.trim(),
        notes: notes.trim(),
        purchased: false
      });
    }
    setShowModal(false);
  };

  const formatJpyEur = (jpy: number) => {
    const eur = jpy / waState.eurJpyRate;
    return `¥${jpy.toLocaleString()} (≈ €${eur.toFixed(2)})`;
  };

  const getCategoryBadge = (catId: WishlistCategory) => {
    return categoriesList.find(c => c.id === catId) || {
      id: catId,
      label: catId,
      bg: 'bg-slate-100 text-slate-800 border-slate-200'
    };
  };

  return (
    <div className="pb-24 pt-2 max-w-md mx-auto px-4 space-y-4">
      {/* Top Header & Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-black text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
            <ShoppingBag className="w-4 h-4 text-rose-500" />
            Wishlist de Compras ({filteredItems.length})
          </h2>
          <p className="text-[10px] text-slate-400 font-bold">Artículos y regalos que queremos comprar</p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="bg-rose-500 hover:bg-rose-600 text-white font-black text-xs px-3 py-1.5 rounded-xl border-b-2 border-rose-700 active:translate-y-0.5 transition-all flex items-center gap-1 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Añadir Ítem</span>
        </button>
      </div>

      {/* Budget Summary Banner */}
      <div className="bg-gradient-to-r from-rose-500 via-rose-600 to-red-600 text-white rounded-2xl p-3.5 shadow-md border border-rose-400/50">
        <div className="flex items-center justify-between border-b border-rose-400/50 pb-2 mb-2">
          <span className="text-[10px] font-black uppercase tracking-wider bg-white/20 px-2 py-0.5 rounded-full">
            Presupuesto Wishlist
          </span>
          <span className="text-[11px] font-extrabold text-rose-100">
            Tasa: 1€ = {waState.eurJpyRate} JPY
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-white/10 backdrop-blur-xs p-2 rounded-xl border border-white/10">
            <span className="text-[9px] uppercase font-bold text-rose-100 block">Total estimado</span>
            <strong className="text-base font-black block">¥{totalJpy.toLocaleString()}</strong>
            <span className="text-[10px] text-rose-200 font-semibold">≈ €{totalEur.toFixed(2)}</span>
          </div>

          <div className="bg-white/10 backdrop-blur-xs p-2 rounded-xl border border-white/10">
            <span className="text-[9px] uppercase font-bold text-rose-100 block">Ya Comprado ({purchasedCount})</span>
            <strong className="text-base font-black block text-emerald-200">¥{purchasedJpy.toLocaleString()}</strong>
            <span className="text-[10px] text-rose-200 font-semibold">≈ €{purchasedEur.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white rounded-2xl p-3 shadow-sm border border-rose-100 space-y-2">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre o tienda..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500 font-semibold"
          />
        </div>

        {/* Status Pills */}
        <div className="flex gap-1.5 border-t border-slate-100 pt-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1 text-xs font-black rounded-xl border flex-1 transition-all ${
              filterStatus === 'all'
                ? 'bg-rose-500 text-white border-rose-600 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-rose-50'
            }`}
          >
            Todos ({waState.wishlist.length})
          </button>
          <button
            onClick={() => setFilterStatus('seeking')}
            className={`px-3 py-1 text-xs font-black rounded-xl border flex-1 transition-all ${
              filterStatus === 'seeking'
                ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-amber-50'
            }`}
          >
            Buscando ({seekingCount})
          </button>
          <button
            onClick={() => setFilterStatus('purchased')}
            className={`px-3 py-1 text-xs font-black rounded-xl border flex-1 transition-all ${
              filterStatus === 'purchased'
                ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-emerald-50'
            }`}
          >
            Comprados ({purchasedCount})
          </button>
        </div>

        {/* Category Filter Horizontal Scroll */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-rose-200 pt-1">
          <button
            onClick={() => setFilterCategory('all')}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border flex-shrink-0 transition-all ${
              filterCategory === 'all'
                ? 'bg-slate-800 text-white border-slate-900'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
          >
            Todas las Categorías
          </button>
          {categoriesList.map(cat => (
            <button
              key={cat.id}
              onClick={() => setFilterCategory(cat.id)}
              className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border flex-shrink-0 transition-all ${
                filterCategory === cat.id
                  ? 'bg-slate-800 text-white border-slate-900'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Item Grid / Cards List */}
      {filteredItems.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-rose-200 rounded-2xl p-6 text-center space-y-2">
          <span className="text-4xl block">🎁</span>
          <p className="text-xs font-bold text-slate-600">No hay artículos que coincidan.</p>
          <p className="text-[10px] text-slate-400">¡Añade nuevas figuras, ropa o souvenirs a tu Wishlist!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredItems.map(item => {
            const catInfo = getCategoryBadge(item.category);
            const eurValue = item.price_jpy / waState.eurJpyRate;

            return (
              <div
                key={item.id}
                className={`bg-white border-2 rounded-2xl p-3.5 shadow-sm transition-all overflow-hidden ${
                  item.purchased
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : 'border-rose-100 hover:border-rose-300'
                }`}
              >
                <div className="flex gap-3">
                  {/* Image Preview Thumbnail */}
                  {item.image_url ? (
                    <div className="w-16 h-16 rounded-xl border border-slate-200 overflow-hidden bg-slate-100 flex-shrink-0">
                      <img
                        src={item.image_url}
                        alt={item.item_name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback if image load fails
                          (e.target as HTMLElement).style.display = 'none';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="w-16 h-16 rounded-xl border border-rose-100 bg-rose-50 flex flex-col items-center justify-center text-rose-400 flex-shrink-0">
                      <ShoppingBag className="w-6 h-6" />
                    </div>
                  )}

                  {/* Main Info */}
                  <div className="flex-grow min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h3 className={`text-sm font-black text-slate-800 leading-tight ${
                        item.purchased ? 'line-through text-slate-500' : ''
                      }`}>
                        {item.item_name}
                      </h3>

                      <div className="flex items-center gap-1 flex-shrink-0">
                        <button
                          onClick={() => handleOpenModal(item)}
                          className="text-slate-400 hover:text-slate-600 p-1"
                          title="Editar"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('¿Eliminar este ítem de la wishlist?')) {
                              deleteWishlistItem(item.id);
                            }
                          }}
                          className="text-slate-400 hover:text-rose-600 p-1"
                          title="Eliminar"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 mt-1 flex-wrap">
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded border ${catInfo.bg}`}>
                        {catInfo.label}
                      </span>
                      <strong className="text-xs font-black text-rose-600">
                        ¥{item.price_jpy.toLocaleString()}
                      </strong>
                      <span className="text-[10px] text-slate-500 font-bold">
                        (≈ €{eurValue.toFixed(2)})
                      </span>
                    </div>

                    {item.notes && (
                      <p className="text-[11px] text-slate-600 mt-1.5 bg-slate-50 p-1.5 rounded-lg border border-slate-100">
                        📝 {item.notes}
                      </p>
                    )}
                  </div>
                </div>

                {/* Status Toggle Bar */}
                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] font-extrabold text-slate-400 uppercase">Estado:</span>

                  <button
                    onClick={() => toggleWishlistPurchased(item.id)}
                    className={`text-xs font-black px-3 py-1.5 rounded-xl border transition-all flex items-center gap-1.5 ${
                      item.purchased
                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-xs'
                        : 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100'
                    }`}
                  >
                    {item.purchased ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>¡COMPRADO!</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5 text-amber-500" />
                        <span>Buscando</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Wishlist Item Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-rose-300 rounded-3xl p-5 shadow-2xl max-w-sm w-full relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-sm font-bold bg-slate-100 p-1 rounded-full h-7 w-7 flex items-center justify-center"
            >
              ✕
            </button>

            <h3 className="text-base font-black text-slate-800 flex items-center gap-1.5 mb-3">
              <Sparkles className="w-4 h-4 text-rose-500" />
              {editingItem ? 'Editar Ítem de Wishlist' : 'Añadir Ítem a Wishlist'}
            </h3>

            <form onSubmit={handleSaveItem} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombre del Artículo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Nintendo Switch OLED Edición Zelda"
                  value={itemName}
                  onChange={e => setItemName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Precio Estimado (JPY) *</label>
                  <input
                    type="number"
                    required
                    min={0}
                    placeholder="35000"
                    value={priceJpy}
                    onChange={e => setPriceJpy(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                  />
                  {typeof priceJpy === 'number' && priceJpy > 0 && (
                    <span className="text-[10px] text-slate-400 font-bold block mt-0.5">
                      ≈ €{(priceJpy / waState.eurJpyRate).toFixed(2)} EUR
                    </span>
                  )}
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Categoría</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as WishlistCategory)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-rose-500 bg-white"
                  >
                    {categoriesList.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">URL de Imagen (Opcional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={imageUrl}
                  onChange={e => setImageUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Notas / Tienda donde buscar</label>
                <textarea
                  rows={2}
                  placeholder="Buscar en Akihabara o Don Quijote..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-extrabold hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-black border-b-2 border-rose-700 shadow-sm"
                >
                  {editingItem ? 'Guardar Cambios' : 'Añadir a Wishlist'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
