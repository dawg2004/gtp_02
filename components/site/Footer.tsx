import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-950 text-stone-100">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_2fr] lg:px-8">
        <div>
          <div className="font-serif text-2xl leading-none tracking-[0.08em]">
            GOOD TIME
            <span className="block">ARCHIVE</span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-7 text-stone-400">
            Studio events, reports, videos, and photographs from a creative space for food, music, conversation, and craft.
          </p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          {["Archive", "Studio", "Social"].map((title) => (
            <div key={title}>
              <h3 className="text-xs font-semibold tracking-[0.18em] text-stone-300">{title}</h3>
              <div className="mt-4 flex flex-col gap-3 text-sm text-stone-500">
                <Link href="/events">Events</Link>
                <Link href="#">Articles</Link>
                <Link href="#">Videos</Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </footer>
  );
}
