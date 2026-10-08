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

  const [phraseCategory, setPhraseCategory] = useState<string>('all');
  const [phraseSearch, setPhraseSearch] = useState<string>('');

  const phraseCategories = [
    { id: 'all', name: 'Todas' },
    { id: 'greetings', name: 'A. Saludos y Cortesía' },
    { id: 'dining_entry', name: 'B. Entrada a Restaurantes' },
    { id: 'ordering', name: 'C. Pedir Comida' },
    { id: 'etiquette_pay', name: 'D. Etiqueta y Pago' },
    { id: 'orientation', name: 'E. Orientación Clave' }
  ];

  const usefulPhrases = [
    // A. Saludos y Cortesía Básica
    { category: 'greetings', categoryName: 'A. Saludos y Cortesía', romaji: 'Ohayō gozaimasu', kanji: 'おはようございます', spanish: 'Buenos días', note: 'Versión formal. Informal con familia o amigos: "Ohayō".' },
    { category: 'greetings', categoryName: 'A. Saludos y Cortesía', romaji: 'Konnichiwa', kanji: 'こんにちは', spanish: 'Buenas tardes / Hola genérico', note: 'Utilizado durante la mayor parte del día hasta el atardecer.' },
    { category: 'greetings', categoryName: 'A. Saludos y Cortesía', romaji: 'Konbanwa', kanji: 'こんばんは', spanish: 'Buenas noches (al saludar)', note: 'Para saludar al llegar a un sitio por la noche.' },
    { category: 'greetings', categoryName: 'A. Saludos y Cortesía', romaji: 'Oyasumi nasai', kanji: 'おやすみなさい', spanish: 'Buenas noches (al despedirse)', note: 'Para despedirse antes de ir a dormir.' },
    { category: 'greetings', categoryName: 'A. Saludos y Cortesía', romaji: 'Arigatō gozaimasu', kanji: 'ありがとうございます', spanish: 'Muchas gracias', note: 'Versión formal e imprescindible en el día a día.' },
    { category: 'greetings', categoryName: 'A. Saludos y Cortesía', romaji: 'Dōmo', kanji: 'どうも', spanish: 'Gracias rápido / De nada informal', note: 'Agradecimiento ágil o saludo breve.' },
    { category: 'greetings', categoryName: 'A. Saludos y Cortesía', romaji: 'Dōitashimashite', kanji: 'どういたしまして', spanish: 'De nada / No hay de qué', note: 'Respuesta educada a un agradecimiento.' },
    { category: 'greetings', categoryName: 'A. Saludos y Cortesía', romaji: 'Sumimasen', kanji: 'すみません', spanish: 'Disculpe / Perdón / Llama atención', note: 'La palabra mágica multitarea en Japón.' },
    { category: 'greetings', categoryName: 'A. Saludos y Cortesía', romaji: 'Gomen nasai', kanji: 'ごめんなさい', spanish: 'Lo siento / Disculpa', note: 'Si has tropezado o cometido un pequeño error involuntario.' },
    { category: 'greetings', categoryName: 'A. Saludos y Cortesía', romaji: 'Hai / Iie', kanji: 'はい / いいえ', spanish: 'Sí / No', note: 'Respuestas afirmativas y negativas básicas.' },

    // B. Entrada y Protocolo en Restaurantes
    { category: 'dining_entry', categoryName: 'B. Entrada a Restaurantes', romaji: 'Irasshaimase!', kanji: 'いらっしゃいませ！', spanish: '¡Bienvenido!', note: 'Os lo gritarán al entrar. No hace falta responder, basta con sonreír o hacer una leve inclinación.' },
    { category: 'dining_entry', categoryName: 'B. Entrada a Restaurantes', romaji: 'Sumimasen!', kanji: 'すみません！', spanish: '¡Disculpe!', note: 'La palabra mágica para llamar al camarero en mesas sin timbre.' },
    { category: 'dining_entry', categoryName: 'B. Entrada a Restaurantes', romaji: 'Nan-mei sama desu ka?', kanji: '何名様ですか？', spanish: '¿Cuántos son?', note: 'Pregunta habitual del camarero al recibiros en la entrada.' },
    { category: 'dining_entry', categoryName: 'B. Entrada a Restaurantes', romaji: 'Yonin desu', kanji: '4人です', spanish: 'Somos 4 personas', note: 'Yon = 4 personas (para el grupo familiar).' },
    { category: 'dining_entry', categoryName: 'B. Entrada a Restaurantes', romaji: 'Oseki wa arimasu ka?', kanji: 'お席はありますか？', spanish: '¿Hay sitio / mesas libres?', note: 'Para consultar si hay mesa disponible al llegar.' },
    { category: 'dining_entry', categoryName: 'B. Entrada a Restaurantes', romaji: 'Kinen-seki o negai shimasu', kanji: '禁煙席をお願いします', spanish: 'Mesa en zona de no fumadores, por favor', note: 'Para asegurar una mesa en espacio libre de humo.' },

    // C. Pedir Comida y Modificaciones
    { category: 'ordering', categoryName: 'C. Pedir Comida', romaji: 'Kore o kudasai', kanji: 'これをください', spanish: 'Quiero esto, por favor', note: 'Señalando directamente la foto o el plato en la carta.' },
    { category: 'ordering', categoryName: 'C. Pedir Comida', romaji: 'Kore to kore o kudasai', kanji: 'これとこれをください', spanish: 'Quiero esto y esto, por favor', note: 'Para pedir dos o más platos señalando en el menú.' },
    { category: 'ordering', categoryName: 'C. Pedir Comida', romaji: 'Eigo no menu wa arimasu ka?', kanji: '英語のメニューはありますか？', spanish: '¿Tienen menú en inglés?', note: 'Muy útil en restaurantes tradicionales.' },
    { category: 'ordering', categoryName: 'C. Pedir Comida', romaji: 'Osusume wa nan desu ka?', kanji: 'おすすめは何ですか？', spanish: '¿Qué me recomienda? / ¿Especialidad?', note: 'Para consultar la especialidad recomendada de la casa.' },
    { category: 'ordering', categoryName: 'C. Pedir Comida', romaji: 'O-mizu o kudasai', kanji: 'お水をください', spanish: 'Agua (fría) por favor', note: 'El agua con hielo suele ser gratuita en casi todos los locales.' },
    { category: 'ordering', categoryName: 'C. Pedir Comida', romaji: 'O-cha o kudasai', kanji: 'お茶をください', spanish: 'Té verde por favor', note: 'Té verde de cortesía disponible en muchos establecimientos.' },
    { category: 'ordering', categoryName: 'C. Pedir Comida', romaji: 'Kodomo-yō no shokki wa arimasu ka?', kanji: '子供用の食器はありますか？', spanish: '¿Tienen cubiertos/platos para niños?', note: 'Práctico para pedir adaptación infantil de vajilla.' },

    // D. Etiqueta en la Mesa y Pago
    { category: 'etiquette_pay', categoryName: 'D. Etiqueta y Pago', romaji: 'Itadakimasu', kanji: 'いただきます', spanish: 'Agradezco estos alimentos', note: 'Expresión sagrada y educada antes de empezar a comer.' },
    { category: 'etiquette_pay', categoryName: 'D. Etiqueta y Pago', romaji: 'Gochisōsama deshita', kanji: 'ごちそうさまでした', spanish: 'Muchas gracias por la comida', note: 'Al terminar de comer: "Estaba delicioso / Gracias por el banquete".' },
    { category: 'etiquette_pay', categoryName: 'D. Etiqueta y Pago', romaji: 'Oishii desu!', kanji: '美味しいです！', spanish: '¡Está riquísimo!', note: 'Elogio amable para los cocineros o personal.' },
    { category: 'etiquette_pay', categoryName: 'D. Etiqueta y Pago', romaji: 'O-kaikei o negai shimasu', kanji: 'お会計をお願いします', spanish: 'La cuenta, por favor', note: 'También se puede indicar haciendo una "X" cruzando los dedos índices.' },
    { category: 'etiquette_pay', categoryName: 'D. Etiqueta y Pago', romaji: 'Kādo wa tsukaemasu ka?', kanji: 'カードは使えますか？', spanish: '¿Puedo pagar con tarjeta?', note: 'Para consultar el pago con tarjeta bancaria.' },
    { category: 'etiquette_pay', categoryName: 'D. Etiqueta y Pago', romaji: 'Genkin de (Kenshin de)', kanji: '現金で', spanish: 'En efectivo', note: 'Para indicar que pagarás en metálico con yenes.' },

    // E. Orientación y Preguntas Clave
    { category: 'orientation', categoryName: 'E. Orientación Clave', romaji: '...wa doko desu ka?', kanji: '〜はどこですか？', spanish: '¿Dónde está...?', note: 'Estructura general para preguntar por lugares (e.g. Eki wa doko desu ka?).' },
    { category: 'orientation', categoryName: 'E. Orientación Clave', romaji: 'Toire wa doko desu ka?', kanji: 'トイレはどこですか？', spanish: '¿Dónde está el baño?', note: 'Frase vital de supervivencia.' },
    { category: 'orientation', categoryName: 'E. Orientación Clave', romaji: 'Kore wa ikura desu ka?', kanji: 'これはいくらですか？', spanish: '¿Cuánto cuesta esto?', note: 'Para consultar el precio de productos o platos.' },
    { category: 'orientation', categoryName: 'E. Orientación Clave', romaji: 'Eigo ga hanasemasu ka?', kanji: '英語が話せますか？', spanish: '¿Habla inglés?', note: 'Para consultar si el interlocutor habla inglés.' }
  ];

  const filteredPhrases = usefulPhrases.filter((p) => {
    const matchesCategory = phraseCategory === 'all' || p.category === phraseCategory;
    const q = phraseSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.romaji.toLowerCase().includes(q) ||
      p.spanish.toLowerCase().includes(q) ||
      p.kanji.includes(q) ||
      p.note.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

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
            <span className="text-[10px] font-black uppercase text-rose-500 bg-rose-50 dark:bg-rose-950/80 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-900 mb-1 inline-block">
              Survival & Dining Japanese Guide
            </span>
            <h2 className="text-sm font-black uppercase text-slate-900 dark:text-white tracking-wider flex items-center gap-2">
              <Languages className="w-4 h-4 text-rose-500" />
              Guía Profunda de Japonés Útil
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Kit de supervivencia lingüística para el día a día, restaurantes, etiqueta en la mesa y orientación.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              value={phraseSearch}
              onChange={(e) => setPhraseSearch(e.target.value)}
              placeholder="Buscar por expresión, español o pronunciación..."
              className="w-full pl-3 pr-8 py-2 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-hidden focus:border-rose-500"
            />
            {phraseSearch && (
              <button
                onClick={() => setPhraseSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category Filter Pills */}
          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {phraseCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setPhraseCategory(cat.id)}
                className={`px-3 py-1.5 rounded-xl text-[11px] font-black shrink-0 whitespace-nowrap min-h-[36px] transition-all active:scale-95 ${
                  phraseCategory === cat.id
                    ? 'bg-rose-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* List of Phrase Cards */}
          <div className="space-y-3 pt-1">
            {filteredPhrases.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                <p className="text-xs font-bold text-slate-400">
                  No se encontraron expresiones para esta búsqueda.
                </p>
              </div>
            ) : (
              filteredPhrases.map((phrase, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-700 p-4 rounded-2xl space-y-1.5 transition-all hover:border-rose-300 dark:hover:border-rose-900"
                >
                  <div className="flex flex-wrap items-center justify-between gap-1 border-b border-slate-200/60 dark:border-slate-800 pb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-black text-rose-600 dark:text-rose-400 tracking-tight">
                        {phrase.romaji}
                      </span>
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500 bg-slate-200/60 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                        {phrase.kanji}
                      </span>
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-950/80 px-2 py-0.5 rounded-full border border-rose-200 dark:border-rose-900">
                      {phrase.categoryName}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pt-0.5">
                    <span className="text-xs font-extrabold text-slate-900 dark:text-slate-100">
                      👉 {phrase.spanish}
                    </span>
                  </div>

                  {phrase.note && (
                    <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-slate-950/40 p-2 rounded-xl border border-slate-100 dark:border-slate-800/80">
                      💡 {phrase.note}
                    </p>
                  )}
                </div>
              ))
            )}
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
