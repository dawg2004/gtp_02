export function AdminHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-xs font-semibold tracking-[0.2em] text-stone-500">CMS CONTROL ROOM</p>
        <h1 className="mt-2 font-serif text-5xl text-stone-950">Admin Studio</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-stone-600">
          Create event posts, manage reports, connect YouTube videos, and prepare the archive for a future Supabase CMS.
        </p>
      </div>
      <a href="#new-post" className="w-fit bg-stone-950 px-5 py-3 text-xs font-semibold tracking-[0.16em] text-white">CREATE NEW POST</a>
    </div>
  );
}
