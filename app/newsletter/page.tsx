import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SchoolLogo from "@/components/school-logo";
import NewsletterSignup from "@/components/newsletter/signup-form";
import { schoolBlogs } from "@/lib/school-blogs";

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
          <NewsletterSignup />
        </div>
      </section>
      <section aria-labelledby="blogs-title" className="content-container py-16 lg:py-20">
        <div className="flex flex-wrap items-end justify-between gap-5">
          <div><p className="mb-4 text-xs tracking-[0.22em] uppercase">From the journal</p><h2 id="blogs-title" className="font-[Georgia,serif] text-4xl tracking-tight sm:text-5xl">Stories worth <span className="italic">sharing.</span></h2></div>
        </div>
        <ul className="mt-10 divide-y divide-[#44321b]/15 border-y border-[#44321b]/15">
          {schoolBlogs.map((blog, index) => (
            <li key={blog.slug} className="py-8 sm:py-10">
              <article aria-labelledby={`blog-${blog.slug}`} className="grid items-start gap-7 md:grid-cols-[0.8fr_1.2fr] lg:gap-12">
                <div className="relative aspect-[16/10] overflow-hidden rounded-lg bg-[#eee8da]">
                  {/* Illustrative stock photography for sample articles. */}
                  <Image src={`https://images.unsplash.com/${blog.image}?auto=format&fit=crop&w=1000&q=85`} alt={blog.imageAlt} fill unoptimized sizes="(min-width: 1280px) 480px, (min-width: 768px) 40vw, 100vw" className="object-cover" />
                </div>
                <div className="py-1 sm:py-3">
                  <div className="flex items-center gap-4 text-[10px] tracking-[0.18em] text-[#92774f] uppercase"><span>{String(index + 1).padStart(2, "0")}</span><span aria-hidden="true">/</span><span>{blog.category}</span></div>
                  <h3 id={`blog-${blog.slug}`} className="mt-5 font-[Georgia,serif] text-3xl leading-tight tracking-tight sm:text-4xl">{blog.title}</h3>
                  <p className="mt-4 max-w-xl text-base leading-[1.8] text-[#44321b]/75">{blog.excerpt}</p>
                  <details className="group mt-5">
                    <summary aria-label={`Read story: ${blog.title}`} className="inline-flex min-h-11 cursor-pointer list-none items-center gap-6 border-b border-[#44321b]/35 text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-4 [&::-webkit-details-marker]:hidden"><span className="group-open:hidden">Read story</span><span className="hidden group-open:inline">Close story</span><span aria-hidden="true" className="group-open:rotate-180">↓</span></summary>
                    <div className="mt-5 space-y-4 text-sm leading-[1.9] text-[#44321b]/80">{blog.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
                  </details>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
