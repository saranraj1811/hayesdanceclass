import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#160020] px-6 py-16 text-center text-white">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-fuchsia-200">Hayes Dance Class</p>
      <h1 className="mt-4 text-5xl font-black">404</h1>
      <p className="mt-3 max-w-md text-sm text-slate-300">
        This page could not be found. If you were looking for dance classes in Hayes or Harlington, head back to the
        homepage.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex rounded-full bg-gradient-to-r from-fuchsia-500 via-pink-500 to-orange-400 px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-[0_0_24px_rgba(236,72,153,0.45)] transition hover:scale-105"
      >
        Return home
      </Link>
    </main>
  );
}
