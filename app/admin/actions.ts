"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { EnquiryStatus } from "@prisma/client";
import { clearAdminSession, isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";

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

  await prisma.enquiry.update({
    where: { id: enquiryId },
    data: { status: status as EnquiryStatus },
  });

  revalidatePath("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin/login");
}
