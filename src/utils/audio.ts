export const speakJapanese = (text: string, enabled: boolean = true) => {
  if (!enabled) return;
  if ('speechSynthesis' in window) {
    // Cancel any active speech first
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ja-JP';

    // Find a native Japanese voice if available
    const voices = window.speechSynthesis.getVoices();
    const jaVoice = voices.find(voice => voice.lang === 'ja-JP' || voice.lang.startsWith('ja'));
    if (jaVoice) {
      utterance.voice = jaVoice;
    }

    utterance.rate = 0.85; // Slightly slower speed for kids learning
    window.speechSynthesis.speak(utterance);
  } else {
    console.warn("Speech Synthesis not supported in this browser.");
  }
};
