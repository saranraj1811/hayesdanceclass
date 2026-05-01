"use client";

import { useActionState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";
import { type UpdateStatusState } from "@/app/control-panel-hdc/actions";

type StatusUpdateFormProps = {
  action: (state: UpdateStatusState, formData: FormData) => Promise<UpdateStatusState>;
  enquiryId: string;
  currentStatus: string;
  statuses: string[];
};

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-md bg-slate-800 px-3 py-1 text-xs font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-70"
    >
      {pending ? "Saving..." : "Update"}
    </button>
  );
}

export function StatusUpdateForm({ action, enquiryId, currentStatus, statuses }: StatusUpdateFormProps) {
  const router = useRouter();
  const initialUpdateStatusState: UpdateStatusState = { ok: false, message: "" };
  const [state, formAction] = useActionState(action, initialUpdateStatusState);

  useEffect(() => {
    if (state.ok) {
      router.refresh();
    }
  }, [router, state.ok]);

  return (
    <form action={formAction} className="min-w-[170px] space-y-2">
      <input type="hidden" name="enquiryId" value={enquiryId} />
      <div className="flex items-center gap-2">
        <select
          name="status"
          defaultValue={currentStatus}
          className="w-full rounded-md border border-slate-300 bg-white px-2 py-1 text-xs text-slate-900 focus:border-slate-500 focus:outline-none"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <SubmitButton />
      </div>
      {state.message ? (
        <p className={`text-[11px] ${state.ok ? "text-emerald-600" : "text-red-600"}`}>{state.message}</p>
      ) : null}
    </form>
  );
}
