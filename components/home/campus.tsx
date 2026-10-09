"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const campuses = [
  {
    id: "dabagardens-senior",
    name: "Dabagardens Senior",
    image: "/images/gallery/campus1.jpeg",
  },
  {
    id: "dabagardens-junior",
    name: "Dabagardens Junior",
    image: "/images/gallery/campus2.jpeg",
  },
  {
    id: "akkayyapalem-senior",
    name: "Akkayyapalem Senior",
    image: "/images/gallery/campus3.JPG",
  },
  {
    id: "akkayyapalem-junior",
    name: "Akkayyapalem Junior",
    image: "/images/gallery/campus4.JPG",
  },
  {
    id: "madhavadara",
    name: "Madhavadara",
    image: "/images/gallery/campus5.jpg",
  },
  {
    id: "yendada",
    name: "Yendada",
    image: "/images/gallery/campus6.JPG",
  },
];

export default function Campus() {
  const galleryRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const elapsedRef = useRef(0);
  const dragRef = useRef<{ x: number; scrollLeft: number } | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [hasFocus, setHasFocus] = useState(false);

  useEffect(() => {
    elapsedRef.current = 0;
    if (progressRef.current) progressRef.current.style.transform = "scaleX(0)";
  }, [activeIndex]);

  useEffect(() => {
    if (isHovered || hasFocus) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let previousTime = performance.now();
    let frame: number;

    function tick(now: number) {
      const delta = now - previousTime;
      previousTime = now;
      if (!document.hidden && !reducedMotion.matches) {
        // Discard long gaps when returning from a background tab.
        elapsedRef.current += Math.min(delta, 100);
        const progress = Math.min(elapsedRef.current / 4500, 1);
        if (progressRef.current)
          progressRef.current.style.transform = `scaleX(${progress})`;
        if (progress === 1) {
          goToCampus((activeIndex + 1) % campuses.length);
          return;
        }
      }
      frame = window.requestAnimationFrame(tick);
    }

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [activeIndex, isHovered, hasFocus]);

  function goToCampus(index: number) {
    const gallery = galleryRef.current;
    const slide = gallery?.children[index] as HTMLElement | undefined;
    if (!gallery || !slide) return;
    gallery.scrollTo({
      left: slide.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }

  return (
    <section
      id="campus"
      aria-labelledby="campus-title"
      className="overflow-hidden bg-[#f8f6f0] px-6 py-20 text-[#44321b] sm:px-12 sm:py-24 lg:px-20 lg:py-28"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <p className="mb-6 text-[11px] font-medium tracking-[0.25em] uppercase">
            OUR CAMPUSES
          </p>
          <h2
            id="campus-title"
            className="font-[Georgia,'Times_New_Roman',serif] text-[clamp(2.6rem,4.5vw,4.5rem)] leading-[1.1] tracking-[-0.045em]"
          >
            One Vision,
            <br />
            <span className="italic">Every Campus</span>
          </h2>
          <p className="mt-7 max-w-sm text-sm leading-[1.9] text-[#44321b]/75 sm:text-base">
            Across our campuses in Visakhapatnam, the P.E.N. experience is built
            around the same belief: children learn best when they feel seen,
            challenged and encouraged to discover who they can become.
          </p>
        </div>

        <div
          className="w-full min-w-0 max-w-[560px] justify-self-center lg:justify-self-end"
          role="region"
          aria-roledescription="carousel"
          aria-label="Our campuses"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocusCapture={() => setHasFocus(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget))
              setHasFocus(false);
          }}
        >
          <div
            id="campus-gallery"
            ref={galleryRef}
            tabIndex={0}
            aria-label="Campus images. Swipe or use the arrow keys to explore."
            onPointerDown={(event) => {
              if (event.pointerType !== "mouse" || event.button !== 0) return;
              const gallery = event.currentTarget;
              dragRef.current = {
                x: event.clientX,
                scrollLeft: gallery.scrollLeft,
              };
              gallery.setPointerCapture(event.pointerId);
              gallery.style.scrollSnapType = "none";
            }}
            onPointerMove={(event) => {
              const drag = dragRef.current;
              if (drag)
                event.currentTarget.scrollLeft =
                  drag.scrollLeft + drag.x - event.clientX;
            }}
            onLostPointerCapture={(event) => {
              if (!dragRef.current) return;
              dragRef.current = null;
              const gallery = event.currentTarget;
              gallery.style.scrollSnapType = "";
              const slides = Array.from(gallery.children) as HTMLElement[];
              const nearest = slides.reduce(
                (best, slide, index) =>
                  Math.abs(slide.offsetLeft - gallery.scrollLeft) <
                  Math.abs(slides[best].offsetLeft - gallery.scrollLeft)
                    ? index
                    : best,
                0,
              );
              goToCampus(nearest);
            }}
            onKeyDown={(event) => {
              if (event.key !== "ArrowLeft" && event.key !== "ArrowRight")
                return;
              event.preventDefault();
              goToCampus(
                Math.max(
                  0,
                  Math.min(
                    campuses.length - 1,
                    activeIndex + (event.key === "ArrowRight" ? 1 : -1),
                  ),
                ),
              );
            }}
            onScroll={() => {
              const gallery = galleryRef.current;
              if (!gallery) return;
              const slides = Array.from(gallery.children) as HTMLElement[];
              const nearest = slides.reduce(
                (best, slide, index) =>
                  Math.abs(slide.offsetLeft - gallery.scrollLeft) <
                  Math.abs(slides[best].offsetLeft - gallery.scrollLeft)
                    ? index
                    : best,
                0,
              );
              setActiveIndex(nearest);
            }}
            className="relative flex cursor-grab snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain select-none active:cursor-grabbing [scrollbar-width:none] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#44321b] [&::-webkit-scrollbar]:hidden"
          >
            {campuses.map((campus, index) => (
              <figure
                key={campus.id}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${campuses.length}`}
                className="w-full shrink-0 snap-start"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#e8dfce]">
                  <Image
                    src={campus.image}
                    alt={`${campus.name} campus`}
                    fill
                    sizes="(min-width: 1024px) 560px, 100vw"
                    className="object-cover"
                  />
                </div>
                <figcaption className="pt-6">
                  <h3 className="font-[Georgia,'Times_New_Roman',serif] text-2xl sm:text-3xl">
                    {campus.name}
                  </h3>
                </figcaption>
              </figure>
            ))}
          </div>
          <div
            aria-hidden="true"
            className="mt-7 h-0.5 overflow-hidden rounded-full bg-[#44321b]/15"
          >
            <div
              ref={progressRef}
              className="h-full origin-left scale-x-0 bg-[#44321b]"
            />
          </div>
          <div className="flex items-center justify-between pt-5">
            <p
              aria-live={hasFocus || isHovered ? "polite" : "off"}
              aria-atomic="true"
              className="text-xs tracking-[0.15em]"
            >
              {String(activeIndex + 1).padStart(2, "0")}{" "}
              <span className="mx-2 text-[#44321b]/35">/</span>{" "}
              {String(campuses.length).padStart(2, "0")}
            </p>
            <div className="flex gap-3">
              {[-1, 1].map((direction) => (
                <button
                  key={direction}
                  type="button"
                  aria-label={
                    direction === -1 ? "Previous campus" : "Next campus"
                  }
                  aria-controls="campus-gallery"
                  disabled={
                    direction === -1
                      ? activeIndex === 0
                      : activeIndex === campuses.length - 1
                  }
                  onClick={() => goToCampus(activeIndex + direction)}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[#44321b]/30 transition-colors hover:bg-[#44321b] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#44321b] disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-inherit"
                >
                  <span aria-hidden="true">{direction === -1 ? "←" : "→"}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
