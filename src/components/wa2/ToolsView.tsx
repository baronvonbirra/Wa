import React, { useState, useEffect } from 'react';
import { useWa2 } from '../../state/Wa2Context';
import { supabase } from '../../services/supabase';
import { TravelDoc, PackingCategory, PackingListItem } from '../../state/wa2Types';
import {
  Calculator,
  QrCode,
  Percent,
  Plus,
  Trash2,
  Maximize2,
  Sparkles,
  ArrowRightLeft,
  CheckSquare,
  Square,
  Luggage,
  ShieldAlert,
  Delete,
  Building2,
  Phone
} from 'lucide-react';

interface ToolsViewProps {
  initialSubTab?: 'converter' | 'packing' | 'docs' | 'emergency';
}

export const ToolsView: React.FC<ToolsViewProps> = ({ initialSubTab = 'converter' }) => {
  const {
    waState,
    setEurJpyRate,
    addTravelDoc,
    deleteTravelDoc,
    addEmergencyContact,
    deleteEmergencyContact
  } = useWa2();

  const [activeSubTab, setActiveSubTab] = useState<'converter' | 'packing' | 'docs' | 'emergency'>(initialSubTab);

  useEffect(() => {
    if (initialSubTab) {
      setActiveSubTab(initialSubTab);
    }
  }, [initialSubTab]);

  // Converter State
  const [conversionDirection, setConversionDirection] = useState<'jpyToEur' | 'eurToJpy'>('jpyToEur');
  const [inputValue, setInputValue] = useState<string>('10000');
  const [applyTaxFree, setApplyTaxFree] = useState<boolean>(false);
  const [editingRate, setEditingRate] = useState<boolean>(false);
  const [customRate, setCustomRate] = useState<string>(waState.eurJpyRate.toString());

  // Packing Checklist State connected to packing_list_items
  const [packingItems, setPackingItems] = useState<PackingListItem[]>([]);
  const [filterPerson, setFilterPerson] = useState<string>('Todos');
  const [newPackingName, setNewPackingName] = useState('');
  const [newPackingQty, setNewPackingQty] = useState<number>(1);
  const [newPackingCategory, setNewPackingCategory] = useState<PackingCategory>('General');
  const [newPackingAssigned, setNewPackingAssigned] = useState<string>('Todos');
  const [showAddPackingModal, setShowAddPackingModal] = useState<boolean>(false);

  // Travel Docs State
  const [fullscreenDoc, setFullscreenDoc] = useState<TravelDoc | null>(null);
  const [showAddDocModal, setShowAddDocModal] = useState<boolean>(false);
  const [docTitle, setDocTitle] = useState('');
  const [docQrUrl, setDocQrUrl] = useState('');
  const [docNotes, setDocNotes] = useState('');

  // Emergency Contacts State
  const [showAddContactModal, setShowAddContactModal] = useState<boolean>(false);
  const [contactTitle, setContactTitle] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [contactAddress, setContactAddress] = useState('');
  const [contactNotes, setContactNotes] = useState('');

  // Fetch packing_list_items from Supabase
  useEffect(() => {
    fetchPackingItems();
  }, []);

  const fetchPackingItems = async () => {
    const { data } = await supabase
      .from('packing_list_items')
      .select('*')
      .order('category', { ascending: true });
    setPackingItems(data || []);
  };

  const togglePacked = async (id: string, currentPacked?: boolean) => {
    const newPacked = !currentPacked;
    // Optimistic local update
    setPackingItems(prev =>
      prev.map(item => item.id === id ? { ...item, is_packed: newPacked } : item)
    );

    // Database / Supabase persistence
    await supabase
      .from('packing_list_items')
      .update({ is_packed: newPacked })
      .eq('id', id);
  };

  // Keypad Handlers for Converter
  const handleKeyPress = (val: string) => {
    if (val === 'C') {
      setInputValue('0');
    } else if (val === 'backspace') {
      setInputValue(prev => prev.length > 1 ? prev.slice(0, -1) : '0');
    } else {
      setInputValue(prev => (prev === '0' ? val : prev + val));
    }
  };

  const handleAddQuickAmount = (amount: number) => {
    const current = Number(inputValue) || 0;
    setInputValue((current + amount).toString());
  };

  // Calculations for Converter
  const rawNum = Number(inputValue) || 0;
  let finalJpy = 0;
  let finalEur = 0;
  let taxSavingsJpy = 0;
  let taxSavingsEur = 0;

  if (conversionDirection === 'jpyToEur') {
    const jpyAmount = applyTaxFree ? rawNum / 1.10 : rawNum;
    finalJpy = jpyAmount;
    finalEur = jpyAmount / waState.eurJpyRate;
    if (applyTaxFree) {
      taxSavingsJpy = rawNum - jpyAmount;
      taxSavingsEur = taxSavingsJpy / waState.eurJpyRate;
    }
  } else {
    const eurAmount = rawNum;
    let jpyCalc = eurAmount * waState.eurJpyRate;
    if (applyTaxFree) {
      taxSavingsJpy = jpyCalc - (jpyCalc / 1.10);
      jpyCalc = jpyCalc / 1.10;
      taxSavingsEur = taxSavingsJpy / waState.eurJpyRate;
    }
    finalJpy = jpyCalc;
    finalEur = applyTaxFree ? eurAmount / 1.10 : eurAmount;
  }

  const handleSaveRate = () => {
    const newRate = Number(customRate);
    if (newRate > 0) {
      setEurJpyRate(newRate);
      setEditingRate(false);
    }
  };

  const handleSavePackingItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPackingName.trim()) return;

    const newItem: PackingListItem = {
      id: 'pli-' + Date.now(),
      item: newPackingName.trim(),
      item_name: newPackingName.trim(),
      quantity: newPackingQty || 1,
      category: newPackingCategory,
      assigned_to: newPackingAssigned,
      is_packed: false
    };

    setPackingItems(prev => [...prev, newItem]);
    setNewPackingName('');
    setNewPackingQty(1);
    setShowAddPackingModal(false);
  };

  const handleSaveDoc = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim()) return;

    const qr = docQrUrl.trim() ||
      `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${encodeURIComponent(docTitle.trim())}`;

    addTravelDoc({
      title: docTitle.trim(),
      qr_code_url: qr,
      notes: docNotes.trim()
    });

    setDocTitle('');
    setDocQrUrl('');
    setDocNotes('');
    setShowAddDocModal(false);
  };

  const handleSaveContact = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactTitle.trim() || !contactPhone.trim()) return;

    addEmergencyContact({
      title: contactTitle.trim(),
      phone: contactPhone.trim(),
      address: contactAddress.trim(),
      notes: contactNotes.trim()
    });

    setContactTitle('');
    setContactPhone('');
    setContactAddress('');
    setContactNotes('');
    setShowAddContactModal(false);
  };

  // Packing Checklist Filtering by Person
  const filteredPackingItems = packingItems.filter(item =>
    filterPerson === 'Todos' || item.assigned_to === filterPerson || item.assigned_to === 'Todos'
  );

  // Dynamic Progress Counter
  const packedCount = filteredPackingItems.filter(i => i.is_packed).length;
  const progressPercentage = filteredPackingItems.length ? Math.round((packedCount / filteredPackingItems.length) * 100) : 0;

  const packingCategoriesList: PackingCategory[] = ['Documentación', 'Electrónica', 'Ropa', 'Botiquín', 'General'];

  return (
    <div className="pb-24 pt-2 max-w-md mx-auto px-4 space-y-4">
      {/* 4-Tab Sub-navigation Bar */}
      <div className="grid grid-cols-4 bg-slate-200/80 dark:bg-slate-800 p-1 rounded-2xl border border-slate-300 dark:border-slate-700 gap-1">
        <button
          onClick={() => setActiveSubTab('converter')}
          className={`py-2 text-[11px] font-black rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 ${
            activeSubTab === 'converter'
              ? 'bg-rose-500 text-white shadow-md'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>Conversor</span>
        </button>

        <button
          onClick={() => setActiveSubTab('packing')}
          className={`py-2 text-[11px] font-black rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 ${
            activeSubTab === 'packing'
              ? 'bg-rose-500 text-white shadow-md'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
          }`}
        >
          <Luggage className="w-4 h-4" />
          <span>Equipaje</span>
        </button>

        <button
          onClick={() => setActiveSubTab('docs')}
          className={`py-2 text-[11px] font-black rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 ${
            activeSubTab === 'docs'
              ? 'bg-rose-500 text-white shadow-md'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
          }`}
        >
          <QrCode className="w-4 h-4" />
          <span>QRs & Docs</span>
        </button>

        <button
          onClick={() => setActiveSubTab('emergency')}
          className={`py-2 text-[11px] font-black rounded-xl transition-all flex flex-col items-center justify-center gap-0.5 ${
            activeSubTab === 'emergency'
              ? 'bg-rose-500 text-white shadow-md'
              : 'text-slate-700 dark:text-slate-300 hover:text-slate-900'
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Emergencia</span>
        </button>
      </div>

      {/* CONVERTER SECTION */}
      {activeSubTab === 'converter' && (
        <div className="space-y-3">
          {/* Main Display Box */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-rose-950 text-white rounded-3xl p-4 shadow-xl border-2 border-rose-500/30">
            <div className="flex items-center justify-between border-b border-slate-700 pb-2.5 mb-3">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] text-slate-400 font-bold uppercase">Tipo de cambio:</span>
                {editingRate ? (
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={customRate}
                      onChange={e => setCustomRate(e.target.value)}
                      className="w-16 px-1 py-0.5 text-xs bg-slate-700 text-white font-bold rounded border border-rose-400 focus:outline-none"
                    />
                    <button
                      onClick={handleSaveRate}
                      className="bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] font-black px-2 py-0.5 rounded"
                    >
                      OK
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setEditingRate(true)}
                    className="text-xs font-black text-rose-300 hover:text-rose-200 underline decoration-dotted"
                  >
                    1€ = {waState.eurJpyRate} ¥
                  </button>
                )}
              </div>

              <button
                onClick={() => {
                  setConversionDirection(prev => prev === 'jpyToEur' ? 'eurToJpy' : 'jpyToEur');
                  setInputValue('1000');
                }}
                className="bg-white/10 hover:bg-white/20 text-rose-200 px-2.5 py-1 rounded-xl text-[10px] font-black flex items-center gap-1 border border-white/10"
              >
                <ArrowRightLeft className="w-3 h-3" />
                <span>{conversionDirection === 'jpyToEur' ? 'JPY → EUR' : 'EUR → JPY'}</span>
              </button>
            </div>

            <div className="text-right py-1">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase block">
                {conversionDirection === 'jpyToEur' ? 'Importe en Yenes (JPY)' : 'Importe en Euros (EUR)'}
              </span>
              <strong className="text-3xl font-black tracking-tight text-white block mt-0.5">
                {conversionDirection === 'jpyToEur' ? '¥' : '€'}{rawNum.toLocaleString()}
              </strong>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-700/80 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-rose-300 font-extrabold uppercase block">
                  {conversionDirection === 'jpyToEur' ? 'Resultado en Euros' : 'Resultado en Yenes'}
                </span>
                <strong className="text-2xl font-black text-rose-400">
                  {conversionDirection === 'jpyToEur' ? `€${finalEur.toFixed(2)}` : `¥${Math.round(finalJpy).toLocaleString()}`}
                </strong>
              </div>

              <button
                onClick={() => setApplyTaxFree(!applyTaxFree)}
                className={`px-3 py-1.5 rounded-2xl text-xs font-black border transition-all flex items-center gap-1.5 ${
                  applyTaxFree
                    ? 'bg-emerald-500 text-white border-emerald-400 shadow-md animate-pulse'
                    : 'bg-slate-800 text-slate-300 border-slate-600 hover:bg-slate-700'
                }`}
              >
                <Percent className="w-3.5 h-3.5" />
                <span>Tax-Free (-10%)</span>
              </button>
            </div>

            {applyTaxFree && (
              <div className="mt-3 bg-emerald-500/20 border border-emerald-500/50 rounded-2xl p-2 text-center text-xs text-emerald-200 font-bold">
                🎉 ¡Ahorro Tax-Free del 10%: <strong>¥{Math.round(taxSavingsJpy).toLocaleString()} (≈ €{taxSavingsEur.toFixed(2)})</strong>!
              </div>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => handleAddQuickAmount(1000)}
              className="bg-rose-50 hover:bg-rose-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-slate-700 rounded-xl py-2 font-black text-xs active:scale-95 transition-all shadow-xs"
            >
              +1.000 ¥
            </button>
            <button
              onClick={() => handleAddQuickAmount(5000)}
              className="bg-rose-50 hover:bg-rose-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-slate-700 rounded-xl py-2 font-black text-xs active:scale-95 transition-all shadow-xs"
            >
              +5.000 ¥
            </button>
            <button
              onClick={() => handleAddQuickAmount(10000)}
              className="bg-rose-50 hover:bg-rose-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-slate-700 rounded-xl py-2 font-black text-xs active:scale-95 transition-all shadow-xs"
            >
              +10.000 ¥
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl p-3 shadow-sm border border-slate-200 dark:border-slate-700 grid grid-cols-3 gap-2">
            {['7', '8', '9', '4', '5', '6', '1', '2', '3', 'C', '0', 'backspace'].map((key) => {
              const isClear = key === 'C';
              const isBack = key === 'backspace';

              return (
                <button
                  key={key}
                  onClick={() => handleKeyPress(key)}
                  className={`py-3.5 rounded-2xl text-lg font-black transition-all active:scale-95 shadow-xs flex items-center justify-center ${
                    isClear
                      ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                      : isBack
                      ? 'bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                      : 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-white border border-slate-200 dark:border-slate-700'
                  }`}
                >
                  {isBack ? <Delete className="w-5 h-5" /> : key}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* PACKING CHECKLIST SECTION */}
      {activeSubTab === 'packing' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-black text-slate-800 dark:text-white flex items-center gap-2">
              <Luggage className="w-5 h-5 text-rose-500" />
              <span>📋 Maleta & Equipaje</span>
            </h1>

            <button
              onClick={() => setShowAddPackingModal(true)}
              className="bg-rose-500 hover:bg-rose-600 text-white font-black text-xs px-3 py-1.5 rounded-xl border-b-2 border-rose-700 active:translate-y-0.5 transition-all flex items-center gap-1 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir Ítem</span>
            </button>
          </div>

          {/* Person Filters (Papi, Mami, Lily, James, Todos) */}
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {['Todos', 'Papi', 'Mami', 'Lily', 'James'].map(person => (
              <button
                key={person}
                onClick={() => setFilterPerson(person)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-black transition-all flex-shrink-0 ${
                  filterPerson === person
                    ? 'bg-rose-500 text-white shadow-xs scale-105'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700'
                }`}
              >
                {person}
              </button>
            ))}
          </div>

          {/* Dynamic Progress Bar */}
          <div className="bg-slate-900 text-white rounded-2xl p-3.5 border border-slate-800 shadow-sm">
            <div className="flex justify-between text-xs font-bold mb-1.5">
              <span>Progreso ({filterPerson})</span>
              <span>{packedCount} / {filteredPackingItems.length} ({progressPercentage}%)</span>
            </div>
            <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
              <div
                className="bg-emerald-500 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Packing Items List */}
          <div className="space-y-2">
            {filteredPackingItems.length === 0 ? (
              <p className="text-center text-xs text-slate-400 py-4 italic">
                No hay ítems en la maleta para {filterPerson}.
              </p>
            ) : (
              filteredPackingItems.map(item => (
                <label
                  key={item.id}
                  className="flex items-center justify-between p-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer shadow-2xs hover:border-rose-300 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={Boolean(item.is_packed)}
                      onChange={() => togglePacked(item.id, item.is_packed)}
                      className="w-5 h-5 accent-rose-500 rounded cursor-pointer"
                    />
                    <span className={`text-xs font-extrabold ${item.is_packed ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-white'}`}>
                      {item.item || item.item_name} {item.quantity > 1 && <span className="text-xs text-rose-500 font-black ml-1">x{item.quantity}</span>}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 uppercase">
                      {item.assigned_to}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setPackingItems(prev => prev.filter(p => p.id !== item.id));
                      }}
                      className="text-slate-300 hover:text-rose-600 p-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </label>
              ))
            )}
          </div>
        </div>
      )}

      {/* TRAVEL DOCUMENTS & QRS SECTION */}
      {activeSubTab === 'docs' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-slate-800 dark:text-white uppercase tracking-wide flex items-center gap-1.5">
                <QrCode className="w-4 h-4 text-rose-500" />
                Documentos & QRs
              </h2>
              <p className="text-[10px] text-slate-400 font-bold">Escaneo rápido en inmigración y tiendas</p>
            </div>

            <button
              onClick={() => setShowAddDocModal(true)}
              className="bg-rose-500 hover:bg-rose-600 text-white font-black text-xs px-3 py-1.5 rounded-xl border-b-2 border-rose-700 active:translate-y-0.5 transition-all flex items-center gap-1 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir QR</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {waState.travelDocs.map((doc) => (
              <div
                key={doc.id}
                className="bg-white dark:bg-slate-800 border-2 border-rose-100 dark:border-slate-700 hover:border-rose-300 rounded-2xl p-3.5 shadow-sm space-y-2 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xs font-black text-slate-800 dark:text-white leading-tight">
                      {doc.title}
                    </h3>

                    <button
                      onClick={() => {
                        if (confirm('¿Eliminar este documento?')) {
                          deleteTravelDoc(doc.id);
                        }
                      }}
                      className="text-slate-300 hover:text-rose-600 p-0.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {doc.notes && (
                    <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                      {doc.notes}
                    </p>
                  )}
                </div>

                <div
                  onClick={() => setFullscreenDoc(doc)}
                  className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl p-2.5 flex flex-col items-center justify-center cursor-pointer hover:bg-rose-50 dark:hover:bg-slate-700 transition-all group"
                >
                  <img
                    src={doc.qr_code_url}
                    alt={doc.title}
                    className="w-28 h-28 object-contain rounded-lg"
                  />
                  <span className="text-[10px] font-black text-rose-600 dark:text-rose-400 group-hover:scale-105 transition-transform mt-1.5 flex items-center gap-1">
                    <Maximize2 className="w-3 h-3" />
                    Ampliar para Escanear
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* EMERGENCY CONTACTS SECTION */}
      {activeSubTab === 'emergency' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-black text-slate-800 dark:text-white uppercase tracking-wide flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                Contactos de Emergencia
              </h2>
              <p className="text-[10px] text-slate-400 font-bold">Teléfonos offline y asistencia médica 24/7</p>
            </div>

            <button
              onClick={() => setShowAddContactModal(true)}
              className="bg-rose-500 hover:bg-rose-600 text-white font-black text-xs px-3 py-1.5 rounded-xl border-b-2 border-rose-700 active:translate-y-0.5 transition-all flex items-center gap-1 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Añadir Contacto</span>
            </button>
          </div>

          <div className="space-y-2.5">
            {waState.emergencyContacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white dark:bg-slate-800 border-2 border-rose-100 dark:border-slate-700 rounded-2xl p-3.5 shadow-sm space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h3 className="text-sm font-black text-slate-800 dark:text-white">
                      {contact.title}
                    </h3>
                    {contact.address && (
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-0.5">
                        <Building2 className="w-3 h-3 text-amber-500" />
                        <span>{contact.address}</span>
                      </p>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      if (confirm('¿Eliminar este contacto de emergencia?')) {
                        deleteEmergencyContact(contact.id);
                      }
                    }}
                    className="text-slate-300 hover:text-rose-600 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {contact.notes && (
                  <p className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-900 p-2 rounded-xl border border-slate-100 dark:border-slate-700 leading-snug">
                    💡 {contact.notes}
                  </p>
                )}

                <div className="pt-1 flex justify-end">
                  <a
                    href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                    className="bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-black text-xs px-3.5 py-1.5 rounded-xl border-b-2 border-emerald-700 transition-all flex items-center gap-1.5 shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>Llamar: {contact.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Fullscreen QR Modal */}
      {fullscreenDoc && (
        <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 border-4 border-rose-400 rounded-3xl p-6 shadow-2xl max-w-sm w-full text-center relative space-y-4 animate-scaleUp">
            <button
              onClick={() => setFullscreenDoc(null)}
              className="absolute top-4 right-4 bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-600 dark:text-slate-200 font-extrabold p-2 rounded-full h-8 w-8 flex items-center justify-center text-sm"
            >
              ✕
            </button>

            <div>
              <span className="text-3xl block mb-1">📱</span>
              <h3 className="text-base font-black text-slate-900 dark:text-white uppercase">{fullscreenDoc.title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-bold mt-1">Muestra este código al personal o escáner</p>
            </div>

            <div className="bg-white p-4 border-4 border-slate-900 rounded-2xl shadow-inner inline-block mx-auto">
              <img
                src={fullscreenDoc.qr_code_url}
                alt={fullscreenDoc.title}
                className="w-56 h-56 object-contain"
              />
            </div>

            {fullscreenDoc.notes && (
              <p className="text-xs text-slate-600 dark:text-slate-300 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 p-2.5 rounded-xl text-left font-semibold">
                💡 {fullscreenDoc.notes}
              </p>
            )}

            <button
              onClick={() => setFullscreenDoc(null)}
              className="w-full py-3 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-black text-xs uppercase tracking-wider"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}

      {/* Add Packing Modal */}
      {showAddPackingModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 border-4 border-rose-300 rounded-3xl p-5 shadow-2xl max-w-sm w-full relative">
            <button
              onClick={() => setShowAddPackingModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-sm font-bold bg-slate-100 dark:bg-slate-700 p-1 rounded-full h-7 w-7 flex items-center justify-center"
            >
              ✕
            </button>

            <h3 className="text-base font-black text-slate-800 dark:text-white flex items-center gap-1.5 mb-3">
              <Luggage className="w-4 h-4 text-rose-500" />
              Añadir Ítem a la Maleta
            </h3>

            <form onSubmit={handleSavePackingItem} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Nombre del Objeto *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Pasaportes, Camisetas..."
                  value={newPackingName}
                  onChange={e => setNewPackingName(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Cantidad</label>
                  <input
                    type="number"
                    min={1}
                    value={newPackingQty}
                    onChange={e => setNewPackingQty(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Asignado A</label>
                  <select
                    value={newPackingAssigned}
                    onChange={e => setNewPackingAssigned(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                  >
                    {['Todos', 'Papi', 'Mami', 'Lily', 'James'].map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Categoría</label>
                <select
                  value={newPackingCategory}
                  onChange={e => setNewPackingCategory(e.target.value as PackingCategory)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                >
                  {packingCategoriesList.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddPackingModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-extrabold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-black shadow-sm"
                >
                  Añadir Ítem
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Travel Doc Modal */}
      {showAddDocModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 border-4 border-rose-300 rounded-3xl p-5 shadow-2xl max-w-sm w-full relative">
            <button
              onClick={() => setShowAddDocModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-sm font-bold bg-slate-100 dark:bg-slate-700 p-1 rounded-full h-7 w-7 flex items-center justify-center"
            >
              ✕
            </button>

            <h3 className="text-base font-black text-slate-800 dark:text-white flex items-center gap-1.5 mb-3">
              <Sparkles className="w-4 h-4 text-rose-500" />
              Añadir Documento o QR
            </h3>

            <form onSubmit={handleSaveDoc} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Título del Documento *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Visit Japan Web QR"
                  value={docTitle}
                  onChange={e => setDocTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">URL del Código QR / Imagen</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={docQrUrl}
                  onChange={e => setDocQrUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Notas / Instrucciones</label>
                <textarea
                  rows={2}
                  placeholder="Instrucciones de uso..."
                  value={docNotes}
                  onChange={e => setDocNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddDocModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-extrabold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-black shadow-sm"
                >
                  Guardar QR
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Emergency Contact Modal */}
      {showAddContactModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-800 border-4 border-rose-300 rounded-3xl p-5 shadow-2xl max-w-sm w-full relative">
            <button
              onClick={() => setShowAddContactModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 text-sm font-bold bg-slate-100 dark:bg-slate-700 p-1 rounded-full h-7 w-7 flex items-center justify-center"
            >
              ✕
            </button>

            <h3 className="text-base font-black text-slate-800 dark:text-white flex items-center gap-1.5 mb-3">
              <ShieldAlert className="w-4 h-4 text-rose-500" />
              Añadir Contacto de Emergencia
            </h3>

            <form onSubmit={handleSaveContact} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Título / Nombre *</label>
                <input
                  type="text"
                  required
                  placeholder="Ej: Embajada de España"
                  value={contactTitle}
                  onChange={e => setContactTitle(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Teléfono *</label>
                <input
                  type="tel"
                  required
                  placeholder="+81 3-3583-8531"
                  value={contactPhone}
                  onChange={e => setContactPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Dirección (Opcional)</label>
                <input
                  type="text"
                  placeholder="Roppongi, Minato-ku..."
                  value={contactAddress}
                  onChange={e => setContactAddress(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Notas / Indicaciones</label>
                <textarea
                  rows={2}
                  placeholder="Horarios, idioma..."
                  value={contactNotes}
                  onChange={e => setContactNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white rounded-xl font-semibold focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="pt-2 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddContactModal(false)}
                  className="w-1/2 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 font-extrabold"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-2.5 rounded-xl bg-rose-500 hover:bg-rose-600 text-white font-black shadow-sm"
                >
                  Guardar Contacto
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
