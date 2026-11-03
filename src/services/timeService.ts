export interface CityTimeInfo {
  timeStr: string;         // "14:05:22"
  shortTimeStr: string;    // "14:05"
  dateStr: string;         // "Miércoles, 15 de Noviembre"
  kanjiDateStr?: string;   // "11月15日 (水)"
  dayName: string;         // "Miércoles"
  hours: number;           // 14
  minutes: number;         // 5
  seconds: number;         // 22
  isDaytime: boolean;      // true if 06:00 - 18:59
  period: 'madrugada' | 'manana' | 'mediodia' | 'tarde' | 'noche';
  periodLabel: string;     // e.g. "Madrugada 🌙", "Mañana ☕", "Mediodía 🍱", "Tarde 🌇", "Noche 🌃"
  activityStatus: string;  // e.g. "Horario de descanso", "Comercios abiertos"
  timeZoneAbbr: string;    // "CET" or "CEST" / "JST"
}

export interface DualTimeState {
  spain: CityTimeInfo;
  japan: CityTimeInfo;
  diffHours: number;       // usually 7 or 8 hours ahead
  callingSuitability: 'great' | 'acceptable' | 'bad';
  callingSuitabilityLabel: string;
  callingSuitabilityReason: string;
}

const KANJI_DAYS = ['日', '月', '火', '水', '木', '金', '土'];

function getPeriod(hour: number): { period: CityTimeInfo['period']; label: string } {
  if (hour >= 0 && hour < 6) {
    return { period: 'madrugada', label: 'Madrugada 🌙' };
  } else if (hour >= 6 && hour < 13) {
    return { period: 'manana', label: 'Mañana ☕' };
  } else if (hour >= 13 && hour < 16) {
    return { period: 'mediodia', label: 'Mediodía 🍱' };
  } else if (hour >= 16 && hour < 21) {
    return { period: 'tarde', label: 'Tarde 🌇' };
  } else {
    return { period: 'noche', label: 'Noche 🌃' };
  }
}

function getSpainActivity(hour: number): string {
  if (hour >= 23 || hour < 7) return '😴 Mayoría descansando';
  if (hour >= 7 && hour < 9) return '☕ Desayuno & Camino al trabajo';
  if (hour >= 9 && hour < 14) return '💼 Jornada laboral matinal';
  if (hour >= 14 && hour < 16) return '🥘 Almuerzo y sobremesa';
  if (hour >= 16 && hour < 20) return '🛍️ Tarde activa / Comercios abiertos';
  return '🍷 Cena y tiempo libre';
}

function getJapanActivity(hour: number): string {
  if (hour >= 23 || hour < 6) return '😴 Ciudades en calma / Metro cerrado';
  if (hour >= 6 && hour < 9) return '🚆 Hora punta / Konbinis activos';
  if (hour >= 9 && hour < 12) return '🏯 Templos y comercios abiertos';
  if (hour >= 12 && hour < 14) return '🍜 Pausa de ramen / Almuerzo';
  if (hour >= 14 && hour < 18) return '🛍️ Turismo, compras y templos';
  if (hour >= 18 && hour < 21) return '🏮 Izakayas y luces de neón';
  return '🍜 Ramen nocturno / Calma';
}

export function getTimeInfoForZone(date: Date, timeZone: 'Europe/Madrid' | 'Asia/Tokyo'): CityTimeInfo {
  const isJapan = timeZone === 'Asia/Tokyo';

  // Format parts using Intl
  const formatter = new Intl.DateTimeFormat('es-ES', {
    timeZone,
    hour12: false,
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const parts = formatter.formatToParts(date);
  const partMap: Record<string, string> = {};
  for (const part of parts) {
    partMap[part.type] = part.value;
  }

  const hours = parseInt(partMap['hour'] || '0', 10);
  const minutes = parseInt(partMap['minute'] || '0', 10);
  const seconds = parseInt(partMap['second'] || '0', 10);
  const dayNameRaw = partMap['weekday'] || '';
  const dayName = dayNameRaw.charAt(0).toUpperCase() + dayNameRaw.slice(1);
  const day = partMap['day'] || '';
  const month = partMap['month'] || '';
  const year = partMap['year'] || '';

  const pad = (n: number) => n.toString().padStart(2, '0');
  const timeStr = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  const shortTimeStr = `${pad(hours)}:${pad(minutes)}`;
  const dateStr = `${dayName}, ${day} de ${month} ${year}`;

  const { period, label: periodLabel } = getPeriod(hours);
  const isDaytime = hours >= 6 && hours < 18;

  let kanjiDateStr: string | undefined;
  if (isJapan) {
    const jpFormatter = new Intl.DateTimeFormat('ja-JP', {
      timeZone,
      month: 'numeric',
      day: 'numeric',
      weekday: 'narrow'
    });
    const jpParts = jpFormatter.formatToParts(date);
    const m = jpParts.find(p => p.type === 'month')?.value || '';
    const d = jpParts.find(p => p.type === 'day')?.value || '';
    const w = jpParts.find(p => p.type === 'weekday')?.value || KANJI_DAYS[date.getDay()];
    kanjiDateStr = `${m}月${d}日 (${w})`;
  }

  // Timezone abbreviation estimation
  let timeZoneAbbr = 'JST';
  if (!isJapan) {
    // Check if DST (CEST = UTC+2, CET = UTC+1)
    const tzString = new Intl.DateTimeFormat('es-ES', {
      timeZone,
      timeZoneName: 'short'
    }).format(date);
    timeZoneAbbr = tzString.split(' ').pop() || 'CET';
  }

  const activityStatus = isJapan ? getJapanActivity(hours) : getSpainActivity(hours);

  return {
    timeStr,
    shortTimeStr,
    dateStr,
    kanjiDateStr,
    dayName,
    hours,
    minutes,
    seconds,
    isDaytime,
    period,
    periodLabel,
    activityStatus,
    timeZoneAbbr
  };
}

export function getDualTimeData(date: Date = new Date()): DualTimeState {
  const spain = getTimeInfoForZone(date, 'Europe/Madrid');
  const japan = getTimeInfoForZone(date, 'Asia/Tokyo');

  // Exact difference in hours
  // Let's compute difference based on hours and date
  // A clean way is converting date to both epoch representations
  const spDate = new Date(date.toLocaleString('en-US', { timeZone: 'Europe/Madrid' }));
  const jpDate = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Tokyo' }));
  const diffHours = Math.round((jpDate.getTime() - spDate.getTime()) / (1000 * 60 * 60));

  // Determine calling suitability:
  // Is it a good time for someone in Japan to call someone in Spain?
  // Both parties must be awake: Spain between 09:00 and 22:30, Japan between 08:00 and 23:30.
  const spH = spain.hours;
  const jpH = japan.hours;

  let callingSuitability: 'great' | 'acceptable' | 'bad' = 'bad';
  let callingSuitabilityLabel = 'Hora no recomendada';
  let callingSuitabilityReason = 'Uno de los dos países está durmiendo o de madrugada.';

  const isSpainAwake = spH >= 9 && spH < 23;
  const isJapanAwake = jpH >= 8 && jpH < 23;

  if (isSpainAwake && isJapanAwake) {
    // Sweet spot: 11:00-14:00 Spain (18:00-21:00 Japan for +7h, or 19:00-22:00 Japan for +8h)
    if (spH >= 11 && spH <= 15 && jpH >= 18 && jpH <= 23) {
      callingSuitability = 'great';
      callingSuitabilityLabel = '¡Momento Ideal para Llamar! ✨';
      callingSuitabilityReason = 'Tarde relajada en Japón y mediodía en España. Ambos despiertos.';
    } else {
      callingSuitability = 'acceptable';
      callingSuitabilityLabel = 'Horario Aceptable 👍';
      callingSuitabilityReason = 'Ambos países despiertos, aunque alguno puede estar en horario laboral.';
    }
  } else if (!isSpainAwake && isJapanAwake) {
    callingSuitabilityLabel = 'España durmiendo 😴';
    callingSuitabilityReason = `En España son las ${spain.shortTimeStr} (${spain.periodLabel}). Mejor esperar a la tarde nipona.`;
  } else if (isSpainAwake && !isJapanAwake) {
    callingSuitabilityLabel = 'Japón durmiendo 💤';
    callingSuitabilityReason = `En Japón son las ${japan.shortTimeStr} (${japan.periodLabel}). Mejor esperar a que amanezca allí.`;
  }

  return {
    spain,
    japan,
    diffHours,
    callingSuitability,
    callingSuitabilityLabel,
    callingSuitabilityReason
  };
}

export function projectHours(baseHourInJapan: number, diffHours: number = 8): {
  japanHour: number;
  spainHour: number;
  japanFormatted: string;
  spainFormatted: string;
  isSameDay: boolean;
  dayRelativeLabel: string; // e.g. "Mismo día" or "Día anterior en España"
} {
  const jpHour = Math.floor(baseHourInJapan) % 24;
  let spHour = jpHour - diffHours;
  let dayRelativeLabel = 'Mismo día';
  let isSameDay = true;

  if (spHour < 0) {
    spHour += 24;
    dayRelativeLabel = 'Día anterior en España';
    isSameDay = false;
  }

  const pad = (n: number) => n.toString().padStart(2, '0');

  return {
    japanHour: jpHour,
    spainHour: spHour,
    japanFormatted: `${pad(jpHour)}:00`,
    spainFormatted: `${pad(spHour)}:00`,
    isSameDay,
    dayRelativeLabel
  };
}
