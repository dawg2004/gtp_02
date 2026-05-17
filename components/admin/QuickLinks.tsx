const links = ["New Article", "Upload Media", "Manage Partners", "Review Drafts"];

export function QuickLinks() {
  return (
    <section className="border border-stone-200 bg-white p-6">
      <h2 className="font-serif text-3xl">Quick Links</h2>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {links.map((link) => (
          <button key={link} className="border border-stone-300 px-4 py-3 text-left text-sm transition hover:bg-stone-950 hover:text-white">{link}</button>
        ))}
      </div>
    </section>
  );
}
