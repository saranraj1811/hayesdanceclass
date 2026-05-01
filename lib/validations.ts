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

const optionalUrl = z
  .url("Please enter a valid URL.")
  .optional()
  .or(z.literal(""));

export const instructorEnquirySchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name."),
  email: z.email("Please enter a valid email address."),
  phone: z
    .string()
    .trim()
    .min(8, "Please enter a valid phone number.")
    .max(20, "Phone number is too long."),
  location: z.string().trim().min(2, "Please enter your area/location."),
  danceStyles: z.array(z.string()).min(1, "Please select at least one dance style."),
  availability: z.enum(["SATURDAY_MORNING", "SATURDAY_AFTERNOON", "SUNDAY", "FLEXIBLE"]),
  instagramUrl: optionalUrl,
  youtubeUrl: optionalUrl,
  facebookUrl: optionalUrl,
  portfolioUrl: optionalUrl,
  experienceMessage: z.string().trim().max(1000, "Message is too long.").optional().or(z.literal("")),
  website: z.string().optional(),
});

export type InstructorEnquiryInput = z.infer<typeof instructorEnquirySchema>;
