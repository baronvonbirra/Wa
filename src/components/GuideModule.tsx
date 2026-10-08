import React, { useState } from 'react';
import { ACCOMMODATIONS } from '../data/tripData';
import { EMERGENCY_CONTACTS, TRANSPORT_NOTES } from '../data/guideData';
import { JapaneseAddressModal } from './JapaneseAddressModal';
import { Accommodation } from '../types/itinerary';
import {
  Building,
  MapPin,
  Train,
  Calendar,
  Phone,
  ShieldAlert,
  Ambulance,
  Building2,
  PhoneCall,
  CreditCard,
  Truck
} from 'lucide-react';

export const GuideModule: React.FC = () => {
  const [selectedAccommodation, setSelectedAccommodation] = useState<Accommodation | null>(null);
  const [activeGuideTab, setActiveGuideTab] = useState<'hotels' | 'emergencies' | 'transport'>('hotels');

  const getContactIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert':
        return ShieldAlert;
      case 'Ambulance':
        return Ambulance;
      case 'Building2':
        return Building2;
      case 'PhoneCall':
        return PhoneCall;
      default:
        return Phone;
    }
  };

  const getTransportIcon = (iconName: string) => {
    switch (iconName) {
      case 'CreditCard':
        return CreditCard;
      case 'Truck':
        return Truck;
      case 'Train':
        return Train;
      default:
        return Train;
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 pt-4 pb-28 font-sans text-slate-800 dark:text-slate-100">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white p-5 rounded-3xl mb-6 shadow-xl border border-slate-800">
        <span className="text-[10px] font-black uppercase text-rose-400 bg-rose-950/80 px-2.5 py-0.5 rounded-full border border-rose-900">
          Módulo Guía & Recursos
        </span>
        <h1 className="text-xl font-black text-white tracking-tight mt-1">
          Directorio de Alojamientos y Emergencias
        </h1>
        <p className="text-xs font-bold text-slate-400 mt-1">
          Consulta rápida 100% offline para taxis, urgencias médicas y transporte en Japón.
        </p>
      </section>

      {/* Sub-Tabs Selector */}
      <nav className="grid grid-cols-3 gap-2 mb-6">
        <button
          onClick={() => setActiveGuideTab('hotels')}
          className={`p-3 rounded-2xl flex flex-col items-center justify-center min-h-[52px] font-black text-xs transition-all active:scale-95 ${
            activeGuideTab === 'hotels'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/30'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
          }`}
        >
          <Building className="w-4 h-4 mb-1" />
          <span>Alojamientos</span>
        </button>

        <button
          onClick={() => setActiveGuideTab('emergencies')}
          className={`p-3 rounded-2xl flex flex-col items-center justify-center min-h-[52px] font-black text-xs transition-all active:scale-95 ${
            activeGuideTab === 'emergencies'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/30'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
          }`}
        >
          <Phone className="w-4 h-4 mb-1" />
          <span>Emergencias</span>
        </button>

        <button
          onClick={() => setActiveGuideTab('transport')}
          className={`p-3 rounded-2xl flex flex-col items-center justify-center min-h-[52px] font-black text-xs transition-all active:scale-95 ${
            activeGuideTab === 'transport'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/30'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
          }`}
        >
          <Train className="w-4 h-4 mb-1" />
          <span>Transporte</span>
        </button>
      </nav>

      {/* Section Content */}
      {activeGuideTab === 'hotels' && (
        <section className="space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xs font-black uppercase text-slate-400 tracking-wider">
              Hoteles y Cottages ({ACCOMMODATIONS.length})
            </h2>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 dark:bg-amber-950 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-900">
              Muestra a Taxista / Recepción
            </span>
          </div>

          <div className="space-y-4">
            {ACCOMMODATIONS.map((acc) => (
              <article
                key={acc.id}
                className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-xs space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 border-b border-slate-100 dark:border-slate-700 pb-3">
                  <div>
                    <h3 className="text-base font-black text-slate-900 dark:text-white">
                      {acc.name}
                    </h3>
                    <p className="text-sm font-black text-rose-600 dark:text-rose-400 mt-0.5">
                      {acc.kanjiName}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedAccommodation(acc)}
                    className="min-h-[48px] px-4 py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-black text-xs rounded-2xl flex items-center justify-center gap-1.5 shadow-sm transition-all shrink-0"
                  >
                    <MapPin className="w-4 h-4" />
                    <span>Ver dirección grande</span>
                  </button>
                </div>

                {/* Address Box in Kanji */}
                <div className="bg-amber-50/80 dark:bg-slate-900/60 border border-amber-200 dark:border-amber-800/40 rounded-2xl p-3 text-xs font-extrabold text-slate-800 dark:text-amber-100 leading-relaxed">
                  {acc.japaneseAddress}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
                  <div className="flex items-center gap-2">
                    <Train className="w-4 h-4 text-amber-500 shrink-0" />
                    <span>Estación: <strong>{acc.nearestStation}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-emerald-500 shrink-0" />
                    <span>Fechas: <strong>{acc.check_in}</strong> al <strong>{acc.check_out}</strong></span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeGuideTab === 'emergencies' && (
        <section className="space-y-4">
          <div className="pb-2 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xs font-black uppercase text-slate-400 tracking-wider">
              Teléfonos de Asistencia Directa en Japón
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EMERGENCY_CONTACTS.map((contact) => {
              const Icon = getContactIcon(contact.iconName);

              return (
                <article
                  key={contact.id}
                  className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-xs flex flex-col justify-between space-y-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center border border-rose-200 dark:border-rose-900">
                        <Icon className="w-5 h-5" />
                      </div>
                      {contact.badge && (
                        <span className="text-[10px] font-black uppercase bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-900">
                          {contact.badge}
                        </span>
                      )}
                    </div>

                    <h3 className="text-base font-black text-slate-900 dark:text-white">
                      {contact.title}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                      {contact.description}
                    </p>
                  </div>

                  <a
                    href={`tel:${contact.number}`}
                    className="min-h-[48px] w-full bg-rose-600 hover:bg-rose-700 active:scale-95 text-white font-black text-sm rounded-2xl flex items-center justify-center gap-2 shadow-md shadow-rose-900/20 transition-all"
                  >
                    <Phone className="w-4 h-4" />
                    <span>Llamar al {contact.number}</span>
                  </a>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {activeGuideTab === 'transport' && (
        <section className="space-y-4">
          <div className="pb-2 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xs font-black uppercase text-slate-400 tracking-wider">
              Pautas de Transporte y Movilidad
            </h2>
          </div>

          <div className="space-y-4">
            {TRANSPORT_NOTES.map((note) => {
              const Icon = getTransportIcon(note.iconName);

              return (
                <article
                  key={note.id}
                  className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-xs space-y-3"
                >
                  <div className="flex items-center gap-3 border-b border-slate-100 dark:border-slate-700 pb-3">
                    <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 border border-amber-200 dark:border-amber-900">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-black text-slate-900 dark:text-white">
                        {note.title}
                      </h3>
                      <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                        {note.summary}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300 font-medium">
                    {note.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-rose-500 font-black">•</span>
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>
      )}

      {/* Japanese Address Modal */}
      <JapaneseAddressModal
        accommodation={selectedAccommodation}
        onClose={() => setSelectedAccommodation(null)}
      />
    </div>
  );
};
