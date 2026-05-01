import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { logServerError } from "@/lib/server-logging";

function csvValue(input: string | null | undefined): string {
  const value = input ?? "";
  return `"${value.replaceAll('"', '""')}"`;
}

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const enquiries = await prisma.enquiry.findMany({
      orderBy: { createdAt: "desc" },
    });

    const header = [
      "Name",
      "Email",
      "Phone",
      "Location",
      "Interested For",
      "Preferred Time",
      "Message",
      "Status",
      "Submitted Date",
    ];

    const lines = enquiries.map((enquiry) =>
      [
        csvValue(enquiry.fullName),
        csvValue(enquiry.email),
        csvValue(enquiry.phone),
        csvValue(enquiry.location),
        csvValue(enquiry.interestedFor),
        csvValue(enquiry.preferredTime),
        csvValue(enquiry.message),
        csvValue(enquiry.status),
        csvValue(enquiry.createdAt.toISOString()),
      ].join(","),
    );

    const csv = [header.join(","), ...lines].join("\n");

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="student-enquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error) {
    logServerError("api/admin/export/students GET", error);
    return new Response("Failed to export student enquiries.", { status: 500 });
  }
}
