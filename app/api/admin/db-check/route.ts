import { NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { logServerError } from "@/lib/server-logging";

export async function GET() {
  const authenticated = await isAdminAuthenticated();
  if (!authenticated) {
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });
  }

  try {
    const count = await prisma.enquiry.count();
    return NextResponse.json({ ok: true, enquiries: count });
  } catch (error) {
    logServerError("api/admin/db-check GET", error);
    return NextResponse.json(
      {
        ok: false,
        message: "Database query failed.",
      },
      { status: 500 },
    );
  }
}
