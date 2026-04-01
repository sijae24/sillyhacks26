import { useState } from "react";

export const BirthdayTormentor = () => {
  const [date, setDate] = useState(new Date(1990, 0, 1));
  // Keep track of the current valid range
  const [bounds, setBounds] = useState({ 
    min: new Date(1950, 0, 1).getTime(), 
    max: new Date().getTime() 
  });
  const [guesses, setGuesses] = useState(0);

  const getRandomDate = (min: number, max: number) => {
    return new Date(Math.random() * (max - min) + min);
  };

  const handleGuess = (isLater: boolean) => {
    const currentTime = date.getTime();
    
    if (isLater) {
      // User says "Later", so the new min is the current date
      setBounds(prev => ({ ...prev, min: currentTime }));
      setDate(getRandomDate(currentTime, bounds.max));
    } else {
      // User says "Earlier", so the new max is the current date
      setBounds(prev => ({ ...prev, max: currentTime }));
      setDate(getRandomDate(bounds.min, currentTime));
    }
    
    setGuesses(prev => prev + 1);
  };

  return (
    <div className="flex flex-col items-center p-6 border-2 border-red-500 rounded bg-white shadow-lg">
      <h3 className="font-bold mb-2">Find your birthday:</h3>
      <div className="text-2xl font-mono mb-4 text-red-600 font-bold">
        {date.toDateString().substring(4, 15)}
      </div>
      
      <div className="flex gap-4 mb-4">
        <button 
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition" 
          onClick={() => handleGuess(false)}
        >
          Earlier
        </button>
        <button 
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition" 
          onClick={() => handleGuess(true)}
        >
          Later
        </button>
      </div>
      
      <div className="text-sm text-gray-500">
        Guesses: {guesses}
      </div>
    </div>
  );
};