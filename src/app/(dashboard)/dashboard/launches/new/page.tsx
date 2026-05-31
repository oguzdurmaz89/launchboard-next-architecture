const NewLaunchPage = () => {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-semibold text-slate-950">Create launch</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          This route will use Zod validation and a Server Action to create a
          database-backed launch.
        </p>
      </section>

      <section className="rounded-2xl border border-dashed border-slate-300 bg-white p-6">
        <p className="text-sm text-slate-600">
          Launch creation form will be implemented after Prisma, validation, and
          authorization are added.
        </p>
      </section>
    </div>
  );
};

export default NewLaunchPage;
