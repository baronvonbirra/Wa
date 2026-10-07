import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Wa2State,
  ItineraryItem,
  ItineraryStatus,
  SavedPlace,
  WishlistItem,
  TravelDoc,
  Accommodation,
  PackingItem,
  EmergencyContact,
  City
} from './wa2Types';
import { INITIAL_WA2_STATE } from './wa2InitialState';
import { SupabaseService } from '../services/supabase';

const WA2_LOCAL_STORAGE_KEY = 'WA_2_0_APP_STATE';

export interface KmlSyncItem {
  external_id: string;
  name: string;
  description?: string;
  lat?: number;
  lng?: number;
  google_maps_url: string;
  category: string;
  cityName?: string;
}

export interface KmlDiffPreview {
  newPlaces: KmlSyncItem[];
  modifiedPlaces: KmlSyncItem[];
  removedPlaces: SavedPlace[];
}

interface Wa2ContextType {
  waState: Wa2State;
  setSelectedDate: (date: string) => void;
  updateItineraryStatus: (id: string, status: ItineraryStatus) => void;
  addItineraryItem: (item: Omit<ItineraryItem, 'id' | 'created_at'>) => void;
  updateItineraryItem: (id: string, updates: Partial<ItineraryItem>) => void;
  deleteItineraryItem: (id: string) => void;

  togglePlaceVisited: (id: string) => void;
  addSavedPlace: (place: Omit<SavedPlace, 'id' | 'created_at'>) => void;
  updateSavedPlace: (id: string, updates: Partial<SavedPlace>) => void;
  deleteSavedPlace: (id: string) => void;

  toggleWishlistPurchased: (id: string) => void;
  addWishlistItem: (item: Omit<WishlistItem, 'id' | 'created_at'>) => void;
  updateWishlistItem: (id: string, updates: Partial<WishlistItem>) => void;
  deleteWishlistItem: (id: string) => void;

  addTravelDoc: (doc: Omit<TravelDoc, 'id'>) => void;
  deleteTravelDoc: (id: string) => void;

  addAccommodation: (acc: Omit<Accommodation, 'id'>) => void;
  updateAccommodation: (id: string, updates: Partial<Accommodation>) => void;

  togglePackingItem: (id: string) => void;
  addPackingItem: (item: Omit<PackingItem, 'id'>) => void;
  deletePackingItem: (id: string) => void;

  addEmergencyContact: (contact: Omit<EmergencyContact, 'id'>) => void;
  deleteEmergencyContact: (id: string) => void;

  toggleDarkMode: () => void;
  authenticatePin: (pin: string) => boolean;
  setGroupPinCode: (pin: string) => void;

  previewKmlSync: (kmlItems: KmlSyncItem[]) => KmlDiffPreview;
  executeKmlUpsert: (kmlItems: KmlSyncItem[]) => void;

  setEurJpyRate: (rate: number) => void;
  resetWaState: () => void;
  fetchSupabaseItineraryForDate: (fechaStr: string) => Promise<void>;
}

const Wa2Context = createContext<Wa2ContextType | undefined>(undefined);

export const Wa2Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [waState, setWaState] = useState<Wa2State>(() => {
    try {
      const saved = localStorage.getItem(WA2_LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...INITIAL_WA2_STATE,
          ...parsed,
          cities: parsed.cities?.length ? parsed.cities : INITIAL_WA2_STATE.cities,
          accommodations: parsed.accommodations?.length ? parsed.accommodations : INITIAL_WA2_STATE.accommodations,
          itineraryItems: parsed.itineraryItems?.length ? parsed.itineraryItems : INITIAL_WA2_STATE.itineraryItems,
          savedPlaces: parsed.savedPlaces?.length ? parsed.savedPlaces : INITIAL_WA2_STATE.savedPlaces,
          wishlist: parsed.wishlist?.length ? parsed.wishlist : INITIAL_WA2_STATE.wishlist,
          travelDocs: parsed.travelDocs?.length ? parsed.travelDocs : INITIAL_WA2_STATE.travelDocs,
          packingChecklist: parsed.packingChecklist?.length ? parsed.packingChecklist : INITIAL_WA2_STATE.packingChecklist,
          emergencyContacts: parsed.emergencyContacts?.length ? parsed.emergencyContacts : INITIAL_WA2_STATE.emergencyContacts,
          survivalPhrases: parsed.survivalPhrases?.length ? parsed.survivalPhrases : INITIAL_WA2_STATE.survivalPhrases,
        };
      }
    } catch (e) {
      console.error("Error loading Wa2 state from localStorage:", e);
    }
    return INITIAL_WA2_STATE;
  });

  // Fetch Supabase data for selected date on mount or when selectedDate changes
  useEffect(() => {
    if (waState.selectedDate) {
      fetchSupabaseItineraryForDate(waState.selectedDate);
    }
  }, [waState.selectedDate]);

  const fetchSupabaseItineraryForDate = async (fechaStr: string) => {
    try {
      const remoteData = await SupabaseService.fetchItinerarioPorFecha(fechaStr);
      if (remoteData && remoteData.length > 0) {
        // Map Supabase itinerario_dias with lugares into ItineraryItem objects
        const fetchedItems: ItineraryItem[] = remoteData.map((row, index) => {
          const lugar = Array.isArray(row.lugares) ? row.lugares[0] : row.lugares;
          const placeName = lugar?.nombre || lugar?.name || `Lugar #${row.orden || index + 1}`;
          const mapUrl = lugar?.google_maps_url || `https://maps.google.com/?q=${encodeURIComponent(placeName)}`;

          return {
            id: row.id || `sb-itin-${fechaStr}-${index}`,
            date: fechaStr,
            time_start: row.time_start || '10:00',
            title: placeName,
            description: row.notas_dia || lugar?.descripcion || lugar?.notes || '',
            google_maps_url: mapUrl,
            category: (lugar?.categoria as any) || 'attraction',
            status: 'pending',
            order_index: row.orden || index + 1,
            created_at: new Date().toISOString(),
            orden: row.orden,
            notas_dia: row.notas_dia,
            lugares: lugar
          };
        });

        setWaState(prev => {
          // Merge fetched items with existing items for other dates
          const otherDateItems = prev.itineraryItems.filter(item => item.date !== fechaStr);
          return {
            ...prev,
            itineraryItems: [...otherDateItems, ...fetchedItems]
          };
        });
      }
    } catch (err) {
      console.warn("Could not fetch remote itinerary, using local state:", err);
    }
  };

  // Save to localStorage and apply Dark Mode root class on state changes
  useEffect(() => {
    try {
      localStorage.setItem(WA2_LOCAL_STORAGE_KEY, JSON.stringify(waState));
    } catch (e) {
      console.error("Error saving Wa2 state to localStorage:", e);
    }

    if (waState.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [waState]);

  const setSelectedDate = (date: string) => {
    setWaState(prev => ({ ...prev, selectedDate: date }));
  };

  const updateItineraryStatus = (id: string, status: ItineraryStatus) => {
    setWaState(prev => {
      const updated = prev.itineraryItems.map(item =>
        item.id === id ? { ...item, status } : item
      );
      const targetItem = updated.find(i => i.id === id);
      if (targetItem) {
        SupabaseService.syncRecord({
          table: 'itinerary_items',
          action: 'update',
          record: targetItem
        });
      }
      return { ...prev, itineraryItems: updated };
    });
  };

  const addItineraryItem = (item: Omit<ItineraryItem, 'id' | 'created_at'>) => {
    const newItem: ItineraryItem = {
      ...item,
      id: 'itin-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      created_at: new Date().toISOString()
    };
    setWaState(prev => {
      SupabaseService.syncRecord({
        table: 'itinerary_items',
        action: 'insert',
        record: newItem
      });
      return { ...prev, itineraryItems: [...prev.itineraryItems, newItem] };
    });
  };

  const updateItineraryItem = (id: string, updates: Partial<ItineraryItem>) => {
    setWaState(prev => {
      const updated = prev.itineraryItems.map(item =>
        item.id === id ? { ...item, ...updates } : item
      );
      const targetItem = updated.find(i => i.id === id);
      if (targetItem) {
        SupabaseService.syncRecord({
          table: 'itinerary_items',
          action: 'update',
          record: targetItem
        });
      }
      return { ...prev, itineraryItems: updated };
    });
  };

  const deleteItineraryItem = (id: string) => {
    setWaState(prev => {
      SupabaseService.syncRecord({
        table: 'itinerary_items',
        action: 'delete',
        record: { id }
      });
      return {
        ...prev,
        itineraryItems: prev.itineraryItems.filter(item => item.id !== id)
      };
    });
  };

  const togglePlaceVisited = (id: string) => {
    setWaState(prev => {
      const updated = prev.savedPlaces.map(place =>
        place.id === id ? { ...place, visited: !place.visited } : place
      );
      const target = updated.find(p => p.id === id);
      if (target) {
        SupabaseService.syncRecord({
          table: 'saved_places',
          action: 'update',
          record: target
        });
      }
      return { ...prev, savedPlaces: updated };
    });
  };

  const addSavedPlace = (place: Omit<SavedPlace, 'id' | 'created_at'>) => {
    const newPlace: SavedPlace = {
      ...place,
      id: 'place-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      created_at: new Date().toISOString()
    };
    setWaState(prev => {
      SupabaseService.syncRecord({
        table: 'saved_places',
        action: 'insert',
        record: newPlace
      });
      return { ...prev, savedPlaces: [...prev.savedPlaces, newPlace] };
    });
  };

  const updateSavedPlace = (id: string, updates: Partial<SavedPlace>) => {
    setWaState(prev => {
      const updated = prev.savedPlaces.map(place =>
        place.id === id ? { ...place, ...updates } : place
      );
      const target = updated.find(p => p.id === id);
      if (target) {
        SupabaseService.syncRecord({
          table: 'saved_places',
          action: 'update',
          record: target
        });
      }
      return { ...prev, savedPlaces: updated };
    });
  };

  const deleteSavedPlace = (id: string) => {
    setWaState(prev => {
      SupabaseService.syncRecord({
        table: 'saved_places',
        action: 'delete',
        record: { id }
      });
      return {
        ...prev,
        savedPlaces: prev.savedPlaces.filter(p => p.id !== id)
      };
    });
  };

  const toggleWishlistPurchased = (id: string) => {
    setWaState(prev => {
      const updated = prev.wishlist.map(item =>
        item.id === id ? { ...item, purchased: !item.purchased } : item
      );
      const target = updated.find(i => i.id === id);
      if (target) {
        SupabaseService.syncRecord({
          table: 'wishlist',
          action: 'update',
          record: target
        });
      }
      return { ...prev, wishlist: updated };
    });
  };

  const addWishlistItem = (item: Omit<WishlistItem, 'id' | 'created_at'>) => {
    const newItem: WishlistItem = {
      ...item,
      id: 'wish-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
      created_at: new Date().toISOString()
    };
    setWaState(prev => {
      SupabaseService.syncRecord({
        table: 'wishlist',
        action: 'insert',
        record: newItem
      });
      return { ...prev, wishlist: [...prev.wishlist, newItem] };
    });
  };

  const updateWishlistItem = (id: string, updates: Partial<WishlistItem>) => {
    setWaState(prev => {
      const updated = prev.wishlist.map(item =>
        item.id === id ? { ...item, ...updates } : item
      );
      const target = updated.find(i => i.id === id);
      if (target) {
        SupabaseService.syncRecord({
          table: 'wishlist',
          action: 'update',
          record: target
        });
      }
      return { ...prev, wishlist: updated };
    });
  };

  const deleteWishlistItem = (id: string) => {
    setWaState(prev => {
      SupabaseService.syncRecord({
        table: 'wishlist',
        action: 'delete',
        record: { id }
      });
      return {
        ...prev,
        wishlist: prev.wishlist.filter(i => i.id !== id)
      };
    });
  };

  const addTravelDoc = (doc: Omit<TravelDoc, 'id'>) => {
    const newDoc: TravelDoc = {
      ...doc,
      id: 'doc-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4)
    };
    setWaState(prev => {
      SupabaseService.syncRecord({
        table: 'travel_docs',
        action: 'insert',
        record: newDoc
      });
      return { ...prev, travelDocs: [...prev.travelDocs, newDoc] };
    });
  };

  const deleteTravelDoc = (id: string) => {
    setWaState(prev => {
      SupabaseService.syncRecord({
        table: 'travel_docs',
        action: 'delete',
        record: { id }
      });
      return {
        ...prev,
        travelDocs: prev.travelDocs.filter(d => d.id !== id)
      };
    });
  };

  const addAccommodation = (acc: Omit<Accommodation, 'id'>) => {
    const newAcc: Accommodation = {
      ...acc,
      id: 'acc-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4)
    };
    setWaState(prev => {
      SupabaseService.syncRecord({
        table: 'accommodations',
        action: 'insert',
        record: newAcc
      });
      return { ...prev, accommodations: [...prev.accommodations, newAcc] };
    });
  };

  const updateAccommodation = (id: string, updates: Partial<Accommodation>) => {
    setWaState(prev => {
      const updated = prev.accommodations.map(acc =>
        acc.id === id ? { ...acc, ...updates } : acc
      );
      const target = updated.find(a => a.id === id);
      if (target) {
        SupabaseService.syncRecord({
          table: 'accommodations',
          action: 'update',
          record: target
        });
      }
      return { ...prev, accommodations: updated };
    });
  };

  const togglePackingItem = (id: string) => {
    setWaState(prev => {
      const updated = prev.packingChecklist.map(item =>
        item.id === id ? { ...item, checked: !item.checked } : item
      );
      const target = updated.find(i => i.id === id);
      if (target) {
        SupabaseService.syncRecord({
          table: 'packing_checklist',
          action: 'update',
          record: target
        });
      }
      return { ...prev, packingChecklist: updated };
    });
  };

  const addPackingItem = (item: Omit<PackingItem, 'id'>) => {
    const newItem: PackingItem = {
      ...item,
      id: 'pack-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4)
    };
    setWaState(prev => {
      SupabaseService.syncRecord({
        table: 'packing_checklist',
        action: 'insert',
        record: newItem
      });
      return { ...prev, packingChecklist: [...prev.packingChecklist, newItem] };
    });
  };

  const deletePackingItem = (id: string) => {
    setWaState(prev => {
      SupabaseService.syncRecord({
        table: 'packing_checklist',
        action: 'delete',
        record: { id }
      });
      return {
        ...prev,
        packingChecklist: prev.packingChecklist.filter(i => i.id !== id)
      };
    });
  };

  const addEmergencyContact = (contact: Omit<EmergencyContact, 'id'>) => {
    const newContact: EmergencyContact = {
      ...contact,
      id: 'em-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4)
    };
    setWaState(prev => {
      SupabaseService.syncRecord({
        table: 'emergency_contacts',
        action: 'insert',
        record: newContact
      });
      return { ...prev, emergencyContacts: [...prev.emergencyContacts, newContact] };
    });
  };

  const deleteEmergencyContact = (id: string) => {
    setWaState(prev => {
      SupabaseService.syncRecord({
        table: 'emergency_contacts',
        action: 'delete',
        record: { id }
      });
      return {
        ...prev,
        emergencyContacts: prev.emergencyContacts.filter(c => c.id !== id)
      };
    });
  };

  const toggleDarkMode = () => {
    setWaState(prev => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const authenticatePin = (pin: string): boolean => {
    if (pin === waState.groupPinCode) {
      setWaState(prev => ({ ...prev, isAuthenticated: true }));
      return true;
    }
    return false;
  };

  const setGroupPinCode = (pin: string) => {
    setWaState(prev => ({ ...prev, groupPinCode: pin }));
  };

  // Google My Maps KML Diff Preview
  const previewKmlSync = (kmlItems: KmlSyncItem[]): KmlDiffPreview => {
    const existingExtIds = new Set(waState.savedPlaces.map(p => p.external_id).filter(Boolean));
    const kmlExtIds = new Set(kmlItems.map(i => i.external_id));

    const newPlaces = kmlItems.filter(i => !existingExtIds.has(i.external_id));
    const modifiedPlaces = kmlItems.filter(i => existingExtIds.has(i.external_id));
    const removedPlaces = waState.savedPlaces.filter(p => p.external_id && !kmlExtIds.has(p.external_id));

    return { newPlaces, modifiedPlaces, removedPlaces };
  };

  // Google My Maps KML UPSERT Execution preserving visited / progress status
  const executeKmlUpsert = (kmlItems: KmlSyncItem[]) => {
    setWaState(prev => {
      const updatedPlaces = [...prev.savedPlaces];

      kmlItems.forEach(item => {
        const existingIdx = updatedPlaces.findIndex(p => p.external_id === item.external_id);
        const cityObj = prev.cities.find(c => c.name.toLowerCase() === item.cityName?.toLowerCase()) || prev.cities[0];

        if (existingIdx >= 0) {
          // Preserve visited status rule
          const existing = updatedPlaces[existingIdx];
          updatedPlaces[existingIdx] = {
            ...existing,
            name: item.name,
            notes: item.description || existing.notes,
            google_maps_url: item.google_maps_url,
            category: (item.category as any) || existing.category,
            city_id: cityObj.id,
            visited: existing.visited // NEVER overwrite visited flag
          };
        } else {
          // Insert new place
          updatedPlaces.push({
            id: 'place-kml-' + Date.now() + '-' + Math.random().toString(36).substr(2, 4),
            external_id: item.external_id,
            city_id: cityObj.id,
            name: item.name,
            category: (item.category as any) || 'sightseeing',
            google_maps_url: item.google_maps_url,
            notes: item.description || '',
            visited: false,
            created_at: new Date().toISOString()
          });
        }
      });

      return { ...prev, savedPlaces: updatedPlaces };
    });
  };

  const setEurJpyRate = (rate: number) => {
    setWaState(prev => ({ ...prev, eurJpyRate: rate }));
  };

  const resetWaState = () => {
    setWaState(INITIAL_WA2_STATE);
    localStorage.removeItem(WA2_LOCAL_STORAGE_KEY);
  };

  return (
    <Wa2Context.Provider
      value={{
        waState,
        setSelectedDate,
        updateItineraryStatus,
        addItineraryItem,
        updateItineraryItem,
        deleteItineraryItem,
        togglePlaceVisited,
        addSavedPlace,
        updateSavedPlace,
        deleteSavedPlace,
        toggleWishlistPurchased,
        addWishlistItem,
        updateWishlistItem,
        deleteWishlistItem,
        addTravelDoc,
        deleteTravelDoc,
        addAccommodation,
        updateAccommodation,
        togglePackingItem,
        addPackingItem,
        deletePackingItem,
        addEmergencyContact,
        deleteEmergencyContact,
        toggleDarkMode,
        authenticatePin,
        setGroupPinCode,
        previewKmlSync,
        executeKmlUpsert,
        setEurJpyRate,
        resetWaState,
        fetchSupabaseItineraryForDate
      }}
    >
      {children}
    </Wa2Context.Provider>
  );
};

export const useWa2 = () => {
  const context = useContext(Wa2Context);
  if (!context) {
    throw new Error('useWa2 must be used within a Wa2Provider');
  }
  return context;
};
