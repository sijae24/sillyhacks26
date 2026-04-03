import { useState } from "react";
import ChaosMediaOverlay, { pickRandomMedia } from "../ui/ChaosMediaOverlay";
import * as Tormentor from "../../components/ui/tormentor";

const MEDIA = [
  new URL("../../assets/gifs/bruh.gif", import.meta.url).href,
  new URL("../../assets/gifs/cat_explode.gif", import.meta.url).href,
  new URL("../../assets/gifs/im_cooked.gif", import.meta.url).href,
  new URL("../../assets/gifs/please_please_please.gif", import.meta.url).href,
  new URL("../../assets/gifs/speed2.gif", import.meta.url).href,
  new URL("../../assets/gifs/woe_fakeout.gif", import.meta.url).href,
  new URL("../../assets/images/our_brains_are_shrinking.jpg", import.meta.url).href,
  new URL("../../assets/images/statement_so_bad.jpg", import.meta.url).href,
  new URL("../../assets/images/statement_so_good.jpeg", import.meta.url).href,
  new URL("../../assets/images/tiger.png", import.meta.url).href,
];

export default function WorkdayTopHeader({
  theme,
  setTheme,
}: {
  volume: number;
  setVolume: (v: number) => void;
  theme: string;
  setTheme: (t: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeMedia, setActiveMedia] = useState<string | null>(null);

  const popHelp = () => {
    setActiveMedia(pickRandomMedia(MEDIA));
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-3 shadow-sm">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 font-bold text-white flex items-center justify-center rounded-sm">
            SH
          </div>
          <span className="font-bold text-xl tracking-tight text-blue-900">SillyHacks Careers</span>
        </div>

        {/* Nav */}
        <nav className="flex items-center gap-6 text-sm font-semibold text-gray-600">
          {/* Help — triggers chaos overlay */}
          <button
            type="button"
            onClick={popHelp}
            className="cursor-pointer hover:text-orange-500"
          >
            Help
          </button>

          {/* Settings dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-1 cursor-pointer hover:text-blue-600 outline-none py-5"
            >
              Settings
            </button>

            {isOpen && (
              <div className="absolute right-0 mt-0 w-64 rounded-sm border border-gray-300 bg-white p-4 shadow-xl z-50 font-normal">
                {/* Theme */}
                <div className="mb-6">
                  <label className="block text-xs font-bold text-gray-700 mb-1">Theme</label>
                  <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full rounded-sm border border-gray-300 bg-white px-2 py-1 text-sm outline-none focus:border-blue-500"
                  >
                    <option value="light">Light</option>
                    <option value="dark">Dark</option>
                  </select>
                </div>

                {/* Volume tormentor */}
                <div className="border-t pt-4">
                  <label className="mb-2 block text-xs font-bold text-gray-700">
                    System Audio Integrity
                  </label>
                  <div className="p-2 border border-dashed border-gray-200 rounded">
                    <Tormentor.TormentorVolumeSlider />
                  </div>
                </div>
              </div>
            )}
          </div>

          <a href="#" className="hidden md:block hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 py-5">
            View profile
          </a>
          <a href="#" className="hidden md:block hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 py-5">
            Language (Global) ▼
          </a>
        </nav>
      </header>

      {/* Chaos media overlay */}
      <ChaosMediaOverlay
        activeMedia={activeMedia}
        mediaPool={MEDIA}
        onClose={() => setActiveMedia(null)}
        cloudCount={5}
        zIndex={100}
        overlayToneClass="bg-linear-to-br from-red-900/80 via-fuchsia-800/80 to-cyan-800/80"
        altText="help chaos"
        imageClassName="max-h-[65vh] max-w-[82vw] rounded border-4 border-lime-300 object-contain shadow-[0_0_35px_rgba(255,0,255,0.8)]"
      />
    </>
  );
}