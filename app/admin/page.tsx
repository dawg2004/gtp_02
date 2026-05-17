import { AdminHeader } from "@/components/admin/AdminHeader";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { ContentComposer } from "@/components/admin/ContentComposer";
import { EditorialTools } from "@/components/admin/EditorialTools";
import { EventsTable } from "@/components/admin/EventsTable";
import { PastArticlesEditor } from "@/components/admin/PastArticlesEditor";
import { PublishingQueue } from "@/components/admin/PublishingQueue";
import { QuickLinks } from "@/components/admin/QuickLinks";
import { RecentActivity } from "@/components/admin/RecentActivity";
import { StatCard } from "@/components/admin/StatCard";
import { VideoLinksManager } from "@/components/admin/VideoLinksManager";

export default function AdminPage() {
  return (
    <main className="min-h-screen bg-[#f3efe6] text-stone-950 lg:grid lg:grid-cols-[280px_1fr]">
      <AdminSidebar />
      <section className="p-4 sm:p-6 lg:p-8">
        <AdminHeader />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total Events" value="128" />
          <StatCard label="Published Articles" value="42" />
          <StatCard label="Videos Linked" value="31" />
          <StatCard label="Draft Posts" value="8" />
        </div>
        <div className="mt-6 grid gap-6 xl:grid-cols-2">
          <RecentActivity />
          <QuickLinks />
        </div>
        <div id="new-post" className="mt-6 scroll-mt-6">
          <ContentComposer />
        </div>
        <div className="mt-6">
          <EditorialTools />
        </div>
        <div className="mt-6">
          <PastArticlesEditor />
        </div>
        <div className="mt-6 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <PublishingQueue />
          <VideoLinksManager />
        </div>
        <div className="mt-6">
          <EventsTable />
        </div>
      </section>
    </main>
  );
}
