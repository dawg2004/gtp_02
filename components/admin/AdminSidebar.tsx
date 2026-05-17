import Link from "next/link";

const items = ["Dashboard", "New Post", "Events", "Articles", "Videos", "Media Library", "Categories", "Comments", "Pages", "Settings"];

export function AdminSidebar() {
  return (
    <aside className="border-r border-stone-200 bg-[#f7f5ef] p-5 lg:min-h-screen">
      <Link href="/" className="font-serif text-xl leading-none tracking-[0.08em] text-stone-950">
        GOOD TIME
        <span className="block">ARCHIVE</span>
      </Link>
      <nav className="mt-10 flex gap-2 overflow-x-auto lg:flex-col lg:overflow-visible">
        {items.map((item) => (
          <a key={item} href={item === "New Post" ? "#new-post" : "#"} className={`whitespace-nowrap px-4 py-3 text-sm ${item === "Dashboard" ? "bg-stone-950 text-white" : "text-stone-600 hover:bg-white"}`}>
            {item}
          </a>
        ))}
      </nav>
      <div className="mt-10 hidden border border-stone-200 bg-white p-4 lg:block">
        <p className="font-serif text-xl">View Site</p>
        <p className="mt-2 text-sm leading-6 text-stone-500">Preview the public archive experience.</p>
        <Link href="/" className="mt-4 inline-block text-xs font-semibold tracking-[0.16em]">OPEN SITE</Link>
      </div>
    </aside>
  );
}
