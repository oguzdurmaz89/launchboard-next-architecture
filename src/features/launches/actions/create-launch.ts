"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { createLaunchSchema } from "@/features/launches/schemas/create-launch-schema";
import type {
  CreateLaunchActionState,
  CreateLaunchField,
} from "@/features/launches/actions/create-launch-state";

const getFormString = (formData: FormData, key: CreateLaunchField): string => {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
};

export const createLaunchAction = async (
  _previousState: CreateLaunchActionState,
  formData: FormData,
): Promise<CreateLaunchActionState> => {
  const rawInput = {
    name: getFormString(formData, "name"),
    description: getFormString(formData, "description"),
    status: getFormString(formData, "status"),
    priority: getFormString(formData, "priority"),
    targetDate: getFormString(formData, "targetDate"),
  };
  const parsedInput = createLaunchSchema.safeParse(rawInput);
  if (!parsedInput.success) {
    const fieldErrors = z.flattenError(parsedInput.error).fieldErrors;
    return {
      status: "error",
      message: "Please correct the errors below.",
      fieldErrors: {
        name: fieldErrors.name?.[0],
        description: fieldErrors.description?.[0],
        status: fieldErrors.status?.[0],
        priority: fieldErrors.priority?.[0],
        targetDate: fieldErrors.targetDate?.[0],
      },
      values: rawInput,
    };
  }

  const owner = await prisma.user.findUnique({
    where: {
      email: "oguz@launchboard.dev",
    },
    select: {
      id: true,
    },
  });

  if (!owner) {
    return {
      status: "error",
      message: "Demo owner has not found. Run npm run db:seed first",
      fieldErrors: {},
      values: rawInput,
    };
  }

  const launch = await prisma.launch.create({
    data: {
      name: parsedInput.data.name,
      description: parsedInput.data.description,
      status: parsedInput.data.status,
      priority: parsedInput.data.priority,
      targetDate: parsedInput.data.targetDate,
      ownerId: owner.id,
    },
    select: {
      id: true,
    },
  });
  revalidatePath("/dashboard");
  revalidatePath("/dashbaord/launches");
  redirect(`/dashboard/launches/${launch.id}`);
};
//Form -> Server Action -> Zod -> Prisma -> PostgreSQL
