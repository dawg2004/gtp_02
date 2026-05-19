import Link from "next/link";
import { formatEventDate } from "@/lib/data";
import type { EventItem } from "@/lib/types";

export function EventCard({ event }: { event: EventItem }) {
  return (
    <article className="interactive-card group border border-stone-200 bg-white">
      <Link href={`/events/${event.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-stone-200">
          <img src={event.image} alt={event.title} className="interactive-image h-full w-full object-cover" />
          <div className="absolute left-4 top-4 bg-white px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-stone-950">
            {formatEventDate(event.date)}
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">{event.category}</p>
            <span aria-label="Bookmark" className="text-lg text-stone-500 transition group-hover:rotate-45 group-hover:text-stone-950">◇</span>
          </div>
          <h3 className="mt-3 font-serif text-2xl leading-tight text-stone-950">{event.title}</h3>
          <p className="mt-4 text-sm text-stone-500">{event.location}</p>
        </div>
      </Link>
    </article>
  );
}
