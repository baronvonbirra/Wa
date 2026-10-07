import React, { useState } from 'react';
import { useWa2 } from '../../state/Wa2Context';
import {
  ItineraryItem,
  ItineraryCategory,
  Accommodation
} from '../../state/wa2Types';
import {
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  XCircle,
  ExternalLink,
  Plus,
  Hotel,
  Edit2,
  Trash2,
  Utensils,
  Train,
  Compass,
  FileText,
  Sparkles
} from 'lucide-react';

export const ItineraryView: React.FC = () => {
  const {
    waState,
    setSelectedDate,
    updateItineraryStatus,
    addItineraryItem,
    updateItineraryItem,
    deleteItineraryItem,
    updateAccommodation,
    addAccommodation
  } = useWa2();

  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [editingItem, setEditingItem] = useState<ItineraryItem | null>(null);
  const [showAccModal, setShowAccModal] = useState<boolean>(false);

  // Form State for Itinerary Item
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ItineraryCategory>('attraction');
  const [timeStart, setTimeStart] = useState('09:00');
  const [description, setDescription] = useState('');
  const [googleMapsUrl, setGoogleMapsUrl] = useState('');

  // Form State for Accommodation
  const [accName, setAccName] = useState('');
  const [accAddress, setAccAddress] = useState('');
  const [accCheckIn, setAccCheckIn] = useState('15:00');
  const [accCheckOut, setAccCheckOut] = useState('11:00');
  const [accCode, setAccCode] = useState('');
  const [accNotes, setAccNotes] = useState('');

  // Generate list of dates from tripStartDate to tripEndDate
  const generateTripDates = () => {
    const dates: { dateStr: string; dayLabel: string; dayNum: number }[] = [];
    const start = new Date(`${waState.tripStartDate}T00:00:00`);
    const end = new Date(`${waState.tripEndDate}T00:00:00`);

    let current = new Date(start);
    let dayCount = 1;

    while (current <= end) {
      // YYYY-MM-DD string
      const dateStr = current.toISOString().split('T')[0];
      const dayLabel = current.toLocaleDateString('es-ES', { weekday: 'short', month: 'short', day: 'numeric' });
      dates.push({ dateStr, dayLabel, dayNum: dayCount });
      current.setDate(current.getDate() + 1);
      dayCount++;
    }
    return dates;
  };

  const tripDates = generateTripDates();

  // Active city & accommodation
  const activeCity = waState.cities.find(c => {
    return waState.selectedDate >= c.start_date && waState.selectedDate <= c.end_date;
  }) || waState.cities[0];

  const activeAccommodation = waState.accommodations.find(a => a.city_id === activeCity?.id);

  // Itinerary items for current selected date sorted by time or order
  const currentItems = waState.itineraryItems
    .filter(item => item.date === waState.selectedDate)
    .sort((a, b) => {
      if (a.orden !== undefined && b.orden !== undefined) {
        return a.orden - b.orden;
      }
      return (a.time_start || '00:00').localeCompare(b.time_start || '00:00');
    });

  const handleOpenAddModal = (itemToEdit?: ItineraryItem) => {
    if (itemToEdit) {
      const placeName = itemToEdit.lugares?.nombre || itemToEdit.lugares?.name || itemToEdit.title;
      const placeDesc = itemToEdit.notas_dia || itemToEdit.lugares?.descripcion || itemToEdit.description || '';
      const placeMaps = itemToEdit.lugares?.google_maps_url || itemToEdit.google_maps_url || '';

      setEditingItem(itemToEdit);
      setTitle(placeName);
      setCategory(itemToEdit.category);
      setTimeStart(itemToEdit.time_start || '09:00');
      setDescription(placeDesc);
      setGoogleMapsUrl(placeMaps);
    } else {
      setEditingItem(null);
      setTitle('');
      setCategory('attraction');
      setTimeStart('10:00');
      setDescription('');
      setGoogleMapsUrl('');
    }
    setShowAddModal(true);
  };

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingItem) {
      updateItineraryItem(editingItem.id, {
        title: title.trim(),
        category,
        time_start: timeStart,
        description: description.trim(),
        google_maps_url: googleMapsUrl.trim(),
        lugares: {
          ...editingItem.lugares,
          nombre: title.trim(),
          google_maps_url: googleMapsUrl.trim()
        }
      });
    } else {
      addItineraryItem({
        date: waState.selectedDate,
        time_start: timeStart,
        title: title.trim(),
        description: description.trim(),
        google_maps_url: googleMapsUrl.trim() || `https://maps.google.com/?q=${encodeURIComponent(title.trim())}`,
        category,
        status: 'pending',
        order_index: currentItems.length + 1,
        lugares: {
          nombre: title.trim(),
          google_maps_url: googleMapsUrl.trim()
        }
      });
    }
    setShowAddModal(false);
  };

  const handleOpenAccModal = () => {
    if (activeAccommodation) {
      setAccName(activeAccommodation.name);
      setAccAddress(activeAccommodation.address);
      setAccCheckIn(activeAccommodation.check_in_time);
      setAccCheckOut(activeAccommodation.check_out_time);
      setAccCode(activeAccommodation.booking_code);
      setAccNotes(activeAccommodation.notes);
    } else {
      setAccName('');
      setAccAddress('');
      setAccCheckIn('15:00');
      setAccCheckOut('11:00');
      setAccCode('');
      setAccNotes('');
    }
    setShowAccModal(true);
  };

  const handleSaveAcc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!accName.trim() || !activeCity) return;

    if (activeAccommodation) {
      updateAccommodation(activeAccommodation.id, {
        name: accName.trim(),
        address: accAddress.trim(),
        check_in_time: accCheckIn,
        check_out_time: accCheckOut,
        booking_code: accCode.trim(),
        notes: accNotes.trim()
      });
    } else {
      addAccommodation({
        city_id: activeCity.id,
        name: accName.trim(),
        address: accAddress.trim(),
        check_in_time: accCheckIn,
        check_out_time: accCheckOut,
        booking_code: accCode.trim(),
        notes: accNotes.trim()
      });
    }
    setShowAccModal(false);
  };

  const getCategoryBadge = (cat: ItineraryCategory) => {
    switch (cat) {
      case 'food':
        return { label: 'Comida', bg: 'bg-amber-100 text-amber-800 border-amber-200', icon: Utensils };
      case 'transport':
        return { label: 'Transporte', bg: 'bg-blue-100 text-blue-800 border-blue-200', icon: Train };
      case 'note':
        return { label: 'Nota / Hotel', bg: 'bg-purple-100 text-purple-800 border-purple-200', icon: FileText };
      case 'attraction':
      default:
        return { label: 'Atracción', bg: 'bg-rose-100 text-rose-800 border-rose-200', icon: Compass };
    }
  };

  return (
    <div className="pb-24 pt-2 max-w-md mx-auto px-4 space-y-4">
      {/* Horizontal Day & Date Filter Bar */}
      <div className="bg-white rounded-2xl p-2.5 shadow-sm border border-rose-100">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-black text-slate-800 flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-rose-500" />
            Días del Viaje
          </span>
          <span className="text-[10px] text-slate-400 font-extrabold uppercase">
            {activeCity?.name}
          </span>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-rose-200">
          {tripDates.map(item => {
            const isSelected = item.dateStr === waState.selectedDate;
            return (
              <button
                key={item.dateStr}
                onClick={() => setSelectedDate(item.dateStr)}
                className={`flex-shrink-0 flex flex-col items-center justify-center px-3 py-2 rounded-xl transition-all duration-150 border ${
                  isSelected
                    ? 'bg-rose-500 text-white border-rose-600 shadow-md scale-105'
                    : 'bg-slate-50 hover:bg-rose-50 text-slate-600 border-slate-200 hover:border-rose-200'
                }`}
              >
                <span className={`text-[9px] font-black uppercase ${isSelected ? 'text-rose-100' : 'text-slate-400'}`}>
                  Día {item.dayNum}
                </span>
                <strong className="text-xs font-black mt-0.5 whitespace-nowrap">
                  {item.dayLabel}
                </strong>
              </button>
            );
          })}
        </div>
      </div>

      {/* Accommodation Card Pinned for Selected Day */}
      <div className="bg-gradient-to-br from-amber-500/10 via-amber-50 to-white border-2 border-amber-300 rounded-2xl p-3.5 shadow-sm relative">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-amber-500 text-white p-2 rounded-xl shadow-sm">
              <Hotel className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full inline-block">
                Alojamiento en {activeCity?.name || 'Japón'}
              </span>
              <h3 className="text-sm font-black text-slate-800 mt-0.5">
                {activeAccommodation?.name || 'Alojamiento no registrado'}
              </h3>
            </div>
          </div>

          <button
            onClick={handleOpenAccModal}
            className="text-amber-700 hover:text-amber-900 bg-amber-100 hover:bg-amber-200 p-1.5 rounded-lg transition-colors"
            title="Editar Hotel"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {activeAccommodation && (
          <div className="mt-2.5 pt-2 border-t border-amber-200/60 text-xs text-slate-700 space-y-1">
            <p className="flex items-center gap-1.5 text-[11px] text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span className="truncate">{activeAccommodation.address}</span>
            </p>
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 pt-1">
              <span>Check-in: <strong>{activeAccommodation.check_in_time}</strong></span>
              <span>Check-out: <strong>{activeAccommodation.check_out_time}</strong></span>
              {activeAccommodation.booking_code && (
                <span className="bg-amber-200/80 text-amber-900 px-1.5 py-0.5 rounded font-mono text-[10px]">
                  Reserva: {activeAccommodation.booking_code}
                </span>
              )}
            </div>
            {activeAccommodation.notes && (
              <p className="text-[10px] text-amber-800 italic mt-1 bg-amber-100/50 p-1.5 rounded-lg border border-amber-200/50">
                💡 {activeAccommodation.notes}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Itinerary Timeline Header & Add Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-rose-500" />
          <h2 className="text-sm font-black text-slate-800 uppercase tracking-wide">
            Planes del Día ({currentItems.length})
          </h2>
        </div>

        <button
          onClick={() => handleOpenAddModal()}
          className="bg-rose-500 hover:bg-rose-600 text-white font-black text-xs px-3 py-1.5 rounded-xl border-b-2 border-rose-700 active:translate-y-0.5 transition-all flex items-center gap-1 shadow-sm"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Añadir Plan</span>
        </button>
      </div>

      {/* Timeline Items List */}
      {currentItems.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-rose-200 rounded-2xl p-6 text-center space-y-2">
          <span className="text-4xl block">🗾</span>
          <p className="text-xs font-bold text-slate-600">No hay planes registrados para esta fecha.</p>
          <p className="text-[10px] text-slate-400">Pulsa "Añadir Plan" para agendar visitas, transporte o restaurantes.</p>
        </div>
      ) : (
        <div className="space-y-3 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-rose-100">
          {currentItems.map(item => {
            const categoryInfo = getCategoryBadge(item.category);
            const CategoryIcon = categoryInfo.icon;
            const isDone = item.status === 'done';
            const isSkipped = item.status === 'skipped';

            // Extract nested lugar properties or fall back to top-level item properties
            const placeName = item.lugares?.nombre || item.lugares?.name || item.title;
            const placeDescription = item.notas_dia || item.lugares?.descripcion || item.description;
            const mapsUrl = item.lugares?.google_maps_url || item.google_maps_url;

            return (
              <div
                key={item.id}
                className={`relative pl-8 transition-all duration-200 ${
                  isDone ? 'opacity-60' : 'opacity-100'
                }`}
              >
                {/* Timeline node icon */}
                <div className={`absolute left-1.5 top-3.5 -translate-x-1/2 w-5 h-5 rounded-full border-2 flex items-center justify-center text-white ${
                  isDone
                    ? 'bg-emerald-500 border-emerald-600'
                    : isSkipped
                    ? 'bg-amber-500 border-amber-600'
                    : 'bg-rose-500 border-rose-600'
                }`}>
                  {isDone ? (
                    <CheckCircle2 className="w-3 h-3 stroke-[3]" />
                  ) : isSkipped ? (
                    <XCircle className="w-3 h-3 stroke-[3]" />
                  ) : (
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </div>

                {/* Card Container */}
                <div className={`bg-white border-2 rounded-2xl p-3.5 shadow-sm transition-all ${
                  isDone
                    ? 'border-slate-200 bg-slate-50/80'
                    : isSkipped
                    ? 'border-amber-200 bg-amber-50/40'
                    : 'border-rose-100 hover:border-rose-300'
                }`}>
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-extrabold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-100 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-rose-500" />
                        {item.orden ? `Orden #${item.orden}` : item.time_start || 'Todo el día'}
                      </span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border flex items-center gap-1 ${categoryInfo.bg}`}>
                        <CategoryIcon className="w-3 h-3" />
                        {categoryInfo.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenAddModal(item)}
                        className="text-slate-400 hover:text-slate-600 p-1 rounded-md"
                        title="Editar"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm('¿Eliminar este plan del itinerario?')) {
                            deleteItineraryItem(item.id);
                          }
                        }}
                        className="text-slate-400 hover:text-rose-600 p-1 rounded-md"
                        title="Eliminar"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="mt-2">
                    <h3 className={`text-sm font-black text-slate-800 ${isDone ? 'line-through text-slate-400' : ''}`}>
                      {placeName}
                    </h3>
                    {placeDescription && (
                      <p className={`text-xs mt-1 leading-relaxed ${isDone ? 'text-slate-400' : 'text-slate-600'}`}>
                        {placeDescription}
                      </p>
                    )}
                  </div>

                  {/* Actions Bar: Status Toggle & Google Maps Link */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                    {/* Status Buttons */}
                    <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                      <button
                        onClick={() => updateItineraryStatus(item.id, 'pending')}
                        className={`text-[10px] font-black px-2 py-1 rounded-lg transition-all ${
                          item.status === 'pending'
                            ? 'bg-white text-slate-800 shadow-xs'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        Pendiente
                      </button>
                      <button
                        onClick={() => updateItineraryStatus(item.id, 'done')}
                        className={`text-[10px] font-black px-2 py-1 rounded-lg transition-all ${
                          item.status === 'done'
                            ? 'bg-emerald-500 text-white shadow-xs'
                            : 'text-slate-500 hover:text-emerald-600'
                        }`}
                      >
                        ✓ Hecho
                      </button>
                      <button
                        onClick={() => updateItineraryStatus(item.id, 'skipped')}
                        className={`text-[10px] font-black px-2 py-1 rounded-lg transition-all ${
                          item.status === 'skipped'
                            ? 'bg-amber-500 text-white shadow-xs'
                            : 'text-slate-500 hover:text-amber-600'
                        }`}
                      >
                        Saltar
                      </button>
                    </div>

                    {/* Google Maps Button */}
                    {mapsUrl && (
                      <a
                        href={mapsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-[11px] px-3 py-1.5 rounded-xl border-b-2 border-emerald-700 transition-all flex items-center gap-1 shadow-xs ml-auto"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Cómo llegar</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Itinerary Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-rose-300 rounded-3xl p-5 shadow-2xl max-w-sm w-full relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-sm font-bold bg-slate-100 p-1 rounded-full h-7 w-7 flex items-center justify-center"
            >
              ✕
            </button>

            <h3 className="text-base font-black text-slate-800 flex items-center gap-1.5 mb-3">
              <Sparkles className="w-4 h-4 text-rose-500" />
              {editingItem ? 'Editar Plan del Itinerario' : 'Añadir Nuevo Plan'}
            </h3>

            <form onSubmit={handleSaveItem} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Título / Lugar *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Visita al Templo Senso-ji"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Categoría</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value as ItineraryCategory)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-rose-500 bg-white"
                  >
                    <option value="attraction">Atracción / Sitio</option>
                    <option value="food">Comida / Restaurante</option>
                    <option value="transport">Transporte / Tren</option>
                    <option value="note">Nota / Hotel</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Hora Inicio</label>
                  <input
                    type="time"
                    value={timeStart}
                    onChange={e => setTimeStart(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Descripción / Notas</label>
                <textarea
                  rows={2}
                  placeholder="Detalles, entradas, cosas que ver..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                />
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

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-extrabold hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-black border-b-2 border-rose-700 shadow-sm"
                >
                  {editingItem ? 'Guardar Cambios' : 'Crear Plan'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Accommodation Edit Modal */}
      {showAccModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border-4 border-amber-300 rounded-3xl p-5 shadow-2xl max-w-sm w-full relative">
            <button
              onClick={() => setShowAccModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-sm font-bold bg-slate-100 p-1 rounded-full h-7 w-7 flex items-center justify-center"
            >
              ✕
            </button>

            <h3 className="text-base font-black text-slate-800 flex items-center gap-1.5 mb-3">
              <Hotel className="w-4 h-4 text-amber-500" />
              Alojamiento en {activeCity?.name}
            </h3>

            <form onSubmit={handleSaveAcc} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Nombre del Hotel *</label>
                <input
                  type="text"
                  required
                  placeholder="Hotel Gracery Shinjuku"
                  value={accName}
                  onChange={e => setAccName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Dirección completa</label>
                <input
                  type="text"
                  placeholder="Shinjuku, Tokio..."
                  value={accAddress}
                  onChange={e => setAccAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Horario Check-in</label>
                  <input
                    type="text"
                    placeholder="15:00"
                    value={accCheckIn}
                    onChange={e => setAccCheckIn(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Horario Check-out</label>
                  <input
                    type="text"
                    placeholder="11:00"
                    value={accCheckOut}
                    onChange={e => setAccCheckOut(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Código de Reserva</label>
                <input
                  type="text"
                  placeholder="BK-12345"
                  value={accCode}
                  onChange={e => setAccCode(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Notas / Instrucciones</label>
                <textarea
                  rows={2}
                  placeholder="Cerca de la salida este..."
                  value={accNotes}
                  onChange={e => setAccNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAccModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-extrabold hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black border-b-2 border-amber-700 shadow-sm"
                >
                  Guardar Hotel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
