import type { ChangeEvent } from "react";
import type { FormSetter, JobApplication } from "../../types/jobApplication";
import { Label, Select, Textarea } from "../shared/FormFields";
import { Divider, SectionTitle, StepHeading } from "../shared/SectionBits";

type RadioField = "authorizedToWork" | "requireSponsorship";

type FieldChangeEvent = ChangeEvent<
  HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
>;

export default function StepAppQuestions({
  form,
  setForm,
}: {
  form: JobApplication;
  setForm: FormSetter;
}) {
  const set =
    (field: keyof JobApplication) =>
    (e: FieldChangeEvent) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };

  const RadioGroup = ({
    label,
    field,
    options,
    required,
  }: {
    label: string;
    field: RadioField;
    options: string[];
    required?: boolean;
  }) => (
    <div className="mb-5">
      <Label text={label} required={required} />
      <div className="mt-1 flex gap-6">
        {options.map((option) => (
          <label key={option} className="flex cursor-pointer items-center gap-2 text-sm text-gray-700 hover:text-blue-600 transition-colors">
            <input
              type="radio"
              name={field}
              value={option}
              checked={form[field] === option}
              onChange={set(field)}
              className="h-4 w-4 accent-blue-600 cursor-not-allowed" // Added cursor hint of chaos
              style={{ transform: Math.random() > 0.8 ? 'rotate(180deg)' : 'none' }}
            />
            {option}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}>
      <StepHeading title="Application Questions" />

      <SectionTitle>Work Authorization</SectionTitle>
      <RadioGroup
        label="Are you legally authorized to work in the United States?"
        field="authorizedToWork"
        options={["Yes", "No"]}
        required
      />
      <RadioGroup
        label="Will you now or in the future require sponsorship for employment visa status?"
        field="requireSponsorship"
        options={["Yes", "No"]}
        required
      />

      <Divider />

      <SectionTitle>Background</SectionTitle>
      <div className="mb-5">
        <Label text="Veteran Status" />
        <Select value={form.veteranStatus} onChange={set("veteranStatus")}>
          <option value="">Select an option</option>
          <option>I am not a protected veteran</option>
          <option>I identify as one or more classifications of a protected veteran</option>
          <option>I do not wish to answer</option>
        </Select>
      </div>
      <div className="mb-5">
        <Label text="How did you hear about this position?" />
        <Select value={form.howDidYouHear} onChange={set("howDidYouHear")}>
          <option value="">Select an option</option>
          <option>LinkedIn</option>
          <option>Indeed</option>
          <option>Company Website</option>
          <option>Employee Referral</option>
          <option>Job Fair</option>
          <option>Glassdoor</option>
          <option>Other</option>
        </Select>
      </div>

      <Divider />

      <SectionTitle>Additional Information</SectionTitle>
      <div className="mb-4">
        <Label text="Is there anything else you would like us to know?" />
        <Textarea
          value={form.additionalInfo}
          onChange={set("additionalInfo")}
          placeholder="Any additional context, accommodations needed, or details you would like to share..."
          style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}
        />
      </div>
    </div>
  );
}