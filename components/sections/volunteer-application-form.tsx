"use client"

import { useEffect, useMemo, useState } from "react"
import { Controller, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import {
  volunteerDefaultValues,
  volunteerSchema,
  type VolunteerValues,
} from "@/lib/zod-schemas/volunteer"

const STORAGE_KEY = "volunteerApplicationDraft"

const yesNoOptions = ["Yes", "No"]

const socialMarketingOptions = [
  "Yes, Marketing",
  "Yes, Social Media",
  "Yes, Both Social Media & Marketing",
  "N/A",
]

const heardAboutOptions = [
  "Facebook",
  "Instagram",
  "X",
  "LinkedIN",
  "Email",
  "Advertisement",
  "Online Search",
  "Referred by a Student",
]

const tshirtSizes = ["Small", "Medium", "Large", "XL", "XXL", "XXXL", "Don't need t-shirt"]

const requiredFields: Array<keyof VolunteerValues> = [
  "firstName",
  "lastName",
  "email",
  "underThirty",
  "countryOfOrigin",
  "indigenous",
  "languages",
  "experience",
  "socialMarketingVolunteer",
  "heardAbout",
  "tshirtSize",
  "termsAcknowledgement",
  "agreementName",
]

export function VolunteerApplicationForm() {
  const [draftMeta, setDraftMeta] = useState<{ savedAt: string } | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<VolunteerValues>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: volunteerDefaultValues,
    mode: "onTouched",
  })

  const watchedValues = useWatch({ control })
  const experience = useWatch({ control, name: "experience" })

  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return
    try {
      const parsed = JSON.parse(stored) as {
        savedAt: string
        data: Partial<VolunteerValues>
      }
      if (parsed?.savedAt) {
        setDraftMeta({ savedAt: parsed.savedAt })
      }
    } catch {
      setDraftMeta(null)
    }
  }, [])

  const progressValue = useMemo(() => {
    const values = watchedValues as VolunteerValues
    const completed = requiredFields.reduce((count, field) => {
      const value = values?.[field]
      if (typeof value === "boolean") {
        return value ? count + 1 : count
      }
      if (typeof FileList !== "undefined" && value instanceof FileList) {
        return value.length > 0 ? count + 1 : count
      }
      if (typeof value === "string") {
        return value.trim().length > 0 ? count + 1 : count
      }
      return count
    }, 0)
    return Math.round((completed / requiredFields.length) * 100)
  }, [watchedValues])

  const handleSave = () => {
    const values = getValues()
    const { profileImage, ...rest } = values
    const payload = {
      savedAt: new Date().toISOString(),
      data: { ...rest, profileImage: undefined },
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload))
    setDraftMeta({ savedAt: payload.savedAt })
  }

  const handleRestore = () => {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return
    try {
      const parsed = JSON.parse(stored) as {
        savedAt: string
        data: Partial<VolunteerValues>
      }
      reset({ ...volunteerDefaultValues, ...parsed.data })
      setDraftMeta({ savedAt: parsed.savedAt })
    } catch {
      setDraftMeta(null)
    }
  }

  const handleClearDraft = () => {
    window.localStorage.removeItem(STORAGE_KEY)
    setDraftMeta(null)
  }

  const onSubmit = () => {
    setSubmitted(true)
    window.localStorage.removeItem(STORAGE_KEY)
  }

  return (
    <div className="space-y-8">
      <div className="rounded-xl border bg-muted/30 p-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">Application progress</p>
            <p className="text-muted-foreground text-xs">
              {progressValue}% complete
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" onClick={handleSave}>
              Save & return later
            </Button>
          </div>
        </div>
        <div
          role="progressbar"
          aria-valuenow={progressValue}
          aria-valuemin={0}
          aria-valuemax={100}
          className="bg-muted mt-3 h-2 w-full overflow-hidden rounded-full"
        >
          <div
            className="bg-primary h-full rounded-full transition-all"
            style={{ width: `${progressValue}%` }}
          />
        </div>
        <p className="text-muted-foreground mt-2 text-xs">
          Drafts save locally in your browser. Files are not saved and must be
          re-uploaded.
        </p>
        {draftMeta ? (
          <div className="mt-3 flex flex-col gap-2 rounded-lg border bg-background p-3 text-xs sm:flex-row sm:items-center sm:justify-between">
            <span>
              Draft saved on {new Date(draftMeta.savedAt).toLocaleString()}.
            </span>
            <div className="flex gap-2">
              <Button type="button" variant="secondary" onClick={handleRestore}>
                Restore
              </Button>
              <Button type="button" variant="ghost" onClick={handleClearDraft}>
                Dismiss
              </Button>
            </div>
          </div>
        ) : null}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Volunteer Application 2026</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>We would love to have you join us!</p>
          <p>
            This is a volunteer application form. Please fill in all required
            fields marked with an asterisk.
          </p>
        </CardContent>
      </Card>

      {submitted ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-lg font-semibold text-foreground">
              Application submitted!
            </p>
            <p className="text-muted-foreground mt-2">
              Thank you for applying. Our team will review your submission and
              follow up by email.
            </p>
          </CardContent>
        </Card>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
          <p className="text-muted-foreground text-sm">
            Please fill out the form below :
          </p>

          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  {...register("firstName")}
                  aria-invalid={!!errors.firstName}
                />
                {errors.firstName ? (
                  <p className="text-destructive text-sm">
                    {errors.firstName.message}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  {...register("lastName")}
                  aria-invalid={!!errors.lastName}
                />
                {errors.lastName ? (
                  <p className="text-destructive text-sm">
                    {errors.lastName.message}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" {...register("phone")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  {...register("email")}
                  aria-invalid={!!errors.email}
                />
                {errors.email ? (
                  <p className="text-destructive text-sm">
                    {errors.email.message}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="streetAddress">Street Address</Label>
                <Input id="streetAddress" {...register("streetAddress")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input id="city" {...register("city")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="province">Province</Label>
                <Input id="province" {...register("province")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="postalCode">Postal Code</Label>
                <Input id="postalCode" {...register("postalCode")} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="emergencyContactName">
                  Emergency Contact Name
                </Label>
                <Input
                  id="emergencyContactName"
                  {...register("emergencyContactName")}
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="emergencyPhone">
                  Emergency Phone Number
                </Label>
                <Input id="emergencyPhone" {...register("emergencyPhone")} />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="profileImage">
                  Upload Profile (Recommended size 100x100)
                </Label>
                <Input
                  id="profileImage"
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif"
                  {...register("profileImage")}
                  aria-invalid={!!errors.profileImage}
                />
                <p className="text-muted-foreground text-xs">
                  Image size must be minimum 50KB. Supported file types: jpeg,
                  gif, png.
                </p>
                {errors.profileImage ? (
                  <p className="text-destructive text-sm">
                    {errors.profileImage.message}
                  </p>
                ) : null}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Funding Questions</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Are you under 30 years old? *</Label>
                <Controller
                  control={control}
                  name="underThirty"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={!!errors.underThirty}
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {yesNoOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.underThirty ? (
                  <p className="text-destructive text-sm">
                    {errors.underThirty.message}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="countryOfOrigin">
                  Country of Origin: Where were you born? *
                </Label>
                <Input
                  id="countryOfOrigin"
                  {...register("countryOfOrigin")}
                  aria-invalid={!!errors.countryOfOrigin}
                />
                {errors.countryOfOrigin ? (
                  <p className="text-destructive text-sm">
                    {errors.countryOfOrigin.message}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="ethnicity">
                  Ethnicity: What is your cultural background?
                </Label>
                <Input id="ethnicity" {...register("ethnicity")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="visibleMinority">
                  Member of a visible minority?
                </Label>
                <Input id="visibleMinority" {...register("visibleMinority")} />
              </div>
              <div className="space-y-2">
                <Label>Are you Indigenous? *</Label>
                <Controller
                  control={control}
                  name="indigenous"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={!!errors.indigenous}
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {yesNoOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.indigenous ? (
                  <p className="text-destructive text-sm">
                    {errors.indigenous.message}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="gender">Gender</Label>
                <Input id="gender" {...register("gender")} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Volunteer Experience</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="languages">
                  Please tell us what languages you know: *
                </Label>
                <Textarea
                  id="languages"
                  rows={3}
                  {...register("languages")}
                  aria-invalid={!!errors.languages}
                />
                {errors.languages ? (
                  <p className="text-destructive text-sm">
                    {errors.languages.message}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">
                  Please tell us about your previous volunteer experience,
                  skills, hobbies and interests: *
                </Label>
                <Textarea
                  id="experience"
                  rows={6}
                  {...register("experience")}
                  aria-invalid={!!errors.experience}
                />
                <div className="text-right text-xs text-muted-foreground">
                  {(experience || "").length} / 3000
                </div>
                {errors.experience ? (
                  <p className="text-destructive text-sm">
                    {errors.experience.message}
                  </p>
                ) : null}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Marketing & Outreach</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label>Social Media Marketing Volunteer *</Label>
                <Controller
                  control={control}
                  name="socialMarketingVolunteer"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={!!errors.socialMarketingVolunteer}
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {socialMarketingOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.socialMarketingVolunteer ? (
                  <p className="text-destructive text-sm">
                    {errors.socialMarketingVolunteer.message}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">X (Twitter)</Label>
                <Input id="twitter" {...register("twitter")} />
                {errors.twitter ? (
                  <p className="text-destructive text-sm">
                    {errors.twitter.message}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input id="facebook" {...register("facebook")} />
                {errors.facebook ? (
                  <p className="text-destructive text-sm">
                    {errors.facebook.message}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input id="instagram" {...register("instagram")} />
                {errors.instagram ? (
                  <p className="text-destructive text-sm">
                    {errors.instagram.message}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="tiktok">Tiktok</Label>
                <Input id="tiktok" {...register("tiktok")} />
                {errors.tiktok ? (
                  <p className="text-destructive text-sm">
                    {errors.tiktok.message}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Where did you hear about us? *</Label>
                <Controller
                  control={control}
                  name="heardAbout"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={!!errors.heardAbout}
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {heardAboutOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.heardAbout ? (
                  <p className="text-destructive text-sm">
                    {errors.heardAbout.message}
                  </p>
                ) : null}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Festival Preferences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label>T-Shirt Size *</Label>
                <Controller
                  control={control}
                  name="tshirtSize"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={!!errors.tshirtSize}
                      >
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent>
                        {tshirtSizes.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.tshirtSize ? (
                  <p className="text-destructive text-sm">
                    {errors.tshirtSize.message}
                  </p>
                ) : null}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Terms and Conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
                By signing up as a volunteer for Nova Multifest, you agree to
                abide by the following terms and conditions. These terms outline
                your responsibilities, rights, and the expectations set forth by
                the Nova Multifest Society (&quot;the Organization&quot;). The
                volunteer role is a critical part of the event, and these
                guidelines ensure a safe, respectful, and successful experience
                for all involved.
              </p>
              <p>
                Please confirm you agree with the statements:
              </p>
              <p>
                Nova Multifest Society (NMS) welcomes all participants to our
                event and respects their right to express their opinions.
                However, we also ask that everyone abide by the following rules
                to ensure a safe and respectful environment for all.
              </p>
              <a
                href="https://multifestns.ca/site-rules-regulation/"
                target="_blank"
                rel="noreferrer"
                className="text-primary text-xs font-semibold uppercase tracking-[0.2em]"
              >
                Read More
              </a>

              <div className="space-y-2 rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <input
                    id="termsAcknowledgement"
                    type="checkbox"
                    className={cn(
                      "border-input text-primary focus-visible:ring-ring focus-visible:ring-offset-background mt-1 size-4 rounded border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                      errors.termsAcknowledgement && "border-destructive"
                    )}
                    {...register("termsAcknowledgement")}
                  />
                  <Label htmlFor="termsAcknowledgement" className="text-sm">
                    Yes, I read and understood.
                  </Label>
                </div>
                {errors.termsAcknowledgement ? (
                  <p className="text-destructive mt-2 text-sm">
                    {errors.termsAcknowledgement.message}
                  </p>
                ) : null}
              </div>

              <p className="text-muted-foreground text-xs">
                By clicking the &quot;Submit&quot; button and entering your name
                below, you acknowledge that you have read and accept the Terms
                and Conditions.
              </p>

              <div className="space-y-2">
                <Label htmlFor="agreementName">
                  By entering your name, you confirm your agreement
                </Label>
                <Input
                  id="agreementName"
                  {...register("agreementName")}
                  aria-invalid={!!errors.agreementName}
                />
                {errors.agreementName ? (
                  <p className="text-destructive text-sm">
                    {errors.agreementName.message}
                  </p>
                ) : null}
              </div>
            </CardContent>
          </Card>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <Button type="button" variant="outline" onClick={handleSave}>
              Save & return later
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              Submit form
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
