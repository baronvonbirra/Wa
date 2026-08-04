export interface VocabularyWord {
  id: string;
  japanese: string;
  romaji: string;
  english: string;
  emoji: string;
  category: string;
}

export interface Dialogue {
  id: string;
  title: string;
  japanese: string[];
  romaji: string[];
  english: string[];
  missingIndex: number; // index of the speaker sentence that has the missing word
  missingWordJapanese: string;
  missingWordEnglish: string;
  options: string[]; // Options in Japanese
  explanation: string;
}

export interface ConversationTurn {
  speaker: string;
  japanese: string;
  romaji: string;
  english: string;
  options?: {
    text: string;
    english: string;
    isCorrect: boolean;
    feedback: string;
    score: number;
  }[];
}

export interface ConversationScenario {
  id: string;
  title: string;
  difficulty: string;
  description: string;
  turns: ConversationTurn[];
}

export interface GrammarQuestion {
  id: string;
  topic: string;
  sentence: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface ListeningExercise {
  id: string;
  title: string;
  dialogueText: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
}

export interface ReadingPassage {
  id: string;
  title: string;
  content: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
  }[];
}

export interface WritingPrompt {
  id: string;
  title: string;
  task: string;
  requiredElements: string[];
  suggestedAnswers: string[];
}

export interface Destination {
  id: string;
  name: string;
  theme: string;
  description: string;
  emoji: string;
  vocabCount: number;
  difficulty: string;
  ageFocus: string;
  vocabList: VocabularyWord[];
  dialogues: Dialogue[];
  japanFacts: string[];

  // Phase 3 Extended Content
  conversations?: ConversationScenario[];
  grammarQuestions?: GrammarQuestion[];
  listeningExercises?: ListeningExercise[];
  readingPassages?: ReadingPassage[];
  writingPrompts?: WritingPrompt[];
}

export const DESTINATIONS_DATA: Destination[] = [
  {
    id: "kyoto",
    name: "Kyoto (🏯)",
    theme: "Temples & Politeness",
    description: "Explore golden temples, ancient streets, and learn how to greet people politely!",
    emoji: "🏯",
    vocabCount: 25,
    difficulty: "⭐⭐",
    ageFocus: "Both",
    japanFacts: [
      "Kyoto was the capital of Japan for over 1,000 years!",
      "There are over 2,000 temples and shrines in Kyoto.",
      "Kinkaku-ji is a famous temple in Kyoto covered completely in gold leaf!"
    ],
    conversations: [
      {
        id: "kyoto_temple_etiquette",
        title: "Temple Etiquette with a Monk",
        difficulty: "⭐⭐⭐",
        description: "Merche meets a local monk at a beautiful ancient Kyoto temple and asks about proper manners.",
        turns: [
          {
            speaker: "Monk",
            japanese: "ようこそ。お寺に入る前に、一礼してくださいね。",
            romaji: "Youkoso. Otera ni hairu mae ni, ichirei shite kudasai ne.",
            english: "Welcome. Before entering the temple, please bow once."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、わかりました。一礼します。",
                english: "Yes, I understand. I will bow.",
                isCorrect: true,
                feedback: "Excellent! Showing respect by bowing is highly polite and culturally perfect! 🙇",
                score: 10
              },
              {
                text: "どうして bow するのですか？",
                english: "Why do we bow?",
                isCorrect: false,
                feedback: "A bit too informal and uses English word 'bow'. Better to agree politely first.",
                score: 5
              }
            ]
          },
          {
            speaker: "Monk",
            japanese: "素晴らしい。次に、静かにお祈りをしてください。",
            romaji: "Subarashii. Tsugi ni, shizuka ni onori o shite kudasai.",
            english: "Wonderful. Next, please pray quietly."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます。静かにします。",
                english: "Thank you very much. I will keep quiet.",
                isCorrect: true,
                feedback: "Wonderful! Politeness at sacred spots is deeply valued. You successfully finished the dialogue!",
                score: 10
              },
              {
                text: "大きな声で歌います！",
                english: "I will sing loudly!",
                isCorrect: false,
                feedback: "No! Singing loudly inside a quiet temple ruins the atmosphere! ❌",
                score: 1
              }
            ]
          }
        ]
      }
    ],
    grammarQuestions: [
      {
        id: "kyoto_grammar_1",
        topic: "Topic Marker Particle は vs Object Marker Particle を",
        sentence: "私はお茶を飲みます (Watashi wa ocha o nomimasu)",
        question: "What is the function of the particle 'を' (o) in this sentence?",
        options: [
          "Marks the topic of the sentence",
          "Marks the direct object of the verb '飲みます' (to drink)",
          "Shows the location of the action",
          "Indicates possessive association"
        ],
        correctAnswer: "Marks the direct object of the verb '飲みます' (to drink)",
        explanation: "In Japanese, the particle を (wo/o) is placed immediately after the noun representing the direct object of a transitive verb. Here, 'お茶' (green tea) is the object being drunk."
      }
    ],
    listeningExercises: [
      {
        id: "kyoto_listen_1",
        title: "Kyoto Green Tea Ceremony Intro",
        dialogueText: "こんにちは、お茶室へようこそ。まず、美味しいお茶をどうぞ。どうぞ召し上がってください。",
        questions: [
          {
            question: "What did the host offer you first?",
            options: ["A cup of hot water", "Green Tea (Ocha)", "Sweet candies", "Ramen"],
            correctAnswer: "Green Tea (Ocha)"
          },
          {
            question: "How did the host describe the drink?",
            options: ["Oishii (Delicious)", "Atsui (Hot)", "Kirei (Beautiful)", "Amai (Sweet)"],
            correctAnswer: "Oishii (Delicious)"
          }
        ]
      }
    ],
    readingPassages: [
      {
        id: "kyoto_read_1",
        title: "Traditional Kyoto Life & Temples",
        content: "京都は日本の古い文化が残る美しい街です。たくさんのお寺や鳥居があります。有名な金閣寺はすべて金で作られています。お茶室で抹茶を飲む体験も人気です。着物を着て古い街を歩くのは素晴らしい思い出になりますよ。",
        questions: [
          {
            question: "What is Kyoto described as?",
            options: [
              "A high-tech city with vending machines",
              "A beautiful city preserving ancient culture",
              "A tropical beach island resort",
              "A snowy mountain village"
            ],
            correctAnswer: "A beautiful city preserving ancient culture"
          },
          {
            question: "According to the text, what is covered in gold leaf?",
            options: ["The Torii gates", "The traditional Kimonos", "Kinkaku-ji temple", "The teahouses"],
            correctAnswer: "Kinkaku-ji temple"
          }
        ]
      }
    ],
    writingPrompts: [
      {
        id: "kyoto_write_1",
        title: "Thank You Message to Kyoto Tea Host",
        task: "Draft a short polite message to your tea master thanking them for the green tea.",
        requiredElements: [
          "A polite greeting ('こんにちは' or similar)",
          "A polite expression of gratitude ('ありがとう' or 'ありがとうございます')",
          "The word 'お茶' (Ocha - tea)"
        ],
        suggestedAnswers: [
          "こんにちは。美味しいお茶をありがとうございました。",
          "お茶をありがとうございます！とても美味しかったです。"
        ]
      }
    ],
    vocabList: [
      { id: "k1", japanese: "こんにちは", romaji: "Konnichiwa", english: "Hello / Good afternoon", emoji: "👋", category: "Greetings" },
      { id: "k2", japanese: "ありがとう", romaji: "Arigatou", english: "Thank you", emoji: "🙏", category: "Greetings" },
      { id: "k3", japanese: "はい", romaji: "Hai", english: "Yes", emoji: "✅", category: "Basics" },
      { id: "k4", japanese: "いいえ", romaji: "Iie", english: "No", emoji: "❌", category: "Basics" },
      { id: "k5", japanese: "すみません", romaji: "Sumimasen", english: "Excuse me / Sorry", emoji: "🙇", category: "Greetings" },
      { id: "k6", japanese: "お寺", romaji: "Otera", english: "Temple", emoji: "🛕", category: "Places" },
      { id: "k7", japanese: "鳥居", romaji: "Torii", english: "Shrine Gate", emoji: "⛩️", category: "Places" },
      { id: "k8", japanese: "赤い", romaji: "Akai", english: "Red", emoji: "🔴", category: "Colors" },
      { id: "k9", japanese: "緑", romaji: "Midori", english: "Green", emoji: "🟢", category: "Colors" },
      { id: "k10", japanese: "お茶", romaji: "Ocha", english: "Green Tea", emoji: "🍵", category: "Food" },
      { id: "k11", japanese: "さようなら", romaji: "Sayounara", english: "Goodbye", emoji: "👋", category: "Greetings" },
      { id: "k12", japanese: "どうぞ", romaji: "Douzo", english: "Here you go / Please", emoji: "🤲", category: "Politeness" },
      { id: "k13", japanese: "はじめまして", romaji: "Hajimemashite", english: "Nice to meet you", emoji: "🤝", category: "Greetings" },
      { id: "k14", japanese: "美味しい", romaji: "Oishii", english: "Delicious", emoji: "😋", category: "Feelings" },
      { id: "k15", japanese: "着物", romaji: "Kimono", english: "Kimono", emoji: "🥋", category: "Culture" },
      { id: "k16", japanese: "扇子", romaji: "Sensu", english: "Folding Fan", emoji: "🪭", category: "Culture" },
      { id: "k17", japanese: "鹿", romaji: "Shika", english: "Deer", emoji: "🦌", category: "Animals" },
      { id: "k18", japanese: "山", romaji: "Yama", english: "Mountain", emoji: "⛰️", category: "Nature" },
      { id: "k19", japanese: "川", romaji: "Kawa", english: "River", emoji: "🏞️", category: "Nature" },
      { id: "k20", japanese: "水", romaji: "Mizu", english: "Water", emoji: "💧", category: "Basics" },
      { id: "k21", japanese: "桜", romaji: "Sakura", english: "Cherry Blossom", emoji: "🌸", category: "Nature" },
      { id: "k22", japanese: "お箸", romaji: "Ohashi", english: "Chopsticks", emoji: "🥢", category: "Food" },
      { id: "k23", japanese: "竹", romaji: "Take", english: "Bamboo", emoji: "🎋", category: "Nature" },
      { id: "k24", japanese: "嬉しい", romaji: "Ureshii", english: "Happy", emoji: "😊", category: "Feelings" },
      { id: "k25", japanese: "友達", romaji: "Tomodachi", english: "Friend", emoji: "🧑‍🤝‍🧑", category: "Family" }
    ],
    dialogues: [
      {
        id: "kd1",
        title: "Greeting a Friend",
        japanese: ["A: こんにちは！", "B: こんにちは！お元気ですか？"],
        romaji: ["A: Konnichiwa!", "B: Konnichiwa! Ogenki desu ka?"],
        english: ["A: Hello!", "B: Hello! How are you?"],
        missingIndex: 1,
        missingWordJapanese: "こんにちは",
        missingWordEnglish: "Hello / Good afternoon",
        options: ["こんにちは", "ありがとう", "すみません", "さようなら"],
        explanation: "To greet someone during the day, we say 'Konnichiwa'."
      },
      {
        id: "kd2",
        title: "Saying Thank You",
        japanese: ["A: どうぞ、お茶です。", "B: ありがとう！"],
        romaji: ["A: Douzo, ocha desu.", "B: Arigatou!"],
        english: ["A: Here you go, green tea.", "B: Thank you!"],
        missingIndex: 1,
        missingWordJapanese: "ありがとう",
        missingWordEnglish: "Thank you",
        options: ["ありがとう", "はい", "いいえ", "はじめまして"],
        explanation: "When someone gives you green tea (ocha), you say 'Arigatou' to thank them!"
      }
    ]
  },
  {
    id: "tokyo",
    name: "Tokyo (🍜)",
    theme: "Food & Ordering",
    description: "Navigate high-tech restaurants, order amazing ramen, and explore the neon streets of Tokyo!",
    emoji: "🍜",
    vocabCount: 30,
    difficulty: "⭐⭐⭐",
    ageFocus: "James (9)",
    japanFacts: [
      "Tokyo is the most populated metropolitan area in the whole world!",
      "You can buy almost anything from Tokyo's millions of vending machines, including hot canned soup!",
      "Tokyo has the world's busiest pedestrian crossing, called Shibuya Crossing."
    ],
    conversations: [
      {
        id: "tokyo_ramen_ordering",
        title: "Ordering Ramen in Shinjuku",
        difficulty: "⭐⭐",
        description: "Marco or Merche enters a cozy Shinjuku ramen shop to order dinner.",
        turns: [
          {
            speaker: "Server",
            japanese: "いらっしゃいませ！ご注文は何ですか？",
            romaji: "Irasshaimase! Go-chuumon wa nan desu ka?",
            english: "Welcome! What would you like to order?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ラーメンをください。",
                english: "Ramen, please.",
                isCorrect: true,
                feedback: "Excellent! 'Ramen o kudasai' is perfect and polite. 🍜",
                score: 10
              },
              {
                text: "飛行機をください。",
                english: "An airplane, please.",
                isCorrect: false,
                feedback: "Wait! Ordering an airplane in a restaurant is very silly! ✈️",
                score: 1
              }
            ]
          },
          {
            speaker: "Server",
            japanese: "かしこまりました。お水はどうですか？",
            romaji: "Kashikomarimashita. Omizu wa dou desu ka?",
            english: "Certainly. Would you like some water?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。",
                english: "Yes, please.",
                isCorrect: true,
                feedback: "Spot on! Perfect confirmation of getting water. You are fully ready to eat!",
                score: 10
              },
              {
                text: "いいえ、美味しくないです。",
                english: "No, it's not delicious.",
                isCorrect: false,
                feedback: "Ouch! Saying it's not delicious before even tasting is rude!",
                score: 3
              }
            ]
          }
        ]
      }
    ],
    grammarQuestions: [
      {
        id: "tokyo_grammar_1",
        topic: "Polite Request using ください (Kudasai)",
        sentence: "ラーメンをください (Raamen o kudasai)",
        question: "How do you request something politely in a shop?",
        options: [
          "Item name + をください (o kudasai)",
          "Item name + はどこですか (wa doko desu ka)",
          "Item name + です (desu)",
          "Item name + が好きです (ga suki desu)"
        ],
        correctAnswer: "Item name + をください (o kudasai)",
        explanation: "To politely ask for an item, say the item name followed by the object marker particle を (o) and 'ください' (kudasai)."
      }
    ],
    listeningExercises: [
      {
        id: "tokyo_listen_1",
        title: "Ordering Coffee in Shibuya",
        dialogueText: "いらっしゃいませ。ホットコーヒーを一つください。はい、お会計は五百円です。",
        questions: [
          {
            question: "What beverage was requested?",
            options: ["Iced green tea", "Hot coffee", "Apple juice", "Cold water"],
            correctAnswer: "Hot coffee"
          },
          {
            question: "How much did the coffee cost?",
            options: ["100 yen", "300 yen", "500 yen", "1000 yen"],
            correctAnswer: "500 yen"
          }
        ]
      }
    ],
    readingPassages: [
      {
        id: "tokyo_read_1",
        title: "The Vending Machines of Akihabara",
        content: "東京の秋葉原にはたくさんの自動販売機があります。お茶や冷たい水だけでなく、温かいラーメン缶や果物ジュース、そしておにぎりも買えます。ボタンを押すだけで美味しい食べ物がすぐに出てきて、とても便利です。",
        questions: [
          {
            question: "What can you buy from the vending machines mentioned?",
            options: ["Clothes and shoes", "Warm canned ramen, juices, and rice balls", "Golden souvenirs", "Train tickets"],
            correctAnswer: "Warm canned ramen, juices, and rice balls"
          },
          {
            question: "Where are these unique machines located?",
            options: ["Kyoto Temples", "Akihabara, Tokyo", "Okinawa beach", "Takayama mountains"],
            correctAnswer: "Akihabara, Tokyo"
          }
        ]
      }
    ],
    writingPrompts: [
      {
        id: "tokyo_write_1",
        title: "Hotel Booking Inquiry",
        task: "Draft a polite sentence checking if a room is available.",
        requiredElements: [
          "The word '部屋' (Heya - room) or 'ホテル' (Hoteru - hotel)",
          "The question word 'どこ' (doko) or a polite question particle 'か' (ka)"
        ],
        suggestedAnswers: [
          "すみません、部屋はありますか？",
          "こんにちは、ホテルを予約したいです。"
        ]
      }
    ],
    vocabList: [
      { id: "t1", japanese: "ラーメン", romaji: "Raamen", english: "Ramen", emoji: "🍜", category: "Food" },
      { id: "t2", japanese: "すし", romaji: "Sushi", english: "Sushi", emoji: "🍣", category: "Food" },
      { id: "t3", japanese: "くだもの", romaji: "Kudamono", english: "Fruit", emoji: "🍎", category: "Food" },
      { id: "t4", japanese: "おにぎり", romaji: "Onigiri", english: "Rice Ball", emoji: "🍙", category: "Food" },
      { id: "t5", japanese: "弁当", romaji: "Bento", english: "Lunch Box", emoji: "🍱", category: "Food" },
      { id: "t6", japanese: "魚", romaji: "Sakana", english: "Fish", emoji: "🐟", category: "Food" },
      { id: "t7", japanese: "肉", romaji: "Niku", english: "Meat", emoji: "🥩", category: "Food" },
      { id: "t8", japanese: "ください", romaji: "Kudasai", english: "Please give me...", emoji: "🥺", category: "Ordering" },
      { id: "t9", japanese: "これ", romaji: "Kore", english: "This one", emoji: "👇", category: "Ordering" },
      { id: "t10", japanese: "それ", romaji: "Sore", english: "That one", emoji: "👉", category: "Ordering" },
      { id: "t11", japanese: "メニュー", romaji: "Menyuu", english: "Menu", emoji: "📖", category: "Ordering" },
      { id: "t12", japanese: "お会計", romaji: "Okaikei", english: "The bill / check", emoji: "💳", category: "Ordering" },
      { id: "t13", japanese: "水", romaji: "Mizu", english: "Water", emoji: "🥛", category: "Food" },
      { id: "t14", japanese: "ジュース", romaji: "Juusu", english: "Juice", emoji: "🧃", category: "Food" },
      { id: "t15", japanese: "レストラン", romaji: "Resutoran", english: "Restaurant", emoji: "🏪", category: "Places" },
      { id: "t16", japanese: "猫カフェ", romaji: "Neko Kafe", english: "Cat Cafe", emoji: "🐈", category: "Places" },
      { id: "t17", japanese: "美味しい", romaji: "Oishii", english: "Delicious", emoji: "😋", category: "Feelings" },
      { id: "t18", japanese: "甘い", romaji: "Amai", english: "Sweet", emoji: "🍬", category: "Feelings" },
      { id: "t19", japanese: "辛い", romaji: "Karai", english: "Spicy", emoji: "🌶️", category: "Feelings" },
      { id: "t20", japanese: "お腹がすいた", romaji: "Onaka ga suita", english: "I am hungry", emoji: "🤤", category: "Feelings" },
      { id: "t21", japanese: "いただきます", romaji: "Itadakimasu", english: "Thank you for the meal (before eating)", emoji: "🙏", category: "Basics" },
      { id: "t22", japanese: "ごちそうさま", romaji: "Gochisousama", english: "Thank you for the meal (after eating)", emoji: "🤝", category: "Basics" },
      { id: "t23", japanese: "いらっしゃいませ", romaji: "Irasshaimase", english: "Welcome! (to a shop)", emoji: "🙌", category: "Basics" },
      { id: "t24", japanese: "スプーン", romaji: "Supuun", english: "Spoon", emoji: "🥄", category: "Food" },
      { id: "t25", japanese: "フォーク", romaji: "Fooku", english: "Fork", emoji: "🍴", category: "Food" },
      { id: "t26", japanese: "コップ", romaji: "Koppu", english: "Cup", emoji: "🥛", category: "Food" },
      { id: "t27", japanese: "氷", romaji: "Koori", english: "Ice", emoji: "🧊", category: "Food" },
      { id: "t28", japanese: "大きい", romaji: "Ookii", english: "Big", emoji: "🐘", category: "Adjectives" },
      { id: "t29", japanese: "小さい", romaji: "Chiisai", english: "Small", emoji: "🐭", category: "Adjectives" },
      { id: "t30", japanese: "たこ焼き", romaji: "Takoyaki", english: "Octopus balls", emoji: "🐙", category: "Food" }
    ],
    dialogues: [
      {
        id: "td1",
        title: "Ordering Ramen",
        japanese: ["A: これをください。", "B: はい、ラーメンですね。"],
        romaji: ["A: Kore o kudasai.", "B: Hai, raamen desu ne."],
        english: ["A: This one please.", "B: Yes, ramen right?"],
        missingIndex: 0,
        missingWordJapanese: "ください",
        missingWordEnglish: "Please give me...",
        options: ["ください", "ありがとう", "こんにちは", "美味しい"],
        explanation: "To politely request something, point and say 'Kore o kudasai' (This one please!)."
      },
      {
        id: "td2",
        title: "Eating Dinner",
        japanese: ["A: いただきます！", "B: 美味しいですか？", "A: はい、とても美味しいです！"],
        romaji: ["A: Itadakimasu!", "B: Oishii desu ka?", "A: Hai, totemo oishii desu!"],
        english: ["A: Let's eat!", "B: Is it delicious?", "A: Yes, very delicious!"],
        missingIndex: 0,
        missingWordJapanese: "いただきます",
        missingWordEnglish: "Thank you for the meal (before eating)",
        options: ["いただきます", "ごちそうさま", "いらっしゃいませ", "お会計"],
        explanation: "In Japan, always say 'Itadakimasu' before you start eating your meal to show appreciation!"
      }
    ]
  },
  {
    id: "osaka",
    name: "Osaka (🛕)",
    theme: "Numbers & Directions",
    description: "Master counting, shopping, asking for directions, and finding castles in Osaka!",
    emoji: "🛕",
    vocabCount: 25,
    difficulty: "⭐",
    ageFocus: "Lily (5)",
    japanFacts: [
      "Osaka castle is one of Japan's most famous landmarks and is surrounded by a giant moat!",
      "Osaka is known as the 'Nation's Kitchen' because the food here is incredibly delicious!",
      "Osakans are famous for being very funny and outgoing."
    ],
    vocabList: [
      { id: "o1", japanese: "いち", romaji: "Ichi", english: "One", emoji: "1️⃣", category: "Numbers" },
      { id: "o2", japanese: "に", romaji: "Ni", english: "Two", emoji: "2️⃣", category: "Numbers" },
      { id: "o3", japanese: "さん", romaji: "San", english: "Three", emoji: "3️⃣", category: "Numbers" },
      { id: "o4", japanese: "よん", romaji: "Yon / Shi", english: "Four", emoji: "4️⃣", category: "Numbers" },
      { id: "o5", japanese: "ご", romaji: "Go", english: "Five", emoji: "5️⃣", category: "Numbers" },
      { id: "o6", japanese: "ろく", romaji: "Roku", english: "Six", emoji: "6️⃣", category: "Numbers" },
      { id: "o7", japanese: "なな", romaji: "Nana / Shichi", english: "Seven", emoji: "7️⃣", category: "Numbers" },
      { id: "o8", japanese: "はち", romaji: "Hachi", english: "Eight", emoji: "8️⃣", category: "Numbers" },
      { id: "o9", japanese: "きゅう", romaji: "Kyuu", english: "Nine", emoji: "9️⃣", category: "Numbers" },
      { id: "o10", japanese: "じゅう", romaji: "Juu", english: "Ten", emoji: "🔟", category: "Numbers" },
      { id: "o11", japanese: "いくら", romaji: "Ikura", english: "How much is it?", emoji: "💰", category: "Shopping" },
      { id: "o12", japanese: "円", romaji: "En", english: "Yen (Japanese Currency)", emoji: "💴", category: "Shopping" },
      { id: "o13", japanese: "どこ", romaji: "Doko", english: "Where?", emoji: "❓", category: "Directions" },
      { id: "o14", japanese: "城", romaji: "Shiro", english: "Castle", emoji: "🏰", category: "Places" },
      { id: "o15", japanese: "駅", romaji: "Eki", english: "Station", emoji: "🚉", category: "Places" },
      { id: "o16", japanese: "右", romaji: "Migi", english: "Right", emoji: "➡️", category: "Directions" },
      { id: "o17", japanese: "左", romaji: "Hidari", english: "Left", emoji: "⬅️", category: "Directions" },
      { id: "o18", japanese: "まっすぐ", romaji: "Massugu", english: "Straight ahead", emoji: "⬆️", category: "Directions" },
      { id: "o19", japanese: "トイレ", romaji: "Toire", english: "Bathroom / Toilet", emoji: "🚾", category: "Places" },
      { id: "o20", japanese: "切符", romaji: "Kippu", english: "Ticket", emoji: "🎫", category: "Shopping" },
      { id: "o21", japanese: "百", romaji: "Hyaku", english: "100", emoji: "💯", category: "Numbers" },
      { id: "o22", japanese: "千", romaji: "Sen", english: "1,000", emoji: "💵", category: "Numbers" },
      { id: "o23", japanese: "お店", romaji: "Omise", english: "Shop / Store", emoji: "🏪", category: "Places" },
      { id: "o24", japanese: "たこ", romaji: "Tako", english: "Octopus", emoji: "🐙", category: "Animals" },
      { id: "o25", japanese: "安い", romaji: "Yasui", english: "Cheap / Inexpensive", emoji: "🏷️", category: "Shopping" }
    ],
    dialogues: [
      {
        id: "od1",
        title: "How much is this?",
        japanese: ["A: これはいくらですか？", "B: さんびゃく円です。"],
        romaji: ["A: Kore wa ikura desu ka?", "B: Sanbyaku en desu."],
        english: ["A: How much is this?", "B: It's 300 Yen."],
        missingIndex: 0,
        missingWordJapanese: "いくら",
        missingWordEnglish: "How much is it?",
        options: ["いくら", "どこ", "だれ", "なにお"],
        explanation: "'Ikura' means 'how much'. Use 'ikura desu ka' to ask the price."
      },
      {
        id: "od2",
        title: "Finding the Bathroom",
        japanese: ["A: すみません、トイレはどこですか？", "B: あそこですよ！まっすぐ！"],
        romaji: ["A: Sumimasen, toire wa doko desu ka?", "B: Asoko desu yo! Massugu!"],
        english: ["A: Excuse me, where is the bathroom?", "B: It's right there! Go straight!"],
        missingIndex: 0,
        missingWordJapanese: "どこ",
        missingWordEnglish: "Where?",
        options: ["どこ", "右", "左", "まっすぐ"],
        explanation: "'Doko' is the Japanese word for 'where'. Essential for finding bathrooms or castle gates!"
      }
    ]
  },
  {
    id: "train",
    name: "Train Station (🚄)",
    theme: "Transportation & Travel Help",
    description: "Learn to ride the super-fast Bullet Train (Shinkansen) and ask friendly conductors for help!",
    emoji: "🚄",
    vocabCount: 28,
    difficulty: "⭐⭐",
    ageFocus: "Both",
    japanFacts: [
      "The Shinkansen (Bullet Train) can travel at speeds of up to 320 km/h (200 mph)!",
      "Japanese trains are famous for being incredibly punctual, often arriving down to the exact second.",
      "The average delay of the bullet train is less than 1 minute over an entire year!"
    ],
    vocabList: [
      { id: "tr1", japanese: "新幹線", romaji: "Shinkansen", english: "Bullet Train", emoji: "🚄", category: "Travel" },
      { id: "tr2", japanese: "電車", romaji: "Densha", english: "Train", emoji: "🚃", category: "Travel" },
      { id: "tr3", japanese: "切符", romaji: "Kippu", english: "Ticket", emoji: "🎫", category: "Travel" },
      { id: "tr4", japanese: "改札", romaji: "Kaisatsu", english: "Ticket gate", emoji: "🚧", category: "Travel" },
      { id: "tr5", japanese: "プラットホーム", romaji: "Purattohoomu", english: "Platform", emoji: "🚉", category: "Travel" },
      { id: "tr6", japanese: "乗り換え", romaji: "Norikae", english: "Transfer / Change trains", emoji: "🔄", category: "Travel" },
      { id: "tr7", japanese: "窓", romaji: "Mado", english: "Window", emoji: "🪟", category: "Travel" },
      { id: "tr8", japanese: "席", romaji: "Seki", english: "Seat", emoji: "💺", category: "Travel" },
      { id: "tr9", japanese: "カバン", romaji: "Kaban", english: "Bag / Suitcase", emoji: "💼", category: "Travel" },
      { id: "tr10", japanese: "富士山", romaji: "Fujisan", english: "Mount Fuji", emoji: "🗻", category: "Places" },
      { id: "tr11", japanese: "速い", romaji: "Hayai", english: "Fast / Quick", emoji: "⚡", category: "Adjectives" },
      { id: "tr12", japanese: "遅い", romaji: "Osoi", english: "Slow", emoji: "🐢", category: "Adjectives" },
      { id: "tr13", japanese: "切符売り場", romaji: "Kippu uriba", english: "Ticket office", emoji: "🎟️", category: "Travel" },
      { id: "tr14", japanese: "次", romaji: "Tsugi", english: "Next", emoji: "⏭️", category: "Travel" },
      { id: "tr15", japanese: "出口", romaji: "Deguchi", english: "Exit", emoji: "🚪", category: "Travel" },
      { id: "tr16", japanese: "入口", romaji: "Iriguchi", english: "Entrance", emoji: "🚪", category: "Travel" },
      { id: "tr17", japanese: "助けて", romaji: "Tasukete", english: "Help me!", emoji: "🆘", category: "Help" },
      { id: "tr18", japanese: "無くしました", romaji: "Nakushimashita", english: "I lost (something)", emoji: "😭", category: "Help" },
      { id: "tr19", japanese: "待って", romaji: "Matte", english: "Wait!", emoji: "✋", category: "Help" },
      { id: "tr20", japanese: "地図", romaji: "Chizu", english: "Map", emoji: "🗺️", category: "Travel" },
      { id: "tr21", japanese: "パスポート", romaji: "Pasupooto", english: "Passport", emoji: "🛂", category: "Travel" },
      { id: "tr22", japanese: "時計", romaji: "Tokei", english: "Clock / Time", emoji: "⏰", category: "Travel" },
      { id: "tr23", japanese: "大丈夫", romaji: "Daijoubu", english: "Okay / No problem", emoji: "👌", category: "Help" },
      { id: "tr24", japanese: "ホテル", romaji: "Hoteru", english: "Hotel", emoji: "🏨", category: "Places" },
      { id: "tr25", japanese: "タクシー", romaji: "Takushii", english: "Taxi", emoji: "🚕", category: "Travel" },
      { id: "tr26", japanese: "バス", romaji: "Basu", english: "Bus", emoji: "🚌", category: "Travel" },
      { id: "tr27", japanese: "地下鉄", romaji: "Chikatetsu", english: "Subway", emoji: "🚇", category: "Travel" },
      { id: "tr28", japanese: "東京駅", romaji: "Toukyou eki", english: "Tokyo Station", emoji: "🚉", category: "Places" }
    ],
    dialogues: [
      {
        id: "trd1",
        title: "Lost Ticket Help",
        japanese: ["A: すみません、切符を無くしました。", "B: 大丈夫ですよ。一緒に探しましょう。"],
        romaji: ["A: Sumimasen, kippu o nakushimashita.", "B: Daijoubu desu yo. Issho ni sagashimashou."],
        english: ["A: Excuse me, I lost my ticket.", "B: It's okay. Let's look for it together."],
        missingIndex: 0,
        missingWordJapanese: "切符",
        missingWordEnglish: "Ticket",
        options: ["切符", "パスポート", "カバン", "駅"],
        explanation: "'Kippu' means train ticket. If you lose it, tell the officer 'Kippu o nakushimashita'!"
      },
      {
        id: "trd2",
        title: "Hurry Up! Wait!",
        japanese: ["A: 新幹線が来ますよ！速い！", "B: ちょっと待って！カバンがあります！"],
        romaji: ["A: Shinkansen ga kimasu yo! Hayai!", "B: Chotto matte! Kaban ga arimasu!"],
        english: ["A: The bullet train is coming! Fast!", "B: Wait a moment! I have my bags!"],
        missingIndex: 1,
        missingWordJapanese: "待って",
        missingWordEnglish: "Wait!",
        options: ["待って", "助けて", "大丈夫", "出口"],
        explanation: "'Matte' (or polite 'Chotto matte kudasai') means 'Wait!'. Very helpful in busy train stations!"
      }
    ]
  },
  {
    id: "okinawa",
    name: "Okinawa (🏖️)",
    theme: "Activities & Nature",
    description: "Learn tropical words, sea animal names, and outdoor actions on the sunny beaches of Okinawa!",
    emoji: "🏖️",
    vocabCount: 22,
    difficulty: "⭐",
    ageFocus: "Lily (5)",
    japanFacts: [
      "Okinawa is a group of tropical islands in Japan with crystal clear water and white sand beaches!",
      "Okinawa has a world-famous aquarium with massive Whale Sharks called Churaumi!",
      "People in Okinawa live longer than almost anywhere else on Earth!"
    ],
    vocabList: [
      { id: "ok1", japanese: "海", romaji: "Umi", english: "Sea / Ocean", emoji: "🌊", category: "Nature" },
      { id: "ok2", japanese: "太陽", romaji: "Taiyou", english: "Sun", emoji: "☀️", category: "Nature" },
      { id: "ok3", japanese: "魚", romaji: "Sakana", english: "Fish", emoji: "🐟", category: "Animals" },
      { id: "ok4", japanese: "カニ", romaji: "Kani", english: "Crab", emoji: "🦀", category: "Animals" },
      { id: "ok5", japanese: "貝", romaji: "Kai", english: "Shell", emoji: "🐚", category: "Nature" },
      { id: "ok6", japanese: "カメ", romaji: "Kame", english: "Turtle", emoji: "🐢", category: "Animals" },
      { id: "ok7", japanese: "泳ぐ", romaji: "Oyogu", english: "To swim", emoji: "🏊", category: "Activities" },
      { id: "ok8", japanese: "走る", romaji: "Hashiru", english: "To run", emoji: "🏃", category: "Activities" },
      { id: "ok9", japanese: "遊ぶ", romaji: "Asobu", english: "To play", emoji: "🪀", category: "Activities" },
      { id: "ok10", japanese: "暑い", romaji: "Atsui", english: "Hot", emoji: "🥵", category: "Adjectives" },
      { id: "ok11", japanese: "青い", romaji: "Aoi", english: "Blue", emoji: "🔵", category: "Colors" },
      { id: "ok12", japanese: "白い", romaji: "Shiroi", english: "White", emoji: "⚪", category: "Colors" },
      { id: "ok13", japanese: "クジラ", romaji: "Kujira", english: "Whale", emoji: "🐋", category: "Animals" },
      { id: "ok14", japanese: "サメ", romaji: "Same", english: "Shark", emoji: "🦈", category: "Animals" },
      { id: "ok15", japanese: "ヤシの木", romaji: "Yashi no ki", english: "Palm Tree", emoji: "🌴", category: "Nature" },
      { id: "ok16", japanese: "船", romaji: "Fune", english: "Boat / Ship", emoji: "🚢", category: "Travel" },
      { id: "ok17", japanese: "島", romaji: "Shima", english: "Island", emoji: "🏝️", category: "Nature" },
      { id: "ok18", japanese: "綺麗", romaji: "Kirei", english: "Beautiful / Pretty", emoji: "✨", category: "Adjectives" },
      { id: "ok19", japanese: "星", romaji: "Hoshi", english: "Star", emoji: "⭐", category: "Nature" },
      { id: "ok20", japanese: "花", romaji: "Hana", english: "Flower", emoji: "🌸", category: "Nature" },
      { id: "ok21", japanese: "黄色い", romaji: "Kiiroi", english: "Yellow", emoji: "🟡", category: "Colors" },
      { id: "ok22", japanese: "ウクレレ", romaji: "Ukurere", english: "Ukulele", emoji: "🪕", category: "Culture" }
    ],
    dialogues: [
      {
        id: "okd1",
        title: "At the Beach",
        japanese: ["A: 海が綺麗ですね！", "B: 本当ですね！泳ぎましょう！"],
        romaji: ["A: Umi ga kirei desu ne!", "B: Hontou desu ne! Oyogimashou!"],
        english: ["A: The ocean is beautiful!", "B: It really is! Let's swim!"],
        missingIndex: 0,
        missingWordJapanese: "海",
        missingWordEnglish: "Sea / Ocean",
        options: ["海", "太陽", "島", "サメ"],
        explanation: "'Umi' is the word for Sea or Ocean. Perfect word for tropical beaches!"
      },
      {
        id: "okd2",
        title: "Hot and Sunny",
        japanese: ["A: 今日はとても暑いですね！", "B: はい、太陽が眩しいです！"],
        romaji: ["A: Kyou wa totemo atsui desu ne!", "B: Hai, taiyou ga mabushii desu!"],
        english: ["A: Today is very hot!", "B: Yes, the sun is so bright!"],
        missingIndex: 0,
        missingWordJapanese: "暑い",
        missingWordEnglish: "Hot",
        options: ["暑い", "綺麗", "青い", "白い"],
        explanation: "'Atsui' means hot. Use it when lounging on Okinawa's sunny shores!"
      }
    ]
  },
  {
    id: "takayama",
    name: "Takayama (🎎)",
    theme: "Family & Traditions",
    description: "Learn to introduce your family, talk about grandparents, and enjoy traditional Japanese houses!",
    emoji: "🎎",
    vocabCount: 20,
    difficulty: "⭐⭐",
    ageFocus: "Both",
    japanFacts: [
      "Takayama is high in the mountains and is famous for its beautiful wood carvings and traditional Edo-period houses!",
      "In winter, the historic village nearby (Shirakawa-go) gets covered in several meters of snow, looking like a fairytale!",
      "People here make cute, faceless red dolls called 'Sarubobo' as lucky charms!"
    ],
    vocabList: [
      { id: "ta1", japanese: "家族", romaji: "Kazoku", english: "Family", emoji: "👨‍👩‍👧‍👦", category: "Family" },
      { id: "ta2", japanese: "お父さん", romaji: "Otousan", english: "Father / Dad", emoji: "👨", category: "Family" },
      { id: "ta3", japanese: "お母さん", romaji: "Okaasan", english: "Mother / Mom", emoji: "👩", category: "Family" },
      { id: "ta4", japanese: "お兄さん", romaji: "Oniisan", english: "Big Brother", emoji: "👦", category: "Family" },
      { id: "ta5", japanese: "お姉さん", romaji: "Oneesan", english: "Big Sister", emoji: "👧", category: "Family" },
      { id: "ta6", japanese: "おじいちゃん", romaji: "Ojiichan", english: "Grandpa", emoji: "👴", category: "Family" },
      { id: "ta7", japanese: "おばあちゃん", romaji: "Obaachan", english: "Grandma", emoji: "👵", category: "Family" },
      { id: "ta8", japanese: "家", romaji: "Ie", english: "House / Home", emoji: "🏠", category: "Places" },
      { id: "ta9", japanese: "畳", romaji: "Tatami", english: "Straw mat floor", emoji: "🌾", category: "Culture" },
      { id: "ta10", japanese: "布団", romaji: "Futon", english: "Futon bed", emoji: "🛏️", category: "Culture" },
      { id: "ta11", japanese: "妹", romaji: "Imouto", english: "Little Sister", emoji: "👧", category: "Family" },
      { id: "ta12", japanese: "弟", romaji: "Otouto", english: "Little Brother", emoji: "👦", category: "Family" },
      { id: "ta13", japanese: "寒い", romaji: "Samui", english: "Cold", emoji: "🥶", category: "Adjectives" },
      { id: "ta14", japanese: "雪", romaji: "Yuki", english: "Snow", emoji: "❄️", category: "Nature" },
      { id: "ta15", japanese: "人形", romaji: "Ningyou", english: "Doll", emoji: "🧸", category: "Culture" },
      { id: "ta16", japanese: "古い", romaji: "Furui", english: "Old", emoji: "🕰️", category: "Adjectives" },
      { id: "ta17", japanese: "新しい", romaji: "Atarashii", english: "New", emoji: "✨", category: "Adjectives" },
      { id: "ta18", japanese: "温泉", romaji: "Onsen", english: "Hot Spring", emoji: "♨️", category: "Places" },
      { id: "ta19", japanese: "日本", romaji: "Nihon", english: "Japan", emoji: "🇯🇵", category: "Places" },
      { id: "ta20", japanese: "大好き", romaji: "Daisuki", english: "Love / Like very much", emoji: "❤️", category: "Feelings" }
    ],
    dialogues: [
      {
        id: "tad1",
        title: "Introducing Family",
        japanese: ["A: こちらは私のおじいちゃんです。", "B: はじめまして！どうぞよろしく！"],
        romaji: ["A: Kochira wa watashi no ojiichan desu.", "B: Hajimemashite! Douzo yoroshiku!"],
        english: ["A: This is my grandpa.", "B: Nice to meet you! Best regards!"],
        missingIndex: 0,
        missingWordJapanese: "おじいちゃん",
        missingWordEnglish: "Grandpa",
        options: ["おじいちゃん", "お母さん", "お父さん", "おばあちゃん"],
        explanation: "'Ojiichan' is the friendly word for grandfather. Perfect for introducing your grandpa!"
      },
      {
        id: "tad2",
        title: "I Love Japan",
        japanese: ["A: 日本が大好きですか？", "B: はい、日本が大好きです！"],
        romaji: ["A: Nihon ga daisuki desu ka?", "B: Hai, Nihon ga daisuki desu!"],
        english: ["A: Do you love Japan?", "B: Yes, I love Japan!"],
        missingIndex: 1,
        missingWordJapanese: "大好き",
        missingWordEnglish: "Love / Like very much",
        options: ["大好き", "寒い", "古い", "新しい"],
        explanation: "'Daisuki' means to love or like very much. You can say 'Nihon ga daisuki desu!'"
      }
    ]
  }
];

export const ALL_VOCABULARY: VocabularyWord[] = DESTINATIONS_DATA.flatMap(d => d.vocabList);
