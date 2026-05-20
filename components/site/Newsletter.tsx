export function Newsletter() {
  return (
    <section className="bg-[#ede7d8]">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1fr_1.1fr] lg:px-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.22em] text-stone-600">NEWSLETTER</p>
          <h2 className="mt-3 font-serif text-4xl text-stone-950">スタジオで開催予定のイベント</h2>
        </div>
        <form className="flex flex-col gap-3 self-end sm:flex-row">
          <input
            type="email"
            aria-label="Email address"
            placeholder="Email address"
            className="min-h-12 flex-1 border border-stone-300 bg-white px-4 text-sm outline-none focus-visible:border-stone-950"
          />
          <button className="min-h-12 bg-stone-950 px-7 text-xs font-semibold tracking-[0.18em] text-white transition hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stone-950">
            SUBSCRIBE
          </button>
        </form>
      </div>
    </section>
  );
}
