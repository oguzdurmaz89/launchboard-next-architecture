import { CreateLaunchForm } from "@/features/launches/components/create-launch-form";

const NewLaunchPage = () => {
  return (
    <div className="space-y-6">
      <section>
        <h2 className="text-2xl font-semibold text-slate-950">Create launch</h2>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Create a database-backed launch using a Server Action, Zod validation,
          and Prisma.
        </p>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <CreateLaunchForm />
      </section>
    </div>
  );
};

export default NewLaunchPage;
