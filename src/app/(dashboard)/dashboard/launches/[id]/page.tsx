import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { getLaunchById } from "@/features/launches/data/get-launches";
import {
  getLaunchStatusLabel,
  getLaunchStatusTone,
} from "@/features/launches/utils/launch-status";

type LaunchDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const LaunchDetailsPage = async ({ params }: LaunchDetailsPageProps) => {
  const { id } = await params;
  const launch = await getLaunchById(id);
  if (!launch) {
    notFound();
  }
  return (
    <div className="space-y-6">
      <section>
        <p className="text-sm text-slate-500">{launch.id}</p>
        <h2 className="mt-1 text-2xl font-semibold text-slate-950">
          {launch.name}
        </h2>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Status</p>
          <div className="mt-3">
            <Badge tone={getLaunchStatusTone(launch.status)}>
              {getLaunchStatusLabel(launch.status)}
            </Badge>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Priority</p>
          <p className="mt-3 text-lg font-semibold capitalize text-slate-950">
            {launch.priority}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Owner</p>
          <p className="mt-3 text-lg font-semibold text-slate-950">
            {launch.ownerName}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-5">
          <p className="text-sm text-slate-500">Target date</p>
          <p className="mt-3 text-lg font-semibold text-slate-950">
            {launch.targetDate}
          </p>
        </div>
      </section>
    </div>
  );
};
export default LaunchDetailsPage;
