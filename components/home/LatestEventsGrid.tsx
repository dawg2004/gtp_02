import { events } from "@/lib/data";
import { EventCard } from "@/components/events/EventCard";

export function LatestEventsGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-6">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-stone-500">ARCHIVE</p>
          <h2 className="mt-2 font-serif text-4xl text-stone-950">Latest Events</h2>
        </div>
        <a href="/events" className="hidden text-xs font-semibold tracking-[0.16em] sm:block">VIEW ALL</a>
      </div>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {events.slice(0, 4).map((event) => <EventCard key={event.id} event={event} />)}
      </div>
    </section>
  );
}
