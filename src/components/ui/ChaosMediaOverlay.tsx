import { useEffect, useMemo, useState } from "react";

type CloudItem = {
  src: string;
  id: number;
  left: number;
  top: number;
  size: number;
};

export function pickRandomMedia(mediaPool: string[]) {
  return mediaPool[Math.floor(Math.random() * mediaPool.length)];
}

export default function ChaosMediaOverlay({
  activeMedia,
  mediaPool,
  onClose,
  cloudCount = 6,
  zIndex = 100,
  overlayToneClass = "bg-linear-to-br from-red-900/80 via-fuchsia-800/80 to-cyan-800/80",
  altText = "cursed media",
  imageClassName = "max-h-[65vh] max-w-[82vw] rounded border-4 border-lime-300 object-contain shadow-[0_0_35px_rgba(255,0,255,0.8)]",
}: {
  activeMedia: string | null;
  mediaPool: string[];
  onClose: () => void;
  cloudCount?: number;
  zIndex?: number;
  overlayToneClass?: string;
  altText?: string;
  imageClassName?: string;
}) {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (!activeMedia) return;
    const id = window.setInterval(() => setTick((v) => v + 1), 230);
    return () => window.clearInterval(id);
  }, [activeMedia]);

  const mediaCloud = useMemo<CloudItem[]>(() => {
    if (!activeMedia) return [];
    return Array.from({ length: cloudCount }, (_, i) => ({
      id: i,
      src: pickRandomMedia(mediaPool),
      left: 8 + Math.random() * 80,
      top: 8 + Math.random() * 80,
      size: 120 + Math.random() * 180,
    }));
  }, [activeMedia, mediaPool, cloudCount]);

  const mainStyle = useMemo(
    () => ({
      transform: `translate(${Math.floor(Math.random() * 110) - 55}px, ${Math.floor(Math.random() * 90) - 45}px) rotate(${Math.floor(Math.random() * 38) - 19}deg) scale(${0.78 + Math.random() * 0.45})`,
      filter: `hue-rotate(${Math.floor(Math.random() * 360)}deg) saturate(${1.1 + Math.random() * 1.9}) contrast(${1.1 + Math.random() * 1.5})`,
    }),
    [tick],
  );

  if (!activeMedia) return null;

  return (
    <div className={`fixed inset-0 overflow-hidden ${overlayToneClass}`} style={{ zIndex }} onClick={onClose}>
      {mediaCloud.map((item, i) => (
        <img
          key={`${item.id}-${tick}`}
          src={item.src}
          alt="background chaos"
          className="pointer-events-none absolute rounded border-2 border-white/50 object-cover opacity-80"
          style={{
            left: `${item.left}%`,
            top: `${item.top}%`,
            width: `${item.size}px`,
            transform: `translate(-50%, -50%) rotate(${(tick * 8 + i * 25) % 360}deg)`,
            filter: `hue-rotate(${(tick * 25 + i * 40) % 360}deg) saturate(1.9)`,
          }}
        />
      ))}

      <div className="absolute left-1/2 top-1/2" style={mainStyle} onClick={(e) => e.stopPropagation()}>
        <button
          className="absolute -right-2 -top-2 z-10 rounded-full border border-black bg-yellow-300 px-2 py-1 text-xs font-black text-black"
          onClick={onClose}
          type="button"
        >
          X
        </button>
        <img key={`${activeMedia}-${tick}`} src={activeMedia} alt={altText} className={imageClassName} />
      </div>
    </div>
  );
}