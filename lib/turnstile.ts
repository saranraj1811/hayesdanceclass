type TurnstileVerifyResponse = {
  success?: boolean;
  "error-codes"?: string[];
};

export function isTurnstileConfigured(): boolean {
  return Boolean(process.env.TURNSTILE_SECRET_KEY && process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
}

export async function verifyTurnstileToken(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!isTurnstileConfigured()) {
    return true;
  }

  if (!token || !token.trim()) {
    return false;
  }

  try {
    const body = new URLSearchParams();
    body.set("secret", secret!);
    body.set("response", token.trim());

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });

    const payload = (await response.json()) as TurnstileVerifyResponse;
    return payload.success === true;
  } catch {
    return false;
  }
}
