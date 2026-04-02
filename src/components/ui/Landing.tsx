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
      const repulseRadius = 80; 

      if (distanceToEdge < repulseRadius) {
        const force = (repulseRadius - distanceToEdge) * 2;
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
          return { 
            x: Math.max(10, Math.min(maxX, nextX)), 
            y: Math.max(10, Math.min(maxY, nextY)) 
          };
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

      <div ref={containerRef} className="bg-gradient-to-r from-blue-900 to-gray-800 py-16 px-4 overflow-hidden relative min-h-[350px] z-10">
        <div className="max-w-6xl mx-auto relative h-full">
          <div className="bg-white/95 p-8 max-w-2xl rounded-sm shadow-lg border-t-4 border-blue-500">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-2 leading-tight">
              Senior Associate Junior Principal Staff Software AI Engineer Intern
            </h1>
            <p className="text-xl text-blue-700 font-medium">Information Technology & Chaos Theory</p>
            {/* The anchor point where the button starts */}
            <div ref={anchorRef} className="h-[52px] mt-6 w-48"></div>
          </div>
        </div>
        
        <button 
          ref={buttonRef}
          onClick={handleApply}
          style={{ 
            left: `${btnPos.x}px`, 
            top: `${btnPos.y}px`, 
            position: "absolute", 
            transition: "all 0.1s ease-out", 
            zIndex: 50 
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-10 rounded-sm shadow-lg whitespace-nowrap"
        >
          Apply Now!
        </button>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-10">
        <div className="md:w-2/3 bg-white p-8 border border-gray-200 shadow-sm rounded-sm">
          <div className="prose max-w-none text-gray-700 space-y-8">
            
            <section>
              <h2 className="text-xl font-bold border-b pb-2 text-blue-900">Company Overview</h2>
              <p className="mt-4 italic">
                Japan is turning footsteps into electricity! ⚡ Using piezoelectric tiles, every step you take generates a small amount of energy. Millions of steps together can power LED lights and displays in busy places like Shibuya Station. A brilliant way to create a sustainable and smart city -- turning movement into clean, renewable energy 🌱💡
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold border-b pb-2 text-blue-900">Your Core Responsibilities</h2>
              <p className="mt-4">
                As a Senior Associate Junior Principal Intern, you will architect legacy monolithic microservices that are guaranteed to break in production every Friday at 4:59 PM.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>Design and implement scalable centered &lt;div&gt; elements using only Assembly.</li>
                <li>Refactor perfectly good TypeScript code into unreadable JavaScript to ensure your own job security.</li>
                <li>Attend 14 stand-up meetings a day to give updates on tasks you haven't started yet.</li>
                <li>Optimize our "Apply Now" button to run away from candidates exponentially faster.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold border-b pb-2 text-blue-900">Minimum Qualifications</h2>
              <p className="mt-4">
                We’re looking for someone who thrives in chaos and views unhandled runtime exceptions as "surprise features." You possess strong, unsolicited opinions on tabs vs. spaces and are ready to aggressively defend them.
              </p>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li>At least 4 degrees from TikTok University and a certified PhD in Yapping.</li>
                <li>Ability to debug production issues by simply staring at the screen until it fixes itself.</li>
                <li>Required fluency in C++, Rust, Python, Java, Go, and Gen Alpha slang.</li>
                <li>Proven track record of answering "it works on my machine" during high-stakes client demos.</li>
                <li>Willingness to sacrifice your weekends for the "hustle" in exchange for a $5 pizza gift card.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold border-b pb-2 text-blue-900">Compensation & "Benefits"</h2>
              <p className="mt-4">
                We believe in rewarding our wage slaves—we mean, "family members"—with highly competitive perks. Enjoy our "Unlimited PTO" (which you will be heavily guilt-tripped for actually using), mandatory ping-pong tournaments, and organic tap water.
              </p>
              <div className="mt-4 p-4 bg-gray-50 border border-dashed border-gray-300">
                <p><strong>Salary Range:</strong> 18.00 - 40.00 V-Bucks per hour</p>
                <p><strong>Perks:</strong> Infinite Exposure</p>
                <p><strong>Equity:</strong> 0.000001% of a JPEG</p>
              </div>
            </section>

          </div>
        </div>

        <aside className="md:w-1/3 space-y-6">
          <div className="bg-blue-50 p-6 border border-blue-200">
            <h3 className="font-bold text-blue-900 mb-2">Job Details</h3>
            <div className="text-sm space-y-2">
              <p><span className="text-gray-500">ID:</span> 404-BRAIN-NOT-FOUND</p>
              <p><span className="text-gray-500">Location:</span> Remote (Middle of the Ocean)</p>
              <p><span className="text-gray-500">Type:</span> 24/7/365 Permanent Intern</p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}