import { partners } from "@/lib/data";

export function PartnerStrip() {
  return (
    <section className="border-y border-stone-200 bg-[#f7f5ef]">
      <div className="partner-motion mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-5 px-4 py-8 sm:px-6 lg:px-8">
        {partners.map((partner) => (
          <span key={partner} className="interactive-logo text-sm font-semibold tracking-[0.14em] text-stone-500">
            {partner}
          </span>
        ))}
      </div>
    </section>
  );
}
