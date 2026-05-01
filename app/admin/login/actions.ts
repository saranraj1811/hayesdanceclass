"use server";

import { redirect } from "next/navigation";
import { createAdminSession, verifyAdminPassword } from "@/lib/admin-auth";
import { logServerError } from "@/lib/server-logging";

export type LoginState = {
  error?: string;
};

export async function loginAction(_: LoginState, formData: FormData): Promise<LoginState> {
  try {
    const password = formData.get("password");
    if (typeof password !== "string" || !password.trim()) {
      return { error: "Please enter the admin password." };
    }

    let isValid = false;
    isValid = verifyAdminPassword(password);
    if (!isValid) {
      return { error: "Incorrect password." };
    }

    await createAdminSession();
    redirect("/admin");
  } catch (error) {
    logServerError("admin/loginAction", error);
    return { error: "Admin password is not configured on the server." };
  }
}
