import React, { useState, useEffect } from 'react';
import { Calculator, ShoppingBag, Languages, Shirt, Volume2, VolumeX, Sparkles, Search, Check } from 'lucide-react';

export interface Phrase {
  id: string;
  category: 'greetings' | 'dining' | 'shopping' | 'orientation' | 'kawaii';
  categoryName: string;
  romaji: string;
  phonetic: string;
  kanji: string;
  spanish: string;
  note?: string;
}

export const JAPANESE_PHRASES: Phrase[] = [
  // Categoría 1: Saludos y Cortesía
  {
    id: 'g-1',
    category: 'greetings',
    categoryName: '1. Saludos y Cortesía',
    romaji: 'Ohayō gozaimasu',
    phonetic: 'Ohayoo gozaimas',
    kanji: 'おはようございます',
    spanish: '¡Buenos días!',
    note: 'Muy educado. Con familiares o amigos podéis decir sólo "Ohayō".'
  },
  {
    id: 'g-2',
    category: 'greetings',
    categoryName: '1. Saludos y Cortesía',
    romaji: 'Konnichiwa',
    phonetic: 'Konnichiwa',
    kanji: 'こんにちは',
    spanish: 'Buenas tardes / Hola.',
    note: 'Hola genérico para la mayor parte del día.'
  },
  {
    id: 'g-3',
    category: 'greetings',
    categoryName: '1. Saludos y Cortesía',
    romaji: 'Konbanwa',
    phonetic: 'Kombanwa',
    kanji: 'こんばんは',
    spanish: 'Buenas noches (al llegar a un sitio).'
  },
  {
    id: 'g-4',
    category: 'greetings',
    categoryName: '1. Saludos y Cortesía',
    romaji: 'Oyasumi nasai',
    phonetic: 'Oyasumi nasai',
    kanji: 'おやすみなさい',
    spanish: 'Buenas noches (al despedirse para dormir).'
  },
  {
    id: 'g-5',
    category: 'greetings',
    categoryName: '1. Saludos y Cortesía',
    romaji: 'Arigatō gozaimasu',
    phonetic: 'Arigatoo gozaimas',
    kanji: 'ありがとうございます',
    spanish: 'Muchas gracias (muy educado).'
  },
  {
    id: 'g-6',
    category: 'greetings',
    categoryName: '1. Saludos y Cortesía',
    romaji: 'Dōmo arigatō',
    phonetic: 'Doomoo arigatoo',
    kanji: 'どうもありがとう',
    spanish: 'Muchas gracias (informal).'
  },
  {
    id: 'g-7',
    category: 'greetings',
    categoryName: '1. Saludos y Cortesía',
    romaji: 'Dōitashimashite',
    phonetic: 'Dooitashimashite',
    kanji: 'どういたしまして',
    spanish: 'De nada / No hay de qué.'
  },
  {
    id: 'g-8',
    category: 'greetings',
    categoryName: '1. Saludos y Cortesía',
    romaji: 'Sumimasen',
    phonetic: 'Sumimasen',
    kanji: 'すみません',
    spanish: 'Disculpe / Perdón / ¡Oiga! (para llamar la atención).',
    note: 'La palabra mágica multitarea en Japón.'
  },
  {
    id: 'g-9',
    category: 'greetings',
    categoryName: '1. Saludos y Cortesía',
    romaji: 'Gomen nasai',
    phonetic: 'Gomen nasai',
    kanji: 'ごめんなさい',
    spanish: 'Lo siento mucho.'
  },
  {
    id: 'g-10',
    category: 'greetings',
    categoryName: '1. Saludos y Cortesía',
    romaji: 'Hai / Iie',
    phonetic: 'Jai / Iie',
    kanji: 'はい / いいえ',
    spanish: 'Sí / No.'
  },
  {
    id: 'g-11',
    category: 'greetings',
    categoryName: '1. Saludos y Cortesía',
    romaji: 'Yoroshiku onegai shimasu',
    phonetic: 'Yoroshku onegai shimas',
    kanji: 'よろしくお願いします',
    spanish: 'Encantado de conocerte / Por favor, cuida de mí.'
  },

  // Categoría 2: Restaurantes y Gastronomía
  {
    id: 'd-1',
    category: 'dining',
    categoryName: '2. Restaurantes y Gastronomía',
    romaji: 'Irasshaimase!',
    phonetic: 'Irashaimase!',
    kanji: 'いらっしゃいませ！',
    spanish: '¡Bienvenido! (escuchado al entrar).',
    note: 'Saludo entusiasta del personal. No exige respuesta oral.'
  },
  {
    id: 'd-2',
    category: 'dining',
    categoryName: '2. Restaurantes y Gastronomía',
    romaji: 'Yonin desu',
    phonetic: 'Yonin des',
    kanji: '4人です',
    spanish: 'Somos 4 personas.'
  },
  {
    id: 'd-3',
    category: 'dining',
    categoryName: '2. Restaurantes y Gastronomía',
    romaji: 'Kinen-seki o onegai shimasu',
    phonetic: 'Kinenseki o onegai shimas',
    kanji: '禁煙席をお願いします',
    spanish: 'Mesa para no fumadores, por favor.'
  },
  {
    id: 'd-4',
    category: 'dining',
    categoryName: '2. Restaurantes y Gastronomía',
    romaji: 'Eigo no menyū wa arimasu ka?',
    phonetic: 'Eigo no menyuu wa arimas ka?',
    kanji: '英語のメニューはありますか？',
    spanish: '¿Tienen menú en inglés?'
  },
  {
    id: 'd-5',
    category: 'dining',
    categoryName: '2. Restaurantes y Gastronomía',
    romaji: 'Kore o kudasai',
    phonetic: 'Kore o kudasai',
    kanji: 'これをください',
    spanish: 'Quiero esto, por favor (señalando).'
  },
  {
    id: 'd-6',
    category: 'dining',
    categoryName: '2. Restaurantes y Gastronomía',
    romaji: 'Kore to kore o onegai shimasu',
    phonetic: 'Kore to kore o onegai shimas',
    kanji: 'これとこれをお願いします',
    spanish: 'Esto y esto, por favor.'
  },
  {
    id: 'd-7',
    category: 'dining',
    categoryName: '2. Restaurantes y Gastronomía',
    romaji: 'Osusume wa nan desu ka?',
    phonetic: 'Osusme wa nan des ka?',
    kanji: 'おすすめは何ですか？',
    spanish: '¿Qué nos recomienda?'
  },
  {
    id: 'd-8',
    category: 'dining',
    categoryName: '2. Restaurantes y Gastronomía',
    romaji: 'O-mizu o kudasai',
    phonetic: 'Omizu o kudasai',
    kanji: 'お水をください',
    spanish: 'Agua fría por favor.'
  },
  {
    id: 'd-9',
    category: 'dining',
    categoryName: '2. Restaurantes y Gastronomía',
    romaji: 'O-cha o kudasai',
    phonetic: 'Ocha o kudasai',
    kanji: 'お茶をください',
    spanish: 'Té verde por favor.'
  },
  {
    id: 'd-10',
    category: 'dining',
    categoryName: '2. Restaurantes y Gastronomía',
    romaji: 'Kodomo-yō no shokki wa arimasu ka?',
    phonetic: 'Kodomoyoo no shokki wa arimas ka?',
    kanji: '子供用の食器はありますか？',
    spanish: '¿Tienen cubiertos/platos para niños?'
  },
  {
    id: 'd-11',
    category: 'dining',
    categoryName: '2. Restaurantes y Gastronomía',
    romaji: 'Itadakimasu',
    phonetic: 'Itadakimas',
    kanji: 'いただきます',
    spanish: '¡Buen provecho! (antes de comer).'
  },
  {
    id: 'd-12',
    category: 'dining',
    categoryName: '2. Restaurantes y Gastronomía',
    romaji: 'Oishii desu!',
    phonetic: 'Oishii des!',
    kanji: '美味しいです！',
    spanish: '¡Está riquísimo!'
  },
  {
    id: 'd-13',
    category: 'dining',
    categoryName: '2. Restaurantes y Gastronomía',
    romaji: 'Gochisōsama deshita',
    phonetic: 'Gochisoosama deshita',
    kanji: 'ごちそうさまでした',
    spanish: 'Gracias por la comida (al terminar).'
  },
  {
    id: 'd-14',
    category: 'dining',
    categoryName: '2. Restaurantes y Gastronomía',
    romaji: 'O-kaikei o onegai shimasu',
    phonetic: 'Okaikei o onegai shimas',
    kanji: 'お会計をお願いします',
    spanish: 'La cuenta, por favor.'
  },
  {
    id: 'd-15',
    category: 'dining',
    categoryName: '2. Restaurantes y Gastronomía',
    romaji: 'Kādo wa tsukaemasu ka?',
    phonetic: 'Kaado wa tsukaemas ka?',
    kanji: 'カードは使えますか？',
    spanish: '¿Puedo pagar con tarjeta?'
  },

  // Categoría 3: Compras y Konbini
  {
    id: 's-1',
    category: 'shopping',
    categoryName: '3. Compras y Konbini',
    romaji: 'Kore wa ikura desu ka?',
    phonetic: 'Kore wa ikura des ka?',
    kanji: 'これはいくらですか？',
    spanish: '¿Cuánto cuesta esto?'
  },
  {
    id: 's-2',
    category: 'shopping',
    categoryName: '3. Compras y Konbini',
    romaji: 'Fukuro wa irimasen',
    phonetic: 'Fukuro wa irimasen',
    kanji: '袋はいりません',
    spanish: 'No necesito bolsa, gracias.'
  },
  {
    id: 's-3',
    category: 'shopping',
    categoryName: '3. Compras y Konbini',
    romaji: 'Atatame masu ka?',
    phonetic: 'Atatames ka?',
    kanji: '温めますか？',
    spanish: '¿Se lo caliento en el microondas? (pregunta del cajero).'
  },
  {
    id: 's-4',
    category: 'shopping',
    categoryName: '3. Compras y Konbini',
    romaji: 'Hai, onegai shimasu',
    phonetic: 'Jai, onegai shimas',
    kanji: 'はい、お願いします',
    spanish: 'Sí, por favor.'
  },
  {
    id: 's-5',
    category: 'shopping',
    categoryName: '3. Compras y Konbini',
    romaji: 'Suica / Pasmo de haraemasu ka?',
    phonetic: 'Suica / Pasmo de haraemas ka?',
    kanji: 'Suicaで払えますか？',
    spanish: '¿Puedo pagar con la tarjeta de transporte?'
  },
  {
    id: 's-6',
    category: 'shopping',
    categoryName: '3. Compras y Konbini',
    romaji: 'Tax-free wa dekimasu ka?',
    phonetic: 'Taksu frii wa dekimas ka?',
    kanji: '免税はできますか？',
    spanish: '¿Hacen descuento Tax-Free (sin impuestos)?'
  },

  // Categoría 4: Orientación, Emergencias y Necesidades
  {
    id: 'o-1',
    category: 'orientation',
    categoryName: '4. Orientación y Emergencias',
    romaji: 'Toire wa doko desu ka?',
    phonetic: 'Toire wa doko des ka?',
    kanji: 'トイレはどこですか？',
    spanish: '¿Dónde está el baño?'
  },
  {
    id: 'o-2',
    category: 'orientation',
    categoryName: '4. Orientación y Emergencias',
    romaji: 'Eki wa doko desu ka?',
    phonetic: 'Eki wa doko des ka?',
    kanji: '駅はどこですか？',
    spanish: '¿Dónde está la estación?'
  },
  {
    id: 'o-3',
    category: 'orientation',
    categoryName: '4. Orientación y Emergencias',
    romaji: 'Eigo ga hanasemasu ka?',
    phonetic: 'Eigo ga janasemas ka?',
    kanji: '英語が話せますか？',
    spanish: '¿Habla inglés?'
  },
  {
    id: 'o-4',
    category: 'orientation',
    categoryName: '4. Orientación y Emergencias',
    romaji: 'Tasukete kudasai!',
    phonetic: 'Taskete kudasai!',
    kanji: '助けてください！',
    spanish: '¡Ayuda, por favor!'
  },
  {
    id: 'o-5',
    category: 'orientation',
    categoryName: '4. Orientación y Emergencias',
    romaji: 'Koshitsu wa doko desu ka?',
    phonetic: 'Koshitsu wa doko des ka?',
    kanji: '忘れ物センターはどこですか？',
    spanish: '¿Dónde está el centro de objetos perdidos?'
  },

  // Categoría 5: Expresiones Kawaii y Pop
  {
    id: 'k-1',
    category: 'kawaii',
    categoryName: '5. Expresiones Kawaii y Pop',
    romaji: 'Kawaii!',
    phonetic: 'Kawaiii!',
    kanji: 'かわいい！',
    spanish: '¡Qué lindo / qué mono!'
  },
  {
    id: 'k-2',
    category: 'kawaii',
    categoryName: '5. Expresiones Kawaii y Pop',
    romaji: 'Sugoi!',
    phonetic: 'Sugoi!',
    kanji: 'すごい！',
    spanish: '¡Increíble! / ¡Guau!'
  },
  {
    id: 'k-3',
    category: 'kawaii',
    categoryName: '5. Expresiones Kawaii y Pop',
    romaji: 'Kakkoii!',
    phonetic: 'Kakkoii!',
    kanji: 'かっこいい！',
    spanish: '¡Qué genial! / ¡Qué elegante!'
  },
  {
    id: 'k-4',
    category: 'kawaii',
    categoryName: '5. Expresiones Kawaii y Pop',
    romaji: 'Yatta!',
    phonetic: 'Yatta!',
    kanji: 'やったー！',
    spanish: '¡Bien! / ¡Lo conseguimos!'
  },
  {
    id: 'k-5',
    category: 'kawaii',
    categoryName: '5. Expresiones Kawaii y Pop',
    romaji: 'Maji de?',
    phonetic: 'Maji de?',
    kanji: 'マジで？',
    spanish: '¿En serio? / ¿De verdad?'
  }
];

export const ToolsModule: React.FC = () => {
  const [jpyAmount, setJpyAmount] = useState<string>('1000');
  const [exchangeRate, setExchangeRate] = useState<number>(160); // 1 EUR = 160 JPY
  const [activeTab, setActiveTab] = useState<'currency' | 'phrases' | 'sizes'>('phrases');

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

  // Phrases state & Audio TTS Player
  const [phraseCategory, setPhraseCategory] = useState<string>('all');
  const [phraseSearch, setPhraseSearch] = useState<string>('');
  const [currentlyPlaying, setCurrentlyPlaying] = useState<string | null>(null);

  useEffect(() => {
    // Warmup voices
    if ('speechSynthesis' in window) {
      window.speechSynthesis.getVoices();
    }
  }, []);

  const speakPhrase = (phrase: Phrase) => {
    if (!('speechSynthesis' in window)) {
      alert('Tu navegador no soporta reproducción de voz.');
      return;
    }

    window.speechSynthesis.cancel();

    // Use kanji / Japanese text for TTS speech
    const utterance = new SpeechSynthesisUtterance(phrase.kanji);
    utterance.lang = 'ja-JP';
    utterance.rate = 0.8; // adapted learning pace
    utterance.pitch = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find((v) => v.lang.includes('ja') || v.lang.includes('JP'));
    if (jaVoice) {
      utterance.voice = jaVoice;
    }

    setCurrentlyPlaying(phrase.id);

    utterance.onend = () => setCurrentlyPlaying(null);
    utterance.onerror = () => setCurrentlyPlaying(null);

    window.speechSynthesis.speak(utterance);
  };

  const phraseCategories = [
    { id: 'all', name: 'Todas (35+)' },
    { id: 'greetings', name: '1. Saludos y Cortesía' },
    { id: 'dining', name: '2. Restaurantes' },
    { id: 'shopping', name: '3. Compras & Konbini' },
    { id: 'orientation', name: '4. Orientación & Emergencias' },
    { id: 'kawaii', name: '5. Expresiones Kawaii' }
  ];

  const filteredPhrases = JAPANESE_PHRASES.filter((p) => {
    const matchesCategory = phraseCategory === 'all' || p.category === phraseCategory;
    const q = phraseSearch.toLowerCase().trim();
    const matchesSearch =
      !q ||
      p.romaji.toLowerCase().includes(q) ||
      p.phonetic.toLowerCase().includes(q) ||
      p.spanish.toLowerCase().includes(q) ||
      p.kanji.includes(q) ||
      (p.note && p.note.toLowerCase().includes(q));
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
          Japonés de Supervivencia + Audio & Conversor
        </h1>
        <p className="text-xs font-bold text-slate-400 mt-1">
          Guía de frases con pronunciación en voz nativa, conversor JPY/EUR y tallas.
        </p>
      </section>

      {/* Navigation Sub-Tabs */}
      <nav className="grid grid-cols-3 gap-2 mb-6">
        <button
          onClick={() => setActiveTab('phrases')}
          className={`p-3 rounded-2xl flex flex-col items-center justify-center min-h-[52px] font-black text-xs transition-all active:scale-95 ${
            activeTab === 'phrases'
              ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/30'
              : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
          }`}
        >
          <Languages className="w-4 h-4 mb-1" />
          <span>Japonés & Audio</span>
        </button>

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

      {/* Phrases & Audio Tab */}
      {activeTab === 'phrases' && (
        <section className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-3 flex items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-black uppercase text-rose-500 bg-rose-50 dark:bg-rose-950/80 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-900 mb-1 inline-block">
                Audio Playback + Guía Masiva (35+ Frases)
              </span>
              <h2 className="text-sm font-black uppercase text-slate-900 dark:text-white tracking-wider flex items-center gap-2">
                <Languages className="w-4 h-4 text-rose-500" />
                Módulo &quot;Japonés de Supervivencia&quot;
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Haz clic en el botón 🔊 para escuchar la pronunciación nativa en voz clara a velocidad adaptada.
              </p>
            </div>
          </div>

          {/* Search Box */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={phraseSearch}
              onChange={(e) => setPhraseSearch(e.target.value)}
              placeholder="Buscar por expresión, pronunciación o traducción..."
              className="w-full pl-9 pr-8 py-2.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium focus:outline-hidden focus:border-rose-500"
            />
            {phraseSearch && (
              <button
                onClick={() => setPhraseSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
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

          {/* List of Phrase Cards with Floating Kawaii Audio Buttons */}
          <div className="space-y-3 pt-1">
            {filteredPhrases.length === 0 ? (
              <div className="text-center py-8 bg-slate-50 dark:bg-slate-900/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                <p className="text-xs font-bold text-slate-400">
                  No se encontraron expresiones para esta búsqueda.
                </p>
              </div>
            ) : (
              filteredPhrases.map((phrase) => {
                const isPlaying = currentlyPlaying === phrase.id;

                return (
                  <div
                    key={phrase.id}
                    className={`p-4 rounded-2xl space-y-2 transition-all relative border-2 ${
                      isPlaying
                        ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-700/80 hover:border-rose-300 dark:hover:border-rose-900'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1 pr-12">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-base font-black text-rose-600 dark:text-rose-400 tracking-tight">
                            {phrase.romaji}
                          </span>
                          <span className="text-xs font-bold text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-950/80 px-2 py-0.5 rounded-lg border border-amber-200 dark:border-amber-900">
                            ({phrase.phonetic})
                          </span>
                        </div>
                        <div className="text-xs font-bold text-slate-400 dark:text-slate-500">
                          {phrase.kanji}
                        </div>
                      </div>

                      {/* Floating Kawaii Audio Playback Button */}
                      <button
                        onClick={() => speakPhrase(phrase)}
                        className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border transition-all active:scale-90 shadow-md ${
                          isPlaying
                            ? 'bg-rose-600 text-white border-rose-400 animate-bounce'
                            : 'bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-300 hover:bg-rose-600 hover:text-white border-rose-300 dark:border-rose-800'
                        }`}
                        title="Escuchar pronunciación nativa"
                        aria-label={`Escuchar ${phrase.romaji}`}
                      >
                        {isPlaying ? (
                          <VolumeX className="w-5 h-5 animate-pulse" />
                        ) : (
                          <div className="flex items-center gap-0.5">
                            <span className="text-sm">🎧</span>
                            <Volume2 className="w-4 h-4" />
                          </div>
                        )}
                      </button>
                    </div>

                    <div className="pt-1 border-t border-slate-200/60 dark:border-slate-800 flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900 dark:text-slate-100">
                        👉 {phrase.spanish}
                      </span>
                      <span className="text-[10px] font-extrabold uppercase text-slate-400 bg-slate-200/50 dark:bg-slate-800 px-2 py-0.5 rounded-full">
                        {phrase.categoryName}
                      </span>
                    </div>

                    {phrase.note && (
                      <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 bg-white/70 dark:bg-slate-950/50 p-2 rounded-xl border border-slate-100 dark:border-slate-800/80">
                        💡 {phrase.note}
                      </p>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>
      )}

      {/* Currency Converter Tab */}
      {activeTab === 'currency' && (
        <div className="space-y-6">
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

      {/* Clothing Sizes Tab */}
      {activeTab === 'sizes' && (
        <section className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-sm space-y-4">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
            <h2 className="text-sm font-black uppercase text-slate-400 tracking-wider flex items-center gap-2">
              <Shirt className="w-4 h-4 text-rose-500" />
              Tabla de Equivalencia de Tallas
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Referencia rápida para calzado y vestimenta al comprar en tiendas como Uniqlo o GU.
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
