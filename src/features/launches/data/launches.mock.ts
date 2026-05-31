import type { Launch } from "@/features/launches/types/launch";

export const launches: Launch[] = [
  {
    id: "launch_001",
    name: "Customer Portal Redesign",
    status: "in_progress",
    priority: "high",
    ownerName: "Oguz Durmaz",
    targetDate: "2026-06-12",
  },
  {
    id: "launch_002",
    name: "Billing Dashboard",
    status: "planned",
    priority: "medium",
    ownerName: "Platform Team",
    targetDate: "2026-06-24",
  },
  {
    id: "launch_003",
    name: "Admin Access Review",
    status: "blocked",
    priority: "high",
    ownerName: "Security Team",
    targetDate: "2026-06-05",
  },
];
