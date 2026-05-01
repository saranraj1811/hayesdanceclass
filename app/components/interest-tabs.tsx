"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { MicVocal, Users } from "lucide-react";
import { EnquiryForm } from "@/app/components/enquiry-form";
import { InstructorForm } from "@/app/components/instructor-form";

type InterestTab = "student" | "instructor";

export function InterestTabs() {
  const searchParams = useSearchParams();
  const [activeTab, setActiveTab] = useState<InterestTab>(() =>
    searchParams.get("tab") === "instructor" ? "instructor" : "student",
  );

  return (
    <div className="w-full space-y-5">
      <div className="grid w-full gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setActiveTab("student")}
          aria-pressed={activeTab === "student"}
          className={`group flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
            activeTab === "student"
              ? "border-fuchsia-300/80 bg-gradient-to-r from-fuchsia-500/30 via-fuchsia-500/15 to-transparent shadow-[0_0_25px_rgba(217,70,239,0.45)]"
              : "border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10"
          }`}
        >
          <span
            className={`grid h-10 w-10 place-items-center rounded-xl text-white transition ${
              activeTab === "student"
                ? "bg-gradient-to-br from-fuchsia-500 to-pink-500 shadow-[0_0_15px_rgba(217,70,239,0.6)]"
                : "bg-white/10 text-slate-200 group-hover:bg-white/15"
            }`}
          >
            <Users size={18} />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-semibold text-white">Join as Student / Parent</span>
            <span className="block text-xs text-slate-200">Register your child or yourself for upcoming classes.</span>
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("instructor")}
          aria-pressed={activeTab === "instructor"}
          className={`group flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition ${
            activeTab === "instructor"
              ? "border-amber-300/80 bg-gradient-to-r from-amber-500/25 via-orange-500/15 to-transparent shadow-[0_0_25px_rgba(245,158,11,0.45)]"
              : "border-white/15 bg-white/5 hover:border-white/30 hover:bg-white/10"
          }`}
        >
          <span
            className={`grid h-10 w-10 place-items-center rounded-xl text-white transition ${
              activeTab === "instructor"
                ? "bg-gradient-to-br from-amber-500 to-orange-500 shadow-[0_0_15px_rgba(245,158,11,0.6)]"
                : "bg-white/10 text-slate-200 group-hover:bg-white/15"
            }`}
          >
            <MicVocal size={18} />
          </span>
          <span className="flex-1">
            <span className="block text-sm font-semibold text-white">Apply as Instructor</span>
            <span className="block text-xs text-slate-200">Share your dance teaching profile and availability.</span>
          </span>
        </button>
      </div>

      {activeTab === "student" ? <EnquiryForm /> : <InstructorForm />}
    </div>
  );
}
