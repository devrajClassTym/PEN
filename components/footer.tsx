import Image from "next/image";
import Link from "next/link";

const links = [
  { label: "Our campuses", href: "/#campus" },
  { label: "Why P.E.N", href: "/#why-pen" },
  { label: "Founder’s desk", href: "/#founder-desk" },
  { label: "Life at P.E.N", href: "/#gallery" },
  { label: "Parent reviews", href: "/#parent-reviews" },
  { label: "Upcoming events", href: "/#upcoming-events" },
];

export default function Footer() {
  const linkClass = "transition-colors hover:text-[#d9c6a5] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d9c6a5]";
  return (
    <footer className="bg-[#302416] px-4 pt-12 pb-6 text-[#f8f6f0] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-col gap-5 border-b border-[#d9c6a5]/20 pb-9 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-lg font-[Georgia,'Times_New_Roman',serif] text-3xl leading-tight sm:text-4xl">Growing minds.<br /><span className="italic text-[#d9c6a5]">Building tomorrow.</span></p>
          <Link href="/#enquiry" className="inline-flex min-h-12 items-center justify-center gap-8 self-start rounded-full border border-[#d9c6a5]/40 px-6 text-sm transition-colors hover:bg-[#d9c6a5] hover:text-[#302416] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#d9c6a5] sm:self-center">Let’s talk admissions <span aria-hidden="true">↗</span></Link>
        </div>

        <div className="grid gap-10 py-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_0.9fr_1fr_1.2fr] lg:gap-12">
          <div>
            <Link href="/" aria-label="P.E.N Schools home" className={`inline-flex items-center gap-3 ${linkClass}`}>
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#f8f6f0] p-2"><Image src="/schoolLogo.png" alt="" width={44} height={44} className="h-full w-full object-contain" /></span>
              <span className="font-[Georgia,'Times_New_Roman',serif] text-2xl">P.E.N Schools</span>
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-[1.8] text-[#f8f6f0]/65">A place to belong, a space to discover, and the confidence to become. Nurturing curious minds since 1983.</p>
            <p className="mt-5 text-[10px] tracking-[0.2em] text-[#d9c6a5] uppercase">Learn · Discover · Grow</p>
          </div>

          <nav aria-label="Footer navigation">
            <h2 className="mb-5 text-[11px] font-medium tracking-[0.18em] text-[#d9c6a5] uppercase">Explore P.E.N</h2>
            <ul className="space-y-3 text-sm text-[#f8f6f0]/70">{links.map((link) => <li key={link.href}><Link href={link.href} className={linkClass}>{link.label}</Link></li>)}</ul>
          </nav>

          <div>
            <h2 className="mb-5 text-[11px] font-medium tracking-[0.18em] text-[#d9c6a5] uppercase">Admissions</h2>
            <Link href="/#enquiry" className={`text-sm text-[#f8f6f0]/70 ${linkClass}`}>Enquire about a place ↗</Link>
            <p className="mt-5 text-sm text-[#f8f6f0]/85">Visit our admissions desk</p>
            <p className="mt-2 text-sm leading-[1.8] text-[#f8f6f0]/65">Monday – Saturday<br />9:00 AM – 4:00 PM</p>
            <p className="mt-3 text-xs text-[#d9c6a5]/65">Sample visiting hours</p>
          </div>

          <div>
            <h2 className="mb-5 text-[11px] font-medium tracking-[0.18em] text-[#d9c6a5] uppercase">Get in touch</h2>
            <address className="space-y-4 text-sm leading-[1.8] text-[#f8f6f0]/70 not-italic">
              <p>123 Learning Avenue<br />Visakhapatnam, Andhra Pradesh<br />India — 530001</p>
              <p>+91 00000 00000<br />admissions@penschools.example</p>
            </address>
            <p className="mt-3 text-xs text-[#d9c6a5]/65">Placeholder contact details</p>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-[#d9c6a5]/20 pt-6 text-xs text-[#f8f6f0]/50 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} P.E.N Schools. All rights reserved.</p>
          <Link href="/#" className={linkClass}>Back to top ↑</Link>
        </div>
      </div>
    </footer>
  );
}
