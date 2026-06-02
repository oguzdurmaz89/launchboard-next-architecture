import type { Launch } from "@/features/launches/types/launch";
import type {
  LaunchPriorityFilter,
  LaunchStatusFilter,
} from "@/store/launch-filters-store";

type FilterLaunchesInput = {
  launches: Launch[];
  searchQuery: string;
  status: LaunchStatusFilter;
  priority: LaunchPriorityFilter;
};

export const filterLaunches = ({
  launches,
  searchQuery,
  status,
  priority,
}: FilterLaunchesInput): Launch[] => {
  const normalizedSearchQuery = searchQuery.trim().toLowerCase();

  return launches.filter((launch) => {
    const matchesSearch =
      normalizedSearchQuery.length === 0 ||
      launch.name.toLowerCase().includes(normalizedSearchQuery) ||
      launch.ownerName.toLowerCase().includes(normalizedSearchQuery) ||
      launch.description?.toLowerCase().includes(normalizedSearchQuery);

    const matchesStatus = status === "all" || launch.status === status;
    const matchesPriority = priority === "all" || launch.priority === priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });
};
