import { videos } from "@/lib/data";

export function VideoLinksManager() {
  return (
    <section className="border border-stone-200 bg-white p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">YouTube</p>
          <h2 className="mt-2 font-serif text-3xl">Video Links</h2>
        </div>
        <button className="bg-stone-950 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-white">ADD VIDEO</button>
      </div>
      <div className="mt-5 divide-y divide-stone-200">
        {videos.map((video) => (
          <div key={video.id} className="grid gap-3 py-4 sm:grid-cols-[72px_1fr_auto] sm:items-center">
            <img src={video.thumbnail} alt={video.title} className="aspect-video w-full object-cover sm:w-[72px]" />
            <div>
              <h3 className="font-medium text-stone-950">{video.title}</h3>
              <p className="mt-1 text-xs text-stone-500">{video.duration} / Linked to event detail</p>
            </div>
            <button className="w-fit border border-stone-300 px-3 py-2 text-xs font-semibold">UPDATE</button>
          </div>
        ))}
      </div>
    </section>
  );
}
