import { events, formatEventDate } from "@/lib/data";

const statusStyle: Record<string, string> = {
  published: "border-emerald-200 bg-emerald-50 text-emerald-800",
  draft: "border-amber-200 bg-amber-50 text-amber-800",
  scheduled: "border-sky-200 bg-sky-50 text-sky-800",
};

export function PublishingQueue() {
  return (
    <section className="border border-stone-200 bg-white p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Manage</p>
          <h2 className="mt-2 font-serif text-3xl">Publishing Queue</h2>
        </div>
        <button className="border border-stone-300 px-4 py-2 text-xs font-semibold tracking-[0.14em]">FILTER</button>
      </div>
      <div className="mt-5 space-y-3">
        {events.slice(0, 6).map((event) => {
          const status = event.status ?? "draft";
          return (
            <article key={event.id} className="grid gap-3 border border-stone-200 p-4 sm:grid-cols-[1fr_auto] sm:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-serif text-xl text-stone-950">{event.title}</h3>
                  <span className={`border px-2 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${statusStyle[status]}`}>
                    {status}
                  </span>
                </div>
                <p className="mt-2 text-sm text-stone-500">{event.category} / {formatEventDate(event.date)} / {event.location}</p>
              </div>
              <div className="flex gap-2">
                <button className="border border-stone-300 px-3 py-2 text-xs font-semibold">EDIT</button>
                <button className="border border-stone-300 px-3 py-2 text-xs font-semibold">PREVIEW</button>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
