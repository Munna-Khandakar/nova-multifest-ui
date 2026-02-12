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
  foodVendorDefaultValues,
  foodVendorSchema,
  type FoodVendorValues,
} from "@/lib/zod-schemas/food-vendor"

const STORAGE_KEY = "foodVendorApplicationDraft"

const requiredFields: Array<keyof FoodVendorValues> = [
  "boothType",
  "additionalCircuits",
  "parkingLicensePlate",
  "rulesAcknowledgement",
  "businessName",
  "businessAlias",
  "culturalRepresented",
  "profileImage",
  "boothDescription",
  "businessStreet",
  "businessCity",
  "businessProvince",
  "businessPostalCode",
  "contactName",
  "contactPhone",
  "contactEmail",
  "contactEmailConfirm",
  "invoiceEmail",
  "invoiceEmailConfirm",
  "termsAcknowledgement",
  "agreementName",
]

export function FoodVendorApplicationForm() {
  const [draftMeta, setDraftMeta] = useState<{ savedAt: string } | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const {
    control,
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FoodVendorValues>({
    resolver: zodResolver(foodVendorSchema),
    defaultValues: foodVendorDefaultValues,
    mode: "onTouched",
  })

  const watchedValues = useWatch({ control })
  const boothDescription = useWatch({ control, name: "boothDescription" })
  const invoiceSameAsBusiness = useWatch({
    control,
    name: "invoiceSameAsBusiness",
  })
  const businessStreet = useWatch({ control, name: "businessStreet" })
  const businessCity = useWatch({ control, name: "businessCity" })
  const businessProvince = useWatch({ control, name: "businessProvince" })
  const businessPostalCode = useWatch({ control, name: "businessPostalCode" })

  useEffect(() => {
    if (!invoiceSameAsBusiness) return
    setValue("invoiceStreet", businessStreet)
    setValue("invoiceCity", businessCity)
    setValue("invoiceProvince", businessProvince)
    setValue("invoicePostalCode", businessPostalCode)
  }, [
    invoiceSameAsBusiness,
    businessStreet,
    businessCity,
    businessProvince,
    businessPostalCode,
    setValue,
  ])

  useEffect(() => {
    if (typeof window === "undefined") return
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (!stored) return
    try {
      const parsed = JSON.parse(stored) as {
        savedAt: string
        data: Partial<FoodVendorValues>
      }
      if (parsed?.savedAt) {
        setDraftMeta({ savedAt: parsed.savedAt })
      }
    } catch {
      setDraftMeta(null)
    }
  }, [])

  const progressValue = useMemo(() => {
    const values = watchedValues as FoodVendorValues
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
    const { profileImage, mediaUpload, ...rest } = values
    const payload = {
      savedAt: new Date().toISOString(),
      data: { ...rest, profileImage: undefined, mediaUpload: undefined },
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
        data: Partial<FoodVendorValues>
      }
      reset({ ...foodVendorDefaultValues, ...parsed.data })
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
          <CardTitle>Food Vendor Application 2026</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <p>We would love to have you join us!</p>
          <div className="space-y-2">
            <p className="font-semibold text-foreground">
              Please select your booth type:
            </p>
            <p>
              10' x 10' tent with two 6' tables and four removable walls. For
              booth prices please contact vishal@multifestns.ca.
            </p>
            <p>
              Note: Each tent cost is $900, but if payment is made by March 31,
              2025, the discounted price is $800.
            </p>
            <p>Note: Any additional chair is $10/chair. No personal chairs or tables will be allowed.</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-foreground">Electrical Circuit:</p>
            <p>
              a. Food vendors will be provided with one 15Amp circuit with two
              plugins.
            </p>
            <p>
              b. Additional 15Amp circuits will be available for $120 per
              circuit. (Discounted price is $60 if paid by March 31, 2025).
            </p>
            <p>
              c. Additional circuits requested during event day (same day) will
              be charged $130. It must be paid in cash/credit card before
              installation. Additional circuits must be requested at the time of
              application and will not be automatically granted. It is subject
              to availability.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-foreground">Parking Pass:</p>
            <p>
              We have limited parking passes and will be given as per
              availability. Parking Pass must be displayed on the dashboard of
              the vendor vehicle all the time. Parking pass is not for the road
              side parking, only for designated parking. Vendor must provide at
              least one license plate number at least one week before the event.
            </p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-foreground">Booth Confirmation:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Full payment of booth fee within 2 weeks of approval.</li>
              <li>Proof of liability insurance ($2 million minimum).</li>
              <li>Temporary food permit.</li>
              <li>Compliance with all federal, provincial, and municipal regulations.</li>
              <li>Failure to meet deadlines may result in forfeiture of the booth.</li>
              <li>Nova Multifest reserves the right to reassign the booth.</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-semibold text-foreground">Nova Multifest Rules:</p>
            <p>
              Please read the site rules and regulations before submitting your
              application.
            </p>
            <a
              href="/site-rules-regulation"
              target="_blank"
              rel="noreferrer"
              className="text-primary text-xs font-semibold uppercase tracking-[0.2em]"
            >
              Read More
            </a>
          </div>
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
            Please fill out the form below.
          </p>
          <Card>
            <CardHeader>
              <CardTitle>Booth & power details</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="space-y-2">
                <Label>Booth type</Label>
                <Controller
                  control={control}
                  name="boothType"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={!!errors.boothType}
                      >
                        <SelectValue placeholder="Select booth type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10x10-tent">
                          10' x 10' tent with two 6' tables and four removable
                          walls
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.boothType ? (
                  <p className="text-destructive text-sm">
                    {errors.boothType.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label>
                  No. of additional 15 amp power circuits required, $60 each
                  (one 15 amp circuit with two plugs included in the fee)
                </Label>
                <Controller
                  control={control}
                  name="additionalCircuits"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        className="w-full"
                        aria-invalid={!!errors.additionalCircuits}
                      >
                        <SelectValue placeholder="Select your answer" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0">0</SelectItem>
                        <SelectItem value="1">1</SelectItem>
                        <SelectItem value="2">2</SelectItem>
                        <SelectItem value="3">3</SelectItem>
                        <SelectItem value="4">4</SelectItem>
                        <SelectItem value="5">5+</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.additionalCircuits ? (
                  <p className="text-destructive text-sm">
                    {errors.additionalCircuits.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="parkingLicensePlate">
                  Parking pass license plate number
                </Label>
                <Input
                  id="parkingLicensePlate"
                  {...register("parkingLicensePlate")}
                  aria-invalid={!!errors.parkingLicensePlate}
                />
                {errors.parkingLicensePlate ? (
                  <p className="text-destructive text-sm">
                    {errors.parkingLicensePlate.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2 rounded-lg border p-4">
                <div className="flex items-start gap-3">
                  <input
                    id="rulesAcknowledgement"
                    type="checkbox"
                    className={cn(
                      "border-input text-primary focus-visible:ring-ring focus-visible:ring-offset-background mt-1 size-4 rounded border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                      errors.rulesAcknowledgement && "border-destructive"
                    )}
                    {...register("rulesAcknowledgement")}
                  />
                  <Label htmlFor="rulesAcknowledgement" className="text-sm">
                    Yes, I read and understood the Nova Multifest rules.
                  </Label>
                </div>
                {errors.rulesAcknowledgement ? (
                  <p className="text-destructive mt-2 text-sm">
                    {errors.rulesAcknowledgement.message}
                  </p>
                ) : null}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business information</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business name</Label>
                <Input
                  id="businessName"
                  {...register("businessName")}
                  aria-invalid={!!errors.businessName}
                />
                {errors.businessName ? (
                  <p className="text-destructive text-sm">
                    {errors.businessName.message}
                  </p>
                ) : null}
                <div className="flex items-start gap-2 text-xs text-muted-foreground">
                  <input
                    id="noJointStockRegistry"
                    type="checkbox"
                    className="border-input mt-0.5 size-3 rounded border"
                    {...register("noJointStockRegistry")}
                  />
                  <label htmlFor="noJointStockRegistry">
                    Select if no registry of joint stock name.
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="businessAlias">Business alias</Label>
                <Input
                  id="businessAlias"
                  {...register("businessAlias")}
                  aria-invalid={!!errors.businessAlias}
                />
                {errors.businessAlias ? (
                  <p className="text-destructive text-sm">
                    {errors.businessAlias.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="culturalRepresented">
                  Cultural represented
                </Label>
                <Input
                  id="culturalRepresented"
                  {...register("culturalRepresented")}
                  aria-invalid={!!errors.culturalRepresented}
                />
                {errors.culturalRepresented ? (
                  <p className="text-destructive text-sm">
                    {errors.culturalRepresented.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="profileImage">Upload profile image</Label>
                <Input
                  id="profileImage"
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif"
                  {...register("profileImage")}
                  aria-invalid={!!errors.profileImage}
                />
                <p className="text-muted-foreground text-xs">
                  Image size must be minimum 50KB. Format: JPG, JPEG, GIF, PNG.
                </p>
                {errors.profileImage ? (
                  <p className="text-destructive text-sm">
                    {errors.profileImage.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="boothDescription">
                  Booth description (please provide your menu)
                </Label>
                <Textarea
                  id="boothDescription"
                  rows={6}
                  {...register("boothDescription")}
                  aria-invalid={!!errors.boothDescription}
                />
                <div className="text-right text-xs text-muted-foreground">
                  {(boothDescription || "").length} / 3000
                </div>
                {errors.boothDescription ? (
                  <p className="text-destructive text-sm">
                    {errors.boothDescription.message}
                  </p>
                ) : null}
              </div>

              <div className="space-y-2">
                <Label htmlFor="mediaUpload">Upload media (Optional)</Label>
                <Input
                  id="mediaUpload"
                  type="file"
                  accept=".jpg,.jpeg,.png,.gif"
                  {...register("mediaUpload")}
                  aria-invalid={!!errors.mediaUpload}
                />
                {errors.mediaUpload ? (
                  <p className="text-destructive text-sm">
                    {errors.mediaUpload.message}
                  </p>
                ) : null}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Business address</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="businessStreet">Street address</Label>
                <Input
                  id="businessStreet"
                  {...register("businessStreet")}
                  aria-invalid={!!errors.businessStreet}
                />
                {errors.businessStreet ? (
                  <p className="text-destructive text-sm">
                    {errors.businessStreet.message}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessCity">City</Label>
                <Input
                  id="businessCity"
                  {...register("businessCity")}
                  aria-invalid={!!errors.businessCity}
                />
                {errors.businessCity ? (
                  <p className="text-destructive text-sm">
                    {errors.businessCity.message}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessProvince">Province</Label>
                <Input
                  id="businessProvince"
                  {...register("businessProvince")}
                  aria-invalid={!!errors.businessProvince}
                />
                {errors.businessProvince ? (
                  <p className="text-destructive text-sm">
                    {errors.businessProvince.message}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessPostalCode">Postal code</Label>
                <Input
                  id="businessPostalCode"
                  {...register("businessPostalCode")}
                  aria-invalid={!!errors.businessPostalCode}
                />
                {errors.businessPostalCode ? (
                  <p className="text-destructive text-sm">
                    {errors.businessPostalCode.message}
                  </p>
                ) : null}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Contact person on event</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="contactName">Contact person on event</Label>
                <Input
                  id="contactName"
                  {...register("contactName")}
                  aria-invalid={!!errors.contactName}
                />
                {errors.contactName ? (
                  <p className="text-destructive text-sm">
                    {errors.contactName.message}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactPhone">
                  Contact person on event phone #
                </Label>
                <Input
                  id="contactPhone"
                  {...register("contactPhone")}
                  aria-invalid={!!errors.contactPhone}
                />
                {errors.contactPhone ? (
                  <p className="text-destructive text-sm">
                    {errors.contactPhone.message}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">
                  Contact person email address
                </Label>
                <Input
                  id="contactEmail"
                  type="email"
                  {...register("contactEmail")}
                  aria-invalid={!!errors.contactEmail}
                />
                {errors.contactEmail ? (
                  <p className="text-destructive text-sm">
                    {errors.contactEmail.message}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmailConfirm">Confirm email address</Label>
                <Input
                  id="contactEmailConfirm"
                  type="email"
                  {...register("contactEmailConfirm")}
                  aria-invalid={!!errors.contactEmailConfirm}
                />
                {errors.contactEmailConfirm ? (
                  <p className="text-destructive text-sm">
                    {errors.contactEmailConfirm.message}
                  </p>
                ) : null}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Social media links (Optional)</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" {...register("website")} />
                {errors.website ? (
                  <p className="text-destructive text-sm">
                    {errors.website.message}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="twitter">Twitter</Label>
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
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="tiktok">Tiktok</Label>
                <Input id="tiktok" {...register("tiktok")} />
                {errors.tiktok ? (
                  <p className="text-destructive text-sm">
                    {errors.tiktok.message}
                  </p>
                ) : null}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Invoice address</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2 flex items-center gap-2">
                <input
                  id="invoiceSameAsBusiness"
                  type="checkbox"
                  className="border-input size-4 rounded border"
                  {...register("invoiceSameAsBusiness")}
                />
                <Label htmlFor="invoiceSameAsBusiness">
                  Same as Business Address
                </Label>
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="invoiceStreet">Street Address 1</Label>
                <Input id="invoiceStreet" {...register("invoiceStreet")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoiceCity">City</Label>
                <Input id="invoiceCity" {...register("invoiceCity")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoiceProvince">Province</Label>
                <Input id="invoiceProvince" {...register("invoiceProvince")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoicePostalCode">Postal code</Label>
                <Input id="invoicePostalCode" {...register("invoicePostalCode")} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoiceEmail">Invoice email address</Label>
                <Input
                  id="invoiceEmail"
                  type="email"
                  {...register("invoiceEmail")}
                  aria-invalid={!!errors.invoiceEmail}
                />
                {errors.invoiceEmail ? (
                  <p className="text-destructive text-sm">
                    {errors.invoiceEmail.message}
                  </p>
                ) : null}
              </div>
              <div className="space-y-2">
                <Label htmlFor="invoiceEmailConfirm">
                  Confirm email address
                </Label>
                <Input
                  id="invoiceEmailConfirm"
                  type="email"
                  {...register("invoiceEmailConfirm")}
                  aria-invalid={!!errors.invoiceEmailConfirm}
                />
                {errors.invoiceEmailConfirm ? (
                  <p className="text-destructive text-sm">
                    {errors.invoiceEmailConfirm.message}
                  </p>
                ) : null}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Coupon code</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="couponCode">Coupon Code</Label>
                <Input id="couponCode" {...register("couponCode")} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Terms and conditions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p>
                Please ensure that you include your business name in the
                e-transfer message. Nova Multifest Society uses the e-transfer
                message for identification purposes.
              </p>
              <p>
                Payment is non-refundable. Nova Multifest Society reserves the
                right to cancel, postpone, or limit the event due to weather or
                other unforeseen circumstances, and no refunds will be issued.
              </p>
              <p>
                For vendor cancellation: 14 days before the event, a refund of
                up to 75% will be provided. There will be no refund for
                cancellation within 14 days of the event.
              </p>
              <p>
                In case of partial or full day cancellation due to unforeseen
                circumstances, there will be no refunds or compensation.
              </p>
              <p>
                Nova Multifest Society reserves the right to determine vendor
                space assignment.
              </p>
              <p>
                Vendor is responsible for meeting all requirements including
                permits, liability insurance, and compliance with regulations.
              </p>
              <p>
                Electrical equipment must meet CSA/UL standards and follow the
                Canadian Electric Code. An electrician will be onsite to ensure
                compliance. No changes to electrical plans are permitted without
                approval. Any modifications will be at the vendor's expense.
              </p>
              <p>
                Nova Multifest Society reserves the right to accept or reject
                any vendor application.
              </p>
              <a
                href="/site-rules-regulation"
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
                By clicking the "Submit" button and entering your name below,
                you acknowledge that you have read and accept the Terms and
                Conditions.
              </p>

              <div className="space-y-2">
                <Label htmlFor="agreementName">By entering your name, you confirm your agreement</Label>
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
              Submit application
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}
