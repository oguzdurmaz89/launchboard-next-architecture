"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/button";
import { createLaunchAction } from "@/features/launches/actions/create-launch";
import { createLaunchInitialState } from "@/features/launches/actions/create-launch-state";

function FieldError({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-2 text-sm text-rose-600">{message}</p>;
}

export const CreateLaunchForm = () => {
  const [state, formAction, isPending] = useActionState(
    createLaunchAction,
    createLaunchInitialState,
  );

  return (
    <form action={formAction} className="space-y-6">
      {state.message ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {state.message}
        </div>
      ) : null}

      <div>
        <label htmlFor="name" className="text-sm font-medium text-slate-700">
          Launch name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          defaultValue={state.values.name}
          placeholder="Customer Portal Redesign"
          className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950"
        />
        <FieldError message={state.fieldErrors.name} />
      </div>

      <div>
        <label
          htmlFor="description"
          className="text-sm font-medium text-slate-700"
        >
          Description
        </label>
        <textarea
          id="description"
          name="description"
          defaultValue={state.values.description}
          placeholder="Describe the launch goal and scope."
          rows={4}
          className="mt-2 w-full resize-none rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950"
        />
        <FieldError message={state.fieldErrors.description} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div>
          <label
            htmlFor="status"
            className="text-sm font-medium text-slate-700"
          >
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={state.values.status ?? "PLANNED"}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-950"
          >
            <option value="PLANNED">Planned</option>
            <option value="IN_PROGRESS">In progress</option>
            <option value="BLOCKED">Blocked</option>
            <option value="LAUNCHED">Launched</option>
          </select>
          <FieldError message={state.fieldErrors.status} />
        </div>

        <div>
          <label
            htmlFor="priority"
            className="text-sm font-medium text-slate-700"
          >
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            defaultValue={state.values.priority ?? "MEDIUM"}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-950"
          >
            <option value="LOW">Low</option>
            <option value="MEDIUM">Medium</option>
            <option value="HIGH">High</option>
          </select>
          <FieldError message={state.fieldErrors.priority} />
        </div>

        <div>
          <label
            htmlFor="targetDate"
            className="text-sm font-medium text-slate-700"
          >
            Target date
          </label>
          <input
            id="targetDate"
            name="targetDate"
            type="date"
            defaultValue={state.values.targetDate}
            className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-950"
          />
          <FieldError message={state.fieldErrors.targetDate} />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={isPending}>
          {isPending ? "Creating..." : "Create launch"}
        </Button>

        <p className="text-sm text-slate-500">
          Validation and creation run on the server.
        </p>
      </div>
    </form>
  );
};
