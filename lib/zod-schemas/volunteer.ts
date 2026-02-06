import { z } from "zod"

export const volunteerApplicationSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters."),
  lastName: z.string().min(2, "Last name must be at least 2 characters."),
  email: z.string().email("Enter a valid email address."),
  phone: z.string().min(10, "Enter a valid phone number."),
  city: z.string().min(2, "City is required."),
  role: z.string().min(1, "Select a preferred role."),
  availability: z.string().min(1, "Select your availability."),
  experience: z
    .string()
    .max(500, "Keep this under 500 characters.")
    .optional()
    .or(z.literal("")),
  tshirtSize: z.string().min(1, "Select a t-shirt size."),
  emergencyContactName: z
    .string()
    .min(2, "Provide an emergency contact name."),
  emergencyContactPhone: z
    .string()
    .min(10, "Provide an emergency contact phone number."),
  agreeToCode: z.boolean().refine((value) => value, {
    message: "Please agree to the volunteer code of conduct.",
  }),
})

export type VolunteerApplicationValues = z.infer<
  typeof volunteerApplicationSchema
>

export const volunteerDefaultValues: VolunteerApplicationValues = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  city: "",
  role: "",
  availability: "",
  experience: "",
  tshirtSize: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  agreeToCode: false,
}
