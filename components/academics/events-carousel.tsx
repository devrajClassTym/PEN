"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import styles from "./events-carousel.module.css";

import Link from "next/link";
import type { SchoolEvent } from "@/lib/school-events";

export default function EventsCarousel({ events }: { events: SchoolEvent[] }) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; scrollLeft: number } | null>(null);
  const [position, setPosition] = useState({ start: 1, end: 3, atStart: true, atEnd: false });

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    function update() {
      if (!element) return;
      const card = element.firstElementChild as HTMLElement | null;
      if (!card) return;
      const step = card.getBoundingClientRect().width + 24;
      const start = Math.round(element.scrollLeft / step) + 1;
      const visible = Math.round((element.clientWidth + 24) / step);
      setPosition({ start, end: Math.min(start + visible - 1, events.length), atStart: element.scrollLeft < 2, atEnd: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2 });
    }
    update();
    element.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => { element.removeEventListener("scroll", update); observer.disconnect(); };
  }, [events.length]);

  function move(direction: number) {
    const element = track.current;
    if (!element?.firstElementChild) return;
    element.scrollBy({ left: direction * (element.firstElementChild.getBoundingClientRect().width + 24), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  function finishDrag(event: PointerEvent<HTMLDivElement>) {
    if (!drag.current) return;
    drag.current = null;
    const element = event.currentTarget;
    const step = (element.firstElementChild?.getBoundingClientRect().width ?? 0) + 24;
    const left = Math.round(element.scrollLeft / step) * step;
    delete element.dataset.dragging;
    if (element.hasPointerCapture(event.pointerId)) element.releasePointerCapture(event.pointerId);
    element.scrollTo({ left, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  const buttonClass = "flex h-12 w-12 items-center justify-center rounded-full border border-[#44321b]/30 transition-colors hover:bg-[#44321b] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit";

  return (
    <section id="academic-events" aria-labelledby="academic-events-title" className="content-container py-20 lg:py-28">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <p className="mb-5 text-xs tracking-[0.22em] uppercase">03 / Upcoming events</p>
          <h2 id="academic-events-title" className="font-[Georgia,serif] text-4xl leading-tight tracking-tight sm:text-5xl">What’s <span className="italic">Happening Now</span></h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[#44321b]/75">Moments to learn, connect, and celebrate together.</p>
        </div>
        <div className="flex gap-3">
          <button type="button" onClick={() => move(-1)} disabled={position.atStart} aria-label="Previous events" aria-controls="academics-event-track" className={buttonClass}>←</button>
          <button type="button" onClick={() => move(1)} disabled={position.atEnd} aria-label="Next events" aria-controls="academics-event-track" className={buttonClass}>→</button>
        </div>
      </div>
      <div role="region" aria-roledescription="carousel" aria-label="Upcoming events" className="mt-10">
        <div ref={track} id="academics-event-track" tabIndex={0} aria-label="Drag, swipe, or use the left and right arrow keys to browse events"
        onPointerDown={(event) => {
          if (event.pointerType !== "mouse" || event.button !== 0) return;
          const element = event.currentTarget;
          drag.current = { x: event.clientX, scrollLeft: element.scrollLeft };
          element.dataset.dragging = "true";
          element.setPointerCapture(event.pointerId);
          element.focus({ preventScroll: true });
          event.preventDefault();
        }}
        onPointerMove={(event) => {
          if (drag.current) event.currentTarget.scrollLeft = drag.current.scrollLeft + drag.current.x - event.clientX;
        }}
        onPointerUp={finishDrag}
        onPointerCancel={finishDrag}
        onLostPointerCapture={finishDrag}
        onKeyDown={(event) => {
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") { event.preventDefault(); move(event.key === "ArrowLeft" ? -1 : 1); }
        }} className={`${styles.track} flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain focus-visible:outline-2 focus-visible:outline-offset-4`}>
          {events.map((event, index) => (
            <article key={event.title} role="group" aria-roledescription="slide" aria-label={`${index + 1} of ${events.length}`} className={`${styles.card} flex shrink-0 snap-start flex-col border border-[#44321b]/15 bg-[#eee8da]/50 p-7`}>
              <div className="flex items-center justify-between gap-3 border-b border-[#44321b]/15 pb-6"><span className="text-[10px] tracking-[0.18em] uppercase">{event.category}</span><span aria-hidden="true" className="font-[Georgia,serif] text-4xl italic text-[#92774f]">0{index + 1}</span></div>
              <h3 className="mt-7 font-[Georgia,serif] text-3xl leading-tight">{event.title}</h3>
              <p className="mt-4 mb-8 text-sm leading-[1.9] text-[#44321b]/75">{event.description}</p>
              <p className="mt-auto text-xs tracking-wide text-[#44321b]/65">{event.schedule ? `${event.schedule.day} ${event.schedule.month}` : "Date to be announced"}</p>
            </article>
          ))}
        </div>
        <p aria-live="polite" aria-atomic="true" className="mt-4 text-xs tracking-wider text-[#44321b]/65">Events {position.start}–{position.end} of {events.length}</p>
      </div>
      <div className="mt-8 flex justify-center">
        <Link href="/school-calendar" className="inline-flex min-h-12 items-center gap-6 rounded-full border border-[#44321b]/30 px-7 py-3 text-sm transition-colors hover:bg-[#44321b] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4">View all events <span aria-hidden="true">↗</span></Link>
      </div>
    </section>
  );
}
