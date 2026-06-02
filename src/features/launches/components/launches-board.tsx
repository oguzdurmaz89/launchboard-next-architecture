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

const inputClassName =
  "mt-2 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-950 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-slate-950 focus:ring-4 focus:ring-slate-200";

const selectClassName =
  "mt-2 h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 pr-10 text-sm text-slate-950 shadow-sm outline-none transition focus:border-slate-950 focus:ring-4 focus:ring-slate-200";

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
        launch.ownerName.toLowerCase().includes(normalizedSearchQuery) ||
        launch.description?.toLowerCase().includes(normalizedSearchQuery);

      const matchesStatus = status === "all" || launch.status === status;
      const matchesPriority =
        priority === "all" || launch.priority === priority;

      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [launches, priority, searchQuery, status]);

  return (
    <div className="space-y-4">
      <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end">
          <div className="min-w-0 flex-1">
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
              placeholder="Search by launch, description, or owner"
              className={inputClassName}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:w-[380px]">
            <div>
              <label
                htmlFor="launch-status-filter"
                className="text-sm font-medium text-slate-700"
              >
                Status
              </label>

              <div className="relative">
                <select
                  id="launch-status-filter"
                  value={status}
                  onChange={(event) => {
                    setStatus(
                      event.target.value as Parameters<typeof setStatus>[0],
                    );
                  }}
                  className={selectClassName}
                >
                  <option value="all">All statuses</option>
                  <option value="planned">Planned</option>
                  <option value="in_progress">In progress</option>
                  <option value="blocked">Blocked</option>
                  <option value="launched">Launched</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm leading-none text-slate-400">
                  ▾
                </span>
              </div>
            </div>

            <div>
              <label
                htmlFor="launch-priority-filter"
                className="text-sm font-medium text-slate-700"
              >
                Priority
              </label>

              <div className="relative">
                <select
                  id="launch-priority-filter"
                  value={priority}
                  onChange={(event) => {
                    setPriority(
                      event.target.value as Parameters<typeof setPriority>[0],
                    );
                  }}
                  className={selectClassName}
                >
                  <option value="all">All priorities</option>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>

                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-sm leading-none text-slate-400">
                  ▾
                </span>
              </div>
            </div>
          </div>

          <Button
            type="button"
            variant="secondary"
            onClick={resetFilters}
            className="h-11 w-full lg:w-auto"
          >
            Reset
          </Button>
        </div>

        <div className="mt-4 flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-500">
            Showing{" "}
            <span className="font-medium text-slate-950">
              {filteredLaunches.length}
            </span>{" "}
            of{" "}
            <span className="font-medium text-slate-950">
              {launches.length}
            </span>{" "}
            launches.
          </p>

          <p className="text-xs text-slate-400">
            Filters are handled on the client with Zustand.
          </p>
        </div>
      </section>

      {filteredLaunches.length > 0 ? (
        <LaunchList launches={filteredLaunches} />
      ) : (
        <LaunchEmptyState />
      )}
    </div>
  );
};
