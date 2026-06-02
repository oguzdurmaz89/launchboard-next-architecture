import { describe, expect, it } from "vitest";
import { filterLaunches } from "@/features/launches/utils/filter-launches";
import type { Launch } from "@/features/launches/types/launch";

const launches: Launch[] = [
  {
    id: "launch_1",
    name: "Customer Portal Redesign",
    description: "Improve customer navigation.",
    status: "in_progress",
    priority: "high",
    ownerName: "Demo User",
    targetDate: "2026-06-12",
  },
  {
    id: "launch_2",
    name: "Billing Dashboard",
    description: "Finance reporting workflow.",
    status: "planned",
    priority: "medium",
    ownerName: "Finance Team",
    targetDate: "2026-06-24",
  },
  {
    id: "launch_3",
    name: "Admin Access Review",
    description: null,
    status: "blocked",
    priority: "high",
    ownerName: "Security Team",
    targetDate: "2026-06-05",
  },
];

describe("filterLaunches", () => {
  it("returns all launches when filters are empty", () => {
    const result = filterLaunches({
      launches,
      searchQuery: "",
      status: "all",
      priority: "all",
    });

    expect(result).toHaveLength(3);
  });

  it("filters by search query using launch name", () => {
    const result = filterLaunches({
      launches,
      searchQuery: "billing",
      status: "all",
      priority: "all",
    });

    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe("launch_2");
  });

  it("filters by search query using description", () => {
    const result = filterLaunches({
      launches,
      searchQuery: "navigation",
      status: "all",
      priority: "all",
    });

    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe("launch_1");
  });

  it("filters by status and priority together", () => {
    const result = filterLaunches({
      launches,
      searchQuery: "",
      status: "blocked",
      priority: "high",
    });

    expect(result).toHaveLength(1);
    expect(result[0]?.id).toBe("launch_3");
  });
});
