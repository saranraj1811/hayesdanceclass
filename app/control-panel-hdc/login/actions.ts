"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_PANEL_BASE_PATH } from "@/lib/admin-routes";
import { createAdminSession, verifyAdminPassword } from "@/lib/admin-auth";
import {
  clearLoginFailures,
  getClientIpFromHeaders,
  isLoginRateLimited,
  recordLoginFailure,
} from "@/lib/login-rate-limit";
import { logServerError } from "@/lib/server-logging";

export type LoginState = {
  error?: string;
};

const GENERIC_FAILURE = "Sign-in failed. Please check your password and try again.";
const RATE_LIMIT_MSG = "Too many sign-in attempts. Please wait before trying again.";
const UNAVAILABLE = "Sign-in is temporarily unavailable.";

export async function loginAction(_: LoginState, formData: FormData): Promise<LoginState> {
  const h = await headers();
  const ip = getClientIpFromHeaders(h);

  if (isLoginRateLimited(ip)) {
    return { error: RATE_LIMIT_MSG };
  }

  const password = formData.get("password");
  if (typeof password !== "string" || !password.trim()) {
    return { error: "Please enter the admin password." };
  }

  let isValid = false;
  try {
    isValid = verifyAdminPassword(password);
  } catch (error) {
    logServerError("control-panel/loginAction/verify", error);
    return { error: UNAVAILABLE };
  }

  if (!isValid) {
    recordLoginFailure(ip);
    return { error: GENERIC_FAILURE };
  }

  clearLoginFailures(ip);

  try {
    await createAdminSession();
  } catch (error) {
    logServerError("control-panel/loginAction/session", error);
    return { error: UNAVAILABLE };
  }

  redirect(ADMIN_PANEL_BASE_PATH);
}
