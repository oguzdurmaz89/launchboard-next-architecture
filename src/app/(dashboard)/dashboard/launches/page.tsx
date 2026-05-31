import { LaunchList } from "@/features/launches/components/launch-list";
import { getLaunches } from "@/features/launches/data/get-launches";
import { requireCurrentUser } from "@/lib/auth/get-current-user";

export default async function LaunchesPage() {
  const user = await requireCurrentUser();
  const launches = await getLaunches(user.id);

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-semibold text-slate-950">Launches</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Manage product launches, ownership, status, priority, and target
          delivery dates.
        </p>
      </section>

      <LaunchList launches={launches} />
    </div>
  );
}
