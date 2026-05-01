"use client";

import { useState, type FormEvent } from "react";

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  interestedFor: "KIDS" | "ADULTS" | "BOTH";
  preferredTime: "SATURDAY_MORNING" | "SATURDAY_AFTERNOON" | "SUNDAY" | "FLEXIBLE";
  message: string;
  website: string;
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
};

export function EnquiryForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess(false);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const payload = (await response.json()) as EnquiryApiResponse;
      if (!response.ok) {
        setError(payload.message ?? "Unable to submit your details. Please try again.");
        return;
      }

      setSuccess(true);
      setForm(initialState);
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

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          value={form.fullName}
          onChange={(event) => setForm((prev) => ({ ...prev, fullName: event.target.value }))}
          placeholder="Full name"
          className="rounded-xl border border-white/30 bg-black/20 px-4 py-3 text-white placeholder:text-white/60 focus:border-fuchsia-300 focus:outline-none"
        />
        <input
          required
          type="email"
          value={form.email}
          onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))}
          placeholder="Email address"
          className="rounded-xl border border-white/30 bg-black/20 px-4 py-3 text-white placeholder:text-white/60 focus:border-fuchsia-300 focus:outline-none"
        />
        <input
          required
          value={form.phone}
          onChange={(event) => setForm((prev) => ({ ...prev, phone: event.target.value }))}
          placeholder="Phone number"
          className="rounded-xl border border-white/30 bg-black/20 px-4 py-3 text-white placeholder:text-white/60 focus:border-fuchsia-300 focus:outline-none"
        />
        <input
          required
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

        <select
          value={form.preferredTime}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, preferredTime: event.target.value as FormState["preferredTime"] }))
          }
          className="rounded-xl border border-white/30 bg-black/20 px-4 py-3 text-white focus:border-fuchsia-300 focus:outline-none"
        >
          <option value="SATURDAY_MORNING" className="text-black">
            Saturday morning
          </option>
          <option value="SATURDAY_AFTERNOON" className="text-black">
            Saturday afternoon
          </option>
          <option value="SUNDAY" className="text-black">
            Sunday
          </option>
          <option value="FLEXIBLE" className="text-black">
            Flexible
          </option>
        </select>
      </div>

      <textarea
        value={form.message}
        onChange={(event) => setForm((prev) => ({ ...prev, message: event.target.value }))}
        placeholder="Message (optional)"
        rows={4}
        className="w-full rounded-xl border border-white/30 bg-black/20 px-4 py-3 text-white placeholder:text-white/60 focus:border-fuchsia-300 focus:outline-none"
      />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 px-6 py-3 font-semibold text-white shadow-[0_0_25px_rgba(236,72,153,0.6)] transition hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(249,115,22,0.8)] disabled:cursor-not-allowed disabled:opacity-80"
      >
        {isSubmitting ? "Submitting..." : "Submit Interest"}
      </button>

      {success ? (
        <p className="rounded-xl border border-emerald-300/40 bg-emerald-500/20 px-4 py-3 text-sm text-emerald-100">
          Thank you! We&apos;ve received your interest and will contact you when classes are ready.
        </p>
      ) : null}

      {error ? (
        <p className="rounded-xl border border-red-300/40 bg-red-500/20 px-4 py-3 text-sm text-red-100">{error}</p>
      ) : null}
    </form>
  );
}
