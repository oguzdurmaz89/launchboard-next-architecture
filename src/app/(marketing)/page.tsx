import Link from "next/link";

const MarketingPage = () => {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col justify-center px-6 py-20">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-sky-400">
          LaunchBoard
        </p>

        <h1 className="max-w-3xl text-5xl font-semibold tracking-tight sm:text-6xl">
          A serious full-stack Next.js architecture case study.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
          Built to demonstrate clean App Router architecture, server/client
          boundaries, authentication, authorization, validation, database-backed
          workflows, and maintainable feature-based code.
        </p>

        <div className="mt-10 flex gap-4">
          <Link
            href="/dashboard"
            className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-200"
          >
            Open dashboard
          </Link>

          <Link
            href="/login"
            className="rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Sign in
          </Link>
        </div>
      </section>
    </main>
  );
};

export default MarketingPage;
