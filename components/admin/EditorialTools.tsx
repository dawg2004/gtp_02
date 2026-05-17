const tools = [
  ["Article Editor", "Write reports, set excerpts, and attach a cover image."],
  ["Photo Gallery", "Arrange event images and alt text for archive pages."],
  ["Event Settings", "Manage date, location, category, host, and ticket details."],
  ["Supabase Ready", "Fixed data today, database-backed publishing later."],
];

export function EditorialTools() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {tools.map(([title, description]) => (
        <article key={title} className="border border-stone-200 bg-white p-5">
          <h3 className="font-serif text-2xl text-stone-950">{title}</h3>
          <p className="mt-3 text-sm leading-6 text-stone-500">{description}</p>
          <button className="mt-5 text-xs font-semibold tracking-[0.16em] text-stone-950">OPEN</button>
        </article>
      ))}
    </section>
  );
}
