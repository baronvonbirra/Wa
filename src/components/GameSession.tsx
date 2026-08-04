import React, { useState, useEffect } from 'react';
import { useAppState } from '../state/AppContext';
import { Destination, VocabularyWord } from '../data/destinations';
import { speakJapanese } from '../utils/audio';

interface GameSessionProps {
  destination: Destination;
  onClose: () => void;
}

export const GameSession: React.FC<GameSessionProps> = ({ destination, onClose }) => {
  const { state, updateXP, recordVocabAttempt, updateHighScore } = useAppState();
  const activeKid = state.activePlayer === 'parent' ? 'james' : state.activePlayer;

  const [gameType, setGameType] = useState<'match' | 'listen' | 'read' | 'dialogue' | 'pronounce' | 'emojiMatch' | 'dragDrop' | 'conversation' | 'grammar' | 'listeningEx' | 'readingEx' | 'writingEx' | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [hasUsedHint, setHasUsedHint] = useState(false);

  // States specific to card matching
  const [matchCards, setMatchCards] = useState<{ id: string; val: string; type: 'jp' | 'en'; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  // States specific to Advanced Phase 3 Features
  const [convScenarioIdx, setConvScenarioIdx] = useState(0);
  const [convTurnIdx, setConvTurnIdx] = useState(0);
  const [convHistory, setConvHistory] = useState<{ speaker: string; text: string; english: string }[]>([]);

  const [grammarIdx, setGrammarIdx] = useState(0);
  const [listeningExIdx, setListeningExIdx] = useState(0);
  const [readingExIdx, setReadingExIdx] = useState(0);
  const [writingExIdx, setWritingExIdx] = useState(0);
  const [writingInput, setWritingInput] = useState("");
  const [writingFeedback, setWritingFeedback] = useState<{ matches: string[]; missing: string[]; rating: string } | null>(null);

  // States specific to quizzes
  const [quizWord, setQuizWord] = useState<VocabularyWord | null>(null);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);

  // States specific to Dialogue
  const [dialogueIndex, setDialogueIndex] = useState(0);

  // States specific to Audio + Emoji Match
  const [emojiMatchWord, setEmojiMatchWord] = useState<VocabularyWord | null>(null);
  const [emojiMatchOptions, setEmojiMatchOptions] = useState<VocabularyWord[]>([]);
  const [emojiMatchStreak, setEmojiMatchStreak] = useState(0);
  const [emojiMatchHintText, setEmojiMatchHintText] = useState<string | null>(null);
  const [startTime, setStartTime] = useState<number>(0);

  // States specific to Audio + Drag & Drop
  const [dragDropWord, setDragDropWord] = useState<VocabularyWord | null>(null);
  const [dragDropCategories, setDragDropCategories] = useState<string[]>([]);
  const [selectedEmojiId, setSelectedEmojiId] = useState<string | null>(null); // For click-to-match tablet backup

  // States specific to Pronunciation Sandbox
  const [pronounceWordIndex, setPronounceWordIndex] = useState(0);
  const [isPronouncing, setIsPronouncing] = useState(false);
  const [pronounceAttempted, setPronounceAttempted] = useState(false);
  const [pronounceScore, setPronounceScore] = useState(92);

  // Play audio helper
  const playAudio = (text: string) => {
    speakJapanese(text, state.soundEnabled);
  };

  // Start selected game mode
  const startGame = (type: 'match' | 'listen' | 'read' | 'dialogue' | 'pronounce' | 'emojiMatch' | 'dragDrop' | 'conversation' | 'grammar' | 'listeningEx' | 'readingEx' | 'writingEx' | null) => {
    setGameType(type);
    setCurrentStep(0);
    setScore(0);
    setStreakCount(0);
    setIsGameOver(false);
    setFeedback(null);
    setHasUsedHint(false);

    if (type === 'match') {
      initMatchGame();
    } else if (type === 'listen' || type === 'read') {
      initQuizStep(0, type);
    } else if (type === 'dialogue') {
      setDialogueIndex(0);
    } else if (type === 'pronounce') {
      setPronounceWordIndex(0);
      setPronounceAttempted(false);
    } else if (type === 'emojiMatch') {
      initEmojiMatchStep(0);
    } else if (type === 'dragDrop') {
      initDragDropStep(0);
    } else if (type === 'conversation') {
      initConversationGame();
    } else if (type === 'grammar') {
      setGrammarIdx(0);
    } else if (type === 'listeningEx') {
      setListeningExIdx(0);
    } else if (type === 'readingEx') {
      setReadingExIdx(0);
    } else if (type === 'writingEx') {
      setWritingExIdx(0);
      setWritingInput("");
      setWritingFeedback(null);
    }
  };

  const initConversationGame = () => {
    setConvScenarioIdx(0);
    setConvTurnIdx(0);
    const scen = destination.conversations?.[0];
    if (scen && scen.turns[0]) {
      setConvHistory([{
        speaker: scen.turns[0].speaker,
        text: scen.turns[0].japanese,
        english: scen.turns[0].english
      }]);
    } else {
      setConvHistory([]);
    }
  };

  // --- HIRAGANA MATCH GAME LOGIC ---
  const initMatchGame = () => {
    // Select 3 random words from the destination vocabulary list
    const shuffled = [...destination.vocabList].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const cards: { id: string; val: string; type: 'jp' | 'en'; isFlipped: boolean; isMatched: boolean }[] = [];
    selected.forEach(word => {
      cards.push({ id: word.id, val: `${word.japanese} (${word.romaji})`, type: 'jp', isFlipped: false, isMatched: false });
      cards.push({ id: word.id, val: `${word.emoji} ${word.english}`, type: 'en', isFlipped: false, isMatched: false });
    });

    setMatchCards(cards.sort(() => 0.5 - Math.random()));
    setSelectedCards([]);
  };

  const handleCardClick = (index: number) => {
    if (matchCards[index].isMatched || matchCards[index].isFlipped || selectedCards.length >= 2) return;

    // Speak Japanese when flipping cards
    if (matchCards[index].type === 'jp') {
      const jpClean = matchCards[index].val.split(' ')[0];
      playAudio(jpClean);
    }

    const updated = [...matchCards];
    updated[index].isFlipped = true;
    setMatchCards(updated);

    const newSelected = [...selectedCards, index];
    setSelectedCards(newSelected);

    if (newSelected.length === 2) {
      const first = matchCards[newSelected[0]];
      const second = matchCards[newSelected[1]];

      if (first.id === second.id && first.type !== second.type) {
        // Correct match!
        setTimeout(() => {
          const matched = matchCards.map((c, idx) => {
            if (idx === newSelected[0] || idx === newSelected[1]) {
              return { ...c, isMatched: true };
            }
            return c;
          });
          setMatchCards(matched);
          setSelectedCards([]);
          setScore(prev => prev + 25);
          setStreakCount(prev => prev + 1);

          // XP trigger
          updateXP(activeKid, 10);
          recordVocabAttempt(activeKid, destination.id, first.id, true);

          // All matched check
          if (matched.every(c => c.isMatched)) {
            // Trigger 20 streak bonus
            updateXP(activeKid, 20);
            setScore(prev => prev + 20);
            setIsGameOver(true);
          }
        }, 600);
      } else {
        // Mis-match! Flip back
        setTimeout(() => {
          const flippedBack = matchCards.map((c, idx) => {
            if (idx === newSelected[0] || idx === newSelected[1]) {
              return { ...c, isFlipped: false };
            }
            return c;
          });
          setMatchCards(flippedBack);
          setSelectedCards([]);
          setStreakCount(0);
          recordVocabAttempt(activeKid, destination.id, first.id, false);
        }, 1200);
      }
    }
  };

  // --- QUIZ (LISTEN & CLICK / READ & UNDERSTAND) LOGIC ---
  const initQuizStep = (stepIdx: number, type: 'listen' | 'read') => {
    if (stepIdx >= 5) {
      setIsGameOver(true);
      return;
    }

    const correctWord = destination.vocabList[stepIdx % destination.vocabList.length];
    setQuizWord(correctWord);
    setHasUsedHint(false);
    setFeedback(null);

    // Pick 3 wrong options randomly
    const wrongOptions = destination.vocabList
      .filter(w => w.id !== correctWord.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)
      .map(w => w.english);

    const allOptions = [...wrongOptions, correctWord.english].sort(() => 0.5 - Math.random());
    setQuizOptions(allOptions);

    if (type === 'listen') {
      playAudio(correctWord.japanese);
    }
  };

  const handleQuizAnswer = (selectedAnswer: string) => {
    if (feedback || !quizWord) return;

    const isCorrect = selectedAnswer === quizWord.english;
    const baseXP = isCorrect ? 10 : 0;
    const comboXP = isCorrect && streakCount >= 2 ? 10 : 0; // Combo multiplier XP reward

    if (isCorrect) {
      setScore(prev => prev + 20 + comboXP);
      setStreakCount(prev => prev + 1);
      setFeedback({ isCorrect: true, text: `🎉 Perfect! ${quizWord.japanese} (${quizWord.romaji}) = ${quizWord.english}` });
      updateXP(activeKid, baseXP + comboXP);
      recordVocabAttempt(activeKid, destination.id, quizWord.id, true);
    } else {
      setStreakCount(0);
      setFeedback({ isCorrect: false, text: `❌ Oh no! Let's try another word. It means: ${quizWord.english}` });
      recordVocabAttempt(activeKid, destination.id, quizWord.id, false);
    }
  };

  const handleNextQuizStep = () => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    initQuizStep(nextStep, gameType as 'listen' | 'read');
  };

  // --- AUDIO + EMOJI MATCH LOGIC ---
  const initEmojiMatchStep = (stepIdx: number) => {
    if (stepIdx >= 5) {
      setIsGameOver(true);
      return;
    }

    const correctWord = destination.vocabList[stepIdx % destination.vocabList.length];
    setEmojiMatchWord(correctWord);
    setEmojiMatchHintText(null);
    setFeedback(null);
    setStartTime(Date.now());

    // Gather 3 wrong options: try to find same category, fall back to global words
    let wrongOptions = destination.vocabList
      .filter(w => w.id !== correctWord.id && w.category === correctWord.category);

    if (wrongOptions.length < 3) {
      // fill with other words from this destination
      const remainingFromDest = destination.vocabList.filter(w => w.id !== correctWord.id && !wrongOptions.some(x => x.id === w.id));
      wrongOptions = [...wrongOptions, ...remainingFromDest];
    }

    if (wrongOptions.length < 3) {
      // global fallback
      // Since we are in ESM/TypeScript environment, we should import ALL_VOCABULARY or refer to it dynamically.
      // We can actually just use destination.vocabList as a fallback since Kyoto has 25 words, Osaka has 25, etc.
      // So let's fallback to any word from DESTINATIONS_DATA or destination.vocabList to avoid require() issues.
      const extra = destination.vocabList
        .filter(w => w.id !== correctWord.id && !wrongOptions.some(x => x.id === w.id))
        .sort(() => 0.5 - Math.random());
      wrongOptions = [...wrongOptions, ...extra];
    }

    // shuffle and take 3
    const finalWrong = wrongOptions.sort(() => 0.5 - Math.random()).slice(0, 3);
    const allOptions = [...finalWrong, correctWord].sort(() => 0.5 - Math.random());
    setEmojiMatchOptions(allOptions);

    // Auto-play pronunciation
    playAudio(correctWord.japanese);
  };

  const handleEmojiMatchAnswer = (selectedWord: VocabularyWord) => {
    if (feedback || !emojiMatchWord) return;

    const isCorrect = selectedWord.id === emojiMatchWord.id;
    const elapsedSeconds = (Date.now() - startTime) / 1000;
    const isSpeedy = elapsedSeconds < 5;

    if (isCorrect) {
      let earnedXP = 10;
      let points = 10;
      let extraMsg = '';

      if (isSpeedy) {
        earnedXP += 5;
        points += 5;
        extraMsg += ' ⚡ Speed Bonus (+5 XP)!';
      }

      if (emojiMatchStreak >= 2) {
        earnedXP += 3;
        points += 5;
        extraMsg += ' 🔥 Streak Combo!';
      }

      setScore(prev => prev + points);
      setEmojiMatchStreak(prev => prev + 1);
      setFeedback({ isCorrect: true, text: `🎉 Perfect! "${emojiMatchWord.emoji}" is correct!${extraMsg}` });
      updateXP(activeKid, earnedXP);
      recordVocabAttempt(activeKid, destination.id, emojiMatchWord.id, true);
    } else {
      setEmojiMatchStreak(0);
      setFeedback({ isCorrect: false, text: `❌ Aww! Try again! Replay the audio below for a hint.` });
      recordVocabAttempt(activeKid, destination.id, emojiMatchWord.id, false);
    }
  };

  const handleNextEmojiMatchStep = () => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    initEmojiMatchStep(nextStep);
  };

  // --- AUDIO + DRAG & DROP LOGIC ---
  const initDragDropStep = (stepIdx: number) => {
    if (stepIdx >= 5) {
      setIsGameOver(true);
      return;
    }

    const correctWord = destination.vocabList[stepIdx % destination.vocabList.length];
    setDragDropWord(correctWord);
    setSelectedEmojiId(null);
    setFeedback(null);

    // Get 3 categories: 1 correct + 2 random ones from this destination or other locations
    const correctCat = correctWord.category;
    const allUniqueCats = Array.from(new Set(destination.vocabList.map(w => w.category)));
    let otherCats = allUniqueCats.filter(c => c !== correctCat);

    if (otherCats.length < 2) {
      // Add standard fallbacks if destination doesn't have enough categories
      const standardCats = ["Greetings", "Basics", "Food", "Places", "Colors", "Nature", "Animals"];
      const missing = standardCats.filter(c => c !== correctCat && !otherCats.includes(c));
      otherCats = [...otherCats, ...missing];
    }

    const finalCats = [correctCat, ...otherCats.sort(() => 0.5 - Math.random()).slice(0, 2)].sort(() => 0.5 - Math.random());
    setDragDropCategories(finalCats);

    // Auto play audio
    playAudio(correctWord.japanese);
  };

  const handleDragDropMatch = (selectedCategory: string) => {
    if (feedback || !dragDropWord) return;

    const isCorrect = selectedCategory === dragDropWord.category;
    if (isCorrect) {
      setScore(prev => prev + 20);
      setFeedback({ isCorrect: true, text: `🎉 Perfect! "${dragDropWord.emoji}" belongs in ${selectedCategory}!` });
      updateXP(activeKid, 10);
      recordVocabAttempt(activeKid, destination.id, dragDropWord.id, true);
    } else {
      setFeedback({ isCorrect: false, text: `❌ Try again! That item doesn't go there.` });
      recordVocabAttempt(activeKid, destination.id, dragDropWord.id, false);
    }
  };

  const handleNextDragDropStep = () => {
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);
    initDragDropStep(nextStep);
  };

  // --- DIALOGUE GAME LOGIC ---
  const activeDialogue = destination.dialogues[dialogueIndex];

  const handleDialogueAnswer = (option: string) => {
    if (feedback || !activeDialogue) return;

    const isCorrect = option === activeDialogue.missingWordJapanese;
    if (isCorrect) {
      setScore(prev => prev + 30);
      setStreakCount(prev => prev + 1);
      setFeedback({ isCorrect: true, text: `🎉 Outstanding! Explanation: ${activeDialogue.explanation}` });
      updateXP(activeKid, 15);
    } else {
      setStreakCount(0);
      setFeedback({ isCorrect: false, text: "❌ Oops! Think about the context and try again!" });
    }
  };

  const handleNextDialogue = () => {
    setFeedback(null);
    if (dialogueIndex + 1 < destination.dialogues.length) {
      setDialogueIndex(prev => prev + 1);
    } else {
      setIsGameOver(true);
    }
  };

  // --- GRAMMAR MODE LOGIC ---
  const handleGrammarAnswer = (ans: string, correct: string, expl: string) => {
    if (feedback) return;

    const isCorrect = ans === correct;
    setScore(prev => prev + (isCorrect ? 25 : 0));
    updateXP(activeKid, isCorrect ? 15 : 5);

    setFeedback({
      isCorrect,
      text: isCorrect
        ? `🎉 Perfect! Correct Answer. Explanation: ${expl}`
        : `❌ Oh no! Correct was: ${correct}. Explanation: ${expl}`
    });
  };

  const handleNextGrammarQuestion = () => {
    setFeedback(null);
    const nextIdx = grammarIdx + 1;
    if (destination.grammarQuestions && nextIdx < destination.grammarQuestions.length) {
      setGrammarIdx(nextIdx);
    } else {
      setIsGameOver(true);
    }
  };

  // --- LISTENING MODE LOGIC ---
  const handleListeningAnswer = (ans: string, correct: string) => {
    if (feedback) return;

    const isCorrect = ans === correct;
    setScore(prev => prev + (isCorrect ? 25 : 0));
    updateXP(activeKid, isCorrect ? 15 : 5);

    setFeedback({
      isCorrect,
      text: isCorrect ? "🎉 Perfect! That is exactly what they said!" : `❌ Oh no! The correct interpretation is: ${correct}`
    });
  };

  const handleNextListeningQuestion = () => {
    setFeedback(null);
    const nextIdx = listeningExIdx + 1;
    if (destination.listeningExercises && nextIdx < destination.listeningExercises.length) {
      setListeningExIdx(nextIdx);
    } else {
      setIsGameOver(true);
    }
  };

  // --- READING COMPREHENSION LOGIC ---
  const handleReadingAnswer = (ans: string, correct: string) => {
    if (feedback) return;

    const isCorrect = ans === correct;
    setScore(prev => prev + (isCorrect ? 25 : 0));
    updateXP(activeKid, isCorrect ? 15 : 5);

    setFeedback({
      isCorrect,
      text: isCorrect ? "🎉 Excellent reading skills! You understood perfectly!" : `❌ Not quite right! The correct answer is: ${correct}`
    });
  };

  const handleNextReadingQuestion = () => {
    setFeedback(null);
    const nextIdx = readingExIdx + 1;
    if (destination.readingPassages && nextIdx < destination.readingPassages.length) {
      setReadingExIdx(nextIdx);
    } else {
      setIsGameOver(true);
    }
  };

  // --- GUIDED WRITING LOGIC ---
  const handleVerifyWriting = (prompt: any) => {
    if (feedback) return;

    const lowerInput = writingInput.toLowerCase().trim();
    const matched: string[] = [];
    const missing: string[] = [];

    prompt.requiredElements.forEach((el: string) => {
      // search for parts of elements (simplified check for testing)
      const cleanEl = el.split(' ')[0].replace(/['"「」]/g, '');
      if (lowerInput.includes(cleanEl.toLowerCase())) {
        matched.push(el);
      } else {
        missing.push(el);
      }
    });

    const matchRatio = matched.length / prompt.requiredElements.length;
    let rating = "Good Job!";
    let points = 10;
    if (matchRatio === 1) {
      rating = "✨ Perfect Native Quality! Exceptional Grammar!";
      points = 35;
    } else if (matchRatio >= 0.5) {
      rating = "👍 Pretty Good. Add missing elements to make it fully authentic!";
      points = 20;
    } else {
      rating = "⚠️ Needs some rework. Review the required cues and try again!";
      points = 5;
    }

    setScore(prev => prev + points);
    updateXP(activeKid, points);
    setWritingFeedback({ matches: matched, missing, rating });

    setFeedback({
      isCorrect: matchRatio >= 0.5,
      text: rating
    });
  };

  const handleNextWritingPrompt = () => {
    setFeedback(null);
    setWritingFeedback(null);
    setWritingInput("");
    const nextIdx = writingExIdx + 1;
    if (destination.writingPrompts && nextIdx < destination.writingPrompts.length) {
      setWritingExIdx(nextIdx);
    } else {
      setIsGameOver(true);
    }
  };

  // --- CONVERSATION BRANCHING LOGIC ---
  const handleConversationOption = (opt: any) => {
    if (feedback) return;

    setScore(prev => prev + opt.score);
    updateXP(activeKid, opt.isCorrect ? 15 : 5);

    setFeedback({
      isCorrect: opt.isCorrect,
      text: opt.feedback
    });

    // Add Player's reply to history
    setConvHistory(prev => [
      ...prev,
      { speaker: "You", text: opt.text, english: opt.english }
    ]);
  };

  const handleNextConversationTurn = () => {
    setFeedback(null);
    const scen = destination.conversations?.[convScenarioIdx];
    if (!scen) return;

    const nextTurnIdx = convTurnIdx + 2; // skip player select turn to next system turn
    if (nextTurnIdx < scen.turns.length) {
      setConvTurnIdx(nextTurnIdx);
      // Speak next system turn
      const systemTurn = scen.turns[nextTurnIdx];
      playAudio(systemTurn.japanese);
      setConvHistory(prev => [
        ...prev,
        { speaker: systemTurn.speaker, text: systemTurn.japanese, english: systemTurn.english }
      ]);
    } else {
      // Scenario done
      setIsGameOver(true);
    }
  };

  // --- PRONUNCIATION SANDBOX LOGIC ---
  const handlePronounceAttempt = () => {
    setIsPronouncing(true);
    // Simulating child's clear microphone input and playing congratulations audio
    setTimeout(() => {
      setIsPronouncing(false);
      setPronounceAttempted(true);
      // Randomize simulated score between 88 and 99
      const randomScore = Math.floor(Math.random() * (99 - 88 + 1)) + 88;
      setPronounceScore(randomScore);
      setScore(prev => prev + 20);
      updateXP(activeKid, 10);
      playAudio(destination.vocabList[pronounceWordIndex].japanese);
    }, 1500);
  };

  const handleNextPronounceWord = () => {
    setPronounceAttempted(false);
    if (pronounceWordIndex + 1 < 5) {
      setPronounceWordIndex(prev => prev + 1);
    } else {
      setIsGameOver(true);
    }
  };

  // Save best high scores on game over
  useEffect(() => {
    if (isGameOver && gameType) {
      const key = `${gameType}_${destination.id}`;
      updateHighScore(activeKid, key, score);
    }
  }, [isGameOver]);

  return (
    <div className="max-w-4xl mx-auto my-8 px-4">
      {/* Back button */}
      <button
        onClick={onClose}
        className="mb-4 inline-flex items-center gap-2 text-rose-600 font-extrabold hover:text-rose-800 transition-all text-sm bg-white border-2 border-rose-200 px-4 py-2 rounded-full shadow-sm hover:scale-105"
      >
        <span>⬅️</span> Back to Map Destinations
      </button>

      {/* Main Container */}
      <div className="bg-white border-8 border-[#FEF08A] rounded-[36px] shadow-2xl overflow-hidden">
        {/* Destination Header Banner */}
        <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 p-6 text-white flex justify-between items-center border-b-4 border-rose-700">
          <div>
            <h3 className="text-3xl font-black flex items-center gap-2">
              <span className="animate-wiggle inline-block">{destination.emoji}</span>
              {destination.name} Quest
            </h3>
            <p className="text-rose-100 text-sm font-black">{destination.theme}</p>
          </div>
          <span className="text-6xl animate-soft inline-block">{destination.emoji}</span>
        </div>

        {/* Start Game Mode Switcher */}
        {!gameType && (
          <div className="p-8">
            <h4 className="text-2xl font-black text-center text-rose-950 mb-8">Select a Fun Game to Play & Learn!</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
              <button
                onClick={() => startGame('match')}
                className="p-5 bg-pink-50 border-4 border-pink-200 hover:border-pink-400 rounded-3xl text-left transition-all hover:shadow-lg active:scale-95 group flex items-start gap-4"
              >
                <span className="text-5xl bg-white p-3 rounded-2xl border-2 border-pink-100 group-hover:scale-110 transition-transform shadow-sm">🎴</span>
                <div>
                  <h5 className="font-black text-pink-900 text-lg">Hiragana Match</h5>
                  <p className="text-xs text-pink-700 font-bold mt-1">Flip cards, match Japanese text with emojis. Great warm-up!</p>
                </div>
              </button>

              <button
                onClick={() => startGame('listen')}
                className="p-5 bg-emerald-50 border-4 border-emerald-200 hover:border-emerald-400 rounded-3xl text-left transition-all hover:shadow-lg active:scale-95 group flex items-start gap-4"
              >
                <span className="text-5xl bg-white p-3 rounded-2xl border-2 border-emerald-100 group-hover:scale-110 transition-transform shadow-sm">🎧</span>
                <div>
                  <h5 className="font-black text-emerald-900 text-lg">Listen & Click</h5>
                  <p className="text-xs text-emerald-700 font-bold mt-1">Hear the Japanese word spoken aloud and pick its translation.</p>
                </div>
              </button>

              {/* Conditional rendering depending on player path and age */}
              {state.profiles[activeKid].learningPath === "adult_advanced" ? (
                <>
                  <button
                    onClick={() => startGame('conversation')}
                    disabled={!destination.conversations || destination.conversations.length === 0}
                    className="p-5 bg-indigo-50 border-4 border-indigo-200 hover:border-indigo-400 rounded-3xl text-left transition-all hover:shadow-lg active:scale-95 group flex items-start gap-4"
                  >
                    <span className="text-5xl bg-white p-3 rounded-2xl border-2 border-indigo-100 group-hover:scale-110 transition-transform shadow-sm">💬</span>
                    <div>
                      <h5 className="font-black text-indigo-900 text-lg flex items-center gap-1.5">
                        Conversations <span className="text-xs font-black bg-rose-500 text-white px-1.5 py-0.5 rounded-full uppercase">HOT</span>
                      </h5>
                      <p className="text-xs text-indigo-700 font-bold mt-1">Roleplay and converse in real Japanese scenarios.</p>
                    </div>
                  </button>

                  <button
                    onClick={() => startGame('grammar')}
                    disabled={!destination.grammarQuestions || destination.grammarQuestions.length === 0}
                    className="p-5 bg-blue-50 border-4 border-blue-200 hover:border-blue-400 rounded-3xl text-left transition-all hover:shadow-lg active:scale-95 group flex items-start gap-4"
                  >
                    <span className="text-5xl bg-white p-3 rounded-2xl border-2 border-blue-100 group-hover:scale-110 transition-transform shadow-sm">📝</span>
                    <div>
                      <h5 className="font-black text-blue-900 text-lg flex items-center gap-1.5">
                        Grammar Deep Dive <span className="text-xs font-black bg-rose-500 text-white px-1.5 py-0.5 rounded-full uppercase">NEW</span>
                      </h5>
                      <p className="text-xs text-blue-700 font-bold mt-1">Master particles (は vs を) and complex travel syntax.</p>
                    </div>
                  </button>

                  <button
                    onClick={() => startGame('listeningEx')}
                    disabled={!destination.listeningExercises || destination.listeningExercises.length === 0}
                    className="p-5 bg-[#ECFDF5] border-4 border-emerald-200 hover:border-emerald-400 rounded-3xl text-left transition-all hover:shadow-lg active:scale-95 group flex items-start gap-4"
                  >
                    <span className="text-5xl bg-white p-3 rounded-2xl border-2 border-emerald-100 group-hover:scale-110 transition-transform shadow-sm">🚄</span>
                    <div>
                      <h5 className="font-black text-emerald-900 text-lg flex items-center gap-1.5">
                        Native-Speed Listening
                      </h5>
                      <p className="text-xs text-emerald-700 font-bold mt-1">Practice comprehension listening to full speed native dialogue.</p>
                    </div>
                  </button>

                  <button
                    onClick={() => startGame('readingEx')}
                    disabled={!destination.readingPassages || destination.readingPassages.length === 0}
                    className="p-5 bg-rose-50 border-4 border-rose-200 hover:border-rose-400 rounded-3xl text-left transition-all hover:shadow-lg active:scale-95 group flex items-start gap-4"
                  >
                    <span className="text-5xl bg-white p-3 rounded-2xl border-2 border-rose-100 group-hover:scale-110 transition-transform shadow-sm">📖</span>
                    <div>
                      <h5 className="font-black text-rose-900 text-lg flex items-center gap-1.5">
                        Reading Comprehension
                      </h5>
                      <p className="text-xs text-rose-700 font-bold mt-1">Analyze and read authentic Japanese travel blog posts.</p>
                    </div>
                  </button>

                  <button
                    onClick={() => startGame('writingEx')}
                    disabled={!destination.writingPrompts || destination.writingPrompts.length === 0}
                    className="p-5 bg-purple-50 border-4 border-purple-200 hover:border-purple-400 rounded-3xl text-left transition-all hover:shadow-lg active:scale-95 group flex items-start gap-4 col-span-1 md:col-span-2"
                  >
                    <span className="text-5xl bg-white p-3 rounded-2xl border-2 border-purple-100 group-hover:scale-110 transition-transform shadow-sm">✍️</span>
                    <div>
                      <h5 className="font-black text-purple-900 text-lg flex items-center gap-1.5">
                        Guided Composition & Writing <span className="text-xs font-black bg-rose-500 text-white px-1.5 py-0.5 rounded-full uppercase">NEW</span>
                      </h5>
                      <p className="text-xs text-purple-700 font-bold mt-1">Write emails to booking agents and messages to friends with instant AI suggestions!</p>
                    </div>
                  </button>
                </>
              ) : (
                <>
                  {state.profiles[activeKid].age === 5 ? (
                    <>
                      <button
                        onClick={() => startGame('emojiMatch')}
                        className="p-5 bg-amber-50 border-4 border-amber-200 hover:border-amber-400 rounded-3xl text-left transition-all hover:shadow-lg active:scale-95 group flex items-start gap-4 text-left"
                      >
                        <span className="text-5xl bg-white p-3 rounded-2xl border-2 border-amber-100 group-hover:scale-110 transition-transform shadow-sm">⭐️</span>
                        <div>
                          <h5 className="font-black text-amber-950 text-lg flex items-center gap-1.5">
                            Audio + Emoji Match <span className="text-xs font-black bg-rose-500 text-white px-1.5 py-0.5 rounded-full uppercase">NEW</span>
                          </h5>
                          <p className="text-xs text-amber-700 font-bold mt-1">Hear the word, then choose the correct picture card. No reading needed!</p>
                        </div>
                      </button>

                      <button
                        onClick={() => startGame('dragDrop')}
                        className="p-5 bg-blue-50 border-4 border-blue-200 hover:border-blue-400 rounded-3xl text-left transition-all hover:shadow-lg active:scale-95 group flex items-start gap-4 text-left"
                      >
                        <span className="text-5xl bg-white p-3 rounded-2xl border-2 border-blue-100 group-hover:scale-110 transition-transform shadow-sm">👉</span>
                        <div>
                          <h5 className="font-black text-blue-950 text-lg flex items-center gap-1.5">
                            Audio + Drag & Drop <span className="text-xs font-black bg-rose-500 text-white px-1.5 py-0.5 rounded-full uppercase">NEW</span>
                          </h5>
                          <p className="text-xs text-blue-700 font-bold mt-1">Drag (or tap) the emoji into its correct category box. Fun & tactile!</p>
                        </div>
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startGame('read')}
                        className="p-5 bg-amber-50 border-4 border-amber-200 hover:border-amber-400 rounded-3xl text-left transition-all hover:shadow-lg active:scale-95 group flex items-start gap-4"
                      >
                        <span className="text-5xl bg-white p-3 rounded-2xl border-2 border-amber-100 group-hover:scale-110 transition-transform shadow-sm">📚</span>
                        <div>
                          <h5 className="font-black text-amber-900 text-lg">Read & Understand</h5>
                          <p className="text-xs text-amber-700 font-bold mt-1">Choose the English meaning for Japanese hiragana text.</p>
                        </div>
                      </button>

                      <button
                        onClick={() => startGame('dialogue')}
                        disabled={destination.dialogues.length === 0}
                        className={`p-5 rounded-3xl text-left transition-all group flex items-start gap-4 ${
                          destination.dialogues.length > 0
                            ? 'bg-blue-50 border-4 border-blue-200 hover:border-blue-400 hover:shadow-lg active:scale-95'
                            : 'bg-slate-50 border-4 border-slate-100 opacity-50 cursor-not-allowed'
                        }`}
                      >
                        <span className="text-5xl bg-white p-3 rounded-2xl border-2 border-blue-100 group-hover:scale-110 transition-transform shadow-sm">💬</span>
                        <div>
                          <h5 className="font-black text-blue-900 text-lg">Dialogue Fill-in</h5>
                          <p className="text-xs text-blue-700 font-bold mt-1">Complete blank conversations with vocabulary context.</p>
                        </div>
                      </button>

                      <button
                        onClick={() => startGame('conversation')}
                        disabled={!destination.conversations || destination.conversations.length === 0}
                        className="p-5 bg-indigo-50 border-4 border-indigo-200 hover:border-indigo-400 rounded-3xl text-left transition-all hover:shadow-lg active:scale-95 group flex items-start gap-4"
                      >
                        <span className="text-5xl bg-white p-3 rounded-2xl border-2 border-indigo-100 group-hover:scale-110 transition-transform shadow-sm">💬</span>
                        <div>
                          <h5 className="font-black text-indigo-900 text-lg flex items-center gap-1.5">
                            Conversations <span className="text-xs font-black bg-rose-500 text-white px-1.5 py-0.5 rounded-full uppercase">NEW</span>
                          </h5>
                          <p className="text-xs text-indigo-700 font-bold mt-1">Participate in branching real-life conversations!</p>
                        </div>
                      </button>
                    </>
                  )}

                  <button
                    onClick={() => startGame('pronounce')}
                    className="p-5 bg-purple-50 border-4 border-purple-200 hover:border-purple-400 rounded-3xl text-left transition-all hover:shadow-lg active:scale-95 group flex items-start gap-4 animate-soft"
                  >
                    <span className="text-5xl bg-white p-3 rounded-2xl border-2 border-purple-100 group-hover:scale-110 transition-transform shadow-sm">🎤</span>
                    <div>
                      <h5 className="font-black text-purple-900 text-lg">Pronounce Challenge</h5>
                      <p className="text-xs text-purple-700 font-bold mt-1">Read out loud and test speech clarity with native accents.</p>
                    </div>
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* --- MATCHING CARDS PLAYING VIEW --- */}
        {gameType === 'match' && !isGameOver && (
          <div className="p-6">
            <div className="flex justify-between items-center border-b-4 border-rose-100 pb-4 mb-6">
              <h4 className="font-black text-rose-950 text-xl flex items-center gap-2">
                <span>🎴</span> Hiragana Match Time!
              </h4>
              <div className="flex items-center gap-4 text-sm font-black text-rose-900">
                <span className="bg-white border-2 border-rose-200 px-3 py-1 rounded-full">Score: <strong className="text-rose-600 text-lg">{score}</strong></span>
                {streakCount >= 2 && <span className="bg-amber-100 text-[#C2410C] border-2 border-[#F97316] px-3 py-1 rounded-full animate-bounce">🔥 {streakCount} Combo!</span>}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 max-w-lg mx-auto">
              {matchCards.map((card, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCardClick(idx)}
                  className={`aspect-square rounded-[28px] text-center flex flex-col items-center justify-center font-black p-5 border-4 transition-all duration-300 transform ${
                    card.isMatched
                      ? 'bg-emerald-100 border-emerald-400 text-emerald-900 scale-95 opacity-60 pointer-events-none shadow-inner'
                      : card.isFlipped
                        ? 'bg-rose-50 border-rose-400 text-rose-950 rotate-y-180 shadow-md scale-105'
                        : 'bg-indigo-500 border-indigo-700 text-white hover:bg-indigo-600 hover:scale-105 shadow-lg border-b-8 active:border-b-2 active:translate-y-1'
                  }`}
                >
                  {card.isMatched || card.isFlipped ? (
                    <span className={`text-base sm:text-lg leading-snug drop-shadow-sm ${card.isFlipped ? 'rotate-y-180 inline-block' : ''}`}>
                      {card.val}
                    </span>
                  ) : (
                    <span className="text-4xl font-black">❓</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* --- LISTEN / READ PLAYING VIEW --- */}
        {(gameType === 'listen' || gameType === 'read') && !isGameOver && quizWord && (
          <div className="p-6 max-w-xl mx-auto">
            {/* Game Status */}
            <div className="flex justify-between items-center border-b-4 border-rose-100 pb-4 mb-6">
              <h4 className="font-black text-rose-950 text-xl">
                {gameType === 'listen' ? '🎧 Listen & Click' : '📚 Read & Understand'}
              </h4>
              <div className="flex items-center gap-4 text-xs sm:text-sm font-black text-rose-900">
                <span className="bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">Question: <strong>{currentStep + 1}/5</strong></span>
                <span className="bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">Score: <strong className="text-rose-600 text-lg">{score}</strong></span>
              </div>
            </div>

            {/* Cue Box */}
            <div className="bg-[#FEF08A] border-4 border-[#FACC15] rounded-[32px] p-8 text-center shadow-md mb-6 relative">
              {gameType === 'listen' ? (
                <div>
                  <button
                    onClick={() => playAudio(quizWord.japanese)}
                    className="w-20 h-20 bg-rose-500 hover:bg-rose-600 hover:scale-110 active:scale-95 text-white rounded-full shadow-lg flex items-center justify-center text-4xl mx-auto mb-4 transition-transform border-4 border-white animate-soft"
                  >
                    🔊
                  </button>
                  <p className="text-base font-black text-slate-800">Tap to hear the Japanese word!</p>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-black text-rose-600 uppercase tracking-widest mb-1 bg-white/60 px-3 py-1 rounded-full inline-block">Translate Hiragana</p>
                  <h3 className="text-5xl font-black text-rose-950 mb-1 drop-shadow-sm mt-2">{quizWord.japanese}</h3>
                  <p className="text-base font-black text-slate-600">({quizWord.romaji})</p>
                </div>
              )}
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quizOptions.map((opt, idx) => {
                const isAnswered = feedback !== null;

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleQuizAnswer(opt)}
                    className={`w-full py-4 px-6 rounded-[24px] font-black text-center border-4 text-base transition-all ${
                      isAnswered
                        ? opt === quizWord.english
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-950 shadow-inner'
                          : 'bg-slate-100 border-slate-200 text-slate-400'
                        : 'bg-white border-slate-200 hover:border-rose-400 hover:bg-rose-50 text-slate-700 active:scale-95 hover:shadow-md border-b-8 active:border-b-4'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Hints System */}
            {!feedback && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={() => {
                    setHasUsedHint(true);
                    playAudio(quizWord.japanese);
                  }}
                  disabled={hasUsedHint}
                  className={`text-xs font-black px-5 py-3 rounded-full border-2 transition-all ${
                    hasUsedHint
                      ? 'bg-slate-100 text-slate-400 border-slate-200'
                      : 'bg-amber-50 text-amber-800 border-amber-300 hover:bg-amber-100 shadow-sm hover:scale-105'
                  }`}
                >
                  {hasUsedHint
                    ? `💡 Clue: "${quizWord.emoji}" ... memory hook!`
                    : '💡 Use Free Hint (Show memory emoji clue)'}
                </button>
              </div>
            )}

            {/* Feedback & Next Button */}
            {feedback && (
              <div className="mt-6 border-t-2 border-slate-100 pt-6">
                <div className={`p-4 rounded-[20px] font-black text-base text-center mb-4 border-2 ${
                  feedback.isCorrect ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-red-50 text-red-900 border-red-200'
                }`}>
                  {feedback.text}
                </div>
                <button
                  onClick={handleNextQuizStep}
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white font-black py-4 rounded-[20px] shadow-lg flex items-center justify-center gap-2 border-b-4 border-slate-950 hover:border-b-0 active:translate-y-1"
                >
                  Next Word ➡️
                </button>
              </div>
            )}
          </div>
        )}

        {/* --- DIALOGUE PLAYING VIEW --- */}
        {gameType === 'dialogue' && !isGameOver && activeDialogue && (
          <div className="p-6 max-w-xl mx-auto">
            <div className="flex justify-between items-center border-b-4 border-rose-100 pb-4 mb-6">
              <h4 className="font-black text-rose-950 text-xl">Dialogue Completion 💬</h4>
              <div className="flex items-center gap-4 text-xs sm:text-sm font-black text-rose-900">
                <span>Dialogue: <strong>{dialogueIndex + 1}/{destination.dialogues.length}</strong></span>
                <span>Score: <strong className="text-rose-600 text-lg">{score}</strong></span>
              </div>
            </div>

            {/* Main conversation box */}
            <div className="bg-slate-50 border-4 border-slate-200 rounded-[32px] p-6 shadow-inner space-y-4 mb-6">
              <h5 className="text-xs font-black text-rose-500 uppercase tracking-widest bg-white/80 px-3 py-1 border border-rose-100 rounded-full inline-block">{activeDialogue.title}</h5>

              {activeDialogue.japanese.map((line, idx) => {
                const isMissing = idx === activeDialogue.missingIndex;
                const textWithBlank = isMissing
                  ? line.replace(activeDialogue.missingWordJapanese, "_______")
                  : line;

                return (
                  <div key={idx} className="flex gap-2">
                    <div className="bg-white px-4 py-3 rounded-[24px] shadow-sm border-2 border-slate-100 text-sm max-w-[90%]">
                      <p className="font-black text-slate-800 text-base">{textWithBlank}</p>
                      <p className="text-xs text-slate-400 font-bold italic">({activeDialogue.romaji[idx]})</p>
                      <p className="text-xs text-slate-500 font-bold mt-1.5">{activeDialogue.english[idx]}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Options */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              {activeDialogue.options.map((opt, idx) => {
                const isAnswered = feedback !== null;
                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleDialogueAnswer(opt)}
                    className={`p-4 rounded-[20px] font-black text-sm text-center border-4 transition-all ${
                      isAnswered
                        ? opt === activeDialogue.missingWordJapanese
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-black'
                          : 'bg-slate-100 border-slate-200 text-slate-400'
                        : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-slate-700 font-extrabold border-b-8 active:border-b-2 active:translate-y-1'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Dialogue Action Hints */}
            {!feedback && (
              <div className="flex justify-center mb-6">
                <button
                  onClick={() => playAudio(activeDialogue.missingWordJapanese)}
                  className="text-xs font-black text-blue-800 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 px-4 py-2 rounded-full"
                >
                  🔊 Hear the missing word hint
                </button>
              </div>
            )}

            {/* Dialogue Feedback */}
            {feedback && (
              <div className="border-t-2 border-slate-100 pt-6">
                <div className={`p-4 rounded-[20px] font-black text-base text-center mb-4 border-2 ${
                  feedback.isCorrect ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-red-50 text-red-900 border-red-200'
                }`}>
                  {feedback.text}
                </div>
                <button
                  onClick={handleNextDialogue}
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white font-black py-4 rounded-[20px] shadow-lg border-b-4 border-slate-950 active:translate-y-1"
                >
                  Next Dialogue ➡️
                </button>
              </div>
            )}
          </div>
        )}

        {/* --- AUDIO + DRAG & DROP PLAYING VIEW --- */}
        {gameType === 'dragDrop' && !isGameOver && dragDropWord && (
          <div className="p-6 max-w-xl mx-auto">
            {/* Status Info */}
            <div className="flex justify-between items-center border-b-4 border-rose-100 pb-4 mb-6">
              <h4 className="font-black text-rose-950 text-xl flex items-center gap-1.5">
                <span>👉</span> Hear & Sort Categories!
              </h4>
              <div className="flex items-center gap-4 text-xs sm:text-sm font-black text-rose-900">
                <span className="bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">Word: <strong>{currentStep + 1}/5</strong></span>
                <span className="bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">Score: <strong className="text-rose-600 text-lg">{score}</strong></span>
              </div>
            </div>

            {/* Instruction Banner & Audio Speaker */}
            <div className="bg-[#FEF08A] border-4 border-[#FACC15] rounded-[32px] p-6 text-center shadow-md mb-6 flex flex-col items-center">
              <button
                onClick={() => playAudio(dragDropWord.japanese)}
                className="w-20 h-20 bg-rose-500 hover:bg-rose-600 hover:scale-110 active:scale-95 text-white rounded-full shadow-lg flex items-center justify-center text-4xl transition-transform border-4 border-white animate-soft"
              >
                🔊
              </button>
              <p className="text-base font-black text-slate-800 mt-3">Hear the word, then sort the emoji below!</p>
            </div>

            {/* Draggable and click/tap Emoji Source Area */}
            <div className="flex justify-center mb-8">
              <div
                draggable={!feedback}
                onDragStart={(e) => {
                  e.dataTransfer.setData('text/plain', dragDropWord.id);
                }}
                onClick={() => {
                  if (!feedback) {
                    setSelectedEmojiId(selectedEmojiId === dragDropWord.id ? null : dragDropWord.id);
                    playAudio(dragDropWord.japanese);
                  }
                }}
                className={`w-36 h-36 rounded-full border-4 flex flex-col items-center justify-center shadow-lg transition-all cursor-grab active:cursor-grabbing hover:scale-105 select-none relative ${
                  selectedEmojiId === dragDropWord.id
                    ? 'bg-amber-100 border-rose-500 scale-110 ring-4 ring-rose-200 animate-wiggle'
                    : 'bg-white border-slate-200 hover:border-amber-400'
                }`}
              >
                <span className="text-7xl mb-1 block select-none">{dragDropWord.emoji}</span>
                <span className="text-[10px] font-black uppercase text-slate-400">
                  {selectedEmojiId === dragDropWord.id ? 'Selected! 👇' : 'Drag or Tap Me'}
                </span>

                {/* Mobile tap tooltip indicator */}
                {selectedEmojiId === dragDropWord.id && (
                  <div className="absolute -top-8 bg-slate-800 text-white text-[10px] font-black px-2.5 py-1 rounded-full animate-bounce border-2 border-white shadow-md">
                    Tap a box below!
                  </div>
                )}
              </div>
            </div>

            {/* Category Drop/Click Target Boxes */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {dragDropCategories.map((cat) => {
                const isAnswered = feedback !== null;
                const isThisCategoryCorrect = cat === dragDropWord.category;

                // Category Emojis for kid visual cues
                let catIcon = "📂";
                if (cat.toLowerCase() === 'food') catIcon = "🍜";
                else if (cat.toLowerCase() === 'animals') catIcon = "🐱";
                else if (cat.toLowerCase() === 'places') catIcon = "⛩️";
                else if (cat.toLowerCase() === 'greetings') catIcon = "👋";
                else if (cat.toLowerCase() === 'colors') catIcon = "🎨";
                else if (cat.toLowerCase() === 'nature') catIcon = "🌲";

                return (
                  <div
                    key={cat}
                    onDragOver={(e) => {
                      e.preventDefault();
                    }}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (!isAnswered) {
                        handleDragDropMatch(cat);
                      }
                    }}
                    onClick={() => {
                      if (!isAnswered && selectedEmojiId === dragDropWord.id) {
                        handleDragDropMatch(cat);
                      }
                    }}
                    className={`p-5 rounded-[24px] border-4 border-dashed text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
                      isAnswered
                        ? isThisCategoryCorrect
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-950 border-solid scale-105'
                          : 'bg-slate-50 border-slate-200 text-slate-300 opacity-60'
                        : selectedEmojiId === dragDropWord.id
                          ? 'bg-amber-50 border-rose-400 hover:bg-amber-100 hover:scale-105 shadow-md animate-soft'
                          : 'bg-indigo-50/50 border-indigo-200 hover:bg-indigo-50'
                    }`}
                  >
                    <span className="text-4xl mb-2 block">{catIcon}</span>
                    <h5 className="font-black text-sm text-slate-700 uppercase tracking-wide">
                      {cat}
                    </h5>
                    <span className="text-[10px] text-slate-400 font-extrabold mt-1">
                      {isAnswered ? '' : (selectedEmojiId === dragDropWord.id ? 'Tap to Drop' : 'Drop Here')}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Feedback and Next */}
            {feedback && (
              <div className="mt-8 border-t-2 border-slate-100 pt-6">
                <div className={`p-4 rounded-[20px] font-black text-base text-center mb-4 border-2 ${
                  feedback.isCorrect ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-red-50 text-red-900 border-red-200'
                }`}>
                  {feedback.text}
                </div>
                <button
                  onClick={handleNextDragDropStep}
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white font-black py-4 rounded-[20px] shadow-lg flex items-center justify-center gap-2 border-b-4 border-slate-950 hover:border-b-0 active:translate-y-1"
                >
                  Next Word ➡️
                </button>
              </div>
            )}
          </div>
        )}

        {/* --- AUDIO + EMOJI MATCH PLAYING VIEW --- */}
        {gameType === 'emojiMatch' && !isGameOver && emojiMatchWord && (
          <div className="p-6 max-w-xl mx-auto">
            {/* Status Info */}
            <div className="flex justify-between items-center border-b-4 border-rose-100 pb-4 mb-6">
              <h4 className="font-black text-rose-950 text-xl flex items-center gap-1.5">
                <span>🎵</span> Listen & Match Emojis!
              </h4>
              <div className="flex items-center gap-4 text-xs sm:text-sm font-black text-rose-900">
                <span className="bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">Word: <strong>{currentStep + 1}/5</strong></span>
                <span className="bg-rose-50 px-2.5 py-1 rounded-full border border-rose-200">Score: <strong className="text-rose-600 text-lg">{score}</strong></span>
              </div>
            </div>

            {/* Play Sound Button Area */}
            <div className="bg-[#FEF08A] border-4 border-[#FACC15] rounded-[32px] p-6 text-center shadow-md mb-6 flex flex-col items-center">
              <button
                onClick={() => playAudio(emojiMatchWord.japanese)}
                className="w-24 h-24 bg-rose-500 hover:bg-rose-600 hover:scale-110 active:scale-95 text-white rounded-full shadow-lg flex items-center justify-center text-5xl transition-transform border-4 border-white animate-soft"
              >
                🔊
              </button>
              <p className="text-base font-black text-slate-800 mt-3">Click to hear the Japanese word!</p>
            </div>

            {/* Hint System Section */}
            {!feedback && (
              <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-4 mb-6 text-center shadow-sm">
                <h5 className="font-black text-amber-900 text-xs uppercase tracking-wider mb-2">💡 Need a Help? Select a Hint!</h5>
                <div className="flex flex-wrap gap-2 justify-center">
                  <button
                    onClick={() => setEmojiMatchHintText(`It belongs to the "${emojiMatchWord.category}" category!`)}
                    className="bg-white hover:bg-amber-100 text-amber-950 border-2 border-amber-300 rounded-full px-3.5 py-1.5 text-xs font-black shadow-sm transition-all active:scale-95"
                  >
                    📂 Category Hint
                  </button>
                  <button
                    onClick={() => {
                      // Slower speech
                      if ('speechSynthesis' in window) {
                        window.speechSynthesis.cancel();
                        const utterance = new SpeechSynthesisUtterance(emojiMatchWord.japanese);
                        utterance.lang = 'ja-JP';
                        utterance.rate = 0.5; // Very slow
                        window.speechSynthesis.speak(utterance);
                      }
                    }}
                    className="bg-white hover:bg-amber-100 text-amber-950 border-2 border-amber-300 rounded-full px-3.5 py-1.5 text-xs font-black shadow-sm transition-all active:scale-95"
                  >
                    🐢 Slow Sound Hint
                  </button>
                  <button
                    onClick={() => {
                      if (emojiMatchWord.category.toLowerCase() === 'animals') {
                        setEmojiMatchHintText(`"This friendly animal makes a funny noise! Can you find it?"`);
                      } else if (emojiMatchWord.category.toLowerCase() === 'food') {
                        setEmojiMatchHintText(`"Yum! This is something very delicious to eat in Japan!"`);
                      } else {
                        setEmojiMatchHintText(`"In English, this means '${emojiMatchWord.english}'. Match its picture!"`);
                      }
                    }}
                    className="bg-white hover:bg-amber-100 text-amber-950 border-2 border-amber-300 rounded-full px-3.5 py-1.5 text-xs font-black shadow-sm transition-all active:scale-95"
                  >
                    📖 Story Clue
                  </button>
                </div>
                {emojiMatchHintText && (
                  <p className="text-xs font-black text-rose-700 bg-white border border-rose-100 rounded-xl px-4 py-2 mt-3 italic animate-fade-in leading-relaxed">
                    {emojiMatchHintText}
                  </p>
                )}
              </div>
            )}

            {/* Grid of 4 Emoji Options */}
            <div className="grid grid-cols-2 gap-4">
              {emojiMatchOptions.map((opt) => {
                const isAnswered = feedback !== null;
                const isThisWordCorrect = opt.id === emojiMatchWord.id;

                return (
                  <button
                    key={opt.id}
                    disabled={isAnswered}
                    onClick={() => handleEmojiMatchAnswer(opt)}
                    className={`aspect-square p-5 rounded-[28px] border-4 transition-all flex flex-col items-center justify-center font-black relative overflow-hidden ${
                      isAnswered
                        ? isThisWordCorrect
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-950 shadow-inner'
                          : 'bg-slate-50 border-slate-200 text-slate-300'
                        : 'bg-white border-slate-200 hover:border-rose-400 hover:bg-rose-50 text-slate-700 hover:scale-105 active:scale-95 hover:shadow-lg border-b-8 active:border-b-4'
                    }`}
                  >
                    <span className="text-6xl mb-1 block select-none animate-soft">{opt.emoji}</span>
                    <span className={`text-[11px] font-black uppercase text-slate-500 tracking-wider ${isAnswered && !isThisWordCorrect ? 'text-slate-300' : ''}`}>
                      {opt.english}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Feedback and Next */}
            {feedback && (
              <div className="mt-6 border-t-2 border-slate-100 pt-6">
                <div className={`p-4 rounded-[20px] font-black text-base text-center mb-4 border-2 ${
                  feedback.isCorrect ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-red-50 text-red-900 border-red-200'
                }`}>
                  {feedback.text}
                </div>
                <button
                  onClick={handleNextEmojiMatchStep}
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white font-black py-4 rounded-[20px] shadow-lg flex items-center justify-center gap-2 border-b-4 border-slate-950 hover:border-b-0 active:translate-y-1"
                >
                  Next Emoji Card ➡️
                </button>
              </div>
            )}
          </div>
        )}

        {/* --- GRAMMAR DEEP DIVE VIEW (PHASE 3) --- */}
        {gameType === 'grammar' && !isGameOver && destination.grammarQuestions?.[grammarIdx] && (() => {
          const quest = destination.grammarQuestions[grammarIdx];
          const isAnswered = feedback !== null;

          return (
            <div className="p-6 max-w-xl mx-auto space-y-6">
              <div className="border-b-4 border-blue-100 pb-4 flex justify-between items-center">
                <div>
                  <h4 className="font-black text-blue-950 text-xl">Grammar Deep Dive 📝</h4>
                  <p className="text-xs font-bold text-slate-500 mt-1">Topic: {quest.topic}</p>
                </div>
                <span className="text-xs font-black bg-blue-100 text-blue-700 px-3 py-1 rounded-full uppercase tracking-wider">Grammar</span>
              </div>

              {/* Core Sentence Cues */}
              <div className="bg-blue-50 border-4 border-blue-200 rounded-[32px] p-6 text-center shadow-inner">
                <p className="text-[10px] font-black uppercase text-blue-600 tracking-wider">Study Sentence</p>
                <h3 className="text-2xl font-black text-blue-950 mt-1">{quest.sentence}</h3>
              </div>

              {/* Core Question Cues */}
              <div className="space-y-4">
                <p className="font-extrabold text-slate-800 text-sm">{quest.question}</p>
                <div className="grid grid-cols-1 gap-3">
                  {quest.options.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleGrammarAnswer(opt, quest.correctAnswer, quest.explanation)}
                      className={`w-full p-4 rounded-[20px] font-black text-left text-sm border-4 transition-all ${
                        isAnswered
                          ? opt === quest.correctAnswer
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-950 shadow-inner'
                            : 'bg-slate-100 border-slate-200 text-slate-400'
                          : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-slate-700 hover:scale-102 shadow-sm border-b-8 active:border-b-2 active:translate-y-0.5'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action and feedback banner */}
              {feedback && (
                <div className="border-t-2 border-slate-100 pt-6">
                  <div className={`p-4 rounded-[20px] font-black text-sm text-center mb-4 border-2 ${
                    feedback.isCorrect ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-red-50 text-red-900 border-red-200'
                  }`}>
                    {feedback.text}
                  </div>
                  <button
                    onClick={handleNextGrammarQuestion}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white font-black py-4 rounded-[20px] shadow-lg flex items-center justify-center gap-2 border-b-4 border-slate-950 hover:border-b-0 active:translate-y-1"
                  >
                    Next Question ➡️
                  </button>
                </div>
              )}
            </div>
          );
        })()}

        {/* --- NATIVE-SPEED LISTENING COMPREHENSION (PHASE 3) --- */}
        {gameType === 'listeningEx' && !isGameOver && destination.listeningExercises?.[listeningExIdx] && (() => {
          const ex = destination.listeningExercises[listeningExIdx];
          const quest = ex.questions[0]; // Simplified for single question
          const isAnswered = feedback !== null;

          return (
            <div className="p-6 max-w-xl mx-auto space-y-6">
              <div className="border-b-4 border-emerald-100 pb-4 flex justify-between items-center">
                <div>
                  <h4 className="font-black text-emerald-950 text-xl">Native-Speed Listening 🚄</h4>
                  <p className="text-xs font-bold text-slate-500 mt-1">{ex.title}</p>
                </div>
                <span className="text-xs font-black bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full uppercase tracking-wider">Listening</span>
              </div>

              {/* Sound Player Cue Card */}
              <div className="bg-[#ECFDF5] border-4 border-emerald-300 rounded-[32px] p-6 text-center shadow-inner flex flex-col items-center">
                <button
                  onClick={() => {
                    // Speak the whole natural speech using ja locale
                    speakJapanese(ex.dialogueText, true);
                  }}
                  className="w-20 h-20 bg-emerald-500 hover:bg-emerald-600 hover:scale-110 active:scale-95 text-white rounded-full shadow-lg flex items-center justify-center text-4xl transition-transform border-4 border-white animate-soft"
                >
                  🔊
                </button>
                <p className="text-base font-black text-slate-800 mt-3">Click to hear the natural-speed spoken dialogue!</p>
              </div>

              {/* Question options */}
              <div className="space-y-4">
                <p className="font-extrabold text-slate-800 text-sm">{quest.question}</p>
                <div className="grid grid-cols-1 gap-3">
                  {quest.options.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleListeningAnswer(opt, quest.correctAnswer)}
                      className={`w-full p-4 rounded-[20px] font-black text-left text-sm border-4 transition-all ${
                        isAnswered
                          ? opt === quest.correctAnswer
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-950 shadow-inner'
                            : 'bg-slate-100 border-slate-200 text-slate-400'
                          : 'bg-white border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 text-slate-700 hover:scale-102 shadow-sm border-b-8 active:border-b-2 active:translate-y-0.5'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback and next */}
              {feedback && (
                <div className="border-t-2 border-slate-100 pt-6">
                  <div className={`p-4 rounded-[20px] font-black text-sm text-center mb-4 border-2 ${
                    feedback.isCorrect ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-red-50 text-red-900 border-red-200'
                  }`}>
                    {feedback.text}
                  </div>
                  <button
                    onClick={handleNextListeningQuestion}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white font-black py-4 rounded-[20px] shadow-lg flex items-center justify-center gap-2 border-b-4 border-slate-950 hover:border-b-0 active:translate-y-1"
                  >
                    Next Exercise ➡️
                  </button>
                </div>
              )}
            </div>
          );
        })()}

        {/* --- READING COMPREHENSION PASSAGES (PHASE 3) --- */}
        {gameType === 'readingEx' && !isGameOver && destination.readingPassages?.[readingExIdx] && (() => {
          const pass = destination.readingPassages[readingExIdx];
          const quest = pass.questions[0]; // Simplified for single question
          const isAnswered = feedback !== null;

          return (
            <div className="p-6 max-w-xl mx-auto space-y-6">
              <div className="border-b-4 border-rose-100 pb-4 flex justify-between items-center">
                <div>
                  <h4 className="font-black text-rose-950 text-xl">Reading Comprehension 📖</h4>
                  <p className="text-xs font-bold text-slate-500 mt-1">{pass.title}</p>
                </div>
                <span className="text-xs font-black bg-rose-100 text-rose-700 px-3 py-1 rounded-full uppercase tracking-wider">Reading</span>
              </div>

              {/* Scrollable text blog post */}
              <div className="bg-rose-50/40 border-4 border-rose-200 rounded-[32px] p-5 shadow-inner max-h-[180px] overflow-y-auto">
                <p className="text-xs font-black text-rose-700 uppercase tracking-wide mb-2">Authentic Japanese Entry</p>
                <p className="text-base font-black text-slate-800 leading-relaxed italic">{pass.content}</p>
              </div>

              {/* Reading question */}
              <div className="space-y-4">
                <p className="font-extrabold text-slate-800 text-sm">{quest.question}</p>
                <div className="grid grid-cols-1 gap-3">
                  {quest.options.map((opt, idx) => (
                    <button
                      key={idx}
                      disabled={isAnswered}
                      onClick={() => handleReadingAnswer(opt, quest.correctAnswer)}
                      className={`w-full p-4 rounded-[20px] font-black text-left text-sm border-4 transition-all ${
                        isAnswered
                          ? opt === quest.correctAnswer
                            ? 'bg-emerald-100 border-emerald-400 text-emerald-950 shadow-inner'
                            : 'bg-slate-100 border-slate-200 text-slate-400'
                          : 'bg-white border-slate-200 hover:border-rose-400 hover:bg-rose-50/40 text-slate-700 hover:scale-102 shadow-sm border-b-8 active:border-b-2 active:translate-y-0.5'
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Feedback banner */}
              {feedback && (
                <div className="border-t-2 border-slate-100 pt-6">
                  <div className={`p-4 rounded-[20px] font-black text-sm text-center mb-4 border-2 ${
                    feedback.isCorrect ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-red-50 text-red-900 border-red-200'
                  }`}>
                    {feedback.text}
                  </div>
                  <button
                    onClick={handleNextReadingQuestion}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white font-black py-4 rounded-[20px] shadow-lg flex items-center justify-center gap-2 border-b-4 border-slate-950 hover:border-b-0 active:translate-y-1"
                  >
                    Next Passage ➡️
                  </button>
                </div>
              )}
            </div>
          );
        })()}

        {/* --- GUIDED COMPOSITION & WRITING EXERCISE (PHASE 3) --- */}
        {gameType === 'writingEx' && !isGameOver && destination.writingPrompts?.[writingExIdx] && (() => {
          const prompt = destination.writingPrompts[writingExIdx];
          const isAnswered = feedback !== null;

          return (
            <div className="p-6 max-w-xl mx-auto space-y-6">
              <div className="border-b-4 border-purple-100 pb-4 flex justify-between items-center">
                <div>
                  <h4 className="font-black text-purple-950 text-xl">Guided Composition & Writing ✍️</h4>
                  <p className="text-xs font-bold text-slate-500 mt-1">{prompt.title}</p>
                </div>
                <span className="text-xs font-black bg-purple-100 text-purple-700 px-3 py-1 rounded-full uppercase tracking-wider">Composition</span>
              </div>

              {/* Task Details Cues */}
              <div className="bg-purple-50/50 border-4 border-purple-200 rounded-[32px] p-5 shadow-inner">
                <span className="text-[10px] font-black uppercase text-purple-700 tracking-wider">Your Task Instructions</span>
                <p className="text-xs font-bold text-slate-700 mt-1 leading-relaxed">{prompt.task}</p>

                {/* Required criteria check off */}
                <div className="mt-3.5 space-y-1.5 text-left border-t border-purple-100 pt-3">
                  <span className="text-[9px] font-black uppercase text-slate-400">Required elements:</span>
                  {prompt.requiredElements.map((el, eIdx) => {
                    const cleanEl = el.split(' ')[0].replace(/['"「」]/g, '');
                    const isMatched = writingInput.toLowerCase().includes(cleanEl.toLowerCase());
                    return (
                      <div key={eIdx} className="flex items-center gap-2 text-xs font-bold text-slate-600">
                        <span>{isMatched ? "✅" : "⬜"}</span>
                        <span>{el}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Text area draft box */}
              <div className="space-y-3">
                <label className="block text-xs font-black text-slate-500 uppercase tracking-widest">Type your draft in Japanese:</label>
                <textarea
                  value={writingInput}
                  disabled={isAnswered}
                  onChange={(e) => setWritingInput(e.target.value)}
                  placeholder="e.g. こんにちは。美味しいお茶をありがとうございます。"
                  className="w-full h-28 bg-slate-50 border-4 border-slate-200 hover:border-purple-300 focus:border-purple-500 rounded-2xl p-4 text-sm font-bold text-slate-800 placeholder-slate-400 focus:outline-none resize-none shadow-inner"
                />
              </div>

              {/* Action Trigger button */}
              {!isAnswered && (
                <button
                  onClick={() => handleVerifyWriting(prompt)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-black py-4 rounded-[20px] shadow-lg border-b-8 border-purple-800 active:border-b-2 active:translate-y-0.5"
                >
                  🚀 Click to Verify Draft Composition
                </button>
              )}

              {/* AI Feedback evaluation report */}
              {isAnswered && writingFeedback && (
                <div className="space-y-4 border-t-2 border-slate-100 pt-6">
                  <div className="bg-emerald-50 border-2 border-emerald-200 p-4 rounded-2xl text-center">
                    <span className="text-[9px] font-black uppercase text-emerald-700 bg-white px-2 py-0.5 rounded-full border border-emerald-100">AI Grammar evaluation</span>
                    <p className="text-sm font-black text-emerald-950 mt-1.5">{writingFeedback.rating}</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                    <h5 className="text-[10px] font-black uppercase text-slate-400">Suggested Authentic Japanese reference:</h5>
                    <div className="bg-white border p-3 rounded-xl">
                      <p className="text-xs font-black text-slate-800">"{prompt.suggestedAnswers[0]}"</p>
                    </div>
                  </div>

                  <button
                    onClick={handleNextWritingPrompt}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white font-black py-4 rounded-[20px] shadow-lg flex items-center justify-center gap-2 border-b-4 border-slate-950"
                  >
                    Next Writing Challenge ➡️
                  </button>
                </div>
              )}
            </div>
          );
        })()}

        {/* --- CONVERSATION VIEW (PHASE 3) --- */}
        {gameType === 'conversation' && !isGameOver && destination.conversations?.[convScenarioIdx] && (() => {
          const scen = destination.conversations[convScenarioIdx];
          const currentTurn = scen.turns[convTurnIdx];
          const nextTurn = scen.turns[convTurnIdx + 1]; // This is the user choose turn
          const isUserChoosing = nextTurn && nextTurn.options;

          return (
            <div className="p-6 max-w-xl mx-auto space-y-6">
              {/* Scenario Info */}
              <div className="border-b-4 border-indigo-100 pb-4 flex justify-between items-center">
                <div>
                  <h4 className="font-black text-indigo-950 text-xl">{scen.title}</h4>
                  <p className="text-xs font-bold text-slate-500 mt-1">{scen.description}</p>
                </div>
                <span className="text-xs font-black bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full uppercase tracking-wider">Roleplay</span>
              </div>

              {/* Dialogue History Scroll */}
              <div className="bg-slate-50 border-4 border-slate-200 rounded-[32px] p-5 max-h-[300px] overflow-y-auto space-y-4 shadow-inner">
                {convHistory.map((item, idx) => {
                  const isYou = item.speaker === "You";
                  return (
                    <div key={idx} className={`flex gap-3 items-start ${isYou ? 'flex-row-reverse' : ''}`}>
                      <div className={`p-3 rounded-2xl shadow-sm border-2 max-w-[85%] ${
                        isYou ? 'bg-indigo-500 text-white border-indigo-600' : 'bg-white text-slate-800 border-slate-100'
                      }`}>
                        <span className="text-[10px] font-black uppercase tracking-wider block opacity-70 mb-1">{item.speaker}</span>
                        <p className="text-sm font-black leading-snug">{item.text}</p>
                        <p className={`text-xs mt-1 ${isYou ? 'text-indigo-100' : 'text-slate-400'}`}>({item.english})</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* User Selector Turn options */}
              {isUserChoosing && !feedback && (
                <div className="space-y-3">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest block text-center mb-1">What do you say next?</span>
                  {nextTurn.options?.map((opt, oIdx) => (
                    <button
                      key={oIdx}
                      onClick={() => handleConversationOption(opt)}
                      className="w-full bg-white border-4 border-slate-200 hover:border-indigo-500 hover:bg-indigo-50/20 p-4 rounded-[24px] font-black text-left text-sm transition-all shadow-sm active:scale-98 flex items-center justify-between group"
                    >
                      <div>
                        <p className="text-slate-800 group-hover:text-indigo-950">{opt.text}</p>
                        <p className="text-xs text-slate-400 font-bold mt-0.5">({opt.english})</p>
                      </div>
                      <span className="text-xl opacity-0 group-hover:opacity-100 transition-opacity">➡️</span>
                    </button>
                  ))}
                </div>
              )}

              {/* Feedbacks with Next button */}
              {feedback && (
                <div className="border-t-2 border-slate-100 pt-6">
                  <div className={`p-4 rounded-[20px] font-black text-base text-center mb-4 border-2 ${
                    feedback.isCorrect ? 'bg-emerald-50 text-emerald-900 border-emerald-200' : 'bg-red-50 text-red-900 border-red-200'
                  }`}>
                    {feedback.text}
                  </div>
                  <button
                    onClick={handleNextConversationTurn}
                    className="w-full bg-slate-800 hover:bg-slate-900 text-white font-black py-4 rounded-[20px] shadow-lg flex items-center justify-center gap-2 border-b-4 border-slate-950 hover:border-b-0 active:translate-y-1"
                  >
                    Continue Conversation ➡️
                  </button>
                </div>
              )}
            </div>
          );
        })()}

        {/* --- PRONUNCIATION CHALLENGE VIEW --- */}
        {gameType === 'pronounce' && !isGameOver && (
          <div className="p-6 max-w-xl mx-auto">
            <div className="flex justify-between items-center border-b-4 border-rose-100 pb-4 mb-6">
              <h4 className="font-black text-rose-950 text-xl">Pronunciation Challenge 🎤</h4>
              <div className="flex items-center gap-4 text-xs sm:text-sm font-black text-rose-900">
                <span>Word: <strong>{pronounceWordIndex + 1}/5</strong></span>
                <span>Score: <strong className="text-rose-600 text-lg">{score}</strong></span>
              </div>
            </div>

            {/* Focus word cards */}
            {(() => {
              const word = destination.vocabList[pronounceWordIndex % destination.vocabList.length];
              return (
                <div className="text-center">
                  <div className="bg-[#F3E8FF] border-4 border-[#C084FC] rounded-[32px] p-8 mb-6 shadow-md">
                    <span className="text-6xl block mb-3 animate-soft">{word.emoji}</span>
                    <h3 className="text-4xl font-black text-purple-950 mb-1">{word.japanese}</h3>
                    <p className="text-slate-600 font-bold mb-4">({word.romaji}) = {word.english}</p>

                    <button
                      onClick={() => playAudio(word.japanese)}
                      className="inline-flex items-center gap-2 bg-white text-purple-700 border-2 border-purple-300 px-5 py-2.5 rounded-full font-black text-sm hover:bg-purple-50 shadow-sm"
                    >
                      🔊 Listen to correct sound
                    </button>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={handlePronounceAttempt}
                      disabled={isPronouncing || pronounceAttempted}
                      className={`w-full py-5 rounded-[28px] font-black text-xl shadow-lg transition-all flex items-center justify-center gap-3 border-4 ${
                        isPronouncing
                          ? 'bg-purple-100 text-purple-700 animate-pulse border-purple-300'
                          : pronounceAttempted
                            ? 'bg-emerald-500 text-white border-emerald-600'
                            : 'bg-purple-600 hover:bg-purple-700 text-white border-purple-700 border-b-8 active:border-b-2 active:translate-y-1'
                      }`}
                    >
                      {isPronouncing ? (
                        <>🎤 Recording... Say "{word.japanese}"</>
                      ) : pronounceAttempted ? (
                        <>✅ Great Attempt! Score: {pronounceScore}%</>
                      ) : (
                        <>🎤 Hold to Speak (Tap to Try)</>
                      )}
                    </button>

                    {pronounceAttempted && (
                      <button
                        onClick={handleNextPronounceWord}
                        className="w-full bg-slate-800 hover:bg-slate-900 text-white font-black py-4 rounded-[20px] shadow-lg border-b-4 border-slate-950"
                      >
                        Next Word ➡️
                      </button>
                    )}
                  </div>
                </div>
              );
            })()}
          </div>
        )}

        {/* --- GAME OVER CELEBRATION SUMMARY --- */}
        {isGameOver && (() => {
          const masteredCount = state.profiles[activeKid].masteredVocab[destination.id]?.length || 0;
          const totalCount = destination.vocabList.length;
          const isCityFullyMastered = masteredCount === totalCount;

          return (
            <div className="p-8 text-center max-w-md mx-auto">
              {/* Giant celebration overlay for 100% City Mastery */}
              {isCityFullyMastered ? (
                <div className="bg-gradient-to-r from-yellow-400 via-pink-400 to-red-400 border-8 border-yellow-200 rounded-[36px] p-6 mb-8 text-white shadow-xl relative overflow-hidden animate-pulse">
                  <div className="absolute top-2 left-2 text-2xl animate-spin">✨</div>
                  <div className="absolute top-2 right-2 text-2xl animate-bounce">🎆</div>
                  <div className="absolute bottom-2 left-4 text-3xl animate-wiggle">🌸</div>
                  <div className="absolute bottom-2 right-4 text-3xl animate-soft">🗻</div>

                  <div className="relative z-10 text-center">
                    <span className="text-7xl block mb-2 animate-bounce">👑</span>
                    <h5 className="text-2xl font-black tracking-wide drop-shadow-md">
                      GRAND CHAMPION OF {destination.name.toUpperCase()}!
                    </h5>
                    <p className="text-xs font-black bg-white/35 px-3 py-1 rounded-full inline-block mt-2 tracking-wider border border-white/20">
                      🏆 100% MASTERED ALL {totalCount} WORDS! 🏆
                    </p>
                    <p className="text-xs font-extrabold leading-relaxed mt-3 max-w-xs mx-auto">
                      You've successfully mastered every single word in this destination! You are officially a Japan Travel expert! ✈️🇯🇵
                    </p>
                  </div>
                </div>
              ) : (
                <div className="text-8xl mb-4 animate-bounce">🏆</div>
              )}

              <h4 className="text-4xl font-black text-rose-950">Quest Complete!</h4>
              <p className="text-slate-600 font-bold mt-2 mb-6 text-sm">
                Fantastic work, {state.profiles[activeKid].name}! You did an amazing job.
              </p>

              {/* Maneki Neko Congratulating Card */}
              <div className="bg-amber-50 border-4 border-amber-300 rounded-[28px] p-4 mb-6 shadow-sm flex items-center gap-4 relative overflow-hidden animate-wiggle">
                <span className="text-6xl animate-bounce inline-block">🐱👋</span>
                <div className="text-left">
                  <h5 className="font-black text-amber-950 text-sm">Lucky Cat Congratulates You:</h5>
                  <p className="text-xs text-amber-800 font-bold leading-relaxed mt-0.5">
                    "Nyan-tastic job, {state.profiles[activeKid].name}! Wishing you great fortune and endless fun in Japan! Meow! 🐾"
                  </p>
                </div>
              </div>

              <div className="bg-rose-50 border-4 border-rose-200 p-6 rounded-[28px] shadow-inner mb-8 space-y-3">
              <div className="flex justify-between items-center font-black text-base text-rose-900">
                <span>Points Scored:</span>
                <span className="text-xl text-rose-600">{score} pts</span>
              </div>
              <div className="flex justify-between items-center font-black text-base text-rose-900">
                <span>XP Earned:</span>
                <span className="text-xl text-emerald-600">+40 XP</span>
              </div>
              <div className="flex justify-between items-center font-black text-base text-rose-900">
                <span>Current Level:</span>
                <span className="text-xl text-indigo-600">Level {state.profiles[activeKid].level}</span>
              </div>
            </div>

              <div className="flex flex-col gap-4">
                <button
                  onClick={() => startGame(gameType!)}
                  className="w-full bg-rose-500 hover:bg-rose-600 text-white font-black py-4 rounded-[24px] shadow-lg border-b-8 border-rose-700 active:border-b-2 active:translate-y-1"
                >
                  🔄 Replay Game (Improve score!)
                </button>
                <button
                  onClick={onClose}
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white font-black py-4 rounded-[24px] shadow-md border-b-8 border-slate-950 active:border-b-2 active:translate-y-1"
                >
                  🗺️ Return to Map
                </button>
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
};
export default GameSession;
