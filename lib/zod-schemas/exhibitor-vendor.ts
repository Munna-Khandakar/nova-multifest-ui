import { z } from "zod"

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/gif"]
const MIN_IMAGE_SIZE = 50 * 1024

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

const requiredImageSchema = fileListSchema
  .refine((files) => files && files.length > 0, "Profile image is required.")
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
    "Upload a JPG, JPEG, PNG, or GIF file."
  )

const optionalMediaSchema = fileListSchema.refine(
  (files) =>
    !files ||
    Array.from(files).every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
  "Upload a JPG, JPEG, PNG, or GIF file."
)

export const exhibitorVendorSchema = z
  .object({
    boothTypes: z.array(z.string()).min(1, "Select at least one booth type."),
    additionalCircuits: z.string().min(1, "Select the number of circuits."),
    rulesAcknowledgement: z
      .boolean()
      .refine((value) => value, { message: "Please confirm the vendor rules." }),
    businessName: z.string().min(2, "Business name is required."),
    businessAlias: z.string().optional().or(z.literal("")),
    culturalRepresented: z.string().min(2, "Cultural representation is required."),
    profileImage: requiredImageSchema,
    boothDescription: z
      .string()
      .min(10, "Please describe your booth.")
      .max(3000, "Please keep this under 3000 characters."),
    mediaUpload: optionalMediaSchema.optional(),
    businessStreet: z.string().min(2, "Street address is required."),
    businessCity: z.string().min(2, "City is required."),
    businessProvince: z.string().min(2, "Province is required."),
    businessPostalCode: z.string().min(2, "Postal code is required."),
    invoiceSameAsBusiness: z.boolean().optional(),
    invoiceStreet: z.string().optional().or(z.literal("")),
    invoiceCity: z.string().optional().or(z.literal("")),
    invoiceProvince: z.string().optional().or(z.literal("")),
    invoicePostalCode: z.string().optional().or(z.literal("")),
    invoiceEmail: z.string().email("Enter a valid invoice email."),
    invoiceEmailConfirm: z.string().email("Enter a valid email address."),
    couponCode: z.string().optional().or(z.literal("")),
    contactName: z.string().min(2, "Full name is required."),
    contactEmail: z.string().email("Enter a valid email address."),
    contactEmailConfirm: z.string().email("Enter a valid email address."),
    contactPhone: z.string().min(6, "Phone number is required."),
    website: optionalUrl,
    twitter: optionalUrl,
    facebook: optionalUrl,
    instagram: optionalUrl,
    tiktok: optionalUrl,
    termsAcknowledgement: z
      .boolean()
      .refine((value) => value, { message: "Please accept the terms." }),
    agreementName: z.string().min(2, "Please enter your name to confirm."),
  })
  .refine((data) => data.contactEmail === data.contactEmailConfirm, {
    path: ["contactEmailConfirm"],
    message: "Email addresses must match.",
  })
  .refine((data) => data.invoiceEmail === data.invoiceEmailConfirm, {
    path: ["invoiceEmailConfirm"],
    message: "Email addresses must match.",
  })

export type ExhibitorVendorValues = z.infer<typeof exhibitorVendorSchema>

export const exhibitorVendorDefaultValues: ExhibitorVendorValues = {
  boothTypes: [],
  additionalCircuits: "",
  rulesAcknowledgement: false,
  businessName: "",
  businessAlias: "",
  culturalRepresented: "",
  profileImage: undefined,
  boothDescription: "",
  mediaUpload: undefined,
  businessStreet: "",
  businessCity: "",
  businessProvince: "",
  businessPostalCode: "",
  invoiceSameAsBusiness: false,
  invoiceStreet: "",
  invoiceCity: "",
  invoiceProvince: "",
  invoicePostalCode: "",
  invoiceEmail: "",
  invoiceEmailConfirm: "",
  couponCode: "",
  contactName: "",
  contactEmail: "",
  contactEmailConfirm: "",
  contactPhone: "",
  website: "",
  twitter: "",
  facebook: "",
  instagram: "",
  tiktok: "",
  termsAcknowledgement: false,
  agreementName: "",
}
