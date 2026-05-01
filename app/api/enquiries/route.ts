import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { warnBlockedSubmission } from "@/lib/anti-spam-log";
import { hasRecentStudentDuplicate } from "@/lib/duplicate-check";
import { prisma } from "@/lib/prisma";
import { isRateLimited } from "@/lib/rate-limit";
import { isTurnstileConfigured, verifyTurnstileToken } from "@/lib/turnstile";
import { enquirySchema } from "@/lib/validations";
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
    const honeypotHit = Boolean(data.website?.trim()) || Boolean(data.companyWebsite?.trim());
    if (honeypotHit) {
      warnBlockedSubmission("student", "honeypot");
      return NextResponse.json({ success: true, message: "Submitted successfully." });
    }

    if (isTurnstileConfigured()) {
      const ok = await verifyTurnstileToken(data.turnstileToken);
      if (!ok) {
        warnBlockedSubmission("student", "turnstile");
        return NextResponse.json(
          { success: false, message: "Verification failed. Please refresh and try again." },
          { status: 400 },
        );
      }
    }

    const now = Date.now();
    if (data.formOpenedAt > now + CLOCK_SKEW_MS) {
      warnBlockedSubmission("student", "timing");
      return NextResponse.json(
        { success: false, message: "Please take a moment to complete the form." },
        { status: 400 },
      );
    }

    if (now - data.formOpenedAt < MIN_FORM_MS) {
      warnBlockedSubmission("student", "timing");
      return NextResponse.json(
        { success: false, message: "Please take a moment to complete the form." },
        { status: 400 },
      );
    }

    const ip = getClientIp(request.headers);
    if (isRateLimited(`${ip}:student`)) {
      warnBlockedSubmission("student", "rate_limit");
      return NextResponse.json(
        {
          success: false,
          message: "Too many submissions. Please try again later.",
        },
        { status: 429 },
      );
    }

    if (await hasRecentStudentDuplicate(data.email, data.phone)) {
      warnBlockedSubmission("student", "duplicate");
      return NextResponse.json({
        success: true,
        message: "We already received your interest. Thank you.",
      });
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
