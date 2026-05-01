import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import {
  Heart,
  Mail,
  MapPin,
  MicVocal,
  PoundSterling,
  ShieldCheck,
  Sparkles,
  Star,
  UserRoundCheck,
  Users,
} from "lucide-react";

function InstagramIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19.04C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.29 29 29 0 0 0-.46-5.33z" />
      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
    </svg>
  );
}

function FacebookIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
import { HeroDanceImage } from "@/app/components/hero-dance-video";
import { InterestTabs } from "@/app/components/interest-tabs";
import { SiteHeader } from "@/app/components/site-header";

export default function Home() {
  return (
    <main className="relative w-full min-h-screen overflow-x-hidden bg-[#160020] text-white">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(236,72,153,0.32),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(255,122,24,0.18),_transparent_50%),linear-gradient(140deg,#1a0027_5%,#3b0764_40%,#1a0030_75%,#2c003e_100%)]" />
      <div className="pointer-events-none absolute inset-0 -z-10 opacity-50 [background:radial-gradient(circle_at_18%_22%,rgba(217,70,239,0.55)_0,_transparent_22%),radial-gradient(circle_at_82%_28%,rgba(255,122,24,0.45)_0,_transparent_20%),radial-gradient(circle_at_55%_85%,rgba(244,114,182,0.35)_0,_transparent_24%)]" />

      <div className="pointer-events-none absolute inset-0 -z-10 hidden md:block">
        <div className="floaty absolute left-[7%] top-[14%] text-fuchsia-200/60">
          <Sparkles size={28} />
        </div>
        <div className="floaty-delayed absolute right-[9%] top-[22%] text-orange-200/60">
          <MicVocal size={32} />
        </div>
        <div className="floaty absolute bottom-[26%] left-[14%] text-cyan-100/55">
          <Star size={24} />
        </div>
        <div className="floaty-delayed absolute bottom-[20%] right-[15%] text-pink-200/60">
          <Sparkles size={30} />
        </div>
      </div>

      <SiteHeader />

      <div className="relative z-10">
        {/* HERO */}
        <section
          id="home"
          className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 pb-16 pt-12 sm:px-6 lg:px-8 lg:pt-16"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-fuchsia-300/40 bg-fuchsia-500/15 px-4 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-pink-100">
                <MapPin size={13} /> Hayes & Harlington
              </p>
              <h1 className="mt-5 text-4xl font-black leading-[1.05] md:text-6xl">
                <span className="block text-white">Bollywood &</span>
                <span className="block text-white">South Indian</span>
                <span className="block bg-gradient-to-r from-amber-300 via-orange-300 to-amber-200 bg-clip-text text-transparent">
                  Dance Classes
                </span>
                <span className="block text-white">Coming Soon to Hayes</span>
              </h1>
              <p className="mt-5 text-base font-semibold text-fuchsia-200 md:text-lg">
                Fun. Fitness. Culture. Confidence.
              </p>
              <p className="mt-3 max-w-xl text-base text-slate-200 md:text-lg">
                Register your interest for weekly dance sessions for kids and adults in Hayes & Harlington.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#register"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 px-7 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-[0_0_30px_rgba(236,72,153,0.55)] transition hover:scale-105 hover:shadow-[0_0_40px_rgba(255,122,24,0.75)]"
                >
                  <Users size={16} /> Join as Student / Parent
                </a>
                <a
                  href="#register?tab=instructor"
                  className="inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/5 px-7 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:border-fuchsia-300/70 hover:bg-white/10"
                >
                  <MicVocal size={16} /> Apply as Instructor
                </a>
              </div>
            </div>

            <div className="relative">
              <HeroDanceImage />
            </div>
          </div>
        </section>

        {/* REGISTRATION */}
        <section
          id="register"
          className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 pb-16 sm:px-6 lg:px-8"
        >
          <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-5 shadow-2xl backdrop-blur-md sm:p-8">
            <div className="mb-6 max-w-3xl">
              <h2 className="text-2xl font-bold text-white sm:text-3xl">Register Your Interest</h2>
              <p className="mt-2 text-sm text-slate-200">
                Join the early list as a student/parent or register your profile as an instructor. Tabs are fully
                interactive and switch forms instantly.
              </p>
            </div>
            <Suspense fallback={null}>
              <InterestTabs />
            </Suspense>
          </div>
        </section>

        {/* PROPOSED CLASS LOCATION */}
        <section
          id="location"
          className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 pb-16 sm:px-6 lg:px-8"
        >
          <div className="rounded-3xl border border-white/15 bg-white/[0.04] p-5 backdrop-blur-md sm:p-8">
            <div className="grid gap-6 lg:grid-cols-3">
              <div className="group relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-fuchsia-500/15 via-purple-500/10 to-orange-500/10 p-6 transition hover:scale-[1.02] hover:border-fuchsia-300/60 hover:shadow-[0_0_30px_rgba(236,72,153,0.35)]">
                <div className="flex items-center gap-2 text-fuchsia-300">
                  <MapPin size={22} />
                  <span className="text-sm font-semibold uppercase tracking-wide">Proposed Class Location</span>
                </div>
                <h3 className="mt-4 text-2xl font-bold text-white">Harlington School</h3>
                <p className="mt-1 text-sm text-slate-200">Pinkwell Road, Hayes, UB3 1PB</p>
                <p className="mt-4 text-sm text-slate-200">
                  We are planning sessions around Harlington School, Pinkwell Road, Hayes.
                </p>
                <p className="mt-2 text-xs text-slate-300">
                  Final venue and timing will be confirmed before classes begin.
                </p>
                <a
                  href="https://maps.app.goo.gl/UBwWpoD9gFScy7kT7"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-fuchsia-500 to-orange-400 px-5 py-2 text-sm font-semibold text-white shadow-[0_0_20px_rgba(236,72,153,0.45)] transition hover:scale-105"
                >
                  <MapPin size={14} /> Open in Google Maps
                </a>
              </div>

              <article className="group relative h-72 overflow-hidden rounded-3xl border border-white/15 transition hover:scale-[1.02] hover:border-fuchsia-300/60 hover:shadow-[0_0_30px_rgba(236,72,153,0.35)] lg:h-auto">
                <Image
                  src="/images/studio-main.webp"
                  alt="Proposed dance studio with full mirror wall"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#160020]/95 via-[#160020]/30 to-transparent" />
                <div className="absolute inset-x-5 bottom-5 text-white">
                  <p className="text-base font-semibold">Dance Studio (Proposed)</p>
                  <p className="text-xs text-slate-200">Spacious, modern & suitable for all ages</p>
                </div>
              </article>

              <article className="group relative h-72 overflow-hidden rounded-3xl border border-white/15 transition hover:scale-[1.02] hover:border-fuchsia-300/60 hover:shadow-[0_0_30px_rgba(236,72,153,0.35)] lg:h-auto">
                <Image
                  src="/images/studio-inside.webp"
                  alt="Inside view of the proposed dance studio"
                  fill
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#160020]/95 via-[#160020]/30 to-transparent" />
                <div className="absolute inset-x-5 bottom-5 text-white">
                  <p className="text-base font-semibold">Dance Studio &ndash; Inside View</p>
                  <p className="text-xs text-slate-200">Bright, safe &amp; perfect for learning</p>
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* PRICING / TRANSPARENCY */}
        <section className="mx-auto w-full max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2">
            <article className="group rounded-3xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-md transition hover:border-fuchsia-300/60 hover:shadow-[0_0_30px_rgba(236,72,153,0.3)] sm:p-8">
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500/30 to-orange-400/25 ring-1 ring-fuchsia-300/50 text-fuchsia-200">
                  <PoundSterling size={26} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-200">Class Fees</p>
                  <p className="text-sm text-slate-200">Per Session</p>
                </div>
              </div>
              <p className="mt-5 flex flex-wrap items-baseline gap-3 text-3xl font-black text-white sm:text-4xl">
                £7.50 &ndash; £10.00
                <span className="rounded-full bg-fuchsia-500/25 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-fuchsia-100">
                  Max
                </span>
              </p>
              <p className="mt-3 text-sm text-slate-200">
                Affordable, flexible and value-packed sessions for kids, teens and adults.
              </p>
            </article>

            <article
              id="instructor"
              className="group rounded-3xl border border-white/15 bg-white/[0.04] p-6 backdrop-blur-md transition hover:border-amber-300/60 hover:shadow-[0_0_30px_rgba(245,158,11,0.3)] sm:p-8"
            >
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-amber-500/30 to-orange-500/25 ring-1 ring-amber-300/50 text-amber-200">
                  <PoundSterling size={26} />
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-200">Instructor Pay</p>
                  <p className="text-sm text-slate-200">Per Hour</p>
                </div>
              </div>
              <p className="mt-5 flex flex-wrap items-baseline gap-3 text-3xl font-black text-white sm:text-4xl">
                £50 &ndash; £75
                <span className="rounded-full bg-amber-500/25 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-amber-100">
                  Negotiable
                </span>
              </p>
              <p className="mt-3 text-sm text-slate-200">
                Based on experience, style expertise and class requirements.
              </p>
            </article>
          </div>
          <p className="mt-4 text-center text-xs text-slate-300">
            Pricing is indicative. No payment is taken at this stage.
          </p>
        </section>

        {/* WHY JOIN */}
        <section
          id="about"
          className="mx-auto w-full max-w-7xl scroll-mt-20 px-4 pb-16 sm:px-6 lg:px-8"
        >
          <div className="mx-auto mb-8 max-w-3xl text-center">
            <h2 className="inline-flex items-center justify-center gap-2 text-2xl font-bold text-white sm:text-3xl">
              <Sparkles className="text-fuchsia-300" size={22} /> Why Join Our Classes?
            </h2>
            <p className="mt-3 text-sm text-slate-200">
              A welcoming community to learn, grow, and celebrate dance.
            </p>
          </div>

          <div id="styles" className="grid scroll-mt-20 gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {[
              {
                title: "Fun & Fitness",
                description: "Enjoy dance while staying active, healthy and happy.",
                image: "/images/dance-kids.svg",
                alt: "Stylised young dancers in colourful movement",
              },
              {
                title: "Learn & Grow",
                description: "Improve coordination, confidence and self-expression.",
                image: "/images/dance-adults.svg",
                alt: "Adult dancers performing classical fusion",
              },
              {
                title: "Expert Guidance",
                description: "Learn from experienced instructors in a friendly environment.",
                image: "/images/bollywood-style.svg",
                alt: "Bollywood style dancer with vibrant colours",
              },
              {
                title: "Cultural Connection",
                description: "Celebrate Bollywood & South Indian culture through dance.",
                image: "/images/south-indian-style.svg",
                alt: "South Indian inspired dance scene",
              },
              {
                title: "For All Ages",
                description: "Kids, teens and adults \u2013 everyone is welcome! All levels.",
                image: "/images/dance-kids.svg",
                alt: "Group of dancers of mixed ages",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="group overflow-hidden rounded-3xl border border-white/15 bg-white/[0.04] backdrop-blur-md transition hover:scale-[1.04] hover:border-fuchsia-300/60 hover:shadow-[0_0_25px_rgba(236,47,215,0.35)]"
              >
                <div className="relative h-44">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    className="object-cover transition duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#160020]/95 via-[#160020]/35 to-transparent" />
                </div>
                <div className="space-y-2 p-5">
                  <h3 className="text-base font-semibold text-white">{item.title}</h3>
                  <p className="text-sm leading-6 text-slate-300">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>

      {/* TRUST / GDPR + FOOTER */}
      <footer
        id="contact"
        className="relative z-10 border-t border-white/10 bg-[#0f0019]/80 backdrop-blur-md"
      >
        <div className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
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
                icon: Heart,
                text: "Dance involves physical movement. Sessions will be planned with reasonable warm-up, safe spacing, age-appropriate routines and clear guidance. Parents/guardians should inform us of any relevant medical or accessibility needs before participation.",
              },
              {
                title: "Venue & Timing",
                icon: MapPin,
                text: "Venue, timings, class levels, pricing, and instructor details will be confirmed before launch. Registering interest does not create a paid booking.",
              },
              {
                title: "Contact / Data Removal",
                icon: Mail,
                text: "To update or remove your enquiry details, please contact us using the contact details provided on this website.",
              },
            ].map((item) => (
              <article
                key={item.title}
                className="rounded-2xl border border-white/15 bg-white/[0.05] p-5 text-slate-200 backdrop-blur-md transition hover:border-fuchsia-300/40 hover:bg-white/[0.07]"
              >
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-white">
                  <span className="grid h-8 w-8 place-items-center rounded-full bg-fuchsia-500/20 text-fuchsia-200">
                    <item.icon size={16} />
                  </span>
                  {item.title}
                </p>
                <p className="mt-3 text-xs leading-6 text-slate-300">{item.text}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-8 border-t border-white/10 pt-8 md:grid-cols-3">
            <div>
              <a href="#home" className="flex items-center gap-2 text-white">
                <span className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 to-orange-400 text-sm">
                  <Sparkles size={16} />
                </span>
                <span className="text-sm font-black uppercase tracking-[0.18em]">Hayes Dance Class</span>
              </a>
              <p className="mt-3 text-xs leading-6 text-slate-300">
                Bringing dance, culture and confidence to Hayes &amp; Harlington.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-200">Quick Links</p>
              <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-slate-300">
                <li>
                  <a href="#about" className="transition hover:text-white">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#styles" className="transition hover:text-white">
                    Dance Styles
                  </a>
                </li>
                <li>
                  <a href="#instructor" className="transition hover:text-white">
                    For Instructors
                  </a>
                </li>
                <li>
                  <a href="#location" className="transition hover:text-white">
                    Location
                  </a>
                </li>
                <li>
                  <a href="#contact" className="transition hover:text-white">
                    Contact
                  </a>
                </li>
                <li>
                  <Link href="/privacy" className="transition hover:text-white">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/safety" className="transition hover:text-white">
                    Safety
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-200">Follow Us</p>
              <div className="mt-3 flex gap-3">
                <a
                  href="#"
                  aria-label="Instagram"
                  className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 via-pink-500 to-orange-400 text-white shadow-[0_0_18px_rgba(236,72,153,0.5)] transition hover:scale-110"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="#"
                  aria-label="YouTube"
                  className="grid h-10 w-10 place-items-center rounded-full bg-red-500 text-white shadow-[0_0_18px_rgba(239,68,68,0.5)] transition hover:scale-110"
                >
                  <YoutubeIcon />
                </a>
                <a
                  href="#"
                  aria-label="Facebook"
                  className="grid h-10 w-10 place-items-center rounded-full bg-blue-600 text-white shadow-[0_0_18px_rgba(37,99,235,0.5)] transition hover:scale-110"
                >
                  <FacebookIcon />
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-white/10 pt-5 text-center">
            <p className="text-xs text-slate-400">© 2026 Hayes Dance Class. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
