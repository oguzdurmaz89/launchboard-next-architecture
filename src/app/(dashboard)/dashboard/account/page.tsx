import { requireCurrentUser } from "@/lib/auth/get-current-user";

const AccountPage = async () => {
  const user = await requireCurrentUser();

  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-semibold text-slate-950">Account</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          View the signed-in user context used by the protected dashboard.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-950">Signed-in user</h3>

        <p className="mt-2 text-sm text-slate-600">
          This information comes from the server-side Auth.js session.
        </p>

        <dl className="mt-6 space-y-4">
          <div>
            <dt className="text-sm font-medium text-slate-500">Name</dt>
            <dd className="mt-1 text-sm text-slate-950">
              {user.name ?? "Not provided"}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-slate-500">Email</dt>
            <dd className="mt-1 text-sm text-slate-950">
              {user.email ?? "Not provided"}
            </dd>
          </div>

          <div>
            <dt className="text-sm font-medium text-slate-500">User ID</dt>
            <dd className="mt-1 break-all rounded-xl bg-slate-50 px-3 py-2 font-mono text-xs text-slate-700">
              {user.id}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-slate-950">
          Access boundary
        </h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          Dashboard routes are protected on the server. Launch records are
          scoped to the signed-in user, so each user only reads and mutates
          records that belong to their own account.
        </p>
      </section>
    </div>
  );
};

export default AccountPage;
