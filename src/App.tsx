import { useMemo, useState } from "react";
import BottomNavigation from "./components/layout/BottomNavigation";
import JobPostingHeader from "./components/layout/JobPostingHeader";
import WorkdayTopHeader from "./components/layout/WorkdayTopHeader";
import StepAppQuestions from "./components/steps/StepAppQuestions";
import StepMyExperience from "./components/steps/StepMyExperience";
import StepMyInformation from "./components/steps/StepMyInformation";
import StepReview from "./components/steps/StepReview";
import StepVoluntaryDisclosures from "./components/steps/StepVoluntaryDisclosures";
import ProgressSteps from "./components/ui/ProgressSteps";
import { defaultForm } from "./data/defaultForm";
import * as Tormentor from "./components/ui/tormentor";

export default function App() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(defaultForm);
  // Defaulting to a mid-range 9-digit number
  const [chaosValue, setChaosValue] = useState(500000000);

  const stepContent = useMemo(
    () => [
      null,
      <StepMyInformation form={form} setForm={setForm} />,
      <StepMyExperience form={form} setForm={setForm} />,
      // Step 3: Integrated Cursed Suite
      <div className="space-y-8">
        <h2 className="text-xl font-bold">Identity Verification</h2>
        
        {/* Chaotic Name Input */}
        <div className="space-y-2">
            <label className="block text-sm font-medium">Full Name (System Adjusted)</label>
            <Tormentor.chaoticinput />
        </div>

        {/* Country Selector */}
        <div className="space-y-2">
            <label className="block text-sm font-medium">Country of Origin</label>
            <Tormentor.ChaoticDropdown />
        </div>
        
        {/* Mobile Number Slider Suite */}
        <div className="p-4 border-2 border-dashed border-red-300 rounded-lg space-y-4">
            <label className="block text-sm font-bold text-red-600">Mobile Number (Slider Selection Only)</label>
            <Tormentor.ChaosNumberDisplay value={chaosValue} onChange={setChaosValue} />
            <Tormentor.CursedSlider value={chaosValue} onChange={setChaosValue} />
        </div>
      </div>,
      <StepVoluntaryDisclosures form={form} setForm={setForm} />,
      <StepReview form={form} />,
    ],
    [form, chaosValue],
  );

  return (
    <div className="min-h-screen bg-white font-sans">
      <WorkdayTopHeader />

      <main className="min-h-screen w-full bg-white pb-24">
        <JobPostingHeader />
        <ProgressSteps current={step} />

        <div className="px-8 pb-8">
            {/* We render StepAppQuestions separately if needed, 
                or you can move it into stepContent if you want it included */}
            {step === 3 ? stepContent[3] : stepContent[step]}
        </div>
      </main>

      <BottomNavigation
        step={step}
        onBack={() => setStep((s) => Math.max(1, s - 1))}
        onContinue={() => setStep((s) => Math.min(5, s + 1))}
      />
    </div>
  );
}