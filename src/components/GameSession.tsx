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

  const [gameType, setGameType] = useState<'match' | 'listen' | 'read' | 'dialogue' | 'pronounce' | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [score, setScore] = useState(0);
  const [streakCount, setStreakCount] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [hasUsedHint, setHasUsedHint] = useState(false);

  // States specific to card matching
  const [matchCards, setMatchCards] = useState<{ id: string; val: string; type: 'jp' | 'en'; isFlipped: boolean; isMatched: boolean }[]>([]);
  const [selectedCards, setSelectedCards] = useState<number[]>([]);

  // States specific to quizzes
  const [quizWord, setQuizWord] = useState<VocabularyWord | null>(null);
  const [quizOptions, setQuizOptions] = useState<string[]>([]);

  // States specific to Dialogue
  const [dialogueIndex, setDialogueIndex] = useState(0);

  // States specific to Pronunciation Sandbox
  const [pronounceWordIndex, setPronounceWordIndex] = useState(0);
  const [isPronouncing, setIsPronouncing] = useState(false);
  const [pronounceAttempted, setPronounceAttempted] = useState(false);

  // Play audio helper
  const playAudio = (text: string) => {
    speakJapanese(text, state.soundEnabled);
  };

  // Start selected game mode
  const startGame = (type: 'match' | 'listen' | 'read' | 'dialogue' | 'pronounce') => {
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

  // --- PRONUNCIATION SANDBOX LOGIC ---
  const handlePronounceAttempt = () => {
    setIsPronouncing(true);
    // Simulating child's clear microphone input and playing congratulations audio
    setTimeout(() => {
      setIsPronouncing(false);
      setPronounceAttempted(true);
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
                  <p className="text-xs text-pink-700 font-bold mt-1">Flip cards, match Japanese text with emojis. Best for James (5yo)!</p>
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
                onClick={() => startGame('pronounce')}
                className="p-5 bg-purple-50 border-4 border-purple-200 hover:border-purple-400 rounded-3xl text-left transition-all hover:shadow-lg active:scale-95 group flex items-start gap-4"
              >
                <span className="text-5xl bg-white p-3 rounded-2xl border-2 border-purple-100 group-hover:scale-110 transition-transform shadow-sm">🎤</span>
                <div>
                  <h5 className="font-black text-purple-900 text-lg">Pronounce Challenge</h5>
                  <p className="text-xs text-purple-700 font-bold mt-1">Read out loud and test speech clarity with native accents.</p>
                </div>
              </button>
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
                    <span className="text-base sm:text-lg leading-snug drop-shadow-sm">{card.val}</span>
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
                        <>✅ Great Attempt! Score: 92%</>
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
        {isGameOver && (
          <div className="p-8 text-center max-w-md mx-auto">
            <div className="text-8xl mb-4 animate-bounce">🏆</div>
            <h4 className="text-4xl font-black text-rose-950">Quest Complete!</h4>
            <p className="text-slate-600 font-bold mt-2 mb-6 text-sm">
              Fantastic work, {state.profiles[activeKid].name}! You did an amazing job.
            </p>

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
        )}
      </div>
    </div>
  );
};
export default GameSession;
