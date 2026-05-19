import Link from "next/link";
import { events, formatEventDate } from "@/lib/data";

export function HeroFeaturedEvent() {
  const event = events[0];
  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="hero-sweep relative min-h-[520px] overflow-hidden bg-stone-950 sm:min-h-[460px]">
        <img src={event.image} alt={event.title} className="hero-drift absolute inset-0 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/45 to-transparent" />
        <div className="relative flex min-h-[520px] max-w-[calc(100%-2rem)] flex-col justify-end p-6 text-white sm:min-h-[460px] sm:p-10 lg:max-w-5xl">
          <p className="text-xs font-semibold tracking-[0.22em]">FEATURED EVENT</p>
          <h1 className="mt-4 whitespace-nowrap font-serif text-[clamp(2.6rem,8vw,6.5rem)] leading-none">{event.title}</h1>
          <p className="mt-5 text-lg leading-8 text-stone-100">{event.subtitle}</p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-stone-200">
            <span>{formatEventDate(event.date)}</span>
            <span>{event.location}</span>
          </div>
          <Link href={`/events/${event.slug}`} className="cta-arrow float-on-hover mt-8 w-fit bg-white px-6 py-3 text-xs font-semibold tracking-[0.18em] text-stone-950 transition hover:bg-stone-200">
            EXPLORE EVENT
          </Link>
        </div>
        <div className="absolute bottom-6 right-6 flex gap-2">
          <button aria-label="Previous event" className="pulse-control grid size-11 place-items-center border border-white/60 text-white transition hover:bg-white hover:text-stone-950">‹</button>
          <button aria-label="Next event" className="pulse-control grid size-11 place-items-center border border-white/60 text-white transition hover:bg-white hover:text-stone-950">›</button>
        </div>
      </div>
    </section>
  );
}
