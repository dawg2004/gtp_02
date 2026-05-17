import { formatEventDate } from "@/lib/data";
import type { EventItem } from "@/lib/types";

export function EventDetailHero({ event }: { event: EventItem }) {
  return (
    <section className="relative min-h-[520px] overflow-hidden bg-stone-950">
      <img src={event.image} alt={event.title} className="absolute inset-0 h-full w-full object-cover opacity-65" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-transparent" />
      <div className="relative mx-auto flex min-h-[520px] max-w-7xl flex-col justify-end px-4 py-12 text-white sm:px-6 lg:px-8">
        <p className="text-xs font-semibold uppercase tracking-[0.22em]">{event.category}</p>
        <h1 className="mt-4 max-w-3xl font-serif text-5xl leading-none sm:text-7xl">{event.title}</h1>
        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-stone-200">
          <span>{formatEventDate(event.date)}</span>
          <span>{event.time}</span>
          <span>{event.location}</span>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#video" className="bg-white px-5 py-3 text-xs font-semibold tracking-[0.16em] text-stone-950">WATCH VIDEO</a>
          <a href="#report" className="border border-white/70 px-5 py-3 text-xs font-semibold tracking-[0.16em]">READ REPORT</a>
          <button className="border border-white/70 px-5 py-3 text-xs font-semibold tracking-[0.16em]">SHARE</button>
        </div>
      </div>
    </section>
  );
}
