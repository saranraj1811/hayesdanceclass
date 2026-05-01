"use client";

import { useState, type FormEvent } from "react";
import { OptionalTurnstile } from "@/app/components/optional-turnstile";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  interestedFor: "KIDS" | "ADULTS" | "BOTH";
  preferredTime: "SATURDAY_MORNING" | "SATURDAY_AFTERNOON" | "SUNDAY" | "FLEXIBLE";
  message: string;
  website: string;
  companyWebsite: string;
};

type EnquiryApiResponse = {
  success: boolean;
  message: string;
};

const initialState: FormState = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  interestedFor: "BOTH",
  preferredTime: "FLEXIBLE",
  message: "",
  website: "",
  companyWebsite: "",
};

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function EnquiryForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [formOpenedAt, setFormOpenedAt] = useState(() => Date.now());
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess(false);
    setSuccessMessage("");

    if (turnstileSiteKey && !turnstileToken) {
      setError("Please complete the verification step.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          formOpenedAt,
          turnstileToken: turnstileToken ?? undefined,
        }),
      });

      const payload = (await response.json()) as EnquiryApiResponse;
      if (!response.ok) {
        setError(payload.message ?? "Unable to submit your details. Please try again.");
        return;
      }

      setSuccessMessage(
        payload.message ??
          "Thank you! We've received your interest and will contact you when classes are ready.",
      );
      setSuccess(true);
      setForm(initialState);
      setFormOpenedAt(Date.now());
      setTurnstileToken(null);
      setTurnstileResetKey((key) => key + 1);
    } catch {
      setError("Network issue. Please check your internet and try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-3xl bg-white/10 p-6 backdrop-blur-xl">
      <input
        value={form.website}
        onChange={(event) => setForm((prev) => ({ ...prev, website: event.target.value }))}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        name="website"
        aria-hidden
      />
      <input
        value={form.companyWebsite}
        onChange={(event) => setForm((prev) => ({ ...prev, companyWebsite: event.target.value }))}
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        name="companyWebsite"
        aria-hidden
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          maxLength={100}
          value={form.fullName}
          onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
          placeholder="Full name"
          className="rounded-xl border border-white/30 bg-black/20 px-4 py-3 text-white placeholder:text-white/60 focus:border-fuchsia-300 focus:outline-none"
        />
        <input
          required
          type="email"
          maxLength={254}
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          placeholder="Email address"
          className="rounded-xl border border-white/30 bg-black/20 px-4 py-3 text-white placeholder:text-white/60 focus:border-fuchsia-300 focus:outline-none"
        />
        <input
          required
          maxLength={20}
          value={form.phone}
          onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
          placeholder="Phone number"
          className="rounded-xl border border-white/30 bg-black/20 px-4 py-3 text-white placeholder:text-white/60 focus:border-fuchsia-300 focus:outline-none"
        />
        <input
          required
          maxLength={100}
          value={form.location}
          onChange={(event) => setForm((prev) => ({ ...prev, location: event.target.value }))}
          placeholder="Location / Area"
          className="rounded-xl border border-white/30 bg-black/20 px-4 py-3 text-white placeholder:text-white/60 focus:border-fuchsia-300 focus:outline-none"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <select
          value={form.interestedFor}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, interestedFor: event.target.value as FormState["interestedFor"] }))
          }
          className="rounded-xl border border-white/30 bg-black/20 px-4 py-3 text-white focus:border-fuchsia-300 focus:outline-none"
        >
          <option value="KIDS" className="text-black">
            Kids
          </option>
          <option value="ADULTS" className="text-black">
            Adults
          </option>
          <option value="BOTH" className="text-black">
            Both
          </option>
        </select>

        <div className="space-y-2">
          <select
            value={form.preferredTime}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, preferredTime: event.target.value as FormState["preferredTime"] }))
            }
            className="w-full rounded-xl border border-white/30 bg-black/20 px-4 py-3 text-white focus:border-fuchsia-300 focus:outline-none"
          >
            <option value="SATURDAY_MORNING" className="text-black">
              Saturday Morning (10 AM - 12 PM)
            </option>
            <option value="SATURDAY_AFTERNOON" className="text-black">
              Saturday Afternoon (12 PM - 2 PM)
            </option>
            <option value="SUNDAY" className="text-black">
              Sunday (open to)
            </option>
            <option value="FLEXIBLE" className="text-black">
              Flexible
            </option>
          </select>
          <p className="text-xs text-slate-300">
            Planned start is Saturday sessions in Hayes. Final timing will be confirmed based on demand.
          </p>
        </div>
      </div>

      <textarea
        value={form.message}
        maxLength={1000}
        onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
        placeholder="Message (optional)"
        rows={4}
        className="w-full rounded-xl border border-white/30 bg-black/20 px-4 py-3 text-white placeholder:text-white/60 focus:border-fuchsia-300 focus:outline-none"
      />

      <OptionalTurnstile siteKey={turnstileSiteKey} onToken={setTurnstileToken} resetKey={turnstileResetKey} />

      <button
        type="submit"
        disabled={isSubmitting || (Boolean(turnstileSiteKey) && !turnstileToken)}
        className="w-full rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 px-6 py-3 font-semibold text-white shadow-[0_0_25px_rgba(236,72,153,0.6)] transition hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(249,115,22,0.8)] disabled:cursor-not-allowed disabled:opacity-80"
      >
        {isSubmitting ? "Submitting..." : "Submit Interest"}
      </button>

      {success ? (
        <p className="rounded-xl border border-emerald-300/40 bg-emerald-500/20 px-4 py-3 text-sm text-emerald-100">
          {successMessage}
        </p>
      ) : null}

      {error ? (
        <p className="rounded-xl border border-red-300/40 bg-red-500/20 px-4 py-3 text-sm text-red-100">{error}</p>
      ) : null}
    </form>
  );
}
