import type { ChangeEvent } from "react";
import type { FormSetter, JobApplication } from "../../types/jobApplication";
import { Label, Select } from "../shared/FormFields";
import { Divider, SectionTitle, StepHeading } from "../shared/SectionBits";

export default function StepVoluntaryDisclosures({
  form,
  setForm,
}: {
  form: JobApplication;
  setForm: FormSetter;
}) {
  const set =
    (field: keyof JobApplication) =>
    (e: ChangeEvent<HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };

  return (
    <div>
      <StepHeading
        title="Voluntary Disclosures"
        subtitle={
          <>
            This information is voluntary and will not affect your application.
            <br />
            <span className="text-red-600">*</span> Indicates a required field
          </>
        }
      />

      <div className="mb-6 rounded border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
        Completion of this form is voluntary. The information will be kept confidential and used
        only for EEO/AA reporting purposes as required by law.
      </div>

      <SectionTitle>Equal Employment Opportunity</SectionTitle>

      <div className="mb-5">
        <Label text="Gender" />
        <Select value={form.gender} onChange={set("gender")}>
          <option value="">Select an option</option>
          <option>Male</option>
          <option>Female</option>
          <option>Non-binary / Third gender</option>
          <option>Prefer to self-describe</option>
          <option>Prefer not to say</option>
        </Select>
      </div>

      <div className="mb-5">
        <Label text="Ethnicity / Race" />
        <Select value={form.ethnicity} onChange={set("ethnicity")}>
          <option value="">Select an option</option>
          <option>Hispanic or Latino</option>
          <option>American Indian or Alaska Native</option>
          <option>Asian</option>
          <option>Black or African American</option>
          <option>Native Hawaiian or Other Pacific Islander</option>
          <option>White</option>
          <option>Two or more races</option>
          <option>Prefer not to say</option>
        </Select>
      </div>

      <Divider />

      <SectionTitle>Disability Status</SectionTitle>
      <div className="mb-4 rounded border border-gray-200 bg-gray-50 p-4 text-sm leading-relaxed text-gray-600">
        A person has a disability if they have a physical or mental impairment or medical condition
        that substantially limits a major life activity, has a history of such impairment, or is
        perceived by others as having such an impairment.
      </div>
      <div className="mb-5">
        <Label text="Disability Status" />
        <Select value={form.disabilityStatus} onChange={set("disabilityStatus")}>
          <option value="">Select an option</option>
          <option>Yes, I have a disability (or previously had one)</option>
          <option>No, I do not have a disability</option>
          <option>I do not wish to answer</option>
        </Select>
      </div>
    </div>
  );
}
