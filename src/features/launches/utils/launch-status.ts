import { BadgeTone } from "@/components/ui/badge";
import type { LaunchStatus } from "@/features/launches/types/launch";

export const getLaunchStatusLabel = (status: LaunchStatus) => {
  const labels: Record<LaunchStatus, string> = {
    planned: "Planned",
    in_progress: "In Progress",
    blocked: "Blocked",
    launched: "Launched",
  };
  return labels[status];
};

export const getLaunchStatusTone = (status: LaunchStatus): BadgeTone => {
  const tonest: Record<LaunchStatus, BadgeTone> = {
    planned: "info",
    in_progress: "warning",
    blocked: "danger",
    launched: "success",
  };
  return tonest[status];
};
