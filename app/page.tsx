import Image from "next/image";
import { Clock3, MapPin, MicVocal, ShieldCheck, Sparkles, Star, UserRoundCheck, Users } from "lucide-react";
import { HeroDanceVideo } from "@/app/components/hero-dance-video";
import { InterestTabs } from "@/app/components/interest-tabs";

export default function Home() {
  const buildMarker = (process.env.VERCEL_GIT_COMMIT_SHA ?? "local-build").slice(0, 7);

  return (
    <main className="relative isolate bg-slate-950 text-white">
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
        <div className="grid items-center gap-8 rounded-3xl border border-white/15 bg-white/5 px-6 py-10 shadow-2xl backdrop-blur-md sm:px-10 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
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
          <HeroDanceVideo />
        </div>
      </section>

      <section id="register" className="mx-auto max-w-6xl scroll-mt-20 px-4 pb-16 pt-2 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-white/20 bg-slate-900/60 p-4 shadow-2xl sm:p-8">
          <h2 className="mb-2 text-2xl font-bold">Register Your Interest</h2>
          <p className="text-slate-200">
            Join the early list as a student/parent or register your profile as an instructor.
          </p>
          <p className="mb-3 mt-2 rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-slate-100">
            Choose a pathway below to register as a family/student or as an instructor.
          </p>
          <p className="mb-6 text-xs text-slate-300">Tabs are fully interactive and switch forms instantly.</p>
          <InterestTabs />
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-emerald-200/25 bg-emerald-500/10 p-6 backdrop-blur-md">
          <h2 className="text-2xl font-bold text-white">Proposed Class Location</h2>
          <p className="mt-3 text-slate-100">
            We are planning sessions around Harlington School, Pinkwell Road, Hayes.
          </p>
          <p className="mt-2 text-sm text-slate-200">
            Final venue and timing will be confirmed before classes begin.
          </p>
          <div className="mt-5 rounded-2xl border border-white/20 bg-slate-900/45 p-4">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-white">
              <MapPin size={16} />
              Harlington School, Pinkwell Road, Hayes
            </p>
            <a
              href="https://maps.app.goo.gl/UBwWpoD9gFScy7kT7"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 inline-flex rounded-full bg-gradient-to-r from-emerald-500 to-cyan-400 px-5 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-110"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <h2 className="mb-5 text-2xl font-bold">Why Join</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              title: "Kids & Adults",
              icon: Users,
              image: "/images/dance-kids.svg",
              alt: "Kids dance class silhouettes with colourful stage lights",
            },
            {
              title: "Bollywood & South Indian Styles",
              icon: MicVocal,
              image: "/images/bollywood-style.svg",
              alt: "Bollywood style dance visuals with vibrant colors",
            },
            {
              title: "Weekend Classes",
              icon: Clock3,
              image: "/images/dance-adults.svg",
              alt: "Adults dance group with dramatic warm stage lighting",
            },
            {
              title: "Hayes & Harlington Location",
              icon: MapPin,
              image: "/images/south-indian-style.svg",
              alt: "South Indian dance inspired scene with festival colors",
            },
          ].map((item) => (
            <article
              key={item.title}
              className="group overflow-hidden rounded-2xl border border-white/15 bg-white/5 transition hover:-translate-y-1 hover:border-pink-300/60 hover:bg-white/10"
            >
              <div className="relative h-36">
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent" />
              </div>
              <div className="p-5">
                <item.icon className="text-fuchsia-200 transition group-hover:text-orange-200" size={24} />
                <h3 className="mt-3 font-semibold">{item.title}</h3>
              </div>
            </article>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 bg-slate-950/80">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                title: "Privacy & GDPR",
                icon: ShieldCheck,
                text: "We only collect the details you submit so we can contact you about the proposed dance classes or instructor opportunities. Your information will not be sold or shared for marketing purposes. You can request removal of your details at any time.",
              },
              {
                title: "Children & Safeguarding",
                icon: UserRoundCheck,
                text: "As classes may involve children, safeguarding and responsible supervision will be treated as a priority. Before classes begin, we aim to confirm appropriate supervision, class rules, parent/guardian communication, and instructor suitability checks where required.",
              },
              {
                title: "Health & Safety",
                icon: ShieldCheck,
                text: "Dance involves physical movement. Sessions will be planned with reasonable warm-up, safe spacing, age-appropriate routines, and clear guidance. Parents/guardians should inform us of any relevant medical or accessibility needs before participation.",
              },
              {
                title: "Venue & Timing",
                icon: MapPin,
                text: "Venue, timings, class levels, pricing, and instructor details will be confirmed before launch. Registering interest does not create a paid booking.",
              },
              {
                title: "Contact / Data Removal",
                icon: MicVocal,
                text: "To update or remove your enquiry details, please contact us using the contact details provided on this website.",
              },
            ].map((item) => (
              <article key={item.title} className="rounded-2xl border border-white/15 bg-white/5 p-4 text-slate-200">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                  <item.icon size={16} />
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>
          <div className="mt-6 space-y-1 text-center">
            <p className="text-xs text-slate-500">Last updated build: {buildMarker}</p>
            <p className="text-xs text-slate-400">© 2026 Hayes Dance Class. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
