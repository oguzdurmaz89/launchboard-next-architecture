import { z } from "zod";

const launchStausValues = [
  "PLANNED",
  "IN_PROGRESS",
  "BLOCKED",
  "LAUNCHED",
] as const;

const launchPriorityValues = ["LOW", "MEDIUM", "HIGH"] as const;

export const createLaunchSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Launch name must be at least 3 characters.")
    .max(80, "Launch name must be at most 80 characters."),

  description: z
    .string()
    .trim()
    .max(500, "Description must be at most 500 characters.")
    .transform((value) => (value.length > 0 ? value : undefined)),

  status: z.enum(launchStausValues),
  priority: z.enum(launchPriorityValues),

  targetDate: z
    .string()
    .min(1, "Target date is required.")
    .refine((value) => !Number.isNaN(new Date(value).getTime()), {
      message: "Select a valid target date.",
    })
    .transform((value) => new Date(`${value}T00:00:00.000Z`)),
});

export type CreateLaunchInput = z.infer<typeof createLaunchSchema>;
