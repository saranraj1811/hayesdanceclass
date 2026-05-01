import { Clock3, MapPin, MicVocal, Sparkles, Star, Users } from "lucide-react";
import { EnquiryForm } from "@/app/components/enquiry-form";

export default function Home() {
  return (
    <main className="relative isolate overflow-hidden bg-slate-950 text-white">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.35),_transparent_60%),radial-gradient(circle_at_bottom,_rgba(249,115,22,0.25),_transparent_45%),linear-gradient(120deg,#0f172a_10%,#3b0764_45%,#1e293b_100%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-40 [background:radial-gradient(circle_at_15%_20%,#fde047_0,_transparent_20%),radial-gradient(circle_at_85%_30%,#38bdf8_0,_transparent_18%),radial-gradient(circle_at_55%_85%,#f472b6_0,_transparent_22%)]" />

      <div className="absolute inset-0">
        <div className="floaty absolute left-[8%] top-[12%] text-fuchsia-200/80">
          <Sparkles size={30} />
        </div>
        <div className="floaty-delayed absolute right-[10%] top-[20%] text-orange-200/80">
          <MicVocal size={34} />
        </div>
        <div className="floaty absolute bottom-[22%] left-[15%] text-cyan-100/80">
          <Star size={26} />
        </div>
        <div className="floaty-delayed absolute bottom-[18%] right-[14%] text-pink-200/80">
          <Sparkles size={32} />
        </div>
      </div>

      <section className="mx-auto max-w-6xl px-4 pb-16 pt-20 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/15 bg-white/5 px-6 py-14 shadow-2xl backdrop-blur-md sm:px-10">
          <p className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-pink-100">
            <Sparkles size={14} /> Hayes & Harlington
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-black leading-tight sm:text-5xl lg:text-6xl">
            Bollywood & South Indian Dance Classes Coming Soon to Hayes
          </h1>
          <p className="mt-5 max-w-2xl text-base text-slate-100 sm:text-lg">
            Register your interest for weekly dance sessions for kids and adults in Hayes & Harlington.
          </p>
          <a
            href="#register"
            className="mt-8 inline-flex rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-500 px-8 py-3 text-sm font-bold uppercase tracking-wide shadow-[0_0_35px_rgba(236,72,153,0.6)] transition hover:scale-105 hover:shadow-[0_0_40px_rgba(249,115,22,0.85)]"
          >
            Register Interest
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-5 text-2xl font-bold">Why Join</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: "Kids & Adults", icon: Users },
            { title: "Bollywood & South Indian Styles", icon: MicVocal },
            { title: "Weekend Classes", icon: Clock3 },
            { title: "Hayes & Harlington Location", icon: MapPin },
          ].map((item) => (
            <article
              key={item.title}
              className="group rounded-2xl border border-white/15 bg-white/5 p-5 transition hover:-translate-y-1 hover:border-pink-300/60 hover:bg-white/10"
            >
              <item.icon className="text-fuchsia-200 transition group-hover:text-orange-200" size={24} />
              <h3 className="mt-3 font-semibold">{item.title}</h3>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-orange-200/30 bg-orange-100/10 p-7 backdrop-blur-md">
          <h2 className="text-2xl font-bold">Coming Soon - Early Access</h2>
          <p className="mt-3 max-w-3xl text-slate-100">
            We are planning a brand-new local dance class community in Hayes & Harlington. Your enquiry helps us shape
            class timings, age groups, and style mix for launch.
          </p>
        </div>
      </section>

      <section id="register" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-16 pt-2 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/20 bg-slate-900/60 p-4 shadow-2xl sm:p-8">
          <h2 className="mb-2 text-2xl font-bold">Register Your Interest</h2>
          <p className="mb-6 text-slate-200">Join the early list and be first to hear when classes open.</p>
          <EnquiryForm />
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-8 text-sm text-slate-300 sm:px-6 lg:px-8">
          <p>For local families and dance lovers looking for energetic, premium weekly sessions.</p>
          <p>Hayes & Harlington, West London</p>
        </div>
      </footer>
    </main>
  );
}
