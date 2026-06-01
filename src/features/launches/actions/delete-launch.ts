"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { prisma } from "@/lib/db/prisma";
import { requireCurrentUser } from "@/lib/auth/get-current-user";

export const deleteLaunchAction = async (formData: FormData) => {
  const launchId = formData.get("launchId");
  if (typeof launchId !== "string" || launchId.length === 0) {
    return notFound();
  }
  const user = await requireCurrentUser();
  const launch = await prisma.launch.findUnique({
    where: {
      id: launchId,
      ownerId: user.id,
    },
    select: {
      id: true,
    },
  });
  if (!launch) {
    return notFound();
  }
  await prisma.launch.delete({
    where: {
      id: launchId,
    },
  });
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/launch");
  redirect("/dashboard/launches");
};
