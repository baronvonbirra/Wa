import React, { useState, useEffect } from 'react';
import { Calculator, ShoppingBag, Languages, Shirt, Volume2, VolumeX, Sparkles, Search, Check, Footprints, Baby, Info } from 'lucide-react';

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
    id: 'd-veg-1',
    category: 'dining',
    categoryName: '2. Restaurantes y Gastronomía',
    romaji: 'Bejitarian desu',
    phonetic: 'Bejitarian des',
    kanji: 'ベジタリアンです',
    spanish: 'Soy vegetariano/a.',
    note: 'Indica tu preferencia vegetariana al personal.'
  },
  {
    id: 'd-veg-2',
    category: 'dining',
    categoryName: '2. Restaurantes y Gastronomía',
    romaji: 'Niku to sakana wa nuki de onegai shimasu',
    phonetic: 'Niku to sakana wa nuki de onegai shimas',
    kanji: '肉と魚は抜きでお願いします',
    spanish: 'Sin carne ni pescado, por favor.',
    note: 'Aclaración explícita para excluir carne y pescado.'
  },
  {
    id: 'd-veg-3',
    category: 'dining',
    categoryName: '2. Restaurantes y Gastronomía',
    romaji: 'Dashi nuki de dekimasu ka?',
    phonetic: 'Dashi nuki de dekimas ka?',
    kanji: '出汁抜きでできますか？',
    spanish: '¿Se puede preparar sin caldo dashi (pescado)?',
    note: 'El dashi (caldo de bonito) se usa tradicionalmente en sopas y salsas.'
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

  const shoeSizes = [
    {
      group: 'Hombre',
      eu: '45 EU',
      jp: '29.0 cm',
      us: '11.5 US',
      note: 'Talla grande en calzado japonés (suele etiquetarse como 29.0 cm o XL/LL en zapatillas de casa/geta).'
    },
    {
      group: 'Mujer',
      eu: '37 EU',
      jp: '23.5 cm',
      us: '6.5 - 7 US',
      note: 'Equivalente estándar nipón a talla M (23.5 cm).'
    },
    {
      group: 'Mujer',
      eu: '36 EU',
      jp: '23.0 cm',
      us: '6 US',
      note: 'Equivalente nipón a talla S (23.0 cm).'
    },
    {
      group: 'Niño / Infantil',
      eu: '30 EU',
      jp: '18.5 - 19.0 cm',
      us: '12 - 12.5 Kids US',
      note: 'Calzado infantil para longitud de pie de ~18.5 a 19.0 cm.'
    }
  ];

  const adultClothingSizes = [
    {
      group: 'Hombre',
      eu: 'XL Europea / Occidental',
      jp: 'XXL / 3L Japonesa',
      note: 'El tallaje japonés es más estrecho de hombros y mangas: la XL europea requiere XXL o 3L en Uniqlo/GU.'
    },
    {
      group: 'Hombre',
      eu: 'L Europea / Occidental',
      jp: 'XL / LL Japonesa',
      note: 'La L europea equivale habitualmente a una XL o LL en Japón.'
    },
    {
      group: 'Mujer',
      eu: 'M Europea',
      jp: 'L Japonesa',
      note: 'Para M española, la talla L japonesa ofrece un ajuste mucho más cómodo de busto y hombros.'
    },
    {
      group: 'Mujer',
      eu: 'S Europea',
      jp: 'M Japonesa',
      note: 'La S europea equivale directamente a la M japonesa estándar.'
    }
  ];

  const kidsClothingSizes = [
    {
      group: 'Niños (9 años)',
      eu: '9 años (Talla 134-140)',
      jp: '130 - 140 cm (Kids)',
      note: 'En Japón la ropa infantil se cataloga por altura en cm: 130 cm para complexión delgada, 140 cm para más holgura o abrigo de invierno.'
    },
    {
      group: 'Niños (5 años)',
      eu: '5 años (Talla 110-116)',
      jp: '110 - 120 cm (Kids)',
      note: 'La talla 110 cm es exacta para 5 años; 120 cm es recomendable si se viste con capas térmicas debajo.'
    }
  ];

  const sockSizes = [
    {
      group: 'Adulto Grande (Pie 45)',
      eu: '44 - 46 EU',
      jp: '27 - 29 cm',
      note: 'Etiquetado en tiendas como 27-29cm.'
    },
    {
      group: 'Adulto Mediano (Pie 36-37)',
      eu: '35 - 38 EU',
      jp: '23 - 25 cm',
      note: 'El estándar para mujer más común en Don Quijote, Uniqlo y konbini.'
    },
    {
      group: 'Infantil (Pie 30)',
      eu: '29 - 31 EU',
      jp: '18 - 20 cm',
      note: 'Sección Kids: calcetines térmicos o normales marcados como 18-20cm.'
    }
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
        <section className="bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 rounded-3xl p-5 shadow-sm space-y-6">
          <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
            <span className="text-[10px] font-black uppercase text-rose-500 bg-rose-50 dark:bg-rose-950/80 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-900 mb-1 inline-block">
              Guía de Compras & Equivalencias Japón
            </span>
            <h2 className="text-sm font-black uppercase text-slate-900 dark:text-white tracking-wider flex items-center gap-2">
              <Shirt className="w-4 h-4 text-rose-500" />
              Tabla de Equivalencia de Tallas Personalizada
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Tallas exactas del grupo familiar para compras rápidas en Uniqlo, GU, ABC-MART y Don Quijote.
            </p>
          </div>

          {/* Section 1: Calzado Familiar */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-black text-slate-700 dark:text-slate-200">
              <Footprints className="w-4 h-4 text-amber-500" />
              <span>Calzado Familiar (Zapatillas y Zapatos)</span>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {shoeSizes.map((size, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 p-3.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:border-amber-400 dark:hover:border-amber-600 transition-colors"
                >
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-black text-amber-600 dark:text-amber-400 uppercase tracking-wider block">
                      {size.group}
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {size.note}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold shrink-0">
                    <span className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-2.5 py-1 rounded-xl">
                      EU: {size.eu}
                    </span>
                    <span className="bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 px-2.5 py-1 rounded-xl border border-amber-200 dark:border-amber-900 font-black">
                      JP: {size.jp}
                    </span>
                    <span className="bg-slate-100 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 px-2 py-1 rounded-xl text-[11px]">
                      {size.us}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 2: Ropa Adultos */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-black text-slate-700 dark:text-slate-200">
              <Shirt className="w-4 h-4 text-rose-500" />
              <span>Ropa Adultos (Hombre & Mujer)</span>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {adultClothingSizes.map((size, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 p-3.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:border-rose-300 dark:hover:border-rose-900 transition-colors"
                >
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-black text-rose-600 dark:text-rose-400 uppercase tracking-wider block">
                      {size.group}
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {size.note}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold shrink-0">
                    <span className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-2.5 py-1 rounded-xl">
                      EU: {size.eu}
                    </span>
                    <span className="bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 px-2.5 py-1 rounded-xl border border-rose-200 dark:border-rose-900 font-black">
                      JP: {size.jp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 3: Ropa Niños */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-black text-slate-700 dark:text-slate-200">
              <Baby className="w-4 h-4 text-emerald-500" />
              <span>Ropa Niños (Estatura en centímetros)</span>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {kidsClothingSizes.map((size, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 p-3.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:border-emerald-300 dark:hover:border-emerald-900 transition-colors"
                >
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">
                      {size.group}
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {size.note}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold shrink-0">
                    <span className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-2.5 py-1 rounded-xl">
                      {size.eu}
                    </span>
                    <span className="bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 px-2.5 py-1 rounded-xl border border-emerald-200 dark:border-emerald-900 font-black">
                      JP: {size.jp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 4: Calcetines */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-black text-slate-700 dark:text-slate-200">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>Calcetines & Medias (Etiquetado por cm de pie)</span>
            </div>
            <div className="grid grid-cols-1 gap-2.5">
              {sockSizes.map((size, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 p-3.5 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 hover:border-indigo-300 dark:hover:border-indigo-900 transition-colors"
                >
                  <div className="space-y-0.5">
                    <span className="text-[11px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                      {size.group}
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {size.note}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs font-bold shrink-0">
                    <span className="bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 px-2.5 py-1 rounded-xl">
                      EU: {size.eu}
                    </span>
                    <span className="bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 px-2.5 py-1 rounded-xl border border-indigo-200 dark:border-indigo-900 font-black">
                      JP: {size.jp}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Section 5: Consejos Clave para Probarse y Comprar en Japón */}
          <div className="bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 text-xs font-black text-rose-700 dark:text-rose-300">
              <Info className="w-4 h-4 text-rose-500 shrink-0" />
              <span>Consejos Clave de Compras en Tiendas Japonesas (Uniqlo, GU, Muji)</span>
            </div>
            <ul className="text-[11px] space-y-1.5 text-slate-600 dark:text-slate-300 list-disc list-inside">
              <li>
                <strong>Probadores:</strong> Quítate siempre los zapatos antes de pisar la alfombrilla o tarima del probador.
              </li>
              <li>
                <strong>Corte japonés:</strong> Los patrones de manga y tiro de pantalón son más cortos que en Europa. Ante la duda entre dos tallas, optad por la mayor.
              </li>
              <li>
                <strong>Tax-Free:</strong> Llevad el pasaporte físico a mano. En compras superiores a 5.000 ¥ (sin impuestos) os descontarán el 10% directo en caja.
              </li>
              <li>
                <strong>Heattech:</strong> La ropa térmica en Uniqlo viene empaquetada; si tenéis dudas de talla, preguntad al personal antes de abrir el precinto.
              </li>
            </ul>
          </div>
        </section>
      )}
    </div>
  );
};
