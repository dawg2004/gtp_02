import { events } from "@/lib/data";
import { EventCard } from "./EventCard";

export function RelatedEvents({ currentSlug }: { currentSlug: string }) {
  return (
    <section className="mt-14">
      <h2 className="font-serif text-4xl text-stone-950">Related Events</h2>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {events.filter((event) => event.slug !== currentSlug).slice(0, 3).map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </section>
  );
}
