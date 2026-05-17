import { articles, formatEventDate } from "@/lib/data";

export function PastArticlesEditor() {
  return (
    <section className="border border-stone-200 bg-white p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Articles</p>
          <h2 className="mt-2 font-serif text-3xl text-stone-950">Past Articles Editor</h2>
        </div>
        <div className="flex gap-2">
          <button className="border border-stone-300 px-4 py-2 text-xs font-semibold tracking-[0.14em]">IMPORT</button>
          <button className="bg-stone-950 px-4 py-2 text-xs font-semibold tracking-[0.14em] text-white">SAVE CHANGES</button>
        </div>
      </div>

      <div className="mt-5 space-y-4">
        {articles.map((article) => (
          <article key={article.id} className="grid gap-4 border border-stone-200 p-4 xl:grid-cols-[120px_1fr_auto]">
            <img src={article.image} alt={article.title} className="aspect-[4/3] w-full object-cover xl:w-[120px]" />
            <div className="grid gap-3 lg:grid-cols-2">
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">Title</span>
                <input defaultValue={article.title} className="mt-2 h-10 w-full border border-stone-300 bg-[#fbfaf7] px-3 text-sm outline-none focus:border-stone-950" />
              </label>
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">Slug</span>
                <input defaultValue={article.slug} className="mt-2 h-10 w-full border border-stone-300 bg-[#fbfaf7] px-3 text-sm outline-none focus:border-stone-950" />
              </label>
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">Category</span>
                <input defaultValue={article.category} className="mt-2 h-10 w-full border border-stone-300 bg-[#fbfaf7] px-3 text-sm outline-none focus:border-stone-950" />
              </label>
              <label className="block">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">Published</span>
                <input defaultValue={formatEventDate(article.date)} className="mt-2 h-10 w-full border border-stone-300 bg-[#fbfaf7] px-3 text-sm outline-none focus:border-stone-950" />
              </label>
              <label className="block lg:col-span-2">
                <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-stone-500">Excerpt</span>
                <textarea defaultValue={article.excerpt} className="mt-2 min-h-20 w-full border border-stone-300 bg-[#fbfaf7] px-3 py-2 text-sm leading-6 outline-none focus:border-stone-950" />
              </label>
            </div>
            <div className="flex gap-2 xl:flex-col">
              <button className="border border-stone-300 px-3 py-2 text-xs font-semibold">EDIT BODY</button>
              <button className="border border-stone-300 px-3 py-2 text-xs font-semibold">PREVIEW</button>
              <button className="border border-stone-300 px-3 py-2 text-xs font-semibold">ARCHIVE</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
