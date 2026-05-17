import { formatEventDate } from "@/lib/data";
import type { EventItem } from "@/lib/types";

export function EventInfoSidebar({ event }: { event: EventItem }) {
  const rows = [
    ["Date", formatEventDate(event.date)],
    ["Time", event.time ?? "TBA"],
    ["Location", event.location],
    ["Category", event.category],
    ["Level", "Open to all"],
    ["Price", "$48"],
    ["Spots Left", "8"],
    ["Includes", "Materials, tasting, notes"],
  ];

  return (
    <aside className="border border-stone-200 bg-white p-6 lg:sticky lg:top-6">
      <button className="w-full bg-stone-950 px-5 py-3 text-xs font-semibold tracking-[0.16em] text-white">GET TICKETS</button>
      <button className="mt-3 w-full border border-stone-300 px-5 py-3 text-xs font-semibold tracking-[0.16em]">ADD TO CALENDAR</button>
      <div className="mt-6 divide-y divide-stone-200">
        {rows.map(([label, value]) => (
          <div key={label} className="flex justify-between gap-4 py-4 text-sm">
            <span className="text-stone-500">{label}</span>
            <span className="text-right text-stone-950">{value}</span>
          </div>
        ))}
      </div>
      <div className="mt-5 flex gap-2 text-xs font-semibold tracking-[0.14em] text-stone-500">
        <span>SHARE</span><span>IG</span><span>YT</span><span>MAIL</span>
      </div>
    </aside>
  );
}
