"use client";

import { useEffect, useRef, useState } from "react";
import { schoolEvents, type SchoolEvent } from "@/lib/school-events";

export default function EventsGrid() {
  const [selected, setSelected] = useState<SchoolEvent | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!selected) return;
    const modal = dialog.current;
    if (!modal) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    modal.showModal();
    return () => {
      document.body.style.overflow = previousOverflow;
      modal.close();
      trigger.current?.focus({ preventScroll: true });
    };
  }, [selected]);

  return (
    <section id="calendar-events" aria-labelledby="calendar-events-title" className="content-container scroll-mt-8 py-20 lg:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="mb-5 text-xs tracking-[0.22em] uppercase">Explore / All events</p>
          <h2 id="calendar-events-title" className="font-[Georgia,serif] text-4xl leading-tight tracking-tight sm:text-5xl">What’s <span className="italic">Happening Now</span></h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#44321b]/75">Find a moment to be part of. Select any event to see the details.</p>
        </div>
        <span className="rounded-full border border-[#44321b]/20 px-5 py-2 text-sm">{schoolEvents.length} events to explore</span>
      </div>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {schoolEvents.map((event, index) => (
          <li key={event.id} className="min-w-0">
            <button type="button" aria-haspopup="dialog" aria-controls="school-event-dialog" aria-label={`View details for ${event.title}`} onClick={(click) => { trigger.current = click.currentTarget; setSelected(event); }} className="group flex h-full w-full cursor-pointer flex-col border border-[#44321b]/15 bg-[#eee8da]/50 p-7 text-left transition-colors hover:border-[#92774f] hover:bg-[#eee8da] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#44321b] sm:p-8">
              <span className="flex w-full items-center justify-between gap-4 border-b border-[#44321b]/15 pb-6"><span className="text-[10px] tracking-[0.18em] uppercase">{event.category}</span><span aria-hidden="true" className="font-[Georgia,serif] text-4xl italic text-[#92774f]">{String(index + 1).padStart(2, "0")}</span></span>
              <span className="mt-6 text-xs tracking-wide text-[#44321b]/65">{event.schedule ? <time dateTime={event.schedule.date}>{event.schedule.day} {event.schedule.month}</time> : "Date to be announced"}</span>
              <span className="mt-4 font-[Georgia,serif] text-3xl leading-tight">{event.title}</span>
              <span className="mt-4 mb-8 text-sm leading-[1.9] text-[#44321b]/75">{event.description}</span>
              <span className="mt-auto flex w-full items-center justify-between gap-4 border-t border-[#44321b]/15 pt-5 text-sm font-medium">View event details <span aria-hidden="true" className="flex h-8 w-8 items-center justify-center rounded-full border border-[#44321b]/25 transition-colors group-hover:bg-[#44321b] group-hover:text-white">↗</span></span>
            </button>
          </li>
        ))}
      </ul>

      <dialog ref={dialog} id="school-event-dialog" aria-labelledby="event-detail-title" aria-describedby="event-detail-description" onCancel={(event) => { event.preventDefault(); setSelected(null); }} onClick={(event) => { if (event.target === event.currentTarget) { const bounds = event.currentTarget.getBoundingClientRect(); if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) setSelected(null); } }} className="fixed inset-0 m-auto max-h-[85dvh] w-[calc(100%_-_2rem)] max-w-2xl overflow-y-auto overscroll-contain rounded-2xl border-0 bg-[#f8f6f0] p-0 text-[#44321b] shadow-2xl backdrop:bg-[#201b13]/70 backdrop:backdrop-blur-sm">
        {selected && <div className="p-6 sm:p-10">
          <div className="flex items-center justify-between gap-6"><p className="text-xs tracking-[0.2em] text-[#92774f] uppercase">{selected.category} / School event</p><button type="button" autoFocus onClick={() => setSelected(null)} aria-label="Close event details" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#44321b]/25 text-2xl hover:bg-[#eee8da] focus-visible:outline-2 focus-visible:outline-offset-4">×</button></div>
          <h2 id="event-detail-title" className="mt-7 font-[Georgia,serif] text-3xl leading-tight tracking-tight sm:text-4xl">{selected.title}</h2>
          <p id="event-detail-description" className="mt-5 text-base leading-[1.9] text-[#44321b]/80">{selected.description}</p>
          <dl className="my-7 grid gap-6 border-y border-[#44321b]/15 py-6 sm:grid-cols-2">
            <div><dt className="text-xs tracking-wider uppercase">Date</dt><dd className="mt-2 text-sm">{selected.schedule ? <time dateTime={selected.schedule.date}>{selected.schedule.day} {selected.schedule.month}</time> : "To be announced"}</dd></div>
            <div><dt className="text-xs tracking-wider uppercase">Time</dt><dd className="mt-2 text-sm">{selected.schedule?.time ?? "To be announced"}</dd></div>
            <div className="sm:col-span-2"><dt className="text-xs tracking-wider uppercase">Venue</dt><dd className="mt-2 text-sm">Campus and venue to be confirmed by the school.</dd></div>
          </dl>
          <h3 className="font-[Georgia,serif] text-2xl">About this event</h3>
          <p className="mt-3 text-sm leading-[1.9] text-[#44321b]/75">{selected.details}</p>
        </div>}
      </dialog>
    </section>
  );
}
