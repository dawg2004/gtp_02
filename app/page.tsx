import { HeroFeaturedEvent } from "@/components/home/HeroFeaturedEvent";
import { LatestEventsGrid } from "@/components/home/LatestEventsGrid";
import { PopularEventsColumn } from "@/components/home/PopularEventsColumn";
import { ReportsColumn } from "@/components/home/ReportsColumn";
import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { VideosColumn } from "@/components/home/VideosColumn";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Newsletter } from "@/components/site/Newsletter";
import { PartnerStrip } from "@/components/site/PartnerStrip";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#f7f5ef] text-stone-950">
      <Header active="HOME" />
      <HeroFeaturedEvent />
      <section className="mx-auto grid max-w-7xl gap-5 px-4 py-6 sm:px-6 lg:grid-cols-3 lg:px-8">
        <ReportsColumn />
        <VideosColumn />
        <PopularEventsColumn />
      </section>
      <LatestEventsGrid />
      <PartnerStrip />
      <UpcomingEvents />
      <Newsletter />
      <Footer />
    </main>
  );
}
