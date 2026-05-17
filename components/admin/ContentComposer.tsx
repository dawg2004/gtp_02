import { categories } from "@/lib/data";

export function ContentComposer() {
  return (
    <section className="border border-stone-200 bg-white p-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Create</p>
          <h2 className="mt-2 font-serif text-3xl text-stone-950">New Event Post</h2>
        </div>
        <div className="flex gap-2">
          <button className="border border-stone-300 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-stone-700">SAVE DRAFT</button>
          <button className="bg-stone-950 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-white">PUBLISH</button>
        </div>
      </div>

      <form className="mt-6 grid gap-4 lg:grid-cols-2">
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Title</span>
          <input className="mt-2 h-11 w-full border border-stone-300 bg-[#fbfaf7] px-3 text-sm outline-none focus:border-stone-950" placeholder="Event title" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Slug</span>
          <input className="mt-2 h-11 w-full border border-stone-300 bg-[#fbfaf7] px-3 text-sm outline-none focus:border-stone-950" placeholder="event-slug" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Category</span>
          <select className="mt-2 h-11 w-full border border-stone-300 bg-[#fbfaf7] px-3 text-sm outline-none focus:border-stone-950">
            {categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Publish Date</span>
          <input type="date" className="mt-2 h-11 w-full border border-stone-300 bg-[#fbfaf7] px-3 text-sm outline-none focus:border-stone-950" />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">YouTube URL</span>
          <input className="mt-2 h-11 w-full border border-stone-300 bg-[#fbfaf7] px-3 text-sm outline-none focus:border-stone-950" placeholder="https://youtube.com/..." />
        </label>
        <label className="block">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Hero Image URL</span>
          <input className="mt-2 h-11 w-full border border-stone-300 bg-[#fbfaf7] px-3 text-sm outline-none focus:border-stone-950" placeholder="https://..." />
        </label>
        <label className="block lg:col-span-2">
          <span className="text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">Report Body</span>
          <textarea className="mt-2 min-h-36 w-full border border-stone-300 bg-[#fbfaf7] px-3 py-3 text-sm leading-7 outline-none focus:border-stone-950" placeholder="Write the event report, workshop notes, photo captions, and archive context." />
        </label>
      </form>
    </section>
  );
}
