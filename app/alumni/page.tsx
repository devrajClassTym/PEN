import type { Metadata } from "next";
import Link from "next/link";
import SchoolLogo from "@/components/school-logo";
import { schoolAlumni } from "@/lib/school-alumni";

export const metadata: Metadata = {
  title: "Alumni | P.E.N Schools",
  description: "A place to reconnect with the P.E.N community and discover journeys beyond the school gates.",
};

export default function AlumniPage() {
  return (
    <main className="flex-1 bg-[#f8f6f0] text-[#44321b]">
      <section aria-labelledby="alumni-title" className="relative border-b border-[#44321b]/10 bg-[#eee8da] pt-40 pb-12 text-center sm:pt-52 sm:pb-16">
        <Link href="/" aria-label="P.E.N Schools home" className="absolute top-6 left-1/2 -translate-x-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 sm:top-8"><SchoolLogo /></Link>
        <div className="content-container">
          <p className="mb-4 text-xs tracking-[0.25em] uppercase">The P.E.N alumni community</p>
          <h1 id="alumni-title" className="font-[Georgia,serif] text-[clamp(2.5rem,5vw,4rem)] leading-tight tracking-[-0.045em]">Different journeys.<br className="sm:hidden" /> <span className="italic">Shared beginnings.</span></h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#44321b]/75">Beyond the classrooms and familiar corridors, the connection continues. A celebration of where life takes us — and where it all began.</p>
        </div>
      </section>

      <section aria-labelledby="alumni-grid-title" className="content-container py-16 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div><p className="mb-4 text-xs tracking-[0.22em] uppercase">Once a part of P.E.N, always a part</p><h2 id="alumni-grid-title" className="font-[Georgia,serif] text-4xl tracking-tight sm:text-5xl">Meet our <span className="italic">alumni.</span></h2></div>
        </div>
        <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {schoolAlumni.map((alum) => (
            <li key={alum.id} className="min-w-0">
              <article aria-labelledby={`alumni-${alum.id}`} className="group relative isolate flex h-full flex-col overflow-hidden rounded-xl border border-[#44321b]/15 bg-[#fffdf8] transition-colors hover:border-[#92774f]/50">
                <svg aria-hidden="true" focusable="false" viewBox="0 0 120 120" fill="none" className="pointer-events-none absolute -top-5 -right-5 -z-10 h-32 w-32 text-[#92774f]/15 transition-transform duration-500 motion-safe:group-hover:rotate-12">
                  <circle cx="75" cy="45" r="42" stroke="currentColor" />
                  <circle cx="75" cy="45" r="30" stroke="currentColor" />
                  <path d="M75 1v88M31 45h88M44 14l62 62M44 76l62-62" stroke="currentColor" />
                  <path d="m29 91 3-8 3 8 8 3-8 3-3 8-3-8-8-3Z" fill="currentColor" />
                </svg>
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <p className="text-[10px] tracking-[0.18em] text-[#92774f] uppercase">Batch {alum.batch}</p>
                  <h3 id={`alumni-${alum.id}`} className="mt-4 font-[Georgia,serif] text-3xl tracking-tight">{alum.name}</h3>
                  <p className="mt-4 mb-6 text-sm font-medium leading-relaxed">{alum.role}</p>
                  <p className="mt-auto flex items-start gap-3 border-t border-[#44321b]/15 pt-4 text-sm leading-relaxed text-[#44321b]/75"><span aria-hidden="true" className="mt-1.5 h-2 w-2 shrink-0 rotate-45 border border-[#92774f]/60 bg-[#d9c6a5]/30" />{alum.company}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
      <section aria-labelledby="reconnect-title" className="bg-[#eee8da] py-12 sm:py-16">
        <div className="content-container flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-center">
          <div><h2 id="reconnect-title" className="font-[Georgia,serif] text-3xl sm:text-4xl">Your story is <span className="italic">part of ours.</span></h2><p className="mt-4 max-w-xl text-sm leading-relaxed text-[#44321b]/75">An old memory, a new milestone, or simply a hello — we’d love to reconnect.</p></div>
          <Link href="/contact-us" className="inline-flex min-h-12 shrink-0 items-center gap-6 rounded-full bg-[#44321b] px-7 py-3 text-sm text-white transition-colors hover:bg-[#302416] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#44321b]">Get in touch <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
