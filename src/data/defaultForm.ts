import type { Education, JobApplication, WorkExperience } from "../types/jobApplication";

const defaultWE: WorkExperience = {
  id: 1,
  jobTitle: "",
  company: "",
  location: "",
  startMonth: "",
  startYear: "",
  endMonth: "",
  endYear: "",
  currentRole: false,
  description: "",
};

const defaultEd: Education = {
  id: 1,
  school: "",
  degree: "",
  fieldOfStudy: "",
  gpa: "",
  startYear: "",
  endYear: "",
};

export const defaultForm: JobApplication = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  phoneType: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  workExperiences: [defaultWE],
  educations: [defaultEd],
  skills: "",
  linkedin: "",
  website: "",
  resumeFile: null,
  coverLetter: "",
  authorizedToWork: "",
  requireSponsorship: "",
  veteranStatus: "",
  howDidYouHear: "",
  additionalInfo: "",
  gender: "",
  ethnicity: "",
  disabilityStatus: "",
};
