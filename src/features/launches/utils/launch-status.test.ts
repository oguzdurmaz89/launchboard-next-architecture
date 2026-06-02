import { describe, expect, it } from "vitest";
import {
  getLaunchStatusLabel,
  getLaunchStatusTone,
} from "@/features/launches/utils/launch-status";

describe("launch status helpers", () => {
  it("returns user-facing labels", () => {
    expect(getLaunchStatusLabel("planned")).toBe("Planned");
    expect(getLaunchStatusLabel("in_progress")).toBe("In Progress");
    expect(getLaunchStatusLabel("blocked")).toBe("Blocked");
    expect(getLaunchStatusLabel("launched")).toBe("Launched");
  });

  it("returns badge tones", () => {
    expect(getLaunchStatusTone("planned")).toBe("info");
    expect(getLaunchStatusTone("in_progress")).toBe("warning");
    expect(getLaunchStatusTone("blocked")).toBe("danger");
    expect(getLaunchStatusTone("launched")).toBe("success");
  });
});
