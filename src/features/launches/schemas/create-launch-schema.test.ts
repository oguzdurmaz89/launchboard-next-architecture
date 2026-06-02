import { describe, expect, it } from "vitest";
import { createLaunchSchema } from "@/features/launches/schemas/create-launch-schema";

describe("createLaunchSchema", () => {
  it("accepts valid launch input and transforms targetDate to Date", () => {
    const result = createLaunchSchema.safeParse({
      name: "Customer Portal Redesign",
      description: "Improve the customer-facing portal.",
      status: "PLANNED",
      priority: "HIGH",
      targetDate: "2026-06-12",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.targetDate).toBeInstanceOf(Date);
      expect(result.data.name).toBe("Customer Portal Redesign");
    }
  });

  it("rejects short launch names", () => {
    const result = createLaunchSchema.safeParse({
      name: "AB",
      description: "Valid description",
      status: "PLANNED",
      priority: "HIGH",
      targetDate: "2026-06-12",
    });

    expect(result.success).toBe(false);
  });

  it("transforms an empty description into undefined", () => {
    const result = createLaunchSchema.safeParse({
      name: "Billing Dashboard",
      description: "",
      status: "PLANNED",
      priority: "MEDIUM",
      targetDate: "2026-06-24",
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.description).toBeUndefined();
    }
  });

  it("rejects invalid status values", () => {
    const result = createLaunchSchema.safeParse({
      name: "Billing Dashboard",
      description: "Valid description",
      status: "INVALID",
      priority: "MEDIUM",
      targetDate: "2026-06-24",
    });

    expect(result.success).toBe(false);
  });
});
