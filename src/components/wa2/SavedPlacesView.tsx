import React, { useState } from 'react';
import { useWa2 } from '../../state/Wa2Context';
import { SavedPlace, PlaceCategory } from '../../state/wa2Types';
import {
  MapPin,
  Utensils,
  ShoppingBag,
  Gamepad2,
  Tv,
  Coffee,
  CheckSquare,
  Square,
  ExternalLink,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Sparkles,
  Compass
} from 'lucide-react';

export const SavedPlacesView: React.FC = () => {
  const { waState, togglePlaceVisited, addSavedPlace, updateSavedPlace, deleteSavedPlace } = useWa2();

  const [selectedCityId, setSelectedCityId] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const [showModal, setShowModal] = useState<boolean>(false);
  const [editingPlace, setEditingPlace] = useState<SavedPlace | null>(null);

  // Form states
  const [name, setName] = useState('');
  const [cityId, setCityId] = useState(waState.cities[0]?.id || 'city-tokyo');
  const [category, setCategory] = useState<PlaceCategory>('ramen');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');
  const [notes, setNotes] = useState('');

  // Categories definition
  const categoriesList: { id: PlaceCategory; label: string; icon: any; color: string }[] = [
    { id: 'ramen', label: 'Ramen', icon: Utensils, color: 'bg-amber-100 text-amber-800 border-amber-200' },
    { id: 'sushi', label: 'Sushi', icon: Utensils, color: 'bg-rose-100 text-rose-800 border-rose-200' },
    { id: 'izakaya', label: 'Izakaya / Bar', icon: Utensils, color: 'bg-orange-100 text-orange-800 border-orange-200' },
    { id: 'konbini', label: 'Konbini', icon: ShoppingBag, color: 'bg-blue-100 text-blue-800 border-blue-200' },
    { id: 'anime', label: 'Anime / Manga', icon: Tv, color: 'bg-purple-100 text-purple-800 border-purple-200' },
    { id: 'retro_gaming', label: 'Retro Gaming', icon: Gamepad2, color: 'bg-indigo-100 text-indigo-800 border-indigo-200' },
    { id: 'gachapon', label: 'Gachapon', icon: Gamepad2, color: 'bg-pink-100 text-pink-800 border-pink-200' },
    { id: 'cafe', label: 'Café / Postres', icon: Coffee, color: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
    { id: 'shopping', label: 'Compras', icon: ShoppingBag, color: 'bg-teal-100 text-teal-800 border-teal-200' },
    { id: 'sightseeing', label: 'Turismo', icon: Compass, color: 'bg-sky-100 text-sky-800 border-sky-200' },
  ];

  // Filtering places
  const filteredPlaces = waState.savedPlaces.filter(place => {
    const matchesCity = selectedCityId === 'all' || place.city_id === selectedCityId;
    const matchesCategory = selectedCategory === 'all' || place.category === selectedCategory;
    const matchesSearch = place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (place.notes && place.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCity && matchesCategory && matchesSearch;
  });

  const handleOpenModal = (placeToEdit?: SavedPlace) => {
    if (placeToEdit) {
      setEditingPlace(placeToEdit);
      setName(placeToEdit.name);
      setCityId(placeToEdit.city_id);
      setCategory(placeToEdit.category);
      setGoogleMapsUrl(placeToEdit.google_maps_url);
      setNotes(placeToEdit.notes || '');
    } else {
      setEditingPlace(null);
      setName('');
      setCityId(waState.cities[0]?.id || 'city-tokyo');
      setCategory('ramen');
      setGoogleMapsUrl('');
      setNotes('');
    }
    setShowModal(true);
  };

  const handleSavePlace = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const mapsUrl = googleMapsUrl.trim() || `https://maps.google.com/?q=${encodeURIComponent(name.trim())}`;

    if (editingPlace) {
      updateSavedPlace(editingPlace.id, {
        name: name.trim(),
        city_id: cityId,
        category,
        google_maps_url: mapsUrl,
        notes: notes.trim()
      });
    } else {
      addSavedPlace({
        city_id: cityId,
        name: name.trim(),
        category,
        google_maps_url: mapsUrl,
        notes: notes.trim(),
        visited: false
      });
    }
    setShowModal(false);
  };

  const getCategoryInfo = (catId: PlaceCategory) => {
    return categoriesList.find(c => c.id === catId) || {
      id: catId,
      label: catId,
      icon: MapPin,
      color: 'bg-slate-100 text-slate-800 border-slate-200'
    };
  };

  return (
    <div className="pb-24 pt-2 max-w-md mx-auto px-4 space-y-4">
      {/* Top Header & Add Button */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-black text-slate-800 flex items-center gap-1.5 uppercase tracking-wide">
            <MapPin className="w-4 h-4 text-rose-500" />
            Sitios Guardados ({filteredPlaces.length})
          </h2>
          <p className="text-[10px] text-slate-400 font-bold">Restaurantes, tiendas y frikadas por ciudad</p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="bg-rose-500 hover:bg-rose-600 text-white font-black text-xs px-3 py-1.5 rounded-xl border-b-2 border-rose-700 active:translate-y-0.5 transition-all flex items-center gap-1 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Añadir Sitio</span>
        </button>
      </div>

      {/* Dual Filter Controls Bar */}
      <div className="bg-white rounded-2xl p-3 shadow-sm border border-rose-100 space-y-2.5">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Buscar por nombre o nota..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-rose-500 font-semibold"
          />
        </div>

        {/* City Filter Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-rose-200">
          <button
            onClick={() => setSelectedCityId('all')}
            className={`px-3 py-1 text-xs font-black rounded-xl border flex-shrink-0 transition-all ${
              selectedCityId === 'all'
                ? 'bg-rose-500 text-white border-rose-600 shadow-xs'
                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-rose-50'
            }`}
          >
            Todas las Ciudades
          </button>
          {waState.cities.map(city => (
            <button
              key={city.id}
              onClick={() => setSelectedCityId(city.id)}
              className={`px-3 py-1 text-xs font-black rounded-xl border flex-shrink-0 transition-all ${
                selectedCityId === city.id
                  ? 'bg-rose-500 text-white border-rose-600 shadow-xs'
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-rose-50'
              }`}
            >
              {city.name}
            </button>
          ))}
        </div>

        {/* Category Filter Horizontal Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-rose-200 border-t border-slate-100 pt-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border flex-shrink-0 transition-all ${
              selectedCategory === 'all'
                ? 'bg-slate-800 text-white border-slate-900'
                : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
            }`}
          >
            Todas Categorías
          </button>
          {categoriesList.map(cat => {
            const isSel = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-2.5 py-1 text-[11px] font-bold rounded-lg border flex-shrink-0 transition-all ${
                  isSel
                    ? 'bg-slate-800 text-white border-slate-900'
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Places Grid / Cards List */}
      {filteredPlaces.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-rose-200 rounded-2xl p-6 text-center space-y-2">
          <span className="text-4xl block">🍜</span>
          <p className="text-xs font-bold text-slate-600">No se encontraron sitios con estos filtros.</p>
          <p className="text-[10px] text-slate-400">Prueba cambiando los filtros o añade un nuevo sitio.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPlaces.map(place => {
            const city = waState.cities.find(c => c.id === place.city_id);
            const categoryInfo = getCategoryInfo(place.category);
            const CategoryIcon = categoryInfo.icon;

            return (
              <div
                key={place.id}
                className={`bg-white border-2 rounded-2xl p-3.5 shadow-sm transition-all relative ${
                  place.visited
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : 'border-rose-100 hover:border-rose-300'
                }`}
              >
                {/* Header row inside place card */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-2.5">
                    {/* Visited Checkbox */}
                    <button
                      onClick={() => togglePlaceVisited(place.id)}
                      className="mt-0.5 text-slate-400 hover:text-emerald-600 transition-colors flex-shrink-0"
                      title={place.visited ? "Marcar como no visitado" : "Marcar como visitado"}
                    >
                      {place.visited ? (
                        <CheckSquare className="w-5 h-5 text-emerald-600 fill-emerald-100" />
                      ) : (
                        <Square className="w-5 h-5 text-slate-300 hover:text-slate-500" />
                      )}
                    </button>

                    <div>
                      <h3 className={`text-sm font-black text-slate-800 ${
                        place.visited ? 'line-through text-slate-500' : ''
                      }`}>
                        {place.name}
                      </h3>

                      <div className="flex items-center gap-1.5 mt-1">
                        <span className="text-[9px] font-black uppercase text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                          {city?.name || 'Japón'}
                        </span>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-md border flex items-center gap-1 ${categoryInfo.color}`}>
                          <CategoryIcon className="w-2.5 h-2.5" />
                          {categoryInfo.label}
                        </span>
                        {place.visited && (
                          <span className="text-[9px] font-black bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded border border-emerald-200">
                            ✓ Visitado
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quick Edit/Delete Actions */}
                  <div className="flex items-center gap-1 flex-shrink-0">
                    <button
                      onClick={() => handleOpenModal(place)}
                      className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
                      title="Editar Sitio"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (confirm('¿Eliminar este sitio guardado?')) {
                          deleteSavedPlace(place.id);
                        }
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1 rounded-md"
                      title="Eliminar Sitio"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Notes */}
                {place.notes && (
                  <p className="text-xs text-slate-600 mt-2 bg-slate-50 p-2 rounded-xl border border-slate-100 leading-relaxed">
                    💡 {place.notes}
                  </p>
                )}

                {/* Bottom Action Bar */}
                <div className="mt-3 pt-2 border-t border-slate-100 flex justify-end">
                  <a
                    href={place.google_maps_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-[11px] px-3 py-1.5 rounded-xl border-b-2 border-emerald-700 transition-all flex items-center gap-1 shadow-xs"
                  >
                    <MapPin className="w-3.5 h-3.5" />
                    <span>Abrir en Google Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Place Modal */}
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
              {editingPlace ? 'Editar Sitio Guardado' : 'Añadir Nuevo Sitio'}
            </h3>

            <form onSubmit={handleSavePlace} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombre del Lugar / Local *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Mandarake Complex Akihabara"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Ciudad</label>
                  <select
                    value={cityId}
                    onChange={e => setCityId(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-rose-500 bg-white"
                  >
                    {waState.cities.map(c => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Categoría</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as PlaceCategory)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-rose-500 bg-white"
                  >
                    {categoriesList.map(cat => (
                      <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Enlace Google Maps</label>
                <input
                  type="url"
                  placeholder="https://maps.google.com/..."
                  value={googleMapsUrl}
                  onChange={e => setGoogleMapsUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Notas / Recomendación</label>
                <textarea
                  rows={2}
                  placeholder="Platos recomendados, planta donde está, horario..."
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
                  {editingPlace ? 'Guardar Cambios' : 'Guardar Sitio'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
