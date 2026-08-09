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

export interface ConversationTurnOption {
  text: string;
  english: string;
  isCorrect: boolean;
  feedback: string;
  score: number;
}

export interface ConversationTurn {
  speaker: string;
  japanese: string;
  romaji: string;
  english: string;
  options?: ConversationTurnOption[];
}

export interface ConversationScenario {
  id: string;
  title: string;
  difficulty: string;
  description: string;
  turns: ConversationTurn[];
  category?: string;
  minLevel?: number;
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
          "こんにちは。美味しいお茶をありがとうございました。"
        ]
      }
    ],
    conversations: [
      {
        id: "kyoto_conv_1",
        title: "Temple Entrance Greeting",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Temple Entrance Greeting in Kyoto.",
        category: "restaurant",
        minLevel: 1,
        turns: [
          {
            speaker: "Waiter",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Waiter",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "kyoto_conv_2",
        title: "Temple Etiquette Questions",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Temple Etiquette Questions in Kyoto.",
        category: "hotel",
        minLevel: 26,
        turns: [
          {
            speaker: "Hotel Clerk",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "kyoto_conv_3",
        title: "Meeting Kyoto Artisan",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Meeting Kyoto Artisan in Kyoto.",
        category: "culture",
        minLevel: 46,
        turns: [
          {
            speaker: "Cultural Guide",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "kyoto_conv_4",
        title: "Attending Tea Ceremony",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Attending Tea Ceremony in Kyoto.",
        category: "emergency",
        minLevel: 46,
        turns: [
          {
            speaker: "Official Officer",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "kyoto_conv_5",
        title: "Asking About Geisha Culture",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Asking About Geisha Culture in Kyoto.",
        category: "shopping",
        minLevel: 26,
        turns: [
          {
            speaker: "Shopkeeper",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "kyoto_conv_6",
        title: "Shopping in Arashiyama Bamboo Grove",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Shopping in Arashiyama Bamboo Grove in Kyoto.",
        category: "greeting",
        minLevel: 1,
        turns: [
          {
            speaker: "Friendly Local",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Friendly Local",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "kyoto_conv_7",
        title: "Asking for Directions to Kiyomizu-dera",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Asking for Directions to Kiyomizu-dera in Kyoto.",
        category: "transportation",
        minLevel: 26,
        turns: [
          {
            speaker: "Station Staff",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "kyoto_conv_8",
        title: "Traditional Inn Check-in",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Traditional Inn Check-in in Kyoto.",
        category: "sightseeing",
        minLevel: 46,
        turns: [
          {
            speaker: "Local Resident",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      }
    ],
  },
  {
    id: "tokyo",
    name: "Tokyo (🍜)",
    theme: "Food & Ordering",
    description: "Navigate high-tech restaurants, order amazing ramen, and explore the neon streets of Tokyo!",
    emoji: "🍜",
    vocabCount: 30,
    difficulty: "⭐⭐⭐",
    ageFocus: "James",
    japanFacts: [
      "Tokyo is the most populated metropolitan area in the whole world!",
      "You can buy almost anything from Tokyo's millions of vending machines, including hot canned soup!",
      "Tokyo has the world's busiest pedestrian crossing, called Shibuya Crossing."
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
          "The word '部屋' (Heya - room) or 'ホテル' (Hoteru - hotel)"
        ],
        suggestedAnswers: [
          "すみません、部屋はありますか？"
        ]
      }
    ],
    conversations: [
      {
        id: "tokyo_conv_1",
        title: "Ordering Ramen (Elementary)",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Ordering Ramen (Elementary) in Tokyo.",
        category: "restaurant",
        minLevel: 1,
        turns: [
          {
            speaker: "Waiter",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Waiter",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "tokyo_conv_2",
        title: "Ordering Ramen (Intermediate)",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Ordering Ramen (Intermediate) in Tokyo.",
        category: "hotel",
        minLevel: 26,
        turns: [
          {
            speaker: "Hotel Clerk",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "tokyo_conv_3",
        title: "Ordering Ramen (Advanced)",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Ordering Ramen (Advanced) in Tokyo.",
        category: "culture",
        minLevel: 46,
        turns: [
          {
            speaker: "Cultural Guide",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "tokyo_conv_4",
        title: "Complaining About Food",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Complaining About Food in Tokyo.",
        category: "emergency",
        minLevel: 46,
        turns: [
          {
            speaker: "Official Officer",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "tokyo_conv_5",
        title: "Train Station - Buying Ticket",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Train Station - Buying Ticket in Tokyo.",
        category: "shopping",
        minLevel: 26,
        turns: [
          {
            speaker: "Shopkeeper",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "tokyo_conv_6",
        title: "Train Station - Asking for Platform",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Train Station - Asking for Platform in Tokyo.",
        category: "greeting",
        minLevel: 1,
        turns: [
          {
            speaker: "Friendly Local",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Friendly Local",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "tokyo_conv_7",
        title: "Convenience Store Shopping",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Convenience Store Shopping in Tokyo.",
        category: "transportation",
        minLevel: 26,
        turns: [
          {
            speaker: "Station Staff",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "tokyo_conv_8",
        title: "Hotel Check-in Issues",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Hotel Check-in Issues in Tokyo.",
        category: "sightseeing",
        minLevel: 46,
        turns: [
          {
            speaker: "Local Resident",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      }
    ],
  },
  {
    id: "osaka",
    name: "Osaka (🛕)",
    theme: "Numbers & Directions",
    description: "Master counting, shopping, asking for directions, and finding castles in Osaka!",
    emoji: "🛕",
    vocabCount: 25,
    difficulty: "⭐",
    ageFocus: "Lily",
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
      }
    ],
    conversations: [
      {
        id: "osaka_conv_1",
        title: "Clothing Store - Asking for Size",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Clothing Store - Asking for Size in Osaka.",
        category: "restaurant",
        minLevel: 1,
        turns: [
          {
            speaker: "Waiter",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Waiter",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "osaka_conv_2",
        title: "Market Haggling",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Market Haggling in Osaka.",
        category: "hotel",
        minLevel: 26,
        turns: [
          {
            speaker: "Hotel Clerk",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "osaka_conv_3",
        title: "Takoyaki Stand",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Takoyaki Stand in Osaka.",
        category: "culture",
        minLevel: 46,
        turns: [
          {
            speaker: "Cultural Guide",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "osaka_conv_4",
        title: "Osaka Street Food Tour",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Osaka Street Food Tour in Osaka.",
        category: "emergency",
        minLevel: 46,
        turns: [
          {
            speaker: "Official Officer",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "osaka_conv_5",
        title: "Shopping Mall Navigation",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Shopping Mall Navigation in Osaka.",
        category: "shopping",
        minLevel: 26,
        turns: [
          {
            speaker: "Shopkeeper",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "osaka_conv_6",
        title: "Return/Exchange at Store",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Return/Exchange at Store in Osaka.",
        category: "greeting",
        minLevel: 1,
        turns: [
          {
            speaker: "Friendly Local",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Friendly Local",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "osaka_conv_7",
        title: "Finding Dotonbori Canal",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Finding Dotonbori Canal in Osaka.",
        category: "transportation",
        minLevel: 26,
        turns: [
          {
            speaker: "Station Staff",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "osaka_conv_8",
        title: "Casual Greeting with Osaka Local",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Casual Greeting with Osaka Local in Osaka.",
        category: "sightseeing",
        minLevel: 46,
        turns: [
          {
            speaker: "Local Resident",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      }
    ],
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
        japanese: ["A: すみません、切符を無くしました。", "B: 大秘密ですよ。一緒に探しましょう。"],
        romaji: ["A: Sumimasen, kippu o nakushimashita.", "B: Daijoubu desu yo. Issho ni sagashimashou."],
        english: ["A: Excuse me, I lost my ticket.", "B: It's okay. Let's look for it together."],
        missingIndex: 0,
        missingWordJapanese: "切符",
        missingWordEnglish: "Ticket",
        options: ["切符", "パスポート", "カバン", "駅"],
        explanation: "'Kippu' means train ticket."
      }
    ],
    conversations: [
      {
        id: "train_conv_1",
        title: "Buying Platform Ticket",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Buying Platform Ticket in Train.",
        category: "restaurant",
        minLevel: 1,
        turns: [
          {
            speaker: "Waiter",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Waiter",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "train_conv_2",
        title: "Finding Lost Luggage",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Finding Lost Luggage in Train.",
        category: "hotel",
        minLevel: 26,
        turns: [
          {
            speaker: "Hotel Clerk",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "train_conv_3",
        title: "Asking About Train Delay",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Asking About Train Delay in Train.",
        category: "culture",
        minLevel: 46,
        turns: [
          {
            speaker: "Cultural Guide",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "train_conv_4",
        title: "Buying JR Pass",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Buying JR Pass in Train.",
        category: "emergency",
        minLevel: 46,
        turns: [
          {
            speaker: "Official Officer",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "train_conv_5",
        title: "Getting Luggage Assistance",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Getting Luggage Assistance in Train.",
        category: "shopping",
        minLevel: 26,
        turns: [
          {
            speaker: "Shopkeeper",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "train_conv_6",
        title: "Shinkansen Bento Purchase",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Shinkansen Bento Purchase in Train.",
        category: "greeting",
        minLevel: 1,
        turns: [
          {
            speaker: "Friendly Local",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Friendly Local",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "train_conv_7",
        title: "Reserving Shinkansen Seats",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Reserving Shinkansen Seats in Train.",
        category: "transportation",
        minLevel: 26,
        turns: [
          {
            speaker: "Station Staff",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "train_conv_8",
        title: "Missing the Last Train",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Missing the Last Train in Train.",
        category: "sightseeing",
        minLevel: 46,
        turns: [
          {
            speaker: "Local Resident",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      }
    ],
  },
  {
    id: "shopping",
    name: "Shopping District (🛍️)",
    theme: "Store Shopping & Asking Prices",
    description: "Explore colorful retail streets, navigate souvenir boutiques, and master the art of shopping!",
    emoji: "🛍️",
    vocabCount: 15,
    difficulty: "⭐",
    ageFocus: "Both",
    japanFacts: [
      "Japanese department stores often have giant basement food halls called 'depachika'.",
      "Most retail stores offer duty-free tax exemptions for international tourists!"
    ],
    vocabList: [
      { id: "sh1", japanese: "お店", romaji: "Omise", english: "Store", emoji: "🏪", category: "Places" },
      { id: "sh2", japanese: "いくら", romaji: "Ikura", english: "How much?", emoji: "💰", category: "Shopping" },
      { id: "sh3", japanese: "財布", romaji: "Saifu", english: "Wallet", emoji: "👛", category: "Shopping" },
      { id: "sh4", japanese: "カード", romaji: "Kaado", english: "Credit Card", emoji: "💳", category: "Shopping" },
      { id: "sh5", japanese: "お釣り", romaji: "Otsuri", english: "Change", emoji: "🪙", category: "Shopping" }
    ],
    dialogues: [
      {
        id: "shd1",
        title: "Paying for Souvenirs",
        japanese: ["A: カードは使えますか？", "B: はい、使えますよ。"],
        romaji: ["A: Kaado wa tsakaemasu ka?", "B: Hai, tsakaemasu yo."],
        english: ["A: Can I use credit card?", "B: Yes, you can use it."],
        missingIndex: 0,
        missingWordJapanese: "カード",
        missingWordEnglish: "Credit Card",
        options: ["カード", "お釣り", "財布", "お店"],
        explanation: "'Kaado' is the Japanese gairaigo word for credit card."
      }
    ],
    conversations: [
      {
        id: "shopping_conv_1",
        title: "Souvenir Shop - Asking Price",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Souvenir Shop - Asking Price in Shopping.",
        category: "restaurant",
        minLevel: 1,
        turns: [
          {
            speaker: "Waiter",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Waiter",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "shopping_conv_2",
        title: "Clothes Shopping - Finding Right Size",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Clothes Shopping - Finding Right Size in Shopping.",
        category: "hotel",
        minLevel: 26,
        turns: [
          {
            speaker: "Hotel Clerk",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "shopping_conv_3",
        title: "Electronics Store - Technical Questions",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Electronics Store - Technical Questions in Shopping.",
        category: "culture",
        minLevel: 46,
        turns: [
          {
            speaker: "Cultural Guide",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "shopping_conv_4",
        title: "Returning Defective Item",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Returning Defective Item in Shopping.",
        category: "emergency",
        minLevel: 46,
        turns: [
          {
            speaker: "Official Officer",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "shopping_conv_5",
        title: "Bookstore Navigation",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Bookstore Navigation in Shopping.",
        category: "shopping",
        minLevel: 26,
        turns: [
          {
            speaker: "Shopkeeper",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "shopping_conv_6",
        title: "Pharmacy - Asking for Medication",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Pharmacy - Asking for Medication in Shopping.",
        category: "greeting",
        minLevel: 1,
        turns: [
          {
            speaker: "Friendly Local",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Friendly Local",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "shopping_conv_7",
        title: "Requesting Gift Wrapping",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Requesting Gift Wrapping in Shopping.",
        category: "transportation",
        minLevel: 26,
        turns: [
          {
            speaker: "Station Staff",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "shopping_conv_8",
        title: "Paying with Credit Card",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Paying with Credit Card in Shopping.",
        category: "sightseeing",
        minLevel: 46,
        turns: [
          {
            speaker: "Local Resident",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      }
    ],
  },
  {
    id: "okinawa",
    name: "Okinawa (🏖️)",
    theme: "Activities & Nature",
    description: "Learn tropical words, sea animal names, and outdoor actions on the sunny beaches of Okinawa!",
    emoji: "🏖️",
    vocabCount: 22,
    difficulty: "⭐",
    ageFocus: "Lily",
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
        explanation: "'Umi' is the word for Sea or Ocean."
      }
    ],
    conversations: [
      {
        id: "okinawa_conv_1",
        title: "Beach Activities Conversation",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Beach Activities Conversation in Okinawa.",
        category: "restaurant",
        minLevel: 1,
        turns: [
          {
            speaker: "Waiter",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Waiter",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "okinawa_conv_2",
        title: "Asking About Local Traditions",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Asking About Local Traditions in Okinawa.",
        category: "hotel",
        minLevel: 26,
        turns: [
          {
            speaker: "Hotel Clerk",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "okinawa_conv_3",
        title: "Water Sports Lesson",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Water Sports Lesson in Okinawa.",
        category: "culture",
        minLevel: 46,
        turns: [
          {
            speaker: "Cultural Guide",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "okinawa_conv_4",
        title: "Island Tour Guide",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Island Tour Guide in Okinawa.",
        category: "emergency",
        minLevel: 46,
        turns: [
          {
            speaker: "Official Officer",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "okinawa_conv_5",
        title: "Local Restaurant Discovery",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Local Restaurant Discovery in Okinawa.",
        category: "shopping",
        minLevel: 26,
        turns: [
          {
            speaker: "Shopkeeper",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "okinawa_conv_6",
        title: "Asking for Beach Towels",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Asking for Beach Towels in Okinawa.",
        category: "greeting",
        minLevel: 1,
        turns: [
          {
            speaker: "Friendly Local",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Friendly Local",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "okinawa_conv_7",
        title: "Shell Collecting Chat",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Shell Collecting Chat in Okinawa.",
        category: "transportation",
        minLevel: 26,
        turns: [
          {
            speaker: "Station Staff",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "okinawa_conv_8",
        title: "Marine Life Center Inquiries",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Marine Life Center Inquiries in Okinawa.",
        category: "sightseeing",
        minLevel: 46,
        turns: [
          {
            speaker: "Local Resident",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      }
    ],
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
        explanation: "'Ojiichan' is the friendly word for grandfather."
      }
    ],
    conversations: [
      {
        id: "takayama_conv_1",
        title: "Greeting Grandmother",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Greeting Grandmother in Takayama.",
        category: "restaurant",
        minLevel: 1,
        turns: [
          {
            speaker: "Waiter",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Waiter",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "takayama_conv_2",
        title: "Asking About Her Day",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Asking About Her Day in Takayama.",
        category: "hotel",
        minLevel: 26,
        turns: [
          {
            speaker: "Hotel Clerk",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "takayama_conv_3",
        title: "Complimenting Her Cooking",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Complimenting Her Cooking in Takayama.",
        category: "culture",
        minLevel: 46,
        turns: [
          {
            speaker: "Cultural Guide",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "takayama_conv_4",
        title: "Saying Goodbye",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Saying Goodbye in Takayama.",
        category: "emergency",
        minLevel: 46,
        turns: [
          {
            speaker: "Official Officer",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "takayama_conv_5",
        title: "Exploring Traditional Woodcraft",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Exploring Traditional Woodcraft in Takayama.",
        category: "shopping",
        minLevel: 26,
        turns: [
          {
            speaker: "Shopkeeper",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "takayama_conv_6",
        title: "Visiting Hida Folk Village",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Visiting Hida Folk Village in Takayama.",
        category: "greeting",
        minLevel: 1,
        turns: [
          {
            speaker: "Friendly Local",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Friendly Local",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "takayama_conv_7",
        title: "Staying in a Heated Kotatsu",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Staying in a Heated Kotatsu in Takayama.",
        category: "transportation",
        minLevel: 26,
        turns: [
          {
            speaker: "Station Staff",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "takayama_conv_8",
        title: "Snowfall Safety Advice",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Snowfall Safety Advice in Takayama.",
        category: "sightseeing",
        minLevel: 46,
        turns: [
          {
            speaker: "Local Resident",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      }
    ],
  },
  {
    id: "sendai",
    name: "Sendai (🎋)",
    theme: "History & Festival",
    description: "Step into the domain of legendary samurai Masamune Date and learn historic cultural terms!",
    emoji: "🎋",
    vocabCount: 15,
    difficulty: "⭐⭐",
    ageFocus: "Both",
    japanFacts: [
      "Sendai is known as the 'City of Trees' due to its lush green streets.",
      "The Sendai Tanabata Festival is the most famous Tanabata festival in all of Japan!"
    ],
    vocabList: [
      { id: "se1", japanese: "祭り", romaji: "Matsuri", english: "Festival", emoji: "🏮", category: "Culture" },
      { id: "se2", japanese: "歴史", romaji: "Rekishi", english: "History", emoji: "📜", category: "Culture" },
      { id: "se3", japanese: "城跡", romaji: "Joato", english: "Castle Ruins", emoji: "🏯", category: "Places" },
      { id: "se4", japanese: "七夕", romaji: "Tanabata", english: "Star Festival", emoji: "🎋", category: "Culture" },
      { id: "se5", japanese: "牛タン", romaji: "Gyutan", english: "Beef Tongue", emoji: "🥩", category: "Food" }
    ],
    dialogues: [
      {
        id: "sed1",
        title: "Tanabata Wishes",
        japanese: ["A: 七夕の短冊に願い事を書きましたか？", "B: はい、書きました！"],
        romaji: ["A: Tanabata no tanzaku ni negaigoto o kakimashita ka?", "B: Hai, kakimashita!"],
        english: ["A: Did you write a wish on the Tanabata paper?", "B: Yes, I wrote it!"],
        missingIndex: 0,
        missingWordJapanese: "七夕",
        missingWordEnglish: "Star Festival",
        options: ["七夕", "祭り", "歴史", "牛タン"],
        explanation: "'Tanabata' is the Star Festival."
      }
    ],
    conversations: [
      {
        id: "sendai_conv_1",
        title: "Museum Tour Guide",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Museum Tour Guide in Sendai.",
        category: "restaurant",
        minLevel: 1,
        turns: [
          {
            speaker: "Waiter",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Waiter",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "sendai_conv_2",
        title: "Historical Site Questions",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Historical Site Questions in Sendai.",
        category: "hotel",
        minLevel: 26,
        turns: [
          {
            speaker: "Hotel Clerk",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "sendai_conv_3",
        title: "Local Food Specialty",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Local Food Specialty in Sendai.",
        category: "culture",
        minLevel: 46,
        turns: [
          {
            speaker: "Cultural Guide",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "sendai_conv_4",
        title: "Asking About Sendai Dialect",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Asking About Sendai Dialect in Sendai.",
        category: "emergency",
        minLevel: 46,
        turns: [
          {
            speaker: "Official Officer",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "sendai_conv_5",
        title: "Regional Festival Discussion",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Regional Festival Discussion in Sendai.",
        category: "shopping",
        minLevel: 26,
        turns: [
          {
            speaker: "Shopkeeper",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "sendai_conv_6",
        title: "Buying Masamune Souvenirs",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Buying Masamune Souvenirs in Sendai.",
        category: "greeting",
        minLevel: 1,
        turns: [
          {
            speaker: "Friendly Local",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Friendly Local",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "sendai_conv_7",
        title: "Walking in Pine Islands",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Walking in Pine Islands in Sendai.",
        category: "transportation",
        minLevel: 26,
        turns: [
          {
            speaker: "Station Staff",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "sendai_conv_8",
        title: "Winter Illuminations Directions",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Winter Illuminations Directions in Sendai.",
        category: "sightseeing",
        minLevel: 46,
        turns: [
          {
            speaker: "Local Resident",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      }
    ],
  },
  {
    id: "hiroshima",
    name: "Hiroshima (🕊️)",
    theme: "Peace & Legacy",
    description: "Visit the inspiring Peace Memorial Park and learn expressions of respect and friendship.",
    emoji: "🕊️",
    vocabCount: 15,
    difficulty: "⭐⭐⭐",
    ageFocus: "Both",
    japanFacts: [
      "Hiroshima's Peace Memorial Park is dedicated to legacy of world peace.",
      "The famous Itsukushima Shrine torii gate nearby appears to float on water at high tide!"
    ],
    vocabList: [
      { id: "hi1", japanese: "平和", romaji: "Heiwa", english: "Peace", emoji: "🕊️", category: "Basics" },
      { id: "hi2", japanese: "公園", romaji: "Kouen", english: "Park", emoji: "🌳", category: "Places" },
      { id: "hi3", japanese: "鶴", romaji: "Tsuru", english: "Crane", emoji: "🦢", category: "Animals" },
      { id: "hi4", japanese: "記念碑", romaji: "Kinenhi", english: "Memorial", emoji: "🗽", category: "Places" },
      { id: "hi5", japanese: "お好み焼き", romaji: "Okonomiyaki", english: "Okonomiyaki savory pancake", emoji: "🥞", category: "Food" }
    ],
    dialogues: [
      {
        id: "hid1",
        title: "Folding Origami Cranes",
        japanese: ["A: 一緒に平和の鶴を折りましょう。", "B: はい、素晴らしいですね。"],
        romaji: ["A: Issho ni heiwa no tsuru o orimashou.", "B: Hai, subarashii desu ne."],
        english: ["A: Let's fold peace cranes together.", "B: Yes, that is wonderful."],
        missingIndex: 0,
        missingWordJapanese: "平和",
        missingWordEnglish: "Peace",
        options: ["平和", "公園", "鶴", "記念碑"],
        explanation: "'Heiwa' is peace."
      }
    ],
    conversations: [
      {
        id: "hiroshima_conv_1",
        title: "Peace Memorial Explanation",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Peace Memorial Explanation in Hiroshima.",
        category: "restaurant",
        minLevel: 1,
        turns: [
          {
            speaker: "Waiter",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Waiter",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "hiroshima_conv_2",
        title: "Historical Conversation",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Historical Conversation in Hiroshima.",
        category: "hotel",
        minLevel: 26,
        turns: [
          {
            speaker: "Hotel Clerk",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "hiroshima_conv_3",
        title: "Respectful Questions at Memorial",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Respectful Questions at Memorial in Hiroshima.",
        category: "culture",
        minLevel: 46,
        turns: [
          {
            speaker: "Cultural Guide",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "hiroshima_conv_4",
        title: "Okonomiyaki Ordering",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Okonomiyaki Ordering in Hiroshima.",
        category: "emergency",
        minLevel: 46,
        turns: [
          {
            speaker: "Official Officer",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "hiroshima_conv_5",
        title: "Local History Discussion",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Local History Discussion in Hiroshima.",
        category: "shopping",
        minLevel: 26,
        turns: [
          {
            speaker: "Shopkeeper",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "hiroshima_conv_6",
        title: "Miyajima Shrine Boat Trip",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Miyajima Shrine Boat Trip in Hiroshima.",
        category: "greeting",
        minLevel: 1,
        turns: [
          {
            speaker: "Friendly Local",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Friendly Local",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "hiroshima_conv_7",
        title: "Asking for Paper Crane Tutorial",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Asking for Paper Crane Tutorial in Hiroshima.",
        category: "transportation",
        minLevel: 26,
        turns: [
          {
            speaker: "Station Staff",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "hiroshima_conv_8",
        title: "Peace Lantern Ceremony Chat",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Peace Lantern Ceremony Chat in Hiroshima.",
        category: "sightseeing",
        minLevel: 46,
        turns: [
          {
            speaker: "Local Resident",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      }
    ],
  },
  {
    id: "takamatsu",
    name: "Takamatsu (🍜)",
    theme: "Art & Sanuki Udon",
    description: "Delight in Sanuki Udon noodles, visit traditional Ritsurin Garden, and tour the beautiful port!",
    emoji: "🍜",
    vocabCount: 15,
    difficulty: "⭐",
    ageFocus: "Both",
    japanFacts: [
      "Kagawa prefecture (where Takamatsu is) is affectionately nicknamed 'Udon Prefecture'!",
      "Ritsurin Garden is one of the most famous and beautiful historic gardens in Japan."
    ],
    vocabList: [
      { id: "tk1", japanese: "うどん", romaji: "Udon", english: "Udon Noodles", emoji: "🍜", category: "Food" },
      { id: "tk2", japanese: "庭園", romaji: "Teien", english: "Garden", emoji: "🏡", category: "Places" },
      { id: "tk3", japanese: "港", romaji: "Minato", english: "Port", emoji: "⚓", category: "Places" },
      { id: "tk4", japanese: "美術館", romaji: "Bijutsukan", english: "Art Museum", emoji: "🖼️", category: "Places" },
      { id: "tk5", japanese: "船", romaji: "Fune", english: "Boat / Ferry", emoji: "🚢", category: "Travel" }
    ],
    dialogues: [
      {
        id: "tkd1",
        title: "Eating Sanuki Udon",
        japanese: ["A: 香川のうどんは本当に美味しいですね！", "B: コシがあって最高です！"],
        romaji: ["A: Kagawa no udon wa hontou ni oishii desu ne!", "B: Koshi ga atte saikou desu!"],
        english: ["A: Kagawa's udon is really delicious!", "B: It has great chewiness and is awesome!"],
        missingIndex: 0,
        missingWordJapanese: "うどん",
        missingWordEnglish: "Udon Noodles",
        options: ["うどん", "庭園", "港", "船"],
        explanation: "'Udon' is thick wheat noodles."
      }
    ],
    conversations: [
      {
        id: "takamatsu_conv_1",
        title: "Folk Festival Discussion",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Folk Festival Discussion in Takamatsu.",
        category: "restaurant",
        minLevel: 1,
        turns: [
          {
            speaker: "Waiter",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Waiter",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "takamatsu_conv_2",
        title: "Traditional Crafts Store",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Traditional Crafts Store in Takamatsu.",
        category: "hotel",
        minLevel: 26,
        turns: [
          {
            speaker: "Hotel Clerk",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "takamatsu_conv_3",
        title: "Market Browsing",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Market Browsing in Takamatsu.",
        category: "culture",
        minLevel: 46,
        turns: [
          {
            speaker: "Cultural Guide",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "takamatsu_conv_4",
        title: "Local Restaurant",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Local Restaurant in Takamatsu.",
        category: "emergency",
        minLevel: 46,
        turns: [
          {
            speaker: "Official Officer",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "takamatsu_conv_5",
        title: "Artistic Community Visit",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Artistic Community Visit in Takamatsu.",
        category: "shopping",
        minLevel: 26,
        turns: [
          {
            speaker: "Shopkeeper",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "takamatsu_conv_6",
        title: "Sanuki Udon Secret Recipe",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Sanuki Udon Secret Recipe in Takamatsu.",
        category: "greeting",
        minLevel: 1,
        turns: [
          {
            speaker: "Friendly Local",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Friendly Local",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "takamatsu_conv_7",
        title: "Port Ferry to Naoshima Island",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Port Ferry to Naoshima Island in Takamatsu.",
        category: "transportation",
        minLevel: 26,
        turns: [
          {
            speaker: "Station Staff",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "takamatsu_conv_8",
        title: "Bonsai Tree Care Discussion",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Bonsai Tree Care Discussion in Takamatsu.",
        category: "sightseeing",
        minLevel: 46,
        turns: [
          {
            speaker: "Local Resident",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      }
    ],
  },
  {
    id: "matsuyama",
    name: "Matsuyama (🍊)",
    theme: "Onsen Bathing & Castles",
    description: "Relax at ancient Dogo Onsen hot springs and master polite relaxation etiquette.",
    emoji: "🍊",
    vocabCount: 15,
    difficulty: "⭐⭐",
    ageFocus: "Both",
    japanFacts: [
      "Dogo Onsen is said to be the oldest hot spring in Japan, dating back 3,000 years!",
      "Matsuyama is famous for sweet mikan mandarins and delicious orange juice."
    ],
    vocabList: [
      { id: "ma1", japanese: "温泉", romaji: "Onsen", english: "Hot Spring", emoji: "♨️", category: "Places" },
      { id: "ma2", japanese: "みかん", romaji: "Mikan", english: "Mandarin Orange", emoji: "🍊", category: "Food" },
      { id: "ma3", japanese: "浴衣", romaji: "Yukata", english: "Yukata Robe", emoji: "🥋", category: "Culture" },
      { id: "ma4", japanese: "石鹸", romaji: "Sekken", english: "Soap", emoji: "🧼", category: "Basics" },
      { id: "ma5", japanese: "湯船", romaji: "Yubune", english: "Bathtub", emoji: "🛁", category: "Places" }
    ],
    dialogues: [
      {
        id: "mad1",
        title: "Relaxing in Yukata",
        japanese: ["A: 温泉の後は、浴衣を着てくださいね。", "B: はい、気持ちいいですね。"],
        romaji: ["A: Onsen no ato wa, yukata o kite kudasai ne.", "B: Hai, kimochi ii desu ne."],
        english: ["A: After the hot spring, please wear a yukata robe.", "B: Yes, it feels great."],
        missingIndex: 0,
        missingWordJapanese: "温泉",
        missingWordEnglish: "Hot Spring",
        options: ["温泉", "みかん", "浴衣", "石鹸"],
        explanation: "'Onsen' is hot spring."
      }
    ],
    conversations: [
      {
        id: "matsuyama_conv_1",
        title: "Onsen Bath Etiquette",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Onsen Bath Etiquette in Matsuyama.",
        category: "restaurant",
        minLevel: 1,
        turns: [
          {
            speaker: "Waiter",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Waiter",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "matsuyama_conv_2",
        title: "Castle Tour",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Castle Tour in Matsuyama.",
        category: "hotel",
        minLevel: 26,
        turns: [
          {
            speaker: "Hotel Clerk",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "matsuyama_conv_3",
        title: "Haiku Poetry Discussion",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Haiku Poetry Discussion in Matsuyama.",
        category: "culture",
        minLevel: 46,
        turns: [
          {
            speaker: "Cultural Guide",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "matsuyama_conv_4",
        title: "Local Tea Tasting",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Local Tea Tasting in Matsuyama.",
        category: "emergency",
        minLevel: 46,
        turns: [
          {
            speaker: "Official Officer",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "matsuyama_conv_5",
        title: "Traditional Inn (Ryokan) Check-in",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Traditional Inn (Ryokan) Check-in in Matsuyama.",
        category: "shopping",
        minLevel: 26,
        turns: [
          {
            speaker: "Shopkeeper",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "matsuyama_conv_6",
        title: "Picking Sweet Mikan Oranges",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Picking Sweet Mikan Oranges in Matsuyama.",
        category: "greeting",
        minLevel: 1,
        turns: [
          {
            speaker: "Friendly Local",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Friendly Local",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "matsuyama_conv_7",
        title: "Asking for Extra Towels",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Asking for Extra Towels in Matsuyama.",
        category: "transportation",
        minLevel: 26,
        turns: [
          {
            speaker: "Station Staff",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "matsuyama_conv_8",
        title: "Dogo Onsen History Chat",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Dogo Onsen History Chat in Matsuyama.",
        category: "sightseeing",
        minLevel: 46,
        turns: [
          {
            speaker: "Local Resident",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      }
    ],
  },
  {
    id: "nagasaki",
    name: "Nagasaki (⛪)",
    theme: "Harbors & Foreign Quarters",
    description: "Venture through picturesque hillside foreign merchant houses and historic trading ports!",
    emoji: "⛪",
    vocabCount: 15,
    difficulty: "⭐⭐⭐",
    ageFocus: "Both",
    japanFacts: [
      "Nagasaki was one of the very few ports open to foreign traders during Japan's isolation period.",
      "The city is built on dramatic hillsides, featuring unique outdoor escalators and hillside walking trails."
    ],
    vocabList: [
      { id: "na1", japanese: "坂", romaji: "Saka", english: "Hill / Slope", emoji: "📈", category: "Nature" },
      { id: "na2", japanese: "教会", romaji: "Kyoukai", english: "Church", emoji: "⛪", category: "Places" },
      { id: "na3", japanese: "貿易", romaji: "Boueki", english: "Trade", emoji: "🚢", category: "Culture" },
      { id: "na4", japanese: "カステラ", romaji: "Kasutera", english: "Sponge Cake", emoji: "🍰", category: "Food" },
      { id: "na5", japanese: "路面電車", romaji: "Romendensha", english: "Tram / Streetcar", emoji: "🚃", category: "Travel" }
    ],
    dialogues: [
      {
        id: "nad1",
        title: "Nagasaki Hill Tram",
        japanese: ["A: 路面電車に乗って、坂を登りましょう。", "B: はい、景色が綺麗ですね。"],
        romaji: ["A: Romendensha ni notte, saka o noborimashou.", "B: Hai, keshiki ga kirei desu ne."],
        english: ["A: Let's ride the tram and go up the hill.", "B: Yes, the view is beautiful."],
        missingIndex: 0,
        missingWordJapanese: "路面電車",
        missingWordEnglish: "Tram / Streetcar",
        options: ["路面電車", "カステラ", "教会", "貿易"],
        explanation: "'Romendensha' is streetcar."
      }
    ],
    conversations: [
      {
        id: "nagasaki_conv_1",
        title: "Historical Site Discussion",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Historical Site Discussion in Nagasaki.",
        category: "restaurant",
        minLevel: 1,
        turns: [
          {
            speaker: "Waiter",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Waiter",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "nagasaki_conv_2",
        title: "Asking About War History",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Asking About War History in Nagasaki.",
        category: "hotel",
        minLevel: 26,
        turns: [
          {
            speaker: "Hotel Clerk",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "nagasaki_conv_3",
        title: "Local Cuisine Specialty",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Local Cuisine Specialty in Nagasaki.",
        category: "culture",
        minLevel: 46,
        turns: [
          {
            speaker: "Cultural Guide",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "nagasaki_conv_4",
        title: "Harbor Tour",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Harbor Tour in Nagasaki.",
        category: "emergency",
        minLevel: 46,
        turns: [
          {
            speaker: "Official Officer",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "nagasaki_conv_5",
        title: "Foreign Quarter Exploration",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Foreign Quarter Exploration in Nagasaki.",
        category: "shopping",
        minLevel: 26,
        turns: [
          {
            speaker: "Shopkeeper",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "nagasaki_conv_6",
        title: "Buying Castella Sponge Cake",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Buying Castella Sponge Cake in Nagasaki.",
        category: "greeting",
        minLevel: 1,
        turns: [
          {
            speaker: "Friendly Local",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Friendly Local",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "nagasaki_conv_7",
        title: "Glover Garden Walking Directions",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Glover Garden Walking Directions in Nagasaki.",
        category: "transportation",
        minLevel: 26,
        turns: [
          {
            speaker: "Station Staff",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "nagasaki_conv_8",
        title: "Peace Park Memorial Inquiries",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Peace Park Memorial Inquiries in Nagasaki.",
        category: "sightseeing",
        minLevel: 46,
        turns: [
          {
            speaker: "Local Resident",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      }
    ],
  },
  {
    id: "fukuoka",
    name: "Fukuoka (🏮)",
    theme: "Yatai Food Carts & Markets",
    description: "Join lively locals at waterfront Yatai food stalls and order famous Hakata Tonkotsu Ramen!",
    emoji: "🏮",
    vocabCount: 15,
    difficulty: "⭐⭐",
    ageFocus: "Both",
    japanFacts: [
      "Fukuoka is famous worldwide for its 'Yatai' open-air street food stalls lining the river canals.",
      "Hakata Tonkotsu Ramen has a thick pork bone broth and thin, firm noodles!"
    ],
    vocabList: [
      { id: "fu1", japanese: "屋台", romaji: "Yatai", english: "Food Stall", emoji: "🏮", category: "Places" },
      { id: "fu2", japanese: "明太子", romaji: "Mentai", english: "Spicy Cod Roe", emoji: "🌶️", category: "Food" },
      { id: "fu3", japanese: "賑やか", romaji: "Nigiyaka", english: "Lively", emoji: "🥳", category: "Feelings" },
      { id: "fu4", japanese: "餃子", romaji: "Gyoza", english: "Dumpling", emoji: "🥟", category: "Food" },
      { id: "fu5", japanese: "乾杯", romaji: "Kanpai", english: "Cheers", emoji: "🍻", category: "Basics" }
    ],
    dialogues: [
      {
        id: "fud1",
        title: "Cheers at Yatai",
        japanese: ["A: まずは、ビールで乾杯しましょう！", "B: かんぱーい！美味しい！"],
        romaji: ["A: Mazu wa, biiru de kanpai shimashou!", "B: Kanpaai! Oishii!"],
        english: ["A: First, let's cheers with beer!", "B: Cheers! Delicious!"],
        missingIndex: 0,
        missingWordJapanese: "乾杯",
        missingWordEnglish: "Cheers",
        options: ["乾杯", "屋台", "明太子", "餃子"],
        explanation: "'Kanpai' means Cheers!"
      }
    ],
    conversations: [
      {
        id: "fukuoka_conv_1",
        title: "Hakata Ramen Ordering",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Hakata Ramen Ordering in Fukuoka.",
        category: "restaurant",
        minLevel: 1,
        turns: [
          {
            speaker: "Waiter",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Waiter",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "fukuoka_conv_2",
        title: "Yatai (Food Cart) Experience",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Yatai (Food Cart) Experience in Fukuoka.",
        category: "hotel",
        minLevel: 26,
        turns: [
          {
            speaker: "Hotel Clerk",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "fukuoka_conv_3",
        title: "Local Delicacy Shopping",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Local Delicacy Shopping in Fukuoka.",
        category: "culture",
        minLevel: 46,
        turns: [
          {
            speaker: "Cultural Guide",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "fukuoka_conv_4",
        title: "Festival Participation",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Festival Participation in Fukuoka.",
        category: "emergency",
        minLevel: 46,
        turns: [
          {
            speaker: "Official Officer",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "fukuoka_conv_5",
        title: "Regional Market Tour",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Regional Market Tour in Fukuoka.",
        category: "shopping",
        minLevel: 26,
        turns: [
          {
            speaker: "Shopkeeper",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "fukuoka_conv_6",
        title: "Ordering Spicy Cod Roe",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Ordering Spicy Cod Roe in Fukuoka.",
        category: "greeting",
        minLevel: 1,
        turns: [
          {
            speaker: "Friendly Local",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Friendly Local",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "fukuoka_conv_7",
        title: "Finding Fukuoka Tower",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Finding Fukuoka Tower in Fukuoka.",
        category: "transportation",
        minLevel: 26,
        turns: [
          {
            speaker: "Station Staff",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "fukuoka_conv_8",
        title: "Chatting with Yatai Chef",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Chatting with Yatai Chef in Fukuoka.",
        category: "sightseeing",
        minLevel: 46,
        turns: [
          {
            speaker: "Local Resident",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      }
    ],
  },
  {
    id: "mtfuji",
    name: "Mt. Fuji (🗻)",
    theme: "Mountain Climbing & Safety",
    description: "Ascend Japan's sacred majestic volcano and learn hiking directions and safety expressions.",
    emoji: "🗻",
    vocabCount: 15,
    difficulty: "⭐⭐⭐",
    ageFocus: "Both",
    japanFacts: [
      "Mt. Fuji is an active volcano and the tallest mountain in Japan at 3,776 meters!",
      "Hundreds of thousands of people climb Mt. Fuji every summer, mostly to watch the sunrise."
    ],
    vocabList: [
      { id: "mf1", japanese: "火山", romaji: "Kazan", english: "Volcano", emoji: "🌋", category: "Nature" },
      { id: "mf2", japanese: "登山", romaji: "Tozan", english: "Mountain Climbing", emoji: "🧗", category: "Activities" },
      { id: "mf3", japanese: "安全", romaji: "Anzen", english: "Safety", emoji: "🛡️", category: "Basics" },
      { id: "mf4", japanese: "日出", romaji: "Hinode", english: "Sunrise", emoji: "🌅", category: "Nature" },
      { id: "mf5", japanese: "頂上", romaji: "Choujou", english: "Summit", emoji: "🔝", category: "Places" }
    ],
    dialogues: [
      {
        id: "mfd1",
        title: "Summit Sunrise",
        japanese: ["A: 頂上で素晴らしい日出が見えますよ。", "B: うわあ、本当に感動的ですね！"],
        romaji: ["A: Choujou de subarashii hinode ga miemasu yo.", "B: Uwaa, hontou ni kandouteki desu ne!"],
        english: ["A: You can see a wonderful sunrise at the summit.", "B: Wow, that is truly touching!"],
        missingIndex: 1,
        missingWordJapanese: "日出",
        missingWordEnglish: "Sunrise",
        options: ["日出", "火山", "登山", "安全"],
        explanation: "'Hinode' is sunrise."
      }
    ],
    conversations: [
      {
        id: "mtfuji_conv_1",
        title: "Mountain Guide Interaction",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Mountain Guide Interaction in Mtfuji.",
        category: "restaurant",
        minLevel: 1,
        turns: [
          {
            speaker: "Waiter",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Waiter",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "mtfuji_conv_2",
        title: "Weather & Climbing Advice",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Weather & Climbing Advice in Mtfuji.",
        category: "hotel",
        minLevel: 26,
        turns: [
          {
            speaker: "Hotel Clerk",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "mtfuji_conv_3",
        title: "Rest Stop at Mountain Hut",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Rest Stop at Mountain Hut in Mtfuji.",
        category: "culture",
        minLevel: 46,
        turns: [
          {
            speaker: "Cultural Guide",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "mtfuji_conv_4",
        title: "Sunrise Celebration",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Sunrise Celebration in Mtfuji.",
        category: "emergency",
        minLevel: 46,
        turns: [
          {
            speaker: "Official Officer",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "mtfuji_conv_5",
        title: "Packing Cold Weather Gear",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Packing Cold Weather Gear in Mtfuji.",
        category: "shopping",
        minLevel: 26,
        turns: [
          {
            speaker: "Shopkeeper",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "mtfuji_conv_6",
        title: "Feeling Altitude Sickness",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Feeling Altitude Sickness in Mtfuji.",
        category: "greeting",
        minLevel: 1,
        turns: [
          {
            speaker: "Friendly Local",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Friendly Local",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "mtfuji_conv_7",
        title: "Souvenir Stamp at Station 5",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Souvenir Stamp at Station 5 in Mtfuji.",
        category: "transportation",
        minLevel: 26,
        turns: [
          {
            speaker: "Station Staff",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "mtfuji_conv_8",
        title: "Lake Kawaguchiko View Chat",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Lake Kawaguchiko View Chat in Mtfuji.",
        category: "sightseeing",
        minLevel: 46,
        turns: [
          {
            speaker: "Local Resident",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      }
    ],
  },
  {
    id: "yokohama",
    name: "Yokohama (⚓)",
    theme: "Modern Port & Chinatown",
    description: "Stroll along futuristic waterfronts and explore massive, vibrant Yokohama Chinatown!",
    emoji: "⚓",
    vocabCount: 15,
    difficulty: "⭐⭐",
    ageFocus: "Both",
    japanFacts: [
      "Yokohama features the largest Chinatown in Japan, established in 1859.",
      "The historic Red Brick Warehouses have been converted into trendy shopping malls!"
    ],
    vocabList: [
      { id: "yo1", japanese: "中華街", romaji: "Chuukagai", english: "Chinatown", emoji: "🏮", category: "Places" },
      { id: "yo2", japanese: "赤レンガ", romaji: "Akarenga", english: "Red Brick", emoji: "🧱", category: "Places" },
      { id: "yo3", japanese: "観覧車", romaji: "Kanransha", english: "Ferris Wheel", emoji: "🎡", category: "Places" },
      { id: "yo4", japanese: "夜景", romaji: "Yakei", english: "Night View", emoji: "🌃", category: "Nature" },
      { id: "yo5", japanese: "公園", romaji: "Kouen", english: "Park", emoji: "🌳", category: "Places" }
    ],
    dialogues: [
      {
        id: "yod1",
        title: "Chinatown Tour",
        japanese: ["A: 横浜の中華街で美味しい肉まんを食べましょう！", "B: はい、お腹がすきました！"],
        romaji: ["A: Yokohama no chuukagai de oishii nikuman o tabemashou!", "B: Hai, onaka ga sukimashita!"],
        english: ["A: Let's eat delicious meat buns in Yokohama's Chinatown!", "B: Yes, I am hungry!"],
        missingIndex: 0,
        missingWordJapanese: "中華街",
        missingWordEnglish: "Chinatown",
        options: ["中華街", "赤レンガ", "観覧車", "夜景"],
        explanation: "'Chuukagai' is Chinatown."
      }
    ],
    conversations: [
      {
        id: "yokohama_conv_1",
        title: "Harbor Cruise Tour",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Harbor Cruise Tour in Yokohama.",
        category: "restaurant",
        minLevel: 1,
        turns: [
          {
            speaker: "Waiter",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Waiter",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "yokohama_conv_2",
        title: "International Restaurant",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding International Restaurant in Yokohama.",
        category: "hotel",
        minLevel: 26,
        turns: [
          {
            speaker: "Hotel Clerk",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Hotel Clerk",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "yokohama_conv_3",
        title: "Modern Shopping Mall",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Modern Shopping Mall in Yokohama.",
        category: "culture",
        minLevel: 46,
        turns: [
          {
            speaker: "Cultural Guide",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Cultural Guide",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "yokohama_conv_4",
        title: "Waterfront Navigation",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Waterfront Navigation in Yokohama.",
        category: "emergency",
        minLevel: 46,
        turns: [
          {
            speaker: "Official Officer",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Official Officer",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      },
      {
        id: "yokohama_conv_5",
        title: "Visiting Red Brick Warehouse",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Visiting Red Brick Warehouse in Yokohama.",
        category: "shopping",
        minLevel: 26,
        turns: [
          {
            speaker: "Shopkeeper",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Shopkeeper",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "yokohama_conv_6",
        title: "Chinatown Steamed Bun Order",
        difficulty: "⭐",
        description: "Interactive dialogue scenario regarding Chinatown Steamed Bun Order in Yokohama.",
        category: "greeting",
        minLevel: 1,
        turns: [
          {
            speaker: "Friendly Local",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Friendly Local",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          }
        ]
      },
      {
        id: "yokohama_conv_7",
        title: "Ferris Wheel Ticket Booking",
        difficulty: "⭐⭐",
        description: "Interactive dialogue scenario regarding Ferris Wheel Ticket Booking in Yokohama.",
        category: "transportation",
        minLevel: 26,
        turns: [
          {
            speaker: "Station Staff",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Station Staff",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          }
        ]
      },
      {
        id: "yokohama_conv_8",
        title: "Yokohama Port History Chat",
        difficulty: "⭐⭐⭐",
        description: "Interactive dialogue scenario regarding Yokohama Port History Chat in Yokohama.",
        category: "sightseeing",
        minLevel: 46,
        turns: [
          {
            speaker: "Local Resident",
            japanese: "いらっしゃいませ！本日はどのようなご用件でしょうか？",
            romaji: "Irasshaimase! Honjitsu wa dono you na goyouken deshou ka?",
            english: "Welcome! How may I assist you today?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "はい、お願いします。これを注文したいです。",
                english: "Yes, please. I would like to order this.",
                isCorrect: true,
                feedback: "Perfect! Natural and highly polite! 🌟",
                score: 10
              },
              {
                text: "あの、ちょっと違います。",
                english: "Um, that's not quite right.",
                isCorrect: false,
                feedback: "A bit too abrupt. It's better to be polite first.",
                score: 5
              },
              {
                text: "英語でお願いします。",
                english: "English, please.",
                isCorrect: false,
                feedback: "Try to practice your Japanese! You can do it!",
                score: 2
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "かしこまりました。追加のご要望やご質問はありますか？",
            romaji: "Kashikomarimashita. Tsuika no goyoubou ya goshitsumon wa arimasu ka?",
            english: "Certainly. Do you have any additional requests or questions?"
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "いいえ、大丈夫です。ありがとうございます。",
                english: "No, I am fine. Thank you very much.",
                isCorrect: true,
                feedback: "Excellent response! Respectful refusal is highly polite in Japan! 🙇",
                score: 10
              },
              {
                text: "もっと詳しく教えてください。",
                english: "Please explain in more detail.",
                isCorrect: true,
                feedback: "Great job! Shows curiosity and handles communication perfectly!",
                score: 10
              },
              {
                text: "いらないです。",
                english: "Don't need it.",
                isCorrect: false,
                feedback: "A bit too blunt! Better to say 'Daijoubu' (I am okay).",
                score: 3
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "分かりました。確認いたしますので、少々お待ちください。",
            romaji: "Wakarimashita. Kakunin itashimasu node, shoushou omachi kudasai.",
            english: "I understand. Please wait a moment while I confirm everything."
          },
          {
            speaker: "Player",
            japanese: "___",
            romaji: "___",
            english: "___",
            options: [
              {
                text: "ありがとうございます！とても助かりました。",
                english: "Thank you very much! It was extremely helpful.",
                isCorrect: true,
                feedback: "Outstanding! Expressing sincere gratitude wraps up the dialogue perfectly! 🎉",
                score: 10
              },
              {
                text: "どうも。",
                english: "Thanks.",
                isCorrect: true,
                feedback: "Casual and fine, though full 'Arigatou gozaimasu' is always safer.",
                score: 7
              },
              {
                text: "さようなら！",
                english: "Goodbye!",
                isCorrect: false,
                feedback: "Saying goodbye immediately can be a bit sudden. Say thank you first!",
                score: 4
              }
            ]
          },
          {
            speaker: "Local Resident",
            japanese: "お待たせいたしました！こちらで手続きは完了です。ありがとうございました！",
            romaji: "Omatase itashimashita! Kochira de tetsuzuki wa kanryou desu. Arigatou gozaimashita!",
            english: "Thank you for waiting! Everything is fully completed. Thank you very much!"
          }
        ]
      }
    ],
  }
];

export const ALL_VOCABULARY: VocabularyWord[] = DESTINATIONS_DATA.flatMap(d => d.vocabList);