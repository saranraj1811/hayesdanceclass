"use client";

import { useState } from "react";
import { EnquiryForm } from "@/app/components/enquiry-form";
import { InstructorForm } from "@/app/components/instructor-form";

type InterestTab = "student" | "instructor";

export function InterestTabs() {
  const [activeTab, setActiveTab] = useState<InterestTab>("student");

  return (
    <div className="w-full space-y-4">
      <div className="grid w-full gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setActiveTab("student")}
          className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
            activeTab === "student"
              ? "border-fuchsia-300 bg-fuchsia-500/20 shadow-[0_0_20px_rgba(217,70,239,0.35)]"
              : "border-white/20 bg-white/5 hover:bg-white/10"
          }`}
        >
          <p className="text-sm font-semibold text-white">Join as Student / Parent</p>
          <p className="text-xs text-slate-200">Register your child or yourself for upcoming classes.</p>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("instructor")}
          className={`w-full rounded-2xl border px-4 py-3 text-left transition ${
            activeTab === "instructor"
              ? "border-amber-300 bg-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.35)]"
              : "border-white/20 bg-white/5 hover:bg-white/10"
          }`}
        >
          <p className="text-sm font-semibold text-white">Apply as Instructor</p>
          <p className="text-xs text-slate-200">Share your dance teaching profile and availability.</p>
        </button>
      </div>

      {activeTab === "student" ? <EnquiryForm /> : <InstructorForm />}
    </div>
  );
}
