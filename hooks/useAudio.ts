import { useRef } from "react";

export function useAudio(){
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const play = (word: string, audioUrl?: string) => {
    // 재생 중이면 정지
    if(audioRef.current){
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    // audioUrl이 있는 경우
    if(audioUrl){
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      audio.play().catch((err) => {
        console.warn("오디오 재생 실패:", err);
      });
      return;
    }

    // TTS 사용
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "ja-JP";
    speechSynthesis.cancel(); // 기존 재생 제거
    speechSynthesis.speak(utterance);
  };

  const stop = () => {
    if(audioRef.current){
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    speechSynthesis.cancel();
  };

  return { play, stop }
}