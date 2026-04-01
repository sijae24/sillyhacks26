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
interface CursedSliderProps {
  value: number;
  onChange: (value: number) => void;
}

export const CursedSlider: React.FC<CursedSliderProps> = ({ value, onChange }) => {
  return (
    <input 
      type="range" 
      min="0" 
      max="999999999" 
      step="100000" 
      value={value}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(Number(e.target.value))}
      style={{ width: '100%', cursor: 'grab' }}
    />
  );
};

// 3. Chaotic Dropdown Component
export const ChaoticDropdown: React.FC = () => {
  const [options, setOptions] = useState<string[]>(countries);

  const shuffleOptions = (): void => {
    const shuffled = [...countries].sort(() => Math.random() - 0.5);
    setOptions(shuffled);
  };

  return (
    <select 
      onFocus={shuffleOptions}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => console.log("Selected:", e.target.value)}
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
        <option key={index} value={country}>
          {country}
        </option>
      ))}
    </select>
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


