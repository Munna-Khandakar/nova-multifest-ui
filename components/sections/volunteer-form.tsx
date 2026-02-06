"use client"

import { useState } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { cn } from "@/lib/utils"
import {
  volunteerApplicationSchema,
  volunteerDefaultValues,
  type VolunteerApplicationValues,
} from "@/lib/zod-schemas/volunteer"

const steps: Array<{
  id: string
  title: string
  description: string
  fields: Array<keyof VolunteerApplicationValues>
}> = [
  {
    id: "personal",
    title: "Your details",
    description: "Tell us how we can reach you.",
    fields: ["firstName", "lastName", "email", "phone", "city"],
  },
  {
    id: "preferences",
    title: "Your interests",
    description: "Share where you want to help during the festival.",
    fields: ["role", "availability", "experience"],
  },
  {
    id: "confirmation",
    title: "Final details",
    description: "Wrap up with safety and readiness info.",
    fields: [
      "tshirtSize",
      "emergencyContactName",
      "emergencyContactPhone",
      "agreeToCode",
    ],
  },
]

type VolunteerFormProps = {
  id?: string
  className?: string
}

export function VolunteerForm({ id, className }: VolunteerFormProps) {
  const [stepIndex, setStepIndex] = useState(0)
  const [submitted, setSubmitted] = useState(false)

  const {
    control,
    handleSubmit,
    register,
    trigger,
    formState: { errors, isSubmitting },
  } = useForm<VolunteerApplicationValues>({
    resolver: zodResolver(volunteerApplicationSchema),
    defaultValues: volunteerDefaultValues,
    mode: "onTouched",
  })

  const currentStep = steps[stepIndex]
  const isLastStep = stepIndex === steps.length - 1

  // Validate only the current step fields to keep the flow focused.
  const handleNext = async () => {
    const isValid = await trigger(currentStep.fields, { shouldFocus: true })
    if (isValid) {
      setStepIndex((prev) => Math.min(prev + 1, steps.length - 1))
    }
  }

  const handleBack = () => {
    setStepIndex((prev) => Math.max(prev - 1, 0))
  }

  const onSubmit = () => {
    setSubmitted(true)
  }

  return (
    <div id={id} className={className}>
      <Card className="overflow-visible">
        <CardHeader>
          <CardTitle>Volunteer Application</CardTitle>
          <CardDescription>
            Complete the form below to join our volunteer team. This is a UI
            preview with client-side validation only.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <ol className="flex flex-wrap gap-4">
            {steps.map((step, index) => (
              <li key={step.id} className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex size-7 items-center justify-center rounded-full border text-xs font-semibold",
                    index <= stepIndex
                      ? "bg-primary text-primary-foreground border-primary"
                      : "text-muted-foreground border-muted"
                  )}
                  aria-current={index === stepIndex ? "step" : undefined}
                >
                  {index + 1}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium",
                    index === stepIndex
                      ? "text-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {step.title}
                </span>
              </li>
            ))}
          </ol>

          <div className="text-muted-foreground text-sm">
            {currentStep.description}
          </div>

          {submitted ? (
            <div className="bg-primary/10 text-primary rounded-lg border border-primary/20 p-4">
              Thanks for applying! We will follow up with next steps within two
              business days.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="space-y-6"
            >
              {currentStep.id === "personal" ? (
                <fieldset className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input
                      id="firstName"
                      {...register("firstName")}
                      aria-invalid={!!errors.firstName}
                      aria-describedby={
                        errors.firstName ? "firstName-error" : undefined
                      }
                    />
                    {errors.firstName ? (
                      <p
                        id="firstName-error"
                        role="alert"
                        className="text-destructive text-sm"
                      >
                        {errors.firstName.message}
                      </p>
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input
                      id="lastName"
                      {...register("lastName")}
                      aria-invalid={!!errors.lastName}
                      aria-describedby={
                        errors.lastName ? "lastName-error" : undefined
                      }
                    />
                    {errors.lastName ? (
                      <p
                        id="lastName-error"
                        role="alert"
                        className="text-destructive text-sm"
                      >
                        {errors.lastName.message}
                      </p>
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      autoComplete="email"
                      {...register("email")}
                      aria-invalid={!!errors.email}
                      aria-describedby={errors.email ? "email-error" : undefined}
                    />
                    {errors.email ? (
                      <p
                        id="email-error"
                        role="alert"
                        className="text-destructive text-sm"
                      >
                        {errors.email.message}
                      </p>
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      {...register("phone")}
                      aria-invalid={!!errors.phone}
                      aria-describedby={errors.phone ? "phone-error" : undefined}
                    />
                    {errors.phone ? (
                      <p
                        id="phone-error"
                        role="alert"
                        className="text-destructive text-sm"
                      >
                        {errors.phone.message}
                      </p>
                    ) : null}
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      autoComplete="address-level2"
                      {...register("city")}
                      aria-invalid={!!errors.city}
                      aria-describedby={errors.city ? "city-error" : undefined}
                    />
                    {errors.city ? (
                      <p
                        id="city-error"
                        role="alert"
                        className="text-destructive text-sm"
                      >
                        {errors.city.message}
                      </p>
                    ) : null}
                  </div>
                </fieldset>
              ) : null}

              {currentStep.id === "preferences" ? (
                <fieldset className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="role">Preferred role</Label>
                    <Controller
                      control={control}
                      name="role"
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="role"
                            className="w-full"
                            aria-invalid={!!errors.role}
                            aria-describedby={
                              errors.role ? "role-error" : undefined
                            }
                          >
                            <SelectValue placeholder="Select a role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="guest-services">
                              Guest services
                            </SelectItem>
                            <SelectItem value="stage-support">
                              Stage support
                            </SelectItem>
                            <SelectItem value="kids-zone">Kids zone</SelectItem>
                            <SelectItem value="artist-care">
                              Artist care
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.role ? (
                      <p
                        id="role-error"
                        role="alert"
                        className="text-destructive text-sm"
                      >
                        {errors.role.message}
                      </p>
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="availability">Availability</Label>
                    <Controller
                      control={control}
                      name="availability"
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="availability"
                            className="w-full"
                            aria-invalid={!!errors.availability}
                            aria-describedby={
                              errors.availability
                                ? "availability-error"
                                : undefined
                            }
                          >
                            <SelectValue placeholder="Select availability" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="friday">Friday</SelectItem>
                            <SelectItem value="saturday">Saturday</SelectItem>
                            <SelectItem value="sunday">Sunday</SelectItem>
                            <SelectItem value="full-weekend">
                              Full weekend
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.availability ? (
                      <p
                        id="availability-error"
                        role="alert"
                        className="text-destructive text-sm"
                      >
                        {errors.availability.message}
                      </p>
                    ) : null}
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="experience">Relevant experience</Label>
                    <Textarea
                      id="experience"
                      rows={4}
                      placeholder="Share any event, hospitality, or community experience."
                      {...register("experience")}
                      aria-invalid={!!errors.experience}
                      aria-describedby={
                        errors.experience ? "experience-error" : undefined
                      }
                    />
                    {errors.experience ? (
                      <p
                        id="experience-error"
                        role="alert"
                        className="text-destructive text-sm"
                      >
                        {errors.experience.message}
                      </p>
                    ) : null}
                  </div>
                </fieldset>
              ) : null}

              {currentStep.id === "confirmation" ? (
                <fieldset className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="tshirtSize">T-shirt size</Label>
                    <Controller
                      control={control}
                      name="tshirtSize"
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="tshirtSize"
                            className="w-full"
                            aria-invalid={!!errors.tshirtSize}
                            aria-describedby={
                              errors.tshirtSize ? "tshirt-error" : undefined
                            }
                          >
                            <SelectValue placeholder="Select a size" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="xs">XS</SelectItem>
                            <SelectItem value="sm">S</SelectItem>
                            <SelectItem value="md">M</SelectItem>
                            <SelectItem value="lg">L</SelectItem>
                            <SelectItem value="xl">XL</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    />
                    {errors.tshirtSize ? (
                      <p
                        id="tshirt-error"
                        role="alert"
                        className="text-destructive text-sm"
                      >
                        {errors.tshirtSize.message}
                      </p>
                    ) : null}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="emergencyContactName">
                      Emergency contact name
                    </Label>
                    <Input
                      id="emergencyContactName"
                      {...register("emergencyContactName")}
                      aria-invalid={!!errors.emergencyContactName}
                      aria-describedby={
                        errors.emergencyContactName
                          ? "emergencyName-error"
                          : undefined
                      }
                    />
                    {errors.emergencyContactName ? (
                      <p
                        id="emergencyName-error"
                        role="alert"
                        className="text-destructive text-sm"
                      >
                        {errors.emergencyContactName.message}
                      </p>
                    ) : null}
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <Label htmlFor="emergencyContactPhone">
                      Emergency contact phone
                    </Label>
                    <Input
                      id="emergencyContactPhone"
                      type="tel"
                      {...register("emergencyContactPhone")}
                      aria-invalid={!!errors.emergencyContactPhone}
                      aria-describedby={
                        errors.emergencyContactPhone
                          ? "emergencyPhone-error"
                          : undefined
                      }
                    />
                    {errors.emergencyContactPhone ? (
                      <p
                        id="emergencyPhone-error"
                        role="alert"
                        className="text-destructive text-sm"
                      >
                        {errors.emergencyContactPhone.message}
                      </p>
                    ) : null}
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex items-start gap-3">
                      <input
                        id="agreeToCode"
                        type="checkbox"
                        className={cn(
                          "border-input text-primary focus-visible:ring-ring focus-visible:ring-offset-background mt-1 size-4 rounded border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                          errors.agreeToCode && "border-destructive"
                        )}
                        {...register("agreeToCode")}
                        aria-invalid={!!errors.agreeToCode}
                        aria-describedby={
                          errors.agreeToCode ? "agree-error" : undefined
                        }
                      />
                      <Label htmlFor="agreeToCode" className="text-sm">
                        I agree to the volunteer code of conduct and safety
                        guidelines.
                      </Label>
                    </div>
                    {errors.agreeToCode ? (
                      <p
                        id="agree-error"
                        role="alert"
                        className="text-destructive mt-2 text-sm"
                      >
                        {errors.agreeToCode.message}
                      </p>
                    ) : null}
                  </div>
                </fieldset>
              ) : null}

              <div className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={stepIndex === 0}
                >
                  Back
                </Button>
                {isLastStep ? (
                  <Button type="submit" disabled={isSubmitting}>
                    Submit application
                  </Button>
                ) : (
                  <Button type="button" onClick={handleNext}>
                    Next step
                  </Button>
                )}
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
