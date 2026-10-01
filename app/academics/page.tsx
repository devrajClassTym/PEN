import SchoolLogo from "@/components/school-logo";
import type { Metadata } from "next";
import Link from "next/link";
import EventsCarousel from "@/components/academics/events-carousel";

export const metadata: Metadata = {
  title: "Academics | P.E.N Schools",
  description: "Explore learning at P.E.N, our curriculum, parent–teacher conversations, and upcoming school events.",
};

const learningAreas = [
  { number: "01", title: "Language & expression", description: "Reading, writing, listening, and sharing ideas — building the confidence to find your own voice." },
  { number: "02", title: "Mathematics & discovery", description: "Exploring patterns, asking questions, and connecting classroom concepts to the world around us." },
  { number: "03", title: "Creativity & connection", description: "Making room for art, collaboration, and fresh perspectives alongside everyday learning." },
];

export default function AcademicsPage() {
  return (
    <main className="flex-1 bg-[#f8f6f0] text-[#44321b]">
      <section aria-labelledby="academics-title" className="relative overflow-hidden bg-[#44321b] pt-56 pb-20 text-center text-[#f8f6f0] sm:pt-64 sm:pb-24">
        <Link href="/" aria-label="P.E.N Schools home" className="absolute top-6 left-1/2 -translate-x-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 sm:top-8">
          <SchoolLogo />
        </Link>
        <div className="content-container">
        <p className="mb-6 text-xs tracking-[0.25em] text-[#d9c6a5] uppercase">Academics at P.E.N</p>
        <h1 id="academics-title" className="font-[Georgia,'Times_New_Roman',serif] text-[clamp(3rem,7vw,6.5rem)] leading-[1.07] tracking-[-0.045em]">A curious mind.<br /><span className="italic text-[#d9c6a5]">A world of possibility.</span></h1>
        <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-white/75 sm:text-lg">Every question is a beginning. Explore learning that helps children understand more, think independently, and grow in confidence.</p>
        <nav aria-label="Explore academics" className="mt-10 flex flex-wrap justify-center gap-3 text-sm">
          {[{ href: "#curriculum", label: "Our curriculum" }, { href: "#ptm", label: "Parent–teacher meetings" }, { href: "#academic-events", label: "Upcoming events" }].map((item) => (
            <a key={item.href} href={item.href} className="rounded-full border border-[#d9c6a5]/40 px-5 py-3 transition-colors hover:bg-[#d9c6a5] hover:text-[#44321b] focus-visible:outline-2 focus-visible:outline-offset-4">{item.label} <span aria-hidden="true" className="ml-3">↓</span></a>
          ))}
        </nav>
        </div>
      </section>

      <section id="curriculum" aria-labelledby="curriculum-title" className="content-container scroll-mt-8 py-20 lg:py-28">
        <div className="grid gap-7 lg:grid-cols-2 lg:gap-20">
          <div>
            <p className="mb-5 text-xs tracking-[0.22em] uppercase">01 / Curriculum</p>
            <h2 id="curriculum-title" className="font-[Georgia,'Times_New_Roman',serif] text-4xl leading-tight tracking-tight sm:text-5xl">Strong foundations.<br /><span className="italic">Room to explore.</span></h2>
          </div>
          <div className="self-end text-base leading-[1.9] text-[#44321b]/75">
            <p>Learning begins with the fundamentals and grows through curiosity. Languages, mathematics, science, and an understanding of our world give children a foundation to build on.</p>
            <p className="mt-4">For class-wise subjects, syllabus details, and academic requirements, connect with our school team.</p>
            <Link href="/contact-us" className="mt-5 inline-flex min-h-11 items-center gap-5 border-b border-[#44321b]/40 font-medium text-[#44321b] focus-visible:outline-2 focus-visible:outline-offset-4">Ask about the curriculum <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {learningAreas.map((area) => (
            <article key={area.number} className="border-t border-[#44321b]/25 bg-[#eee8da]/50 p-7 sm:p-8">
              <span className="font-[Georgia,serif] text-3xl italic text-[#92774f]">{area.number}</span>
              <h3 className="mt-8 font-[Georgia,serif] text-2xl">{area.title}</h3>
              <p className="mt-4 text-sm leading-[1.9] text-[#44321b]/75">{area.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="ptm" aria-labelledby="ptm-title" className="scroll-mt-8 bg-[#eee8da] py-20 lg:py-24">
        <div className="content-container grid gap-12 lg:grid-cols-2 lg:gap-24">
          <div>
            <p className="mb-5 text-xs tracking-[0.22em] uppercase">02 / Parent–teacher meetings</p>
            <h2 id="ptm-title" className="font-[Georgia,'Times_New_Roman',serif] text-4xl leading-tight tracking-tight sm:text-5xl">Their journey.<br /><span className="italic">Our shared commitment.</span></h2>
            <p className="mt-6 max-w-lg text-base leading-[1.9] text-[#44321b]/75">A good conversation brings home and school closer. Parent–teacher meetings (PTMs) are a chance to celebrate progress, talk through challenges, and plan the next steps together.</p>
            <Link href="/contact-us" className="mt-8 inline-flex min-h-12 items-center gap-8 rounded-full bg-[#44321b] px-7 py-3 text-sm text-white hover:bg-[#302416] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#44321b]">Enquire about PTM <span aria-hidden="true">↗</span></Link>
          </div>
          <div className="self-center border border-[#44321b]/15 bg-[#f8f6f0] p-7 sm:p-10">
            <h3 className="font-[Georgia,serif] text-2xl">A little preparation, a meaningful conversation.</h3>
            <ol className="mt-7 space-y-6">
              {["Reflect on your child’s recent learning and experiences.", "Bring questions, observations, or anything you would like to discuss.", "Agree on simple next steps to support learning at home and school."].map((item, index) => (
                <li key={item} className="flex gap-4 text-sm leading-relaxed"><span className="text-[#92774f]">0{index + 1}</span><span>{item}</span></li>
              ))}
            </ol>
            <p className="mt-8 border-t border-[#44321b]/15 pt-5 text-xs leading-relaxed text-[#44321b]/65">Please contact the school for the next PTM date and appointment details.</p>
          </div>
        </div>
      </section>
      <EventsCarousel />
    </main>
  );
}
