import { EventCard } from "@/components/events/EventCard";
import { EventFilters } from "@/components/events/EventFilters";
import { EventSidebarFilters } from "@/components/events/EventSidebarFilters";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { events } from "@/lib/data";

export default function EventsPage() {
  return (
    <main className="min-h-screen bg-[#f7f5ef] text-stone-950">
      <Header active="EVENTS" />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
          <div>
            <p className="text-xs font-semibold tracking-[0.22em] text-stone-500">EVENTS</p>
            <h1 className="mt-3 font-serif text-6xl leading-none text-stone-950">All Events Archive</h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600">
              Browse studio workshops, listening sessions, exhibitions, talks, and community gatherings from the Good Time archive.
            </p>
          </div>
          <img src={events[5].image} alt="Studio event archive" className="aspect-[16/9] w-full object-cover" />
        </div>
        <div className="mt-10">
          <EventFilters />
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-8 px-4 pb-16 sm:px-6 lg:grid-cols-[280px_1fr] lg:px-8">
        <EventSidebarFilters />
        <div>
          <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-stone-500">Showing 1-12 of 128 events</p>
            <div className="flex gap-2">
              <button aria-label="Grid view" className="grid size-10 place-items-center border border-stone-300 bg-white">▦</button>
              <button aria-label="List view" className="grid size-10 place-items-center border border-stone-300 bg-white">☰</button>
            </div>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {events.map((event) => <EventCard key={event.id} event={event} />)}
          </div>
          <div className="mt-10 flex justify-center gap-2">
            {["1", "2", "3", "Next"].map((page) => (
              <button key={page} className={`border px-4 py-3 text-sm ${page === "1" ? "border-stone-950 bg-stone-950 text-white" : "border-stone-300 bg-white"}`}>{page}</button>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
