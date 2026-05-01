"use client";

import { Turnstile } from "@marsidev/react-turnstile";

type OptionalTurnstileProps = {
  siteKey: string | undefined;
  onToken: (token: string | null) => void;
  resetKey: number;
};

export function OptionalTurnstile({ siteKey, onToken, resetKey }: OptionalTurnstileProps) {
  if (!siteKey) {
    return null;
  }

  return (
    <div className="flex justify-center py-2">
      <Turnstile
        key={resetKey}
        siteKey={siteKey}
        onSuccess={(token) => onToken(token)}
        onExpire={() => onToken(null)}
        onError={() => onToken(null)}
      />
    </div>
  );
}
