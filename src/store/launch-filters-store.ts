import { create } from "zustand";
import type {
  LaunchPriority,
  LaunchStatus,
} from "@/features/launches/types/launch";

type LaunchStatusFilter = LaunchStatus | "all";
type LaunchPriorityFilter = LaunchPriority | "all";

type LaunchFiltersState = {
  searchQuery: string;
  status: LaunchStatusFilter;
  priority: LaunchPriorityFilter;
  setSearchQuery: (searchQuery: string) => void;
  setStatus: (status: LaunchStatusFilter) => void;
  setPriority: (priority: LaunchPriorityFilter) => void;
  resetFilters: () => void;
};

export const useLaunchFiltersStore = create<LaunchFiltersState>((set) => ({
  searchQuery: "",
  status: "all",
  priority: "all",

  setSearchQuery: (searchQuery) => {
    set({ searchQuery });
  },

  setStatus: (status) => {
    set({ status });
  },

  setPriority: (priority) => {
    set({ priority });
  },

  resetFilters: () => {
    set({
      searchQuery: "",
      status: "all",
      priority: "all",
    });
  },
}));
