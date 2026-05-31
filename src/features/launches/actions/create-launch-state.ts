export type CreateLaunchField =
  | "name"
  | "description"
  | "status"
  | "priority"
  | "targetDate";

export type CreateLaunchActionState = {
  status: "idle" | "error";
  message: string | null;
  fieldErrors: Partial<Record<CreateLaunchField, string>>;
  values: Partial<Record<CreateLaunchField, string>>;
};

export const createLaunchInitialState: CreateLaunchActionState = {
  status: "idle",
  message: null,
  fieldErrors: {},
  values: {},
};
