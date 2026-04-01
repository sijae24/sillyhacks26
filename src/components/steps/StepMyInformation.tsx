import type { ChangeEvent } from "react";
import { COUNTRIES, US_STATES } from "../../constants/options";
import type { FormSetter, JobApplication } from "../../types/jobApplication";
import { Input, Label, Select } from "../shared/FormFields";
import { Divider, SectionTitle, StepHeading } from "../shared/SectionBits";

export default function StepMyInformation({
  form,
  setForm,
}: {
  form: JobApplication;
  setForm: FormSetter;
}) {
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
          <Input value={form.firstName} onChange={set("firstName")} placeholder="Jane" />
        </div>
        <div>
          <Label text="Last Name" required />
          <Input value={form.lastName} onChange={set("lastName")} placeholder="Smith" />
        </div>
      </div>
      <div className="mb-4">
        <Label text="Email Address" required />
        <Input
          type="email"
          value={form.email}
          onChange={set("email")}
          placeholder="jane.smith@email.com"
        />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <Label text="Phone Number" required />
          <Input type="tel" value={form.phone} onChange={set("phone")} placeholder="(555) 000-1234" />
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

      <SectionTitle>Address</SectionTitle>
      <div className="mb-4">
        <Label text="Street Address" required />
        <Input value={form.address} onChange={set("address")} placeholder="123 Main Street" />
      </div>
      <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div>
          <Label text="City" required />
          <Input value={form.city} onChange={set("city")} placeholder="San Francisco" />
        </div>
        <div>
          <Label text="State / Province" />
          <Select value={form.state} onChange={set("state")}>
            <option value="">Select</option>
            {US_STATES.map((state) => (
              <option key={state}>{state}</option>
            ))}
          </Select>
        </div>
        <div>
          <Label text="ZIP / Postal Code" />
          <Input value={form.zip} onChange={set("zip")} placeholder="94105" />
        </div>
      </div>
      <div className="mb-4">
        <Label text="Country" required />
        <Select value={form.country} onChange={set("country")}>
          <option value="">Select Country</option>
          {COUNTRIES.map((country) => (
            <option key={country}>{country}</option>
          ))}
        </Select>
      </div>
    </div>
  );
}
