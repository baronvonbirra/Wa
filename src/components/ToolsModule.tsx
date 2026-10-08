import React, { useState } from 'react';
import { Calculator, RefreshCw, ShoppingBag, Languages, Shirt, Train } from 'lucide-react';

export const ToolsModule: React.FC = () => {
  const [jpyAmount, setJpyAmount] = useState<string>('1000');
  const [exchangeRate, setExchangeRate] = useState<number>(160); // 1 EUR = 160 JPY
  const [activeTab, setActiveTab] = useState<'currency' | 'phrases' | 'sizes'>('currency');

  const jpyNum = parseFloat(jpyAmount) || 0;
  const eurVal = (jpyNum / exchangeRate).toFixed(2);

  const handlePreset = (amount: number) => {
    setJpyAmount(amount.toString());
  };

  const handleKeypad = (val: string) => {
    if (val === 'C') {
      setJpyAmount('0');
    } else if (val === 'DEL') {
      setJpyAmount((prev) => (prev.length > 1 ? prev.slice(0, -1) : '0'));
    } else {
      setJpyAmount((prev) => (prev === '0' ? val : prev + val));
    }
  };

  const priceGuide = [
    { label: 'Agua / Refresco en máquina', jpy: '160 ¥', eur: `~${(160 / exchangeRate).toFixed(2)} €` },
    { label: 'Comida Lawson/7-Eleven (Onigiri + bebida)', jpy: '500 ¥', eur: `~${(500 / exchangeRate).toFixed(2)} €` },
    { label: 'Cuenco de Ramen tradicional', jpy: '1.000 ¥ - 1.200 ¥', eur: `~${(1000 / exchangeRate).toFixed(2)} € - ${(1200 / exchangeRate).toFixed(2)} €` },
    { label: 'Menú de restaurante / Tonkotsu', jpy: '2.000 ¥', eur: `~${(2000 / exchangeRate).toFixed(2)} €` },
    { label: 'Viaje en metro urbano', jpy: '180 ¥ - 240 ¥', eur: `~${(180 / exchangeRate).toFixed(2)} € - ${(240 / exchangeRate).toFixed(2)} €` },
    { label: 'Entrada a templo / santuario', jpy: '500 ¥ - 800 ¥', eur: `~${(500 / exchangeRate).toFixed(2)} € - ${(800 / exchangeRate).toFixed(2)} €` }
  ];

  const usefulPhrases = [
    { japanese: 'Sumimasen (すみません)', spanish: 'Disculpe / Por favor / Gracias' },
    { japanese: 'Arigatō gozaimasu (ありがとうございます)', spanish: 'Muchas gracias' },
    { japanese: 'Kore o kudasai (これをください)', spanish: 'Deme esto, por favor' },
    { japanese: 'Ikura desu ka? (いくらですか？)', spanish: '¿Cuánto cuesta?' },
    { japanese: 'Eigo noメニュー wa arimasu ka? (英語のメニューはありますか？)', spanish: '¿Tiene menú en inglés?' },
    { japanese: 'Okaikei o kudasai (お会計をお願いします)', spanish: 'La cuenta, por favor' },
    { japanese: 'Toire wa doko desu ka? (トイレはどこですか？)', spanish: '¿Dónde está el baño?' },
    { japanese: 'Eki wa doko desu ka? (駅はどこですか？)', spanish: '¿Dónde está la estación?' },
    { japanese: 'Kashikomashita (かしこまりました)', spanish: 'Entendido / Con mucho gusto (lo oirás mucho)' },
    { japanese: 'Oishii desu (美味しいです)', spanish: '¡Está delicioso!' }
  ];

  const clothingSizes = [
    { category: 'Calzado Hombre', eu: '42 EU', jp: '27.0 cm', us: '9 US' },
    { category: 'Calzado Hombre', eu: '43 EU', jp: '27.5 cm', us: '9.5 US' },
    { category: 'Calzado Hombre', eu: '44 EU', jp: '28.0 cm', us: '10 US' },
    { category: 'Calzado Mujer', eu: '37 EU', jp: '23.5 cm', us: '6.5 US' },
    { category: 'Calzado Mujer', eu: '38 EU', jp: '24.0 cm', us: '7 US' },
    { category: 'Calzado Mujer', eu: '39 EU', jp: '24.5 cm', us: '7.5 US' },
    { category: 'Ropa General', eu: 'S / M / L europea', jp: 'M / L / XL japonesa (suele tallar 1 talla más pequeña)', us: 'S / M / L' }
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 pt-4 pb-28 font-sans text-slate-800 dark:text-slate-100">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white p-5 rounded-3xl mb-6 shadow-xl border border-slate-800">
        <span className="text-[10px] font-black uppercase text-rose-400 bg-rose-950/80 px-2.5 py-0.5 rounded-full border border-rose-900">
          Módulo Herramientas & Utilidades
        </span>
        <h1 className="text-xl font-black text-white tracking-tight mt-1">
          Conversor de Divisas y Guía de Bolsillo
        </h1>
        <p className="text-xs font-bold text-slate-400 mt-1">
          Cálculo inmediato JPY / EUR offline, frases esenciales y equivalencia de tallas.
        </p>
      </section>

      {/* Navigation Sub-Tabs */}
      <nav className="grid grid-cols-3 gap-2 mb-6">
        <button
          onClick={() => setActiveTab('currency')}
          className={`p-3 rounded-2xl flex flex-col items-center justify-center min-h-[52px] font-black text-xs transition-all active:scale-95 ${
            activeTab === 'currency'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/30'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
          }`}
        >
          <Calculator className="w-4 h-4 mb-1" />
          <span>Divisas (JPY/EUR)</span>
        </button>

        <button
          onClick={() => setActiveTab('phrases')}
          className={`p-3 rounded-2xl flex flex-col items-center justify-center min-h-[52px] font-black text-xs transition-all active:scale-95 ${
            activeTab === 'phrases'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/30'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
          }`}
        >
          <Languages className="w-4 h-4 mb-1" />
          <span>Frases Útiles</span>
        </button>

        <button
          onClick={() => setActiveTab('sizes')}
          className={`p-3 rounded-2xl flex flex-col items-center justify-center min-h-[52px] font-black text-xs transition-all active:scale-95 ${
            activeTab === 'sizes'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/30'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
          }`}
        >
          <Shirt className="w-4 h-4 mb-1" />
          <span>Guía de Tallas</span>
        </button>
      </nav>

      {/* Main Tab Content */}
      {activeTab === 'currency' && (
        <div className="space-y-6">
          {/* Converter Card */}
          <article className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <h2 className="text-sm font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
                <Calculator className="w-4 h-4 text-rose-500" />
                Conversor Dinámico de Yenes a Euros
              </h2>
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-500 dark:text-slate-400">
                <span>1 EUR =</span>
                <input
                  type="number"
                  value={exchangeRate}
                  onChange={(e) => setExchangeRate(parseFloat(e.target.value) || 160)}
                  className="w-16 px-1.5 py-0.5 bg-slate-100 dark:bg-slate-900 border border-slate-300 dark:border-slate-600 rounded-lg text-center font-black text-xs"
                />
                <span>JPY</span>
              </div>
            </div>

            {/* Main Input Display Box */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="bg-slate-900 text-white p-4 rounded-2xl flex flex-col justify-between">
                <span className="text-[10px] font-black text-rose-400 uppercase tracking-wider">
                  Importe en Yenes (¥ JPY)
                </span>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-3xl font-black text-amber-400">¥</span>
                  <input
                    type="number"
                    value={jpyAmount}
                    onChange={(e) => setJpyAmount(e.target.value)}
                    className="w-full text-right bg-transparent text-3xl font-black text-white focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="bg-rose-500 text-white p-4 rounded-2xl flex flex-col justify-between shadow-md shadow-rose-900/20">
                <span className="text-[10px] font-black text-rose-100 uppercase tracking-wider">
                  Equivalencia en Euros (€ EUR)
                </span>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-3xl font-black text-white">€</span>
                  <span className="text-3xl font-black text-white tracking-tight">{eurVal}</span>
                </div>
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div>
              <span className="text-[11px] font-black uppercase text-slate-400 block mb-2">
                Importes Frecuentes
              </span>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {[100, 500, 1000, 3000, 5000, 10000].map((amt) => (
                  <button
                    key={amt}
                    onClick={() => handlePreset(amt)}
                    className="py-2 px-1 rounded-xl bg-slate-100 dark:bg-slate-900 hover:bg-rose-600 hover:text-white dark:hover:bg-rose-600 font-black text-xs border border-slate-200 dark:border-slate-700 transition-all min-h-[40px] active:scale-95"
                  >
                    ¥ {amt.toLocaleString()}
                  </button>
                ))}
              </div>
            </div>

            {/* Numeric On-Screen Keypad */}
            <div>
              <span className="text-[11px] font-black uppercase text-slate-400 block mb-2">
                Teclado Numérico
              </span>
              <div className="grid grid-cols-3 gap-2">
                {['1', '2', '3', '4', '5', '6', '7', '8', '9', 'C', '0', 'DEL'].map((key) => (
                  <button
                    key={key}
                    onClick={() => handleKeypad(key)}
                    className={`py-3 rounded-2xl font-black text-sm transition-all min-h-[48px] active:scale-95 ${
                      key === 'C'
                        ? 'bg-amber-500 text-white'
                        : key === 'DEL'
                        ? 'bg-slate-800 text-white'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white hover:bg-slate-200'
                    }`}
                  >
                    {key}
                  </button>
                ))}
              </div>
            </div>
          </article>

          {/* Price Reference Table */}
          <article className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-sm space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 dark:border-slate-700 pb-2">
              <ShoppingBag className="w-4 h-4 text-amber-500" />
              <h2 className="text-xs font-black uppercase text-slate-400 tracking-wider">
                Tabla de Referencia Rápida de Precios en Japón
              </h2>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {priceGuide.map((item, idx) => (
                <div key={idx} className="py-2.5 flex items-center justify-between text-xs font-bold gap-2">
                  <span className="text-slate-700 dark:text-slate-200">{item.label}</span>
                  <div className="text-right shrink-0">
                    <span className="text-rose-600 dark:text-rose-400 font-black block">{item.jpy}</span>
                    <span className="text-[11px] text-slate-400 font-medium">{item.eur}</span>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </div>
      )}

      {activeTab === 'phrases' && (
        <section className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
            <h2 className="text-sm font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
              <Languages className="w-4 h-4 text-rose-500" />
              Expresiones Japonesas Imprescindibles
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Frases clave con pronunciación sencilla para interactuar en restaurantes, tiendas y transporte.
            </p>
          </div>

          <div className="space-y-3">
            {usefulPhrases.map((phrase, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 p-3.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-1"
              >
                <span className="text-sm font-black text-rose-600 dark:text-rose-400">
                  {phrase.japanese}
                </span>
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                  {phrase.spanish}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTab === 'sizes' && (
        <section className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
            <h2 className="text-sm font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
              <Shirt className="w-4 h-4 text-rose-500" />
              Tabla de Equivalencia de Tallas
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Referencia rápida para calzado y vestimenta al comprar en tiendas como Uniqlo o Gu.
            </p>
          </div>

          <div className="space-y-3">
            {clothingSizes.map((size, idx) => (
              <div
                key={idx}
                className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 p-3.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <span className="text-xs font-black text-slate-900 dark:text-white uppercase">
                  {size.category}
                </span>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-600 dark:text-slate-300">
                  <span className="bg-slate-200 dark:bg-slate-800 px-2.5 py-1 rounded-xl">
                    EU: {size.eu}
                  </span>
                  <span className="bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 px-2.5 py-1 rounded-xl border border-rose-200 dark:border-rose-900">
                    Japón: {size.jp}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
