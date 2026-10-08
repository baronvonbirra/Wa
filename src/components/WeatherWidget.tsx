import React from 'react';
import { WEATHER_DATA } from '../data/tripData';
import { Sun, Snowflake, Wind, CloudSun, Cloud, Thermometer } from 'lucide-react';

interface WeatherWidgetProps {
  locationKey: string;
}

export const WeatherWidget: React.FC<WeatherWidgetProps> = ({ locationKey }) => {
  const weather = WEATHER_DATA[locationKey] || WEATHER_DATA['Tokyo'];

  const getWeatherIcon = (iconName: string) => {
    switch (iconName) {
      case 'Sun':
        return Sun;
      case 'Snowflake':
        return Snowflake;
      case 'Wind':
        return Wind;
      case 'CloudSun':
        return CloudSun;
      default:
        return Cloud;
    }
  };

  const Icon = getWeatherIcon(weather.iconName);

  return (
    <div className="bg-gradient-to-r from-sky-900/90 to-slate-900 border border-sky-700/50 text-white p-4 rounded-3xl shadow-md mb-4 space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-sky-500/20 text-sky-300 flex items-center justify-center border border-sky-400/30 shrink-0">
            <Icon className="w-5 h-5 text-sky-300 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase tracking-wider text-sky-300 block">
              Clima Contextual ({weather.location})
            </span>
            <span className="text-xs font-black text-white">
              {weather.condition}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 bg-slate-800/80 px-3 py-1.5 rounded-2xl border border-slate-700">
          <Thermometer className="w-4 h-4 text-amber-400 shrink-0" />
          <span className="text-xs font-black text-amber-300">{weather.temp}</span>
        </div>
      </div>

      <div className="bg-sky-950/60 border border-sky-800/40 rounded-xl px-3 py-2 text-[11px] font-bold text-sky-200">
        💡 <span className="text-white">Recomendación:</span> {weather.clothingRecommendation}
      </div>
    </div>
  );
};
