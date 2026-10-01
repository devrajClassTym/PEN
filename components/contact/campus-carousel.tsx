"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

// Fictional campus details and illustrative stock images for layout review.
const campuses = [
  { name: "Seaside Campus", location: "MVP Colony, Visakhapatnam", address: "12 Learning Lane, Sector 3, MVP Colony, Visakhapatnam — 530017", photo: "photo-1580582932707-520aed937b7b" },
  { name: "City Campus", location: "Dwaraka Nagar, Visakhapatnam", address: "24 Knowledge Avenue, Dwaraka Nagar, Visakhapatnam — 530016", photo: "photo-1523050854058-8df90110c9f1" },
  { name: "Green Valley Campus", location: "Madhurawada, Visakhapatnam", address: "8 Discovery Road, Madhurawada, Visakhapatnam — 530048", photo: "photo-1562774053-701939374585" },
  { name: "Hillview Campus", location: "Gajuwaka, Visakhapatnam", address: "16 Scholars Street, Gajuwaka, Visakhapatnam — 530026", photo: "photo-1541339907198-e08756dedf3f" },
  { name: "North Campus", location: "Rushikonda, Visakhapatnam", address: "32 Inspiration Road, Rushikonda, Visakhapatnam — 530045", photo: "photo-1592066575517-58df903152f2" },
];

export default function CampusCarousel() {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  useEffect(() => {
    const element = track.current;
    if (!element) return;
    const update = () => setEdges({ start: element.scrollLeft < 2, end: element.scrollLeft + element.clientWidth >= element.scrollWidth - 2 });
    const observer = new ResizeObserver(update);
    observer.observe(element);
    element.addEventListener("scroll", update, { passive: true });
    update();
    return () => { observer.disconnect(); element.removeEventListener("scroll", update); };
  }, []);

  function move(direction: number) {
    const element = track.current;
    if (!element || element.children.length < 2) return;
    const first = element.children[0] as HTMLElement;
    const second = element.children[1] as HTMLElement;
    element.scrollBy({ left: direction * (second.offsetLeft - first.offsetLeft), behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  }

  return (
    <section aria-labelledby="contact-campuses" className="bg-white px-5 py-16 sm:px-8 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-9 flex flex-wrap items-end justify-between gap-6">
          <div><p className="mb-4 text-sm tracking-[0.2em] uppercase">Find your campus</p><h2 id="contact-campuses" className="font-[Georgia,'Times_New_Roman',serif] text-4xl tracking-[-0.04em] sm:text-5xl">Closer to home.<br /><span className="italic">Connected by purpose.</span></h2></div>
          <div className="flex gap-3">{[-1, 1].map((direction) => <button key={direction} type="button" aria-label={direction < 0 ? "Previous campus" : "Next campus"} aria-controls="contact-campus-track" disabled={direction < 0 ? edges.start : edges.end} onClick={() => move(direction)} className="flex h-12 w-12 items-center justify-center rounded-full border border-[#44321b]/30 hover:bg-[#44321b] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-4 disabled:cursor-not-allowed disabled:opacity-30"><span aria-hidden="true">{direction < 0 ? "←" : "→"}</span></button>)}</div>
        </div>
        <p className="mb-6 text-sm text-[#44321b]/65">Explore our campuses. Swipe or use the arrows to browse.</p>
        <ul id="contact-campus-track" ref={track} tabIndex={0} aria-label="Campus gallery" onKeyDown={(event) => { if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); } }} className="relative flex snap-x snap-mandatory gap-6 overflow-x-auto overscroll-x-contain pb-6 focus-visible:outline-2 focus-visible:outline-offset-4 [scrollbar-width:thin]">
          {campuses.map((campus) => <li key={campus.name} className="w-full shrink-0 snap-start overflow-hidden rounded-2xl border border-[#44321b]/15 bg-[#f8f6f0] sm:w-[calc((100%_-_1.5rem)/2)] lg:w-[calc((100%_-_3rem)/3)]">
            <div className="relative aspect-[16/10] bg-[#e8dfce]"><Image src={`https://images.unsplash.com/${campus.photo}?auto=format&fit=crop&w=1000&q=85`} alt={`Illustrative school photograph for ${campus.name}`} fill unoptimized sizes="(min-width: 1024px) 32vw, (min-width: 640px) 48vw, 94vw" className="object-cover" /></div>
            <div className="p-6"><p className="text-sm text-[#44321b]/65">{campus.location}</p><h3 className="mt-3 font-[Georgia,'Times_New_Roman',serif] text-3xl">{campus.name}</h3><address className="mt-4 text-base leading-relaxed text-[#44321b]/75 not-italic">{campus.address}</address></div>
          </li>)}
        </ul>
      </div>
    </section>
  );
}
