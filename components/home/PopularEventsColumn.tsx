import Link from "next/link";
import { events, formatEventDate } from "@/lib/data";

export function PopularEventsColumn() {
  return (
    <section className="border border-stone-200 bg-white p-5">
      <h2 className="font-serif text-3xl">Popular Events</h2>
      <div className="mt-5 divide-y divide-stone-200">
        {events.slice(2, 7).map((event) => (
          <Link key={event.id} href={`/events/${event.slug}`} className="flex gap-4 py-4 first:pt-0">
            <div className="w-20 shrink-0 bg-[#ede7d8] px-2 py-3 text-center text-[11px] font-semibold uppercase leading-5 tracking-[0.12em]">
              {formatEventDate(event.date).replace(",", "")}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-[11px] uppercase tracking-[0.16em] text-stone-500">{event.category}</p>
              <h3 className="mt-1 font-serif text-lg leading-tight">{event.title}</h3>
            </div>
            <span className="text-stone-500">◇</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
