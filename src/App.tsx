import { useMemo, useState } from "react";
import Landing from "./components/ui/Landing";
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

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(defaultForm);

  const stepContent = useMemo(
    () => [
      null,
      <StepMyInformation form={form} setForm={setForm} />,
      <StepMyExperience form={form} setForm={setForm} />,
      <StepAppQuestions form={form} setForm={setForm} />,
      <StepVoluntaryDisclosures form={form} setForm={setForm} />,
      <StepReview form={form} />,
    ],
    [form],
  );

  if (showLanding) {
    return <Landing onApply={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <WorkdayTopHeader />

      <main className="min-h-screen w-full bg-white pb-24">
        <JobPostingHeader onBack={() => setShowLanding(true)} />
        <ProgressSteps current={step} />

        <div className="px-8 pb-8">{stepContent[step]}</div>
      </main>

      <BottomNavigation
        step={step}
        onBack={() => setStep((s) => Math.max(1, s - 1))}
        onContinue={() => setStep((s) => Math.min(5, s + 1))}
      />
    </div>
  );
}
