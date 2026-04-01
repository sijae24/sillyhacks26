export default function BottomNavigation({
  step,
  onBack,
  onContinue,
}: {
  step: number;
  onBack: () => void;
  onContinue: () => void;
}) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center gap-3 border-t border-gray-200 bg-white py-4">
      {step > 1 && (
        <button
          onClick={onBack}
          className="rounded-full border border-gray-300 px-7 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          type="button"
        >
          Back
        </button>
      )}
      {step < 5 ? (
        <button
          onClick={onContinue}
          className="rounded-full bg-blue-600 px-7 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          type="button"
        >
          Save and Continue
        </button>
      ) : (
        <button
          className="rounded-full bg-blue-600 px-7 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          type="button"
        >
          Submit Application
        </button>
      )}
    </div>
  );
}
