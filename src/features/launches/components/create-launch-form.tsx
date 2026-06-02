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

const inputClassName =
  "mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-4 focus:ring-slate-200";

const selectClassName =
  "mt-2 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-10 text-sm text-slate-950 shadow-sm outline-none transition focus:border-slate-950 focus:ring-4 focus:ring-slate-200";

export const CreateLaunchForm = () => {
  const [state, formAction, isPending] = useActionState(
    createLaunchAction,
    createLaunchInitialState,
  );

  return (
    <form action={formAction} className="space-y-6">
      {state.message ? (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
          {state.message}
        </div>
      ) : null}

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="border-b border-slate-100 pb-5">
          <p className="text-sm font-medium text-slate-500">Step 1</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-950">
            Launch details
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Give the launch a clear name and describe the scope.
          </p>
        </div>

        <div className="mt-6 space-y-5">
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-slate-700"
            >
              Launch name
            </label>

            <input
              id="name"
              name="name"
              type="text"
              defaultValue={state.values.name}
              placeholder="Customer Portal Redesign"
              className={inputClassName}
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
              placeholder="Describe the launch goal, expected outcome, and important context."
              rows={5}
              className={`${inputClassName} resize-none leading-6`}
            />

            <FieldError message={state.fieldErrors.description} />
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="border-b border-slate-100 pb-5">
          <p className="text-sm font-medium text-slate-500">Step 2</p>
          <h3 className="mt-1 text-lg font-semibold text-slate-950">
            Planning
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Set the current status, priority, and target delivery date.
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-3">
          <div>
            <label
              htmlFor="status"
              className="text-sm font-medium text-slate-700"
            >
              Status
            </label>

            <div className="relative">
              <select
                id="status"
                name="status"
                defaultValue={state.values.status ?? "PLANNED"}
                className={selectClassName}
              >
                <option value="PLANNED">Planned</option>
                <option value="IN_PROGRESS">In progress</option>
                <option value="BLOCKED">Blocked</option>
                <option value="LAUNCHED">Launched</option>
              </select>

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                ▾
              </span>
            </div>

            <FieldError message={state.fieldErrors.status} />
          </div>

          <div>
            <label
              htmlFor="priority"
              className="text-sm font-medium text-slate-700"
            >
              Priority
            </label>

            <div className="relative">
              <select
                id="priority"
                name="priority"
                defaultValue={state.values.priority ?? "MEDIUM"}
                className={selectClassName}
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                ▾
              </span>
            </div>

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
              className={inputClassName}
            />

            <FieldError message={state.fieldErrors.targetDate} />
          </div>
        </div>
      </section>

      <div className="flex flex-col gap-3 rounded-3xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-950">
            Ready to create this launch?
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Validation runs on the server before anything is written to the
            database.
          </p>
        </div>

        <Button type="submit" disabled={isPending} className="sm:min-w-36">
          {isPending ? "Creating..." : "Create launch"}
        </Button>
      </div>
    </form>
  );
};
