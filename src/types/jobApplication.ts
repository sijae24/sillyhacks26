export interface WorkExperience {
  id: number;
  jobTitle: string;
  company: string;
  location: string;
  startMonth: string;
  startYear: string;
  endMonth: string;
  endYear: string;
  currentRole: boolean;
  description: string;
}

export interface Education {
  id: number;
  school: string;
  degree: string;
  fieldOfStudy: string;
  gpa: string;
  startYear: string;
  endYear: string;
}

export interface JobApplication {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  phoneType: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  workExperiences: WorkExperience[];
  educations: Education[];
  skills: string;
  linkedin: string;
  website: string;
  resumeFile: File | null;
  coverLetter: string;
  authorizedToWork: string;
  requireSponsorship: string;
  veteranStatus: string;
  howDidYouHear: string;
  additionalInfo: string;
  gender: string;
  ethnicity: string;
  disabilityStatus: string;
}

export type FormSetter = React.Dispatch<React.SetStateAction<JobApplication>>;
