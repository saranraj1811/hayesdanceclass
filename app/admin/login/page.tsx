import { Music2 } from "lucide-react";
import { LoginForm } from "@/app/admin/login/login-form";

export default function AdminLoginPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-fuchsia-900 to-purple-900 px-4">
      <section className="w-full max-w-md rounded-3xl border border-white/20 bg-white p-8 shadow-2xl">
        <p className="inline-flex items-center gap-2 rounded-full bg-fuchsia-100 px-3 py-1 text-xs font-semibold text-fuchsia-700">
          <Music2 size={14} />
          Admin Access
        </p>
        <h1 className="mt-3 text-2xl font-bold text-slate-900">Dance Enquiry Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">Sign in to view and manage submitted interests.</p>
        <div className="mt-6">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
