export type AntiSpamBlockReason = "honeypot" | "turnstile" | "timing" | "rate_limit" | "duplicate";

export function warnBlockedSubmission(form: "student" | "instructor", reason: AntiSpamBlockReason): void {
  console.warn(`[anti-spam] blocked ${form} submission: ${reason}`);
}
