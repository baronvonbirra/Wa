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
  const activeKid = state.activePlayer === 'parent' ? 'sofia' : state.activePlayer;

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
        className="mb-4 inline-flex items-center gap-2 text-rose-600 font-bold hover:text-rose-800 transition-all text-sm"
      >
        <span>⬅️</span> Back to Map Destinations
      </button>

      {/* Main Container */}
      <div className="bg-white border-4 border-rose-100 rounded-3xl shadow-xl overflow-hidden">
        {/* Destination Header Banner */}
        <div className="bg-gradient-to-r from-rose-500 to-rose-600 p-6 text-white flex justify-between items-center">
          <div>
            <h3 className="text-2xl font-black">{destination.name} Quest</h3>
            <p className="text-rose-100 text-sm font-semibold">{destination.theme}</p>
          </div>
          <span className="text-5xl">{destination.emoji}</span>
        </div>

        {/* Start Game Mode Switcher */}
        {!gameType && (
          <div className="p-8">
            <h4 className="text-xl font-black text-center text-rose-950 mb-6">Select a Game Mode to Play & Learn!</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
              <button
                onClick={() => startGame('match')}
                className="p-5 bg-pink-50 border-2 border-pink-200 hover:border-pink-400 rounded-2xl text-left transition-all hover:shadow-md active:scale-95 group flex items-start gap-4"
              >
                <span className="text-4xl bg-white p-2.5 rounded-xl border border-pink-100 group-hover:scale-110 transition-transform">🎴</span>
                <div>
                  <h5 className="font-extrabold text-pink-900 text-base">Hiragana Match</h5>
                  <p className="text-xs text-pink-700 font-medium mt-1">Flip cards, match Japanese text with emojis. Best for Sofia (5yo).</p>
                </div>
              </button>

              <button
                onClick={() => startGame('listen')}
                className="p-5 bg-emerald-50 border-2 border-emerald-200 hover:border-emerald-400 rounded-2xl text-left transition-all hover:shadow-md active:scale-95 group flex items-start gap-4"
              >
                <span className="text-4xl bg-white p-2.5 rounded-xl border border-emerald-100 group-hover:scale-110 transition-transform">🎧</span>
                <div>
                  <h5 className="font-extrabold text-emerald-900 text-base">Listen & Click</h5>
                  <p className="text-xs text-emerald-700 font-medium mt-1">Hear the Japanese word spoken aloud and pick its translation.</p>
                </div>
              </button>

              <button
                onClick={() => startGame('read')}
                className="p-5 bg-amber-50 border-2 border-amber-200 hover:border-amber-400 rounded-2xl text-left transition-all hover:shadow-md active:scale-95 group flex items-start gap-4"
              >
                <span className="text-4xl bg-white p-2.5 rounded-xl border border-amber-100 group-hover:scale-110 transition-transform">📚</span>
                <div>
                  <h5 className="font-extrabold text-amber-900 text-base">Read & Understand</h5>
                  <p className="text-xs text-amber-700 font-medium mt-1">Choose the English meaning for Japanese hiragana text.</p>
                </div>
              </button>

              <button
                onClick={() => startGame('dialogue')}
                disabled={destination.dialogues.length === 0}
                className={`p-5 rounded-2xl text-left transition-all group flex items-start gap-4 ${
                  destination.dialogues.length > 0
                    ? 'bg-blue-50 border-2 border-blue-200 hover:border-blue-400 hover:shadow-md active:scale-95'
                    : 'bg-slate-50 border-2 border-slate-100 opacity-50 cursor-not-allowed'
                }`}
              >
                <span className="text-4xl bg-white p-2.5 rounded-xl border border-blue-100 group-hover:scale-110 transition-transform">💬</span>
                <div>
                  <h5 className="font-extrabold text-blue-900 text-base">Dialogue Fill-in</h5>
                  <p className="text-xs text-blue-700 font-medium mt-1">Complete blank conversations with vocabulary context.</p>
                </div>
              </button>

              <button
                onClick={() => startGame('pronounce')}
                className="p-5 bg-purple-50 border-2 border-purple-200 hover:border-purple-400 rounded-2xl text-left transition-all hover:shadow-md active:scale-95 group flex items-start gap-4"
              >
                <span className="text-4xl bg-white p-2.5 rounded-xl border border-purple-100 group-hover:scale-110 transition-transform">🎤</span>
                <div>
                  <h5 className="font-extrabold text-purple-900 text-base">Pronounce Challenge</h5>
                  <p className="text-xs text-purple-700 font-medium mt-1">Read out loud and test speech clarity with native accents.</p>
                </div>
              </button>
            </div>
          </div>
        )}

        {/* --- MATCHING CARDS PLAYING VIEW --- */}
        {gameType === 'match' && !isGameOver && (
          <div className="p-6">
            <div className="flex justify-between items-center border-b border-rose-100 pb-4 mb-6">
              <h4 className="font-black text-rose-950 text-lg">Hiragana Match 🃏</h4>
              <div className="flex items-center gap-4 text-sm font-extrabold text-rose-900">
                <span>Score: <strong className="text-rose-600 text-lg">{score}</strong></span>
                {streakCount >= 2 && <span className="bg-amber-100 text-amber-700 px-2 py-0.5 rounded-md">🔥 {streakCount} Streak!</span>}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-lg mx-auto">
              {matchCards.map((card, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCardClick(idx)}
                  className={`aspect-square rounded-2xl text-center flex flex-col items-center justify-center font-bold p-4 shadow-sm border transition-all duration-300 transform ${
                    card.isMatched
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-800 scale-95 opacity-60 pointer-events-none'
                      : card.isFlipped
                        ? 'bg-rose-50 border-rose-400 text-rose-950 rotate-y-180 font-black'
                        : 'bg-indigo-600 border-indigo-700 text-white hover:bg-indigo-700 hover:scale-105 active:scale-95'
                  }`}
                >
                  {card.isMatched || card.isFlipped ? (
                    <span className="text-sm sm:text-base leading-snug">{card.val}</span>
                  ) : (
                    <span className="text-3xl font-extrabold">❓</span>
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
            <div className="flex justify-between items-center border-b border-rose-100 pb-4 mb-6">
              <h4 className="font-black text-rose-950 text-lg">
                {gameType === 'listen' ? '🎧 Listen & Click' : '📚 Read & Understand'}
              </h4>
              <div className="flex items-center gap-4 text-xs sm:text-sm font-extrabold text-rose-900">
                <span>Question: <strong>{currentStep + 1}/5</strong></span>
                <span>Score: <strong className="text-rose-600 text-lg">{score}</strong></span>
              </div>
            </div>

            {/* Cue Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 text-center shadow-inner mb-6">
              {gameType === 'listen' ? (
                <div>
                  <button
                    onClick={() => playAudio(quizWord.japanese)}
                    className="w-16 h-16 bg-rose-500 hover:bg-rose-600 hover:scale-105 text-white rounded-full shadow-md flex items-center justify-center text-2xl mx-auto mb-3 transition-transform"
                  >
                    🔊
                  </button>
                  <p className="text-sm font-black text-slate-500">Tap to hear Japanese word</p>
                </div>
              ) : (
                <div>
                  <p className="text-xs font-bold text-rose-600 uppercase tracking-widest mb-1">Translate Hiragana</p>
                  <h3 className="text-4xl font-black text-rose-950 mb-1">{quizWord.japanese}</h3>
                  <p className="text-sm font-bold text-slate-500">({quizWord.romaji})</p>
                </div>
              )}
            </div>

            {/* Answer Options */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quizOptions.map((opt, idx) => {
                const isAnswered = feedback !== null;
                const isThisSelected = feedback && opt === quizWord.english;

                return (
                  <button
                    key={idx}
                    disabled={isAnswered}
                    onClick={() => handleQuizAnswer(opt)}
                    className={`w-full py-4 px-6 rounded-2xl font-bold text-center border-2 transition-all shadow-sm ${
                      isAnswered
                        ? opt === quizWord.english
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-950'
                          : 'bg-slate-100 border-slate-200 text-slate-400'
                        : 'bg-white border-slate-200 hover:border-rose-400 hover:bg-rose-50/30 text-slate-700 active:scale-95'
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Hints System */}
            {!feedback && (
              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => {
                    setHasUsedHint(true);
                    playAudio(quizWord.japanese);
                  }}
                  disabled={hasUsedHint}
                  className={`text-xs font-extrabold px-4 py-2 rounded-full border transition-all ${
                    hasUsedHint
                      ? 'bg-slate-100 text-slate-400 border-slate-200'
                      : 'bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100'
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
              <div className="mt-6 border-t border-slate-100 pt-6">
                <div className={`p-4 rounded-2xl font-bold text-sm text-center mb-4 ${
                  feedback.isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                }`}>
                  {feedback.text}
                </div>
                <button
                  onClick={handleNextQuizStep}
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white font-extrabold py-3.5 rounded-2xl shadow-md flex items-center justify-center gap-2"
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
            <div className="flex justify-between items-center border-b border-rose-100 pb-4 mb-6">
              <h4 className="font-black text-rose-950 text-lg">Dialogue Completion 💬</h4>
              <div className="flex items-center gap-4 text-xs sm:text-sm font-extrabold text-rose-900">
                <span>Dialogue: <strong>{dialogueIndex + 1}/{destination.dialogues.length}</strong></span>
                <span>Score: <strong className="text-rose-600 text-lg">{score}</strong></span>
              </div>
            </div>

            {/* Main conversation box */}
            <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-inner space-y-4 mb-6">
              <h5 className="text-xs font-black text-rose-500 uppercase tracking-widest">{activeDialogue.title}</h5>

              {activeDialogue.japanese.map((line, idx) => {
                const isMissing = idx === activeDialogue.missingIndex;
                const textWithBlank = isMissing
                  ? line.replace(activeDialogue.missingWordJapanese, "_______")
                  : line;

                return (
                  <div key={idx} className="flex gap-2">
                    <div className="bg-white px-3 py-1.5 rounded-2xl shadow-sm border border-slate-100 text-xs sm:text-sm max-w-[90%]">
                      <p className="font-black text-slate-800">{textWithBlank}</p>
                      <p className="text-[11px] text-slate-400 italic">({activeDialogue.romaji[idx]})</p>
                      <p className="text-[11px] text-slate-500 mt-1">{activeDialogue.english[idx]}</p>
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
                    className={`p-3 rounded-xl font-bold text-sm text-center border transition-all ${
                      isAnswered
                        ? opt === activeDialogue.missingWordJapanese
                          ? 'bg-emerald-100 border-emerald-400 text-emerald-950 font-black'
                          : 'bg-slate-100 border-slate-200 text-slate-400'
                        : 'bg-white border-slate-200 hover:border-blue-400 hover:bg-blue-50/40 text-slate-700 font-extrabold'
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
                  className="text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 px-3 py-1.5 rounded-full"
                >
                  🔊 Hear the missing word hint
                </button>
              </div>
            )}

            {/* Dialogue Feedback */}
            {feedback && (
              <div className="border-t border-slate-100 pt-6">
                <div className={`p-4 rounded-2xl font-bold text-sm text-center mb-4 ${
                  feedback.isCorrect ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'
                }`}>
                  {feedback.text}
                </div>
                <button
                  onClick={handleNextDialogue}
                  className="w-full bg-slate-800 hover:bg-slate-900 text-white font-extrabold py-3.5 rounded-2xl shadow-md"
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
            <div className="flex justify-between items-center border-b border-rose-100 pb-4 mb-6">
              <h4 className="font-black text-rose-950 text-lg">Pronunciation Challenge 🎤</h4>
              <div className="flex items-center gap-4 text-xs sm:text-sm font-extrabold text-rose-900">
                <span>Word: <strong>{pronounceWordIndex + 1}/5</strong></span>
                <span>Score: <strong className="text-rose-600 text-lg">{score}</strong></span>
              </div>
            </div>

            {/* Focus word cards */}
            {(() => {
              const word = destination.vocabList[pronounceWordIndex % destination.vocabList.length];
              return (
                <div className="text-center">
                  <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 mb-6 shadow-inner">
                    <span className="text-5xl block mb-2">{word.emoji}</span>
                    <h3 className="text-3xl font-black text-rose-950 mb-1">{word.japanese}</h3>
                    <p className="text-slate-500 font-bold mb-4">({word.romaji}) = {word.english}</p>

                    <button
                      onClick={() => playAudio(word.japanese)}
                      className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 border border-rose-200 px-4 py-2 rounded-full font-bold text-sm hover:bg-rose-100"
                    >
                      🔊 Listen to correct sound
                    </button>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={handlePronounceAttempt}
                      disabled={isPronouncing || pronounceAttempted}
                      className={`w-full py-5 rounded-3xl font-black text-lg shadow-md transition-all flex items-center justify-center gap-3 ${
                        isPronouncing
                          ? 'bg-purple-100 text-purple-700 animate-pulse border border-purple-200'
                          : pronounceAttempted
                            ? 'bg-emerald-500 text-white cursor-default'
                            : 'bg-purple-600 hover:bg-purple-700 active:scale-95 text-white'
                      }`}
                    >
                      {isPronouncing ? (
                        <>🎤 Recording... Say "{word.japanese}"</>
                      ) : pronounceAttempted ? (
                        <>✅ Great Attempt! Pronunciation Score: 92%</>
                      ) : (
                        <>🎤 Hold to Speak (Tap to Try)</>
                      )}
                    </button>

                    {pronounceAttempted && (
                      <button
                        onClick={handleNextPronounceWord}
                        className="w-full bg-slate-800 hover:bg-slate-900 text-white font-extrabold py-3.5 rounded-2xl shadow-md"
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
            <div className="text-6xl mb-4 animate-bounce">🏆</div>
            <h4 className="text-3xl font-black text-rose-950">Quest Complete!</h4>
            <p className="text-slate-600 font-medium mt-1 mb-6">
              Fantastic work, {state.profiles[activeKid].name}! You did an amazing job.
            </p>

            <div className="bg-rose-50 border border-rose-100 p-5 rounded-3xl shadow-inner mb-6 space-y-3">
              <div className="flex justify-between items-center font-extrabold text-sm text-rose-900">
                <span>Points Scored:</span>
                <span className="text-lg text-rose-600">{score} pts</span>
              </div>
              <div className="flex justify-between items-center font-extrabold text-sm text-rose-900">
                <span>XP Earned:</span>
                <span className="text-lg text-emerald-600">+40 XP</span>
              </div>
              <div className="flex justify-between items-center font-extrabold text-sm text-rose-900">
                <span>Current Level:</span>
                <span className="text-lg text-indigo-600">Level {state.profiles[activeKid].level}</span>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => startGame(gameType!)}
                className="w-full bg-rose-500 hover:bg-rose-600 text-white font-extrabold py-3.5 rounded-2xl shadow-lg transition-all"
              >
                🔄 Replay Game (Improve score!)
              </button>
              <button
                onClick={onClose}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white font-extrabold py-3.5 rounded-2xl shadow-md transition-all"
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
