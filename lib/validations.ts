import { z } from "zod";

export const enquirySchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name."),
  email: z.email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(8, "Please enter a valid phone number.")
    .max(20, "Phone number is too long."),
  location: z.string().trim().min(2, "Please enter your area/location."),
  interestedFor: z.enum(["KIDS", "ADULTS", "BOTH"]),
  preferredTime: z.enum(["SATURDAY_MORNING", "SATURDAY_AFTERNOON", "SUNDAY", "FLEXIBLE"]),
  message: z.string().trim().max(600, "Message is too long.").optional().or(z.literal("")),
  website: z.string().optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
