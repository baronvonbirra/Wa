import React, { useEffect, useState } from 'react';
import {
  resolveCoordinates,
  fetchCurrentWeather,
  fetchEstimatedWeather,
  CurrentWeatherInfo,
  EstimatedWeatherInfo,
  WeatherCoordinates
} from '../services/weatherService';
import { Accommodation, DayItinerary } from '../types/itinerary';
import {
  Sun,
  Snowflake,
  Wind,
  CloudSun,
  Cloud,
  CloudRain,
  Thermometer,
  Calendar,
  Building2,
  RefreshCw,
  Droplets,
  Radio
} from 'lucide-react';

interface WeatherWidgetProps {
  day: DayItinerary;
  accommodation?: Accommodation | null;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ day, accommodation }) => {
  const [currentWeather, setCurrentWeather] = useState<CurrentWeatherInfo | null>(null);
  const [estimatedWeather, setEstimatedWeather] = useState<EstimatedWeatherInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [coords, setCoords] = useState<WeatherCoordinates>(() =>
    resolveCoordinates(day.location, accommodation?.id)
  );

  const getWeatherIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Sun':
        return Sun;
      case 'Snowflake':
        return Snowflake;
      case 'Wind':
        return Wind;
      case 'CloudSun':
        return CloudSun;
      case 'CloudRain':
        return CloudRain;
      default:
        return Cloud;
    }
  };

  const loadWeather = async (forceRefresh = false) => {
    setLoading(true);
    const resolvedCoords = resolveCoordinates(day.location, accommodation?.id);
    setCoords(resolvedCoords);

    try {
      if (forceRefresh) {
        // Clear cache keys for this coordinate/day
        try {
          const currKey = `wa_weather_cache_v1_curr_${resolvedCoords.latitude.toFixed(3)}_${resolvedCoords.longitude.toFixed(3)}`;
          const estKey = `wa_weather_cache_v1_est_${day.date}_${resolvedCoords.latitude.toFixed(3)}_${resolvedCoords.longitude.toFixed(3)}`;
          localStorage.removeItem(currKey);
          localStorage.removeItem(estKey);
        } catch {
          // ignore
        }
      }

      const [curr, est] = await Promise.all([
        fetchCurrentWeather(resolvedCoords).catch(() => null),
        fetchEstimatedWeather(resolvedCoords, day.date).catch(() => null)
      ]);

      if (curr) setCurrentWeather(curr);
      if (est) setEstimatedWeather(est);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadWeather();
  }, [day.date, day.location, accommodation?.id]);

  const CurrentIcon = getWeatherIcon(currentWeather?.iconName);
  const EstimatedIcon = getWeatherIcon(estimatedWeather?.iconName);

  return (
    <section className="bg-gradient-to-br from-slate-900 via-sky-950 to-slate-900 border border-sky-600/40 text-white p-4 sm:p-5 rounded-3xl shadow-xl mb-6 space-y-4 relative overflow-hidden">
      {/* Top Bar: Location & Hotel context */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-sky-800/40">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center border border-sky-400/30 shrink-0">
            <Radio className="w-4 h-4 text-sky-300 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] font-black uppercase tracking-wider text-sky-300">
                Estación Meteorológica Real
              </span>
              <span className="text-[10px] bg-sky-500/20 border border-sky-400/40 text-sky-200 px-2 py-0.5 rounded-full font-bold">
                {coords.locationName}
              </span>
            </div>
            {accommodation && (
              <p className="text-[11px] text-slate-300 font-medium flex items-center gap-1 mt-0.5">
                <Building2 className="w-3 h-3 text-amber-400 shrink-0" />
                <span>Base de alojamiento: {accommodation.name}</span>
              </p>
            )}
          </div>
        </div>

        <button
          onClick={() => loadWeather(true)}
          disabled={loading}
          className="self-end sm:self-center px-2.5 py-1 rounded-xl bg-sky-900/60 hover:bg-sky-800/80 border border-sky-700/60 text-sky-200 text-[10px] font-black flex items-center gap-1.5 transition-all active:scale-95 disabled:opacity-50"
          title="Actualizar datos meteorológicos reales"
        >
          <RefreshCw className={`w-3 h-3 text-sky-300 ${loading ? 'animate-spin' : ''}`} />
          <span>{loading ? 'Consultando...' : 'Actualizar'}</span>
        </button>
      </div>

      {/* Main Grid: Dual Weather Cards (Current Live vs Date Estimation) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Card 1: Current Live Weather */}
        <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wide text-sky-400">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Clima Actual (En Directo)</span>
            </div>
            {currentWeather?.updatedAt && (
              <span className="text-[9px] text-slate-400 font-medium">
                Hoy • {currentWeather.updatedAt}
              </span>
            )}
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-300">
                <CurrentIcon className="w-7 h-7 text-sky-300" />
              </div>
              <div>
                <span className="text-2xl font-black text-white">
                  {currentWeather ? `${currentWeather.temperature}°C` : '--°C'}
                </span>
                <span className="text-[11px] font-bold text-slate-300 block line-clamp-1">
                  {currentWeather?.condition || 'Cargando clima...'}
                </span>
              </div>
            </div>

            <div className="text-right space-y-0.5 text-[10px] text-slate-400 font-semibold">
              {currentWeather?.apparentTemperature != null && (
                <div>Sensación: <span className="text-white font-bold">{currentWeather.apparentTemperature}°C</span></div>
              )}
              {currentWeather?.humidity != null && (
                <div className="flex items-center justify-end gap-1">
                  <Droplets className="w-3 h-3 text-sky-400" />
                  <span>{currentWeather.humidity}% hum.</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Card 2: Date Estimation Weather */}
        <div className="bg-sky-950/70 border border-sky-800/60 rounded-2xl p-3.5 space-y-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wide text-amber-300">
              <Calendar className="w-3.5 h-3.5 text-amber-400" />
              <span>Estimación para el {day.shortDate}</span>
            </div>
            <span className="text-[9px] bg-amber-400/20 text-amber-200 border border-amber-400/30 px-1.5 py-0.5 rounded-md font-bold">
              {estimatedWeather?.source === 'forecast'
                ? 'Pronóstico directo'
                : 'Histórico meteorológico real'}
            </span>
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-300">
                <EstimatedIcon className="w-7 h-7 text-amber-300" />
              </div>
              <div>
                <span className="text-xl font-black text-amber-200">
                  {estimatedWeather
                    ? `${estimatedWeather.tempMin}°C / ${estimatedWeather.tempMax}°C`
                    : '--°C'}
                </span>
                <span className="text-[11px] font-bold text-sky-100 block line-clamp-1">
                  {estimatedWeather?.condition || 'Calculando estimación...'}
                </span>
              </div>
            </div>

            {estimatedWeather?.precipitationProbability != null && (
              <div className="text-right text-[10px] font-semibold text-sky-200">
                <div className="text-slate-400 text-[9px] uppercase font-bold">Lluvia/Nieve</div>
                <div className="text-amber-300 font-black text-xs">
                  {estimatedWeather.precipitationProbability}% prob.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Dynamic Recommendation Box */}
      {estimatedWeather?.clothingRecommendation && (
        <div className="bg-slate-900/90 border border-sky-800/50 rounded-2xl px-3.5 py-2.5 text-xs font-medium text-sky-200 flex items-start gap-2">
          <span className="text-sm shrink-0">💡</span>
          <div>
            <span className="font-bold text-white">Recomendación para este día: </span>
            <span>{estimatedWeather.clothingRecommendation}</span>
          </div>
        </div>
      )}
    </section>
  );
};
