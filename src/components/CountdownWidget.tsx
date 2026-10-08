import React, { useState, useEffect } from 'react';
import { Timer, Calendar, Lightbulb } from 'lucide-react';
import { LearnInfo } from '../types/itinerary';
import { AprenderModal } from './AprenderModal';

export const DAY_20_FLIGHT_LEARN_INFO: LearnInfo = {
  title: '¡Despegue desde Málaga! Rumbo al País del Sol Naciente',
  subtitle: 'Día 20 de Diciembre: Málaga (AGP) ✈️ Tokio (HND)',
  summary: 'Damos el pistoletazo de salida al gran viaje familiar. Dejamos Málaga para volar hacia el archipiélago japonés.',
  pills: [
    {
      label: 'Dato Geográfico',
      text: 'Aunque siempre vemos a Japón como una gran isla en los mapas, ¡en realidad es un archipiélago formado por más de 14.000 islas! Las 4 principales (Honshu, Hokkaido, Kyushu y Shikoku) concentran el 97% del territorio.',
      type: 'geography'
    },
    {
      label: 'La Obsesión por la Puntualidad',
      text: 'El retraso medio anual del Shinkansen (tren bala) es de apenas 20 segundos. Si un tren se retrasa más de 5 minutos, la compañía ferroviaria expide un "Certificado Oficial de Retraso" para que los pasajeros se justifiquen en el trabajo o el colegio.',
      type: 'cultural'
    },
    {
      label: 'El Misterio de las Máquinas Expendedoras (Jidōhanbaiki)',
      text: 'Hay más de 4 millones de máquinas en todo el país (una por cada 30 habitantes). En pleno invierno podréis comprar latas de café o té hirviendo directamente de la máquina (las distinguiréis porque la etiqueta del precio es roja en lugar de azul).',
      type: 'funFact'
    },
    {
      label: '¿Dónde están las papeleras?',
      text: 'Os llamará la atención que no hay papeleras en la calle. Tras los atentados del metro en 1995 se retiraron por seguridad. Los japoneses guardan su basura en la mochila y la tiran en casa o en los cubos situados junto a las tiendas de conveniencia (Konbini como 7-Eleven o FamilyMart).',
      type: 'cultural'
    },
    {
      label: 'Dato Gracioso / Etiqueta',
      text: 'Hablar por teléfono en el metro o tren se considera de muy mala educación (Meiwaku). Veréis vagones con decenas de personas en absoluto y respetuoso silencio.',
      type: 'funFact'
    }
  ]
};

interface CountdownWidgetProps {
  onOpenLearnModal?: (info: LearnInfo) => void;
}

export const CountdownWidget: React.FC<CountdownWidgetProps> = ({ onOpenLearnModal }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Target date: 20 de Diciembre de 2026 a las 13:00 CET (Salida Málaga AGP)
  const targetDate = new Date('2026-12-20T13:00:00+01:00');

  const calculateTimeLeft = () => {
    const now = new Date();
    const difference = targetDate.getTime() - now.getTime();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
      isPast: false
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOpenLearn = () => {
    if (onOpenLearnModal) {
      onOpenLearnModal(DAY_20_FLIGHT_LEARN_INFO);
    } else {
      setIsModalOpen(true);
    }
  };

  if (timeLeft.isPast) {
    return (
      <>
        <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-3.5 rounded-2xl flex items-center justify-between shadow-md mb-4 border border-emerald-500/30">
          <div className="flex items-center gap-2">
            <Calendar className="w-5 h-5 text-emerald-200" />
            <span className="text-xs font-black uppercase tracking-wider">¡El viaje ha comenzado! ✈️🇯🇵</span>
          </div>

          <button
            onClick={handleOpenLearn}
            className="px-3 py-1.5 bg-white text-emerald-800 hover:bg-emerald-50 rounded-xl font-black text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
          >
            <Lightbulb className="w-4 h-4 text-emerald-600" />
            <span>¡Aprender! 💡</span>
          </button>
        </div>

        <AprenderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          learnInfo={DAY_20_FLIGHT_LEARN_INFO}
        />
      </>
    );
  }

  return (
    <>
      <div className="bg-gradient-to-r from-rose-950/90 via-slate-900 to-slate-900 border-2 border-rose-500/30 text-white p-3.5 rounded-2xl shadow-lg mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <Timer className="w-5 h-5 text-rose-400 shrink-0 animate-pulse" />
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-rose-300 block">
              Cuenta Atrás hasta el Despegue (Málaga AGP)
            </span>
            <span className="text-xs font-bold text-slate-300">
              20 Dic 2026 • 13:00 CET
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2 self-center sm:self-auto">
          <div className="flex items-center gap-1.5">
            <div className="bg-slate-800/90 border border-slate-700/80 px-2.5 py-1 rounded-xl text-center min-w-[44px]">
              <span className="text-sm font-black text-amber-400 block leading-tight">{timeLeft.days}</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase">Días</span>
            </div>
            <span className="text-xs font-black text-rose-400">:</span>
            <div className="bg-slate-800/90 border border-slate-700/80 px-2.5 py-1 rounded-xl text-center min-w-[40px]">
              <span className="text-sm font-black text-white block leading-tight">{timeLeft.hours}</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase">Horas</span>
            </div>
            <span className="text-xs font-black text-rose-400">:</span>
            <div className="bg-slate-800/90 border border-slate-700/80 px-2.5 py-1 rounded-xl text-center min-w-[40px]">
              <span className="text-sm font-black text-white block leading-tight">{timeLeft.minutes}</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase">Min</span>
            </div>
            <span className="text-xs font-black text-rose-400">:</span>
            <div className="bg-slate-800/90 border border-slate-700/80 px-2.5 py-1 rounded-xl text-center min-w-[40px]">
              <span className="text-sm font-black text-rose-400 block leading-tight">{timeLeft.seconds}</span>
              <span className="text-[9px] font-bold text-slate-400 uppercase">Seg</span>
            </div>
          </div>

          <button
            onClick={handleOpenLearn}
            className="px-3 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-black text-xs flex items-center gap-1 shadow-md shadow-rose-950 active:scale-95 transition-all border border-rose-400/40 shrink-0 ml-1"
            title="Ver curiosidades del viaje y cultura japonesa"
          >
            <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
            <span>¡Aprender!</span>
          </button>
        </div>
      </div>

      <AprenderModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        learnInfo={DAY_20_FLIGHT_LEARN_INFO}
      />
    </>
  );
};
