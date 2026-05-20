import Link from "next/link";
import { events, formatEventDate } from "@/lib/data";

export function HeroFeaturedEvent() {
  const event = events[0];
  return (
    <section className="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
      <div className="relative h-[120px] overflow-hidden bg-stone-950 sm:h-[150px] lg:h-[180px]">
        <img src={event.image} alt={event.title} className="hero-drift absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
        <div className="relative flex h-full max-w-[calc(100%-1rem)] flex-col justify-end p-3 text-white sm:max-w-[68%] sm:p-4 lg:max-w-[60%] lg:p-5">
          <p className="text-[9px] font-semibold tracking-[0.24em] sm:text-[10px]">FEATURED EVENT</p>
          <h1 className="mt-1 whitespace-nowrap font-serif text-[clamp(1.3rem,3.6vw,2.9rem)] leading-none">{event.title}</h1>
          <p className="mt-1 line-clamp-1 text-[10px] leading-4 text-stone-100 sm:text-xs lg:text-sm">{event.subtitle}</p>
          <div className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-stone-200 sm:text-[11px]">
            <span>{formatEventDate(event.date)}</span>
            <span>{event.location}</span>
          </div>
          <Link href={`/events/${event.slug}`} className="cta-arrow float-on-hover mt-2 w-fit bg-white px-3 py-2 text-[10px] font-semibold tracking-[0.16em] text-stone-950 transition hover:bg-stone-200 sm:px-4">
            EXPLORE EVENT
          </Link>
        </div>
        <div className="absolute bottom-2 right-2 hidden gap-1.5 sm:flex lg:bottom-3 lg:right-3">
          <button aria-label="Previous event" className="pulse-control grid size-7 place-items-center border border-white/60 text-xs text-white transition hover:bg-white hover:text-stone-950 lg:size-8">‹</button>
          <button aria-label="Next event" className="pulse-control grid size-7 place-items-center border border-white/60 text-xs text-white transition hover:bg-white hover:text-stone-950 lg:size-8">›</button>
        </div>
      </div>
    </section>
  );
}
