import { signOut } from "@/lib/auth/auth";
import Link from "next/link";
type DashboardHeaderProps = {
  userName: string;
};

export const DashboardHeader = ({ userName }: DashboardHeaderProps) => {
  return (
    <header className="border-b border-slate-200 bg-white px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">Workspace</p>
          <h1 className="text-xl font-semibold text-slate-950">
            Product Launch Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <p className="hidden text-sm text-slate-600 sm:block">
            <Link
              href="/dashboard/account"
              className="hidden rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-950 sm:block"
            >
              {userName}
            </Link>
          </p>

          <form
            action={async () => {
              "use server";

              await signOut({
                redirectTo: "/",
              });
            }}
          >
            <button
              type="submit"
              className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
            >
              Sign out
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};
