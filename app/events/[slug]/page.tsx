import { notFound } from "next/navigation";
import { EventDetailHero } from "@/components/events/EventDetailHero";
import { EventInfoSidebar } from "@/components/events/EventInfoSidebar";
import { PhotoGallery } from "@/components/events/PhotoGallery";
import { RelatedEvents } from "@/components/events/RelatedEvents";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { events, getEventBySlug } from "@/lib/data";

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = getEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-[#f7f5ef] text-stone-950">
      <Header active="EVENTS" />
      <EventDetailHero event={event} />
      <section className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_340px] lg:px-8">
        <article>
          <section id="video" className="overflow-hidden border border-stone-200 bg-white p-4">
            <div className="aspect-video bg-stone-950">
              {event.youtubeUrl ? (
                <iframe
                  src={event.youtubeUrl}
                  title={`${event.title} video`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <div className="grid h-full place-items-center text-white">Video coming soon</div>
              )}
            </div>
          </section>
          <section id="report" className="mt-12">
            <p className="text-xs font-semibold tracking-[0.22em] text-stone-500">REPORT</p>
            <h2 className="mt-3 font-serif text-5xl text-stone-950">About This Workshop</h2>
            <p className="mt-6 text-lg leading-9 text-stone-700">{event.reportBody ?? event.description}</p>
            <div className="mt-8 grid gap-4 sm:grid-cols-4">
              {["Learn", "Make", "Taste", "Connect"].map((item) => (
                <div key={item} className="border border-stone-200 bg-white p-5">
                  <h3 className="font-serif text-2xl">{item}</h3>
                  <p className="mt-3 text-sm leading-6 text-stone-500">A focused studio moment designed for practical discovery.</p>
                </div>
              ))}
            </div>
          </section>
          <PhotoGallery event={event} />
          {event.host ? (
            <section className="mt-14 grid gap-6 border border-stone-200 bg-white p-6 sm:grid-cols-[160px_1fr]">
              <img src={event.host.image} alt={event.host.name} className="aspect-square w-full object-cover" />
              <div>
                <p className="text-xs font-semibold tracking-[0.18em] text-stone-500">YOUR HOST</p>
                <h2 className="mt-2 font-serif text-4xl">{event.host.name}</h2>
                <p className="mt-1 text-sm text-stone-500">{event.host.title}</p>
                <p className="mt-5 leading-7 text-stone-700">{event.host.bio}</p>
              </div>
            </section>
          ) : null}
          <RelatedEvents currentSlug={event.slug} />
        </article>
        <EventInfoSidebar event={event} />
      </section>
      <Footer />
    </main>
  );
}
