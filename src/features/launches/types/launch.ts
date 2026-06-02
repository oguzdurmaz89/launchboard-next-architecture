export type LaunchStatus = "planned" | "in_progress" | "blocked" | "launched";

export type LaunchPriority = "low" | "medium" | "high";

export type Launch = {
  id: string;
  name: string;
  description: string | null;
  status: LaunchStatus;
  priority: LaunchPriority;
  ownerName: string;
  targetDate: string;
};
