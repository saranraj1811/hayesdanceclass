import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { logServerError } from "@/lib/server-logging";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    return NextResponse.json({ ok: true, database: "connected" });
  } catch (error) {
    logServerError("api/health GET", error);
    return NextResponse.json(
      {
        ok: false,
        database: "disconnected",
        message: "Database connection failed.",
      },
      { status: 500 },
    );
  }
}
