import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { isRateLimited } from "@/lib/rate-limit";
import { logServerError } from "@/lib/server-logging";
import { instructorEnquirySchema } from "@/lib/validations";

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
    const parsed = instructorEnquirySchema.safeParse(body);

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
    if (isRateLimited(`${ip}:instructor`)) {
      return NextResponse.json(
        {
          success: false,
          message: "Too many attempts. Please try again in a few minutes.",
        },
        { status: 429 },
      );
    }

    await prisma.instructorEnquiry.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        location: data.location,
        danceStyles: data.danceStyles,
        availability: data.availability,
        instagramUrl: data.instagramUrl || null,
        youtubeUrl: data.youtubeUrl || null,
        facebookUrl: data.facebookUrl || null,
        portfolioUrl: data.portfolioUrl || null,
        experienceMessage: data.experienceMessage || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Thank you! Your instructor interest has been submitted successfully.",
    });
  } catch (error) {
    logServerError("api/instructor-enquiries POST", error);

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
        message: "We could not submit your instructor interest right now. Please try again.",
      },
      { status: 500 },
    );
  }
}
