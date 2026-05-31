import { Card } from "@/components/ui/card";
import { LaunchList } from "@/features/launches/components/launch-list";
import { launches } from "@/features/launches/data/launches.mock";

const stats = [
  { label: "Active launches", value: "8" },
  { label: "Pending approvals", value: "3" },
  { label: "Blocked workflows", value: "2" },
];

const DashboardPage = () => {
  return (
    <div className="space-y-8">
      <section>
        <h2 className="text-2xl font-semibold text-slate-950">Overview</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          This dashboard is the foundation for the authenticated launch
          management workspace.
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
            Feature-owned UI with typed launch data and status mapping.
          </p>
        </div>

        <LaunchList launches={launches} />
      </section>
    </div>
  );
};

export default DashboardPage;
