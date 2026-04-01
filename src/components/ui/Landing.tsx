import { useState } from "react";

export default function Landing({ onApply }: { onApply: () => void }) {
  const [hasApplied, setHasApplied] = useState(false);

  const handleApply = () => {
    alert("Redirecting to our candidate portal... Please create a new account. Your previous 14 accounts cannot be found.");
    setHasApplied(true);
    
    onApply(); 
  };

  return (
    <div className="min-h-screen bg-[#f5f5f5] text-gray-800 font-sans">
      {/* Corporate Header */}
      <header className="bg-white border-b border-gray-300 shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 font-bold text-white flex items-center justify-center rounded-sm">
              SH
            </div>
            <span className="font-bold text-xl tracking-tight text-blue-900">SillyHacks Careers</span>
          </div>
          <div className="hidden md:flex gap-6 text-sm font-semibold text-gray-600">
            <a href="#" className="hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 pb-5 pt-5">View profile</a>
            <a href="#" className="hover:text-blue-600 border-b-2 border-transparent hover:border-blue-600 pb-5 pt-5">Language (Global) ▼</a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-gray-800 py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white/95 p-8 max-w-2xl rounded-sm shadow-lg border-t-4 border-blue-500">
            <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
              Senior Associate Junior Principal Staff Software AI Engineer Intern
            </h1>
            <p className="text-xl text-blue-700 font-medium mb-6">Information Technology</p>
            <button 
              onClick={handleApply}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-sm shadow transition-colors"
            >
              {hasApplied ? "Apply now » (Again)" : "Apply now »"}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-6xl mx-auto px-4 py-12 flex flex-col md:flex-row gap-10">
        
        {/* Left Column: Job Description */}
        <div className="md:w-2/3 bg-white p-8 border border-gray-200 shadow-sm rounded-sm">
          <div className="prose max-w-none text-gray-700 space-y-6">
            <h2 className="text-xl tracking-tight text-gray-900 font-bold border-b pb-2">We help the rizz run better</h2>
            <p>
              At our company, we keep it simple: you bring your best to us, and we'll immediately ask you to re-type everything on your resume into 47 separate tiny text boxes. We're builders touching over 20 industries and 80% of global brainrot, and we need your unique talents to help shape what's next. The work is challenging – mostly because of our legacy tech stack. You'll find a place where you can prioritize your mewing streak, and truly belong.
            </p>

            <h2 className="text-xl tracking-tight text-gray-900 font-bold border-b pb-2 mt-8">What you’ll build</h2>
            <p>
              The Internship Experience Program is our global, strategic, underpaid program that provides university students with opportunities to find purpose in their chaotic edge-sessions. 
            </p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>Engage in practical fanum tax calculations, testing, and design.</li>
              <li>Embrace lean and agile software development principles by participating in endless daily stand-ups that could have been an email.</li>
              <li>Collaborate with level 10 gyatts, product managers, and engineers to deliver mid-tier products.</li>
              <li>Learn from team members through knowledge-sharing sessions about optimal looksmaxxing.</li>
            </ul>

            <h2 className="text-xl tracking-tight text-gray-900 font-bold border-b pb-2 mt-8">What you bring</h2>
            <p>We’re looking for someone who takes initiative, perseveres, and stays curious. You like to work on meaningful innovative projects and are energized by absolute nonsense.</p>
            <ul className="list-disc pl-5 space-y-2 mt-4">
              <li>Currently registered at an accredited post-secondary institution in Ohio.</li>
              <li>15+ years of experience with a framework released in 2023.</li>
              <li>Possesses a positive self-motivated "sigma" attitude.</li>
              <li>Working knowledge of HTML, CSS, JavaScript, and ancient forbidden runes.</li>
              <li>Must commit to an 8-month internship starting exactly yesterday.</li>
            </ul>

            <h2 className="text-xl tracking-tight text-gray-900 font-bold border-b pb-2 mt-8">We win with inclusion</h2>
            <p className="text-sm text-gray-500">
              We believe the value of pay transparency contributes towards an honest culture. The targeted range for this position is 18.00 - 40.00 V-Bucks per hour. Due to the nature of the role, which involves global interactions with entities, as well as with employees and stakeholders, functional proficiency in Gen Alpha slang is required.
              <br/><br/>
              Requisition ID: 448551 | Expected Travel: 0 - 100% | Career Status: Unpaid | Additional Locations: The Backrooms
            </p>
          </div>
        </div>

        {/* Right Column: Metadata Sidebar */}
        <div className="md:w-1/3 space-y-6">
          <div className="bg-white p-6 border border-gray-200 shadow-sm rounded-sm">
            <button onClick={handleApply} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 mb-6 rounded-sm transition-colors">
              Apply now »
            </button>
            <a href="#" className="flex items-center text-blue-600 font-bold mb-8 hover:underline">
              <span className="mr-2">←</span> Back to search results
            </a>

            <div className="space-y-5 text-sm">
              <div>
                <p className="text-gray-500 font-semibold mb-1">Requisition ID</p>
                <p className="text-gray-900 font-bold">448551_BR</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold mb-1">Posted Date</p>
                <p className="text-gray-900 font-bold">Apr 1, 2026</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold mb-1">Work Area</p>
                <p className="text-gray-900 font-bold">Information Technology (Meme Div.)</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold mb-1">Career Status</p>
                <p className="text-gray-900 font-bold">Student / Wage Slave</p>
              </div>
              <div>
                <p className="text-gray-500 font-semibold mb-1">Employment Type</p>
                <p className="text-gray-900 font-bold">Limited Full Time</p>
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
