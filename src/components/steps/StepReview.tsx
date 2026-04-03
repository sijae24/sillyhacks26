import type { JobApplication } from "../../types/jobApplication";

export default function StepReview({ form: _form }: { form: JobApplication }) {
  return (
    <div>
      <h1>Application status: closed.</h1>
      <br />
      <p>
        Attention applicant: we are no longer accepting applicants for this position at this time. 
        Please do not attempt to contact HR regarding this requisition.
      </p>
      <br />
      <p>
        Note: the experience information you provided in the previous step has been permanently discarded.
      </p>
    </div>
  );
}
