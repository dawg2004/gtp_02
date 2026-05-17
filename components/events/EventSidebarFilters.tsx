import { categories, events } from "@/lib/data";

export function EventSidebarFilters() {
  return (
    <aside className="border border-stone-200 bg-white p-6 lg:sticky lg:top-6">
      <h2 className="font-serif text-2xl text-stone-950">Refine Your Search</h2>
      <div className="mt-6 border-t border-stone-200 pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Categories</p>
        <div className="mt-4 space-y-3 text-sm">
          {categories.map((category) => (
            <div key={category} className="flex justify-between">
              <span>{category}</span>
              <span className="text-stone-400">{events.filter((event) => event.category === category).length}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-6 border-t border-stone-200 pt-5">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">Year</p>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex justify-between"><span>2025</span><span className="text-stone-400">7</span></div>
          <div className="flex justify-between"><span>2024</span><span className="text-stone-400">4</span></div>
        </div>
      </div>
      <div className="mt-8 bg-stone-950 p-5 text-white">
        <p className="font-serif text-2xl">Host an Event</p>
        <p className="mt-3 text-sm leading-6 text-stone-300">Bring a workshop, listening session, or creative talk to Good Time Studio.</p>
      </div>
    </aside>
  );
}
