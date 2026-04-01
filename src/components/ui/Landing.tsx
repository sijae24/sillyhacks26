import { useState, useEffect, useRef } from "react";

export default function Landing({ onApply }: { onApply: () => void }) {
  // Start the button visually within the white box
  const [btnPos, setBtnPos] = useState({ x: -999, y: -999 }); // start off-screen to avoid flash
  const buttonRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null); 
  const anchorRef = useRef<HTMLDivElement>(null); // Add this new ref

  const handleApply = () => {
    alert("Redirecting to our candidate portal...");
    onApply(); 
  };

  useEffect(() => {
    // Dynamically calculate initial button spawn point based on the anchor
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
      
      // Calculate how close the mouse is to the nearest edge
      const closestX = Math.max(buttonRect.left, Math.min(e.clientX, buttonRect.right));
      const closestY = Math.max(buttonRect.top, Math.min(e.clientY, buttonRect.bottom));

      const distX = closestX - e.clientX;
      const distY = closestY - e.clientY;
      const distanceToEdge = Math.sqrt(distX * distX + distY * distY);

      const repulseRadius = 60; 

      if (distanceToEdge < repulseRadius) {
        // Multiply force to ensure it actually escapes the radius
        const force = (repulseRadius - distanceToEdge) * 1.5;
        
        let dirX = (buttonRect.left + btnObj.offsetWidth / 2) - e.clientX;
        let dirY = (buttonRect.top + btnObj.offsetHeight / 2) - e.clientY;
        const centerDist = Math.sqrt(dirX * dirX + dirY * dirY);
        
        if (centerDist > 0) {
          dirX /= centerDist;
          dirY /= centerDist;
        }

        setBtnPos((prev) => {
          let nextX = prev.x + dirX * force;
          let nextY = prev.y + dirY * force;

          // Now we clamp absolute positioning mathematically bounded to the container.
          // Padding of 10px ensures it doesn't touch the literal edge
          const maxX = containerRect.width - btnObj.offsetWidth - 10;
          const maxY = containerRect.height - btnObj.offsetHeight - 10;
          
          nextX = Math.max(10, Math.min(maxX, nextX));
          nextY = Math.max(10, Math.min(maxY, nextY));

          return { x: nextX, y: nextY };
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gray-800 font-sans">
      <header className="bg-white border-b border-gray-300 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 font-bold text-white flex items-center justify-center rounded-sm">SH</div>
            <span className="font-bold text-xl tracking-tight text-blue-900">SillyHacks Careers</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-semibold text-gray-600">
            <a href="#" className="hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 pb-5 pt-5">View profile</a>
            <a href="#" className="hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 pb-5 pt-5">Language (Global) ▼</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div 
        ref={containerRef} 
        className="bg-gradient-to-r from-blue-900 to-gray-800 py-16 px-4 overflow-hidden relative min-h-[300px] z-10"
      >
        <div className="max-w-6xl mx-auto relative h-full">
          {/* We keep p-8 for even padding all around */}
          <div className="bg-white/95 p-8 max-w-2xl rounded-sm shadow-lg border-t-4 border-blue-500">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
              Senior Associate Junior Principal Staff Software AI Engineer Intern
            </h1>
            <p className="text-xl text-blue-700 font-medium m-0">Information Technology</p>
            
            {/* The anchor reserves 52px of height (approximate button size) + margin,
                forcing the white box to stretch exactly enough to encompass the button's spawn point */}
            <div ref={anchorRef} className="h-[52px] mt-6 w-full"></div>
          </div>
        </div>

        {/* 
            THE FIX: The button is no longer trapped inside the white box.
            It's positioned absolute relative to the blue block so it can run 
            all the way to the edges without clipping underneath the page layout.
        */}
        <button 
          ref={buttonRef}
          onClick={handleApply}
          style={{
            left: `${btnPos.x}px`,
            top: `${btnPos.y}px`,
            position: "absolute",
            transition: "all 0.15s ease-out",
            zIndex: 50
          }}
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-sm shadow-lg"
        >
          Here
        </button>

      </div>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-10">
        
        {/* Left Column: Job Description */}
        <div className="md:w-2/3 bg-white p-8 border border-gray-200 shadow-sm rounded-sm z-20 relative">
          <div className="prose max-w-none text-gray-700 space-y-6">
            <h2 className="text-xl tracking-tight text-gray-900 font-bold border-b pb-2">Company Overview</h2>
            <p>
              Japan is turning footsteps into electricity! ⚡Using piezoelectric tiles, every step you take generates a small amount of energy. Millions of steps together can power LED lights and displays in busy places like Shibuya Station. A brilliant way to create a sustainable and smart city -- turning movement into clean, renewable energy 🌱💡
            </p>

            <h2 className="text-xl tracking-tight text-gray-900 font-bold border-b pb-2 mt-8">Your Core Responsibilities</h2>
            <p>
              As a Senior Associate Junior Principal Intern, you will architect legacy monolithic microservices that are guaranteed to break in production every Friday at 4:59 PM. 
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>Design and implement scalable centered <code>&lt;div&gt;</code> elements using only Assembly.</li>
              <li>Refactor perfectly good TypeScript code into unreadable JavaScript to ensure your own job security.</li>
              <li>Attend 14 stand-up meetings a day to give updates on tasks you haven't started yet.</li>
              <li>Optimize our "Apply Now" button to run away from candidates exponentially faster.</li>
            </ul>

            <h2 className="text-xl tracking-tight text-gray-900 font-bold border-b pb-2 mt-8">Minimum Qualifications</h2>
            <p>We’re looking for someone who thrives in chaos and views unhandled runtime exceptions as "surprise features." You possess strong, unsolicited opinions on tabs vs. spaces and are ready to aggressively defend them.</p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>At least 4 degrees from TikTok University and a certified PhD in Yapping.</li>
              <li>Ability to debug production issues by simply staring at the screen until it fixes itself.</li>
              <li>Required fluency in C++, Rust, Python, Java, Go, and Gen Alpha slang.</li>
              <li>Proven track record of answering "it works on my machine" during high-stakes client demos.</li>
              <li>Willingness to sacrifice your weekends for the "hustle" in exchange for a $5 pizza gift card.</li>
            </ul>

            <h2 className="text-xl tracking-tight text-gray-900 font-bold border-b pb-2 mt-8">Compensation & "Benefits"</h2>
            <p className="text-sm text-gray-500">
              We believe in rewarding our wage slaves—we mean, "family members"—with highly competitive perks. Enjoy our "Unlimited PTO" (which you will be heavily guilt-tripped for actually using), mandatory ping-pong tournaments, and organic tap water. Compensation is firmly based on how loudly you type on your mechanical keyboard during Zoom calls.
              <br/><br/>
              Salary Range: 18.00 - 40.00 V-Bucks per hour | Perks: Infinite Exposure | Equity: 0.000001% of a JPEG
            </p>
          </div>
        </div>

        {/* Right Column: Metadata Sidebar */}
        <div className="md:w-1/3 space-y-6 z-20 relative">
          <div className="bg-white p-6 border border-gray-200 shadow-sm rounded-sm">
            <button 
              onClick={() => {}} 
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 mb-6 rounded-sm transition-colors"
            >
              click Here to apply
            </button>
            <a href="#" className="flex items-center text-blue-600 font-bold mb-8 hover:underline">
              <span className="mr-2">←</span> Back to search results
            </a>

            <div className="space-y-5 text-sm">
              <div>
                <p className="text-gray-500 font-semibold mb-1">Requisition ID</p>
                <p className="text-gray-900 font-bold">666777_DN</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold mb-1">Posted Date</p>
                <p className="text-gray-900 font-bold">Apr 1, 2026</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold mb-1">Career Status</p>
                <p className="text-gray-900 font-bold">Student / Wage Slave</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold mb-1">Employment Type</p>
                <p className="text-gray-900 font-bold">Fullish Part Time</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold mb-1">Location</p>
                <p className="text-gray-900 font-bold">Ohio, US, 43081</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
