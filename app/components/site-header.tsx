"use client";

import { useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";

const NAV_LINKS = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#styles", label: "Styles" },
  { href: "#instructor", label: "Instructor" },
  { href: "#location", label: "Location" },
  { href: "#contact", label: "Contact" },
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#160020]/80 backdrop-blur-md">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2 text-white">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-gradient-to-br from-fuchsia-500 to-orange-400 text-sm">
            <Sparkles size={16} />
          </span>
          <span className="text-sm font-black uppercase tracking-[0.18em]">Hayes Dance Class</span>
        </a>

        <div className="hidden items-center gap-7 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate-200 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <a
          href="#register"
          className="hidden rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 px-5 py-2 text-xs font-semibold uppercase tracking-wide text-white shadow-[0_0_20px_rgba(236,72,153,0.55)] transition hover:scale-105 hover:shadow-[0_0_30px_rgba(255,122,24,0.7)] sm:inline-flex"
        >
          Register Interest
        </a>

        <button
          type="button"
          aria-label={isOpen ? "Close navigation" : "Open navigation"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((value) => !value)}
          className="grid h-9 w-9 place-items-center rounded-full border border-white/15 bg-white/5 text-white transition hover:border-fuchsia-300/60 hover:bg-white/10 lg:hidden"
        >
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {isOpen ? (
        <div className="border-t border-white/10 bg-[#160020]/95 backdrop-blur-md lg:hidden">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-1 px-4 py-3 sm:px-6">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="rounded-xl px-3 py-2 text-sm text-slate-200 transition hover:bg-white/5 hover:text-white"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#register"
              onClick={() => setIsOpen(false)}
              className="mt-2 rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 px-5 py-2 text-center text-xs font-semibold uppercase tracking-wide text-white shadow-[0_0_18px_rgba(236,72,153,0.55)]"
            >
              Register Interest
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}
