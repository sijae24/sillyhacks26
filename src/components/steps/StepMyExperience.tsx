import { MONTHS, YEARS } from "../../constants/options";
import type {
  Education,
  FormSetter,
  JobApplication,
  WorkExperience,
} from "../../types/jobApplication";
import { Input, Label, Select, Textarea } from "../shared/FormFields";
import { Divider, SectionTitle, StepHeading } from "../shared/SectionBits";

export default function StepMyExperience({
  form,
  setForm,
}: {
  form: JobApplication;
  setForm: FormSetter;
}) {
  const updateWE = (
    id: number,
    field: keyof WorkExperience,
    value: string | boolean,
  ) => {
    setForm((f) => ({
      ...f,
      workExperiences: f.workExperiences.map((work) =>
        work.id === id ? { ...work, [field]: value } : work,
      ),
    }));
  };

  const addWE = () => {
    setForm((f) => ({
      ...f,
      workExperiences: [
        ...f.workExperiences,
        {
          id: Date.now(),
          jobTitle: "",
          company: "",
          location: "",
          startMonth: "",
          startYear: "",
          endMonth: "",
          endYear: "",
          currentRole: false,
          description: "",
        },
      ],
    }));
  };

  const removeWE = (id: number) => {
    setForm((f) => ({
      ...f,
      workExperiences: f.workExperiences.filter((work) => work.id !== id),
    }));
  };

  const updateEd = (id: number, field: keyof Education, value: string) => {
    setForm((f) => ({
      ...f,
      educations: f.educations.map((education) =>
        education.id === id ? { ...education, [field]: value } : education,
      ),
    }));
  };

  const addEd = () => {
    setForm((f) => ({
      ...f,
      educations: [
        ...f.educations,
        {
          id: Date.now(),
          school: "",
          degree: "",
          fieldOfStudy: "",
          gpa: "",
          startYear: "",
          endYear: "",
        },
      ],
    }));
  };

  const removeEd = (id: number) => {
    setForm((f) => ({
      ...f,
      educations: f.educations.filter((education) => education.id !== id),
    }));
  };

  return (
    <div style={{ fontFamily: '"Comic Sans MS", "Comic Sans", cursive' }}>
      <StepHeading title="My Experience" />

      <SectionTitle>Work Experience</SectionTitle>
      {form.workExperiences.map((workExperience, index) => (
        <div key={workExperience.id} className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold text-gray-800">
              Work Experience {index + 1}
            </span>
            <button
              onClick={() => removeWE(workExperience.id)}
              className="text-sm text-gray-500 hover:text-red-600"
              type="button"
            >
              Delete
            </button>
          </div>
          <div className="mb-3">
            <Label text="Job Title" required />
            <Input
              value={workExperience.jobTitle}
              onChange={(e) =>
                updateWE(workExperience.id, "jobTitle", e.target.value)
              }
              placeholder="Customer Success Manager"
            />
          </div>
          <div className="mb-3">
            <Label text="Company" required />
            <Input
              value={workExperience.company}
              onChange={(e) => updateWE(workExperience.id, "company", e.target.value)}
              placeholder="Acme Corp"
            />
          </div>
          <div className="mb-3">
            <Label text="Location" />
            <Input
              value={workExperience.location}
              onChange={(e) => updateWE(workExperience.id, "location", e.target.value)}
              placeholder="San Francisco, CA"
            />
          </div>
          <div className="mb-3 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label text="Start Date" required />
              <div className="grid grid-cols-2 gap-2">
                <Select
                  value={workExperience.startMonth}
                  onChange={(e) => updateWE(workExperience.id, "startMonth", e.target.value)}
                >
                  <option value="">Month</option>
                  {MONTHS.map((month) => (
                    <option key={month}>{month}</option>
                  ))}
                </Select>
                <Select
                  value={workExperience.startYear}
                  onChange={(e) => updateWE(workExperience.id, "startYear", e.target.value)}
                >
                  <option value="">Year</option>
                  {YEARS.map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </Select>
              </div>
            </div>
            <div>
              <Label text="End Date" />
              <div className="grid grid-cols-2 gap-2">
                <Select
                  value={workExperience.endMonth}
                  onChange={(e) => updateWE(workExperience.id, "endMonth", e.target.value)}
                  disabled={workExperience.currentRole}
                >
                  <option value="">Month</option>
                  {MONTHS.map((month) => (
                    <option key={month}>{month}</option>
                  ))}
                </Select>
                <Select
                  value={workExperience.endYear}
                  onChange={(e) => updateWE(workExperience.id, "endYear", e.target.value)}
                  disabled={workExperience.currentRole}
                >
                  <option value="">Year</option>
                  {YEARS.map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <div className="mb-3 flex items-center gap-2">
            <input
              type="checkbox"
              id={`current-${workExperience.id}`}
              checked={workExperience.currentRole}
              onChange={(e) =>
                updateWE(workExperience.id, "currentRole", e.target.checked)
              }
              className="h-4 w-4 accent-blue-600"
            />
            <label
              htmlFor={`current-${workExperience.id}`}
              className="cursor-pointer text-sm text-gray-700"
            >
              I currently work here
            </label>
          </div>
          <div>
            <Label text="Description" />
            <Textarea
              value={workExperience.description}
              onChange={(e) => updateWE(workExperience.id, "description", e.target.value)}
              placeholder="Describe your responsibilities and key achievements..."
            />
          </div>
          {index < form.workExperiences.length - 1 && <Divider />}
        </div>
      ))}
      <button
        onClick={addWE}
        className="mb-2 block text-sm font-semibold text-blue-600 hover:underline"
        type="button"
      >
        + Add Work Experience
      </button>

      <Divider />

      <SectionTitle>Education</SectionTitle>
      {form.educations.map((education, index) => (
        <div key={education.id} className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-sm font-bold text-gray-800">Education {index + 1}</span>
            <button
              onClick={() => removeEd(education.id)}
              className="text-sm text-gray-500 hover:text-red-600"
              type="button"
            >
              Delete
            </button>
          </div>
          <div className="mb-3">
            <Label text="School / Institution" required />
            <Input
              value={education.school}
              onChange={(e) => updateEd(education.id, "school", e.target.value)}
              placeholder="University of California, Berkeley"
            />
          </div>
          <div className="mb-3 grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <Label text="Degree" required />
              <Select
                value={education.degree}
                onChange={(e) => updateEd(education.id, "degree", e.target.value)}
              >
                <option value="">Select Degree</option>
                <option>High School Diploma / GED</option>
                <option>Associate Degree</option>
                <option>Bachelor Degree</option>
                <option>Master Degree</option>
                <option>Doctorate (PhD)</option>
                <option>Professional Degree (JD, MD)</option>
                <option>Certificate / Diploma</option>
                <option>Other</option>
              </Select>
            </div>
            <div>
              <Label text="Field of Study" />
              <Input
                value={education.fieldOfStudy}
                onChange={(e) =>
                  updateEd(education.id, "fieldOfStudy", e.target.value)
                }
                placeholder="Computer Science"
              />
            </div>
          </div>
          <div className="mb-3 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <Label text="GPA" />
              <Input
                value={education.gpa}
                onChange={(e) => updateEd(education.id, "gpa", e.target.value)}
                placeholder="3.8"
              />
            </div>
            <div>
              <Label text="Start Year" />
              <Select
                value={education.startYear}
                onChange={(e) => updateEd(education.id, "startYear", e.target.value)}
              >
                <option value="">Year</option>
                {YEARS.map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </Select>
            </div>
            <div>
              <Label text="End Year (or Expected)" />
              <Select
                value={education.endYear}
                onChange={(e) => updateEd(education.id, "endYear", e.target.value)}
              >
                <option value="">Year</option>
                {YEARS.map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </Select>
            </div>
          </div>
          {index < form.educations.length - 1 && <Divider />}
        </div>
      ))}
      <button
        onClick={addEd}
        className="mb-2 block text-sm font-semibold text-blue-600 hover:underline"
        type="button"
      >
        + Add Education
      </button>

      <Divider />

      <SectionTitle>Skills</SectionTitle>
      <div className="mb-4">
        <Label text="Skills" required />
        <Input
          value={form.skills}
          onChange={(e) => setForm((f) => ({ ...f, skills: e.target.value }))}
          placeholder="e.g. Salesforce, SQL, Project Management, Python"
        />
      </div>

      <Divider />

      <SectionTitle>Websites and Social Links</SectionTitle>
      <div className="mb-4">
        <Label text="LinkedIn URL" />
        <Input
          type="url"
          value={form.linkedin}
          onChange={(e) => setForm((f) => ({ ...f, linkedin: e.target.value }))}
          placeholder="https://linkedin.com/in/yourname"
        />
      </div>
      <div className="mb-4">
        <Label text="Portfolio / Personal Website" />
        <Input
          type="url"
          value={form.website}
          onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
          placeholder="https://yourportfolio.com"
        />
      </div>

      <Divider />

      <SectionTitle>Resume / CV</SectionTitle>
      <div className="mb-4">
        <Label text="Upload Resume" required />
        <input
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={(e) =>
            setForm((f) => ({ ...f, resumeFile: e.target.files?.[0] ?? null }))
          }
          className="block w-full text-sm text-gray-600 file:mr-4 file:rounded file:border file:border-gray-300 file:bg-white file:px-4 file:py-2 file:text-sm file:text-gray-700 hover:file:bg-gray-50"
        />
        <p className="mt-1 text-xs text-gray-400">PDF, DOC, or DOCX - max 5MB</p>
      </div>
      <div className="mb-4">
        <Label text="Cover Letter" />
        <Textarea
          value={form.coverLetter}
          onChange={(e) => setForm((f) => ({ ...f, coverLetter: e.target.value }))}
          placeholder="Paste or write your cover letter here..."
        />
      </div>
    </div>
  );
}