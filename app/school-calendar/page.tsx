import SchoolLogo from "@/components/school-logo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import EventsGrid from "@/components/school-calendar/events-grid";

export const metadata: Metadata = {
  title: "School Calendar | P.E.N Schools",
  description: "Explore school events, celebrations, and opportunities to connect with the P.E.N community.",
};

export default function SchoolCalendarPage() {
  return (
    <main className="flex-1 bg-[#f8f6f0] text-[#44321b]">
      <section aria-labelledby="calendar-title" className="relative isolate overflow-hidden bg-[#44321b] pt-40 pb-10 text-center text-[#f8f6f0] sm:pt-52 sm:pb-12">
        {/* Illustrative school photography until approved campus images are supplied. */}
        <Image src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&w=2200&q=85" alt="" fill priority unoptimized sizes="100vw" className="-z-20 object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-[#201b13]/65 via-[#201b13]/55 to-[#201b13]/80" />
        <Link href="/" aria-label="P.E.N Schools home" className="absolute top-6 left-1/2 -translate-x-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 sm:top-8"><SchoolLogo /></Link>
        <div className="content-container">
          <p className="mb-3 text-xs tracking-[0.25em] text-[#d9c6a5] uppercase">School calendar</p>
          <h1 id="calendar-title" className="font-[Georgia,serif] text-[clamp(2rem,4vw,3.5rem)] leading-[1.07] tracking-[-0.045em]">Come together. <span className="italic text-[#d9c6a5]">Make a memory.</span></h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-white/85 sm:text-base">Learning, celebrations, and moments to look forward to — all in one place.</p>
          <a href="#calendar-events" className="mt-5 inline-flex min-h-12 items-center gap-6 rounded-full border border-[#d9c6a5]/50 px-7 py-3 text-sm transition-colors hover:bg-[#d9c6a5] hover:text-[#44321b] focus-visible:outline-2 focus-visible:outline-offset-4">Explore events <span aria-hidden="true">↓</span></a>
        </div>
      </section>
      <EventsGrid />
    </main>
  );
}
