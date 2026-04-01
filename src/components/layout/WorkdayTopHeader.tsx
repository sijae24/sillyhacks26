import { useState } from "react";
import * as Tormentor from "../../components/ui/tormentor";

export default function WorkdayTopHeader({ 
  volume, 
  setVolume,
  theme,
  setTheme
}: { 
  volume: number; 
  setVolume: (v: number) => void; 
  theme: string;
  setTheme: (t: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-300 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-blue-600 font-bold text-white flex items-center justify-center rounded-sm">SH</div>
          <span className="font-bold text-xl tracking-tight text-blue-900">SillyHacks Careers</span>
        </div>
        
        <nav className="flex items-center gap-6 text-sm font-semibold text-gray-600">
          <div className="relative">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="flex items-center gap-1 cursor-pointer hover:text-blue-600 outline-none py-5"
            >
              ⚙️ Settings
            </button>
            
            {isOpen && (
              <div className="absolute right-0 mt-0 w-64 rounded-sm border border-gray-300 bg-white p-4 shadow-xl z-50 font-normal">
                
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
                
                {/* Replaced old selector with the Tilting Volume Tormentor */}
                <div className="border-t pt-4">
                  <label className="mb-2 block text-xs font-bold text-gray-700">
                    System Audio Integrity
                  </label>
                  <div className="p-2 border border-dashed border-gray-200 rounded">
                    {/* We pass the external volume state into the Tormentor */}
                    <Tormentor.TormentorVolumeSlider />
                  </div>
                </div>

              </div>
            )}
          </div>

          <a href="#" className="hidden md:block hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 py-5">View profile</a>
          <a href="#" className="hidden md:block hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 py-5">Language (Global) ▼</a>
        </nav>
      </div>
    </header>
  );
}