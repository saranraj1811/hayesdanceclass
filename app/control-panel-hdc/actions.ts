"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { EnquiryStatus, InstructorEnquiryStatus } from "@prisma/client";
import { ADMIN_LOGIN_PATH, ADMIN_PANEL_BASE_PATH } from "@/lib/admin-routes";
import { clearAdminSession, isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { logServerError } from "@/lib/server-logging";

export type UpdateStatusState = {
  ok: boolean;
  message: string;
};

export async function updateEnquiryStatus(
  _: UpdateStatusState,
  formData: FormData,
): Promise<UpdateStatusState> {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return { ok: false, message: "Session expired. Please login again." };
  }

  const enquiryId = formData.get("enquiryId");
  const status = formData.get("status");

  if (typeof enquiryId !== "string" || typeof status !== "string") {
    return { ok: false, message: "Invalid enquiry payload." };
  }

  if (!Object.values(EnquiryStatus).includes(status as EnquiryStatus)) {
    return { ok: false, message: "Invalid status selected." };
  }

  try {
    await prisma.enquiry.update({
      where: { id: enquiryId },
      data: { status: status as EnquiryStatus },
    });
  } catch (error) {
    logServerError("admin/updateEnquiryStatus", error);
    return { ok: false, message: "Failed to update student enquiry status." };
  }

  revalidatePath(ADMIN_PANEL_BASE_PATH);
  return { ok: true, message: "Student enquiry status updated." };
}

export async function updateInstructorEnquiryStatus(
  _: UpdateStatusState,
  formData: FormData,
): Promise<UpdateStatusState> {
  const authed = await isAdminAuthenticated();
  if (!authed) {
    return { ok: false, message: "Session expired. Please login again." };
  }

  const enquiryId = formData.get("enquiryId");
  const status = formData.get("status");

  if (typeof enquiryId !== "string" || typeof status !== "string") {
    return { ok: false, message: "Invalid enquiry payload." };
  }

  if (!Object.values(InstructorEnquiryStatus).includes(status as InstructorEnquiryStatus)) {
    return { ok: false, message: "Invalid status selected." };
  }

  try {
    await prisma.instructorEnquiry.update({
      where: { id: enquiryId },
      data: { status: status as InstructorEnquiryStatus },
    });
  } catch (error) {
    logServerError("admin/updateInstructorEnquiryStatus", error);
    return { ok: false, message: "Failed to update instructor enquiry status." };
  }

  revalidatePath(ADMIN_PANEL_BASE_PATH);
  return { ok: true, message: "Instructor enquiry status updated." };
}

export async function logoutAction() {
  try {
    await clearAdminSession();
  } catch (error) {
    logServerError("admin/logoutAction", error);
  }
  redirect(ADMIN_LOGIN_PATH);
}
