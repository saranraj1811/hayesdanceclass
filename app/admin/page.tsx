import { EnquiryStatus, InterestedFor } from "@prisma/client";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { logoutAction, updateEnquiryStatus } from "@/app/admin/actions";
import { logServerError } from "@/lib/server-logging";

type AdminPageProps = {
  searchParams: Promise<{ q?: string }>;
};

function formatInterest(value: InterestedFor): string {
  if (value === "KIDS") return "Kids";
  if (value === "ADULTS") return "Adults";
  return "Both";
}

function formatTime(value: string): string {
  return value
    .toLowerCase()
    .replaceAll("_", " ")
    .replace(/^\w/, (char) => char.toUpperCase());
}

export default async function AdminDashboard({ searchParams }: AdminPageProps) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  const params = await searchParams;
  const query = params.q?.trim() ?? "";

  const whereClause = query
    ? {
        OR: [
          { fullName: { contains: query, mode: "insensitive" as const } },
          { phone: { contains: query, mode: "insensitive" as const } },
          { location: { contains: query, mode: "insensitive" as const } },
        ],
      }
    : {};

  let enquiries: Awaited<ReturnType<typeof prisma.enquiry.findMany>> = [];
  let totalEnquiries = 0;
  let newEnquiries = 0;
  let kidsInterest = 0;
  let adultsInterest = 0;
  let loadError = "";

  try {
    [enquiries, totalEnquiries, newEnquiries, kidsInterest, adultsInterest] = await prisma.$transaction([
      prisma.enquiry.findMany({
        where: whereClause,
        orderBy: { createdAt: "desc" },
      }),
      prisma.enquiry.count(),
      prisma.enquiry.count({ where: { status: EnquiryStatus.NEW } }),
      prisma.enquiry.count({
        where: { OR: [{ interestedFor: InterestedFor.KIDS }, { interestedFor: InterestedFor.BOTH }] },
      }),
      prisma.enquiry.count({
        where: { OR: [{ interestedFor: InterestedFor.ADULTS }, { interestedFor: InterestedFor.BOTH }] },
      }),
    ]);
  } catch (error) {
    logServerError("admin/page data load", error);
    loadError = "Unable to load enquiries right now. Verify database connection and run prisma db push.";
  }

  return (
    <main className="min-h-screen bg-slate-100 p-4 sm:p-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <header className="flex flex-col gap-3 rounded-2xl bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Enquiry Dashboard</h1>
            <p className="text-sm text-slate-600">Hayes & Harlington dance class launch interest.</p>
          </div>
          <form action={logoutAction}>
            <button className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700">
              Logout
            </button>
          </form>
        </header>

        <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "Total enquiries", value: totalEnquiries },
            { label: "New enquiries", value: newEnquiries },
            { label: "Kids interest", value: kidsInterest },
            { label: "Adults interest", value: adultsInterest },
          ].map((card) => (
            <article key={card.label} className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{card.label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{card.value}</p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <form className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search by name, phone, location"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none"
            />
            <button className="rounded-lg bg-fuchsia-600 px-4 py-2 font-semibold text-white hover:bg-fuchsia-700">
              Search
            </button>
          </form>
        </section>

        <section className="overflow-x-auto rounded-2xl bg-white shadow-sm">
          {loadError ? (
            <div className="border-b border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{loadError}</div>
          ) : null}
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-900">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Phone</th>
                <th className="px-4 py-3 font-semibold">Location</th>
                <th className="px-4 py-3 font-semibold">Interested For</th>
                <th className="px-4 py-3 font-semibold">Preferred Time</th>
                <th className="px-4 py-3 font-semibold">Message</th>
                <th className="px-4 py-3 font-semibold">Submitted Date</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.length === 0 ? (
                <tr className="border-t border-slate-200 bg-white">
                  <td colSpan={9} className="px-4 py-8 text-center text-slate-500">
                    No enquiries found.
                  </td>
                </tr>
              ) : (
                enquiries.map((enquiry) => (
                  <tr
                    key={enquiry.id}
                    className="align-top border-t border-slate-200 bg-white text-slate-900 transition hover:bg-slate-50"
                  >
                    <td className="px-4 py-3 text-slate-900">{enquiry.fullName}</td>
                    <td className="px-4 py-3 text-slate-600">{enquiry.email}</td>
                    <td className="px-4 py-3 text-slate-900">{enquiry.phone}</td>
                    <td className="px-4 py-3 text-slate-900">{enquiry.location}</td>
                    <td className="px-4 py-3 text-slate-900">{formatInterest(enquiry.interestedFor)}</td>
                    <td className="px-4 py-3 text-slate-900">{formatTime(enquiry.preferredTime)}</td>
                    <td className="max-w-xs px-4 py-3 text-slate-600">{enquiry.message || "-"}</td>
                    <td className="whitespace-nowrap px-4 py-3 text-slate-600">{enquiry.createdAt.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <form action={updateEnquiryStatus} className="flex items-center gap-2">
                        <input type="hidden" name="enquiryId" value={enquiry.id} />
                        <select
                          name="status"
                          defaultValue={enquiry.status}
                          className="rounded-md border border-slate-300 bg-white px-2 py-1 text-slate-900 focus:border-slate-500 focus:outline-none"
                        >
                          {Object.values(EnquiryStatus).map((status) => (
                            <option key={status} value={status}>
                              {status}
                            </option>
                          ))}
                        </select>
                        <button className="rounded-md bg-slate-800 px-3 py-1 text-xs font-semibold text-white hover:bg-slate-700">
                          Update
                        </button>
                      </form>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </div>
    </main>
  );
}
