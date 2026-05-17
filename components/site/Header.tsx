import Link from "next/link";

const navItems = ["HOME", "EVENTS", "ARTICLES", "VIDEOS", "PHOTOS", "ABOUT"];

export function Header({ active = "HOME" }: { active?: string }) {
  return (
    <header className="border-b border-stone-200 bg-[#f7f5ef]">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="font-serif text-lg leading-none tracking-[0.08em] text-stone-950">
          GOOD TIME
          <span className="block">ARCHIVE</span>
        </Link>
        <nav className="hidden items-center gap-6 text-[11px] font-medium tracking-[0.18em] text-stone-700 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item}
              href={item === "HOME" ? "/" : item === "EVENTS" ? "/events" : "#"}
              className={`pb-1 transition hover:text-stone-950 ${active === item ? "border-b border-stone-950 text-stone-950" : ""}`}
            >
              {item}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <button aria-label="Search" className="grid size-10 place-items-center rounded-full border border-stone-300 text-sm transition hover:bg-white">
            S
          </button>
          <button className="rounded-none bg-stone-950 px-5 py-3 text-[11px] font-semibold tracking-[0.16em] text-white transition hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950">
            SUBMIT EVENT
          </button>
        </div>
        <button aria-label="Open menu" className="grid size-10 place-items-center border border-stone-300 text-lg lg:hidden">
          =
        </button>
      </div>
    </header>
  );
}
