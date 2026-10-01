import SchoolLogo from "@/components/school-logo";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ActivityTabs from "@/components/beyond-academics/activity-tabs";

export const metadata: Metadata = {
  title: "Beyond Academics | P.E.N Schools",
  description: "Explore life beyond the classroom at P.E.N: sports, competitions, awards nights, educational trips, and PenClubs.",
};

export default function BeyondAcademics() {
  return (
    <main className="flex-1 bg-[#f8f6f0] text-[#44321b]">
      <section aria-labelledby="beyond-title" className="relative isolate flex min-h-[85svh] items-center justify-center overflow-hidden bg-[#302416] px-6 pt-56 pb-20 text-center text-white sm:pt-64">
        {/* Illustrative stock photography until school activity photographs are available. */}
        <Image src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&w=2200&q=85" alt="" fill priority unoptimized sizes="100vw" className="-z-20 object-cover" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-gradient-to-b from-[#201b13]/70 via-[#201b13]/45 to-[#201b13]/80" />
        <Link href="/" aria-label="P.E.N Schools home" className="absolute top-6 left-1/2 -translate-x-1/2 focus-visible:outline-2 focus-visible:outline-offset-4 sm:top-8">
          <SchoolLogo />
        </Link>
        <div className="mx-auto max-w-4xl">
          <p className="mb-6 text-sm font-medium tracking-[0.2em] uppercase">Beyond academics</p>
          <h1 id="beyond-title" className="text-balance font-[Georgia,'Times_New_Roman',serif] text-[clamp(3rem,7vw,6.5rem)] leading-[1.07] tracking-[-0.045em]">A world to discover.<br /><span className="italic text-[#ead7b6]">A place to become.</span></h1>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-[1.9] text-white/90 sm:text-lg">The moments beyond the timetable often stay with us the longest. Find your team, follow your curiosity, and make memories along the way.</p>
          <a href="#activities" className="mt-9 inline-flex min-h-12 items-center gap-6 rounded-full border border-white/60 px-7 text-base transition-colors hover:bg-white hover:text-[#44321b] focus-visible:outline-2 focus-visible:outline-offset-4">Explore life at P.E.N <span aria-hidden="true">↓</span></a>
        </div>
      </section>
      <ActivityTabs />
      <section className="border-t border-[#44321b]/15 bg-[#eee8da] px-6 py-16 text-center" aria-labelledby="join-title">
        <p className="mb-5 text-sm tracking-[0.2em] uppercase">There is more to every child</p>
        <h2 id="join-title" className="font-[Georgia,'Times_New_Roman',serif] text-4xl leading-tight sm:text-5xl">Let them discover <span className="italic">what moves them.</span></h2>
        <Link href="/admission#enquiry" className="mt-8 inline-flex min-h-12 items-center gap-8 rounded-full bg-[#44321b] px-7 py-3 text-base text-white transition-colors hover:bg-[#302416] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#44321b]">Start a conversation <span aria-hidden="true">↗</span></Link>
      </section>
    </main>
  );
}
