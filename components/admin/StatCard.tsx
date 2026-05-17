export function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-stone-200 bg-white p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">{label}</p>
      <p className="mt-5 font-serif text-5xl text-stone-950">{value}</p>
    </div>
  );
}
