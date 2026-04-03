import React, { useState, useCallback, type ChangeEvent } from 'react';

const countries: string[] = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", "Australia", "Austria",
  "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia",
  "Cameroon", "Canada", "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica",
  "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt",
  "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana",
  "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel",
  "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan", "Laos",
  "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi",
  "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova",
  "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau",
  "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
  "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal",
  "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
  "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan", "Tajikistan",
  "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela",
  "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

// 1. Hook for Submission Logic
export const useSubmissionLogic = (sliderValue: number) => {
  const [isEscaping, setIsEscaping] = useState<boolean>(false);

  const attemptSubmit = useCallback((): boolean => {
    if (sliderValue !== 500000000) {
      setIsEscaping(true);
      return false;
    }
    return true;
  }, [sliderValue]);

  return { isEscaping, attemptSubmit, setIsEscaping };
};

// 2. Cursed Slider Component
export const CursedSlider = ({ value, onChange }: { value: number; onChange: (val: number) => void }) => {
  return (
    <div className="flex flex-col gap-4 p-4 border border-gray-300 rounded-lg bg-gray-50">
      <div className="text-3xl font-mono text-center tracking-widest text-blue-900 font-bold">
        {value.toString().padStart(9, '0')}
      </div>
      <input 
        type="range" 
        min="100000000" 
        max="999999999" 
        step="1" 
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-2 bg-blue-300 rounded-lg appearance-none cursor-pointer"
      />
      <div className="flex justify-between text-xs text-gray-500">
        <span>100,000,000</span>
        <span>999,999,999</span>
      </div>
    </div>
  );
};

// 3. Chaotic Dropdown Component
export const ChaoticDropdown: React.FC = () => {
  const [options, setOptions] = useState<string[]>(countries);

  const shuffleOptions = (): void => {
    // Fisher-Yates shuffle is more "chaotic" and performant than sort-random
    const shuffled = [...countries];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setOptions(shuffled);
  };

  return (
    <select 
      // Trigger on focus (keyboard nav) AND click (mouse nav)
      onFocus={shuffleOptions}
      onClick={shuffleOptions}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => 
        console.log("Selected:", e.target.value)
      }
      style={{
        padding: '10px',
        fontSize: '16px',
        border: '2px solid red',
        cursor: 'pointer',
        width: '300px'
      }}
    >
      <option value="">Select a country...</option>
      {options.map((country: string, index: number) => (
        <option key={`${country}-${index}`} value={country}>
          {country}
        </option>
      ))}
    </select>
  );
};
export const ChaosNumberDisplay = ({ value, onChange }: { value: number; onChange: (val: number) => void }) => {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">mobile Number:</label>
      <input
        type="number" 
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="border-2 border-red-500 p-2 rounded text-lg font-mono"
      />
      <small className="text-gray-500 italic">
        {value === 500000000 ? "✓ Validation Passed" : "⚠ System Instability Detected"}
      </small>
    </div>
  );
};

export const chaoticinput : React.FC = () => {
  const [value,setvalue] = useState<string>("");
  const handleChaosInput = (e: ChangeEvent<HTMLInputElement>)=>{
    const input = e.target.value;
    const char = input.slice(-1);

    if(Math.random()>0.5){
      setvalue(input.split('').reverse().join('')); //reversing the input
    }
    else {
      const rest = input.slice(0,-1).split('').sort(() => Math.random() - 0.5).join('');
      setvalue(rest+char);
    }
  };
  return(
    <div style = {{display:'flex', flexDirection: 'column', gap: '10px'}}>
      <label>Enter your name u goose: </label>
      <input
        type="text"
        value={value}
        onChange={handleChaosInput}
        style={{
          padding: '12px',
          fontSize: '18px',
          border: '3px solid #ff00ff',
          fontFamily: 'monospace'
        }}
      />
    </div>
  )
  
}

export const HydraCaptcha: React.FC = () => {
  const [heads, setHeads] = useState<number[]>([1]); //starting with 1 checkbox

  const handleCheck = () => {
    const newHeads = [
      Date.now(),
      Date.now() + 1,
      Date.now() + 2
    ];
    setHeads((prev) => [...prev, ...newHeads]);
  };

  return (
    <div style={{ 
      border: '2px solid #333', 
      padding: '20px', 
      maxWidth: '400px',
      background: '#f9f9f9',
      marginTop: '20px'
    }}>
      <h3 style={{ margin: '0 0 10px 0' }}>Verify you are a human:</h3>
      
      {heads.map((id) => (
        <div key={id} style={{ marginBottom: '5px' }}>
          <input 
            type="checkbox" 
            onChange={handleCheck} 
            disabled={heads.length > 30} // Limit to prevent browser crash
          />
          <label> I am not a robot</label>
        </div>
      ))}

      {heads.length > 30 && (
        <p style={{ color: 'red', fontWeight: 'bold' }}>
          Error: Too many biological entities detected.
        </p>
      )}
    </div>
  );
};


export const GaslightingEmailInput: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    
    // As soon as they type, we tell them it's taken.
    // We wait a tiny bit to make it feel like an 'API check'
    if (value.length > 3) {
      setError("This email is already registered to another user.");
    } else {
      setError("");
    }
  };

  const handleBlur = () => {
    if (email.length > 0) {
      setError("Critical Error: This email address is already in use by 4,392 other accounts.");
    }
  };

  return (
    <div style={{ marginTop: '20px', padding: '20px', border: '2px dashed orange' }}>
      <label style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
        Email Address:
      </label>
      <input
        type="email"
        value={email}
        onChange={handleEmailChange}
        onBlur={handleBlur}
        placeholder="Enter your email..."
        style={{
          padding: '10px',
          width: '100%',
          border: error ? '2px solid red' : '1px solid #ccc',
          borderRadius: '4px'
        }}
      />
      {error && (
        <p style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>
          {error}
        </p>
      )}
      <button 
        onClick={() => alert("Registration failed. Please try a different identity.")}
        style={{ marginTop: '10px', cursor: 'pointer' }}
      >
        Sign Up
      </button>
    </div>
  );
};
export const TormentorVolumeSlider: React.FC<{
  volume?: number;
  setVolume?: (v: number) => void;
}> = ({ volume = 50, setVolume }) => {
  // Use local state if setVolume isn't passed, otherwise use passed props
  const [localVol, setLocalVol] = useState(volume);
  const val = setVolume ? volume : localVol;
  
  const tiltAngle = (val - 50) * 0.3;

  return (
    <div className="w-full">
      <div style={{ 
        transform: `rotate(${tiltAngle}deg)`,
        transition: 'transform 0.1s linear',
      }}>
        <input
          type="range"
          min="0"
          max="100"
          value={val}
          onChange={(e) => setVolume ? setVolume(Number(e.target.value)) : setLocalVol(Number(e.target.value))}
          className="w-full cursor-pointer"
        />
      </div>
    </div>
  );
};