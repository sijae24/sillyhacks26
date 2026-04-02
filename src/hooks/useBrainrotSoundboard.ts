import { useEffect, useRef } from "react";

type SoundKey = "vine" | "fah" ;

// 1. Accept the volume parameter
export function useBrainrotSoundboard(volume: number = 0.5) {
  // 2. Safely store the volume so the event listener always sees the latest value
  const volumeRef = useRef(volume);
  useEffect(() => {
    volumeRef.current = volume;
  }, [volume]);

  useEffect(() => {
    const sounds: Record<SoundKey, HTMLAudioElement> = {
      vine: new Audio(new URL("/src/assets/audio/vine_boom.mp3", import.meta.url).href),
      fah: new Audio(new URL("/src/assets/audio/fahhh.mp3", import.meta.url).href),
    };

    Object.values(sounds).forEach((audio) => {
      audio.preload = "auto";
    });

    let lastPlayTime = 0;
    const cooldownMs = 50;

    const handleKeyDown = (e: KeyboardEvent) => {
      const now = Date.now();
      if (now - lastPlayTime < cooldownMs) return;

      let soundKey: SoundKey | null = null;
      if (e.key.toUpperCase() === "A" || e.key == "6" ) soundKey = "vine";
      else if (e.key.toUpperCase() === "E" || e.code === "Space" || e.key == "7") soundKey = "fah";

      if (soundKey) {
        lastPlayTime = now;
        const audio = sounds[soundKey];
        
        // 3. Apply the volume right before playing
        audio.volume = volumeRef.current; 
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);
}
