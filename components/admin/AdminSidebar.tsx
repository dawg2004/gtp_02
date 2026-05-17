"use client";

import Link from "next/link";
import { useState } from "react";

const items = ["Dashboard", "New Post", "Events", "Articles", "Videos", "Media Library", "Categories", "Comments", "Pages", "Settings"];

export function AdminSidebar() {
  const [open, setOpen] = useState(false);
  const nav = (animated = false) => (
    <nav className="flex flex-col gap-2">
      {items.map((item, index) => (
        <a
          key={item}
          href={item === "New Post" ? "#new-post" : "#"}
          onClick={() => setOpen(false)}
          style={animated ? { animationDelay: `${70 + index * 28}ms` } : undefined}
          className={`${animated ? "menu-item-reveal" : ""} whitespace-nowrap px-4 py-3 text-sm transition hover:pl-5 ${
            item === "Dashboard" ? "bg-stone-950 text-white" : "text-stone-600 hover:bg-white"
          }`}
        >
          {item}
        </a>
      ))}
    </nav>
  );

  return (
    <>
      <div className="flex items-center justify-between border-b border-stone-200 bg-[#f7f5ef] p-4 lg:hidden">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Admin Menu</span>
        <button
          aria-label={open ? "Close admin menu" : "Open admin menu"}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          className="grid size-11 place-items-center border border-stone-300 bg-[#fbfaf7]"
        >
          <span className="flex w-5 flex-col gap-1.5">
            <span className={`h-px bg-stone-950 transition ${open ? "translate-y-[7px] rotate-45" : ""}`} />
            <span className={`h-px bg-stone-950 transition ${open ? "opacity-0" : ""}`} />
            <span className={`h-px bg-stone-950 transition ${open ? "-translate-y-[7px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>
      <aside className="hidden border-r border-stone-200 bg-[#f7f5ef] p-5 lg:block lg:min-h-screen">
        {nav()}
        <div className="mt-10 border border-stone-200 bg-white p-4">
          <p className="font-serif text-xl">View Site</p>
          <p className="mt-2 text-sm leading-6 text-stone-500">Preview the public archive experience.</p>
          <Link href="/" className="mt-4 inline-block text-xs font-semibold tracking-[0.16em]">OPEN SITE</Link>
        </div>
      </aside>
      {open ? (
        <div className="lg:hidden">
          <button aria-label="Close admin menu overlay" className="drawer-backdrop fixed inset-0 z-40 bg-stone-950/35 backdrop-blur-[2px]" onClick={() => setOpen(false)} />
          <aside className="drawer-left fixed left-0 top-0 z-50 flex h-dvh w-[min(88vw,360px)] flex-col border-r border-stone-200 bg-[#f7f5ef] p-5 shadow-2xl">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.18em] text-stone-500">Admin Menu</span>
              <button aria-label="Close admin menu" onClick={() => setOpen(false)} className="grid size-10 place-items-center border border-stone-300 bg-white">
                <span className="relative block size-4">
                  <span className="absolute left-0 top-1/2 h-px w-full rotate-45 bg-stone-950" />
                  <span className="absolute left-0 top-1/2 h-px w-full -rotate-45 bg-stone-950" />
                </span>
              </button>
            </div>
            <div className="mt-6">{nav(true)}</div>
            <div className="mt-8 border border-stone-200 bg-white p-4">
              <p className="font-serif text-xl">View Site</p>
              <p className="mt-2 text-sm leading-6 text-stone-500">Preview the public archive experience.</p>
              <Link href="/" onClick={() => setOpen(false)} className="mt-4 inline-block text-xs font-semibold tracking-[0.16em]">OPEN SITE</Link>
            </div>
          </aside>
        </div>
      ) : null}
    </>
  );
}
