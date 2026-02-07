import { z } from "zod"

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif"]
const MIN_IMAGE_SIZE = 50 * 1024

const optionalString = z.string().optional().or(z.literal(""))

const optionalUrl = z
  .string()
  .trim()
  .optional()
  .or(z.literal(""))
  .refine((value) => {
    if (!value) return true
    try {
      new URL(value)
      return true
    } catch {
      return false
    }
  }, "Enter a valid URL.")

const fileListSchema = z.custom<FileList | undefined | null>()

const optionalImageSchema = fileListSchema
  .refine(
    (files) =>
      !files ||
      Array.from(files).every((file) => file.size >= MIN_IMAGE_SIZE),
    "Image must be at least 50KB."
  )
  .refine(
    (files) =>
      !files ||
      Array.from(files).every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
    "Upload a JPEG, JPG, PNG, or GIF file."
  )

export const volunteerSchema = z
  .object({
    firstName: z.string().min(1, "First name is required."),
    lastName: z.string().min(1, "Last name is required."),
    phone: optionalString,
    email: z.string().email("Enter a valid email address."),
    streetAddress: optionalString,
    city: optionalString,
    province: optionalString,
    postalCode: optionalString,
    emergencyContactName: optionalString,
    emergencyPhone: optionalString,
    profileImage: optionalImageSchema.optional(),
    underThirty: z.string().min(1, "Select an option."),
    countryOfOrigin: z.string().min(1, "Country of origin is required."),
    ethnicity: optionalString,
    visibleMinority: optionalString,
    indigenous: z.string().min(1, "Select an option."),
    gender: optionalString,
    languages: z.string().min(2, "Please tell us what languages you know."),
    experience: z
      .string()
      .min(10, "Please share your experience, skills, hobbies, and interests.")
      .max(3000, "Please keep this under 3000 characters."),
    socialMarketingVolunteer: z.string().min(1, "Select an option."),
    twitter: optionalUrl,
    facebook: optionalUrl,
    instagram: optionalUrl,
    tiktok: optionalUrl,
    heardAbout: z.string().min(1, "Select where you heard about us."),
    tshirtSize: z.string().min(1, "Select a t-shirt size."),
    termsAcknowledgement: z
      .boolean()
      .refine((value) => value, { message: "Please accept the terms." }),
    agreementName: z.string().min(2, "Please enter your name to confirm."),
  })

export type VolunteerValues = z.infer<typeof volunteerSchema>

export const volunteerDefaultValues: VolunteerValues = {
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  streetAddress: "",
  city: "",
  province: "",
  postalCode: "",
  emergencyContactName: "",
  emergencyPhone: "",
  profileImage: undefined,
  underThirty: "",
  countryOfOrigin: "",
  ethnicity: "",
  visibleMinority: "",
  indigenous: "",
  gender: "",
  languages: "",
  experience: "",
  socialMarketingVolunteer: "",
  twitter: "",
  facebook: "",
  instagram: "",
  tiktok: "",
  heardAbout: "",
  tshirtSize: "",
  termsAcknowledgement: false,
  agreementName: "",
}
