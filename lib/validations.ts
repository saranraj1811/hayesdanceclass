import { z } from "zod";

const SUSPICIOUS_URL = /https?:\/\/|www\.\w|\bftp:\b|javascript:/i;

function textHasSuspiciousUrl(value: string | undefined): boolean {
  if (!value || value.trim() === "") return false;
  return SUSPICIOUS_URL.test(value);
}

const phoneSchema = z
  .string()
  .trim()
  .min(8, "Please enter a valid phone number.")
  .max(20, "Phone number is too long.")
  .refine((value) => {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 8 && digits.length <= 15;
  }, "Please enter a valid UK or international phone number.");

const optionalUrl = z
  .url("Please enter a valid URL.")
  .optional()
  .or(z.literal(""));

const honeypotField = z.string().max(256).optional();

export const enquirySchema = z
  .object({
    fullName: z.string().trim().min(2, "Please enter your full name.").max(100, "Name is too long."),
    email: z.email("Please enter a valid email address."),
    phone: phoneSchema,
    location: z.string().trim().min(2, "Please enter your area/location.").max(100, "Location is too long."),
    interestedFor: z.enum(["KIDS", "ADULTS", "BOTH"]),
    preferredTime: z.enum(["SATURDAY_MORNING", "SATURDAY_AFTERNOON", "SUNDAY", "FLEXIBLE"]),
    message: z.string().trim().max(1000, "Message is too long.").optional().or(z.literal("")),
    website: honeypotField,
    companyWebsite: honeypotField,
    formOpenedAt: z.number().int().positive("Invalid form timing."),
    turnstileToken: z.string().max(4096).optional(),
  })
  .superRefine((data, ctx) => {
    if (textHasSuspiciousUrl(data.message)) {
      ctx.addIssue({
        code: "custom",
        message: "Links are not allowed in the message field.",
        path: ["message"],
      });
    }
  });

export type EnquiryInput = z.infer<typeof enquirySchema>;

export const instructorEnquirySchema = z
  .object({
    fullName: z.string().trim().min(2, "Please enter your full name.").max(100, "Name is too long."),
    email: z.email("Please enter a valid email address."),
    phone: phoneSchema,
    location: z.string().trim().min(2, "Please enter your area/location.").max(100, "Location is too long."),
    danceStyles: z
      .array(z.string().min(1).max(40))
      .min(1, "Please select at least one dance style.")
      .max(12, "Too many styles selected."),
    availability: z.enum(["SATURDAY_MORNING", "SATURDAY_AFTERNOON", "SUNDAY", "FLEXIBLE"]),
    instagramUrl: optionalUrl,
    youtubeUrl: optionalUrl,
    facebookUrl: optionalUrl,
    portfolioUrl: optionalUrl,
    experienceMessage: z.string().trim().max(1000, "Message is too long.").optional().or(z.literal("")),
    website: honeypotField,
    companyWebsite: honeypotField,
    formOpenedAt: z.number().int().positive("Invalid form timing."),
    turnstileToken: z.string().max(4096).optional(),
  })
  .superRefine((data, ctx) => {
    if (textHasSuspiciousUrl(data.experienceMessage)) {
      ctx.addIssue({
        code: "custom",
        message: "Links are not allowed in the experience message.",
        path: ["experienceMessage"],
      });
    }
  });

export type InstructorEnquiryInput = z.infer<typeof instructorEnquirySchema>;
