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
    const enquiries = await prisma.instructorEnquiry.findMany({
      orderBy: { createdAt: "desc" },
    });

    const header = [
      "Name",
      "Email",
      "Phone",
      "Location",
      "Dance Styles",
      "Availability",
      "Instagram",
      "YouTube",
      "Facebook",
      "Portfolio",
      "Experience Message",
      "Status",
      "Submitted Date",
    ];

    const lines = enquiries.map((enquiry) =>
      [
        csvValue(enquiry.fullName),
        csvValue(enquiry.email),
        csvValue(enquiry.phone),
        csvValue(enquiry.location),
        csvValue(enquiry.danceStyles.join(" | ")),
        csvValue(enquiry.availability),
        csvValue(enquiry.instagramUrl),
        csvValue(enquiry.youtubeUrl),
        csvValue(enquiry.facebookUrl),
        csvValue(enquiry.portfolioUrl),
        csvValue(enquiry.experienceMessage),
        csvValue(enquiry.status),
        csvValue(enquiry.createdAt.toISOString()),
      ].join(","),
    );

    const csv = [header.join(","), ...lines].join("\n");

    return new Response(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="instructor-enquiries-${new Date().toISOString().slice(0, 10)}.csv"`,
      },
    });
  } catch (error) {
    logServerError("api/admin/export/instructors GET", error);
    return new Response("Failed to export instructor enquiries.", { status: 500 });
  }
}
