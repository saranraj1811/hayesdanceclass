"use server";

import { redirect } from "next/navigation";
import { createAdminSession, verifyAdminPassword } from "@/lib/admin-auth";

export type LoginState = {
  error?: string;
};

export async function loginAction(_: LoginState, formData: FormData): Promise<LoginState> {
  const password = formData.get("password");
  if (typeof password !== "string" || !password.trim()) {
    return { error: "Please enter the admin password." };
  }

  let isValid = false;
  try {
    isValid = verifyAdminPassword(password);
  } catch {
    return { error: "Admin password is not configured on the server." };
  }

  if (!isValid) {
    return { error: "Incorrect password." };
  }

  await createAdminSession();
  redirect("/admin");
}
