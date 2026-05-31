import { Card } from "@/components/ui/card";
import { LaunchList } from "@/features/launches/components/launch-list";
import { getLaunches } from "@/features/launches/data/get-launches";
import { requireCurrentUser } from "@/lib/auth/get-current-user";

const DashboardPage = async () => {
  const user = await requireCurrentUser();
  const launches = await getLaunches(user.id);
  const activeLaunches = launches.filter(
    (launch) => launch.status !== "launched",
  ).length;

  const plannedLaunches = launches.filter(
    (launch) => launch.status === "planned",
  ).length;

  const blockedLaunches = launches.filter(
    (launch) => launch.status === "blocked",
  ).length;

  const stats = [
    { label: "Active launches", value: String(activeLaunches) },
    { label: "Planned approvals", value: String(plannedLaunches) },
    { label: "Blocked workflows", value: String(blockedLaunches) },
  ];

  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-semibold text-slate-950">Overview</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          This dashboard is now backed by PostgreSQL through Prisma.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-3 text-3xl font-semibold text-slate-950">
              {stat.value}
            </p>
          </Card>
        ))}
      </section>

      <section className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-950">
            Recent launches
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Server-rendered launch data loaded directly from the database.
          </p>
        </div>

        <LaunchList launches={launches} />
      </section>
    </div>
  );
};
export default DashboardPage;
