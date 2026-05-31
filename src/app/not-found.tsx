import Link from "next/link";

const NotFoundPage = () => {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">
      <section className="max-w-md text-center">
        <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-400">
          404
        </p>

        <h1 className="mt-4 text-3xl font-semibold">Page not found</h1>

        <p className="mt-3 text-sm leading-6 text-slate-300">
          The route you are looking for does not exist or you do not have access
          to it.
        </p>

        <Link
          href="/dashboard"
          className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
        >
          Back to dashboard
        </Link>
      </section>
    </main>
  );
};

export default NotFoundPage;
