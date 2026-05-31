import { redirect } from "next/navigation";
import { auth, signIn } from "@/lib/auth/auth";

const LoginPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6">
      <section className="w-full max-w-md rounded-2xl bg-white p-6 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-600">
          LaunchBoard
        </p>

        <h1 className="mt-4 text-2xl font-semibold text-slate-950">
          Sign in to your workspace
        </h1>

        <p className="mt-2 text-sm text-slate-600">
          Sign in with GitHub to access your launch management dashboard.
        </p>

        <form
          action={async () => {
            "use server";

            await signIn("github", {
              redirectTo: "/dashboard",
            });
          }}
          className="mt-6"
        >
          <button
            type="submit"
            className="w-full rounded-xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Continue with GitHub
          </button>
        </form>
      </section>
    </main>
  );
};

export default LoginPage;
