import { redirect } from "next/navigation";
import { auth } from "@/lib/auth/auth";

export const requireCurrentUser = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect("/login");
  }

  return session.user;
};
