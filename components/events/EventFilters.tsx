import { categories } from "@/lib/data";

export function EventFilters() {
  return (
    <div className="flex flex-col gap-4 border-y border-stone-200 py-5 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap gap-2">
        {["All", ...categories].map((category) => (
          <button
            key={category}
            className={`border px-4 py-2 text-xs font-semibold tracking-[0.12em] transition hover:bg-stone-950 hover:text-white ${
              category === "All" ? "border-stone-950 bg-stone-950 text-white" : "border-stone-300 bg-white text-stone-700"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid gap-2 sm:grid-cols-3">
        {["Year", "Month", "Sort"].map((label) => (
          <select key={label} aria-label={label} className="h-10 border border-stone-300 bg-white px-3 text-sm text-stone-700">
            <option>{label}</option>
          </select>
        ))}
      </div>
    </div>
  );
}
