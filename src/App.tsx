import { useEffect, useMemo, useState } from "react";
import Landing from "./components/ui/Landing";
import BottomNavigation from "./components/layout/BottomNavigation";
import JobPostingHeader from "./components/layout/JobPostingHeader";
import WorkdayTopHeader from "./components/layout/WorkdayTopHeader";
import StepAppQuestions from "./components/steps/StepAppQuestions";
import StepMyExperience from "./components/steps/StepMyExperience";
import StepMyInformation from "./components/steps/StepMyInformation";
import StepReview from "./components/steps/StepReview";
import StepVoluntaryDisclosures from "./components/steps/StepVoluntaryDisclosures";
import ChaosMediaOverlay, { pickRandomMedia } from "./components/ui/ChaosMediaOverlay";
import ProgressSteps from "./components/ui/ProgressSteps";
import { defaultForm } from "./data/defaultForm";
import { useBrainrotSoundboard } from "./hooks/useBrainrotSoundboard";

const CHAOS_MEDIA = [
  new URL("./assets/gifs/an-iq-too-high.gif", import.meta.url).href,
  new URL("./assets/gifs/cat_tongue.gif", import.meta.url).href,
  new URL("./assets/gifs/crashout.gif", import.meta.url).href,
  new URL("./assets/gifs/hmm_cat.gif", import.meta.url).href,
  new URL("./assets/gifs/jester.gif", import.meta.url).href,
  new URL("./assets/gifs/nailong_dance.gif", import.meta.url).href,
  new URL("./assets/gifs/skeleton_banging_shield.gif", import.meta.url).href,
  new URL("./assets/gifs/sob.gif", import.meta.url).href,
  new URL("./assets/gifs/waterboard.gif", import.meta.url).href,
  new URL("./assets/images/our_brains_are_shrinking.jpg", import.meta.url).href,
  new URL("./assets/images/statement_so_bad.jpg", import.meta.url).href,
  new URL("./assets/images/statement_so_good.jpeg", import.meta.url).href,
  new URL("./assets/images/tiger.png", import.meta.url).href,
];

export default function App() {
  const [volume, setVolume] = useState(50); // 50% by default
  const [theme, setTheme] = useState("light");

  useBrainrotSoundboard(volume);

  const [showLanding, setShowLanding] = useState(true);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState(defaultForm);
  const [activeBurst, setActiveBurst] = useState<string | null>(null);

  const triggerBurst = useMemo(
    () => () => {
      setActiveBurst(pickRandomMedia(CHAOS_MEDIA));
    },
    [],
  );

  useEffect(() => {
    if (showLanding) return;

    const onFocusOut = (event: FocusEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const tag = target.tagName;
      if (tag !== "INPUT" && tag !== "TEXTAREA" && tag !== "SELECT") return;

      if (Math.random() < 0.65) {
        triggerBurst();
      }
    };

    document.addEventListener("focusout", onFocusOut, true);
    return () => document.removeEventListener("focusout", onFocusOut, true);
  }, [showLanding, triggerBurst]);

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
    return (
      <Landing
        onApply={() => setShowLanding(false)}
        volume={volume}
        setVolume={setVolume}
        theme={theme}
        setTheme={setTheme}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      <WorkdayTopHeader
        volume={volume}
        setVolume={setVolume}
        theme={theme}
        setTheme={setTheme}
      />

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

      <ChaosMediaOverlay
        activeMedia={activeBurst}
        mediaPool={CHAOS_MEDIA}
        onClose={() => setActiveBurst(null)}
        cloudCount={7}
        zIndex={120}
        overlayToneClass="bg-linear-to-br from-purple-900/70 via-red-900/70 to-cyan-900/70"
        altText="chaos pop"
        imageClassName="max-h-[62vh] max-w-[84vw] rounded border-4 border-lime-300 object-contain shadow-[0_0_35px_rgba(255,0,255,0.8)]"
      />
    </div>
  );
}