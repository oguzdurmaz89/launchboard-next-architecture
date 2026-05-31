const LoginPage = () => {
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
          Authentication will be powered by Auth.js. For Day 1, this route
          exists to show the application structure.
        </p>

        <div className="mt-6 rounded-xl border border-dashed border-slate-300 p-4 text-sm text-slate-500">
          Auth form placeholder
        </div>
      </section>
    </main>
  );
};

export default LoginPage;
