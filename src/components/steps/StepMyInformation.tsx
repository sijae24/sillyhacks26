import type { ChangeEvent } from "react";
import type { FormSetter, JobApplication } from "../../types/jobApplication";
import { Input, Label, Select } from "../shared/FormFields";
import { Divider, SectionTitle, StepHeading } from "../shared/SectionBits";

// Import your Tormentor suite and the Birthday component separately
import * as Tormentor from "../../components/ui/tormentor";
import { BirthdayTormentor } from "../../components/ui/BirthdayTormentor";
import { useState } from "react";

export default function StepMyInformation({
  form,
  setForm,
}: {
  form: JobApplication;
  setForm: FormSetter;
}) {
  const [chaosValue, setChaosValue] = useState(parseInt(form.phone) || 500000000);
  const [emailError, setEmailError] = useState("");

  const set =
    (field: keyof JobApplication) =>
    (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setForm((f) => ({ ...f, [field]: e.target.value }));
    };

  return (
    <div>
      <StepHeading title="My Information" />

      <SectionTitle>Personal Information</SectionTitle>
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label text="First Name" required />
          <Tormentor.chaoticinput />
        </div>
        <div>
          <Label text="Last Name" required />
          <Tormentor.chaoticinput />
        </div>
      </div>
      
      <div className="mb-4">
        <Label text="Email Address" required />
        <Input 
          type="email" 
          value={form.email} 
          onChange={(e) => {
            set("email")(e);
            if (e.target.value.length > 3) {
              setEmailError("This email is already registered to another user.");
            } else {
              setEmailError("");
            }
          }}
          onBlur={() => {
            if (form.email.length > 0) {
              setEmailError("Critical Error: This email address is already in use by 4,392 other accounts.");
            }
          }}
          placeholder="jane.smith@email.com" 
        />
        {emailError && (
          <p className="text-red-500 text-xs mt-1 italic">{emailError}</p>
        )}
      </div>

      <div className="mb-8">
        <SectionTitle>Birthday Verification</SectionTitle>
        <Label text="Please locate your birthdate using the system tool" required />
        <BirthdayTormentor />
      </div>
      
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label text="Phone Number" required />
          <Tormentor.CursedSlider 
            value={chaosValue} 
            onChange={(val) => {
                setChaosValue(val);
                setForm((f) => ({ ...f, phone: val.toString() }));
            }} 
          />
        </div>
        <div>
          <Label text="Phone Type" />
          <Select value={form.phoneType} onChange={set("phoneType")}>
            <option value="">Select</option>
            <option>Mobile</option>
            <option>Home</option>
            <option>Work</option>
          </Select>
        </div>
      </div>

      <Divider />

      <SectionTitle>Verification & Location</SectionTitle>
      <div className="mb-6">
        <Label text="Country" required />
        <Tormentor.ChaoticDropdown />
      </div>

      {/* HydraCaptcha Integration */}
      <div className="mb-8">
        <Label text="Security Check" required />
        <Tormentor.HydraCaptcha />
        <p className="text-gray-400 text-xs mt-2">
          Note: Biological headcount must not exceed 30 units.
        </p>
      </div>
    </div>
  );
}