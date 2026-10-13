import type { Metadata } from "next";
import Link from "next/link";
import SchoolLogo from "@/components/school-logo";

export const metadata: Metadata = {
  title: "Newsletter | P.E.N Schools",
  description: "Read stories about learning, creativity, and school life, and explore the P.E.N newsletter.",
};

export default function NewsletterPage() {
  return (
    <main className="flex-1 bg-[#f8f6f0] text-[#44321b]">
      <section aria-labelledby="newsletter-title" className="relative border-b border-[#44321b]/10 bg-[#eee8da] pt-40 pb-12 text-center sm:pt-52 sm:pb-16">
        <Link href="/" aria-label="P.E.N Schools home" className="absolute top-6 left-1/2 -translate-x-1/2 rounded-full focus-visible:outline-2 focus-visible:outline-offset-4 sm:top-8"><SchoolLogo /></Link>
        <div className="content-container">
          <p className="mb-4 text-xs tracking-[0.25em] uppercase">The P.E.N newsletter</p>
          <h1 id="newsletter-title" className="font-[Georgia,serif] text-[clamp(2.5rem,5vw,4rem)] leading-tight tracking-[-0.045em]">Little stories. <span className="italic">Lasting connections.</span></h1>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[#44321b]/75">A window into learning, creativity, and life at school. Stay connected with stories from our community.</p>
        </div>
      </section>
      <section aria-label="Newsletter editions" className="content-container py-16 text-center lg:py-20">
        <p className="font-[Georgia,serif] text-3xl">Our newsletters are coming soon.</p>
        <p className="mt-4 text-sm text-[#44321b]/75">Check back for the latest editions from P.E.N Schools.</p>
      </section>
    </main>
  );
}
