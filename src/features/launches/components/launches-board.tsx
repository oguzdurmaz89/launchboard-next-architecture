"use client";

import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { LaunchEmptyState } from "@/features/launches/components/launch-empty-state";
import { LaunchList } from "@/features/launches/components/launch-list";
import type { Launch } from "@/features/launches/types/launch";
import { useLaunchFiltersStore } from "@/store/launch-filters-store";

type LaunchesBoardProps = {
  launches: Launch[];
};

export const LaunchesBoard = ({ launches }: LaunchesBoardProps) => {
  const searchQuery = useLaunchFiltersStore((state) => state.searchQuery);
  const status = useLaunchFiltersStore((state) => state.status);
  const priority = useLaunchFiltersStore((state) => state.priority);
  const setSearchQuery = useLaunchFiltersStore((state) => state.setSearchQuery);
  const setStatus = useLaunchFiltersStore((state) => state.setStatus);
  const setPriority = useLaunchFiltersStore((state) => state.setPriority);
  const resetFilters = useLaunchFiltersStore((state) => state.resetFilters);

  const filteredLaunches = useMemo(() => {
    const normalizedSearchQuery = searchQuery.trim().toLowerCase();

    return launches.filter((launch) => {
      const matchesSearch =
        normalizedSearchQuery.length === 0 ||
        launch.name.toLowerCase().includes(normalizedSearchQuery) ||
        launch.ownerName.toLowerCase().includes(normalizedSearchQuery);

      const matchesStatus = status === "all" || launch.status === status;
      const matchesPriority =
        priority === "all" || launch.priority === priority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [launches, priority, searchQuery, status]);

  return (
    <div className="space-y-4">
      <section className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="grid gap-4 md:grid-cols-[1fr_180px_180px_auto]">
          <div>
            <label
              htmlFor="launch-search"
              className="text-sm font-medium text-slate-700"
            >
              Search
            </label>

            <input
              id="launch-search"
              type="search"
              value={searchQuery}
              onChange={(event) => {
                setSearchQuery(event.target.value);
              }}
              placeholder="Search by launch or owner"
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition placeholder:text-slate-400 focus:border-slate-950"
            />
          </div>

          <div>
            <label
              htmlFor="launch-status-filter"
              className="text-sm font-medium text-slate-700"
            >
              Status
            </label>

            <select
              id="launch-status-filter"
              value={status}
              onChange={(event) => {
                setStatus(
                  event.target.value as Parameters<typeof setStatus>[0],
                );
              }}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-950"
            >
              <option value="all">All statuses</option>
              <option value="planned">Planned</option>
              <option value="in_progress">In progress</option>
              <option value="blocked">Blocked</option>
              <option value="launched">Launched</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="launch-priority-filter"
              className="text-sm font-medium text-slate-700"
            >
              Priority
            </label>

            <select
              id="launch-priority-filter"
              value={priority}
              onChange={(event) => {
                setPriority(
                  event.target.value as Parameters<typeof setPriority>[0],
                );
              }}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-950 outline-none transition focus:border-slate-950"
            >
              <option value="all">All priorities</option>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <div className="flex items-end">
            <Button type="button" variant="secondary" onClick={resetFilters}>
              Reset
            </Button>
          </div>
        </div>

        <p className="mt-4 text-sm text-slate-500">
          Showing {filteredLaunches.length} of {launches.length} launches.
        </p>
      </section>

      {filteredLaunches.length > 0 ? (
        <LaunchList launches={filteredLaunches} />
      ) : (
        <LaunchEmptyState />
      )}
    </div>
  );
};
