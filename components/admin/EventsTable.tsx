const rows = [
  ["発酵ワークショップ", "Workshop", "Published", "2025年5月18日"],
  ["アナログナイツ・ライブセッション", "Music", "Published", "2025年2月14日"],
  ["コミュニティを育てるデザイン", "Talk", "Published", "2025年4月26日"],
  ["パン作りワークショップ", "Workshop", "Published", "2025年1月19日"],
  ["スタジオで聴くジャズの夜", "Music", "Scheduled", "2025年6月12日"],
  ["フィルム写真ウォーク", "Photo Walk", "Draft", "2025年3月22日"],
];

export function EventsTable() {
  return (
    <section className="border border-stone-200 bg-white p-6">
      <div className="flex items-center justify-between gap-4">
        <h2 className="font-serif text-3xl">Events</h2>
        <button className="text-xs font-semibold tracking-[0.16em]">VIEW ALL</button>
      </div>
      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[680px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-stone-200 text-left text-xs uppercase tracking-[0.14em] text-stone-500">
              <th className="py-3 font-semibold">Event</th>
              <th className="py-3 font-semibold">Category</th>
              <th className="py-3 font-semibold">Status</th>
              <th className="py-3 font-semibold">Publish Date</th>
              <th className="py-3 text-right font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rows.map(([event, category, status, date]) => (
              <tr key={event} className="border-b border-stone-100">
                <td className="py-4 font-medium text-stone-950">{event}</td>
                <td className="py-4 text-stone-600">{category}</td>
                <td className="py-4"><span className="border border-stone-300 px-2 py-1 text-xs">{status}</span></td>
                <td className="py-4 text-stone-600">{date}</td>
                <td className="py-4 text-right"><button aria-label={`Edit ${event}`} className="px-2">E</button><button aria-label={`More ${event}`} className="px-2">...</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
