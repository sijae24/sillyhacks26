import type { JobApplication } from "../../types/jobApplication";
import { Divider, SectionTitle } from "../shared/SectionBits";

function Row({ label, value }: { label: string; value: string }) {
  if (!value) {
    return null;
  }

  return (
    <div className="flex gap-3 border-b border-gray-100 py-2 text-sm">
      <span className="w-40 shrink-0 text-gray-500">{label}</span>
      <span className="text-gray-900">{value}</span>
    </div>
  );
}

export default function StepReview({ form }: { form: JobApplication }) {
  return (
    <div>
      <h1 className="mb-6 text-center text-2xl font-bold text-gray-900">Review and Submit</h1>

      <div className="mb-6">
        <SectionTitle>Personal Information</SectionTitle>
        <Row label="Name" value={`${form.firstName} ${form.lastName}`.trim()} />
        <Row label="Email" value={form.email} />
        <Row label="Phone" value={`${form.phone} (${form.phoneType})`.trim()} />
        <Row
          label="Address"
          value={`${form.address}, ${form.city}, ${form.state} ${form.zip}`.trim()}
        />
        <Row label="Country" value={form.country} />
      </div>

      <Divider />

      <div className="mb-6">
        <SectionTitle>Work Experience</SectionTitle>
        {form.workExperiences.map((workExperience, index) => (
          <div key={workExperience.id} className="mb-3">
            <p className="mb-1 text-sm font-semibold text-gray-800">Position {index + 1}</p>
            <Row label="Job Title" value={workExperience.jobTitle} />
            <Row label="Company" value={workExperience.company} />
            <Row label="Location" value={workExperience.location} />
            <Row
              label="Dates"
              value={
                workExperience.currentRole
                  ? `${workExperience.startMonth} ${workExperience.startYear} - Present`
                  : `${workExperience.startMonth} ${workExperience.startYear} - ${workExperience.endMonth} ${workExperience.endYear}`
              }
            />
          </div>
        ))}
      </div>

      <Divider />

      <div className="mb-6">
        <SectionTitle>Education</SectionTitle>
        {form.educations.map((education, index) => (
          <div key={education.id} className="mb-3">
            <p className="mb-1 text-sm font-semibold text-gray-800">Education {index + 1}</p>
            <Row label="School" value={education.school} />
            <Row label="Degree" value={education.degree} />
            <Row label="Field of Study" value={education.fieldOfStudy} />
            <Row label="Years" value={`${education.startYear} - ${education.endYear}`} />
          </div>
        ))}
      </div>

      <Divider />

      <div className="mb-6">
        <SectionTitle>Application Questions</SectionTitle>
        <Row label="Authorized to Work" value={form.authorizedToWork} />
        <Row label="Requires Sponsorship" value={form.requireSponsorship} />
        <Row label="Veteran Status" value={form.veteranStatus} />
        <Row label="Heard About Role" value={form.howDidYouHear} />
      </div>

      <div className="mb-4 rounded border border-yellow-200 bg-yellow-50 p-4 text-sm text-yellow-800">
        Please review your application carefully before submitting. Once submitted, you will not be
        able to make changes.
      </div>
    </div>
  );
}
