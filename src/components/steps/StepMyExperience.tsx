import { useState, useEffect } from 'react'
import { MONTHS, YEARS } from '../../constants/options'
import type {
  Education,
  FormSetter,
  JobApplication,
  WorkExperience,
} from '../../types/jobApplication'
import { Input, Label, Select, Textarea } from '../shared/FormFields'
import { Divider, SectionTitle, StepHeading } from '../shared/SectionBits'

export default function StepMyExperience({
  form,
  setForm,
}: {
  form: JobApplication
  setForm: FormSetter
}) {
  const [deleteOffsets, setDeleteOffsets] = useState<Record<number, { x: number; y: number }>>({})
  const [monthOptions, setMonthOptions] = useState<string[]>([...MONTHS])
  const [skillsPlaceholder, setSkillsPlaceholder] = useState(
    'e.g. Salesforce, SQL, Project Management, Python'
  )
  const [extraGapIds, setExtraGapIds] = useState<number[]>([])
  const [badTitleIds, setBadTitleIds] = useState<Record<number, boolean>>({})
  const [swappedLabels, setSwappedLabels] = useState(false)
  const [descLimitIds, setDescLimitIds] = useState<Record<number, boolean>>({})
  const [badSchoolIds, setBadSchoolIds] = useState<Record<number, boolean>>({})
  const [resumeLoading, setResumeLoading] = useState(false)
  const [linkedinInvalid, setLinkedinInvalid] = useState(false)

  const makeDeleteRun = (id: number) => {
    setDeleteOffsets((prev) => ({
      ...prev,
      [id]: {
        x: Math.random() * 70 - 35,
        y: Math.random() * 20 - 10,
      },
    }))
  }

  const reshuffleMonths = () => {
    setMonthOptions((prev) => [...prev].sort(() => Math.random() - 0.5))
  }

  function scrambleString(s: string) {
    if (!s) return s
    // small scramble that keeps words but jumbles letters
    return s
      .split(' ')
      .map((w) => (w.length > 2 ? w.split('').sort(() => Math.random() - 0.5).join('') : w))
      .join(' ')
  }

  useEffect(() => {
    const handler = () => setSwappedLabels((v) => !v)
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  const updateWE = (
    id: number,
    field: keyof WorkExperience,
    value: string | boolean
  ) => {
    setForm((f) => ({
      ...f,
      workExperiences: f.workExperiences.map((work) => {
        if (work.id !== id) return work

        const next: WorkExperience = { ...work, [field]: value } as WorkExperience

        if (field === 'jobTitle' && typeof value === 'string') {
          const lower = value.toLowerCase()
          if (lower.includes('engineer')) next.jobTitle = 'Software Wizard'
          if (lower.includes('manager')) next.jobTitle = 'Chief Vibes Officer'

          // degrade the job title UI: occasionally scramble the title and mark this entry as "bad UI"
          if (Math.random() > 0.4) {
            next.jobTitle = scrambleString(value) || value
            setBadTitleIds((prev) => ({ ...prev, [id]: true }))
          } else {
            setBadTitleIds((prev) => ({ ...prev, [id]: false }))
          }
        }

        if (field === 'company' && typeof value === 'string' && value.length > 2) {
          const weirdLocations = [
            'San Francisco, CA',
            'Remote-ish',
            'Unknown',
            'Somewhere Important',
            'Behind the coffee machine',
          ]
          next.location = weirdLocations[Math.floor(Math.random() * weirdLocations.length)]

          // sometimes make the company field extra silly: append emoji or swap with job title
          if (Math.random() > 0.5) {
            next.company = `${value} ™`
          }
          if (Math.random() > 0.7) {
            // swap company and jobTitle
            const oldTitle = next.jobTitle
            next.jobTitle = value
            next.company = oldTitle || `${value} LLC`
          }
        }

        if (field === 'location' && typeof value === 'string') {
          const corrections = [
            'San Francisco, CA',
            'Remote-ish',
            'Unknown',
            'Somewhere Important',
            'Behind the coffee machine',
          ]
          // auto-correct user input to something different
          next.location = corrections[Math.floor(Math.random() * corrections.length)]
        }

        if (field === 'description' && typeof value === 'string') {
          // enforce tiny 5-letter max and show limit reached
          if (value.length > 5) {
            next.description = value.slice(0, 5)
            setDescLimitIds((p) => ({ ...p, [id]: true }))
          } else {
            next.description = value
            setDescLimitIds((p) => ({ ...p, [id]: false }))
          }
        }

        if ((field === 'startMonth' || field === 'startYear') && typeof value === 'string') {
          // enforce end date to always be before start and lock it (user cannot change end)
          // determine start values
          let sMonth = field === 'startMonth' ? value : (next.startMonth || work.startMonth || '')
          let sYear = field === 'startYear' ? value : (next.startYear || work.startYear || '')

          // find numeric year
          const syNum = parseInt(sYear) || new Date().getFullYear()

          // pick an end year strictly before start year
          const endYear = String(syNum - (Math.floor(Math.random() * 3) + 1))

          // pick an end month that is before start month if possible
          let endMonth = ''
          if (sMonth) {
            const idx = monthOptions.findIndex((m) => m === sMonth)
            if (idx > 0) endMonth = monthOptions[Math.max(0, idx - 1)]
            else endMonth = monthOptions[monthOptions.length - 1]
          } else {
            endMonth = monthOptions[Math.floor(Math.random() * monthOptions.length)] || ''
          }

          next.startMonth = sMonth
          next.startYear = sYear
          next.endMonth = endMonth
          next.endYear = endYear

          // visually mark glitch
          setExtraGapIds((prev) => (prev.includes(id) ? prev : [...prev, id]))
          reshuffleMonths()
        }

        if ((field === 'endMonth' || field === 'endYear') && typeof value === 'string') {
          // ignore user edits to end month/year to keep them locked before start
          next.endMonth = work.endMonth
          next.endYear = work.endYear
        }

        if (field === 'currentRole' && value === true) {
          next.description = ''
        }

        // description handled above with strict 5-letter limit

        return next
      }),
    }))
  }

  const addWE = () => {
    const id = Date.now()
    setExtraGapIds((prev) => [...prev, id])

    setForm((f) => ({
      ...f,
      workExperiences: [
        ...f.workExperiences,
        {
          id,
          jobTitle: '',
          company: '',
          location: '',
          startMonth: '',
          startYear: '',
          endMonth: '',
          endYear: '',
          currentRole: false,
          description: '',
        },
      ],
    }))
  }

  const removeWE = (id: number) => {
    setForm((f) => ({
      ...f,
      workExperiences: f.workExperiences.filter((work) => work.id !== id),
    }))
  }

  const deleteOneFieldWE = (id: number) => {
    const fields: Array<keyof WorkExperience> = ['jobTitle', 'company', 'location', 'description']
    const pick = fields[Math.floor(Math.random() * fields.length)]
    setForm((f) => ({
      ...f,
      workExperiences: f.workExperiences.map((w) => (w.id === id ? { ...w, [pick]: '' } : w)),
    }))
  }

  const updateEd = (id: number, field: keyof Education, value: string) => {
    setForm((f) => ({
      ...f,
      educations: f.educations.map((education) => {
        if (education.id !== id) return education

        const next: Education = { ...education, [field]: value } as Education

        if (field === 'school' && value.length > 0) {
          // bad dropdown: auto-replace user selection with a different silly school
          const weirdSchools = [
            'University of No Idea',
            'School of Hard Knocks',
            'Institute of Mysteries',
            'Nowhere Tech',
            'Acme Academy',
          ]
          // sometimes honor user, sometimes replace
          if (Math.random() > 0.4) {
            next.school = weirdSchools[Math.floor(Math.random() * weirdSchools.length)]
            setBadSchoolIds((p) => ({ ...p, [id]: true }))
          } else {
            next.fieldOfStudy = ''
            setBadSchoolIds((p) => ({ ...p, [id]: false }))
          }
        }

        if (field === 'degree' && typeof value === 'string') {
          // always randomize degree regardless of user input
          const degreeOptions = [
            'Bachelor Degree',
            'Master Degree',
            'Doctorate (PhD)',
            'Associate Degree',
            'Certificate / Diploma',
            'Other',
            'Mystery Degree',
            'Honorary Noodle Studies',
          ]
          next.degree = degreeOptions[Math.floor(Math.random() * degreeOptions.length)]
        }

        if (field === 'fieldOfStudy' && typeof value === 'string') {
          // transform field of study into a silly variant
          const transformed = value
            .split('')
            .map((c, i) => (i % 2 === 0 ? c.toUpperCase() : '✶'))
            .join('')
          next.fieldOfStudy = transformed
        }

        if (field === 'gpa' && value.length > 0 && Math.random() > 0.5) {
          next.gpa = `${value}.0`
        }

        if (field === 'startYear' && typeof value === 'string') {
          // make start/end years nonsensical: sometimes set endYear earlier than startYear
          const sy = parseInt(value) || new Date().getFullYear()
          if (Math.random() > 0.5) {
            next.endYear = String(sy - (Math.floor(Math.random() * 6) + 1))
          } else {
            // or randomize degree
            const degreeOptions = [
              'Bachelor Degree',
              'Master Degree',
              'Doctorate (PhD)',
              'Associate Degree',
              'Certificate / Diploma',
              'Other',
              'Mystery Degree',
              'Honorary Noodle Studies',
            ]
            next.degree = degreeOptions[Math.floor(Math.random() * degreeOptions.length)]
          }
        }

        if (field === 'endYear' && typeof value === 'string') {
          // make endYear sometimes before startYear
          const ey = parseInt(value) || new Date().getFullYear()
          if (Math.random() > 0.5) {
            next.startYear = String(ey + (Math.floor(Math.random() * 4) + 1))
          } else {
            const degreeOptions = [
              'Bachelor Degree',
              'Master Degree',
              'Doctorate (PhD)',
              'Associate Degree',
              'Certificate / Diploma',
              'Other',
              'Mystery Degree',
              'Honorary Noodle Studies',
            ]
            next.degree = degreeOptions[Math.floor(Math.random() * degreeOptions.length)]
          }
        }

        return next
      }),
    }))
  }

  const addEd = () => {
    setForm((f) => ({
      ...f,
      educations: [
        ...f.educations,
        {
          id: Date.now(),
          school: '',
          degree: '',
          fieldOfStudy: '',
          gpa: '',
          startYear: '',
          endYear: '',
        },
      ],
    }))
  }

  const removeEd = (id: number) => {
    setForm((f) => ({
      ...f,
      educations: f.educations.filter((education) => education.id !== id),
    }))
  }

  const deleteOneFieldEd = (id: number) => {
    const fields: Array<keyof Education> = ['school', 'degree', 'fieldOfStudy', 'gpa']
    const pick = fields[Math.floor(Math.random() * fields.length)]
    setForm((f) => ({
      ...f,
      educations: f.educations.map((e) => (e.id === id ? { ...e, [pick]: '' } : e)),
    }))
  }

  return (
    <div>
      <StepHeading title='My Experience' />

      <SectionTitle>Work Experience</SectionTitle>
      {form.workExperiences.map((workExperience, index) => (
        <div
          key={workExperience.id}
          className='mb-6'
          style={{ marginTop: extraGapIds.includes(workExperience.id) ? '24px' : '0px' }}
        >
          <div className='mb-3 flex items-center justify-between'>
            <span className='text-sm font-bold text-gray-800'>
              Work Experience {index + 1}
            </span>
            <button
              onClick={() => deleteOneFieldWE(workExperience.id)}
              onMouseEnter={() => makeDeleteRun(workExperience.id)}
              style={{
                transform: `translate(${deleteOffsets[workExperience.id]?.x ?? 0}px, ${deleteOffsets[workExperience.id]?.y ?? 0}px)`,
              }}
              className='text-sm text-gray-500 hover:text-red-600'
              type='button'
            >
              Delete
            </button>
          </div>

          <div className='mb-3'>
            <Label text='Job Title' required />
            <div className='flex items-center gap-2'>
              <Input
                value={workExperience.jobTitle}
                onChange={(e) => updateWE(workExperience.id, 'jobTitle', e.target.value)}
                placeholder='Customer Success Manager'
                className={badTitleIds[workExperience.id] ? 'border-dashed border-2 border-pink-400 bg-pink-50' : ''}
              />
            </div>
          </div>

          <div className='mb-3'>
            <Label text='Company' required />
            <Input
              value={workExperience.company}
              onChange={(e) => updateWE(workExperience.id, 'company', e.target.value)}
              placeholder='Acme Corp'
            />
          </div>

          <div className='mb-3'>
            <Label text='Location' />
            <Input
              value={workExperience.location}
              onChange={(e) => updateWE(workExperience.id, 'location', e.target.value)}
              placeholder='San Francisco, CA'
            />
          </div>

            <div className='mb-3 grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <Label text={swappedLabels ? 'End Date' : 'Start Date'} required />
              <div className='grid grid-cols-2 gap-2'>
                {(() => {
                  const endYNum = parseInt(workExperience.endYear || '') || null
                  const endMonth = workExperience.endMonth || ''
                  const allowedYears = endYNum ? YEARS.filter((y) => parseInt(y) >= endYNum) : YEARS
                  const allowedMonths = (year: string) => {
                    if (!endMonth) return monthOptions
                    const endIdx = monthOptions.findIndex((m) => m === endMonth)
                    if (endIdx === -1) return monthOptions
                    if (parseInt(year) === endYNum) return monthOptions.slice(endIdx)
                    return monthOptions
                  }

                  return (
                    <>
                      <Select
                        value={workExperience.startMonth}
                        onChange={(e) => updateWE(workExperience.id, 'startMonth', e.target.value)}
                      >
                        <option value=''>Month</option>
                        {allowedMonths(workExperience.startYear || '').map((month) => (
                          <option key={month}>{month}</option>
                        ))}
                      </Select>
                      <Select
                        value={workExperience.startYear}
                        onChange={(e) => updateWE(workExperience.id, 'startYear', e.target.value)}
                      >
                        <option value=''>Year</option>
                        {allowedYears.map((year) => (
                          <option key={year}>{year}</option>
                        ))}
                      </Select>
                    </>
                  )
                })()}
              </div>
            </div>

            <div>
              <Label text={swappedLabels ? 'Start Date' : 'End Date'} />
              <div className='grid grid-cols-2 gap-2'>
                <Select
                  value={workExperience.endMonth}
                  onChange={() => {}}
                  disabled={true}
                >
                  <option value=''>Month</option>
                  {monthOptions.map((month) => (
                    <option key={month}>{month}</option>
                  ))}
                </Select>
                <Select
                  value={workExperience.endYear}
                  onChange={() => {}}
                  disabled={true}
                >
                  <option value=''>Year</option>
                  {YEARS.map((year) => (
                    <option key={year}>{year}</option>
                  ))}
                </Select>
              </div>
            </div>
          </div>

          <div className='mb-3 flex items-center gap-2'>
            <input
              type='checkbox'
              id={`current-${workExperience.id}`}
              checked={workExperience.currentRole}
              onClick={() => {
                updateWE(workExperience.id, 'currentRole', true)
                setTimeout(() => updateWE(workExperience.id, 'currentRole', false), 700)
              }}
              readOnly
              className='h-4 w-4 accent-blue-600'
            />
            <label
              htmlFor={`current-${workExperience.id}`}
              className='cursor-pointer text-sm text-gray-700'
            >
              I currently work here
            </label>
          </div>

          <div>
            <Label text='Description' />
            <Textarea
              value={workExperience.description}
              onChange={(e) => updateWE(workExperience.id, 'description', e.target.value)}
              placeholder='Describe your responsibilities and key achievements...'
            />
            {descLimitIds[workExperience.id] && (
              <p className='mt-1 text-xs text-red-600'>letter limit reached</p>
            )}
          </div>

          {index < form.workExperiences.length - 1 && <Divider />}
        </div>
      ))}

      <button
        onClick={addWE}
        className='mb-2 block text-sm font-semibold text-blue-600 hover:underline'
        type='button'
      >
        + Add Work Experience
      </button>

      <Divider />

      <SectionTitle>Education</SectionTitle>
      {form.educations.map((education, index) => (
        <div key={education.id} className='mb-6'>
          <div className='mb-3 flex items-center justify-between'>
            <span className='text-sm font-bold text-gray-800'>Education {index + 1}</span>
            <button
              onClick={() => deleteOneFieldEd(education.id)}
              className='text-sm text-gray-500 hover:text-red-600'
              type='button'
            >
              Delete
            </button>
          </div>

          <div className='mb-3'>
            <Label text='School / Institution' required />
            <Select
              value={education.school}
              onChange={(e) => updateEd(education.id, 'school', e.target.value)}
              className={badSchoolIds[education.id] ? 'bg-red-50 border-dashed border-2 border-red-300' : ''}
            >
              <option value=''>Select a school</option>
              <option>University of California, Berkeley</option>
              <option>Stanford University</option>
              <option>Massachusetts Institute of Technology</option>
              <option>Nowhere Tech</option>
              <option>School of Hard Knocks</option>
            </Select>
          </div>

          <div className='mb-3 grid grid-cols-1 gap-4 md:grid-cols-2'>
            <div>
              <Label text='Degree' required />
              <Select
                value={education.degree}
                onChange={(e) => updateEd(education.id, 'degree', e.target.value)}
              >
                <option value=''>Select Degree</option>
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
              <Label text='Field of Study' />
              <Input
                value={education.fieldOfStudy}
                onChange={(e) => updateEd(education.id, 'fieldOfStudy', e.target.value)}
                placeholder='Computer Science'
              />
            </div>
          </div>

          <div className='mb-3 grid grid-cols-1 gap-4 md:grid-cols-3'>
            <div>
              <Label text='GPA' />
              <Input
                value={education.gpa}
                onChange={(e) => updateEd(education.id, 'gpa', e.target.value)}
                placeholder='3.8'
              />
            </div>

            <div>
              <Label text='Start Year' />
              <Select
                value={education.startYear}
                onChange={(e) => updateEd(education.id, 'startYear', e.target.value)}
              >
                <option value=''>Year</option>
                {YEARS.map((year) => (
                  <option key={year}>{year}</option>
                ))}
              </Select>
            </div>

            <div>
              <Label text='End Year (or Expected)' />
              <Select
                value={education.endYear}
                onChange={(e) => updateEd(education.id, 'endYear', e.target.value)}
              >
                <option value=''>Year</option>
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
        className='mb-2 block text-sm font-semibold text-blue-600 hover:underline'
        type='button'
      >
        + Add Education
      </button>

      <Divider />

      <SectionTitle>Skills</SectionTitle>
      <div className='mb-4'>
        <Label text='Skills' required />
        <Input
          value={form.skills}
          onChange={(e) => {
            let v = e.target.value
            v = v.replace(/,/g, ' • ')
            if (Math.random() > 0.85) v = 'list your allegedly real skills'
            setForm((f) => ({ ...f, skills: v }))
          }}
          placeholder={skillsPlaceholder}
        />
      </div>

      <Divider />

      <SectionTitle>Websites and Social Links</SectionTitle>
      <div className='mb-4'>
        <Label text='LinkedIn URL' />
        <Input
          type='url'
          value={form.linkedin}
          onChange={(e) => {
            const raw = e.target.value.replace(/^https?:\/\/(www\.)?/, '')
            setForm((f) => ({ ...f, linkedin: raw }))
            setLinkedinInvalid(raw.length > 0)
          }}
          placeholder='https://linkedin.com/in/yourname'
        />
        {linkedinInvalid && <p className='mt-1 text-xs text-red-600'>invalid</p>}
      </div>

      <div className='mb-4'>
        <Label text='Portfolio / Personal Website' />
        <Input
          type='url'
          value={form.website}
          onChange={(e) => setForm((f) => ({ ...f, website: e.target.value }))}
          placeholder='https://yourportfolio.com'
        />
      </div>

      <Divider />

      <SectionTitle>Resume / CV</SectionTitle>
      <div className='mb-4'>
        <Label text='Upload Resume' required />
        {!resumeLoading ? (
          <input
            type='file'
            accept='.pdf,.doc,.docx'
            onClick={() => setResumeLoading(true)}
            onChange={(e) =>
              setForm((f) => ({ ...f, resumeFile: e.target.files?.[0] ?? null }))
            }
            className='block w-full text-sm text-gray-600 file:mr-4 file:rounded file:border file:border-gray-300 file:bg-white file:px-4 file:py-2 file:text-sm file:text-gray-700 hover:file:bg-gray-50'
          />
        ) : (
          <div className='flex items-center gap-3'>
            <button disabled className='rounded bg-gray-200 px-4 py-2 text-sm'>
              Loading...
            </button>
            <p className='text-sm text-gray-500'>Still loading...</p>
          </div>
        )}
        <p className='mt-1 text-xs text-gray-400'>PDF, DOC, or DOCX - max 5MB</p>
      </div>

      <div className='mb-4'>
        <Label text='Cover Letter' />
        <Textarea
          value={form.coverLetter}
          onChange={(e) => {
            const v = e.target.value.toUpperCase().slice(0, 200)
            setForm((f) => ({ ...f, coverLetter: v }))
          }}
          placeholder='Paste or write your cover letter here...'
        />
      </div>
    </div>
  )
}