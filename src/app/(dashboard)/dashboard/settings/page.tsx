const SettingsPage = () => {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-semibold text-slate-950">Settings</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Workspace and account settings will live here after authentication is
          added.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-sm text-slate-600">
          This page will later read the current user session and workspace
          permissions from the server.
        </p>
      </section>
    </div>
  );
};
export default SettingsPage;
