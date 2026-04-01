import type { ReactNode } from "react";

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className="mb-4 text-lg font-bold text-gray-900">{children}</h2>;
}

export function Divider() {
  return <hr className="my-6 border-gray-200" />;
}

export function StepHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: ReactNode;
}) {
  return (
    <>
      <h1 className="mb-1 text-center text-2xl font-bold text-gray-900">{title}</h1>
      {subtitle ? (
        <p className="mb-6 text-center text-sm text-gray-500">{subtitle}</p>
      ) : (
        <p className="mb-6 text-center text-sm text-gray-500">
          <span className="text-red-600">*</span> Indicates a required field
        </p>
      )}
    </>
  );
}
