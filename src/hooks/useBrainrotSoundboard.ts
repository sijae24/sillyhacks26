import { useEffect } from "react";

type SoundKey = "vine" | "fah" ;

export function useBrainrotSoundboard() {
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

    document.addEventListener("keydown", (e: KeyboardEvent) => {
      const now = Date.now();
      if (now - lastPlayTime < cooldownMs) return;

      let soundKey: SoundKey | null = null;
      if (e.key.toUpperCase() === "A" || e.key == "6" ) soundKey = "vine";
      else if (e.key.toUpperCase() === "E" || e.code === "Space" || e.key == "7") soundKey = "fah";

      if (soundKey) {
        lastPlayTime = now;
        const audio = sounds[soundKey];
        audio.currentTime = 0;
        audio.play().catch(() => {});
      }
    });

    return () => {};
  }, []);
}
