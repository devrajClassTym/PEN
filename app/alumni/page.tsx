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
              <article aria-labelledby={`alumni-${alum.id}`} className="flex h-full flex-col overflow-hidden rounded-xl border border-[#44321b]/15 bg-[#fffdf8]">
                <div className={`relative flex h-52 items-center justify-center overflow-hidden ${alum.color}`}>
                  <div aria-hidden="true" className="absolute -right-8 -bottom-16 h-56 w-56 rounded-full border border-[#44321b]/10" />
                  <div aria-hidden="true" className="absolute -top-16 -left-12 h-48 w-48 rounded-full border border-[#44321b]/10" />
                  <span aria-hidden="true" className="flex h-28 w-28 items-center justify-center rounded-full border border-[#44321b]/15 bg-[#fffdf8]/50 font-[Georgia,serif] text-4xl italic text-[#44321b]/75">{alum.initials}</span>
                  <span className="absolute right-4 bottom-4 rounded-full bg-[#fffdf8]/85 px-3 py-1.5 text-[10px] tracking-[0.12em] uppercase">Class of {alum.batch}</span>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-[10px] tracking-[0.18em] text-[#92774f] uppercase">{alum.field}</p>
                  <h3 id={`alumni-${alum.id}`} className="mt-3 font-[Georgia,serif] text-3xl tracking-tight">{alum.name}</h3>
                  <p className="mt-2 text-sm font-medium">{alum.role}</p>
                  <p className="mt-4 mb-6 text-sm leading-[1.9] text-[#44321b]/75">{alum.story}</p>
                  <p className="mt-auto flex items-center gap-2 border-t border-[#44321b]/15 pt-4 text-xs text-[#44321b]/65"><svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Z" /><circle cx="12" cy="10" r="2.5" /></svg>{alum.location}</p>
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
