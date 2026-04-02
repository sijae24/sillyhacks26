import { useState, useEffect, useRef } from "react";
import * as Tormentor from "../../components/ui/tormentor";

export default function Landing({ 
  onApply, 
  volume, 
  setVolume,
  theme,
  setTheme 
}: { 
  onApply: () => void;
  volume: number;
  setVolume: (v: number) => void;
  theme: string;
  setTheme: (t: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [btnPos, setBtnPos] = useState({ x: -999, y: -999 });
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); 
  const anchorRef = useRef<HTMLDivElement>(null); 

  const handleApply = () => {
    alert("Redirecting to our candidate portal... Please create a new account. Your previous 14 accounts cannot be found.");
    onApply(); 
  };

  useEffect(() => {
    if (anchorRef.current && containerRef.current) {
      const anchorRect = anchorRef.current.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      setBtnPos({
        x: anchorRect.left - containerRect.left,
        y: anchorRect.top - containerRect.top
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!buttonRef.current || !containerRef.current) return;
      const btnObj = buttonRef.current;
      const buttonRect = btnObj.getBoundingClientRect();
      const containerRect = containerRef.current.getBoundingClientRect();
      
      const closestX = Math.max(buttonRect.left, Math.min(e.clientX, buttonRect.right));
      const closestY = Math.max(buttonRect.top, Math.min(e.clientY, buttonRect.bottom));
      const distX = closestX - e.clientX;
      const distY = closestY - e.clientY;
      const distanceToEdge = Math.sqrt(distX * distX + distY * distY);
      const repulseRadius = 60; 

      if (distanceToEdge < repulseRadius) {
        const force = (repulseRadius - distanceToEdge) * 1.5;
        let dirX = (buttonRect.left + btnObj.offsetWidth / 2) - e.clientX;
        let dirY = (buttonRect.top + btnObj.offsetHeight / 2) - e.clientY;
        const centerDist = Math.sqrt(dirX * dirX + dirY * dirY);
        
        if (centerDist > 0) {
          dirX /= centerDist; dirY /= centerDist;
        }

        setBtnPos((prev) => {
          let nextX = prev.x + dirX * force;
          let nextY = prev.y + dirY * force;
          const maxX = containerRect.width - btnObj.offsetWidth - 10;
          const maxY = containerRect.height - btnObj.offsetHeight - 10;
          return { x: Math.max(10, Math.min(maxX, nextX)), y: Math.max(10, Math.min(maxY, nextY)) };
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }} className="min-h-screen bg-[#f5f5f5] text-gray-800">
      
      <header className="bg-white border-b border-gray-300 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 font-bold text-white flex items-center justify-center rounded-sm">SH</div>
            <span className="font-bold text-xl tracking-tight text-blue-900">SillyHacks Careers</span>
          </div>
          
          <div className="hidden md:flex gap-6 text-sm font-semibold text-gray-600 items-center">
            <div className="relative">
              <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer hover:text-blue-600 outline-none py-5">
                ⚙️ Settings
              </button>
              
              {isOpen && (
                <div className="absolute right-0 mt-0 w-64 rounded-sm border border-gray-300 bg-white p-4 shadow-xl z-50">
                  <div className="mb-4">
                    <label className="block text-xs font-bold text-gray-700 mb-1">Theme</label>
                    <select value={theme} onChange={(e) => setTheme(e.target.value)} className="w-full border border-gray-300 p-1">
                      <option value="light">Light</option>
                      <option value="dark">Dark</option>
                    </select>
                  </div>
                  
                  {/* System Audio Config Tormentor */}
                  <div className="border-t pt-4">
                    <label className="mb-2 block text-xs font-bold text-gray-700">
                      System Audio Integrity
                    </label>
                    <div className="p-2 border border-dashed border-gray-200 rounded">
                      <Tormentor.TormentorVolumeSlider volume={volume} setVolume={setVolume} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div ref={containerRef} className="bg-gradient-to-r from-blue-900 to-gray-800 py-16 px-4 overflow-hidden relative min-h-[300px] z-10">
        <div className="max-w-6xl mx-auto relative h-full">
          <div className="bg-white/95 p-8 max-w-2xl rounded-sm shadow-lg border-t-4 border-blue-500">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Senior Associate Junior Principal Staff Software AI Engineer Intern</h1>
            <p className="text-xl text-blue-700 font-medium">Information Technology</p>
            <div ref={anchorRef} className="h-[52px] mt-6 w-full"></div>
          </div>
        </div>
        <button 
          ref={buttonRef}
          onClick={handleApply}
          style={{ left: `${btnPos.x}px`, top: `${btnPos.y}px`, position: "absolute", transition: "all 0.15s ease-out", zIndex: 50 }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-sm shadow-lg"
        >
          Here
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-10">
        <div className="md:w-2/3 bg-white p-8 border border-gray-200 shadow-sm rounded-sm">
          <div className="prose max-w-none text-gray-700 space-y-6">
            <h2 className="text-xl font-bold border-b pb-2">Company Overview</h2>
            <p>Japan is turning footsteps into electricity! ⚡ Every step powers the city.</p>
            <h2 className="text-xl font-bold border-b pb-2">Responsibilities</h2>
            <ul className="list-disc pl-5">
              <li>Design centered divs in Assembly.</li>
              <li>Break production every Friday.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}