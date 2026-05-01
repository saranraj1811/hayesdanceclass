import { prisma } from "@/lib/prisma";

const DAY_MS = 24 * 60 * 60 * 1000;
const SCAN_LIMIT = 500;

export function normalizePhoneDigits(phone: string): string {
  return phone.replace(/\D/g, "");
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function hasRecentStudentDuplicate(email: string, phone: string): Promise<boolean> {
  const since = new Date(Date.now() - DAY_MS);
  const emailNorm = normalizeEmail(email);
  const phoneNorm = normalizePhoneDigits(phone);

  const rows = await prisma.enquiry.findMany({
    where: { createdAt: { gte: since } },
    select: { email: true, phone: true },
    orderBy: { createdAt: "desc" },
    take: SCAN_LIMIT,
  });

  return rows.some(
    (row) => normalizeEmail(row.email) === emailNorm || normalizePhoneDigits(row.phone) === phoneNorm,
  );
}

export async function hasRecentInstructorDuplicate(email: string, phone: string): Promise<boolean> {
  const since = new Date(Date.now() - DAY_MS);
  const emailNorm = normalizeEmail(email);
  const phoneNorm = normalizePhoneDigits(phone);

  const rows = await prisma.instructorEnquiry.findMany({
    where: { createdAt: { gte: since } },
    select: { email: true, phone: true },
    orderBy: { createdAt: "desc" },
    take: SCAN_LIMIT,
  });

  return rows.some(
    (row) => normalizeEmail(row.email) === emailNorm || normalizePhoneDigits(row.phone) === phoneNorm,
  );
}
