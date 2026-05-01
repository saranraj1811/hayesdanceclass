"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { EnquiryStatus, InstructorEnquiryStatus } from "@prisma/client";
import { clearAdminSession, isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { logServerError } from "@/lib/server-logging";

export async function updateEnquiryStatus(formData: FormData) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    redirect("/admin/login");
  }

  const enquiryId = formData.get("enquiryId");
  const status = formData.get("status");

  if (typeof enquiryId !== "string" || typeof status !== "string") {
    return;
  }

  if (!Object.values(EnquiryStatus).includes(status as EnquiryStatus)) {
    return;
  }

  try {
    await prisma.enquiry.update({
      where: { id: enquiryId },
      data: { status: status as EnquiryStatus },
    });
  } catch (error) {
    logServerError("admin/updateEnquiryStatus", error);
    return;
  }

  revalidatePath("/admin");
}

export async function updateInstructorEnquiryStatus(formData: FormData) {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    redirect("/admin/login");
  }

  const enquiryId = formData.get("enquiryId");
  const status = formData.get("status");

  if (typeof enquiryId !== "string" || typeof status !== "string") {
    return;
  }

  if (!Object.values(InstructorEnquiryStatus).includes(status as InstructorEnquiryStatus)) {
    return;
  }

  try {
    await prisma.instructorEnquiry.update({
      where: { id: enquiryId },
      data: { status: status as InstructorEnquiryStatus },
    });
  } catch (error) {
    logServerError("admin/updateInstructorEnquiryStatus", error);
    return;
  }

  revalidatePath("/admin");
}

export async function logoutAction() {
  try {
    await clearAdminSession();
  } catch (error) {
    logServerError("admin/logoutAction", error);
  }
  redirect("/admin/login");
}
