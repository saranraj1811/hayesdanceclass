"use client";

import { useState, type FormEvent } from "react";
import { OptionalTurnstile } from "@/app/components/optional-turnstile";

type InstructorFormState = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  danceStyles: string[];
  availability: "SATURDAY_MORNING" | "SATURDAY_AFTERNOON" | "SUNDAY" | "FLEXIBLE";
  instagramUrl: string;
  youtubeUrl: string;
  facebookUrl: string;
  portfolioUrl: string;
  experienceMessage: string;
  website: string;
  companyWebsite: string;
};

type ApiResponse = {
  success: boolean;
  message: string;
};

const STYLE_OPTIONS = ["Bollywood", "South Indian", "Western", "Hip Hop", "Contemporary", "Kids Dance", "Other"];

const initialState: InstructorFormState = {
  fullName: "",
  email: "",
  phone: "",
  location: "",
  danceStyles: [],
  availability: "FLEXIBLE",
  instagramUrl: "",
  youtubeUrl: "",
  facebookUrl: "",
  portfolioUrl: "",
  experienceMessage: "",
  website: "",
  companyWebsite: "",
};

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export function InstructorForm() {
  const [form, setForm] = useState<InstructorFormState>(initialState);
  const [formOpenedAt, setFormOpenedAt] = useState(() => Date.now());
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [turnstileResetKey, setTurnstileResetKey] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  function toggleStyle(style: string) {
    setForm((prev) => {
      const exists = prev.danceStyles.includes(style);
      return {
        ...prev,
        danceStyles: exists ? prev.danceStyles.filter((value) => value !== style) : [...prev.danceStyles, style],
      };
    });
  }

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
      const response = await fetch("/api/instructor-enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          formOpenedAt,
          turnstileToken: turnstileToken ?? undefined,
        }),
      });

      const payload = (await response.json()) as ApiResponse;
      if (!response.ok) {
        setError(payload.message ?? "Unable to submit your details. Please try again.");
        return;
      }

      setSuccessMessage(
        payload.message ?? "Thank you! Your instructor interest has been submitted successfully.",
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

      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-100">Dance styles taught</p>
        <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {STYLE_OPTIONS.map((style) => {
            const selected = form.danceStyles.includes(style);
            return (
              <label
                key={style}
                className={`rounded-xl border px-3 py-2 text-sm transition ${
                  selected
                    ? "border-fuchsia-300 bg-fuchsia-500/25 text-white"
                    : "border-white/25 bg-black/20 text-slate-100 hover:border-white/45"
                }`}
              >
                <input
                  type="checkbox"
                  checked={selected}
                  onChange={() => toggleStyle(style)}
                  className="mr-2 accent-fuchsia-400"
                />
                {style}
              </label>
            );
          })}
        </div>
      </div>

      <select
        required
        value={form.availability}
        onChange={(event) =>
          setForm((prev) => ({ ...prev, availability: event.target.value as InstructorFormState["availability"] }))
        }
        className="w-full rounded-xl border border-white/30 bg-black/20 px-4 py-3 text-white focus:border-fuchsia-300 focus:outline-none"
      >
        <option value="SATURDAY_MORNING" className="text-black">
          Saturday Morning
        </option>
        <option value="SATURDAY_AFTERNOON" className="text-black">
          Saturday Afternoon
        </option>
        <option value="SUNDAY" className="text-black">
          Sunday
        </option>
        <option value="FLEXIBLE" className="text-black">
          Flexible
        </option>
      </select>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          value={form.instagramUrl}
          onChange={(event) => setForm((prev) => ({ ...prev, instagramUrl: event.target.value }))}
          placeholder="Instagram link (optional)"
          maxLength={500}
          className="rounded-xl border border-white/30 bg-black/20 px-4 py-3 text-white placeholder:text-white/60 focus:border-fuchsia-300 focus:outline-none"
        />
        <input
          value={form.youtubeUrl}
          onChange={(event) => setForm((prev) => ({ ...prev, youtubeUrl: event.target.value }))}
          placeholder="YouTube link (optional)"
          maxLength={500}
          className="rounded-xl border border-white/30 bg-black/20 px-4 py-3 text-white placeholder:text-white/60 focus:border-fuchsia-300 focus:outline-none"
        />
        <input
          value={form.facebookUrl}
          onChange={(event) => setForm((prev) => ({ ...prev, facebookUrl: event.target.value }))}
          placeholder="Facebook link (optional)"
          maxLength={500}
          className="rounded-xl border border-white/30 bg-black/20 px-4 py-3 text-white placeholder:text-white/60 focus:border-fuchsia-300 focus:outline-none"
        />
        <input
          value={form.portfolioUrl}
          onChange={(event) => setForm((prev) => ({ ...prev, portfolioUrl: event.target.value }))}
          placeholder="Website / Portfolio link (optional)"
          maxLength={500}
          className="rounded-xl border border-white/30 bg-black/20 px-4 py-3 text-white placeholder:text-white/60 focus:border-fuchsia-300 focus:outline-none"
        />
      </div>

      <textarea
        value={form.experienceMessage}
        maxLength={1000}
        onChange={(event) => setForm((prev) => ({ ...prev, experienceMessage: event.target.value }))}
        placeholder="Tell us about your teaching experience"
        rows={4}
        className="w-full rounded-xl border border-white/30 bg-black/20 px-4 py-3 text-white placeholder:text-white/60 focus:border-fuchsia-300 focus:outline-none"
      />

      <OptionalTurnstile siteKey={turnstileSiteKey} onToken={setTurnstileToken} resetKey={turnstileResetKey} />

      <button
        type="submit"
        disabled={isSubmitting || (Boolean(turnstileSiteKey) && !turnstileToken)}
        className="w-full rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-amber-400 px-6 py-3 font-semibold text-white shadow-[0_0_25px_rgba(217,70,239,0.6)] transition hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(245,158,11,0.8)] disabled:cursor-not-allowed disabled:opacity-80"
      >
        {isSubmitting ? "Submitting..." : "Submit Instructor Interest"}
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
