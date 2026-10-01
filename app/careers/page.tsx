import type { Metadata } from "next";
import Link from "next/link";
import SchoolLogo from "@/components/school-logo";
import JobOpenings from "@/components/careers/job-openings";

export const metadata: Metadata = {
  title: "Careers | P.E.N Schools",
  description: "Explore teaching and school support roles at P.E.N Schools and find a place to contribute to young learners’ journeys.",
};

export default function CareersPage() {
  return (
    <main className="flex-1 bg-[#f8f6f0] text-[#44321b]">
      <section aria-labelledby="careers-title" className="relative border-b border-[#44321b]/10 bg-[#eee8da] pt-40 pb-12 text-center sm:pt-52 sm:pb-16">
        <Link href="/" aria-label="P.E.N Schools home" className="absolute top-6 left-1/2 -translate-x-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 sm:top-8"><SchoolLogo /></Link>
        <div className="content-container">
          <p className="mb-4 text-xs tracking-[0.25em] uppercase">Careers at P.E.N</p>
          <h1 id="careers-title" className="font-[Georgia,serif] text-[clamp(2.5rem,5vw,4rem)] leading-tight tracking-[-0.045em]">Bring your passion.<br className="sm:hidden" /> <span className="italic">Shape a tomorrow.</span></h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#44321b]/75">Great school days begin with people who care. Explore opportunities to teach, inspire, and help our community grow.</p>
        </div>
      </section>
      <JobOpenings />
    </main>
  );
}
