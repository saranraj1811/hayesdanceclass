import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { isRateLimited } from "@/lib/rate-limit";
import { enquirySchema } from "@/lib/validations";
import { logServerError } from "@/lib/server-logging";

function getClientIp(headers: Headers): string {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() ?? "unknown";
  }

  return headers.get("x-real-ip") ?? "unknown";
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = enquirySchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          message: parsed.error.issues[0]?.message ?? "Invalid form submission.",
        },
        { status: 400 },
      );
    }

    const data = parsed.data;

    if (data.website) {
      return NextResponse.json({ success: true, message: "Submitted successfully." });
    }

    const ip = getClientIp(request.headers);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many attempts. Please try again in a few minutes.",
        },
        { status: 429 },
      );
    }

    await prisma.enquiry.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        location: data.location,
        interestedFor: data.interestedFor,
        preferredTime: data.preferredTime,
        message: data.message || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! We've received your interest and will contact you when classes are ready.",
    });
  } catch (error) {
    logServerError("api/enquiries POST", error);

    const isMissingTable =
      error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2021";
    if (isMissingTable) {
      return NextResponse.json(
        {
          success: false,
          message: "Database is not ready yet. Please try again shortly.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "We could not submit your interest right now. Please try again.",
      },
      { status: 500 },
    );
  }
}
