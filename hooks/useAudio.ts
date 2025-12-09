import { useRef, useEffect, useState } from 'react';

export function useAudio() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const [japVoice, setJapVoice] = useState<SpeechSynthesisVoice | null>(null);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    // speechSynthesis voice 읽어와서 일본 보이스 설정
    const loadVoices = () => {
      if (japVoice) return;

      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return;

      const voice = voices.find((v) => v.lang === 'ja-JP' && v.name.includes('Google'));

      if (voice) {
        setJapVoice(voice);
        if (intervalId) clearInterval(intervalId);
      }
    };

    const handleVoicesChanged = () => loadVoices();

    window.speechSynthesis.addEventListener('voiceschanged', handleVoicesChanged);

    loadVoices();

    intervalId = setInterval(loadVoices, 300);

    timeoutId = setTimeout(() => {
      if (intervalId) clearInterval(intervalId);
    }, 3000);

    return () => {
      if (intervalId) clearInterval(intervalId);
      if (timeoutId) clearTimeout(timeoutId);
      window.speechSynthesis.removeEventListener('voiceschanged', handleVoicesChanged);
    };
  }, [japVoice]);

  const play = (word: string, audioUrl?: string) => {
    // 재생중이면 정지
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    window.speechSynthesis.cancel();

    // url있는경우
    if (audioUrl) {
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.play().catch((err) => {
        console.warn('오디오 재생 실패:', err);
      });
    }

    // TTS설정
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'ja-JP';

    // 일본 목소리 설정
    if (japVoice) utterance.voice = japVoice;

    utteranceRef.current = utterance;
    utterance.onend = () => (utteranceRef.current = null);

    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    window.speechSynthesis.cancel();
    utteranceRef.current = null;
  };

  return { play, stop };
}
