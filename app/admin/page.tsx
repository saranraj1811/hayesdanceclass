import { EnquiryStatus, InstructorEnquiryStatus, InstructorAvailability, InterestedFor } from "@prisma/client";
import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { logoutAction, updateEnquiryStatus, updateInstructorEnquiryStatus } from "@/app/admin/actions";
import { StatusUpdateForm } from "@/app/admin/status-update-form";
import { logServerError } from "@/lib/server-logging";

type AdminPageProps = {
  searchParams: Promise<{ q?: string; tab?: string; status?: string }>;
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

function statusPillClass(status: string): string {
  if (status === "NEW") return "bg-blue-100 text-blue-700 border-blue-200";
  if (status === "CONTACTED") return "bg-amber-100 text-amber-700 border-amber-200";
  if (status === "CONFIRMED") return "bg-emerald-100 text-emerald-700 border-emerald-200";
  if (status === "SHORTLISTED") return "bg-violet-100 text-violet-700 border-violet-200";
  if (status === "NOT_INTERESTED") return "bg-rose-100 text-rose-700 border-rose-200";
  return "bg-slate-100 text-slate-700 border-slate-200";
}

export default async function AdminDashboard({ searchParams }: AdminPageProps) {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    redirect("/admin/login");
  }

  const params = await searchParams;
  const query = params.q?.trim() ?? "";
  const activeTab = params.tab === "instructors" ? "instructors" : "students";
  const rawStatus = params.status?.trim().toUpperCase() ?? "ALL";
  const studentStatusFilter =
    rawStatus !== "ALL" && Object.values(EnquiryStatus).includes(rawStatus as EnquiryStatus)
      ? (rawStatus as EnquiryStatus)
      : null;
  const instructorStatusFilter =
    rawStatus !== "ALL" && Object.values(InstructorEnquiryStatus).includes(rawStatus as InstructorEnquiryStatus)
      ? (rawStatus as InstructorEnquiryStatus)
      : null;

  const studentWhereClause = {
    ...(query
      ? {
        OR: [
          { fullName: { contains: query, mode: "insensitive" as const } },
          { phone: { contains: query, mode: "insensitive" as const } },
          { location: { contains: query, mode: "insensitive" as const } },
        ],
      }
      : {}),
    ...(activeTab === "students" && studentStatusFilter ? { status: studentStatusFilter } : {}),
  };

  const instructorWhereClause = {
    ...(query
      ? {
        OR: [
          { fullName: { contains: query, mode: "insensitive" as const } },
          { phone: { contains: query, mode: "insensitive" as const } },
          { location: { contains: query, mode: "insensitive" as const } },
        ],
      }
      : {}),
    ...(activeTab === "instructors" && instructorStatusFilter ? { status: instructorStatusFilter } : {}),
  };

  let enquiries: Awaited<ReturnType<typeof prisma.enquiry.findMany>> = [];
  let instructorEnquiries: Awaited<ReturnType<typeof prisma.instructorEnquiry.findMany>> = [];
  let totalStudentEnquiries = 0;
  let totalInstructorEnquiries = 0;
  let newStudentEnquiries = 0;
  let contactedStudentEnquiries = 0;
  let confirmedStudentEnquiries = 0;
  let newInstructorEnquiries = 0;
  let shortlistedInstructorEnquiries = 0;
  let confirmedInstructorEnquiries = 0;
  let loadError = "";

  try {
    [
      enquiries,
      instructorEnquiries,
      totalStudentEnquiries,
      totalInstructorEnquiries,
      newStudentEnquiries,
      contactedStudentEnquiries,
      confirmedStudentEnquiries,
      newInstructorEnquiries,
      shortlistedInstructorEnquiries,
      confirmedInstructorEnquiries,
    ] = await prisma.$transaction([
      prisma.enquiry.findMany({
        where: studentWhereClause,
        orderBy: { createdAt: "desc" },
      }),
      prisma.instructorEnquiry.findMany({
        where: instructorWhereClause,
        orderBy: { createdAt: "desc" },
      }),
      prisma.enquiry.count(),
      prisma.instructorEnquiry.count(),
      prisma.enquiry.count({ where: { status: EnquiryStatus.NEW } }),
      prisma.enquiry.count({ where: { status: EnquiryStatus.CONTACTED } }),
      prisma.enquiry.count({ where: { status: EnquiryStatus.CONFIRMED } }),
      prisma.instructorEnquiry.count({ where: { status: InstructorEnquiryStatus.NEW } }),
      prisma.instructorEnquiry.count({ where: { status: InstructorEnquiryStatus.SHORTLISTED } }),
      prisma.instructorEnquiry.count({ where: { status: InstructorEnquiryStatus.CONFIRMED } }),
    ]);
  } catch (error) {
    logServerError("admin/page data load", error);
    loadError = "Unable to load enquiries right now. Verify database connection and run prisma db push.";
  }

  function formatAvailability(value: InstructorAvailability): string {
    return formatTime(value);
  }

  function adminUrl(tab: "students" | "instructors", status: string): string {
    const url = new URLSearchParams();
    url.set("tab", tab);
    if (query) url.set("q", query);
    if (status !== "ALL") {
      url.set("status", status);
    }
    return `/admin?${url.toString()}`;
  }

  const statusFilterOptions =
    activeTab === "students"
      ? ["ALL", "NEW", "CONTACTED", "CONFIRMED", "NOT_INTERESTED"]
      : ["ALL", "NEW", "CONTACTED", "SHORTLISTED", "CONFIRMED", "NOT_INTERESTED"];
  const activeStatus = statusFilterOptions.includes(rawStatus) ? rawStatus : "ALL";

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
            { label: "Total student enquiries", value: totalStudentEnquiries },
            { label: "New student enquiries", value: newStudentEnquiries },
            { label: "Contacted student enquiries", value: contactedStudentEnquiries },
            { label: "Confirmed student enquiries", value: confirmedStudentEnquiries },
            { label: "Total instructor enquiries", value: totalInstructorEnquiries },
            { label: "New instructor enquiries", value: newInstructorEnquiries },
            { label: "Shortlisted instructors", value: shortlistedInstructorEnquiries },
            { label: "Confirmed instructors", value: confirmedInstructorEnquiries },
          ].map((card) => (
            <article key={card.label} className="rounded-2xl bg-white p-5 shadow-sm">
              <p className="text-sm text-slate-500">{card.label}</p>
              <p className="mt-2 text-3xl font-bold text-slate-900">{card.value}</p>
            </article>
          ))}
        </section>

        <section className="rounded-2xl bg-white p-4 shadow-sm">
          <div className="mb-4 grid gap-3 sm:grid-cols-2">
            <a
              href="/admin?tab=students"
              className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                activeTab === "students"
                  ? "border-fuchsia-300 bg-fuchsia-50 text-fuchsia-800"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              Student Enquiries
            </a>
            <a
              href="/admin?tab=instructors"
              className={`rounded-xl border px-4 py-2 text-sm font-semibold transition ${
                activeTab === "instructors"
                  ? "border-fuchsia-300 bg-fuchsia-50 text-fuchsia-800"
                  : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
              }`}
            >
              Instructor Enquiries
            </a>
          </div>
          <form className="flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              name="q"
              defaultValue={query}
              placeholder="Search by name, phone, location"
              className="w-full rounded-lg border border-slate-300 bg-white px-4 py-2 text-slate-900 placeholder:text-slate-400 focus:border-slate-500 focus:outline-none"
            />
            <input type="hidden" name="tab" value={activeTab} />
            <input type="hidden" name="status" value={activeStatus === "ALL" ? "" : activeStatus} />
            <button className="rounded-lg bg-fuchsia-600 px-4 py-2 font-semibold text-white hover:bg-fuchsia-700">
              Search
            </button>
            <a
              href={activeTab === "students" ? "/api/admin/export/students" : "/api/admin/export/instructors"}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-center font-semibold text-slate-800 hover:bg-slate-50"
            >
              {activeTab === "students" ? "Export Student CSV" : "Export Instructor CSV"}
            </a>
          </form>
          <div className="mt-4 flex flex-wrap gap-2">
            {statusFilterOptions.map((status) => (
              <a
                key={status}
                href={adminUrl(activeTab, status)}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  activeStatus === status
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                }`}
              >
                {status === "ALL" ? "All" : formatTime(status)}
              </a>
            ))}
          </div>
        </section>

        <section className="overflow-hidden rounded-2xl bg-white shadow-sm">
          {loadError ? (
            <div className="border-b border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{loadError}</div>
          ) : null}
          {activeTab === "students" ? (
            <div className="max-h-[70vh] overflow-auto">
            <table className="min-w-[1300px] w-full text-left text-sm">
              <thead className="sticky top-0 z-10 bg-slate-50 text-slate-900">
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
                  <th className="sticky right-0 z-20 bg-slate-50 px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.length === 0 ? (
                  <tr className="border-t border-slate-200 bg-white">
                    <td colSpan={10} className="px-4 py-8 text-center text-slate-500">
                      No student enquiries found.
                    </td>
                  </tr>
                ) : (
                  enquiries.map((enquiry) => (
                    <tr
                      key={enquiry.id}
                      className="align-top border-t border-slate-200 bg-white text-slate-900 transition hover:bg-slate-50"
                    >
                      <td className="px-4 py-3 text-slate-900">{enquiry.fullName}</td>
                      <td className="px-4 py-3 text-slate-600">
                        <a className="underline decoration-dotted hover:text-slate-900" href={`mailto:${enquiry.email}`}>
                          {enquiry.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-slate-900">
                        <a className="underline decoration-dotted hover:text-slate-700" href={`tel:${enquiry.phone}`}>
                          {enquiry.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-slate-900">{enquiry.location}</td>
                      <td className="px-4 py-3 text-slate-900">{formatInterest(enquiry.interestedFor)}</td>
                      <td className="px-4 py-3 text-slate-900">{formatTime(enquiry.preferredTime)}</td>
                      <td className="max-w-xs px-4 py-3 text-slate-600">{enquiry.message || "-"}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                        {enquiry.createdAt.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full border px-2 py-1 text-xs font-semibold ${statusPillClass(enquiry.status)}`}>
                          {formatTime(enquiry.status)}
                        </span>
                      </td>
                      <td className="sticky right-0 z-10 border-l border-slate-200 bg-white px-4 py-3 align-top">
                        <StatusUpdateForm
                          action={updateEnquiryStatus}
                          enquiryId={enquiry.id}
                          currentStatus={enquiry.status}
                          statuses={Object.values(EnquiryStatus)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            </div>
          ) : (
            <div className="max-h-[70vh] overflow-auto">
            <table className="min-w-[1450px] w-full text-left text-sm">
              <thead className="sticky top-0 z-10 bg-slate-50 text-slate-900">
                <tr>
                  <th className="px-4 py-3 font-semibold">Name</th>
                  <th className="px-4 py-3 font-semibold">Email</th>
                  <th className="px-4 py-3 font-semibold">Phone</th>
                  <th className="px-4 py-3 font-semibold">Location</th>
                  <th className="px-4 py-3 font-semibold">Dance Styles</th>
                  <th className="px-4 py-3 font-semibold">Availability</th>
                  <th className="px-4 py-3 font-semibold">Links</th>
                  <th className="px-4 py-3 font-semibold">Message</th>
                  <th className="px-4 py-3 font-semibold">Submitted Date</th>
                  <th className="px-4 py-3 font-semibold">Status</th>
                  <th className="sticky right-0 z-20 bg-slate-50 px-4 py-3 font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {instructorEnquiries.length === 0 ? (
                  <tr className="border-t border-slate-200 bg-white">
                    <td colSpan={11} className="px-4 py-8 text-center text-slate-500">
                      No instructor enquiries found.
                    </td>
                  </tr>
                ) : (
                  instructorEnquiries.map((enquiry) => (
                    <tr
                      key={enquiry.id}
                      className="align-top border-t border-slate-200 bg-white text-slate-900 transition hover:bg-slate-50"
                    >
                      <td className="px-4 py-3 text-slate-900">{enquiry.fullName}</td>
                      <td className="px-4 py-3 text-slate-600">
                        <a className="underline decoration-dotted hover:text-slate-900" href={`mailto:${enquiry.email}`}>
                          {enquiry.email}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-slate-900">
                        <a className="underline decoration-dotted hover:text-slate-700" href={`tel:${enquiry.phone}`}>
                          {enquiry.phone}
                        </a>
                      </td>
                      <td className="px-4 py-3 text-slate-900">{enquiry.location}</td>
                      <td className="px-4 py-3 text-slate-900">{enquiry.danceStyles.join(", ")}</td>
                      <td className="px-4 py-3 text-slate-900">{formatAvailability(enquiry.availability)}</td>
                      <td className="px-4 py-3 text-slate-600">
                        <div className="space-x-2 space-y-1">
                          {enquiry.instagramUrl ? (
                            <a href={enquiry.instagramUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-fuchsia-700 underline">
                              Instagram
                            </a>
                          ) : null}
                          {enquiry.youtubeUrl ? (
                            <a href={enquiry.youtubeUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-fuchsia-700 underline">
                              YouTube
                            </a>
                          ) : null}
                          {enquiry.facebookUrl ? (
                            <a href={enquiry.facebookUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-fuchsia-700 underline">
                              Facebook
                            </a>
                          ) : null}
                          {enquiry.portfolioUrl ? (
                            <a href={enquiry.portfolioUrl} target="_blank" rel="noopener noreferrer" className="inline-block text-xs text-fuchsia-700 underline">
                              Portfolio
                            </a>
                          ) : null}
                          {!enquiry.instagramUrl && !enquiry.youtubeUrl && !enquiry.facebookUrl && !enquiry.portfolioUrl ? "-" : null}
                        </div>
                      </td>
                      <td className="max-w-xs px-4 py-3 text-slate-600">{enquiry.experienceMessage || "-"}</td>
                      <td className="whitespace-nowrap px-4 py-3 text-slate-600">
                        {enquiry.createdAt.toLocaleString()}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full border px-2 py-1 text-xs font-semibold ${statusPillClass(enquiry.status)}`}>
                          {formatTime(enquiry.status)}
                        </span>
                      </td>
                      <td className="sticky right-0 z-10 border-l border-slate-200 bg-white px-4 py-3 align-top">
                        <StatusUpdateForm
                          action={updateInstructorEnquiryStatus}
                          enquiryId={enquiry.id}
                          currentStatus={enquiry.status}
                          statuses={Object.values(InstructorEnquiryStatus)}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
