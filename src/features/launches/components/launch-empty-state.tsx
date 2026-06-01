export const LaunchEmptyState = () => {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <h3 className="text-lg font-semibold text-slate-950">
        No launches found
      </h3>

      <p className="mt-2 text-sm text-slate-600">
        Try changing your search or filter criteria.
      </p>
    </div>
  );
};
