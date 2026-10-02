"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { SchoolEvent } from "@/lib/school-events";

export default function UpcomingEvents({ events: schoolEvents = [] }: { events?: SchoolEvent[] }) {
  const events = useMemo(
    () => (Array.isArray(schoolEvents) ? schoolEvents : []).flatMap((event) =>
      event?.schedule
        ? [{ ...event.schedule, name: event.title, description: event.description }]
        : [],
    ),
    [schoolEvents],
  );
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const elapsedRef = useRef(0);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    if (events.length === 0) return;
    elapsedRef.current = 0;
    if (progressRef.current) progressRef.current.style.transform = "scaleX(0)";
  }, [activeIndex, events]);

  useEffect(() => {
    if (hovered || focused) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let previousTime = performance.now();
    let frame: number;

    function tick(now: number) {
      const delta = now - previousTime;
      previousTime = now;
      if (!document.hidden && !reducedMotion.matches) {
        // Preserve elapsed progress while paused and ignore background-tab gaps.
        elapsedRef.current += Math.min(delta, 100);
        const progress = Math.min(elapsedRef.current / 5000, 1);
        if (progressRef.current)
          progressRef.current.style.transform = `scaleX(${progress})`;
        if (progress === 1) {
          setActiveIndex((index) => (index + 1) % events.length);
          return;
        }
      }
      frame = window.requestAnimationFrame(tick);
    }

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [hovered, focused, activeIndex, events]);

  function move(direction: number) {
    setActiveIndex(
      (index) => events.length ? (index + direction + events.length) % events.length : 0,
    );
  }

  const buttonClass =
    "flex h-11 w-11 items-center justify-center rounded-full border border-[#d9c6a5]/30 transition-colors hover:bg-[#d9c6a5] hover:text-[#44321b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d9c6a5]";

  return (
    <section
      id="upcoming-events"
      aria-labelledby="upcoming-events-title"
      className="grid overflow-hidden bg-[#44321b] text-[#f8f6f0] lg:grid-cols-2"
    >
      <div className="relative min-h-64 bg-[#d9dfd5] sm:min-h-[360px] lg:min-h-full">
        <Image
          src="https://picsum.photos/seed/pen-events/1200/1400"
          alt="School events photograph"
          fill
          unoptimized
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      <div className="min-w-0 px-6 py-12 sm:px-12 sm:py-14 lg:px-16 lg:py-16 xl:px-20">
        <p className="mb-5 text-[11px] font-medium tracking-[0.25em] text-[#d9c6a5] uppercase">
          Come be a part of it
        </p>
        <h2
          id="upcoming-events-title"
          className="font-[Georgia,'Times_New_Roman',serif] text-[clamp(2.6rem,4.5vw,4.5rem)] leading-[1.1] tracking-[-0.045em]"
        >
          Upcoming <span className="italic text-[#d9c6a5]">Events</span>
        </h2>
        <p className="mt-6 text-sm leading-[1.9] text-[#f8f6f0]/75 sm:text-base">
          School is made of more than lessons. From student showcases and
          innovation fairs to performances, sports and community gatherings,
          these are the moments we come together to learn, celebrate and
          connect.
        </p>

        <div
          className="mt-8 border-t border-[#d9c6a5]/20 pt-6"
          role="region"
          aria-roledescription="carousel"
          aria-label="Upcoming school events"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onFocusCapture={() => setFocused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
              setFocused(false);
          }}
        >
          <div
            id="events-slider"
            tabIndex={0}
            aria-label="Swipe or use the left and right arrow keys to browse events"
            className="touch-pan-y overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d9c6a5]"
            onKeyDown={(event) => {
              if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
                event.preventDefault();
                move(event.key === "ArrowLeft" ? -1 : 1);
              }
            }}
            onPointerDown={(event) => {
              if (event.button !== 0) return;
              pointerStart.current = { x: event.clientX, y: event.clientY };
              event.currentTarget.setPointerCapture(event.pointerId);
            }}
            onPointerUp={(event) => {
              const start = pointerStart.current;
              pointerStart.current = null;
              if (!start) return;
              const distance = event.clientX - start.x;
              if (
                Math.abs(distance) > 45 &&
                Math.abs(distance) > Math.abs(event.clientY - start.y)
              )
                move(distance < 0 ? 1 : -1);
            }}
            onPointerCancel={() => {
              pointerStart.current = null;
            }}
            onLostPointerCapture={() => {
              pointerStart.current = null;
            }}
          >
            <div
              className="flex transition-transform duration-500 ease-out motion-reduce:transition-none"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {events.map((event, index) => (
                <article
                  key={event.date}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${events.length}`}
                  aria-hidden={index !== activeIndex}
                  className="w-full shrink-0 pr-1"
                >
                  <div className="mb-5 flex items-center gap-6">
                    <time
                      dateTime={event.date}
                      className="flex shrink-0 flex-col border-r border-[#d9c6a5]/20 pr-6"
                    >
                      <span className="font-[Georgia,'Times_New_Roman',serif] text-5xl leading-none">
                        {event.day}
                      </span>
                      <span className="mt-2 text-[10px] tracking-[0.15em] uppercase">
                        {event.month}
                      </span>
                    </time>
                    <p className="text-xs tracking-wide text-[#f8f6f0]/70">
                      {event.time}
                    </p>
                  </div>
                  <h3 className="font-[Georgia,'Times_New_Roman',serif] text-2xl leading-tight sm:text-3xl">
                    {event.name}
                  </h3>
                  <p className="mt-4 max-w-md text-sm leading-[1.9] text-[#f8f6f0]/75">
                    {event.description}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div
            aria-hidden="true"
            className="mt-6 h-0.5 overflow-hidden rounded-full bg-[#d9c6a5]/20"
          >
            <div
              ref={progressRef}
              className="h-full origin-left scale-x-0 bg-[#d9c6a5]"
            />
          </div>
          <div className="flex items-center justify-between gap-3 pt-6">
            <p
              aria-live={hovered || focused ? "polite" : "off"}
              aria-atomic="true"
              className="text-xs tracking-[0.15em]"
            >
              {String(activeIndex + 1).padStart(2, "0")}{" "}
              <span className="mx-2 text-[#d9c6a5]/55">/</span>{" "}
              {String(events.length).padStart(2, "0")}
            </p>
            <div className="flex gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label="Previous event"
                aria-controls="events-slider"
                className={buttonClass}
                disabled={events.length === 0}
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label="Next event"
                aria-controls="events-slider"
                className={buttonClass}
                disabled={events.length === 0}
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <Link
            href="/school-calendar"
            className="inline-flex min-h-12 items-center justify-center rounded-full border border-[#d9c6a5]/40 px-7 py-3 text-sm font-medium transition-colors hover:bg-[#d9c6a5] hover:text-[#44321b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d9c6a5]"
          >
            View all events
          </Link>
        </div>
      </div>
    </section>
  );
}
