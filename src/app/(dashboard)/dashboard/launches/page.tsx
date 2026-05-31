import { LaunchList } from "@/features/launches/components/launch-list";
import { launches } from "@/features/launches/data/launches.mock";

const LaunchesPage = () => {
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
};
export default LaunchesPage;
