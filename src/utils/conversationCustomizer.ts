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

export const customizeScenario = (scen: ConversationScenario, destName: string): ConversationScenario => {
  const cleanDestName = destName.replace(/\s*\(.*\)/g, ''); // Remove emoji, e.g. "Kyoto (🏯)" -> "Kyoto"
  const cat = scen.category || "greeting";
  const minLvl = scen.minLevel || 1;

  // Let's generate unique conversation turns based on the category, level, and title!
  let turns: ConversationTurn[] = [];

  if (cat === "restaurant") {
    if (minLvl <= 10) {
      // Elementary restaurant
      turns = [
        {
          speaker: "Ramen Chef",
          japanese: `いらっしゃいませ！温かいお食事はいかがですか？`,
          romaji: "Irasshaimase! Atatakai oshokuji wa ikaga desu ka?",
          english: `Welcome! How about some warm food here in ${cleanDestName}?`
        },
        {
          speaker: "Player",
          japanese: "___",
          romaji: "___",
          english: "___",
          options: [
            {
              text: "これをください。お茶もお願いします。",
              english: "This one please. Also green tea, please.",
              isCorrect: true,
              feedback: "Excellent! Polite request and ordering. 🌟",
              score: 10
            },
            {
              text: "水だけください。",
              english: "Only water please.",
              isCorrect: true,
              feedback: "Fine, but trying local dishes is highly recommended!",
              score: 7
            },
            {
              text: "英語で喋って。",
              english: "Speak in English.",
              isCorrect: false,
              feedback: "Let's try to practice Japanese. You can do it!",
              score: 2
            }
          ]
        },
        {
          speaker: "Ramen Chef",
          japanese: "はい、お待たせいたしました！どうぞ召し上がってください！",
          romaji: "Hai, omatase itashimashita! Douzo meshiagatte kudasai!",
          english: "Yes, thank you for waiting! Please enjoy the meal!"
        }
      ];
    } else if (minLvl <= 25) {
      // Intermediate restaurant
      turns = [
        {
          speaker: "Staff",
          japanese: `いらっしゃいませ！${cleanDestName}名物のお料理はいかがなさいますか？`,
          romaji: `Irasshaimase! ${cleanDestName} meibutsu no oryouri wa ikaga nasaimasu ka?`,
          english: `Welcome! Would you like to try some of ${cleanDestName}'s famous specialty dishes?`
        },
        {
          speaker: "Player",
          japanese: "___",
          romaji: "___",
          english: "___",
          options: [
            {
              text: "はい、お勧めを教えてください！",
              english: "Yes, please tell me your recommendation!",
              isCorrect: true,
              feedback: "Outstanding! Asking for chef's recommendation is very natural! 👨‍🍳",
              score: 10
            },
            {
              text: "いいえ、大丈夫です。自分で選びます。",
              english: "No, I am fine. I will choose by myself.",
              isCorrect: true,
              feedback: "Great, taking initiative to order is fantastic!",
              score: 8
            },
            {
              text: "いらないです。",
              english: "Don't need it.",
              isCorrect: false,
              feedback: "A bit too blunt! Try to say 'Daijoubu' (I am okay) instead.",
              score: 3
            }
          ]
        },
        {
          speaker: "Staff",
          japanese: "かしこまりました。こちらはとても美味しいですよ。アレルギーはありますか？",
          romaji: "Kashikomarimashita. Kochira wa totemo oishii desu yo. Arerugii wa arimasu ka?",
          english: "Understood. This one is very delicious. Do you have any allergies?"
        },
        {
          speaker: "Player",
          japanese: "___",
          romaji: "___",
          english: "___",
          options: [
            {
              text: "いいえ、アレルギーはありません。大丈夫です。",
              english: "No, I don't have allergies. It's okay.",
              isCorrect: true,
              feedback: "Excellent! Informing the host clearly ensures safety! 🙆",
              score: 10
            },
            {
              text: "肉は食べられません。",
              english: "I cannot eat meat.",
              isCorrect: true,
              feedback: "Great response! Informing about dietary restrictions is very helpful.",
              score: 10
            }
          ]
        },
        {
          speaker: "Staff",
          japanese: "分かりました。それでは準備いたしますので少々お待ちください。",
          romaji: "Wakarimashita. Soredeha junbi itashimasu node shoushou omachi kudasai.",
          english: "I understand. We will prepare your meal now, please wait a moment."
        }
      ];
    } else {
      // Advanced restaurant
      turns = [
        {
          speaker: "Host",
          japanese: `お待たせいたしました。こちら、${cleanDestName}の伝統的なコース料理でございます。`,
          romaji: `Omatase itashimashita. Kochira, ${cleanDestName} no dentouteki na koosu ryouri de gozaimasu.`,
          english: `Thank you for waiting. This is our traditional full-course dinner course of ${cleanDestName}.`
        },
        {
          speaker: "Player",
          japanese: "___",
          romaji: "___",
          english: "___",
          options: [
            {
              text: "素晴らしいですね！いただきます。どれから食べれば良いですか？",
              english: "This is wonderful! Thank you. Which one should I eat first?",
              isCorrect: true,
              feedback: "Fantastic curiosity and respect for traditional dining! 🍱",
              score: 10
            },
            {
              text: "とても美味しそうですね。ありがとうございます。",
              english: "It looks very delicious. Thank you very much.",
              isCorrect: true,
              feedback: "Beautiful polite expression of gratitude!",
              score: 9
            }
          ]
        },
        {
          speaker: "Host",
          japanese: "前菜の赤い小鉢から召し上がると、豊かな風味が引き立ちますよ。他にご質問はございますか？",
          romaji: "Zensai no akai kobachi kara meshiagaru to, yutaka na fuumi ga hikitachimasu yo. Hani go-shitsumon wa gozaimasu ka?",
          english: "Eating from the red small appetizer bowl first will enhance the rich flavors. Do you have any other questions?"
        },
        {
          speaker: "Player",
          japanese: "___",
          romaji: "___",
          english: "___",
          options: [
            {
              text: "この料理にはどのような調味料が使われていますか？",
              english: "What kind of seasonings are used in this dish?",
              isCorrect: true,
              feedback: "Superb intermediate-to-advanced travel query! 🌟",
              score: 10
            },
            {
              text: "いいえ、ありません。お会計をお願いします。",
              english: "No, none. The bill, please.",
              isCorrect: true,
              feedback: "Great, moving directly to checkout cleanly.",
              score: 8
            }
          ]
        },
        {
          speaker: "Host",
          japanese: "京都の醤油 and 自家製のみりんで味付けしております。ごゆっくりお楽しみください。",
          romaji: "Kyoto no shouyu to jikasei no mirin de ajitsuke shite orimasu. Goyukkuri otanoshimi kudasai.",
          english: "We season it using special soy sauce and house-made mirin. Please enjoy your time."
        },
        {
          speaker: "Player",
          japanese: "___",
          romaji: "___",
          english: "___",
          options: [
            {
              text: "ごちそうさまでした！本当に美味しかったです。",
              english: "Thank you for the wonderful meal! It was truly delicious.",
              isCorrect: true,
              feedback: "Outstanding concluding appreciation! Perfect manners! 🎉",
              score: 10
            },
            {
              text: "お腹がいっぱいです。ありがとう。",
              english: "I am full. Thank you.",
              isCorrect: true,
              feedback: "Friendly and natural! Nice job.",
              score: 8
            }
          ]
        },
        {
          speaker: "Host",
          japanese: "そう言っていただき光栄です！またのご来店を心よりお待ちしております。",
          romaji: "Sou itte itadaki kouei desu! Mata no goraiten o kokorokara omachi shite orimasu.",
          english: "We are deeply honored to hear that! We look forward to welcoming you back."
        }
      ];
    }
  } else if (cat === "hotel" || cat === "sightseeing") {
    if (minLvl <= 10) {
      turns = [
        {
          speaker: "Local Guide",
          japanese: `こんにちは！${cleanDestName}の有名な観光地へようこそ！`,
          romaji: `Konnichiwa! ${cleanDestName} no yuumei na kankouchi he youkoso!`,
          english: `Hello! Welcome to the famous sightseeing spot in ${cleanDestName}!`
        },
        {
          speaker: "Player",
          japanese: "___",
          romaji: "___",
          english: "___",
          options: [
            {
              text: "はじめまして！写真を撮ってもいいですか？",
              english: "Nice to meet you! May I take photos here?",
              isCorrect: true,
              feedback: "Perfect! Polite and highly respectful. 📸",
              score: 10
            },
            {
              text: "お寺はどこですか？",
              english: "Where is the temple?",
              isCorrect: true,
              feedback: "Nice question! Direct and simple.",
              score: 8
            },
            {
              text: "バイバイ！",
              english: "Bye bye!",
              isCorrect: false,
              feedback: "A bit too abrupt. It's better to greet them first.",
              score: 3
            }
          ]
        },
        {
          speaker: "Local Guide",
          japanese: "はい、もちろん大丈夫ですよ！記念写真を撮りましょうか？",
          romaji: "Hai, mochiron daijoubu desu yo! Kinen shashin o torimashou ka?",
          english: "Yes, of course it's perfectly fine! Shall I take a souvenir photo for you?"
        }
      ];
    } else if (minLvl <= 25) {
      turns = [
        {
          speaker: "Front Desk",
          japanese: `いらっしゃいませ。本日チェックインのご予約ですね。パスポートをお願いします。`,
          romaji: "Irasshaimase. Honjitsu chekkuin no go-yoyaku desu ne. Pasupooto o onegai shimasu.",
          english: "Welcome. Checking in today, correct? May I please have your passport?"
        },
        {
          speaker: "Player",
          japanese: "___",
          romaji: "___",
          english: "___",
          options: [
            {
              text: "はい、どうぞ。パスポートです。",
              english: "Yes, here it is. My passport.",
              isCorrect: true,
              feedback: "Perfect and polite hand-off! 🛂",
              score: 10
            },
            {
              text: "すみません、カバンの中にあります。少し待ってください。",
              english: "Sorry, it's inside my bag. Please wait a moment.",
              isCorrect: true,
              feedback: "Excellent communication, explaining the brief delay naturally!",
              score: 9
            }
          ]
        },
        {
          speaker: "Front Desk",
          japanese: "ありがとうございます。確認できました。お部屋は3階の禁煙室でございます。朝食は何時にしますか？",
          romaji: "Arigatou gozaimasu. Kakunin dekimashita. Oheya wa sankai no kinyenshitsu de gozaimasu. Choushoku wa nanji ni shimasu ka?",
          english: "Thank you. Confirmed. Your room is a non-smoking room on the 3rd floor. What time would you like breakfast?"
        },
        {
          speaker: "Player",
          japanese: "___",
          romaji: "___",
          english: "___",
          options: [
            {
              text: "朝食は朝の八時にお願いします。",
              english: "Breakfast at 8:00 AM, please.",
              isCorrect: true,
              feedback: "Perfect! Scheduling breakfast is clear and polite. 🍳",
              score: 10
            },
            {
              text: "朝食はいりません。寝ています。",
              english: "I don't need breakfast. I will be sleeping.",
              isCorrect: true,
              feedback: "Clear rejection, though ryokan breakfasts are fantastic!",
              score: 8
            }
          ]
        },
        {
          speaker: "Front Desk",
          japanese: "かしこまりました。それでは鍵をお渡しいたします。快適なご滞在を！",
          romaji: "Kashikomarimashita. Soredeha kagi o owatashi itashimasu. Kaiteki na go-taizai o!",
          english: "Understood. Here is your room key. Have a wonderful and comfortable stay!"
        }
      ];
    } else {
      turns = [
        {
          speaker: "Ryokan Master",
          japanese: `ようこそ、${cleanDestName}の伝統旅館へ。旅の疲れを癒やしていただけるよう努めます。`,
          romaji: `Youkoso, ${cleanDestName} no dentou ryokan he. Tabi no tsukare o iyashite itadakeru you tsutomemasu.`,
          english: `Welcome to our traditional ryokan in ${cleanDestName}. We will do our absolute best to help you relax.`
        },
        {
          speaker: "Player",
          japanese: "___",
          romaji: "___",
          english: "___",
          options: [
            {
              text: "とても美しい庭園ですね。おもてなしに心から感謝いたします。",
              english: "The garden is incredibly beautiful. I sincerely appreciate your hospitality.",
              isCorrect: true,
              feedback: "Extremely elegant and polite! Respects the cultural atmosphere. 💮",
              score: 10
            },
            {
              text: "お世話になります。チェックインをよろしくお願いします。",
              english: "Thank you for taking care of us. I appreciate your check-in help.",
              isCorrect: true,
              feedback: "Very standard, natural Japanese business/travel greeting!",
              score: 9
            }
          ]
        },
        {
          speaker: "Ryokan Master",
          japanese: "そう言っていただき光栄です。お部屋に露天風呂がございますが、ご利用になりますか？",
          romaji: "Sou itte itadaki kouei desu. Oheya ni rotenburo ga gozaimasu ga, goriyou ni narimasu ka?",
          english: "We are honored to hear that. There is an open-air hot spring bath in your room, would you like to use it?"
        },
        {
          speaker: "Player",
          japanese: "___",
          romaji: "___",
          english: "___",
          options: [
            {
              text: "はい、ぜひ利用したいです！温泉のルールはありますか？",
              english: "Yes, I would absolutely love to! Are there any specific hot spring rules?",
              isCorrect: true,
              feedback: "Excellent inquiry! Onsen etiquette is very important in Japan! ♨️",
              score: 10
            },
            {
              text: "後で入ります。ありがとうございます。",
              english: "I will enter later. Thank you.",
              isCorrect: true,
              feedback: "Simple and fine.",
              score: 8
            }
          ]
        },
        {
          speaker: "Ryokan Master",
          japanese: "お風呂に入る前に、洗い場で体をきれいに洗ってくださいね。また、タオルはお湯に入れないようお願いします。",
          romaji: "Ofuro ni hairu mae ni, araiba de karada o kirei ni aratte kudasai ne. Mata, taoru wa oyu ni irenai you onegai shimasu.",
          english: "Before entering the bath, please wash your body thoroughly at the washing station. Also, please do not put towels in the bathwater."
        },
        {
          speaker: "Player",
          japanese: "___",
          romaji: "___",
          english: "___",
          options: [
            {
              text: "わかりました！マナーを守って、ゆっくり温泉を楽しみます。",
              english: "I understand! I will follow the etiquette and enjoy the hot spring relaxing stay.",
              isCorrect: true,
              feedback: "Superb! Highly respectful traveler behavior. 🎉",
              score: 10
            },
            {
              text: "了解しました。気をつけます。",
              english: "Understood. I will be careful.",
              isCorrect: true,
              feedback: "Nice, direct and clear response.",
              score: 8
            }
          ]
        },
        {
          speaker: "Ryokan Master",
          japanese: "ありがとうございます。何かございましたらいつでもお呼びください。ごゆっくりどうぞ。",
          romaji: "Arigatou gozaimashita. Nani ka gozaimashitara itsudemo oyobi kudasai. Goyukkuri douzo.",
          english: "Thank you very much. If there is anything you need, please call us anytime. Enjoy your stay."
        }
      ];
    }
  } else if (cat === "culture" || cat === "shopping") {
    if (minLvl <= 10) {
      turns = [
        {
          speaker: "Shopkeeper",
          japanese: `いらっしゃいませ！可愛いお土産はいかがですか？`,
          romaji: "Irasshaimase! Kawaii omiyage wa ikaga desu ka?",
          english: `Welcome! How about some cute souvenirs here?`
        },
        {
          speaker: "Player",
          japanese: "___",
          romaji: "___",
          english: "___",
          options: [
            {
              text: "これはいくらですか？とても可愛いですね！",
              english: "How much is this? It's extremely cute!",
              isCorrect: true,
              feedback: "Excellent! Asking price and giving compliment. 💴",
              score: 10
            },
            {
              text: "これをください。",
              english: "Please give me this.",
              isCorrect: true,
              feedback: "Great, very clear request!",
              score: 9
            },
            {
              text: "まけてください。",
              english: "Discount it.",
              isCorrect: false,
              feedback: "A bit too sudden! Haggling isn't standard in normal shops.",
              score: 4
            }
          ]
        },
        {
          speaker: "Shopkeeper",
          japanese: "ありがとうございます！こちらは五百円になります。どうぞ！",
          romaji: "Arigatou gozaimasu! Kochira wa gohyaku en ni narimasu. Douzo!",
          english: "Thank you very much! This one is 500 Yen. Here you go!"
        }
      ];
    } else if (minLvl <= 25) {
      turns = [
        {
          speaker: "Artisan",
          japanese: `こんにちは。こちらは${cleanDestName}の伝統的な手作り工芸品です。手に取ってご覧ください。`,
          romaji: `Konnichiwa. Kochira wa ${cleanDestName} no dentouteki na tezukuri kougeihin desu. Te ni totte goran kudasai.`,
          english: `Hello. These are traditional handmade crafts of ${cleanDestName}. Please feel free to hold and inspect them.`
        },
        {
          speaker: "Player",
          japanese: "___",
          romaji: "___",
          english: "___",
          options: [
            {
              text: "とても美しいデザインですね。どのように作られていますか？",
              english: "The design is beautiful. How are they made?",
              isCorrect: true,
              feedback: "Outstanding! Craft appreciation dialogue is very educational! 🎨",
              score: 10
            },
            {
              text: "これは木で作られていますか？",
              english: "Is this made of wood?",
              isCorrect: true,
              feedback: "Great! Asking about materials is awesome.",
              score: 9
            }
          ]
        },
        {
          speaker: "Artisan",
          japanese: "地元の天然木を使い、職人が一つ一つ丁寧に削り出しているんですよ。色付けもすべて手作業です。",
          romaji: "Jimoto no tennenboku o tsukai, shokunin ga hitotsu hitotsu teinei ni kezuridashite iru nyo. Irozuke mo subete te-sagyou desu.",
          english: "Using local natural wood, artisans carefully carve out each one. The coloring is also completely done by hand."
        },
        {
          speaker: "Player",
          japanese: "___",
          romaji: "___",
          english: "___",
          options: [
            {
              text: "素晴らしい技術ですね！友人のプレゼントに二つ買います。",
              english: "What a wonderful skill! I will buy two as gifts for my friends.",
              isCorrect: true,
              feedback: "Brilliant! Buying handcrafted items supports local heritage! 🎁",
              score: 10
            },
            {
              text: "少し考えます。ありがとうございます。",
              english: "I will think about it. Thank you very much.",
              isCorrect: true,
              feedback: "Polite hesitation is completely acceptable and highly polite.",
              score: 9
            }
          ]
        },
        {
          speaker: "Artisan",
          japanese: "嬉しいお言葉をありがとうございます！きれいにラッピングいたしますね。",
          romaji: "Ureshii okotoba o arigatou gozaimasu! Kirei ni rappingu itashimasu ne.",
          english: "Thank you so much for your kind words! We will wrap them up beautifully for you."
        }
      ];
    } else {
      turns = [
        {
          speaker: "Host",
          japanese: `お茶会へようこそ。まずは和菓子をお召し上がりください。お茶の苦味とよく合いますよ。`,
          romaji: "Ochakai he youkoso. Mazu wa wagashi o omeshiagari kudasai. Ocha no nigami to yoku aimasu yo.",
          english: "Welcome to the tea ceremony. Please enjoy the Japanese sweets first. They pair perfectly with the tea's bitterness."
        },
        {
          speaker: "Player",
          japanese: "___",
          romaji: "___",
          english: "___",
          options: [
            {
              text: "ありがとうございます。美しいお菓子ですね。いただきます。",
              english: "Thank you very much. What a beautiful sweet. I will receive it.",
              isCorrect: true,
              feedback: "Excellent! Admiring the aesthetic is a key part of tea ceremony etiquette! 🍵",
              score: 10
            },
            {
              text: "とても可愛い形ですね。何で作られていますか？",
              english: "The shape is very cute. What is it made of?",
              isCorrect: true,
              feedback: "Great curiosity! Wagashi is made of sweet bean paste.",
              score: 9
            }
          ]
        },
        {
          speaker: "Host",
          japanese: "こちらは小豆と米粉で作られております。次に、お茶碗を右に二回回してからお飲みください。",
          romaji: "Kochira wa azuki to komeko de tsukurarete orimasu. Tsugi ni, ochawan o migi ni nikai mawashite kara onomi kudasai.",
          english: "These are made from red azuki beans and rice flour. Next, please rotate the tea bowl twice clockwise before drinking."
        },
        {
          speaker: "Player",
          japanese: "___",
          romaji: "___",
          english: "___",
          options: [
            {
              text: "このように回せば良いですか？お茶の香りが素晴らしいですね。",
              english: "Is rotating it like this correct? The tea's aroma is wonderful.",
              isCorrect: true,
              feedback: "Outstanding! Expressing sensory appreciation matches the spirit of tea ceremony. 🍵",
              score: 10
            },
            {
              text: "ちょっと難しいですが、やってみます。",
              english: "It's a bit difficult, but I will try my best.",
              isCorrect: true,
              feedback: "Great attitude! Willingness to try traditional customs is highly appreciated.",
              score: 9
            }
          ]
        },
        {
          speaker: "Host",
          japanese: "完璧な作法です！心の静けさを感じていただけましたでしょうか。",
          romaji: "Kanpeki na sahou desu! Kokoro no shizukesa o kanjite itadakemashita deshou ka.",
          english: "An absolutely perfect ritual! Did you feel a sense of inner peace and serenity?"
        },
        {
          speaker: "Player",
          japanese: "___",
          romaji: "___",
          english: "___",
          options: [
            {
              text: "はい、とても心が落ち着きました。日本の素晴らしい伝統を体験できて感動しました。",
              english: "Yes, my mind feels very calm. I am deeply touched to experience such a wonderful Japanese tradition.",
              isCorrect: true,
              feedback: "Marvelous concluding reflection! Highly cultural and respectful! 🎉",
              score: 10
            },
            {
              text: "いい経験になりました。本当にありがとうございました。",
              english: "It was a great experience. Thank you very much.",
              isCorrect: true,
              feedback: "Perfect and polite. You wrapped up the dialogue beautifully!",
              score: 10
            }
          ]
        },
        {
          speaker: "Host",
          japanese: "そう言っていただきお茶を点てた甲斐がありました。本日はお越しいただき誠にありがとうございました。",
          romaji: "Sou itte itadaki ocha o tate ta kai ga arimashita. Honjitsu wa okoshi itadaki makoto ni arigatou gozaimashita.",
          english: "Hearing that makes preparing the tea truly worthwhile. Thank you very much for joining us today."
        }
      ];
    }
  } else {
    // Fallback/Generic category
    if (minLvl <= 10) {
      turns = [
        {
          speaker: "Local Resident",
          japanese: `こんにちは！何かお手伝いできることはありますか？`,
          romaji: "Konnichiwa! Nani ka otetsudai dekiru koto wa arimasu ka?",
          english: "Hello! Is there anything I can help you with?"
        },
        {
          speaker: "Player",
          japanese: "___",
          romaji: "___",
          english: "___",
          options: [
            {
              text: "こんにちは！駅はどこですか？道を教えてください。",
              english: "Hello! Where is the station? Please tell me the way.",
              isCorrect: true,
              feedback: "Excellent! Simple and useful travel greeting & query! 🚉",
              score: 10
            },
            {
              text: "ありがとう！大丈夫です！",
              english: "Thank you! I am fine!",
              isCorrect: true,
              feedback: "Very friendly and polite!",
              score: 8
            }
          ]
        },
        {
          speaker: "Local Resident",
          japanese: "駅はあの角を右に曲がってまっすぐですよ。気をつけて！",
          romaji: "Eki wa ano kado o migi ni magatte massugu desu yo. Ki o tsukete!",
          english: "The station is right around that corner, turn right and go straight. Take care!"
        }
      ];
    } else if (minLvl <= 25) {
      turns = [
        {
          speaker: "Station Staff",
          japanese: `切符売り場をお探しですか？自動券売機はこちらにございます。`,
          romaji: "Kippu uriba o osagashi desu ka? Jidou kenbaiki wa kochira ni gozaimasu.",
          english: "Are you looking for the ticket office? The automatic ticket vending machines are located here."
        },
        {
          speaker: "Player",
          japanese: "___",
          romaji: "___",
          english: "___",
          options: [
            {
              text: "ありがとうございます！切符の買い方を教えてもらえますか？",
              english: "Thank you very much! Could you please teach me how to buy a ticket?",
              isCorrect: true,
              feedback: "Perfect! Staff is always happy to guide helpful travelers! 🎫",
              score: 10
            },
            {
              text: "いいえ、大丈夫です。自分でやってみます。",
              english: "No, it's okay. I will try by myself.",
              isCorrect: true,
              feedback: "Excellent, taking initiative to learn technology is amazing!",
              score: 9
            }
          ]
        },
        {
          speaker: "Station Staff",
          japanese: "はい、まず画面で英語を選び、次に目的地までの料金ボタンを押してください。ICカードも使えますよ。",
          romaji: "Hai, mazu gamen de eigo o erabi, tsugi ni mokutekichi made no ryoukin botan o oshite kudasai. Aishiikaado mo tsukaemasu yo.",
          english: "Sure, first select English on the screen, then press the price button matching your destination. You can also use IC cards."
        },
        {
          speaker: "Player",
          japanese: "___",
          romaji: "___",
          english: "___",
          options: [
            {
              text: "分かりました！教えていただき、本当にありがとうございました。",
              english: "I understand! Thank you very much for teaching me.",
              isCorrect: true,
              feedback: "Great! Highly appreciative travel response. 🙇",
              score: 10
            },
            {
              text: "ICカードで入ります。バイバイ！",
              english: "I will enter using my IC card. Bye bye!",
              isCorrect: true,
              feedback: "Clean and practical, though saying thank you is always safer.",
              score: 8
            }
          ]
        },
        {
          speaker: "Station Staff",
          japanese: "どういたしまして。良いご旅行をお祈りしております！",
          romaji: "Douitashimashite. Yoi go-ryokou o oinori shite orimasu!",
          english: "You're very welcome. Wishing you a wonderful trip!"
        }
      ];
    } else {
      turns = [
        {
          speaker: "Officer",
          japanese: `すみません、何か無くし物をされましたか？お手伝いいたしますよ。`,
          romaji: "Sumimasen, nani ka nakushimono o saremashita ka? Otetsudai itashimasu yo.",
          english: "Excuse me, did you lose something? I can assist you with that."
        },
        {
          speaker: "Player",
          japanese: "___",
          romaji: "___",
          english: "___",
          options: [
            {
              text: "はい、実は電車の中に小さなカバンを忘れてしまいました。どうすれば良いですか？",
              english: "Yes, actually I accidentally left a small bag inside the train. What should I do?",
              isCorrect: true,
              feedback: "Superb emergency reporting! Extremely clear and precise! 🎒",
              score: 10
            },
            {
              text: "大丈夫です。気のせいでした。",
              english: "I am fine. It was just my imagination.",
              isCorrect: true,
              feedback: "Clean exit, though glad nothing was lost!",
              score: 8
            }
          ]
        },
        {
          speaker: "Officer",
          japanese: "何線の何時頃の電車か覚えていますか？また、カバンの色や形を教えてください。",
          romaji: "Nansen no nanji goro no densha ka oboete imasu ka? Mata, kaban no iro ya katachi o oshiete kudasai.",
          english: "Do you remember which train line and approximately what time it was? Also, please tell me the bag's color and shape."
        },
        {
          speaker: "Player",
          japanese: "___",
          romaji: "___",
          english: "___",
          options: [
            {
              text: "午後三時頃の山手線です。赤いカバンで、中にパスポートが入っています。",
              english: "It was the Yamanote Line around 3:00 PM. It is a red bag, and it contains my passport.",
              isCorrect: true,
              feedback: "Perfect! Giving precise details helps recover lost items much faster! 🆘",
              score: 10
            },
            {
              text: "黒いカバンです。時間は分かりません。",
              english: "It is a black bag. I don't know the exact time.",
              isCorrect: true,
              feedback: "Fine, though more details would make it much easier to track down.",
              score: 8
            }
          ]
        },
        {
          speaker: "Officer",
          japanese: "重要な情報ですね。すぐに駅の管理事務所に連絡して確認します。少々お待ちください。",
          romaji: "Juuyou na jouhou desu ne. Sugu ni eki no kanri jimusho ni renraku shite kakunin shimasu. Shoushou omachi kudasai.",
          english: "That is crucial information. I will contact the station master's office immediately to check. Please wait a moment."
        },
        {
          speaker: "Player",
          japanese: "___",
          romaji: "___",
          english: "___",
          options: [
            {
              text: "お手数をおかけします。本当に助かります、ありがとうございます。",
              english: "I am sorry for causing trouble. This is incredibly helpful, thank you very much.",
              isCorrect: true,
              feedback: "Outstanding advanced expression of travel gratitude! Highly polite! 🎉",
              score: 10
            },
            {
              text: "お願いします。ありがとうございます。",
              english: "Yes please. Thank you very much.",
              isCorrect: true,
              feedback: "Very polite and nice.",
              score: 10
            }
          ]
        },
        {
          speaker: "Officer",
          japanese: "見つかりましたよ！次の駅のオフィスで保管しているそうです。すぐに受け取りに行きましょう！",
          romaji: "Mitsukarimashita yo! Tsugi no eki no ofisu de hokan shite iru sou desu. Sugu ni uketori ni ikimashou!",
          english: "We found it! They are holding it in custody at the next station's office. Let's go pick it up right away!"
        }
      ];
    }
  }

  return {
    ...scen,
    turns
  };
};
