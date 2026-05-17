import Link from "next/link";
import { events, formatEventDate } from "@/lib/data";

export function UpcomingEvents() {
  return (
    <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[0.9fr_0.8fr_1fr] lg:px-8">
      <img src={events[1].image} alt="Upcoming studio event" className="aspect-[4/5] w-full object-cover" />
      <div className="self-center">
        <p className="text-xs font-semibold tracking-[0.22em] text-stone-500">UPCOMING</p>
        <h2 className="mt-3 font-serif text-5xl leading-none text-stone-950">What&apos;s Next at the Studio</h2>
        <p className="mt-5 text-sm leading-7 text-stone-600">Upcoming cooking sessions, intimate performances, and practical creative workshops.</p>
      </div>
      <div className="divide-y divide-stone-200 self-center border-y border-stone-200">
        {events.slice(1, 5).map((event) => (
          <Link key={event.id} href={`/events/${event.slug}`} className="grid grid-cols-[6rem_1fr] gap-4 py-5">
            <span className="text-xs font-semibold uppercase tracking-[0.12em] text-stone-500">{formatEventDate(event.date)}</span>
            <span className="font-serif text-2xl leading-tight text-stone-950">{event.title}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
