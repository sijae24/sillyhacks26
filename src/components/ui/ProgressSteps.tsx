import { STEPS } from "../../constants/options";

export default function ProgressSteps({ current }: { current: number }) {
  return (
    <div className="flex items-start justify-start gap-0 overflow-x-auto px-4 py-6 md:justify-center">
      {STEPS.map((step, i) => (
        <div key={step} className="flex items-center">
          <div className="flex min-w-23 flex-col items-center">
            <div
              className={`relative z-10 flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-bold ${
                i < current
                  ? "border-blue-600 bg-blue-600 text-white"
                  : i === current
                    ? "border-blue-600 bg-white text-blue-600"
                    : "border-gray-300 bg-white text-gray-400"
              }`}
            >
              {i < current ? (
                "✓"
              ) : i === current ? (
                <span className="block h-2.5 w-2.5 rounded-full bg-blue-600" />
              ) : null}
            </div>
            <span
              className={`mt-1.5 text-center text-[10px] leading-tight ${
                i === current
                  ? "font-bold text-gray-900"
                  : i < current
                    ? "text-gray-500"
                    : "text-gray-400"
              }`}
            >
              {step}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`mb-5 mx-0 h-0.5 w-10 shrink-0 ${
                i < current ? "bg-blue-600" : "bg-gray-300"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}
