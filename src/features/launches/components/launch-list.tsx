import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Launch } from "@/features/launches/types/launch";
import {
  getLaunchStatusLabel,
  getLaunchStatusTone,
} from "@/features/launches/utils/launch-status";

type LaunchListProps = {
  launches: Launch[];
};

export const LaunchList = ({ launches }: LaunchListProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="grid grid-cols-12 border-b border-slate-200 bg-slate-50 px-4 py-3 text-xs font-medium uppercase tracking-wide text-slate-500">
        <span className="col-span-5">Launch</span>
        <span className="col-span-2">Status</span>
        <span className="col-span-2">Priority</span>
        <span className="col-span-2">Owner</span>
        <span className="col-span-1 text-right">Date</span>
      </div>

      {launches.map((launch) => (
        <Link
          key={launch.id}
          href={`/dashboard/launches/${launch.id}`}
          className="grid grid-cols-12 items-center border-b border-slate-100 px-4 py-4 text-sm transition last:border-b-0 hover:bg-slate-50"
        >
          <div className="col-span-5">
            <p className="font-medium text-slate-950">{launch.name}</p>
            <p className="mt-1 text-xs text-slate-500">{launch.id}</p>
          </div>

          <div className="col-span-2">
            <Badge tone={getLaunchStatusTone(launch.status)}>
              {getLaunchStatusLabel(launch.status)}
            </Badge>
          </div>

          <p className="col-span-2 capitalize text-slate-700">
            {launch.priority}
          </p>

          <p className="col-span-2 text-slate-700">{launch.ownerName}</p>

          <p className="col-span-1 text-right text-slate-500">
            {launch.targetDate}
          </p>
        </Link>
      ))}
    </div>
  );
};
