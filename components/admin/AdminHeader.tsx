export function AdminHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-stone-500">CMS OVERVIEW</p>
        <h1 className="mt-2 font-serif text-5xl text-stone-950">Dashboard</h1>
      </div>
      <button className="w-fit bg-stone-950 px-5 py-3 text-xs font-semibold tracking-[0.16em] text-white">CREATE NEW EVENT</button>
    </div>
  );
}
