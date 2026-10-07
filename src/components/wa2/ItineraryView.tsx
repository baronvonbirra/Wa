import React, { useState, useEffect } from 'react';
import { useWa2 } from '../../state/Wa2Context';
import { supabase, normalizeCityName } from '../../services/supabase';
import {
  ItineraryItem,
  ItineraryCategory,
  Accommodation,
  StaySegment
} from '../../state/wa2Types';
import { Wa2Tab } from './BottomNav';
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
  ShoppingBag,
  ChevronDown,
  ChevronUp,
  CheckSquare,
  Square
} from 'lucide-react';

interface ItineraryViewProps {
  onNavigateTab?: (tab: Wa2Tab, subTab?: string) => void;
}

export const ItineraryView: React.FC<ItineraryViewProps> = ({ onNavigateTab }) => {
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
  const [category, setCategory] = useState<ItineraryCategory | string>('attraction');
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

  // Dynamic fetched hotel and day places
  const [currentHotel, setCurrentHotel] = useState<Accommodation | null>(null);
  const [dayPlaces, setDayPlaces] = useState<ItineraryItem[]>([]);
  const [cityOptions, setCityOptions] = useState<any[]>([]);

  // Accordion state for recommendations
  const [activeRecTab, setActiveTabRec] = useState<'food' | 'shopping'>('food');
  const [showRecs, setShowRecs] = useState<boolean>(true);

  // Generate list of dates from tripStartDate to tripEndDate
  const generateTripDates = () => {
    const dates: { dateStr: string; dayLabel: string; dayNum: number }[] = [];
    const start = new Date(`${waState.tripStartDate}T00:00:00`);
    const end = new Date(`${waState.tripEndDate}T00:00:00`);

    let current = new Date(start);
    let dayCount = 1;

    while (current <= end) {
      const dateStr = current.toISOString().split('T')[0];
      const dayLabel = current.toLocaleDateString('es-ES', { weekday: 'short', month: 'short', day: 'numeric' });
      dates.push({ dateStr, dayLabel, dayNum: dayCount });
      current.setDate(current.getDate() + 1);
      dayCount++;
    }
    return dates;
  };

  const tripDates = generateTripDates();

  const activeCity = waState.cities.find(c => {
    return waState.selectedDate >= c.start_date && waState.selectedDate <= c.end_date;
  }) || waState.cities[0];

  // A. Fetch Dynamic Hotel for selected date
  useEffect(() => {
    let isMounted = true;
    const fetchHotel = async () => {
      const { data } = await supabase
        .from('hotels')
        .select('*')
        .lte('check_in', waState.selectedDate)
        .gte('check_out', waState.selectedDate)
        .maybeSingle();

      if (isMounted) {
        if (data) {
          setCurrentHotel(data);
        } else {
          // Fallback to local state accommodation
          const fallbackAcc = waState.accommodations.find(a => {
            const start = a.check_in || a.start_date || '';
            const end = a.check_out || a.end_date || '';
            return waState.selectedDate >= start && waState.selectedDate <= end;
          }) || waState.accommodations[0];
          setCurrentHotel(fallbackAcc || null);
        }
      }
    };

    fetchHotel();
    return () => {
      isMounted = false;
    };
  }, [waState.selectedDate, waState.accommodations]);

  // B. Fetch Dynamic Ordered Itinerary Places
  useEffect(() => {
    let isMounted = true;
    const fetchDayPlaces = async () => {
      const { data } = await supabase
        .from('itinerary_places')
        .select('*')
        .eq('visit_date', waState.selectedDate)
        .order('order_index', { ascending: true });

      if (isMounted) {
        if (data && data.length > 0) {
          setDayPlaces(data);
        } else {
          // Fallback to local state itinerary items for selectedDate
          const fallbackItems = waState.itineraryItems
            .filter(item => item.visit_date === waState.selectedDate || item.date === waState.selectedDate)
            .sort((a, b) => (a.order_index ?? a.orden ?? 0) - (b.order_index ?? b.orden ?? 0));
          setDayPlaces(fallbackItems);
        }
      }
    };

    fetchDayPlaces();
    return () => {
      isMounted = false;
    };
  }, [waState.selectedDate, waState.itineraryItems]);

  // D. Fetch City Recommendations without fixed visit date
  useEffect(() => {
    let isMounted = true;
    const fetchCityOptions = async () => {
      const targetCity = normalizeCityName(currentHotel?.city || activeCity?.name || 'Tokyo');
      const { data } = await supabase
        .from('itinerary_places')
        .select('*')
        .eq('city', targetCity)
        .is('visit_date', null);

      if (isMounted) {
        if (data) {
          setCityOptions(data);
        } else {
          // Local fallback
          const localOpts = waState.savedPlaces.filter(p => {
            const pCity = normalizeCityName(p.city || (p.city_id ? p.city_id.replace('city-', '') : ''));
            return pCity === targetCity && !p.visit_date;
          });
          setCityOptions(localOpts);
        }
      }
    };

    fetchCityOptions();
    return () => {
      isMounted = false;
    };
  }, [waState.selectedDate, currentHotel, activeCity, waState.savedPlaces]);

  // Toggle visited status for itinerary place
  const toggleVisited = async (id: string, currentStatus?: boolean) => {
    const newStatus = !currentStatus;

    // Update state locally immediately
    setDayPlaces(prev =>
      prev.map(p => (p.id === id ? { ...p, is_visited: newStatus, status: newStatus ? 'done' : 'pending' } : p))
    );

    // Persist via Supabase helper
    await supabase
      .from('itinerary_places')
      .update({ is_visited: newStatus })
      .eq('id', id);

    // Update waState in context
    updateItineraryStatus(id, newStatus ? 'done' : 'pending');
  };

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
        visit_date: waState.selectedDate,
        time_start: timeStart,
        title: title.trim(),
        description: description.trim(),
        google_maps_url: googleMapsUrl.trim() || `https://maps.google.com/?q=${encodeURIComponent(title.trim())}`,
        category,
        status: 'pending',
        is_visited: false,
        order_index: dayPlaces.length + 1,
        city: normalizeCityName(currentHotel?.city || activeCity?.name),
        lugares: {
          nombre: title.trim(),
          google_maps_url: googleMapsUrl.trim()
        }
      });
    }
    setShowAddModal(false);
  };

  const handleOpenAccModal = () => {
    if (currentHotel) {
      setAccName(currentHotel.name);
      setAccAddress(currentHotel.address || currentHotel.direccion || '');
      setAccCheckIn(currentHotel.check_in_time);
      setAccCheckOut(currentHotel.check_out_time);
      setAccCode(currentHotel.booking_code);
      setAccNotes(currentHotel.notes);
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

    if (currentHotel) {
      updateAccommodation(currentHotel.id, {
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

  const getCategoryBadge = (cat: string) => {
    const c = (cat || '').toLowerCase();
    if (c === 'food' || c === 'restaurante' || c === 'ramen' || c === 'sushi' || c === 'izakaya' || c === 'cafe') {
      return { label: 'Comida', bg: 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200 border-amber-200', icon: Utensils };
    }
    if (c === 'transport' || c === 'transporte') {
      return { label: 'Transporte', bg: 'bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200 border-blue-200', icon: Train };
    }
    if (c === 'tienda' || c === 'shopping' || c === 'anime' || c === 'retro_gaming' || c === 'gachapon') {
      return { label: 'Tienda', bg: 'bg-indigo-100 dark:bg-indigo-950 text-indigo-800 dark:text-indigo-200 border-indigo-200', icon: ShoppingBag };
    }
    if (c === 'note' || c === 'nota') {
      return { label: 'Nota', bg: 'bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-200 border-purple-200', icon: FileText };
    }
    return { label: 'Sitio', bg: 'bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-200 border-rose-200', icon: Compass };
  };

  // Recommendations split by Food vs Shopping
  const foodRecommendations = cityOptions.filter(item => {
    const cat = (item.category || '').toLowerCase();
    return cat === 'restaurante' || cat === 'food' || cat === 'ramen' || cat === 'sushi' || cat === 'izakaya' || cat === 'cafe';
  });

  const shoppingRecommendations = cityOptions.filter(item => {
    const cat = (item.category || '').toLowerCase();
    return cat === 'tienda' || cat === 'shopping' || cat === 'anime' || cat === 'retro_gaming' || cat === 'gachapon' || cat === 'souvenirs';
  });

  const activeRecs = activeRecTab === 'food' ? foodRecommendations : shoppingRecommendations;

  return (
    <div className="pb-24 pt-2 max-w-md mx-auto px-4 space-y-4">
      {/* Horizontal Day & Date Filter Bar */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl p-2.5 shadow-xs border border-rose-100 dark:border-slate-700">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-black text-slate-800 dark:text-white flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-rose-500" />
            Filtrado por Fecha
          </span>
          <span className="text-[10px] text-slate-400 font-extrabold uppercase">
            {currentHotel?.segment || activeCity?.name}
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
                    : 'bg-slate-50 dark:bg-slate-900 hover:bg-rose-50 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-rose-200'
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

      {/* 3.C: Direct Shortcuts on Day 1 (Checklist Equipaje & Tareas Pendientes) */}
      {(waState.selectedDate === '2026-12-21' || waState.selectedDate === waState.tripStartDate) && (
        <div className="flex gap-2">
          <button
            onClick={() => onNavigateTab?.('tools', 'packing')}
            className="flex-1 py-2.5 px-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 border-b-2 border-amber-700"
          >
            📋 Checklist Equipaje
          </button>
          <button
            onClick={() => onNavigateTab?.('tools', 'packing')}
            className="flex-1 py-2.5 px-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-black text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-all active:scale-95 border-b-2 border-indigo-700"
          >
            ☑️ Tareas Pendientes
          </button>
        </div>
      )}

      {/* Accommodation Card Pinned for Selected Day */}
      <div className="bg-gradient-to-br from-amber-500/10 via-amber-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-800 border-2 border-amber-300 dark:border-amber-700 rounded-2xl p-3.5 shadow-xs relative">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="bg-amber-500 text-white p-2 rounded-xl shadow-xs">
              <Hotel className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[9px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 dark:bg-amber-950/80 dark:text-amber-300 px-2 py-0.5 rounded-full inline-block">
                {currentHotel?.segment || currentHotel?.city || activeCity?.name || 'Japón'}
              </span>
              <h3 className="text-sm font-black text-slate-800 dark:text-white mt-0.5">
                {currentHotel?.name || 'Alojamiento no registrado'}
              </h3>
            </div>
          </div>

          <button
            onClick={handleOpenAccModal}
            className="text-amber-700 dark:text-amber-300 hover:text-amber-900 bg-amber-100 dark:bg-amber-950/60 p-1.5 rounded-lg transition-colors"
            title="Editar Hotel"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {currentHotel && (
          <div className="mt-2.5 pt-2 border-t border-amber-200/60 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <p className="flex items-center gap-1.5 text-[11px] text-slate-600 dark:text-slate-400">
              <MapPin className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" />
              <span className="truncate">{currentHotel.address || currentHotel.direccion}</span>
            </p>
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-700 dark:text-slate-300 pt-1">
              <span>Check-in: <strong>{currentHotel.check_in_time || '15:00'}</strong></span>
              <span>Check-out: <strong>{currentHotel.check_out_time || '11:00'}</strong></span>
              {currentHotel.booking_code && (
                <span className="bg-amber-200/80 dark:bg-amber-950 text-amber-900 dark:text-amber-200 px-1.5 py-0.5 rounded font-mono text-[10px]">
                  Reserva: {currentHotel.booking_code}
                </span>
              )}
            </div>
            {currentHotel.notes && (
              <p className="text-[10px] text-amber-800 dark:text-amber-300 italic mt-1 bg-amber-100/50 dark:bg-amber-950/30 p-1.5 rounded-lg border border-amber-200/50 dark:border-amber-900">
                💡 {currentHotel.notes}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Itinerary Timeline Header & Add Button */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-1.5">
          <Clock className="w-4 h-4 text-rose-500" />
          <h2 className="text-sm font-black text-slate-800 dark:text-white uppercase tracking-wide">
            Planes del Día ({dayPlaces.length})
          </h2>
        </div>

        <button
          onClick={() => handleOpenAddModal()}
          className="bg-rose-500 hover:bg-rose-600 text-white font-black text-xs px-3 py-1.5 rounded-xl border-b-2 border-rose-700 active:translate-y-0.5 transition-all flex items-center gap-1 shadow-xs"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Añadir Plan</span>
        </button>
      </div>

      {/* Timeline Items List */}
      {dayPlaces.length === 0 ? (
        <div className="bg-white dark:bg-slate-800 border-2 border-dashed border-rose-200 dark:border-slate-700 rounded-2xl p-6 text-center space-y-2">
          <span className="text-4xl block">🗾</span>
          <p className="text-xs font-bold text-slate-600 dark:text-slate-300">No hay planes registrados para esta fecha.</p>
          <p className="text-[10px] text-slate-400">Pulsa "Añadir Plan" para agendar visitas, transporte o restaurantes.</p>
        </div>
      ) : (
        <div className="space-y-3 relative before:absolute before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-rose-100 dark:before:bg-slate-700">
          {dayPlaces.map(item => {
            const categoryInfo = getCategoryBadge(item.category);
            const CategoryIcon = categoryInfo.icon;
            const isVisited = item.is_visited || item.status === 'done';

            const placeName = item.lugares?.nombre || item.lugares?.name || item.title || (item as any).name;
            const placeDescription = item.notas_dia || item.lugares?.descripcion || item.description || (item as any).notes;
            const mapsUrl = item.lugares?.google_maps_url || item.google_maps_url;

            return (
              <div
                key={item.id}
                className={`relative pl-8 transition-all duration-200 ${
                  isVisited ? 'opacity-70' : 'opacity-100'
                }`}
              >
                {/* Timeline node icon */}
                <button
                  onClick={() => toggleVisited(item.id, isVisited)}
                  className={`absolute left-1.5 top-3.5 -translate-x-1/2 w-5 h-5 rounded-full border-2 flex items-center justify-center text-white transition-all ${
                    isVisited
                      ? 'bg-emerald-500 border-emerald-600'
                      : 'bg-rose-500 border-rose-600 hover:scale-110'
                  }`}
                  title={isVisited ? "Marcar como pendiente" : "Marcar como completado"}
                >
                  {isVisited ? (
                    <CheckCircle2 className="w-3.5 h-3.5 stroke-[3]" />
                  ) : (
                    <div className="w-1.5 h-1.5 bg-white rounded-full" />
                  )}
                </button>

                {/* Card Container */}
                <div className={`bg-white dark:bg-slate-800 border-2 rounded-2xl p-3.5 shadow-xs transition-all ${
                  isVisited
                    ? 'border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80'
                    : 'border-rose-100 dark:border-slate-700 hover:border-rose-300'
                }`}>
                  {/* Top Bar inside card */}
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-extrabold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-2 py-0.5 rounded-md border border-rose-100 dark:border-rose-900 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-rose-500" />
                        {item.order_index ? `Orden #${item.order_index}` : item.time_start || 'Todo el día'}
                      </span>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border flex items-center gap-1 ${categoryInfo.bg}`}>
                        <CategoryIcon className="w-3 h-3" />
                        {categoryInfo.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleOpenAddModal(item)}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md"
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
                    <h3 className={`text-sm font-black text-slate-800 dark:text-white ${isVisited ? 'line-through text-slate-400 dark:text-slate-500' : ''}`}>
                      {placeName}
                    </h3>
                    {placeDescription && (
                      <p className={`text-xs mt-1 leading-relaxed ${isVisited ? 'text-slate-400 dark:text-slate-500' : 'text-slate-600 dark:text-slate-300'}`}>
                        {placeDescription}
                      </p>
                    )}
                  </div>

                  {/* Actions Bar: Status Checkbox & Google Maps Link */}
                  <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-700 flex items-center justify-between gap-2 flex-wrap">
                    {/* Checkbox linked to is_visited */}
                    <button
                      onClick={() => toggleVisited(item.id, isVisited)}
                      className={`text-[11px] font-black px-2.5 py-1 rounded-xl transition-all flex items-center gap-1.5 border ${
                        isVisited
                          ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                          : 'bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {isVisited ? <CheckSquare className="w-4 h-4 text-emerald-600" /> : <Square className="w-4 h-4 text-slate-400" />}
                      <span>{isVisited ? 'Visitado' : 'Pendiente'}</span>
                    </button>

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

      {/* 3.D: Bottom Recommendations Block according to Active City */}
      <div className="mt-6 bg-gradient-to-br from-indigo-500/10 via-indigo-50 to-white dark:from-slate-900 dark:via-slate-800 dark:to-slate-800 border-2 border-indigo-200 dark:border-slate-700 rounded-2xl p-3.5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🗺️</span>
            <div>
              <h3 className="text-xs font-black text-slate-800 dark:text-white uppercase">
                Recomendaciones en {normalizeCityName(currentHotel?.city || activeCity?.name || 'Tokio')}
              </h3>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold">
                Sitios guardados sin fecha fija para visitar libremente.
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowRecs(!showRecs)}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-lg"
          >
            {showRecs ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        {showRecs && (
          <div className="space-y-3 pt-2 border-t border-indigo-100 dark:border-slate-700">
            {/* Tab Accordion Selectors */}
            <div className="grid grid-cols-2 bg-indigo-100/60 dark:bg-slate-900 p-1 rounded-xl">
              <button
                onClick={() => setActiveTabRec('food')}
                className={`py-1.5 text-[11px] font-black rounded-lg transition-all flex items-center justify-center gap-1 ${
                  activeRecTab === 'food'
                    ? 'bg-amber-500 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>Opciones Comida ({foodRecommendations.length})</span>
              </button>
              <button
                onClick={() => setActiveTabRec('shopping')}
                className={`py-1.5 text-[11px] font-black rounded-lg transition-all flex items-center justify-center gap-1 ${
                  activeRecTab === 'shopping'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Tiendas / Compras ({shoppingRecommendations.length})</span>
              </button>
            </div>

            {/* List of recommended items */}
            {activeRecs.length === 0 ? (
              <p className="text-center text-xs text-slate-400 py-3 italic">
                No hay lugares guardados en esta categoría para {normalizeCityName(currentHotel?.city || activeCity?.name)}.
              </p>
            ) : (
              <div className="space-y-2">
                {activeRecs.map(place => (
                  <div
                    key={place.id}
                    className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-2 shadow-2xs"
                  >
                    <div>
                      <h4 className="text-xs font-black text-slate-800 dark:text-white">
                        {place.title || (place as any).name}
                      </h4>
                      {place.description || (place as any).notes ? (
                        <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                          {place.description || (place as any).notes}
                        </p>
                      ) : null}
                    </div>

                    {place.google_maps_url && (
                      <a
                        href={place.google_maps_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 dark:text-emerald-400 hover:text-emerald-700 bg-emerald-50 dark:bg-emerald-950/60 p-1.5 rounded-lg text-xs font-bold flex items-center gap-1 flex-shrink-0"
                      >
                        <MapPin className="w-3.5 h-3.5" />
                        <span>Cómo llegar</span>
                      </a>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Add / Edit Itinerary Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 border-4 border-rose-300 dark:border-rose-700 rounded-3xl p-5 shadow-2xl max-w-sm w-full relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold bg-slate-100 dark:bg-slate-700 p-1 rounded-full h-7 w-7 flex items-center justify-center"
            >
              ✕
            </button>

            <h3 className="text-base font-black text-slate-800 dark:text-white flex items-center gap-1.5 mb-3">
              <Compass className="w-4 h-4 text-rose-500" />
              {editingItem ? 'Editar Plan del Itinerario' : 'Añadir Nuevo Plan'}
            </h3>

            <form onSubmit={handleSaveItem} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Título / Lugar *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Visita al Templo Senso-ji"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Categoría</label>
                  <select
                    value={category}
                    onChange={e => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                  >
                    <option value="attraction">Atracción / Sitio</option>
                    <option value="food">Comida / Restaurante</option>
                    <option value="transport">Transporte / Tren</option>
                    <option value="note">Nota / Hotel</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Hora Inicio</label>
                  <input
                    type="time"
                    value={timeStart}
                    onChange={e => setTimeStart(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Descripción / Notas</label>
                <textarea
                  rows={2}
                  placeholder="Detalles, entradas, cosas que ver..."
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Enlace Google Maps</label>
                <input
                  type="url"
                  placeholder="https://maps.google.com/..."
                  value={googleMapsUrl}
                  onChange={e => setGoogleMapsUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-extrabold hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-black border-b-2 border-rose-700 shadow-xs"
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
          <div className="bg-white dark:bg-slate-800 border-4 border-amber-300 dark:border-amber-700 rounded-3xl p-5 shadow-2xl max-w-sm w-full relative">
            <button
              onClick={() => setShowAccModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-sm font-bold bg-slate-100 dark:bg-slate-700 p-1 rounded-full h-7 w-7 flex items-center justify-center"
            >
              ✕
            </button>

            <h3 className="text-base font-black text-slate-800 dark:text-white flex items-center gap-1.5 mb-3">
              <Hotel className="w-4 h-4 text-amber-500" />
              Alojamiento en {activeCity?.name}
            </h3>

            <form onSubmit={handleSaveAcc} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Nombre del Hotel *</label>
                <input
                  type="text"
                  required
                  placeholder="Hotel Gracery Shinjuku"
                  value={accName}
                  onChange={e => setAccName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-xl font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Dirección completa</label>
                <input
                  type="text"
                  placeholder="Shinjuku, Tokio..."
                  value={accAddress}
                  onChange={e => setAccAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-xl font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Horario Check-in</label>
                  <input
                    type="text"
                    placeholder="15:00"
                    value={accCheckIn}
                    onChange={e => setAccCheckIn(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-xl font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Horario Check-out</label>
                  <input
                    type="text"
                    placeholder="11:00"
                    value={accCheckOut}
                    onChange={e => setAccCheckOut(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-xl font-semibold focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Código de Reserva</label>
                <input
                  type="text"
                  placeholder="BK-12345"
                  value={accCode}
                  onChange={e => setAccCode(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-xl font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Notas / Instrucciones</label>
                <textarea
                  rows={2}
                  placeholder="Cerca de la salida este..."
                  value={accNotes}
                  onChange={e => setAccNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-xl font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAccModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-extrabold hover:bg-slate-50 dark:hover:bg-slate-700"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-black border-b-2 border-amber-700 shadow-xs"
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
