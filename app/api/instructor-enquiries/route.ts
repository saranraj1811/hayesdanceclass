import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { warnBlockedSubmission } from "@/lib/anti-spam-log";
import { hasRecentInstructorDuplicate } from "@/lib/duplicate-check";
import { prisma } from "@/lib/prisma";
import { isRateLimited } from "@/lib/rate-limit";
import { isTurnstileConfigured, verifyTurnstileToken } from "@/lib/turnstile";
import { instructorEnquirySchema } from "@/lib/validations";
import { logServerError } from "@/lib/server-logging";

const MIN_FORM_MS = 3000;
const CLOCK_SKEW_MS = 120_000;

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
    const honeypotHit = Boolean(data.website?.trim()) || Boolean(data.companyWebsite?.trim());
    if (honeypotHit) {
      warnBlockedSubmission("instructor", "honeypot");
      return NextResponse.json({ success: true, message: "Submitted successfully." });
    }

    if (isTurnstileConfigured()) {
      const ok = await verifyTurnstileToken(data.turnstileToken);
      if (!ok) {
        warnBlockedSubmission("instructor", "turnstile");
        return NextResponse.json(
          { success: false, message: "Verification failed. Please refresh and try again." },
          { status: 400 },
        );
      }
    }

    const now = Date.now();
    if (data.formOpenedAt > now + CLOCK_SKEW_MS) {
      warnBlockedSubmission("instructor", "timing");
      return NextResponse.json(
        { success: false, message: "Please take a moment to complete the form." },
        { status: 400 },
      );
    }

    if (now - data.formOpenedAt < MIN_FORM_MS) {
      warnBlockedSubmission("instructor", "timing");
      return NextResponse.json(
        { success: false, message: "Please take a moment to complete the form." },
        { status: 400 },
      );
    }

    const ip = getClientIp(request.headers);
    if (isRateLimited(`${ip}:instructor`)) {
      warnBlockedSubmission("instructor", "rate_limit");
      return NextResponse.json(
        {
          success: false,
          message: "Too many submissions. Please try again later.",
        },
        { status: 429 },
      );
    }

    if (await hasRecentInstructorDuplicate(data.email, data.phone)) {
      warnBlockedSubmission("instructor", "duplicate");
      return NextResponse.json({
        success: true,
        message: "We already received your interest. Thank you.",
      });
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
