"use client";

import Link from "next/link";
import { useState } from "react";

const navItems = ["HOME", "EVENTS", "ARTICLES", "VIDEOS", "PHOTOS", "ABOUT"];

export function Header({ active = "HOME" }: { active?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-40 border-b border-stone-200 bg-[#f7f5ef]">
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
        <button
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((current) => !current)}
          className="grid size-10 place-items-center border border-stone-300 text-lg lg:hidden"
        >
          {open ? "x" : "="}
        </button>
      </div>
      {open ? (
        <div className="lg:hidden">
          <button aria-label="Close menu overlay" className="fixed inset-0 z-40 bg-stone-950/25" onClick={() => setOpen(false)} />
          <div className="fixed right-0 top-0 z-50 flex h-dvh w-[min(86vw,360px)] flex-col border-l border-stone-200 bg-[#f7f5ef] p-5 shadow-xl">
            <div className="flex items-start justify-between gap-4">
              <Link href="/" onClick={() => setOpen(false)} className="font-serif text-lg leading-none tracking-[0.08em] text-stone-950">
                GOOD TIME
                <span className="block">ARCHIVE</span>
              </Link>
              <button aria-label="Close menu" onClick={() => setOpen(false)} className="grid size-10 place-items-center border border-stone-300 text-lg">
                x
              </button>
            </div>
            <nav className="mt-10 flex flex-col border-y border-stone-200">
              {navItems.map((item) => (
                <Link
                  key={item}
                  href={item === "HOME" ? "/" : item === "EVENTS" ? "/events" : "#"}
                  onClick={() => setOpen(false)}
                  className={`border-b border-stone-200 px-1 py-4 text-sm font-semibold tracking-[0.18em] last:border-b-0 ${
                    active === item ? "text-stone-950" : "text-stone-600"
                  }`}
                >
                  {item}
                </Link>
              ))}
            </nav>
            <div className="mt-6 grid gap-3">
              <button aria-label="Search" className="h-11 border border-stone-300 text-xs font-semibold tracking-[0.16em]">
                SEARCH
              </button>
              <button className="h-11 bg-stone-950 text-xs font-semibold tracking-[0.16em] text-white">
                SUBMIT EVENT
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
